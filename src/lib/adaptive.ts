import type { Scenario } from "./scenarios";

// ── Difficulty ordering ──
const DIFFICULTY_ORDER = ["easy", "medium", "hard", "expert"] as const;
type Difficulty = (typeof DIFFICULTY_ORDER)[number];

function difficultyIndex(d: string): number {
  const idx = DIFFICULTY_ORDER.indexOf(d as Difficulty);
  return idx >= 0 ? idx : 0;
}

// ── Experience → Adaptive Level mapping ──

const ROLE_WEIGHT: Record<string, number> = {
  "trainee": 0,
  "junior-rm": 1,
  "senior-rm": 2,
  "rm": 3,
  "branch-manager": 4,
  "regional-head": 5,
};

export function mapExperienceToLevel(
  experienceTier: string,
  currentRole: string,
): { adaptiveLevel: string; adaptiveLevelScore: number } {
  const roleW = ROLE_WEIGHT[currentRole] ?? 0;

  // Base score from experience tier
  let score: number;
  switch (experienceTier) {
    case "0-1":  score = 10; break;
    case "1-3":  score = 30; break;
    case "3-7":  score = 50; break;
    case "7-15": score = 70; break;
    case "15+":  score = 85; break;
    default:     score = 10;
  }

  // Role modifier: each step adds 3-5 points
  score = Math.min(98, score + roleW * 3);

  return { adaptiveLevel: scoreToLevel(score), adaptiveLevelScore: score };
}

function scoreToLevel(score: number): string {
  if (score >= 75) return "expert";
  if (score >= 50) return "hard";
  if (score >= 25) return "medium";
  return "easy";
}

// ── Scenario classification ──

export type ScenarioTag = "RECOMMENDED" | "MASTERED" | "BELOW_YOUR_LEVEL" | "CHALLENGE" | "NEW";

export interface ClassifiedScenario {
  tag: ScenarioTag;
  bestScore: number | null;
  relevanceScore: number;
}

export function classifyScenario(
  scenario: Scenario,
  adaptiveLevel: string | undefined,
  completedScenarios: string[] | undefined,
  sessionHistory: Array<{ scenarioId: string; percentage: number }> | undefined,
): ClassifiedScenario {
  const playerIdx = difficultyIndex(adaptiveLevel || "easy");
  const scenarioIdx = difficultyIndex(scenario.difficulty);
  const safeCompleted = completedScenarios || [];
  const safeHistory = sessionHistory || [];
  const isCompleted = safeCompleted.includes(scenario.id);

  // Best score for this scenario across all sessions
  const scores = safeHistory
    .filter((s) => s.scenarioId === scenario.id)
    .map((s) => s.percentage);
  const bestScore = scores.length > 0 ? Math.max(...scores) : null;

  // Mastered: completed with ≥85%
  if (isCompleted && bestScore !== null && bestScore >= 85) {
    return { tag: "MASTERED", bestScore, relevanceScore: 20 };
  }

  // Below your level: scenario is 2+ levels below player
  if (playerIdx - scenarioIdx >= 2) {
    return { tag: "BELOW_YOUR_LEVEL", bestScore, relevanceScore: 30 };
  }

  // Challenge: scenario is above player's level
  if (scenarioIdx > playerIdx) {
    return { tag: "CHALLENGE", bestScore, relevanceScore: 50 };
  }

  // Recommended: at player's level or 1 below
  if (!isCompleted) {
    return { tag: "NEW", bestScore, relevanceScore: 80 };
  }

  return { tag: "RECOMMENDED", bestScore, relevanceScore: 70 };
}

// ── Sort scenarios for player ──

export function sortScenariosForPlayer<T extends { tag: ScenarioTag; relevanceScore: number; category: string }>(
  scenarios: T[],
  expertiseAreas: string[] | undefined,
): T[] {
  const safeAreas = expertiseAreas || [];
  return [...scenarios].sort((a, b) => {
    if (b.relevanceScore !== a.relevanceScore) return b.relevanceScore - a.relevanceScore;
    const aMatch = safeAreas.includes(a.category) ? 1 : 0;
    const bMatch = safeAreas.includes(b.category) ? 1 : 0;
    return bMatch - aMatch;
  });
}

// ── Post-game adaptive level update ──

export function computeAdaptiveLevelUpdate(
  currentScore: number,
  gamePercentage: number,
  gameDifficulty: string,
  adaptiveLevel: string,
  recentHistory: Array<{ percentage: number; difficulty: string }>,
): { newScore: number; newLevel: string; suggestion: string | null } {
  const playerIdx = difficultyIndex(adaptiveLevel);
  const gameIdx = difficultyIndex(gameDifficulty);
  let delta = 0;

  if (gameIdx === playerIdx) {
    // Playing at your level
    if (gamePercentage >= 85) delta = 6;
    else if (gamePercentage >= 70) delta = 3;
    else if (gamePercentage >= 50) delta = 1;
    else if (gamePercentage < 40) delta = -4;
  } else if (gameIdx > playerIdx) {
    // Playing above your level
    if (gamePercentage >= 70) delta = 12;
    else if (gamePercentage >= 50) delta = 5;
    else delta = -1;
  } else {
    // Playing below your level — barely moves
    if (gamePercentage >= 85) delta = 1;
    else if (gamePercentage < 40) delta = -2;
  }

  const newScore = Math.max(0, Math.min(100, currentScore + delta));
  const newLevel = scoreToLevel(newScore);

  // Generate suggestion based on recent trend
  let suggestion: string | null = null;
  const last3 = recentHistory.slice(0, 3);
  if (last3.length >= 3) {
    const allHigh = last3.every((s) => s.percentage >= 85 && difficultyIndex(s.difficulty) >= playerIdx);
    const allLow = last3.every((s) => s.percentage < 40 && difficultyIndex(s.difficulty) <= playerIdx);

    if (allHigh && newLevel !== "expert") {
      const nextLevel = DIFFICULTY_ORDER[Math.min(playerIdx + 1, 3)];
      suggestion = `You're excelling at ${adaptiveLevel} scenarios. Ready to take on ${nextLevel} challenges?`;
    } else if (allLow && newLevel !== "easy") {
      const prevLevel = DIFFICULTY_ORDER[Math.max(playerIdx - 1, 0)];
      suggestion = `Consider reviewing ${prevLevel} scenarios to strengthen your foundation before advancing.`;
    }
  }

  return { newScore, newLevel, suggestion };
}
