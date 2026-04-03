"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS, DIFFICULTY_CONFIG } from "@/lib/scenarios";
import {
  ArrowLeft,
  User,
  Target,
  AlertTriangle,
  Heart,
  Search,
  Shield,
  BookOpen,
  MessageCircle,
  Eye,
  MessageSquare,
  Award,
  Download,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";

/* Map skill names to icons + accent colors */
const SKILL_ICON_MAP: Record<string, { icon: React.ElementType; color: string }> = {
  "Empathy":              { icon: Heart, color: "#E11D48" },
  "Needs Discovery":      { icon: Search, color: "#2563EB" },
  "Objection Handling":   { icon: Shield, color: "#D97706" },
  "Product Knowledge":    { icon: BookOpen, color: "#7C3AED" },
  "Compliance Language":  { icon: Shield, color: "#DC2626" },
  "Communication Clarity":{ icon: MessageCircle, color: "#0891B2" },
  "De-escalation":        { icon: Shield, color: "#EA580C" },
  "Problem Ownership":    { icon: Target, color: "#059669" },
  "Process Knowledge":    { icon: BookOpen, color: "#4338CA" },
};

function getSkillMeta(skill: string) {
  return SKILL_ICON_MAP[skill] || { icon: Target, color: "var(--accent-primary)" };
}

export function Briefing() {
  const { currentScenario, startGame, resetGame, setGameMode, setPhase } = useGameStore();
  if (!currentScenario) return null;

  const sc = currentScenario;
  const diff = DIFFICULTY_CONFIG[sc.difficulty];
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-primary)";

  /* Derive some display values */
  const caseId = sc.id.slice(-4).toUpperCase();
  const moodPct = sc.customer.moodInitial * 10;
  const moodColor =
    sc.customer.moodInitial <= 3
      ? "var(--danger)"
      : sc.customer.moodInitial <= 6
        ? "var(--warn)"
        : "var(--success)";

  const personalityShort = sc.customer.personality.length > 60
    ? sc.customer.personality.slice(0, 60).trim() + "..."
    : sc.customer.personality;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col"
      style={{ background: "var(--bg-void)" }}
    >
      {/* ── TOP NAV BAR ── */}
      <nav className="ei-nav shrink-0">
        <div className="ei-nav-brand" onClick={resetGame} style={{ cursor: "pointer" }}>
          <ArrowLeft size={16} style={{ opacity: 0.5 }} />
          Editorial Intelligence
        </div>
        <div className="ei-nav-links hidden md:flex">
          <button className="ei-nav-link" onClick={resetGame}>Dashboard</button>
          <button className="ei-nav-link">Curriculum</button>
          <button className="ei-nav-link active">Library</button>
          <button className="ei-nav-link">Resources</button>
        </div>
        <div className="ei-nav-profile">
          <button className="ei-nav-support"><Bell size={16} /></button>
          <button className="ei-nav-support"><Settings size={16} /></button>
          <div className="ei-nav-avatar">RM</div>
        </div>
      </nav>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 sm:px-8 py-6 sm:py-10 mx-auto" style={{ maxWidth: 1000 }}>

          {/* ── HEADER SECTION ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            {/* Tags row */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="tag"
                  style={{
                    color: catColor,
                    background: `${catColor}10`,
                    border: `1px solid ${catColor}25`,
                  }}
                >
                  TRAINING / {sc.category.replace("-", " ").toUpperCase()}
                </span>
                <span
                  className="tag"
                  style={{
                    color: "var(--accent-primary)",
                    background: "var(--accent-primary-bg)",
                    border: "1px solid var(--accent-primary-border)",
                  }}
                >
                  +{sc.xpReward} XP Reward
                </span>
                <span
                  className="tag"
                  style={{
                    color: diff.color,
                    background: `${diff.color}10`,
                    border: `1px solid ${diff.color}25`,
                  }}
                >
                  {diff.label}
                </span>
              </div>

              <button className="btn-outline" style={{ fontSize: 11, padding: "8px 16px" }}>
                <Download size={13} />
                Download Brief
              </button>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                fontStyle: "italic",
                color: "var(--text-primary)",
                lineHeight: 1.25,
                marginBottom: 8,
              }}
            >
              {sc.title}
              <span style={{ fontWeight: 400, fontStyle: "italic", opacity: 0.6 }}>
                {" "}&mdash; {personalityShort}
              </span>
            </h1>

            {/* Case file ID + difficulty line */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-muted)",
                letterSpacing: "0.02em",
              }}
            >
              Case File: #SIM-{caseId} &bull; Difficulty: {diff.label}
            </p>
          </motion.div>

          {/* ── TWO-COLUMN: CLIENT DOSSIER + SCORING ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">

            {/* ── LEFT COLUMN: CLIENT DOSSIER (~55%) ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="lg:col-span-7 nexus-card"
              style={{ padding: "28px 24px" }}
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-5">
                <User size={14} style={{ color: catColor }} />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    color: catColor,
                    textTransform: "uppercase",
                  }}
                >
                  CLIENT DOSSIER
                </span>
              </div>

              {/* Client avatar + basic info */}
              <div className="flex items-start gap-5 mb-5">
                <div
                  className="shrink-0 flex items-center justify-center text-2xl font-bold"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `${catColor}10`,
                    border: `2px solid ${catColor}30`,
                    color: catColor,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {sc.customer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--text-primary)",
                      marginBottom: 2,
                    }}
                  >
                    {sc.customer.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4 }}>
                    {sc.customer.age} years &bull; {sc.customer.city}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {sc.customer.profession}
                  </p>
                </div>
              </div>

              {/* Key-value pairs */}
              <div
                className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 pb-5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    INCOME LEVEL
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    Stable / Mid-Tier
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    RISK PROFILE
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    {sc.customer.archetype || "Conservative"}
                  </span>
                </div>
              </div>

              {/* Mood / Receptivity */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Current Mood / Receptivity
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: moodColor,
                    }}
                  >
                    {sc.customer.moodInitial}/10
                  </span>
                </div>
                <div className="mood-bar" style={{ height: 6 }}>
                  <motion.div
                    className="mood-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${moodPct}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ background: moodColor }}
                  />
                </div>
              </div>

              {/* Personality quote */}
              <div
                style={{
                  borderLeft: `3px solid ${catColor}40`,
                  paddingLeft: 16,
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontStyle: "italic",
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                  }}
                >
                  &ldquo;{sc.customer.personality}&rdquo;
                </p>
              </div>

              {/* Goal */}
              <div
                style={{
                  background: "var(--bg-tint)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px 16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  CLIENT OBJECTIVE
                </span>
                <p style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>
                  {sc.customer.goal}
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: SCORING CRITERIA (~45%) ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="lg:col-span-5 flex flex-col gap-5"
            >
              {/* Scoring criteria card */}
              <div className="nexus-card flex-1" style={{ padding: "28px 24px" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Target size={14} style={{ color: "var(--accent-primary)" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--accent-primary)",
                      textTransform: "uppercase",
                    }}
                  >
                    SCORING CRITERIA
                  </span>
                </div>

                <div className="space-y-3">
                  {sc.evaluationRules.map((rule) => {
                    const meta = getSkillMeta(rule.skill);
                    const Icon = meta.icon;
                    return (
                      <div
                        key={rule.skill}
                        className="flex items-center gap-3"
                        style={{
                          padding: "10px 12px",
                          background: "var(--bg-tint)",
                          borderRadius: "var(--radius-md)",
                        }}
                      >
                        <div
                          className="shrink-0 flex items-center justify-center"
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: `${meta.color}15`,
                          }}
                        >
                          <Icon size={13} style={{ color: meta.color }} />
                        </div>
                        <span
                          className="flex-1"
                          style={{ fontSize: 13, color: "var(--text-primary)" }}
                        >
                          {rule.skill}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            fontWeight: 700,
                            color: meta.color,
                          }}
                        >
                          {rule.weight} pts
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compliance Warning */}
              <div className="compliance-alert" style={{ padding: "20px" }}>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={14} style={{ color: "var(--danger)" }} />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "var(--danger)",
                      textTransform: "uppercase",
                    }}
                  >
                    Compliance Warning
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    marginBottom: 8,
                  }}
                >
                  Banned phrases trigger an <strong style={{ color: "var(--danger)" }}>instant violation</strong> with
                  a <strong style={{ color: "var(--danger)" }}>&minus;{sc.complianceRules.violationPenalty} point</strong> penalty.
                  Stay compliant at all times.
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}
                >
                  {sc.complianceRules.violationMessage}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── MODE SELECTION ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mb-10"
          >
            <p
              className="text-center mb-6"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              SELECT YOUR PATH
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* SHOW ME */}
              <motion.button
                onClick={() => { setGameMode("showme"); setPhase("showme"); }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mode-card"
                style={{ textAlign: "center" }}
              >
                <div
                  className="mode-card-icon"
                  style={{
                    background: "var(--success-bg)",
                    border: "1px solid var(--success-border)",
                    color: "var(--success)",
                  }}
                >
                  <Eye size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Show Me
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    marginBottom: 16,
                  }}
                >
                  Watch a masterclass simulation. Perfect for observing the topic before you dive in.
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--success)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  EXPLORE MASTERCLASS <ChevronRight size={13} />
                </span>
              </motion.button>

              {/* TRY ME */}
              <motion.button
                onClick={() => { setGameMode("tryme"); setPhase("tryme"); }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mode-card"
                style={{ textAlign: "center" }}
              >
                <div
                  className="mode-card-icon"
                  style={{
                    background: "var(--warn-bg)",
                    border: "1px solid var(--warn-border)",
                    color: "var(--warn)",
                  }}
                >
                  <MessageSquare size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Try Me
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    marginBottom: 16,
                  }}
                >
                  Practice freely with the mentor. No pressure, just conversation and live feedback.
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--warn)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  START FREE PRACTICE <ChevronRight size={13} />
                </span>
              </motion.button>

              {/* TEST ME (highlighted/active) */}
              <motion.button
                onClick={startGame}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mode-card active"
                style={{ textAlign: "center" }}
              >
                <div
                  className="mode-card-icon"
                  style={{
                    background: "var(--accent-primary)",
                    color: "#FFFFFF",
                  }}
                >
                  <Award size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--accent-primary)",
                    marginBottom: 8,
                  }}
                >
                  Test Me
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "var(--text-secondary)",
                    marginBottom: 16,
                  }}
                >
                  Formal evaluation mode. Earn XP and advance your certification status.
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--accent-primary)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  BEGIN CERTIFICATION <ChevronRight size={13} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
