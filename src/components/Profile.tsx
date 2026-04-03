"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel, getNextLevelXP, getAvgScore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  Briefcase,
  Target,
  Flame,
  Zap,
  Bell,
  Settings,
  Layout,
  BookOpen,
  FolderOpen,
  BarChart3,
  SlidersHorizontal,
  Plus,
  ArrowLeft,
  Calendar,
  Trophy,
  Star,
  ChevronRight,
} from "lucide-react";

/* ── Types ── */
interface SessionRecord {
  id: string;
  scenarioId: string;
  category: string;
  difficulty: string;
  score: number;
  maxScore: number;
  percentage: number;
  grade: string;
  xpAwarded: number;
  timeSpent: number;
  createdAt: string;
}

/* ── Grade color helper ── */
function gradeColor(grade: string): string {
  if (grade === "A+" || grade === "A") return "var(--success)";
  if (grade === "B+" || grade === "B") return "#2563EB";
  if (grade === "C+" || grade === "C") return "var(--warn)";
  return "var(--danger)";
}

/* ── Difficulty label ── */
const DIFF_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "Trainee", color: "#2F7D5B" },
  medium: { label: "Junior RM", color: "#2563EB" },
  hard: { label: "Senior RM", color: "#D97706" },
  expert: { label: "Branch Mgr", color: "#DC2626" },
};

/* ── Format date ── */
function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

/* ── Sidebar nav links ── */
const SIDEBAR_NAV = [
  { key: "overview", label: "Overview", icon: Layout, action: "lobby" as const },
  { key: "simulations", label: "Simulations", icon: BookOpen, comingSoon: true },
  { key: "casefiles", label: "Case Files", icon: FolderOpen, comingSoon: true },
  { key: "performance", label: "Performance", icon: BarChart3, active: true },
  { key: "settings", label: "Settings", icon: SlidersHorizontal, comingSoon: true },
];

/* ══════════════════════════════════════════
   PROFILE COMPONENT
   ══════════════════════════════════════════ */

