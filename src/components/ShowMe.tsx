"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { SplitLayout } from "./SplitLayout";
import { ShowMeInsights } from "./insights/ShowMeInsights";
import {
  ArrowLeft, Brain, CheckCircle,
  ChevronRight, Clock, Square, Lightbulb,
} from "lucide-react";

interface Exchange {
  speaker: "customer" | "rm";
  text: string;
  technique: string | null;
}

interface DebriefItem {
  skill: string;
  demonstrated: boolean;
  where: string;
}

interface ShowMeData {
  title: string;
  customerProfile: string;
  objective: string;
  complianceWatch: string;
  exchanges: Exchange[];
  debrief: DebriefItem[];
}

export function ShowMe() {
  const { currentScenario: sc, resetGame } = useGameStore();
  const [data, setData] = useState<ShowMeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sc) return;
    setLoading(true);
    fetch("/api/showme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario: sc }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.details || d.error);
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message || "Failed to generate demonstration");
        setLoading(false);
      });
  }, [sc]);

  // Auto-reveal exchanges one by one
  useEffect(() => {
    if (!data) return;
    if (visibleCount >= data.exchanges.length) return;
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), 1200);
    return () => clearTimeout(timer);
  }, [data, visibleCount]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount]);

  if (!sc) return null;
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";

  // ── LOADING SCREEN (matches GamePlay evaluating screen) ──
  if (loading) {
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
          <h2 className="text-lg uppercase tracking-wide mb-3" style={{
            fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text-primary)",
          }}>
            Generating Masterclass
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
            Building the ideal conversation for {sc.title}
          </p>
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

  // ── ERROR SCREEN ──
  if (error || !data) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ background: "var(--bg-void)" }}>
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: "var(--danger)" }}>{error || "Something went wrong"}</p>
          <button onClick={resetGame} className="btn-gold px-6 py-2">BACK TO LOBBY</button>
        </div>
      </div>
    );
  }

  const allRevealed = visibleCount >= data.exchanges.length;

  // ── TOP BAR (matches GamePlay exactly) ──
  const topBar = (
    <div className="shrink-0 w-full relative z-10" style={{
      background: "#FFFFFF",
      borderBottom: "1px solid var(--border)",
    }}>
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left: back + title + active badge */}
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
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "var(--success)" }} />
              <span className="text-[9px] px-1.5 py-0.5 rounded uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  background: "var(--success-bg)",
                  color: "var(--success)",
                }}>
                SHOW ME — MASTERCLASS
              </span>
            </div>
          </div>
        </div>

        {/* Center: Exchange progress */}
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
            Exchange {Math.min(visibleCount, data.exchanges.length)}/{data.exchanges.length}
          </span>
        </div>

        {/* Right: End Session */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={resetGame}
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

  // ── CHAT AREA (matches GamePlay exactly) ──
  const chatArea = (
    <div className="w-full h-full relative" style={{ background: "var(--bg-void)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 relative z-10" style={{ minHeight: "100%" }}>
        {data.exchanges.slice(0, visibleCount).map((ex, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 22 }}
          >
            {ex.speaker === "customer" ? (
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
                    exchange {i + 1}
                  </span>
                </div>
                {/* Bubble */}
                <div className="chat-customer" style={{ marginLeft: 48, padding: "16px 20px" }}>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--text-primary)",
                    margin: 0,
                  }}>{ex.text}</p>
                </div>
              </div>
            ) : (
              /* ── Ideal RM Message (RIGHT) ── */
              <div className="max-w-[95%] sm:max-w-[85%] ml-auto">
                {/* Timestamp + Name + Badge row (right-aligned) */}
                <div className="flex items-center gap-3 mb-1.5 justify-end">
                  <span className="text-[11px]" style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                  }}>
                    exchange {i + 1}
                  </span>
                  <span className="text-[13px] font-bold" style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--success)",
                  }}>
                    Ideal RM
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
                  }}>{ex.text}</p>
                </div>
                {/* Technique tag below if available */}
                {ex.technique && (
                  <div className="flex justify-end mt-2" style={{ marginRight: 48 }}>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                      style={{
                        background: "var(--accent-primary-bg)",
                        border: "1px solid var(--accent-primary-border)",
                      }}>
                      <Lightbulb size={10} style={{ color: "var(--accent-primary)" }} />
                      <span className="text-[10px] font-semibold" style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent-primary)",
                        letterSpacing: "0.03em",
                      }}>
                        {ex.technique}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}

        {/* Loading next exchange indicator */}
        {!allRevealed && visibleCount > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: data.exchanges[visibleCount]?.speaker === "customer"
                    ? "linear-gradient(135deg, #1e3a5f, #2d5f8a)"
                    : "var(--accent-primary)",
                }}>
                <span className="text-[13px] font-bold" style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                }}>
                  {data.exchanges[visibleCount]?.speaker === "customer"
                    ? sc.customer.name.charAt(0)
                    : "RM"}
                </span>
              </div>
              <span className="text-[11px]" style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-muted)",
              }}>
                typing...
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full"
              style={{ marginLeft: 48, background: "#FFFFFF", border: "1px solid var(--border)" }}>
              {[0, 1, 2].map((j) => (
                <motion.span key={j}
                  animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: j * 0.15 }}
                  className="w-2 h-2 rounded-full" style={{ background: catColor }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );

  // ── BOTTOM BAR (when all revealed) ──
  const bottomBar = allRevealed ? (
    <div className="w-full" style={{ background: "#FFFFFF", borderTop: "1px solid var(--border)" }}>
      <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-3 sm:gap-4">
        <button onClick={resetGame}
          className="btn-ghost px-4 sm:px-6 py-2.5 flex items-center gap-2">
          <ArrowLeft size={12} /> Back to Lobby
        </button>
        <button onClick={() => {
          useGameStore.getState().setGameMode("testme");
          useGameStore.getState().selectScenario(sc);
        }}
          className="px-6 sm:px-8 py-2.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-colors"
          style={{
            fontFamily: "var(--font-body)",
            background: "var(--accent-primary)",
            color: "#FFFFFF",
            border: "none",
          }}>
          Test Me on This <ChevronRight size={14} />
        </button>
      </div>
    </div>
  ) : undefined;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen w-full">
      <SplitLayout
        topBar={topBar}
        insightsPanel={
          <ShowMeInsights
            scenario={sc}
            exchanges={data.exchanges}
            debrief={data.debrief}
            objective={data.objective}
            customerProfile={data.customerProfile}
            complianceWatch={data.complianceWatch}
            visibleCount={visibleCount}
          />
        }
        insightsPanelTitle="TECHNIQUE LAB"
        bottomBar={bottomBar}
      >
        {chatArea}
      </SplitLayout>
    </motion.div>
  );
}
