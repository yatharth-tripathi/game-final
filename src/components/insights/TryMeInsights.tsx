"use client";

import { motion } from "framer-motion";
import type { Scenario } from "@/lib/scenarios";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  User, Shield, Target, Lightbulb,
  TrendingUp, TrendingDown, Minus, CheckSquare, ChevronRight,
} from "lucide-react";

interface TryMeInsightsProps {
  scenario: Scenario;
  mood: number;
  moodHistory: number[];
  responseCount: number;
  coachingStep: number;
}

export function TryMeInsights({ scenario: sc, mood, moodHistory, responseCount, coachingStep }: TryMeInsightsProps) {
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-primary)";
  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";
  const lastDelta = moodHistory.length >= 2
    ? moodHistory[moodHistory.length - 1] - moodHistory[moodHistory.length - 2]
    : 0;

  const moodInsight = mood <= 2 ? "Client is very frustrated. Focus on empathy and de-escalation to recover the conversation." :
    mood <= 3 ? "Client is losing patience. Show understanding and address their core concerns directly." :
    mood <= 5 ? "Client is neutral. Build rapport by actively listening and asking thoughtful questions." :
    mood <= 7 ? "Client is warming up. Continue your current approach and look for opportunities to deepen trust." :
    mood <= 9 ? "Client trusts you. Maintain this positive momentum with genuine engagement." :
    "Client is fully engaged. Excellent rapport -- keep the conversation natural.";

  // Get current coaching step data
  const systemSteps = sc.steps.filter(s => s.speaker === "system");
  const currentCoachingStep = systemSteps[coachingStep];
  const currentHints = currentCoachingStep?.hints || [];

  const overallProgress = systemSteps.length > 0 ? Math.round(((coachingStep) / systemSteps.length) * 100) : 0;

  // Block color for trust blocks
  const blockColor = (filled: boolean, value: number) => {
    if (!filled) return "#E2E8F0";
    if (value >= 7) return "linear-gradient(135deg, #4361EE, #6380FF)";
    if (value >= 4) return "linear-gradient(135deg, #F59E0B, #FBBF24)";
    return "linear-gradient(135deg, #EF4444, #F87171)";
  };

  return (
    <>
      {/* ═══ 1. PRACTICE PROGRESS ═══ */}
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
            <Target size={11} /> PRACTICE PROGRESS
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--accent-primary)",
          }}>
            Round {Math.min(coachingStep + 1, systemSteps.length)}/{systemSteps.length}
          </span>
        </div>
        <div className="progress-track" style={{ height: 6, borderRadius: 99 }}>
          <div className="progress-fill" style={{
            width: `${overallProgress}%`,
            background: "linear-gradient(90deg, var(--accent-primary), var(--accent-primary-glow))",
            borderRadius: 99,
          }} />
        </div>
        {/* Coaching step segments */}
        <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
          {systemSteps.map((_, i) => (
            <div key={i} style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i < coachingStep ? "var(--success)" : i === coachingStep ? "var(--accent-primary)" : "var(--border)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>

      {/* ═══ 2. CURRENT OBJECTIVE ═══ */}
      {currentCoachingStep && (
        <motion.div
          key={coachingStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="insight-card insight-card-active"
        >
          <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
            <Target size={11} /> CURRENT OBJECTIVE
          </div>
          <p style={{
            fontSize: 13,
            lineHeight: 1.55,
            color: "var(--text-primary)",
            margin: "0 0 10px 0",
          }}>
            {currentCoachingStep.text.replace("OBJECTIVE: ", "")}
          </p>
          {currentCoachingStep.expectedAction && (
            <p style={{
              fontSize: 11,
              lineHeight: 1.5,
              padding: "8px 12px",
              borderRadius: 8,
              background: "var(--accent-primary-bg)",
              border: "1px solid var(--accent-primary-border)",
              color: "var(--text-secondary)",
              margin: "0 0 10px 0",
            }}>
              <strong style={{ color: "var(--accent-primary)" }}>Expected:</strong> {currentCoachingStep.expectedAction}
            </p>
          )}
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.06em",
            padding: "3px 8px",
            borderRadius: 4,
            background: "var(--accent-primary-bg)",
            color: "var(--accent-primary)",
            textTransform: "uppercase",
          }}>
            COACHING
          </span>
        </motion.div>
      )}

      {/* ═══ 3. CONVERSATION TEMPERATURE ═══ */}
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
            CONVERSATION TEMPERATURE
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

        {/* Trust blocks (10 colored blocks) */}
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
            { label: "GOAL", value: sc.customer.goal.length > 60 ? sc.customer.goal.substring(0, 57) + "..." : sc.customer.goal },
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

        {/* Hot Buttons as red tags */}
        <div style={{ marginTop: 10 }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-ghost)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            display: "block",
            marginBottom: 6,
          }}>
            HOT BUTTONS
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {sc.customer.hotButtons.map((btn) => (
              <span key={btn} style={{
                fontSize: 9,
                padding: "3px 8px",
                borderRadius: 99,
                background: "var(--danger-bg)",
                color: "var(--danger)",
                border: "1px solid rgba(196,48,48,0.15)",
                fontFamily: "var(--font-mono)",
              }}>
                {btn}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 5. HINTS ═══ */}
      {currentHints.length > 0 && (
        <div className="insight-card">
          <div className="insight-card-header" style={{ color: "var(--warn)" }}>
            <Lightbulb size={11} /> HINTS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {currentHints.map((hint, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                fontSize: 11,
                lineHeight: 1.5,
                color: "var(--text-secondary)",
              }}>
                <ChevronRight size={10} style={{ color: "var(--warn)", flexShrink: 0, marginTop: 3 }} />
                <span>{hint}</span>
              </div>
            ))}
          </div>
          {currentCoachingStep?.idealKeywords && currentCoachingStep.idealKeywords.length > 0 && (
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 10,
              paddingTop: 10,
              borderTop: "1px solid var(--border)",
            }}>
              {currentCoachingStep.idealKeywords.map((kw, i) => (
                <span key={i} style={{
                  fontSize: 9,
                  padding: "3px 8px",
                  borderRadius: 99,
                  background: "var(--accent-primary-bg)",
                  color: "var(--accent-primary)",
                  border: "1px solid var(--accent-primary-border)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ 6. SKILLS TO PRACTICE ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <CheckSquare size={11} /> SKILLS TO PRACTICE
        </div>
        <div>
          {sc.evaluationRules.map((rule, i) => (
            <div key={rule.skill} style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              borderBottom: i < sc.evaluationRules.length - 1 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <div style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                border: "1.5px solid var(--text-ghost)",
                flexShrink: 0,
              }} />
              <span style={{
                flex: 1,
                fontSize: 12,
                fontWeight: 500,
                color: "var(--text-primary)",
              }}>
                {rule.skill}
              </span>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-ghost)",
              }}>
                {rule.weight}pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 7. PHRASES TO AVOID ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--warn)" }}>
          <Shield size={11} /> PHRASES TO AVOID
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {sc.complianceRules.hardBanned.map((phrase) => (
            <span key={phrase} style={{
              fontSize: 9,
              padding: "4px 10px",
              borderRadius: 6,
              fontFamily: "var(--font-mono)",
              background: "var(--warn-bg)",
              color: "var(--warn)",
              border: "1px solid var(--warn-border)",
            }}>
              {phrase}
            </span>
          ))}
        </div>
        <p style={{
          fontSize: 10,
          fontFamily: "var(--font-mono)",
          color: "var(--text-ghost)",
          marginTop: 8,
          marginBottom: 0,
        }}>
          No penalties in practice -- but avoid these to build good habits
        </p>
      </div>
    </>
  );
}
