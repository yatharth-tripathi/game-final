"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel, getNextLevelXP } from "@/store/useGameStore";
import { SCENARIOS, CATEGORIES, CATEGORY_COLORS, DIFFICULTY_CONFIG, type Scenario } from "@/lib/scenarios";
import { classifyScenario, sortScenariosForPlayer, type ScenarioTag } from "@/lib/adaptive";
import {
  Briefcase, Shield, Headphones, AlertTriangle, Settings, LayoutGrid,
  TrendingUp, ChevronRight, Flame, Star, Clock, Trophy, LogOut, Wrench,
  Compass, X, Zap, BarChart3, FlaskConical, Search, Bell, ArrowRight, Signal,
} from "lucide-react";

/* ── Icon map for categories ── */
const categoryIcons: Record<string, typeof Briefcase> = {
  all: LayoutGrid, sales: TrendingUp, compliance: Shield,
  "customer-service": Headphones, fraud: AlertTriangle, operations: Settings,
  pharma: FlaskConical,
  telecom: Signal,
};

/* ── Tag visual styles ── */
const TAG_STYLES: Record<ScenarioTag, { color: string; bg: string; border: string; label: string }> = {
  RECOMMENDED: { color: "var(--accent-primary)", bg: "rgba(67,97,238,0.06)", border: "rgba(67,97,238,0.18)", label: "RECOMMENDED" },
  NEW: { color: "var(--accent-primary)", bg: "rgba(67,97,238,0.06)", border: "rgba(67,97,238,0.18)", label: "NEW" },
  MASTERED: { color: "var(--success)", bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.18)", label: "MASTERED" },
  BELOW_YOUR_LEVEL: { color: "var(--text-ghost)", bg: "rgba(148,163,184,0.05)", border: "rgba(148,163,184,0.12)", label: "REVIEW" },
  CHALLENGE: { color: "#7C3AED", bg: "rgba(124,58,237,0.05)", border: "rgba(124,58,237,0.12)", label: "CHALLENGE" },
};

/* ── Category label mapping for tabs ── */
const CATEGORY_TAB_LABELS: Record<string, string> = {
  all: "All Cases",
  sales: "Sales Simulation",
  compliance: "Compliance",
  "customer-service": "Soft Skills",
  fraud: "Onboarding",
  operations: "Operations",
  pharma: "Pharma QA",
  telecom: "Telecom",
};

