"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS, DIFFICULTY_CONFIG } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Trophy, RotateCcw, ChevronRight, Zap, AlertTriangle,
  TrendingUp, TrendingDown, Shield, CheckCircle, XCircle,
  Briefcase, Target, MessageSquare, Award,
} from "lucide-react";

function AnimatedNumber({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = Date.now();
    const from = 0;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [value, duration]);

  return <>{display}</>;
}

export function Evaluation() {
  const store = useGameStore();
  const { evaluation, currentScenario, messages, resetGame, selectScenario, career, awardXP, elapsedTime, mood, complianceViolations, updateAdaptiveLevel } = store;
  const [xpAwarded, setXpAwarded] = useState(false);
  const sessionSaved = useRef(false);

  const sc = currentScenario;
  const ev = evaluation;

  // Award XP locally
  useEffect(() => {
    if (ev && sc && !xpAwarded) {
      awardXP(ev.xpAwarded, sc.id, ev.percentage);
      setXpAwarded(true);
    }
  }, [ev, sc, xpAwarded, awardXP]);

  // Save session to database
  useEffect(() => {
    if (ev && sc && !sessionSaved.current && career.playerId) {
      sessionSaved.current = true;
      fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerId: career.playerId,
          scenarioId: sc.id,
          scenarioTitle: sc.title,
          category: sc.category,
          difficulty: sc.difficulty,
          score: ev.totalScore,
          maxScore: ev.maxScore,
          percentage: ev.percentage,
          grade: ev.grade,
          xpAwarded: ev.xpAwarded,
          timeSpent: elapsedTime,
          mood,
          violations: complianceViolations.length,
          evaluatedBy: ev.evaluatedBy,
          skillScores: ev.skills,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.adaptiveLevel) {
            updateAdaptiveLevel(data.adaptiveLevel, data.adaptiveLevelScore || 0, data.adaptiveSuggestion || null);
          }
        })
        .catch((err) => console.error("Failed to save session:", err));
    }
  }, [ev, sc, career.playerId, elapsedTime, mood, complianceViolations]);

  if (!ev || !sc) return null;

  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const diff = DIFFICULTY_CONFIG[sc.difficulty];
  const hasViolations = ev.complianceViolations && ev.complianceViolations.length > 0;

  const gradeColors: Record<string, string> = {
    S: "var(--accent-primary)", A: "var(--success)", B: "#4A7AE8", C: "var(--warn)", D: "var(--danger)", F: "var(--danger)",
  };
  const gradeColor = gradeColors[ev.grade] || "var(--accent-primary)";

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
        <div className="px-3 sm:px-6 py-3 flex items-center justify-between gap-2 flex-wrap">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", color: "var(--text-ghost)" }}>
            DEBRIEF
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
              {diff.label}
            </span>
            <span className="tag hidden sm:inline-flex" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
              {sc.category.replace("-", " ")}
            </span>
          </div>
          <span className="hidden sm:inline" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-ghost)" }}>
            {ev.evaluatedBy === "ai" ? "AI EVALUATED" : "RULE-BASED"}
          </span>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-8 py-4 sm:py-8">

          {/* ── VERDICT ── */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-10"
          >
            {/* Score */}
            <div className="mb-4">
              <span className="text-4xl sm:text-6xl font-bold" style={{ fontFamily: "var(--font-display)", color: gradeColor }}>
                <AnimatedNumber value={ev.percentage} />
              </span>
              <span className="text-xl sm:text-2xl ml-1" style={{ fontFamily: "var(--font-display)", color: "var(--text-ghost)" }}>/100</span>
            </div>

            {/* Grade Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg mb-4"
              style={{ background: gradeColor, border: `1px solid ${gradeColor}`, color: "#FFFFFF" }}
            >
              <Trophy size={16} style={{ color: "#FFFFFF" }} />
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "#FFFFFF" }}>
                Grade {ev.grade}
              </span>
              {hasViolations && (
                <span className="tag tag-danger ml-2">COMPLIANCE BREACH</span>
              )}
            </motion.div>

            {/* XP Awarded */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <Zap size={14} style={{ color: "var(--accent-gold)" }} />
              <span className="text-sm font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--accent-gold)" }}>
                +{ev.xpAwarded} XP
              </span>
              <span className="text-xs" style={{ color: "var(--text-ghost)" }}>awarded</span>
            </motion.div>
          </motion.div>

          {/* ── SKILL BREAKDOWN ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
            style={{ borderTop: "2px solid var(--accent-gold-border)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Target size={14} style={{ color: "var(--accent-gold)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                SKILL BREAKDOWN
              </span>
              <span className="ml-auto text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                {ev.totalScore} / {ev.maxScore} total
              </span>
            </div>

            <div className="space-y-4">
              {ev.skills.map((skill, i) => {
                const pct = skill.maxScore > 0 ? (skill.score / skill.maxScore) * 100 : 0;
                const barColor = pct >= 80 ? "var(--success)" : pct >= 50 ? "var(--warn)" : "var(--danger)";
                return (
                  <motion.div
                    key={skill.skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{skill.skill}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: barColor }}>
                        {skill.score}/{skill.maxScore}
                      </span>
                    </div>
                    <div className="progress-track" style={{ height: 5 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: barColor }}
                      />
                    </div>
                    {skill.feedback && (
                      <p className="text-[10px] mt-1" style={{ color: "var(--text-secondary)" }}>{skill.feedback}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── SKILL RADAR CHART ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="nexus-card p-4 sm:p-6 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target size={14} style={{ color: "var(--accent-gold)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                PERFORMANCE RADAR
              </span>
            </div>
            <div className="w-full h-55 sm:h-75">
              <ResponsiveContainer>
                <RadarChart data={ev.skills.map(s => ({
                  skill: s.skill.length > 12 ? s.skill.slice(0, 12) + "…" : s.skill,
                  score: s.maxScore > 0 ? Math.round((s.score / s.maxScore) * 100) : 0,
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
                    stroke="rgba(45,91,210,0.2)"
                    fill="rgba(45,91,210,0.05)"
                    strokeDasharray="4 4"
                  />
                  <Radar
                    name="Your Score"
                    dataKey="score"
                    stroke="var(--accent-primary)"
                    fill="rgba(45,91,210,0.15)"
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ── TWO COLUMN: Strengths + Improvements ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Strengths */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="nexus-card p-3 sm:p-5"
              style={{ borderTop: "2px solid var(--success-border)", background: "var(--success-bg)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={13} style={{ color: "var(--success)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--success)" }}>
                  STRENGTHS
                </span>
              </div>
              {ev.strengths && ev.strengths.length > 0 ? (
                <div className="space-y-2">
                  {ev.strengths.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "var(--success)" }} />
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>{s}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Complete more rounds to see detailed strengths.</p>
              )}
            </motion.div>

            {/* Improvements */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="nexus-card p-3 sm:p-5"
              style={{ borderTop: "2px solid var(--warn-border)", background: "var(--warn-bg)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown size={13} style={{ color: "var(--warn)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--warn)" }}>
                  AREAS TO IMPROVE
                </span>
              </div>
              {ev.improvements && ev.improvements.length > 0 ? (
                <div className="space-y-2">
                  {ev.improvements.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <XCircle size={12} className="shrink-0 mt-0.5" style={{ color: "var(--warn)" }} />
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-primary)" }}>{s}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>No specific improvements identified.</p>
              )}
            </motion.div>
          </div>

          {/* ── BEST / WORST MOMENT ── */}
          {(ev.bestMoment || ev.worstMoment) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {ev.bestMoment && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="nexus-card p-3 sm:p-5"
                  style={{ borderTop: "2px solid var(--success-border)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={13} style={{ color: "var(--success)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--success)" }}>
                      BEST MOMENT
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-primary)", borderLeft: "2px solid var(--success)", paddingLeft: 12 }}>
                    &ldquo;{ev.bestMoment}&rdquo;
                  </p>
                </motion.div>
              )}
              {ev.worstMoment && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="nexus-card p-3 sm:p-5"
                  style={{ borderTop: "2px solid var(--danger-bg)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={13} style={{ color: "var(--danger)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--danger)" }}>
                      ROOM TO IMPROVE
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-primary)", borderLeft: "2px solid var(--danger)", paddingLeft: 12 }}>
                    &ldquo;{ev.worstMoment}&rdquo;
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {/* ── COMPLIANCE REPORT ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="nexus-card p-4 sm:p-5 mb-4 sm:mb-6"
            style={{ borderTop: hasViolations ? "2px solid var(--danger-bg)" : "2px solid var(--success-border)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield size={13} style={{ color: hasViolations ? "var(--danger)" : "var(--success)" }} />
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
                color: hasViolations ? "var(--danger)" : "var(--success)",
              }}>
                COMPLIANCE REPORT
              </span>
              {!hasViolations && (
                <span className="tag tag-success ml-2">CLEAN</span>
              )}
            </div>
            {hasViolations ? (
              <div className="space-y-3">
                {ev.complianceViolations.map((v, i) => (
                  <div key={i} className="compliance-alert p-3">
                    <p className="text-[10px] font-bold mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--danger)" }}>
                      Banned phrase: &ldquo;{v.phrase}&rdquo; · -{v.penalty}pts
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{v.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                No compliance violations detected. You maintained professional and regulatory-compliant language throughout.
              </p>
            )}
          </motion.div>

          {/* ── CONVERSATION REPLAY ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="nexus-card p-4 sm:p-5 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={13} style={{ color: "var(--accent-gold)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                CONVERSATION REPLAY
              </span>
            </div>
            <div className="space-y-3">
              {messages.filter(m => m.role !== "system" && m.role !== "compliance").map((msg, i) => (
                <div key={i} className="flex gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-bold"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: msg.role === "customer" ? `${catColor}10` : "var(--accent-gold-bg)",
                      color: msg.role === "customer" ? catColor : "var(--accent-gold)",
                      border: `1px solid ${msg.role === "customer" ? `${catColor}20` : "var(--accent-gold-border)"}`,
                    }}>
                    {msg.role === "customer" ? sc.customer.avatar.charAt(0) : "Y"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-0.5" style={{
                      fontFamily: "var(--font-mono)",
                      color: msg.role === "customer" ? catColor : "var(--accent-gold)",
                    }}>
                      {msg.role === "customer" ? sc.customer.name : "You (RM)"}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── GHOST REPLAY — What the ideal RM would have said ── */}
          {ev.ghostResponses && ev.ghostResponses.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.63 }}
              className="nexus-card p-4 sm:p-5 mb-4 sm:mb-6"
              style={{ borderTop: "2px solid rgba(45,91,210,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Target size={13} style={{ color: "var(--accent-gold)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                  GHOST REPLAY — IDEAL RESPONSES
                </span>
              </div>
              <div className="space-y-4">
                {ev.ghostResponses.map((ghost, i) => (
                  <div key={i} className="rounded-lg p-4" style={{ background: "var(--info-bg)", border: "1px solid var(--border)" }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                      STEP {ghost.step}
                    </p>
                    <div className="mb-3">
                      <p className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--danger)" }}>
                        YOUR RESPONSE
                      </p>
                      <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-secondary)", borderLeft: "2px solid var(--danger)", paddingLeft: 10 }}>
                        &ldquo;{ghost.actual}&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>
                        IDEAL RESPONSE
                      </p>
                      <p className="text-xs leading-relaxed italic" style={{ color: "var(--text-primary)", borderLeft: "2px solid var(--success)", paddingLeft: 10 }}>
                        &ldquo;{ghost.ideal}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── MOOD ANALYSIS ── */}
          {ev.moodAnalysis && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.64 }}
              className="nexus-card p-4 sm:p-5 mb-4 sm:mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={13} style={{ color: "var(--accent-gold)" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                  CLIENT MOOD ANALYSIS
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                {ev.moodAnalysis}
              </p>
            </motion.div>
          )}

          {/* ── OVERALL FEEDBACK ── */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="case-file p-4 sm:p-5 mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Briefcase size={13} style={{ color: "var(--accent-gold)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent-gold)" }}>
                COACHING PRESCRIPTION
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-primary)" }}>
              {ev.overallFeedback}
            </p>
            {ev.nextRecommendation && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "var(--accent-gold-bg)", border: "1px solid var(--accent-gold-border)" }}>
                <ChevronRight size={12} style={{ color: "var(--accent-gold)" }} />
                <p className="text-xs" style={{ color: "var(--accent-gold)" }}>
                  <strong>Next:</strong> {ev.nextRecommendation}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 shrink-0 glass-panel px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <motion.button
          onClick={() => { if (sc) selectScenario(sc); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-ghost px-6 py-2.5"
        >
          <RotateCcw size={12} /> RETRY CASE
        </motion.button>
        <motion.button
          onClick={resetGame}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-gold px-8 py-2.5"
        >
          NEXT CASE <ChevronRight size={14} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
