import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Scenario } from "@/lib/scenarios";
import type { EvaluationResult } from "@/lib/evaluator";

export type GamePhase = "login" | "lobby" | "briefing" | "playing" | "evaluation" | "leaderboard" | "showme" | "tryme" | "admin";
export type GameMode = "showme" | "tryme" | "testme";

interface Message {
  id: string;
  role: "customer" | "user" | "system" | "compliance";
  content: string;
  timestamp: number;
  stepIndex?: number; // Track which step produced this message
}

const CAREER_LEVELS = [
  { level: 1, title: "Branch Trainee", minXP: 0 },
  { level: 2, title: "Branch Trainee", minXP: 250 },
  { level: 3, title: "Junior RM", minXP: 500 },
  { level: 4, title: "Junior RM", minXP: 1000 },
  { level: 5, title: "Senior RM", minXP: 1500 },
  { level: 6, title: "Senior RM", minXP: 2500 },
  { level: 7, title: "Relationship Head", minXP: 3500 },
  { level: 8, title: "Relationship Head", minXP: 5000 },
  { level: 9, title: "Relationship Head", minXP: 6000 },
  { level: 10, title: "Branch Manager", minXP: 7000 },
];

function getCareerLevel(xp: number) {
  let result = CAREER_LEVELS[0];
  for (const lvl of CAREER_LEVELS) {
    if (xp >= lvl.minXP) result = lvl;
  }
  return result;
}

function getNextLevelXP(xp: number): number {
  for (const lvl of CAREER_LEVELS) {
    if (xp < lvl.minXP) return lvl.minXP;
  }
  return CAREER_LEVELS[CAREER_LEVELS.length - 1].minXP + 1000;
}

interface CareerProfile {
  playerId: string;
  playerName: string;
  playerBranch: string;
  totalXP: number;
  casesCompleted: number;
  scoreSum: number;
  streak: number;
  lastPlayedDate: string;
  completedScenarios: string[];
  // Experience profile
  experienceTier: string;
  currentRole: string;
  expertiseAreas: string[];
  profileCompleted: boolean;
  // Adaptive routing
  adaptiveLevel: string;
  adaptiveLevelScore: number;
  adaptiveSuggestion: string | null;
}

interface GameState {
  phase: GamePhase;
  selectedCategory: string;
  currentScenario: Scenario | null;
  currentStepIndex: number;
  messages: Message[];
  userResponses: string[];
  evaluation: EvaluationResult | null;
  showHints: boolean;
  startTime: number | null;
  elapsedTime: number;
  mood: number;
  moodHistory: number[];
  complianceViolations: string[];
  isAdvancing: boolean; // Guard against race conditions
  gameMode: GameMode;
  career: CareerProfile;

  setPhase: (phase: GamePhase) => void;
  setGameMode: (mode: GameMode) => void;
  setCategory: (cat: string) => void;
  selectScenario: (s: Scenario) => void;
  startGame: () => void;
  addMessage: (msg: Omit<Message, "id" | "timestamp">) => void;
  submitResponse: (text: string) => void;
  advanceStep: () => void;
  setEvaluation: (result: EvaluationResult) => void;
  toggleHints: () => void;
  resetGame: () => void;
  setElapsedTime: (t: number) => void;
  updateMood: (delta: number) => void;
  addComplianceViolation: (v: string) => void;
  awardXP: (xp: number, scenarioId: string, score: number) => void;
  setAdvancing: (v: boolean) => void;
  setPlayer: (id: string, name: string, branch: string) => void;
  setExperienceProfile: (tier: string, role: string, areas: string[]) => void;
  updateAdaptiveLevel: (level: string, score: number, suggestion: string | null) => void;
  dismissSuggestion: () => void;
  logout: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "login",
      selectedCategory: "all",
      currentScenario: null,
      currentStepIndex: 0,
      messages: [],
      userResponses: [],
      evaluation: null,
      showHints: false,
      startTime: null,
      elapsedTime: 0,
      mood: 5,
      moodHistory: [5],
      complianceViolations: [],
      isAdvancing: false,
      gameMode: "testme" as GameMode,
      career: {
        playerId: "",
        playerName: "",
        playerBranch: "HQ",
        totalXP: 0,
        casesCompleted: 0,
        scoreSum: 0,
        streak: 0,
        lastPlayedDate: "",
        completedScenarios: [],
        experienceTier: "",
        currentRole: "",
        expertiseAreas: [],
        profileCompleted: false,
        adaptiveLevel: "easy",
        adaptiveLevelScore: 0,
        adaptiveSuggestion: null,
      },

      setPhase: (phase) => set({ phase }),
      setGameMode: (gameMode) => set({ gameMode }),
      setCategory: (selectedCategory) => set({ selectedCategory }),

