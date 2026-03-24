import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/leaderboard?branch=HQ&limit=50&period=all&mode=rankings|champions
export async function GET(req: NextRequest) {
  const branch = req.nextUrl.searchParams.get("branch");
  const limit = Math.min(100, parseInt(req.nextUrl.searchParams.get("limit") || "50"));
  const period = req.nextUrl.searchParams.get("period") || "all";
  const mode = req.nextUrl.searchParams.get("mode") || "rankings";

  try {
    // ── CATEGORY CHAMPIONS MODE ──
    if (mode === "champions") {
      const categories = ["sales", "compliance", "customer-service", "fraud", "operations"];
      const champions = [];

      for (const category of categories) {
        const topPlayers = await prisma.gameSession.groupBy({
          by: ["playerId"],
          where: { category },
          _avg: { percentage: true },
          _count: { id: true },
          orderBy: { _avg: { percentage: "desc" } },
          take: 1,
        });

        if (topPlayers.length > 0) {
          const player = await prisma.player.findUnique({
            where: { id: topPlayers[0].playerId },
            select: { name: true, branch: true, totalXP: true },
          });
          if (player) {
            champions.push({
              category,
              playerId: topPlayers[0].playerId,
              playerName: player.name,
              playerBranch: player.branch,
              avgScore: Math.round(topPlayers[0]._avg?.percentage || 0),
              gamesPlayed: topPlayers[0]._count.id,
            });
          }
        }
      }

      return NextResponse.json(champions);
    }

    // ── RANKINGS MODE ──

    // For "all time", use the Player model (faster, pre-aggregated)
    if (period === "all") {
      const where = branch && branch !== "all" ? { branch } : {};

      const players = await prisma.player.findMany({
        where: {
          ...where,
          casesCompleted: { gt: 0 },
        },
        orderBy: { totalXP: "desc" },
        take: limit,
        select: {
          id: true,
          name: true,
          branch: true,
          totalXP: true,
          casesCompleted: true,
          scoreSum: true,
          streak: true,
          completedScenarios: true,
        },
      });

      const leaderboard = players.map((p, i) => ({
        rank: i + 1,
        ...p,
        avgScore: p.casesCompleted > 0 ? Math.round(p.scoreSum / p.casesCompleted) : 0,
      }));

      return NextResponse.json(leaderboard);
    }

    // For "week" or "month", aggregate from GameSession
    const now = new Date();
    let dateFrom: Date;
    if (period === "week") {
      dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else {
      dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // If branch filter, get player IDs first
    let playerIdFilter: string[] | undefined;
    if (branch && branch !== "all") {
      const branchPlayers = await prisma.player.findMany({
        where: { branch },
        select: { id: true },
      });
      playerIdFilter = branchPlayers.map((p) => p.id);
    }

    const sessions = await prisma.gameSession.groupBy({
      by: ["playerId"],
      where: {
        createdAt: { gte: dateFrom },
        ...(playerIdFilter ? { playerId: { in: playerIdFilter } } : {}),
      },
      _sum: { xpAwarded: true },
      _count: { id: true },
      _avg: { percentage: true },
      orderBy: { _sum: { xpAwarded: "desc" } },
      take: limit,
    });

    // Fetch player details for the results
    const playerIds = sessions.map((s) => s.playerId);
    const players = await prisma.player.findMany({
      where: { id: { in: playerIds } },
      select: { id: true, name: true, branch: true, streak: true, completedScenarios: true },
    });
    const playerMap = new Map(players.map((p) => [p.id, p]));

    const leaderboard = sessions.map((s, i) => {
      const player = playerMap.get(s.playerId);
      return {
        rank: i + 1,
        id: s.playerId,
        name: player?.name || "Unknown",
        branch: player?.branch || "HQ",
        totalXP: s._sum?.xpAwarded || 0,
        casesCompleted: s._count.id,
        avgScore: Math.round(s._avg?.percentage || 0),
        streak: player?.streak || 0,
        completedScenarios: player?.completedScenarios || [],
      };
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
