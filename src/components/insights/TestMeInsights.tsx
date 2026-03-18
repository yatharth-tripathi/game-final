"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  Target, Shield, AlertTriangle, Lightbulb,
  User, Zap, TrendingUp, TrendingDown, Minus,
} from "lucide-react";

export function TestMeInsights() {
  const {
    currentScenario: sc, currentStepIndex, userResponses,
    mood, moodHistory, complianceViolations, showHints, toggleHints,
  } = useGameStore();

  if (!sc) return null;

  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const tasksTotal = sc.steps.filter((s) => s.speaker === "system").length;
  const tasksCompleted = userResponses.length;
  const currentSystemStep = sc.steps.filter(s => s.speaker === "system")[tasksCompleted];
  const currentHints = currentSystemStep?.hints || [];
  const currentScoring = currentSystemStep?.scoring || {};
  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";

  // Last mood delta
  const lastDelta = moodHistory.length >= 2
    ? moodHistory[moodHistory.length - 1] - moodHistory[moodHistory.length - 2]
    : 0;

  return (
    <>
      {/* Current Objective */}
      {currentSystemStep && (
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="insight-card insight-card-active"
        >
          <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
            <Target size={11} /> CURRENT OBJECTIVE
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-primary)" }}>
            {currentSystemStep.text.replace("OBJECTIVE: ", "")}
          </p>
          {/* Step progress */}
          <div className="flex items-center gap-2">
            <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
              ROUND {Math.min(tasksCompleted + 1, tasksTotal)}/{tasksTotal}
            </span>
            <div className="flex items-center gap-1.5 flex-1">
              {Array.from({ length: tasksTotal }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i < tasksCompleted ? "var(--success)" : i === tasksCompleted ? "var(--accent-gold)" : "var(--border)",
                  boxShadow: i === tasksCompleted ? "0 0 6px var(--accent-gold)" : "none",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
          </div>
        </motion.div>
      )}

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
              fontWeight: 700,
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
        <p className="text-[10px] mt-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          {mood <= 3 ? "Client is frustrated — show empathy" : mood <= 5 ? "Client is neutral — build rapport" : mood <= 7 ? "Client is warming up" : "Client trusts you"}
        </p>
      </div>

      {/* Skills Being Tested */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
          <Zap size={11} /> SKILLS IN PLAY
        </div>
        <div className="space-y-2.5">
          {sc.evaluationRules.map((rule) => {
            const isActive = currentScoring[rule.skill] !== undefined;
            return (
              <div key={rule.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px]" style={{
                    color: isActive ? "var(--text-primary)" : "var(--text-ghost)",
                    fontWeight: isActive ? 600 : 400,
                    transition: "all 0.3s ease",
                  }}>
                    {isActive && <span style={{ color: "var(--accent-gold)", marginRight: 4 }}>●</span>}
                    {rule.skill}
                  </span>
                  <span className="text-[9px]" style={{
                    fontFamily: "var(--font-mono)",
                    color: isActive ? "var(--accent-gold)" : "var(--text-ghost)",
                  }}>
                    {rule.weight}pts
                  </span>
                </div>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{
                    width: `${(rule.weight / 20) * 100}%`,
                    background: isActive
                      ? "linear-gradient(90deg, var(--accent-gold-dim), var(--accent-gold))"
                      : "var(--border)",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance Watch */}
      <div className="insight-card" style={{
        borderColor: complianceViolations.length > 0 ? "rgba(229,62,62,0.3)" : undefined,
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
        <div>
          <p className="text-[9px] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
            DO NOT SAY
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sc.complianceRules.hardBanned.map((phrase) => (
              <span key={phrase} className="text-[9px] px-2 py-1 rounded"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: complianceViolations.includes(phrase) ? "var(--danger-bg)" : "rgba(229,62,62,0.04)",
                  color: complianceViolations.includes(phrase) ? "var(--danger)" : "var(--text-ghost)",
                  border: `1px solid ${complianceViolations.includes(phrase) ? "rgba(229,62,62,0.3)" : "var(--border)"}`,
                  textDecoration: complianceViolations.includes(phrase) ? "line-through" : "none",
                }}>
                {phrase}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hints */}
      {currentHints.length > 0 && (
        <div className="insight-card">
          <button
            onClick={toggleHints}
            className="insight-card-header w-full cursor-pointer"
            style={{ color: showHints ? "var(--warn)" : "var(--text-ghost)", marginBottom: showHints ? 10 : 0 }}
          >
            <Lightbulb size={11} />
            {showHints ? "HINTS" : "SHOW HINTS"}
            <span className="ml-auto text-[9px]" style={{ fontFamily: "var(--font-mono)", opacity: 0.5 }}>
              {showHints ? "▲" : "▼"}
            </span>
          </button>
          {showHints && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="space-y-1.5">
              {currentHints.map((hint, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] leading-relaxed"
                  style={{ color: "var(--warn)" }}>
                  <span style={{ color: "var(--warn)", opacity: 0.5 }}>›</span>
                  {hint}
                </div>
              ))}
              {currentSystemStep?.idealKeywords && (
                <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                  {currentSystemStep.idealKeywords.map((kw, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{ background: "var(--warn-bg)", color: "var(--warn)", border: "1px solid rgba(214,158,46,0.15)" }}>
                      {kw}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

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
                style={{ background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid rgba(229,62,62,0.15)" }}>
                {btn}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
