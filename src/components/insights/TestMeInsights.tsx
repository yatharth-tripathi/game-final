"use client";

import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  Target, Shield, AlertTriangle,
  User, Zap, TrendingUp, TrendingDown, Minus,
  FileText, Lightbulb, Map, BarChart2,
} from "lucide-react";

export function TestMeInsights() {
  const {
    currentScenario: sc, userResponses, currentStepIndex,
    mood, moodHistory, complianceViolations,
  } = useGameStore();

  if (!sc) return null;

  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-primary)";
  const tasksTotal = sc.steps.filter((s) => s.speaker === "system").length;
  const tasksCompleted = userResponses.length;
  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";
  const overallProgress = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

  // Last mood delta
  const lastDelta = moodHistory.length >= 2
    ? moodHistory[moodHistory.length - 1] - moodHistory[moodHistory.length - 2]
    : 0;

  // Determine step statuses for the conversation map
  const systemSteps = sc.steps
    .map((step, idx) => ({ step, idx }))
    .filter(({ step }) => step.speaker === "system");

  // Current active system step index in the filtered array
  const currentSystemIdx = systemSteps.findIndex(({ idx }) => idx >= currentStepIndex);

  // Current technique/step
  const activeSystemStep = currentSystemIdx >= 0 ? systemSteps[currentSystemIdx] : null;

  // Score color helper
  const scoreColor = (val: number, max: number) => {
    const pct = max > 0 ? (val / max) * 100 : 0;
    if (pct >= 70) return "var(--success)";
    if (pct >= 40) return "var(--warn)";
    return "var(--danger)";
  };

  return (
    <>
      {/* 1. SCENARIO DETAILS */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: catColor }}>
          <FileText size={11} /> SCENARIO DETAILS
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-semibold block mb-1"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
              OBJECTIVE
            </span>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
              {sc.description}
            </p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider font-semibold block mb-1"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
              CLIENT PROFILE
            </span>
            <p className="text-[11px]" style={{ color: "var(--text-primary)", fontWeight: 500 }}>
              {sc.customer.name}, {sc.customer.age}, {sc.customer.city}
            </p>
          </div>
          <div>
            <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-semibold mb-1"
              style={{ fontFamily: "var(--font-mono)", color: "var(--warn)" }}>
              <AlertTriangle size={9} /> COMPLIANCE
            </span>
            <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {sc.complianceRules.violationMessage}
            </p>
          </div>
        </div>
      </div>

      {/* 2. TECHNIQUE SPOTLIGHT */}
      {activeSystemStep && (
        <div className="insight-card insight-card-active" style={{
          borderLeft: `3px solid var(--accent-primary)`,
        }}>
          <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
            <Lightbulb size={11} /> TECHNIQUE SPOTLIGHT
          </div>
          <p className="text-[12px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            Step {currentSystemIdx + 1}: {activeSystemStep.step.expectedAction || "Respond appropriately"}
          </p>
          <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {activeSystemStep.step.hints?.[0] || activeSystemStep.step.text}
          </p>
        </div>
      )}

      {/* 3. CONVERSATION MAP */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <Map size={11} /> CONVERSATION MAP
        </div>
        <div className="flex flex-col">
          {systemSteps.map(({ step, idx }, i) => {
            const isDone = i < tasksCompleted;
            const isActive = i === currentSystemIdx;
            const isPending = !isDone && !isActive;

            return (
              <div key={idx} className="flex items-start gap-3">
                {/* Vertical timeline line + node */}
                <div className="flex flex-col items-center" style={{ minWidth: 16 }}>
                  <div className={`timeline-node ${isDone ? "timeline-node-done" : isActive ? "timeline-node-active" : ""}`} />
                  {i < systemSteps.length - 1 && (
                    <div
                      className={`timeline-line ${isDone ? "timeline-line-done" : ""}`}
                      style={{ height: 28, marginTop: 2, marginBottom: 2 }}
                    />
                  )}
                </div>
                {/* Step info */}
                <div className="flex-1 pb-2" style={{ marginTop: -2 }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] leading-snug" style={{
                      color: isDone ? "var(--success)" : isActive ? "var(--text-primary)" : "var(--text-ghost)",
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: "var(--font-body)",
                    }}>
                      {step.expectedAction || `Round ${i + 1}`}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider shrink-0 px-1.5 py-0.5 rounded"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        color: isDone ? "var(--success)" : isActive ? "var(--accent-primary)" : "var(--text-ghost)",
                        background: isDone ? "var(--success-bg)" : isActive ? "var(--accent-primary-bg)" : "transparent",
                      }}>
                      {isDone ? "DONE" : isActive ? "ACTIVE" : "PENDING"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SKILL DEBRIEF */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <BarChart2 size={11} /> SKILL DEBRIEF
        </div>
        <div className="space-y-2.5">
          {sc.evaluationRules.map((rule) => {
            const maxPossible = rule.weight;
            // Running score estimate: proportional to progress
            const runningScore = tasksCompleted > 0
              ? Math.round((tasksCompleted / Math.max(tasksTotal, 1)) * rule.weight * (mood / 10))
              : 0;
            return (
              <div key={rule.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>
                    {rule.skill}
                  </span>
                  <span className="text-[11px]" style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: scoreColor(runningScore, maxPossible),
                  }}>
                    {runningScore}/{maxPossible}
                  </span>
                </div>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{
                    width: `${maxPossible > 0 ? (runningScore / maxPossible) * 100 : 0}%`,
                    background: scoreColor(runningScore, maxPossible),
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CLIENT INTEL */}
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
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>RISK PROFILE</span>
            <span style={{ color: "var(--text-primary)" }}>{sc.customer.archetype}</span>
          </div>
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>MAIN GOAL</span>
            <span style={{ color: "var(--text-primary)", textAlign: "right", maxWidth: "65%" }}>{sc.customer.goal}</span>
          </div>
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>DECISION STYLE</span>
            <span style={{ color: "var(--text-primary)" }}>{sc.customer.personality.split(".")[0]}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {sc.customer.hotButtons.map((btn) => (
              <span key={btn} className="text-[9px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid rgba(196,48,48,0.15)" }}>
                {btn}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Client Trust / Mood Trajectory */}
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

      {/* 6. COMPLIANCE WATCH */}
      <div className="insight-card" style={{
        borderColor: complianceViolations.length > 0 ? "rgba(196,48,48,0.3)" : undefined,
      }}>
        <div className="insight-card-header" style={{ color: complianceViolations.length > 0 ? "var(--danger)" : "var(--success)" }}>
          <Shield size={11} /> COMPLIANCE WATCH
          <span className={`dot ${complianceViolations.length > 0 ? "dot-danger" : "dot-success"}`} style={{ marginLeft: "auto" }} />
        </div>
        {complianceViolations.length > 0 ? (
          <div className="mb-3 space-y-1.5">
            {complianceViolations.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] px-2.5 py-1.5 rounded"
                style={{ background: "var(--danger-bg)", color: "var(--danger)", fontFamily: "var(--font-mono)" }}>
                <AlertTriangle size={9} /> &quot;{v}&quot; — <strong>-{sc.complianceRules.violationPenalty}pts</strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] mb-2" style={{ color: "var(--success)" }}>
            No violations detected. Keep it up!
          </p>
        )}
        <p className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          Avoid banned phrases — violations cost points
        </p>
      </div>

      {/* 7. Simulation Progress bar */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <Target size={11} /> SIMULATION PROGRESS
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
            ROUND {Math.min(tasksCompleted + 1, tasksTotal)}/{tasksTotal}
          </span>
          <span className="text-[12px] font-bold" style={{
            fontFamily: "var(--font-display)",
            color: overallProgress >= 80 ? "var(--success)" : "var(--accent-primary)",
          }}>
            {overallProgress}%
          </span>
        </div>
        <div className="progress-track" style={{ height: 5 }}>
          <div className="progress-fill" style={{
            width: `${overallProgress}%`,
            background: overallProgress >= 80
              ? "var(--success)"
              : `linear-gradient(90deg, var(--accent-primary), var(--accent-primary-glow))`,
          }} />
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          {Array.from({ length: tasksTotal }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i < tasksCompleted ? "var(--success)" : i === tasksCompleted ? "var(--accent-primary)" : "var(--border)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </>
  );
}
