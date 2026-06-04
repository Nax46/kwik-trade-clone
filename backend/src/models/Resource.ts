import mongoose, { type Document, Schema } from 'mongoose'

export interface IResource extends Document {
  title: string
  description: string
  pdfUrl: string
  category: string
  isActive: boolean
}

const resourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export const Resource = mongoose.model<IResource>('Resource', resourceSchema)
