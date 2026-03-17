import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/player?id=xxx — get player profile
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing player ID" }, { status: 400 });

  try {
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        sessions: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });
    if (!player) return NextResponse.json({ error: "Player not found" }, { status: 404 });
    return NextResponse.json(player);
  } catch (error) {
    console.error("Player fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch player" }, { status: 500 });
  }
}

// POST /api/player — create or login player by name
export async function POST(req: NextRequest) {
  try {
    const { name, branch } = await req.json();
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
    }

    const cleanName = name.trim().slice(0, 50);
    const cleanBranch = (branch || "HQ").trim().slice(0, 50);

    // Find existing player by name or create new one
    let player = await prisma.player.findFirst({
      where: { name: cleanName },
    });

    if (!player) {
      player = await prisma.player.create({
        data: { name: cleanName, branch: cleanBranch },
      });
    }

    return NextResponse.json(player);
  } catch (error) {
    console.error("Player create error:", error);
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 });
  }
}

// PATCH /api/player — sync career data from client
export async function PATCH(req: NextRequest) {
  try {
    const { id, totalXP, casesCompleted, scoreSum, streak, lastPlayedDate, completedScenarios } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing player ID" }, { status: 400 });

    const player = await prisma.player.update({
      where: { id },
      data: {
        totalXP: totalXP ?? undefined,
        casesCompleted: casesCompleted ?? undefined,
        scoreSum: scoreSum ?? undefined,
        streak: streak ?? undefined,
        lastPlayedDate: lastPlayedDate ?? undefined,
        completedScenarios: completedScenarios ?? undefined,
      },
    });

    return NextResponse.json(player);
  } catch (error) {
    console.error("Player update error:", error);
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 });
  }
}
