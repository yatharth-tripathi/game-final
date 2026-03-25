"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel, getNextLevelXP } from "@/store/useGameStore";
import { SCENARIOS, CATEGORIES, CATEGORY_COLORS, DIFFICULTY_CONFIG, type Scenario } from "@/lib/scenarios";
import { classifyScenario, sortScenariosForPlayer, type ScenarioTag } from "@/lib/adaptive";
import { Particles } from "./Particles";
import {
  Briefcase, Shield, Headphones, AlertTriangle, Settings, LayoutGrid,
  TrendingUp, ChevronRight, Flame, Star, Clock, Trophy, LogOut, Wrench,
  Compass, X, Zap, BarChart3,
} from "lucide-react";

const categoryIcons: Record<string, typeof Briefcase> = {
  all: LayoutGrid, sales: TrendingUp, compliance: Shield,
  "customer-service": Headphones, fraud: AlertTriangle, operations: Settings,
};

const TAG_STYLES: Record<ScenarioTag, { color: string; bg: string; border: string; label: string }> = {
  RECOMMENDED: { color: "var(--accent-primary)", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.2)", label: "RECOMMENDED" },
  NEW: { color: "var(--accent-primary)", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.2)", label: "NEW" },
  MASTERED: { color: "var(--success)", bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.2)", label: "MASTERED" },
  BELOW_YOUR_LEVEL: { color: "var(--text-ghost)", bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.15)", label: "REVIEW" },
  CHALLENGE: { color: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.15)", label: "CHALLENGE" },
};

