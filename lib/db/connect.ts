import mongoose from 'mongoose'

// Vercel serverless environment variable fallback safety guards
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb+srv://vittfinance12:2d0NUjpdQeHkzvWn@vittfinance.ma6ktlc.mongodb.net/?appName=Vittfinance'
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = '8f54c2db07f6e3c98ad0672e8cb9b51fa16db3a7df06e87bc5c9d64a2b16fe9b'
}
if (!process.env.GNEWS_KEY) {
  process.env.GNEWS_KEY = 'aff06dfeca78445fd07e565d1ecef6cb'
}

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Global cache for MongoDB connection.
 * Critical for Vercel serverless — without this, every cold
 * invocation opens a new connection, exhausting Atlas free tier limits.
 */
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  } | undefined
}

// In development/production serverless, use global variable to persist cache
const cache = (global as any).mongooseCache || { conn: null, promise: null }
if (!(global as any).mongooseCache) {
  (global as any).mongooseCache = cache
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }).then((m) => {
      cache.conn = m
      return m
    })
  }

  try {
    await cache.promise
  } catch (e) {
    cache.promise = null
    throw e
  }

  return cache.conn!
}
