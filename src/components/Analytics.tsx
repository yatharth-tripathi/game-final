"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import { Certificate } from "./Certificate";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Cell,
} from "recharts";
import {
  ArrowLeft, BarChart3, TrendingUp, TrendingDown, Target, Award,
  CheckCircle, XCircle, Calendar, Zap, Activity, Shield, Clock,
} from "lucide-react";

interface AnalyticsData {
  player: {
    name: string;
    branch: string;
    totalXP: number;
    casesCompleted: number;
    adaptiveLevel: string;
  };
  recentSessions: {
    id: string;
    scenarioTitle: string;
    category: string;
    difficulty: string;
    percentage: number;
    grade: string;
    timeSpent: number;
    createdAt: string;
  }[];
  categoryStats: {
    category: string;
    avgScore: number;
    count: number;
  }[];
  skillRadar: {
    skill: string;
    avgPercent: number;
    count: number;
  }[];
  strongest: { skill: string; avgPercent: number; count: number }[];
  weakest: { skill: string; avgPercent: number; count: number }[];
  overallPercentile: number;
  gradeCount: Record<string, number>;
  certEligibility: Record<string, { eligible: boolean; count: number; avgScore: number }>;
  totalSessions: number;
}

interface CertState {
  category: string;
  avgScore: number;
  count: number;
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "TRAINEE", color: "#16A34A" },
  medium: { label: "JUNIOR RM", color: "#D97706" },
  hard: { label: "SENIOR RM", color: "#DC2626" },
  expert: { label: "BRANCH MGR", color: "#7C3AED" },
};

const gradeColors: Record<string, string> = {
  S: "#2563EB", A: "#16A34A", B: "#3B82F6", C: "#D97706", D: "#DC2626", F: "#DC2626",
};

