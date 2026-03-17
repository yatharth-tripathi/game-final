import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET — list all custom scenarios
export async function GET() {
  try {
    const scenarios = await prisma.customScenario.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(scenarios);
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json({ error: "Failed to fetch scenarios" }, { status: 500 });
  }
}

// POST — create a new custom scenario
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, difficulty, xpReward, customer, openingStatement, steps, evaluationRules, complianceRules, tags } = body;

    if (!title || !description || !category || !customer || !openingStatement) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const scenarioId = `custom-${Date.now()}`;

    const scenarioData = {
      id: scenarioId,
      title,
      description,
      category,
      difficulty: difficulty || "medium",
      xpReward: xpReward || 100,
      tags: tags || [],
      customer: {
        name: customer.name,
        age: customer.age || 30,
        profession: customer.profession || "Professional",
        city: customer.city || "Mumbai",
        avatar: customer.avatar || customer.name.charAt(0).toUpperCase(),
        personality: customer.personality || "neutral",
        goal: customer.goal || "",
        archetype: customer.archetype || "General",
        moodInitial: customer.moodInitial || 5,
        hotButtons: customer.hotButtons || [],
        aiPersonaPrompt: customer.aiPersonaPrompt || `You are ${customer.name}, a ${customer.age}-year-old ${customer.profession} from ${customer.city}. ${customer.personality}. Your goal: ${customer.goal}.`,
      },
      openingStatement,
      steps: steps || [],
      evaluationRules: evaluationRules || [
        { skill: "Empathy", keywords: ["understand", "feel"], weight: 20 },
        { skill: "Product Knowledge", keywords: ["features", "benefits"], weight: 20 },
        { skill: "Needs Discovery", keywords: ["tell me", "understand"], weight: 20 },
        { skill: "Communication", keywords: ["clear", "explain"], weight: 20 },
        { skill: "Compliance", keywords: ["terms", "risk"], weight: 20 },
      ],
      complianceRules: complianceRules || {
        hardBanned: ["guaranteed returns", "no risk", "100% safe"],
        violationPenalty: 10,
        violationMessage: "Compliance violation detected!",
      },
    };

    const saved = await prisma.customScenario.create({
      data: {
        title,
        description,
        category,
        difficulty: difficulty || "medium",
        xpReward: xpReward || 100,
        data: scenarioData,
        createdBy: body.createdBy || "admin",
      },
    });

    return NextResponse.json({ id: saved.id, scenario: scenarioData });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Failed to create scenario" }, { status: 500 });
  }
}

// DELETE — deactivate a custom scenario
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await prisma.customScenario.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete scenario" }, { status: 500 });
  }
}
