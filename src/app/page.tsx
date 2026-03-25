"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useGameStore, type GamePhase } from "@/store/useGameStore";
import { Login } from "@/components/Login";
import { Lobby } from "@/components/Lobby";
import { Briefing } from "@/components/Briefing";
import { GamePlay } from "@/components/GamePlay";
import { Evaluation } from "@/components/Evaluation";
import { Leaderboard } from "@/components/Leaderboard";
import { ShowMe } from "@/components/ShowMe";
import { TryMe } from "@/components/TryMe";
import { AdminPanel } from "@/components/AdminPanel";
import { Analytics } from "@/components/Analytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";

// Map phases to parent phases for back navigation
const PHASE_PARENT: Record<string, GamePhase> = {
  lobby: "login",
  briefing: "lobby",
  analytics: "lobby",
  playing: "lobby",
  evaluation: "lobby",
  leaderboard: "lobby",
  showme: "lobby",
  tryme: "lobby",
  admin: "lobby",
};

export default function Home() {
  const { phase, career, setPhase } = useGameStore();
  const [hydrated, setHydrated] = useState(false);
  const isPopState = useRef(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Auto-redirect: if profiled → lobby, if not profiled → stay on login for step 2
  useEffect(() => {
    if (hydrated && phase === "login" && career.playerId) {
      if (career.profileCompleted === true) {
        setPhase("lobby");
      }
    }
  }, [hydrated, phase, career.playerId, career.profileCompleted, setPhase]);

  // ── Browser history integration ──
  // Push state when phase changes (so browser back/forward works)
  useEffect(() => {
    if (!hydrated) return;
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }
    // Push new history entry for each phase change
    window.history.pushState({ phase }, "", `#${phase}`);
  }, [phase, hydrated]);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.phase) {
        isPopState.current = true;
        const targetPhase = e.state.phase as GamePhase;
        // If going back to login but user is logged in, go to lobby instead
        if (targetPhase === "login" && career.playerId) {
          setPhase("lobby");
        } else {
          setPhase(targetPhase);
        }
      } else {
        // No state — go to lobby if logged in, else login
        isPopState.current = true;
        setPhase(career.playerId ? "lobby" : "login");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [career.playerId, setPhase]);

  // Reset game state when navigating back to lobby
  const goBack = useCallback(() => {
    const parent = PHASE_PARENT[phase];
    if (parent) {
      if (phase === "playing" || phase === "showme" || phase === "tryme") {
        // Reset game state when leaving a game session
        useGameStore.getState().resetGame();
      } else {
        setPhase(parent);
      }
    }
  }, [phase, setPhase]);

  // Expose goBack globally for components
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__nexusGoBack = goBack;
  }, [goBack]);

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
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="fixed inset-0 pointer-events-none grid-bg" />
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 1000, height: 500,
            background: "radial-gradient(ellipse at center, rgba(37,99,235,0.04) 0%, transparent 70%)",
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
          {phase === "analytics" && <Analytics key="analytics" />}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