export function Profile() {
  const { career, setPhase } = useGameStore();
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [showAllSessions, setShowAllSessions] = useState(false);

  /* ── Derived values ── */
  const level = getCareerLevel(career.totalXP);
  const nextXP = getNextLevelXP(career.totalXP);
  const xpProgress = Math.min(
    100,
    ((career.totalXP - level.minXP) / Math.max(1, nextXP - level.minXP)) * 100,
  );
  const avgScore = getAvgScore(career);
  const initials = career.playerName
    ? career.playerName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ME";

  /* ── Fetch sessions on mount ── */
  useEffect(() => {
    if (!career.playerId) {
      setLoadingSessions(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(`/api/player?id=${career.playerId}`);
        if (res.ok) {
          const data = await res.json();
          setSessions(data.sessions || []);
        }
      } catch {
        /* silently fail */
      } finally {
        setLoadingSessions(false);
      }
    })();
  }, [career.playerId]);

  const visibleSessions = showAllSessions ? sessions : sessions.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col"
      style={{ background: "var(--bg-void)" }}
    >
      {/* ════════════ BODY: SIDEBAR + MAIN ════════════ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="ei-sidebar hidden md:flex">
          {/* Brand area */}
          <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "var(--accent-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                  }}
                >
                  The Mentor
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Simulation Lead
                </div>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="ei-sidebar-nav">
            {SIDEBAR_NAV.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.key}
                  className={`ei-sidebar-link${link.active ? " active" : ""}${link.comingSoon ? " coming-soon" : ""}`}
                  onClick={
                    link.action
                      ? () => setPhase(link.action!)
                      : link.active
                        ? undefined
                        : undefined
                  }
                >
                  <Icon size={16} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="ei-sidebar-footer">
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "10px 16px", fontSize: 12 }}
              onClick={() => setPhase("lobby")}
            >
              <Plus size={14} /> New Simulation
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT AREA ── */}
        <div className="flex-1 overflow-y-auto">

          {/* ── TOP BAR (right side) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 12,
              padding: "12px 24px",
              borderBottom: "1px solid var(--border)",
              background: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            {/* Mobile back button */}
            <button
              className="ei-sidebar-link md:hidden"
              onClick={() => setPhase("lobby")}
              style={{ marginRight: "auto", padding: "6px 10px" }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            <button className="ei-nav-support coming-soon"><Bell size={16} /></button>
            <button className="ei-nav-support coming-soon"><Settings size={16} /></button>
            <div className="ei-nav-avatar">{initials}</div>
          </div>

          {/* ═══════ SCROLLABLE CONTENT ═══════ */}
          <div style={{ padding: "0 0 48px" }}>

            {/* ── HERO SECTION ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="hero-dark"
              style={{ padding: "36px 32px 40px", position: "relative" }}
            >
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                style={{ position: "relative", zIndex: 1 }}
              >
                {/* Left: name + role */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--accent-primary-glow)",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    YOUR PROFILE
                  </span>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 28,
                      color: "var(--text-on-dark)",
                      lineHeight: 1.2,
                      marginBottom: 6,
                    }}
                  >
                    {career.playerName || "Agent"}
                  </h1>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--text-on-dark-secondary)",
                    }}
                  >
                    {career.currentRole || "Trainee"} &bull; {career.playerBranch}
                  </p>
                </div>

                {/* Right: XP progress card */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "var(--radius-lg)",
                    padding: "16px 20px",
                    minWidth: 200,
                    boxShadow: "var(--shadow-md)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 24,
                        color: "var(--accent-primary)",
                        lineHeight: 1,
                      }}
                    >
                      Lv.{level.level}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {level.title}
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: 6, marginBottom: 6 }}>
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--text-muted)",
                    }}
                  >
                    {career.totalXP} / {nextXP} XP
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── STATS GRID ── */}
            <div style={{ padding: "24px 32px 0" }}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* Cases Completed */}
                <div className="stat-card">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-md)",
                      background: "var(--accent-primary-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Briefcase size={18} style={{ color: "var(--accent-primary)" }} />
                  </div>
                  <div className="stat-value">{career.casesCompleted}</div>
                  <div className="stat-label" style={{ marginTop: 4 }}>Cases Completed</div>
                </div>

                {/* Average Score */}
                <div className="stat-card">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-md)",
                      background: "var(--success-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Target size={18} style={{ color: "var(--success)" }} />
                  </div>
                  <div className="stat-value">{avgScore}%</div>
                  <div className="stat-label" style={{ marginTop: 4 }}>Average Score</div>
                </div>

                {/* Current Streak */}
                <div className="stat-card">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-md)",
                      background: "var(--warn-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Flame size={18} style={{ color: "var(--warn)" }} />
                  </div>
                  <div className="stat-value">
                    {career.streak}
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-muted)", marginLeft: 4 }}>
                      days
                    </span>
                  </div>
                  <div className="stat-label" style={{ marginTop: 4 }}>Current Streak</div>
                </div>

                {/* XP Earned */}
                <div className="stat-card">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius-md)",
                      background: "rgba(124, 58, 237, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Zap size={18} style={{ color: "#7C3AED" }} />
                  </div>
                  <div className="stat-value">{career.totalXP.toLocaleString()}</div>
                  <div className="stat-label" style={{ marginTop: 4 }}>XP Earned</div>
                </div>
              </motion.div>
            </div>

            {/* ── SESSION HISTORY ── */}
            <div style={{ padding: "32px 32px 0" }}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--text-primary)",
                    }}
                  >
                    Recent Sessions
                  </h2>
                  {sessions.length > 8 && (
                    <button
                      onClick={() => setShowAllSessions(!showAllSessions)}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        color: "var(--accent-primary)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {showAllSessions ? "Show Less" : "View All"} <ChevronRight size={13} />
                    </button>
                  )}
                </div>

                {loadingSessions ? (
                  <div
                    className="nexus-card"
                    style={{
                      padding: "40px 24px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: 13,
                    }}
                  >
                    Loading sessions...
                  </div>
                ) : sessions.length === 0 ? (
                  <div
                    className="nexus-card"
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                    }}
                  >
                    <Trophy
                      size={36}
                      style={{ color: "var(--text-ghost)", margin: "0 auto 12px" }}
                    />
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                        marginBottom: 4,
                      }}
                    >
                      No sessions yet
                    </p>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
                      Start your first simulation to see your history here!
                    </p>
                    <button
                      className="btn-gold"
                      style={{ fontSize: 12, padding: "10px 24px" }}
                      onClick={() => setPhase("lobby")}
                    >
                      Start Simulation
                    </button>
                  </div>
                ) : (
                  <div className="nexus-card" style={{ overflow: "hidden" }}>
                    {/* Table header */}
                    <div
                      className="hidden sm:grid"
                      style={{
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 100px",
                        gap: 12,
                        padding: "12px 20px",
                        background: "var(--bg-tint)",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      {["Scenario", "Category", "Difficulty", "Score", "XP", "Date"].map((h) => (
                        <span
                          key={h}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase" as const,
                            color: "var(--text-muted)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Rows */}
                    {visibleSessions.map((s, i) => {
                      const catColor = CATEGORY_COLORS[s.category] || "var(--accent-primary)";
                      const diffConf = DIFF_LABELS[s.difficulty] || { label: s.difficulty, color: "var(--text-muted)" };
                      const gColor = gradeColor(s.grade);

                      return (
                        <motion.div
                          key={s.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03, duration: 0.25 }}
                          style={{
                            borderBottom: "1px solid var(--border-subtle)",
                          }}
                        >
                          {/* Desktop row */}
                          <div
                            className="hidden sm:grid"
                            style={{
                              gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 100px",
                              gap: 12,
                              padding: "14px 20px",
                              alignItems: "center",
                              transition: "background 0.15s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tint)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            {/* Scenario */}
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "var(--text-primary)",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {s.scenarioId}
                            </span>

                            {/* Category */}
                            <span
                              className="tag"
                              style={{
                                color: catColor,
                                background: `${catColor}10`,
                                border: `1px solid ${catColor}25`,
                                fontSize: 9,
                                justifySelf: "start",
                              }}
                            >
                              {s.category?.replace("-", " ").toUpperCase() || "N/A"}
                            </span>

                            {/* Difficulty */}
                            <span
                              className="tag"
                              style={{
                                color: diffConf.color,
                                background: `${diffConf.color}10`,
                                border: `1px solid ${diffConf.color}25`,
                                fontSize: 9,
                                justifySelf: "start",
                              }}
                            >
                              {diffConf.label}
                            </span>

                            {/* Score + grade */}
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontWeight: 700,
                                  fontSize: 14,
                                  color: gColor,
                                }}
                              >
                                {s.percentage}%
                              </span>
                              <span
                                className="badge"
                                style={{
                                  padding: "2px 8px",
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: gColor,
                                  background: `${gColor}12`,
                                  border: `1px solid ${gColor}30`,
                                }}
                              >
                                {s.grade}
                              </span>
                            </div>

                            {/* XP */}
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#7C3AED",
                              }}
                            >
                              +{s.xpAwarded} XP
                            </span>

                            {/* Date */}
                            <span
                              style={{
                                fontSize: 11,
                                color: "var(--text-muted)",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <Calendar size={11} />
                              {formatDate(s.createdAt)}
                            </span>
                          </div>

                          {/* Mobile row */}
                          <div
                            className="sm:hidden"
                            style={{ padding: "14px 16px" }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                                {s.scenarioId}
                              </span>
                              <span
                                style={{
                                  fontFamily: "var(--font-display)",
                                  fontWeight: 700,
                                  fontSize: 14,
                                  color: gColor,
                                }}
                              >
                                {s.percentage}% {s.grade}
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                              <span
                                className="tag"
                                style={{
                                  color: catColor,
                                  background: `${catColor}10`,
                                  border: `1px solid ${catColor}25`,
                                  fontSize: 9,
                                }}
                              >
                                {s.category?.replace("-", " ").toUpperCase() || "N/A"}
                              </span>
                              <span
                                className="tag"
                                style={{
                                  color: diffConf.color,
                                  background: `${diffConf.color}10`,
                                  border: `1px solid ${diffConf.color}25`,
                                  fontSize: 9,
                                }}
                              >
                                {diffConf.label}
                              </span>
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#7C3AED" }}>
                                +{s.xpAwarded} XP
                              </span>
                              <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: "auto" }}>
                                {formatDate(s.createdAt)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </div>

            {/* ── EXPERTISE AREAS ── */}
            <div style={{ padding: "32px 32px 0" }}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "var(--text-primary)",
                    marginBottom: 16,
                  }}
                >
                  Expertise Areas
                </h2>

                <div className="nexus-card" style={{ padding: "24px" }}>
                  {/* Tier + Role */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    {career.experienceTier && (
                      <span
                        className="badge"
                        style={{
                          color: "var(--accent-primary)",
                          background: "var(--accent-primary-bg)",
                          border: "1px solid var(--accent-primary-border)",
                        }}
                      >
                        <Star size={12} /> {career.experienceTier}
                      </span>
                    )}
                    {career.currentRole && (
                      <span
                        className="badge"
                        style={{
                          color: "var(--success)",
                          background: "var(--success-bg)",
                          border: "1px solid var(--success-border)",
                        }}
                      >
                        {career.currentRole}
                      </span>
                    )}
                  </div>

                  {/* Expertise tags */}
                  {career.expertiseAreas.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {career.expertiseAreas.map((area) => {
                        /* pick a deterministic color based on string hash */
                        const colors = ["#2D5BD2", "#C43030", "#2F7D5B", "#D97706", "#7C5AC7", "#0891B2", "#E11D48", "#4338CA"];
                        const hash = area.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
                        const color = colors[hash % colors.length];
                        return (
                          <span
                            key={area}
                            className="tag"
                            style={{
                              color,
                              background: `${color}10`,
                              border: `1px solid ${color}25`,
                              fontSize: 11,
                              padding: "5px 12px",
                            }}
                          >
                            {area}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      Complete your experience profile to see expertise areas.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ── COMPLETED SCENARIOS ── */}
            <div style={{ padding: "32px 32px 0" }}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--text-primary)",
                    }}
                  >
                    Completed Scenarios
                  </h2>
                  <span
                    className="badge"
                    style={{
                      color: "var(--accent-primary)",
                      background: "var(--accent-primary-bg)",
                      border: "1px solid var(--accent-primary-border)",
                    }}
                  >
                    {career.completedScenarios.length} scenarios mastered
                  </span>
                </div>

                {career.completedScenarios.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {career.completedScenarios.map((scenarioId, i) => (
                      <motion.div
                        key={scenarioId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.35 + i * 0.04, duration: 0.25 }}
                        className="nexus-card"
                        style={{
                          padding: "14px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "var(--success-bg)",
                            border: "1px solid var(--success-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Trophy size={13} style={{ color: "var(--success)" }} />
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {scenarioId}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="nexus-card"
                    style={{
                      padding: "32px 24px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                      fontSize: 13,
                    }}
                  >
                    No completed scenarios yet. Play your first case to get started!
                  </div>
                )}
              </motion.div>
            </div>

            {/* ── BACK TO DASHBOARD BUTTON ── */}
            <div style={{ padding: "40px 32px 0", textAlign: "center" }}>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="btn-outline"
                onClick={() => setPhase("lobby")}
                style={{ padding: "12px 32px" }}
              >
                <ArrowLeft size={14} /> Back to Dashboard
              </motion.button>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
