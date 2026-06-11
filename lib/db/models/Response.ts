import mongoose from 'mongoose'
import { Answer, DimensionScore } from '../../../src/types'

const AnswerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  dimension: { type: String, required: true },
  answerIndex: { type: Number, required: true },
  rawScore: { type: Number, required: true },
  isChecklist: { type: Boolean, required: true },
  checklistSelections: [{ type: String }],
  checklistScore: { type: Number }
})

const DimensionScoreSchema = new mongoose.Schema({
  dimension: { type: String, required: true },
  questions: [{ type: String }],
  averageScore: { type: Number, required: true },
  subScore: { type: Number, required: true },
  weight: { type: Number, required: true },
  weightedContribution: { type: Number, required: true }
})

const ResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  segment: { type: String, required: true, enum: ['urban', 'semi_urban', 'rural'] },
  answers: [AnswerSchema],
  dimensionScores: [DimensionScoreSchema],
  rawScore: { type: Number },
  normalizedRawScore: { type: Number },
  dataConfidenceMultiplier: { type: Number },
  finalConfidenceScore: { type: Number },
  band: { type: Number },
  profileName: { type: String },
  completedAt: { type: Date, default: Date.now }
})

export default mongoose.models.Response || mongoose.model('Response', ResponseSchema)
