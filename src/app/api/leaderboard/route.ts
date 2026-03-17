import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/leaderboard?branch=HQ&limit=50
export async function GET(req: NextRequest) {
  const branch = req.nextUrl.searchParams.get("branch");
  const limit = Math.min(100, parseInt(req.nextUrl.searchParams.get("limit") || "50"));

  try {
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

    // Add computed fields
    const leaderboard = players.map((p, i) => ({
      rank: i + 1,
      ...p,
      avgScore: p.casesCompleted > 0 ? Math.round(p.scoreSum / p.casesCompleted) : 0,
    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
