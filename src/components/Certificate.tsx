"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { X, Download, Award, ShieldCheck } from "lucide-react";

interface SkillBreakdown {
  skill: string;
  avgPercent: number;
}

interface CertificateProps {
  playerName: string;
  category: string;
  avgScore: number;
  scenariosCompleted: number;
  skillBreakdown: SkillBreakdown[];
  onClose: () => void;
}

export function Certificate({
  playerName,
  category,
  avgScore,
  scenariosCompleted,
  skillBreakdown,
  onClose,
}: CertificateProps) {
  const verificationId = useRef(crypto.randomUUID()).current;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoryLabel = category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-2xl"
      >
        {/* Certificate Card */}
        <div
          id="certificate-print"
          className="rounded-xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "2px solid var(--border)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.15), 0 0 40px rgba(37,99,235,0.08)",
          }}
        >
          {/* Header Gradient Bar */}
          <div
            className="px-6 sm:px-8 py-5 text-center"
            style={{
              background: "linear-gradient(135deg, #1E40AF, #2563EB, #3B82F6)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <ShieldCheck size={18} style={{ color: "rgba(255,255,255,0.9)" }} />
              <span
                className="text-lg sm:text-xl font-bold tracking-[6px]"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#FFFFFF",
                }}
              >
                NEXUS BANK
              </span>
              <ShieldCheck size={18} style={{ color: "rgba(255,255,255,0.9)" }} />
            </div>
            <p
              className="text-[9px] tracking-[3px] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              TRAINING SIMULATION PROGRAM
            </p>
          </div>

          {/* Certificate Body */}
          <div className="px-6 sm:px-10 py-6 sm:py-8 text-center">
            {/* Decorative Line */}
            <div
              className="mx-auto mb-6"
              style={{
                width: 60,
                height: 2,
                background: "linear-gradient(90deg, transparent, var(--accent-primary), transparent)",
              }}
            />

            {/* Title */}
            <p
              className="text-xs sm:text-sm tracking-[4px] uppercase mb-6"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--text-ghost)",
                fontWeight: 600,
              }}
            >
              CERTIFICATE OF PROFICIENCY
            </p>

            {/* Certifies */}
            <p
              className="text-xs mb-2"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              This certifies that
            </p>

            {/* Player Name */}
            <p
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(135deg, #1E40AF, #2563EB)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {playerName}
            </p>

            {/* Proficiency Statement */}
            <p
              className="text-xs sm:text-sm mb-6"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              has demonstrated proficiency in
            </p>

            {/* Category Badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg mb-6"
              style={{
                background: "var(--accent-primary-bg)",
                border: "1px solid var(--accent-primary-border)",
              }}
            >
              <Award size={16} style={{ color: "var(--accent-primary)" }} />
              <span
                className="text-sm sm:text-base font-bold tracking-[2px] uppercase"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--accent-primary)",
                }}
              >
                {categoryLabel}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-6">
              <div className="text-center">
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: avgScore >= 80 ? "var(--success)" : avgScore >= 60 ? "var(--warn)" : "var(--danger)",
                  }}
                >
                  {avgScore}%
                </p>
                <p
                  className="text-[9px] uppercase tracking-wider mt-0.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                >
                  Average Score
                </p>
              </div>
              <div
                style={{ width: 1, height: 36, background: "var(--border)" }}
              />
              <div className="text-center">
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--accent-primary)",
                  }}
                >
                  {scenariosCompleted}
                </p>
                <p
                  className="text-[9px] uppercase tracking-wider mt-0.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                >
                  Scenarios Completed
                </p>
              </div>
            </div>

            {/* Skills Breakdown */}
            {skillBreakdown.length > 0 && (
              <div className="mb-6 max-w-sm mx-auto">
                <p
                  className="text-[9px] font-bold uppercase tracking-[2px] mb-3 text-left"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                >
                  SKILL PROFICIENCY
                </p>
                <div className="space-y-2.5">
                  {skillBreakdown.map((sk) => {
                    const barColor =
                      sk.avgPercent >= 80 ? "var(--success)" : sk.avgPercent >= 50 ? "var(--warn)" : "var(--danger)";
                    return (
                      <div key={sk.skill}>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="text-[10px]"
                            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
                          >
                            {sk.skill}
                          </span>
                          <span
                            className="text-[10px] font-bold"
                            style={{ fontFamily: "var(--font-mono)", color: barColor }}
                          >
                            {sk.avgPercent}%
                          </span>
                        </div>
                        <div className="progress-track" style={{ height: 4 }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${sk.avgPercent}%`,
                              background: barColor,
                              transition: "width 0.8s ease-out",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Divider */}
            <div
              className="mx-auto mb-4"
              style={{
                width: "80%",
                height: 1,
                background: "linear-gradient(90deg, transparent, var(--border), transparent)",
              }}
            />

            {/* Date + Verification */}
            <div className="flex items-center justify-between text-center mb-2 px-2">
              <div>
                <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>
                  {today}
                </p>
                <p
                  className="text-[8px] uppercase tracking-wider mt-0.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                >
                  Date Issued
                </p>
              </div>
              <div>
                <p
                  className="text-[9px]"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                >
                  {verificationId.slice(0, 18).toUpperCase()}
                </p>
                <p
                  className="text-[8px] uppercase tracking-wider mt-0.5"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
                >
                  Verification ID
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-3 text-center"
            style={{
              background: "var(--bg-elevated)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <p
              className="text-[8px] tracking-[3px] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}
            >
              NEXUS BANK TRAINING SIMULATION
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.print()}
            className="btn-gold px-6 py-2.5"
          >
            <Download size={14} /> DOWNLOAD PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="btn-ghost px-6 py-2.5"
          >
            <X size={12} /> CLOSE
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
