"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import { SplitLayout } from "./SplitLayout";
import { ShowMeInsights } from "./insights/ShowMeInsights";
import {
  ArrowLeft, Brain, CheckCircle, User,
  ChevronRight,
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

  const topBar = (
    <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="px-6 py-3 flex items-center justify-between">
        <button onClick={resetGame} className="btn-ghost"><ArrowLeft size={12} /> BACK</button>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", color: "var(--accent-gold)" }}>
          SHOW ME — MASTERCLASS
        </span>
        <div style={{ width: 80 }} />
      </div>
    </div>
  );

  const chatArea = (
    <div className="w-full h-full relative">
      <Particles count={6} />
      <div className="w-full max-w-2xl mx-auto px-6 py-6 space-y-4 relative z-10">
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
    </div>
  );

  const bottomBar = allRevealed ? (
    <div className="glass-panel px-6 py-4 flex items-center justify-center gap-4"
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
