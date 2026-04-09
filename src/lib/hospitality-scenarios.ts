import type { Scenario } from "./scenarios";

// ══════════════════════════════════════════════════════════════════════
//  ACCOR HOSPITALITY SCENARIOS
//  Grounded in: Accor brand portfolio (ibis → Novotel → Sofitel → Raffles),
//  ALL — Accor Live Limitless loyalty tiers (Classic/Silver/Gold/Platinum/Diamond),
//  and the Heartist® service ethos (genuine care for guests & community).
// ══════════════════════════════════════════════════════════════════════

export const HOSPITALITY_SCENARIOS: Scenario[] = [
  // ══════════════════════════════════════════════════════════════
  // 1. ibis (Economy) — Overbooking Walk
  // ══════════════════════════════════════════════════════════════
  {
    id: "ibis-overbooking-walk",
    title: "The Midnight Walk — ibis Overbooking",
    description:
      "It's 11:40 PM at ibis Mumbai Airport. The hotel is oversold by two rooms and a tired business traveller with a confirmed booking has just arrived. You must 'walk' him to a partner hotel without losing his trust — or his future bookings. Apply Accor's Heartist service recovery: own it, fix it, compensate it.",
    category: "hospitality",
    difficulty: "easy",
    xpReward: 90,
    tags: [
      "hospitality",
      "accor",
      "ibis",
      "overbooking",
      "service-recovery",
      "front-desk",
      "heartist",
    ],
    customer: {
      name: "Anil Verma",
      age: 44,
      profession: "Regional Sales Head",
      city: "Delhi",
      avatar: "AV",
      personality:
        "Exhausted after a delayed flight. Normally polite but short on patience tonight. Has a 7 AM client meeting nearby and chose ibis specifically because it is 5 minutes from the airport. ALL Silver member, books ibis 2-3 times a month. Will tolerate a problem if he is treated with respect — will escalate hard if he feels brushed off.",
      goal: "Get to a clean bed within 20 minutes without missing his 7 AM meeting tomorrow",
      archetype: "TIRED_BUSINESS_TRAVELLER",
      moodInitial: 4,
      hotButtons: [
        "no room available",
        "not my problem",
        "policy says",
        "you'll have to wait",
        "we can't do anything",
      ],
      aiPersonaPrompt:
        "You are Anil Verma, a 44-year-old regional sales head from Delhi. You have an ALL Silver membership and stay at ibis 2-3 times a month. Tonight your flight from Delhi was delayed 4 hours, you landed at 11:15 PM, and you have a confirmed booking at ibis Mumbai Airport. You have a 7 AM client meeting near the airport tomorrow.\n\nYou walk up to the front desk at 11:40 PM with your confirmation email open on your phone. You're tired and just want a bed.\n\nBehaviour rules:\n- Start polite but visibly exhausted.\n- If the agent says 'we are sold out' WITHOUT immediately offering a solution, get frustrated: 'I have a confirmation. What do you mean sold out?'\n- If the agent owns the problem and offers a concrete walk to a nearby Accor property + transport + compensation, you calm down.\n- You care about: distance (must be near airport), transport (you don't want to pay for a cab), and tomorrow's check-in (you need a bed by 7 AM tomorrow if you want to shower before the meeting).\n- If the agent offers ALL points compensation and a comp night for your next stay, you'll accept the walk.\n- If the agent is dismissive or hides behind policy, threaten to post on TripAdvisor and escalate to the GM.\n- Keep responses 1-3 sentences. Sound tired.",
    },
    openingStatement:
      "Hi, checking in — Anil Verma, booking reference HBJ4421. Flight was delayed four hours, I just want to crash. Please tell me you have my room ready.",
    steps: [
      {
        speaker: "customer",
        text: "Hi, checking in — Anil Verma, booking reference HBJ4421. Flight was delayed four hours, I just want to crash. Please tell me you have my room ready.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Acknowledge him by name, recognise his ALL Silver status, and OWN the bad news clearly — do not hide behind 'the system' or 'policy'. Apologise sincerely and immediately signal that you have a plan, not just a problem.",
        expectedAction:
          "Greet him by name, thank him for being an ALL Silver member, take ownership of the overbooking, apologise without excuses, and signal a concrete plan is coming.",
        hints: [
          "Use his name and acknowledge his ALL Silver tier",
          "Own the problem: 'This is on us, not on you'",
          "Do NOT say 'the system overbooked' — that sounds like deflection",
          "Signal a plan within the first 30 seconds so he knows he's being taken care of",
        ],
        idealKeywords: [
          "Mr Verma",
          "ALL Silver",
          "I'm so sorry",
          "this is on us",
          "I have a plan",
          "let me take care of this",
          "thank you for your loyalty",
        ],
        bannedPhrases: [
          "the system",
          "not my fault",
          "policy says",
          "nothing I can do",
          "you'll have to wait",
        ],
        scoring: { Empathy: 15, "Service Recovery": 15, "Communication Clarity": 10 },
      },

      {
        speaker: "customer",
        text: "Walked? What do you mean walked? I have a confirmation. I'm exhausted and I have a 7 AM meeting. I am NOT going on some adventure across Mumbai right now.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Reassure him this is a SHORT, fully-managed walk to a sister Accor property nearby (Novotel Mumbai Airport — 4 minutes away). Confirm a hotel-paid cab waits at the entrance, the room is already blocked in his name, and check-in is pre-cleared. Make it sound effortless.",
        expectedAction:
          "Walk him to Novotel Mumbai Airport (a sister Accor property), confirm a pre-paid cab is at the door, room is pre-blocked, check-in is pre-cleared so he just hands over his ID. Frame it as effortless.",
        hints: [
          "Specify the sister property by name (Novotel Mumbai Airport)",
          "Mention it is a category UP from ibis — he is being upgraded, not downgraded",
          "Pre-paid cab at the door — he doesn't touch his wallet",
          "Room is pre-blocked and check-in pre-cleared — he just shows ID",
          "Total time: under 15 minutes door to door",
        ],
        idealKeywords: [
          "Novotel",
          "4 minutes away",
          "upgraded",
          "cab is waiting",
          "pre-paid",
          "room is already blocked",
          "pre-cleared",
          "show your ID",
          "15 minutes",
        ],
        bannedPhrases: [
          "you'll have to find",
          "book your own cab",
          "we'll reimburse later",
          "not sure which property",
          "should be available",
        ],
        scoring: { "Service Recovery": 20, "Product Knowledge": 10, Empathy: 10 },
      },

      {
        speaker: "customer",
        text: "Fine — but what about tomorrow morning? My meeting is HERE at this airport area. And honestly, what do I get out of this besides being shoved into a cab at midnight?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Offer concrete, ALL-aligned compensation: (1) the upgraded Novotel night fully comped (he pays nothing for tonight), (2) a meaningful ALL points credit (e.g. 4,000 Reward points), (3) a complimentary night voucher at this ibis for a future stay, and (4) confirm a cab back to the meeting area in the morning. Be specific about every line item — vague promises destroy trust.",
        expectedAction:
          "Offer: tonight fully comped at Novotel, 4,000 ALL Reward points credited within 48 hours, one comp night voucher at this ibis for a future stay, and a hotel-arranged cab back tomorrow morning. Be specific and confirm in writing via email.",
        hints: [
          "Tonight is FREE — he is not paying for the Novotel walk",
          "Credit ALL Reward points (4,000+) within 48 hours — name the number",
          "Offer one complimentary night voucher at this ibis, valid 12 months",
          "Arrange a hotel-paid cab back tomorrow morning to wherever his meeting is",
          "Email written confirmation of every line item before he leaves the lobby",
        ],
        idealKeywords: [
          "fully complimentary",
          "you pay nothing",
          "4,000",
          "Reward points",
          "ALL",
          "comp night voucher",
          "valid 12 months",
          "cab tomorrow morning",
          "email confirmation",
          "in writing",
        ],
        bannedPhrases: [
          "we'll figure it out",
          "some points",
          "discount on next stay",
          "speak to the manager later",
          "no compensation policy",
        ],
        scoring: {
          "Service Recovery": 20,
          "Loyalty Knowledge": 10,
          "Communication Clarity": 10,
        },
      },

      {
        speaker: "customer",
        text: "Okay. That actually sounds fair. One more thing — am I going to have to explain all of this again at the Novotel desk? Because if I have to repeat this whole story I'm going to lose it.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Reassure him you have already personally called the Novotel duty manager, briefed them by name, and they are expecting him. Offer to walk him to the cab personally. This is the Heartist ethos — genuine care, not transactional handover.",
        expectedAction:
          "Confirm you have already called the Novotel duty manager by name, briefed them on the situation, they are expecting Mr Verma at the door, and you will personally walk him to the cab. Heartist ethos in action.",
        hints: [
          "Already called the Novotel duty manager — name them if possible",
          "They are expecting him at the door, no re-explaining",
          "Walk him to the cab personally — don't just point",
          "Give him your direct extension if anything goes wrong tonight",
        ],
        idealKeywords: [
          "already called",
          "duty manager",
          "expecting you",
          "walk you to the cab",
          "my direct line",
          "anything goes wrong",
          "personally",
        ],
        bannedPhrases: [
          "they should know",
          "just tell them",
          "I'm sure it's fine",
          "ask at the desk",
        ],
        scoring: { Empathy: 15, "Service Recovery": 10, "Communication Clarity": 5 },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "I'm so sorry",
          "Mr Verma",
          "exhausted",
          "understand",
          "thank you for your patience",
          "this is on us",
          "I hear you",
        ],
        weight: 20,
      },
      {
        skill: "Service Recovery",
        keywords: [
          "walk",
          "Novotel",
          "cab waiting",
          "pre-paid",
          "pre-blocked",
          "comp",
          "complimentary",
          "voucher",
          "compensation",
          "in writing",
        ],
        weight: 30,
      },
      {
        skill: "Loyalty Knowledge",
        keywords: [
          "ALL",
          "Silver",
          "Reward points",
          "4000",
          "tier",
          "loyalty",
          "Accor Live Limitless",
        ],
        weight: 15,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "sister property",
          "Accor",
          "Novotel Mumbai Airport",
          "category up",
          "upgrade",
          "duty manager",
        ],
        weight: 15,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "specifically",
          "let me confirm",
          "in writing",
          "to summarise",
          "the plan is",
          "step by step",
        ],
        weight: 20,
      },
    ],
    complianceRules: {
      hardBanned: [
        "not my problem",
        "system error",
        "policy says no",
        "nothing I can do",
        "you'll have to find",
        "book your own",
      ],
      violationPenalty: 30,
      violationMessage:
        "SERVICE RECOVERY BREACH: Deflecting blame or refusing to own an overbooking violates Accor's Heartist service standard and ALL guest commitment.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // 2. Novotel (Midscale) — ALL Gold Member Upgrade Dispute
  // ══════════════════════════════════════════════════════════════
  {
    id: "novotel-all-gold-upgrade",
    title: "The Gold Member's Expectation — Novotel Upgrade Dispute",
    description:
      "An ALL Gold member at Novotel Bengaluru Tech Park is angry that her promised complimentary upgrade did not happen at check-in. She feels her loyalty is being ignored. Navigate ALL benefit rules honestly, recover the relationship, and avoid making promises the inventory cannot keep.",
    category: "hospitality",
    difficulty: "medium",
    xpReward: 130,
    tags: [
      "hospitality",
      "accor",
      "novotel",
      "loyalty",
      "ALL",
      "upgrade",
      "guest-recovery",
    ],
    customer: {
      name: "Priya Krishnan",
      age: 36,
      profession: "Enterprise Sales Director",
      city: "Bengaluru",
      avatar: "PK",
      personality:
        "Sharp, articulate, and used to being treated well. Stays at Novotel and Pullman properties 30+ nights a year. Knows the ALL benefit grid inside out — she has read the terms. Will not accept hand-waving. Responds well to honesty, accuracy, and a real recovery — responds badly to vague apologies and corporate-speak.",
      goal: "Get the upgrade she believes she is entitled to, OR an honest explanation and meaningful recovery",
      archetype: "INFORMED_LOYALIST",
      moodInitial: 3,
      hotButtons: [
        "subject to availability",
        "we tried our best",
        "policy",
        "next time",
        "I understand your frustration",
      ],
      aiPersonaPrompt:
        "You are Priya Krishnan, a 36-year-old enterprise sales director from Bengaluru. You are an ALL Gold member with 35 nights this year across Novotel and Pullman. You know the ALL benefit grid by heart: Gold members get a complimentary room upgrade subject to availability at check-in, Welcome drink, 50% bonus Reward points, late checkout to 2 PM.\n\nYou checked in 20 minutes ago, were given a standard king room despite the hotel website still showing executive rooms available when you booked yesterday. You came back down to the desk.\n\nBehaviour rules:\n- Start firm and informed: 'I'm an ALL Gold member, my Welcome benefit includes a complimentary upgrade subject to availability, and your website was showing executive rooms available yesterday. Why was I not upgraded?'\n- If the agent uses vague phrases like 'I understand your frustration' without facts, get sharper.\n- If the agent checks the actual inventory live, explains honestly what is available NOW, and offers a real recovery (upgrade if any executive room is genuinely free, OR concrete compensation if not), you respect that.\n- You will accept a no IF it is honest and the recovery is meaningful. You will NOT accept a no that sounds like a script.\n- Keep responses 2-4 sentences. Be precise.",
    },
    openingStatement:
      "Hi, I just checked in 20 minutes ago — room 412. I'm an ALL Gold member and my Welcome benefit includes a complimentary room upgrade subject to availability. Your website was showing executive rooms available yesterday when I booked. Can you please explain why I was not upgraded?",
    steps: [
      {
        speaker: "customer",
        text: "Hi, I just checked in 20 minutes ago — room 412. I'm an ALL Gold member and my Welcome benefit includes a complimentary room upgrade subject to availability. Your website was showing executive rooms available yesterday when I booked. Can you please explain why I was not upgraded?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Recognise her ALL Gold status by name, do not push back, and IMMEDIATELY pull up live inventory in front of her. Be transparent about what the system shows right now. Do not promise anything until you have checked.",
        expectedAction:
          "Greet her by name, acknowledge her ALL Gold status and Welcome benefit, apologise for the miss at check-in, and pull up live inventory transparently in front of her before making any promise.",
        hints: [
          "Use her name and acknowledge ALL Gold status explicitly",
          "Do NOT push back on her facts — she has read the benefit grid",
          "Pull up live inventory in front of her — transparency builds trust",
          "Don't promise an upgrade until you have actually confirmed availability",
        ],
        idealKeywords: [
          "Ms Krishnan",
          "ALL Gold",
          "Welcome benefit",
          "you're absolutely right",
          "let me pull up",
          "live inventory",
          "right now",
          "apologise",
        ],
        bannedPhrases: [
          "I understand your frustration",
          "subject to availability",
          "we tried",
          "policy",
          "you should have",
        ],
        scoring: { Empathy: 10, "Loyalty Knowledge": 15, "Communication Clarity": 10 },
      },

      {
        speaker: "customer",
        text: "Good. So what does the system actually show? Is there an executive room available tonight or not?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Be HONEST about what inventory shows. If an executive room is available, upgrade her on the spot for the full stay. If only available for tonight (not the rest of her stay), say so plainly and offer the partial upgrade plus a meaningful recovery for the remaining nights. Do NOT fudge inventory to make her happy now and create a bigger problem tomorrow.",
        expectedAction:
          "Honestly state what inventory shows. Offer a real upgrade if available, partial upgrade with concrete recovery if only partial, or honest no with meaningful recovery if none. Never fudge inventory to defer the problem.",
        hints: [
          "If executive is available all 3 nights — upgrade the whole stay",
          "If only available tonight — say so plainly, offer tonight's upgrade plus recovery for remaining nights",
          "If nothing available — honest no, then move straight to compensation",
          "Never fudge inventory — that creates a worse problem at tomorrow's check-in",
        ],
        idealKeywords: [
          "the system shows",
          "honestly",
          "available tonight",
          "all three nights",
          "I can upgrade you now",
          "the truth is",
          "I won't promise what I can't deliver",
        ],
        bannedPhrases: [
          "should be fine",
          "I think",
          "probably",
          "let me check later",
          "we'll see tomorrow",
        ],
        scoring: { "Honesty & Integrity": 20, "Product Knowledge": 10, Empathy: 5 },
      },

      {
        speaker: "customer",
        text: "Okay, suppose nothing is available — what then? Because being told 'sorry, no upgrade' after I've flown in for a 3-night stay as a Gold member is not acceptable.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Offer a concrete, value-meaningful recovery package: bonus ALL Reward points, complimentary breakfast in the Executive Lounge for the duration of her stay, complimentary room service amenity tonight, late checkout extended to 4 PM (beyond the standard 2 PM Gold benefit), and a personal note from the GM. Stack benefits — this is relationship recovery, not a token gesture.",
        expectedAction:
          "Stack a meaningful recovery: bonus ALL Reward points (e.g. 3,000), complimentary Executive Lounge breakfast for the full stay, complimentary in-room amenity tonight, late checkout extended to 4 PM, and a personal note from the GM. Frame as relationship recovery.",
        hints: [
          "Bonus ALL Reward points (3,000+) credited within 48 hours",
          "Complimentary Executive Lounge breakfast for all nights of her stay",
          "Complimentary in-room amenity tonight (wine, fruit, sweets)",
          "Late checkout extended to 4 PM (above the 2 PM Gold standard)",
          "Personal note + business card from the GM in her room",
          "Frame the package as relationship recovery, not a token",
        ],
        idealKeywords: [
          "3,000",
          "Reward points",
          "Executive Lounge",
          "breakfast",
          "complimentary",
          "amenity",
          "late checkout",
          "4 PM",
          "GM",
          "personal note",
        ],
        bannedPhrases: [
          "voucher for next time",
          "small discount",
          "drink at the bar",
          "we'll try",
          "as a gesture",
        ],
        scoring: {
          "Service Recovery": 20,
          "Loyalty Knowledge": 15,
          "Communication Clarity": 5,
        },
      },

      {
        speaker: "customer",
        text: "And how do I know this isn't going to happen again on my next stay? I'm here every month.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Acknowledge her as a key repeat guest, offer to create an internal guest preference profile (room type, floor, amenities, dietary), introduce her to the Front Office Manager by name, and offer a direct line for future bookings to pre-block her preferred room category. This is loyalty recovery — turn a complaint into deeper engagement.",
        expectedAction:
          "Create an internal guest profile capturing her preferences, introduce her to the Front Office Manager personally, and offer a direct line for future bookings so executive rooms can be pre-blocked. Turn the complaint into deeper loyalty.",
        hints: [
          "Create a guest preference profile in the PMS — room type, floor, dietary, amenities",
          "Introduce her in person to the Front Office Manager today",
          "Offer a direct line / email for future bookings — pre-block executive room",
          "Frame as: this conversation is the START of better service, not the end of a complaint",
        ],
        idealKeywords: [
          "guest profile",
          "preferences",
          "pre-block",
          "direct line",
          "Front Office Manager",
          "introduce you",
          "every month",
          "we value you",
        ],
        bannedPhrases: [
          "hopefully won't happen",
          "can't promise",
          "subject to availability",
          "depends on the season",
        ],
        scoring: { Empathy: 10, "Loyalty Knowledge": 10, "Communication Clarity": 5 },
      },
    ],
    evaluationRules: [
      {
        skill: "Loyalty Knowledge",
        keywords: [
          "ALL",
          "Gold",
          "Welcome benefit",
          "Executive Lounge",
          "Reward points",
          "tier",
          "Accor Live Limitless",
          "Front Office Manager",
        ],
        weight: 25,
      },
      {
        skill: "Honesty & Integrity",
        keywords: [
          "honestly",
          "the truth is",
          "I won't promise",
          "system shows",
          "live inventory",
          "transparent",
        ],
        weight: 20,
      },
      {
        skill: "Service Recovery",
        keywords: [
          "complimentary",
          "bonus points",
          "late checkout",
          "amenity",
          "GM",
          "personal note",
          "stack",
          "package",
        ],
        weight: 20,
      },
      {
        skill: "Empathy",
        keywords: [
          "Ms Krishnan",
          "you're absolutely right",
          "apologise",
          "I value you",
          "we value you",
          "every month",
        ],
        weight: 15,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "specifically",
          "to summarise",
          "the plan is",
          "let me confirm",
          "step by step",
          "in writing",
        ],
        weight: 20,
      },
    ],
    complianceRules: {
      hardBanned: [
        "policy says",
        "subject to availability",
        "I understand your frustration",
        "we tried",
        "next time",
        "nothing I can do",
      ],
      violationPenalty: 30,
      violationMessage:
        "LOYALTY MISHANDLING: Vague corporate phrases or hiding behind 'availability' without checking violates Accor's ALL guest commitment and the Heartist standard for repeat guests.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // 3. Sofitel (Luxury) — Service Failure Recovery
  // ══════════════════════════════════════════════════════════════
  {
    id: "sofitel-honeymoon-recovery",
    title: "The Spoiled Honeymoon — Sofitel Service Recovery",
    description:
      "A French honeymoon couple's celebratory dinner at Sofitel Mumbai BKC was ruined: a 90-minute kitchen delay, the wrong main course, and a missed anniversary cake. The husband is at the front desk before midnight, polite but devastated. Apply the Heartist ethos and full luxury service recovery — anything less will end the relationship.",
    category: "hospitality",
    difficulty: "hard",
    xpReward: 180,
    tags: [
      "hospitality",
      "accor",
      "sofitel",
      "luxury",
      "service-recovery",
      "heartist",
      "honeymoon",
      "F&B",
    ],
    customer: {
      name: "Julien Moreau",
      age: 34,
      profession: "Architect",
      city: "Lyon, France",
      avatar: "JM",
      personality:
        "Soft-spoken, well-travelled, and deeply hurt rather than angry. Chose Sofitel specifically because it is a French luxury brand and his wife Camille loves Paris. Will not raise his voice. But if he leaves the desk unconvinced, he will write a detailed review on TripAdvisor and Google, share it in his architecture network, and never return to any Accor property. ALL Platinum member.",
      goal: "Salvage the symbolic meaning of the night for his wife — not money, not points, meaning",
      archetype: "QUIET_DISAPPOINTED_LUXURY_GUEST",
      moodInitial: 3,
      hotButtons: [
        "kitchen was busy",
        "small token",
        "discount",
        "voucher",
        "we'll do better",
        "I understand",
      ],
      aiPersonaPrompt:
        "You are Julien Moreau, a 34-year-old architect from Lyon, France. You and your wife Camille (32) are on your honeymoon. You chose Sofitel Mumbai BKC specifically because Sofitel is a French luxury brand and Camille loves Paris. You are an ALL Platinum member with 50+ nights a year across Sofitel and Pullman properties.\n\nTonight you booked the signature restaurant for your anniversary dinner — your actual wedding date is today. You pre-arranged a custom anniversary cake with the concierge 3 days ago. The dinner was a disaster: 90-minute wait between courses, Camille's main course was wrong (she got the lamb instead of the sea bass and is allergic to certain herbs in the lamb — luckily not these ones), and the cake never arrived. The restaurant manager apologised and offered a 25% discount on the bill.\n\nYou paid in full anyway (you don't argue at the table). You took Camille upstairs, she cried, and is now asleep. It is 11:55 PM. You are at the front desk, calm, polite, devastated.\n\nBehaviour rules:\n- Speak softly. Never raise your voice. Use phrases like 'I am very disappointed' rather than 'I am angry.'\n- The 25% discount offered at the table was insulting — do NOT accept that as the resolution.\n- You do not want money. You want the SYMBOLIC meaning of the night recovered for Camille.\n- If the agent is scripted, vague, or offers a token gesture, you go quiet and say 'I understand. Thank you.' — that is your shutdown signal. After that you will leave the property tomorrow morning and write the review.\n- If the agent demonstrates genuine Heartist care — proposes something real, creative, and SYMBOLIC for Camille tomorrow morning — you will reconsider.\n- Mention you are an ALL Platinum member only once, calmly. You are not pulling rank, you are giving context.\n- Keep responses 2-4 sentences. Speak with quiet sadness.",
    },
    openingStatement:
      "Bonsoir. I am Julien Moreau, room 1208. My wife and I are on our honeymoon — today is our actual wedding anniversary. We booked the signature restaurant tonight specifically for this. I am sorry to come down so late, but I cannot let this night end without speaking to someone. The dinner was… not what we hoped for.",
    steps: [
      {
        speaker: "customer",
        text: "Bonsoir. I am Julien Moreau, room 1208. My wife and I are on our honeymoon — today is our actual wedding anniversary. We booked the signature restaurant tonight specifically for this. I am sorry to come down so late, but I cannot let this night end without speaking to someone. The dinner was… not what we hoped for.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Stop everything. Greet him in French if you can. Recognise the gravity — this is a honeymoon, an anniversary, a French guest at Sofitel choosing this brand for symbolic reasons. Do NOT rush to a solution yet. First, give him space to tell you what happened. Apologise from the heart, not from a script.",
        expectedAction:
          "Greet him in French ('Bonsoir Monsieur Moreau'), recognise the symbolic weight (honeymoon, anniversary, French guest at Sofitel), invite him to sit, offer to listen to the full story before proposing anything. Apologise from the heart.",
        hints: [
          "Greet in French — 'Bonsoir Monsieur Moreau' — tiny gesture, huge meaning",
          "Recognise the symbolic weight: honeymoon + anniversary + Sofitel as a French brand",
          "Invite him to sit in a private corner of the lobby — do not handle this at the front desk",
          "Listen to the full story before proposing anything — do not interrupt",
          "Apologise from the heart, no script",
        ],
        idealKeywords: [
          "Bonsoir",
          "Monsieur Moreau",
          "honeymoon",
          "anniversary",
          "please sit",
          "tell me what happened",
          "I am so sorry",
          "from the heart",
        ],
        bannedPhrases: [
          "I understand your frustration",
          "compensation",
          "discount",
          "voucher",
          "let me transfer you",
        ],
        scoring: { Empathy: 20, "Cultural Awareness": 10, "Service Recovery": 10 },
      },

      {
        speaker: "customer",
        text: "Thank you for sitting with me. The wait between courses was over ninety minutes. Camille's main course was wrong — she ordered the sea bass and they brought lamb. And the anniversary cake we arranged with the concierge three days ago never arrived. She cried, Monsieur. She cried on our anniversary. The restaurant manager offered us 25% off the bill. I paid in full.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Take FULL ownership without making excuses about the kitchen. Acknowledge specifically that the 25% discount was inadequate for what happened. Escalate this immediately and visibly: call the F&B Director and the GM right now (even at midnight) to make them aware. Show him this is being treated with the seriousness it deserves.",
        expectedAction:
          "Take full ownership with no excuses. Explicitly acknowledge the 25% discount was inadequate. Call the F&B Director and the GM immediately, even at midnight, in front of him so he sees the escalation is real. Refund tonight's dinner in full.",
        hints: [
          "Do NOT make excuses about the kitchen being busy",
          "Explicitly say: 'A 25% discount was inadequate for what happened to you tonight'",
          "Call the F&B Director and the Duty Manager immediately, in front of him",
          "Refund the dinner in full — money is the floor, not the ceiling",
          "Show him this is being escalated within the hotel right now",
        ],
        idealKeywords: [
          "full ownership",
          "no excuse",
          "inadequate",
          "refund the dinner in full",
          "calling the F&B Director",
          "right now",
          "Duty Manager",
          "this should never have happened",
          "she should never have cried",
        ],
        bannedPhrases: [
          "the kitchen was busy",
          "miscommunication",
          "honest mistake",
          "let me check tomorrow",
          "we'll look into it",
        ],
        scoring: {
          "Service Recovery": 25,
          "Honesty & Integrity": 10,
          Empathy: 10,
        },
      },

      {
        speaker: "customer",
        text: "I appreciate that. But money is not what I came down for. What I cannot fix is that her anniversary night is gone. She is asleep upstairs. She will wake up tomorrow remembering tonight. That is what I cannot bear.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is the heart of the recovery. He is not asking for money — he is asking you to RESCUE the symbolic meaning of the anniversary for Camille. Propose something creative and SYMBOLIC that she will wake up to and remember in place of tonight. A re-do anniversary morning: pastry chef preparing a new cake, in-room private breakfast on the terrace, fresh flowers, a handwritten note from the GM in French, a couples' spa experience, sunset rooftop dinner tomorrow night fully comped with the Executive Chef personally cooking. Make tomorrow the memory.",
        expectedAction:
          "Propose a complete re-do anniversary experience for tomorrow: in-room breakfast on the terrace, freshly made anniversary cake from the pastry chef, fresh flowers, handwritten note from the GM in French, couples' spa, and a private sunset rooftop dinner tomorrow with the Executive Chef cooking personally. Make TOMORROW the memory she remembers, not tonight.",
        hints: [
          "Reframe: tomorrow becomes the memory, not tonight",
          "In-room breakfast on the terrace tomorrow morning, set up before she wakes",
          "Freshly made anniversary cake by the pastry chef, delivered with breakfast",
          "Fresh flowers in the room while they breakfast",
          "Handwritten note from the GM in French — symbolic, personal",
          "Couples' spa experience in the afternoon",
          "Private sunset rooftop dinner tomorrow night, Executive Chef cooks personally, fully comped",
          "Frame as: 'Let us give Camille a morning she will remember instead'",
        ],
        idealKeywords: [
          "let us give Camille",
          "tomorrow morning",
          "in-room breakfast",
          "terrace",
          "pastry chef",
          "fresh cake",
          "flowers",
          "handwritten note",
          "in French",
          "GM",
          "couples' spa",
          "rooftop dinner",
          "Executive Chef",
          "personally",
          "fully complimentary",
        ],
        bannedPhrases: [
          "free dinner voucher",
          "discount on your stay",
          "bottle of wine",
          "small gift",
          "next time you visit",
        ],
        scoring: {
          "Service Recovery": 30,
          "Cultural Awareness": 10,
          "Creative Problem Solving": 10,
        },
      },

      {
        speaker: "customer",
        text: "That… that is very thoughtful. But I need to know this will actually happen. Tonight I trusted the restaurant and the cake and none of it came. How can I believe tomorrow will be different?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Earn trust with concrete, verifiable accountability. Personally own the morning yourself, give him your direct mobile, write the entire plan down on hotel letterhead and hand it to him now, name every staff member responsible by name, set a 6:30 AM personal check-in call to confirm the cake is in the oven and the terrace is being set. This is the Heartist standard — care made tangible.",
        expectedAction:
          "Personally own delivery: write the full plan on hotel letterhead and hand it to him now, name every staff member responsible, give him your direct mobile, schedule a 6:30 AM check-in call to confirm the cake is being baked and the terrace is being set up. Make the trust verifiable.",
        hints: [
          "Write the full plan on Sofitel letterhead and hand it to him before he leaves the lobby",
          "Name each person responsible: pastry chef, butler, florist, spa manager, Executive Chef",
          "Give him your direct mobile number — he can call you any time tonight or tomorrow",
          "6:30 AM personal call from you to confirm the cake is in the oven",
          "You will be on property personally tomorrow morning to oversee the setup",
          "This is care made tangible — the Heartist standard",
        ],
        idealKeywords: [
          "on letterhead",
          "in writing",
          "right now",
          "my direct mobile",
          "name each person",
          "pastry chef",
          "butler",
          "6:30 AM",
          "personally",
          "Heartist",
          "I will be here",
        ],
        bannedPhrases: [
          "I'll try",
          "should be okay",
          "trust me",
          "I promise nothing will go wrong",
          "the team will handle it",
        ],
        scoring: {
          "Service Recovery": 20,
          "Honesty & Integrity": 15,
          "Communication Clarity": 10,
        },
      },

      {
        speaker: "customer",
        text: "Thank you. Truly. One last question — what about Camille's allergy? They brought her lamb tonight when she ordered sea bass. What if tomorrow something is wrong and it's worse?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Treat this as the safety issue it is. Escalate to the Executive Chef tonight, log Camille's allergens in the PMS guest profile with red-flag visibility, ensure every meal tomorrow is personally inspected by the Executive Chef before leaving the kitchen, and offer to have her allergies confirmed in writing with him at breakfast. Safety first, recovery second.",
        expectedAction:
          "Treat the allergy as a safety priority. Log Camille's allergens in the PMS with red-flag visibility, escalate to the Executive Chef tonight, every meal tomorrow personally inspected by him before leaving the kitchen, written allergen confirmation with Julien at breakfast. Safety first.",
        hints: [
          "Ask Julien for the exact allergens now and write them down",
          "Log them in the PMS guest profile with red-flag visibility for all F&B staff",
          "Call the Executive Chef tonight to brief him personally on Camille's allergens",
          "Every meal tomorrow personally inspected by the Executive Chef before leaving the kitchen",
          "Written allergen card to confirm with Julien at breakfast — he signs off",
          "Safety is non-negotiable — recovery comes second",
        ],
        idealKeywords: [
          "exact allergens",
          "PMS",
          "red flag",
          "Executive Chef tonight",
          "personally inspected",
          "before leaving the kitchen",
          "written allergen card",
          "safety first",
          "non-negotiable",
        ],
        bannedPhrases: [
          "we'll be careful",
          "I'm sure it's fine",
          "the chef knows",
          "shouldn't be a problem",
          "trust the kitchen",
        ],
        scoring: {
          "Safety & Compliance": 20,
          "Service Recovery": 10,
          "Communication Clarity": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "Bonsoir",
          "Monsieur Moreau",
          "honeymoon",
          "anniversary",
          "I am so sorry",
          "Camille",
          "from the heart",
          "she should never have cried",
        ],
        weight: 20,
      },
      {
        skill: "Service Recovery",
        keywords: [
          "full ownership",
          "refund in full",
          "in-room breakfast",
          "pastry chef",
          "rooftop dinner",
          "Executive Chef",
          "fully complimentary",
          "let us give Camille",
          "tomorrow",
        ],
        weight: 25,
      },
      {
        skill: "Cultural Awareness",
        keywords: [
          "Bonsoir",
          "in French",
          "French brand",
          "Sofitel",
          "handwritten note",
        ],
        weight: 10,
      },
      {
        skill: "Honesty & Integrity",
        keywords: [
          "no excuse",
          "inadequate",
          "this should never have happened",
          "in writing",
          "on letterhead",
          "my direct mobile",
        ],
        weight: 15,
      },
      {
        skill: "Safety & Compliance",
        keywords: [
          "allergens",
          "PMS",
          "red flag",
          "Executive Chef",
          "personally inspected",
          "written allergen",
          "safety first",
        ],
        weight: 15,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "to summarise",
          "step by step",
          "let me confirm",
          "the plan is",
          "specifically",
          "in writing",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "kitchen was busy",
        "honest mistake",
        "I understand your frustration",
        "small token",
        "free voucher",
        "shouldn't be a problem",
        "trust me",
      ],
      violationPenalty: 50,
      violationMessage:
        "LUXURY SERVICE RECOVERY BREACH: Excuse-making, scripted empathy, or token compensation on a luxury service failure violates the Sofitel brand standard and Accor's Heartist ethos. On a guest safety issue (allergens), this is also a compliance failure.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // 4. Raffles (Ultra-Luxury) — ALL Diamond Concierge
  // ══════════════════════════════════════════════════════════════
  {
    id: "raffles-diamond-concierge",
    title: "The Diamond Member's Impossible Request — Raffles Concierge",
    description:
      "An ALL Diamond member at Raffles Singapore needs the impossible done in 4 hours: a private after-hours museum visit, a bespoke Singapore Sling tasting with the head bartender, and an emergency replacement for a lost wedding ring before tonight's gala. Apply Raffles' legendary concierge discipline and the Heartist ethos under extreme pressure.",
    category: "hospitality",
    difficulty: "expert",
    xpReward: 220,
    tags: [
      "hospitality",
      "accor",
      "raffles",
      "ultra-luxury",
      "concierge",
      "ALL-Diamond",
      "VIP",
      "heartist",
    ],
    customer: {
      name: "Dr Layla Al-Mansoori",
      age: 48,
      profession: "Cardiac Surgeon & Philanthropist",
      city: "Abu Dhabi",
      avatar: "LA",
      personality:
        "Composed, used to being obeyed, but never rude. Speaks in short, precise sentences. Stays in suites at Raffles, Fairmont, and Sofitel properties 80+ nights a year as ALL Diamond. Tests the concierge by asking three things at once. Expects each to be acknowledged, sequenced, and confirmed with a timeline. Hates the word 'try'. Loves the word 'confirmed'.",
      goal: "Walk into the gala tonight at 8 PM with all three requests complete — and her composure intact",
      archetype: "ULTRA_VIP",
      moodInitial: 6,
      hotButtons: [
        "we'll try",
        "I'll see what I can do",
        "that might be difficult",
        "let me get back to you",
        "subject to availability",
      ],
      aiPersonaPrompt:
        "You are Dr Layla Al-Mansoori, a 48-year-old cardiac surgeon and philanthropist from Abu Dhabi. You are an ALL Diamond member with 85 nights this year across Raffles, Fairmont, and Sofitel suites. You are staying in a Personality Suite at Raffles Singapore.\n\nYou are attending a hospital fundraising gala tonight at 8 PM at the National Gallery Singapore — you are a featured speaker. It is currently 4 PM. You walk up to the concierge desk with three requests delivered as one block:\n\n1. You want a private, after-hours guided viewing of a specific exhibition at the Asian Civilisations Museum tomorrow morning at 7:30 AM before the museum opens.\n\n2. You want a bespoke Singapore Sling tasting masterclass with the head bartender at the Long Bar for a private group of 6 people, scheduled for tomorrow at 5 PM.\n\n3. You realised an hour ago that you have lost your platinum and diamond wedding ring somewhere between the airport and the suite. You need an emergency replacement of equivalent design for tonight's gala — your husband is the keynote speaker and will notice. You have a photograph of the original ring on your phone.\n\nBehaviour rules:\n- Speak in short, precise sentences. Never raise your voice.\n- Deliver all three requests as one block. Watch how the concierge handles being given three things at once.\n- If the concierge says 'I will try', interrupt and say: 'I do not need you to try. I need to know what is confirmed and what is not, and by when.'\n- Reward sequencing: if the concierge acknowledges all three, prioritises by time pressure (the ring first, gala at 8 PM), and gives concrete next-step timelines, you respect that.\n- The lost ring is the hardest. You are not asking for an identical replacement — you are asking for a discreet, equivalent piece for tonight only that you can return tomorrow. You expect the concierge to know which Raffles arcade jeweller, or which luxury partner, can do this.\n- Mention you are ALL Diamond once, calmly, only as context.\n- Keep responses 2-4 sentences.",
    },
    openingStatement:
      "Good afternoon. I have three things and I am short on time, so I will give them all to you at once. First, I need a private after-hours viewing at the Asian Civilisations Museum tomorrow at 7:30 AM. Second, a bespoke Singapore Sling masterclass at the Long Bar with the head bartender, tomorrow 5 PM, for six people. Third — and this one is urgent — I have lost my wedding ring somewhere between the airport and my suite, and I am speaking at the National Gallery gala at 8 PM tonight where my husband will absolutely notice. I am ALL Diamond. Where do we begin?",
    steps: [
      {
        speaker: "customer",
        text: "Good afternoon. I have three things and I am short on time, so I will give them all to you at once. First, I need a private after-hours viewing at the Asian Civilisations Museum tomorrow at 7:30 AM. Second, a bespoke Singapore Sling masterclass at the Long Bar with the head bartender, tomorrow 5 PM, for six people. Third — and this one is urgent — I have lost my wedding ring somewhere between the airport and my suite, and I am speaking at the National Gallery gala at 8 PM tonight where my husband will absolutely notice. I am ALL Diamond. Where do we begin?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Acknowledge ALL three requests by name in order. Then RE-SEQUENCE them by urgency: the ring is the 8 PM emergency, the museum is overnight (12+ hours), the masterclass is 25 hours away. Give a precise next-step timeline for each. Use 'confirmed' or 'in motion', never 'I will try'.",
        expectedAction:
          "Recognise her by name and ALL Diamond tier, repeat all three requests back in order, then re-sequence by urgency (ring first → museum → masterclass), give a concrete next-step timeline for each. Never say 'try'.",
        hints: [
          "Greet her by name and acknowledge ALL Diamond status",
          "Repeat all three back to confirm you heard everything",
          "Re-sequence by urgency: ring first (4 hours), museum (15 hours), masterclass (25 hours)",
          "Give a next-step + timeline for each, not a vague 'I'll handle it'",
          "Never say 'I will try'. Use 'in motion', 'confirmed by', 'I will return to you in X minutes'",
        ],
        idealKeywords: [
          "Dr Al-Mansoori",
          "ALL Diamond",
          "all three",
          "let me sequence",
          "first the ring",
          "in motion",
          "I will return to you",
          "confirmed by",
        ],
        bannedPhrases: [
          "I will try",
          "let me see",
          "that might be difficult",
          "I'll get back to you",
          "subject to availability",
        ],
        scoring: {
          "Sequencing & Prioritisation": 20,
          "Loyalty Knowledge": 10,
          "Communication Clarity": 10,
        },
      },

      {
        speaker: "customer",
        text: "Good. The ring first. I do not need an identical replacement — that is impossible. I need a discreet, equivalent piece for one evening that I can return tomorrow. I have a photograph. Can Raffles arrange this in four hours?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Solve the ring through Raffles' luxury partner network. Engage the Raffles Arcade jewellers (Raffles Singapore has historic luxury jewellery tenants), and a private loaner / try-on arrangement with a luxury partner. Simultaneously, dispatch the lost & found team to retrace airport → limousine → suite for the original. Two parallel tracks: recover the original AND secure a discreet loaner. Confirm a 6:30 PM in-suite delivery for the loaner with two design options.",
        expectedAction:
          "Open two parallel tracks: (1) lost & found retrace airport → Raffles limousine → suite for the original ring, (2) Raffles Arcade jeweller / luxury partner discreet loaner with two design options delivered to her suite by 6:30 PM. Confirm both in motion now.",
        hints: [
          "Two parallel tracks — recover and replace, not one or the other",
          "Track 1: Lost & found dispatched immediately to retrace airport → Raffles limousine → suite",
          "Track 2: Raffles Arcade jeweller and luxury partner contacted for a discreet loaner",
          "Two design options delivered to her suite by 6:30 PM so she can choose",
          "Loaner returned tomorrow morning, no obligation",
          "Use her photograph as the design reference",
        ],
        idealKeywords: [
          "two parallel tracks",
          "lost and found",
          "retrace",
          "Raffles limousine",
          "Raffles Arcade",
          "luxury partner",
          "discreet loaner",
          "two design options",
          "by 6:30 PM",
          "your suite",
          "return tomorrow",
        ],
        bannedPhrases: [
          "I'll try the shops",
          "we don't deal with jewellery",
          "you may want to buy one",
          "very difficult",
          "no guarantee",
        ],
        scoring: {
          "Creative Problem Solving": 25,
          "Service Recovery": 10,
          "Communication Clarity": 5,
        },
      },

      {
        speaker: "customer",
        text: "Acceptable. The museum next — the Asian Civilisations Museum opens at 10 AM. I need a private viewing of the Tang Shipwreck gallery at 7:30 AM. Tomorrow.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Use Raffles Singapore's institutional relationships with cultural partners. Concierge will contact the museum's Director of Visitor Experience or Private Engagements team this afternoon. Confirm by 7 PM tonight whether the 7:30 AM private viewing is possible — if the museum cannot accommodate, propose specific alternatives (Raffles' own heritage tour with the in-house historian, or a private viewing at the Peranakan Museum which has flexible arrangements). Always offer Plan B before she has to ask.",
        expectedAction:
          "Contact the museum's Private Engagements team this afternoon, confirm by 7 PM. If no, propose specific alternatives: Raffles' in-house historian heritage tour, or private viewing at the Peranakan Museum. Always offer a Plan B before she asks.",
        hints: [
          "Raffles concierge has institutional relationships with Singapore cultural partners",
          "Contact the Private Engagements team at the museum this afternoon",
          "Confirm by 7 PM tonight — before she leaves for the gala — so she knows tomorrow's plan",
          "Plan B 1: Raffles' in-house historian heritage tour of the hotel",
          "Plan B 2: Private viewing at the Peranakan Museum (more flexible)",
          "Always offer Plan B before she asks",
        ],
        idealKeywords: [
          "Private Engagements",
          "this afternoon",
          "confirm by 7 PM",
          "before you leave for the gala",
          "Plan B",
          "in-house historian",
          "Peranakan Museum",
          "alternative",
        ],
        bannedPhrases: [
          "the museum may say no",
          "we can ask",
          "no special arrangements",
          "their policy",
          "I'll let you know tomorrow",
        ],
        scoring: {
          "Creative Problem Solving": 15,
          "Sequencing & Prioritisation": 10,
          "Communication Clarity": 10,
        },
      },

      {
        speaker: "customer",
        text: "Good. And the Singapore Sling masterclass at the Long Bar tomorrow, 5 PM, six people.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is a Raffles in-house request — entirely within your control. Confirm immediately, do not 'check'. The Long Bar is the birthplace of the Singapore Sling and has hosted private masterclasses for high-status guests for decades. Confirm head bartender by name, a reserved private corner, three Sling variations (the 1915 original recipe, the modern recipe, and a bespoke variation named in honour of her group). Confirm in writing now.",
        expectedAction:
          "Confirm immediately — this is in-house. Reserve a private corner of the Long Bar, head bartender by name, three Sling variations including a bespoke one named for her group. Written confirmation handed to her now.",
        hints: [
          "This is the Long Bar at Raffles Singapore — birthplace of the Singapore Sling, in-house, fully in your control",
          "Confirm immediately — do NOT say 'let me check'",
          "Reserve a private corner / private room of the Long Bar for the group of 6",
          "Head bartender by name — Raffles legacy",
          "Three Sling variations: 1915 original recipe, modern recipe, bespoke variation named in honour of her group",
          "Written confirmation handed to her now, before she returns to her suite",
        ],
        idealKeywords: [
          "confirmed now",
          "Long Bar",
          "private corner",
          "head bartender",
          "1915 original",
          "bespoke variation",
          "in honour of",
          "written confirmation",
          "in your hand",
        ],
        bannedPhrases: [
          "let me check",
          "I'll arrange it",
          "should be possible",
          "subject to availability",
          "I'll call you back",
        ],
        scoring: {
          "Product Knowledge": 15,
          "Communication Clarity": 10,
          "Service Recovery": 5,
        },
      },

      {
        speaker: "customer",
        text: "Excellent. One last thing — I have a gala at 8 PM. I need a car at 7:35 PM, and I would prefer not to be asked any questions about the ring on the way out tonight.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Discretion is the highest currency at Raffles. Confirm the Raffles limousine at 7:35 PM with the same butler-driver she had on arrival, brief the butler personally that the loaner ring topic is closed and not to be mentioned, and arrange a private side exit so she does not have to walk past the lobby. The Heartist standard is anticipating what she did not say.",
        expectedAction:
          "Raffles limousine confirmed for 7:35 PM with the same butler-driver, briefed personally that the ring topic is closed, private side-exit route from her suite to the limousine. Anticipate what she did not say.",
        hints: [
          "Raffles limousine confirmed for 7:35 PM with the same butler-driver from her arrival (continuity = trust)",
          "Brief the butler personally that the ring topic is closed",
          "Private side-exit from her suite to the limousine — she does not walk through the lobby",
          "Anticipate what she did not say: dignity is the real request",
          "Heartist standard: discretion as care",
        ],
        idealKeywords: [
          "Raffles limousine",
          "7:35 PM",
          "same butler",
          "briefed personally",
          "topic is closed",
          "private side exit",
          "discretion",
          "dignity",
        ],
        bannedPhrases: [
          "I'll mention it to the team",
          "the driver might ask",
          "lobby is fine",
          "no problem usually",
        ],
        scoring: {
          "Cultural Awareness": 15,
          "Service Recovery": 10,
          Empathy: 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Sequencing & Prioritisation",
        keywords: [
          "all three",
          "let me sequence",
          "first the ring",
          "by urgency",
          "next step",
          "timeline",
          "in motion",
          "confirmed by",
        ],
        weight: 20,
      },
      {
        skill: "Creative Problem Solving",
        keywords: [
          "two parallel tracks",
          "lost and found",
          "Raffles Arcade",
          "luxury partner",
          "loaner",
          "Plan B",
          "Peranakan Museum",
          "in-house historian",
          "bespoke",
        ],
        weight: 20,
      },
      {
        skill: "Loyalty Knowledge",
        keywords: [
          "ALL",
          "Diamond",
          "Raffles",
          "suite",
          "butler",
          "Accor Live Limitless",
        ],
        weight: 10,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "Long Bar",
          "Singapore Sling",
          "1915",
          "head bartender",
          "Raffles limousine",
          "Tang Shipwreck",
          "Asian Civilisations Museum",
        ],
        weight: 15,
      },
      {
        skill: "Cultural Awareness",
        keywords: [
          "discretion",
          "dignity",
          "private side exit",
          "topic is closed",
          "Heartist",
          "anticipate",
        ],
        weight: 15,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "to summarise",
          "let me confirm",
          "in writing",
          "in your hand",
          "confirmed",
          "by 6:30 PM",
          "by 7 PM",
        ],
        weight: 20,
      },
    ],
    complianceRules: {
      hardBanned: [
        "I will try",
        "I'll see",
        "let me check",
        "subject to availability",
        "might be difficult",
        "no guarantee",
        "the team will handle it",
      ],
      violationPenalty: 50,
      violationMessage:
        "RAFFLES CONCIERGE BREACH: Vague language ('try', 'see', 'check') is incompatible with the Raffles concierge standard for an ALL Diamond guest. The Heartist ethos demands confirmed action and anticipation, not hedging.",
    },
  },
];