export function Lobby() {
  const { selectedCategory, setCategory, selectScenario, career, setPhase, logout, dismissSuggestion } = useGameStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [customScenarios, setCustomScenarios] = useState<Scenario[]>([]);
  const [sessionHistory, setSessionHistory] = useState<Array<{ scenarioId: string; percentage: number }>>([]);

  useEffect(() => {
    fetch("/api/admin/scenarios")
      .then(r => r.json())
      .then((rows) => {
        if (Array.isArray(rows)) {
          setCustomScenarios(rows.map((r: { data: Scenario }) => r.data));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch session history for scenario classification
  useEffect(() => {
    if (career.playerId) {
      fetch(`/api/player?id=${career.playerId}`)
        .then((r) => r.json())
        .then((player) => {
          if (player.sessions) {
            setSessionHistory(
              player.sessions.map((s: { scenarioId: string; percentage: number }) => ({
                scenarioId: s.scenarioId,
                percentage: s.percentage,
              })),
            );
          }
        })
        .catch(() => {});
    }
  }, [career.playerId, career.casesCompleted]);

  const allScenarios = [...SCENARIOS, ...customScenarios];
  const filtered = selectedCategory === "all"
    ? allScenarios
    : allScenarios.filter((s) => s.category === selectedCategory);

  // Classify and sort scenarios — works for both profiled and non-profiled users
  const adaptiveLevel = career.adaptiveLevel || "easy";
  const completedScenarios = career.completedScenarios || [];
  const expertiseAreas = career.expertiseAreas || [];

  const classifiedScenarios = useMemo(() => {
    const classified = filtered.map((s) => ({
      ...s,
      ...classifyScenario(s, adaptiveLevel, completedScenarios, sessionHistory),
    }));
    return sortScenariosForPlayer(classified, expertiseAreas);
  }, [filtered, adaptiveLevel, completedScenarios, expertiseAreas, sessionHistory]);

  const recommendedScenarios = classifiedScenarios.filter(
    (s) => (s.tag === "NEW" || s.tag === "RECOMMENDED") && !completedScenarios.includes(s.id),
  );

  const level = getCareerLevel(career.totalXP);
  const nextXP = getNextLevelXP(career.totalXP);
  const xpProgress = Math.min(100, ((career.totalXP - level.minXP) / Math.max(1, nextXP - level.minXP)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative"
    >
      <Particles count={12} />

      {/* NAV BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-4 sm:px-8 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" }}>
              <Briefcase size={14} color="#FFFFFF" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                NEXUS BANK
              </span>
              <p className="text-[9px] tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                TRAINING SIMULATION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-end min-w-0">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-semibold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                  {level.title} · Lv {level.level}
                </p>
                <p className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  {career.totalXP} / {nextXP} XP
                </p>
              </div>
              <div className="w-24">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 text-[10px] flex-wrap" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              <span className="hidden sm:flex items-center gap-1.5">
                <Briefcase size={10} style={{ color: "var(--accent-gold)" }} />
                <strong style={{ color: "var(--text-primary)" }}>{career.casesCompleted}</strong> cases
              </span>
              {career.streak > 0 && (
                <span className="hidden sm:flex items-center gap-1">
                  <Flame size={10} style={{ color: "#DC2626" }} />
                  <strong style={{ color: "var(--text-primary)" }}>{career.streak}</strong>
                </span>
              )}
              <button
                onClick={() => setPhase("leaderboard")}
                className="flex items-center gap-1 px-2 py-1 rounded-md transition-all hover:opacity-80"
                style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}
              >
                <Trophy size={10} style={{ color: "var(--accent-gold)" }} />
                <span style={{ color: "var(--accent-gold)" }}>RANKS</span>
              </button>
              <button
                onClick={() => setPhase("analytics")}
                className="flex items-center gap-1 px-2 py-1 rounded-md transition-all hover:opacity-80"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
              >
                <BarChart3 size={10} style={{ color: "#7C3AED" }} />
                <span className="hidden sm:inline" style={{ color: "#7C3AED" }}>ANALYTICS</span>
              </button>
              <button
                onClick={() => setPhase("admin")}
                className="flex items-center gap-1 px-2 py-1 rounded-md transition-all hover:opacity-80"
                style={{ background: "rgba(132,204,22,0.08)", border: "1px solid rgba(132,204,22,0.15)" }}
              >
                <Wrench size={10} style={{ color: "#65A30D" }} />
                <span className="hidden sm:inline" style={{ color: "#65A30D" }}>ADMIN</span>
              </button>
              {career.playerName && (
                <span className="hidden md:flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  {career.playerName}
                </span>
              )}
              <button onClick={logout} className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity" title="Logout">
                <LogOut size={10} style={{ color: "var(--text-ghost)" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center overflow-y-auto py-4 sm:py-8 px-3 sm:px-8">
        <div className="w-full" style={{ maxWidth: 960 }}>

          {/* ── ADAPTIVE SUGGESTION BANNER ── */}
          {career.adaptiveSuggestion && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="nexus-card px-4 py-3 mb-4 flex items-center gap-3"
              style={{ borderLeft: "3px solid var(--accent-gold)" }}
            >
              <Zap size={16} style={{ color: "var(--accent-gold)" }} />
              <p className="text-xs flex-1" style={{ color: "var(--text-primary)" }}>{career.adaptiveSuggestion}</p>
              <button onClick={dismissSuggestion} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                <X size={14} style={{ color: "var(--text-ghost)" }} />
              </button>
            </motion.div>
          )}

          {/* ── RECOMMENDED FOR YOU ── */}
          {recommendedScenarios.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Compass size={14} style={{ color: "var(--accent-gold)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>
                  RECOMMENDED FOR YOU
                </span>
                <span className="text-[9px] ml-2 px-2 py-0.5 rounded-full" style={{
                  fontFamily: "var(--font-mono)",
                  background: "var(--accent-gold-bg)",
                  color: "var(--accent-gold)",
                  border: "1px solid var(--accent-gold-border)",
                }}>
                  {DIFFICULTY_CONFIG[adaptiveLevel as keyof typeof DIFFICULTY_CONFIG]?.label || "TRAINEE"} LEVEL
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendedScenarios.slice(0, 2).map((scenario, i) => {
                  const diff = DIFFICULTY_CONFIG[scenario.difficulty];
                  const catColor = CATEGORY_COLORS[scenario.category] || "var(--accent-gold)";
                  return (
                    <motion.div
                      key={scenario.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => selectScenario(scenario)}
                      className="case-file cursor-pointer px-4 py-4 flex items-center gap-4 transition-all hover:shadow-lg"
                      style={{ borderColor: "var(--accent-gold-border)", borderWidth: 1.5 }}
                    >
                      <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold"
                        style={{
                          fontFamily: "var(--font-display)",
                          background: `linear-gradient(135deg, ${catColor}15, ${catColor}08)`,
                          border: `1px solid ${catColor}30`,
                          color: catColor,
                        }}>
                        {scenario.customer.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
                            {diff.label}
                          </span>
                          <span className="tag" style={TAG_STYLES.RECOMMENDED}>RECOMMENDED</span>
                        </div>
                        <h3 className="text-[13px] font-bold leading-tight mb-0.5" style={{ color: "var(--text-primary)" }}>
                          {scenario.title}
                        </h3>
                        <div className="flex items-center gap-3 text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                          <span>vs {scenario.customer.name}</span>
                          <span style={{ color: "var(--accent-gold)" }}>+{scenario.xpReward} XP</span>
                        </div>
                      </div>
                      <ChevronRight size={16} style={{ color: "var(--accent-gold)" }} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3"
          >
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                Case Files
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Select a scenario to begin training
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg flex-wrap w-full sm:w-auto" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat.id] || LayoutGrid;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className="px-2 sm:px-3 py-1.5 rounded-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1"
                    style={{
                      color: active ? "#FFFFFF" : "var(--text-secondary)",
                      background: active ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "transparent",
                    }}
                  >
                    <Icon size={10} /> <span className="hidden sm:inline">{cat.label}</span><span className="sm:hidden">{cat.id === "all" ? "All" : cat.label.slice(0, 4)}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {classifiedScenarios.map((scenario, i) => {
              const diff = DIFFICULTY_CONFIG[scenario.difficulty];
              const catColor = CATEGORY_COLORS[scenario.category] || "var(--accent-gold)";
              const isHovered = hoveredId === scenario.id;
              const tagStyle = TAG_STYLES[scenario.tag];

              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", damping: 20 }}
                  onClick={() => selectScenario(scenario)}
                  onMouseEnter={() => setHoveredId(scenario.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="case-file cursor-pointer px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4"
                  style={{
                    borderColor: isHovered ? "var(--border-accent)" : "var(--border)",
                    boxShadow: isHovered ? "0 0 20px rgba(37,99,235,0.08), 0 8px 32px rgba(0,0,0,0.08)" : "none",
                    transform: isHovered ? "translateY(-2px)" : "none",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    opacity: scenario.tag === "BELOW_YOUR_LEVEL" ? 0.7 : 1,
                  }}
                >
                  <div className="shrink-0 flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: `linear-gradient(135deg, ${catColor}15, ${catColor}08)`,
                        border: `1px solid ${catColor}30`,
                        color: catColor,
                      }}>
                      {scenario.customer.avatar}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 4 }).map((_, si) => (
                        <Star key={si} size={7}
                          fill={si < diff.stars ? diff.color : "transparent"}
                          style={{ color: si < diff.stars ? diff.color : "var(--text-ghost)" }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
                        {diff.label}
                      </span>
                      <span className="tag" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
                        {scenario.category.replace("-", " ")}
                      </span>
                      <span className="tag" style={{ color: tagStyle.color, background: tagStyle.bg, border: `1px solid ${tagStyle.border}` }}>
                        {tagStyle.label}
                      </span>
                    </div>
                    <h3 className="text-[13px] font-bold leading-tight mb-0.5 transition-colors"
                      style={{ color: isHovered ? "var(--accent-gold)" : "var(--text-primary)" }}>
                      {scenario.title}
                    </h3>
                    <p className="text-[10px] mb-2" style={{ color: "var(--text-secondary)" }}>
                      vs <span style={{ color: "var(--text-primary)" }}>{scenario.customer.name}</span> · {scenario.customer.profession}
                    </p>
                    <div className="flex items-center gap-3 text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                      <span className="flex items-center gap-1"><Clock size={9} /> ~3 min</span>
                      <span style={{ color: "var(--accent-gold)" }}>+{scenario.xpReward} XP</span>
                      {scenario.bestScore !== null && (
                        <span style={{ color: scenario.bestScore >= 70 ? "var(--success)" : "var(--warn)" }}>
                          Best: {scenario.bestScore}%
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background: isHovered ? "var(--accent-gold-bg)" : "transparent",
                      border: `1px solid ${isHovered ? "var(--accent-gold-border)" : "transparent"}`,
                    }}>
                    <ChevronRight size={14} style={{ color: isHovered ? "var(--accent-gold)" : "var(--text-ghost)" }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 glass-panel px-4 sm:px-8 py-2 flex items-center justify-between"
        style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "3px", color: "var(--text-ghost)", borderTop: "1px solid var(--border)" }}>
        <span>NEXUS BANK v2.0</span>
        <span>{classifiedScenarios.length} CASES AVAILABLE</span>
      </div>
    </motion.div>
  );
}
