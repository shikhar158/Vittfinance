# 🪙 VITT — Adaptive Personal Finance & Asset Allocation Engine

Vitt is an intelligent, premium personal finance advisor and asset allocation system tailored specifically for Indian demography and regional segments (Urban, Semi-Urban, and Rural). 

By analyzing user lifestyle contexts, financial inputs, and localized variables, Vitt dynamically calculates a financial **Confidence Score**, determines a **Risk Band (1–10)**, generates **Tailored Asset Allocations**, and outputs branded, high-fidelity **PDF Reports** for complete investment planning.

---

## 🌟 Key Features

*   **🗺️ Lifestyle-Context Segmentation:** Onboarding wizard adapting questions and thresholds to match Urban, Semi-Urban, and Rural demographics.
*   **📊 Dynamic Scoring & Risk Profiling:** Custom scoring engine assessing user financial stability and confidence metrics mapped on an adaptive scale.
*   **🪙 Multi-Bucket Asset Allocation:** Custom weights calculation across major Indian asset buckets:
    *   *Emergency Reserve Buffer* (Targets standard month-based expense buffers in high-liquidity instruments)
    *   *Debt & Stability*
    *   *Equities Growth*
    *   *Gold / Hedging*
    *   *Alternative Options*
*   **🧠 Intelligence Board / Feed:** Aggregated real-time financial market benchmarks, commodity indexes, and news updates.
*   **📥 Branded PDF Report Generator:** On-demand report exporter generating customized financial summaries, scores, itemized weights tables, and visual representation bars cleanly.
*   **🎨 Premium Classic Glassmorphic UI:** Clean, responsive light blue aesthetic focusing on soft visual indicators, smooth animations, and zero-clutter designs.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Core** | React 18, TypeScript, Vite |
| **State Management** | Zustand (with persistent local storage integration) |
| **Styling & Theme** | Vanilla CSS, TailwindCSS (for utility layout), Glassmorphism variables |
| **Database** | MongoDB Atlas (using Mongoose schemas) |
| **Backend / API** | Node.js, Express (Serverless deployment-ready on Vercel) |
| **Document Export** | `jsPDF`, `jspdf-autotable` (Base64 data-URI encoded streaming) |

---

## 📂 Project Architecture

```
Vitt/
├── 📁 api/                   # Serverless Functions (Backend Endpoints)
│   ├── 📁 auth/              # Authentication routes (Login, Register)
│   ├── market.ts             # Live RSS News and Index feed handlers
│   ├── portfolio.ts          # Portfolio retrieval and investment scores submission
│   └── response.ts           # Questionnaire answer evaluation endpoint
├── 📁 lib/                   # Shared Server Core Logic
│   ├── 📁 db/                # Mongoose Database Connection & Models
│   │   ├── connect.ts        # MongoDB Atlas connection manager
│   │   └── 📁 models/        # Schemas (User, Portfolio, Response)
│   └── 📁 engine/            # Financial Algorithms
│       ├── allocation.ts     # Allocation bucket weights calculation rules
│       └── scoring.ts        # Confidence score and Risk Band evaluation logic
├── 📁 public/                # Static assets
├── 📁 src/                   # React Frontend Codebase
│   ├── 📁 assets/            # Brand imagery
│   ├── 📁 components/        # Shared UI components (Button, Cards)
│   ├── 📁 data/              # Segmented Questionnaire definitions
│   ├── 📁 pages/             # Route Views
│   │   ├── 📁 Auth/          # Login & Register views
│   │   ├── 📁 Onboarding/    # Segment & Questionnaire flows
│   │   ├── Dashboard.tsx     # Blueprint and asset breakdown board
│   │   ├── Home.tsx          # Landing page
│   │   ├── Invest.tsx        # Budget allocation calculator & PDF downloader
│   │   └── Market.tsx        # News feed & benchmark indexes
│   ├── 📁 services/          # API Client integration (Axios instance)
│   ├── 📁 store/             # Global Store (Zustand auth & question state)
│   ├── 📁 types/             # TypeScript interfaces
│   └── 📁 utils/             # Helper tools (PDF generator engine)
├── eslint.config.js          # Code quality setup
├── tailwind.config.js        # Design framework configuration
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Cloud Vercel routing configuration
```

---

## ⚙️ Core Engines Explained

### 1. Adaptive Segmentation & Onboarding Engine
*   **Location:** [Segment.tsx](file:///d:/Coding/Vitt/src/pages/Onboarding/Segment.tsx) & [Questionnaire.tsx](file:///d:/Coding/Vitt/src/pages/Onboarding/Questionnaire.tsx)
*   **Role:** Identifies the user's economic environment (`urban`, `semi_urban`, `rural`).
*   **Workflow:** Gathers tailored financial data points (income, monthly expense, stability metrics, debt load). If the user registers without starting, the system prompts them upon dashboard login.

### 2. Scoring & Risk-Band Engine
*   **Location:** [scoring.ts](file:///d:/Coding/Vitt/lib/engine/scoring.ts)
*   **Role:** Analyzes user variables to yield a final **Confidence Score (0-100)** and **Risk Band (1-10)**.
*   **Workflow:** Evaluates age, dependency count, debt-to-income ratios, and emergency fund indicators to position the user on a spectrum from Conservative to Aggressive.

### 3. Asset Allocation Engine
*   **Location:** [allocation.ts](file:///d:/Coding/Vitt/lib/engine/allocation.ts)
*   **Role:** Calculates customized asset distribution percentages.
*   **Workflow:** Gages risk levels to distribute budget percentages into high-yield equities, debt, gold, alternative options, and auto-calculates an Emergency Reserve target (e.g. 6 months of expenses).

### 4. High-Fidelity PDF Report Generator
*   **Location:** [generateReport.ts](file:///d:/Coding/Vitt/src/utils/generateReport.ts)
*   **Role:** Exports a professional investment statement PDF.
*   **Workflow:** Uses `jsPDF` canvas rendering. Draws structured summary cards, allocation data sheets, colored distribution progress indicators, and custom disclaimers. Avoids encoding issues by standardizing on `Rs.` currency symbols.

