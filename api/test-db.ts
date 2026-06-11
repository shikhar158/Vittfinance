import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from 'mongoose'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vittfinance12:2d0NUjpdQeHkzvWn@vittfinance.ma6ktlc.mongodb.net/?appName=Vittfinance'

  try {
    console.log('Attempting to connect to MongoDB...')
    const conn = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000
    })
    console.log('Connected successfully!')
    await mongoose.disconnect()
    return res.status(200).json({ status: 'connected', dbName: conn.connection.name })
  } catch (err: any) {
    console.error('Connection failed:', err)
    return res.status(500).json({
      status: 'error',
      message: err.message,
      name: err.name,
      stack: err.stack
    })
  }
}
