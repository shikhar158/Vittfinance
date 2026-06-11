import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../../lib/db/connect'
import User from '../../lib/db/models/User'
import jwt from 'jsonwebtoken'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    await connectDB()
    const { name, email, password, pincode } = req.body

    if (!name || !email || !password || !pincode) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      pincode
    })

    await user.save()

    const token = jwt.sign(
      { userId: user._id, segment: user.segment },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        segment: user.segment
      }
    })
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}
