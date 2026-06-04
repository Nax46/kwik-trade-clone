import mongoose, { type Document, Schema } from 'mongoose'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed'
export type LeadSource = 'contact' | 'consultation' | 'newsletter' | 'registration'

export interface ILeadNote {
  text: string
  createdAt: Date
  authorId?: mongoose.Types.ObjectId
}

export interface ILead extends Document {
  source: LeadSource
  name: string
  phone: string
  email: string
  experienceLevel?: string
  interestedService?: string
  message?: string
  status: LeadStatus
  notes: ILeadNote[]
}

const leadSchema = new Schema<ILead>(
  {
    source: {
      type: String,
      enum: ['contact', 'consultation', 'newsletter', 'registration'],
      default: 'contact',
    },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    experienceLevel: { type: String, trim: true },
    interestedService: { type: String, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'closed'],
      default: 'new',
    },
    notes: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true },
)

leadSchema.index({ status: 1, createdAt: -1 })
leadSchema.index({ email: 1 })

export const Lead = mongoose.model<ILead>('Lead', leadSchema)
