import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectDB } from '../lib/db/connect'
import Portfolio from '../lib/db/models/Portfolio'
import jwt from 'jsonwebtoken'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
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

    const portfolio = await Portfolio.findOne({ userId: decoded.userId }).sort({ createdAt: -1 })
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found for this user' })
    }

    return res.status(200).json(portfolio)

  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Internal Server Error' })
  }
}
