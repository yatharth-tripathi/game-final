"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  Trophy, ArrowLeft, Crown, Medal, Flame, Target, TrendingUp,
  Shield, AlertTriangle, Settings, Headphones, Briefcase, Zap,
  Calendar, Globe, Building2,
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

interface Champion {
  category: string;
  playerId: string;
  playerName: string;
  playerBranch: string;
  avgScore: number;
  gamesPlayed: number;
}

type Period = "all" | "month" | "week";

const categoryIcons: Record<string, typeof Briefcase> = {
  sales: TrendingUp,
  compliance: Shield,
  "customer-service": Headphones,
  fraud: AlertTriangle,
  operations: Settings,
};

const categoryLabels: Record<string, string> = {
  sales: "Sales",
  compliance: "Compliance",
  "customer-service": "Service",
  fraud: "Fraud",
  operations: "Operations",
};

const periodLabels: Record<Period, string> = {
  all: "ALL TIME",
  month: "THIS MONTH",
  week: "THIS WEEK",
};

export function Leaderboard({ onClose }: { onClose: () => void }) {
  const { career } = useGameStore();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "branch">("all");
  const [period, setPeriod] = useState<Period>("all");

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, period, career.playerBranch]);

  useEffect(() => {
    fetchChampions();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const branch = filter === "branch" ? career.playerBranch : "all";
      const res = await fetch(`/api/leaderboard?branch=${branch}&limit=50&period=${period}`);
      if (res.ok) setEntries(await res.json());
    } catch {
      console.error("Failed to fetch leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchChampions = async () => {
    try {
      const res = await fetch("/api/leaderboard?mode=champions");
      if (res.ok) setChampions(await res.json());
    } catch {
      console.error("Failed to fetch champions");
    }
  };

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);
  const myEntry = entries.find((e) => e.id === career.playerId);
  const myRank = myEntry?.rank;
  const isInTop50 = !!myEntry;

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative"
    >
      <Particles count={10} />

      {/* TOP BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
          <button onClick={onClose} className="btn-ghost">
            <ArrowLeft size={12} /> BACK
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--text-ghost)" }}>
            LEADERBOARD
          </span>
          <div className="flex items-center gap-1">
            {/* Empty spacer for alignment */}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="relative z-10 shrink-0 px-3 sm:px-6 pt-3 pb-1 flex flex-wrap items-center justify-center gap-2">
        {/* Period Filter */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          {(["all", "month", "week"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1 rounded-md text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1"
              style={{
                color: period === p ? "#FFFFFF" : "var(--text-secondary)",
                background: period === p ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "transparent",
              }}
            >
              <Calendar size={8} />
              {periodLabels[p]}
            </button>
          ))}
        </div>

        {/* Scope Filter */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          {(["all", "branch"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1 rounded-md text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1"
              style={{
                color: filter === f ? "#FFFFFF" : "var(--text-secondary)",
                background: filter === f ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "transparent",
              }}
            >
              {f === "all" ? <><Globe size={8} /> NATIONAL</> : <><Building2 size={8} /> {career.playerBranch}</>}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6">

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
            <>
              {/* ══ PODIUM — TOP 3 ══ */}
              {top3.length >= 3 && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-end justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 pt-4"
                >
                  {podiumOrder.map((entry, i) => {
                    if (!entry) return null;
                    const isFirst = i === 1;
                    const rank = entry.rank;
                    const level = getCareerLevel(entry.totalXP);
                    const colors = rank === 1
                      ? { bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.25)", accent: "#EAB308", icon: <Crown size={isFirst ? 20 : 16} /> }
                      : rank === 2
                      ? { bg: "rgba(142,142,137,0.08)", border: "rgba(142,142,137,0.25)", accent: "var(--text-ghost)", icon: <Medal size={16} /> }
                      : { bg: "rgba(180,83,9,0.08)", border: "rgba(180,83,9,0.25)", accent: "#B45309", icon: <Medal size={16} /> };

                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.15, type: "spring", damping: 12 }}
                        className="flex flex-col items-center"
                        style={{ width: isFirst ? 140 : 110 }}
                      >
                        {/* Medal Icon */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.15, type: "spring", damping: 8 }}
                          className="mb-2"
                          style={{ color: colors.accent }}
                        >
                          {colors.icon}
                        </motion.div>

                        {/* Card */}
                        <div
                          className="w-full rounded-xl p-3 sm:p-4 text-center transition-all"
                          style={{
                            background: colors.bg,
                            border: `1.5px solid ${colors.border}`,
                            minHeight: isFirst ? 160 : 140,
                          }}
                        >
                          {/* Avatar */}
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg flex items-center justify-center text-sm font-bold mb-2"
                            style={{
                              fontFamily: "var(--font-display)",
                              background: `${colors.accent}20`,
                              border: `1.5px solid ${colors.accent}40`,
                              color: colors.accent,
                            }}
                          >
                            {entry.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                          </div>

                          {/* Name */}
                          <p className="text-[11px] sm:text-xs font-bold truncate mb-0.5" style={{ color: "var(--text-primary)" }}>
                            {entry.name}
                          </p>
                          <p className="text-[8px] mb-2 truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                            {level.title}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Zap size={10} style={{ color: "var(--accent-gold)" }} />
                            <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                              {entry.totalXP.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: entry.avgScore >= 70 ? "var(--success)" : "var(--text-secondary)" }}>
                            {entry.avgScore}% avg
                          </p>
                        </div>

                        {/* Podium bar */}
                        <div
                          className="w-full rounded-b-lg mt-0"
                          style={{
                            height: isFirst ? 48 : rank === 2 ? 32 : 20,
                            background: `linear-gradient(180deg, ${colors.accent}20, ${colors.accent}08)`,
                            borderLeft: `1.5px solid ${colors.border}`,
                            borderRight: `1.5px solid ${colors.border}`,
                            borderBottom: `1.5px solid ${colors.border}`,
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}

              {/* ══ CATEGORY CHAMPIONS ══ */}
              {champions.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <Target size={12} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                      CATEGORY CHAMPIONS
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: "none" }}>
                    {champions.map((champ) => {
                      const Icon = categoryIcons[champ.category] || Briefcase;
                      const catColor = CATEGORY_COLORS[champ.category] || "var(--accent-gold)";
                      return (
                        <motion.div
                          key={champ.category}
                          whileHover={{ scale: 1.03 }}
                          className="shrink-0 rounded-lg px-3 py-2.5 min-w-[130px]"
                          style={{
                            background: `${catColor}08`,
                            border: `1px solid ${catColor}20`,
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Icon size={10} style={{ color: catColor }} />
                            <span className="text-[8px] font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: catColor }}>
                              {categoryLabels[champ.category] || champ.category}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                            {champ.playerName}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-bold" style={{ fontFamily: "var(--font-mono)", color: champ.avgScore >= 70 ? "var(--success)" : "var(--warn)" }}>
                              {champ.avgScore}%
                            </span>
                            <span className="text-[8px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                              {champ.gamesPlayed} games
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ══ FULL RANKINGS TABLE ══ */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3 px-1">
                  <Trophy size={12} style={{ color: "var(--accent-gold)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                    {top3.length >= 3 ? "FULL RANKINGS" : "RANKINGS"}
                  </span>
                  <span className="ml-auto text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                    {entries.length} players
                  </span>
                </div>

                <div className="space-y-1.5">
                  {/* Header */}
                  <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                    <div className="w-6 sm:w-8 text-center shrink-0">#</div>
                    <div className="flex-1 min-w-0">PLAYER</div>
                    <div className="w-14 sm:w-16 text-center shrink-0">XP</div>
                    <div className="hidden sm:block w-12 text-center shrink-0">CASES</div>
                    <div className="w-12 sm:w-14 text-center shrink-0">AVG</div>
                    <div className="hidden sm:block w-10 text-center shrink-0">
                      <Flame size={9} />
                    </div>
                  </div>

                  {(top3.length >= 3 ? rest : entries).map((entry, i) => {
                    const level = getCareerLevel(entry.totalXP);
                    const isMe = entry.id === career.playerId;
                    const actualIndex = top3.length >= 3 ? i + 3 : i;

                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + actualIndex * 0.02 }}
                        className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all"
                        style={{
                          background: isMe ? "rgba(45,91,210,0.1)" : entry.rank <= 3 ? getRankBg(entry.rank) : "transparent",
                          border: isMe ? "1px solid var(--accent-primary-border)" : "1px solid transparent",
                        }}
                      >
                        <div className="w-6 sm:w-8 flex items-center justify-center shrink-0">
                          {entry.rank <= 3 ? getRankIcon(entry.rank) : (
                            <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                              {entry.rank}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] sm:text-xs font-semibold truncate" style={{ color: isMe ? "var(--accent-gold)" : "var(--text-primary)" }}>
                              {entry.name} {isMe && "(You)"}
                            </span>
                            <span className="tag text-[7px] hidden sm:inline-flex" style={{ color: "var(--text-ghost)", background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                              {level.title}
                            </span>
                          </div>
                          <p className="text-[8px] truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                            {entry.branch}
                          </p>
                        </div>

                        <div className="w-14 sm:w-16 text-center shrink-0">
                          <span className="text-[10px] sm:text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                            {entry.totalXP.toLocaleString()}
                          </span>
                        </div>

                        <div className="hidden sm:block w-12 text-center shrink-0">
                          <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                            {entry.casesCompleted}
                          </span>
                        </div>

                        <div className="w-12 sm:w-14 text-center shrink-0">
                          <span className="text-[10px] sm:text-xs font-semibold" style={{
                            fontFamily: "var(--font-mono)",
                            color: entry.avgScore >= 70 ? "var(--success)" : entry.avgScore >= 50 ? "var(--warn)" : "var(--danger)",
                          }}>
                            {entry.avgScore}%
                          </span>
                        </div>

                        <div className="hidden sm:block w-10 text-center shrink-0">
                          {entry.streak > 0 && (
                            <span className="text-xs flex items-center justify-center gap-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--danger)" }}>
                              <Flame size={9} /> {entry.streak}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ══ YOUR POSITION (if not in top 50) ══ */}
              {!isInTop50 && career.playerId && career.casesCompleted > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 rounded-xl p-4"
                  style={{
                    background: "rgba(45,91,210,0.06)",
                    border: "1px solid var(--accent-primary-border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={11} style={{ color: "var(--accent-gold)" }} />
                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                      YOUR POSITION
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-bold" style={{ color: "var(--accent-gold)" }}>{career.playerName}</p>
                      <p className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                        {getCareerLevel(career.totalXP).title} · {career.playerBranch}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-4 text-center">
                      <div>
                        <p className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>{career.totalXP}</p>
                        <p className="text-[8px]" style={{ color: "var(--text-ghost)" }}>XP</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{career.casesCompleted}</p>
                        <p className="text-[8px]" style={{ color: "var(--text-ghost)" }}>Cases</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{
                          fontFamily: "var(--font-mono)",
                          color: (career.casesCompleted > 0 ? Math.round(career.scoreSum / career.casesCompleted) : 0) >= 70 ? "var(--success)" : "var(--warn)",
                        }}>
                          {career.casesCompleted > 0 ? Math.round(career.scoreSum / career.casesCompleted) : 0}%
                        </p>
                        <p className="text-[8px]" style={{ color: "var(--text-ghost)" }}>Avg</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[9px] mt-2" style={{ color: "var(--text-secondary)" }}>
                    Keep completing cases to climb the ranks!
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown size={14} style={{ color: "#EAB308" }} />;
  if (rank === 2) return <Medal size={14} style={{ color: "var(--text-ghost)" }} />;
  if (rank === 3) return <Medal size={14} style={{ color: "#B45309" }} />;
  return null;
}

function getRankBg(rank: number) {
  if (rank === 1) return "rgba(234,179,8,0.06)";
  if (rank === 2) return "rgba(142,142,137,0.04)";
  if (rank === 3) return "rgba(180,83,9,0.04)";
  return "transparent";
}
