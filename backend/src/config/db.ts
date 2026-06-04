import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed. Verify MONGODB_URI in backend/.env')
    throw err
  }
}
