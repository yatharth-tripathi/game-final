"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { mapExperienceToLevel } from "@/lib/adaptive";
import {
  Briefcase, ChevronRight, Clock, Shield,
  TrendingUp, AlertTriangle, Settings, Headphones, SkipForward,
  HelpCircle,
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
  const store = useGameStore();
  const { setPlayer, setPhase, setExperienceProfile, updateAdaptiveLevel, career } = store;

  // Returning user who hasn't profiled -> jump straight to step 2
  const isReturningUnprofiled = !!(career.playerId && career.profileCompleted === false);
  const [step, setStep] = useState(isReturningUnprofiled ? 2 : 1);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("HQ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 2 state
  const [playerId, setPlayerId] = useState(career.playerId || "");
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
      className="h-screen w-full flex flex-col"
      style={{ background: "var(--bg-void)" }}
    >
      {/* ── Top Navigation Bar ── */}
      <nav className="ei-nav">
        <div className="ei-nav-brand">
          Editorial Intelligence
        </div>
        <div className="ei-nav-links">
          <button className="ei-nav-link active">Simulator</button>
          <button className="ei-nav-link coming-soon">Modules</button>
          <button className="ei-nav-link coming-soon">Resources</button>
          <button className="ei-nav-support coming-soon">
            <HelpCircle size={16} />
          </button>
        </div>
      </nav>

      {/* ── Center Content ── */}
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div className="w-full max-w-[440px] px-6 py-8">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"
              style={{
                background: "var(--accent-primary)",
                borderRadius: 14,
              }}
            >
              <Briefcase size={24} color="#FFFFFF" />
            </motion.div>
            <h1
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
                letterSpacing: "0.04em",
              }}
            >
              EMPLOYEE TRAINING
            </h1>
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--accent-primary)",
                letterSpacing: "0.2em",
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              SIMULATOR
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* ── STEP 1: Name + Branch ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.25 }}
                className="p-8 space-y-5"
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: 16,
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <label className="ei-label">
                    YOUR NAME
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStep1()}
                    placeholder="Enter your full name"
                    maxLength={50}
                    autoFocus
                    className="ei-input"
                  />
                </div>

                <div>
                  <label className="ei-label">
                    BRANCH
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="ei-select"
                  >
                    {["HQ", "Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad", "Kolkata", "Ahmedabad", "Kochi"].map((b) => (
                      <option key={b} value={b}>{b === "HQ" ? "Head Office" : b}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>
                )}

                <motion.button
                  onClick={handleStep1}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gold w-full"
                  style={{
                    padding: "14px",
                    opacity: loading ? 0.6 : 1,
                    borderRadius: 10,
                  }}
                >
                  {loading ? "CONNECTING..." : (
                    <>CONTINUE <ChevronRight size={14} /></>
                  )}
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
                className="p-7 space-y-5"
                style={{
                  background: "var(--bg-surface)",
                  borderRadius: 16,
                  boxShadow: "var(--shadow-lg)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="text-xs uppercase text-center"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--accent-primary)",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  EXPERIENCE PROFILE
                </p>
                <p
                  className="text-sm text-center"
                  style={{ color: "var(--text-secondary)" }}
                >
                  We&apos;ll personalize your training path
                </p>

                {/* Experience Tier */}
                <div>
                  <label className="ei-label" style={{ fontSize: 11 }}>
                    <Clock size={11} className="inline mr-1.5 -mt-px" />
                    BFSI EXPERIENCE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EXPERIENCE_TIERS.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setExpTier(t.value)}
                        className="px-3 py-2 text-xs transition-all"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                          borderRadius: 10,
                          background: expTier === t.value ? "var(--accent-primary)" : "var(--bg-tint)",
                          color: expTier === t.value ? "#FFFFFF" : "var(--text-secondary)",
                          border: `1px solid ${expTier === t.value ? "var(--accent-primary)" : "var(--border)"}`,
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Role */}
                <div>
                  <label className="ei-label" style={{ fontSize: 11 }}>
                    <Briefcase size={11} className="inline mr-1.5 -mt-px" />
                    CURRENT ROLE
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r.value}
                        onClick={() => setRole(r.value)}
                        className="px-3 py-2 text-xs transition-all"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                          borderRadius: 10,
                          background: role === r.value ? "var(--accent-primary)" : "var(--bg-tint)",
                          color: role === r.value ? "#FFFFFF" : "var(--text-secondary)",
                          border: `1px solid ${role === r.value ? "var(--accent-primary)" : "var(--border)"}`,
                        }}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expertise Areas */}
                <div>
                  <label className="ei-label" style={{ fontSize: 11 }}>
                    <TrendingUp size={11} className="inline mr-1.5 -mt-px" />
                    YOUR STRENGTHS (select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EXPERTISE_AREAS.map((a) => {
                      const Icon = a.icon;
                      const active = expertise.includes(a.value);
                      return (
                        <button
                          key={a.value}
                          onClick={() => toggleExpertise(a.value)}
                          className="px-3 py-2 text-xs transition-all flex items-center gap-1.5"
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontWeight: 600,
                            borderRadius: 10,
                            background: active ? "var(--accent-primary)" : "var(--bg-tint)",
                            color: active ? "#FFFFFF" : "var(--text-secondary)",
                            border: `1px solid ${active ? "var(--accent-primary)" : "var(--border)"}`,
                          }}
                        >
                          <Icon size={12} />{a.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && (
                  <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>
                )}

                <motion.button
                  onClick={handleStep2}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gold w-full"
                  style={{
                    padding: "14px",
                    opacity: loading ? 0.6 : 1,
                    borderRadius: 10,
                  }}
                >
                  {loading ? "SAVING..." : (
                    <>ENTER SIMULATION <ChevronRight size={14} /></>
                  )}
                </motion.button>

                <button
                  onClick={handleSkip}
                  className="w-full text-center text-[11px] uppercase py-1 transition-opacity hover:opacity-100"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                    opacity: 0.7,
                    letterSpacing: "0.04em",
                  }}
                >
                  <SkipForward size={11} className="inline mr-1" />
                  SKIP PROFILING
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="ei-footer">
        <span className="ei-footer-brand">Editorial Intelligence</span>
        <div className="ei-footer-links">
          <span className="ei-footer-link" style={{ cursor: "default" }}>Privacy Policy</span>
          <span className="ei-footer-link" style={{ cursor: "default" }}>Terms of Service</span>
          <span className="ei-footer-link" style={{ cursor: "default" }}>Help Center</span>
        </div>
        <span className="ei-footer-copyright">
          &copy; 2024 Editorial Intelligence. All rights reserved.
        </span>
      </footer>
    </motion.div>
  );
}
