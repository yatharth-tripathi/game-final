"use client";

import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  Target, Shield, AlertTriangle,
  User, Zap, TrendingUp, TrendingDown, Minus,
} from "lucide-react";

export function TestMeInsights() {
  const {
    currentScenario: sc, userResponses,
    mood, moodHistory, complianceViolations,
  } = useGameStore();

  if (!sc) return null;

  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const tasksTotal = sc.steps.filter((s) => s.speaker === "system").length;
  const tasksCompleted = userResponses.length;
  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";

  // Last mood delta
  const lastDelta = moodHistory.length >= 2
    ? moodHistory[moodHistory.length - 1] - moodHistory[moodHistory.length - 2]
    : 0;

  return (
    <>
      {/* Progress */}
      <div className="insight-card insight-card-active">
        <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
          <Target size={11} /> PROGRESS
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
            ROUND {Math.min(tasksCompleted + 1, tasksTotal)}/{tasksTotal}
          </span>
          <div className="flex items-center gap-1.5 flex-1">
            {Array.from({ length: tasksTotal }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: i < tasksCompleted ? "var(--success)" : i === tasksCompleted ? "var(--accent-gold)" : "var(--border)",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mood Trajectory */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: moodColor }}>
          {mood <= 3 ? <TrendingDown size={11} /> : mood >= 7 ? <TrendingUp size={11} /> : <Minus size={11} />}
          CLIENT TRUST
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: moodColor }}>
            {mood}
          </span>
          <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>/10</span>
          {lastDelta !== 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              background: lastDelta > 0 ? "var(--success-bg)" : "var(--danger-bg)",
              color: lastDelta > 0 ? "var(--success)" : "var(--danger)",
            }}>
              {lastDelta > 0 ? "+" : ""}{lastDelta}
            </span>
          )}
        </div>
        {/* Sparkline */}
        {moodHistory.length > 1 && (
          <div className="mood-spark">
            {moodHistory.map((val, i) => (
              <div key={i} className="mood-spark-bar" style={{
                height: `${(val / 10) * 100}%`,
                background: val <= 3 ? "var(--danger)" : val <= 6 ? "var(--warn)" : "var(--success)",
                opacity: i === moodHistory.length - 1 ? 1 : 0.5,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Skills Being Evaluated */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
          <Zap size={11} /> SKILLS BEING EVALUATED
        </div>
        <div className="space-y-2.5">
          {sc.evaluationRules.map((rule) => (
            <div key={rule.skill}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>
                  {rule.skill}
                </span>
                <span className="text-[9px]" style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-ghost)",
                }}>
                  {rule.weight}pts
                </span>
              </div>
              <div className="skill-bar">
                <div className="skill-bar-fill" style={{
                  width: `${(rule.weight / 20) * 100}%`,
                  background: "var(--border)",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Watch */}
      <div className="insight-card" style={{
        borderColor: complianceViolations.length > 0 ? "rgba(196,48,48,0.3)" : undefined,
      }}>
        <div className="insight-card-header" style={{ color: complianceViolations.length > 0 ? "var(--danger)" : "var(--success)" }}>
          <Shield size={11} /> COMPLIANCE WATCH
          <span className={`dot ${complianceViolations.length > 0 ? "dot-danger" : "dot-success"}`} style={{ marginLeft: "auto" }} />
        </div>
        {complianceViolations.length > 0 && (
          <div className="mb-3 space-y-1.5">
            {complianceViolations.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] px-2.5 py-1.5 rounded"
                style={{ background: "var(--danger-bg)", color: "var(--danger)", fontFamily: "var(--font-mono)" }}>
                <AlertTriangle size={9} /> &quot;{v}&quot; — <strong>-{sc.complianceRules.violationPenalty}pts</strong>
              </div>
            ))}
          </div>
        )}
        <p className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          Avoid banned phrases — violations cost points
        </p>
      </div>

      {/* Client Intel */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: catColor }}>
          <User size={11} /> CLIENT INTEL
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>NAME</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{sc.customer.name}</span>
          </div>
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>PROFILE</span>
            <span style={{ color: "var(--text-primary)" }}>{sc.customer.age}, {sc.customer.profession}</span>
          </div>
          <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {sc.customer.personality}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {sc.customer.hotButtons.map((btn) => (
              <span key={btn} className="text-[9px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid rgba(196,48,48,0.15)" }}>
                {btn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
