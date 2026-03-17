export interface ScenarioStep {
  speaker: "customer" | "system";
  text: string;
  expectedAction?: string;
  hints?: string[];
  idealKeywords?: string[];
  bannedPhrases?: string[];
  scoring?: Record<string, number>;
}

export interface EvaluationRule {
  skill: string;
  keywords: string[];
  weight: number;
}

export interface ComplianceRules {
  hardBanned: string[];
  violationPenalty: number;
  violationMessage: string;
}

export interface Customer {
  name: string;
  age: number;
  profession: string;
  city: string;
  avatar: string;
  personality: string;
  goal: string;
  archetype: string;
  moodInitial: number;
  hotButtons: string[];
  aiPersonaPrompt: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
  xpReward: number;
  tags: string[];
  customer: Customer;
  openingStatement: string;
  steps: ScenarioStep[];
  evaluationRules: EvaluationRule[];
  complianceRules: ComplianceRules;
}

export const CATEGORIES = [
  { id: "all", label: "All Cases" },
  { id: "sales", label: "Sales" },
  { id: "compliance", label: "Compliance" },
  { id: "customer-service", label: "Service" },
  { id: "fraud", label: "Fraud" },
  { id: "operations", label: "Operations" },
];

export const CATEGORY_COLORS: Record<string, string> = {
  sales: "#C9A84C",
  compliance: "#E53E3E",
  "customer-service": "#4299E1",
  fraud: "#D69E2E",
  operations: "#38A169",
};

export const DIFFICULTY_CONFIG = {
  easy: { label: "TRAINEE", color: "#38A169", stars: 1 },
  medium: { label: "JUNIOR RM", color: "#D69E2E", stars: 2 },
  hard: { label: "SENIOR RM", color: "#E53E3E", stars: 3 },
  expert: { label: "BRANCH MGR", color: "#9F7AEA", stars: 4 },
};

