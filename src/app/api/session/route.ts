import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/session — save a completed game session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      playerId, scenarioId, scenarioTitle, category, difficulty,
      score, maxScore, percentage, grade, xpAwarded,
      timeSpent, mood, violations, evaluatedBy,
    } = body;

    if (!playerId || !scenarioId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save session
    const session = await prisma.gameSession.create({
      data: {
        playerId,
        scenarioId,
        scenarioTitle: scenarioTitle || "",
        category: category || "",
        difficulty: difficulty || "medium",
        score: score || 0,
        maxScore: maxScore || 100,
        percentage: percentage || 0,
        grade: grade || "F",
        xpAwarded: xpAwarded || 0,
        timeSpent: timeSpent || 0,
        mood: mood || 5,
        violations: violations || 0,
        evaluatedBy: evaluatedBy || "ai",
      },
    });

    // Update player career stats
    await prisma.player.update({
      where: { id: playerId },
      data: {
        totalXP: { increment: xpAwarded || 0 },
        casesCompleted: { increment: 1 },
        scoreSum: { increment: percentage || 0 },
        lastPlayedDate: new Date().toISOString().split("T")[0],
        completedScenarios: {
          push: scenarioId,
        },
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Session save error:", error);
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}
