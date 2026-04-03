"use client";

import { useGameStore } from "@/store/useGameStore";
import {
  Heart, Search, Shield, AlertTriangle, User, Target,
  Activity, BookOpen, Map, TrendingUp,
  TrendingDown, Minus, BarChart2,
} from "lucide-react";

/* ── Skill icon helper ── */
function SkillIcon({ skill, size = 14 }: { skill: string; size?: number }) {
  const s = skill.toLowerCase();
  if (s.includes("empathy") || s.includes("rapport"))
    return <Heart size={size} style={{ color: "#E11D48" }} />;
  if (s.includes("needs") || s.includes("discovery"))
    return <Search size={size} style={{ color: "#D97706" }} />;
  if (s.includes("objection"))
    return <Shield size={size} style={{ color: "#94A3B8" }} />;
  if (s.includes("product") || s.includes("knowledge"))
    return <BookOpen size={size} style={{ color: "#94A3B8" }} />;
  return <Activity size={size} style={{ color: "var(--accent-primary)" }} />;
}

export function TestMeInsights() {
  const {
    currentScenario: sc, userResponses, currentStepIndex,
    mood, moodHistory, complianceViolations,
  } = useGameStore();

  if (!sc) return null;

  const tasksTotal = sc.steps.filter((s) => s.speaker === "system").length;
  const tasksCompleted = userResponses.length;
  const overallProgress = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";

  // Last mood delta
  const lastDelta = moodHistory.length >= 2
    ? moodHistory[moodHistory.length - 1] - moodHistory[moodHistory.length - 2]
    : 0;

  // System steps for conversation map
  const systemSteps = sc.steps
    .map((step, idx) => ({ step, idx }))
    .filter(({ step }) => step.speaker === "system");

  const currentSystemIdx = systemSteps.findIndex(({ idx }) => idx >= currentStepIndex);

  // Active technique
  const activeSystemStep = currentSystemIdx >= 0 ? systemSteps[currentSystemIdx] : null;

  // Mood insight text
  const moodInsight = (() => {
    if (mood >= 8) return "Client is highly engaged and receptive. Maintain this positive momentum by continuing your current approach.";
    if (mood >= 6) return "Client shows moderate interest. Look for opportunities to deepen the conversation and build stronger rapport.";
    if (mood >= 4) return "Client is neutral. Consider adjusting your approach to better connect with their needs and concerns.";
    return "Client trust is low. Focus on active listening, empathy, and addressing their core concerns directly.";
  })();

  // Block color for trust blocks
  const blockColor = (filled: boolean, value: number) => {
    if (!filled) return "#E2E8F0";
    if (value >= 7) return "linear-gradient(135deg, #4361EE, #6380FF)";
    if (value >= 4) return "linear-gradient(135deg, #F59E0B, #FBBF24)";
    return "linear-gradient(135deg, #EF4444, #F87171)";
  };

  return (
    <>
      {/* ═══ 1. SIMULATION PROGRESS ═══ */}
      <div className="insight-card">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}>
          <div className="insight-card-header" style={{
            color: "var(--accent-primary)",
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            <Target size={11} /> SIMULATION PROGRESS
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--accent-primary)",
          }}>
            Round {Math.min(tasksCompleted + 1, tasksTotal)}/{tasksTotal}
          </span>
        </div>
        <div className="progress-track" style={{ height: 6, borderRadius: 99 }}>
          <div className="progress-fill" style={{
            width: `${overallProgress}%`,
            background: `linear-gradient(90deg, var(--accent-primary), var(--accent-primary-glow))`,
            borderRadius: 99,
          }} />
        </div>
      </div>

      {/* ═══ 2. CLIENT TRUST SCORE ═══ */}
      <div className="insight-card">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}>
          <div className="insight-card-header" style={{
            color: moodColor,
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            {mood <= 3 ? <TrendingDown size={11} /> : mood >= 7 ? <TrendingUp size={11} /> : <Minus size={11} />}
            CLIENT TRUST SCORE
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1,
              color: moodColor,
            }}>
              {mood}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-ghost)",
            }}>
              /10
            </span>
            {lastDelta !== 0 && (
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 600,
                marginLeft: 6,
                padding: "2px 6px",
                borderRadius: 99,
                background: lastDelta > 0 ? "var(--success-bg)" : "var(--danger-bg)",
                color: lastDelta > 0 ? "var(--success)" : "var(--danger)",
              }}>
                {lastDelta > 0 ? "+" : ""}{lastDelta}
              </span>
            )}
          </div>
        </div>

        {/* Trust blocks */}
        <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const filled = i < mood;
            return (
              <div key={i} style={{
                width: 20,
                height: 8,
                borderRadius: 2,
                background: blockColor(filled, mood),
                transition: "all 0.3s ease",
              }} />
            );
          })}
        </div>

        {/* Insight text */}
        <div>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginRight: 4,
          }}>
            Insight:
          </span>
          <span style={{
            fontSize: 11,
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}>
            {moodInsight}
          </span>
        </div>
      </div>

      {/* ═══ 3. SKILLS MATRIX ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <BarChart2 size={11} /> SKILLS MATRIX
        </div>
        <div>
          {sc.evaluationRules.map((rule, i) => {
            const runningScore = tasksCompleted > 0
              ? Math.round((tasksCompleted / Math.max(tasksTotal, 1)) * rule.weight * (mood / 10))
              : 0;
            const isPending = runningScore === 0;

            return (
              <div key={rule.skill} style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom: i < sc.evaluationRules.length - 1 ? "1px solid var(--border-subtle)" : "none",
                opacity: isPending ? 0.55 : 1,
                transition: "opacity 0.2s ease",
              }}>
                {/* Skill icon */}
                <div style={{
                  width: 14,
                  height: 14,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <SkillIcon skill={rule.skill} size={14} />
                </div>

                {/* Skill name */}
                <span style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--text-primary)",
                }}>
                  {rule.skill}
                </span>

                {/* Score or Pending */}
                {isPending ? (
                  <span style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "var(--text-ghost)",
                  }}>
                    Pending
                  </span>
                ) : (
                  <span style={{
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-primary)",
                  }}>
                    +{runningScore}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ 4. CLIENT INTEL ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <User size={11} /> CLIENT INTEL
        </div>

        {/* Avatar row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1e3a5f, #2d5f8a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 700,
              color: "#FFFFFF",
            }}>
              {sc.customer.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 1.3,
            }}>
              {sc.customer.name}
            </div>
            <div style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              lineHeight: 1.3,
            }}>
              {sc.customer.age} yrs, {sc.customer.profession}
            </div>
          </div>
        </div>

        {/* Key-value pairs */}
        <div>
          {[
            { label: "RISK PROFILE", value: sc.customer.archetype },
            { label: "MAIN GOAL", value: sc.customer.goal.length > 60 ? sc.customer.goal.substring(0, 57) + "..." : sc.customer.goal },
            { label: "COMMUNICATION", value: sc.customer.personality.split(".")[0] },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none",
              gap: 12,
            }}>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-ghost)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--text-primary)",
                textAlign: "right",
                lineHeight: 1.4,
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 5. COMPLIANCE WATCH ═══ */}
      <div className="insight-card" style={{
        borderColor: complianceViolations.length > 0 ? "rgba(196,48,48,0.3)" : undefined,
      }}>
        <div className="insight-card-header" style={{
          color: complianceViolations.length > 0 ? "var(--danger)" : "var(--success)",
        }}>
          <Shield size={11} /> COMPLIANCE WATCH
          <span
            className={`dot ${complianceViolations.length > 0 ? "dot-danger" : "dot-success"}`}
            style={{ marginLeft: "auto" }}
          />
        </div>
        {complianceViolations.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {complianceViolations.map((v, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 10,
                padding: "6px 10px",
                borderRadius: "var(--radius-sm)",
                background: "var(--danger-bg)",
                color: "var(--danger)",
                fontFamily: "var(--font-mono)",
              }}>
                <AlertTriangle size={9} />
                <span>&quot;{v}&quot; &mdash; <strong>-{sc.complianceRules.violationPenalty}pts</strong></span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{
            fontSize: 11,
            color: "var(--success)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            No violations detected
          </p>
        )}
      </div>

      {/* ═══ 6. TECHNIQUE SPOTLIGHT ═══ */}
      {activeSystemStep && (
        <div className="insight-card insight-card-active" style={{
          borderLeft: "3px solid var(--accent-primary)",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-ghost)",
            marginBottom: 4,
          }}>
            CONCEPT
          </div>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}>
            {activeSystemStep.step.expectedAction || `Step ${currentSystemIdx + 1}`}
          </div>
          <p style={{
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--text-secondary)",
            margin: 0,
          }}>
            {activeSystemStep.step.hints?.[0] || activeSystemStep.step.text}
          </p>
        </div>
      )}

      {/* ═══ 7. CONVERSATION MAP ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <Map size={11} /> CONVERSATION MAP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {systemSteps.map(({ step, idx }, i) => {
            const isDone = i < tasksCompleted;
            const isActive = i === currentSystemIdx;

            return (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                {/* Vertical timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 16 }}>
                  <div
                    className={`timeline-node ${isDone ? "timeline-node-done" : isActive ? "timeline-node-active" : ""}`}
                  />
                  {i < systemSteps.length - 1 && (
                    <div
                      className={`timeline-line ${isDone ? "timeline-line-done" : ""}`}
                      style={{ height: 28, marginTop: 2, marginBottom: 2 }}
                    />
                  )}
                </div>

                {/* Step info */}
                <div style={{ flex: 1, paddingBottom: 4, marginTop: -2 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}>
                    <span style={{
                      fontSize: 11,
                      lineHeight: 1.3,
                      color: isDone ? "var(--success)" : isActive ? "var(--text-primary)" : "var(--text-ghost)",
                      fontWeight: isActive ? 600 : 400,
                      fontStyle: (!isDone && !isActive) ? "italic" : "normal",
                    }}>
                      {step.expectedAction || `Round ${i + 1}`}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      flexShrink: 0,
                      padding: "2px 6px",
                      borderRadius: 4,
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

      {/* ═══ 8. SIMULATION PROGRESS BAR (bottom) ═══ */}
      <div className="insight-card">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--text-secondary)",
          }}>
            Simulation Progress
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            fontWeight: 700,
            color: overallProgress >= 80 ? "var(--success)" : "var(--accent-primary)",
          }}>
            {overallProgress}%
          </span>
        </div>
        <div className="progress-track" style={{ height: 6, borderRadius: 99, width: "100%" }}>
          <div className="progress-fill" style={{
            width: `${overallProgress}%`,
            background: overallProgress >= 80
              ? "var(--success)"
              : `linear-gradient(90deg, var(--accent-primary), var(--accent-primary-glow))`,
            borderRadius: 99,
          }} />
        </div>
      </div>
    </>
  );
}
