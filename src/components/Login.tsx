"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { mapExperienceToLevel } from "@/lib/adaptive";
import { Particles } from "./Particles";
import {
  Briefcase, ChevronRight, User, Building2, Clock, Shield,
  TrendingUp, AlertTriangle, Settings, Headphones, SkipForward,
} from "lucide-react";

const EXPERIENCE_TIERS = [
  { value: "0-1", label: "0-1 yrs", desc: "Fresh" },
  { value: "1-3", label: "1-3 yrs", desc: "Junior" },
  { value: "3-7", label: "3-7 yrs", desc: "Mid" },
  { value: "7-15", label: "7-15 yrs", desc: "Senior" },
  { value: "15+", label: "15+ yrs", desc: "Veteran" },
];

const ROLES = [
  { value: "trainee", label: "Trainee" },
  { value: "junior-rm", label: "Junior RM" },
  { value: "senior-rm", label: "Senior RM" },
  { value: "rm", label: "Relationship Mgr" },
  { value: "branch-manager", label: "Branch Manager" },
  { value: "regional-head", label: "Regional Head" },
];

const EXPERTISE_AREAS = [
  { value: "sales", label: "Sales", icon: TrendingUp },
  { value: "compliance", label: "Compliance", icon: Shield },
  { value: "customer-service", label: "Service", icon: Headphones },
  { value: "fraud", label: "Fraud", icon: AlertTriangle },
  { value: "operations", label: "Operations", icon: Settings },
];

