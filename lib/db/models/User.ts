import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
  segment: { type: String, required: false, enum: ['urban', 'semi_urban', 'rural'] }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err: any) {
    next(err)
  }
})

UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.models.User || mongoose.model('User', UserSchema)
