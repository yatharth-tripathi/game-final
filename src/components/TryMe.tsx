"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { uuid } from "@/lib/utils";
import { SplitLayout } from "./SplitLayout";
import { TryMeInsights } from "./insights/TryMeInsights";
import { useVoice } from "@/hooks/useVoice";
import {
  ArrowLeft, Clock, ChevronRight, Send, Target,
  Mic, MicOff, Volume2, VolumeX, Square,
} from "lucide-react";

function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

interface ChatMessage {
  id: string;
  role: "customer" | "user" | "system";
  content: string;
  timestamp: number;
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

  // Voice mode
  const voice = useVoice();

  useEffect(() => {
    if (voice.isListening && voice.transcript) {
      setInput(voice.transcript);
    }
  }, [voice.transcript, voice.isListening]);

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
      { id: uuid(), role: "customer", content: sc.openingStatement, timestamp: Date.now() },
    ];

    // Show first system objective as coaching
    const firstSystemStep = sc.steps.find(s => s.speaker === "system");
    if (firstSystemStep && !shownCoaching.current.has(0)) {
      shownCoaching.current.add(0);
      initMessages.push({
        id: uuid(),
        role: "system",
        content: firstSystemStep.text,
        timestamp: Date.now(),
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
        .slice(-8)
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

      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      let response = data?.response || "I see...";
      if (response.length > 500) response = response.slice(0, 500);

      if (data.moodDelta) {
        updateMood(data.moodDelta);
        const currentMood = useGameStore.getState().mood;
        setMoodHistory(prev => [...prev, currentMood]);
      }

      voice.speak(response);

      const newMessages: ChatMessage[] = [{
        id: uuid(),
        role: "customer",
        content: response,
        timestamp: Date.now(),
      }];

      // Show next coaching objective after customer responds
      const nextCoachingIdx = coachingStep + 1;
      const systemSteps = sc.steps.filter(s => s.speaker === "system");
      if (nextCoachingIdx < systemSteps.length && !shownCoaching.current.has(nextCoachingIdx)) {
        shownCoaching.current.add(nextCoachingIdx);
        newMessages.push({
          id: uuid(),
          role: "system",
          content: systemSteps[nextCoachingIdx].text,
          timestamp: Date.now(),
        });
        setCoachingStep(nextCoachingIdx);
      }

      setMessages((prev) => [...prev, ...newMessages]);

      if (data.conversationEnd) {
        setTimeout(() => setEnded(true), 1000);
      }
    } catch {
      setMessages((prev) => [...prev, {
        id: uuid(),
        role: "customer",
        content: "I see... go on.",
        timestamp: Date.now(),
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
      id: uuid(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    }]);
    setResponseCount((c) => c + 1);

    setTimeout(() => fetchCustomerResponse(text), 300);
  };

  const handleEnd = () => {
    setEnded(true);
  };

  if (!sc) return null;
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-primary)";
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  // ── TOP BAR ──
  const topBar = (
    <div className="shrink-0 w-full relative z-10" style={{
      background: "#FFFFFF",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left: back + title + practice badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={resetGame}
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
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--warn)" }} />
              <span className="text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  background: "var(--warn-bg)",
                  color: "var(--warn)",
                }}>
                PRACTICE MODE
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
            {formatTime(elapsed)}
          </span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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
          {!ended && (
            <button
              onClick={handleEnd}
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
          )}
        </div>
      </div>
    </div>
  );

  // ── CHAT AREA ──
  const chatArea = (
    <div className="w-full h-full relative" style={{ background: "var(--bg-void)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 relative z-10" style={{ minHeight: "100%" }}>
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 22 }}>
            {msg.role === "system" ? (
              /* ── Coaching / System message ── */
              <div className="chat-system p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Target size={12} style={{ color: "var(--accent-primary)" }} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--accent-primary)",
                  }}>COACHING</span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
                  {msg.content.replace("OBJECTIVE: ", "")}
                </p>
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
            ) : msg.role === "user" ? (
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
                    You (Trainee)
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
            ) : null}
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
  const bottomBar = ended ? (
    <div className="w-full" style={{ background: "#FFFFFF", borderTop: "1px solid var(--border)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <button onClick={resetGame} className="btn-ghost px-6 py-2.5"><ArrowLeft size={12} /> Back to Lobby</button>
        <button onClick={() => {
          useGameStore.getState().setGameMode("testme");
          useGameStore.getState().selectScenario(sc);
        }} className="btn-gold px-8 py-2.5">
          Test Me on This <ChevronRight size={14} />
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full" style={{ background: "#FFFFFF", borderTop: "1px solid var(--border)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 pb-3 sm:pb-4 pt-3">
        {/* Rounded container */}
        <div className="relative transition-all flex items-end gap-2 sm:gap-3"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 28,
            padding: "8px 8px 8px 16px",
          }}>
          {/* Mic button (left) */}
          {voice.isSupported && voice.voiceEnabled && (
            <button
              onClick={() => voice.isListening ? voice.stopListening() : voice.startListening()}
              disabled={isTyping}
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
            placeholder={`Type your response to ${sc.customer.name}...`}
            disabled={isTyping}
            rows={1}
            aria-label="Your response as Relationship Manager"
            className="flex-1 resize-none text-sm leading-relaxed outline-none bg-transparent py-2.5"
            style={{
              color: "var(--text-primary)",
              minHeight: 28,
              maxHeight: 150,
              fontFamily: "var(--font-body)",
            }}
          />

          {/* Send button (right) */}
          <motion.button
            onClick={() => { handleSend(); voice.stopListening(); voice.resetTranscript(); }}
            disabled={isTyping || !input.trim()}
            whileHover={input.trim() ? { scale: 1.03 } : {}}
            whileTap={input.trim() ? { scale: 0.97 } : {}}
            aria-label="Send response"
            className="shrink-0 h-10 px-6 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all text-[13px] font-semibold"
            style={{
              fontFamily: "var(--font-body)",
              background: input.trim() ? "var(--accent-primary)" : "var(--bg-tint)",
              color: input.trim() ? "#FFFFFF" : "var(--text-ghost)",
              border: input.trim() ? "none" : "1px solid var(--border)",
            }}
          >
            <Send size={14} strokeWidth={2} />
            <span className="hidden sm:inline">Send Message</span>
          </motion.button>
        </div>

        {/* Helper text */}
        <div className="flex items-center justify-between mt-1.5 px-1">
          <span style={{
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "var(--text-ghost)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>
            PRACTICE -- No scoring
          </span>
          <span style={{
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "var(--text-ghost)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}>
            PRESS ENTER TO SEND
          </span>
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
