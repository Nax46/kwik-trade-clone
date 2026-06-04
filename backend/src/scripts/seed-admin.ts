import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../models/User.js'
import { ensureDefaultSettings } from '../models/Settings.js'

dotenv.config()

const DEFAULT_ADMIN = {
  name: 'Manish Admin',
  email: 'naxchaudhary46@gmail.com',
  password: 'Nax@1234',
  role: 'admin' as const,
}

async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI required in backend/.env')
    process.exit(1)
  }

  await mongoose.connect(uri)

  const email = process.env.ADMIN_EMAIL ?? DEFAULT_ADMIN.email
  const password = process.env.ADMIN_PASSWORD ?? DEFAULT_ADMIN.password
  const name = process.env.ADMIN_NAME ?? DEFAULT_ADMIN.name

  const existing = await User.findOne({ email })
  if (existing) {
    existing.name = name
    existing.password = password
    existing.role = 'admin'
    await existing.save()
    console.log('Admin updated:', email)
  } else {
    await User.create({ name, email, password, role: 'admin' })
    console.log('Admin created:', email)
  }

  await ensureDefaultSettings()
  console.log('Default settings ensured')
  await mongoose.disconnect()
}

seed().catch((e) => {
  console.error(e)
  process.exit(1)
})
