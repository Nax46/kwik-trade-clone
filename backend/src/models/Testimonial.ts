import mongoose, { type Document, Schema } from 'mongoose'

export interface ITestimonial extends Document {
  name: string
  role: string
  content: string
  rating: number
  avatarUrl?: string
  isPublished: boolean
  order: number
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatarUrl: { type: String },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema)
