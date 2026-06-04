import mongoose, { type Document, Schema } from 'mongoose'

export interface INewsletterSubscriber extends Document {
  email: string
  isActive: boolean
  subscribedAt: Date
  unsubscribedAt?: Date
}

const newsletterSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true },
)

export const NewsletterSubscriber = mongoose.model<INewsletterSubscriber>(
  'NewsletterSubscriber',
  newsletterSchema,
)
