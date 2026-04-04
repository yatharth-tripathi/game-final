"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel, getNextLevelXP, getAvgScore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  Briefcase, Target, Flame, Zap, Bell, Settings, ArrowLeft, Calendar,
  Trophy, Star, ChevronRight, Shield, TrendingUp, Award, Clock, User,
} from "lucide-react";

interface Session {
  id: string;
  scenarioId: string;
  category: string;
  difficulty: string;
  percentage: number;
  grade: string;
  xpAwarded: number;
  timeSpent: number;
  createdAt: string;
}

const DIFF: Record<string, { label: string; color: string }> = {
  easy: { label: "Trainee", color: "#22C55E" },
  medium: { label: "Junior RM", color: "#4361EE" },
  hard: { label: "Senior RM", color: "#F59E0B" },
  expert: { label: "Branch Mgr", color: "#EF4444" },
};

function gradeColor(g: string) {
  if (g === "S" || g === "A") return "#22C55E";
  if (g === "B") return "#4361EE";
  if (g === "C") return "#F59E0B";
  return "#EF4444";
}

export function Profile() {
  const { career, setPhase } = useGameStore();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const level = getCareerLevel(career.totalXP);
  const nextXP = getNextLevelXP(career.totalXP);
  const xpPct = Math.min(100, ((career.totalXP - level.minXP) / Math.max(1, nextXP - level.minXP)) * 100);
  const avg = getAvgScore(career);
  const initials = career.playerName
    ? career.playerName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "ME";

  useEffect(() => {
    if (!career.playerId) { setLoading(false); return; }
    fetch(`/api/player?id=${career.playerId}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.sessions && setSessions(d.sessions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [career.playerId]);

  const visible = showAll ? sessions : sessions.slice(0, 5);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col" style={{ background: "var(--bg-void)" }}>

      {/* ── NAV BAR ── */}
      <nav className="ei-nav" style={{ flexShrink: 0 }}>
        <div className="ei-nav-brand" onClick={() => setPhase("lobby")} style={{ cursor: "pointer" }}>
          <ArrowLeft size={16} style={{ opacity: 0.4 }} />
          WISDORA INTELLIGENCE
        </div>
        <div className="ei-nav-links">
          <button className="ei-nav-link" onClick={() => setPhase("lobby")}>Dashboard</button>
          <button className="ei-nav-link coming-soon">Simulations</button>
          <button className="ei-nav-link coming-soon">Library</button>
          <button className="ei-nav-link active">Profile</button>
        </div>
        <div className="ei-nav-profile">
          <button className="ei-nav-support coming-soon"><Bell size={16} /></button>
          <button className="ei-nav-support coming-soon"><Settings size={16} /></button>
          <div className="ei-nav-avatar">{initials}</div>
        </div>
      </nav>

      {/* ── SCROLLABLE ── */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── HERO ── */}
        <section className="hero-dark" style={{ padding: "44px 48px" }}>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 28, maxWidth: 1100, margin: "0 auto" }}>
            {/* Left: avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "linear-gradient(135deg, #4361EE, #6380FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 700, color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                border: "3px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(67,97,238,0.3)",
              }}>
                {initials}
              </div>
              <div>
                <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#FFFFFF", lineHeight: 1.2, marginBottom: 4 }}>
                  {career.playerName || "Agent"}
                </h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                  {career.currentRole || "Trainee"} &bull; {career.playerBranch} &bull; Level {level.level} {level.title}
                </p>
              </div>
            </div>

            {/* Right: XP card */}
            <div style={{
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16, padding: "20px 24px", minWidth: 220,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, color: "#FFFFFF", lineHeight: 1 }}>
                  {career.totalXP.toLocaleString()}
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>XP</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: "rgba(255,255,255,0.12)", marginBottom: 8, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${xpPct}%` }} transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #4361EE, #6380FF)" }} />
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                {career.totalXP} / {nextXP} to Level {level.level + 1}
              </span>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 48px 64px" }}>

          {/* ── STAT CARDS ── */}
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: 40 }}>
            {[
              { icon: Briefcase, color: "#4361EE", bg: "rgba(67,97,238,0.08)", value: career.casesCompleted, label: "Cases Completed" },
              { icon: Target, color: "#22C55E", bg: "rgba(34,197,94,0.08)", value: `${avg}%`, label: "Avg Score" },
              { icon: Flame, color: "#F59E0B", bg: "rgba(245,158,11,0.08)", value: career.streak, label: "Day Streak", suffix: "days" },
              { icon: Award, color: "#7C3AED", bg: "rgba(124,58,237,0.08)", value: career.completedScenarios.length, label: "Scenarios Mastered" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="nexus-card" style={{ padding: "24px 20px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--text-primary)", lineHeight: 1, marginBottom: 4 }}>
                    {s.value}{s.suffix && <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", marginLeft: 4 }}>{s.suffix}</span>}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* ── EXPERTISE + ROLE ── */}
          {(career.expertiseAreas.length > 0 || career.experienceTier) && (
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
              className="nexus-card" style={{ padding: "28px", marginBottom: 40 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", marginBottom: 16 }}>
                Expertise & Role
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {career.experienceTier && (
                  <span className="badge" style={{ color: "var(--accent-primary)", background: "var(--accent-primary-bg)", border: "1px solid var(--accent-primary-border)" }}>
                    <Star size={12} /> {career.experienceTier} experience
                  </span>
                )}
                {career.currentRole && (
                  <span className="badge" style={{ color: "var(--success)", background: "var(--success-bg)", border: "1px solid var(--success-border)" }}>
                    <User size={12} /> {career.currentRole}
                  </span>
                )}
                {career.expertiseAreas.map(area => (
                  <span key={area} className="badge" style={{
                    color: "var(--text-secondary)", background: "var(--bg-tint)", border: "1px solid var(--border)",
                  }}>
                    <Shield size={11} /> {area}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RECENT SESSIONS ── */}
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
                Recent Sessions
              </h2>
              {sessions.length > 5 && (
                <button onClick={() => setShowAll(!showAll)} style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--accent-primary)",
                  background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                }}>
                  {showAll ? "Show Less" : `View All (${sessions.length})`} <ChevronRight size={12} />
                </button>
              )}
            </div>

            {loading ? (
              <div className="nexus-card" style={{ padding: "48px", textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
                Loading...
              </div>
            ) : sessions.length === 0 ? (
              <div className="nexus-card" style={{ padding: "48px 24px", textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--bg-tint)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Trophy size={24} style={{ color: "var(--text-ghost)" }} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>No sessions yet</p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>Complete your first simulation to see results here.</p>
                <button className="btn-gold" onClick={() => setPhase("lobby")}>Start Simulation</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {visible.map((s, i) => {
                  const cat = CATEGORY_COLORS[s.category] || "var(--accent-primary)";
                  const d = DIFF[s.difficulty] || { label: s.difficulty, color: "var(--text-muted)" };
                  const gc = gradeColor(s.grade);
                  return (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="nexus-card" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                      {/* Icon */}
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cat}10`, border: `1px solid ${cat}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Briefcase size={16} style={{ color: cat }} />
                      </div>
                      {/* Title + tags */}
                      <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {s.scenarioId}
                        </p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <span className="tag" style={{ color: cat, background: `${cat}10`, border: `1px solid ${cat}22`, fontSize: 9 }}>
                            {s.category?.replace("-", " ")}
                          </span>
                          <span className="tag" style={{ color: d.color, background: `${d.color}10`, border: `1px solid ${d.color}22`, fontSize: 9 }}>
                            {d.label}
                          </span>
                        </div>
                      </div>
                      {/* Score */}
                      <div style={{ textAlign: "center", minWidth: 60 }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: gc, lineHeight: 1 }}>
                          {s.percentage}%
                        </div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: gc, marginTop: 2 }}>
                          Grade {s.grade}
                        </div>
                      </div>
                      {/* XP */}
                      <div style={{ textAlign: "center", minWidth: 50 }}>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "#7C3AED" }}>
                          +{s.xpAwarded}
                        </div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)" }}>XP</div>
                      </div>
                      {/* Time + date */}
                      <div style={{ textAlign: "right", minWidth: 80 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", fontSize: 11, color: "var(--text-muted)" }}>
                          <Clock size={10} />
                          {Math.floor(s.timeSpent / 60)}m {s.timeSpent % 60}s
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", fontSize: 11, color: "var(--text-ghost)", marginTop: 2 }}>
                          <Calendar size={10} />
                          {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* ── COMPLETED SCENARIOS ── */}
          {career.completedScenarios.length > 0 && (
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
              style={{ marginTop: 40 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>
                  Mastered Scenarios
                </h2>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--success)" }}>
                  <TrendingUp size={12} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                  {career.completedScenarios.length} completed
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {career.completedScenarios.map(id => (
                  <div key={id} style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 14px", borderRadius: 10,
                    background: "var(--bg-surface)", border: "1px solid var(--border)",
                    fontSize: 12, fontWeight: 500, color: "var(--text-primary)",
                  }}>
                    <Trophy size={12} style={{ color: "var(--success)" }} />
                    {id}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* ── FOOTER ── */}
        <footer className="ei-footer" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="ei-footer-brand">WISDORA INTELLIGENCE</span>
          <div className="ei-footer-links">
            <span className="ei-footer-link" style={{ cursor: "default" }}>Privacy Policy</span>
            <span className="ei-footer-link" style={{ cursor: "default" }}>Terms of Service</span>
          </div>
          <span className="ei-footer-copyright">&copy; 2024 WISDORA INTELLIGENCE. All rights reserved.</span>
        </footer>
      </div>
    </motion.div>
  );
}
