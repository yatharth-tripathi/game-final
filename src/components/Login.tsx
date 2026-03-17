"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { Particles } from "./Particles";
import { Briefcase, ChevronRight, User, Building2 } from "lucide-react";

export function Login() {
  const { setPlayer, setPhase } = useGameStore();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("HQ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
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

      // If player has existing career data, load it
      const store = useGameStore.getState();
      if (player.totalXP > 0 || player.casesCompleted > 0) {
        useGameStore.setState({
          career: {
            ...store.career,
            playerId: player.id,
            playerName: player.name,
            playerBranch: player.branch,
            totalXP: player.totalXP,
            casesCompleted: player.casesCompleted,
            scoreSum: player.scoreSum,
            streak: player.streak,
            lastPlayedDate: player.lastPlayedDate,
            completedScenarios: player.completedScenarios || [],
          },
        });
      }

      setPhase("lobby");
    } catch {
      setError("Connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex items-center justify-center relative"
    >
      <Particles count={15} />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, delay: 0.1 }}
        className="relative z-10 w-full max-w-sm px-6"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-gold-glow))" }}
          >
            <Briefcase size={28} color="#070A0F" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
            NEXUS BANK
          </h1>
          <p className="text-[10px] tracking-[6px] mt-1" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>
            TRAINING SIMULATION
          </p>
        </div>

        {/* Form */}
        <div className="nexus-card p-6 space-y-4" style={{ borderTop: "2px solid var(--accent-gold-border)" }}>
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-wider block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-gold)" }}>
              <User size={10} className="inline mr-1.5" />YOUR NAME
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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
              <option value="HQ">Head Office</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Kochi">Kochi</option>
            </select>
          </div>

          {error && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>{error}</p>
          )}

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-gold w-full py-3 mt-2"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "CONNECTING..." : <>ENTER SIMULATION <ChevronRight size={14} /></>}
          </motion.button>
        </div>

        <p className="text-center text-[8px] mt-4 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)", opacity: 0.4 }}>
          AI-POWERED BFSI TRAINING PLATFORM
        </p>
      </motion.div>
    </motion.div>
  );
}
