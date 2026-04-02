"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { CATEGORIES, CATEGORY_COLORS } from "@/lib/scenarios";
import { Particles } from "./Particles";
import {
  ArrowLeft, Plus, Trash2, ChevronRight, ChevronLeft,
  User, Target, Shield, FileText, Zap, Save, CheckCircle,
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--bg-surface)",
  color: "var(--text-primary)",
  fontSize: 13,
  fontFamily: "var(--font-body)",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  color: "var(--text-secondary)",
  fontFamily: "var(--font-mono)",
  marginBottom: 6,
};

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col relative">
      <Particles count={6} />

      {/* TOP BAR */}
      <div className="relative z-10 shrink-0 glass-panel" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="px-6 py-3 flex items-center justify-between">
          <button onClick={resetGame} className="btn-ghost"><ArrowLeft size={12} /> LOBBY</button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--accent-gold)" }}>
            ADMIN — SCENARIO BUILDER
          </span>
          <div style={{ width: 80 }} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-3xl mx-auto px-6 py-6">

          <AnimatePresence mode="wait">
            {view === "list" ? (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                      Custom Scenarios
                    </h2>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      {scenarios.length} scenario{scenarios.length !== 1 ? "s" : ""} created
                    </p>
                  </div>
                  <motion.button
                    onClick={() => { resetForm(); setView("create"); }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-gold px-5 py-2.5"
                  >
                    <Plus size={14} /> CREATE SCENARIO
                  </motion.button>
                </div>

                {/* List */}
                {loading ? (
                  <div className="text-center py-16">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-10 h-10 mx-auto mb-4 rounded-full"
                      style={{ border: "2px solid var(--border)", borderTopColor: "var(--accent-gold)" }} />
                  </div>
                ) : scenarios.length === 0 ? (
                  <div className="text-center py-16">
                    <FileText size={32} className="mx-auto mb-4" style={{ color: "var(--text-ghost)" }} />
                    <p className="text-sm mb-1" style={{ color: "var(--text-secondary)" }}>No custom scenarios yet</p>
                    <p className="text-xs" style={{ color: "var(--text-ghost)" }}>Click CREATE SCENARIO to build your first one</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {scenarios.map((s) => {
                      const color = CATEGORY_COLORS[s.category] || "var(--accent-gold)";
                      return (
                        <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="nexus-card p-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                            style={{ background: `${color}12`, border: `1px solid ${color}25`, color, fontFamily: "var(--font-display)" }}>
                            {s.title.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{s.title}</span>
                              <span className="tag" style={{ color, background: `${color}08`, border: `1px solid ${color}20` }}>
                                {s.category}
                              </span>
                              <span className="tag" style={{ color: "var(--text-ghost)", background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                                {s.difficulty}
                              </span>
                            </div>
                            <p className="text-[10px] truncate" style={{ color: "var(--text-secondary)" }}>{s.description}</p>
                          </div>
                          <button onClick={() => handleDelete(s.id)}
                            className="btn-ghost px-3 py-2" style={{ color: "var(--danger)" }}>
                            <Trash2 size={12} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Step indicator */}
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
                  {STEPS_LABEL.map((s) => {
                    const Icon = s.icon;
                    const active = step === s.n;
                    const done = step > s.n;
                    return (
                      <button key={s.n} onClick={() => setStep(s.n)}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-all"
                        style={{
                          background: active ? "rgba(45,91,210,0.1)" : done ? "rgba(47,125,91,0.06)" : "transparent",
                          border: active ? "1px solid var(--accent-primary-border)" : "1px solid var(--border)",
                          color: active ? "var(--accent-primary)" : done ? "var(--success)" : "var(--text-ghost)",
                        }}>
                        {done ? <CheckCircle size={10} /> : <Icon size={10} />}
                        {s.title}
                      </button>
                    );
                  })}
                </div>

                {/* Step 1: Basics */}
                {step === 1 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="nexus-card p-5" style={{ borderTop: `2px solid ${catColor}30` }}>
                      <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Scenario Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label style={labelStyle}>Title *</label>
                          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Aggressive NRI Investment Query" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Description *</label>
                          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the scenario..." rows={3}
                            style={{ ...inputStyle, resize: "vertical" as const }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label style={labelStyle}>Category *</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                              {CATEGORY_OPTIONS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={labelStyle}>Difficulty</label>
                            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={inputStyle}>
                              {DIFFICULTY_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label style={labelStyle}>XP Reward</label>
                            <input type="number" value={xpReward} onChange={e => setXpReward(Number(e.target.value))} style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Tags (comma-separated)</label>
                            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. NRI, investment, mutual-funds" style={inputStyle} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Client */}
                {step === 2 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="nexus-card p-5" style={{ borderTop: `2px solid ${catColor}30` }}>
                      <h3 className="text-sm font-bold mb-4" style={{ color: "var(--text-primary)" }}>Client Profile</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label style={labelStyle}>Client Name *</label>
                            <input value={custName} onChange={e => setCustName(e.target.value)} placeholder="e.g. Rajesh Mehta" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Age</label>
                            <input type="number" value={custAge} onChange={e => setCustAge(Number(e.target.value))} style={inputStyle} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label style={labelStyle}>Profession *</label>
                            <input value={custProfession} onChange={e => setCustProfession(e.target.value)} placeholder="e.g. IT Manager" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>City</label>
                            <input value={custCity} onChange={e => setCustCity(e.target.value)} placeholder="e.g. Bangalore" style={inputStyle} />
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Personality *</label>
                          <textarea value={custPersonality} onChange={e => setCustPersonality(e.target.value)}
                            placeholder="e.g. Analytical, skeptical about banks, does thorough research before investing..." rows={2}
                            style={{ ...inputStyle, resize: "vertical" as const }} />
                        </div>
                        <div>
                          <label style={labelStyle}>Goal *</label>
                          <input value={custGoal} onChange={e => setCustGoal(e.target.value)}
                            placeholder="e.g. Wants to invest 10L in mutual funds but fears losing money" style={inputStyle} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label style={labelStyle}>Archetype</label>
                            <select value={custArchetype} onChange={e => setCustArchetype(e.target.value)} style={inputStyle}>
                              {["General", "Skeptic", "Anxious Saver", "Impulse Buyer", "Negotiator", "Loyal-but-Confused", "Fraud Bait", "Aggressive Complainer", "NRI Investor", "First-Timer"].map(a =>
                                <option key={a} value={a}>{a}</option>
                              )}
                            </select>
                          </div>
                          <div>
                            <label style={labelStyle}>Initial Mood (1-10)</label>
                            <div className="flex items-center gap-3">
                              <input type="range" min={1} max={10} value={custMood} onChange={e => setCustMood(Number(e.target.value))}
                                style={{ flex: 1, accentColor: "var(--accent-gold)" }} />
                              <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)", minWidth: 30 }}>{custMood}/10</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Hot Buttons (comma-separated)</label>
                          <input value={custHotButtons} onChange={e => setCustHotButtons(e.target.value)}
                            placeholder="e.g. hidden charges, lock-in period, past losses" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>AI Persona Prompt (optional — auto-generated if blank)</label>
                          <textarea value={custAiPrompt} onChange={e => setCustAiPrompt(e.target.value)}
                            placeholder="Custom AI prompt for this customer's personality... Leave blank for auto-generated." rows={3}
                            style={{ ...inputStyle, resize: "vertical" as const }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Conversation */}
                {step === 3 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="nexus-card p-5" style={{ borderTop: `2px solid ${catColor}30` }}>
                      <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>Conversation Flow</h3>
                      <p className="text-[10px] mb-4" style={{ color: "var(--text-ghost)" }}>
                        Define the opening statement and conversation steps. Steps are used in TEST ME mode.
                      </p>

                      <div className="mb-5">
                        <label style={labelStyle}>Opening Statement (Client&apos;s first line) *</label>
                        <textarea value={openingStatement} onChange={e => setOpeningStatement(e.target.value)}
                          placeholder="e.g. Hi, I've been thinking about investing some money but I'm not sure where to start..."
                          rows={2} style={{ ...inputStyle, resize: "vertical" as const }} />
                      </div>

                      <label style={{ ...labelStyle, marginBottom: 12 }}>Conversation Steps (for TEST ME structured mode)</label>
                      <div className="space-y-3">
                        {conversationSteps.map((s, i) => (
                          <div key={i} className="p-3 rounded-lg" style={{ background: "var(--bg-void)", border: "1px solid var(--border)" }}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>STEP {i + 1}</span>
                                <select value={s.speaker} onChange={e => updateStep(i, "speaker", e.target.value)}
                                  style={{ ...inputStyle, width: "auto", padding: "4px 8px", fontSize: 11 }}>
                                  <option value="customer">Client speaks</option>
                                  <option value="system">System objective</option>
                                </select>
                              </div>
                              {conversationSteps.length > 1 && (
                                <button onClick={() => removeStep(i)} className="btn-ghost" style={{ color: "var(--danger)" }}>
                                  <Trash2 size={10} />
                                </button>
                              )}
                            </div>
                            <textarea value={s.text} onChange={e => updateStep(i, "text", e.target.value)}
                              placeholder={s.speaker === "customer" ? "What the client says..." : "Objective for the RM (e.g. Discover the client's risk appetite)"}
                              rows={2} style={{ ...inputStyle, fontSize: 12, resize: "vertical" as const }} />
                            {s.speaker === "system" && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                <input value={s.expectedAction} onChange={e => updateStep(i, "expectedAction", e.target.value)}
                                  placeholder="Expected RM action" style={{ ...inputStyle, fontSize: 11, padding: "6px 10px" }} />
                                <input value={s.hints} onChange={e => updateStep(i, "hints", e.target.value)}
                                  placeholder="Hints (comma-separated)" style={{ ...inputStyle, fontSize: 11, padding: "6px 10px" }} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button onClick={addStep} className="btn-ghost mt-3 text-[10px] px-4 py-2">
                        <Plus size={10} /> ADD STEP
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Scoring */}
                {step === 4 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="nexus-card p-5" style={{ borderTop: "2px solid var(--accent-gold-border)" }}>
                      <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>Evaluation Rules</h3>
                      <p className="text-[10px] mb-4" style={{ color: "var(--text-ghost)" }}>
                        Define skills and their point weights. Total should add up to 100.
                      </p>
                      <div className="space-y-2">
                        {evalRules.map((r, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <input value={r.skill} onChange={e => updateEvalRule(i, "skill", e.target.value)}
                              placeholder="Skill name" style={{ ...inputStyle, flex: 1 }} />
                            <div className="flex items-center gap-1">
                              <input type="number" value={r.weight} onChange={e => updateEvalRule(i, "weight", Number(e.target.value))}
                                style={{ ...inputStyle, width: 70, textAlign: "center" as const }} />
                              <span className="text-[10px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-ghost)" }}>pts</span>
                            </div>
                            {evalRules.length > 1 && (
                              <button onClick={() => removeEvalRule(i)} className="btn-ghost" style={{ color: "var(--danger)" }}>
                                <Trash2 size={10} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <button onClick={addEvalRule} className="btn-ghost text-[10px] px-4 py-2">
                          <Plus size={10} /> ADD SKILL
                        </button>
                        <span className="text-[10px] font-bold" style={{
                          fontFamily: "var(--font-mono)",
                          color: evalRules.reduce((s, r) => s + r.weight, 0) === 100 ? "var(--success)" : "var(--warn)",
                        }}>
                          TOTAL: {evalRules.reduce((s, r) => s + r.weight, 0)}/100
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Compliance */}
                {step === 5 && (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                    <div className="nexus-card p-5" style={{ borderTop: "2px solid rgba(196,48,48,0.3)" }}>
                      <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>Compliance Rules</h3>
                      <p className="text-[10px] mb-4" style={{ color: "var(--text-ghost)" }}>
                        Phrases that trigger instant compliance violations.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label style={labelStyle}>Hard-Banned Phrases (comma-separated)</label>
                          <textarea value={hardBanned} onChange={e => setHardBanned(e.target.value)}
                            placeholder="e.g. guaranteed returns, no risk, 100% safe, assured returns"
                            rows={3} style={{ ...inputStyle, resize: "vertical" as const }} />
                        </div>
                        <div>
                          <label style={labelStyle}>Violation Penalty (points deducted per violation)</label>
                          <input type="number" value={violationPenalty} onChange={e => setViolationPenalty(Number(e.target.value))}
                            style={{ ...inputStyle, width: 120 }} />
                        </div>
                      </div>
                    </div>

                    {/* Preview summary */}
                    <div className="nexus-card p-5" style={{ borderTop: `2px solid ${catColor}30` }}>
                      <h3 className="text-sm font-bold mb-3" style={{ color: "var(--accent-gold)" }}>Scenario Preview</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                        <div><span style={{ color: "var(--text-ghost)" }}>TITLE</span><p style={{ color: "var(--text-primary)" }}>{title || "—"}</p></div>
                        <div><span style={{ color: "var(--text-ghost)" }}>CATEGORY</span><p style={{ color: catColor }}>{category}</p></div>
                        <div><span style={{ color: "var(--text-ghost)" }}>CLIENT</span><p style={{ color: "var(--text-primary)" }}>{custName || "—"}, {custAge}, {custCity}</p></div>
                        <div><span style={{ color: "var(--text-ghost)" }}>DIFFICULTY</span><p style={{ color: "var(--text-primary)" }}>{difficulty}</p></div>
                        <div><span style={{ color: "var(--text-ghost)" }}>STEPS</span><p style={{ color: "var(--text-primary)" }}>{conversationSteps.filter(s => s.text).length}</p></div>
                        <div><span style={{ color: "var(--text-ghost)" }}>XP REWARD</span><p style={{ color: "var(--accent-gold)" }}>+{xpReward}</p></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <button onClick={() => step > 1 ? setStep(step - 1) : setView("list")}
                    className="btn-ghost px-5 py-2.5">
                    <ChevronLeft size={14} /> {step > 1 ? "BACK" : "CANCEL"}
                  </button>

                  {step < 5 ? (
                    <button onClick={() => setStep(step + 1)} className="btn-gold px-6 py-2.5">
                      NEXT <ChevronRight size={14} />
                    </button>
                  ) : (
                    <motion.button
                      onClick={handleSave}
                      disabled={saving || saved || !title.trim() || !custName.trim() || !openingStatement.trim()}
                      whileHover={!saving && !saved ? { scale: 1.03 } : {}}
                      whileTap={!saving && !saved ? { scale: 0.97 } : {}}
                      className="btn-gold px-8 py-2.5"
                      style={{ opacity: saving || saved ? 0.7 : 1 }}
                    >
                      {saved ? <><CheckCircle size={14} /> SAVED!</> : saving ? "SAVING..." : <><Save size={14} /> SAVE SCENARIO</>}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
