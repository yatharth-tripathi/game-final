"use client";

import { motion } from "framer-motion";
import type { Scenario } from "@/lib/scenarios";
import { CATEGORY_COLORS } from "@/lib/scenarios";
import {
  User, Shield, MessageSquare, Target, Lightbulb,
  TrendingUp, TrendingDown, Minus, CheckSquare,
} from "lucide-react";

interface TryMeInsightsProps {
  scenario: Scenario;
  mood: number;
  moodHistory: number[];
  responseCount: number;
  coachingStep: number;
}

export function TryMeInsights({ scenario: sc, mood, moodHistory, responseCount, coachingStep }: TryMeInsightsProps) {
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const moodColor = mood <= 3 ? "var(--danger)" : mood <= 6 ? "var(--warn)" : "var(--success)";
  const lastDelta = moodHistory.length >= 2
    ? moodHistory[moodHistory.length - 1] - moodHistory[moodHistory.length - 2]
    : 0;

  const moodLabel = mood <= 2 ? "Client is very frustrated" :
    mood <= 3 ? "Client is losing patience" :
    mood <= 5 ? "Client is neutral — build rapport" :
    mood <= 7 ? "Client is warming up to you" :
    mood <= 9 ? "Client trusts you" : "Client is fully engaged";

  // Get current coaching step data
  const systemSteps = sc.steps.filter(s => s.speaker === "system");
  const currentCoachingStep = systemSteps[coachingStep];
  const currentHints = currentCoachingStep?.hints || [];

  return (
    <>
      {/* Current Coaching Objective */}
      {currentCoachingStep && (
        <motion.div
          key={coachingStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="insight-card insight-card-active"
        >
          <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
            <Target size={11} /> CURRENT OBJECTIVE
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-primary)" }}>
            {currentCoachingStep.text.replace("OBJECTIVE: ", "")}
          </p>
          {currentCoachingStep.expectedAction && (
            <p className="text-[10px] leading-relaxed px-3 py-2 rounded-lg" style={{
              background: "var(--accent-primary-bg)",
              border: "1px solid var(--accent-primary-border)",
              color: "var(--text-secondary)",
            }}>
              <strong style={{ color: "var(--accent-primary)" }}>Expected:</strong> {currentCoachingStep.expectedAction}
            </p>
          )}
          {/* Step progress */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
              ROUND {Math.min(coachingStep + 1, systemSteps.length)}/{systemSteps.length}
            </span>
            <div className="flex items-center gap-1.5 flex-1">
              {Array.from({ length: systemSteps.length }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i < coachingStep ? "var(--success)" : i === coachingStep ? "var(--accent-gold)" : "var(--border)",
                  boxShadow: i === coachingStep ? "0 0 6px var(--accent-gold)" : "none",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Hints */}
      {currentHints.length > 0 && (
        <div className="insight-card">
          <div className="insight-card-header" style={{ color: "var(--warn)" }}>
            <Lightbulb size={11} /> HINTS
          </div>
          <div className="space-y-1.5">
            {currentHints.map((hint, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] leading-relaxed"
                style={{ color: "var(--warn)" }}>
                <span style={{ color: "var(--warn)", opacity: 0.5 }}>›</span>
                {hint}
              </div>
            ))}
            {currentCoachingStep?.idealKeywords && (
              <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                {currentCoachingStep.idealKeywords.map((kw, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 rounded-full"
                    style={{ background: "var(--warn-bg)", color: "var(--warn)", border: "1px solid rgba(181,133,10,0.15)" }}>
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Client Dossier */}
      <div className="insight-card" style={{ borderTop: `2px solid ${catColor}30` }}>
        <div className="insight-card-header" style={{ color: catColor }}>
          <User size={11} /> CLIENT DOSSIER
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>NAME</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{sc.customer.name}</span>
          </div>
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>AGE / CITY</span>
            <span style={{ color: "var(--text-primary)" }}>{sc.customer.age} · {sc.customer.city}</span>
          </div>
          <div className="flex justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 9 }}>PROFESSION</span>
            <span style={{ color: "var(--text-primary)" }}>{sc.customer.profession}</span>
          </div>
          <p className="text-[10px] leading-relaxed pt-1" style={{ color: "var(--text-secondary)" }}>
            {sc.customer.personality}
          </p>
          <div>
            <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>GOAL</span>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-primary)" }}>{sc.customer.goal}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>HOT BUTTONS</span>
            {sc.customer.hotButtons.map((btn) => (
              <span key={btn} className="text-[9px] px-2 py-0.5 rounded-full"
                style={{ background: "var(--danger-bg)", color: "var(--danger)", border: "1px solid rgba(196,48,48,0.15)" }}>
                {btn}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation Temperature */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: moodColor }}>
          {mood <= 3 ? <TrendingDown size={11} /> : mood >= 7 ? <TrendingUp size={11} /> : <Minus size={11} />}
          CONVERSATION TEMPERATURE
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
        {moodHistory.length > 1 && (
          <div className="mood-spark mb-2">
            {moodHistory.map((val, i) => (
              <div key={i} className="mood-spark-bar" style={{
                height: `${(val / 10) * 100}%`,
                background: val <= 3 ? "var(--danger)" : val <= 6 ? "var(--warn)" : "var(--success)",
                opacity: i === moodHistory.length - 1 ? 1 : 0.5,
              }} />
            ))}
          </div>
        )}
        <p className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          {moodLabel}
        </p>
      </div>

      {/* Conversation Flow */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--warn)" }}>
          <MessageSquare size={11} /> CONVERSATION FLOW
        </div>
        <div className="flex items-center gap-4 mb-2">
          <div>
            <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              {responseCount}
            </span>
            <span className="text-[10px] ml-1" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>responses</span>
          </div>
        </div>
        <div className="w-full skill-bar mb-2">
          <div className="skill-bar-fill" style={{
            width: `${Math.min((responseCount / 8) * 100, 100)}%`,
            background: responseCount <= 3 ? "var(--info)" : responseCount <= 8 ? "var(--success)" : "var(--warn)",
          }} />
        </div>
        <p className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          {responseCount <= 2 ? "Just getting started — set the tone" :
           responseCount <= 5 ? "Good flow — keep discovering needs" :
           responseCount <= 8 ? "Natural conversation length — aim to close" :
           "Consider wrapping up the conversation"}
        </p>
      </div>

      {/* Skill Checklist */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
          <CheckSquare size={11} /> SKILLS TO PRACTICE
        </div>
        <div className="space-y-2">
          {sc.evaluationRules.map((rule) => (
            <div key={rule.skill} className="flex items-center gap-2.5 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-3 h-3 rounded border flex items-center justify-center"
                style={{ borderColor: "var(--text-ghost)" }} />
              <div className="flex-1 min-w-0">
                <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>{rule.skill}</span>
                <span className="text-[9px] ml-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  {rule.weight}pts in Test Me
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Reminder */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--warn)" }}>
          <Shield size={11} /> PHRASES TO AVOID
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sc.complianceRules.hardBanned.map((phrase) => (
            <span key={phrase} className="text-[9px] px-2 py-1 rounded"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(181,133,10,0.06)",
                color: "var(--warn)",
                border: "1px solid rgba(181,133,10,0.15)",
              }}>
              {phrase}
            </span>
          ))}
        </div>
        <p className="text-[9px] mt-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          No penalties in practice — but avoid these to build good habits
        </p>
      </div>
    </>
  );
}
