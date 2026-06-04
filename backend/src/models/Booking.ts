import mongoose, { type Document, Schema } from 'mongoose'

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'completed'

export interface IBooking extends Document {
  name: string
  phone: string
  email: string
  experienceLevel?: string
  interestedService?: string
  message?: string
  date: string
  timeSlot: string
  status: BookingStatus
  adminNotes?: string
}

const bookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    experienceLevel: { type: String, trim: true },
    interestedService: { type: String, trim: true },
    message: { type: String, trim: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true },
)

bookingSchema.index({ date: 1, timeSlot: 1 })
bookingSchema.index({ status: 1, createdAt: -1 })

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema)