      // Reset ALL game state when selecting a new scenario
      selectScenario: (scenario) => set({
        currentScenario: scenario,
        phase: "briefing",
        mood: scenario.customer.moodInitial,
        moodHistory: [scenario.customer.moodInitial],
        currentStepIndex: 0,
        messages: [],
        userResponses: [],
        evaluation: null,
        showHints: false,
        startTime: null,
        elapsedTime: 0,
        complianceViolations: [],
        isAdvancing: false,
      }),

      startGame: () => {
        const sc = get().currentScenario;
        if (!sc) return;
        const firstStep = sc.steps[0];
        const initialMessages: Message[] = [];
        if (firstStep && firstStep.speaker === "customer") {
          initialMessages.push({
            id: crypto.randomUUID(),
            role: "customer",
            content: firstStep.text,
            timestamp: Date.now(),
            stepIndex: 0,
          });
        }
        set({
          phase: "playing",
          messages: initialMessages,
          userResponses: [],
          evaluation: null,
          currentStepIndex: firstStep?.speaker === "customer" ? 1 : 0,
          showHints: false,
          startTime: Date.now(),
          elapsedTime: 0,
          complianceViolations: [],
          mood: sc.customer.moodInitial,
          moodHistory: [sc.customer.moodInitial],
          isAdvancing: false,
        });
      },

      addMessage: (msg) => set((state) => ({
        messages: [...state.messages, {
          ...msg,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        }],
      })),

      submitResponse: (text) => set((state) => ({
        userResponses: [...state.userResponses, text],
      })),

      advanceStep: () => set((state) => ({
        currentStepIndex: state.currentStepIndex + 1,
      })),

      setEvaluation: (evaluation) => set({ evaluation, phase: "evaluation", isAdvancing: false }),

      toggleHints: () => set((state) => ({ showHints: !state.showHints })),

      resetGame: () => set({
        phase: "lobby",
        currentScenario: null,
        currentStepIndex: 0,
        messages: [],
        userResponses: [],
        evaluation: null,
        showHints: false,
        startTime: null,
        elapsedTime: 0,
        mood: 5,
        moodHistory: [5],
        complianceViolations: [],
        isAdvancing: false,
      }),

      setElapsedTime: (elapsedTime) => set({ elapsedTime }),

      // Use functional update to avoid stale closure
      updateMood: (delta) => set((state) => {
        const newMood = Math.max(1, Math.min(10, state.mood + delta));
        return { mood: newMood, moodHistory: [...state.moodHistory, newMood] };
      }),

      addComplianceViolation: (v) => set((state) => ({
        complianceViolations: [...state.complianceViolations, v],
      })),

      setAdvancing: (isAdvancing) => set({ isAdvancing }),

      setPlayer: (id, name, branch) => set((state) => ({
        career: { ...state.career, playerId: id, playerName: name, playerBranch: branch },
      })),

      setExperienceProfile: (tier, role, areas) => set((state) => ({
        career: {
          ...state.career,
          experienceTier: tier,
          currentRole: role,
          expertiseAreas: areas,
          profileCompleted: true,
        },
      })),

      updateAdaptiveLevel: (level, score, suggestion) => set((state) => ({
        career: {
          ...state.career,
          adaptiveLevel: level,
          adaptiveLevelScore: score,
          adaptiveSuggestion: suggestion,
        },
      })),

      dismissSuggestion: () => set((state) => ({
        career: { ...state.career, adaptiveSuggestion: null },
      })),

      logout: () => set(() => ({
        phase: "login" as GamePhase,
        career: {
          playerId: "",
          playerName: "",
          playerBranch: "HQ",
          totalXP: 0,
          casesCompleted: 0,
          scoreSum: 0,
          streak: 0,
          lastPlayedDate: "",
          completedScenarios: [],
          experienceTier: "",
          currentRole: "",
          expertiseAreas: [],
          profileCompleted: false,
          adaptiveLevel: "easy",
          adaptiveLevelScore: 0,
          adaptiveSuggestion: null,
        },
      })),

      awardXP: (xp, scenarioId, score) => set((state) => {
        const career = { ...state.career };
        career.totalXP += xp;
        career.casesCompleted += 1;
        career.scoreSum += score;

        const today = new Date().toISOString().split("T")[0];
        if (career.lastPlayedDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
          career.streak = career.lastPlayedDate === yesterday ? career.streak + 1 : 1;
        }
        career.lastPlayedDate = today;

        if (!career.completedScenarios.includes(scenarioId)) {
          career.completedScenarios.push(scenarioId);
        }
        return { career };
      }),
    }),
    {
      name: "nexus-bank-game",
      partialize: (state) => ({ career: state.career }),
    }
  )
);

// Helper to compute average score from career
function getAvgScore(career: CareerProfile): number {
  return career.casesCompleted > 0 ? Math.round(career.scoreSum / career.casesCompleted) : 0;
}

export { getCareerLevel, getNextLevelXP, getAvgScore };
