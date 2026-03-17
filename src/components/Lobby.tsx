"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore, getCareerLevel, getNextLevelXP } from "@/store/useGameStore";
import { SCENARIOS, CATEGORIES, CATEGORY_COLORS, DIFFICULTY_CONFIG, type Scenario } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  Briefcase, Shield, Headphones, AlertTriangle, Settings, LayoutGrid,
  TrendingUp, ChevronRight, Flame, Star, Clock, Trophy, LogOut, Wrench,
} from "lucide-react";

const categoryIcons: Record<string, typeof Briefcase> = {
  all: LayoutGrid, sales: TrendingUp, compliance: Shield,
  "customer-service": Headphones, fraud: AlertTriangle, operations: Settings,
};

export function Lobby() {
  const { selectedCategory, setCategory, selectScenario, career, setPhase, logout } = useGameStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [customScenarios, setCustomScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    fetch("/api/admin/scenarios")
      .then(r => r.json())
      .then((rows) => {
        if (Array.isArray(rows)) {
          setCustomScenarios(rows.map((r: { data: Scenario }) => r.data));
        }
      })
      .catch(() => {});
  }, []);

  const allScenarios = [...SCENARIOS, ...customScenarios];
  const filtered = selectedCategory === "all"
    ? allScenarios
    : allScenarios.filter((s) => s.category === selectedCategory);

  const level = getCareerLevel(career.totalXP);
  const nextXP = getNextLevelXP(career.totalXP);
  const xpProgress = Math.min(100, ((career.totalXP - level.minXP) / Math.max(1, nextXP - level.minXP)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative"
    >
      <Particles count={12} />

      {/* NAV BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" }}>
              <Briefcase size={14} color="#070A0F" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                NEXUS BANK
              </span>
              <p className="text-[9px] tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                TRAINING SIMULATION
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] font-semibold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                  {level.title} · Lv {level.level}
                </p>
                <p className="text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  {career.totalXP} / {nextXP} XP
                </p>
              </div>
              <div className="w-24">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              <span className="flex items-center gap-1.5">
                <Briefcase size={10} style={{ color: "var(--accent-gold)" }} />
                <strong style={{ color: "var(--text-primary)" }}>{career.casesCompleted}</strong> cases
              </span>
              {career.streak > 0 && (
                <span className="flex items-center gap-1">
                  <Flame size={10} style={{ color: "#E53E3E" }} />
                  <strong style={{ color: "var(--text-primary)" }}>{career.streak}</strong>
                </span>
              )}
              <button
                onClick={() => setPhase("leaderboard")}
                className="flex items-center gap-1 px-2 py-1 rounded-md transition-all hover:opacity-80"
                style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <Trophy size={10} style={{ color: "var(--accent-gold)" }} />
                <span style={{ color: "var(--accent-gold)" }}>RANKS</span>
              </button>
              <button
                onClick={() => setPhase("admin")}
                className="flex items-center gap-1 px-2 py-1 rounded-md transition-all hover:opacity-80"
                style={{ background: "rgba(159,122,234,0.08)", border: "1px solid rgba(159,122,234,0.15)" }}
              >
                <Wrench size={10} style={{ color: "#9F7AEA" }} />
                <span style={{ color: "#9F7AEA" }}>ADMIN</span>
              </button>
              {career.playerName && (
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  {career.playerName}
                </span>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                title="Logout"
              >
                <LogOut size={10} style={{ color: "var(--text-ghost)" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center overflow-y-auto py-8 px-8">
        <div className="w-full" style={{ maxWidth: 960 }}>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-xl font-bold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                Case Files
              </h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Select a scenario to begin training
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              {CATEGORIES.map((cat) => {
                const Icon = categoryIcons[cat.id] || LayoutGrid;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className="px-3 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                    style={{
                      color: active ? "var(--bg-void)" : "var(--text-secondary)",
                      background: active ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "transparent",
                    }}
                  >
                    <Icon size={10} /> {cat.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((scenario, i) => {
              const diff = DIFFICULTY_CONFIG[scenario.difficulty];
              const catColor = CATEGORY_COLORS[scenario.category] || "var(--accent-gold)";
              const isHovered = hoveredId === scenario.id;
              const isCompleted = career.completedScenarios.includes(scenario.id);

              return (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", damping: 20 }}
                  onClick={() => selectScenario(scenario)}
                  onMouseEnter={() => setHoveredId(scenario.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="case-file cursor-pointer px-5 py-4 flex items-center gap-4"
                  style={{
                    borderColor: isHovered ? "var(--border-accent)" : "var(--border)",
                    boxShadow: isHovered ? "0 0 20px rgba(201,168,76,0.06), 0 8px 32px rgba(0,0,0,0.3)" : "none",
                    transform: isHovered ? "translateY(-2px)" : "none",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div className="shrink-0 flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        background: `linear-gradient(135deg, ${catColor}15, ${catColor}08)`,
                        border: `1px solid ${catColor}30`,
                        color: catColor,
                      }}>
                      {scenario.customer.avatar}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 4 }).map((_, si) => (
                        <Star key={si} size={7}
                          fill={si < diff.stars ? diff.color : "transparent"}
                          style={{ color: si < diff.stars ? diff.color : "var(--text-ghost)" }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className="tag" style={{ color: diff.color, background: `${diff.color}12`, border: `1px solid ${diff.color}25` }}>
                        {diff.label}
                      </span>
                      <span className="tag" style={{ color: catColor, background: `${catColor}08`, border: `1px solid ${catColor}20` }}>
                        {scenario.category.replace("-", " ")}
                      </span>
                      {isCompleted && <span className="tag tag-success">DONE</span>}
                    </div>
                    <h3 className="text-[13px] font-bold leading-tight mb-0.5 transition-colors"
                      style={{ color: isHovered ? "var(--accent-gold)" : "var(--text-primary)" }}>
                      {scenario.title}
                    </h3>
                    <p className="text-[10px] mb-2" style={{ color: "var(--text-secondary)" }}>
                      vs <span style={{ color: "var(--text-primary)" }}>{scenario.customer.name}</span> · {scenario.customer.profession}
                    </p>
                    <div className="flex items-center gap-3 text-[9px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                      <span className="flex items-center gap-1"><Clock size={9} /> ~3 min</span>
                      <span style={{ color: "var(--accent-gold)" }}>+{scenario.xpReward} XP</span>
                    </div>
                  </div>

                  <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                    style={{
                      background: isHovered ? "var(--accent-gold-bg)" : "transparent",
                      border: `1px solid ${isHovered ? "var(--accent-gold-border)" : "transparent"}`,
                    }}>
                    <ChevronRight size={14} style={{ color: isHovered ? "var(--accent-gold)" : "var(--text-ghost)" }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 glass-panel px-8 py-2 flex items-center justify-between"
        style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "3px", color: "var(--text-ghost)", borderTop: "1px solid var(--border)" }}>
        <span>NEXUS BANK v2.0</span>
        <span>{filtered.length} CASES AVAILABLE</span>
      </div>
    </motion.div>
  );
}
