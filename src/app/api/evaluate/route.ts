import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { buildEvaluatorPrompt } from "@/lib/nexus-prompt";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { scenario, userResponses, conversationHistory, moodTrajectory } = await req.json();

    if (!scenario || !userResponses || userResponses.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const conversation = conversationHistory
      .map((m: { role: string; content: string }) => `[${m.role.toUpperCase()}]: ${m.content}`)
      .join("\n");

    const systemPrompt = buildEvaluatorPrompt(scenario, conversation, userResponses, moodTrajectory);

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: "Evaluate the RM's performance now. Return only the JSON object. Be honest and specific.",
      temperature: 0.3,
      maxOutputTokens: 2000,
    });

    // Parse JSON from response
    let cleanText = text.trim();
    // Strip markdown code fences
    cleanText = cleanText.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    if (!cleanText.startsWith("{")) {
      const match = cleanText.match(/\{[\s\S]*\}/);
      if (match) cleanText = match[0];
    }

    const result = JSON.parse(cleanText);

    // Validate and clamp scores
    if (result.skills && Array.isArray(result.skills)) {
      for (const skill of result.skills) {
        const rule = scenario.evaluationRules.find(
          (r: { skill: string; weight: number }) => r.skill === skill.skill
        );
        if (rule) {
          skill.maxScore = rule.weight;
          skill.score = Math.max(0, Math.min(rule.weight, Math.round(skill.score)));
        }
      }
    }

    // Recalculate totals server-side (don't trust AI math)
    result.totalScore = result.skills.reduce(
      (s: number, sk: { score: number }) => s + sk.score, 0
    );
    result.maxScore = result.skills.reduce(
      (s: number, sk: { maxScore: number }) => s + sk.maxScore, 0
    );
    result.percentage = Math.round((result.totalScore / result.maxScore) * 100);

    if (result.percentage >= 95) result.grade = "S";
    else if (result.percentage >= 85) result.grade = "A";
    else if (result.percentage >= 70) result.grade = "B";
    else if (result.percentage >= 55) result.grade = "C";
    else if (result.percentage >= 40) result.grade = "D";
    else result.grade = "F";

    result.xpAwarded = result.percentage >= 90 ? 100
      : result.percentage >= 70 ? 70
      : result.percentage >= 50 ? 40 : 20;

    // Ensure arrays exist
    result.strengths = result.strengths || [];
    result.improvements = result.improvements || [];
    result.ghostResponses = result.ghostResponses || [];
    result.complianceViolations = result.complianceViolations || [];

    return NextResponse.json(result);
  } catch (error) {
    console.error("Evaluation API error:", error);
    return NextResponse.json(
      { error: "Evaluation failed", fallback: true },
      { status: 500 }
    );
  }
}
