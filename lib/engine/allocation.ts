import { EmergencyReserve, BucketAllocation, BucketKey } from '../../src/types'

export const BASELINE_ALLOCATIONS: Record<number, { B2: number, B3: number, B4: number, B5: number }> = {
  1: { B2: 60, B3: 30, B4: 10, B5: 0 },
  2: { B2: 50, B3: 35, B4: 15, B5: 0 },
  3: { B2: 40, B3: 35, B4: 20, B5: 5 },
  4: { B2: 30, B3: 35, B4: 25, B5: 10 },
  5: { B2: 20, B3: 30, B4: 35, B5: 15 },
  6: { B2: 10, B3: 25, B4: 45, B5: 20 },
  7: { B2: 5, B3: 15, B4: 50, B5: 30 },
  8: { B2: 0, B3: 10, B4: 45, B5: 45 },
  9: { B2: 0, B3: 5, B4: 40, B5: 55 },
  10: { B2: 0, B3: 0, B4: 30, B5: 70 }
}

/**
 * calculate Emergency Reserve requirements
 */
export function calculateEmergencyReserve(band: number, monthlySavingsRange: string): EmergencyReserve {
  let targetMonths = 6
  if (band <= 4) targetMonths = 9
  else if (band >= 8) targetMonths = 3

  // Parse estimated expense from savings range option rough approximations
  let estimatedMonthlyExpense = 10000 
  if (monthlySavingsRange.includes('5,000') && monthlySavingsRange.includes('20,000')) {
    estimatedMonthlyExpense = 25000
  } else if (monthlySavingsRange.includes('20,000')) {
    estimatedMonthlyExpense = 50000
  }

  const targetAmount = estimatedMonthlyExpense * targetMonths

  return {
    targetMonths,
    estimatedMonthlyExpense,
    targetAmount,
    allocationCapPercent: 20,
    recommendedInstrument: "FD / Liquid Funds",
    currentAmount: 0
  }
}

/**
 * Get Bucket Weights distribution
 */
export function getBaselineAllocation(band: number): { B2: number, B3: number, B4: number, B5: number } {
  const boundedBand = Math.min(Math.max(Math.ceil(band), 1), 10)
  return BASELINE_ALLOCATIONS[boundedBand] || BASELINE_ALLOCATIONS[5]
}

const BUCKET_DETAILS = {
  B2: { label: "Safety / Suraksha", fullName: "Safety Buffer", color: "#FBBF24", riskLevel: "Low", assets: ["FD", "Liquid Funds", "Gold"], description: "Preserve capital against emergencies" },
  B3: { label: "Income / Kamai", fullName: "Regular Income", color: "#34D399", riskLevel: "Medium-Low", assets: ["Corporate Debt", "Bonds"], description: "Generate steady yields" },
  B4: { label: "Growth / Pragati", fullName: "Long-term Growth", color: "#60A5FA", riskLevel: "Medium-High", assets: ["Mutual Funds", "Index Funds"], description: "Grow wealth safely index maps" },
  B5: { label: "Aggressive / Tezi", fullName: "Dynamic Wealth", color: "#A78BFA", riskLevel: "High", assets: ["Direct Equity", "Smallcaps"], description: "Max yields targets high risk limits" }
}

/**
 * generate Buckets structures mapping weights continuous
 */
export function generateBuckets(band: number): BucketAllocation[] {
  const allocation = getBaselineAllocation(band)
  return Object.entries(allocation).map(([key, percentage]) => {
    const details = BUCKET_DETAILS[key as keyof typeof BUCKET_DETAILS]
    return {
      key: key as BucketKey,
      percentage,
      label: details.label,
      fullName: details.fullName,
      color: details.color,
      riskLevel: details.riskLevel,
      assets: details.assets,
      description: details.description
    }
  })
}
