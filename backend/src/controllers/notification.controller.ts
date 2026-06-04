import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Notification } from '../models/Notification.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/response.js'

export async function listNotifications(_req: AuthRequest, res: Response) {
  const limit = Math.min(Number(_req.query.limit) || 50, 100)
  const [items, unreadCount] = await Promise.all([
    Notification.find().sort({ createdAt: -1 }).limit(limit).lean(),
    Notification.countDocuments({ read: false }),
  ])
  sendSuccess(res, { items, unreadCount })
}

export async function markRead(req: AuthRequest, res: Response) {
  const doc = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true },
  )
  if (!doc) throw new ApiError(404, 'Notification not found')
  const unreadCount = await Notification.countDocuments({ read: false })
  sendSuccess(res, { notification: doc, unreadCount })
}

export async function markAllRead(_req: AuthRequest, res: Response) {
  await Notification.updateMany({ read: false }, { read: true })
  sendSuccess(res, { unreadCount: 0 })
}

export async function deleteNotification(req: AuthRequest, res: Response) {
  const doc = await Notification.findByIdAndDelete(req.params.id)
  if (!doc) throw new ApiError(404, 'Notification not found')
  const unreadCount = await Notification.countDocuments({ read: false })
  sendSuccess(res, { unreadCount })
}

export async function clearAllNotifications(_req: AuthRequest, res: Response) {
  await Notification.deleteMany({})
  sendSuccess(res, { unreadCount: 0 }, 200, 'All notifications cleared')
}
