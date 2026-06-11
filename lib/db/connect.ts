import mongoose from 'mongoose'

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
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable')
  }

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