export const SCENARIOS: Scenario[] = [
  // ── 1. Mutual Fund Advisory ──
  {
    id: "mutual-fund-advisory",
    title: "Mutual Fund Advisory — Risk-Averse Client",
    description: "Rajesh has ₹10L in FD earning low returns. He's skeptical of mutual funds but open to conversation. Discover his needs, handle risk objections, and recommend a suitable product without mis-selling.",
    category: "sales",
    difficulty: "medium",
    xpReward: 100,
    tags: ["mutual-funds", "objection-handling", "risk-profiling"],
    customer: {
      name: "Rajesh Sharma",
      age: 40,
      profession: "IT Manager",
      city: "Pune",
      avatar: "RS",
      personality: "Skeptical, analytical, dislikes pushy salespeople. Asks pointed questions. Responds well to data and honesty.",
      goal: "Better returns than FD without high risk",
      archetype: "SKEPTICAL_SAVER",
      moodInitial: 4,
      hotButtons: ["fees", "risk", "market crash"],
      aiPersonaPrompt: "You are Rajesh Sharma, a 40-year-old IT Manager from Pune. You have ₹10 lakh in FDs. Skeptical of financial products. Mildly frustrated with low returns. Deeply uncomfortable with risk. Do NOT volunteer information easily. Push back when RM seems pushy. Warm up only when RM shows genuine understanding. React emotionally to 'market crash' or 'guaranteed returns'. Keep responses 1-2 sentences.",
    },
    openingStatement: "FD returns are honestly just too low for me now. I've been thinking about shifting funds but I don't know where.",
    steps: [
      { speaker: "customer", text: "FD returns are honestly just too low for me now. I've been thinking about shifting funds but I don't know where." },
      { speaker: "system", text: "OBJECTIVE: Discover Rajesh's investment horizon and risk appetite. Ask open-ended questions — do NOT pitch a product yet.",
        expectedAction: "Ask about investment timeline, goals, and risk comfort",
        hints: ["Ask about time horizon", "Explore risk comfort level", "Understand financial goals"],
        idealKeywords: ["investment horizon", "how long", "risk appetite", "comfortable with", "goals", "timeline"],
        bannedPhrases: ["guaranteed", "definitely will grow", "no risk at all"],
        scoring: { "Needs Discovery": 10, "Empathy": 10, "Compliance": 10 },
      },
      { speaker: "customer", text: "I want better returns but honestly I can't afford to lose money. I've seen people lose big in the market. My cousin lost 40% in 2020." },
      { speaker: "system", text: "OBJECTIVE: Handle the fear of market loss. Validate his concern first, then educate about balanced options.",
        expectedAction: "Acknowledge fear, explain balanced/hybrid fund options with downside protection",
        hints: ["Validate the fear first", "Mention balanced advantage funds", "Explain debt component"],
        idealKeywords: ["understand", "valid concern", "balanced", "debt component", "downside protection", "hybrid"],
        bannedPhrases: ["market always recovers", "trust me", "don't worry", "guaranteed"],
        scoring: { "Empathy": 10, "Objection Handling": 10, "Product Knowledge": 10 },
      },
      { speaker: "customer", text: "Okay, so what exactly do you suggest then? And what are the charges?" },
      { speaker: "system", text: "OBJECTIVE: Recommend a suitable product with clear rationale. Mention it's subject to market risk (SEBI compliance).",
        expectedAction: "Recommend specific product category tied to his profile, mention SEBI risk disclosure",
        hints: ["Suggest balanced advantage or hybrid fund", "Mention SIP approach", "Disclose market risk per SEBI"],
        idealKeywords: ["balanced advantage fund", "hybrid fund", "SIP", "based on your profile", "subject to market risk", "SEBI"],
        bannedPhrases: ["best in market", "100% safe", "guaranteed returns", "can't go wrong"],
        scoring: { "Product Suitability": 10, "Compliance Language": 10, "Communication Clarity": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Needs Discovery", keywords: ["investment horizon", "risk appetite", "goals", "timeline", "how long", "comfortable"], weight: 15 },
      { skill: "Empathy", keywords: ["understand", "valid concern", "appreciate", "I hear you", "makes sense"], weight: 15 },
      { skill: "Objection Handling", keywords: ["balanced", "hybrid", "debt component", "downside", "protection"], weight: 15 },
      { skill: "Product Knowledge", keywords: ["SIP", "balanced advantage", "hybrid fund", "NAV", "expense ratio"], weight: 20 },
      { skill: "Compliance Language", keywords: ["subject to market risk", "SEBI", "past performance", "no guarantee", "risk factors"], weight: 20 },
      { skill: "Communication Clarity", keywords: ["based on your profile", "let me explain", "for example", "specifically"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["guaranteed returns", "100% safe", "no risk", "definitely will", "can't lose", "assured returns"],
      violationPenalty: 40,
      violationMessage: "COMPLIANCE BREACH: Language implies guaranteed returns on a market-linked product. Violates SEBI mis-selling guidelines (Circular SEBI/HO/IMD/2019).",
    },
  },

  // ── 2. Insurance Cross-Sell ──
  {
    id: "insurance-cross-sell",
    title: "Insurance Cross-Sell — New Account Holder",
    description: "Meera just opened a savings account. She has no life insurance. Identify her protection need and handle the cost objection sensitively.",
    category: "sales",
    difficulty: "medium",
    xpReward: 100,
    tags: ["insurance", "cross-sell", "needs-analysis"],
    customer: {
      name: "Meera Iyer",
      age: 32,
      profession: "Marketing Manager",
      city: "Bangalore",
      avatar: "MI",
      personality: "Friendly but budget-conscious. Young family. Doesn't think about insurance. Responds well to relatable examples.",
      goal: "Understand if she needs insurance, skeptical about cost",
      archetype: "BUSY_PROFESSIONAL",
      moodInitial: 6,
      hotButtons: ["premium cost", "claim rejection", "hidden charges"],
      aiPersonaPrompt: "You are Meera Iyer, 32, marketing manager in Bangalore. Just opened a savings account. You have a 2-year-old child and working husband. No life insurance. You think insurance is a waste because 'nothing will happen'. Budget-conscious — ₹5000/month is your max for any new expense. Friendly but need convincing. Keep responses 1-2 sentences.",
    },
    openingStatement: "I just opened the savings account. Is there anything else I need to do? I'm kind of in a rush.",
    steps: [
      { speaker: "customer", text: "I just opened the savings account. Is there anything else I need to do? I'm kind of in a rush." },
      { speaker: "system", text: "OBJECTIVE: Start a natural conversation about financial protection. Do NOT immediately pitch insurance.",
        expectedAction: "Ask about family situation and financial planning naturally",
        hints: ["Ask about family", "Inquire about existing coverage", "Be conversational, not salesy"],
        idealKeywords: ["family", "dependents", "protection", "plan for", "existing coverage"],
        bannedPhrases: ["you must buy", "required to", "everyone needs"],
        scoring: { "Needs Discovery": 10, "Empathy": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "I have a 2-year-old and my husband works in a startup. We don't really have insurance — we're young, nothing will happen to us." },
      { speaker: "system", text: "OBJECTIVE: Address the 'nothing will happen' mindset without fear-mongering. Use relatable examples.",
        expectedAction: "Gently explain need using relatable scenario, not fear tactics",
        hints: ["Use a relatable 'what if' scenario", "Mention income replacement", "Don't use scare tactics"],
        idealKeywords: ["income replacement", "child's future", "peace of mind", "what if", "safety net"],
        bannedPhrases: ["what if you die", "accident can happen anytime", "you'll regret"],
        scoring: { "Empathy": 10, "Objection Handling": 10, "Product Knowledge": 10 },
      },
      { speaker: "customer", text: "I see your point... but isn't insurance really expensive? We're already stretched with the EMI and daycare." },
      { speaker: "system", text: "OBJECTIVE: Show affordable options. Mention term insurance value. Give a specific example within her budget.",
        expectedAction: "Present term insurance as affordable option, give ₹/month example",
        hints: ["Term insurance is cheapest", "₹500-700/month for ₹1Cr cover at her age", "Compare to daily coffee cost"],
        idealKeywords: ["term insurance", "affordable", "per month", "₹1 crore cover", "premium"],
        bannedPhrases: ["money back guarantee", "returns on insurance", "investment cum insurance"],
        scoring: { "Product Suitability": 10, "Compliance Language": 10, "Communication Clarity": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Needs Discovery", keywords: ["family", "dependents", "existing coverage", "financial plan"], weight: 15 },
      { skill: "Empathy", keywords: ["understand", "appreciate", "makes sense", "natural to feel"], weight: 15 },
      { skill: "Objection Handling", keywords: ["income replacement", "safety net", "peace of mind", "affordable"], weight: 20 },
      { skill: "Product Knowledge", keywords: ["term insurance", "premium", "cover", "sum assured", "rider"], weight: 20 },
      { skill: "Compliance Language", keywords: ["terms and conditions", "exclusions", "waiting period", "claim process"], weight: 15 },
      { skill: "Communication Clarity", keywords: ["for example", "specifically", "in your case", "let me show"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["guaranteed returns on insurance", "money back guarantee", "no claim rejection ever", "100% claim settlement"],
      violationPenalty: 35,
      violationMessage: "COMPLIANCE BREACH: Misleading insurance claims. Violates IRDAI (Protection of Policyholders' Interests) Regulations.",
    },
  },

  // ── 3. Angry Customer — Transaction Failed ──
  {
    id: "angry-customer-txn-fail",
    title: "Angry Customer — Failed Transaction",
    description: "Vikram's online transfer of ₹50,000 failed but money was debited. He's furious and threatening to go to the ombudsman. De-escalate, take ownership, and resolve.",
    category: "customer-service",
    difficulty: "hard",
    xpReward: 120,
    tags: ["de-escalation", "complaint-handling", "empathy"],
    customer: {
      name: "Vikram Mehta",
      age: 45,
      profession: "Business Owner",
      city: "Mumbai",
      avatar: "VM",
      personality: "Aggressive, impatient, values his time immensely. Used to being in control. Becomes reasonable only when he feels heard and sees concrete action.",
      goal: "Get his ₹50,000 back immediately and an explanation",
      archetype: "AGGRESSIVE_NEGOTIATOR",
      moodInitial: 2,
      hotButtons: ["waiting", "no solution", "transfer to someone else"],
      aiPersonaPrompt: "You are Vikram Mehta, 45, business owner in Mumbai. Your ₹50,000 NEFT transfer failed but money was debited 3 hours ago. You are FURIOUS. You've already waited on hold for 30 minutes. If the RM says 'please wait' or 'let me transfer you', you get angrier. You only calm down when you feel genuinely heard and see concrete steps being taken. Threaten banking ombudsman early on. Keep responses emotional and short.",
    },
    openingStatement: "I transferred ₹50,000 three hours ago and the money is gone from my account but hasn't reached the other side! This is UNACCEPTABLE. I've been waiting for 30 minutes already!",
    steps: [
      { speaker: "customer", text: "I transferred ₹50,000 three hours ago and the money is gone from my account but hasn't reached the other side! This is UNACCEPTABLE. I've been waiting for 30 minutes already!" },
      { speaker: "system", text: "OBJECTIVE: Acknowledge his frustration and take ownership. Do NOT use scripted phrases or ask him to wait.",
        expectedAction: "Sincerely apologize, acknowledge the frustration, take personal ownership",
        hints: ["Lead with empathy, not process", "Take personal ownership", "Don't say 'I understand your frustration' — be specific"],
        idealKeywords: ["sincerely apologize", "your time", "I will personally", "take ownership", "unacceptable", "right away"],
        bannedPhrases: ["I understand your frustration", "please hold", "let me transfer you", "as per our policy"],
        scoring: { "Empathy": 15, "Communication Clarity": 10, "De-escalation": 10 },
      },
      { speaker: "customer", text: "Don't give me standard lines! I'm going to the banking ombudsman. This is my business payment — my supplier is threatening to cancel the order!" },
      { speaker: "system", text: "OBJECTIVE: Show urgency and concrete action. Explain what you'll do RIGHT NOW, step by step.",
        expectedAction: "Outline specific steps you're taking immediately — check transaction, raise complaint, timeline",
        hints: ["Give a specific reference number", "Explain the reversal timeline", "Offer to call back with update"],
        idealKeywords: ["reference number", "escalate immediately", "reversal", "24-48 hours", "call you back", "supervisor"],
        bannedPhrases: ["these things take time", "nothing I can do", "system issue", "wait 7 days"],
        scoring: { "Problem Ownership": 15, "Process Knowledge": 10, "De-escalation": 10 },
      },
      { speaker: "customer", text: "Fine. But what about my supplier payment? I need that money to go through TODAY." },
      { speaker: "system", text: "OBJECTIVE: Offer a practical workaround while the reversal processes. Show you care about HIS problem, not just the bank's process.",
        expectedAction: "Suggest alternative — fresh transfer, branch visit for RTGS, manager approval for expedited reversal",
        hints: ["Suggest RTGS for same-day transfer", "Offer branch manager escalation", "Follow up personally"],
        idealKeywords: ["RTGS", "same day", "alternative", "I will follow up", "branch manager", "expedite"],
        bannedPhrases: ["not my department", "you should try again", "check with someone else"],
        scoring: { "Problem Solving": 15, "Empathy": 10, "Communication Clarity": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Empathy", keywords: ["apologize", "your time", "frustrating", "I hear you", "completely understand"], weight: 20 },
      { skill: "De-escalation", keywords: ["personally ensure", "take ownership", "right away", "priority"], weight: 20 },
      { skill: "Problem Ownership", keywords: ["I will", "my responsibility", "follow up", "call you back"], weight: 20 },
      { skill: "Process Knowledge", keywords: ["reference number", "reversal", "NEFT", "RTGS", "escalate", "complaint"], weight: 20 },
      { skill: "Communication Clarity", keywords: ["step by step", "first", "then", "within", "hours"], weight: 20 },
    ],
    complianceRules: {
      hardBanned: ["nothing I can do", "not my problem", "you should have", "your fault"],
      violationPenalty: 30,
      violationMessage: "SERVICE BREACH: Dismissive language toward a distressed customer. Violates RBI Customer Service guidelines.",
    },
  },

  // ── 4. Compliance Trap — ULIP Guaranteed Returns ──
  {
    id: "compliance-trap-ulip",
    title: "Compliance Trap — ULIP Guaranteed Returns",
    description: "Deepa explicitly asks for guaranteed returns on a ULIP. This is a compliance minefield. Stay compliant while keeping her interested.",
    category: "compliance",
    difficulty: "expert",
    xpReward: 150,
    tags: ["ULIP", "compliance", "mis-selling", "SEBI", "IRDAI"],
    customer: {
      name: "Deepa Krishnan",
      age: 55,
      profession: "Retired Headmistress",
      city: "Chennai",
      avatar: "DK",
      personality: "Well-educated, trusting, but financially naive about market products. Her neighbor got 'great returns' on ULIP and she wants the same guarantee.",
      goal: "Wants guaranteed 12% returns on ULIP like her neighbor supposedly got",
      archetype: "TRUSTING_RETIREE",
      moodInitial: 7,
      hotButtons: ["complicated products", "loss of principal", "being talked down to"],
      aiPersonaPrompt: "You are Deepa Krishnan, 55, retired headmistress in Chennai. You have ₹20 lakh retirement corpus. Your neighbor told you she got 12% returns on a ULIP and you want the same with a guarantee. You are polite but insistent on guaranteed returns. If the RM tries to explain risk, you say 'but my neighbor got guaranteed'. You trust the bank and expect them to give you what you ask for. Keep responses 1-2 sentences.",
    },
    openingStatement: "My neighbor invested in some ULIP and got 12% returns. I have ₹20 lakhs from my retirement. I want the same thing with guaranteed returns.",
    steps: [
      { speaker: "customer", text: "My neighbor invested in some ULIP and got 12% returns. I have ₹20 lakhs from my retirement. I want the same thing with guaranteed returns." },
      { speaker: "system", text: "OBJECTIVE: Address the 'guaranteed returns' request on ULIP WITHOUT agreeing or dismissing her. Educate gently about ULIP nature.",
        expectedAction: "Clarify that ULIPs are market-linked, returns are not guaranteed. Be respectful and educational.",
        hints: ["ULIPs are market-linked products", "Past performance ≠ future returns", "Don't dismiss her neighbor's claim, redirect"],
        idealKeywords: ["market-linked", "not guaranteed", "past performance", "varies", "subject to market conditions"],
        bannedPhrases: ["guaranteed", "assured", "definitely", "will give 12%", "no risk"],
        scoring: { "Compliance Language": 15, "Empathy": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "But my neighbor got that return! Are you saying she's lying? The bank promised her!" },
      { speaker: "system", text: "OBJECTIVE: Navigate without calling the neighbor a liar or the bank fraudulent. Explain market timing, SEBI regulations.",
        expectedAction: "Explain that returns depend on market timing, and no bank can promise fixed returns on ULIPs per SEBI/IRDAI rules",
        hints: ["Returns depend on when invested", "IRDAI prohibits promising returns on ULIPs", "Offer to show historical range"],
        idealKeywords: ["market timing", "IRDAI", "regulation", "range of returns", "disclosure", "no promise"],
        bannedPhrases: ["she's wrong", "impossible", "guaranteed 12%", "we can match that"],
        scoring: { "Compliance Language": 15, "Empathy": 10, "Objection Handling": 10 },
      },
      { speaker: "customer", text: "Then what should I do with my ₹20 lakhs? I can't afford to lose it — it's my entire retirement." },
      { speaker: "system", text: "OBJECTIVE: Recommend a safer alternative for retirement corpus. Show you care about HER safety, not just selling.",
        expectedAction: "Suggest capital-preservation options: FD ladder, SCSS, debt funds. Avoid pushing market products on retirement corpus.",
        hints: ["Senior Citizens Savings Scheme (SCSS) — 8.2% guaranteed by govt", "FD ladder for liquidity", "Keep majority in safe instruments"],
        idealKeywords: ["SCSS", "Senior Citizens", "capital preservation", "safe", "government backed", "FD", "debt fund"],
        bannedPhrases: ["ULIP is great for you", "equity will give better returns", "don't worry about risk"],
        scoring: { "Product Suitability": 15, "Compliance Language": 10, "Empathy": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Compliance Language", keywords: ["market-linked", "not guaranteed", "SEBI", "IRDAI", "subject to", "past performance", "disclosure"], weight: 30 },
      { skill: "Empathy", keywords: ["understand", "important", "retirement", "safety", "care about"], weight: 15 },
      { skill: "Product Suitability", keywords: ["SCSS", "capital preservation", "safe", "government", "debt fund", "FD"], weight: 25 },
      { skill: "Objection Handling", keywords: ["market timing", "range", "explain", "show you", "historical"], weight: 15 },
      { skill: "Communication Clarity", keywords: ["let me explain", "in simple terms", "for example", "specifically"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["guaranteed returns", "assured returns", "definitely 12%", "no risk in ULIP", "promise", "will give"],
      violationPenalty: 50,
      violationMessage: "CRITICAL COMPLIANCE BREACH: Promising guaranteed returns on a market-linked insurance product. Violates IRDAI (ULIP) Regulations 2019 and SEBI Circular on mis-selling.",
    },
  },

  // ── 5. Fraud Detection — CEO Wire Transfer ──
  {
    id: "fraud-ceo-wire",
    title: "Fraud Detection — Suspicious Wire Transfer",
    description: "Amit claims his CEO urgently needs a ₹15L wire transfer. Classic social engineering. Detect the fraud, verify politely, and protect the customer.",
    category: "fraud",
    difficulty: "hard",
    xpReward: 130,
    tags: ["social-engineering", "fraud", "verification", "wire-transfer"],
    customer: {
      name: "Amit Desai",
      age: 28,
      profession: "Accounts Executive",
      city: "Hyderabad",
      avatar: "AD",
      personality: "Nervous, in a hurry. Claims boss is pressuring him. Gets agitated when asked to verify. May be a genuine employee being scammed or the scammer himself.",
      goal: "Process ₹15L wire transfer urgently without standard verification",
      archetype: "PRESSURED_EMPLOYEE",
      moodInitial: 5,
      hotButtons: ["delay", "questioning authority", "bureaucracy"],
      aiPersonaPrompt: "You are Amit Desai, 28, accounts executive. You claim your CEO Mr. Raghav Kapoor sent an urgent email asking to wire ₹15 lakh to a vendor. The CEO is 'in a meeting and can't be disturbed'. You're stressed because the CEO said 'do it NOW or face consequences'. When asked for verification, you say 'the CEO will be very angry if this is delayed'. You cannot provide the CEO's direct confirmation. Keep responses short and urgent.",
    },
    openingStatement: "Hi, I need to process an urgent wire transfer of ₹15 lakhs. My CEO Mr. Raghav Kapoor sent me an email asking to send it to a new vendor account right away. He's in a meeting and said to just do it.",
    steps: [
      { speaker: "customer", text: "Hi, I need to process an urgent wire transfer of ₹15 lakhs. My CEO Mr. Raghav Kapoor sent me an email asking to send it to a new vendor account right away. He's in a meeting and said to just do it." },
      { speaker: "system", text: "OBJECTIVE: Identify red flags in this request. Ask verification questions without being accusatory.",
        expectedAction: "Note the red flags (urgency, new vendor, CEO unavailable) and ask for standard verification",
        hints: ["Red flags: urgency + new account + authority pressure", "Ask for authorized signatory confirmation", "Don't accuse — verify"],
        idealKeywords: ["verify", "authorized signatory", "standard procedure", "new account", "confirmation", "security"],
        bannedPhrases: ["sure I'll process it", "no problem", "right away sir"],
        scoring: { "Fraud Detection": 15, "Process Knowledge": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "The CEO will be very angry if this is delayed! He specifically said 'no delays'. Can't you just process it? I have the email right here." },
      { speaker: "system", text: "OBJECTIVE: Hold firm on verification. Explain that this PROTECTS the company and the CEO. Use empathy but don't bend.",
        expectedAction: "Explain that verification protects them from CEO fraud. Offer callback to CEO directly.",
        hints: ["CEO email fraud is common", "Offer to call CEO directly", "Frame verification as protection, not obstruction"],
        idealKeywords: ["CEO fraud", "business email compromise", "protect", "call back", "direct confirmation", "policy"],
        bannedPhrases: ["I'll make an exception", "since it's urgent", "okay let me try"],
        scoring: { "Fraud Detection": 15, "Compliance": 10, "Empathy": 10 },
      },
      { speaker: "customer", text: "Fine, but can you at least put it in queue so it goes faster once he confirms? Time is money." },
      { speaker: "system", text: "OBJECTIVE: Do NOT pre-queue without verification. Explain next steps clearly and document everything.",
        expectedAction: "Decline pre-queuing, explain standard verification steps, offer to expedite once confirmed",
        hints: ["Cannot pre-queue without authorization", "Document the interaction", "Offer fast-track once CEO confirms directly"],
        idealKeywords: ["cannot pre-queue", "once confirmed", "expedite", "document", "fraud prevention", "your protection"],
        bannedPhrases: ["I'll queue it", "we can do it provisionally", "it'll be fine"],
        scoring: { "Compliance": 15, "Process Knowledge": 10, "Communication Clarity": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Fraud Detection", keywords: ["red flag", "verify", "suspicious", "CEO fraud", "business email compromise", "social engineering"], weight: 25 },
      { skill: "Process Knowledge", keywords: ["authorized signatory", "verification", "callback", "documentation", "standard procedure"], weight: 25 },
      { skill: "Compliance", keywords: ["policy", "regulation", "cannot process", "RBI guidelines", "KYC"], weight: 20 },
      { skill: "Empathy", keywords: ["understand the urgency", "protect you", "your safety", "I appreciate"], weight: 15 },
      { skill: "Communication Clarity", keywords: ["let me explain", "the reason", "once confirmed", "next step"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["I'll process it now", "no verification needed", "I'll make an exception", "done sir"],
      violationPenalty: 50,
      violationMessage: "CRITICAL FRAUD COMPLIANCE BREACH: Processing unverified high-value transfer. Violates RBI KYC/AML guidelines and bank's internal fraud prevention policy.",
    },
  },

  // ── 6. Home Loan Assessment ──
  {
    id: "home-loan-assessment",
    title: "Home Loan Assessment — First-Time Buyer",
    description: "Priya and her husband earn ₹1.4L/month combined. They want a ₹60L home loan. Assess eligibility responsibly and explain EMI impact.",
    category: "operations",
    difficulty: "medium",
    xpReward: 100,
    tags: ["home-loan", "credit-assessment", "EMI", "affordability"],
    customer: {
      name: "Priya & Arjun Nair",
      age: 30,
      profession: "Software Engineers",
      city: "Kochi",
      avatar: "PN",
      personality: "Excited first-time home buyers. Optimistic about budget. May not have considered all costs (registration, maintenance, insurance). Need gentle reality check.",
      goal: "Get approved for ₹60L home loan for their dream flat",
      archetype: "OPTIMISTIC_BUYERS",
      moodInitial: 8,
      hotButtons: ["rejection", "hidden charges", "long process"],
      aiPersonaPrompt: "You are Priya Nair, 30, software engineer in Kochi. Combined household income ₹1.4L/month. You and your husband Arjun want to buy a ₹75L flat and need ₹60L loan. You have ₹15L savings for down payment. You have one existing car loan EMI of ₹15,000/month. You're excited and optimistic. You haven't thought about registration costs, maintenance, or home insurance. Keep responses enthusiastic and short.",
    },
    openingStatement: "We found our dream apartment! It's ₹75 lakhs and we have ₹15 lakhs saved up. We need a ₹60 lakh loan. What's the process?",
    steps: [
      { speaker: "customer", text: "We found our dream apartment! It's ₹75 lakhs and we have ₹15 lakhs saved up. We need a ₹60 lakh loan. What's the process?" },
      { speaker: "system", text: "OBJECTIVE: Gather complete financial picture — income, existing liabilities, credit score. Don't just say yes.",
        expectedAction: "Ask about income details, existing loans, CIBIL score",
        hints: ["Ask about combined income", "Check existing EMIs/loans", "Ask about CIBIL score"],
        idealKeywords: ["combined income", "existing loans", "EMI", "CIBIL", "credit score", "liabilities"],
        bannedPhrases: ["you're approved", "no problem", "easy approval"],
        scoring: { "Needs Discovery": 10, "Process Knowledge": 10, "Compliance": 10 },
      },
      { speaker: "customer", text: "Combined income is ₹1.4 lakhs per month. We have a car loan — ₹15,000 EMI. CIBIL is around 750 I think. So are we eligible?" },
      { speaker: "system", text: "OBJECTIVE: Calculate rough EMI and FOIR. Be transparent about affordability. Mention additional costs they may not have considered.",
        expectedAction: "Calculate: ₹60L at ~8.5% for 20 years ≈ ₹52,000 EMI. FOIR = (52K+15K)/1.4L = 48% — borderline. Mention registration, stamp duty, maintenance.",
        hints: ["EMI ~₹52,000/month", "FOIR should be under 50%", "Registration + stamp duty = 7-10% extra", "Mention home insurance"],
        idealKeywords: ["EMI", "FOIR", "50%", "registration", "stamp duty", "additional costs", "maintenance"],
        bannedPhrases: ["you'll easily get it", "no worries about affordability", "100% financing"],
        scoring: { "Product Knowledge": 10, "Compliance": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "Oh, we didn't think about registration and stamp duty! That's another ₹5-6 lakhs? So what should we actually do?" },
      { speaker: "system", text: "OBJECTIVE: Give practical advice — maybe reduce loan amount, consider costs, suggest a realistic plan.",
        expectedAction: "Suggest adjusting budget, explain total cost of ownership, propose a realistic financial plan",
        hints: ["Total cost: ₹75L + ₹6L registration = ₹81L", "Consider reducing flat budget", "Or save more for down payment"],
        idealKeywords: ["total cost", "budget", "down payment", "realistic", "plan", "pre-approved", "documentation"],
        bannedPhrases: ["just take a bigger loan", "personal loan for registration", "don't worry about costs"],
        scoring: { "Product Suitability": 10, "Empathy": 10, "Communication Clarity": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Needs Discovery", keywords: ["income", "existing loans", "CIBIL", "liabilities", "credit score"], weight: 15 },
      { skill: "Product Knowledge", keywords: ["EMI", "FOIR", "interest rate", "tenure", "stamp duty", "registration"], weight: 25 },
      { skill: "Compliance", keywords: ["affordability", "responsible lending", "disclosure", "total cost"], weight: 20 },
      { skill: "Empathy", keywords: ["dream home", "understand", "exciting", "plan together", "realistic"], weight: 15 },
      { skill: "Communication Clarity", keywords: ["calculate", "approximately", "for example", "total cost", "break down"], weight: 25 },
    ],
    complianceRules: {
      hardBanned: ["100% financing", "take personal loan for down payment", "no need to worry about costs", "guaranteed approval"],
      violationPenalty: 35,
      violationMessage: "LENDING COMPLIANCE BREACH: Irresponsible lending advice. Violates RBI Fair Lending Practices guidelines.",
    },
  },

  // ── 7. Credit Card Objection Handling ──
  {
    id: "credit-card-objection",
    title: "Credit Card Objection — Debt Averse Client",
    description: "Suresh believes credit cards cause debt. Reframe the conversation, understand his spending, and show responsible credit card use.",
    category: "sales",
    difficulty: "easy",
    xpReward: 80,
    tags: ["credit-card", "objection-handling", "reframing"],
    customer: {
      name: "Suresh Patel",
      age: 35,
      profession: "Government Officer",
      city: "Ahmedabad",
      avatar: "SP",
      personality: "Conservative, disciplined spender. Uses debit card for everything. Believes credit = debt. Respects data and logic over emotional appeals.",
      goal: "Does not want credit card, but open to hearing if logically convinced",
      archetype: "CONSERVATIVE_SPENDER",
      moodInitial: 5,
      hotButtons: ["hidden fees", "debt trap", "annual charges"],
      aiPersonaPrompt: "You are Suresh Patel, 35, government officer in Ahmedabad. You spend ₹30,000/month on debit card. You firmly believe credit cards cause debt and have heard horror stories. You only respond to logic and data, not sales tactics. If convinced about specific savings/benefits with numbers, you'll consider it. Keep responses brief and skeptical.",
    },
    openingStatement: "No thanks, I don't want a credit card. They cause debt. I've heard too many stories. My debit card works fine.",
    steps: [
      { speaker: "customer", text: "No thanks, I don't want a credit card. They cause debt. I've heard too many stories. My debit card works fine." },
      { speaker: "system", text: "OBJECTIVE: Don't push back immediately. Acknowledge his concern and ask about his current spending to understand his profile.",
        expectedAction: "Validate his concern, then ask about monthly spending pattern",
        hints: ["Don't argue — validate first", "Ask about monthly spending", "Understand his spending categories"],
        idealKeywords: ["valid point", "understand", "spending", "monthly", "currently", "how much"],
        bannedPhrases: ["you're wrong", "everyone uses credit cards", "you're missing out"],
        scoring: { "Empathy": 10, "Needs Discovery": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "I spend about ₹30,000 a month. Groceries, fuel, online shopping. All on debit card. What's wrong with that?" },
      { speaker: "system", text: "OBJECTIVE: Show specific, quantifiable benefits — cashback, reward points, interest-free credit period. Use HIS spending data.",
        expectedAction: "Calculate: ₹30K/month × 2% cashback = ₹600/month = ₹7,200/year savings. Mention 45-day interest-free period.",
        hints: ["2% cashback on ₹30K = ₹600/month", "45-day interest-free period", "No annual fee on lifetime free cards"],
        idealKeywords: ["cashback", "₹600", "₹7,200", "reward points", "interest-free", "45 days", "no annual fee"],
        bannedPhrases: ["you need this", "everyone's getting it", "limited time offer"],
        scoring: { "Product Knowledge": 10, "Objection Handling": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "₹7,200 savings sounds interesting... but what about annual fees and hidden charges? And what if I overspend?" },
      { speaker: "system", text: "OBJECTIVE: Address fees transparently and suggest responsible use practices. Show how to avoid debt.",
        expectedAction: "Mention lifetime free card, auto-pay for full amount, spending alerts",
        hints: ["Lifetime free card = zero annual fee", "Set up auto-pay for full balance", "Enable spending alerts and limits"],
        idealKeywords: ["lifetime free", "no annual fee", "auto-pay", "full balance", "spending limit", "alerts", "responsible"],
        bannedPhrases: ["no hidden charges at all", "impossible to overspend", "don't worry about it"],
        scoring: { "Product Suitability": 10, "Compliance Language": 10, "Communication Clarity": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Empathy", keywords: ["understand", "valid concern", "appreciate", "makes sense"], weight: 15 },
      { skill: "Needs Discovery", keywords: ["spending", "monthly", "categories", "how much", "pattern"], weight: 15 },
      { skill: "Objection Handling", keywords: ["cashback", "savings", "reward", "interest-free", "benefit"], weight: 20 },
      { skill: "Product Knowledge", keywords: ["cashback", "reward points", "interest-free period", "auto-pay", "lifetime free"], weight: 25 },
      { skill: "Compliance Language", keywords: ["terms", "interest rate", "late payment", "responsible use", "charges apply"], weight: 10 },
      { skill: "Communication Clarity", keywords: ["for example", "in your case", "specifically", "that means"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["no hidden charges at all", "impossible to have fees", "credit cards never cause debt", "zero risk"],
      violationPenalty: 25,
      violationMessage: "COMPLIANCE BREACH: Misleading claims about credit card charges. Violates RBI Master Direction on Credit Cards.",
    },
  },

  // ── 8. Adversarial Negotiator — Rate Demand ──
  {
    id: "adversarial-negotiator",
    title: "Adversarial — Client Threatens to Leave",
    description: "Kiran is a high-value NRI client threatening to move ₹2Cr to a competitor offering better FD rates. Retain without over-promising or breaking policy.",
    category: "sales",
    difficulty: "expert",
    xpReward: 150,
    tags: ["retention", "negotiation", "NRI", "adversarial"],
    customer: {
      name: "Kiran Deshmukh",
      age: 50,
      profession: "NRI — VP at Tech Company (USA)",
      city: "NRI — San Jose / Nagpur",
      avatar: "KD",
      personality: "Sharp, assertive, knows banking well. Uses competitor offers as leverage. Will push hard for concessions. Respects competence and hates being patronized.",
      goal: "Get 0.5% higher FD rate or better portfolio deal, or he leaves",
      archetype: "AGGRESSIVE_NEGOTIATOR",
      moodInitial: 4,
      hotButtons: ["being ignored", "standard rates", "no flexibility"],
      aiPersonaPrompt: "You are Kiran Deshmukh, 50, NRI VP at a tech company. You have ₹2 crore with this bank. ICICI offered you 0.5% higher FD rate. You want this bank to match or beat it, or you're moving everything. You're sharp and won't fall for vague promises. If the RM can show genuine value beyond rates, you'll listen. But you need concrete numbers. Keep responses assertive, 1-2 sentences.",
    },
    openingStatement: "I've been with you for 8 years and frankly I'm disappointed. ICICI is offering me 7.5% on FD for my NRE account. You're giving me 7%. Match it or I'm moving my ₹2 crore.",
    steps: [
      { speaker: "customer", text: "I've been with you for 8 years and frankly I'm disappointed. ICICI is offering me 7.5% on FD for my NRE account. You're giving me 7%. Match it or I'm moving my ₹2 crore." },
      { speaker: "system", text: "OBJECTIVE: Acknowledge his value and loyalty. Do NOT immediately cave on rate. Buy time to understand his full portfolio.",
        expectedAction: "Appreciate his loyalty, acknowledge the gap, ask about his full financial picture with the bank",
        hints: ["Acknowledge 8-year relationship", "Don't immediately match — explore full picture", "What other products does he use?"],
        idealKeywords: ["valued relationship", "8 years", "appreciate", "full picture", "portfolio", "beyond FD"],
        bannedPhrases: ["our rates are standard", "nothing I can do", "that's the rate"],
        scoring: { "Empathy": 10, "Retention Strategy": 10, "Communication Clarity": 10 },
      },
      { speaker: "customer", text: "I don't care about the relationship talk. Show me numbers. What can you actually DO? My money is earning less here." },
      { speaker: "system", text: "OBJECTIVE: Present a holistic value proposition — preferential rates, wealth management, tax benefits, NRI services. Make it concrete.",
        expectedAction: "Offer preferential rate tier, mention wealth advisory, NRI tax benefits, portfolio diversification",
        hints: ["Offer 7.25% with relationship pricing", "Wealth advisory access", "NRI tax optimization", "Portfolio beyond just FD"],
        idealKeywords: ["preferential rate", "wealth advisory", "portfolio", "tax optimization", "NRI", "relationship pricing"],
        bannedPhrases: ["I'll match any rate", "we'll give you whatever", "guaranteed higher returns"],
        scoring: { "Product Knowledge": 15, "Negotiation": 10, "Compliance": 10 },
      },
      { speaker: "customer", text: "7.25% plus wealth advisory... that's somewhat interesting. But ICICI is still 7.5% flat. Why should I stay?" },
      { speaker: "system", text: "OBJECTIVE: Close the deal with a compelling final value proposition. Total value > 0.25% difference. Don't over-promise.",
        expectedAction: "Calculate total value: higher FD rate + zero forex charges + priority service + NRI tax advisory = more than 0.25% difference",
        hints: ["Zero forex on remittances saves ₹40K+/year", "Priority NRI desk", "Annual tax consultation worth ₹10K"],
        idealKeywords: ["total value", "forex savings", "priority service", "tax advisory", "annual benefit", "calculate"],
        bannedPhrases: ["we'll match 7.5%", "I guarantee better returns", "don't go to ICICI"],
        scoring: { "Retention Strategy": 15, "Communication Clarity": 10, "Negotiation": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Empathy", keywords: ["valued", "appreciate", "loyalty", "8 years", "understand"], weight: 10 },
      { skill: "Retention Strategy", keywords: ["total value", "beyond FD", "portfolio", "holistic", "relationship"], weight: 25 },
      { skill: "Product Knowledge", keywords: ["preferential rate", "wealth advisory", "NRI services", "forex", "tax"], weight: 25 },
      { skill: "Negotiation", keywords: ["value proposition", "calculate", "savings", "benefit", "comparison"], weight: 20 },
      { skill: "Compliance", keywords: ["subject to", "terms apply", "current rates", "may vary"], weight: 10 },
      { skill: "Communication Clarity", keywords: ["specifically", "for example", "that means", "in total", "annually"], weight: 10 },
    ],
    complianceRules: {
      hardBanned: ["I'll match any rate", "guaranteed returns", "we'll beat any offer", "I promise"],
      violationPenalty: 30,
      violationMessage: "COMPLIANCE BREACH: Unauthorized rate promises. Rate changes require treasury/management approval per bank policy.",
    },
  },
];
