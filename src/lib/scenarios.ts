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
  sales: "#2563EB",
  compliance: "#DC2626",
  "customer-service": "#3B82F6",
  fraud: "#D97706",
  operations: "#16A34A",
};

export const DIFFICULTY_CONFIG = {
  easy: { label: "TRAINEE", color: "#16A34A", stars: 1 },
  medium: { label: "JUNIOR RM", color: "#D97706", stars: 2 },
  hard: { label: "SENIOR RM", color: "#DC2626", stars: 3 },
  expert: { label: "BRANCH MGR", color: "#7C3AED", stars: 4 },
};

export const SCENARIOS: Scenario[] = [
  // ══════════════════════════════════════════════════════════════
  // ── 1. BEAST MODE: Mutual Fund Advisory — The Skeptic's Fortress ──
  // ══════════════════════════════════════════════════════════════
  {
    id: "mutual-fund-advisory",
    title: "The Skeptic's Fortress — Mutual Fund Advisory",
    description: "Rajesh has ₹10L in FDs and is deeply hostile toward mutual funds after his friend lost 35% in the market. His wife is firmly against it. You have 5 minutes to earn his trust through cascading objections about risk, his friend's losses, commissions, and hidden charges — all while staying SEBI-compliant. Five intense rounds. One wrong word and he walks.",
    category: "sales",
    difficulty: "expert",
    xpReward: 200,
    tags: ["mutual-funds", "objection-handling", "risk-profiling", "trust-building", "SEBI-compliance", "commission-transparency", "behavioral-finance"],
    customer: {
      name: "Rajesh Sharma",
      age: 40,
      profession: "IT Manager",
      city: "Pune",
      avatar: "RS",
      personality: "Deeply skeptical and analytical. His friend lost money in markets so he distrusts financial advisors. His wife is firmly against mutual funds. Asks razor-sharp questions about commissions and hidden charges. Responds ONLY to data, honesty, and genuine empathy — never to sales pressure. Will walk out if he senses even a hint of manipulation.",
      goal: "Better returns than FD for daughter's college fund in 5 years, but cannot afford to lose principal",
      archetype: "SKEPTICAL_SAVER",
      moodInitial: 3,
      hotButtons: ["fees", "risk", "market crash", "commission", "hidden charges", "lock-in period", "guaranteed", "trust me"],
      aiPersonaPrompt: "You are Rajesh Sharma, a 40-year-old IT Manager from Pune. You have ₹10 lakh in FDs earning 6%. Your friend Suresh invested in mutual funds in early 2020, panicked during the COVID crash, and lost 35% of his investment. Your wife Anita is firmly against mutual funds — she says 'FD is safe, why gamble?' You are here ONLY because your branch manager personally requested this meeting. You are giving the RM exactly 5 minutes.\n\nYour daughter Riya starts college in 5 years — this money is for her education. You CANNOT afford to lose it.\n\nBehavior rules:\n- Start cold and guarded. Arms crossed metaphorically.\n- Do NOT volunteer information easily. Make the RM work for every detail.\n- If the RM mentions 'guaranteed returns' or sounds salesy, shut down immediately.\n- Warm up ONLY when you feel genuinely heard and see honest, data-backed responses.\n- When asked about your friend, get emotional — this is personal.\n- Test the RM by asking about commissions — you've read articles about banks pushing MFs for commission.\n- If the RM is transparent about fees, you'll respect that.\n- In the final exchange, you're willing to try with ₹2L (not full 10L) if convinced.\n- Keep responses 1-3 sentences. Be direct, sometimes curt.",
    },
    openingStatement: "Look, I'll be direct. I have ₹10 lakhs rotting in FDs at 6%. Everyone says mutual funds. But my friend Suresh invested ₹8 lakhs in 2020 and lost 35% in three months. My wife says I'd be a fool to move our daughter's college fund into the market. Your branch manager insisted I meet you. So — you have five minutes.",
    steps: [
      // ── Round 1: The Wall ──
      { speaker: "customer", text: "Look, I'll be direct. I have ₹10 lakhs rotting in FDs at 6%. Everyone says mutual funds. But my friend Suresh invested ₹8 lakhs in 2020 and lost 35% in three months. My wife says I'd be a fool to move our daughter's college fund into the market. Your branch manager insisted I meet you. So — you have five minutes." },
      { speaker: "system", text: "OBJECTIVE: Break through the wall. Do NOT pitch any product. Acknowledge his friend's loss (it's personal), respect his wife's concern, and ask about his daughter's college timeline. Show you're here to understand, not sell.",
        expectedAction: "Empathize with friend's loss, acknowledge wife's valid concern, ask about daughter's education timeline and goals",
        hints: ["Lead with empathy about Suresh's loss — it's personal to him", "Don't dismiss his wife's viewpoint — say she has a valid point", "Ask about Riya's college timeline (5 years)", "Show curiosity, not salesmanship"],
        idealKeywords: ["sorry to hear about Suresh", "your wife has a point", "daughter", "college", "when does she", "how much", "timeline", "5 years", "understand your concern"],
        bannedPhrases: ["guaranteed", "definitely will grow", "no risk at all", "trust me", "don't worry", "FD is bad"],
        scoring: { "Needs Discovery": 15, "Empathy": 15, "Communication Clarity": 10 },
      },

      // ── Round 2: The Guarantee Trap ──
      { speaker: "customer", text: "Riya starts college in 5 years. We need at least ₹12-15 lakhs by then — tuition is insane now. But here's my question: can you GUARANTEE I won't lose my principal? Because if I lose even 20%, that's my daughter's future gone." },
      { speaker: "system", text: "OBJECTIVE: Handle the guarantee question with ABSOLUTE compliance. You CANNOT guarantee returns on mutual funds — this is a SEBI violation. Explain risk-return tradeoff honestly. Connect to his 5-year horizon to show how time reduces risk. Introduce balanced advantage / hybrid funds with downside protection.",
        expectedAction: "Clearly state you cannot guarantee returns (SEBI compliance), explain 5-year horizon reduces risk statistically, introduce balanced/hybrid funds",
        hints: ["Be honest: 'I cannot guarantee returns — and anyone who does is misleading you'", "5-year horizon data: balanced funds have rarely lost money over 5+ years historically", "Mention SIP for rupee cost averaging", "Connect to his ₹12-15L goal mathematically"],
        idealKeywords: ["cannot guarantee", "honest with you", "no one can guarantee", "5-year horizon", "historically", "balanced advantage", "hybrid", "SIP", "rupee cost averaging", "subject to market risk"],
        bannedPhrases: ["guaranteed returns", "100% safe", "no risk", "definitely will", "can't lose", "assured", "I promise", "trust me"],
        scoring: { "Compliance Language": 20, "Empathy": 10, "Product Knowledge": 10 },
      },

      // ── Round 3: The Friend's Story — Emotional Core ──
      { speaker: "customer", text: "That's exactly what they told Suresh! 'Long term, SIP, balanced fund.' He did everything right and still lost ₹2.8 lakhs. When he went back to complain, they just said 'market risk, sir.' Tell me — how is what you're offering any different?" },
      { speaker: "system", text: "OBJECTIVE: This is the emotional turning point. Rajesh's friend's story is his biggest barrier. Address it specifically — explain what likely happened (panic selling during COVID crash). Show empathy for Suresh WITHOUT blaming him. Differentiate your approach with discipline and preparation.",
        expectedAction: "Acknowledge Suresh's pain, explain that panic-selling locks in losses, show what happened if he stayed invested through 2020, differentiate your approach",
        hints: ["Markets crashed 35% in March 2020 but recovered fully by Dec 2020", "If Suresh had stayed invested, he'd likely have positive returns by end of 2021", "The issue was behavioral, not the product", "SIP discipline prevents panic-selling", "Don't blame Suresh — his advisor should have prepared him for volatility"],
        idealKeywords: ["Suresh's experience was real", "panic selling", "stayed invested", "recovered", "2020 crash", "behavioral", "discipline", "SIP", "advisor should have", "prepare you differently", "volatility"],
        bannedPhrases: ["his fault", "he was stupid", "shouldn't have sold", "market always recovers", "don't worry about crashes"],
        scoring: { "Objection Handling": 20, "Empathy": 15, "Product Knowledge": 10 },
      },

      // ── Round 4: The Commission Interrogation ──
      { speaker: "customer", text: "Okay, fair point about Suresh. But let me ask you something directly — how much commission does the bank make on this? I've read that banks push mutual funds because they earn 1-2% commission. Are you recommending this because it's good for ME or good for your targets?" },
      { speaker: "system", text: "OBJECTIVE: This is the ultimate trust test. Be COMPLETELY transparent about fees and commissions. Explain direct vs regular plans, expense ratios, trail commissions. If you're honest here, Rajesh will respect you. If you dodge or lie, he walks out.",
        expectedAction: "Be fully transparent: yes banks earn trail commission (~0.5-1%), explain direct vs regular plans, offer to help with direct plan if he prefers, explain total expense ratio",
        hints: ["Be honest: 'Yes, the bank earns a trail commission — I won't hide that'", "Explain direct plans (lower expense ratio, no distributor commission)", "Offer to help him with either path — shows you're on his side", "SEBI has mandated commission disclosure", "Compare: direct ~0.5-1% vs regular ~1.5-2% expense ratio"],
        idealKeywords: ["trail commission", "transparent", "direct plan", "regular plan", "expense ratio", "SEBI disclosure", "your choice", "honest", "commission"],
        bannedPhrases: ["no commission", "we don't earn anything", "it's free", "don't worry about fees", "that's not relevant"],
        scoring: { "Communication Clarity": 15, "Compliance Language": 15, "Empathy": 10 },
      },

      // ── Round 5: The Conditional Yes ──
      { speaker: "customer", text: "I appreciate the honesty about commissions — most people dodge that question. My wife still won't agree to the full ₹10 lakhs. But I'm willing to try with ₹2 lakhs first to see how it works. What exactly should I do, and what happens if markets crash next month? Can I pull my money out?" },
      { speaker: "system", text: "OBJECTIVE: Close responsibly. He's giving you ₹2L on trust — don't oversell it. Set up a practical plan: SIP vs lump sum, explain exit load, redemption process. Set realistic 5-year expectations. Leave the door open for the remaining ₹8L once trust is built. Help him explain the plan to his wife.",
        expectedAction: "Suggest SIP of ~₹33K/month over 6 months to spread the ₹2L. Explain exit load (1% within 1 year, zero after). Set return expectations (8-12% historically for balanced funds over 5 years). Don't pressure about remaining ₹8L.",
        hints: ["SIP of ₹33,000/month spreads the ₹2L over 6 months", "Exit load: typically 1% if withdrawn within 1 year, zero after", "Redemption takes T+2 working days — money isn't locked forever", "Don't push for the ₹8L — let the ₹2L build trust", "Offer to help him explain the plan to Anita with data"],
        idealKeywords: ["SIP", "systematic", "exit load", "1 year", "redemption", "T+2", "no pressure", "start small", "your comfort", "review together", "wife", "Anita"],
        bannedPhrases: ["you should put all 10 lakhs", "markets won't crash", "guaranteed 12%", "don't worry", "best time to invest is now"],
        scoring: { "Product Suitability": 15, "Communication Clarity": 15, "Compliance Language": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Needs Discovery", keywords: ["daughter", "college", "timeline", "5 years", "how much", "risk appetite", "financial goal", "Riya", "education"], weight: 15 },
      { skill: "Empathy", keywords: ["understand", "valid concern", "sorry to hear", "your wife has a point", "Suresh", "appreciate", "genuine", "hear you", "personal"], weight: 15 },
      { skill: "Objection Handling", keywords: ["panic selling", "stayed invested", "recovered", "behavioral", "SIP discipline", "different approach", "prepare", "volatility"], weight: 15 },
      { skill: "Product Knowledge", keywords: ["SIP", "balanced advantage", "hybrid", "expense ratio", "direct plan", "NAV", "exit load", "rupee cost averaging", "T+2"], weight: 20 },
      { skill: "Compliance Language", keywords: ["cannot guarantee", "subject to market risk", "SEBI", "past performance", "no guarantee", "commission disclosure", "trail commission", "market-linked"], weight: 20 },
      { skill: "Communication Clarity", keywords: ["transparent", "honestly", "let me explain", "for example", "specifically", "in your case", "data shows", "your choice"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["guaranteed returns", "100% safe", "no risk", "definitely will", "can't lose", "assured returns", "trust me", "no commission", "markets won't fall", "I promise", "FD is bad"],
      violationPenalty: 50,
      violationMessage: "CRITICAL COMPLIANCE BREACH: Language implies guaranteed returns or misleading fee disclosure on a market-linked product. Violates SEBI mis-selling guidelines (Circular SEBI/HO/IMD/2019) and AMFI Code of Conduct.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── 2. BEAST MODE: Insurance Cross-Sell — The Reluctant Young Family ──
  // ══════════════════════════════════════════════════════════════
  {
    id: "insurance-cross-sell",
    title: "The Reluctant Young Family — Insurance Cross-Sell",
    description: "Meera has a 2-year-old son and her husband works at a startup with ZERO group insurance. She thinks insurance is a waste because 'nothing happens to young people.' Navigate her time crunch, budget wall, claim rejection fears, and the husband-needs-to-decide objection — all in five intense rounds without using fear tactics.",
    category: "sales",
    difficulty: "hard",
    xpReward: 180,
    tags: ["insurance", "cross-sell", "needs-analysis", "term-insurance", "claim-handling", "budget-objection", "ethical-selling"],
    customer: {
      name: "Meera Iyer",
      age: 32,
      profession: "Marketing Manager",
      city: "Bangalore",
      avatar: "MI",
      personality: "Friendly but perpetually rushed. Deeply budget-conscious — tracks every rupee. Loves her family fiercely but avoids thinking about worst-case scenarios. Gets emotional when her child's future is mentioned gently. Has heard horror stories about claim rejections from colleagues. Responds to specific numbers and relatable examples, NOT to fear tactics or guilt-tripping.",
      goal: "Understand if insurance is worth the cost, but doesn't want expensive plans pushed on her",
      archetype: "BUSY_PROFESSIONAL",
      moodInitial: 5,
      hotButtons: ["premium cost", "claim rejection", "hidden charges", "what if you die", "scare tactics", "EMI burden", "ULIP"],
      aiPersonaPrompt: "You are Meera Iyer, 32, marketing manager at a tech company in Bangalore. You just opened a savings account at this branch. You have a 2-year-old son Arjun and your husband Karthik works at an early-stage startup — NO group health or life insurance there. Combined household income ₹1.6L/month.\n\nCurrent fixed expenses: ₹25,000 flat EMI, ₹8,000 daycare, ₹5,000 car EMI = ₹38,000/month already committed. You feel financially stretched.\n\nYou think insurance is a waste because:\n1. 'We're young and healthy — nothing will happen'\n2. 'My parents never had insurance and they're fine'\n3. You've heard claim rejection horror stories from your colleague Priya\n\nBehavior rules:\n- You're friendly but visibly in a hurry — you need to pick up Arjun from daycare by 5 PM.\n- If the RM uses fear tactics like 'what if you die' or 'accident can happen anytime', get offended and shut down immediately. Say 'That's a terrible thing to say.'\n- If the RM mentions Arjun's future gently and with genuine care, you'll get quiet and actually listen.\n- You're curious about term insurance IF the premium numbers are surprisingly low.\n- If someone suggests ULIP, be skeptical — your colleague said ULIPs are 'neither good insurance nor good investment.'\n- In the final round, you want to discuss with Karthik before deciding. Ask for something concrete to show him.\n- Keep responses 1-3 sentences. Be warm but time-pressed and budget-focused.",
    },
    openingStatement: "I just finished the savings account paperwork — took longer than I expected! Is there anything else? I need to pick up my son Arjun from daycare by 5, so I really can't stay long.",
    steps: [
      // ── Round 1: The Rush ──
      { speaker: "customer", text: "I just finished the savings account paperwork — took longer than I expected! Is there anything else? I need to pick up my son Arjun from daycare by 5, so I really can't stay long." },
      { speaker: "system", text: "OBJECTIVE: Start a NATURAL conversation. Do NOT pitch insurance — she'll bolt. She mentioned her son — use that as a warm bridge to ask about her family and financial situation. Be respectful of her time crunch.",
        expectedAction: "Be conversational — warmly acknowledge her son, ask about family situation naturally, show respect for her time",
        hints: ["She mentioned Arjun — acknowledge that warmly", "Ask about family setup naturally (husband, dependents)", "Don't say 'insurance' yet — say 'financial coverage' or 'protection planning'", "Be quick — respect her time pressure"],
        idealKeywords: ["Arjun", "family", "quick question", "financial plan", "covered", "dependents", "husband", "just a minute", "won't take long"],
        bannedPhrases: ["you must buy insurance", "required to", "everyone needs insurance", "do you have life insurance", "let me explain our insurance products"],
        scoring: { "Needs Discovery": 15, "Empathy": 15, "Communication Clarity": 10 },
      },

      // ── Round 2: The Dismissal ──
      { speaker: "customer", text: "Arjun is 2 — absolute handful! My husband Karthik works at a startup. Actually now that you mention it, they don't have any group insurance at all. But honestly, we're both 32 — young, healthy, hit the gym regularly. Insurance feels like paying for something that won't happen. My parents never had it and they're perfectly fine at 60." },
      { speaker: "system", text: "OBJECTIVE: Address the 'won't happen to us' mindset WITHOUT fear-mongering. The critical detail: startup with ZERO group insurance = completely unprotected family. Frame insurance as income protection, NOT death planning. Use relatable analogy. Her parents' era had joint families and lower costs — different world.",
        expectedAction: "Frame as income protection not death planning. The startup detail means zero safety net. Use income-replacement math. Gently note parents' generation was different.",
        hints: ["Frame it as: 'What if Karthik needs to take a 6-month health break — who covers the EMIs?'", "NEVER say 'what if you die' — she'll shut down immediately", "Income replacement math: ₹1.6L/month × 12 = ₹19.2L/year income at risk", "Her parents had joint families, lower medical costs, no EMIs — different era", "The startup with zero coverage is the key vulnerability"],
        idealKeywords: ["income protection", "safety net", "Arjun", "startup", "no coverage", "income replacement", "financial independence", "peace of mind", "health break", "EMIs covered"],
        bannedPhrases: ["what if you die", "accident can happen anytime", "you'll regret", "irresponsible", "you need to", "death benefit", "god forbid"],
        scoring: { "Empathy": 15, "Objection Handling": 15, "Needs Discovery": 10 },
      },

      // ── Round 3: The Budget Wall ──
      { speaker: "customer", text: "OK I get the point about Karthik's startup having no coverage... that's actually concerning. But here are our real numbers: ₹25,000 flat EMI, ₹8,000 daycare, ₹5,000 car loan — that's ₹38,000 in fixed costs alone. Where exactly do I find money for insurance premiums? Show me the math." },
      { speaker: "system", text: "OBJECTIVE: She's opened the door — she admitted the startup coverage gap is concerning. Now show her AFFORDABLE options with specific numbers. Term insurance for a 32-year-old is shockingly cheap. Calculate exact numbers for HER budget. Do NOT suggest expensive endowment or ULIP plans.",
        expectedAction: "Calculate: Term insurance for 32-year-old female, ₹1 crore cover ≈ ₹600-800/month. That's ₹20-25/day — less than a coffee. Pure protection, not investment.",
        hints: ["Term insurance ₹1Cr cover at age 32 ≈ ₹700/month (~₹8,400/year)", "That's about ₹23/day — literally less than a Starbucks coffee", "Pure term plan = maximum coverage at minimum cost", "She can start with one policy for herself and add Karthik's later", "Don't suggest endowment or ULIP — pure protection first"],
        idealKeywords: ["term insurance", "₹700", "₹800", "per month", "₹1 crore cover", "per day", "affordable", "pure protection", "budget-friendly", "coffee"],
        bannedPhrases: ["money back guarantee", "returns on insurance", "investment cum insurance", "ULIP", "endowment", "you can't afford NOT to"],
        scoring: { "Product Knowledge": 15, "Product Suitability": 15, "Communication Clarity": 10 },
      },

      // ── Round 4: The Claim Rejection Fear ──
      { speaker: "customer", text: "₹700 a month is actually doable — I was expecting ₹5,000+! But here's what really scares me. My colleague Priya's mother had health insurance for 8 years. When she got diagnosed with a thyroid condition, they rejected the claim saying it was 'pre-existing.' Eight years of premiums wasted. How do I know you won't do the same to us?" },
      { speaker: "system", text: "OBJECTIVE: This is her deepest fear — not cost, but being cheated. Address the claim rejection concern HONESTLY. Explain why claims get rejected (non-disclosure), how to protect herself (full disclosure at application), and give her real data (claim settlement ratios). Don't make blanket promises.",
        expectedAction: "Explain: most rejections happen due to non-disclosure at application time. Always declare everything honestly. Mention claim settlement ratios (97-99% for top insurers). Mention 15-day cooling-off period and IRDAI protections.",
        hints: ["Claim rejections mostly happen due to non-disclosure of pre-existing conditions at application", "Priya's mother case: the issue was likely undisclosed pre-existing condition", "Always disclose EVERYTHING in the application — even minor issues", "Top insurers have 97-99% claim settlement ratios — share the data", "15-day free-look/cooling-off period — can cancel if unhappy", "IRDAI regulations protect policyholders", "NEVER promise '100% claim settlement' — that's misleading"],
        idealKeywords: ["disclosure", "honestly declare", "pre-existing", "claim settlement ratio", "97%", "IRDAI", "cooling-off period", "15 days", "protect yourself", "full disclosure", "application form"],
        bannedPhrases: ["no claim rejection ever", "100% claim settlement", "guaranteed claim", "we never reject", "impossible to reject", "don't worry about claims"],
        scoring: { "Compliance Language": 15, "Empathy": 10, "Product Knowledge": 15 },
      },

      // ── Round 5: The Husband Decision ──
      { speaker: "customer", text: "This actually makes a lot of sense — especially the numbers and the claim settlement data. But I need to talk to Karthik before committing to anything — he's the more cautious one between us. Can you give me something concrete to show him? Like the exact plan, premium, and what's covered? He'll want details." },
      { speaker: "system", text: "OBJECTIVE: Don't pressure for same-day decision — that destroys trust. Empower her to convince Karthik. Provide a clear, simple summary she can relay: plan type, coverage, exact premium, key benefits and exclusions. Offer to schedule a brief call with both of them.",
        expectedAction: "Give a crisp summary: Term plan, ₹1Cr cover, ~₹700/month, covers death + optional critical illness rider. Offer to email a comparison sheet. Suggest a 15-min call with both. Mention cooling-off period for Karthik's comfort.",
        hints: ["Give her a clear 3-line summary she can text Karthik", "Offer to email a personalized comparison of 2-3 insurers", "Suggest a brief call with both of them this week", "Mention the 15-day cooling-off period — they can cancel risk-free if they change their mind", "Don't pressure — the goal is trust, not closure today", "She's already doing the selling for you by taking it to Karthik"],
        idealKeywords: ["summary", "₹1 crore", "₹700 per month", "term plan", "email", "comparison", "call with both", "no pressure", "cooling-off period", "take your time", "Karthik", "this week"],
        bannedPhrases: ["you need to decide now", "offer expires", "limited time", "premium will increase if you wait", "don't delay", "sign today"],
        scoring: { "Communication Clarity": 15, "Empathy": 15, "Product Suitability": 10 },
      },
    ],
    evaluationRules: [
      { skill: "Needs Discovery", keywords: ["family", "son", "Arjun", "husband", "Karthik", "startup", "no coverage", "dependents", "income", "expenses", "EMI"], weight: 15 },
      { skill: "Empathy", keywords: ["understand", "appreciate", "makes sense", "your time", "Arjun", "peace of mind", "no pressure", "take your time", "respect"], weight: 15 },
      { skill: "Objection Handling", keywords: ["income protection", "safety net", "affordable", "per day", "claim settlement ratio", "disclosure", "coffee", "budget"], weight: 20 },
      { skill: "Product Knowledge", keywords: ["term insurance", "premium", "₹1 crore cover", "claim settlement", "IRDAI", "cooling-off", "critical illness", "rider", "pure protection"], weight: 20 },
      { skill: "Compliance Language", keywords: ["terms and conditions", "exclusions", "disclosure", "pre-existing", "cooling-off period", "IRDAI", "subject to", "claim process"], weight: 15 },
      { skill: "Communication Clarity", keywords: ["for example", "specifically", "in your case", "the numbers", "to summarize", "let me explain", "your budget"], weight: 15 },
    ],
    complianceRules: {
      hardBanned: ["guaranteed returns on insurance", "money back guarantee", "no claim rejection ever", "100% claim settlement", "you need to decide now", "what if you die", "accident can happen anytime", "you'll regret this"],
      violationPenalty: 40,
      violationMessage: "COMPLIANCE BREACH: Misleading insurance claims or fear-based selling tactics. Violates IRDAI (Protection of Policyholders' Interests) Regulations and IRDAI guidelines on ethical sales practices.",
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
