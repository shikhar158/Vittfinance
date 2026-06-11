import { Answer, DimensionScore, Dimension } from '../../src/types'

export const DIMENSION_WEIGHTS: Record<string, number> = {
  age_risk_profile: 0.15,
  income_stability: 0.12,
  savings_portfolio: 0.12,
  property_quotient: 0.10,
  credit_history: 0.10,
  financial_goal_clarity: 0.08,
  behavioral_consistency: 0.12,
  insurance_coverage: 0.11,
  digital_financial_literacy: 0.10
}

/**
 * Scale Q8 checklist points to 1-4 standard scale
 */
export function scaleChecklistScore(totalPoints: number): number {
  if (totalPoints === 0) return 1
  if (totalPoints <= 2) return 2
  if (totalPoints <= 5) return 3
  return 4
}

/**
 * Get Confidence Multiplier based on checklist count
 */
export function getConfidenceMultiplier(checklistCount: number): number {
  if (checklistCount === 0) return 0.85
  if (checklistCount <= 2) return 0.90
  if (checklistCount <= 4) return 0.95
  return 1.00
}

/**
 * calculate dimension scores
 */
export function calculateDimensionScores(answers: Answer[]): DimensionScore[] {
  const grouped: Record<string, { sum: number, count: number, questions: string[] }> = {}

  answers.forEach(ans => {
    if (!grouped[ans.dimension]) {
      grouped[ans.dimension] = { sum: 0, count: 0, questions: [] as string[] }
    }
    grouped[ans.dimension].questions.push(ans.questionId)
    
    if (ans.isChecklist) {
      grouped[ans.dimension].sum += scaleChecklistScore(ans.checklistScore || 0)
    } else {
      grouped[ans.dimension].sum += ans.rawScore
    }
    grouped[ans.dimension].count += 1
  })

  return Object.entries(grouped).map(([dimension, data]) => {
    const averageScore = data.sum / data.count
    const weight = DIMENSION_WEIGHTS[dimension as keyof typeof DIMENSION_WEIGHTS] || 0
    return {
      dimension: dimension as Dimension,
      questions: data.questions,
      averageScore,
      subScore: averageScore, // average serves as subScore
      weight,
      weightedContribution: averageScore * weight
    }
  })
}

/**
 * Find raw total score sum
 */
export function calculateRawScore(dimensionScores: DimensionScore[]): number {
  return dimensionScores.reduce((acc, score) => acc + score.weightedContribution, 0)
}

/**
 * Get profile band and name
 */
export function getProfileBand(score: number): { band: number, profileName: string } {
  const band = Math.min(Math.max(Math.ceil(score / 10), 1), 10)
  
  let profileName = 'Moderate'
  if (band <= 2) profileName = 'Conservative'
  else if (band <= 4) profileName = 'Moderate Conservative'
  else if (band <= 6) profileName = 'Balanced'
  else if (band <= 8) profileName = 'Growth'
  else profileName = 'Aggressive'
  
  return { band, profileName }
}
