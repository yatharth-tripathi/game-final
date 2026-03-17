import type { EvaluationRule, ComplianceRules } from "./scenarios";

export interface SkillScore {
  skill: string;
  score: number;
  maxScore: number;
  feedback?: string;
}

export interface ComplianceViolation {
  phrase: string;
  message: string;
  penalty: number;
}

export interface GhostResponse {
  step: number;
  actual: string;
  ideal: string;
}

export interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  skills: SkillScore[];
  overallFeedback: string;
  strengths?: string[];
  improvements?: string[];
  complianceViolations: ComplianceViolation[];
  bestMoment?: string;
  worstMoment?: string;
  ghostResponses?: GhostResponse[];
  moodAnalysis?: string;
  nextRecommendation?: string;
  xpAwarded: number;
  evaluatedBy: "ai" | "rules";
}

// Run compliance check BEFORE AI evaluation — blocking
export function checkCompliance(
  responses: string[],
  rules: ComplianceRules
): ComplianceViolation[] {
  const violations: ComplianceViolation[] = [];
  const combined = responses.join(" ").toLowerCase();

  for (const banned of rules.hardBanned) {
    if (combined.includes(banned.toLowerCase())) {
      violations.push({
        phrase: banned,
        message: rules.violationMessage,
        penalty: rules.violationPenalty,
      });
    }
  }
  return violations;
}

// Rule-based scoring (fallback when AI is unavailable)
export function evaluatePerformance(
  responses: string[],
  rules: EvaluationRule[],
  complianceRules: ComplianceRules
): EvaluationResult {
  const combined = responses.join(" ").toLowerCase();
  const violations = checkCompliance(responses, complianceRules);

  const skills: SkillScore[] = rules.map((rule) => {
    let score = 0;
    const maxScore = rule.weight;

    for (const keyword of rule.keywords) {
      if (combined.includes(keyword.toLowerCase())) {
        score += maxScore / rule.keywords.length;
      }
    }

    // Bonus for longer, more thoughtful responses
    const avgLength = responses.reduce((s, r) => s + r.length, 0) / responses.length;
    if (avgLength > 80) score = Math.min(maxScore, score * 1.15);
    if (avgLength > 150) score = Math.min(maxScore, score * 1.1);

    return {
      skill: rule.skill,
      score: Math.round(Math.min(maxScore, score)),
      maxScore,
    };
  });

  let totalScore = skills.reduce((s, sk) => s + sk.score, 0);
  const maxScore = skills.reduce((s, sk) => s + sk.maxScore, 0);

  // Apply compliance penalty
  const totalPenalty = violations.reduce((s, v) => s + v.penalty, 0);
  totalScore = Math.max(0, totalScore - totalPenalty);

  const percentage = Math.round((totalScore / maxScore) * 100);
  const grade = getGrade(percentage);
  const xpAwarded = calculateXP(percentage);

  return {
    totalScore,
    maxScore,
    percentage,
    grade,
    skills,
    overallFeedback: getOverallFeedback(percentage, grade, violations.length > 0),
    complianceViolations: violations,
    xpAwarded,
    evaluatedBy: "rules",
  };
}

function getGrade(pct: number): string {
  if (pct >= 95) return "S";
  if (pct >= 85) return "A";
  if (pct >= 70) return "B";
  if (pct >= 55) return "C";
  if (pct >= 40) return "D";
  return "F";
}

function calculateXP(pct: number): number {
  if (pct >= 90) return 100;
  if (pct >= 70) return 70;
  if (pct >= 50) return 40;
  return 20;
}

function getOverallFeedback(pct: number, grade: string, hasViolation: boolean): string {
  if (hasViolation) {
    return "Compliance violations detected. In real banking, this could result in regulatory action, fines, or termination. Focus on using compliant language even under pressure.";
  }
  if (grade === "S") return "Exceptional performance. You demonstrated mastery of banking knowledge, empathy, and compliance. Ready for the most challenging client interactions.";
  if (grade === "A") return "Strong performance across all dimensions. Minor areas for improvement but you handled the client professionally and compliantly.";
  if (grade === "B") return "Good performance with room for growth. Focus on deeper needs discovery and using more specific banking terminology.";
  if (grade === "C") return "Adequate but needs improvement. Work on empathy, product knowledge, and more structured responses.";
  if (grade === "D") return "Below expectations. Review the ideal responses and focus on compliance language and client engagement fundamentals.";
  return "Significant improvement needed. Re-study the scenario objectives and compliance requirements before attempting again.";
}
