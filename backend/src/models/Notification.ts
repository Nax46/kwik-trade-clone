import mongoose, { type Document, Schema } from 'mongoose'

export type NotificationType =
  | 'lead'
  | 'booking'
  | 'newsletter'
  | 'contact'
  | 'blog_comment'

export interface INotification extends Document {
  type: NotificationType
  title: string
  message: string
  read: boolean
  link?: string
  entityId?: mongoose.Types.ObjectId
}

const notificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ['lead', 'booking', 'newsletter', 'contact', 'blog_comment'],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
    link: { type: String, trim: true },
    entityId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
)

notificationSchema.index({ read: 1, createdAt: -1 })
notificationSchema.index({ createdAt: -1 })

export const Notification = mongoose.model<INotification>('Notification', notificationSchema)
