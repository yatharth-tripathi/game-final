"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { checkCompliance, evaluatePerformance } from "@/lib/evaluator";
import type { EvaluationResult } from "@/lib/evaluator";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import { SplitLayout } from "./SplitLayout";
import { TestMeInsights } from "./insights/TestMeInsights";
import {
  Clock, Briefcase, Brain, Target, ArrowUp,
  ChevronRight, AlertTriangle, ArrowLeft,
} from "lucide-react";

// Timeout wrapper for fetch calls — 12s to stay within Vercel's limits
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export function GamePlay() {
  const store = useGameStore();
  const {
    currentScenario: sc, currentStepIndex, messages, userResponses,
    startTime, elapsedTime, mood, complianceViolations, isAdvancing,
    addMessage, submitResponse, advanceStep, setEvaluation,
    setElapsedTime, updateMood, addComplianceViolation, setAdvancing,
  } = store;

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForUser, setWaitingForUser] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalStatus, setEvalStatus] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const evaluationStarted = useRef(false);
  const shownSystemSteps = useRef<Set<number>>(new Set());

  // Timer — stops when evaluating
  useEffect(() => {
    if (!startTime || isEvaluating) return;
    const interval = setInterval(() => setElapsedTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [startTime, setElapsedTime, isEvaluating]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Advance when step changes — no objective shown in test mode (it's a test!)
  useEffect(() => {
    if (!sc) return;
    const step = sc.steps[currentStepIndex];
    if (step && step.speaker === "system" && !shownSystemSteps.current.has(currentStepIndex)) {
      shownSystemSteps.current.add(currentStepIndex);
      setTimeout(() => {
        setWaitingForUser(true);
      }, 800);
    }
  }, [currentStepIndex, sc]);

  // Auto-focus input
  useEffect(() => {
    if (waitingForUser) inputRef.current?.focus();
  }, [waitingForUser]);

  // Fetch AI customer response with timeout + fallback
  // Reads messages from store directly (not closure) to avoid stale data
  const fetchAICustomerResponse = useCallback(async (
    fallbackText: string, stepContext: string
  ): Promise<{ response: string; moodDelta: number }> => {
    if (!sc) return { response: fallbackText, moodDelta: 0 };
    try {
      // Read fresh messages from store, not stale closure
      const freshMessages = useGameStore.getState().messages;
      const conversationHistory = freshMessages
        .filter((m: { role: string }) => m.role === "customer" || m.role === "user")
        .slice(-8) // Only last 8 messages to keep API fast
        .map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }));

      const res = await fetchWithTimeout("/api/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: sc.customer.aiPersonaPrompt,
          conversationHistory,
          stepContext,
          currentMood: useGameStore.getState().mood,
          fallbackText,
          hotButtons: sc.customer.hotButtons,
        }),
      });

      if (!res.ok) throw new Error("Customer AI failed");
      const data = await res.json();

      let response = data?.response || fallbackText;
      if (typeof response !== "string") response = fallbackText;
      if (response.length > 500) response = response.slice(0, 500);

      const moodDelta = typeof data?.moodDelta === "number"
        ? Math.max(-3, Math.min(3, data.moodDelta))
        : 0;

      return { response, moodDelta };
    } catch {
      return { response: fallbackText, moodDelta: 0 };
    }
  }, [sc]);

  // Run evaluation (AI + fallback)
  const runEvaluation = useCallback(async (responses: string[]) => {
    if (!sc || evaluationStarted.current) return;
    evaluationStarted.current = true;
    setIsEvaluating(true);
    setEvalStatus("Connecting to AI evaluator...");

    // Read fresh messages from store
    const freshMessages = useGameStore.getState().messages;
    const conversationHistory = freshMessages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content }));
    const currentViolations = useGameStore.getState().complianceViolations;

    try {
      setEvalStatus("AI is analyzing your performance...");
      const res = await fetchWithTimeout("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: {
            title: sc.title,
            category: sc.category,
            difficulty: sc.difficulty,
            customer: sc.customer,
            evaluationRules: sc.evaluationRules,
            complianceRules: sc.complianceRules,
          },
          userResponses: responses,
          conversationHistory: conversationHistory.slice(-20),
          moodTrajectory: `Start: ${sc.customer.moodInitial}/10 → End: ${useGameStore.getState().mood}/10`,
        }),
      }, 15000);

      if (!res.ok) throw new Error("API failed");
      const text = await res.text();

      let aiResult;
      try {
        aiResult = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response from AI");
      }

      if (aiResult.error) throw new Error(aiResult.error);

      setEvalStatus("Generating debrief report...");
      await new Promise((r) => setTimeout(r, 600));

      const violationObjects = currentViolations.map(v => ({
        phrase: v,
        message: sc.complianceRules.violationMessage,
        penalty: sc.complianceRules.violationPenalty,
      }));

      let adjustedScore = aiResult.totalScore || 0;
      const totalPenalty = violationObjects.reduce((s, v) => s + v.penalty, 0);
      adjustedScore = Math.max(0, adjustedScore - totalPenalty);
      const adjustedMax = aiResult.maxScore || 100;
      const adjustedPct = Math.round((adjustedScore / adjustedMax) * 100);

      let grade = "F";
      if (adjustedPct >= 95) grade = "S";
      else if (adjustedPct >= 85) grade = "A";
      else if (adjustedPct >= 70) grade = "B";
      else if (adjustedPct >= 55) grade = "C";
      else if (adjustedPct >= 40) grade = "D";

      const xpAwarded = adjustedPct >= 90 ? 100 : adjustedPct >= 70 ? 70 : adjustedPct >= 50 ? 40 : 20;

      const result: EvaluationResult = {
        totalScore: adjustedScore,
        maxScore: adjustedMax,
        percentage: adjustedPct,
        grade,
        skills: aiResult.skills || [],
        overallFeedback: aiResult.overallFeedback || "",
        strengths: aiResult.strengths || [],
        improvements: aiResult.improvements || [],
        complianceViolations: violationObjects,
        bestMoment: aiResult.bestMoment || "",
        worstMoment: aiResult.worstMoment || "",
        ghostResponses: aiResult.ghostResponses || [],
        moodAnalysis: aiResult.moodAnalysis || "",
        nextRecommendation: aiResult.nextRecommendation || "",
        xpAwarded,
        evaluatedBy: "ai",
      };
      setEvaluation(result);
    } catch (err) {
      console.error("AI evaluation failed, using rule-based:", err);
      setEvalStatus("Using rule-based evaluation...");
      await new Promise((r) => setTimeout(r, 800));
      const result = evaluatePerformance(responses, sc.evaluationRules, sc.complianceRules);
      setEvaluation(result);
    }
  }, [sc, setEvaluation]);

  // Mood warning — show warning when mood is very low but DON'T end the game
  // The game continues all rounds regardless of mood — mood affects AI tone and final score
  useEffect(() => {
    if (!sc || isEvaluating || evaluationStarted.current) return;
    const currentMood = useGameStore.getState().mood;
    if (currentMood <= 1) {
      addMessage({
        role: "system",
        content: "⚠ CLIENT TRUST CRITICAL — The customer is extremely frustrated. Focus on empathy and de-escalation to recover the conversation.",
      });
    }
  }, [mood, sc, isEvaluating, addMessage]);

  // Force-end the conversation and trigger evaluation
  const handleEndEarly = useCallback(() => {
    const responses = [...useGameStore.getState().userResponses];
    if (responses.length > 0 && !evaluationStarted.current) {
      runEvaluation(responses);
    }
  }, [runEvaluation]);

  // Advance conversation after user responds — wrapped in try-catch for crash safety
  const advanceConversation = useCallback(async () => {
    if (!sc || useGameStore.getState().isAdvancing) return;
    setAdvancing(true);

    try {
      const currentIndex = useGameStore.getState().currentStepIndex;
      const nextIndex = currentIndex + 1;

      if (nextIndex >= sc.steps.length) {
        const responses = [...useGameStore.getState().userResponses];
        setTimeout(() => runEvaluation(responses), 800);
        return;
      }

      advanceStep();
      const nextStep = sc.steps[nextIndex];

      if (!nextStep) {
        // Safety: if step is missing, trigger evaluation
        const responses = [...useGameStore.getState().userResponses];
        setTimeout(() => runEvaluation(responses), 800);
        return;
      }

      if (nextStep.speaker === "customer") {
        setIsTyping(true);
        setWaitingForUser(false);

        let aiResponse: { response: string; moodDelta: number };
        try {
          aiResponse = await fetchAICustomerResponse(nextStep.text, nextStep.text);
        } catch {
          aiResponse = { response: nextStep.text, moodDelta: 0 };
        }

        if (aiResponse.moodDelta !== 0) {
          updateMood(aiResponse.moodDelta);
        }

        setIsTyping(false);
        addMessage({ role: "customer", content: aiResponse.response || nextStep.text });

        const systemStepIndex = nextIndex + 1;
        if (systemStepIndex < sc.steps.length && sc.steps[systemStepIndex]?.speaker === "system") {
          advanceStep();
          setTimeout(() => {
            setWaitingForUser(true);
            setAdvancing(false);
          }, 600);
        } else if (systemStepIndex >= sc.steps.length) {
          const responses = [...useGameStore.getState().userResponses];
          setTimeout(() => runEvaluation(responses), 800);
        } else {
          setWaitingForUser(true);
          setAdvancing(false);
        }
      } else if (nextStep.speaker === "system") {
        setTimeout(() => {
          addMessage({ role: "system", content: nextStep.text, stepIndex: nextIndex });
          setWaitingForUser(true);
          setAdvancing(false);
        }, 500);
      }
    } catch (err) {
      console.error("advanceConversation error:", err);
      // Recover: re-enable input so user isn't stuck
      setIsTyping(false);
      setWaitingForUser(true);
      setAdvancing(false);
    }
  }, [sc, advanceStep, runEvaluation, fetchAICustomerResponse, updateMood, addMessage, setAdvancing]);

  const handleSend = () => {
    try {
      if (!input.trim() || !waitingForUser || !sc || useGameStore.getState().isAdvancing) return;
      const response = input.trim();
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";

      const violations = checkCompliance([response], sc.complianceRules);
      if (violations.length > 0) {
        const existingViolations = useGameStore.getState().complianceViolations;
        for (const v of violations) {
          if (!existingViolations.includes(v.phrase)) {
            addComplianceViolation(v.phrase);
          }
        }
        addMessage({ role: "compliance", content: violations[0].message });
        updateMood(-2);
      }

      addMessage({ role: "user", content: response });
      submitResponse(response);
      setWaitingForUser(false);
      setTimeout(() => advanceConversation(), 400);
    } catch (err) {
      console.error("handleSend error:", err);
      setWaitingForUser(true);
      setAdvancing(false);
    }
  };

  if (!sc) return null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";

  // ── AI EVALUATING SCREEN ──
  if (isEvaluating) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="h-screen w-full flex flex-col items-center justify-center relative"
        style={{ background: "var(--bg-void)" }}
      >
        <Particles count={10} />
        <div className="relative z-10 text-center max-w-sm px-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="mx-auto mb-8" style={{ width: 80, height: 80 }}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: "conic-gradient(var(--accent-gold), var(--accent-gold-glow), var(--accent-gold-dim), var(--accent-gold))", padding: 3 }}>
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "var(--bg-void)" }}>
                <Brain size={28} style={{ color: "var(--accent-gold)" }} />
              </div>
            </div>
          </motion.div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            AI Evaluation
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>{evalStatus}</p>
          <div className="flex items-center justify-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.12 }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-gold)" }}
              />
            ))}
          </div>
          <div className="mt-8 mx-auto" style={{ width: 180 }}>
            <div className="progress-track" style={{ height: 2 }}>
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-full w-1/3 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── TOP BAR (simplified — mood/compliance/progress moved to insights) ──
  const topBar = (
    <div className="shrink-0 w-full relative z-10 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button onClick={() => useGameStore.getState().resetGame()} className="btn-ghost shrink-0 px-2 py-1">
            <ArrowLeft size={12} />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{sc.title}</p>
            <p className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>vs {sc.customer.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: "var(--text-ghost)" }} />
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatTime(elapsedTime)}</span>
          </div>
          <button
            onClick={handleEndEarly}
            className="btn-ghost text-[9px] px-2 sm:px-3 py-1"
            style={{ color: "var(--danger)" }}
          >
            SUBMIT & END
          </button>
        </div>
      </div>
    </div>
  );

  // ── CHAT AREA ──
  const chatArea = (
    <div className="w-full h-full relative">
      <Particles count={4} />
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 relative z-10" style={{ minHeight: "100%" }}>
        {messages.filter(m => m.role !== "system").map((msg) => (
          <motion.div key={msg.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 22 }}
          >
            {msg.role === "compliance" ? (
              <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="compliance-alert p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertTriangle size={12} style={{ color: "var(--danger)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "var(--danger)" }}>COMPLIANCE VIOLATION</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
              </motion.div>
            ) : msg.role === "customer" ? (
              <div className="max-w-[95%] sm:max-w-[85%]">
                <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ fontFamily: "var(--font-mono)", color: catColor }}>{sc.customer.name}</p>
                <div className="chat-customer p-4">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
                </div>
              </div>
            ) : (
              <div className="max-w-[95%] sm:max-w-[85%] ml-auto">
                <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5 text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>YOU (RM)</p>
                <div className="chat-user p-4">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ fontFamily: "var(--font-mono)", color: catColor }}>{sc.customer.name}</p>
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i}
                    animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );

  // ── BOTTOM INPUT ──
  const bottomBar = (
    <div className="w-full" style={{ background: "linear-gradient(180deg, transparent, var(--bg-void) 20%)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 pb-4 sm:pb-5 pt-2 sm:pt-3">
        <div className="relative rounded-xl transition-all"
          style={{
            background: "var(--bg-surface)",
            border: `1px solid ${waitingForUser ? "var(--accent-gold-border)" : "var(--border)"}`,
            boxShadow: waitingForUser ? "0 0 20px rgba(37,99,235,0.06), 0 4px 24px rgba(0,0,0,0.08)" : "0 4px 24px rgba(0,0,0,0.06)",
          }}>
          <div className="flex items-end gap-2 sm:gap-3 px-3 sm:px-5 pt-3 sm:pt-4 pb-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px"; }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder={waitingForUser ? "Respond as Relationship Manager..." : "Waiting for client..."}
              disabled={!waitingForUser || isAdvancing}
              rows={1}
              aria-label="Your response as Relationship Manager"
              className="flex-1 resize-none text-sm leading-relaxed outline-none bg-transparent"
              style={{ color: "var(--text-primary)", opacity: waitingForUser ? 1 : 0.3, minHeight: 28, maxHeight: 150, fontFamily: "var(--font-body)" }}
            />
            <motion.button
              onClick={handleSend}
              disabled={!waitingForUser || !input.trim() || isAdvancing}
              whileHover={waitingForUser && input.trim() ? { scale: 1.03 } : {}}
              whileTap={waitingForUser && input.trim() ? { scale: 0.97 } : {}}
              aria-label="Send response"
              className="shrink-0 h-10 px-5 rounded-full flex items-center justify-center gap-2 transition-all mb-0.5 text-xs font-bold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                background: input.trim() && waitingForUser ? "linear-gradient(135deg, var(--accent-primary), var(--accent-primary-glow))" : "var(--bg-elevated)",
                color: input.trim() && waitingForUser ? "#FFFFFF" : "var(--text-secondary)",
              }}
            >
              SEND <ArrowUp size={14} strokeWidth={2.5} />
            </motion.button>
          </div>
          <div className="px-3 sm:px-5 pb-3 flex items-center justify-between">
            {waitingForUser ? (
              <div className="flex items-center gap-1.5">
                <ChevronRight size={9} style={{ color: "var(--success)" }} />
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>Your turn</span>
              </div>
            ) : (
              <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                {isTyping ? "Client is responding..." : "Processing..."}
              </span>
            )}
            <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>Shift+Enter for new line</span>
          </div>
        </div>
        <p className="text-center text-[8px] mt-2.5 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", opacity: 0.4 }}>
          AI-powered simulation
        </p>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full">
      <SplitLayout
        topBar={topBar}
        insightsPanel={<TestMeInsights />}
        insightsPanelTitle="LIVE ANALYSIS"
        bottomBar={bottomBar}
      >
        {chatArea}
      </SplitLayout>
    </motion.div>
  );
}
