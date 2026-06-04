import mongoose, { type Document, Schema } from 'mongoose'

export interface ISocialLink {
  label: string
  href: string
  icon?: string
}

export interface ISeoSettings {
  siteTitle: string
  siteDescription: string
  ogImage?: string
}

export interface ISettings extends Document {
  key: string
  phone: string
  email: string
  address: string
  tagline: string
  socialLinks: ISocialLink[]
  seo: ISeoSettings
  workingHours: string
  consultationDuration: number
}

const settingsSchema = new Schema<ISettings>(
  {
    key: { type: String, default: 'site', unique: true },
    phone: { type: String, default: '8155952384' },
    email: { type: String, default: 'naxchaudhary46@gmail.com' },
    address: { type: String, default: 'Deesa, Gujarat 385535' },
    tagline: { type: String, default: 'Simplifying Trading For Every Trader' },
    socialLinks: [
      {
        label: String,
        href: String,
        icon: String,
      },
    ],
    seo: {
      siteTitle: { type: String, default: 'TradeWithManish.com' },
      siteDescription: {
        type: String,
        default: 'Professional trading education, market analysis, mentorship and consultation.',
      },
      ogImage: { type: String },
    },
    workingHours: { type: String, default: '9:00 AM – 6:00 PM' },
    consultationDuration: { type: Number, default: 30 },
  },
  { timestamps: true },
)

export const Settings = mongoose.model<ISettings>('Settings', settingsSchema)

export async function ensureDefaultSettings(): Promise<ISettings> {
  let doc = await Settings.findOne({ key: 'site' })
  if (!doc) {
    doc = await Settings.create({
      key: 'site',
      socialLinks: [
        { label: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
        { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
        { label: 'Telegram', href: 'https://t.me', icon: 'telegram' },
      ],
    })
  }
  return doc
}
