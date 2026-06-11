import type { Question, Segment } from '../types'

export const QUESTIONS: Record<Segment, Question[]> = {
  urban: [
    {
      id: "Q1",
      dimension: "age_risk_profile",
      type: "single",
      text: "What best describes your current life stage and age group?",
      options: [
        { text: "I am under 25 and just starting out", score: 2 },
        { text: "I am between 26 and 35, building my career", score: 4 },
        { text: "I am between 36 and 50, in my prime earning years", score: 3 },
        { text: "I am between 51 and 60, thinking about the future", score: 2 },
        { text: "I am above 60 and focused on stability", score: 1 }
      ]
    },
    {
      id: "Q2",
      dimension: "age_risk_profile",
      type: "single",
      text: "How many people are financially dependent on your income?",
      options: [
        { text: "No dependents / Sirf main", score: 4 },
        { text: "1 to 2 people", score: 3 },
        { text: "3 to 5 people", score: 2 },
        { text: "More than 5 / 5 se zyada", score: 1 }
      ]
    },
    {
      id: "Q3",
      dimension: "income_stability",
      type: "single",
      text: "What best describes how you earn your primary income?",
      options: [
        { text: "Government job / Sarkari naukri", score: 4 },
        { text: "Private salaried / factory", score: 3 },
        { text: "Own business / Apni dukan", score: 2 },
        { text: "Daily wage / farming / Kheti majdoori", score: 1 }
      ]
    },
    {
      id: "Q4",
      dimension: "income_stability",
      type: "single",
      text: "How consistent and predictable is your income month to month?",
      options: [
        { text: "Varies significantly / bahut upar-neeche", score: 1 },
        { text: "Seasonal / season par depend", score: 2 },
        { text: "Mostly fixed with small changes", score: 3 },
        { text: "Completely fixed same every month / bilkul fix", score: 4 }
      ]
    },
    {
      id: "Q5",
      dimension: "income_stability",
      type: "single",
      text: "How long have you been earning from your current primary source?",
      options: [
        { text: "Less than 1 year", score: 1 },
        { text: "1 to 3 years", score: 2 },
        { text: "3 to 5 years", score: 3 },
        { text: "More than 5 years / 5 saal se zyada", score: 4 }
      ]
    },
    {
      id: "Q6",
      dimension: "savings_portfolio",
      type: "single",
      text: "After paying all monthly bills, how much do you typically save each month?",
      options: [
        { text: "I am unable to save anything; my expenses take everything", score: 1 },
        { text: "I save a little, but less than ₹5,000 per month", score: 2 },
        { text: "I consistently set aside between ₹5,000 and ₹20,000 each month", score: 3 },
        { text: "I save more than ₹20,000 every month without much difficulty", score: 4 }
      ]
    },
    {
      id: "Q7",
      dimension: "savings_portfolio",
      type: "single",
      text: "How regularly do you save — is it a disciplined habit?",
      options: [
        { text: "I rarely save; it depends on what is left at month end", score: 1 },
        { text: "I save when I happen to have a surplus but it is not regular", score: 2 },
        { text: "I save most months but occasionally miss when expenses are high", score: 3 },
        { text: "I save a fixed amount every single month without fail", score: 4 }
      ]
    },
    {
      id: "Q8",
      dimension: "savings_portfolio",
      type: "checklist",
      text: "Which of the following do you currently hold? Select all that apply",
      checklistItems: [
        { id: "bank_fd_rd", label: "Bank FD or Recurring Deposit", points: 1 },
        { id: "ppf_epf_nps", label: "PPF, EPF, or NPS", points: 2 },
        { id: "lic_insurance", label: "LIC or Life Insurance policy", points: 1 },
        { id: "health_insurance", label: "Health Insurance", points: 2 },
        { id: "mutual_fund_sip", label: "Mutual Fund or SIP", points: 2 },
        { id: "direct_stocks", label: "Direct Stocks or Equity", points: 3 },
        { id: "gold", label: "Gold (physical or ETF)", points: 1 },
        { id: "real_estate", label: "Real Estate beyond primary home", points: 3 },
        { id: "none", label: "None of these", points: 0 }
      ]
    },
    {
      id: "Q9",
      dimension: "property_quotient",
      type: "single",
      text: "What best describes your current housing situation?",
      options: [
        { text: "I live in a rented home and have no property of my own", score: 1 },
        { text: "I live in a family-owned home but it is not in my name", score: 2 },
        { text: "I own my home but am still repaying a home loan", score: 3 },
        { text: "I own my home outright with no loan remaining", score: 4 }
      ]
    },
    {
      id: "Q10",
      dimension: "property_quotient",
      type: "single",
      text: "Do you own any assets beyond your primary residence?",
      options: [
        { text: "No, I do not own anything beyond where I currently live", score: 1 },
        { text: "I own a small plot of land but nothing developed", score: 2 },
        { text: "I own an additional residential or commercial property", score: 3 },
        { text: "I own multiple properties or significant real estate assets", score: 4 }
      ]
    },
    {
      id: "Q11",
      dimension: "credit_history",
      type: "single",
      text: "Do you currently have any active loans or credit obligations?",
      options: [
        { text: "No, I have no loans or outstanding debt at this time", score: 4 },
        { text: "I have one small loan — personal, vehicle, or education", score: 3 },
        { text: "I have a home loan or one significant ongoing loan", score: 2 },
        { text: "I have multiple loans running simultaneously", score: 1 }
      ]
    },
    {
      id: "Q12",
      dimension: "credit_history",
      type: "single",
      text: "What portion of your monthly income goes toward loan EMIs?",
      options: [
        { text: "I have no loans so this does not apply to me", score: 4 },
        { text: "Less than 20% of my income goes to EMIs and I always pay on time", score: 3 },
        { text: "Between 20% and 40% goes to EMIs and I mostly pay on time", score: 2 },
        { text: "More than 40% of my income goes to EMIs or I have had delays", score: 1 }
      ]
    },
    {
      id: "Q13",
      dimension: "financial_goal_clarity",
      type: "single",
      text: "What is the single most important reason you want to invest right now?",
      options: [
        { text: "I want to build a retirement corpus so I don't have to depend on anyone", score: 3 },
        { text: "I am saving for my child's education or higher studies", score: 4 },
        { text: "I want to buy a home or upgrade my current living situation", score: 3 },
        { text: "I want to grow my wealth and create long-term financial independence", score: 2 }
      ]
    },
    {
      id: "Q14",
      dimension: "financial_goal_clarity",
      type: "single",
      text: "Roughly how many years from now do you expect to need this invested money?",
      options: [
        { text: "Within 1 to 2 years — I have a short-term goal coming up soon", score: 1 },
        { text: "In 3 to 5 years — a medium-term goal I am working toward", score: 2 },
        { text: "In 5 to 10 years — I am planning well ahead", score: 3 },
        { text: "More than 10 years away — this is a long-term commitment", score: 4 }
      ]
    },
    {
      id: "Q15",
      dimension: "behavioral_consistency",
      type: "single",
      text: "Have you ever withdrawn from investments or broken an FD before maturity?",
      options: [
        { text: "Yes, I frequently withdraw early whenever I need funds for any reason", score: 1 },
        { text: "I have broken or withdrawn early once or twice in the past", score: 2 },
        { text: "I withdrew early only during a genuine emergency like a medical crisis", score: 3 },
        { text: "No, I have always kept my investments until their planned maturity", score: 4 }
      ]
    },
    {
      id: "Q16",
      dimension: "behavioral_consistency",
      type: "single",
      text: "If your investment dropped 15-20% in value over a few months, what would you do?",
      options: [
        { text: "I would withdraw my money immediately to avoid further loss", score: 1 },
        { text: "I would wait nervously and watch before making a decision", score: 2 },
        { text: "I would stay calm, trust the process, and remain invested", score: 3 },
        { text: "I would actually invest more, seeing it as an opportunity", score: 4 }
      ]
    },
    {
      id: "Q17",
      dimension: "insurance_coverage",
      type: "single",
      text: "How well is your family protected by health insurance against a major medical emergency?",
      options: [
        { text: "We have no health insurance and would rely on savings or borrowing", score: 1 },
        { text: "I have basic health coverage but it may not be enough for a serious illness", score: 2 },
        { text: "I have a family floater health policy that covers hospitalisation adequately", score: 3 },
        { text: "I have comprehensive health insurance with a high sum assured", score: 4 }
      ]
    },
    {
      id: "Q18",
      dimension: "insurance_coverage",
      type: "single",
      text: "If something were to happen to you unexpectedly, how financially protected is your family?",
      options: [
        { text: "My family has no life insurance and would struggle financially", score: 1 },
        { text: "I have only an LIC endowment or investment-linked policy, no pure term cover", score: 2 },
        { text: "I have a term insurance plan that provides basic coverage for my family", score: 3 },
        { text: "I have adequate term insurance of at least 10 times my annual income", score: 4 }
      ]
    },
    {
      id: "Q19",
      dimension: "digital_financial_literacy",
      type: "single",
      text: "Which of these financial instruments have you personally used or invested in before?",
      options: [
        { text: "None — this is my first time exploring any kind of investment", score: 1 },
        { text: "Only traditional options like FD, RD, or post office savings", score: 2 },
        { text: "Mutual funds or SIP, either through an app or an advisor", score: 3 },
        { text: "Direct stocks, equity mutual funds, or other market-linked products", score: 4 }
      ]
    },
    {
      id: "Q20",
      dimension: "digital_financial_literacy",
      type: "single",
      text: "How would you best describe your understanding of market-linked investments?",
      options: [
        { text: "I do not understand how they work and am not comfortable with money going up and down", score: 1 },
        { text: "I know they exist and have heard about them but do not fully understand", score: 2 },
        { text: "I have a reasonable understanding and am comfortable with some risk", score: 3 },
        { text: "I follow markets regularly, understand risk and return well, and make informed decisions", score: 4 }
      ]
    }
  ],
  semi_urban: [
    {
      id: "Q1",
      dimension: "age_risk_profile",
      type: "single",
      text: "What best describes your current life stage and age group?",
      options: [
        { text: "I am below 25 years old", score: 2 },
        { text: "I am between 25 and 35 years", score: 4 },
        { text: "I am between 35 and 50 years", score: 3 },
        { text: "I am above 50 years old", score: 1 }
      ]
    },
    {
      id: "Q2",
      dimension: "age_risk_profile",
      type: "single",
      text: "How many people in your family depend on your earnings?",
      options: [
        { text: "No dependents", score: 4 },
        { text: "1 to 2 people", score: 3 },
        { text: "3 to 5 people", score: 2 },
        { text: "More than 5", score: 1 }
      ]
    },
    {
      id: "Q3",
      dimension: "income_stability",
      type: "single",
      text: "How do you mainly earn money for your family?",
      options: [
        { text: "Government job", score: 4 },
        { text: "Private salaried / factory", score: 3 },
        { text: "Own business / Apni dukan", score: 2 },
        { text: "Daily wage / farming", score: 1 }
      ]
    },
    {
      id: "Q4",
      dimension: "income_stability",
      type: "single",
      text: "Does your income stay roughly the same each month, or does it change?",
      options: [
        { text: "Varies significantly", score: 1 },
        { text: "Seasonal / depends on season", score: 2 },
        { text: "Mostly fixed with small changes", score: 3 },
        { text: "Completely fixed same every month", score: 4 }
      ]
    },
    {
      id: "Q5",
      dimension: "income_stability",
      type: "single",
      text: "For how many years have you been doing your current work?",
      options: [
        { text: "Less than 1 year", score: 1 },
        { text: "1 to 3 years", score: 2 },
        { text: "3 to 5 years", score: 3 },
        { text: "More than 5 years", score: 4 }
      ]
    },
    {
      id: "Q6",
      dimension: "savings_portfolio",
      type: "single",
      text: "After paying for household needs, how much can you put aside each month?",
      options: [
        { text: "Nothing is left after expenses; I cannot save right now", score: 1 },
        { text: "I save a small amount, less than ₹2,000 each month", score: 2 },
        { text: "I manage to save between ₹2,000 and ₹8,000 most months", score: 3 },
        { text: "I regularly save more than ₹8,000 every month", score: 4 }
      ]
    },
    {
      id: "Q7",
      dimension: "savings_portfolio",
      type: "single",
      text: "Do you save money regularly every month or only when there is extra?",
      options: [
        { text: "I almost never save — there is usually nothing left", score: 1 },
        { text: "I save only when extra money happens to be left", score: 2 },
        { text: "I try to save most months, though I miss occasionally", score: 3 },
        { text: "I put aside a fixed amount at the beginning of every month", score: 4 }
      ]
    },
    {
      id: "Q8",
      dimension: "savings_portfolio",
      type: "checklist",
      text: "Which of these do you currently have? Tick all that apply",
      checklistItems: [
        { id: "bank_fd_rd", label: "Bank FD or Recurring Deposit", points: 1 },
        { id: "post_office", label: "Post Office Savings or RD", points: 1 },
        { id: "lic_policy", label: "LIC or Life Insurance Policy", points: 1 },
        { id: "pf", label: "Provident Fund through employer", points: 2 },
        { id: "mutual_fund_sip", label: "Mutual Fund or SIP", points: 2 },
        { id: "gold_jewellery", label: "Gold Jewellery kept for the future", points: 1 },
        { id: "own_property", label: "Own house or land", points: 2 },
        { id: "health_insurance", label: "Health Insurance", points: 2 },
        { id: "none", label: "None of these", points: 0 }
      ]
    },
    {
      id: "Q9",
      dimension: "property_quotient",
      type: "single",
      text: "Where do you currently live and do you own the place?",
      options: [
        { text: "I live in a rented house and own no property", score: 1 },
        { text: "I live in my family's house but it is not mine", score: 2 },
        { text: "I have my own house but am still paying a loan for it", score: 3 },
        { text: "I own my house fully with no loan on it", score: 4 }
      ]
    },
    {
      id: "Q10",
      dimension: "property_quotient",
      type: "single",
      text: "Apart from the home you live in, do you own any land or extra property?",
      options: [
        { text: "No, I don't own anything extra", score: 1 },
        { text: "I have a small plot of land that is undeveloped", score: 2 },
        { text: "I own another house, a shop, or some agricultural land", score: 3 },
        { text: "I own multiple extra properties or a significant piece of land", score: 4 }
      ]
    },
    {
      id: "Q11",
      dimension: "credit_history",
      type: "single",
      text: "Do you have any loans you are currently repaying?",
      options: [
        { text: "No, I have no loans or debts right now", score: 4 },
        { text: "I have a small loan from a bank or NBFC", score: 3 },
        { text: "I have borrowed from a moneylender or informal source", score: 2 },
        { text: "I have multiple loans from bank, microfinance, or SHG", score: 1 }
      ]
    },
    {
      id: "Q12",
      dimension: "credit_history",
      type: "single",
      text: "How much of your monthly income goes toward repaying loans?",
      options: [
        { text: "I have no loans, so nothing goes toward repayment", score: 4 },
        { text: "A small portion under 20% goes to loans and I always pay on time", score: 3 },
        { text: "Between 20% and 40% goes to loans and I usually manage on time", score: 2 },
        { text: "More than 40% goes to repayment or I have sometimes been late", score: 1 }
      ]
    },
    {
      id: "Q13",
      dimension: "financial_goal_clarity",
      type: "single",
      text: "What is the main thing you are saving or investing for right now?",
      options: [
        { text: "My old age — I want to be comfortable when I stop working", score: 3 },
        { text: "My child's education, higher studies, or their wedding", score: 4 },
        { text: "Buying or building my own house", score: 3 },
        { text: "Growing my money so my family has a better future", score: 2 }
      ]
    },
    {
      id: "Q14",
      dimension: "financial_goal_clarity",
      type: "single",
      text: "After many years do you think you will need to use this money?",
      options: [
        { text: "Within the next 1 to 2 years", score: 1 },
        { text: "In about 3 to 5 years from now", score: 2 },
        { text: "In 5 to 10 years' time", score: 3 },
        { text: "More than 10 years from now", score: 4 }
      ]
    },
    {
      id: "Q15",
      dimension: "behavioral_consistency",
      type: "single",
      text: "Have you ever taken money out of your savings before it was supposed to end?",
      options: [
        { text: "Yes, I often take money out early when I need it", score: 1 },
        { text: "I have done it once or twice before", score: 2 },
        { text: "I only did it once during a real emergency", score: 3 },
        { text: "No, I have never touched savings before the right time", score: 4 }
      ]
    },
    {
      id: "Q16",
      dimension: "behavioral_consistency",
      type: "single",
      text: "If money you invested became ₹80 instead of ₹100 for a few months, what would you do?",
      options: [
        { text: "I would take all my money back immediately before it falls more", score: 1 },
        { text: "I would wait anxiously and see what happens before deciding", score: 2 },
        { text: "I would stay patient knowing it may recover over time", score: 3 },
        { text: "I would add more money since this feels like a good time to invest", score: 4 }
      ]
    },
    {
      id: "Q17",
      dimension: "insurance_coverage",
      type: "single",
      text: "If someone in your family had a serious illness tomorrow, how would you manage the cost?",
      options: [
        { text: "We have no insurance — we would borrow money or sell something", score: 1 },
        { text: "I have some government scheme coverage like Ayushman Bharat but nothing extra", score: 2 },
        { text: "I have a basic health insurance policy that partially helps", score: 3 },
        { text: "I have a proper health insurance policy that would cover the full cost", score: 4 }
      ]
    },
    {
      id: "Q18",
      dimension: "insurance_coverage",
      type: "single",
      text: "If you were no longer able to earn, do you have life insurance to help your family?",
      options: [
        { text: "No, my family would have no financial protection", score: 1 },
        { text: "I have only a small LIC policy that gives back money at maturity", score: 2 },
        { text: "I have a basic life insurance policy that would give some support", score: 3 },
        { text: "I have a proper term or life insurance that would support my family well", score: 4 }
      ]
    },
    {
      id: "Q19",
      dimension: "digital_financial_literacy",
      type: "single",
      text: "Have you ever saved or invested money anywhere besides a regular bank savings account?",
      options: [
        { text: "No, this is the first time I am thinking about it", score: 1 },
        { text: "I have used FD, post office, or LIC before", score: 2 },
        { text: "I have a mutual fund or SIP running", score: 3 },
        { text: "I have invested in shares or other market products", score: 4 }
      ]
    },
    {
      id: "Q20",
      dimension: "digital_financial_literacy",
      type: "single",
      text: "Do you understand that money in mutual funds or shares can sometimes go down before going up?",
      options: [
        { text: "No, I did not know this — I thought savings always grow safely", score: 1 },
        { text: "I have heard this but I am not very comfortable with the idea", score: 2 },
        { text: "I understand it and I am okay if it goes down a little as long as it grows over time", score: 3 },
        { text: "Yes, I understand this well and I am comfortable with market ups and downs", score: 4 }
      ]
    }
  ],
  rural: [
    {
      id: "Q1",
      dimension: "age_risk_profile",
      type: "single",
      text: "Aapki umar ka kaunsa padaav hai?",
      options: [
        { text: "Main 25 saal se kam ka hoon, abhi shuruat hai", score: 2 },
        { text: "Main 25 se 35 ke beech hoon, kaam kar raha hoon", score: 4 },
        { text: "Main 35 se 50 ke beech hoon, parivar chal raha hai", score: 3 },
        { text: "Main 50 saal se upar hoon, aaraam ki soch raha hoon", score: 1 }
      ]
    },
    {
      id: "Q2",
      dimension: "age_risk_profile",
      type: "single",
      text: "Aapke ghar mein aapki kamai par kitne log nirbhar hain?",
      options: [
        { text: "No dependents / Sirf main", score: 4 },
        { text: "1 to 2 people", score: 3 },
        { text: "3 to 5 people", score: 2 },
        { text: "More than 5 / 5 se zyada", score: 1 }
      ]
    },
    {
      id: "Q3",
      dimension: "income_stability",
      type: "single",
      text: "Aapke ghar mein paisa kahan se aata hai?",
      options: [
        { text: "Government job / Sarkari naukri", score: 4 },
        { text: "Private salaried / factory", score: 3 },
        { text: "Own business / Apni dukan", score: 2 },
        { text: "Daily wage / farming / Kheti majdoori", score: 1 }
      ]
    },
    {
      id: "Q4",
      dimension: "income_stability",
      type: "single",
      text: "Aapki kamai har mahine ek jaisi rehti hai ya upar-neeche hoti hai?",
      options: [
        { text: "Varies significantly / bahut upar-neeche", score: 1 },
        { text: "Seasonal / season par depend", score: 2 },
        { text: "Mostly fixed with small changes", score: 3 },
        { text: "Completely fixed same every month / bilkul fix", score: 4 }
      ]
    },
    {
      id: "Q5",
      dimension: "income_stability",
      type: "single",
      text: "Aap yeh kaam kitne saalon se kar rahe hain?",
      options: [
        { text: "Less than 1 year", score: 1 },
        { text: "1 to 3 years", score: 2 },
        { text: "3 to 5 years", score: 3 },
        { text: "More than 5 years / 5 saal se zyada", score: 4 }
      ]
    },
    {
      id: "Q6",
      dimension: "savings_portfolio",
      type: "single",
      text: "Ghar ka kharcha nikalne ke baad, har mahine aap kitna paisa bacha paate hain?",
      options: [
        { text: "Kuch nahi bachta — sab kharcha ho jaata hai", score: 1 },
        { text: "Thoda bachta hai — ₹500 se kam", score: 2 },
        { text: "₹500 se ₹2,000 ke beech bach jaata hai", score: 3 },
        { text: "₹2,000 se zyada har mahine bachata hoon", score: 4 }
      ]
    },
    {
      id: "Q7",
      dimension: "savings_portfolio",
      type: "single",
      text: "Kya aap har mahine kuch bachate hain, ya sirf jab paisa bach jaaye tab?",
      options: [
        { text: "Lagbhag kabhi nahi bachta — sab nikal jaata hai", score: 1 },
        { text: "Sirf jab kuch bache tab bachata hoon", score: 2 },
        { text: "Zyaadatar mahine bachata hoon, kabhi kabhi nahi ho paata", score: 3 },
        { text: "Har mahine pehle se tay karke bachat karta hoon", score: 4 }
      ]
    },
    {
      id: "Q8",
      dimension: "savings_portfolio",
      type: "checklist",
      text: "Inme se aapke paas kya kya hai? Sab chuniye jo sahi ho",
      checklistItems: [
        { id: "bank_fd", label: "Bank mein FD ya RD", points: 1 },
        { id: "post_office", label: "Post office mein bachat", points: 1 },
        { id: "lic", label: "LIC ya koi bima policy", points: 1 },
        { id: "gold_jewellery", label: "Sona ya zevar jo bachat ke liye rakha hai", points: 2 },
        { id: "agri_land", label: "Zameen ya khet (Agricultural land)", points: 3 },
        { id: "livestock", label: "Gaay, bhains, bakri ya murgi (Livestock)", points: 2 },
        { id: "farm_equipment", label: "Tractor ya farm equipment", points: 2 },
        { id: "none", label: "Kuch nahi hai abhi", points: 0 }
      ]
    },
    {
      id: "Q9",
      dimension: "property_quotient",
      type: "single",
      text: "Aap kahan rehte hain aur kya woh ghar aapka apna hai?",
      options: [
        { text: "Kiraye ke makan mein rehta hoon, apna kuch nahi", score: 1 },
        { text: "Parivar ke ghar mein rehta hoon, mera apna nahi", score: 2 },
        { text: "Apna ghar hai par loan chal raha hai", score: 3 },
        { text: "Apna pukka ghar hai, koi loan nahi", score: 4 }
      ]
    },
    {
      id: "Q10",
      dimension: "property_quotient",
      type: "single",
      text: "Rehne ki jagah ke alawa, kya aapke paas khet, zameen, ya koi aur property hai?",
      options: [
        { text: "Nahi, rehne ke alawa kuch nahi", score: 1 },
        { text: "Thodi zameen hai par kaam ki nahi", score: 2 },
        { text: "Kheti ki zameen hai jahan fasal ugata hoon", score: 3 },
        { text: "Kaafi zameen aur sampatti hai — khet, makaan, ya dukan", score: 4 }
      ]
    },
    {
      id: "Q11",
      dimension: "credit_history",
      type: "single",
      text: "Kya aap abhi koi udhaar ya loan chuka rahe hain?",
      options: [
        { text: "Nahi, koi udhaar nahi hai abhi", score: 4 },
        { text: "Thoda udhaar hai — dost ya rishtedaar se liya tha", score: 3 },
        { text: "Sahukar ya aarthi se liya tha", score: 2 },
        { text: "Bank, SHG, ya microfinance se kai loans hain", score: 1 }
      ]
    },
    {
      id: "Q12",
      dimension: "credit_history",
      type: "single",
      text: "Aapki kamai ka kitna hissa loan ya udhaar chukane mein jaata hai?",
      options: [
        { text: "Koi loan nahi hai, toh kuch nahi jaata", score: 4 },
        { text: "Thoda jaata hai — 20% se kam, aur hamesha waqt par", score: 3 },
        { text: "20 se 40% ke beech, zyaadatar waqt par", score: 2 },
        { text: "Zyada jaata hai ya kabhi kabhi late ho jaata hai", score: 1 }
      ]
    },
    {
      id: "Q13",
      dimension: "financial_goal_clarity",
      type: "single",
      text: "Aap yeh paisa kyun bachana ya badhaana chahte hain?",
      options: [
        { text: "Budhape mein kisi par nirbhar na rehna pade", score: 3 },
        { text: "Bachche ki padhai ya unki shaadi ke liye", score: 4 },
        { text: "Apna pukka ghar banana ya khet khareedna", score: 3 },
        { text: "Parivar ka bhavishya surakshit karna", score: 2 }
      ]
    },
    {
      id: "Q14",
      dimension: "financial_goal_clarity",
      type: "single",
      text: "Yeh paisa aapko kitne saalon mein chahiye hoga?",
      options: [
        { text: "1 se 2 saal mein zaroorat padegi", score: 1 },
        { text: "3 se 5 saal mein chahiye hoga", score: 2 },
        { text: "5 se 10 saal baad chahiye hoga", score: 3 },
        { text: "10 saal से zyada baad", score: 4 }
      ]
    },
    {
      id: "Q15",
      dimension: "behavioral_consistency",
      type: "single",
      text: "Kya aapne kabhi apni bachat beech mein nikal li hai?",
      options: [
        { text: "Haan, aksar aisa karta hoon jab zaroorat ho", score: 1 },
        { text: "Ek ya do baar kiya hai pehle", score: 2 },
        { text: "Sirf ek baar, badi takleef mein kiya tha jaise bimari", score: 3 },
        { text: "Nahi, kabhi nahi — hamesha poora waqt rakhta hoon", score: 4 }
      ]
    },
    {
      id: "Q16",
      dimension: "behavioral_consistency",
      type: "single",
      text: "Agar aapne ₹100 lagaye aur 2-3 mahine baad wo ₹80 ho gaye toh aap kya karenge?",
      options: [
        { text: "Turant sab wapas le loonga — aur nahi ghataana", score: 1 },
        { text: "Ruk ke dekhta hoon — darr lagta hai par abhi nahi nikalta", score: 2 },
        { text: "Sabr rakhoonga — jaanta hoon waqt ke saath theek hoga", score: 3 },
        { text: "Aur paisa lagaoonga — sasta mil raha hai toh mauka hai", score: 4 }
      ]
    },
    {
      id: "Q17",
      dimension: "insurance_coverage",
      type: "single",
      text: "Agar ghar mein kisi ko achanak badi bimari ho jaaye toh aap kaise sambhalenge?",
      options: [
        { text: "Udhaar lena padega ya kuch bechna padega — koi bima nahi hai", score: 1 },
        { text: "Ayushman Bharat ya sarkar ki koi scheme se thodi madad milegi", score: 2 },
        { text: "Ek health insurance policy hai jo thodi madad karegi", score: 3 },
        { text: "Achha bima hai — hospital ka kharcha cover ho jaayega", score: 4 }
      ]
    },
    {
      id: "Q18",
      dimension: "insurance_coverage",
      type: "single",
      text: "Agar aap kamaane mein asaham ho jaate hain toh kya aapke parivar ke paas suraksha hai?",
      options: [
        { text: "Nahi — koi bima nahi, parivar ko bahut takleef hogi", score: 1 },
        { text: "Sirf ek choti LIC policy hai — zyada suraksha nahi", score: 2 },
        { text: "Jeevan bima hai jo parivar ko thoda sambhaal lega", score: 3 },
        { text: "Jeevan bima aur fasal bima dono hain — parivar surakshit hai", score: 4 }
      ]
    },
    {
      id: "Q19",
      dimension: "digital_financial_literacy",
      type: "single",
      text: "Kya aapne pehle kabhi apna paisa kisi jagah lagaya hai sirf bank account ke alawa?",
      options: [
        { text: "Nahi, pehli baar soch raha hoon", score: 1 },
        { text: "Haan — post office, FD, ya LIC mein paisa rakha hai", score: 2 },
        { text: "Haan — SHG mein bachat karta hoon ya Kisan Vikas Patra liya hai", score: 3 },
        { text: "Haan — mutual fund ya share market mein bhi lagaya hai", score: 4 }
      ]
    },
    {
      id: "Q20",
      dimension: "digital_financial_literacy",
      type: "single",
      text: "Kya aap jaante hain ki mutual fund ya shares mein lagaya paisa kabhi kam ho sakta hai?",
      options: [
        { text: "Nahi jaanta tha — mujhe laga bachat hamesha badhti hai", score: 1 },
        { text: "Suna hai par dil nahi maanta — darr lagta hai", score: 2 },
        { text: "Samajhta hoon — thoda ghate toh chalega agar baad mein badhta hai", score: 3 },
        { text: "Haan, achhe se samajhta hoon — market ke upar-neeche se ghabraan nahi hoti", score: 4 }
      ]
    }
  ]
}
