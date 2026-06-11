import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../lib/db/connect'
import Response from '../lib/db/models/Response'
import Portfolio from '../lib/db/models/Portfolio'
import { calculateDimensionScores, calculateRawScore, getProfileBand, getConfidenceMultiplier } from '../lib/engine/scoring'
import { generateBuckets, calculateEmergencyReserve } from '../lib/engine/allocation'
import jwt from 'jsonwebtoken'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    await connectDB()
    
    // Auth Middleware verification
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

    const { answers, segment } = req.body
    if (!answers || !segment) {
      return res.status(400).json({ message: 'Missing answers or segment' })
    }

    // 1. Scoring Logic Aggregation
    const dimensionScores = calculateDimensionScores(answers)
    const rawScore = calculateRawScore(dimensionScores)
    const normalizedRawScore = (rawScore / 4) * 100

    const checklistAns = answers.find((a: any) => a.isChecklist)
    const checklistCount = checklistAns?.checklistSelections?.length || 0
    const multiplier = getConfidenceMultiplier(checklistCount)
    
    const finalConfidenceScore = normalizedRawScore * multiplier
    const { band, profileName } = getProfileBand(finalConfidenceScore)

    // 2. Save Response Doc
    const responseDoc = new Response({
      userId: decoded.userId,
      segment,
      answers,
      dimensionScores,
      rawScore,
      normalizedRawScore,
      dataConfidenceMultiplier: multiplier,
      finalConfidenceScore,
      band,
      profileName
    })
    await responseDoc.save()

    // 3. Generate Allocation Portfolio
    const buckets = generateBuckets(band)
    // Dynamic Q6 savings parameter extractor handles
    const q6Ans = answers.find((a: any) => a.questionId === 'Q6')
    const monthlySavingsRange = q6Ans?.selectedText || "Default fallback amount"
    const emergencyReserve = calculateEmergencyReserve(band, monthlySavingsRange)

    const portfolioDoc = new Portfolio({
      userId: decoded.userId,
      responseId: responseDoc._id,
      finalConfidenceScore,
      band,
      profileName,
      segment,
      emergencyReserve,
      buckets,
      baselineAllocation: { B2: 0, B3: 0, B4: 0, B5: 0 }
    })
    
    // Fill Baseline allocated parameters weights
    buckets.forEach(b => {
      if (['B2','B3','B4','B5'].includes(b.key)) {
        portfolioDoc.baselineAllocation[b.key as 'B2'|'B3'|'B4'|'B5'] = b.percentage
      }
    })

    await portfolioDoc.save()

    return res.status(201).json({
      message: 'Scores calculated and portfolio generated successfully',
      scoreResult: {
        finalConfidenceScore,
        rawScore,
        normalizedRawScore,
        band,
        profileName,
        dimensionScores
      },
      allocationResult: {
        buckets,
        emergencyReserve
      }
    })

  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}
