"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { checkCompliance, evaluatePerformance } from "@/lib/evaluator";
import type { EvaluationResult } from "@/lib/evaluator";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  Lightbulb, Clock, Briefcase, Brain, Target, ArrowUp,
  ChevronRight, AlertTriangle, Shield,
} from "lucide-react";

// Timeout wrapper for fetch calls
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 25000): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
    ),
  ]);
}

export function GamePlay() {
  const store = useGameStore();
  const {
    currentScenario: sc, currentStepIndex, messages, userResponses,
    startTime, elapsedTime, mood, complianceViolations, isAdvancing,
    showHints, addMessage, submitResponse, advanceStep, setEvaluation,
    setElapsedTime, updateMood, addComplianceViolation, setAdvancing,
    toggleHints,
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

  // Show system objective message when step changes — ref prevents duplicates
  useEffect(() => {
    if (!sc) return;
    const step = sc.steps[currentStepIndex];
    if (step && step.speaker === "system" && !shownSystemSteps.current.has(currentStepIndex)) {
      shownSystemSteps.current.add(currentStepIndex);
      setTimeout(() => {
        addMessage({ role: "system", content: step.text, stepIndex: currentStepIndex });
        setWaitingForUser(true);
      }, 800);
    }
  }, [currentStepIndex, sc, addMessage]);

  // Auto-focus input
  useEffect(() => {
    if (waitingForUser) inputRef.current?.focus();
  }, [waitingForUser]);

  // Fetch AI customer response with timeout + fallback
  const fetchAICustomerResponse = useCallback(async (
    fallbackText: string, stepContext: string
  ): Promise<{ response: string; moodDelta: number }> => {
    if (!sc) return { response: fallbackText, moodDelta: 0 };
    try {
      const conversationHistory = messages
        .filter(m => m.role === "customer" || m.role === "user")
        .map(m => ({ role: m.role, content: m.content }));

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

      // Validate response length
      let response = data.response || fallbackText;
      if (response.length > 500) response = response.slice(0, 500);

      const moodDelta = typeof data.moodDelta === "number"
        ? Math.max(-3, Math.min(3, data.moodDelta))
        : 0;

      return { response, moodDelta };
    } catch {
      return { response: fallbackText, moodDelta: 0 };
    }
  }, [sc, messages]);

  // Run evaluation (AI + fallback)
  const runEvaluation = useCallback(async (responses: string[]) => {
    if (!sc || evaluationStarted.current) return;
    evaluationStarted.current = true;
    setIsEvaluating(true);
    setEvalStatus("Connecting to AI evaluator...");

    const conversationHistory = messages.map((m) => ({ role: m.role, content: m.content }));
    const currentViolations = useGameStore.getState().complianceViolations;

    try {
      setEvalStatus("AI is analyzing your performance...");
      const res = await fetchWithTimeout("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: sc,
          userResponses: responses,
          conversationHistory,
          moodTrajectory: `Start: ${sc.customer.moodInitial}/10 → End: ${useGameStore.getState().mood}/10`,
        }),
      }, 30000);

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

      // Build compliance violations array
      const violationObjects = currentViolations.map(v => ({
        phrase: v,
        message: sc.complianceRules.violationMessage,
        penalty: sc.complianceRules.violationPenalty,
      }));

      // Apply compliance penalty to AI score
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
  }, [sc, messages, setEvaluation]);

  // Mood-triggered abandon — customer walks away if mood drops to 1
  useEffect(() => {
    if (!sc || isEvaluating || evaluationStarted.current) return;
    const currentMood = useGameStore.getState().mood;
    if (currentMood <= 1) {
      addMessage({
        role: "customer",
        content: "You know what? I've had enough. I'm done talking to you. I'll take my business elsewhere.",
      });
      setTimeout(() => {
        const responses = [...useGameStore.getState().userResponses];
        if (responses.length > 0) {
          runEvaluation(responses);
        }
      }, 1500);
    }
  }, [mood, sc, isEvaluating, addMessage, runEvaluation]);

  // Advance conversation after user responds
  const advanceConversation = useCallback(async () => {
    if (!sc || useGameStore.getState().isAdvancing) return;
    setAdvancing(true);

    const currentIndex = useGameStore.getState().currentStepIndex;
    const nextIndex = currentIndex + 1;

    if (nextIndex >= sc.steps.length) {
      const responses = [...useGameStore.getState().userResponses];
      setTimeout(() => runEvaluation(responses), 800);
      return;
    }

    advanceStep(); // currentStepIndex = nextIndex now
    const nextStep = sc.steps[nextIndex];

    if (nextStep.speaker === "customer") {
      setIsTyping(true);
      setWaitingForUser(false);

      // AI-generated customer response
      const aiResponse = await fetchAICustomerResponse(nextStep.text, nextStep.text);

      // Apply mood delta using functional update (no stale closure)
      if (aiResponse.moodDelta !== 0) {
        updateMood(aiResponse.moodDelta);
      }

      setIsTyping(false);
      addMessage({ role: "customer", content: aiResponse.response });

      // Check if next step after customer is a system objective
      const systemStepIndex = nextIndex + 1;
      if (systemStepIndex < sc.steps.length && sc.steps[systemStepIndex].speaker === "system") {
        advanceStep(); // Move to system step — useEffect will handle adding the system message
        setTimeout(() => {
          setWaitingForUser(true);
          setAdvancing(false);
        }, 600);
      } else if (systemStepIndex >= sc.steps.length) {
        // No more steps after this customer message — evaluate
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
  }, [sc, advanceStep, runEvaluation, fetchAICustomerResponse, updateMood, addMessage, setAdvancing]);

  const handleSend = () => {
    if (!input.trim() || !waitingForUser || !sc || useGameStore.getState().isAdvancing) return;
    const response = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    // Compliance check BEFORE anything else
    const violations = checkCompliance([response], sc.complianceRules);
    if (violations.length > 0) {
      // Only add unique violations
      const existingViolations = useGameStore.getState().complianceViolations;
      for (const v of violations) {
        if (!existingViolations.includes(v.phrase)) {
          addComplianceViolation(v.phrase);
        }
      }
      addMessage({ role: "compliance", content: violations[0].message });
      updateMood(-2); // Functional update, no stale closure
    }

    addMessage({ role: "user", content: response });
    submitResponse(response);
    setWaitingForUser(false);
    setTimeout(() => advanceConversation(), 400);
  };

  if (!sc) return null;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const tasksTotal = sc.steps.filter((s) => s.speaker === "system").length;
  const tasksCompleted = userResponses.length;
  const currentSystemStep = sc.steps.filter(s => s.speaker === "system")[tasksCompleted];
  const currentHints = currentSystemStep?.hints || [];
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative"
    >
      <Particles count={4} />

      {/* TOP BAR */}
      <div className="shrink-0 w-full relative z-10 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase size={13} style={{ color: "var(--accent-gold)" }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{sc.title}</p>
              <p className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>vs {sc.customer.name}</p>
            </div>
          </div>

          {/* Mood Meter */}
          <div className="flex items-center gap-3" role="meter" aria-label={`Client trust level: ${mood} out of 10`}>
            <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>Client Trust</span>
            <div className="w-20 mood-bar">
              <div className="mood-fill" style={{ width: `${mood * 10}%`, background: moodColor }} />
            </div>
            <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: moodColor }}>{mood}/10</span>
          </div>

          {/* Progress + Compliance + Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                {Math.min(tasksCompleted + 1, tasksTotal)}/{tasksTotal}
              </span>
              {Array.from({ length: tasksTotal }).map((_, i) => (
                <div key={i} style={{
                  width: i === tasksCompleted ? 22 : 14, height: 4, borderRadius: 2,
                  background: i < tasksCompleted ? "var(--success)" : i === tasksCompleted ? "var(--accent-gold)" : "var(--border)",
                  boxShadow: i === tasksCompleted ? "0 0 8px var(--accent-gold)" : "none",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
            <div className="flex items-center gap-1.5" aria-label={complianceViolations.length > 0 ? "Compliance violation detected" : "Compliance clear"}>
              <Shield size={10} style={{ color: complianceViolations.length > 0 ? "var(--danger)" : "var(--success)" }} />
              <span className={`dot ${complianceViolations.length > 0 ? "dot-danger" : "dot-success"}`} />
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} style={{ color: "var(--text-ghost)" }} />
              <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 w-full overflow-y-auto relative z-10">
        <div className="w-full max-w-2xl mx-auto px-8 py-6 space-y-4" style={{ minHeight: "100%" }}>
          {messages.map((msg) => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 22 }}
            >
              {msg.role === "system" ? (
                <div className="chat-system p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Target size={12} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>YOUR OBJECTIVE</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                    {msg.content.replace("OBJECTIVE: ", "")}
                  </p>
                </div>
              ) : msg.role === "compliance" ? (
                <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="compliance-alert p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertTriangle size={12} style={{ color: "var(--danger)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "var(--danger)" }}>COMPLIANCE VIOLATION</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
                </motion.div>
              ) : msg.role === "customer" ? (
                <div className="max-w-[85%]">
                  <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ fontFamily: "var(--font-mono)", color: catColor }}>{sc.customer.name}</p>
                  <div className="chat-customer p-4">
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-[85%] ml-auto">
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

      {/* BOTTOM INPUT */}
      <div className="shrink-0 w-full relative z-10" style={{ background: "linear-gradient(180deg, transparent, var(--bg-void) 20%)" }}>
        <div className="w-full max-w-2xl mx-auto px-6 pb-5 pt-3">
          {/* Hints toggle */}
          {waitingForUser && currentHints.length > 0 && (
            <button
              onClick={toggleHints}
              className="flex items-center gap-1.5 mb-2 text-[10px] px-3 py-1 rounded-full transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                color: showHints ? "var(--warn)" : "var(--text-ghost)",
                background: showHints ? "var(--warn-bg)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${showHints ? "rgba(214,158,46,0.2)" : "var(--border)"}`,
              }}
            >
              <Lightbulb size={10} /> {showHints ? "HIDE HINTS" : "SHOW HINTS"}
            </button>
          )}

          <AnimatePresence>
            {waitingForUser && showHints && currentHints.length > 0 && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Lightbulb size={10} style={{ color: "var(--warn)", flexShrink: 0 }} />
                  {currentHints.map((hint, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full"
                      style={{ background: "var(--warn-bg)", color: "var(--warn)", border: "1px solid rgba(214,158,46,0.15)" }}>
                      {hint}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative rounded-xl transition-all"
            style={{
              background: "var(--bg-surface)",
              border: `1px solid ${waitingForUser ? "var(--accent-gold-border)" : "var(--border)"}`,
              boxShadow: waitingForUser ? "0 0 20px rgba(201,168,76,0.04), 0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(0,0,0,0.4)",
            }}>
            <div className="flex items-end gap-3 px-5 pt-4 pb-2">
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
                whileHover={waitingForUser && input.trim() ? { scale: 1.1 } : {}}
                whileTap={waitingForUser && input.trim() ? { scale: 0.9 } : {}}
                aria-label="Send response"
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all mb-0.5"
                style={{
                  background: input.trim() && waitingForUser ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "rgba(255,255,255,0.04)",
                  color: input.trim() && waitingForUser ? "var(--bg-void)" : "var(--text-ghost)",
                }}
              >
                <ArrowUp size={16} strokeWidth={2.5} />
              </motion.button>
            </div>
            <div className="px-5 pb-3 flex items-center justify-between">
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
    </motion.div>
  );
}
