"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORY_COLORS, DIFFICULTY_CONFIG } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  ArrowLeft, Play, Star, User, Clock, Target,
  FileText, AlertTriangle, CheckCircle, BookOpen,
  Eye, MessageSquare, Award,
} from "lucide-react";

export function Briefing() {
  const { currentScenario, startGame, resetGame, setGameMode, setPhase } = useGameStore();
  if (!currentScenario) return null;
  const sc = currentScenario;
  const diff = DIFFICULTY_CONFIG[sc.difficulty];
  const catColor = CATEGORY_COLORS[sc.category] || "var(--accent-gold)";
  const taskCount = sc.steps.filter(s => s.speaker === "system").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative"
    >
      <Particles count={8} />

      {/* TOP BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-6 py-3 flex items-center justify-between">
          <button onClick={resetGame} className="btn-ghost">
            <ArrowLeft size={12} /> BACK
          </button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "4px", color: "var(--text-ghost)" }}>
            CASE FILE BRIEFING
          </span>
          <div style={{ width: 80 }} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto flex justify-center">
        <div className="w-full px-6 py-8" style={{ maxWidth: 880 }}>

          {/* CASE FILE HEADER */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="case-file p-6 mb-5"
          >
            <div className="flex items-start gap-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="shrink-0"
              >
                <div className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    background: `linear-gradient(135deg, ${catColor}15, ${catColor}08)`,
                    border: `1px solid ${catColor}30`,
                    color: catColor,
                  }}>
                  {sc.customer.avatar}
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
                    {diff.label}
                  </span>
                  <span className="tag" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
                    {sc.category.replace("-", " ")}
                  </span>
                  <div className="flex items-center gap-0.5 ml-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} size={10}
                        fill={i < diff.stars ? diff.color : "transparent"}
                        style={{ color: i < diff.stars ? diff.color : "var(--text-ghost)" }}
                      />
                    ))}
                  </div>
                </div>
                <h1 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                  {sc.title}
                </h1>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {sc.description}
                </p>
                <div className="flex items-center gap-5 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                  <span className="flex items-center gap-1"><FileText size={10} style={{ color: "var(--accent-gold)" }} /> {taskCount} rounds</span>
                  <span className="flex items-center gap-1"><Clock size={10} style={{ color: "var(--text-ghost)" }} /> ~3 min</span>
                  <span className="flex items-center gap-1" style={{ color: "var(--accent-gold)" }}><Target size={10} /> +{sc.xpReward} XP</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Client + Scoring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Client Dossier */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="nexus-card p-5"
              style={{ borderTop: `2px solid ${catColor}30` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <User size={13} style={{ color: catColor }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: catColor }}>CLIENT DOSSIER</span>
              </div>
              <div className="space-y-2">
                {[
                  ["NAME", sc.customer.name],
                  ["AGE / CITY", `${sc.customer.age} · ${sc.customer.city}`],
                  ["PROFESSION", sc.customer.profession],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-xs" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 10 }}>{label}</span>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs items-center" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", fontSize: 10 }}>MOOD</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 mood-bar">
                      <div className="mood-fill" style={{
                        width: `${sc.customer.moodInitial * 10}%`,
                        background: sc.customer.moodInitial <= 3 ? "var(--danger)" : sc.customer.moodInitial <= 6 ? "var(--warn)" : "var(--success)",
                      }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-primary)" }}>{sc.customer.moodInitial}/10</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] mt-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{sc.customer.personality}</p>
              <p className="text-xs mt-2"><strong style={{ color: catColor }}>Goal:</strong> <span style={{ color: "var(--text-primary)" }}>{sc.customer.goal}</span></p>
            </motion.div>

            {/* Scoring + Compliance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <div className="nexus-card p-5 flex-1" style={{ borderTop: "2px solid var(--accent-gold-border)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={13} style={{ color: "var(--accent-gold)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>SCORING</span>
                </div>
                <div className="space-y-2">
                  {sc.evaluationRules.map((rule) => (
                    <div key={rule.skill} className="flex items-center gap-3">
                      <CheckCircle size={10} style={{ color: "var(--accent-gold-dim)" }} />
                      <span className="text-xs flex-1" style={{ color: "var(--text-primary)" }}>{rule.skill}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "var(--accent-gold)" }}>{rule.weight}pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nexus-card p-4" style={{ borderTop: "2px solid rgba(229,62,62,0.3)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={12} style={{ color: "var(--danger)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--danger)" }}>COMPLIANCE</span>
                </div>
                <p className="text-[10px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Banned phrases trigger instant violation: <strong style={{ color: "var(--danger)" }}>-{sc.complianceRules.violationPenalty}pts</strong>. Stay compliant.
                </p>
              </div>
            </motion.div>
          </div>

          {/* How to Play */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="nexus-card p-5 mb-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={13} style={{ color: "var(--accent-gold)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--accent-gold)" }}>HOW IT WORKS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { n: "01", title: "Client Speaks", desc: "Read the message. Understand the need before responding.", color: catColor },
                { n: "02", title: "You Respond", desc: "Type your response as a bank RM. An objective guides each round.", color: "var(--accent-gold)" },
                { n: "03", title: "AI Evaluates", desc: "AI scores your knowledge, empathy, compliance, and communication.", color: "var(--success)" },
              ].map((item) => (
                <div key={item.n} className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700, background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}20` }}>
                    {item.n}
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM — MODE SELECTOR */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 shrink-0 glass-panel px-6 py-5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="text-center text-[9px] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
          CHOOSE YOUR MODE
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* SHOW ME */}
          <motion.button
            onClick={() => { setGameMode("showme"); setPhase("showme"); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all"
            style={{
              background: "rgba(56,161,105,0.06)",
              border: "1px solid rgba(56,161,105,0.2)",
              color: "var(--success)",
            }}
          >
            <Eye size={16} />
            <div className="text-left">
              <p className="text-xs font-bold">SHOW ME</p>
              <p className="text-[9px] opacity-70">Watch the masterclass</p>
            </div>
          </motion.button>

          {/* TRY ME */}
          <motion.button
            onClick={() => { setGameMode("tryme"); setPhase("tryme"); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-6 py-3 rounded-xl transition-all"
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid var(--accent-gold-border)",
              color: "var(--warn)",
            }}
          >
            <MessageSquare size={16} />
            <div className="text-left">
              <p className="text-xs font-bold">TRY ME</p>
              <p className="text-[9px] opacity-70">Practice freely</p>
            </div>
          </motion.button>

          {/* TEST ME */}
          <motion.button
            onClick={startGame}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold px-6 py-3 rounded-xl"
          >
            <Award size={16} />
            <div className="text-left">
              <p className="text-xs font-bold">TEST ME</p>
              <p className="text-[9px] opacity-70" style={{ color: "var(--bg-void)" }}>Get evaluated</p>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
