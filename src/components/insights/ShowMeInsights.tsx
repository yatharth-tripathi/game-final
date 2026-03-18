"use client";

import { motion } from "framer-motion";
import { CATEGORY_COLORS, DIFFICULTY_CONFIG } from "@/lib/scenarios";
import type { Scenario } from "@/lib/scenarios";
import {
  Target, FileText, Shield, Lightbulb,
  CheckCircle, XCircle, User,
} from "lucide-react";

interface Exchange {
  speaker: "customer" | "rm";
  text: string;
  technique: string | null;
}

interface DebriefItem {
  skill: string;
  demonstrated: boolean;
  where: string;
}

interface ShowMeInsightsProps {
  scenario: Scenario;
  exchanges: Exchange[];
  debrief: DebriefItem[];
  objective: string;
  customerProfile: string;
  complianceWatch: string;
  visibleCount: number;
}

export function ShowMeInsights({
  scenario: sc,
  exchanges,
  debrief,
  objective,
  customerProfile,
  complianceWatch,
  visibleCount,
}: ShowMeInsightsProps) {
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const diff = DIFFICULTY_CONFIG[sc.difficulty];
  const allRevealed = visibleCount >= exchanges.length;

  // Find the latest revealed RM exchange with a technique
  const latestTechnique = (() => {
    for (let i = visibleCount - 1; i >= 0; i--) {
      if (exchanges[i]?.speaker === "rm" && exchanges[i]?.technique) {
        return exchanges[i];
      }
    }
    return null;
  })();

  return (
    <>
      {/* Scenario Context */}
      <div className="insight-card" style={{ borderTop: `2px solid ${catColor}30` }}>
        <div className="insight-card-header" style={{ color: catColor }}>
          <FileText size={11} /> SCENARIO
        </div>
        <div className="space-y-2.5 text-[11px]">
          <div>
            <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>OBJECTIVE</span>
            <p className="mt-0.5" style={{ color: "var(--text-primary)" }}>{objective}</p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>CLIENT</span>
            <p className="mt-0.5" style={{ color: "var(--text-primary)" }}>{customerProfile}</p>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>COMPLIANCE</span>
            <p className="mt-0.5" style={{ color: "var(--danger)" }}>{complianceWatch}</p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>{diff.label}</span>
            <span className="tag" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
              {sc.category.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Active Technique Spotlight */}
      {latestTechnique ? (
        <motion.div
          key={latestTechnique.text.slice(0, 20)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="insight-card insight-card-active"
          style={{ borderLeft: "3px solid var(--accent-gold)" }}
        >
          <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
            <Lightbulb size={11} /> TECHNIQUE SPOTLIGHT
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--warn)" }}>
            {latestTechnique.technique}
          </p>
        </motion.div>
      ) : (
        <div className="insight-card">
          <div className="insight-card-header" style={{ color: "var(--text-ghost)" }}>
            <Lightbulb size={11} /> TECHNIQUE SPOTLIGHT
          </div>
          <p className="text-[11px]" style={{ color: "var(--text-ghost)" }}>
            {visibleCount === 0 ? "Waiting for conversation to begin..." : "Observe how the client reacts to the RM's approach"}
          </p>
        </div>
      )}

      {/* Conversation Map (Timeline) */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-gold)" }}>
          <Target size={11} /> CONVERSATION MAP
        </div>
        <div className="space-y-0">
          {exchanges.map((ex, i) => {
            const isRevealed = i < visibleCount;
            const isCurrent = i === visibleCount - 1;
            const isCustomer = ex.speaker === "customer";

            return (
              <div key={i} className="flex items-start gap-3">
                {/* Timeline rail */}
                <div className="flex flex-col items-center" style={{ width: 12 }}>
                  <div className={`timeline-node ${isCurrent ? "timeline-node-active" : isRevealed ? "timeline-node-done" : ""}`} />
                  {i < exchanges.length - 1 && (
                    <div className={`timeline-line ${isRevealed ? "timeline-line-done" : ""}`} style={{ height: 24, marginTop: 2, marginBottom: 2 }} />
                  )}
                </div>
                {/* Label */}
                <div className="pb-2 flex-1 min-w-0">
                  <span className="text-[9px] font-semibold uppercase tracking-wider" style={{
                    fontFamily: "var(--font-mono)",
                    color: isRevealed
                      ? (isCustomer ? catColor : "var(--success)")
                      : "var(--text-ghost)",
                  }}>
                    {isCustomer ? (
                      <><User size={8} className="inline mr-1" />{sc.customer.name.split(" ")[0]}</>
                    ) : (
                      <>IDEAL RM</>
                    )}
                  </span>
                  {isRevealed && (
                    <p className="text-[10px] mt-0.5 leading-snug" style={{
                      color: "var(--text-secondary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {ex.text.slice(0, 80)}{ex.text.length > 80 ? "..." : ""}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Debrief */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: allRevealed ? "var(--accent-gold)" : "var(--text-ghost)" }}>
          <Shield size={11} /> SKILL DEBRIEF
        </div>
        {allRevealed && debrief ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            {debrief.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                {item.demonstrated
                  ? <CheckCircle size={11} style={{ color: "var(--success)" }} />
                  : <XCircle size={11} style={{ color: "var(--danger)" }} />}
                <span className="text-[11px] flex-1" style={{ color: "var(--text-primary)" }}>{item.skill}</span>
                <span className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>{item.where}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="space-y-2">
            {sc.evaluationRules.map((rule, i) => (
              <div key={i} className="flex items-center gap-2.5 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-3 h-3 rounded-full" style={{ background: "var(--border)" }} />
                <span className="text-[11px]" style={{ color: "var(--text-ghost)" }}>{rule.skill}</span>
                <span className="text-[9px] ml-auto" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>Pending</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
