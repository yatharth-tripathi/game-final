import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { buildShowMePrompt } from "@/lib/nexus-prompt";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { scenario } = await req.json();
    if (!scenario) return NextResponse.json({ error: "Missing scenario" }, { status: 400 });

    const systemPrompt = buildShowMePrompt(scenario);

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: "Generate the complete SHOW ME demonstration now. Return only JSON.",
      temperature: 0.7,
      maxOutputTokens: 8000,
    });

    let cleanText = text.trim();
    // Strip markdown code fences
    cleanText = cleanText.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    // Extract JSON object if needed
    if (!cleanText.startsWith("{")) {
      const match = cleanText.match(/\{[\s\S]*\}/);
      if (match) cleanText = match[0];
    }

    const result = JSON.parse(cleanText);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Show Me API error:", errMsg);
    return NextResponse.json({ error: "Failed to generate demonstration", details: errMsg }, { status: 500 });
  }
}
