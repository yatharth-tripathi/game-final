"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import { SplitLayout } from "./SplitLayout";
import { TryMeInsights } from "./insights/TryMeInsights";
import {
  ArrowLeft, ArrowUp, Clock, ChevronRight, MessageSquare, Target,
} from "lucide-react";

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 25000): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Timeout")), timeoutMs)),
  ]);
}

interface ChatMessage {
  id: string;
  role: "customer" | "user" | "system";
  content: string;
}

export function TryMe() {
  const { currentScenario: sc, resetGame, mood, updateMood } = useGameStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ended, setEnded] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [responseCount, setResponseCount] = useState(0);
  const [moodHistory, setMoodHistory] = useState<number[]>([]);
  const [coachingStep, setCoachingStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);
  const shownCoaching = useRef<Set<number>>(new Set());

  // Init mood history
  useEffect(() => {
    if (sc) setMoodHistory([sc.customer.moodInitial]);
  }, [sc]);

  // Timer
  useEffect(() => {
    if (ended) return;
    const interval = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [startTime, ended]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial customer message + first coaching objective
  useEffect(() => {
    if (!sc || initialized.current) return;
    initialized.current = true;

    const initMessages: ChatMessage[] = [
      { id: crypto.randomUUID(), role: "customer", content: sc.openingStatement },
    ];

    // Show first system objective as coaching
    const firstSystemStep = sc.steps.find(s => s.speaker === "system");
    if (firstSystemStep && !shownCoaching.current.has(0)) {
      shownCoaching.current.add(0);
      initMessages.push({
        id: crypto.randomUUID(),
        role: "system",
        content: firstSystemStep.text,
      });
    }

    setMessages(initMessages);
  }, [sc]);

  const fetchCustomerResponse = useCallback(async (userText: string) => {
    if (!sc) return;
    setIsTyping(true);

    try {
      const history = [...messages, { role: "user", content: userText }]
        .filter((m) => m.role === "customer" || m.role === "user")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetchWithTimeout("/api/tryme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          persona: sc.customer.aiPersonaPrompt,
          conversationHistory: history,
          currentMood: useGameStore.getState().mood,
          hotButtons: sc.customer.hotButtons,
        }),
      });

      const data = await res.json();
      let response = data.response || "I see...";
      if (response.length > 500) response = response.slice(0, 500);

      if (data.moodDelta) {
        updateMood(data.moodDelta);
        const currentMood = useGameStore.getState().mood;
        setMoodHistory(prev => [...prev, currentMood]);
      }

      const newMessages: ChatMessage[] = [{
        id: crypto.randomUUID(),
        role: "customer",
        content: response,
      }];

      // Show next coaching objective after customer responds
      const nextCoachingIdx = coachingStep + 1;
      const systemSteps = sc.steps.filter(s => s.speaker === "system");
      if (nextCoachingIdx < systemSteps.length && !shownCoaching.current.has(nextCoachingIdx)) {
        shownCoaching.current.add(nextCoachingIdx);
        newMessages.push({
          id: crypto.randomUUID(),
          role: "system",
          content: systemSteps[nextCoachingIdx].text,
        });
        setCoachingStep(nextCoachingIdx);
      }

      setMessages((prev) => [...prev, ...newMessages]);

      if (data.conversationEnd) {
        setTimeout(() => setEnded(true), 1000);
      }
    } catch {
      setMessages((prev) => [...prev, {
        id: crypto.randomUUID(),
        role: "customer",
        content: "I see... go on.",
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [sc, messages, updateMood]);

  const handleSend = () => {
    if (!input.trim() || isTyping || ended) return;
    const text = input.trim();
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    setMessages((prev) => [...prev, {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    }]);
    setResponseCount((c) => c + 1);

    setTimeout(() => fetchCustomerResponse(text), 300);
  };

  const handleEnd = () => {
    setEnded(true);
  };

  if (!sc) return null;
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const topBar = (
    <div className="shrink-0 w-full relative z-10 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button onClick={resetGame} className="btn-ghost shrink-0"><ArrowLeft size={12} /></button>
          <div className="min-w-0">
            <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{sc.title}</p>
            <p className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--warn)" }}>TRY ME — PRACTICE MODE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <Clock size={11} style={{ color: "var(--text-ghost)" }} />
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{formatTime(elapsed)}</span>
          </div>
          {!ended && (
            <button onClick={handleEnd} className="btn-ghost text-[10px] px-3 py-1">
              END SESSION
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const chatArea = (
    <div className="w-full h-full relative">
      <Particles count={4} />
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 relative z-10" style={{ minHeight: "100%" }}>
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 22 }}>
            {msg.role === "system" ? (
              <div className="chat-system p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Target size={12} style={{ color: "var(--accent-gold)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>COACHING</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                  {msg.content.replace("OBJECTIVE: ", "")}
                </p>
              </div>
            ) : msg.role === "customer" ? (
              <div className="max-w-[95%] sm:max-w-[85%]">
                <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ fontFamily: "var(--font-mono)", color: catColor }}>
                  {sc.customer.name}
                </p>
                <div className="chat-customer p-4">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
                </div>
              </div>
            ) : msg.role === "user" ? (
              <div className="max-w-[95%] sm:max-w-[85%] ml-auto">
                <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5 text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                  YOU (RM)
                </p>
                <div className="chat-user p-4">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{msg.content}</p>
                </div>
              </div>
            ) : null}
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5" style={{ fontFamily: "var(--font-mono)", color: catColor }}>{sc.customer.name}</p>
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    className="w-1.5 h-1.5 rounded-full" style={{ background: catColor }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );

  const bottomBar = ended ? (
    <div className="glass-panel px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap"
      style={{ borderTop: "1px solid var(--border)" }}>
      <button onClick={resetGame} className="btn-ghost px-6 py-2.5"><ArrowLeft size={12} /> LOBBY</button>
      <button onClick={() => {
        useGameStore.getState().setGameMode("testme");
        useGameStore.getState().selectScenario(sc);
      }} className="btn-gold px-8 py-2.5">
        TEST ME ON THIS <ChevronRight size={14} />
      </button>
    </div>
  ) : (
    <div className="w-full" style={{ background: "linear-gradient(180deg, transparent, var(--bg-void) 20%)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 pb-4 sm:pb-5 pt-2 sm:pt-3">
        <div className="relative rounded-xl" style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--accent-gold-border)",
          boxShadow: "0 0 20px rgba(37,99,235,0.06), 0 4px 24px rgba(0,0,0,0.08)",
        }}>
          <div className="flex items-end gap-2 sm:gap-3 px-3 sm:px-5 pt-3 sm:pt-4 pb-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 150) + "px"; }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Respond as Relationship Manager..."
              disabled={isTyping}
              rows={1}
              className="flex-1 resize-none text-sm leading-relaxed outline-none bg-transparent"
              style={{ color: "var(--text-primary)", minHeight: 28, maxHeight: 150, fontFamily: "var(--font-body)" }}
            />
            <motion.button onClick={handleSend} disabled={isTyping || !input.trim()}
              whileHover={input.trim() ? { scale: 1.03 } : {}}
              whileTap={input.trim() ? { scale: 0.97 } : {}}
              className="shrink-0 h-10 px-5 rounded-full flex items-center justify-center gap-2 mb-0.5 text-xs font-bold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-mono)",
                background: input.trim() ? "linear-gradient(135deg, var(--accent-primary), var(--accent-primary-glow))" : "var(--bg-elevated)",
                color: input.trim() ? "#FFFFFF" : "var(--text-secondary)",
              }}>
              SEND <ArrowUp size={14} strokeWidth={2.5} />
            </motion.button>
          </div>
          <div className="px-3 sm:px-5 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MessageSquare size={9} style={{ color: "var(--warn)" }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--warn)" }}>
                PRACTICE — No scoring
              </span>
            </div>
            <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>Shift+Enter for new line</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full">
      <SplitLayout
        topBar={topBar}
        insightsPanel={
          <TryMeInsights
            scenario={sc}
            mood={mood}
            moodHistory={moodHistory}
            responseCount={responseCount}
            coachingStep={coachingStep}
          />
        }
        insightsPanelTitle="PRACTICE COACH"
        bottomBar={bottomBar}
      >
        {chatArea}
      </SplitLayout>
    </motion.div>
  );
}