export function Lobby() {
  const {
    selectedCategory, setCategory, selectScenario, career,
    setPhase, logout, dismissSuggestion,
  } = useGameStore();

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [customScenarios, setCustomScenarios] = useState<Scenario[]>([]);
  const [sessionHistory, setSessionHistory] = useState<Array<{ scenarioId: string; percentage: number }>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  /* ── Load custom scenarios ── */
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

  /* ── Fetch session history for scenario classification ── */
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

  /* ── Merge, filter, classify, sort ── */
  const allScenarios = [...SCENARIOS, ...customScenarios];
  const filtered = selectedCategory === "all"
    ? allScenarios
    : allScenarios.filter((s) => s.category === selectedCategory);

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

  /* ── Search filter ── */
  const displayedScenarios = useMemo(() => {
    if (!searchQuery.trim()) return classifiedScenarios;
    const q = searchQuery.toLowerCase();
    return classifiedScenarios.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.customer.name.toLowerCase().includes(q),
    );
  }, [classifiedScenarios, searchQuery]);

  const recommendedScenarios = classifiedScenarios.filter(
    (s) => (s.tag === "NEW" || s.tag === "RECOMMENDED") && !completedScenarios.includes(s.id),
  );

  /* ── XP / Level calculations ── */
  const level = getCareerLevel(career.totalXP);
  const nextXP = getNextLevelXP(career.totalXP);
  const xpProgress = Math.min(100, ((career.totalXP - level.minXP) / Math.max(1, nextXP - level.minXP)) * 100);
  const nextLevel = level.level + 1;

  /* ── Initials from player name ── */
  const initials = career.playerName
    ? career.playerName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "ME";

  /* ── Priority scenario for feature card ── */
  const featureScenario = recommendedScenarios[0] || classifiedScenarios[0];
  /* ── Alert scenario — pick a hard/expert one that's incomplete ── */
  const alertScenario = classifiedScenarios.find(
    (s) => (s.difficulty === "hard" || s.difficulty === "expert") && !completedScenarios.includes(s.id),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col"
      style={{ background: "var(--bg-void)" }}
    >
      {/* ══════════════════════════════════════
          TOP NAVIGATION BAR
         ══════════════════════════════════════ */}
      <nav className="ei-nav" style={{ flexShrink: 0 }}>
        {/* Brand */}
        <div className="ei-nav-brand">
          WISDORA INTELLIGENCE
        </div>

        {/* Center nav links */}
        <div className="ei-nav-links" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <button
            className="ei-nav-link active"
            style={{
              borderBottom: "2px solid var(--accent-primary)",
              borderRadius: 0,
              paddingBottom: 6,
            }}
          >
            Dashboard
          </button>
          <button className="ei-nav-link" onClick={() => setPhase("lobby")}>
            Simulations
          </button>
          <button className="ei-nav-link" onClick={() => setPhase("admin")}>
            Library
          </button>
          <button className="ei-nav-link" onClick={() => setPhase("analytics")}>
            Analytics
          </button>
        </div>

        {/* Right section */}
        <div className="ei-nav-profile">
          {/* Search input */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={14}
              style={{
                position: "absolute",
                left: 10,
                color: "var(--text-muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search simulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                padding: "7px 12px 7px 30px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                background: "var(--bg-tint)",
                color: "var(--text-primary)",
                width: 180,
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Notification bell */}
          <button className="ei-nav-support coming-soon" title="Notifications — Coming Soon">
            <Bell size={16} />
          </button>

          {/* Settings */}
          <button className="ei-nav-support" onClick={() => setPhase("admin")} title="Manage Scenarios">
            <Settings size={16} />
          </button>

          {/* User avatar + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="ei-nav-avatar" onClick={() => setPhase("profile")} style={{ cursor: "pointer" }} title="View Profile">{initials}</div>
            {career.playerName && (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                }}
              >
                {career.playerName}
              </span>
            )}
            <button
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: 4,
                opacity: 0.5,
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              title="Logout"
            >
              <LogOut size={14} style={{ color: "var(--text-muted)" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          SCROLLABLE CONTENT
         ══════════════════════════════════════ */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ══════════════════════════════════════
            DARK HERO SECTION
           ══════════════════════════════════════ */}
        <section className="hero-dark">
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 32,
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ flex: "1 1 400px" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--accent-primary-glow)",
                  marginBottom: 8,
                }}
              >
                WELCOME BACK, MENTOR
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32,
                  fontWeight: 700,
                  color: "var(--text-on-dark)",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                Your Training Radar
              </h1>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--text-on-dark-secondary)",
                  maxWidth: 480,
                }}
              >
                You&apos;ve completed{" "}
                <strong style={{ color: "#FFFFFF" }}>{career.casesCompleted} cases</strong> this month.
                Keep the momentum going to reach{" "}
                <strong style={{ color: "#FFFFFF" }}>Level {nextLevel}</strong> by Friday.
              </p>
            </motion.div>

            {/* Right stat card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="stat-card"
              style={{
                flex: "0 0 auto",
                minWidth: 300,
                maxWidth: 360,
                background: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                padding: 24,
                boxShadow: "var(--shadow-lg)",
                border: "none",
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                  }}
                >
                  Experience Level {level.level}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {career.totalXP} / {nextXP} XP
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "var(--text-muted)",
                    }}
                  >
                    {Math.round(xpProgress)}%
                  </span>
                </div>
                <div className="progress-track" style={{ height: 6 }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Two stat boxes side by side */}
              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 12px",
                    textAlign: "center",
                  }}
                >
                  <p className="stat-label" style={{ marginBottom: 4 }}>
                    STREAK
                  </p>
                  <p className="stat-value" style={{ fontSize: 20 }}>
                    <Flame
                      size={14}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        color: "var(--danger)",
                        marginRight: 4,
                      }}
                    />
                    {career.streak} <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)" }}>Days</span>
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px 12px",
                    textAlign: "center",
                  }}
                >
                  <p className="stat-label" style={{ marginBottom: 4 }}>
                    BADGES
                  </p>
                  <p className="stat-value" style={{ fontSize: 20 }}>
                    <Trophy
                      size={14}
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        color: "var(--accent-primary)",
                        marginRight: 4,
                      }}
                    />
                    {career.casesCompleted}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Adaptive Suggestion Banner ── */}
        {career.adaptiveSuggestion && (
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 48px 0" }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="nexus-card"
              style={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderLeft: "3px solid var(--accent-primary)",
              }}
            >
              <Zap size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
              <p style={{ fontSize: 13, flex: 1, color: "var(--text-primary)" }}>
                {career.adaptiveSuggestion}
              </p>
              <button
                onClick={dismissSuggestion}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  opacity: 0.5,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                <X size={14} style={{ color: "var(--text-ghost)" }} />
              </button>
            </motion.div>
          </div>
        )}

        {/* ══════════════════════════════════════
            RECOMMENDED FOR YOU
           ══════════════════════════════════════ */}
        {(featureScenario || alertScenario) && (
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 48px 0" }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
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
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  Recommended For You
                </h2>
                <button
                  className="ei-nav-link"
                  style={{ fontSize: 13, color: "var(--accent-primary)", fontWeight: 600, padding: 0 }}
                >
                  View All Suggestions
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: alertScenario ? "1.6fr 1fr" : "1fr",
                  gap: 20,
                }}
              >
                {/* Feature card (left, larger) */}
                {featureScenario && (
                  <div
                    className="feature-card"
                    onClick={() => selectScenario(featureScenario)}
                    style={{
                      background: `linear-gradient(135deg, #0F172A 0%, #1E293B 50%, ${CATEGORY_COLORS[featureScenario.category] || "#4361EE"}40 100%)`,
                      color: "#FFFFFF",
                    }}
                  >
                    {/* Gradient overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      {/* Tags at top */}
                      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        <span
                          className="tag"
                          style={{
                            color: "#FFFFFF",
                            background: "rgba(67,97,238,0.5)",
                            border: "1px solid rgba(67,97,238,0.6)",
                          }}
                        >
                          PRIORITY CASE
                        </span>
                        <span
                          className="tag"
                          style={{
                            color: "#FFFFFF",
                            background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          {featureScenario.category.replace("-", " ").toUpperCase()}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 22,
                          fontWeight: 700,
                          lineHeight: 1.3,
                          marginBottom: 8,
                        }}
                      >
                        {featureScenario.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "rgba(255,255,255,0.65)",
                          marginBottom: 20,
                          maxWidth: 420,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {featureScenario.description}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="btn-gold"
                          style={{ padding: "10px 22px", fontSize: 12 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            selectScenario(featureScenario);
                          }}
                        >
                          Start Simulation <ArrowRight size={14} />
                        </button>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            fontSize: 11,
                            fontFamily: "var(--font-mono)",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Clock size={12} /> ~3 min
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {Array.from({ length: DIFFICULTY_CONFIG[featureScenario.difficulty].stars }).map((_, i) => (
                              <Star key={i} size={10} fill="rgba(255,255,255,0.6)" style={{ color: "rgba(255,255,255,0.6)" }} />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Alert card (right, smaller) */}
                {alertScenario && (
                  <div
                    className="nexus-card"
                    style={{
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => selectScenario(alertScenario)}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-md)",
                        background: "var(--warn-bg)",
                        border: "1px solid var(--warn-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                      }}
                    >
                      <AlertTriangle size={20} style={{ color: "var(--warn)" }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      Critical: {alertScenario.title.length > 45 ? alertScenario.title.slice(0, 45) + "..." : alertScenario.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                        marginBottom: 16,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {alertScenario.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        className="badge"
                        style={{
                          color: "var(--warn)",
                          background: "var(--warn-bg)",
                          border: "1px solid var(--warn-border)",
                          fontSize: 10,
                        }}
                      >
                        Urgent
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          color: "var(--text-muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        +{alertScenario.xpReward} XP REWARD
                      </span>
                    </div>
                    <button
                      className="btn-outline"
                      style={{ alignSelf: "flex-start", fontSize: 12, padding: "8px 18px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectScenario(alertScenario);
                      }}
                    >
                      Resume Training <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        )}

        {/* ══════════════════════════════════════
            CASE FILES LIBRARY
           ══════════════════════════════════════ */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 48px 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 16,
              }}
            >
              Case Files Library
            </h2>

            {/* Category tabs */}
            <div className="category-tabs" style={{ marginBottom: 24, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`category-tab ${active ? "active" : ""}`}
                  >
                    {CATEGORY_TAB_LABELS[cat.id] || cat.label}
                  </button>
                );
              })}
            </div>

            {/* Scenario grid: 4 per row on desktop, 2 on tablet, 1 on mobile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
              }}
              className="case-grid"
            >
              {displayedScenarios.map((scenario, i) => {
                const diff = DIFFICULTY_CONFIG[scenario.difficulty];
                const catColor = CATEGORY_COLORS[scenario.category] || "var(--accent-primary)";
                const isHovered = hoveredId === scenario.id;
                const tagStyle = TAG_STYLES[scenario.tag];
                const Icon = categoryIcons[scenario.category] || Briefcase;
                const isCompleted = completedScenarios.includes(scenario.id);
                const isInProgress = scenario.bestScore !== null && scenario.bestScore > 0 && !isCompleted;

                return (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, type: "spring", damping: 20 }}
                    onClick={() => selectScenario(scenario)}
                    onMouseEnter={() => setHoveredId(scenario.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="case-card"
                    style={{
                      borderColor: isHovered ? "var(--border-hover)" : "var(--border)",
                      opacity: scenario.tag === "BELOW_YOUR_LEVEL" ? 0.7 : 1,
                    }}
                  >
                    {/* Top row: icon + difficulty tag */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: 14,
                      }}
                    >
                      <div
                        className="case-card-icon"
                        style={{
                          background: `linear-gradient(135deg, ${catColor}18, ${catColor}08)`,
                          border: `1px solid ${catColor}30`,
                          color: catColor,
                          margin: 0,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <span
                        className="tag"
                        style={{
                          color: diff.color,
                          background: `${diff.color}12`,
                          border: `1px solid ${diff.color}25`,
                          fontSize: 9,
                          padding: "3px 8px",
                        }}
                      >
                        {diff.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: isHovered ? "var(--accent-primary)" : "var(--text-primary)",
                        lineHeight: 1.3,
                        marginBottom: 6,
                        transition: "color 0.15s ease",
                      }}
                    >
                      {scenario.title.length > 50 ? scenario.title.slice(0, 50) + "..." : scenario.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "var(--text-secondary)",
                        marginBottom: 14,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {scenario.description}
                    </p>

                    {/* Status indicators */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                      <span
                        className="tag"
                        style={{
                          color: tagStyle.color,
                          background: tagStyle.bg,
                          border: `1px solid ${tagStyle.border}`,
                          fontSize: 9,
                          padding: "2px 7px",
                        }}
                      >
                        {tagStyle.label}
                      </span>
                      {isInProgress && (
                        <span
                          className="badge"
                          style={{
                            color: "var(--success)",
                            background: "var(--success-bg)",
                            border: "1px solid var(--success-border)",
                            fontSize: 9,
                            padding: "2px 8px",
                          }}
                        >
                          ACTIVE
                        </span>
                      )}
                      {scenario.bestScore !== null && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            color: scenario.bestScore >= 70 ? "var(--success)" : "var(--warn)",
                          }}
                        >
                          {scenario.bestScore}%
                        </span>
                      )}
                    </div>

                    {/* Bottom row: time + reward */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 12,
                        borderTop: "1px solid var(--border-subtle)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--text-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={10} /> TIME: ~3 min
                      </span>
                      <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                        REWARD: +{scenario.xpReward} XP
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {displayedScenarios.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "48px 24px",
                  color: "var(--text-muted)",
                }}
              >
                <Search size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                <p style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600 }}>
                  No simulations found
                </p>
                <p style={{ fontSize: 13, marginTop: 4 }}>
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </motion.div>
        </section>

        {/* Spacer before footer */}
        <div style={{ height: 40 }} />

        {/* ══════════════════════════════════════
            FOOTER
           ══════════════════════════════════════ */}
        <footer className="ei-footer" style={{ borderTop: "1px solid var(--border)", padding: "20px 48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="ei-footer-brand">WISDORA INTELLIGENCE</span>
            <span className="ei-footer-copyright">
              &copy; 2024 WISDORA INTELLIGENCE. Guided by the Digital Mentor.
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="ei-footer-links">
              <span className="ei-footer-link" style={{ cursor: "default" }}>Privacy Policy</span>
              <span className="ei-footer-link" style={{ cursor: "default" }}>Terms of Service</span>
              <span className="ei-footer-link" style={{ cursor: "default" }}>Knowledge Base</span>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              <span className="dot dot-success" /> System status: Operational
            </span>
          </div>
        </footer>
      </div>

      {/* ── Responsive grid override ── */}
      <style>{`
        .case-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        @media (max-width: 1024px) {
          .case-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .hero-dark {
            padding: 28px 24px !important;
          }
          section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .ei-nav {
            padding: 0 16px !important;
          }
          .ei-footer {
            padding: 16px 24px !important;
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          .ei-nav-links {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .case-grid {
            grid-template-columns: 1fr !important;
          }
          .ei-nav-profile input {
            display: none !important;
          }
          .feature-card {
            min-height: 220px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
