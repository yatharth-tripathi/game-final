import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { buildTryMePrompt } from "@/lib/nexus-prompt";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { persona, conversationHistory, currentMood, hotButtons } = await req.json();

    if (!persona || !conversationHistory) {
      return NextResponse.json({ response: "I see.", moodDelta: 0 });
    }

    const historyText = conversationHistory
      .map((m: { role: string; content: string }) => {
        const label = m.role === "customer" ? "CLIENT" : m.role === "user" ? "RM" : "SYSTEM";
        return `[${label}]: ${m.content}`;
      })
      .join("\n");

    const systemPrompt = buildTryMePrompt(
      persona,
      currentMood,
      Array.isArray(hotButtons) ? hotButtons : hotButtons ? [hotButtons] : []
    );

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages: [
        { role: "user", content: `CONVERSATION SO FAR:\n${historyText}\n\nRespond as the client now. Stay in character.` },
      ],
      temperature: 0.75,
      maxOutputTokens: 250,
    });

    const lines = text.trim().split("\n");
    let moodDelta = 0;
    let conversationEnd = false;
    let response = text.trim();

    const moodLine = lines.find(l => l.trim().startsWith("MOOD_DELTA:"));
    if (moodLine) {
      moodDelta = Math.max(-3, Math.min(3, parseInt(moodLine.replace("MOOD_DELTA:", "").trim()) || 0));
    }

    const endLine = lines.find(l => l.trim().startsWith("CONVERSATION_END:"));
    if (endLine && endLine.includes("true")) {
      conversationEnd = true;
    }

    response = lines
      .filter(l => !l.trim().startsWith("MOOD_DELTA:") && !l.trim().startsWith("CONVERSATION_END:"))
      .join("\n").trim();

    if (response.startsWith('"') && response.endsWith('"')) {
      response = response.slice(1, -1);
    }

    response = response
      .replace(/^\[?(?:CLIENT|CUSTOMER|client|customer)\]?:\s*/i, "")
      .replace(/\(as (?:the|a) (?:customer|client|AI).*?\)/gi, "")
      .replace(/\[.*?breaks? character.*?\]/gi, "")
      .trim();

    if (response.length > 500) response = response.slice(0, 500);
    if (response.length < 3) response = "I see... go on.";

    return NextResponse.json({ response, moodDelta, conversationEnd });
  } catch (error) {
    console.error("Try Me API error:", error);
    return NextResponse.json({ response: "I see... go on.", moodDelta: 0, conversationEnd: false });
  }
}
