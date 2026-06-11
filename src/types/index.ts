// ─── Segment ──────────────────────────────────────────────────────────────────
export type Segment = 'urban' | 'semi_urban' | 'rural'

// ─── Dimensions ───────────────────────────────────────────────────────────────
export type Dimension =
  | 'age_risk_profile'
  | 'income_stability'
  | 'savings_portfolio'
  | 'property_quotient'
  | 'credit_history'
  | 'financial_goal_clarity'
  | 'behavioral_consistency'
  | 'insurance_coverage'
  | 'digital_financial_literacy'
  | 'agent_feedback'

// ─── Question Types ───────────────────────────────────────────────────────────
export type QuestionType = 'single' | 'checklist'

export interface QuestionOption {
  text: string
  score: number        // 1 to 4
}

export interface ChecklistItem {
  id: string           // unique key e.g. "bank_fd", "gold_jewellery"
  label: string        // display text
  points: number       // asset points for score computation
}

export interface Question {
  id: string           // "Q1" to "Q20"
  dimension: Dimension
  type: QuestionType
  text: string
  subtext?: string     // optional helper text shown below question
  options?: QuestionOption[]       // for single-select questions
  checklistItems?: ChecklistItem[] // for Q8 checklist only
}

// ─── Answers ──────────────────────────────────────────────────────────────────
export interface Answer {
  questionId: string
  dimension: Dimension
  answerIndex: number         // 0-based index of selected option
  rawScore: number            // 1 to 4
  isChecklist: boolean
  checklistSelections?: string[]   // item IDs selected in checklist
  checklistScore?: number          // computed from points
}

// ─── Scoring ──────────────────────────────────────────────────────────────────
export interface DimensionScore {
  dimension: Dimension
  questions: string[]
  averageScore: number
  subScore: number             // (avg - 1) / 3 → 0 to 1
  weight: number               // from DIMENSION_WEIGHTS
  weightedContribution: number // subScore × weight
}

export interface ScoreResult {
  dimensionScores: DimensionScore[]
  rawScore: number                  // 0 to 1
  normalizedRawScore: number        // 0.1 to 10
  dataConfidenceMultiplier: number  // 0.1 to 1.0
  finalConfidenceScore: number      // 0.1 to 10 (one decimal)
  band: number                      // 1 to 10
  profileName: string
}

// ─── Allocation ───────────────────────────────────────────────────────────────
export type BucketKey = 'B2' | 'B3' | 'B4' | 'B5'

export interface BucketAllocation {
  key: BucketKey
  label: string
  fullName: string
  percentage: number
  color: string            // TailwindCSS color class
  assets: string[]         // list of recommended instruments
  description: string
  riskLevel: string
}

export interface EmergencyReserve {
  targetMonths: number
  estimatedMonthlyExpense: number
  targetAmount: number
  allocationCapPercent: number
  recommendedInstrument: string
  currentAmount: number    // starts at 0
}

export interface AllocationResult {
  finalConfidenceScore: number
  band: number
  profileName: string
  segment: Segment
  emergencyReserve: EmergencyReserve
  buckets: BucketAllocation[]
  baselineAllocation: Record<BucketKey, number>
}

// ─── API Request / Response Types ─────────────────────────────────────────────
export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
  pincode: string
  segment: Segment
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    segment: Segment
  }
}

export interface SubmitQuestionnaireRequest {
  answers: Answer[]
  segment: Segment
}

export interface SubmitQuestionnaireResponse {
  responseId: string
  message: string
}

export interface ComputeScoreRequest {
  responseId: string
}

export interface GenerateAllocationRequest {
  responseId: string
}

// ─── Store Types ──────────────────────────────────────────────────────────────
export interface VittStore {
  // Auth
  token: string | null
  user: AuthResponse['user'] | null
  setAuth: (token: string, user: AuthResponse['user']) => void
  clearAuth: () => void

  // Questionnaire
  segment: Segment | null
  currentQuestionIndex: number
  answers: Answer[]
  setSegment: (segment: Segment) => void
  addAnswer: (answer: Answer) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  resetQuestionnaire: () => void

  // Results
  scoreResult: ScoreResult | null
  allocationResult: AllocationResult | null
  setScoreResult: (result: ScoreResult) => void
  setAllocationResult: (result: AllocationResult) => void
}