export function Analytics() {
  const { career, setPhase } = useGameStore();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCert, setShowCert] = useState<CertState | null>(null);

  useEffect(() => {
    if (!career.playerId) return;
    setLoading(true);
    fetch(`/api/analytics?playerId=${career.playerId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load analytics");
        return r.json();
      })
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [career.playerId]);

  const avgScore = data && data.totalSessions > 0
    ? Math.round(data.recentSessions.reduce((s, r) => s + r.percentage, 0) / data.recentSessions.length)
    : 0;

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
          <button onClick={() => setPhase("lobby")} className="btn-ghost">
            <ArrowLeft size={12} /> BACK
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", color: "var(--text-ghost)" }}>
            PERFORMANCE ANALYTICS
          </span>
          <div className="flex items-center gap-1">
            {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-8 py-4 sm:py-8">

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-10 h-10 mx-auto mb-4 rounded-full"
                style={{ border: "2px solid var(--border)", borderTopColor: "var(--accent-gold)" }}
              />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Loading analytics...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <Activity size={32} className="mx-auto mb-4" style={{ color: "var(--text-ghost)" }} />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{error}</p>
            </div>
          )}

          {/* Data Loaded */}
          {data && !loading && (
            <>
              {/* ══ 1. SUMMARY CARDS ══ */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
              >
                {/* Total Sessions */}
                <div
                  className="nexus-card p-4 text-center"
                  style={{ borderTop: "2px solid var(--accent-primary-border)" }}
                >
                  <BarChart3 size={16} className="mx-auto mb-2" style={{ color: "var(--accent-primary)" }} />
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--accent-primary)" }}
                  >
                    {data.totalSessions}
                  </p>
                  <p
                    className="text-[9px] uppercase tracking-wider mt-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                  >
                    Total Sessions
                  </p>
                </div>

                {/* Average Score */}
                <div
                  className="nexus-card p-4 text-center"
                  style={{ borderTop: `2px solid ${avgScore >= 70 ? "rgba(22,163,74,0.3)" : avgScore >= 50 ? "rgba(217,119,6,0.3)" : "rgba(220,38,38,0.3)"}` }}
                >
                  <Target size={16} className="mx-auto mb-2" style={{ color: avgScore >= 70 ? "var(--success)" : avgScore >= 50 ? "var(--warn)" : "var(--danger)" }} />
                  <p
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: avgScore >= 70 ? "var(--success)" : avgScore >= 50 ? "var(--warn)" : "var(--danger)",
                    }}
                  >
                    {avgScore}%
                  </p>
                  <p
                    className="text-[9px] uppercase tracking-wider mt-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                  >
                    Average Score
                  </p>
                </div>

                {/* Overall Rank */}
                <div
                  className="nexus-card p-4 text-center"
                  style={{ borderTop: "2px solid rgba(37,99,235,0.2)" }}
                >
                  <Award size={16} className="mx-auto mb-2" style={{ color: "var(--accent-gold)" }} />
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-display)", color: "var(--accent-primary)" }}
                  >
                    Top {100 - data.overallPercentile}%
                  </p>
                  <p
                    className="text-[9px] uppercase tracking-wider mt-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                  >
                    Overall Rank
                  </p>
                </div>

                {/* Adaptive Level */}
                <div
                  className="nexus-card p-4 text-center"
                  style={{ borderTop: "2px solid rgba(132,204,22,0.3)" }}
                >
                  <Zap size={16} className="mx-auto mb-2" style={{ color: "var(--accent-secondary)" }} />
                  <p
                    className="text-lg font-bold uppercase"
                    style={{ fontFamily: "var(--font-display)", color: "var(--accent-secondary-dim)" }}
                  >
                    {data.player.adaptiveLevel}
                  </p>
                  <p
                    className="text-[9px] uppercase tracking-wider mt-1"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                  >
                    Adaptive Level
                  </p>
                </div>
              </motion.div>

              {/* ══ 2. SKILL RADAR ══ */}
              {data.skillRadar.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={14} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                      SKILL PROFILE
                    </span>
                  </div>
                  <div className="w-full h-55 sm:h-75">
                    <ResponsiveContainer>
                      <RadarChart data={data.skillRadar.map((s) => ({
                        skill: s.skill.length > 12 ? s.skill.slice(0, 12) + "\u2026" : s.skill,
                        score: s.avgPercent,
                        ideal: 100,
                      }))}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis
                          dataKey="skill"
                          tick={{ fill: "var(--text-secondary)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          tick={false}
                          axisLine={false}
                        />
                        <Radar
                          name="Ideal"
                          dataKey="ideal"
                          stroke="rgba(37,99,235,0.2)"
                          fill="rgba(37,99,235,0.05)"
                          strokeDasharray="4 4"
                        />
                        <Radar
                          name="Your Average"
                          dataKey="score"
                          stroke="var(--accent-primary)"
                          fill="rgba(37,99,235,0.15)"
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* ══ 3. PROGRESS OVER TIME ══ */}
              {data.recentSessions.length > 1 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={14} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                      SCORE PROGRESSION
                    </span>
                    <span className="ml-auto text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                      Last {data.recentSessions.length} sessions
                    </span>
                  </div>
                  <div className="w-full h-52 sm:h-64">
                    <ResponsiveContainer>
                      <LineChart
                        data={[...data.recentSessions].reverse().map((s) => ({
                          date: new Date(s.createdAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }),
                          score: s.percentage,
                        }))}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tick={{ fill: "var(--text-ghost)", fontSize: 9, fontFamily: "var(--font-mono)" }}
                          axisLine={{ stroke: "var(--border)" }}
                          tickLine={false}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fill: "var(--text-ghost)", fontSize: 9, fontFamily: "var(--font-mono)" }}
                          axisLine={{ stroke: "var(--border)" }}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "var(--bg-surface)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                          }}
                          labelStyle={{ color: "var(--text-ghost)", fontSize: 9 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="var(--accent-primary)"
                          strokeWidth={2}
                          dot={{ fill: "var(--accent-primary)", r: 3, strokeWidth: 0 }}
                          activeDot={{ r: 5, fill: "var(--accent-primary)", stroke: "#fff", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* ══ 4. CATEGORY PERFORMANCE ══ */}
              {data.categoryStats.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={14} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                      CATEGORY BREAKDOWN
                    </span>
                  </div>
                  <div className="w-full h-52 sm:h-64">
                    <ResponsiveContainer>
                      <BarChart
                        data={data.categoryStats.map((c) => ({
                          category: c.category.replace("-", " ").replace(/\b\w/g, (ch: string) => ch.toUpperCase()),
                          rawCategory: c.category,
                          avgScore: c.avgScore,
                          count: c.count,
                        }))}
                        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="category"
                          tick={{ fill: "var(--text-ghost)", fontSize: 9, fontFamily: "var(--font-mono)" }}
                          axisLine={{ stroke: "var(--border)" }}
                          tickLine={false}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fill: "var(--text-ghost)", fontSize: 9, fontFamily: "var(--font-mono)" }}
                          axisLine={{ stroke: "var(--border)" }}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "var(--bg-surface)",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                          }}
                          labelStyle={{ color: "var(--text-ghost)", fontSize: 9 }}
                          formatter={(value) => [`${value}%`, "Avg Score"]}
                        />
                        <Bar dataKey="avgScore" radius={[4, 4, 0, 0]}>
                          {data.categoryStats.map((c, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CATEGORY_COLORS[c.category] || "var(--accent-primary)"}
                              fillOpacity={0.8}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* ══ 5. STRENGTHS & WEAKNESSES ══ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Strengths */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="nexus-card p-3 sm:p-5"
                  style={{ borderTop: "2px solid rgba(22,163,74,0.3)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={13} style={{ color: "var(--success)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--success)" }}>
                      STRONGEST SKILLS
                    </span>
                  </div>
                  {data.strongest.length > 0 ? (
                    <div className="space-y-2.5">
                      {data.strongest.map((s) => (
                        <div key={s.skill} className="flex items-center gap-2">
                          <CheckCircle size={12} className="shrink-0" style={{ color: "var(--success)" }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs" style={{ color: "var(--text-primary)" }}>{s.skill}</span>
                              <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>
                                {s.avgPercent}%
                              </span>
                            </div>
                            <div className="progress-track" style={{ height: 3 }}>
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${s.avgPercent}%`, background: "var(--success)", transition: "width 0.8s ease-out" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Complete sessions to see your strengths.</p>
                  )}
                </motion.div>

                {/* Weaknesses */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="nexus-card p-3 sm:p-5"
                  style={{ borderTop: "2px solid rgba(217,119,6,0.3)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown size={13} style={{ color: "var(--warn)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--warn)" }}>
                      AREAS TO IMPROVE
                    </span>
                  </div>
                  {data.weakest.length > 0 ? (
                    <div className="space-y-2.5">
                      {data.weakest.map((s) => (
                        <div key={s.skill} className="flex items-center gap-2">
                          <XCircle size={12} className="shrink-0" style={{ color: "var(--warn)" }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs" style={{ color: "var(--text-primary)" }}>{s.skill}</span>
                              <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--warn)" }}>
                                {s.avgPercent}%
                              </span>
                            </div>
                            <div className="progress-track" style={{ height: 3 }}>
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${s.avgPercent}%`, background: "var(--warn)", transition: "width 0.8s ease-out" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Complete sessions to identify improvement areas.</p>
                  )}
                </motion.div>
              </div>

              {/* ══ 6. CERTIFICATES ══ */}
              {Object.keys(data.certEligibility).length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
                  style={{ borderTop: "2px solid var(--accent-gold-border)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={14} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                      CERTIFICATES
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(data.certEligibility).map(([category, cert]) => {
                      const catColor = CATEGORY_COLORS[category] || "var(--accent-primary)";
                      const categoryLabel = category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
                      return (
                        <div
                          key={category}
                          className="rounded-lg p-3 sm:p-4"
                          style={{
                            background: `${catColor}08`,
                            border: `1px solid ${catColor}20`,
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Shield size={12} style={{ color: catColor }} />
                              <span
                                className="text-[10px] font-bold uppercase tracking-wider"
                                style={{ fontFamily: "var(--font-mono)", color: catColor }}
                              >
                                {categoryLabel}
                              </span>
                            </div>
                            {cert.eligible && (
                              <span className="tag" style={{ color: "var(--success)", background: "var(--success-bg)", border: "1px solid rgba(22,163,74,0.2)" }}>
                                ELIGIBLE
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <p
                              className="text-xs"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {cert.eligible
                                ? `Avg: ${cert.avgScore}% across ${cert.count} scenarios`
                                : `${cert.count}/3 scenarios at 70%+`
                              }
                            </p>
                            {cert.eligible && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowCert({ category, avgScore: cert.avgScore, count: cert.count })}
                                className="px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider"
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  background: `${catColor}15`,
                                  color: catColor,
                                  border: `1px solid ${catColor}30`,
                                }}
                              >
                                VIEW
                              </motion.button>
                            )}
                          </div>

                          {/* Progress bar for non-eligible */}
                          {!cert.eligible && (
                            <div className="progress-track mt-2" style={{ height: 3 }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${Math.min((cert.count / 3) * 100, 100)}%`,
                                  background: catColor,
                                  transition: "width 0.8s ease-out",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ══ 7. SESSION HISTORY ══ */}
              {data.recentSessions.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar size={14} style={{ color: "var(--accent-gold)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                      SESSION HISTORY
                    </span>
                    <span className="ml-auto text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                      Last {data.recentSessions.length} sessions
                    </span>
                  </div>

                  {/* Header */}
                  <div
                    className="hidden sm:flex items-center gap-2 px-3 py-2 mb-2 text-[8px] font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                  >
                    <div className="flex-1 min-w-0">SCENARIO</div>
                    <div className="w-20 text-center shrink-0">CATEGORY</div>
                    <div className="w-16 text-center shrink-0">LEVEL</div>
                    <div className="w-12 text-center shrink-0">SCORE</div>
                    <div className="w-10 text-center shrink-0">GRADE</div>
                    <div className="w-16 text-center shrink-0">DATE</div>
                  </div>

                  <div className="space-y-1.5">
                    {data.recentSessions.map((session, i) => {
                      const catColor = CATEGORY_COLORS[session.category] || "var(--accent-primary)";
                      const diff = DIFFICULTY_LABELS[session.difficulty] || { label: session.difficulty, color: "var(--text-ghost)" };
                      const gradeColor = gradeColors[session.grade] || "var(--accent-primary)";
                      const dateStr = new Date(session.createdAt).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });

                      return (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.55 + i * 0.02 }}
                          className="flex flex-wrap sm:flex-nowrap items-center gap-2 px-3 py-2 sm:py-2.5 rounded-lg transition-all"
                          style={{
                            background: "transparent",
                            border: "1px solid transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--accent-primary-bg)";
                            e.currentTarget.style.borderColor = "var(--accent-primary-border)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "transparent";
                          }}
                        >
                          {/* Scenario Title */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] sm:text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                              {session.scenarioTitle}
                            </p>
                            {/* Mobile-only: show tags inline */}
                            <div className="flex items-center gap-1.5 mt-1 sm:hidden">
                              <span className="tag" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
                                {session.category.replace("-", " ")}
                              </span>
                              <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
                                {diff.label}
                              </span>
                              <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-mono)", color: gradeColor }}>
                                {session.percentage}% ({session.grade})
                              </span>
                            </div>
                          </div>

                          {/* Category Tag */}
                          <div className="w-20 text-center shrink-0 hidden sm:block">
                            <span className="tag" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
                              {session.category.replace("-", " ")}
                            </span>
                          </div>

                          {/* Difficulty Tag */}
                          <div className="w-16 text-center shrink-0 hidden sm:block">
                            <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
                              {diff.label}
                            </span>
                          </div>

                          {/* Score */}
                          <div className="w-12 text-center shrink-0 hidden sm:block">
                            <span
                              className="text-xs font-bold"
                              style={{
                                fontFamily: "var(--font-mono)",
                                color: session.percentage >= 70 ? "var(--success)" : session.percentage >= 50 ? "var(--warn)" : "var(--danger)",
                              }}
                            >
                              {session.percentage}%
                            </span>
                          </div>

                          {/* Grade */}
                          <div className="w-10 text-center shrink-0 hidden sm:block">
                            <span
                              className="text-xs font-bold"
                              style={{ fontFamily: "var(--font-display)", color: gradeColor }}
                            >
                              {session.grade}
                            </span>
                          </div>

                          {/* Date */}
                          <div className="w-16 text-center shrink-0 hidden sm:block">
                            <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                              {dateStr}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Empty State */}
              {data.totalSessions === 0 && (
                <div className="text-center py-16">
                  <Activity size={40} className="mx-auto mb-4" style={{ color: "var(--text-ghost)" }} />
                  <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>No sessions yet</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Complete training scenarios to see your analytics.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCert && data && (
        <Certificate
          playerName={data.player.name}
          category={showCert.category}
          avgScore={showCert.avgScore}
          scenariosCompleted={showCert.count}
          skillBreakdown={data.skillRadar}
          onClose={() => setShowCert(null)}
        />
      )}
    </motion.div>
  );
}
