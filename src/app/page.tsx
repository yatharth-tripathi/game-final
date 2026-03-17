"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { Login } from "@/components/Login";
import { Lobby } from "@/components/Lobby";
import { Briefing } from "@/components/Briefing";
import { GamePlay } from "@/components/GamePlay";
import { Evaluation } from "@/components/Evaluation";
import { Leaderboard } from "@/components/Leaderboard";
import { ShowMe } from "@/components/ShowMe";
import { TryMe } from "@/components/TryMe";
import { AdminPanel } from "@/components/AdminPanel";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const { phase, career, setPhase } = useGameStore();
  const [hydrated, setHydrated] = useState(false);

  // Wait for Zustand to rehydrate from localStorage before rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Auto-redirect to lobby if player already logged in (persisted career)
  useEffect(() => {
    if (hydrated && phase === "login" && career.playerId) {
      setPhase("lobby");
    }
  }, [hydrated, phase, career.playerId, setPhase]);

  // Show loading screen until hydrated
  if (!hydrated) {
    return (
      <div className="h-screen w-full flex items-center justify-center" style={{ background: "var(--bg-void)" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div
            className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#070A0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", color: "var(--text-ghost)" }}>
            LOADING NEXUS...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen w-full relative overflow-hidden" style={{ background: "var(--bg-void)" }}>
        {/* Grid background */}
        <div className="fixed inset-0 pointer-events-none grid-bg" />
        {/* Top glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 1000, height: 500,
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.03) 0%, transparent 70%)",
          }}
        />

        <AnimatePresence mode="wait">
          {phase === "login" && <Login key="login" />}
          {phase === "lobby" && <Lobby key="lobby" />}
          {phase === "briefing" && <Briefing key="briefing" />}
          {phase === "playing" && <GamePlay key="playing" />}
          {phase === "evaluation" && <Evaluation key="evaluation" />}
          {phase === "leaderboard" && <Leaderboard key="leaderboard" onClose={() => setPhase("lobby")} />}
          {phase === "showme" && <ShowMe key="showme" />}
          {phase === "tryme" && <TryMe key="tryme" />}
          {phase === "admin" && <AdminPanel key="admin" />}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
