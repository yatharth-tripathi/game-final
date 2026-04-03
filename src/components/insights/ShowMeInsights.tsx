"use client";

import { motion } from "framer-motion";
import { CATEGORY_COLORS, DIFFICULTY_CONFIG } from "@/lib/scenarios";
import type { Scenario } from "@/lib/scenarios";
import {
  Target, FileText, Shield, Lightbulb,
  CheckCircle, XCircle, User, Map,
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
      {/* ═══ 1. SCENARIO BRIEF ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <FileText size={11} /> SCENARIO BRIEF
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Objective */}
          <div>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "var(--text-ghost)",
            }}>
              OBJECTIVE
            </span>
            <p style={{
              fontSize: 12,
              lineHeight: 1.5,
              color: "var(--text-primary)",
              margin: "4px 0 0",
            }}>
              {objective}
            </p>
          </div>

          {/* Client Profile */}
          <div>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "var(--text-ghost)",
            }}>
              CLIENT PROFILE
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1e3a5f, #2d5f8a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}>
                  {sc.customer.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                  {sc.customer.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.4, marginTop: 2 }}>
                  {customerProfile}
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Warning */}
          <div style={{
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            background: "var(--danger-bg)",
            border: "1px solid var(--danger-border)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <Shield size={10} style={{ color: "var(--danger)" }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                color: "var(--danger)",
              }}>
                COMPLIANCE WARNING
              </span>
            </div>
            <p style={{
              fontSize: 11,
              lineHeight: 1.5,
              color: "var(--danger)",
              margin: 0,
            }}>
              {complianceWatch}
            </p>
          </div>

          {/* Difficulty + Category tags */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="tag" style={{
              color: diff.color,
              background: `${diff.color}12`,
              border: `1px solid ${diff.color}25`,
            }}>
              {diff.label}
            </span>
            <span className="tag" style={{
              color: catColor,
              background: `${catColor}08`,
              border: `1px solid ${catColor}20`,
            }}>
              {sc.category.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ 2. TECHNIQUE SPOTLIGHT ═══ */}
      {latestTechnique ? (
        <motion.div
          key={latestTechnique.text.slice(0, 20)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="insight-card insight-card-active"
          style={{ borderLeft: "3px solid var(--accent-primary)" }}
        >
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
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
            {latestTechnique.technique}
          </div>
          <p style={{
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--text-secondary)",
            margin: 0,
          }}>
            Observe how the ideal RM applies this technique in the conversation to guide the client effectively.
          </p>
        </motion.div>
      ) : (
        <div className="insight-card" style={{ borderLeft: "3px solid var(--border)" }}>
          <div className="insight-card-header" style={{ color: "var(--text-ghost)" }}>
            <Lightbulb size={11} /> TECHNIQUE SPOTLIGHT
          </div>
          <p style={{
            fontSize: 11,
            color: "var(--text-ghost)",
            margin: 0,
          }}>
            {visibleCount === 0
              ? "Waiting for conversation to begin..."
              : "Observe how the client reacts to the RM's approach"}
          </p>
        </div>
      )}

      {/* ═══ 3. CONVERSATION MAP ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{ color: "var(--accent-primary)" }}>
          <Map size={11} /> CONVERSATION MAP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {exchanges.map((ex, i) => {
            const isRevealed = i < visibleCount;
            const isCurrent = i === visibleCount - 1;
            const isPending = i >= visibleCount;
            const isCustomer = ex.speaker === "customer";

            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                {/* Vertical timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 16 }}>
                  <div
                    className={`timeline-node ${isRevealed && !isCurrent ? "timeline-node-done" : isCurrent ? "timeline-node-active" : ""}`}
                  />
                  {i < exchanges.length - 1 && (
                    <div
                      className={`timeline-line ${isRevealed ? "timeline-line-done" : ""}`}
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
                      color: isRevealed && !isCurrent
                        ? "var(--success)"
                        : isCurrent
                          ? "var(--text-primary)"
                          : "var(--text-ghost)",
                      fontWeight: isCurrent ? 600 : 400,
                      fontStyle: isPending ? "italic" : "normal",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}>
                      {isCustomer ? (
                        <><User size={9} />{sc.customer.name.split(" ")[0]}</>
                      ) : (
                        <>IDEAL RM</>
                      )}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 8,
                      fontWeight: 600,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.06em",
                      flexShrink: 0,
                      padding: "2px 6px",
                      borderRadius: 4,
                      color: isRevealed && !isCurrent
                        ? "var(--success)"
                        : isCurrent
                          ? "var(--accent-primary)"
                          : "var(--text-ghost)",
                      background: isRevealed && !isCurrent
                        ? "var(--success-bg)"
                        : isCurrent
                          ? "var(--accent-primary-bg)"
                          : "transparent",
                    }}>
                      {isRevealed && !isCurrent ? "DONE" : isCurrent ? "ACTIVE" : "PENDING"}
                    </span>
                  </div>
                  {isRevealed && (
                    <p style={{
                      fontSize: 10,
                      marginTop: 2,
                      lineHeight: 1.4,
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

      {/* ═══ 4. SKILL DEBRIEF ═══ */}
      <div className="insight-card">
        <div className="insight-card-header" style={{
          color: allRevealed ? "var(--accent-primary)" : "var(--text-ghost)",
        }}>
          <Target size={11} /> SKILL DEBRIEF
        </div>
        {allRevealed && debrief ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {debrief.map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: i < debrief.length - 1 ? "1px solid var(--border-subtle)" : "none",
                }}>
                  {item.demonstrated
                    ? <CheckCircle size={14} style={{ color: "var(--success)", flexShrink: 0 }} />
                    : <XCircle size={14} style={{ color: "var(--danger)", flexShrink: 0 }} />}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      display: "block",
                    }}>
                      {item.skill}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      display: "block",
                      marginTop: 2,
                    }}>
                      {item.where}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {sc.evaluationRules.map((rule, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom: i < sc.evaluationRules.length - 1 ? "1px solid var(--border-subtle)" : "none",
                opacity: 0.55,
              }}>
                <div style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "2px solid var(--border)",
                  background: "var(--bg-void)",
                  flexShrink: 0,
                }} />
                <span style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--text-ghost)",
                }}>
                  {rule.skill}
                </span>
                <span style={{
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                  fontStyle: "italic",
                  color: "var(--text-ghost)",
                }}>
                  Pending
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