export function Login() {
  const { setPlayer, setPhase, setExperienceProfile, updateAdaptiveLevel } = useGameStore();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("HQ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 2 state
  const [playerId, setPlayerId] = useState("");
  const [expTier, setExpTier] = useState("");
  const [role, setRole] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);

  const handleStep1 = async () => {
    if (!name.trim() || name.trim().length < 2) {
      setError("Enter your name (at least 2 characters)");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), branch }),
      });

      if (!res.ok) throw new Error("Failed to register");
      const player = await res.json();

      // Sync player data to store
      setPlayer(player.id, player.name, player.branch);
      setPlayerId(player.id);

      // If player has existing career data, load it
      if (player.totalXP > 0 || player.casesCompleted > 0) {
        useGameStore.setState((state) => ({
          career: {
            ...state.career,
            playerId: player.id,
            playerName: player.name,
            playerBranch: player.branch,
            totalXP: player.totalXP,
            casesCompleted: player.casesCompleted,
            scoreSum: player.scoreSum,
            streak: player.streak,
            lastPlayedDate: player.lastPlayedDate,
            completedScenarios: player.completedScenarios || [],
            experienceTier: player.experienceTier || "",
            currentRole: player.currentRole || "",
            expertiseAreas: player.expertiseAreas || [],
            profileCompleted: player.profileCompleted || false,
            adaptiveLevel: player.adaptiveLevel || "easy",
            adaptiveLevelScore: player.adaptiveLevelScore || 0,
            adaptiveSuggestion: null,
          },
        }));
      }

      // If already profiled, skip to lobby
      if (player.profileCompleted) {
        setPhase("lobby");
      } else {
        setStep(2);
      }
    } catch {
      setError("Connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async () => {
    if (!expTier || !role || expertise.length === 0) {
      setError("Please select your experience, role, and at least one expertise area");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const { adaptiveLevel, adaptiveLevelScore } = mapExperienceToLevel(expTier, role);

      await fetch("/api/player", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: playerId,
          experienceTier: expTier,
          currentRole: role,
          expertiseAreas: expertise,
          profileCompleted: true,
          adaptiveLevel,
          adaptiveLevelScore,
        }),
      });

      setExperienceProfile(expTier, role, expertise);
      updateAdaptiveLevel(adaptiveLevel, adaptiveLevelScore, null);
      setPhase("lobby");
    } catch {
      setError("Failed to save profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      await fetch("/api/player", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: playerId, profileCompleted: true }),
      });
      useGameStore.setState((state) => ({
        career: { ...state.career, profileCompleted: true },
      }));
    } catch { /* non-blocking */ }
    setPhase("lobby");
  };

  const toggleExpertise = (area: string) => {
    setExpertise((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex items-center justify-center relative"
    >
      <Particles count={15} />

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" }}
          >
            <Briefcase size={28} color="#FFFFFF" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            NEXUS BANK
          </h1>
          <p className="text-[10px] tracking-[6px] mt-1" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
            TRAINING SIMULATION
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Name + Branch ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.25 }}
              className="nexus-card p-6 space-y-4"
              style={{ borderTop: "2px solid var(--accent-gold-border)" }}
            >
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                  <User size={10} className="inline mr-1.5" />YOUR NAME
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStep1()}
                  placeholder="Enter your full name"
                  maxLength={50}
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-void)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                  <Building2 size={10} className="inline mr-1.5" />BRANCH
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    background: "var(--bg-void)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {["HQ", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Ahmedabad", "Kochi"].map((b) => (
                    <option key={b} value={b}>{b === "HQ" ? "Head Office" : b}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>}

              <motion.button
                onClick={handleStep1}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold w-full py-3 mt-2"
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "CONNECTING..." : <>CONTINUE <ChevronRight size={14} /></>}
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2: Experience Profiling ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.25 }}
              className="nexus-card p-5 space-y-4"
              style={{ borderTop: "2px solid var(--accent-gold-border)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-center" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
                EXPERIENCE PROFILE
              </p>
              <p className="text-[11px] text-center" style={{ color: "var(--text-secondary)" }}>
                We&apos;ll personalize your training path
              </p>

              {/* Experience Tier */}
              <div>
                <label className="text-[9px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  <Clock size={9} className="inline mr-1" />BFSI EXPERIENCE
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {EXPERIENCE_TIERS.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setExpTier(t.value)}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: expTier === t.value ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "var(--bg-void)",
                        color: expTier === t.value ? "#FFFFFF" : "var(--text-secondary)",
                        border: `1px solid ${expTier === t.value ? "var(--accent-gold-border)" : "var(--border)"}`,
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Role */}
              <div>
                <label className="text-[9px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  <Briefcase size={9} className="inline mr-1" />CURRENT ROLE
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRole(r.value)}
                      className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
                      style={{
                        fontFamily: "var(--font-mono)",
                        background: role === r.value ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "var(--bg-void)",
                        color: role === r.value ? "#FFFFFF" : "var(--text-secondary)",
                        border: `1px solid ${role === r.value ? "var(--accent-gold-border)" : "var(--border)"}`,
                      }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expertise Areas */}
              <div>
                <label className="text-[9px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
                  <TrendingUp size={9} className="inline mr-1" />YOUR STRENGTHS (select all that apply)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {EXPERTISE_AREAS.map((a) => {
                    const Icon = a.icon;
                    const active = expertise.includes(a.value);
                    return (
                      <button
                        key={a.value}
                        onClick={() => toggleExpertise(a.value)}
                        className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1.5"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: active ? "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" : "var(--bg-void)",
                          color: active ? "#FFFFFF" : "var(--text-secondary)",
                          border: `1px solid ${active ? "var(--accent-gold-border)" : "var(--border)"}`,
                        }}
                      >
                        <Icon size={10} />{a.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>}

              <motion.button
                onClick={handleStep2}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gold w-full py-3"
                style={{ opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "SAVING..." : <>ENTER SIMULATION <ChevronRight size={14} /></>}
              </motion.button>

              <button
                onClick={handleSkip}
                className="w-full text-center text-[10px] uppercase tracking-wider py-1 transition-opacity hover:opacity-100"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", opacity: 0.6 }}
              >
                <SkipForward size={10} className="inline mr-1" />SKIP PROFILING
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-[8px] mt-4 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", opacity: 0.4 }}>
          AI-POWERED BFSI TRAINING PLATFORM
        </p>
      </div>
    </motion.div>
  );
}
