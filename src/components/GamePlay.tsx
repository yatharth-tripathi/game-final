"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { checkCompliance, evaluatePerformance } from "@/lib/evaluator";
import type { EvaluationResult } from "@/lib/evaluator";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { SplitLayout } from "./SplitLayout";
import { TestMeInsights } from "./insights/TestMeInsights";
import { useVoice } from "@/hooks/useVoice";
import {
  Clock, Brain, Send,
  ChevronRight, AlertTriangle, ArrowLeft, Mic, MicOff, Volume2, VolumeX,
  Save, Square, Lightbulb,
} from "lucide-react";

// Timeout wrapper for fetch calls -- 12s to stay within Vercel's limits
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

  // Voice mode
  const voice = useVoice();

  // Sync voice transcript to input
  useEffect(() => {
    if (voice.isListening && voice.transcript) {
      setInput(voice.transcript);
    }
  }, [voice.transcript, voice.isListening]);

  // Timer -- stops when evaluating
  useEffect(() => {
    if (!startTime || isEvaluating) return;
    const interval = setInterval(() => setElapsedTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [startTime, setElapsedTime, isEvaluating]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Advance when step changes -- no objective shown in test mode (it's a test!)
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

  // Mood warning -- show warning when mood is very low but DON'T end the game
  // The game continues all rounds regardless of mood -- mood affects AI tone and final score
  useEffect(() => {
    if (!sc || isEvaluating || evaluationStarted.current) return;
    const currentMood = useGameStore.getState().mood;
    if (currentMood <= 1) {
      addMessage({
        role: "system",
        content: "CLIENT TRUST CRITICAL -- The customer is extremely frustrated. Focus on empathy and de-escalation to recover the conversation.",
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

  // Advance conversation after user responds -- wrapped in try-catch for crash safety
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
        const customerText = aiResponse.response || nextStep.text;
        addMessage({ role: "customer", content: customerText });
        voice.speak(customerText);

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

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-primary)";

  // Get current system step hint for the technique tip
  const currentSystemStep = sc.steps[currentStepIndex];
  const techniqueTip = currentSystemStep?.hints?.[0] || currentSystemStep?.expectedAction || null;

  // ── AI EVALUATING SCREEN ──
  if (isEvaluating) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="h-screen w-full flex flex-col items-center justify-center relative"
        style={{ background: "var(--bg-void)" }}
      >
        <div className="relative z-10 text-center max-w-sm px-6">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mx-auto mb-8 w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--bg-tint)", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
          >
            <Brain size={28} style={{ color: "var(--accent-primary)" }} />
          </motion.div>
          <h2 className="text-lg uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text-primary)" }}>
            AI Evaluation
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>{evalStatus}</p>
          <div className="flex items-center justify-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.12 }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent-primary)" }}
              />
            ))}
          </div>
          <div className="mt-8 mx-auto" style={{ width: 180 }}>
            <div className="progress-track" style={{ height: 2 }}>
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="h-full w-1/3 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── TOP BAR ──
  const topBar = (
    <div className="shrink-0 w-full relative z-10" style={{
      background: "#FFFFFF",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left: back + title + active badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => useGameStore.getState().resetGame()}
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              background: "var(--bg-surface)",
            }}
          >
            <ArrowLeft size={14} />
          </button>
          <div className="min-w-0">
            <p className="text-[15px] truncate" style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}>
              {sc.title}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--success)" }} />
              <span className="text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  background: "var(--success-bg)",
                  color: "var(--success)",
                }}>
                ACTIVE SIMULATION
              </span>
            </div>
          </div>
        </div>

        {/* Center: Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: "var(--bg-tint)", border: "1px solid var(--border)" }}>
          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, var(--success), var(--accent-primary))" }}>
            <Clock size={10} style={{ color: "#FFFFFF" }} />
          </div>
          <span className="text-sm font-bold tabular-nums" style={{
            fontFamily: "var(--font-mono)",
            color: "var(--text-primary)",
            letterSpacing: "0.05em",
          }}>
            {formatTime(elapsedTime)}
          </span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            className="btn-ghost hidden sm:inline-flex text-[11px] px-3 py-1.5 coming-soon items-center gap-1.5"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              background: "transparent",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            <Save size={12} />
            <span className="hidden md:inline">Save Progress</span>
          </button>
          {voice.isSupported && (
            <button
              onClick={voice.toggleVoice}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{
                border: "1px solid var(--border)",
                color: voice.voiceEnabled ? "var(--accent-primary)" : "var(--text-muted)",
                background: voice.voiceEnabled ? "var(--accent-primary-bg)" : "var(--bg-surface)",
              }}
            >
              {voice.voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
          )}
          <button
            onClick={handleEndEarly}
            className="text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
            style={{
              background: "var(--accent-primary)",
              color: "#FFFFFF",
              fontFamily: "var(--font-body)",
            }}
          >
            <Square size={9} fill="#FFFFFF" />
            <span className="hidden sm:inline">End Session</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ── CHAT AREA ──
  const chatArea = (
    <div className="w-full h-full relative" style={{ background: "var(--bg-void)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 relative z-10" style={{ minHeight: "100%" }}>
        {messages.map((msg) => (
          <motion.div key={msg.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 22 }}
          >
            {msg.role === "compliance" ? (
              /* ── Compliance Violation ── */
              <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="compliance-alert p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertTriangle size={12} style={{ color: "var(--danger)" }} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--danger)",
                  }}>
                    COMPLIANCE VIOLATION
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
              </motion.div>
            ) : msg.role === "system" ? (
              /* ── System / Mentor tip ── */
              <div className="chat-system p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Lightbulb size={11} style={{ color: "var(--accent-primary)" }} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--accent-primary)",
                  }}>
                    MENTOR TIP
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
              </div>
            ) : msg.role === "customer" ? (
              /* ── Customer Message (LEFT) ── */
              <div className="max-w-[95%] sm:max-w-[85%]">
                {/* Avatar + Name + Timestamp row */}
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #1e3a5f, #2d5f8a)",
                    }}>
                    <span className="text-[13px] font-bold" style={{
                      color: "#FFFFFF",
                      fontFamily: "var(--font-display)",
                    }}>
                      {sc.customer.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-[13px] font-bold" style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-primary)",
                  }}>
                    {sc.customer.name}
                  </span>
                  <span className="text-[11px]" style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                {/* Bubble */}
                <div className="chat-customer" style={{ marginLeft: 48, padding: "16px 20px" }}>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}>{msg.content}</p>
                </div>
              </div>
            ) : (
              /* ── User Message (RIGHT) ── */
              <div className="max-w-[95%] sm:max-w-[85%] ml-auto">
                {/* Timestamp + Name + Badge row (right-aligned) */}
                <div className="flex items-center gap-3 mb-1.5 justify-end">
                  <span className="text-[11px]" style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span className="text-[13px] font-bold" style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--accent-primary)",
                  }}>
                    You (Relationship Manager)
                  </span>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--accent-primary)",
                    }}>
                    <span className="text-[11px] font-bold" style={{
                      color: "#FFFFFF",
                      fontFamily: "var(--font-mono)",
                    }}>
                      RM
                    </span>
                  </div>
                </div>
                {/* Bubble */}
                <div className="chat-user" style={{ marginRight: 48, padding: "16px 20px" }}>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "#FFFFFF",
                    margin: 0,
                  }}>{msg.content}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1e3a5f, #2d5f8a)",
                  }}>
                  <span className="text-[13px] font-bold" style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                  }}>
                    {sc.customer.name.charAt(0)}
                  </span>
                </div>
                <span className="text-[13px] font-bold" style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-primary)",
                }}>
                  {sc.customer.name}
                </span>
                <span className="text-[11px]" style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                }}>
                  typing...
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full"
                style={{ marginLeft: 48, background: "#FFFFFF", border: "1px solid var(--border)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i}
                    animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    className="w-2 h-2 rounded-full" style={{ background: catColor }}
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
    <div className="w-full" style={{ background: "#FFFFFF", borderTop: "1px solid var(--border)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 pb-3 sm:pb-4 pt-3">
        {/* Rounded container */}
        <div className="relative transition-all flex items-end gap-2 sm:gap-3"
          style={{
            background: "var(--bg-surface)",
            border: `1px solid ${waitingForUser ? "var(--border-strong)" : "var(--border)"}`,
            borderRadius: 28,
            padding: "8px 8px 8px 16px",
          }}>
          {/* Mic button (left) */}
          {voice.isSupported && voice.voiceEnabled && (
            <button
              onClick={() => voice.isListening ? voice.stopListening() : voice.startListening()}
              disabled={!waitingForUser}
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${voice.isListening ? "mic-active" : ""}`}
              style={{
                background: voice.isListening ? "color-mix(in srgb, var(--danger) 10%, transparent)" : "transparent",
                border: voice.isListening ? "1.5px solid var(--danger)" : "1px solid var(--border)",
                color: voice.isListening ? "var(--danger)" : "var(--text-muted)",
              }}
            >
              {voice.isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          )}

          {/* Textarea (center) */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder={waitingForUser ? `Type your response to ${sc.customer.name}...` : "Waiting for client..."}
            disabled={!waitingForUser || isAdvancing}
            rows={1}
            aria-label="Your response as Relationship Manager"
            className="flex-1 resize-none text-sm leading-relaxed outline-none bg-transparent py-2.5"
            style={{
              color: "var(--text-primary)",
              opacity: waitingForUser ? 1 : 0.3,
              minHeight: 28,
              maxHeight: 150,
              fontFamily: "var(--font-body)",
            }}
          />

          {/* Send button (right) */}
          <motion.button
            onClick={() => { handleSend(); voice.stopListening(); voice.resetTranscript(); }}
            disabled={!waitingForUser || !input.trim() || isAdvancing}
            whileHover={waitingForUser && input.trim() ? { scale: 1.03 } : {}}
            whileTap={waitingForUser && input.trim() ? { scale: 0.97 } : {}}
            aria-label="Send response"
            className="shrink-0 h-10 px-6 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all text-[13px] font-semibold"
            style={{
              fontFamily: "var(--font-body)",
              background: input.trim() && waitingForUser ? "var(--accent-primary)" : "var(--bg-tint)",
              color: input.trim() && waitingForUser ? "#FFFFFF" : "var(--text-ghost)",
              border: input.trim() && waitingForUser ? "none" : "1px solid var(--border)",
            }}
          >
            <Send size={14} strokeWidth={2} />
            <span className="hidden sm:inline">Send Message</span>
          </motion.button>
        </div>

        {/* Technique tip below input */}
        {techniqueTip && waitingForUser && (
          <div className="flex items-center gap-2 mt-2 px-1">
            <Lightbulb size={10} style={{ color: "var(--accent-primary)", opacity: 0.6, flexShrink: 0 }} />
            <p className="text-[10px] italic" style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-muted)",
            }}>
              <span style={{ fontWeight: 600, fontStyle: "normal", color: "var(--text-secondary)" }}>TECHNIQUE TIP: </span>
              {techniqueTip}
            </p>
          </div>
        )}

        {/* Helper text */}
        <p className="text-center mt-1.5" style={{
          fontSize: 9,
          fontFamily: "var(--font-mono)",
          color: "var(--text-ghost)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          Press Enter to send. Shift+Enter for new line
        </p>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full">
      <SplitLayout
        topBar={topBar}
        insightsPanel={<TestMeInsights />}
        insightsPanelTitle="Live Analysis"
        bottomBar={bottomBar}
      >
        {chatArea}
      </SplitLayout>
    </motion.div>
  );
}
