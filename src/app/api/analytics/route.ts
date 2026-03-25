import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const playerId = req.nextUrl.searchParams.get("playerId");
  if (!playerId) return NextResponse.json({ error: "Missing playerId" }, { status: 400 });

  try {
    const player = await prisma.player.findUnique({ where: { id: playerId } });
    if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });

    // Recent 20 sessions (for progress chart + table)
    const recentSessions = await prisma.gameSession.findMany({
      where: { playerId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // All sessions for aggregates
    const allSessions = await prisma.gameSession.findMany({
      where: { playerId },
      select: { category: true, percentage: true, skillScores: true, grade: true },
    });

    // Category performance
    const categoryStats = await prisma.gameSession.groupBy({
      by: ["category"],
      where: { playerId },
      _avg: { percentage: true },
      _count: { id: true },
    });

    // Skill radar from skillScores JSON
    const skillMap: Record<string, { totalScore: number; totalMax: number; count: number }> = {};
    for (const s of allSessions) {
      if (s.skillScores && Array.isArray(s.skillScores)) {
        for (const sk of s.skillScores as Array<{ skill: string; score: number; maxScore: number }>) {
          if (!skillMap[sk.skill]) skillMap[sk.skill] = { totalScore: 0, totalMax: 0, count: 0 };
          skillMap[sk.skill].totalScore += sk.score;
          skillMap[sk.skill].totalMax += sk.maxScore;
          skillMap[sk.skill].count += 1;
        }
      }
    }
    const skillRadar = Object.entries(skillMap).map(([skill, data]) => ({
      skill,
      avgPercent: data.totalMax > 0 ? Math.round((data.totalScore / data.totalMax) * 100) : 0,
      count: data.count,
    }));

    const sorted = [...skillRadar].sort((a, b) => b.avgPercent - a.avgPercent);
    const strongest = sorted.slice(0, 3);
    const weakest = [...skillRadar].sort((a, b) => a.avgPercent - b.avgPercent).slice(0, 3);

    // Peer percentile
    const allPlayers = await prisma.gameSession.groupBy({
      by: ["playerId"],
      _avg: { percentage: true },
      _count: { id: true },
    });
    const totalPlayers = allPlayers.filter((p) => (p._count?.id || 0) >= 1).length;
    const playerAvg = allSessions.length > 0
      ? allSessions.reduce((sum, s) => sum + s.percentage, 0) / allSessions.length
      : 0;
    const playersBelow = allPlayers.filter((p) => (p._avg?.percentage || 0) < playerAvg).length;
    const overallPercentile = totalPlayers > 1 ? Math.round((playersBelow / totalPlayers) * 100) : 50;

    // Certificate eligibility: 3+ unique scenarios at 70%+ per category
    const certEligibility: Record<string, { eligible: boolean; count: number; avgScore: number }> = {};
    for (const cat of categoryStats) {
      const qualifying = await prisma.gameSession.findMany({
        where: { playerId, category: cat.category, percentage: { gte: 70 } },
        select: { scenarioId: true, percentage: true },
      });
      const uniqueScenarios = new Set(qualifying.map((s) => s.scenarioId));
      const avg = qualifying.length > 0
        ? Math.round(qualifying.reduce((s, q) => s + q.percentage, 0) / qualifying.length)
        : 0;
      certEligibility[cat.category] = { eligible: uniqueScenarios.size >= 3, count: uniqueScenarios.size, avgScore: avg };
    }

    // Grade distribution
    const gradeCount: Record<string, number> = {};
    for (const s of allSessions) {
      gradeCount[s.grade] = (gradeCount[s.grade] || 0) + 1;
    }

    return NextResponse.json({
      player: {
        name: player.name,
        branch: player.branch,
        totalXP: player.totalXP,
        casesCompleted: player.casesCompleted,
        adaptiveLevel: player.adaptiveLevel,
      },
      recentSessions: recentSessions.map((s) => ({
        id: s.id, scenarioTitle: s.scenarioTitle, category: s.category,
        difficulty: s.difficulty, percentage: s.percentage, grade: s.grade,
        timeSpent: s.timeSpent, createdAt: s.createdAt,
      })),
      categoryStats: categoryStats.map((c) => ({
        category: c.category, avgScore: Math.round(c._avg?.percentage || 0), count: c._count.id,
      })),
      skillRadar,
      strongest,
      weakest,
      overallPercentile,
      gradeCount,
      certEligibility,
      totalSessions: allSessions.length,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
