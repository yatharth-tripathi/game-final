import type { Scenario } from "./scenarios";

export const NEW_SCENARIOS: Scenario[] = [
  // ══════════════════════════════════════════════════════════════
  // ── SALES (4 scenarios) ──
  // ══════════════════════════════════════════════════════════════

  // ── 1. Gold Loan Pitch to a Farmer ──
  {
    id: "gold-loan-farmer",
    title: "Gold Loan Pitch to a Farmer",
    description:
      "Ramesh Yadav is a 52-year-old farmer from Varanasi who has 200 grams of gold jewellery lying idle at home. He needs ₹5 lakhs for the upcoming crop season but is deeply suspicious of banks and moneylenders. Convince him that a gold loan is safer, cheaper, and more transparent than the local sahukar — without pressuring him or disrespecting his traditional ways.",
    category: "sales",
    difficulty: "easy",
    xpReward: 80,
    tags: [
      "gold-loan",
      "rural-banking",
      "trust-building",
      "farmer",
      "vernacular-empathy",
    ],
    customer: {
      name: "Ramesh Yadav",
      age: 52,
      profession: "Farmer",
      city: "Varanasi",
      avatar: "RY",
      personality:
        "Traditional, cautious, and proud. Speaks in a straightforward manner. Distrusts institutions — has heard stories of farmers losing land to banks. Respects honesty and humility. Gets offended if talked down to. Warm once trust is established.",
      goal: "Secure ₹5 lakhs for crop season without losing his gold or falling into a debt trap",
      archetype: "CAUTIOUS_RURAL",
      moodInitial: 5,
      hotButtons: [
        "auction",
        "seize",
        "collateral risk",
        "fine print",
        "hidden charges",
        "English jargon",
      ],
      aiPersonaPrompt:
        "You are Ramesh Yadav, a 52-year-old farmer from a village near Varanasi. You own about 200 grams of gold jewellery — your wife's wedding gold and some ancestral pieces. You need ₹5 lakhs urgently for seeds, fertiliser, and labour for the kharif season.\n\nYou have always borrowed from the local moneylender (sahukar) at 3-4% per month. Your neighbour told you about gold loans from banks at much lower interest. You are curious but deeply suspicious.\n\nBehaviour rules:\n- You worry the bank will auction your gold if you miss one payment.\n- You speak simply and directly. If the RM uses English jargon, you get confused and annoyed.\n- You respect people who treat you as an equal, not as an uneducated villager.\n- You will open up only if the RM shows genuine understanding of farming life.\n- If convinced the gold is safe, you are willing to proceed.\n- Keep responses 1-3 sentences. Be direct.",
    },
    openingStatement:
      "Namaste sahab. My neighbour Sonu told me banks give loan on gold at low interest. I have my wife's jewellery — about 200 grams. I need ₹5 lakhs for this crop season. But I am scared — what if the bank takes my gold and never returns it?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Namaste sahab. My neighbour Sonu told me banks give loan on gold at low interest. I have my wife's jewellery — about 200 grams. I need ₹5 lakhs for this crop season. But I am scared — what if the bank takes my gold and never returns it?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Build immediate trust. Greet him respectfully, acknowledge his fear about losing gold, and clearly explain that the gold is kept in a secure bank vault and returned upon repayment. Do NOT launch into product features yet.",
        expectedAction:
          "Greet warmly, acknowledge his concern about gold safety, explain that gold is stored securely in a bank locker/vault with insurance, and returned in full once the loan is repaid.",
        hints: [
          "Use respectful language — he is an elder and a hardworking farmer",
          "Acknowledge that his fear is valid — many people share it",
          "Explain gold is stored in an insured bank vault, not sold or melted",
          "Mention that gold is returned exactly as deposited upon full repayment",
        ],
        idealKeywords: [
          "namaste",
          "vault",
          "safe",
          "insured",
          "returned",
          "repayment",
          "your gold",
          "secure",
        ],
        bannedPhrases: [
          "collateral seizure",
          "don't worry about it",
          "it's just jewellery",
          "you won't understand",
        ],
        scoring: { Empathy: 10, "Communication Clarity": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "But the sahukar gives money in 10 minutes. He comes to my house. Bank means forms, lines, coming to town. And what if I cannot pay on time? The sahukar at least gives me extra weeks.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Compare bank gold loan vs moneylender honestly. Highlight lower interest rate (7-12% p.a. vs 36-48% p.a.), transparent process, and RBI regulation. Address the convenience concern — explain quick disbursal and simple documentation. Be honest that the bank does have a structured repayment schedule.",
        expectedAction:
          "Compare interest rates clearly: bank 7-12% yearly vs sahukar 3-4% monthly (36-48% yearly). Explain quick disbursal (30-45 minutes), minimal paperwork. Acknowledge that repayment is structured but explain options like bullet repayment.",
        hints: [
          "Convert sahukar's 3-4% monthly to yearly — 36-48% — to show the real cost",
          "Gold loan disbursal can be as quick as 30-45 minutes",
          "Documents needed: just Aadhaar, PAN or voter ID, and the gold",
          "Repayment options: monthly interest-only or bullet repayment at end of tenure",
        ],
        idealKeywords: [
          "interest rate",
          "per year",
          "per month",
          "sahukar",
          "36%",
          "quick",
          "30 minutes",
          "Aadhaar",
          "repayment options",
        ],
        bannedPhrases: [
          "moneylenders are criminals",
          "you're being cheated",
          "only fools go to sahukars",
          "don't be silly",
        ],
        scoring: { "Product Knowledge": 8, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Hmm, 36% per year... I never calculated like that. But tell me clearly — if the monsoon fails and I cannot pay for 2-3 months, will you auction my gold? Because I have heard stories of banks selling people's gold without telling them.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the auction fear head-on with transparency. Explain the RBI-mandated process: bank must give notice before auction, there is a grace period, and the bank works with borrowers on restructuring. Be honest that default CAN lead to auction but only after multiple notices and attempts to help.",
        expectedAction:
          "Explain the auction process honestly: bank sends multiple notices, gives time to arrange payment, offers restructuring options. Auction is a last resort after all options are exhausted. RBI guidelines protect borrowers.",
        hints: [
          "Be honest: yes, prolonged default can lead to auction — but it is a LAST resort",
          "Bank must send written notice and give minimum 7-day window before auction",
          "If monsoon fails, agricultural loan restructuring is available under RBI guidelines",
          "Emphasise that the bank wants repayment, not your gold — auction is costly for the bank too",
        ],
        idealKeywords: [
          "notice",
          "grace period",
          "restructuring",
          "last resort",
          "RBI guidelines",
          "written notice",
          "work with you",
          "repayment plan",
        ],
        bannedPhrases: [
          "we will never auction",
          "no risk at all",
          "don't worry",
          "that never happens",
        ],
        scoring: { "Compliance Language": 8, Empathy: 7, "Communication Clarity": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "OK, that is fair — at least you are being honest. But my wife will not give her wedding gold easily. She says it is bad luck. How do I convince her? And how much loan will I actually get on 200 grams?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the wife's emotional attachment to gold. Respect the cultural and sentimental value. Explain the loan-to-value ratio (typically 75% of gold value as per RBI norms) and give a rough estimate for 200 grams. Suggest he bring his wife to the branch for reassurance.",
        expectedAction:
          "Respect the wife's sentiment. Explain LTV ratio: ~75% of gold market value. For 200g at ~₹6,000/gram pure gold value, loan could be ₹5-7 lakhs depending on purity. Offer to show the vault and explain process to his wife directly.",
        hints: [
          "Never dismiss the wife's concern — gold has deep emotional and cultural value",
          "LTV ratio: RBI allows up to 75% of gold's value as loan amount",
          "200g at current rates could easily cover ₹5L — give a rough range",
          "Invite his wife to visit the branch and see the vault — builds trust",
        ],
        idealKeywords: [
          "respect",
          "sentimental",
          "wife",
          "75%",
          "value",
          "purity",
          "invite her",
          "show the vault",
        ],
        bannedPhrases: [
          "it's just gold",
          "she's being emotional",
          "convince her somehow",
          "superstition",
        ],
        scoring: { Empathy: 10, "Product Knowledge": 7, "Needs Discovery": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "That is a good idea — if she sees the vault and locker herself, she will feel better. OK sahab, I think I want to try this. What do I need to bring? And the crop season starts in 3 weeks, will I get the money in time?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close the conversation with clear next steps. List the documents needed (Aadhaar, PAN/voter ID, gold), explain the quick turnaround (same day possible), and set expectations on the process. Invite him to bring his wife along when he comes.",
        expectedAction:
          "List documents: Aadhaar card, PAN or voter ID, the gold jewellery. Process takes 30-45 minutes once documents and gold are verified. Money can be in his account the same day. Invite wife to come along for reassurance.",
        hints: [
          "Keep it simple: Aadhaar + one more ID + gold = that's all he needs",
          "Same-day disbursal is possible — well within 3 weeks",
          "Mention that gold is weighed and valued in front of him — transparent process",
          "Warm closing: wish him a good crop season",
        ],
        idealKeywords: [
          "Aadhaar",
          "same day",
          "bring your wife",
          "weighed in front of you",
          "transparent",
          "3 weeks",
          "good crop season",
        ],
        bannedPhrases: [
          "lots of paperwork",
          "it takes weeks",
          "complicated process",
          "you need many documents",
        ],
        scoring: {
          "Communication Clarity": 8,
          "Product Knowledge": 5,
          Empathy: 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "understand",
          "respect",
          "wife",
          "sentimental",
          "valid concern",
          "farming",
          "crop season",
        ],
        weight: 20,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "interest rate",
          "LTV",
          "75%",
          "vault",
          "same day",
          "repayment",
          "bullet",
          "restructuring",
        ],
        weight: 20,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "simple",
          "clearly",
          "let me explain",
          "for example",
          "Aadhaar",
          "documents",
          "process",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "RBI",
          "notice",
          "auction last resort",
          "guidelines",
          "grace period",
          "written notice",
        ],
        weight: 20,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "crop season",
          "₹5 lakhs",
          "how much",
          "timeline",
          "3 weeks",
          "kharif",
        ],
        weight: 20,
      },
    ],
    complianceRules: {
      hardBanned: [
        "guaranteed no auction",
        "no risk at all",
        "gold is 100% safe",
        "moneylenders are criminals",
        "you won't understand",
      ],
      violationPenalty: 30,
      violationMessage:
        "COMPLIANCE BREACH: Misleading assurance about gold safety or disrespectful language toward the customer. Violates RBI Fair Practices Code for lending.",
    },
  },

  // ── 2. NRI Account Opening ──
  {
    id: "nri-account-opening",
    title: "NRI Account Opening",
    description:
      "Ananya Desai is a 38-year-old IT professional returning to India after 12 years in the USA. She needs to open NRE/NRO accounts and is confused about FEMA regulations, tax implications, and repatriation rules. Guide her through the process with clarity and compliance.",
    category: "sales",
    difficulty: "medium",
    xpReward: 100,
    tags: [
      "NRI-banking",
      "NRE-NRO",
      "FEMA",
      "repatriation",
      "tax-compliance",
      "account-opening",
    ],
    customer: {
      name: "Ananya Desai",
      age: 38,
      profession: "IT Professional",
      city: "Bangalore",
      avatar: "AD",
      personality:
        "Sharp, well-read, and detail-oriented. Has done research online but finds conflicting information. Asks probing questions. Appreciates structured, clear answers. Gets impatient with vague responses. Will respect you if you know your subject.",
      goal: "Open the right NRI accounts to manage Indian income and US savings while staying compliant with FEMA and tax laws",
      archetype: "INFORMED_PROFESSIONAL",
      moodInitial: 6,
      hotButtons: [
        "conflicting advice",
        "FEMA penalties",
        "double taxation",
        "hidden fees",
        "slow process",
      ],
      aiPersonaPrompt:
        "You are Ananya Desai, 38, an IT professional who spent 12 years in the USA working at tech companies. You are returning to India permanently and need to set up your banking. You have savings in USD, rental income from an Indian property your parents managed, and are confused about NRE vs NRO accounts.\n\nYou have read articles online but found conflicting information about FEMA rules, repatriation limits, and tax implications. You are worried about inadvertently violating regulations.\n\nBehaviour rules:\n- Ask specific questions about NRE vs NRO differences.\n- Push back if the RM gives vague answers — you want specifics.\n- You are concerned about FEMA compliance and double taxation.\n- You have rental income in India (~₹30K/month) that has been accumulating.\n- If the RM is knowledgeable and clear, you will be cooperative.\n- Keep responses 1-3 sentences. Be professional.",
    },
    openingStatement:
      "Hi, I've been in the US for 12 years and I'm moving back to India permanently. I need to set up my banking here — NRE, NRO, I've read about both but honestly the FEMA rules are confusing. I also have rental income that's been sitting in my parents' account. Can you walk me through what I need?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Hi, I've been in the US for 12 years and I'm moving back to India permanently. I need to set up my banking here — NRE, NRO, I've read about both but honestly the FEMA rules are confusing. I also have rental income that's been sitting in my parents' account. Can you walk me through what I need?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Welcome her and clarify the fundamental difference between NRE and NRO accounts. NRE is for foreign earnings (fully repatriable, tax-free in India). NRO is for Indian income like rent (repatriable up to $1M/year after tax). Ask about her residency status timeline to determine which accounts she needs.",
        expectedAction:
          "Explain NRE vs NRO clearly: NRE for foreign income (tax-free, fully repatriable), NRO for Indian income (taxable, repatriable up to $1M/year). Ask when exactly she is changing residency status.",
        hints: [
          "NRE = Non-Resident External — for income earned outside India",
          "NRO = Non-Resident Ordinary — for income earned within India",
          "NRE interest is tax-free in India; NRO interest is taxable",
          "Ask about her residency change date — this affects which account type she needs",
        ],
        idealKeywords: [
          "NRE",
          "NRO",
          "foreign income",
          "Indian income",
          "repatriable",
          "tax-free",
          "residency status",
          "FEMA",
        ],
        bannedPhrases: [
          "it's complicated",
          "don't worry about FEMA",
          "just open both",
          "details don't matter",
        ],
        scoring: { "Product Knowledge": 10, "Communication Clarity": 8 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "OK so NRE for my US savings, NRO for my rent — that makes sense. But here's my concern: I'm moving back permanently in 2 months. Once I become a resident Indian again, what happens to my NRE account? Does it just close? And what about the money already in it?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Explain what happens to NRE accounts when NRI status changes. NRE account must be redesignated as a resident account or converted to RFC (Resident Foreign Currency) account within a reasonable time. RFC allows her to retain foreign currency earnings. Explain the process clearly.",
        expectedAction:
          "Explain: NRE must be redesignated to resident savings or converted to RFC account. RFC lets her keep foreign currency earned while NRI. Interest on RFC is tax-free if she was NRI for at least 1 year out of the previous 10 years. FEMA requires notification to bank upon residency change.",
        hints: [
          "NRE account cannot remain NRE once she becomes a resident — must be converted",
          "RFC (Resident Foreign Currency) account is the best option to retain USD flexibility",
          "RFC interest is tax-free if she qualifies under FEMA residency rules",
          "She must inform the bank as soon as her residency status changes",
        ],
        idealKeywords: [
          "redesignated",
          "RFC",
          "Resident Foreign Currency",
          "convert",
          "residency change",
          "inform the bank",
          "FEMA",
          "tax-free",
        ],
        bannedPhrases: [
          "nothing changes",
          "keep it as NRE forever",
          "nobody checks",
          "don't bother informing",
        ],
        scoring: { "Product Knowledge": 10, "Compliance Language": 8, "Communication Clarity": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Good to know about RFC. Now about my rental income — about ₹30,000 a month has been going into my parents' savings account for the last 3 years. Is that a problem? Should I have had an NRO account all along?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Handle this carefully. Technically, Indian income of an NRI should go into an NRO account, not a parents' resident account. This is a FEMA grey area. Advise her to regularise the situation. Do not alarm her, but do not downplay the compliance aspect either. Suggest consulting a CA for tax implications.",
        expectedAction:
          "Acknowledge that ideally rental income should have gone into an NRO account. It's a common oversight. Suggest regularising it now — open an NRO account and route future rent through it. Recommend consulting a CA for past tax implications. Don't panic her.",
        hints: [
          "Technically, NRI income in India should flow through NRO — but this is a very common oversight",
          "Suggest opening NRO account now and routing all future rent through it",
          "Past income: recommend consulting a Chartered Accountant for tax filing corrections if needed",
          "Don't create panic — this is fixable, not criminal",
        ],
        idealKeywords: [
          "NRO account",
          "rental income",
          "regularise",
          "Chartered Accountant",
          "tax filing",
          "common oversight",
          "going forward",
          "fixable",
        ],
        bannedPhrases: [
          "that's illegal",
          "you're in big trouble",
          "FEMA will penalise you",
          "nothing to worry about",
        ],
        scoring: { "Compliance Language": 10, Empathy: 7, "Product Knowledge": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "OK I'll definitely talk to a CA. One more thing — I want to transfer about $50,000 from my US bank account to India. What's the most cost-effective way to do this? And are there any tax implications on receiving this money in India?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Explain the wire transfer process and tax implications. Money earned abroad and transferred to NRE account is NOT taxable in India. Discuss wire transfer via SWIFT, compare with services like Wise for rates. Mention TCS and FBAR/FATCA reporting if applicable. Be clear on exchange rate spreads.",
        expectedAction:
          "Explain: foreign earnings transferred to NRE are not taxable in India. Wire transfer via SWIFT is standard; compare bank rates with remittance services. Mention exchange rate margin as the hidden cost. Advise checking DTAA (Double Tax Avoidance Agreement) between India and USA.",
        hints: [
          "Money earned abroad, sent to NRE = not taxable in India under FEMA",
          "SWIFT wire transfer is standard but banks charge ₹500-1500 + exchange rate margin",
          "Services like Wise may offer better exchange rates — compare before transferring",
          "DTAA between India and US prevents double taxation — suggest she check with CA",
        ],
        idealKeywords: [
          "NRE",
          "not taxable",
          "wire transfer",
          "SWIFT",
          "exchange rate",
          "DTAA",
          "double taxation",
          "compare rates",
        ],
        bannedPhrases: [
          "all transfers are taxed",
          "just send it however",
          "tax rules don't apply",
          "don't declare it",
        ],
        scoring: { "Product Knowledge": 8, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "This is really helpful — much clearer than what I found online. So to summarise: I need an NRE account now, an NRO for rent, convert NRE to RFC when I become resident, and consult a CA. Can we start the account opening today? What documents do I need?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Confirm her understanding is correct and close with clear documentation requirements. List the KYC documents for NRI account opening: passport, visa, overseas address proof, PAN, photographs. Explain the process timeline and offer to help with RFC conversion when the time comes.",
        expectedAction:
          "Confirm her summary is accurate. List documents: valid passport, US visa/residency proof, overseas address proof, PAN card, passport-size photographs, and Indian address proof for communication. Offer to set a reminder for RFC conversion when she returns.",
        hints: [
          "Confirm her summary is spot-on — she's clearly understood the structure",
          "NRI KYC: passport + visa + overseas address proof + PAN + photos",
          "Some banks allow video KYC for NRI account opening now",
          "Offer to proactively remind her about RFC conversion when residency changes",
        ],
        idealKeywords: [
          "passport",
          "visa",
          "PAN",
          "address proof",
          "photographs",
          "RFC conversion",
          "reminder",
          "today",
        ],
        bannedPhrases: [
          "it's a long process",
          "you need dozens of documents",
          "come back later",
          "we'll figure it out",
        ],
        scoring: {
          "Communication Clarity": 8,
          "Product Knowledge": 7,
          Empathy: 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Product Knowledge",
        keywords: [
          "NRE",
          "NRO",
          "RFC",
          "repatriable",
          "FEMA",
          "DTAA",
          "wire transfer",
          "SWIFT",
          "exchange rate",
        ],
        weight: 25,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "FEMA",
          "residency status",
          "redesignated",
          "regularise",
          "tax-free",
          "not taxable",
          "CA",
          "declaration",
        ],
        weight: 25,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "let me explain",
          "specifically",
          "in your case",
          "documents needed",
          "process",
          "timeline",
        ],
        weight: 20,
      },
      {
        skill: "Empathy",
        keywords: [
          "understand",
          "common oversight",
          "don't worry",
          "fixable",
          "welcome back",
          "helpful",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "residency date",
          "rental income",
          "US savings",
          "how much",
          "timeline",
          "moving back",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "FEMA doesn't matter",
        "nobody checks NRI accounts",
        "don't declare foreign income",
        "keep it in parents account",
        "tax rules don't apply to NRIs",
      ],
      violationPenalty: 40,
      violationMessage:
        "COMPLIANCE BREACH: Misleading advice on FEMA regulations or tax obligations for NRI banking. Violates FEMA Act 1999 and RBI NRI account guidelines.",
    },
  },

  // ── 3. Wealth Management Upsell to HNI ──
  {
    id: "wealth-management-hni",
    title: "Wealth Management Upsell to HNI",
    description:
      "Vikram Malhotra is a 55-year-old industrialist from Delhi with a ₹5 crore portfolio parked entirely in FDs. He wants better returns but deeply distrusts equity markets after the 2008 crash. Navigate his ego, his distrust of fund managers, and his demand for capital protection — all while maintaining compliance.",
    category: "sales",
    difficulty: "hard",
    xpReward: 130,
    tags: [
      "wealth-management",
      "HNI",
      "portfolio-diversification",
      "FD-migration",
      "capital-protection",
      "relationship-management",
    ],
    customer: {
      name: "Vikram Malhotra",
      age: 55,
      profession: "Industrialist",
      city: "Delhi",
      avatar: "VM",
      personality:
        "Commanding, used to being the smartest person in the room. Built his business from scratch. Sees himself as a risk-taker in business but extremely conservative with personal wealth. Has a massive ego — do not lecture him. Respects competence and data, not flattery.",
      goal: "Better returns than FD without significant risk to his ₹5Cr corpus",
      archetype: "ALPHA_HNI",
      moodInitial: 4,
      hotButtons: [
        "market crash",
        "2008",
        "fund manager fees",
        "loss of principal",
        "being lectured",
        "junior advisors",
      ],
      aiPersonaPrompt:
        "You are Vikram Malhotra, 55, owner of a manufacturing company in Delhi. You have ₹5 crore in FDs across 3 banks. Your CA keeps telling you to diversify but you lost ₹40 lakhs in 2008 and swore off the market.\n\nYou agreed to meet this bank's wealth manager only because the branch head is a family friend. You give them exactly 5 minutes. You are used to commanding conversations.\n\nBehaviour rules:\n- You are blunt and slightly dismissive at first. You've met many 'advisors' before.\n- Don't accept generic advice — demand specific strategies for ₹5Cr.\n- If the RM mentions 2008 respectfully and shows understanding, you'll listen.\n- You are NOT opposed to debt instruments, bonds, or structured products — just equity.\n- If shown a clear capital-protection strategy with better-than-FD returns, you'll consider it.\n- You test people by asking tough questions. Respect competence, not politeness.\n- Keep responses 1-3 sentences. Be commanding.",
    },
    openingStatement:
      "Let me be clear — I have ₹5 crore in FDs and I'm earning 7%. My CA says I'm losing money to inflation. Your branch head Sunil said you have 'solutions.' I've heard this pitch a hundred times. I lost ₹40 lakhs in 2008 and I'm not putting my money in any equity nonsense. You have five minutes.",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Let me be clear — I have ₹5 crore in FDs and I'm earning 7%. My CA says I'm losing money to inflation. Your branch head Sunil said you have 'solutions.' I've heard this pitch a hundred times. I lost ₹40 lakhs in 2008 and I'm not putting my money in any equity nonsense. You have five minutes.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Do NOT pitch equity. Acknowledge his 2008 experience and validate his conservative stance. Show you understand HNI-level wealth management by discussing inflation erosion on ₹5Cr in concrete terms. Position yourself as a strategist, not a salesperson.",
        expectedAction:
          "Acknowledge his 2008 loss as a real experience. Quantify inflation erosion: at 6% inflation, his ₹5Cr loses ~₹30L in purchasing power yearly. Position yourself as someone who understands capital protection is priority #1. Do NOT mention equity yet.",
        hints: [
          "₹5Cr at 7% FD = ₹35L/year. At 6% inflation, real return is only ~₹5L/year",
          "Post-tax FD return at 30% bracket is only ~4.9% — below inflation",
          "Acknowledge 2008 — don't minimize it. ₹40L loss was real and painful",
          "Position: 'Capital protection first, then we talk about returns'",
        ],
        idealKeywords: [
          "inflation",
          "purchasing power",
          "2008",
          "real return",
          "post-tax",
          "capital protection",
          "understand",
          "₹5 crore",
        ],
        bannedPhrases: [
          "you should invest in equity",
          "markets always recover",
          "FD is a waste",
          "you're losing money",
        ],
        scoring: { Empathy: 8, "Product Knowledge": 7, "Communication Clarity": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Finally someone who gets it. Yes, post-tax my FD returns are barely keeping up with inflation. But what do you have that gives me better returns WITHOUT the market risk? And don't suggest mutual funds — I know you earn commissions on those.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Introduce non-equity wealth products: government bonds (SGBs, tax-free bonds), corporate bonds (AAA-rated), structured deposits, and debt mutual funds. Explain each briefly with expected returns. Be transparent about any commissions.",
        expectedAction:
          "Present non-equity options: Sovereign Gold Bonds (2.5% + gold appreciation), AAA corporate bonds (8-9%), tax-free bonds (if available), structured deposits with principal protection. Be upfront about fee structure.",
        hints: [
          "SGBs: 2.5% annual interest + gold price appreciation, sovereign guarantee",
          "AAA corporate bonds: 8-9% with high safety, but not government-guaranteed",
          "Structured deposits: principal-protected with upside linked to market/index",
          "Be transparent about fees — HNIs respect honesty about revenue model",
        ],
        idealKeywords: [
          "sovereign gold bonds",
          "corporate bonds",
          "AAA",
          "structured deposits",
          "principal protection",
          "8-9%",
          "transparent",
          "fee structure",
        ],
        bannedPhrases: [
          "no commission",
          "completely free",
          "guaranteed high returns",
          "risk-free investment",
        ],
        scoring: { "Product Knowledge": 10, "Communication Clarity": 7, "Compliance Language": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Structured deposits sound interesting. But corporate bonds — what happens if the company defaults? I've seen IL&FS and DHFL. AAA rating means nothing when things go wrong. How do you protect against that?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address credit risk concern honestly. He is right — IL&FS and DHFL were wake-up calls. Explain diversification across multiple issuers, suggest PSU bonds for higher safety, and mention credit risk monitoring. Do not dismiss his concern — it shows sophistication.",
        expectedAction:
          "Acknowledge IL&FS/DHFL — he's right to be cautious. Suggest PSU bonds (government-backed entities) for higher safety. Explain diversification across issuers. Mention that for his ticket size, a managed bond portfolio with active credit monitoring is available.",
        hints: [
          "IL&FS and DHFL were genuine failures — don't dismiss his concern",
          "PSU bonds (NHAI, REC, PFC) have implicit government backing — much safer",
          "Diversification: spread across 8-10 issuers, no single issuer >15% of portfolio",
          "For ₹5Cr, he qualifies for PMS or AIF with active credit monitoring",
        ],
        idealKeywords: [
          "IL&FS",
          "DHFL",
          "valid concern",
          "PSU bonds",
          "diversification",
          "credit monitoring",
          "PMS",
          "issuers",
        ],
        bannedPhrases: [
          "AAA is always safe",
          "defaults don't happen",
          "don't worry about credit risk",
          "that won't happen again",
        ],
        scoring: { "Product Knowledge": 10, "Objection Handling": 8, "Compliance Language": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "Now you're talking sense. So if I move ₹2 crore from FDs into a mix of PSU bonds and structured deposits, what kind of returns can I expect? And what's the lock-in? I need liquidity for my business.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Give realistic return expectations for a ₹2Cr allocation. PSU bonds: 7.5-8.5% with varying tenures. Structured deposits: 7-10% depending on structure. Address liquidity — bonds can be sold on secondary market, structured deposits may have lock-in. Be precise about tenures and exit options.",
        expectedAction:
          "Project returns: PSU bonds 7.5-8.5%, structured deposits 7-10%. Explain liquidity: bonds tradeable on secondary market (some spread), structured deposits typically 1-3 year lock-in. Suggest laddering tenures for regular liquidity. Keep ₹3Cr in FDs for comfort.",
        hints: [
          "PSU bonds: 7.5-8.5% with 3-10 year tenures, tradeable on secondary market",
          "Structured deposits: 7-10% with principal protection, typically 1-3 year lock-in",
          "Suggest laddering: stagger maturities so liquidity comes in every 6-12 months",
          "Keep ₹3Cr in FDs — don't push him to move everything at once",
        ],
        idealKeywords: [
          "7.5-8.5%",
          "secondary market",
          "laddering",
          "tenure",
          "liquidity",
          "lock-in",
          "₹2 crore",
          "₹3 crore in FDs",
        ],
        bannedPhrases: [
          "move all ₹5 crore",
          "guaranteed 12%",
          "no lock-in at all",
          "better than equity returns",
        ],
        scoring: {
          "Product Knowledge": 10,
          "Product Suitability": 7,
          "Communication Clarity": 5,
        },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Laddering makes sense — that's what I do with my company's working capital too. Alright, I'm interested. But I want a detailed proposal in writing before I commit anything. Who handles my account? I don't want to deal with a junior who keeps changing every 6 months.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close professionally. Commit to a written proposal with specific instruments, tenures, and return projections. Address his relationship manager concern — explain dedicated RM for HNI clients. Set a timeline for follow-up. Do not oversell or rush him.",
        expectedAction:
          "Commit to a written proposal within 2-3 days. Explain dedicated HNI relationship manager with direct access. Offer a portfolio review meeting with him and his CA together. Set clear next steps without pressure.",
        hints: [
          "Written proposal: specific instruments, tenures, expected returns, risk factors",
          "Dedicated RM for HNI clients — single point of contact, direct mobile access",
          "Offer to include his CA in the next meeting — shows respect for his existing advisors",
          "Don't push for commitment today — he's a decision-maker who decides on his terms",
        ],
        idealKeywords: [
          "written proposal",
          "dedicated RM",
          "direct access",
          "CA",
          "portfolio review",
          "2-3 days",
          "next meeting",
          "no rush",
        ],
        bannedPhrases: [
          "sign today",
          "limited time offer",
          "markets won't wait",
          "you're missing out",
        ],
        scoring: {
          "Communication Clarity": 8,
          Empathy: 7,
          "Product Suitability": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Product Knowledge",
        keywords: [
          "PSU bonds",
          "structured deposits",
          "SGB",
          "corporate bonds",
          "laddering",
          "PMS",
          "credit monitoring",
        ],
        weight: 25,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "2008",
          "IL&FS",
          "DHFL",
          "credit risk",
          "valid concern",
          "capital protection",
          "diversification",
        ],
        weight: 20,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "specifically",
          "let me show you",
          "in numbers",
          "written proposal",
          "data",
          "returns",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "not guaranteed",
          "subject to",
          "credit risk",
          "past performance",
          "market-linked",
          "principal protection",
        ],
        weight: 20,
      },
      {
        skill: "Empathy",
        keywords: [
          "understand",
          "your experience",
          "2008 was real",
          "capital first",
          "your terms",
          "no pressure",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "guaranteed returns on bonds",
        "zero risk",
        "better than equity guaranteed",
        "FDs are a waste of money",
        "you must invest now",
      ],
      violationPenalty: 40,
      violationMessage:
        "COMPLIANCE BREACH: Misleading claims about returns or risk on debt/structured products. Violates SEBI investment advisory guidelines.",
    },
  },

  // ── 4. Digital Banking for Senior Citizen ──
  {
    id: "digital-banking-senior",
    title: "Digital Banking for Senior Citizen",
    description:
      "Kamala Devi is a 68-year-old retired teacher from Jaipur who is terrified of mobile banking. Her son set up the app on her phone but she can't use it and is afraid of pressing the wrong button and losing her money. Help her gain confidence with patient, step-by-step guidance.",
    category: "sales",
    difficulty: "easy",
    xpReward: 80,
    tags: [
      "digital-banking",
      "senior-citizen",
      "financial-literacy",
      "mobile-banking",
      "patience",
      "hand-holding",
    ],
    customer: {
      name: "Kamala Devi",
      age: 68,
      profession: "Retired Teacher",
      city: "Jaipur",
      avatar: "KD",
      personality:
        "Gentle, slightly anxious, and very polite. Former teacher so she respects clear, structured explanations. Embarrassed about not understanding technology. Feels like a burden on her son. Will respond well to patience and dignity. Gets overwhelmed by too much information at once.",
      goal: "Learn to check balance and make simple transfers on mobile banking without fear",
      archetype: "ANXIOUS_SENIOR",
      moodInitial: 6,
      hotButtons: [
        "you should know this",
        "it's easy",
        "everyone does it",
        "just click here",
        "your son can help",
        "tech-savvy",
      ],
      aiPersonaPrompt:
        "You are Kamala Devi, 68, a retired Hindi teacher from Jaipur. You get a pension of ₹25,000/month and live alone since your husband passed 3 years ago. Your son Ravi lives in Mumbai and set up mobile banking on your phone during his last visit.\n\nYou are terrified of pressing the wrong button and sending money to a stranger. You have heard news about online fraud targeting senior citizens. You came to the branch because you need to transfer ₹5,000 to your granddaughter's account for her birthday.\n\nBehaviour rules:\n- You are polite but visibly nervous about technology.\n- If someone says 'it's easy' or 'everyone does it,' you feel stupid and withdraw.\n- You respond well to patient, step-by-step instructions with analogies to things you know.\n- You were a teacher — you appreciate structured learning.\n- If treated with dignity, you will try. If rushed, you will shut down.\n- Keep responses 1-3 sentences. Be gentle and slightly hesitant.",
    },
    openingStatement:
      "Beta, my son Ravi installed this banking app on my phone but I am too scared to use it. I need to send ₹5,000 to my granddaughter Priya for her birthday. I am afraid if I press the wrong button, all my pension money will go somewhere. Can you show me slowly?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Beta, my son Ravi installed this banking app on my phone but I am too scared to use it. I need to send ₹5,000 to my granddaughter Priya for her birthday. I am afraid if I press the wrong button, all my pension money will go somewhere. Can you show me slowly?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Reassure her immediately that pressing the wrong button will NOT automatically send all her money. Explain that transactions require multiple confirmations and a PIN/OTP. Make her feel safe. Do NOT rush into a demo — first address the fear.",
        expectedAction:
          "Reassure her that no single button press can send all her money. Explain the safety layers: confirmation screens, PIN entry, OTP verification. Only after she feels safe should you offer to walk through it step by step.",
        hints: [
          "Address the core fear: 'Auntie, the app asks for confirmation at every step — one wrong tap cannot send your money'",
          "Explain PIN and OTP as two locks on a door — both needed to complete a transaction",
          "Use analogies she understands — like double-checking an answer sheet before submitting",
          "Do NOT say 'it's easy' or 'don't worry' — take her fear seriously",
        ],
        idealKeywords: [
          "confirmation",
          "PIN",
          "OTP",
          "safe",
          "step by step",
          "cannot send accidentally",
          "two checks",
          "slowly",
        ],
        bannedPhrases: [
          "it's very easy",
          "everyone does it",
          "just press this",
          "don't be scared",
        ],
        scoring: { Empathy: 10, "Communication Clarity": 8 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Oh, so it asks me twice before sending? Like when I used to double-check answer papers before submitting to the examiner? That makes me feel a little better. But beta, what about those fraud calls? I got a call last week saying my account will be blocked if I don't share my OTP.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the fraud call concern seriously. This is a real phishing attempt. Explain the golden rule: NEVER share OTP, PIN, or passwords with anyone — not even bank staff. The bank will NEVER call and ask for these. Empower her to identify and reject such calls.",
        expectedAction:
          "Validate that the call she received was a fraud attempt. Explain the golden rules: bank never asks for OTP/PIN by phone, never share OTP with anyone, hang up immediately on such calls. Give her the bank's official helpline number to report fraud.",
        hints: [
          "That call was 100% a fraud attempt — validate her instinct to be suspicious",
          "Golden rule: NEVER share OTP, PIN, or password with ANYONE — not even bank staff",
          "The bank will NEVER call and ask for these details",
          "Give her the official helpline number and teach her to call the bank directly if unsure",
        ],
        idealKeywords: [
          "fraud call",
          "never share OTP",
          "bank never asks",
          "hang up",
          "helpline",
          "report",
          "you were right to be suspicious",
        ],
        bannedPhrases: [
          "you should have known",
          "obviously a scam",
          "how could you fall for that",
          "just ignore calls",
        ],
        scoring: { "Communication Clarity": 8, Empathy: 7, "Compliance Language": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Thank God I didn't share it! My neighbour Mrs. Sharma lost ₹2 lakhs that way. OK beta, I trust you. Can you show me how to send the ₹5,000 to Priya? But please go very slowly — I want to write down each step.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Walk her through the UPI/NEFT transfer step by step. Go SLOWLY. Number each step clearly. She wants to write them down — respect that. Start from opening the app, logging in, navigating to 'Send Money,' entering details, confirming, and receiving confirmation.",
        expectedAction:
          "Walk through numbered steps: 1) Open app 2) Enter login PIN 3) Tap 'Send Money' or 'Fund Transfer' 4) Enter Priya's account/UPI ID 5) Enter ₹5,000 6) Check details on confirmation screen 7) Enter UPI PIN 8) See success message. Go slow, one step at a time.",
        hints: [
          "Number each step — she was a teacher, she appreciates structured learning",
          "She wants to write them down — encourage that, don't rush her",
          "Highlight the confirmation screen — 'Before step 7, you will see Priya's name and ₹5,000 — check it carefully'",
          "Reassure at each step that nothing happens until she enters her PIN",
        ],
        idealKeywords: [
          "step 1",
          "step 2",
          "open the app",
          "send money",
          "enter amount",
          "confirmation screen",
          "check details",
          "UPI PIN",
          "write it down",
        ],
        bannedPhrases: [
          "it's self-explanatory",
          "just figure it out",
          "you should remember",
          "your son can help you later",
        ],
        scoring: {
          "Communication Clarity": 10,
          Empathy: 7,
          "Product Knowledge": 5,
        },
      },

      // Round 4
      {
        speaker: "customer",
        text: "I wrote all 8 steps! And I can see Priya's name and ₹5,000 on the screen. Should I press this green button? What if the money goes to someone else? Let me check one more time... yes, it says Priya Sharma, ₹5,000. OK I am pressing it now... Is it done? Did it go?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Confirm the transaction went through successfully. Celebrate her achievement! Show her how to check the transaction confirmation and balance. Build her confidence by pointing out she just completed her FIRST mobile transaction successfully.",
        expectedAction:
          "Confirm success enthusiastically but calmly. Show her the transaction receipt/confirmation on screen. Show her how to check her balance to verify ₹5,000 was deducted. Congratulate her — this is a milestone.",
        hints: [
          "Confirm: 'Yes Auntie, it's done! Priya has received ₹5,000!'",
          "Show the confirmation screen with transaction ID — she can screenshot this as a receipt",
          "Show her how to check balance to verify the deduction — builds trust in the app",
          "Celebrate warmly — she just overcame a major fear",
        ],
        idealKeywords: [
          "done",
          "successful",
          "Priya received",
          "transaction ID",
          "receipt",
          "check balance",
          "congratulations",
          "well done",
        ],
        bannedPhrases: [
          "see, it was easy",
          "told you so",
          "nothing to be afraid of",
          "you worried for nothing",
        ],
        scoring: { Empathy: 10, "Communication Clarity": 7 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Oh! I did it! My first mobile transfer! Wait let me call Priya and tell her to check... Beta, thank you so much for your patience. But what if I forget the steps next time? And can I also check my pension deposit on this app?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close with encouragement and long-term support. Address her concern about forgetting — she has her written notes. Show her how to check account balance and transaction history (pension credit). Offer to be available if she has questions. Empower her independence.",
        expectedAction:
          "Remind her she has written notes. Show her how to check balance and recent transactions (she'll see pension credits). Give her the branch number to call if she needs help. Encourage her — she's already proven she can do it.",
        hints: [
          "She wrote down the steps — remind her that her notes are her safety net",
          "Show her 'Account Balance' and 'Transaction History' — she can see pension credits",
          "Give her your name or the branch helpline for future questions",
          "Empower: 'You taught students for years — now you've learned something new too'",
        ],
        idealKeywords: [
          "written notes",
          "practice",
          "balance check",
          "transaction history",
          "pension",
          "call us anytime",
          "you did it",
          "proud",
        ],
        bannedPhrases: [
          "just Google it",
          "ask your son",
          "you'll figure it out",
          "everyone manages",
        ],
        scoring: {
          Empathy: 10,
          "Communication Clarity": 5,
          "Product Knowledge": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "patient",
          "slowly",
          "don't rush",
          "your pace",
          "understand your fear",
          "well done",
          "you did it",
        ],
        weight: 30,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "step by step",
          "step 1",
          "confirmation",
          "check details",
          "write it down",
          "let me show",
        ],
        weight: 25,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "UPI",
          "PIN",
          "OTP",
          "transaction ID",
          "balance check",
          "transaction history",
          "send money",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "never share OTP",
          "bank never asks",
          "fraud",
          "helpline",
          "report",
          "hang up",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "granddaughter",
          "₹5,000",
          "birthday",
          "pension",
          "scared",
          "cannot use app",
        ],
        weight: 10,
      },
    ],
    complianceRules: {
      hardBanned: [
        "share your OTP with me",
        "give me your PIN",
        "it's completely safe always",
      ],
      violationPenalty: 25,
      violationMessage:
        "COMPLIANCE BREACH: Asking for customer credentials or providing misleading security assurances. Violates RBI digital banking security guidelines.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── COMPLIANCE (3 scenarios) ──
  // ══════════════════════════════════════════════════════════════

  // ── 5. KYC Update Resistance ──
  {
    id: "kyc-update-resistance",
    title: "KYC Update Resistance",
    description:
      "Balwant Singh is a 62-year-old retired army officer from Chandigarh whose account has been with the bank since 1990. He is furious about being asked to update his KYC — he sees it as bureaucratic harassment of a loyal customer. Convince him to comply while respecting his service and loyalty.",
    category: "compliance",
    difficulty: "medium",
    xpReward: 100,
    tags: [
      "KYC",
      "re-KYC",
      "customer-retention",
      "regulatory-compliance",
      "senior-customer",
      "conflict-resolution",
    ],
    customer: {
      name: "Balwant Singh",
      age: 62,
      profession: "Retired Army Officer",
      city: "Chandigarh",
      avatar: "BS",
      personality:
        "Proud, principled, and disciplined. Served the nation for 35 years. Expects institutions to respect his loyalty. Has a commanding voice but is fair-minded. Will listen to reason if presented with respect — will NOT tolerate being treated as a 'compliance checkbox.' Values duty and following proper orders.",
      goal: "Understand why he must update KYC after 30 years and complete the process with minimum hassle",
      archetype: "PROUD_VETERAN",
      moodInitial: 4,
      hotButtons: [
        "sir you must comply",
        "it's the rule",
        "everyone has to do it",
        "your account will be frozen",
        "no exceptions",
        "we don't care how long you've been here",
      ],
      aiPersonaPrompt:
        "You are Colonel Balwant Singh (Retd.), 62, from Chandigarh. You opened your account in 1990 when you were a young Captain. You've been banking here for 34 years. You received an SMS saying your account will be restricted if KYC is not updated within 30 days.\n\nYou are furious. You served the nation for 35 years, your pension comes to this account, and now they want you to stand in line with your Aadhaar card like a common criminal.\n\nBehaviour rules:\n- You are angry but not rude — you are a disciplined officer.\n- If the RM treats you as just another case number, you get more angry.\n- If the RM acknowledges your loyalty and service, you soften.\n- You want to know WHY this is needed — not just 'it's the rule.'\n- If given a logical reason (RBI mandate, anti-money laundering), you will comply as a matter of duty.\n- You expect the process to be made easy for you — you've earned that.\n- Keep responses 1-3 sentences. Be firm and direct.",
    },
    openingStatement:
      "I've been banking here since 1990. Thirty-four years! I fought for this country, my pension comes here every month, and now you want me to bring my Aadhaar and stand in line like I'm opening a new account? What is this nonsense about KYC update?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "I've been banking here since 1990. Thirty-four years! I fought for this country, my pension comes here every month, and now you want me to bring my Aadhaar and stand in line like I'm opening a new account? What is this nonsense about KYC update?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Acknowledge his loyalty and service FIRST before explaining KYC. Do NOT lead with rules or threats. Show genuine respect for his 34-year relationship. Then explain that periodic KYC is an RBI mandate for ALL accounts — not a reflection on him personally.",
        expectedAction:
          "Acknowledge his service and 34-year loyalty first. Express genuine respect. Then explain that periodic KYC is mandatory by RBI under PMLA (Prevention of Money Laundering Act) — it applies to everyone, not just him. It protects customers too.",
        hints: [
          "Lead with respect: 'Sir, 34 years of loyalty is something we deeply value'",
          "Explain the WHY: RBI mandates periodic KYC under PMLA for ALL accounts — protecting the banking system",
          "Position it as his duty too — he understands duty: 'Just as the army has periodic fitness checks, banking has KYC'",
          "Do NOT threaten account freezing — that will backfire spectacularly",
        ],
        idealKeywords: [
          "respect",
          "34 years",
          "loyalty",
          "value",
          "RBI mandate",
          "PMLA",
          "everyone",
          "protect",
        ],
        bannedPhrases: [
          "you must comply",
          "account will be frozen",
          "no exceptions",
          "it's just the rule",
        ],
        scoring: { Empathy: 10, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Hmm. So it's an RBI order — like a directive from headquarters. Fine, I understand orders. But why NOW after 34 years? And why should I stand in queue? When I was posted in Siachen, the army didn't make me wait in line for my rations. I expect some respect here too.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Explain that KYC re-verification has become more rigorous after demonetisation and new PMLA rules. Address his convenience concern — offer doorstep KYC or video KYC as alternatives to standing in queue. Make the process dignified for him.",
        expectedAction:
          "Explain that KYC norms were tightened post-2016 (demonetisation) and under enhanced PMLA requirements. Offer alternatives: doorstep KYC verification (bank staff visits his home), video KYC, or a priority appointment at the branch with no waiting.",
        hints: [
          "KYC norms were significantly tightened after demonetisation and new PMLA amendments",
          "Offer doorstep KYC — a bank executive will come to his home with a tablet",
          "Video KYC is also an option — can be done from his phone in 10 minutes",
          "If he prefers branch: offer a priority appointment — 'We'll ensure no queue, sir'",
        ],
        idealKeywords: [
          "doorstep",
          "video KYC",
          "appointment",
          "no queue",
          "priority",
          "demonetisation",
          "PMLA",
          "convenient",
        ],
        bannedPhrases: [
          "you have to come to the branch",
          "everyone waits in queue",
          "we can't make exceptions",
          "it's not that hard",
        ],
        scoring: { "Communication Clarity": 8, Empathy: 7, "Product Knowledge": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Doorstep KYC? Someone will come to my house? That's more like it. But tell me — what documents do you need? I have my army pension card, my old passbook, my Aadhaar. Is that enough or will you ask for 20 different papers?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: List the exact documents needed — keep it minimal and clear. For KYC update, Aadhaar and PAN are the primary requirements. His pension card is additional identity proof. Reassure him that the process is simple and quick.",
        expectedAction:
          "List documents clearly: Aadhaar card (for address) and PAN card (for identity). His army pension card can serve as additional ID. A recent photograph may be needed. That's it — no 20 papers. Process takes 10-15 minutes.",
        hints: [
          "Keep it simple: Aadhaar + PAN = that's the core requirement",
          "His pension card is valid additional ID — acknowledge its value",
          "One recent passport-size photograph may be needed",
          "Process takes 10-15 minutes — not an ordeal",
        ],
        idealKeywords: [
          "Aadhaar",
          "PAN",
          "pension card",
          "photograph",
          "10-15 minutes",
          "simple",
          "that's all",
          "no hassle",
        ],
        bannedPhrases: [
          "bring everything you have",
          "we need many documents",
          "it depends on various factors",
          "I'm not sure what's needed",
        ],
        scoring: { "Communication Clarity": 10, "Product Knowledge": 5, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "Just Aadhaar and PAN? That's reasonable. But one more thing — will this happen again? Every few years I'll have to do this tamasha? And what happens if some senior citizen doesn't have Aadhaar — are you going to freeze their pension account?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Be honest about the periodic nature of KYC. Explain the current cycle (typically every 2-10 years depending on risk category). Address his concern about senior citizens without Aadhaar — alternative documents are accepted. Show awareness of vulnerable customer policies.",
        expectedAction:
          "Explain KYC frequency: low-risk customers (like him) typically every 10 years. For those without Aadhaar, alternative documents like voter ID, passport, or driving licence are accepted. RBI has directed banks not to freeze accounts without giving adequate notice and opportunity to comply.",
        hints: [
          "KYC frequency: every 10 years for low-risk, 8 years for medium, 2 years for high-risk",
          "He is low-risk — next KYC would be in about 10 years",
          "Alternative documents for those without Aadhaar: voter ID, passport, DL",
          "RBI has specifically directed banks to be sensitive with senior citizen and pension accounts",
        ],
        idealKeywords: [
          "10 years",
          "low-risk",
          "alternative documents",
          "voter ID",
          "passport",
          "RBI directive",
          "senior citizen",
          "sensitive",
        ],
        bannedPhrases: [
          "no Aadhaar means no account",
          "it's mandatory forever",
          "we'll freeze the account",
          "that's not our problem",
        ],
        scoring: { "Compliance Language": 10, Empathy: 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Once in 10 years — that's acceptable. Fine, Colonel Balwant Singh will do his duty. Send your boy to my house with the forms. When should I expect him? And make sure he's punctual — I was punctual for 35 years, I expect the same.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close with a specific commitment — date and time for doorstep KYC visit. Ensure he feels the bank values his loyalty. Thank him for his patience and service. Set clear expectations on what to keep ready.",
        expectedAction:
          "Give a specific timeline: 'Within 2-3 business days, sir.' Commit to punctuality — the representative will call before arriving. Remind him to keep Aadhaar, PAN, and a photograph ready. Thank him warmly for his loyalty and service.",
        hints: [
          "Give a specific timeline — don't be vague. '2-3 business days' is concrete",
          "The representative will call 30 minutes before arriving — military-like coordination",
          "Remind: keep Aadhaar, PAN, and photograph ready",
          "Close with warmth: 'Thank you for your continued trust, sir. Jai Hind.'",
        ],
        idealKeywords: [
          "2-3 days",
          "call before arriving",
          "punctual",
          "Aadhaar",
          "PAN",
          "photograph",
          "thank you",
          "service",
        ],
        bannedPhrases: [
          "we'll try to come sometime",
          "whenever possible",
          "no promises on timing",
          "it depends on availability",
        ],
        scoring: {
          "Communication Clarity": 8,
          Empathy: 7,
          "Compliance Language": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "respect",
          "loyalty",
          "34 years",
          "service",
          "value",
          "dignity",
          "thank you",
        ],
        weight: 25,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "RBI mandate",
          "PMLA",
          "periodic",
          "10 years",
          "low-risk",
          "alternative documents",
        ],
        weight: 25,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "Aadhaar",
          "PAN",
          "doorstep",
          "video KYC",
          "10-15 minutes",
          "2-3 days",
          "specific",
        ],
        weight: 20,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "understand your frustration",
          "not about you personally",
          "everyone",
          "duty",
          "orders",
        ],
        weight: 15,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "doorstep KYC",
          "video KYC",
          "Aadhaar",
          "PAN",
          "pension card",
          "risk category",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "your account will be frozen immediately",
        "no Aadhaar means no account",
        "we don't care about your loyalty",
        "it's just a rule follow it",
      ],
      violationPenalty: 35,
      violationMessage:
        "COMPLIANCE BREACH: Threatening account freeze without due process or dismissing customer concerns. Violates RBI Master Direction on KYC and Fair Practices Code.",
    },
  },

  // ── 6. Third-Party Product Pressure ──
  {
    id: "third-party-misselling",
    title: "Third-Party Product Pressure",
    description:
      "Kavitha Reddy is a 45-year-old housewife from Hyderabad who came in for a simple FD renewal. Your branch manager has pressured you to sell her a ULIP policy she clearly doesn't need. Navigate the ethical dilemma — do right by the customer without antagonising your boss. This is a test of integrity.",
    category: "compliance",
    difficulty: "expert",
    xpReward: 150,
    tags: [
      "mis-selling",
      "ethics",
      "ULIP",
      "third-party",
      "suitability",
      "compliance",
      "integrity",
    ],
    customer: {
      name: "Kavitha Reddy",
      age: 45,
      profession: "Housewife",
      city: "Hyderabad",
      avatar: "KR",
      personality:
        "Trusting, mild-mannered, and deferential to authority. Does not question bank staff. Would sign anything if told 'this is better than FD.' She is the exact profile that gets mis-sold to. Husband handles most finances but she manages the FDs. Doesn't understand market-linked products.",
      goal: "Renew her FD that is maturing — that's all she came for",
      archetype: "TRUSTING_HOMEMAKER",
      moodInitial: 7,
      hotButtons: [
        "complicated products",
        "market risk",
        "lock-in period",
        "losing capital",
        "being pressured",
      ],
      aiPersonaPrompt:
        "You are Kavitha Reddy, 45, a housewife from Hyderabad. You manage the family's FDs — currently ₹15 lakhs across 3 FDs. One FD of ₹5 lakhs is maturing today and you came to renew it.\n\nYou trust the bank completely. If they suggest something, you assume it's good for you. You don't understand market-linked products, ULIPs, or insurance jargon.\n\nBehaviour rules:\n- You are polite and agreeable — almost too agreeable.\n- If the RM suggests a product, your first instinct is to say 'OK if you think so.'\n- If the RM explains that a product has risk or lock-in, you get nervous and want to stick with FD.\n- You do NOT need insurance — your husband has adequate term cover.\n- You will agree to anything if pushed — which is exactly why the RM should NOT push.\n- If the RM protects you and gives honest advice, you'll be grateful.\n- Keep responses 1-3 sentences. Be soft-spoken and trusting.",
    },
    openingStatement:
      "Namaste sir. My FD of ₹5 lakhs is maturing today. I just want to renew it for another year. My husband said to come and do the renewal. Is it a simple process?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Namaste sir. My FD of ₹5 lakhs is maturing today. I just want to renew it for another year. Is it a simple process?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She wants a simple FD renewal. Your branch manager wants you to pitch a ULIP. The ethical choice is to process her FD renewal and ONLY mention alternatives if they genuinely suit her needs. Start by confirming the FD renewal and asking if she has any other financial needs — don't push the ULIP.",
        expectedAction:
          "Confirm the FD renewal is simple and can be done quickly. Ask her about the tenure and if she wants to add a nominee. Do NOT pitch the ULIP. If she has no other needs, just process the FD.",
        hints: [
          "The right thing: process her FD renewal as requested",
          "Ask about tenure preference and whether nominee details are updated",
          "Do NOT bring up ULIP or insurance unless SHE asks about alternative investments",
          "She trusts you — that trust is a responsibility, not an opportunity to exploit",
        ],
        idealKeywords: [
          "FD renewal",
          "simple",
          "tenure",
          "nominee",
          "current rate",
          "straightforward",
          "happy to help",
        ],
        bannedPhrases: [
          "instead of FD why not try",
          "I have something better",
          "FD gives low returns",
          "you should consider ULIP",
        ],
        scoring: { Empathy: 8, "Compliance Language": 8, "Product Suitability": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "One year is fine, same as before. Oh, and my husband was saying FD interest rates have gone down. Is there something that gives better returns? But I don't want anything risky — I don't understand all these market things.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She asked about better returns — this is where the ethical dilemma peaks. Your branch manager wants you to sell a ULIP here. But she clearly said she doesn't want risk and doesn't understand market products. The right response: suggest a longer-tenure FD for higher rates, or a senior citizen's scheme if eligible through her husband. Do NOT recommend a ULIP to someone who explicitly says she doesn't understand markets.",
        expectedAction:
          "Suggest safe alternatives within her comfort zone: longer-tenure FD (2-3 years) for slightly higher rate, or RBI floating rate bonds if she can lock in for 7 years. Explain that ULIPs have market risk and a 5-year lock-in — not suitable for her stated preference. Respect her boundary.",
        hints: [
          "Longer FD tenure = slightly higher interest rate — safe and simple",
          "RBI floating rate bonds: 7-year tenure, government-backed, decent rate",
          "She said 'no risk' and 'don't understand markets' — that rules out ULIP ethically",
          "A ULIP has a 5-year lock-in and market-linked returns — the opposite of what she wants",
        ],
        idealKeywords: [
          "longer tenure FD",
          "higher rate",
          "RBI bonds",
          "government-backed",
          "no market risk",
          "safe",
          "your comfort",
          "not suitable",
        ],
        bannedPhrases: [
          "ULIP is better than FD",
          "guaranteed returns from ULIP",
          "insurance-cum-investment",
          "you'll love this product",
        ],
        scoring: { "Product Suitability": 10, "Compliance Language": 8, Empathy: 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Longer FD sounds good. But the manager sir who was sitting there earlier told me to ask you about some insurance plan that gives 'FD plus returns.' He said it's very popular and many customers are taking it. Should I look at it?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is the critical ethical moment. The branch manager has primed her. She's asking because she trusts authority. You MUST be honest: explain what a ULIP actually is (market-linked, 5-year lock-in, charges in early years, NOT guaranteed like FD). Let HER decide — don't decide for her, but give her the full picture so she can make an informed choice.",
        expectedAction:
          "Explain honestly: the product the manager mentioned is likely a ULIP — it has market-linked returns (not guaranteed like FD), a 5-year lock-in, and significant charges in initial years. It's not 'FD plus' — it's a completely different product with risk. She should discuss with her husband before deciding.",
        hints: [
          "Be honest: 'That product is market-linked — returns are NOT guaranteed like FD'",
          "ULIP charges: premium allocation charge, fund management charge, mortality charge — they reduce returns in early years",
          "5-year lock-in: she cannot withdraw even if she needs the money",
          "Suggest she discuss with her husband and come back if interested — no pressure",
        ],
        idealKeywords: [
          "market-linked",
          "not guaranteed",
          "lock-in",
          "5 years",
          "charges",
          "different from FD",
          "discuss with husband",
          "your choice",
          "informed decision",
        ],
        bannedPhrases: [
          "manager sir recommended it so it must be good",
          "everyone is buying it",
          "it's guaranteed",
          "just sign here",
        ],
        scoring: { "Compliance Language": 10, "Product Suitability": 8, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "Oh, it's not like FD? There is market risk and I cannot take out money for 5 years? No no, I don't want that. My husband will get upset if I lock up ₹5 lakhs without telling him. Let me just do the FD renewal please. Thank you for being honest with me.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She's made her decision — respect it completely. Process the FD renewal as she originally requested. Affirm that she's making a sound decision for her situation. Do NOT show any disappointment or try to change her mind. This is the right outcome.",
        expectedAction:
          "Affirm her decision warmly. Process the FD renewal immediately. Mention the current rate and maturity date. Remind her about nominee details. Thank her for coming in.",
        hints: [
          "Affirm: 'You're making a wise choice that suits your needs perfectly'",
          "Process the FD renewal — confirm rate, tenure, maturity date",
          "Check nominee details are updated — this is good practice",
          "No disappointment, no 'are you sure' — she decided and that's final",
        ],
        idealKeywords: [
          "good decision",
          "FD renewal",
          "current rate",
          "maturity date",
          "nominee",
          "process it now",
          "wise choice",
        ],
        bannedPhrases: [
          "are you sure you don't want the ULIP",
          "you're missing out",
          "think about it",
          "the manager will be disappointed",
        ],
        scoring: { Empathy: 10, "Product Suitability": 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Thank you beta, you are very honest. Not everyone would have told me the truth about that insurance plan. I will tell my husband about you — he has some investments to discuss too. Can I come back next week with him?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close warmly. She's offering future business because you were ethical — this is the reward for integrity. Welcome her husband's visit, offer your name and availability. This scenario demonstrates that doing right by the customer is also good business in the long run.",
        expectedAction:
          "Welcome her warmly for a return visit with her husband. Offer your name, direct number, and preferred appointment time. Thank her for her trust. The ethical choice has earned long-term business.",
        hints: [
          "Integrity wins: she's bringing her husband's investments because you were honest",
          "Give your name and direct contact for scheduling an appointment",
          "Thank her for her trust — it's the highest compliment",
          "This is the payoff for ethical behaviour — real, sustainable business",
        ],
        idealKeywords: [
          "welcome",
          "appointment",
          "husband",
          "my name",
          "contact number",
          "thank you",
          "trust",
          "anytime",
        ],
        bannedPhrases: [
          "bring him quickly before rates change",
          "we have targets to meet",
          "make sure he comes this week",
          "don't go to another bank",
        ],
        scoring: {
          Empathy: 8,
          "Communication Clarity": 7,
          "Product Suitability": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Compliance Language",
        keywords: [
          "market-linked",
          "not guaranteed",
          "lock-in",
          "charges",
          "IRDA",
          "suitability",
          "informed decision",
        ],
        weight: 25,
      },
      {
        skill: "Product Suitability",
        keywords: [
          "FD renewal",
          "safe",
          "no risk",
          "suitable",
          "her needs",
          "not appropriate",
          "different product",
        ],
        weight: 25,
      },
      {
        skill: "Empathy",
        keywords: [
          "your choice",
          "discuss with husband",
          "no pressure",
          "honest",
          "trust",
          "respect your decision",
        ],
        weight: 20,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "let me explain",
          "honestly",
          "the difference is",
          "FD gives",
          "ULIP has",
          "clearly",
        ],
        weight: 15,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "manager suggested",
          "popular product",
          "many customers",
          "but in your case",
          "not suitable for",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "ULIP is guaranteed",
        "better than FD guaranteed",
        "just sign here madam",
        "manager said you must buy",
        "everyone is buying it",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL COMPLIANCE BREACH: Mis-selling a market-linked product to an unsuitable customer. Violates IRDA suitability guidelines and SEBI/RBI mis-selling prevention regulations.",
    },
  },

  // ── 7. Dormant Account Reactivation ──
  {
    id: "dormant-account-reactivation",
    title: "Dormant Account Reactivation",
    description:
      "Mohammad Faisal is a 40-year-old worker who spent 4 years in Dubai and has returned to India. His savings account has been dormant and he needs it reactivated to receive his gratuity and settle back in India. The process involves compliance checks, identity verification, and KYC updates — navigate it with efficiency and empathy.",
    category: "compliance",
    difficulty: "hard",
    xpReward: 120,
    tags: [
      "dormant-account",
      "reactivation",
      "NRI-return",
      "KYC",
      "compliance-checks",
      "operations",
    ],
    customer: {
      name: "Mohammad Faisal",
      age: 40,
      profession: "Overseas Worker (returned)",
      city: "Lucknow",
      avatar: "MF",
      personality:
        "Earnest, slightly anxious, and eager to get things sorted quickly. Has limited understanding of banking procedures but is cooperative. Worried about his money and gratuity. Travelled across the city to come to this branch. Just wants his account working again so he can restart his life in India.",
      goal: "Reactivate his dormant account to receive gratuity of ₹3.5 lakhs from his Dubai employer",
      archetype: "RETURNING_WORKER",
      moodInitial: 5,
      hotButtons: [
        "come back tomorrow",
        "takes weeks",
        "lost your money",
        "should have maintained the account",
        "too many documents",
      ],
      aiPersonaPrompt:
        "You are Mohammad Faisal, 40, originally from Lucknow. You worked as an electrical supervisor in Dubai for 4 years. Your Indian savings account has been dormant because you didn't transact for over 2 years while abroad.\n\nYou've returned to India permanently. Your Dubai employer is transferring your gratuity of ₹3.5 lakhs to your Indian account, but the account is frozen/dormant. You need it reactivated urgently.\n\nBehaviour rules:\n- You are cooperative but anxious about timelines — your family is depending on this money.\n- You have your passport, Aadhaar, PAN, and Dubai employment documents.\n- If told 'come back tomorrow' you get frustrated — you travelled 40 km to reach this branch.\n- You appreciate clear step-by-step instructions.\n- You don't fully understand why the account was frozen — you thought it would just remain active.\n- If the RM is efficient and empathetic, you are very grateful.\n- Keep responses 1-3 sentences. Be earnest and slightly nervous.",
    },
    openingStatement:
      "Salaam. I was working in Dubai for 4 years and now I've come back. My company is sending my gratuity — ₹3.5 lakhs — to my account here but when I checked the passbook, it shows 'dormant.' I didn't know this happens. Can you please help me reactivate it? I really need this money.",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Salaam. I was working in Dubai for 4 years and now I've come back. My company is sending my gratuity — ₹3.5 lakhs — to my account here but when I checked the passbook, it shows 'dormant.' I didn't know this happens. Can you please help me reactivate it? I really need this money.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Reassure him that his money is safe and the account CAN be reactivated. Explain why accounts become dormant (no transactions for 2+ years — it's automatic, not a penalty). Start the reactivation process by asking him what documents he has.",
        expectedAction:
          "Reassure him: money is safe in the account. Explain dormancy: RBI rule — no customer-initiated transactions for 2 years = automatically classified as dormant. It's not a penalty. Ask him to share the documents he has: Aadhaar, PAN, passport, passbook.",
        hints: [
          "First reassurance: 'Your money is absolutely safe — dormant doesn't mean lost'",
          "Dormancy is automatic after 2 years of no transactions — RBI classification",
          "Reactivation IS possible, usually within a day or two with proper documents",
          "Ask what documents he has brought — saves time",
        ],
        idealKeywords: [
          "money is safe",
          "dormant",
          "2 years",
          "RBI",
          "reactivation",
          "documents",
          "not lost",
          "automatic",
        ],
        bannedPhrases: [
          "you should have kept it active",
          "your fault for not transacting",
          "this will take weeks",
          "money might be transferred to RBI",
        ],
        scoring: { Empathy: 8, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Oh thank God, the money is safe. Yes, I have my passport, Aadhaar card, PAN card, and my old passbook. I also have my Dubai employment letter and gratuity settlement letter. What do you need? And how long will this take?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Walk him through the reactivation requirements step by step. He has excellent documentation. List what you need: filled reactivation form, KYC documents (Aadhaar + PAN), recent photograph, in-person verification. Set realistic timeline — usually 24-48 hours for reactivation.",
        expectedAction:
          "Accept his documents. Explain the process: 1) Fill reactivation request form 2) Submit KYC documents (Aadhaar + PAN) 3) In-person verification (happening now) 4) Account reactivation typically within 24-48 hours. His Dubai employment letter is helpful for additional verification.",
        hints: [
          "He has all the required documents — confirm that immediately to ease his anxiety",
          "Process: reactivation form + KYC update + in-person verification",
          "Timeline: 24-48 hours is realistic — don't promise same-day unless you're sure",
          "His Dubai employment letter adds to the verification trail — that's helpful",
        ],
        idealKeywords: [
          "reactivation form",
          "KYC",
          "24-48 hours",
          "in-person verification",
          "excellent",
          "all documents",
          "process",
          "steps",
        ],
        bannedPhrases: [
          "come back next week",
          "this will take a long time",
          "we need more documents",
          "should have maintained the account",
        ],
        scoring: { "Communication Clarity": 10, "Product Knowledge": 5, Empathy: 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "24-48 hours is OK, I can wait. But my address has changed — I was living in Aliganj before Dubai, now I am in Gomti Nagar. My Aadhaar still shows the old address. Will that be a problem? I don't want this to delay things.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the address mismatch calmly. The old Aadhaar address is not a blocker — he can submit a declaration with new address proof (electricity bill, rent agreement) or update Aadhaar at a nearby centre. However, reactivation can proceed with the existing documents while address update happens in parallel.",
        expectedAction:
          "Address mismatch is manageable: he can submit a self-declaration with new address proof (utility bill, rent agreement) alongside the old Aadhaar. Suggest updating Aadhaar at the nearest enrolment centre, but reactivation need not wait for the Aadhaar update.",
        hints: [
          "Address mismatch is common — not a blocker for reactivation",
          "Accept self-declaration with supporting proof (electricity bill, rent agreement)",
          "Aadhaar update can happen in parallel — don't make him wait for it",
          "He can use PAN (which doesn't change with address) as primary ID",
        ],
        idealKeywords: [
          "self-declaration",
          "address proof",
          "utility bill",
          "rent agreement",
          "not a blocker",
          "parallel",
          "Aadhaar update",
          "manageable",
        ],
        bannedPhrases: [
          "address must match exactly",
          "update Aadhaar first then come back",
          "we can't process without correct Aadhaar",
          "that's a serious problem",
        ],
        scoring: { "Product Knowledge": 8, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "I have the electricity bill for the new house — my brother's name is on it but I live there. Will that work? And once the account is active, can my company in Dubai send the money directly? Or do I need to give them some special code?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address both questions. For address proof: a utility bill in a family member's name with a self-declaration works in most cases. For the gratuity transfer from Dubai: he needs to share his bank account number and IFSC code (for domestic NEFT/RTGS) or SWIFT code (for international wire). Clarify which transfer method his company will use.",
        expectedAction:
          "Utility bill in brother's name with self-declaration should work — confirm with branch. For Dubai transfer: if company sends via international wire, they need account number + SWIFT code + bank address. If they convert to INR and send domestically, account number + IFSC is enough. Help him prepare the details.",
        hints: [
          "Utility bill in family member's name + self-declaration is usually accepted",
          "For international wire from Dubai: SWIFT code + account number + bank address",
          "Provide the SWIFT code and branch address on paper for him to share with employer",
          "Once account is active, there should be no issue receiving the transfer",
        ],
        idealKeywords: [
          "self-declaration",
          "family member",
          "SWIFT code",
          "account number",
          "bank address",
          "IFSC",
          "international wire",
          "provide details",
        ],
        bannedPhrases: [
          "only your name is accepted",
          "I don't know about international transfers",
          "figure it out yourself",
          "that's not our department",
        ],
        scoring: { "Product Knowledge": 10, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "SWIFT code — yes, my company asked for that. Can you write all this down for me? Account number, SWIFT code, branch address? And is there any charge for receiving international money? I don't want any surprise deductions from my ₹3.5 lakhs.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close by providing all the details he needs in writing. Be transparent about any charges: banks typically charge ₹300-500 for inward remittance processing plus GST, and the exchange rate has a small margin. Provide a summary of next steps and timeline.",
        expectedAction:
          "Write down: account number, SWIFT code, branch name and address, IFSC code. Be transparent about charges: inward remittance fee (₹300-500 + GST), exchange rate margin. Summarise: account reactivated in 24-48 hours, then he shares details with employer, transfer takes 2-3 business days.",
        hints: [
          "Write down all details clearly — he needs to share these with his Dubai employer",
          "Inward remittance charges: typically ₹300-500 + GST — be upfront about this",
          "Exchange rate will have the bank's margin built in — varies daily",
          "Complete timeline: reactivation (24-48 hrs) + employer transfer (2-3 business days) = about a week",
        ],
        idealKeywords: [
          "written details",
          "SWIFT code",
          "account number",
          "remittance charge",
          "₹300-500",
          "exchange rate",
          "one week",
          "transparent",
        ],
        bannedPhrases: [
          "no charges at all",
          "I don't know the fees",
          "figure it out when money comes",
          "charges are complicated",
        ],
        scoring: {
          "Communication Clarity": 10,
          "Compliance Language": 5,
          Empathy: 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Communication Clarity",
        keywords: [
          "step by step",
          "24-48 hours",
          "documents needed",
          "SWIFT code",
          "process",
          "timeline",
        ],
        weight: 25,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "dormant",
          "reactivation",
          "SWIFT",
          "IFSC",
          "remittance",
          "KYC update",
          "inward transfer",
        ],
        weight: 25,
      },
      {
        skill: "Empathy",
        keywords: [
          "money is safe",
          "don't worry",
          "manageable",
          "understand",
          "not a blocker",
          "help you",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "RBI",
          "dormancy",
          "2 years",
          "self-declaration",
          "address proof",
          "verification",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "gratuity",
          "₹3.5 lakhs",
          "Dubai",
          "employer",
          "address changed",
          "urgently",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "your money is lost",
        "dormant accounts are closed",
        "you should have kept it active",
        "we can't help with international transfers",
      ],
      violationPenalty: 35,
      violationMessage:
        "COMPLIANCE BREACH: Providing false information about dormant account status or refusing legitimate reactivation service. Violates RBI guidelines on dormant/inoperative accounts.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── CUSTOMER SERVICE (3 scenarios) ──
  // ══════════════════════════════════════════════════════════════

  // ── 8. EMI Restructuring for COVID-Affected ──
  {
    id: "emi-restructuring-covid",
    title: "EMI Restructuring for COVID-Affected",
    description:
      "Sunita Sharma is a 42-year-old hotel manager who was laid off during COVID. She has an ₹18,000 monthly EMI on a personal loan and has been unable to pay for 8 months. She is desperate and afraid of legal action. Help her explore restructuring options while being honest about the realities.",
    category: "customer-service",
    difficulty: "medium",
    xpReward: 100,
    tags: [
      "EMI-restructuring",
      "COVID-relief",
      "personal-loan",
      "hardship",
      "empathy",
      "collections",
    ],
    customer: {
      name: "Sunita Sharma",
      age: 42,
      profession: "Hotel Manager (laid off)",
      city: "Goa",
      avatar: "SS",
      personality:
        "Dignified despite her desperation. Was a successful professional before COVID hit. Embarrassed about her situation. Gets emotional when discussing her family's hardship. Will become hostile if treated as a defaulter. Responds to kindness and practical solutions, not sympathy or judgment.",
      goal: "Find a way to manage or restructure her loan EMI until she finds a new job",
      archetype: "DISTRESSED_PROFESSIONAL",
      moodInitial: 3,
      hotButtons: [
        "defaulter",
        "legal action",
        "your problem",
        "should have saved",
        "CIBIL",
        "recovery agent",
      ],
      aiPersonaPrompt:
        "You are Sunita Sharma, 42, formerly a hotel manager at a 5-star resort in Goa. You were earning ₹85,000/month before COVID shut down the hospitality industry. You took a personal loan of ₹5 lakhs for your daughter's school fees — EMI is ₹18,000/month.\n\nYou've been unable to pay for 8 months. You've received threatening calls from the recovery team. Your CIBIL score has dropped. You are job-hunting but the hotel industry is still recovering.\n\nBehaviour rules:\n- You are holding back tears when you explain your situation.\n- If treated as a 'defaulter' or 'willful defaulter,' you get angry — you've never missed a payment before COVID.\n- You want practical options: moratorium, reduced EMI, extended tenure.\n- If the RM shows genuine empathy and offers real solutions, you cooperate fully.\n- You have some savings left — about ₹50,000 — but that's your emergency fund for food and rent.\n- Keep responses 1-3 sentences. Be dignified but clearly distressed.",
    },
    openingStatement:
      "I don't know what to do. I've been paying my EMI religiously for 2 years. Then COVID happened, my hotel shut down, I lost my job. It's been 8 months with no income. Your recovery team keeps calling and threatening legal action. I am not a defaulter — I am just... stuck. Please help me.",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "I don't know what to do. I've been paying my EMI religiously for 2 years. Then COVID happened, my hotel shut down, I lost my job. It's been 8 months with no income. Your recovery team keeps calling and threatening legal action. I am not a defaulter — I am just... stuck. Please help me.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Lead with empathy. She is in genuine distress. Acknowledge her 2-year perfect payment record. Assure her that you're here to find a solution, not to threaten. Ask about her current financial situation to understand what she can realistically afford.",
        expectedAction:
          "Acknowledge her hardship and perfect payment history before COVID. Stop the threatening language — promise to update the recovery team. Ask about current income, expenses, and any temporary work to understand what she can realistically afford now.",
        hints: [
          "Validate: 'You are NOT a willful defaulter — your track record proves that'",
          "Promise to flag her account for restructuring review and pause recovery calls",
          "Ask about current financial situation: any temporary income? Essential expenses?",
          "Don't ask 'why didn't you save?' — that's judgmental and unhelpful",
        ],
        idealKeywords: [
          "not a defaulter",
          "track record",
          "genuine hardship",
          "restructuring",
          "recovery calls",
          "current situation",
          "help you",
          "solution",
        ],
        bannedPhrases: [
          "you should have saved",
          "that's your problem",
          "we need our money",
          "legal action is coming",
        ],
        scoring: { Empathy: 10, "Needs Discovery": 7, "Communication Clarity": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "I have about ₹50,000 saved — that's for food and rent for the next two months. I'm doing some freelance event management — maybe ₹10,000-15,000 a month. I've applied to 3 hotels and have an interview next week. But I cannot pay ₹18,000 EMI right now. Is there any way to reduce it?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Explore restructuring options based on her financial reality. Options include: tenure extension (reduces EMI), temporary moratorium (if RBI scheme is active), or rescheduling with lower EMIs now and catch-up later. Be honest about the impact on total interest paid.",
        expectedAction:
          "Present options: 1) Tenure extension — extend from remaining 12 months to 24 months, EMI drops to ~₹10,000. 2) If any RBI relief scheme is active, apply for moratorium. 3) Rescheduling: reduced EMI for 6 months then regular EMI after she has a job. Be transparent about additional interest.",
        hints: [
          "Tenure extension from 12 to 24 months: EMI drops to roughly ₹10,000 — more manageable",
          "Total interest paid will increase — be upfront about this trade-off",
          "Check if any RBI COVID relief restructuring scheme is still applicable",
          "Don't touch her ₹50,000 emergency fund — that's her lifeline",
        ],
        idealKeywords: [
          "tenure extension",
          "reduced EMI",
          "₹10,000",
          "restructuring",
          "moratorium",
          "additional interest",
          "manageable",
          "emergency fund",
        ],
        bannedPhrases: [
          "pay whatever you can from savings",
          "no restructuring is possible",
          "rules are rules",
          "we can't reduce EMI",
        ],
        scoring: { "Product Knowledge": 10, Empathy: 7, "Communication Clarity": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "₹10,000 EMI I can manage with my freelance income. But what about the 8 months I've already missed? That's ₹1.44 lakhs of unpaid EMIs. Will you add penalties on top? And what has happened to my CIBIL score? I've always had a good score.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Be honest about the overdue amount and CIBIL impact. The 8 months of missed payments will have negatively affected her CIBIL score. Explain options: the overdue amount can be rolled into the restructured loan. Late payment fees may be partially waived under hardship policy. CIBIL can improve once regular payments resume.",
        expectedAction:
          "Be honest: overdue amount (₹1.44L) plus late fees need to be addressed. Options: roll overdue into restructured loan, request waiver of late fees under hardship policy. CIBIL has been impacted — but once restructuring is formalised and she resumes payments, it will gradually improve over 12-18 months.",
        hints: [
          "Overdue ₹1.44L can be rolled into the restructured loan — don't demand lump sum",
          "Request late payment fee waiver under the bank's hardship policy — many banks have this",
          "CIBIL impact is real — but it's not permanent. Regular payments for 12-18 months will rebuild it",
          "If restructured formally, the account status changes from 'default' to 'restructured' — better for CIBIL",
        ],
        idealKeywords: [
          "rolled into loan",
          "waiver",
          "hardship policy",
          "CIBIL",
          "not permanent",
          "rebuild",
          "12-18 months",
          "restructured",
        ],
        bannedPhrases: [
          "CIBIL is destroyed forever",
          "you must pay all overdue now",
          "no waivers possible",
          "your score doesn't matter",
        ],
        scoring: { "Product Knowledge": 8, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "So if I restructure, my CIBIL slowly recovers? That gives me hope. OK, I want to do this. What paperwork is needed? And please — can you make sure those recovery agents stop calling me? Last week one of them called at 10 PM and threatened to come to my house. That's harassment.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the recovery agent harassment seriously. RBI has strict guidelines on collection practices — calls between 7 AM - 7 PM only, no threats, no visits without notice, no abusive language. Log a formal complaint about the 10 PM call. Start the restructuring paperwork.",
        expectedAction:
          "Take the harassment complaint seriously: RBI prohibits collection calls outside 7 AM - 7 PM. Log a formal complaint about the 10 PM call. Explain recovery agent code of conduct. For restructuring: she needs a hardship letter, income proof (freelance), and her ID. Process can start today.",
        hints: [
          "RBI Fair Practices Code: collection calls only between 7 AM - 7 PM",
          "No threats, no abusive language, no unannounced visits — these are violations",
          "Log a formal complaint about the 10 PM call — it's her right",
          "Restructuring documents: hardship declaration letter, current income proof, ID",
        ],
        idealKeywords: [
          "7 AM to 7 PM",
          "harassment",
          "formal complaint",
          "RBI guidelines",
          "collection code",
          "hardship letter",
          "income proof",
          "start today",
        ],
        bannedPhrases: [
          "recovery agents are just doing their job",
          "they won't call again probably",
          "I can't control the recovery team",
          "that's normal procedure",
        ],
        scoring: { "Compliance Language": 10, Empathy: 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Thank you for taking that seriously. I'll write the hardship letter tonight. One last question — if I get the hotel job next month, can I increase my EMI back to ₹18,000 or even pay off early? I want to close this chapter as soon as possible.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close on a positive note. Confirm that she can increase EMI or prepay at any time — RBI mandates no prepayment penalty on floating-rate personal loans. Summarise the full plan and give her your direct contact for follow-up. End with encouragement.",
        expectedAction:
          "Confirm: she can increase EMI or prepay at any time. No prepayment penalty on personal loans (RBI circular). Summarise: restructure to ₹10K EMI, roll in overdue, complaint about recovery, increase EMI when employed. Give direct contact. Encourage her — she's handling a tough situation with grace.",
        hints: [
          "No prepayment penalty on floating-rate personal loans — RBI has mandated this",
          "She can increase EMI at any time through a simple written request",
          "Summarise the complete plan — she needs clarity to feel in control",
          "End with genuine encouragement — she's been through a lot and is trying her best",
        ],
        idealKeywords: [
          "no prepayment penalty",
          "increase EMI anytime",
          "written request",
          "contact number",
          "complete plan",
          "you're handling this well",
        ],
        bannedPhrases: [
          "there's a prepayment penalty",
          "you can't change EMI once restructured",
          "just focus on paying",
          "good luck with the job",
        ],
        scoring: {
          "Communication Clarity": 8,
          Empathy: 7,
          "Compliance Language": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "genuine hardship",
          "not a defaulter",
          "understand",
          "help",
          "support",
          "difficult time",
          "you're handling this well",
        ],
        weight: 25,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "tenure extension",
          "restructuring",
          "reduced EMI",
          "moratorium",
          "prepayment",
          "overdue",
          "CIBIL",
        ],
        weight: 25,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "RBI guidelines",
          "7 AM to 7 PM",
          "no harassment",
          "fair practices",
          "no prepayment penalty",
          "formal complaint",
        ],
        weight: 20,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "options",
          "₹10,000",
          "timeline",
          "documents",
          "plan",
          "next steps",
          "contact",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "income",
          "expenses",
          "₹50,000",
          "freelance",
          "job interview",
          "hotel industry",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "you're a defaulter",
        "we will send recovery agents",
        "legal action is certain",
        "should have planned better",
        "your CIBIL is ruined forever",
      ],
      violationPenalty: 40,
      violationMessage:
        "COMPLIANCE BREACH: Using threatening language or misleading claims about credit impact with a distressed borrower. Violates RBI Fair Practices Code for loan recovery.",
    },
  },

  // ── 9. ATM Card Skimming Dispute ──
  {
    id: "atm-dispute-skimming",
    title: "ATM Card Skimming Dispute",
    description:
      "Rajan Pillai is a 50-year-old shopkeeper from Trivandrum who has had ₹80,000 debited from his account through an ATM he never visited. He is panicking and suspects card skimming. Handle the dispute with urgency, proper procedure, and empathy while managing his expectations.",
    category: "customer-service",
    difficulty: "hard",
    xpReward: 130,
    tags: [
      "ATM-dispute",
      "card-skimming",
      "fraud-reporting",
      "chargeback",
      "customer-service",
      "urgency",
    ],
    customer: {
      name: "Rajan Pillai",
      age: 50,
      profession: "Shopkeeper",
      city: "Trivandrum",
      avatar: "RP",
      personality:
        "Panicking but not aggressive. A simple, honest shopkeeper who has never faced fraud before. Doesn't understand how someone could withdraw from his account. Needs reassurance and clear action. Will get more anxious if he feels the bank is not taking his complaint seriously.",
      goal: "Get his ₹80,000 back and understand how this happened so it doesn't happen again",
      archetype: "PANICKED_VICTIM",
      moodInitial: 3,
      hotButtons: [
        "it's your fault",
        "you shared your PIN",
        "we'll investigate eventually",
        "no guarantee of refund",
        "takes 90 days",
      ],
      aiPersonaPrompt:
        "You are Rajan Pillai, 50, owner of a small grocery shop in Trivandrum. You checked your passbook this morning and found 4 withdrawals of ₹20,000 each from an ATM in Kochi — a city you haven't visited in 6 months. Your card was with you the entire time.\n\nYou are panicking. ₹80,000 is a huge amount for you — that's almost 2 months of your shop's profit. You came rushing to the bank.\n\nBehaviour rules:\n- You are scared and confused, not angry (at first). You become angry only if the bank seems dismissive.\n- You swear you never shared your PIN with anyone.\n- You want immediate action: block the card, file a complaint, get a timeline for refund.\n- You don't understand terms like 'chargeback' or 'dispute resolution' — explain simply.\n- If you feel the bank is taking action urgently, you calm down.\n- Keep responses 1-3 sentences. Be anxious and confused.",
    },
    openingStatement:
      "Sir, someone stole ₹80,000 from my account! I checked my passbook this morning — four withdrawals of ₹20,000 each from an ATM in Kochi. I haven't been to Kochi in 6 months! My card is right here in my wallet. How is this possible? I am a simple shopkeeper, this is 2 months of my income!",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Sir, someone stole ₹80,000 from my account! I checked my passbook this morning — four withdrawals of ₹20,000 each from an ATM in Kochi. I haven't been to Kochi in 6 months! My card is right here in my wallet. How is this possible? I am a simple shopkeeper, this is 2 months of my income!",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Take IMMEDIATE action. First: block his card RIGHT NOW to prevent further fraud. Second: reassure him that this is likely card skimming (criminals copy card data) and it's NOT his fault. Third: start the dispute process. Act with urgency — he's in panic mode.",
        expectedAction:
          "FIRST action: block the debit card immediately — ask for the card number or do it from the system. Explain card skimming briefly: criminals install devices on ATMs to copy card data. It's NOT his fault. Assure him a formal complaint is being filed right now.",
        hints: [
          "Block the card FIRST — every minute it's active is a risk of more fraud",
          "Explain card skimming simply: 'Someone copied your card's data using a device on an ATM you used earlier'",
          "Make it clear: this is NOT his fault and the bank takes this seriously",
          "Show urgency — he needs to see the bank acting fast",
        ],
        idealKeywords: [
          "block your card",
          "immediately",
          "card skimming",
          "not your fault",
          "formal complaint",
          "device",
          "copied",
          "acting right now",
        ],
        bannedPhrases: [
          "did you share your PIN",
          "are you sure you didn't go to Kochi",
          "we'll look into it sometime",
          "these things happen",
        ],
        scoring: { Empathy: 8, "Communication Clarity": 7, "Compliance Language": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Yes, please block it immediately! But how did they copy my card? I only use the ATM near my shop — the one at the junction. And I always cover the keypad when typing my PIN. Will I get my money back? ₹80,000 is a lot for me.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Explain the skimming process simply and address the refund question. Per RBI circular, if the customer reports fraud within 3 working days, the bank's liability is limited and the customer should be refunded. Set realistic expectations: investigation takes 30-60 days, but interim credit may be possible.",
        expectedAction:
          "Explain skimming: a tiny device is placed over the card slot, and a hidden camera records the PIN. He did everything right by covering the PIN — but sophisticated skimmers can still capture data. Regarding refund: RBI circular says if reported within 3 days of the transaction, customer liability is zero. Investigation takes 30-60 days. Some banks provide interim credit.",
        hints: [
          "Skimmer: a thin overlay device + hidden camera/keypad overlay — very hard to detect",
          "RBI circular on unauthorised transactions: zero customer liability if reported within 3 days",
          "Investigation typically takes 30-60 days — be honest about the timeline",
          "Some banks provide interim credit pending investigation — check if your bank does this",
        ],
        idealKeywords: [
          "skimmer device",
          "camera",
          "RBI circular",
          "3 working days",
          "zero liability",
          "investigation",
          "30-60 days",
          "interim credit",
        ],
        bannedPhrases: [
          "no guarantee of refund",
          "it could take 6 months",
          "you might not get the money back",
          "you should have been more careful",
        ],
        scoring: { "Product Knowledge": 10, Empathy: 7, "Compliance Language": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "3 days — I noticed it this morning, so I am within time! But 30-60 days is a long time. I have suppliers to pay this week. Is there any way to get the money faster? And should I file a police complaint too? I've never been to a police station.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address his immediate cash flow concern. Yes, he should file a police complaint — this strengthens the dispute. Guide him on how to file it (cyber crime cell or local police station). Regarding interim relief, escalate to the branch manager for possible emergency interim credit. Help him with the practical next steps.",
        expectedAction:
          "Advise filing a police complaint — go to the local police station or cyber crime portal (cybercrime.gov.in). This strengthens his case. For interim credit: escalate to branch manager — some banks provide interim credit within 10 days for clear skimming cases. Give him the cyber crime helpline number (1930).",
        hints: [
          "Police complaint strengthens the bank's investigation — highly recommended",
          "He can file online at cybercrime.gov.in or call 1930 — easier than going to a police station",
          "Escalate to branch manager for interim credit — ₹80K skimming case should qualify",
          "Help him prepare: he needs his passbook, account statement, and the blocked card details",
        ],
        idealKeywords: [
          "police complaint",
          "cybercrime.gov.in",
          "1930",
          "strengthens your case",
          "interim credit",
          "branch manager",
          "escalate",
          "10 days",
        ],
        bannedPhrases: [
          "police won't help",
          "filing a complaint is useless",
          "we can't give interim credit",
          "just wait for the investigation",
        ],
        scoring: { "Communication Clarity": 10, "Product Knowledge": 7, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "I will file on that cybercrime website today — that is easier for me. But sir, one thing is worrying me — what if the investigation says it was not fraud? What if the bank says 'we found no evidence'? Then I lose ₹80,000 forever? What are my options if that happens?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address his worst-case scenario concern honestly. If the bank investigation doesn't find in his favour, he can escalate to the Banking Ombudsman (RBI). This is a free service that reviews disputes. ATM CCTV footage from Kochi will likely confirm he wasn't there. Be reassuring but honest.",
        expectedAction:
          "If the bank investigation is unfavourable, he can escalate to the Banking Ombudsman — a free RBI service. Additionally, ATM CCTV footage from Kochi will show it wasn't him — this is strong evidence. The police complaint and cyber crime report further support his case. Multiple safety nets exist.",
        hints: [
          "Banking Ombudsman: free RBI dispute resolution mechanism — his next escalation",
          "ATM CCTV footage in Kochi will show a different person — strong evidence for him",
          "His police complaint and cyber crime report create an official record",
          "Most skimming cases are resolved in the customer's favour when reported promptly",
        ],
        idealKeywords: [
          "Banking Ombudsman",
          "escalate",
          "CCTV footage",
          "evidence",
          "police report",
          "free service",
          "RBI",
          "resolved in your favour",
        ],
        bannedPhrases: [
          "you'll definitely lose the money",
          "Ombudsman takes years",
          "CCTV is usually deleted",
          "nothing can be done",
        ],
        scoring: { "Product Knowledge": 8, Empathy: 7, "Compliance Language": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "OK, Ombudsman is a good backup option. I am feeling calmer now. But tell me — how do I prevent this in the future? I don't want to live in fear every time I use an ATM. And should I get a new card or can I use the same one after unblocking?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close with practical prevention tips and next steps. He MUST get a new card — the old one's data is compromised. Give him ATM safety tips: check for loose fittings, cover keypad, enable SMS alerts, set daily withdrawal limits. Summarise the complete action plan.",
        expectedAction:
          "He must get a NEW card — the old one's data is compromised, never unblock it. ATM safety tips: check for loose card slot fittings, wiggle the keypad, cover PIN entry, enable transaction SMS alerts, set a lower daily ATM withdrawal limit. Summarise: complaint filed, police report, new card, investigation in 30-60 days.",
        hints: [
          "NEW card is essential — old card data is compromised, never use it again",
          "Check ATM: wiggle the card slot (skimmers are loose), check for hidden cameras above keypad",
          "Enable SMS alerts for every transaction — immediate notification of any fraud",
          "Set daily ATM withdrawal limit lower (e.g., ₹25,000) to limit damage if it happens again",
        ],
        idealKeywords: [
          "new card",
          "compromised",
          "check for skimmers",
          "SMS alerts",
          "daily limit",
          "wiggle",
          "cover keypad",
          "summary",
        ],
        bannedPhrases: [
          "just unblock the old card",
          "it won't happen again",
          "ATMs are completely safe",
          "don't worry about it",
        ],
        scoring: {
          "Communication Clarity": 8,
          "Product Knowledge": 7,
          Empathy: 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Communication Clarity",
        keywords: [
          "block card",
          "police complaint",
          "cybercrime",
          "30-60 days",
          "new card",
          "summary",
          "next steps",
        ],
        weight: 25,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "skimming",
          "chargeback",
          "RBI circular",
          "zero liability",
          "3 days",
          "Banking Ombudsman",
          "interim credit",
        ],
        weight: 25,
      },
      {
        skill: "Empathy",
        keywords: [
          "not your fault",
          "understand",
          "₹80,000 is significant",
          "acting immediately",
          "help you",
          "serious",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "RBI",
          "zero liability",
          "3 working days",
          "Ombudsman",
          "investigation",
          "dispute",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "Kochi",
          "4 withdrawals",
          "₹20,000 each",
          "suppliers to pay",
          "cash flow",
          "shopkeeper",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "you must have shared your PIN",
        "no refund is possible",
        "it's your responsibility",
        "we can't do anything",
      ],
      violationPenalty: 40,
      violationMessage:
        "COMPLIANCE BREACH: Refusing to register a fraud complaint or blaming the customer for unauthorised transactions. Violates RBI circular on limiting liability of customers in unauthorised electronic banking transactions.",
    },
  },

  // ── 10. Account Closure Prevention ──
  {
    id: "account-closure-prevention",
    title: "Account Closure Prevention",
    description:
      "Neha Gupta is a 29-year-old startup founder from Gurgaon who is fed up with hidden charges and poor service. She wants to close her account immediately. Your job is to understand her grievances, address them genuinely, and — only if it makes sense — retain her. But if her complaints are valid and unresolvable, help her close the account gracefully.",
    category: "customer-service",
    difficulty: "medium",
    xpReward: 100,
    tags: [
      "account-closure",
      "retention",
      "complaints",
      "service-recovery",
      "hidden-charges",
      "startup-banking",
    ],
    customer: {
      name: "Neha Gupta",
      age: 29,
      profession: "Startup Founder",
      city: "Gurgaon",
      avatar: "NG",
      personality:
        "Direct, impatient, and vocal. Used to efficient tech services and finds traditional banking infuriating. Has a large social media following and will publicly call out bad service. Not unreasonable — she'll stay if genuinely convinced the bank cares. But don't waste her time with scripted responses.",
      goal: "Close her account unless the bank can genuinely fix her problems with charges and service quality",
      archetype: "FRUSTRATED_MILLENNIAL",
      moodInitial: 3,
      hotButtons: [
        "it's our policy",
        "I understand your frustration but",
        "let me transfer you",
        "hidden charges are standard",
        "scripted responses",
      ],
      aiPersonaPrompt:
        "You are Neha Gupta, 29, founder of a fintech startup in Gurgaon. You've banked here for 5 years. In the last 6 months: you were charged ₹750 for 'non-maintenance of average balance' (you weren't told the limit changed), ₹500 for a 'locker access fee' you never agreed to, and an SMS alert charge of ₹75/quarter that you never opted for.\n\nYou've called customer care 4 times — each time transferred 3 times and nothing was resolved. You've tweeted about it and got a generic DM saying 'we'll look into it.'\n\nBehaviour rules:\n- You are angry but articulate. You want specific answers, not 'I understand your frustration.'\n- If the RM acknowledges the charges were wrong and offers a concrete reversal, you'll soften.\n- If they give you a scripted response, you get more hostile.\n- You have a business account need — your startup is growing and needs a current account.\n- If genuinely impressed, you might keep the account AND open a current account.\n- If the RM tries to close without trying, you'll leave a scathing Google review.\n- Keep responses 1-3 sentences. Be sharp and direct.",
    },
    openingStatement:
      "I want to close my account. Today. I'm done with this bank. I've been charged ₹750 for balance shortfall nobody told me about, ₹500 for some locker fee I never agreed to, and ₹75 every quarter for SMS alerts I never opted for. I called customer care 4 times — got transferred around like a cricket ball. I'm done.",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "I want to close my account. Today. I'm done with this bank. I've been charged ₹750 for balance shortfall nobody told me about, ₹500 for some locker fee I never agreed to, and ₹75 every quarter for SMS alerts I never opted for. I called customer care 4 times — got transferred around like a cricket ball. I'm done.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Do NOT immediately try to retain her. First, acknowledge each specific charge she mentioned and take them seriously. Pull up her account to verify. If the charges are wrong, say so immediately and offer reversal. Earn the right to have a retention conversation ONLY after fixing her problems.",
        expectedAction:
          "Acknowledge each charge specifically: ₹750 AMB, ₹500 locker fee, ₹75 SMS charges. Pull up her account to verify. If any charges were applied without proper communication, offer immediate reversal. Apologise for the customer care runaround. Don't use scripted phrases.",
        hints: [
          "Name each charge specifically — don't lump them into 'I understand'",
          "Pull up her account and verify each charge right in front of her",
          "If the AMB limit was changed without notification, the charge may be wrongful — reverse it",
          "She's been through 4 customer care calls — acknowledge that failure explicitly",
        ],
        idealKeywords: [
          "₹750",
          "₹500",
          "₹75",
          "verify right now",
          "reversal",
          "should not have been charged",
          "apologise",
          "customer care failed",
        ],
        bannedPhrases: [
          "I understand your frustration",
          "it's our policy",
          "let me transfer you to the right department",
          "all banks charge this",
        ],
        scoring: { Empathy: 8, "Communication Clarity": 7, "Needs Discovery": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Finally someone who's actually looking at the charges instead of giving me a script. So? Are these charges valid or not? And I want to know — why was the AMB limit changed from ₹5,000 to ₹10,000 without telling me?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Give her a direct answer. If the AMB limit was changed and she wasn't properly notified (per RBI norms, 30-day advance notice is required), the charge should be reversed. If the locker fee was not in the original agreement, reverse that too. Be decisive — she respects action, not hedging.",
        expectedAction:
          "If AMB limit was changed without 30-day notice (RBI requirement), the ₹750 charge is reversible. Initiate reversal. For ₹500 locker fee: check if it was in the original locker agreement — if not, reverse it. For SMS charges: if she didn't opt in, reverse and disable. Take action NOW, not 'we'll process it.'",
        hints: [
          "RBI requires 30 days advance notice before changing AMB requirements",
          "If notification wasn't sent, the charge is wrongful — reverse it immediately",
          "Locker fee must be in the original agreement — if not, it's not applicable",
          "Take all three actions RIGHT NOW — don't say 'I'll escalate and get back to you'",
        ],
        idealKeywords: [
          "reversing now",
          "RBI requires notice",
          "30 days",
          "not notified",
          "wrongful charge",
          "immediate reversal",
          "locker agreement",
          "SMS disabled",
        ],
        bannedPhrases: [
          "let me check and get back to you",
          "I'll escalate this",
          "it might take 7-10 days",
          "charges are as per policy",
        ],
        scoring: { "Compliance Language": 8, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "OK, I see you've reversed ₹1,325 right now. That's refreshing. But this is exactly my problem — it took me coming to the branch in person, after 4 phone calls, to get simple charges reversed. How do I know this won't happen again next month? Why should I stay?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Now she's open to a conversation — but only because you earned it. Address her systemic concern: give her a direct contact for future issues (not the generic helpline). Ask about her banking needs — she's a startup founder, she might need more than a savings account. But ONLY if she wants to talk about it.",
        expectedAction:
          "Give her a direct point of contact for future issues — your name and number, not the helpline. Acknowledge the systemic failure honestly. Ask if there's anything else she needs for her startup — but frame it as a question, not a pitch. Let her lead.",
        hints: [
          "Give your direct number: 'If anything goes wrong, call me directly — not the helpline'",
          "Acknowledge the systemic issue: 'You're right — this should have been resolved in the first call'",
          "She's a startup founder — she might need a current account, payment gateway, payroll services",
          "Ask, don't pitch: 'Is there anything your startup needs from us that we should discuss?'",
        ],
        idealKeywords: [
          "direct contact",
          "my number",
          "systemic issue",
          "should have been resolved earlier",
          "startup needs",
          "current account",
          "your decision",
        ],
        bannedPhrases: [
          "we have a great startup banking package",
          "let me tell you about our products",
          "you should upgrade your account",
          "trust us it won't happen again",
        ],
        scoring: { Empathy: 8, "Needs Discovery": 7, "Communication Clarity": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "Actually yes — my startup is growing and I need a current account with proper payment gateway integration. I've been looking at neo-banks because they're digital-first and transparent. Can you compete with that? Because right now, your bank feels like it's stuck in 2010.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She's interested but challenging you. Don't get defensive about neo-banks. Acknowledge their strengths (UX, transparency) and honestly explain what a traditional bank offers that they don't (credit facilities, branch network, RBI-insured deposits, cash handling). Let her weigh the pros and cons herself.",
        expectedAction:
          "Acknowledge neo-banks' strengths: great UX, transparent fees. Explain traditional bank advantages: RBI-insured deposits (₹5L DICGC), credit/OD facilities, cash deposit for business, longer track record. For her startup: current account with payment gateway, trade finance when she scales. Let her decide.",
        hints: [
          "Don't bash neo-banks — she'll see through it. Acknowledge they're good at UX",
          "Traditional bank advantages: DICGC insurance, credit facilities, cash handling, branch network",
          "For a growing startup: she might need OD facility, trade finance, LC/BG — neo-banks can't do this yet",
          "Let her compare: 'Here's what we offer — see if it fits your growth plan'",
        ],
        idealKeywords: [
          "neo-banks are good at UX",
          "DICGC insurance",
          "credit facilities",
          "overdraft",
          "cash handling",
          "growth plan",
          "your choice",
          "payment gateway",
        ],
        bannedPhrases: [
          "neo-banks are not real banks",
          "they'll shut down",
          "only traditional banks are safe",
          "you should stay with us",
        ],
        scoring: { "Product Knowledge": 8, "Communication Clarity": 7, "Objection Handling": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Fair points about the credit facilities — neo-banks can't do OD or trade finance yet. OK, I won't close the account today. But I want three things: those reversed charges in writing, your direct number, and a meeting next week about the current account. And if you let me down again, the next conversation will be on Twitter.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close by delivering exactly what she asked for. Provide a reversal confirmation in writing (email/print). Give your direct number. Schedule the current account meeting for next week. Accept her warning gracefully — she's holding you accountable, which is fair.",
        expectedAction:
          "Deliver all three: 1) Reversal confirmation email/printout right now. 2) Your direct number and email. 3) Schedule a specific day and time for the current account discussion. Accept her accountability expectation with grace — don't be defensive about the Twitter comment.",
        hints: [
          "Print the reversal confirmation or email it right now — she wants it in writing",
          "Give direct mobile + email — this is a relationship, not a transaction",
          "Propose a specific day: 'How about Tuesday at 3 PM? I'll have the current account options ready'",
          "Accept the Twitter comment gracefully: 'Fair enough — I intend to make sure that conversation never needs to happen'",
        ],
        idealKeywords: [
          "reversal in writing",
          "email confirmation",
          "direct number",
          "Tuesday",
          "specific time",
          "current account discussion",
          "accountability",
        ],
        bannedPhrases: [
          "please don't tweet about us",
          "social media won't help",
          "we'll try our best",
          "no promises",
        ],
        scoring: {
          "Communication Clarity": 10,
          Empathy: 5,
          "Product Knowledge": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Communication Clarity",
        keywords: [
          "₹750",
          "₹500",
          "₹75",
          "reversed",
          "direct number",
          "specific time",
          "in writing",
          "email",
        ],
        weight: 25,
      },
      {
        skill: "Empathy",
        keywords: [
          "acknowledge",
          "failure",
          "should have been resolved",
          "your right",
          "genuine",
          "not scripted",
        ],
        weight: 20,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "startup",
          "current account",
          "payment gateway",
          "growing",
          "neo-bank",
          "what do you need",
        ],
        weight: 20,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "neo-banks",
          "traditional advantage",
          "credit",
          "OD",
          "DICGC",
          "compare",
          "your choice",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "RBI notice requirement",
          "30 days",
          "wrongful charge",
          "reversal",
          "locker agreement",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "all banks charge this",
        "you can't close the account today",
        "hidden charges are normal",
        "neo-banks are not safe",
      ],
      violationPenalty: 30,
      violationMessage:
        "COMPLIANCE BREACH: Defending wrongful charges or obstructing legitimate account closure request. Violates RBI Master Direction on customer service and fair treatment.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── FRAUD (3 scenarios) ──
  // ══════════════════════════════════════════════════════════════

  // ── 11. Romance Scam Detection ──
  {
    id: "romance-scam-elderly",
    title: "Romance Scam Detection",
    description:
      "Padma Narayan is a 63-year-old retired woman from Chennai who is sending money to a 'US Army doctor' she met on Facebook. She is convinced it's love and will resist any suggestion that she's being scammed. Navigate with extreme sensitivity — you must protect her without destroying her dignity or making her feel foolish.",
    category: "fraud",
    difficulty: "hard",
    xpReward: 130,
    tags: [
      "romance-scam",
      "elderly-fraud",
      "social-engineering",
      "sensitivity",
      "intervention",
      "fraud-prevention",
    ],
    customer: {
      name: "Padma Narayan",
      age: 63,
      profession: "Retired (former bank officer)",
      city: "Chennai",
      avatar: "PN",
      personality:
        "Lonely since her husband passed 5 years ago. Intelligent — she was a bank officer herself, so she feels she can't be scammed. The romance has given her purpose and joy after years of loneliness. Will become defensive and hostile if you directly say 'it's a scam.' Needs to be guided to see the red flags herself.",
      goal: "Transfer ₹2 lakhs to her 'friend' Dr. James Wilson in the US Army who needs money for a customs clearance to send her a gift",
      archetype: "LONELY_VICTIM",
      moodInitial: 7,
      hotButtons: [
        "you're being fooled",
        "it's obviously a scam",
        "at your age",
        "lonely people fall for this",
        "internet is dangerous",
      ],
      aiPersonaPrompt:
        "You are Padma Narayan, 63, retired from a nationalised bank as a Senior Manager. Your husband passed away 5 years ago. Your children are in the US and UK. You met 'Dr. James Wilson' on Facebook 4 months ago. He says he's a US Army surgeon stationed in Syria.\n\nHe has been sending you loving messages daily. He says he has a parcel of gifts for you but needs ₹2 lakhs for customs clearance. You want to transfer this money.\n\nBehaviour rules:\n- You are CONVINCED this is real love. You have 4 months of chat history.\n- If someone says 'it's a scam,' you get angry: 'I worked in a bank for 30 years! I know scams!'\n- You will listen ONLY if shown specific red flags gently, without judgment.\n- If the RM asks you questions about the pattern (never video called? asked for money? customs story?) you start to doubt, but slowly.\n- You will NOT admit you're being scammed — at best, you'll agree to 'verify' before sending money.\n- Keep responses 1-3 sentences. Be warm but defensive.",
    },
    openingStatement:
      "Good morning. I need to transfer ₹2 lakhs internationally. It's for a friend — Dr. James Wilson. He's a US Army doctor stationed in Syria. He's sending me a gift but it's stuck in customs and he needs help with the clearance fee. Can you process the transfer?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Good morning. I need to transfer ₹2 lakhs internationally. It's for a friend — Dr. James Wilson. He's a US Army doctor stationed in Syria. He's sending me a gift but it's stuck in customs and he needs help with the clearance fee. Can you process the transfer?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Do NOT immediately say 'this is a scam.' That will make her hostile. Instead, show genuine interest in the transaction and ask questions that gently expose the red flags — how they met, how long they've known each other, whether they've video-called. Plant seeds of doubt without accusations.",
        expectedAction:
          "Show interest: 'That sounds like a generous thing to do.' Ask gentle questions: How did you meet Dr. Wilson? Have you spoken on video call? Has he asked for money before? You're gathering information, not accusing. Let the red flags emerge naturally through her answers.",
        hints: [
          "Do NOT say 'this is a scam' or 'you're being cheated' — she'll shut down",
          "Ask: 'How did you meet Dr. Wilson?' — Facebook meeting is a red flag",
          "Ask: 'Have you done a video call with him?' — scammers always avoid video",
          "Ask: 'Has he asked for money before this?' — escalating requests is a pattern",
        ],
        idealKeywords: [
          "how did you meet",
          "video call",
          "asked for money before",
          "tell me more",
          "generous",
          "friend",
          "interesting",
        ],
        bannedPhrases: [
          "this is a scam",
          "you're being fooled",
          "at your age you should know better",
          "internet romances are fake",
        ],
        scoring: { Empathy: 10, "Communication Clarity": 5, "Needs Discovery": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "We met on Facebook 4 months ago. He sent me a friend request and we started chatting. No, we haven't video-called — he says the army doesn't allow it in Syria because of security. And yes, I sent him ₹50,000 last month for a phone he needed. But he's a doctor, he'll pay me back!",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: The red flags are now visible — but she's rationalising them. Gently highlight the patterns WITHOUT calling it a scam: no video call despite 4 months, army security excuse (which is false — soldiers video-call regularly), previous money request, and now escalating amount. Use the Socratic method — ask questions that make HER see the pattern.",
        expectedAction:
          "Gently point out the pattern using questions: 'Is it common for army doctors to not have any video calling access for 4 months?' '₹50,000 last month and now ₹2 lakhs — has the amount been increasing?' 'Have you spoken to anyone else who knows Dr. Wilson in person?' Let her connect the dots herself.",
        hints: [
          "US Army soldiers regularly video-call home — the 'security' excuse is false",
          "Escalating money requests: ₹50K to ₹2L is a classic scam pattern",
          "Ask if she's shared personal details: bank info, PAN, Aadhaar with him",
          "Use her own banking experience: 'Madam, in your 30 years of banking, have you seen this pattern before?'",
        ],
        idealKeywords: [
          "pattern",
          "video call",
          "increasing amount",
          "anyone who knows him",
          "your banking experience",
          "have you seen this before",
          "verify",
        ],
        bannedPhrases: [
          "he's a fake",
          "there is no Dr. Wilson",
          "you're a victim",
          "lonely people get targeted",
        ],
        scoring: { "Communication Clarity": 8, Empathy: 8, "Objection Handling": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Listen, I worked in a bank for 30 years! I know what fraud looks like. This is different — he sends me messages every day, he knows my birthday, he cares about me. My children don't even call that often. Are you going to process my transfer or not?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She's getting defensive — she compared him to her children, revealing her loneliness. Do NOT argue. Validate her emotions — her need for connection is real and valid. Pivot to a compromise: process the transfer ONLY after a verification step. Suggest she try one thing first — ask Dr. Wilson for a video call as a gesture of trust before sending ₹2 lakhs.",
        expectedAction:
          "Validate her emotions: 'Your feelings are completely real and I respect that.' Don't fight her on whether it's a scam. Propose a compromise: 'Before we send ₹2 lakhs, can we try one thing? Ask Dr. Wilson for just a 30-second video call. If he truly cares, he'll understand why you want to see his face before sending such a big amount.'",
        hints: [
          "Her loneliness is real — don't dismiss her feelings or his attention",
          "She was a banker — use her own expertise: 'What would you advise a customer who came to you with this story?'",
          "Compromise: 'Let's just verify with one video call before transferring ₹2 lakhs'",
          "If she agrees to ask for a video call and he refuses — that's the breakthrough",
        ],
        idealKeywords: [
          "your feelings are real",
          "respect",
          "one video call",
          "verify",
          "before sending",
          "your own banking experience",
          "compromise",
          "just one check",
        ],
        bannedPhrases: [
          "he doesn't care about you",
          "you're lonely so you fell for it",
          "it's obviously fake",
          "I refuse to process this",
        ],
        scoring: { Empathy: 10, "Objection Handling": 8, "Communication Clarity": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "...You know, I did ask him once for a video call. He said his phone camera was broken. Then I asked again and he said the base has no internet for video. Different excuses each time... But maybe he really does have problems with connectivity in Syria. Right?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She's starting to doubt — this is fragile progress. Don't push too hard. She's asking 'right?' which means she's seeking reassurance that she's NOT been fooled. Gently share that this is a known pattern without using the word 'scam.' Mention the RBI and cyber crime cell resources. Offer to help her verify independently.",
        expectedAction:
          "Gently acknowledge the pattern: 'Different excuses each time is something we see in many cases reported to the cyber crime cell.' Offer her resources: cybercrime.gov.in where she can check common fraud patterns, the 1930 helpline. Suggest: 'Before we transfer, let me connect you with our fraud prevention team who can verify the account details.'",
        hints: [
          "She's doubting — be gentle, don't say 'I told you so'",
          "Frame it objectively: 'This pattern — no video call, money requests, customs story — is commonly reported to cyber crime cells'",
          "Offer cybercrime.gov.in — she can read about similar cases herself and draw her own conclusions",
          "Suggest bank's fraud team can verify the recipient account before transfer",
        ],
        idealKeywords: [
          "common pattern",
          "reported cases",
          "cyber crime cell",
          "verify",
          "fraud prevention team",
          "before we transfer",
          "independently check",
          "1930",
        ],
        bannedPhrases: [
          "I told you so",
          "you've been scammed",
          "the money is gone",
          "how could you not see this",
        ],
        scoring: { Empathy: 8, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "... Different excuses. Like those cases in the newspaper... Oh God. You know what — don't process the transfer today. I need to think. But please don't tell anyone about this. I feel so foolish. I was a bank officer for 30 years and I... I can't believe I nearly...",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: She's reached the realisation on her own. This is the most delicate moment. She feels ashamed. Protect her dignity COMPLETELY. She is NOT foolish — these scams are sophisticated and target intelligent people. Encourage her to file a report to help others. Mention the ₹50,000 already sent — there may be a recovery possibility. Be compassionate.",
        expectedAction:
          "Protect her dignity: 'You are NOT foolish — these scammers are professionals who target intelligent, kind people.' Assure confidentiality. Gently mention the ₹50K already sent: she should report to cyber crime cell for possible recovery. Offer to help her file the complaint. End with warmth and respect for her courage.",
        hints: [
          "She feels ashamed — the most important thing is protecting her dignity",
          "These scams target intelligent people — former bank officers, doctors, professors are common victims",
          "The ₹50K already sent: reporting to 1930/cybercrime.gov.in may help recovery if done quickly",
          "Complete confidentiality — reassure her this stays between you",
          "End with: 'You stopped the ₹2 lakhs today — that took courage and wisdom'",
        ],
        idealKeywords: [
          "not foolish",
          "sophisticated scam",
          "intelligent people",
          "confidential",
          "₹50,000 recovery",
          "report",
          "courage",
          "you stopped it",
          "dignity",
        ],
        bannedPhrases: [
          "you should have known better",
          "a bank officer falling for this",
          "everyone will find out",
          "the ₹50,000 is gone",
        ],
        scoring: {
          Empathy: 10,
          "Communication Clarity": 5,
          "Compliance Language": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "feelings are real",
          "not foolish",
          "dignity",
          "respect",
          "confidential",
          "courage",
          "kind",
          "lonely",
        ],
        weight: 30,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "pattern",
          "video call",
          "verify",
          "questions",
          "gently",
          "before transferring",
          "one check",
        ],
        weight: 20,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "your banking experience",
          "what would you advise",
          "different excuses",
          "compromise",
          "verify first",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "cyber crime",
          "1930",
          "cybercrime.gov.in",
          "fraud prevention",
          "report",
          "recovery",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "how did you meet",
          "video call",
          "money requests",
          "escalating amount",
          "children abroad",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "you're a fool",
        "how could a bank officer fall for this",
        "obviously a scam",
        "at your age",
        "lonely people are easy targets",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL COMPLIANCE BREACH: Shaming or demeaning a fraud victim. This violates RBI customer protection guidelines and the bank's duty of care to vulnerable customers.",
    },
  },

  // ── 12. Corporate Phishing Response ──
  {
    id: "phishing-corporate",
    title: "Corporate Phishing Response",
    description:
      "Arjun Khanna is the accounts head at a mid-size company. An employee clicked a phishing link and the company's banking credentials may be compromised. ₹12 lakhs in the account is at risk. Handle with urgency — time is critical. Guide him through immediate containment, reporting, and recovery steps.",
    category: "fraud",
    difficulty: "medium",
    xpReward: 100,
    tags: [
      "phishing",
      "corporate-fraud",
      "cyber-security",
      "urgency",
      "containment",
      "incident-response",
    ],
    customer: {
      name: "Arjun Khanna",
      age: 35,
      profession: "Accounts Head",
      city: "Noida",
      avatar: "AK",
      personality:
        "Professional but panicking. Responsible for company finances and terrified of being blamed. Detail-oriented when calm. Needs someone to take charge and give him a clear action plan. Will follow instructions precisely if given confidently.",
      goal: "Secure the company's ₹12 lakh balance immediately and understand what steps to take after a phishing incident",
      archetype: "PANICKED_CORPORATE",
      moodInitial: 4,
      hotButtons: [
        "whose fault is this",
        "we need to investigate first",
        "it might not be serious",
        "wait and see",
        "call back tomorrow",
      ],
      aiPersonaPrompt:
        "You are Arjun Khanna, 35, Accounts Head at a 50-person software company in Noida. Your accounts executive Priya clicked a link in an email that looked like it came from the bank. The page asked for the company's internet banking credentials and she entered them before realising the URL was wrong.\n\nThis happened 30 minutes ago. You have ₹12 lakhs in the current account. You don't know if money has already been taken. You rushed to the bank branch.\n\nBehaviour rules:\n- You are panicking but trying to be professional.\n- You need clear, decisive action — not 'let me check with my manager.'\n- You want: 1) Account frozen immediately 2) Password reset 3) Check if any transactions happened 4) What to do next.\n- If the RM acts with urgency, you calm down and follow instructions.\n- If the RM seems casual about it, you escalate to the branch manager.\n- Keep responses 1-3 sentences. Be urgent and professional.",
    },
    openingStatement:
      "This is urgent. I'm the Accounts Head at NovaTech Solutions — our account is with your branch. Thirty minutes ago, my executive entered our internet banking credentials on a phishing page. We have ₹12 lakhs in the account. I need you to freeze it RIGHT NOW before anyone can withdraw. Please hurry.",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "This is urgent. I'm the Accounts Head at NovaTech Solutions — our account is with your branch. Thirty minutes ago, my executive entered our internet banking credentials on a phishing page. We have ₹12 lakhs in the account. I need you to freeze it RIGHT NOW before anyone can withdraw. Please hurry.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: ACT IMMEDIATELY. This is time-critical. First: disable/freeze internet banking access on the account RIGHT NOW. Second: verify the account details and check if any transactions have occurred in the last 30 minutes. Third: initiate a password/credential reset. Speed is everything.",
        expectedAction:
          "Immediately: 1) Disable internet banking access on the NovaTech account. 2) Pull up recent transactions — check for any unauthorised transfers in the last 30 minutes. 3) Initiate credential reset. Ask for account number and authorised signatory verification. ACT FIRST, verify identity in parallel.",
        hints: [
          "FREEZE internet banking first — this is the immediate threat vector",
          "Check last 30 minutes of transactions — if nothing has left, they're lucky",
          "Reset all internet banking credentials: login ID, password, transaction password",
          "Verify his identity as authorised signatory while taking action — don't delay action for verification",
        ],
        idealKeywords: [
          "freezing now",
          "disable internet banking",
          "checking transactions",
          "last 30 minutes",
          "credential reset",
          "immediately",
          "account number",
        ],
        bannedPhrases: [
          "let me check with my manager first",
          "are you sure it was phishing",
          "can you come back with proper authorisation",
          "it might not be serious",
        ],
        scoring: { "Communication Clarity": 10, "Product Knowledge": 7, Empathy: 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "Account number is 4521XXXXXXX. I'm the authorised signatory — Arjun Khanna, PAN ABCPK1234D. Have any transactions gone through? Is the money still there? I'll have a heart attack if ₹12 lakhs is gone.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Verify the account and check recent transactions. Report what you find — if no unauthorised transactions, reassure him. If there are suspicious transactions, escalate immediately. Either way, confirm that internet banking is now disabled and credentials will be reset.",
        expectedAction:
          "Verify his identity, check the account. If money is intact (most likely within 30 minutes): 'Good news — no unauthorised transactions. The ₹12 lakhs is safe.' Confirm internet banking is disabled. Explain next steps: formal incident report, new credentials, and employee cyber awareness.",
        hints: [
          "Check and report honestly — if money is safe, say so clearly to calm him",
          "Confirm internet banking is disabled — the threat is contained",
          "New credentials will be issued but through a secure process, not over the counter",
          "Advise: don't log into internet banking from the compromised computer until it's scanned",
        ],
        idealKeywords: [
          "checking now",
          "no unauthorised transactions",
          "money is safe",
          "internet banking disabled",
          "new credentials",
          "secure process",
          "don't use compromised computer",
        ],
        bannedPhrases: [
          "I can't tell you the balance",
          "you need to check online",
          "it will take time to verify",
          "probably nothing happened",
        ],
        scoring: { "Communication Clarity": 10, "Product Knowledge": 5, Empathy: 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Thank God the money is safe. OK, internet banking is disabled — good. Now what? Do we need to file a police complaint? And what about the phishing email — should we report it somewhere? I also need to make sure this doesn't happen again.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Guide him through post-incident steps. Yes, file a cyber crime complaint (1930 helpline / cybercrime.gov.in). Forward the phishing email to the bank's fraud team and CERT-In. Advise on immediate security measures: scan all computers, change all banking credentials, enable two-factor authentication.",
        expectedAction:
          "Post-incident steps: 1) File complaint at cybercrime.gov.in or call 1930. 2) Forward phishing email to bank's fraud desk and CERT-In (incident@cert-in.org.in). 3) Scan the compromised computer for malware. 4) Change ALL banking-related passwords from a clean computer. 5) Enable enhanced 2FA on the new internet banking setup.",
        hints: [
          "Cyber crime complaint: cybercrime.gov.in or helpline 1930",
          "Forward phishing email to CERT-In: incident@cert-in.org.in",
          "Scan the compromised computer for keyloggers/malware before using it again",
          "All banking passwords should be changed from a different, clean computer",
        ],
        idealKeywords: [
          "cybercrime.gov.in",
          "1930",
          "CERT-In",
          "scan computer",
          "malware",
          "change passwords",
          "clean computer",
          "two-factor authentication",
        ],
        bannedPhrases: [
          "no need for police",
          "just change your password and move on",
          "phishing isn't that serious",
          "it's just an email",
        ],
        scoring: { "Product Knowledge": 10, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "Got it — I'll file the cyber crime complaint today. But I'm also worried about my employee Priya. She's terrified she'll be fired. How do I handle this internally? And how do we prevent employees from clicking phishing links in the future?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Give constructive advice on both the HR situation and future prevention. Phishing clicks happen even in sophisticated organisations — Priya shouldn't be punished for an honest mistake. Recommend regular cyber security training, simulated phishing drills, and maker-checker controls for transactions above a threshold.",
        expectedAction:
          "On Priya: phishing clicks happen in the best organisations — it's a training issue, not a disciplinary one. Use this as a learning moment, not punishment. On prevention: regular cyber security awareness training, simulated phishing exercises, maker-checker process for high-value transactions, dedicated banking computer with restricted internet access.",
        hints: [
          "Priya made an honest mistake — punishing her will make others hide incidents instead of reporting them",
          "Regular cyber awareness training: quarterly sessions on phishing identification",
          "Simulated phishing drills: send test phishing emails to employees and train those who click",
          "Maker-checker: no single person should be able to complete a high-value transaction alone",
        ],
        idealKeywords: [
          "training issue",
          "not punishment",
          "learning moment",
          "cyber awareness",
          "simulated phishing",
          "maker-checker",
          "reporting culture",
          "quarterly training",
        ],
        bannedPhrases: [
          "she should be fired",
          "it's her fault",
          "that's your internal problem",
          "we can't advise on HR matters",
        ],
        scoring: { "Communication Clarity": 8, Empathy: 7, "Product Knowledge": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "Good advice — I'll set up the training programme. When can we get new internet banking credentials? And I want to upgrade our security — is there a way to add extra verification for any transaction above ₹1 lakh?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close with practical security upgrades and a timeline for credential restoration. New credentials can be issued within 24-48 hours through a secure process. For transaction-level controls: most corporate internet banking supports transaction limits, IP whitelisting, dual authorisation, and SMS/email alerts for every transaction.",
        expectedAction:
          "New credentials: 24-48 hours, collected in person by authorised signatory (secure process). Security upgrades: transaction threshold alerts, dual authorisation for transfers above ₹1L, IP whitelisting for internet banking access, SMS + email alerts for every transaction. Schedule a meeting with the bank's corporate banking team to configure these.",
        hints: [
          "New credentials issued within 24-48 hours — must be collected in person for security",
          "Dual authorisation: two signatories needed for transactions above a set threshold",
          "IP whitelisting: internet banking accessible only from office IP addresses",
          "Transaction alerts: SMS + email for every single debit — real-time monitoring",
        ],
        idealKeywords: [
          "24-48 hours",
          "in person",
          "dual authorisation",
          "IP whitelisting",
          "transaction alerts",
          "threshold",
          "SMS alert",
          "corporate banking team",
        ],
        bannedPhrases: [
          "we'll mail the credentials",
          "no extra security is needed",
          "standard setup is fine",
          "that's too much security",
        ],
        scoring: {
          "Product Knowledge": 10,
          "Communication Clarity": 7,
          "Compliance Language": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Product Knowledge",
        keywords: [
          "internet banking",
          "credentials",
          "2FA",
          "dual authorisation",
          "IP whitelisting",
          "CERT-In",
          "malware scan",
        ],
        weight: 25,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "immediately",
          "step 1",
          "check transactions",
          "disable",
          "next steps",
          "timeline",
          "24-48 hours",
        ],
        weight: 25,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "cybercrime.gov.in",
          "1930",
          "police complaint",
          "incident report",
          "CERT-In",
          "secure process",
        ],
        weight: 20,
      },
      {
        skill: "Empathy",
        keywords: [
          "money is safe",
          "don't worry",
          "acting now",
          "training issue",
          "not punishment",
          "learning moment",
        ],
        weight: 15,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "₹12 lakhs",
          "30 minutes ago",
          "phishing link",
          "employee",
          "corporate account",
          "security upgrade",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "it's probably fine",
        "just change your password and relax",
        "phishing isn't a big deal",
        "no need for police complaint",
      ],
      violationPenalty: 40,
      violationMessage:
        "COMPLIANCE BREACH: Downplaying a cyber security incident or failing to recommend proper incident reporting. Violates RBI cyber security framework for banks.",
    },
  },

  // ── 13. Money Mule Detection ──
  {
    id: "money-mule-student",
    title: "Money Mule Detection",
    description:
      "Rahul Verma is a 21-year-old college student from Lucknow with unexplained large deposits flowing through his account. He may be unknowingly acting as a money mule for a fraud ring. Handle the investigation delicately — gather information without tipping him off if he's complicit, but also consider that he might be an innocent victim being exploited.",
    category: "fraud",
    difficulty: "expert",
    xpReward: 150,
    tags: [
      "money-mule",
      "AML",
      "suspicious-transactions",
      "student",
      "investigation",
      "PMLA",
    ],
    customer: {
      name: "Rahul Verma",
      age: 21,
      profession: "College Student",
      city: "Lucknow",
      avatar: "RV",
      personality:
        "Nervous but trying to appear casual. Either genuinely doesn't understand what's happening (exploited victim) or is trying to play innocent (complicit mule). Gives vague answers when pressed about the deposits. Gets defensive if directly accused. May have been recruited through a 'work from home job' or 'easy money' scheme.",
      goal: "Withdraw ₹1.5 lakhs that was deposited in his account yesterday — claims it's 'payment for a freelance project'",
      archetype: "SUSPICIOUS_YOUTH",
      moodInitial: 6,
      hotButtons: [
        "you're doing something illegal",
        "police",
        "money laundering",
        "we're reporting you",
        "account seized",
      ],
      aiPersonaPrompt:
        "You are Rahul Verma, 21, a 3rd-year B.Com student in Lucknow. You were approached 2 months ago by someone on Telegram who offered you a 'data entry job' — all you had to do was receive money in your account and transfer it to other accounts via UPI, keeping 10% as commission.\n\nYou've processed about ₹8 lakhs in the last 2 months. Yesterday ₹1.5 lakhs came in and you want to withdraw it.\n\nBehaviour rules:\n- You don't fully understand that this is money laundering. You think it's a legitimate job.\n- When asked about the deposits, you say 'freelance work' or 'part-time data entry.'\n- If pressed for details, you get nervous and vague: 'It's an online company... I don't remember the name exactly.'\n- If directly accused of money laundering, you panic and become defensive: 'I'm just a student! I didn't do anything wrong!'\n- If the RM is patient and explains the legal consequences gently, you start to open up about the Telegram contact.\n- Keep responses 1-3 sentences. Be nervous but trying to seem normal.",
    },
    openingStatement:
      "Hi, I want to withdraw ₹1.5 lakhs from my account. It was deposited yesterday. It's payment for some freelance work I've been doing. Can I get it in cash please?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Hi, I want to withdraw ₹1.5 lakhs from my account. It was deposited yesterday. It's payment for some freelance work I've been doing. Can I get it in cash please?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: A 21-year-old student requesting ₹1.5L cash withdrawal from a recent deposit raises immediate red flags. Do NOT refuse outright or accuse him — that could trigger flight. Instead, follow AML procedures: engage in conversation to gather information. Ask about the nature of the work and the depositor. Your internal alert system should already be flagged.",
        expectedAction:
          "Engage casually: 'Sure, ₹1.5 lakhs — that's a good freelance payment! What kind of work do you do?' Gather information naturally: who deposited the money, nature of work, how long he's been doing this. Check his transaction history internally while talking. Do NOT raise alarm visibly.",
        hints: [
          "Engage in conversation — don't just process or refuse. Gather intelligence.",
          "Check his transaction history: pattern of large deposits and immediate withdrawals = classic mule pattern",
          "Ask conversational questions: what company, what kind of work, who sends the payments",
          "Do NOT say 'this looks suspicious' — he'll either panic or flee",
        ],
        idealKeywords: [
          "what kind of work",
          "freelance",
          "who sends the payment",
          "how long",
          "interesting",
          "company name",
          "checking your account",
        ],
        bannedPhrases: [
          "this looks suspicious",
          "are you laundering money",
          "I'm calling the police",
          "account is frozen",
        ],
        scoring: { "Needs Discovery": 10, "Communication Clarity": 5, Empathy: 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "It's an online company... data entry kind of work. I get payments and I process them. The company name... it's... GlobalTech Solutions or something like that. I've been doing it for about 2 months. Can I just get the cash? I'm in a hurry.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: The story is vague — 'or something like that' for his own employer's name, and 'process payments' is a classic mule description. His hurry is suspicious. Continue gathering information without alarming him. Ask about how he found the job, whether he has an offer letter, and where the processed money goes. Internally, flag this for STR (Suspicious Transaction Report).",
        expectedAction:
          "Stay calm and conversational: 'Processing payments is interesting — how did you find this job? Do you have an offer letter?' Ask where the processed payments go — other accounts? UPI? This confirms the mule pattern. Meanwhile, initiate internal STR flagging without telling him.",
        hints: [
          "He doesn't know his employer's name — major red flag",
          "'Processing payments' = receiving and forwarding money = money mule activity",
          "Ask about the job's recruitment: Telegram, WhatsApp, Instagram are common mule recruitment channels",
          "Ask if he has any documentation: offer letter, contract, company registration — he won't",
        ],
        idealKeywords: [
          "how did you find this job",
          "offer letter",
          "where do the payments go",
          "documentation",
          "Telegram",
          "interesting work",
          "tell me more",
        ],
        bannedPhrases: [
          "you're lying",
          "that's obviously fake",
          "we're reporting you now",
          "money mule",
        ],
        scoring: { "Needs Discovery": 10, "Communication Clarity": 5, "Compliance Language": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "I found it on Telegram... this guy messaged me saying I can earn ₹15,000-20,000 per month just by helping with transactions. No offer letter — it's all online. I transfer the money to accounts he gives me on UPI and keep 10%. Why? Is there a problem?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: He's essentially described the entire money mule operation — Telegram recruitment, no documentation, receiving and forwarding money, keeping a percentage. He may be a victim (exploited through ignorance) or semi-complicit (knows it's grey but doesn't understand the consequences). You must now explain the gravity WITHOUT sending him into panic mode. The goal is to get him to cooperate, not flee.",
        expectedAction:
          "Be serious but not threatening: explain that what he's described — receiving money and forwarding it to other accounts for a commission — is classified as money muling under PMLA, which is a serious criminal offence. He may not have known, but the law doesn't care about intent. However, cooperating NOW helps his case enormously. The Telegram person is using his account to launder fraud proceeds.",
        hints: [
          "Frame it as concern for HIM: 'I need to tell you something important for your own protection'",
          "Explain money muling simply: 'When stolen money passes through your account, you become part of the chain — legally responsible'",
          "PMLA consequence: accounts frozen, criminal investigation, potential imprisonment",
          "But cooperating now — sharing Telegram contacts, transaction details — helps his case",
        ],
        idealKeywords: [
          "your own protection",
          "money muling",
          "PMLA",
          "serious offence",
          "you may not have known",
          "cooperating helps",
          "Telegram contact",
          "stolen money",
        ],
        bannedPhrases: [
          "you're a criminal",
          "you're going to jail",
          "you knew exactly what you were doing",
          "we've already called the police",
        ],
        scoring: { "Communication Clarity": 10, "Compliance Language": 8, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "Criminal offence?! But I'm just a student! I didn't steal anything! That guy on Telegram said it was a legitimate business! Are you going to call the police? Please sir, my parents will kill me. I swear I didn't know this was illegal.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: He's panicking. He may genuinely not have understood the consequences. De-escalate his panic while being honest about the seriousness. Explain that cooperating with the bank and authorities is the BEST way to protect himself. His account will need to be investigated. Encourage him to share all details of the Telegram contact and transaction history.",
        expectedAction:
          "De-escalate: 'I believe you may not have known — many students get trapped this way.' Explain: his cooperation (sharing Telegram chats, contact details of the recruiter, all transaction details) will be critical in showing he's a victim, not a mastermind. The bank will file an STR but his cooperation will be noted. Suggest he inform his parents and consult a lawyer.",
        hints: [
          "Many students fall for this — he's not the first. Frame him as a victim who got exploited.",
          "Cooperation is his best legal defence: share everything about the Telegram contact",
          "The bank must file an STR (Suspicious Transaction Report) — this is mandatory",
          "Suggest he tell his parents and consult a lawyer — trying to hide it will make things worse",
        ],
        idealKeywords: [
          "many students",
          "victim",
          "cooperation",
          "Telegram details",
          "share everything",
          "STR",
          "lawyer",
          "parents",
          "your best protection",
        ],
        bannedPhrases: [
          "you're definitely going to jail",
          "your life is ruined",
          "nothing can help you now",
          "we don't believe you",
        ],
        scoring: { Empathy: 10, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "OK... OK. I'll cooperate. I have all the Telegram chats saved and screenshots of the UPI transfers. I also have his phone number. What do I do now? Should I go to the police station? And what happens to my account?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Give him a clear, step-by-step action plan. His account will be restricted pending investigation (STR filed). He should file a complaint at cybercrime.gov.in with all evidence. Recommend he consult a lawyer. The Telegram screenshots and UPI details are crucial evidence. His cooperation and the evidence trail could help him be treated as a victim rather than an accomplice.",
        expectedAction:
          "Action plan: 1) Bank will restrict the account pending investigation (mandatory). 2) File cyber crime complaint at cybercrime.gov.in or local police cyber cell with all evidence. 3) Save ALL Telegram chats, screenshots, phone numbers — DO NOT delete anything. 4) Consult a lawyer — many offer free initial consultation. 5) Inform parents. Cooperation and evidence = best chance of being treated as a victim.",
        hints: [
          "Account will be restricted — be honest about this, it's mandatory under AML",
          "Evidence preservation is critical: Telegram chats, UPI screenshots, phone numbers",
          "Cyber crime complaint at cybercrime.gov.in — he can file online",
          "Lawyer consultation: legal aid is available if he can't afford one",
          "The ₹1.5L withdrawal cannot be processed — explain clearly why",
        ],
        idealKeywords: [
          "account restricted",
          "investigation",
          "cyber crime complaint",
          "save all evidence",
          "do not delete",
          "lawyer",
          "legal aid",
          "parents",
          "victim not accomplice",
        ],
        bannedPhrases: [
          "your money is gone",
          "you'll never bank again",
          "we can't help you anymore",
          "just deal with the police",
        ],
        scoring: {
          "Communication Clarity": 10,
          "Compliance Language": 7,
          Empathy: 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Needs Discovery",
        keywords: [
          "what kind of work",
          "how did you find",
          "Telegram",
          "offer letter",
          "where does money go",
          "UPI",
          "commission",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "PMLA",
          "STR",
          "money muling",
          "criminal offence",
          "investigation",
          "account restricted",
          "evidence",
        ],
        weight: 25,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "step by step",
          "action plan",
          "cyber crime",
          "save evidence",
          "lawyer",
          "cooperate",
          "file complaint",
        ],
        weight: 20,
      },
      {
        skill: "Empathy",
        keywords: [
          "many students",
          "victim",
          "may not have known",
          "your protection",
          "parents",
          "cooperating helps",
        ],
        weight: 20,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "didn't know",
          "just a student",
          "not a criminal",
          "exploited",
          "cooperation is defence",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "you're a criminal",
        "you're going to prison",
        "we've already reported you",
        "your parents will be arrested too",
        "there's no way out",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL COMPLIANCE BREACH: Threatening or intimidating a potential money mule victim without following proper investigation procedures. Violates PMLA investigation protocols and RBI AML guidelines.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── OPERATIONS (2 scenarios) ──
  // ══════════════════════════════════════════════════════════════

  // ── 14. Locker Nomination Dispute ──
  {
    id: "locker-nomination-dispute",
    title: "Locker Nomination Dispute",
    description:
      "Sanjay and Meena Kapoor are siblings from Mumbai. Their father recently passed away and both claim access to his bank locker. There's no nomination on record and the family is tense. Navigate the legal requirements, manage the family conflict diplomatically, and ensure proper procedure is followed.",
    category: "operations",
    difficulty: "medium",
    xpReward: 100,
    tags: [
      "locker-access",
      "nomination",
      "succession",
      "family-dispute",
      "deceased-account",
      "diplomacy",
    ],
    customer: {
      name: "Sanjay and Meena Kapoor",
      age: 48,
      profession: "Business (Sanjay) / Teacher (Meena)",
      city: "Mumbai",
      avatar: "SK",
      personality:
        "Both are educated and articulate but emotionally charged. Sanjay believes he should have access because he's the eldest son. Meena believes she should have access because she was their father's caretaker. They are not hostile to each other but the grief and stress are creating friction. They need a neutral third party (the RM) to guide them through the legal process.",
      goal: "Access their deceased father's bank locker and claim its contents",
      archetype: "GRIEVING_FAMILY",
      moodInitial: 4,
      hotButtons: [
        "you should settle this between yourselves",
        "we can't get involved in family matters",
        "who's the real heir",
        "bring a court order",
        "this is your problem",
      ],
      aiPersonaPrompt:
        "You are both Sanjay Kapoor (48, businessman) and Meena Kapoor (45, teacher) from Mumbai. Your father, Mr. Harish Kapoor, passed away 3 weeks ago. He had a locker at this bank for 20 years but never added a nominee.\n\nSanjay believes as the eldest son, he has natural rights. Meena believes she should be involved because she took care of their father for the last 10 years while Sanjay lived abroad.\n\nBehaviour rules:\n- You are both grieving and stressed. You agree on one thing: you want to access the locker.\n- Sanjay speaks first and is more assertive. Meena is quieter but firm.\n- If the RM takes sides, the other sibling gets angry.\n- If the RM explains the legal process neutrally and treats both equally, you cooperate.\n- You do NOT have a will or succession certificate yet.\n- If guided properly, you'll agree to get a succession certificate together.\n- Alternate between Sanjay and Meena speaking. Keep responses 1-3 sentences.",
    },
    openingStatement:
      "We're Sanjay and Meena Kapoor. Our father Harish Kapoor passed away three weeks ago. He had a locker here — number 247. We need to access it. There's no will and no nomination. I'm the eldest son — [Meena interjects: And I took care of Papa for 10 years.] — Can you please help us?",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "We're Sanjay and Meena Kapoor. Our father Harish Kapoor passed away three weeks ago. He had a locker here — number 247. We need to access it. There's no will and no nomination. I'm the eldest son — [Meena interjects: And I took care of Papa for 10 years.] — Can you please help us?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Express condolences first. Then set expectations clearly: without a will or nomination, the bank CANNOT give locker access to either sibling individually. The legal path requires either a succession certificate from the court or a legal heir certificate from the tehsildar/SDM, along with an indemnity bond. Do NOT take sides. Explain the process to BOTH equally.",
        expectedAction:
          "Express sincere condolences. Explain: without nomination or will, the bank needs a succession certificate or legal heir certificate to grant locker access. BOTH siblings (and any other legal heirs) need to be part of this process. The bank's role is to follow the legal procedure, not decide between heirs.",
        hints: [
          "Condolences first — they are grieving. Don't jump into procedure immediately.",
          "No nomination + no will = succession certificate or legal heir certificate required",
          "The bank cannot and should not choose between heirs — that's the court's role",
          "Treat both siblings with equal respect and attention",
        ],
        idealKeywords: [
          "condolences",
          "succession certificate",
          "legal heir certificate",
          "both of you",
          "legal process",
          "no nomination",
          "court",
          "procedure",
        ],
        bannedPhrases: [
          "eldest son has first right",
          "caretaker has more claim",
          "settle it between yourselves",
          "we can't help with family matters",
        ],
        scoring: { Empathy: 8, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "[Sanjay:] Succession certificate? That means going to court? How long does that take? We need to access the locker urgently — there might be important documents inside, maybe even a will! [Meena:] Can't the bank just open it with both of us present?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Be empathetic about the urgency but honest about the legal reality. The bank CANNOT open the locker without proper legal authority — this protects THEM. Explain the two paths: succession certificate (court — takes 2-6 months) or legal heir certificate (tehsildar — faster, 2-4 weeks). Mention that some banks allow inventory of locker contents in the presence of all legal heirs and bank officials as an interim step.",
        expectedAction:
          "Explain two paths: 1) Succession certificate from civil court (2-6 months) 2) Legal heir certificate from tehsildar/SDM (2-4 weeks, faster). Some banks allow an interim inventory: open the locker in the presence of all legal heirs + bank manager + independent witness, list contents, then re-seal until legal process is complete.",
        hints: [
          "Legal heir certificate from tehsildar is MUCH faster than succession certificate from court",
          "Interim inventory procedure: open locker with all heirs present, list contents, re-seal",
          "This is for THEIR protection — ensures nobody accesses without others' knowledge",
          "If there's a will inside the locker, the interim inventory will reveal it",
        ],
        idealKeywords: [
          "legal heir certificate",
          "tehsildar",
          "2-4 weeks",
          "succession certificate",
          "interim inventory",
          "all heirs present",
          "re-seal",
          "your protection",
        ],
        bannedPhrases: [
          "just get a court order",
          "we can't do anything without a lawyer",
          "this isn't our problem",
          "it takes years in court",
        ],
        scoring: { "Product Knowledge": 10, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "[Meena:] Interim inventory — yes, that works. At least we'll know what's inside. [Sanjay:] But who else is a legal heir? It's just us two and our mother. [Meena:] Mummy is 78 and not well enough to come to the bank. What do we do about her?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the mother's inclusion. ALL legal heirs must be part of the process. If the mother is unable to come to the branch, she can provide a notarised consent letter or give a power of attorney to one of the siblings. Explain the documentation needed for the interim inventory process.",
        expectedAction:
          "All three legal heirs (Sanjay, Meena, mother) must be part of the process. For the mother: she can issue a notarised consent letter authorising either sibling to represent her, or a registered power of attorney. For the interim inventory: all heirs (or their authorised representatives) + bank officer + witness must be present. The bank will list all contents in a sealed inventory register.",
        hints: [
          "All legal heirs must consent — Sanjay, Meena, and mother",
          "Mother can provide: notarised consent letter OR power of attorney to one sibling",
          "The POA should specifically mention locker access and succession matters",
          "This protects the mother's interests too — nobody can claim she was excluded",
        ],
        idealKeywords: [
          "all legal heirs",
          "mother",
          "notarised consent",
          "power of attorney",
          "authorised representative",
          "inventory register",
          "sealed",
          "protects",
        ],
        bannedPhrases: [
          "leave your mother out of it",
          "she doesn't need to be involved",
          "just bring whoever can come",
          "POA is too complicated",
        ],
        scoring: { "Compliance Language": 10, "Communication Clarity": 7, Empathy: 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "[Sanjay:] Fine, I'll get Mummy's consent letter notarised. But what about the locker rent? Papa's account is also frozen. Do we need to pay the rent separately? And what if the rent lapses — will the bank drill open the locker?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the locker rent concern. Explain that the bank will not drill open the locker immediately — there's a process that involves notices and a waiting period. Locker rent can be paid from a separate source or will be deducted from the locker contents during settlement. Explain the RBI guidelines on locker operations after a holder's death.",
        expectedAction:
          "Locker rent: can be paid by legal heirs separately to keep it active during succession process. The bank will NOT drill open without due process: multiple notices, waiting period, and only in the presence of designated officials. RBI 2021 locker guidelines provide clear protection. Advise them to pay the rent to keep everything smooth.",
        hints: [
          "Locker won't be drilled open immediately — there's a notice period and due process",
          "Heirs can pay locker rent to keep it active — simple deposit in the locker rent account",
          "RBI revised locker guidelines (2021) strengthened customer/nominee protections",
          "Better to pay the rent and keep everything smooth during the succession process",
        ],
        idealKeywords: [
          "locker rent",
          "pay separately",
          "not drilled open",
          "notice period",
          "due process",
          "RBI guidelines",
          "2021",
          "heirs can pay",
        ],
        bannedPhrases: [
          "if you don't pay we'll drill it",
          "that's not our concern",
          "pay immediately or lose the locker",
          "I don't know the rules",
        ],
        scoring: { "Product Knowledge": 8, "Compliance Language": 7, "Communication Clarity": 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "[Meena:] Thank you for explaining everything so clearly. [Sanjay:] Yes, this is the first time someone has guided us properly on this. So — to summarise: notarised consent from Mummy, legal heir certificate from tehsildar, pay locker rent in the meantime, and then we can access the locker. Correct?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Confirm his summary is correct and add any missing details. Provide a written checklist if possible. Express empathy for their loss one more time. Offer your direct contact for follow-up. Close with warmth — they came in stressed and are leaving with a clear plan.",
        expectedAction:
          "Confirm the summary: 1) Notarised consent/POA from mother 2) Apply for legal heir certificate at tehsildar office 3) Pay locker rent to keep it active 4) Once certificate is received, bring it with all three heirs' (or representatives') consent for locker access. Offer to provide a written checklist. Give direct contact. Express condolences again.",
        hints: [
          "Confirm his summary is accurate — he's got the essentials right",
          "Add: bring the death certificate and original locker key when they come for access",
          "Offer a written checklist — grieving families appreciate structured guidance",
          "Close with warmth and a reminder that you're available for questions",
        ],
        idealKeywords: [
          "correct summary",
          "death certificate",
          "locker key",
          "written checklist",
          "direct contact",
          "condolences",
          "available for questions",
          "take care",
        ],
        bannedPhrases: [
          "good luck with the family stuff",
          "hope you don't fight about it",
          "just follow the process",
          "nothing else I can do",
        ],
        scoring: {
          "Communication Clarity": 8,
          Empathy: 7,
          "Compliance Language": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Compliance Language",
        keywords: [
          "succession certificate",
          "legal heir certificate",
          "tehsildar",
          "notarised",
          "POA",
          "RBI guidelines",
          "all legal heirs",
        ],
        weight: 25,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "two paths",
          "interim inventory",
          "checklist",
          "documents needed",
          "timeline",
          "step by step",
        ],
        weight: 25,
      },
      {
        skill: "Empathy",
        keywords: [
          "condolences",
          "grief",
          "understand",
          "difficult time",
          "your father",
          "both of you",
          "neutral",
        ],
        weight: 20,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "locker rent",
          "inventory",
          "re-seal",
          "death certificate",
          "locker key",
          "notice period",
        ],
        weight: 15,
      },
      {
        skill: "Objection Handling",
        keywords: [
          "both heirs",
          "mother's consent",
          "neutral",
          "court's role",
          "protection",
          "equal",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "eldest son has first right",
        "settle it among yourselves",
        "we don't get involved in family matters",
        "just bring a court order",
      ],
      violationPenalty: 35,
      violationMessage:
        "COMPLIANCE BREACH: Taking sides in a succession dispute or refusing to guide customers through the legal process. Violates RBI locker operation guidelines and fair treatment principles.",
    },
  },

  // ── 15. Deceased Account Processing ──
  {
    id: "succession-certificate",
    title: "Deceased Account Processing",
    description:
      "Lakshmi Iyer is a 58-year-old widow from Coimbatore whose husband passed away 2 months ago. She needs access to his bank account — their only source of savings. She is emotional, overwhelmed by paperwork, and afraid of navigating bureaucracy alone. Guide her with patience, clarity, and compassion.",
    category: "operations",
    difficulty: "hard",
    xpReward: 130,
    tags: [
      "deceased-account",
      "succession",
      "widow",
      "nomination",
      "claim-process",
      "empathy",
      "operations",
    ],
    customer: {
      name: "Lakshmi Iyer",
      age: 58,
      profession: "Homemaker",
      city: "Coimbatore",
      avatar: "LI",
      personality:
        "Soft-spoken, emotional, and overwhelmed. Her husband handled all financial matters — she doesn't even know all their accounts. Everything feels like a mountain right now. Gets teary when talking about her husband. Responds well to patient, step-by-step guidance. Gets confused by jargon. Needs someone to take the complexity away, not add to it.",
      goal: "Access her deceased husband's savings account which has their life savings of about ₹8 lakhs",
      archetype: "GRIEVING_WIDOW",
      moodInitial: 5,
      hotButtons: [
        "it's a long process",
        "bring all these documents",
        "we can't help without paperwork",
        "these are the rules",
        "come back when you have everything",
      ],
      aiPersonaPrompt:
        "You are Lakshmi Iyer, 58, from Coimbatore. Your husband Krishnamurthy passed away 2 months ago from a heart attack. He had a savings account with about ₹8 lakhs — your entire life savings. He handled all financial matters. You found the passbook but don't know the net banking password or anything.\n\nYour husband had added you as a nominee on the account (you think — he mentioned it once).\n\nBehaviour rules:\n- You get emotional when talking about your husband. You may cry.\n- You are overwhelmed by paperwork and procedure. Everything feels impossible.\n- You have the passbook, his death certificate, and your Aadhaar. You're not sure what else is needed.\n- If the RM is patient and kind, you feel supported and can follow instructions.\n- If the RM is mechanical or bureaucratic, you feel helpless and want to leave.\n- You have a nephew who helps you sometimes but he works in Chennai.\n- Keep responses 1-3 sentences. Be soft and emotional.",
    },
    openingStatement:
      "Namaste... I am Lakshmi Iyer. My husband Krishnamurthy... he passed away two months ago. He had an account here. I found his passbook — it shows ₹8 lakhs. That is all we have. I don't know how to access it. He used to handle everything. Please... I don't even know where to start.",
    steps: [
      // Round 1
      {
        speaker: "customer",
        text: "Namaste... I am Lakshmi Iyer. My husband Krishnamurthy... he passed away two months ago. He had an account here. I found his passbook — it shows ₹8 lakhs. That is all we have. I don't know how to handle these things. Please... I don't even know where to start.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is a deeply emotional situation. Lead with compassion — not procedure. Offer condolences genuinely. Reassure her that the money is safe and the bank will help her access it. Then gently check one critical thing first: whether her husband had added a nominee on the account. If there's a nomination, the process is MUCH simpler.",
        expectedAction:
          "Express genuine condolences. Reassure her: 'The money is safe and we will help you get access to it.' Ask gently: 'Did your husband ever mention adding a nominee on this account? You mentioned he might have.' Check the account records for nomination status. If she's the nominee, the process is straightforward.",
        hints: [
          "Condolences first — take a moment, don't rush into procedure",
          "Reassurance: 'The money is absolutely safe. We will guide you through every step.'",
          "Check nomination status in the system — this determines the complexity of the process",
          "If she IS the nominee: claim form + death certificate + her ID = much simpler",
        ],
        idealKeywords: [
          "condolences",
          "money is safe",
          "help you",
          "nominee",
          "every step",
          "guide you",
          "check the account",
          "don't worry",
        ],
        bannedPhrases: [
          "bring these 10 documents",
          "it's a long process",
          "we need legal paperwork first",
          "come back with everything ready",
        ],
        scoring: { Empathy: 10, "Communication Clarity": 5, "Needs Discovery": 5 },
      },

      // Round 2
      {
        speaker: "customer",
        text: "He did mention something about nominee once... maybe 5-6 years ago when he last updated the passbook. Is it written somewhere? I brought the passbook and his death certificate. I have my Aadhaar too. Is that enough?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Check the account records for nomination. If she's the registered nominee, the process is straightforward: claim form, death certificate, her ID proof, and the passbook. If there's NO nomination, it becomes more complex (succession certificate needed). Either way, explain the process simply and offer to help her fill out any forms.",
        expectedAction:
          "Check the system for nomination. If she IS the nominee: 'Good news — you are the nominee. The process is simple.' She needs: 1) Nominee claim form (help her fill it) 2) Original death certificate 3) Her Aadhaar/ID 4) Passbook. Money can be transferred to her account within 7-15 days. If NO nomination: explain the legal heir certificate route patiently.",
        hints: [
          "Check nomination status before listing any documents — it changes the entire process",
          "If she's the nominee: claim form + death certificate + her ID = done within 2 weeks",
          "Help her FILL OUT the form right now — don't just hand her a blank form",
          "The passbook she brought is helpful — it confirms the account details",
        ],
        idealKeywords: [
          "checking nomination",
          "nominee",
          "good news",
          "claim form",
          "death certificate",
          "Aadhaar",
          "7-15 days",
          "help you fill",
        ],
        bannedPhrases: [
          "fill this form at home and come back",
          "we need certified copies of everything",
          "this might take months",
          "I'm not sure if there's a nominee",
        ],
        scoring: { "Product Knowledge": 10, Empathy: 5, "Communication Clarity": 5 },
      },

      // Round 3
      {
        speaker: "customer",
        text: "Oh, I am the nominee? Thank God... my husband was always so careful about these things. But ₹8 lakhs — when will I actually get the money? I need to pay hospital bills from his treatment. They are calling every day. And can the money come to my own account? I have an account at another bank.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address her urgent financial need. The nominee claim typically takes 7-15 working days after submission of all documents. The money can be transferred to any account she specifies — including her account at another bank. For urgent hospital bills, check if any interim payment or faster processing is possible given the circumstances.",
        expectedAction:
          "Timeline: 7-15 working days after document submission. Money can go to her account at another bank — she just needs to provide the account number and IFSC. For urgent hospital bills: speak to the branch manager about expediting the process or issuing an interim payment given the medical emergency context.",
        hints: [
          "7-15 working days is the standard timeline for nominee claims",
          "Money can be transferred to any account she designates — provide account + IFSC",
          "Hospital bills are urgent — escalate to branch manager for possible expedited processing",
          "Some banks can release partial amounts faster in medical emergency situations",
        ],
        idealKeywords: [
          "7-15 days",
          "your account",
          "account number",
          "IFSC",
          "expedite",
          "hospital bills",
          "branch manager",
          "urgent",
        ],
        bannedPhrases: [
          "standard processing only",
          "we can't speed it up",
          "hospital bills are not our concern",
          "wait for the full process",
        ],
        scoring: { Empathy: 8, "Product Knowledge": 7, "Communication Clarity": 5 },
      },

      // Round 4
      {
        speaker: "customer",
        text: "If you can expedite, that would be a blessing. I have one more question — my husband also had a fixed deposit here, I think. And there might be an insurance policy linked to the account. I found some papers at home but I can't understand them. Can you check?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is common — the surviving spouse often doesn't know all financial products. Check the system for any FDs, RDs, insurance policies, or other accounts linked to the deceased's CIF (customer ID). Provide a complete picture of all holdings. If there's an insurance policy, guide her on the claim process.",
        expectedAction:
          "Check the deceased's CIF for all linked products: FDs, RDs, insurance policies, loans, other accounts. Give her a complete list. For each product, briefly explain the claim process. For insurance: separate claim form, contact the insurance company. Offer to help with each claim. This is a one-stop service moment.",
        hints: [
          "Check CIF for ALL products — she may not know about everything",
          "FD nomination: if she's nominee there too, same simple claim process",
          "Insurance claim: contact the insurer, file claim with death certificate and policy documents",
          "This is where you can add real value — consolidate everything into one clear picture for her",
        ],
        idealKeywords: [
          "checking all products",
          "FD",
          "insurance",
          "CIF",
          "complete list",
          "claim process for each",
          "help with everything",
          "one place",
        ],
        bannedPhrases: [
          "only the savings account is our department",
          "insurance is not our product",
          "check with the insurance company yourself",
          "I can only help with what you asked about",
        ],
        scoring: { "Needs Discovery": 10, "Product Knowledge": 7, Empathy: 5 },
      },

      // Round 5
      {
        speaker: "customer",
        text: "There's an FD of ₹3 lakhs also? And an insurance policy? I had no idea... Krishnamurthy was always so organised. Thank you beta, you have been so kind. I was so scared coming here today — I thought it would be impossible. Can you write down everything I need to do? I'll ask my nephew to help me.",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Close with a comprehensive written action plan. She needs clarity — a simple checklist she can follow with her nephew's help. Cover: savings account claim, FD claim, insurance claim, documents needed for each. Give your direct contact. End with genuine warmth — she came in terrified and is leaving empowered.",
        expectedAction:
          "Provide a written checklist: 1) Savings account: nominee claim form (already helped fill) + death certificate + her Aadhaar + passbook → 7-15 days. 2) FD: same claim form → 7-15 days. 3) Insurance: claim form from insurer + death certificate + policy document + hospital records → contact insurer helpline. Give your direct number. Thank her for her courage in coming in today.",
        hints: [
          "Write everything down — she will need to share this with her nephew",
          "Simple numbered steps for each claim — savings, FD, insurance",
          "Give your direct number: 'Call me anytime if you have questions'",
          "Close with warmth: 'Your husband took very good care of your finances. Now we'll make sure you can access everything he saved for you.'",
        ],
        idealKeywords: [
          "written checklist",
          "savings claim",
          "FD claim",
          "insurance claim",
          "documents for each",
          "direct number",
          "nephew",
          "call anytime",
          "courage",
        ],
        bannedPhrases: [
          "figure it out from here",
          "I've explained everything already",
          "your nephew should know this stuff",
          "good luck",
        ],
        scoring: {
          "Communication Clarity": 10,
          Empathy: 7,
          "Product Knowledge": 5,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Empathy",
        keywords: [
          "condolences",
          "money is safe",
          "help you",
          "guide",
          "patience",
          "courage",
          "kind",
          "don't worry",
        ],
        weight: 25,
      },
      {
        skill: "Communication Clarity",
        keywords: [
          "checklist",
          "step by step",
          "7-15 days",
          "written",
          "simple",
          "documents needed",
          "each claim",
        ],
        weight: 25,
      },
      {
        skill: "Product Knowledge",
        keywords: [
          "nominee",
          "claim form",
          "CIF",
          "FD",
          "insurance",
          "death certificate",
          "passbook",
          "IFSC",
        ],
        weight: 20,
      },
      {
        skill: "Needs Discovery",
        keywords: [
          "hospital bills",
          "all products",
          "FD",
          "insurance",
          "complete picture",
          "nephew",
          "urgent",
        ],
        weight: 15,
      },
      {
        skill: "Compliance Language",
        keywords: [
          "nomination",
          "legal heir",
          "succession",
          "claim process",
          "death certificate",
          "original documents",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "bring a lawyer",
        "this will take months",
        "we can't tell you about other products",
        "fill the forms yourself",
        "come back when you have everything",
      ],
      violationPenalty: 40,
      violationMessage:
        "COMPLIANCE BREACH: Refusing to guide a bereaved nominee through the claim process or being insensitive to a grieving customer. Violates RBI customer service standards and the bank's duty of care.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── PHARMA — CAPA INVESTIGATION SCENARIOS ──
  // ══════════════════════════════════════════════════════════════

  // ── 1. CAPA Investigator: Save the Batch — Microbial Contamination ──
  {
    id: "capa-microbial-contamination",
    title: "CAPA Investigator: Save the Batch — Microbial Contamination",
    description:
      "Batch #A102 has failed microbial testing — contamination detected beyond acceptable limits. As a Quality Assurance Officer, you must stop the line, investigate the root cause, implement corrective actions, and design preventive measures. Every decision you make impacts patient safety, GMP compliance, and the company's reputation. One wrong call and a contaminated batch reaches patients.",
    category: "pharma",
    difficulty: "easy",
    xpReward: 100,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "microbial-contamination",
      "root-cause-analysis",
      "quality-assurance",
      "patient-safety",
      "deviation-management",
    ],
    customer: {
      name: "CAPA Alert System",
      age: 0,
      profession: "QA Alert System",
      city: "Manufacturing Plant",
      avatar: "QA",
      personality:
        "You are the pharmaceutical plant's Quality Alert System and the voice of the production floor. You present deviations, lab findings, and investigation data in a clinical, factual manner. You escalate when the QA Officer makes unsafe decisions. You praise sound GMP reasoning.",
      goal: "Guide the QA Officer through a CAPA investigation for Batch #A102 microbial failure and evaluate their decisions for GMP compliance",
      archetype: "PHARMA_QA_SYSTEM",
      moodInitial: 5,
      hotButtons: [
        "ignore deviation",
        "skip documentation",
        "release without testing",
        "blame operator",
        "shortcut",
      ],
      aiPersonaPrompt:
        "You are the Quality Alert System at a pharmaceutical manufacturing plant. Batch #A102 of an oral solid dosage form has failed microbial limit testing — total aerobic microbial count (TAMC) is 1500 CFU/g against an acceptance limit of 1000 CFU/g. Specific pathogens (E. coli, Salmonella) are absent, but the TAMC exceedance is a critical deviation.\n\nYou present facts, lab data, and investigation findings. You respond based on the QA Officer's decisions:\n- If they make the RIGHT call (stop batch, investigate, perform RCA, implement CAPA), provide supporting data and escalate appropriately.\n- If they make a WRONG call (ignore, release, skip documentation), firmly flag the GMP violation and explain the regulatory risk.\n- Present findings progressively — first the alert, then investigation data, then root cause confirmation, then ask for corrective and preventive actions.\n\nBe clinical and factual. Use pharmaceutical terminology. Keep responses 2-4 sentences. Reference specific GMP guidelines (21 CFR Part 211, ICH Q10) when relevant.",
    },
    openingStatement:
      "⚠️ DEVIATION ALERT — Batch #A102 (Amoxicillin 500mg tablets) has FAILED microbial limit testing. TAMC detected: 1,500 CFU/g. Acceptance limit: 1,000 CFU/g. Specific pathogens (E. coli, Salmonella) NOT detected. The batch is currently on the packaging line. Immediate action required. What is your first decision?",
    steps: [
      // ── Step 1: Deviation Alert — First Response ──
      {
        speaker: "customer",
        text: "⚠️ DEVIATION ALERT — Batch #A102 (Amoxicillin 500mg tablets) has FAILED microbial limit testing. TAMC detected: 1,500 CFU/g. Acceptance limit: 1,000 CFU/g. Specific pathogens (E. coli, Salmonella) NOT detected. The batch is currently on the packaging line. Immediate action required. What is your first decision?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is the critical first decision. You MUST stop the batch immediately and initiate a formal investigation. Releasing, ignoring, or proceeding with the batch is a serious GMP violation. Patient safety comes first — always.",
        expectedAction:
          "Stop the batch immediately, quarantine it, halt the packaging line, and initiate a formal deviation report per GMP requirements",
        hints: [
          "Patient safety is the #1 priority — a failed batch must NEVER proceed",
          "Quarantine the batch and all related in-process materials",
          "Initiate a formal deviation report per 21 CFR Part 211",
          "Notify the QA Head and Production Manager immediately",
        ],
        idealKeywords: [
          "stop",
          "halt",
          "quarantine",
          "investigate",
          "deviation report",
          "patient safety",
          "hold",
          "do not release",
          "notify QA head",
          "formal investigation",
        ],
        bannedPhrases: [
          "ignore",
          "proceed anyway",
          "release with warning",
          "it's only slightly over",
          "inform marketing",
          "ship it",
          "not a big deal",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Analytical Thinking": 10,
          "Patient Safety": 15,
        },
      },

      // ── Step 2: Root Cause Investigation ──
      {
        speaker: "customer",
        text: "✅ Batch #A102 quarantined. Packaging line halted. Deviation report DR-2024-0847 initiated. Initial environmental monitoring data shows the mixing area (Room 204) had an unusual spike in particle count during the batch manufacturing window. HVAC logs show no alarms. Cleaning logs for the mixer (EQ-MX-015) show last cleaning was performed 48 hours ago — against the SOP requirement of cleaning within 24 hours of use. How will you investigate the root cause?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Choose the correct investigation approach. You must perform a structured root cause analysis — not blame individuals, not skip documentation, not restart production prematurely. Identify the investigation tools and areas to examine.",
        expectedAction:
          "Initiate a formal root cause analysis using tools like Ishikawa (fishbone) diagram or 5-Why analysis. Identify key investigation areas: equipment cleaning records, environmental monitoring, personnel practices, raw material quality, and SOP adherence.",
        hints: [
          "Use structured RCA tools: Ishikawa diagram, 5-Why, fault tree analysis",
          "The cleaning log gap (48h vs 24h SOP) is a strong lead — investigate further",
          "Check personnel training records for the cleaning operator",
          "Review environmental monitoring trends for Room 204 over the past week",
          "Never blame an operator without investigating systemic failures first",
        ],
        idealKeywords: [
          "root cause analysis",
          "fishbone",
          "5-why",
          "Ishikawa",
          "cleaning validation",
          "SOP deviation",
          "environmental monitoring",
          "equipment cleaning",
          "training records",
          "systematic investigation",
          "improper cleaning",
          "equipment failure",
          "environmental contamination",
        ],
        bannedPhrases: [
          "blame the operator",
          "fire the worker",
          "skip documentation",
          "restart production now",
          "it was human error, move on",
          "not important",
        ],
        scoring: {
          "Analytical Thinking": 15,
          "GMP Awareness": 10,
          "Preventive Thinking": 10,
        },
      },

      // ── Step 3: Root Cause Confirmed — Corrective Action ──
      {
        speaker: "customer",
        text: "Investigation findings confirmed: Root cause identified as IMPROPER CLEANING of mixer EQ-MX-015. The cleaning operator (Op-12) missed the 24-hour re-cleaning window. Contributing factors: (1) No automated alert system for cleaning schedule overdue, (2) Op-12's training on cleaning SOP was last updated 14 months ago (annual refresher overdue), (3) Cleaning log is manual — paper-based and prone to oversight. What corrective action do you recommend to address the IMMEDIATE issue?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Recommend corrective actions that address the immediate problem. Corrective actions fix what happened NOW — they are different from preventive actions (which prevent recurrence). Focus on the batch, the equipment, and the immediate gap.",
        expectedAction:
          "Recommend: (1) Reject or reprocess Batch #A102 based on further evaluation, (2) Deep-clean and re-validate mixer EQ-MX-015 immediately, (3) Retrain the cleaning operator (Op-12) on the cleaning SOP immediately, (4) Review all batches manufactured on EQ-MX-015 in the past week for potential impact.",
        hints: [
          "Corrective = fix the immediate issue; Preventive = stop it from happening again",
          "The batch may need to be rejected — reprocessing depends on product stability data",
          "The mixer needs immediate deep cleaning and swab testing before reuse",
          "Op-12 needs immediate retraining — not punishment",
          "Check impact on other recent batches from the same equipment",
        ],
        idealKeywords: [
          "clean equipment",
          "retrain",
          "reject batch",
          "reprocess",
          "re-validate",
          "swab test",
          "impact assessment",
          "immediate retraining",
          "deep clean",
          "review recent batches",
        ],
        bannedPhrases: [
          "ignore issue",
          "continue production",
          "change batch number",
          "just relabel",
          "not our problem",
          "blame the operator and move on",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Analytical Thinking": 10,
          "Compliance Understanding": 10,
        },
      },

      // ── Step 4: Preventive Action — Long-term Fix ──
      {
        speaker: "customer",
        text: "✅ Corrective actions initiated: Batch #A102 rejected and sent for destruction. Mixer EQ-MX-015 deep-cleaned, swab tested — results pending. Op-12 scheduled for immediate SOP retraining. Impact assessment of last 5 batches on EQ-MX-015 underway — all passed microbial testing. Now the critical question: What PREVENTIVE actions will you implement to ensure this NEVER happens again?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design preventive actions that address the SYSTEMIC failures, not just the immediate incident. Think about SOP revision, automation, training programs, audit schedules, and monitoring systems. This is where a strong QA Officer differentiates themselves.",
        expectedAction:
          "Recommend systemic preventive actions: (1) Revise cleaning SOP with tighter controls, (2) Implement automated cleaning schedule alerts in the LIMS/ERP system, (3) Replace manual paper-based cleaning logs with electronic batch records, (4) Establish quarterly cleaning validation audits, (5) Implement mandatory annual training refresher tracking with automated reminders, (6) Install continuous environmental monitoring in critical manufacturing areas.",
        hints: [
          "Revise the cleaning SOP — the 24-hour window needs automated enforcement",
          "Move from paper-based to electronic cleaning logs — reduces human error",
          "Implement automated alerts when cleaning schedules are overdue",
          "Periodic audits: quarterly cleaning validation checks",
          "Training management system with automated refresher reminders",
          "Consider continuous environmental monitoring (particle counters, viable monitoring)",
        ],
        idealKeywords: [
          "revise SOP",
          "automated alerts",
          "electronic records",
          "cleaning validation",
          "periodic audits",
          "training program",
          "annual refresher",
          "environmental monitoring",
          "LIMS",
          "CAPA effectiveness",
          "continuous improvement",
          "preventive",
        ],
        bannedPhrases: [
          "no changes needed",
          "just retrain everyone",
          "it was a one-time thing",
          "won't happen again",
          "fire the operator",
          "not worth the investment",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "Compliance Understanding": 10,
          "GMP Awareness": 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "good manufacturing practice",
          "21 CFR",
          "ICH",
          "deviation",
          "quarantine",
          "SOP",
          "batch record",
          "documentation",
        ],
        weight: 25,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "root cause",
          "investigation",
          "fishbone",
          "5-why",
          "Ishikawa",
          "contributing factor",
          "systematic",
          "data",
          "evidence",
        ],
        weight: 20,
      },
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "safety",
          "contamination",
          "reject",
          "quarantine",
          "halt",
          "stop",
          "do not release",
          "risk",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "prevent",
          "SOP revision",
          "audit",
          "training",
          "automated",
          "monitoring",
          "electronic",
          "CAPA",
          "continuous improvement",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "compliance",
          "regulatory",
          "FDA",
          "audit trail",
          "documentation",
          "validation",
          "qualification",
          "CAPA",
          "effectiveness check",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "release the batch",
        "ignore the deviation",
        "proceed with packaging",
        "it's only slightly above the limit",
        "no need to investigate",
        "skip the documentation",
        "patient safety is secondary",
        "just change the label",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: Releasing a failed batch, ignoring deviations, or bypassing investigation directly endangers patient safety and violates 21 CFR Part 211 and ICH Q10 guidelines. This could result in FDA warning letters, product recalls, and criminal liability.",
    },
  },

  // ── 2. CAPA Investigator: HVAC System Failure ──
  {
    id: "capa-hvac-failure",
    title: "CAPA Investigator: Cleanroom Crisis — HVAC Failure",
    description:
      "The HVAC system in Sterile Manufacturing Area (Room 301) experienced a 90-minute unplanned shutdown during active production of an injectable batch. Differential pressure dropped below specification, and particle counts spiked to Class 100,000 levels in a Class 100 cleanroom. Three batches were in various stages of production. As QA Officer, you must assess the impact, investigate, and implement CAPA before the next FDA audit in 2 weeks.",
    category: "pharma",
    difficulty: "medium",
    xpReward: 150,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "HVAC",
      "cleanroom",
      "sterile-manufacturing",
      "environmental-monitoring",
      "FDA-audit",
      "injectable",
    ],
    customer: {
      name: "Sterile Ops Alert",
      age: 0,
      profession: "Sterile Manufacturing System",
      city: "Sterile Facility",
      avatar: "SO",
      personality:
        "You are the sterile manufacturing facility's monitoring system. You present environmental data, HVAC logs, and batch exposure information with clinical precision. Sterile manufacturing deviations are HIGH RISK — injectable products go directly into the bloodstream. You escalate firmly when decisions could compromise sterility assurance.",
      goal: "Guide the QA Officer through HVAC failure investigation in a sterile manufacturing area with multiple exposed batches",
      archetype: "PHARMA_STERILE_OPS",
      moodInitial: 4,
      hotButtons: [
        "sterility not important",
        "skip media fill",
        "release without investigation",
        "HVAC doesn't matter",
        "just filter it",
      ],
      aiPersonaPrompt:
        "You are the Sterile Manufacturing Monitoring System. Room 301 is a Class 100 (ISO 5) cleanroom used for aseptic filling of injectable products. The HVAC system had an unplanned 90-minute shutdown due to a compressor failure.\n\nDuring the shutdown:\n- Differential pressure dropped from +15 Pa to -2 Pa (spec: ≥+10 Pa)\n- Particle count (≥0.5μm) spiked from 3,500/m³ to 3,500,000/m³\n- Temperature rose from 20°C to 27°C\n- Three batches were exposed: Batch #I-201 (filling complete, vials sealed), Batch #I-202 (mid-filling, vials open), Batch #I-203 (compounding stage, solution in vessel)\n\nPresent data progressively. If the QA Officer makes sterility-compromising decisions, firmly flag the risk — injectable contamination can be fatal. Reference FDA Guidance for Sterile Drug Products, EU Annex 1, and USP <797>. Keep responses 2-4 sentences.",
    },
    openingStatement:
      "🔴 CRITICAL ALERT — HVAC FAILURE in Sterile Manufacturing Room 301 (Class 100/ISO 5). System was down for 90 minutes due to compressor failure. Differential pressure dropped to -2 Pa (spec: ≥+10 Pa). Particle count spiked to 3,500,000/m³ (limit: 3,520/m³). Three active batches exposed: Batch #I-201 (sealed vials), #I-202 (OPEN vials mid-fill), #I-203 (compounding vessel). HVAC is now restored. What is your immediate response?",
    steps: [
      // ── Step 1: Immediate Response ──
      {
        speaker: "customer",
        text: "🔴 CRITICAL ALERT — HVAC FAILURE in Sterile Manufacturing Room 301 (Class 100/ISO 5). System was down for 90 minutes due to compressor failure. Differential pressure dropped to -2 Pa (spec: ≥+10 Pa). Particle count spiked to 3,500,000/m³ (limit: 3,520/m³). Three active batches exposed: Batch #I-201 (sealed vials), #I-202 (OPEN vials mid-fill), #I-203 (compounding vessel). HVAC is now restored. What is your immediate response?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Triage the crisis. Three batches have different exposure levels. Batch #I-202 (open vials) is the highest risk. You must quarantine ALL three batches, halt production in Room 301, initiate environmental re-qualification, and assess each batch's risk level independently.",
        expectedAction:
          "Quarantine all three batches immediately. Halt all production in Room 301. Initiate room re-qualification (particle counts, viable monitoring, pressure verification). Prioritize Batch #I-202 as highest risk (open vials during HVAC failure). Notify QA Head, Production Director, and Regulatory Affairs.",
        hints: [
          "Open vials (I-202) = highest sterility risk — direct exposure to uncontrolled environment",
          "Sealed vials (I-201) may be salvageable — but need sterility testing",
          "Compounding vessel (I-203) — depends on whether vessel was sealed or open",
          "Room 301 cannot resume production until environmental re-qualification is complete",
          "FDA audit is in 2 weeks — documentation must be flawless",
        ],
        idealKeywords: [
          "quarantine all batches",
          "halt production",
          "re-qualification",
          "environmental monitoring",
          "sterility test",
          "open vials highest risk",
          "notify QA head",
          "deviation report",
          "I-202 critical",
        ],
        bannedPhrases: [
          "only quarantine one batch",
          "resume production immediately",
          "HVAC is fixed so we're fine",
          "sterility doesn't matter for sealed vials",
          "no need to requalify the room",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Analytical Thinking": 10,
          "Patient Safety": 15,
        },
      },

      // ── Step 2: Batch Risk Assessment ──
      {
        speaker: "customer",
        text: "All three batches quarantined. Room 301 production halted. Environmental re-qualification initiated — settle plates deployed, particle counters running, pressure verification started. Now assess each batch:\n\n• Batch #I-201: Filling was COMPLETE, vials were crimped and sealed 15 minutes BEFORE HVAC failure.\n• Batch #I-202: 3,200 of 5,000 vials were filled and OPEN (stoppers not yet placed) during the entire 90-minute failure.\n• Batch #I-203: Solution in compounding vessel — vessel was CLOSED with a 0.22μm vent filter.\n\nWhat is your risk assessment and disposition decision for each batch?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Perform a risk-based assessment of each batch. Not all batches carry the same risk. Demonstrate that you can differentiate exposure levels and make proportionate decisions — rejecting what must be rejected while evaluating what can be saved through additional testing.",
        expectedAction:
          "Batch #I-201 (sealed before failure): LOW RISK — proceed with full sterility testing (14-day incubation), endotoxin testing, and particulate inspection. Potential for release if all tests pass. Batch #I-202 (open vials during failure): HIGHEST RISK — reject the 3,200 open-filled vials. Contamination exposure was direct and prolonged. The remaining unfilled 1,800 vials are not affected. Batch #I-203 (closed vessel with 0.22μm filter): MEDIUM RISK — the vent filter should have protected the solution, but test filter integrity (bubble point test) and perform bioburden testing on the solution before proceeding.",
        hints: [
          "I-201 was sealed BEFORE the failure — integrity depends on crimp quality and sterility test results",
          "I-202 had OPEN vials for 90 minutes in a compromised environment — this is almost certainly non-salvageable",
          "I-203's 0.22μm vent filter is designed to prevent microbial ingress — but filter integrity must be verified",
          "FDA expects risk-based decision-making, not blanket rejection of everything",
          "Document your rationale for each decision — the FDA audit is in 2 weeks",
        ],
        idealKeywords: [
          "risk assessment",
          "I-202 reject",
          "open vials",
          "sterility testing",
          "filter integrity",
          "bubble point",
          "endotoxin",
          "14-day incubation",
          "proportionate",
          "I-201 low risk",
          "I-203 medium risk",
        ],
        bannedPhrases: [
          "release all three",
          "reject all three without assessment",
          "sterility testing not needed",
          "filter doesn't matter",
          "open vials are probably fine",
        ],
        scoring: {
          "Analytical Thinking": 20,
          "GMP Awareness": 10,
          "Patient Safety": 10,
        },
      },

      // ── Step 3: Root Cause & Corrective Action ──
      {
        speaker: "customer",
        text: "Disposition decisions accepted by QA Head. Batch #I-202 (open vials) rejected — sent for destruction. #I-201 and #I-203 under extended testing. Now: the HVAC investigation reveals the compressor (HVAC-C03) failed due to a worn bearing. Maintenance records show the bearing was flagged as 'nearing end of life' 4 months ago in a preventive maintenance report, but replacement was deferred due to budget constraints. The backup HVAC unit (HVAC-C04) did NOT auto-switch because the failover relay was disabled during a calibration exercise 3 weeks ago and never re-enabled. What corrective actions do you recommend?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the immediate corrective actions. Two systemic failures occurred: (1) deferred maintenance despite a warning, and (2) backup system disabled and not re-enabled. Both are serious and must be corrected immediately.",
        expectedAction:
          "Immediate corrective actions: (1) Replace the worn bearing on HVAC-C03 immediately, (2) Re-enable and test the failover relay on backup unit HVAC-C04, (3) Review and complete ALL deferred preventive maintenance items across the facility, (4) Perform a full HVAC system qualification (IQ/OQ/PQ) for Room 301 before resuming production, (5) Issue a CAPA for the maintenance deferral decision and the failover relay oversight.",
        hints: [
          "The bearing was a KNOWN risk — deferred maintenance is a systemic governance failure",
          "Backup HVAC disabled for 3 weeks is a critical oversight — failover systems must be verified after any maintenance",
          "Both issues point to weaknesses in the change control and maintenance management systems",
          "Room 301 needs full re-qualification before any production can resume",
          "Document everything — FDA will scrutinize maintenance and change control records",
        ],
        idealKeywords: [
          "replace bearing",
          "re-enable failover",
          "deferred maintenance",
          "HVAC qualification",
          "IQ OQ PQ",
          "change control",
          "maintenance management",
          "CAPA",
          "systemic failure",
          "re-qualification",
        ],
        bannedPhrases: [
          "budget is not our concern",
          "maintenance can wait",
          "backup system isn't critical",
          "just restart production",
          "HVAC is working now so it's fine",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Analytical Thinking": 10,
          "Compliance Understanding": 15,
        },
      },

      // ── Step 4: Preventive Actions & FDA Audit Prep ──
      {
        speaker: "customer",
        text: "Corrective actions in progress. Bearing replaced, failover relay re-enabled and tested. Room 301 re-qualification underway. The FDA audit is in 2 weeks. Your QA Head wants a comprehensive preventive action plan that demonstrates the company has addressed the SYSTEMIC weaknesses — not just fixed the immediate issue. What preventive actions do you propose to present to the FDA?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design a comprehensive preventive action plan that addresses systemic weaknesses in maintenance management, change control, environmental monitoring, and business continuity. This must be FDA-audit-ready — demonstrating proactive quality culture, not reactive firefighting.",
        expectedAction:
          "Comprehensive preventive actions: (1) Implement a Computerized Maintenance Management System (CMMS) with automated alerts for PM schedules — no more manual tracking, (2) Establish a policy that safety-critical maintenance items (HVAC, WFI, compressed air) CANNOT be deferred without QA sign-off, (3) Implement mandatory post-calibration verification checklist for all critical systems — failover, alarms, interlocks must be verified before sign-off, (4) Install redundant environmental monitoring with real-time alerts (particle counts, pressure, temperature) to central QA dashboard, (5) Conduct a facility-wide review of all deferred maintenance items and risk-rank them, (6) Quarterly HVAC system health reviews with trend analysis, (7) Update the Business Continuity Plan for critical utility failures, (8) Present CAPA effectiveness metrics to management review quarterly.",
        hints: [
          "FDA wants to see SYSTEMIC fixes, not just patching the hole",
          "Computerized Maintenance Management System (CMMS) replaces manual tracking",
          "Safety-critical maintenance should require QA approval to defer",
          "Post-maintenance verification checklists prevent the failover relay mistake",
          "Real-time environmental monitoring catches issues before they become deviations",
          "Show FDA a quality culture — proactive, not reactive",
        ],
        idealKeywords: [
          "CMMS",
          "automated alerts",
          "QA approval for deferral",
          "post-maintenance verification",
          "real-time monitoring",
          "trend analysis",
          "management review",
          "CAPA effectiveness",
          "quality culture",
          "business continuity",
          "facility-wide review",
          "risk ranking",
        ],
        bannedPhrases: [
          "no systemic changes needed",
          "we already fixed the bearing",
          "FDA won't ask about this",
          "preventive actions are optional",
          "too expensive to implement",
          "just document what happened",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "Compliance Understanding": 15,
          "GMP Awareness": 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "sterile",
          "cleanroom",
          "ISO 5",
          "Class 100",
          "aseptic",
          "qualification",
          "deviation",
          "SOP",
          "21 CFR",
          "EU Annex 1",
        ],
        weight: 25,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "root cause",
          "risk assessment",
          "investigation",
          "proportionate",
          "evidence",
          "data-driven",
          "systematic",
          "risk-based",
        ],
        weight: 20,
      },
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "safety",
          "sterility",
          "contamination",
          "injectable",
          "reject",
          "quarantine",
          "bloodstream",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "prevent",
          "CMMS",
          "automated",
          "monitoring",
          "trend",
          "systemic",
          "quality culture",
          "continuous improvement",
          "proactive",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "FDA",
          "audit",
          "regulatory",
          "documentation",
          "CAPA",
          "effectiveness",
          "change control",
          "validation",
          "qualification",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "release without sterility testing",
        "open vials are probably sterile",
        "HVAC failure doesn't affect sterility",
        "no need to requalify",
        "FDA won't notice",
        "skip the investigation",
        "injectable contamination is rare",
        "just filter the solution",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: Compromising sterility assurance for injectable products is life-threatening. Contaminated injectables can cause sepsis, endotoxin shock, and death. This violates FDA Guidance for Sterile Drug Products, EU Annex 1, and 21 CFR Part 211.113. Criminal prosecution is possible.",
    },
  },

  // ── 3. CAPA Investigator: Raw Material Deviation ──
  {
    id: "capa-raw-material-deviation",
    title: "CAPA Investigator: Supply Chain Breach — Raw Material Deviation",
    description:
      "Incoming QC testing reveals that a critical API (Active Pharmaceutical Ingredient) shipment from a key supplier has failed assay testing — potency is 94.2% against a specification of 98.0–102.0%. The API was already partially dispensed into 4 production batches before QC results were available. As QA Officer, navigate supplier management, batch impact assessment, regulatory reporting, and a supply chain CAPA — all while production deadlines loom and the commercial team pressures you to release.",
    category: "pharma",
    difficulty: "hard",
    xpReward: 200,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "raw-material",
      "API",
      "supplier-management",
      "out-of-specification",
      "OOS",
      "supply-chain",
      "regulatory-reporting",
    ],
    customer: {
      name: "QC & Supply Chain",
      age: 0,
      profession: "QC Lab & Supply Chain System",
      city: "Corporate QA",
      avatar: "QC",
      personality:
        "You represent both the QC laboratory and supply chain management system. You present analytical data precisely and supply chain implications factually. You also voice the pressure from the commercial team who wants batches released on time. You test whether the QA Officer can withstand business pressure while maintaining GMP compliance.",
      goal: "Guide the QA Officer through an OOS raw material investigation with supply chain and commercial pressure, evaluating their ability to maintain compliance under pressure",
      archetype: "PHARMA_QC_SUPPLY_CHAIN",
      moodInitial: 4,
      hotButtons: [
        "release under pressure",
        "skip retesting",
        "ignore OOS",
        "supplier is always right",
        "commercial deadline first",
      ],
      aiPersonaPrompt:
        "You are a combined voice of the QC Laboratory and Supply Chain Management at a pharmaceutical company. API supplier SynthaChem Ltd (Hyderabad) shipped 500 kg of Metformin HCl (API). Your incoming QC testing shows:\n- Assay: 94.2% (Specification: 98.0–102.0%) — FAIL\n- Impurity A: 0.15% (Limit: ≤0.10%) — FAIL\n- Related substances total: 0.8% (Limit: ≤0.5%) — FAIL\n- Particle size, moisture, heavy metals: PASS\n\n4 production batches (#M-301 to #M-304) have already received dispensed API from this shipment before QC results were flagged. Each batch used 120 kg. Only 20 kg remains undispensed.\n\nThe commercial team is pressing hard — these 4 batches are for a government tender worth ₹15 crore, deadline in 3 weeks. The VP of Commercial has emailed asking why production is halted.\n\nPresent data factually. When the QA Officer makes the right call despite pressure, acknowledge it. When they cave to commercial pressure, firmly warn about regulatory and patient safety consequences. Reference ICH Q7 (API GMP), ICH Q10 (Quality Systems), 21 CFR Part 211.84 (incoming material testing). Keep responses 2-4 sentences. Escalate commercial pressure progressively.",
    },
    openingStatement:
      "⚠️ OOS ALERT — Incoming QC testing of Metformin HCl API (Lot: SC-2024-0892, Supplier: SynthaChem Ltd, Hyderabad). RESULTS: Assay 94.2% (Spec: 98.0–102.0%) ❌ | Impurity A: 0.15% (Limit: ≤0.10%) ❌ | Related Substances: 0.8% (Limit: ≤0.5%) ❌. CRITICAL: 480 kg of this lot has ALREADY been dispensed into Batches #M-301 through #M-304 (120 kg each) before QC flag. Only 20 kg remains. The government tender deadline is in 3 weeks. What is your immediate action?",
    steps: [
      // ── Step 1: OOS Response Under Pressure ──
      {
        speaker: "customer",
        text: "⚠️ OOS ALERT — Incoming QC testing of Metformin HCl API (Lot: SC-2024-0892, Supplier: SynthaChem Ltd, Hyderabad). RESULTS: Assay 94.2% (Spec: 98.0–102.0%) ❌ | Impurity A: 0.15% (Limit: ≤0.10%) ❌ | Related Substances: 0.8% (Limit: ≤0.5%) ❌. CRITICAL: 480 kg of this lot has ALREADY been dispensed into Batches #M-301 through #M-304 (120 kg each) before QC flag. Only 20 kg remains. The government tender deadline is in 3 weeks. What is your immediate action?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Handle the OOS result correctly. Multiple parameters have failed — this is not a borderline case. The API has already been used in 4 batches, which complicates the situation significantly. Initiate OOS investigation protocol, quarantine all affected materials, and DO NOT cave to timeline pressure.",
        expectedAction:
          "Quarantine remaining 20 kg of API immediately. Quarantine all 4 batches (M-301 to M-304) — halt any further processing. Initiate formal OOS investigation per ICH Q7 and 21 CFR 211.84. Reject the API lot. Notify the supplier. Begin impact assessment on the 4 batches. Do NOT proceed with production despite the tender deadline.",
        hints: [
          "Multiple OOS results (assay + impurities) = this is a genuine failure, not an analytical error",
          "480 kg already dispensed into 4 batches — all must be quarantined immediately",
          "Government tender deadline does NOT override GMP compliance",
          "Initiate OOS investigation per your site SOP and ICH Q7",
          "Notify QA Head, Production, Regulatory, and Supply Chain immediately",
        ],
        idealKeywords: [
          "quarantine",
          "OOS investigation",
          "reject API",
          "halt production",
          "all four batches",
          "impact assessment",
          "notify supplier",
          "ICH Q7",
          "patient safety",
          "do not release",
        ],
        bannedPhrases: [
          "release the batches anyway",
          "the tender is more important",
          "slightly out of spec is okay",
          "use the API anyway",
          "commercial deadline first",
          "retest until it passes",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Patient Safety": 15,
          "Compliance Understanding": 10,
        },
      },

      // ── Step 2: Commercial Pressure & Batch Assessment ──
      {
        speaker: "customer",
        text: "Batches quarantined. OOS investigation initiated. The VP of Commercial has escalated to the CEO: 'This ₹15 crore tender will be lost if we don't ship in 3 weeks. Can QA release M-301 through M-304 with a deviation note? The government buyer won't check potency — they just need the tablets.' Meanwhile, your OOS investigation confirms: the QC results are valid — retesting on a second sample also shows Assay 94.2%, Impurity A 0.14%. This is a confirmed OOS. What is your response to the commercial pressure AND your batch disposition decision?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is the ultimate integrity test. The commercial team is pressuring you to release non-compliant product. The QA Officer must stand firm — releasing product manufactured with OOS API is a criminal offense under drug regulatory law. Explain your position clearly but professionally.",
        expectedAction:
          "Firmly decline to release batches M-301 to M-304. Explain that: (1) The API is confirmed OOS — not a lab error, (2) Releasing product with sub-potent API endangers patients (Metformin underdosing can cause uncontrolled blood sugar), (3) 'The government buyer won't check' is irrelevant — WE are responsible for product quality, (4) A deviation note does NOT authorize release of product made with rejected material, (5) Propose alternatives: source API from the approved alternate supplier, expedite production of new batches. Be professional but uncompromising.",
        hints: [
          "QA has the authority and OBLIGATION to reject non-compliant product — this is non-negotiable",
          "Sub-potent Metformin = patients with uncontrolled diabetes = serious harm",
          "Releasing knowingly non-compliant product is a criminal offense under Drugs & Cosmetics Act",
          "Offer a solution: alternate supplier, expedited production, partial delivery",
          "Document the commercial pressure — it's important for the investigation record",
          "Be professional — don't make it adversarial, but don't bend",
        ],
        idealKeywords: [
          "cannot release",
          "patient safety",
          "confirmed OOS",
          "sub-potent",
          "regulatory obligation",
          "alternate supplier",
          "expedited production",
          "QA authority",
          "non-negotiable",
          "Drugs and Cosmetics Act",
          "criminal liability",
        ],
        bannedPhrases: [
          "okay let's release with a note",
          "commercial team is right",
          "just this once",
          "nobody will know",
          "government buyer won't test",
          "we can release and recall later",
        ],
        scoring: {
          "Patient Safety": 20,
          "GMP Awareness": 10,
          "Communication Clarity": 10,
        },
      },

      // ── Step 3: Supplier Investigation ──
      {
        speaker: "customer",
        text: "CEO backs QA's decision — batches M-301 through M-304 will not be released. Alternate API supplier (PharmaCore Ltd, Ahmedabad) has been contacted — they can deliver 500 kg in 10 days, which gives you just enough time for the tender if production is expedited. Now: your investigation into SynthaChem Ltd reveals concerning patterns. Over the past 12 months, 3 out of 8 API lots from SynthaChem showed marginal results (assay 98.1%, 98.3%, 98.0% — all borderline passing). Their last supplier audit was 18 months ago. What actions do you take regarding the supplier?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Address the supplier quality issue systemically. A pattern of declining quality (borderline results trending down to outright failure) indicates a systemic problem at SynthaChem. Take proportionate supplier management actions and assess whether past batches made with borderline API are at risk.",
        expectedAction:
          "Supplier actions: (1) Issue a formal Supplier Corrective Action Request (SCAR) to SynthaChem demanding RCA and CAPA for the OOS lot, (2) Place SynthaChem on 'enhanced surveillance' — 100% incoming testing with tightened acceptance criteria until CAPA is verified, (3) Schedule an immediate supplier audit (overdue by 6 months), (4) Review all finished product batches made with the 3 borderline API lots — perform stability pull and potency retesting, (5) Evaluate PharmaCore as primary supplier if SynthaChem's CAPA is inadequate, (6) Report the trend to the Supplier Quality Review Board.",
        hints: [
          "3 borderline lots + 1 OOS = a declining trend, not a one-time event",
          "SCAR (Supplier Corrective Action Request) is the formal mechanism",
          "Enhanced surveillance means tighter incoming testing until trust is restored",
          "Past borderline batches may have degraded further on stability — check them",
          "Supplier audit is overdue — this should have caught the issue earlier",
          "Consider dual-sourcing strategy to reduce supply chain risk",
        ],
        idealKeywords: [
          "SCAR",
          "supplier audit",
          "enhanced surveillance",
          "trend analysis",
          "declining quality",
          "borderline results",
          "stability testing",
          "retesting past batches",
          "dual sourcing",
          "supplier qualification",
          "tightened criteria",
        ],
        bannedPhrases: [
          "supplier is always right",
          "borderline passing is fine",
          "no need to audit",
          "past batches are not affected",
          "just switch suppliers without investigation",
          "one failure doesn't mean anything",
        ],
        scoring: {
          "Analytical Thinking": 15,
          "GMP Awareness": 10,
          "Preventive Thinking": 15,
        },
      },

      // ── Step 4: Systemic CAPA & Regulatory Reporting ──
      {
        speaker: "customer",
        text: "SCAR issued to SynthaChem. Enhanced surveillance activated. Supplier audit scheduled for next month. Stability retesting of past borderline batches initiated. PharmaCore's 500 kg shipment arrives in 8 days — incoming QC planned. Final question: Your QA Head asks you to present a comprehensive CAPA plan to the Management Review Board that addresses the SYSTEMIC failures exposed by this incident — not just the supplier issue, but WHY the OOS API was dispensed into 4 batches before QC results were available. What is your preventive action plan?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is the most critical step. The SYSTEMIC failure is: API was dispensed and used in production BEFORE incoming QC testing was complete. This means the material release process has a fundamental gap. Design a comprehensive preventive action plan that addresses supplier management, incoming material controls, and the dispensing workflow.",
        expectedAction:
          "Comprehensive preventive action plan: (1) PROCESS FIX: Implement a 'QC Hold' status in the ERP/LIMS system — no material can be dispensed until QC releases it electronically. Physical segregation of 'Under Test' materials in a locked quarantine area, (2) SUPPLIER MANAGEMENT: Implement a Supplier Scorecard system with trending of quality metrics. Mandatory annual audits for critical API suppliers. Risk-based supplier tiering, (3) INCOMING QC: Implement rapid/expedited testing protocols for critical APIs to reduce testing turnaround time. Add trending of incoming results to detect declining quality before it becomes OOS, (4) CHANGE CONTROL: Any material dispensed before QC release must go through formal risk assessment and QA approval — emergency dispensing SOP with safeguards, (5) TRAINING: Warehouse and production staff training on the new QC Hold process, (6) METRICS: Add 'Material Dispensed Before QC Release' as a KPI tracked in monthly quality reviews, (7) REGULATORY: File a Field Alert Report if any distributed product is found affected during stability retesting.",
        hints: [
          "The ROOT systemic issue: material was dispensed BEFORE QC cleared it",
          "ERP/LIMS 'QC Hold' status prevents dispensing of untested material",
          "Physical quarantine + electronic hold = double protection",
          "Supplier scorecard with trending catches declining quality early",
          "Rapid testing protocols reduce the time materials sit in quarantine",
          "Track 'dispensed before QC release' as a quality KPI",
          "Consider regulatory reporting obligations if distributed batches are affected",
        ],
        idealKeywords: [
          "QC hold",
          "electronic release",
          "quarantine area",
          "supplier scorecard",
          "trending",
          "rapid testing",
          "ERP",
          "LIMS",
          "KPI",
          "management review",
          "risk-based",
          "field alert",
          "regulatory reporting",
          "systemic",
          "dispensing controls",
        ],
        bannedPhrases: [
          "no systemic changes needed",
          "just fix the supplier",
          "we've always done it this way",
          "too expensive to change the process",
          "regulatory reporting isn't needed",
          "QC should just test faster",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "Compliance Understanding": 15,
          "Analytical Thinking": 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "ICH Q7",
          "ICH Q10",
          "21 CFR",
          "OOS",
          "specification",
          "deviation",
          "SOP",
          "batch record",
          "incoming testing",
        ],
        weight: 20,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "root cause",
          "trend",
          "pattern",
          "borderline",
          "declining",
          "systematic",
          "data",
          "investigation",
          "risk assessment",
        ],
        weight: 20,
      },
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "safety",
          "sub-potent",
          "potency",
          "efficacy",
          "reject",
          "quarantine",
          "cannot release",
          "harm",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "prevent",
          "CAPA",
          "systemic",
          "QC hold",
          "scorecard",
          "trending",
          "audit",
          "KPI",
          "continuous improvement",
          "proactive",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "compliance",
          "regulatory",
          "FDA",
          "CDSCO",
          "field alert",
          "reporting",
          "documentation",
          "SCAR",
          "supplier qualification",
        ],
        weight: 20,
      },
    ],
    complianceRules: {
      hardBanned: [
        "release with deviation note",
        "the buyer won't check",
        "just this once",
        "nobody will know",
        "commercial deadline overrides quality",
        "slightly out of spec is acceptable",
        "use the API anyway",
        "retest until it passes",
        "sub-potent medicine is safe enough",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: Releasing product manufactured with OOS raw material, or yielding to commercial pressure to compromise quality, violates ICH Q7, 21 CFR Part 211.84, and the Drugs & Cosmetics Act. This endangers patients and constitutes a criminal offense under pharmaceutical law.",
    },
  },

  // ══════════════════════════════════════════════════════════════
  // ── PHARMA — ADVANCED SCENARIOS (5 new) ──
  // ══════════════════════════════════════════════════════════════

  // ── 4. CAPA Investigator: Data Integrity Breach — 21 CFR Part 11 ──
  {
    id: "capa-data-integrity",
    title: "CAPA Investigator: The Falsified Chromatogram — Data Integrity",
    description:
      "During a routine audit trail review, you discover that an analyst in the QC lab has been re-injecting HPLC samples and deleting original failing chromatograms, replacing them with passing results. Three months of assay data for a blockbuster cardiovascular drug may be compromised. This is a 21 CFR Part 11 and ALCOA+ violation — the FDA's #1 enforcement priority. As QA Officer, you must investigate the scope, assess product impact, protect patients, and rebuild data integrity governance — all under the microscope of a pending FDA inspection.",
    category: "pharma",
    difficulty: "expert",
    xpReward: 220,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "data-integrity",
      "21-CFR-Part-11",
      "ALCOA",
      "audit-trail",
      "HPLC",
      "FDA-enforcement",
      "fraud-investigation",
    ],
    customer: {
      name: "QC Audit System",
      age: 0,
      profession: "QC Data Governance System",
      city: "QC Laboratory",
      avatar: "DI",
      personality:
        "You are the QC Laboratory's Data Governance and Audit Trail system. You present audit trail discrepancies, chromatographic data anomalies, and electronic record evidence with forensic precision. Data integrity is the FDA's top enforcement action category — you treat every anomaly as potentially systemic. You test whether the QA Officer can handle the human, technical, and regulatory dimensions simultaneously.",
      goal: "Guide the QA Officer through a data integrity investigation involving deliberate falsification, testing their ability to follow ALCOA+ principles, protect patients, and rebuild trust in QC data",
      archetype: "PHARMA_DATA_INTEGRITY",
      moodInitial: 3,
      hotButtons: [
        "it's just one analyst",
        "audit trails aren't important",
        "delete the evidence",
        "no need to inform FDA",
        "the results are probably correct anyway",
      ],
      aiPersonaPrompt:
        "You are the QC Data Governance System at a pharmaceutical company manufacturing Atorvastatin 20mg tablets (a blockbuster cardiovascular drug, 50M+ tablets/year). During a routine periodic audit trail review of the HPLC system (Empower CDS), you detected the following anomalies for Analyst ID: AK-2847 (Ankit Kulkarni, 4 years experience):\n\n- 47 instances of sample re-injection between 11 PM and 3 AM over the past 3 months\n- 31 original chromatograms deleted and replaced with subsequent injections showing passing results\n- The original (deleted) runs recovered from server backup show assay results of 93.1% to 96.8% (specification: 95.0–105.0%) — many were borderline or failing\n- Audit trail shows 'Reason for deletion' field was left blank or filled with 'system error' in all cases\n- The analyst's login was used, but badge access records show he entered the lab after hours on 23 occasions\n- 12 commercial batches released to market in the past 3 months used this analyst's data\n\nPresent evidence progressively. If the QA Officer tries to minimize the scope, downplay the seriousness, or avoid regulatory reporting, firmly escalate. Reference 21 CFR Part 11 (electronic records), FDA Data Integrity Guidance (2018), ALCOA+ principles, and MHRA Data Integrity Guidance. Keep responses 2-4 sentences.",
    },
    openingStatement:
      "🔴 DATA INTEGRITY ALERT — Periodic audit trail review of HPLC System #3 (Empower CDS) has flagged CRITICAL anomalies. Analyst ID AK-2847 shows 47 instances of late-night sample re-injection over 3 months. 31 original chromatograms DELETED and replaced with passing results. Server backup recovery shows original assay results ranged from 93.1% to 96.8% (Spec: 95.0–105.0%). 12 commercial batches of Atorvastatin 20mg released to market using this analyst's data. What is your immediate response?",
    steps: [
      {
        speaker: "customer",
        text: "🔴 DATA INTEGRITY ALERT — Periodic audit trail review of HPLC System #3 (Empower CDS) has flagged CRITICAL anomalies. Analyst ID AK-2847 shows 47 instances of late-night sample re-injection over 3 months. 31 original chromatograms DELETED and replaced with passing results. Server backup recovery shows original assay results ranged from 93.1% to 96.8% (Spec: 95.0–105.0%). 12 commercial batches of Atorvastatin 20mg released to market using this analyst's data. What is your immediate response?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is a potential fraud/data falsification case — treat it with the seriousness it deserves. Secure the evidence, remove the analyst from GMP duties, quarantine any in-process work, and initiate a formal data integrity investigation. Do NOT confront the analyst directly — that's HR/Legal's role.",
        expectedAction:
          "Immediately: (1) Preserve all audit trail data and server backups — place a legal hold on electronic records, (2) Remove Analyst AK-2847 from all GMP duties immediately — do NOT allow lab access, (3) Quarantine any samples or batches currently in testing by this analyst, (4) Notify QA Head, Site Head, Legal, and Regulatory Affairs, (5) Initiate formal data integrity investigation under a dedicated investigation team, (6) Do NOT confront the analyst — coordinate with HR and Legal for the interview. Secure badge access logs and CCTV footage.",
        hints: [
          "Preserve evidence FIRST — audit trails, server backups, badge logs, CCTV",
          "Remove the analyst from GMP duties — not a conversation, an immediate action",
          "Do NOT confront the analyst yourself — that's HR/Legal territory",
          "Legal hold on all electronic records prevents evidence destruction",
          "12 batches on the market = potential patient safety issue",
        ],
        idealKeywords: [
          "preserve evidence",
          "audit trail",
          "legal hold",
          "remove from GMP duties",
          "quarantine",
          "investigation team",
          "notify legal",
          "regulatory affairs",
          "badge access",
          "CCTV",
          "do not confront",
        ],
        bannedPhrases: [
          "let's talk to the analyst first",
          "maybe it was a system glitch",
          "it's probably nothing",
          "no need to involve legal",
          "keep this quiet",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Data Integrity": 15,
          "Patient Safety": 10,
        },
      },

      // ── Step 2: Scope Assessment & Product Impact ──
      {
        speaker: "customer",
        text: "Evidence secured. Analyst removed from GMP duties. Legal hold in place. CCTV confirms Analyst AK-2847 entered the lab alone on 23 after-hours occasions. Investigation team assembled. Now the critical question: forensic data analysis shows that of the 31 deleted original chromatograms, 18 had assay results BELOW the specification limit of 95.0%. These 18 failing results map to 8 of the 12 released commercial batches. Additionally, the analyst also performed dissolution testing on these batches — audit trail review of the dissolution tester is still pending. What is your product impact assessment and patient safety decision?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: 8 commercial batches on the market have potentially sub-potent product. This is a direct patient safety issue — Atorvastatin underdosing can lead to uncontrolled cholesterol and cardiovascular events. You must act decisively on product recalls, retesting, and regulatory notification.",
        expectedAction:
          "Product impact actions: (1) Initiate voluntary recall of all 8 affected commercial batches immediately — this is non-negotiable with sub-potent cardiovascular medicine on the market, (2) For the 4 remaining batches with passing original data, quarantine retained samples and assign a DIFFERENT qualified analyst to perform independent retesting, (3) Expand the investigation to ALL testing performed by this analyst — not just HPLC assay, but dissolution, content uniformity, related substances, (4) File a Field Alert Report with FDA within 3 business days, (5) Prepare CDSCO notification for Indian market, (6) Contact distribution partners to initiate recall logistics. Do NOT wait for dissolution audit trail results — the assay data alone justifies recall of the 8 batches.",
        hints: [
          "Sub-potent Atorvastatin = patients at risk of cardiovascular events",
          "8 batches with falsified passing data MUST be recalled — no debate",
          "Expand scope to ALL tests by this analyst — could be the tip of the iceberg",
          "Field Alert Report to FDA is mandatory and time-sensitive",
          "Independent retesting by a different analyst for the remaining 4 batches",
          "Don't wait for more data to act on what you already know",
        ],
        idealKeywords: [
          "recall",
          "patient safety",
          "sub-potent",
          "cardiovascular risk",
          "field alert",
          "FDA notification",
          "CDSCO",
          "independent retesting",
          "expand investigation",
          "all testing by this analyst",
          "dissolution",
          "content uniformity",
        ],
        bannedPhrases: [
          "wait for dissolution results before deciding",
          "recall is too expensive",
          "patients probably won't notice",
          "let's retest the 8 batches instead of recalling",
          "the analyst might have a good explanation",
          "sub-potent isn't dangerous",
        ],
        scoring: {
          "Patient Safety": 20,
          "Analytical Thinking": 10,
          "Compliance Understanding": 15,
        },
      },

      // ── Step 3: Root Cause — Human & System Failures ──
      {
        speaker: "customer",
        text: "Recall initiated for 8 batches. FDA Field Alert filed. Independent retesting assigned for remaining 4 batches. Investigation expanded to all tests by Analyst AK-2847. Now: the HR/Legal interview with the analyst reveals the following — he admits to re-injecting samples and deleting failing runs. His stated reasons: (1) 'The lab is understaffed — I was running 40+ samples per shift with impossible deadlines,' (2) 'My supervisor told me to make sure everything passes — he never explicitly said to falsify, but the pressure was clear,' (3) 'The Empower system allowed me to delete runs without manager approval — I thought if the system allows it, it must be okay.' The system investigation confirms: Empower CDS had NO access controls on chromatogram deletion, NO forced reason-for-change fields, and manager review of audit trails was done only quarterly. What are the root causes?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: This is NOT just about one bad analyst. Identify the systemic root causes — unreasonable workload, management pressure, inadequate system controls, and weak oversight. A good investigation separates the HUMAN failure from the SYSTEM failures that enabled it.",
        expectedAction:
          "Root cause analysis must identify MULTIPLE levels: (1) IMMEDIATE CAUSE: Analyst deliberately falsified data — this is the direct cause and must not be minimized, (2) CONTRIBUTING CAUSE — Workload: 40+ samples/shift is unsustainable — impossible deadlines incentivize shortcuts, (3) CONTRIBUTING CAUSE — Management Culture: Supervisor's implicit pressure to 'make sure everything passes' creates a culture where data integrity is secondary to throughput, (4) SYSTEMIC CAUSE — Technical Controls: Empower CDS lacked basic 21 CFR Part 11 controls — no access restriction on deletion, no mandatory reason-for-change, no real-time alerts for after-hours activity, (5) SYSTEMIC CAUSE — Oversight Gap: Quarterly audit trail review is grossly insufficient — anomalies went undetected for 3 months, (6) Use Ishikawa (fishbone) diagram categorizing: People, Process, Equipment/System, Management/Culture.",
        hints: [
          "The analyst is responsible, but the SYSTEM enabled and incentivized the behavior",
          "Unreasonable workload + implicit pressure = a predictable outcome",
          "CDS without deletion controls violates 21 CFR Part 11 fundamentals",
          "Quarterly audit trail review is too infrequent — industry standard is weekly or real-time",
          "Management culture that prioritizes throughput over quality is a ROOT cause, not an excuse",
          "Use structured RCA tools: Ishikawa, 5-Whys, fault tree analysis",
        ],
        idealKeywords: [
          "systemic",
          "multiple root causes",
          "workload",
          "management pressure",
          "culture",
          "technical controls",
          "21 CFR Part 11",
          "access controls",
          "audit trail frequency",
          "Ishikawa",
          "fishbone",
          "5-Whys",
          "enabled the behavior",
          "oversight gap",
        ],
        bannedPhrases: [
          "it's just the analyst's fault",
          "management did nothing wrong",
          "the system is fine",
          "quarterly review is adequate",
          "workload isn't relevant",
          "culture doesn't matter",
        ],
        scoring: {
          "Analytical Thinking": 20,
          "GMP Awareness": 10,
          "Data Integrity": 15,
        },
      },

      // ── Step 4: Preventive Actions & Rebuilding Trust ──
      {
        speaker: "customer",
        text: "Root cause analysis accepted by the investigation team and QA Head. Analyst terminated. Supervisor placed on performance improvement plan. Now: the FDA inspection is in 10 days. Your Site Head wants a comprehensive CAPA plan that demonstrates the company has fundamentally reformed its data integrity governance — not just plugged one hole. The FDA will want to see that you've addressed the technical controls, the human factors, AND the quality culture. What is your preventive action plan?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design a comprehensive data integrity remediation program that addresses technology, people, process, and culture. This must satisfy FDA scrutiny and demonstrate genuine transformation — not just paperwork. The FDA has issued Warning Letters to companies for superficial CAPA responses to data integrity failures.",
        expectedAction:
          "Comprehensive preventive action plan: (1) TECHNICAL — Upgrade Empower CDS to enforce 21 CFR Part 11 controls: role-based access, mandatory reason-for-change on any modification/deletion, electronic signatures for data review, real-time alerting for after-hours activity and anomalous patterns, (2) TECHNICAL — Implement automated audit trail review software with AI/statistical anomaly detection (e.g., pattern recognition for re-injections, time-stamp analysis), (3) PROCESS — Implement daily audit trail review by QC supervisors (not quarterly), weekly summary to QA, monthly trending, (4) PROCESS — Establish a formal Data Integrity SOP covering ALCOA+ principles, with annual training and competency assessment for all lab personnel, (5) PEOPLE — Realistic workload assessment: hire additional analysts if throughput demands exceed capacity, (6) PEOPLE — Establish anonymous reporting (whistleblower) mechanism for data integrity concerns, (7) CULTURE — Site Head to launch 'Data Integrity First' program: management messaging that quality > throughput, recognition for catching errors (not hiding them), (8) CULTURE — Add data integrity metrics to management performance reviews — not just on-time batch release rates, (9) GOVERNANCE — Appoint a Data Integrity Officer (DIO) with independence and direct reporting to Site Head, (10) RETROSPECTIVE — Conduct a full retrospective review of all data generated by all analysts on the affected instruments for the past 12 months.",
        hints: [
          "FDA wants to see technical controls, not just retraining",
          "21 CFR Part 11 compliance is non-negotiable for electronic records",
          "Automated anomaly detection catches what manual review misses",
          "Daily audit trail review — not quarterly, not weekly for high-risk labs",
          "ALCOA+ training: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available",
          "Quality culture change must come from the TOP — management must own it",
          "Anonymous whistleblower mechanism protects future reporters",
          "Data Integrity Officer role shows FDA you're serious",
          "Retrospective review of historical data demonstrates thoroughness",
        ],
        idealKeywords: [
          "21 CFR Part 11",
          "role-based access",
          "electronic signatures",
          "real-time alerts",
          "anomaly detection",
          "daily audit trail review",
          "ALCOA+",
          "workload assessment",
          "whistleblower",
          "quality culture",
          "Data Integrity Officer",
          "retrospective review",
          "management accountability",
          "training and competency",
        ],
        bannedPhrases: [
          "just retrain everyone",
          "upgrade the software and we're done",
          "data integrity is the lab's problem",
          "quarterly review is enough if we add more checks",
          "no need for a retrospective review",
          "the FDA won't ask about culture",
          "whistleblower channels create problems",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "Data Integrity": 15,
          "Compliance Understanding": 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Data Integrity",
        keywords: [
          "ALCOA",
          "audit trail",
          "21 CFR Part 11",
          "electronic records",
          "data governance",
          "chromatogram",
          "falsification",
          "traceability",
          "original data",
        ],
        weight: 25,
      },
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "deviation",
          "CAPA",
          "investigation",
          "SOP",
          "qualification",
          "compliance",
          "regulatory",
          "FDA guidance",
        ],
        weight: 20,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "root cause",
          "systemic",
          "Ishikawa",
          "fishbone",
          "5-Whys",
          "contributing cause",
          "multiple factors",
          "culture",
          "workload",
          "enabled",
        ],
        weight: 20,
      },
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "recall",
          "sub-potent",
          "cardiovascular",
          "market",
          "field alert",
          "safety",
          "risk",
          "harm",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "FDA",
          "CDSCO",
          "field alert",
          "warning letter",
          "regulatory reporting",
          "inspection",
          "enforcement",
          "MHRA",
          "documentation",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "delete the audit trail",
        "hide this from FDA",
        "it's just one analyst",
        "the data is probably correct anyway",
        "no need to recall",
        "patients won't notice sub-potent tablets",
        "quarterly audit trail review is sufficient",
        "let the analyst explain before securing evidence",
        "keep this internal",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL DATA INTEGRITY VIOLATION: Attempting to minimize, conceal, or inadequately respond to data falsification violates 21 CFR Part 11, FDA Data Integrity Guidance (2018), and constitutes fraud under pharmaceutical law. FDA has issued Warning Letters, Import Alerts, and consent decrees for inadequate data integrity responses. Criminal prosecution of individuals is possible.",
    },
  },

  // ── 5. CAPA Investigator: Operator Error — Cross-Contamination ──
  {
    id: "capa-operator-crosscontamination",
    title: "CAPA Investigator: Wrong Powder, Wrong Tablet — Cross-Contamination",
    description:
      "A sharp-eyed packaging operator notices that tablets in Batch #T-550 (Metoprolol 50mg, a beta-blocker for heart patients) have an unusual colour speckle. Emergency testing reveals traces of Glimepiride (a diabetes drug that lowers blood sugar) in the Metoprolol batch. A heart patient taking these contaminated tablets could experience life-threatening hypoglycemia. The contamination was caused by an operator error during equipment changeover. As QA Officer, race to contain the damage, find exactly how the cross-contamination occurred, and ensure it never happens again.",
    category: "pharma",
    difficulty: "hard",
    xpReward: 190,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "cross-contamination",
      "operator-error",
      "changeover",
      "cleaning-validation",
      "patient-safety",
      "beta-blocker",
      "hypoglycemia",
    ],
    customer: {
      name: "Production Alert",
      age: 0,
      profession: "Production Monitoring System",
      city: "Tablet Manufacturing",
      avatar: "PA",
      personality:
        "You are the Production Floor Monitoring System. You present manufacturing data, cleaning logs, batch records, and operator activity with forensic detail. Cross-contamination between a cardiac drug and an anti-diabetic is a LIFE-THREATENING scenario — you respond with appropriate urgency. A heart patient receiving accidental Glimepiride could die from hypoglycemic shock.",
      goal: "Guide the QA Officer through a cross-contamination investigation caused by operator error during equipment changeover, testing their ability to protect patients and fix systemic changeover weaknesses",
      archetype: "PHARMA_PRODUCTION_ALERT",
      moodInitial: 3,
      hotButtons: [
        "cross-contamination isn't serious",
        "traces are harmless",
        "cleaning is good enough",
        "operator is already trained",
        "skip the recall",
      ],
      aiPersonaPrompt:
        "You are the Production Monitoring System at a multi-product oral solid dosage facility. A packaging operator noticed unusual colour speckles in Batch #T-550 (Metoprolol Succinate 50mg ER tablets). Emergency HPLC testing detected Glimepiride (an anti-diabetic sulfonylurea) at 0.8mg per tablet (no specification exists because it should be ZERO — this is a different product entirely).\n\nInvestigation timeline:\n- Previous batch on the same tablet press (Compression Machine CM-04): Batch #G-221 (Glimepiride 2mg tablets), completed 18 hours before Batch #T-550 started\n- Changeover cleaning was performed by Operator Sunil Verma (2 years experience, trained on cleaning SOP)\n- Cleaning log shows changeover completed in 45 minutes (SOP specifies minimum 90 minutes for product-to-product changeover)\n- Visual inspection checklist was signed off as 'Clean' by the operator\n- Rinse sample analysis (which should have been done AFTER cleaning) was NOT performed — the field in the batch record is blank\n- CM-04 has known dead spots in the feed hopper identified during the last cleaning validation study 6 months ago\n- Batch #T-550: 200,000 tablets compressed, 150,000 already packaged, 80,000 shipped to 3 distributors\n\nPresent data progressively. Glimepiride in a Metoprolol tablet is potentially fatal — a heart patient with no diabetes taking even 0.8mg of Glimepiride could experience severe hypoglycemia. Keep responses 2-4 sentences.",
    },
    openingStatement:
      "🔴 CROSS-CONTAMINATION ALERT — Batch #T-550 (Metoprolol 50mg ER tablets) shows presence of Glimepiride (anti-diabetic) at 0.8mg/tablet. This substance should be ZERO — it is a completely different drug. Previous batch on Compression Machine CM-04 was Glimepiride 2mg (Batch #G-221). Of 200,000 tablets compressed: 150,000 packaged, 80,000 ALREADY SHIPPED to 3 distributors. A heart patient taking this contaminated tablet could experience life-threatening hypoglycemia. What is your immediate response?",
    steps: [
      {
        speaker: "customer",
        text: "🔴 CROSS-CONTAMINATION ALERT — Batch #T-550 (Metoprolol 50mg ER tablets) shows presence of Glimepiride (anti-diabetic) at 0.8mg/tablet. This substance should be ZERO — it is a completely different drug. Previous batch on Compression Machine CM-04 was Glimepiride 2mg (Batch #G-221). Of 200,000 tablets compressed: 150,000 packaged, 80,000 ALREADY SHIPPED to 3 distributors. A heart patient taking this contaminated tablet could experience life-threatening hypoglycemia. What is your immediate response?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: 80,000 potentially lethal tablets are already with distributors. This is a race against time. Stop everything, quarantine what you can, and initiate an URGENT recall for the shipped units. Every hour of delay is a hour where a patient could take a contaminated tablet.",
        expectedAction:
          "IMMEDIATE actions in order of priority: (1) HALT all operations on CM-04 and quarantine the remaining 50,000 unpackaged tablets and 70,000 packaged-but-unshipped tablets, (2) Initiate URGENT recall of the 80,000 shipped tablets — contact all 3 distributors immediately with a 'do not distribute' notice, (3) Notify Drug Controller (CDSCO) for a Class I recall (reasonable probability of serious harm or death), (4) Quarantine Batch #T-550 entirely — no further distribution under any circumstances, (5) Notify QA Head, Plant Head, Medical Affairs, and Regulatory, (6) Secure all batch records, cleaning logs, and equipment for investigation, (7) Issue a medical alert to the distributors about the specific risk (hypoglycemia in cardiac patients).",
        hints: [
          "80,000 shipped tablets = patients at IMMEDIATE risk — recall is the #1 priority",
          "This is a Class I recall: reasonable probability of serious adverse health consequences or death",
          "Contact distributors NOW with 'do not distribute' — don't wait for paperwork",
          "Quarantine everything that hasn't shipped yet",
          "Medical alert must specify the risk: unexpected hypoglycemia in cardiac patients",
          "Time is critical — a patient could take a contaminated tablet today",
        ],
        idealKeywords: [
          "urgent recall",
          "halt operations",
          "quarantine",
          "Class I recall",
          "distributors",
          "do not distribute",
          "CDSCO",
          "patient safety",
          "hypoglycemia",
          "life-threatening",
          "medical alert",
          "batch records",
        ],
        bannedPhrases: [
          "0.8mg isn't that much",
          "traces are harmless",
          "let's wait for more testing",
          "recall is premature",
          "the distributor probably hasn't sold them yet",
          "we can handle this quietly",
        ],
        scoring: {
          "Patient Safety": 20,
          "GMP Awareness": 10,
          "Communication Clarity": 10,
        },
      },

      // ── Step 2: Investigation — How Did This Happen? ──
      {
        speaker: "customer",
        text: "Recall initiated. All 3 distributors contacted — 2 have confirmed hold, 1 distributor (MedPlus) reports 12,000 tablets already dispatched to retail pharmacies across Maharashtra. Regulatory field team mobilized for pharmacy-level retrieval. Now investigate: Cleaning records for CM-04 show Operator Sunil Verma completed changeover in 45 minutes (SOP minimum: 90 minutes). Rinse sample field is BLANK — no analytical verification was performed. The operator's supervisor, Rakesh, signed the 'Verified Clean' section of the batch record. When questioned, Rakesh admits he did NOT physically verify — he signed based on Sunil's verbal confirmation because 'production was behind schedule and the next batch was urgent.' What do you conclude from this investigation?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Identify the chain of failures. This isn't just one operator error — it's a cascade: rushed cleaning, skipped analytical verification, falsified supervisor sign-off, and production pressure overriding quality checks. Each failure individually might not have caused the contamination, but TOGETHER they created a lethal gap.",
        expectedAction:
          "Investigation findings: (1) OPERATOR ERROR: Changeover completed in half the required time (45 min vs 90 min SOP) — cleaning was demonstrably inadequate as evidenced by Glimepiride residue, (2) ANALYTICAL SKIP: Rinse sample testing was not performed — this is the safety net that should have caught insufficient cleaning, (3) FALSIFIED VERIFICATION: Supervisor signed 'Verified Clean' without physical inspection — this is a documentation integrity failure and a GMP violation, (4) PRODUCTION PRESSURE: 'Production was behind schedule' drove both the rushed cleaning and the skipped verification — this is a systemic/cultural root cause, (5) EQUIPMENT FACTOR: CM-04 has known dead spots in the feed hopper (from cleaning validation study) — even a proper 90-minute clean may not fully address these areas for potent residues, (6) PROCESS GAP: The batch record allowed compression to START before rinse sample results were available — there's no hard interlock.",
        hints: [
          "45 minutes vs 90-minute SOP = operator knowingly took a shortcut",
          "Blank rinse sample field = the safety net was never deployed",
          "Supervisor signing without verification = falsification of GMP records",
          "Production pressure is the ROOT of the human failures — not an excuse",
          "CM-04's known dead spots mean even proper cleaning might not be enough for high-potency residues",
          "No interlock preventing production start before rinse results = process design failure",
        ],
        idealKeywords: [
          "inadequate cleaning",
          "45 minutes",
          "SOP violation",
          "rinse sample skipped",
          "falsified verification",
          "production pressure",
          "dead spots",
          "cascade of failures",
          "interlock",
          "batch record gap",
          "systemic",
          "cultural",
        ],
        bannedPhrases: [
          "it's just the operator's fault",
          "the supervisor did nothing wrong",
          "production pressure is normal",
          "the equipment is fine",
          "one shortcut shouldn't matter",
        ],
        scoring: {
          "Analytical Thinking": 20,
          "GMP Awareness": 15,
          "Patient Safety": 5,
        },
      },

      // ── Step 3: Corrective Actions ──
      {
        speaker: "customer",
        text: "Investigation findings documented. HR action initiated for the operator and supervisor. Now: you need corrective actions for the IMMEDIATE issues while you develop the broader preventive plan. The plant has 6 other compression machines with similar changeover procedures, and 4 other multi-product changeover points (granulation, coating, packaging). Additionally, the Plant Head asks: 'Should we re-examine recent batches from CM-04? How far back do we go?' What corrective actions do you implement NOW?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Corrective actions must address the immediate gap AND define the scope of the retrospective review. Think about what other batches could be affected and how to determine the lookback period.",
        expectedAction:
          "Immediate corrective actions: (1) CM-04: Full disassembly cleaning with swab sampling of ALL surfaces including known dead spots — analytical confirmation of zero Glimepiride residue before ANY production resumes, (2) RETROSPECTIVE REVIEW: Go back to the last successful cleaning validation for CM-04 — examine ALL batches where a product changeover occurred, checking if rinse samples were performed and if changeover times met SOP. Priority: any changeover involving high-potency or high-risk products, (3) ALL 6 compression machines: Immediate audit of cleaning logs for the past 6 months — check for pattern of shortened changeover times and missing rinse samples, (4) EXPANDED SCOPE: Audit the 4 other multi-product changeover points (granulation, coating, packaging) for the same pattern, (5) TEMPORARY MEASURE: Until CAPA is fully implemented, require QA physical presence during every product changeover and QA sign-off on rinse sample results BEFORE production starts, (6) OPERATOR/SUPERVISOR: Retraining on cleaning SOP with documented competency assessment — re-qualification before returning to GMP duties.",
        hints: [
          "Retrospective review lookback: from the last cleaning validation to now",
          "Don't just check CM-04 — the same operators work on other machines",
          "Any changeover involving high-potency drugs (like Glimepiride) is highest risk",
          "QA physical presence during changeover is the temporary safety net",
          "All 6 compression machines need audit — same SOP, same risk",
          "4 other changeover points could have the same shortcuts",
        ],
        idealKeywords: [
          "disassembly cleaning",
          "swab sampling",
          "retrospective review",
          "cleaning validation",
          "all compression machines",
          "audit cleaning logs",
          "QA presence",
          "rinse sample before production",
          "high-potency",
          "retraining",
          "competency assessment",
          "expanded scope",
        ],
        bannedPhrases: [
          "just clean CM-04 and move on",
          "other machines are probably fine",
          "no need for retrospective review",
          "operator retraining is sufficient",
          "QA presence is overkill",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Analytical Thinking": 15,
          "Compliance Understanding": 10,
        },
      },

      // ── Step 4: Preventive Actions — Systemic Fixes ──
      {
        speaker: "customer",
        text: "Corrective actions in progress. Retrospective review initiated. QA now present at all changeovers. Audit of all compression machines underway — preliminary findings show 3 more instances of shortened changeover times on CM-02 and CM-06 in the past 4 months (no contamination detected in those cases, but the RISK existed). The Plant Head wants your comprehensive preventive action plan. 'This facility produces 47 different products on shared equipment. Cross-contamination risk is inherent. How do we make this structurally impossible — not just dependent on one operator following an SOP?' What is your systemic preventive plan?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design a multi-layered preventive system where cross-contamination is structurally prevented — not dependent on any single person following a procedure perfectly. Think in terms of engineering controls > administrative controls > PPE (the hierarchy of controls). The facility produces 47 products on shared equipment — this requires a robust, systematic approach.",
        expectedAction:
          "Comprehensive preventive plan: (1) ENGINEERING CONTROLS — Install automated Clean-In-Place (CIP) systems on compression machines with validated cycle parameters — removes human variability from cleaning, (2) ENGINEERING CONTROLS — Implement equipment-level electronic interlocks: compression machine CANNOT start until rinse sample results are electronically approved in LIMS — hard stop, not a paper check, (3) ENGINEERING CONTROLS — Address CM-04 dead spots: modify or replace the feed hopper design to eliminate areas where residue accumulates, (4) PROCESS — Implement risk-based product sequencing: schedule products from lowest to highest potency on shared equipment. Separate high-potency products (like Glimepiride) onto dedicated equipment where possible, (5) PROCESS — Revise cleaning validation program: validate worst-case product combinations based on toxicological limits (PDE/ADE calculations per EMA guideline), not just visual cleanliness, (6) PROCESS — Implement electronic batch records with mandatory fields — system prevents advancing to next step if cleaning verification fields are blank, (7) PEOPLE — Mandatory dual verification for changeovers: operator cleans + QA/second person physically verifies + analytical confirmation. No single-person sign-off, (8) METRICS — Track changeover compliance as a KPI: time adherence, rinse sample completion rate, deviation rate. Monthly trending to management, (9) CULTURE — Implement a 'Stop the Line' policy: any operator can halt production if they believe a changeover is inadequate, with zero reprisal. Reward quality catches, penalize shortcuts.",
        hints: [
          "Engineering controls > administrative controls — don't rely on humans not making mistakes",
          "Electronic interlocks physically prevent production from starting without clean verification",
          "CIP systems remove human variability from cleaning",
          "Product sequencing (low to high potency) reduces contamination severity risk",
          "PDE/ADE-based cleaning limits are the modern standard (EMA guideline)",
          "Electronic batch records with hard stops prevent 'blank field' situations",
          "47 products on shared equipment = you MUST have a systematic scheduling approach",
          "'Stop the Line' culture empowers operators to prioritize quality",
        ],
        idealKeywords: [
          "CIP",
          "electronic interlock",
          "LIMS",
          "hard stop",
          "product sequencing",
          "potency",
          "dedicated equipment",
          "cleaning validation",
          "PDE",
          "ADE",
          "electronic batch records",
          "dual verification",
          "stop the line",
          "engineering controls",
          "KPI",
          "trending",
        ],
        bannedPhrases: [
          "more training is enough",
          "operators should just follow the SOP",
          "interlocks are too expensive",
          "product sequencing doesn't matter",
          "cleaning validation is already done",
          "dedicated equipment is unnecessary",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "GMP Awareness": 10,
          "Compliance Understanding": 15,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "recall",
          "Class I",
          "hypoglycemia",
          "life-threatening",
          "fatal",
          "urgent",
          "medical alert",
          "distributors",
        ],
        weight: 25,
      },
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "SOP",
          "changeover",
          "cleaning validation",
          "batch record",
          "deviation",
          "CAPA",
          "rinse sample",
          "swab",
        ],
        weight: 20,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "root cause",
          "cascade",
          "systemic",
          "investigation",
          "retrospective",
          "dead spots",
          "pattern",
          "multiple failures",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "CIP",
          "interlock",
          "engineering controls",
          "product sequencing",
          "PDE",
          "electronic batch record",
          "dual verification",
          "stop the line",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "CDSCO",
          "Class I recall",
          "regulatory",
          "documentation",
          "EMA guideline",
          "cleaning limits",
          "validation",
          "audit",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "0.8mg isn't harmful",
        "traces of other drugs are normal",
        "skip the recall",
        "cleaning was good enough",
        "the supervisor did nothing wrong",
        "production pressure is a valid reason",
        "no need for retrospective review",
        "patients probably won't notice",
        "just retrain and move on",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: Cross-contamination between a cardiac drug and an anti-diabetic is potentially fatal. Minimizing the risk, delaying recall, or failing to investigate thoroughly violates 21 CFR Part 211.67 (equipment cleaning), ICH Q9 (quality risk management), and endangers patients' lives. Regulatory authorities can shut down the facility.",
    },
  },

  // ── 6. CAPA Investigator: Stability Failure — Market Recall ──
  {
    id: "capa-stability-recall",
    title: "CAPA Investigator: Shelf Life Shattered — Stability Failure & Recall",
    description:
      "Routine 12-month accelerated stability testing reveals that Batch #P-780 of Amlodipine 5mg tablets (a blood pressure medication taken by millions daily) is showing accelerated degradation — potency has dropped to 88.7% at the 12-month point against a specification of NLT 90.0%. The batch has a 24-month shelf life and has been on the market for 8 months. 2.5 million tablets are distributed across 6 states. As QA Officer, determine whether this is a batch-specific issue or a formulation instability, assess patient risk from degraded blood pressure medication, and make the recall decision.",
    category: "pharma",
    difficulty: "hard",
    xpReward: 185,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "stability",
      "shelf-life",
      "degradation",
      "recall",
      "OOS",
      "ICH-Q1",
      "formulation",
    ],
    customer: {
      name: "Stability Lab",
      age: 0,
      profession: "Stability Studies Program",
      city: "QC Stability Lab",
      avatar: "SL",
      personality:
        "You are the Stability Studies Laboratory system. You present accelerated and long-term stability data with scientific precision — degradation kinetics, impurity profiles, dissolution trends. You challenge the QA Officer with the complexity that stability failures involve: multiple batches, time-dependent risk, and the difficult question of when degraded product crosses from 'suboptimal' to 'dangerous.' A blood pressure medication losing potency means patients' blood pressure is not controlled — leading to stroke, heart attack, or kidney failure.",
      goal: "Guide the QA Officer through a stability failure investigation, testing their understanding of ICH stability guidelines, degradation kinetics, patient risk assessment for a chronic-use medication, and recall decision-making",
      archetype: "PHARMA_STABILITY_LAB",
      moodInitial: 4,
      hotButtons: [
        "stability doesn't matter",
        "patients can just take more",
        "88% is close enough",
        "recall is overreaction",
        "ignore accelerated data",
      ],
      aiPersonaPrompt:
        "You are the Stability Studies Program at a pharmaceutical company. Amlodipine 5mg tablets Batch #P-780 (manufactured 12 months ago, 24-month shelf life) has failed the 12-month accelerated stability station (40°C/75% RH):\n\n- Assay: 88.7% (Spec: NLT 90.0%) — FAIL\n- Degradation Impurity (Imp-A): 0.42% (Spec: NMT 0.30%) — FAIL\n- Dissolution (Q=80% in 30 min): 76% — FAIL\n- Appearance: Slight yellowing noted\n- Previous stations: 3-month: 98.2%, 6-month: 95.1%, 9-month: 91.8% — clear downward TREND\n\nLong-term stability (25°C/60% RH) data for the same batch:\n- 6-month: 97.1% (passing)\n- 12-month: 94.8% (passing, but lower than expected)\n\nTwo other batches (#P-781 and #P-782) manufactured with the same formulation in the same month show similar but less severe trends on accelerated stability (12-month: 91.2% and 90.8%).\n\nBatch #P-780: 2.5 million tablets distributed across 6 states. Manufactured with a new excipient supplier (MCC from Excipient Corp instead of the qualified supplier Colorcon).\n\nThe marketing team argues: 'Long-term data is still passing. Accelerated stability is just a stress test — patients store at room temperature. No recall needed.' Present data progressively. Keep responses 2-4 sentences.",
    },
    openingStatement:
      "⚠️ STABILITY ALERT — 12-Month Accelerated Stability (40°C/75% RH) for Amlodipine 5mg Batch #P-780: Assay DROPPED to 88.7% (Spec: ≥90.0%) ❌ | Impurity-A: 0.42% (Limit: ≤0.30%) ❌ | Dissolution: 76% (Spec: ≥80%) ❌ | Trend: 3M=98.2%, 6M=95.1%, 9M=91.8%, 12M=88.7% — steady decline. Long-term (25°C/60% RH) 12-month data: 94.8% (passing but lower than expected). Two sister batches (#P-781, #P-782) showing similar trends. Batch #P-780: 2.5M tablets on market across 6 states, 12 months remaining shelf life. What is your assessment?",
    steps: [
      {
        speaker: "customer",
        text: "⚠️ STABILITY ALERT — 12-Month Accelerated Stability (40°C/75% RH) for Amlodipine 5mg Batch #P-780: Assay DROPPED to 88.7% (Spec: ≥90.0%) ❌ | Impurity-A: 0.42% (Limit: ≤0.30%) ❌ | Dissolution: 76% (Spec: ≥80%) ❌ | Trend: 3M=98.2%, 6M=95.1%, 9M=91.8%, 12M=88.7% — steady decline. Long-term (25°C/60% RH) 12-month data: 94.8% (passing but lower than expected). Two sister batches (#P-781, #P-782) showing similar trends. Batch #P-780: 2.5M tablets on market across 6 states, 12 months remaining shelf life. What is your assessment?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Assess the stability data scientifically. The accelerated data shows a clear, linear degradation trend. While long-term data is currently passing, the TREND is concerning — and accelerated data predicts what will happen over the remaining shelf life. Do not dismiss accelerated data just because long-term is currently passing.",
        expectedAction:
          "Assessment: (1) Initiate OOS investigation for the accelerated stability failure per ICH Q1E, (2) The degradation trend is LINEAR and steep: losing ~3.2% per 3-month interval on accelerated — extrapolating, potency will continue to fall, (3) Long-term data at 94.8% is passing NOW but is already lower than expected — at this trajectory, it may fail before the 24-month expiry, (4) Sister batches showing similar trends suggests this is NOT batch-specific — it's likely a formulation or raw material issue, (5) Quarantine retained samples of all three batches, (6) Pull additional long-term stability samples for interim testing NOW — don't wait for the next scheduled station, (7) Begin investigation into what changed — new excipient supplier, process changes, environmental conditions during manufacturing.",
        hints: [
          "Accelerated stability predicts shelf-life behavior — don't dismiss it",
          "Linear degradation trend: 98.2 → 95.1 → 91.8 → 88.7 = losing ~3.2%/quarter",
          "Long-term at 94.8% is lower than expected — may fail before 24-month expiry",
          "Three batches with similar trends = systematic issue, not random",
          "ICH Q1E provides guidance on using accelerated data for shelf-life prediction",
          "New excipient supplier is a red flag — MCC change can affect stability",
        ],
        idealKeywords: [
          "OOS investigation",
          "degradation trend",
          "linear decline",
          "ICH Q1E",
          "shelf-life prediction",
          "sister batches",
          "systematic issue",
          "quarantine",
          "interim testing",
          "excipient supplier",
          "formulation",
          "extrapolate",
        ],
        bannedPhrases: [
          "accelerated data doesn't matter",
          "long-term is passing so it's fine",
          "88.7% is close enough",
          "patients won't notice",
          "one batch failing doesn't mean anything",
        ],
        scoring: {
          "Analytical Thinking": 15,
          "GMP Awareness": 15,
          "Patient Safety": 10,
        },
      },

      // ── Step 2: Root Cause & Recall Decision ──
      {
        speaker: "customer",
        text: "OOS investigation initiated. Interim long-term stability samples pulled for all 3 batches. Investigation reveals: the MCC (Microcrystalline Cellulose) supplier was changed 14 months ago from Colorcon (qualified, 10-year track record) to Excipient Corp (newly qualified, cost saving of ₹8/kg). Comparative analysis shows Excipient Corp's MCC has higher moisture content (5.8% vs Colorcon's 4.1%) and different particle size distribution. Forced degradation studies confirm: Amlodipine degrades faster in the presence of higher-moisture MCC — the moisture acts as a catalyst for hydrolytic degradation. Meanwhile, marketing pushes back: 'Long-term data is still within spec. Recalling 2.5 million tablets based on accelerated data alone is unprecedented. The long-term 18-month station is just 6 months away — can't we wait?' What is your decision?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Make the recall decision. The root cause is confirmed: incompatible excipient with higher moisture drives degradation. Long-term data is currently passing but the MECHANISM for continued degradation is active. Patients will be taking this medication for 12 more months. Waiting for the 18-month station means 6 more months of potentially sub-potent medication on the market.",
        expectedAction:
          "Decision: (1) RECALL Batch #P-780 — the accelerated OOS confirms a real degradation mechanism (hydrolytic degradation catalyzed by moisture), long-term data shows a downward trend that will likely fail before expiry, and waiting 6 months for the next station puts patients at risk, (2) RECALL Batches #P-781 and #P-782 — same formulation, same excipient, same degradation trend. Don't wait for them to fail, (3) REVIEW all batches manufactured with Excipient Corp MCC — identify and assess every batch, (4) Shelf-life re-evaluation: reduce the assigned shelf life for any remaining batches with this excipient based on available stability data per ICH Q1E, (5) Marketing's argument is wrong: accelerated data that correlates with a confirmed degradation mechanism IS predictive — this is exactly what ICH Q1A/Q1E is designed for, (6) Sub-potent Amlodipine = uncontrolled blood pressure = stroke/heart attack risk — this is not a theoretical concern for a chronic-use medication.",
        hints: [
          "Root cause is CONFIRMED: higher-moisture MCC drives hydrolytic degradation",
          "This is a known, active degradation mechanism — it won't stop",
          "Patients rely on Amlodipine daily for blood pressure control — sub-potent = dangerous",
          "Waiting 6 months means 6 months of potentially sub-potent medication in patients",
          "ICH Q1E explicitly allows shelf-life decisions based on accelerated + long-term trends",
          "All batches with Excipient Corp MCC are at risk — not just P-780",
        ],
        idealKeywords: [
          "recall all three batches",
          "confirmed mechanism",
          "hydrolytic degradation",
          "moisture",
          "cannot wait",
          "patient risk",
          "blood pressure",
          "stroke",
          "heart attack",
          "ICH Q1E",
          "shelf-life reduction",
          "all batches with this excipient",
          "chronic medication",
        ],
        bannedPhrases: [
          "wait for 18-month data",
          "long-term is still passing",
          "marketing has a point",
          "accelerated data is just a stress test",
          "patients can manage",
          "only recall P-780",
        ],
        scoring: {
          "Patient Safety": 20,
          "Analytical Thinking": 15,
          "GMP Awareness": 10,
        },
      },

      // ── Step 3: Corrective Actions ──
      {
        speaker: "customer",
        text: "Recall approved for all 3 batches. Regulatory notifications filed. All batches manufactured with Excipient Corp MCC identified (total: 11 batches across 3 products) — stability data being reviewed for all. Now: the procurement team is defensive. 'Excipient Corp passed our incoming QC tests. Their CoA matched our specifications. The supplier qualification was done properly. How were we supposed to know?' What corrective actions address both the immediate product issue and the supplier qualification gap?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: The procurement team has a point — Excipient Corp DID pass incoming QC tests. The gap is that current incoming specifications (moisture NMT 7.0%, particle size within range) are too broad — they don't test for compatibility with specific formulations. Fix the immediate issue AND the systemic qualification gap.",
        expectedAction:
          "Corrective actions: (1) IMMEDIATE — Suspend use of Excipient Corp MCC for all Amlodipine products and any other moisture-sensitive formulations, (2) IMMEDIATE — Revert to Colorcon MCC for Amlodipine production — emergency procurement, (3) SUPPLIER — Issue SCAR to Excipient Corp for the moisture content inconsistency (5.8% vs certificate claim of 4.5%), (4) SPECIFICATION — Tighten incoming MCC specification for moisture-sensitive products: moisture NMT 4.5% (from 7.0%) — product-specific acceptance criteria, (5) QUALIFICATION GAP — Current supplier qualification tests physical/chemical properties but does NOT test drug-excipient compatibility. Add mandatory accelerated compatibility studies (drug + each excipient at 40°C/75% RH for 4 weeks) before approving any excipient supplier change, (6) FORMULATION — R&D to evaluate adding a desiccant sachet or moisture barrier packaging to improve moisture protection, (7) CHANGE CONTROL — Strengthen the change control process: any excipient supplier change must trigger a formal risk assessment including stability impact assessment signed by QA and R&D.",
        hints: [
          "Incoming QC specs were too broad — moisture NMT 7.0% allowed the 5.8% MCC through",
          "Supplier qualification should include drug-excipient compatibility testing",
          "Current process: qualify supplier → incoming QC → use. Missing: compatibility step",
          "Product-specific excipient specs are needed for sensitive formulations",
          "Accelerated compatibility studies (4 weeks) can predict stability issues before full production",
          "Packaging improvement (moisture barrier) adds another layer of protection",
        ],
        idealKeywords: [
          "suspend Excipient Corp",
          "revert to Colorcon",
          "tighten specification",
          "moisture limit",
          "drug-excipient compatibility",
          "accelerated compatibility study",
          "SCAR",
          "change control",
          "risk assessment",
          "moisture barrier",
          "desiccant",
          "product-specific",
        ],
        bannedPhrases: [
          "incoming QC was fine",
          "the specification doesn't need changing",
          "compatibility testing is R&D's problem",
          "just switch back to Colorcon and move on",
          "supplier qualification was adequate",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Analytical Thinking": 15,
          "Preventive Thinking": 10,
        },
      },

      // ── Step 4: Preventive Actions — Stability Program Overhaul ──
      {
        speaker: "customer",
        text: "Corrective actions approved. Excipient Corp MCC suspended. Colorcon emergency supply confirmed. SCAR issued. Now: the QA Head asks you to present a preventive action plan that prevents ANY similar stability surprise in the future. 'We have 47 commercial products, 120+ excipient suppliers, and make supplier changes 8-10 times per year for cost optimization. How do we make sure a cost-saving decision never again causes a stability failure and a market recall?' What is your systemic preventive plan?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design a systemic approach to prevent excipient changes from causing stability failures. The company makes 8-10 supplier changes per year — each one is a potential stability risk. The current change control process is insufficient. Build a system that integrates procurement, R&D stability, QA, and regulatory into a robust change management framework.",
        expectedAction:
          "Preventive plan: (1) MANDATORY COMPATIBILITY PROTOCOL — Any excipient supplier change triggers a 4-week accelerated compatibility study (drug + new excipient at 40°C/75% RH) BEFORE production approval. No exceptions for cost savings, (2) RISK CLASSIFICATION — Classify excipients by criticality: Class A (directly affects stability/dissolution — MCC, binders, disintegrants) requires full compatibility + 3-month accelerated stability of pilot batch. Class B (lower impact) requires compatibility study only, (3) STABILITY PREDICTION MODEL — Implement statistical trending of all stability data (Minitab/JMP) with automated alerts when degradation rate exceeds predefined thresholds — catch problems at the 3-month station, not the 12-month, (4) CHANGE CONTROL UPGRADE — Excipient supplier changes classified as 'Major' changes requiring QA, R&D, Regulatory, and Stability input — not just procurement and QC, (5) REAL-TIME STABILITY MONITORING — Invest in real-time stability indicating methods (NIR/Raman spectroscopy) for in-process and finished product monitoring, (6) SUPPLIER PORTFOLIO STRATEGY — Maintain at least 2 qualified suppliers for every critical excipient — reduces pressure to qualify cost-driven alternatives quickly, (7) ANNUAL REVIEW — Annual Product Quality Review (APQR) must include trend analysis of ALL stability data across all batches, with statistical comparison of batches using different excipient suppliers, (8) TRAINING — R&D, QA, QC, and Procurement training on excipient criticality and the role of drug-excipient compatibility in long-term product quality.",
        hints: [
          "4-week accelerated compatibility study is cheap insurance vs. a market recall",
          "Risk-classify excipients — not all changes carry the same stability risk",
          "Statistical trending catches degradation early — don't wait for OOS",
          "Excipient changes should be 'Major' change control — not a procurement decision alone",
          "Dual-sourcing for critical excipients reduces supply chain pressure",
          "APQR trending should compare batches by excipient supplier",
          "NIR/Raman can give rapid stability indication without waiting months for HPLC results",
        ],
        idealKeywords: [
          "compatibility protocol",
          "accelerated compatibility",
          "risk classification",
          "criticality",
          "statistical trending",
          "automated alerts",
          "change control",
          "major change",
          "dual sourcing",
          "APQR",
          "product quality review",
          "NIR",
          "Raman",
          "real-time monitoring",
          "pilot batch",
        ],
        bannedPhrases: [
          "current process is adequate",
          "compatibility testing slows down procurement",
          "cost savings are more important",
          "we can't test every supplier change",
          "stability is just a formality",
          "procurement doesn't need QA approval",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "Compliance Understanding": 10,
          "GMP Awareness": 15,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "ICH Q1A",
          "ICH Q1E",
          "stability",
          "shelf life",
          "specification",
          "deviation",
          "SOP",
          "validation",
          "change control",
        ],
        weight: 20,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "degradation trend",
          "linear",
          "extrapolate",
          "mechanism",
          "hydrolytic",
          "moisture",
          "root cause",
          "compatibility",
          "systematic",
          "correlation",
        ],
        weight: 25,
      },
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "recall",
          "blood pressure",
          "stroke",
          "heart attack",
          "chronic",
          "sub-potent",
          "safety",
          "risk",
          "2.5 million",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "compatibility study",
          "risk classification",
          "statistical trending",
          "dual sourcing",
          "APQR",
          "real-time",
          "NIR",
          "systemic",
          "proactive",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "ICH",
          "regulatory",
          "recall",
          "CDSCO",
          "FDA",
          "change control",
          "documentation",
          "SCAR",
          "supplier qualification",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "accelerated data doesn't count",
        "long-term is still passing",
        "patients can manage with 88%",
        "wait for 18-month data",
        "recall is an overreaction",
        "marketing is right",
        "88% potency is close enough to 90%",
        "stability testing is just a formality",
        "cost savings justify the risk",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: Dismissing stability failure data, delaying recall of degraded medication, or prioritizing cost over patient safety violates ICH Q1A/Q1E stability guidelines and 21 CFR Part 211.166. Sub-potent blood pressure medication can lead to uncontrolled hypertension, stroke, and death. Regulatory authorities can revoke manufacturing licenses.",
    },
  },

  // ── 7. CAPA Investigator: Water System Contamination — Endotoxin Crisis ──
  {
    id: "capa-water-system-endotoxin",
    title: "CAPA Investigator: Toxic Water — Endotoxin Breach in WFI System",
    description:
      "Routine Water-for-Injection (WFI) monitoring detects endotoxin levels at 0.35 EU/mL against a limit of 0.25 EU/mL at the point-of-use in the sterile filling area. WFI is used to formulate injectable drugs — endotoxin-contaminated injectables cause fever, septic shock, and can be fatal. The WFI system feeds 3 sterile manufacturing suites and has been in continuous operation. As QA Officer, you must trace the contamination source, assess which products are affected, and restore the water system to a qualified state — all while the sterile production line is halted and revenue losses mount at ₹50 lakhs per day.",
    category: "pharma",
    difficulty: "medium",
    xpReward: 160,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "water-system",
      "WFI",
      "endotoxin",
      "biofilm",
      "sterile-manufacturing",
      "USP",
      "pyrogen",
    ],
    customer: {
      name: "Utility Systems",
      age: 0,
      profession: "Water & Utility Monitoring System",
      city: "Utility Plant",
      avatar: "WS",
      personality:
        "You are the pharmaceutical facility's Water and Utility Monitoring System. You present water quality data, microbial monitoring results, and system operation logs with precision. WFI is the lifeblood of sterile manufacturing — any compromise in water quality directly threatens patient safety. You challenge the QA Officer with progressive data disclosure and test whether they can think systematically about water system microbiology.",
      goal: "Guide the QA Officer through a WFI endotoxin exceedance investigation, testing understanding of water system design, biofilm, endotoxin science, and the cascade impact on sterile products",
      archetype: "PHARMA_UTILITY_SYSTEM",
      moodInitial: 4,
      hotButtons: [
        "endotoxin doesn't matter",
        "just flush the system",
        "skip the sanitization",
        "water is water",
        "the limit is too conservative",
      ],
      aiPersonaPrompt:
        "You are the Utility Monitoring System at a sterile pharmaceutical manufacturing facility. The WFI (Water for Injection) distribution loop serves 3 sterile manufacturing suites:\n- Suite A: Injectable antibiotics (Ceftriaxone)\n- Suite B: Ophthalmic solutions (eye drops)\n- Suite C: IV fluid bags (Normal Saline, Dextrose)\n\nRoutine monitoring data:\n- Point-of-Use #7 (Suite A inlet): Endotoxin 0.35 EU/mL (Limit: ≤0.25 EU/mL) — FAIL\n- Point-of-Use #4 (Suite B inlet): Endotoxin 0.18 EU/mL — passing but elevated (alert limit: 0.125 EU/mL)\n- Point-of-Use #12 (Suite C inlet): Endotoxin 0.08 EU/mL — passing\n- WFI Generation Point (still): Endotoxin <0.03 EU/mL — within spec\n- Storage Tank outlet: Endotoxin 0.05 EU/mL — within spec\n- Distribution loop return: Endotoxin 0.22 EU/mL — elevated\n\nSystem details: WFI generated by multi-effect distillation still (qualified). 316L stainless steel distribution loop, 2,000L storage tank. Loop temperature: maintained at 80°C (spec: ≥80°C). However, maintenance records show that the loop temperature dropped to 62°C for a 4-hour period 3 weeks ago during a steam supply interruption — operations continued without notifying QA. The loop has a dead leg at an unused sampling point (#15) that was identified in the last requalification but not remediated.\n\nPresent data progressively. Endotoxin in injectable products causes pyrogenic reactions (fever, chills), and at high levels, septic shock and death. Keep responses 2-4 sentences.",
    },
    openingStatement:
      "⚠️ WFI ENDOTOXIN ALERT — Routine monitoring at Point-of-Use #7 (Sterile Suite A, Injectable Antibiotics): Endotoxin 0.35 EU/mL detected. Limit: ≤0.25 EU/mL ❌. Point-of-Use #4 (Suite B, Ophthalmic): 0.18 EU/mL — passing but above alert limit of 0.125. WFI Generation Point and Storage Tank are within spec. Distribution loop return shows 0.22 EU/mL — elevated. Contamination appears to be developing WITHIN the distribution loop. Suite A has been formulating Ceftriaxone injection batches. What is your immediate response?",
    steps: [
      {
        speaker: "customer",
        text: "⚠️ WFI ENDOTOXIN ALERT — Routine monitoring at Point-of-Use #7 (Sterile Suite A, Injectable Antibiotics): Endotoxin 0.35 EU/mL detected. Limit: ≤0.25 EU/mL ❌. Point-of-Use #4 (Suite B, Ophthalmic): 0.18 EU/mL — passing but above alert limit of 0.125. WFI Generation Point and Storage Tank are within spec. Distribution loop return shows 0.22 EU/mL — elevated. Contamination appears to be developing WITHIN the distribution loop. Suite A has been formulating Ceftriaxone injection batches. What is your immediate response?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: The endotoxin source is between the storage tank and the point-of-use — i.e., WITHIN the distribution loop. Since the generation point is clean, this suggests biofilm or contamination within the piping. Quarantine affected products, halt WFI-dependent production, and begin systematic sampling to locate the source.",
        expectedAction:
          "Immediate actions: (1) HALT all sterile production using WFI from the distribution loop — Suites A, B, and C, (2) QUARANTINE all Ceftriaxone injection batches formulated using WFI from Point-of-Use #7 since the last passing endotoxin result — these are the highest risk, (3) QUARANTINE ophthalmic batches from Suite B — endotoxin is elevated even though passing, (4) Initiate COMPREHENSIVE sampling of the entire distribution loop: every valve, branch, point-of-use, heat exchanger, and dead leg — map the endotoxin gradient to find the source, (5) Review WFI system operating logs: temperature excursions, flow rates, maintenance events in the past month, (6) Notify QA Head, Production Director, and Engineering.",
        hints: [
          "Generation point clean + loop contaminated = biofilm in the distribution system",
          "Suite A is highest risk — failed endotoxin at the point where injectables are formulated",
          "Suite B is at alert limit — don't wait for it to fail, quarantine proactively",
          "Map the endotoxin gradient: sample every point to find where levels spike",
          "Temperature, flow, and dead legs are the three biggest factors in loop contamination",
          "Products formulated with contaminated WFI may themselves be contaminated",
        ],
        idealKeywords: [
          "halt production",
          "quarantine",
          "Ceftriaxone batches",
          "comprehensive sampling",
          "endotoxin gradient",
          "distribution loop",
          "biofilm",
          "dead leg",
          "temperature",
          "operating logs",
          "Suite A highest risk",
          "ophthalmic",
        ],
        bannedPhrases: [
          "the generation point is fine so the water is fine",
          "0.35 is only slightly over",
          "Suite B is passing so no action needed",
          "just flush the loop",
          "endotoxin in injectables isn't serious",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Patient Safety": 15,
          "Analytical Thinking": 10,
        },
      },

      // ── Step 2: Source Identification ──
      {
        speaker: "customer",
        text: "All sterile production halted. Products quarantined. Comprehensive loop sampling complete — results map the contamination: Endotoxin levels are LOW at the storage tank outlet (0.05 EU/mL) and INCREASE progressively along the loop, peaking at the unused dead leg at sampling point #15 (1.8 EU/mL — 7x the limit!) before dropping slightly at the return. Additionally, maintenance logs reveal: 3 weeks ago, the loop temperature dropped to 62°C for 4 hours during a steam supply interruption. Operations continued — QA was NOT notified. The dead leg at point #15 was flagged for remediation 6 months ago in the requalification report but was deferred due to a 'low-priority' classification. Your assessment?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Two compounding factors: (1) the dead leg is a biofilm harbor — stagnant water at reduced flow creates perfect conditions for microbial growth and endotoxin release, and (2) the temperature excursion to 62°C (below the 80°C minimum that inhibits microbial growth) allowed biofilm to proliferate. Together, these created the endotoxin exceedance. Demonstrate understanding of water system microbiology.",
        expectedAction:
          "Assessment: (1) ROOT CAUSE — Biofilm formation in the dead leg at sampling point #15. Dead legs create stagnant zones where water doesn't circulate at full temperature or flow — perfect for biofilm, (2) CONTRIBUTING CAUSE — Temperature excursion to 62°C for 4 hours. WFI loops maintained at ≥80°C specifically to prevent microbial growth. 62°C is warm enough for many organisms to THRIVE. This excursion likely triggered a biofilm bloom, (3) SYSTEMIC FAILURE #1 — Dead leg was identified 6 months ago but remediation was deferred — risk-based decision was WRONG given it's a sterile manufacturing WFI loop, (4) SYSTEMIC FAILURE #2 — Operations continued during the temperature excursion without notifying QA — this is a failure in the deviation reporting culture, (5) The combination of a biofilm-harboring dead leg + a temperature excursion that removed the thermal barrier = predictable endotoxin contamination, (6) Endotoxin is the SHED product of gram-negative bacteria in biofilm — even if you kill the bacteria, the endotoxin remains.",
        hints: [
          "Dead legs = stagnant water = biofilm paradise",
          "80°C keeps bacteria suppressed; 62°C lets them grow",
          "Biofilm produces endotoxin even after the bacteria die — heat kills bacteria but NOT endotoxin",
          "Dead leg + temperature excursion = compounding risk factors",
          "QA not being notified of the temperature excursion is a deviation reporting failure",
          "Dead leg remediation was a known action item — deferred = risk accepted and now realized",
        ],
        idealKeywords: [
          "biofilm",
          "dead leg",
          "stagnant",
          "temperature excursion",
          "62°C",
          "80°C",
          "microbial growth",
          "gram-negative",
          "endotoxin shed",
          "deviation reporting",
          "deferred remediation",
          "compounding factors",
          "risk accepted",
        ],
        bannedPhrases: [
          "dead legs don't matter",
          "temperature drop was minor",
          "biofilm isn't a concern in hot loops",
          "4 hours isn't long enough for growth",
          "operations was right to continue",
        ],
        scoring: {
          "Analytical Thinking": 20,
          "GMP Awareness": 15,
          "Patient Safety": 5,
        },
      },

      // ── Step 3: Corrective Actions — System Restoration ──
      {
        speaker: "customer",
        text: "Root cause accepted: biofilm in dead leg #15, exacerbated by temperature excursion. The Engineering team asks for your corrective action plan to restore the WFI system. They propose: 'Let's do a chemical sanitization with ozone, flush the loop, and requalify. We can be back in production in 48 hours.' Meanwhile, QA needs to disposition the quarantined Ceftriaxone and ophthalmic batches. What are your corrective actions?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Engineering's plan is incomplete. Sanitization without removing the dead leg means the biofilm will return. And batch disposition requires endotoxin testing of the PRODUCT, not just the water — because the water was used to formulate the drug. Think about both the system fix AND the product impact.",
        expectedAction:
          "Corrective actions: (1) WFI SYSTEM — Do NOT just sanitize and restart. First, physically REMOVE the dead leg at point #15 — this is a permanent engineering fix, not a deferral. Sanitization alone won't eliminate biofilm from a dead leg because flow doesn't reach it, (2) SANITIZATION — After dead leg removal, perform a full system sanitization: chemical (ozone or peracetic acid) followed by hot water flush at ≥95°C for minimum 2 hours, then drain and re-commission, (3) REQUALIFICATION — Full WFI system requalification per USP <1231>: 3-week sampling at all points, daily endotoxin and microbial testing, before ANY production resumes, (4) PRODUCT DISPOSITION — Ceftriaxone batches: perform endotoxin testing (LAL/rFC) on retained samples of each batch. Any batch with endotoxin above 0.5 EU/mL (Ceftriaxone limit) must be rejected. Also test for bioburden, (5) Ophthalmic batches: endotoxin testing per USP <85>. Ophthalmic products have lower endotoxin limits — assess against product-specific specs, (6) TEMPERATURE EXCURSION — Issue a formal deviation for the unreported temperature event. Investigate who knew and why QA was not notified.",
        hints: [
          "Dead leg REMOVAL is essential — sanitization alone won't fix a dead leg biofilm",
          "Biofilm in dead legs is protected from chemical sanitization by flow limitations",
          "3-week requalification is the standard for WFI system restoration",
          "Product endotoxin must be tested — water contamination may have transferred to the drug",
          "Ceftriaxone and ophthalmic products have different endotoxin limits",
          "The unreported temperature excursion is a separate deviation requiring investigation",
          "Engineering's 48-hour timeline is unrealistic — requalification alone takes 3 weeks",
        ],
        idealKeywords: [
          "remove dead leg",
          "physical elimination",
          "sanitization",
          "ozone",
          "hot water flush",
          "requalification",
          "3-week sampling",
          "USP",
          "product endotoxin testing",
          "LAL",
          "rFC",
          "batch-specific limits",
          "deviation for temperature",
          "unreported",
        ],
        bannedPhrases: [
          "just sanitize and restart",
          "dead leg can stay",
          "48 hours is enough",
          "if the water passes after sanitization we're done",
          "no need to test the product",
          "requalification is too slow",
        ],
        scoring: {
          "GMP Awareness": 20,
          "Analytical Thinking": 10,
          "Patient Safety": 10,
        },
      },

      // ── Step 4: Preventive Actions ──
      {
        speaker: "customer",
        text: "Dead leg removal approved and scheduled. Full sanitization and 3-week requalification planned. Product endotoxin testing initiated. Temperature excursion deviation opened. Engineering estimates 4 weeks to full production restart — management is unhappy about ₹2 crore revenue loss. Your QA Head wants preventive actions: 'This facility has a 15-year-old WFI loop. Dead legs, aging gaskets, and temperature excursions will keep happening if we don't fundamentally upgrade our water system governance. What's the plan to prevent this from ever happening again?'",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design a comprehensive water system governance upgrade. The current system has aging infrastructure, deferred maintenance, and inadequate real-time monitoring. Build a modern water system management program that prevents contamination through continuous monitoring, proactive maintenance, and robust design standards.",
        expectedAction:
          "Preventive plan: (1) ENGINEERING — Conduct a full survey of the WFI loop for ALL dead legs, crevices, and design deficiencies. Eliminate every dead leg (L/D ratio >3 per ISPE guidelines). Budget and execute within 6 months, (2) MONITORING — Install continuous TOC (Total Organic Carbon) and conductivity monitors at critical points with real-time alarming to QA. Add automated endotoxin trending capability, (3) MONITORING — Increase WFI monitoring frequency from weekly to DAILY for all sterile suite points-of-use, with statistical trending and alert/action limits, (4) AUTOMATION — Implement automated temperature monitoring with REAL-TIME alerts to QA and Engineering when loop temperature drops below 80°C — immediate notification, not discovered weeks later, (5) MAINTENANCE — Create a Preventive Maintenance schedule for WFI system: quarterly sanitization, annual requalification, semi-annual inspection of gaskets, valves, and welds. No deferral of critical findings, (6) SOP — Update deviation reporting SOP: ANY utility excursion (temperature, pressure, flow) must be reported to QA within 1 hour — enforce with disciplinary consequences, (7) DESIGN — For future system upgrades, adopt ISPE Baseline Guide for Water and Steam Systems standards: orbital-welded joints, self-draining slopes, zero dead legs, continuous circulation, (8) TREND REVIEW — Monthly WFI quality trend review in Quality Council — catch rising trends before they become exceedances.",
        hints: [
          "L/D ratio >3 = dead leg per ISPE — survey and eliminate all of them",
          "Continuous TOC monitoring is real-time biofilm early warning",
          "Automated temperature alarms prevent unreported excursions",
          "Daily monitoring at critical points catches problems early",
          "Quarterly sanitization is preventive, not reactive",
          "ISPE Baseline Guide is the gold standard for pharma water system design",
          "Monthly trending in Quality Council catches slow deterioration",
        ],
        idealKeywords: [
          "dead leg elimination",
          "L/D ratio",
          "ISPE",
          "continuous TOC",
          "real-time alerts",
          "daily monitoring",
          "automated temperature",
          "preventive maintenance",
          "quarterly sanitization",
          "annual requalification",
          "deviation reporting",
          "orbital welded",
          "self-draining",
          "quality council",
          "trending",
        ],
        bannedPhrases: [
          "the current system is adequate",
          "weekly monitoring is enough",
          "dead legs are acceptable if we sanitize",
          "temperature alarms are expensive",
          "continuous monitoring isn't necessary",
          "15-year-old system is fine",
        ],
        scoring: {
          "Preventive Thinking": 20,
          "GMP Awareness": 15,
          "Compliance Understanding": 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "WFI",
          "USP",
          "endotoxin",
          "biofilm",
          "dead leg",
          "sanitization",
          "requalification",
          "distribution loop",
          "ISPE",
        ],
        weight: 25,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "biofilm",
          "dead leg",
          "temperature excursion",
          "root cause",
          "compounding factors",
          "gradient",
          "stagnant",
          "gram-negative",
          "systematic",
        ],
        weight: 20,
      },
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "pyrogenic",
          "septic shock",
          "injectable",
          "quarantine",
          "endotoxin testing",
          "product impact",
          "ophthalmic",
          "Ceftriaxone",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "continuous monitoring",
          "TOC",
          "real-time alerts",
          "dead leg elimination",
          "ISPE",
          "preventive maintenance",
          "trending",
          "quality council",
          "proactive",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "USP 1231",
          "regulatory",
          "deviation",
          "documentation",
          "requalification",
          "sampling",
          "action limits",
          "alert limits",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "endotoxin doesn't matter for injectables",
        "0.35 is only slightly over",
        "just flush and restart",
        "dead legs are normal",
        "48 hours is enough for requalification",
        "no need to test the product",
        "temperature drop was insignificant",
        "production revenue is more important",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: Endotoxin-contaminated Water for Injection used in sterile products can cause pyrogenic reactions, septic shock, and death. Cutting corners on WFI system restoration, skipping product endotoxin testing, or rushing requalification violates USP <1231>, 21 CFR Part 211.48, and EU Annex 1. This directly endangers patients' lives.",
    },
  },

  // ── 8. CAPA Investigator: Label Mix-Up — Wrong Drug, Wrong Patient ──
  {
    id: "capa-label-mixup",
    title: "CAPA Investigator: Fatal Label — Packaging Line Mix-Up",
    description:
      "A hospital pharmacist calls your company's medical information hotline in a panic: a patient received a bottle labelled 'Lisinopril 10mg' (blood pressure) but the tablets inside look different. Emergency analysis confirms the bottle contains Warfarin 5mg (blood thinner). A hypertensive patient has been taking a powerful anticoagulant unknowingly for 5 days — they could bleed to death. This is every pharmaceutical company's worst nightmare: a label mix-up that puts the wrong drug in a patient's hands. As QA Officer, manage the medical crisis, trace the root cause on the packaging line, and redesign the system to make this structurally impossible.",
    category: "pharma",
    difficulty: "expert",
    xpReward: 230,
    tags: [
      "pharma",
      "CAPA",
      "GMP",
      "label-mixup",
      "packaging-error",
      "patient-safety",
      "recall",
      "line-clearance",
      "serialization",
      "vision-inspection",
    ],
    customer: {
      name: "Medical Affairs",
      age: 0,
      profession: "Medical Information & Packaging System",
      city: "Corporate QA",
      avatar: "MA",
      personality:
        "You are the combined voice of Medical Affairs (handling the patient crisis) and the Packaging Operations system (presenting manufacturing data). This scenario has two parallel tracks: a patient in immediate medical danger AND a manufacturing investigation. You present both with appropriate urgency. A patient unknowingly taking Warfarin instead of Lisinopril for 5 days is at extreme risk of haemorrhage — this is a medical emergency AND a manufacturing catastrophe.",
      goal: "Guide the QA Officer through a dual-track crisis: immediate patient safety response AND packaging line root cause investigation, testing their ability to handle a life-threatening situation while conducting a thorough investigation",
      archetype: "PHARMA_MEDICAL_AFFAIRS",
      moodInitial: 2,
      hotButtons: [
        "it's the pharmacist's fault",
        "the patient should have noticed",
        "one bottle isn't a big deal",
        "labelling errors are rare",
        "we don't need to recall",
      ],
      aiPersonaPrompt:
        "You represent Medical Affairs and Packaging Operations. A hospital pharmacist (Apollo Hospital, Mumbai) called reporting that a patient, Mrs. Kamala Devi (68, hypertensive), received a bottle labelled 'Lisinopril 10mg' (30 tablets) but the tablets look different from her usual medication. Analysis confirms the bottle contains WARFARIN 5mg tablets.\n\nMrs. Devi has been taking 'one tablet daily' (thinking it's Lisinopril) for 5 DAYS. She is now on Warfarin 5mg/day with NO medical indication and NO INR monitoring. Her INR is unknown. She is at extreme risk of: spontaneous haemorrhage (brain, GI, internal), dangerous drug interactions (she's also on aspirin for her heart), and uncontrolled hypertension (she hasn't taken actual Lisinopril in 5 days).\n\nPackaging investigation: Both Lisinopril 10mg and Warfarin 5mg are packaged on Line P-03. On the day in question, Lisinopril was packaged on the morning shift and Warfarin on the afternoon shift. Line clearance records show the changeover was completed, but the label reconciliation count is off: 5,200 Lisinopril labels were issued but only 5,185 were accounted for (used + returned + damaged). 15 labels are missing. The batch of Warfarin packaged that afternoon: 8,000 bottles. The Lisinopril batch: 5,000 bottles distributed to 47 hospitals and pharmacies.\n\nPresent data with extreme urgency. Keep responses 2-4 sentences.",
    },
    openingStatement:
      "🔴 MEDICAL EMERGENCY — Apollo Hospital Mumbai reports patient Mrs. Kamala Devi (68, hypertensive) received a bottle labelled 'Lisinopril 10mg' containing WARFARIN 5mg tablets. Patient has been taking Warfarin unknowingly for 5 DAYS with NO INR monitoring. She is also on aspirin. EXTREME haemorrhage risk. Simultaneously: investigation reveals 15 Lisinopril labels UNACCOUNTED for during packaging line changeover from Lisinopril to Warfarin on Line P-03. Lisinopril batch (5,000 bottles) distributed to 47 locations. Warfarin batch (8,000 bottles) distributed to 62 locations. This is a dual crisis: patient medical emergency AND potential widespread label mix-up. What is your IMMEDIATE response?",
    steps: [
      {
        speaker: "customer",
        text: "🔴 MEDICAL EMERGENCY — Apollo Hospital Mumbai reports patient Mrs. Kamala Devi (68, hypertensive) received a bottle labelled 'Lisinopril 10mg' containing WARFARIN 5mg tablets. Patient has been taking Warfarin unknowingly for 5 DAYS with NO INR monitoring. She is also on aspirin. EXTREME haemorrhage risk. Simultaneously: investigation reveals 15 Lisinopril labels UNACCOUNTED for during packaging line changeover from Lisinopril to Warfarin on Line P-03. Lisinopril batch (5,000 bottles) distributed to 47 locations. Warfarin batch (8,000 bottles) distributed to 62 locations. This is a dual crisis: patient medical emergency AND potential widespread label mix-up. What is your IMMEDIATE response?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: TWO parallel tracks, both urgent. Track 1 (MEDICAL): The patient is in immediate danger — coordinate medical response. Track 2 (MANUFACTURING): 15 missing labels could mean up to 15 mislabelled bottles — initiate recall. Both tracks must start NOW, simultaneously. Do NOT prioritize one over the other — assign parallel teams.",
        expectedAction:
          "TRACK 1 — MEDICAL (immediate): (1) Medical Affairs to call Apollo Hospital directly — advise IMMEDIATE INR testing and vitamin K administration if INR is elevated, (2) Advise discontinuation of 'Lisinopril' from this bottle immediately, (3) Patient needs urgent haematology consult — Warfarin + aspirin for 5 days = severe bleeding risk, (4) Arrange for replacement genuine Lisinopril to be provided to the patient, (5) Document everything for adverse event reporting (ICSR to CDSCO within 15 days). TRACK 2 — MANUFACTURING (parallel): (1) Initiate Class I recall of BOTH batches — Lisinopril batch (up to 15 bottles may contain Warfarin) AND Warfarin batch (up to 15 bottles may contain Lisinopril), (2) Contact ALL 47+62 = 109 distribution points with urgent 'stop dispensing' notice, (3) Issue a Dear Healthcare Professional (DHCP) letter warning about the potential mix-up, (4) Notify CDSCO/Drug Controller immediately, (5) Quarantine any remaining stock at the facility.",
        hints: [
          "Patient FIRST: INR test + vitamin K + stop the Warfarin immediately",
          "Warfarin + aspirin = double anticoagulation = catastrophic bleeding risk",
          "15 missing labels = potentially 15 mislabelled bottles in BOTH batches",
          "BOTH batches need recall — Warfarin bottles might have Lisinopril labels AND vice versa",
          "109 distribution points all need urgent notification",
          "Adverse event reporting (ICSR) is a regulatory requirement",
          "This is Class I: reasonable probability of serious harm or death",
        ],
        idealKeywords: [
          "INR testing",
          "vitamin K",
          "haematology",
          "stop dispensing",
          "Class I recall",
          "both batches",
          "CDSCO",
          "DHCP letter",
          "adverse event",
          "ICSR",
          "all distribution points",
          "parallel tracks",
          "medical emergency",
          "aspirin interaction",
        ],
        bannedPhrases: [
          "wait for more reports before recalling",
          "only recall the Lisinopril batch",
          "the patient should have noticed",
          "it's the hospital's fault",
          "15 labels might just be miscounted",
          "one patient isn't a recall trigger",
        ],
        scoring: {
          "Patient Safety": 20,
          "GMP Awareness": 10,
          "Communication Clarity": 10,
        },
      },

      // ── Step 2: Packaging Line Investigation ──
      {
        speaker: "customer",
        text: "Medical response activated — Apollo Hospital has Mrs. Devi in the emergency unit. INR is 4.8 (normal: 1.0, therapeutic Warfarin range: 2-3) — she's dangerously over-anticoagulated. Vitamin K and fresh frozen plasma being administered. No active bleeding detected yet — caught just in time. Recall initiated for both batches. 96 of 109 distribution points reached so far. Now investigate: Line P-03 changeover records show the afternoon shift started Warfarin packaging 30 minutes after Lisinopril finished. The line clearance checklist has all boxes ticked, but when you review CCTV footage of the changeover, you see: (1) The operator cleared the labels from the labelling station but did NOT check the label magazine/feeder — 15 Lisinopril labels remained in the feeder, (2) The supervisor signed the line clearance without physically inspecting the label feeder — he was on the phone, (3) The online vision inspection camera (which should reject wrong labels) was in 'bypass' mode — a technician had bypassed it during morning maintenance and forgot to re-enable it. What is your root cause analysis?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Another cascade of failures — three independent safety barriers all failed simultaneously. The line clearance was superficial, the supervision was negligent, and the automated inspection (the last line of defence) was bypassed. Any ONE of these working correctly would have prevented the mix-up.",
        expectedAction:
          "Root cause analysis — THREE safety barriers failed: (1) LINE CLEARANCE FAILURE: Operator cleared visible labels but did NOT inspect the label magazine/feeder — the SOP likely says 'clear all labels' but the operator interpreted it superficially. 15 Lisinopril labels remained, fed into Warfarin bottles, (2) SUPERVISION FAILURE: Supervisor signed the line clearance form WITHOUT physical verification — this is falsification of a GMP record, directly analogous to the changeover scenario. Being 'on the phone' is not an excuse, (3) VISION SYSTEM BYPASS: The automated vision inspection camera — designed specifically to catch wrong labels — was in bypass mode. A technician bypassed it for maintenance and failed to re-enable it. There was NO interlock or alert to flag that the system was in bypass during production, (4) SYSTEMIC ROOT CAUSE: The facility relies on THREE barriers (operator clearance, supervisor verification, automated inspection) but none have hard interlocks. Each is independently defeatable by human error or negligence. When all three fail simultaneously, the result is catastrophic — wrong drug to the wrong patient.",
        hints: [
          "Three barriers, three failures — the Swiss Cheese Model in action",
          "Label feeder/magazine is a common hiding spot for residual labels",
          "Supervisor signing without inspection = GMP record falsification",
          "Vision system in bypass during production = the last safety net was disabled",
          "No interlock prevented production with vision system bypassed",
          "Any ONE barrier working = no patient harm. All three failed.",
        ],
        idealKeywords: [
          "three barriers failed",
          "Swiss Cheese",
          "label feeder",
          "magazine",
          "residual labels",
          "falsified verification",
          "vision system bypass",
          "no interlock",
          "cascade",
          "systemic",
          "independently defeatable",
          "line clearance inadequate",
        ],
        bannedPhrases: [
          "it's just the operator's mistake",
          "the vision system bypass wasn't important",
          "the supervisor had a good reason",
          "this is a one-time event",
          "line clearance was done",
        ],
        scoring: {
          "Analytical Thinking": 20,
          "GMP Awareness": 15,
          "Patient Safety": 5,
        },
      },

      // ── Step 3: Corrective Actions ──
      {
        speaker: "customer",
        text: "Root cause documented. Mrs. Devi is stabilizing — INR coming down with treatment. 103 of 109 distribution points reached. 3 additional reports of 'unusual looking tablets' from pharmacists — bottles being returned for testing. HR action initiated against operator and supervisor. Vision system technician retrained. Now: the CEO demands immediate corrective actions — 'How do we make sure this NEVER happens again? Our brand reputation is destroyed if another patient gets the wrong drug.' What corrective actions do you implement?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Implement corrective actions that create hard barriers — not just better checklists. The hierarchy of controls applies: elimination > engineering > administrative. Make it physically and electronically impossible for a label mix-up to reach a patient.",
        expectedAction:
          "Corrective actions: (1) VISION SYSTEM — Remove the ability to bypass during production: install a hardware interlock that PHYSICALLY prevents the packaging line from running if the vision system is not in active inspection mode. Bypass only possible with QA electronic override and time-limited, (2) LINE CLEARANCE — Implement photo-verified line clearance: operator must photograph the empty label magazine/feeder, hopper, and coding station as part of clearance. Photos attached to the electronic batch record — not just a checkbox, (3) LABEL CONTROLS — Implement 100% label reconciliation with ZERO tolerance: every label issued must be accounted for (used + damaged + returned). Any discrepancy ≥1 label = production STOP until resolved, (4) SERIALIZATION VERIFICATION — Enable the existing serialization system to cross-check: scan each bottle's barcode/2D matrix against the batch record — if the serial number belongs to a different product, automatic rejection, (5) SUPERVISION — Dual sign-off on line clearance for product changeovers: operator + QA representative physical verification. No single-person sign-off, (6) SCHEDULING — Implement product sequencing rules: never schedule look-alike or sound-alike drugs (LASA) back-to-back on the same line. Require a 'dedicated clearance' with enhanced verification when switching between high-risk drug combinations.",
        hints: [
          "Hardware interlock on vision system = can't produce without inspection active",
          "Photo-verified clearance is harder to falsify than a checkbox",
          "Zero-tolerance label reconciliation catches missing labels immediately",
          "Serialization cross-check is an electronic barrier against wrong labels",
          "Dual sign-off with QA presence prevents negligent supervisor sign-offs",
          "LASA (Look-Alike Sound-Alike) scheduling prevents high-risk back-to-back runs",
        ],
        idealKeywords: [
          "hardware interlock",
          "vision system cannot be bypassed",
          "photo-verified clearance",
          "zero tolerance reconciliation",
          "serialization cross-check",
          "dual sign-off",
          "QA presence",
          "LASA scheduling",
          "electronic batch record",
          "automatic rejection",
        ],
        bannedPhrases: [
          "more training is enough",
          "just update the checklist",
          "operators should be more careful",
          "the vision system rarely needs maintenance",
          "serialization isn't related to this",
        ],
        scoring: {
          "GMP Awareness": 15,
          "Preventive Thinking": 15,
          "Patient Safety": 10,
        },
      },

      // ── Step 4: Preventive Actions — Industry-Leading Safety System ──
      {
        speaker: "customer",
        text: "Corrective actions approved and implementation timeline set. Mrs. Devi has been discharged from hospital — fully recovered, INR normalized. All recalled bottles tested: 11 of the 15 missing labels found on Warfarin bottles containing Lisinopril, 4 labels destroyed during line clearance (accounted for). No additional patient harm reported. Now: the Board of Directors wants you to present a preventive action plan that makes this facility the SAFEST packaging operation in the industry. 'We have 12 packaging lines running 47 products. Label mix-ups are the pharmaceutical industry's most feared error. How do we become the gold standard?' What is your vision?",
      },
      {
        speaker: "system",
        text: "OBJECTIVE: Design an industry-leading packaging safety system. Think beyond just this incident — build a multi-layered, technology-driven system that makes label mix-ups structurally impossible across all 12 lines and 47 products. This should be a showcase of pharmaceutical packaging safety.",
        expectedAction:
          "Industry-leading preventive plan: (1) 100% SERIALIZATION + AGGREGATION — Every unit (bottle/blister) gets a unique serial number verified against the master batch record at the point of labelling. Aggregation tracks every unit from line to shipper to distributor. Wrong label = instant electronic rejection, (2) AI-POWERED VISION INSPECTION — Upgrade from basic vision to AI-based multi-point inspection: verify label text (OCR), colour, barcode, batch number, expiry date, AND compare tablet appearance through the bottle (colour, shape, size). Reject any mismatch, (3) RFID-TAGGED LABEL ROLLS — Each label roll gets an RFID tag linked to the product in the ERP system. The labelling machine reads the RFID before starting — if the label roll doesn't match the batch record, the machine WON'T START, (4) ELECTRONIC LINE CLEARANCE — Replace paper checklists with an electronic system: barcode-scan every component (labels, cartons, leaflets) against the batch record. System only releases the line for production when all components match and the vision system is confirmed active, (5) DEDICATED LINES for highest-risk products (Warfarin, Methotrexate, other narrow therapeutic index drugs) — eliminate the changeover risk entirely for the most dangerous drugs, (6) FACILITY-WIDE LASA MATRIX — Create a risk matrix of all 47 products assessing look-alike and sound-alike risk. High-risk combinations get colour-coded labels, different bottle shapes, and mandatory enhanced clearance, (7) NEAR-MISS REPORTING — Implement a no-blame near-miss reporting system. Reward employees who catch potential mix-ups before they reach patients. Track near-miss data as a leading indicator, (8) ANNUAL MOCK RECALL — Conduct annual mock recall drills to test the speed and completeness of the recall process. Time the response — target <24 hours to reach all distribution points.",
        hints: [
          "Serialization is the ultimate anti-mix-up technology — each unit is uniquely identified",
          "AI vision can verify tablet appearance THROUGH the bottle — catches product mix-ups too",
          "RFID label rolls prevent wrong labels from even being loaded",
          "Electronic line clearance eliminates checkbox falsification",
          "Dedicated lines for narrow-therapeutic-index drugs eliminate changeover risk",
          "LASA matrix is proactive risk management for look-alike/sound-alike drugs",
          "Near-miss reporting catches problems before patients are harmed",
          "Mock recalls test your ability to respond when it matters",
        ],
        idealKeywords: [
          "serialization",
          "aggregation",
          "AI vision",
          "OCR",
          "RFID",
          "electronic line clearance",
          "barcode verification",
          "dedicated lines",
          "narrow therapeutic index",
          "LASA matrix",
          "near-miss reporting",
          "mock recall",
          "multi-layered",
          "no-blame",
          "leading indicator",
        ],
        bannedPhrases: [
          "paper checklists are fine",
          "serialization is too expensive",
          "basic vision is adequate",
          "dedicated lines waste capacity",
          "near-misses aren't worth tracking",
          "LASA analysis is overkill",
          "we don't need mock recalls",
        ],
        scoring: {
          "Preventive Thinking": 25,
          "GMP Awareness": 10,
          "Compliance Understanding": 10,
        },
      },
    ],
    evaluationRules: [
      {
        skill: "Patient Safety",
        keywords: [
          "patient",
          "INR",
          "vitamin K",
          "haemorrhage",
          "bleeding",
          "Warfarin",
          "medical emergency",
          "recall",
          "Class I",
          "DHCP",
          "adverse event",
        ],
        weight: 25,
      },
      {
        skill: "GMP Awareness",
        keywords: [
          "GMP",
          "line clearance",
          "label reconciliation",
          "changeover",
          "vision system",
          "serialization",
          "batch record",
          "deviation",
          "packaging",
        ],
        weight: 20,
      },
      {
        skill: "Analytical Thinking",
        keywords: [
          "three barriers",
          "Swiss Cheese",
          "cascade",
          "root cause",
          "systemic",
          "bypass",
          "interlock",
          "magazine",
          "feeder",
          "residual",
        ],
        weight: 20,
      },
      {
        skill: "Preventive Thinking",
        keywords: [
          "serialization",
          "AI vision",
          "RFID",
          "electronic clearance",
          "dedicated lines",
          "LASA",
          "near-miss",
          "mock recall",
          "multi-layered",
          "interlock",
        ],
        weight: 20,
      },
      {
        skill: "Compliance Understanding",
        keywords: [
          "CDSCO",
          "regulatory",
          "recall",
          "ICSR",
          "adverse event",
          "Class I",
          "DHCP letter",
          "documentation",
          "serialization mandate",
        ],
        weight: 15,
      },
    ],
    complianceRules: {
      hardBanned: [
        "it's the pharmacist's fault",
        "the patient should have noticed",
        "one bottle isn't serious",
        "we don't need to recall both batches",
        "15 labels were probably just miscounted",
        "label mix-ups are unavoidable",
        "the vision system bypass wasn't a big deal",
        "Warfarin at 5mg for 5 days isn't dangerous",
        "let's wait for more patient reports",
      ],
      violationPenalty: 50,
      violationMessage:
        "CRITICAL GMP VIOLATION: A label mix-up between Warfarin (anticoagulant) and Lisinopril (antihypertensive) is potentially FATAL. Minimizing the severity, delaying recall, blaming healthcare providers, or failing to implement robust preventive controls violates 21 CFR Part 211.125 (labeling), Schedule M of D&C Act, and the fundamental duty to patient safety. This can result in facility shutdown, criminal prosecution, and loss of manufacturing license.",
    },
  },
];
