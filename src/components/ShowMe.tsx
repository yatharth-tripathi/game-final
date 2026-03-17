"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS, DIFFICULTY_CONFIG } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  ArrowLeft, Brain, CheckCircle, XCircle, User, Shield,
  Lightbulb, Target, ChevronRight,
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

  if (!sc) return null;
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const diff = DIFFICULTY_CONFIG[sc.difficulty];

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="h-screen w-full flex flex-col items-center justify-center relative"
        style={{ background: "var(--bg-void)" }}>
        <Particles count={10} />
        <div className="relative z-10 text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="mx-auto mb-6" style={{ width: 70, height: 70 }}>
            <div className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: "conic-gradient(var(--accent-gold), var(--accent-gold-glow), var(--accent-gold-dim), var(--accent-gold))", padding: 3 }}>
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "var(--bg-void)" }}>
                <Brain size={24} style={{ color: "var(--accent-gold)" }} />
              </div>
            </div>
          </motion.div>
          <h2 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            NEXUS is generating the masterclass...
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Building the ideal conversation for {sc.title}</p>
        </div>
      </motion.div>
    );
  }

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative">
      <Particles count={6} />

      {/* TOP BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-6 py-3 flex items-center justify-between">
          <button onClick={resetGame} className="btn-ghost"><ArrowLeft size={12} /> BACK</button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", color: "var(--accent-gold)" }}>
            SHOW ME — MASTERCLASS
          </span>
          <div className="flex items-center gap-2">
            <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>{diff.label}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-3xl mx-auto px-8 py-6">

          {/* Scenario Header */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="nexus-card p-5 mb-6" style={{ borderTop: `2px solid ${catColor}30` }}>
            <div className="grid grid-cols-2 gap-3 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
              <div><span style={{ color: "var(--text-ghost)" }}>SCENARIO</span><p className="font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>{data.title}</p></div>
              <div><span style={{ color: "var(--text-ghost)" }}>OBJECTIVE</span><p className="mt-0.5" style={{ color: "var(--text-primary)" }}>{data.objective}</p></div>
              <div><span style={{ color: "var(--text-ghost)" }}>CLIENT</span><p className="mt-0.5" style={{ color: "var(--text-primary)" }}>{data.customerProfile}</p></div>
              <div><span style={{ color: "var(--text-ghost)" }}>COMPLIANCE</span><p className="mt-0.5" style={{ color: "var(--danger)" }}>{data.complianceWatch}</p></div>
            </div>
          </motion.div>

          {/* Conversation */}
          <div className="space-y-4 mb-6">
            {data.exchanges.slice(0, visibleCount).map((ex, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 22 }}>
                {ex.speaker === "customer" ? (
                  <div className="max-w-[85%]">
                    <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5"
                      style={{ fontFamily: "var(--font-mono)", color: catColor }}>
                      <User size={9} className="inline mr-1" />{sc.customer.name}
                    </p>
                    <div className="chat-customer p-4">
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{ex.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[85%] ml-auto">
                    <p className="text-[9px] font-semibold uppercase tracking-widest mb-1.5 text-right"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>
                      IDEAL RM <CheckCircle size={9} className="inline ml-1" />
                    </p>
                    <div className="p-4 rounded-xl" style={{ background: "rgba(56,161,105,0.06)", border: "1px solid rgba(56,161,105,0.15)" }}>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{ex.text}</p>
                    </div>
                    {ex.technique && (
                      <div className="flex items-start gap-1.5 mt-2 ml-2">
                        <Lightbulb size={10} className="shrink-0 mt-0.5" style={{ color: "var(--warn)" }} />
                        <p className="text-[10px] leading-relaxed" style={{ color: "var(--warn)" }}>{ex.technique}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {!allRevealed && (
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-center py-4">
                <span className="text-[10px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  Next exchange loading...
                </span>
              </motion.div>
            )}
          </div>

          {/* Debrief — shows after all exchanges revealed */}
          {allRevealed && data.debrief && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
              className="nexus-card p-5 mb-6" style={{ borderTop: "2px solid var(--accent-gold-border)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Target size={13} style={{ color: "var(--accent-gold)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                  SKILL DEBRIEF
                </span>
              </div>
              <div className="space-y-2">
                {data.debrief.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                    {item.demonstrated
                      ? <CheckCircle size={12} style={{ color: "var(--success)" }} />
                      : <XCircle size={12} style={{ color: "var(--danger)" }} />}
                    <span className="text-xs flex-1" style={{ color: "var(--text-primary)" }}>{item.skill}</span>
                    <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>{item.where}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* BOTTOM */}
      {allRevealed && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="relative z-10 shrink-0 glass-panel px-6 py-4 flex items-center justify-center gap-4"
          style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={resetGame} className="btn-ghost px-6 py-2.5">
            <ArrowLeft size={12} /> BACK TO LOBBY
          </button>
          <button onClick={() => {
            useGameStore.getState().setGameMode("testme");
            useGameStore.getState().selectScenario(sc);
          }} className="btn-gold px-8 py-2.5">
            TEST ME ON THIS <ChevronRight size={14} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
