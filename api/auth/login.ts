import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../../lib/db/connect'
import User from '../../lib/db/models/User'
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
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    console.log(`\n🔑 Login Attempt for ${email}: isMatch=${isMatch}`)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id, segment: user.segment },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return res.status(200).json({
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
