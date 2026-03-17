"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel } from "@/store/useGameStore";
import { Particles } from "./Particles";
import {
  Trophy, ArrowLeft, Crown, Medal, Flame, Target,
} from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  branch: string;
  totalXP: number;
  casesCompleted: number;
  avgScore: number;
  streak: number;
}

export function Leaderboard({ onClose }: { onClose: () => void }) {
  const { career } = useGameStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "branch">("all");

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, career.playerBranch]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const branch = filter === "branch" ? career.playerBranch : "all";
      const res = await fetch(`/api/leaderboard?branch=${branch}&limit=50`);
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch {
      console.error("Failed to fetch leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={14} style={{ color: "#FFD700" }} />;
    if (rank === 2) return <Medal size={14} style={{ color: "#C0C0C0" }} />;
    if (rank === 3) return <Medal size={14} style={{ color: "#CD7F32" }} />;
    return <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "rgba(255,215,0,0.08)";
    if (rank === 2) return "rgba(192,192,192,0.06)";
    if (rank === 3) return "rgba(205,127,50,0.06)";
    return "transparent";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative"
    >
      <Particles count={8} />

      {/* TOP BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-6 py-3 flex items-center justify-between">
          <button onClick={onClose} className="btn-ghost">
            <ArrowLeft size={12} /> BACK
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", color: "var(--text-ghost)" }}>
            LEADERBOARD
          </span>
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            {(["all", "branch"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-all"
                style={{
                  color: filter === f ? "var(--bg-void)" : "var(--text-secondary)",
                  background: filter === f ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "transparent",
                }}
              >
                {f === "all" ? "NATIONAL" : career.playerBranch}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto px-6 py-6">

          {loading ? (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-10 h-10 mx-auto mb-4 rounded-full"
                style={{ border: "2px solid var(--border)", borderTopColor: "var(--accent-gold)" }}
              />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Loading rankings...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-20">
              <Trophy size={32} className="mx-auto mb-4" style={{ color: "var(--text-ghost)" }} />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No players yet. Complete a case to appear!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-2 text-[9px] font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                <div className="w-8 text-center">RANK</div>
                <div className="flex-1">PLAYER</div>
                <div className="w-16 text-center">XP</div>
                <div className="w-14 text-center">CASES</div>
                <div className="w-14 text-center">AVG %</div>
                <div className="w-10 text-center">
                  <Flame size={9} />
                </div>
              </div>

              {entries.map((entry, i) => {
                const level = getCareerLevel(entry.totalXP);
                const isMe = entry.id === career.playerId;

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                    style={{
                      background: isMe ? "rgba(201,168,76,0.08)" : getRankColor(entry.rank),
                      border: isMe ? "1px solid var(--accent-gold-border)" : "1px solid transparent",
                    }}
                  >
                    <div className="w-8 flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate" style={{ color: isMe ? "var(--accent-gold)" : "var(--text-primary)" }}>
                          {entry.name} {isMe && "(You)"}
                        </span>
                        <span className="tag text-[8px]" style={{ color: "var(--text-ghost)", background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                          {level.title}
                        </span>
                      </div>
                      <p className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                        {entry.branch}
                      </p>
                    </div>

                    <div className="w-16 text-center">
                      <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                        {entry.totalXP.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-14 text-center">
                      <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                        {entry.casesCompleted}
                      </span>
                    </div>

                    <div className="w-14 text-center">
                      <span className="text-xs font-semibold" style={{
                        fontFamily: "var(--font-mono)",
                        color: entry.avgScore >= 70 ? "var(--success)" : entry.avgScore >= 50 ? "var(--warn)" : "var(--danger)",
                      }}>
                        {entry.avgScore}%
                      </span>
                    </div>

                    <div className="w-10 text-center">
                      {entry.streak > 0 && (
                        <span className="text-xs flex items-center justify-center gap-0.5" style={{ fontFamily: "var(--font-mono)", color: "#E53E3E" }}>
                          <Flame size={9} /> {entry.streak}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
