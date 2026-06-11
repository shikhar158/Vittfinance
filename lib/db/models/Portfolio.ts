import mongoose from 'mongoose'

const EmergencyReserveSchema = new mongoose.Schema({
  targetMonths: { type: Number, required: true },
  estimatedMonthlyExpense: { type: Number, required: true },
  targetAmount: { type: Number, required: true },
  allocationCapPercent: { type: Number, required: true },
  recommendedInstrument: { type: String, required: true },
  currentAmount: { type: Number, default: 0 }
})

const BucketAllocationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  fullName: { type: String, required: true },
  percentage: { type: Number, required: true },
  color: { type: String, required: true },
  assets: [{ type: String, required: true }],
  description: { type: String, required: true },
  riskLevel: { type: String, required: true }
})

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  responseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Response', required: true, unique: true },
  finalConfidenceScore: { type: Number, required: true },
  band: { type: Number, required: true },
  profileName: { type: String, required: true },
  segment: { type: String, required: true, enum: ['urban', 'semi_urban', 'rural'] },
  emergencyReserve: EmergencyReserveSchema,
  buckets: [BucketAllocationSchema],
  baselineAllocation: {
    B2: { type: Number, required: true },
    B3: { type: Number, required: true },
    B4: { type: Number, required: true },
    B5: { type: Number, required: true }
  }
}, {
  timestamps: true
})

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema)
