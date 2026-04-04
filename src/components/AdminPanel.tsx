"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/scenarios";
import {
  Plus, Trash2, ChevronRight, ChevronLeft,
  User, Target, Shield, FileText, Zap, Save, CheckCircle,
  Bell, Settings, Layout, ClipboardList, Users, MessageSquare,
  Archive, HelpCircle, LogOut, Sparkles, ArrowRight,
} from "lucide-react";

interface CustomScenarioRow {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  xpReward: number;
  isActive: boolean;
  createdAt: string;
}

const STEPS_LABEL = [
  { n: 1, title: "Basics", icon: FileText },
  { n: 2, title: "Client", icon: User },
  { n: 3, title: "Conversation", icon: Zap },
  { n: 4, title: "Scoring", icon: Target },
  { n: 5, title: "Compliance", icon: Shield },
];

const DIFFICULTY_OPTIONS = [
  { value: "easy", label: "Trainee" },
  { value: "medium", label: "Junior RM" },
  { value: "hard", label: "Senior RM" },
  { value: "expert", label: "Branch Manager" },
];

const CATEGORY_OPTIONS = CATEGORIES.filter(c => c.id !== "all");

export function AdminPanel() {
  const { resetGame } = useGameStore();
  const [view, setView] = useState<"list" | "create">("list");
  const [scenarios, setScenarios] = useState<CustomScenarioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [step, setStep] = useState(1);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("sales");
  const [difficulty, setDifficulty] = useState("medium");
  const [xpReward, setXpReward] = useState(100);
  const [tags, setTags] = useState("");

  // Customer
  const [custName, setCustName] = useState("");
  const [custAge, setCustAge] = useState(35);
  const [custProfession, setCustProfession] = useState("");
  const [custCity, setCustCity] = useState("Mumbai");
  const [custPersonality, setCustPersonality] = useState("");
  const [custGoal, setCustGoal] = useState("");
  const [custArchetype, setCustArchetype] = useState("General");
  const [custMood, setCustMood] = useState(5);
  const [custHotButtons, setCustHotButtons] = useState("");
  const [custAiPrompt, setCustAiPrompt] = useState("");

  // Conversation
  const [openingStatement, setOpeningStatement] = useState("");
  const [conversationSteps, setConversationSteps] = useState<
    { speaker: "customer" | "system"; text: string; expectedAction: string; hints: string }[]
  >([{ speaker: "customer", text: "", expectedAction: "", hints: "" }]);

  // Scoring
  const [evalRules, setEvalRules] = useState([
    { skill: "Empathy", weight: 20 },
    { skill: "Product Knowledge", weight: 20 },
    { skill: "Needs Discovery", weight: 20 },
    { skill: "Communication", weight: 20 },
    { skill: "Compliance", weight: 20 },
  ]);

  // Compliance
  const [hardBanned, setHardBanned] = useState("guaranteed returns, no risk, 100% safe");
  const [violationPenalty, setViolationPenalty] = useState(10);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/scenarios");
      if (res.ok) setScenarios(await res.json());
    } catch { /* ignore */ } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/admin/scenarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setScenarios(prev => prev.filter(s => s.id !== id));
    } catch { /* ignore */ }
  };

  const resetForm = () => {
    setStep(1);
    setTitle(""); setDescription(""); setCategory("sales"); setDifficulty("medium");
    setXpReward(100); setTags("");
    setCustName(""); setCustAge(35); setCustProfession(""); setCustCity("Mumbai");
    setCustPersonality(""); setCustGoal(""); setCustArchetype("General");
    setCustMood(5); setCustHotButtons(""); setCustAiPrompt("");
    setOpeningStatement("");
    setConversationSteps([{ speaker: "customer", text: "", expectedAction: "", hints: "" }]);
    setEvalRules([
      { skill: "Empathy", weight: 20 },
      { skill: "Product Knowledge", weight: 20 },
      { skill: "Needs Discovery", weight: 20 },
      { skill: "Communication", weight: 20 },
      { skill: "Compliance", weight: 20 },
    ]);
    setHardBanned("guaranteed returns, no risk, 100% safe");
    setViolationPenalty(10);
    setSaved(false);
  };

  const handleSave = async () => {
    if (!title.trim() || !custName.trim() || !openingStatement.trim()) return;

    setSaving(true);
    try {
      const autoPrompt = custAiPrompt.trim() ||
        `You are ${custName}, a ${custAge}-year-old ${custProfession} from ${custCity}. Personality: ${custPersonality}. Your goal: ${custGoal}. Archetype: ${custArchetype}. You start at mood ${custMood}/10.`;

      const body = {
        title: title.trim(),
        description: description.trim(),
        category,
        difficulty,
        xpReward,
        tags: tags.split(",").map(t => t.trim()).filter(Boolean),
        customer: {
          name: custName.trim(),
          age: custAge,
          profession: custProfession.trim(),
          city: custCity.trim(),
          avatar: custName.charAt(0).toUpperCase(),
          personality: custPersonality.trim(),
          goal: custGoal.trim(),
          archetype: custArchetype.trim(),
          moodInitial: custMood,
          hotButtons: custHotButtons.split(",").map(t => t.trim()).filter(Boolean),
          aiPersonaPrompt: autoPrompt,
        },
        openingStatement: openingStatement.trim(),
        steps: conversationSteps
          .filter(s => s.text.trim())
          .map(s => ({
            speaker: s.speaker,
            text: s.text.trim(),
            expectedAction: s.expectedAction.trim() || undefined,
            hints: s.hints ? s.hints.split(",").map(h => h.trim()).filter(Boolean) : undefined,
          })),
        evaluationRules: evalRules.filter(r => r.skill.trim()).map(r => ({
          skill: r.skill.trim(),
          keywords: [],
          weight: r.weight,
        })),
        complianceRules: {
          hardBanned: hardBanned.split(",").map(b => b.trim()).filter(Boolean),
          violationPenalty,
          violationMessage: "Compliance violation detected!",
        },
      };

      const res = await fetch("/api/admin/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSaved(true);
        await fetchScenarios();
        setTimeout(() => { setView("list"); resetForm(); }, 1500);
      }
    } catch { /* ignore */ } finally {
      setSaving(false);
    }
  };

  const addStep = () => {
    const lastSpeaker = conversationSteps[conversationSteps.length - 1]?.speaker;
    setConversationSteps(prev => [...prev, {
      speaker: lastSpeaker === "customer" ? "system" : "customer",
      text: "", expectedAction: "", hints: "",
    }]);
  };

  const removeStep = (i: number) => {
    setConversationSteps(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateStep = (i: number, field: string, value: string) => {
    setConversationSteps(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const addEvalRule = () => setEvalRules(prev => [...prev, { skill: "", weight: 20 }]);
  const removeEvalRule = (i: number) => setEvalRules(prev => prev.filter((_, idx) => idx !== i));
  const updateEvalRule = (i: number, field: string, value: string | number) => {
    setEvalRules(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  };

  const catColor = CATEGORY_COLORS[category] || "var(--accent-gold)";

  /* ── Sidebar nav items ── */
  const sidebarLinks = [
    { label: "Overview", icon: Layout, active: false, disabled: true },
    { label: "Custom Scenarios", icon: ClipboardList, active: true, disabled: false },
    { label: "Team Progress", icon: Users, active: false, disabled: true },
    { label: "Feedback", icon: MessageSquare, active: false, disabled: true },
    { label: "Archives", icon: Archive, active: false, disabled: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col"
    >
      {/* ════════════ TOP NAV BAR ════════════ */}
      <nav className="ei-nav">
        {/* Brand */}
        <div className="ei-nav-brand" onClick={resetGame}>
          WISDORA INTELLIGENCE
        </div>

        {/* Centre links */}
        <div className="ei-nav-links">
          <button className="ei-nav-link" onClick={resetGame}>Dashboard</button>
          <button className="ei-nav-link active">Scenarios</button>
          <button className="ei-nav-link coming-soon">Library</button>
          <button className="ei-nav-link coming-soon">Analytics</button>
        </div>

        {/* Right icons */}
        <div className="ei-nav-profile">
          <button className="ei-nav-support coming-soon"><Bell size={16} /></button>
          <button className="ei-nav-support coming-soon"><Settings size={16} /></button>
          <div className="ei-nav-avatar">A</div>
        </div>
      </nav>

      {/* ════════════ BODY: SIDEBAR + MAIN ════════════ */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="ei-sidebar">
          <nav className="ei-sidebar-nav">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  className={`ei-sidebar-link${link.active ? " active" : ""}${link.disabled ? " coming-soon" : ""}`}
                  onClick={link.active ? () => setView("list") : undefined}
                >
                  <Icon size={16} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="ei-sidebar-footer">
            <button
              className="btn-gold"
              style={{ width: "100%", padding: "10px 16px", fontSize: 12 }}
              onClick={() => { resetForm(); setView("create"); }}
            >
              <Plus size={14} /> New Scenario
            </button>
            <button className="ei-sidebar-link coming-soon" style={{ marginTop: 4 }}>
              <HelpCircle size={16} /> Help Center
            </button>
            <button className="ei-sidebar-link" onClick={resetGame}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 overflow-y-auto" style={{ background: "var(--bg-void)" }}>
          <div className="w-full max-w-4xl mx-auto px-8 py-8">
            <AnimatePresence mode="wait">
              {/* ═══════════ LIST VIEW ═══════════ */}
              {view === "list" ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        Custom Scenarios
                      </h2>
                      <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>
                        {scenarios.length} scenario{scenarios.length !== 1 ? "s" : ""} created
                      </p>
                    </div>
                    <motion.button
                      onClick={() => { resetForm(); setView("create"); }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="btn-gold"
                    >
                      <Plus size={14} /> CREATE SCENARIO
                    </motion.button>
                  </div>

                  {/* Scenario list or empty state */}
                  {loading ? (
                    <div className="text-center py-16">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-10 h-10 mx-auto mb-4 rounded-full"
                        style={{
                          border: "2px solid var(--border)",
                          borderTopColor: "var(--accent-primary)",
                        }}
                      />
                    </div>
                  ) : scenarios.length === 0 ? (
                    <div className="nexus-card">
                      <div className="empty-state">
                        <div className="empty-state-icon">
                          <FileText size={28} style={{ color: "var(--text-muted)" }} />
                        </div>
                        <h3
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: "var(--text-primary)",
                            marginBottom: 8,
                          }}
                        >
                          No custom scenarios yet
                        </h3>
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--text-secondary)",
                            maxWidth: 420,
                            margin: "0 auto 20px",
                            lineHeight: 1.6,
                          }}
                        >
                          Create bespoke learning environments tailored to your team&apos;s unique
                          editorial challenges. Click CREATE SCENARIO to build your first one.
                        </p>
                        {/* Decorative pagination dots */}
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-primary)" }} />
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--border)" }} />
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--border)" }} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {scenarios.map((s) => {
                        const color = CATEGORY_COLORS[s.category] || "var(--accent-gold)";
                        return (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="nexus-card p-4 flex items-center gap-4"
                          >
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                              style={{
                                background: `${color}12`,
                                border: `1px solid ${color}25`,
                                color,
                                fontFamily: "var(--font-display)",
                              }}
                            >
                              {s.title.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                                  {s.title}
                                </span>
                                <span
                                  className="tag"
                                  style={{ color, background: `${color}08`, border: `1px solid ${color}20` }}
                                >
                                  {s.category}
                                </span>
                                <span
                                  className="tag"
                                  style={{
                                    color: "var(--text-ghost)",
                                    background: "var(--bg-surface)",
                                    border: "1px solid var(--border)",
                                  }}
                                >
                                  {s.difficulty}
                                </span>
                              </div>
                              <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
                                {s.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="btn-ghost px-3 py-2"
                              style={{ color: "var(--danger)" }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── Bottom helper cards ── */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    {/* Quick Tutorial card */}
                    <div className="nexus-card p-5">
                      <span
                        className="tag"
                        style={{
                          color: "var(--accent-primary)",
                          background: "var(--accent-primary-bg)",
                          border: "1px solid var(--accent-primary-border)",
                          marginBottom: 12,
                          display: "inline-block",
                        }}
                      >
                        QUICK TUTORIAL
                      </span>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: 8,
                        }}
                      >
                        How to design effective scenarios
                      </h4>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14 }}>
                        Learn best practices for building realistic training scenarios that
                        improve team performance and engagement.
                      </p>
                      <button
                        className="btn-ghost"
                        style={{
                          border: "none",
                          padding: 0,
                          color: "var(--accent-primary)",
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        Watch Guide <ArrowRight size={14} />
                      </button>
                      {/* Placeholder image area */}
                      <div
                        style={{
                          marginTop: 16,
                          height: 80,
                          borderRadius: "var(--radius-md)",
                          background: "var(--bg-tint)",
                          border: "1px dashed var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-ghost)",
                          fontSize: 11,
                        }}
                      >
                        Tutorial preview
                      </div>
                    </div>

                    {/* AI Generator card */}
                    <div
                      className="nexus-card p-5"
                      style={{
                        background: "linear-gradient(135deg, var(--bg-surface), var(--accent-primary-bg))",
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--radius-md)",
                          background: "var(--accent-primary-bg)",
                          border: "1px solid var(--accent-primary-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 14,
                        }}
                      >
                        <Sparkles size={20} style={{ color: "var(--accent-primary)" }} />
                      </div>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 15,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: 8,
                        }}
                      >
                        AI Generator
                      </h4>
                      <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                        Generate a scenario outline from a document or URL in seconds.
                      </p>
                      <button className="btn-outline">
                        <Sparkles size={12} /> Try AI Beta
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ═══════════ CREATE VIEW ═══════════ */
                <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Step indicator */}
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 flex-wrap">
                    {STEPS_LABEL.map((s) => {
                      const Icon = s.icon;
                      const active = step === s.n;
                      const done = step > s.n;
                      return (
                        <button
                          key={s.n}
                          onClick={() => setStep(s.n)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all"
                          style={{
                            background: active
                              ? "var(--accent-primary-bg)"
                              : done
                                ? "var(--success-bg)"
                                : "transparent",
                            border: active
                              ? "1px solid var(--accent-primary-border)"
                              : "1px solid var(--border)",
                            color: active
                              ? "var(--accent-primary)"
                              : done
                                ? "var(--success)"
                                : "var(--text-ghost)",
                          }}
                        >
                          {done ? <CheckCircle size={12} /> : <Icon size={12} />}
                          {s.title}
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 1: Basics */}
                  {step === 1 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                      <div className="nexus-card p-6" style={{ borderTop: `2px solid ${catColor}30` }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 20,
                          }}
                        >
                          Scenario Details
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <label className="ei-label">Title *</label>
                            <input
                              className="ei-input"
                              value={title}
                              onChange={e => setTitle(e.target.value)}
                              placeholder="e.g. Aggressive NRI Investment Query"
                            />
                          </div>
                          <div>
                            <label className="ei-label">Description *</label>
                            <textarea
                              className="ei-input"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              placeholder="Brief description of the scenario..."
                              rows={3}
                              style={{ resize: "vertical" }}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="ei-label">Category *</label>
                              <select
                                className="ei-select"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                              >
                                {CATEGORY_OPTIONS.map(c => (
                                  <option key={c.id} value={c.id}>{c.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="ei-label">Difficulty</label>
                              <select
                                className="ei-select"
                                value={difficulty}
                                onChange={e => setDifficulty(e.target.value)}
                              >
                                {DIFFICULTY_OPTIONS.map(d => (
                                  <option key={d.value} value={d.value}>{d.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="ei-label">XP Reward</label>
                              <input
                                className="ei-input"
                                type="number"
                                value={xpReward}
                                onChange={e => setXpReward(Number(e.target.value))}
                              />
                            </div>
                            <div>
                              <label className="ei-label">Tags (comma-separated)</label>
                              <input
                                className="ei-input"
                                value={tags}
                                onChange={e => setTags(e.target.value)}
                                placeholder="e.g. NRI, investment, mutual-funds"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Client */}
                  {step === 2 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                      <div className="nexus-card p-6" style={{ borderTop: `2px solid ${catColor}30` }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 20,
                          }}
                        >
                          Client Profile
                        </h3>
                        <div className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="ei-label">Client Name *</label>
                              <input
                                className="ei-input"
                                value={custName}
                                onChange={e => setCustName(e.target.value)}
                                placeholder="e.g. Rajesh Mehta"
                              />
                            </div>
                            <div>
                              <label className="ei-label">Age</label>
                              <input
                                className="ei-input"
                                type="number"
                                value={custAge}
                                onChange={e => setCustAge(Number(e.target.value))}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="ei-label">Profession *</label>
                              <input
                                className="ei-input"
                                value={custProfession}
                                onChange={e => setCustProfession(e.target.value)}
                                placeholder="e.g. IT Manager"
                              />
                            </div>
                            <div>
                              <label className="ei-label">City</label>
                              <input
                                className="ei-input"
                                value={custCity}
                                onChange={e => setCustCity(e.target.value)}
                                placeholder="e.g. Bangalore"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="ei-label">Personality *</label>
                            <textarea
                              className="ei-input"
                              value={custPersonality}
                              onChange={e => setCustPersonality(e.target.value)}
                              placeholder="e.g. Analytical, skeptical about banks, does thorough research before investing..."
                              rows={2}
                              style={{ resize: "vertical" }}
                            />
                          </div>
                          <div>
                            <label className="ei-label">Goal *</label>
                            <input
                              className="ei-input"
                              value={custGoal}
                              onChange={e => setCustGoal(e.target.value)}
                              placeholder="e.g. Wants to invest 10L in mutual funds but fears losing money"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="ei-label">Archetype</label>
                              <select
                                className="ei-select"
                                value={custArchetype}
                                onChange={e => setCustArchetype(e.target.value)}
                              >
                                {["General", "Skeptic", "Anxious Saver", "Impulse Buyer", "Negotiator", "Loyal-but-Confused", "Fraud Bait", "Aggressive Complainer", "NRI Investor", "First-Timer"].map(a => (
                                  <option key={a} value={a}>{a}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="ei-label">Initial Mood (1-10)</label>
                              <div className="flex items-center gap-3">
                                <input
                                  type="range"
                                  min={1}
                                  max={10}
                                  value={custMood}
                                  onChange={e => setCustMood(Number(e.target.value))}
                                  style={{ flex: 1, accentColor: "var(--accent-primary)" }}
                                />
                                <span
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    minWidth: 36,
                                  }}
                                >
                                  {custMood}/10
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="ei-label">Hot Buttons (comma-separated)</label>
                            <input
                              className="ei-input"
                              value={custHotButtons}
                              onChange={e => setCustHotButtons(e.target.value)}
                              placeholder="e.g. hidden charges, lock-in period, past losses"
                            />
                          </div>
                          <div>
                            <label className="ei-label">AI Persona Prompt (optional -- auto-generated if blank)</label>
                            <textarea
                              className="ei-input"
                              value={custAiPrompt}
                              onChange={e => setCustAiPrompt(e.target.value)}
                              placeholder="Custom AI prompt for this customer's personality... Leave blank for auto-generated."
                              rows={3}
                              style={{ resize: "vertical" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Conversation */}
                  {step === 3 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                      <div className="nexus-card p-6" style={{ borderTop: `2px solid ${catColor}30` }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 4,
                          }}
                        >
                          Conversation Flow
                        </h3>
                        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
                          Define the opening statement and conversation steps. Steps are used in TEST ME mode.
                        </p>

                        <div style={{ marginBottom: 24 }}>
                          <label className="ei-label">Opening Statement (Client&apos;s first line) *</label>
                          <textarea
                            className="ei-input"
                            value={openingStatement}
                            onChange={e => setOpeningStatement(e.target.value)}
                            placeholder="e.g. Hi, I've been thinking about investing some money but I'm not sure where to start..."
                            rows={2}
                            style={{ resize: "vertical" }}
                          />
                        </div>

                        <label className="ei-label" style={{ marginBottom: 14 }}>
                          Conversation Steps (for TEST ME structured mode)
                        </label>
                        <div className="space-y-3">
                          {conversationSteps.map((s, i) => (
                            <div
                              key={i}
                              className="p-4 rounded-lg"
                              style={{ background: "var(--bg-tint)", border: "1px solid var(--border)" }}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <span
                                    style={{
                                      fontFamily: "var(--font-mono)",
                                      fontSize: 10,
                                      fontWeight: 700,
                                      color: "var(--text-muted)",
                                    }}
                                  >
                                    STEP {i + 1}
                                  </span>
                                  <select
                                    className="ei-select"
                                    value={s.speaker}
                                    onChange={e => updateStep(i, "speaker", e.target.value)}
                                    style={{ width: "auto", padding: "6px 32px 6px 10px", fontSize: 12 }}
                                  >
                                    <option value="customer">Client speaks</option>
                                    <option value="system">System objective</option>
                                  </select>
                                </div>
                                {conversationSteps.length > 1 && (
                                  <button
                                    onClick={() => removeStep(i)}
                                    className="btn-ghost"
                                    style={{ color: "var(--danger)", border: "none", padding: "4px 8px" }}
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                )}
                              </div>
                              <textarea
                                className="ei-input"
                                value={s.text}
                                onChange={e => updateStep(i, "text", e.target.value)}
                                placeholder={
                                  s.speaker === "customer"
                                    ? "What the client says..."
                                    : "Objective for the RM (e.g. Discover the client's risk appetite)"
                                }
                                rows={2}
                                style={{ resize: "vertical", fontSize: 13 }}
                              />
                              {s.speaker === "system" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                  <input
                                    className="ei-input"
                                    value={s.expectedAction}
                                    onChange={e => updateStep(i, "expectedAction", e.target.value)}
                                    placeholder="Expected RM action"
                                    style={{ fontSize: 12, padding: "8px 12px" }}
                                  />
                                  <input
                                    className="ei-input"
                                    value={s.hints}
                                    onChange={e => updateStep(i, "hints", e.target.value)}
                                    placeholder="Hints (comma-separated)"
                                    style={{ fontSize: 12, padding: "8px 12px" }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <button onClick={addStep} className="btn-ghost mt-4" style={{ fontSize: 11 }}>
                          <Plus size={12} /> ADD STEP
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Scoring */}
                  {step === 4 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                      <div className="nexus-card p-6" style={{ borderTop: "2px solid var(--accent-gold-border)" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 4,
                          }}
                        >
                          Evaluation Rules
                        </h3>
                        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
                          Define skills and their point weights. Total should add up to 100.
                        </p>
                        <div className="space-y-2">
                          {evalRules.map((r, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <input
                                className="ei-input"
                                value={r.skill}
                                onChange={e => updateEvalRule(i, "skill", e.target.value)}
                                placeholder="Skill name"
                                style={{ flex: 1 }}
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  className="ei-input"
                                  type="number"
                                  value={r.weight}
                                  onChange={e => updateEvalRule(i, "weight", Number(e.target.value))}
                                  style={{ width: 80, textAlign: "center" }}
                                />
                                <span
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 11,
                                    color: "var(--text-muted)",
                                  }}
                                >
                                  pts
                                </span>
                              </div>
                              {evalRules.length > 1 && (
                                <button
                                  onClick={() => removeEvalRule(i)}
                                  className="btn-ghost"
                                  style={{ color: "var(--danger)", border: "none", padding: "4px 8px" }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button onClick={addEvalRule} className="btn-ghost" style={{ fontSize: 11 }}>
                            <Plus size={12} /> ADD SKILL
                          </button>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              fontWeight: 700,
                              color:
                                evalRules.reduce((s, r) => s + r.weight, 0) === 100
                                  ? "var(--success)"
                                  : "var(--warn)",
                            }}
                          >
                            TOTAL: {evalRules.reduce((s, r) => s + r.weight, 0)}/100
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Compliance */}
                  {step === 5 && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                      <div className="nexus-card p-6" style={{ borderTop: "2px solid rgba(196,48,48,0.3)" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 4,
                          }}
                        >
                          Compliance Rules
                        </h3>
                        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
                          Phrases that trigger instant compliance violations.
                        </p>
                        <div className="space-y-5">
                          <div>
                            <label className="ei-label">Hard-Banned Phrases (comma-separated)</label>
                            <textarea
                              className="ei-input"
                              value={hardBanned}
                              onChange={e => setHardBanned(e.target.value)}
                              placeholder="e.g. guaranteed returns, no risk, 100% safe, assured returns"
                              rows={3}
                              style={{ resize: "vertical" }}
                            />
                          </div>
                          <div>
                            <label className="ei-label">Violation Penalty (points deducted per violation)</label>
                            <input
                              className="ei-input"
                              type="number"
                              value={violationPenalty}
                              onChange={e => setViolationPenalty(Number(e.target.value))}
                              style={{ width: 140 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Preview summary */}
                      <div className="nexus-card p-6" style={{ borderTop: `2px solid ${catColor}30` }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--accent-primary)",
                            marginBottom: 16,
                          }}
                        >
                          Scenario Preview
                        </h3>
                        <div
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
                        >
                          <div>
                            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              TITLE
                            </span>
                            <p style={{ color: "var(--text-primary)", marginTop: 2 }}>{title || "\u2014"}</p>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              CATEGORY
                            </span>
                            <p style={{ color: catColor, marginTop: 2 }}>{category}</p>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              CLIENT
                            </span>
                            <p style={{ color: "var(--text-primary)", marginTop: 2 }}>
                              {custName || "\u2014"}, {custAge}, {custCity}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              DIFFICULTY
                            </span>
                            <p style={{ color: "var(--text-primary)", marginTop: 2 }}>{difficulty}</p>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              STEPS
                            </span>
                            <p style={{ color: "var(--text-primary)", marginTop: 2 }}>
                              {conversationSteps.filter(s => s.text).length}
                            </p>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-muted)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              XP REWARD
                            </span>
                            <p style={{ color: "var(--accent-primary)", marginTop: 2 }}>+{xpReward}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={() => (step > 1 ? setStep(step - 1) : setView("list"))}
                      className="btn-ghost"
                    >
                      <ChevronLeft size={14} /> {step > 1 ? "BACK" : "CANCEL"}
                    </button>

                    {step < 5 ? (
                      <button onClick={() => setStep(step + 1)} className="btn-gold">
                        NEXT <ChevronRight size={14} />
                      </button>
                    ) : (
                      <motion.button
                        onClick={handleSave}
                        disabled={saving || saved || !title.trim() || !custName.trim() || !openingStatement.trim()}
                        whileHover={!saving && !saved ? { scale: 1.03 } : {}}
                        whileTap={!saving && !saved ? { scale: 0.97 } : {}}
                        className="btn-gold"
                        style={{ opacity: saving || saved ? 0.7 : 1 }}
                      >
                        {saved ? (
                          <><CheckCircle size={14} /> SAVED!</>
                        ) : saving ? (
                          "SAVING..."
                        ) : (
                          <><Save size={14} /> SAVE SCENARIO</>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ════════════ FOOTER ════════════ */}
          <footer className="ei-footer" style={{ borderTop: "1px solid var(--border)" }}>
            <div className="ei-footer-links">
              <span className="ei-footer-link" style={{ cursor: "default" }}>Privacy Policy</span>
              <span className="ei-footer-link" style={{ cursor: "default" }}>Terms of Service</span>
              <span className="ei-footer-link" style={{ cursor: "default" }}>Knowledge Base</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--success)",
                  display: "inline-block",
                }}
              />
              System status: Operational
            </div>
          </footer>
        </main>
      </div>
    </motion.div>
  );
}
