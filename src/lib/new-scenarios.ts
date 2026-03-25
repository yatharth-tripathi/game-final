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
];
