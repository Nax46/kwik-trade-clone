import {
  Notification,
  type NotificationType,
} from '../models/Notification.js'

type CreateNotificationInput = {
  type: NotificationType
  title: string
  message: string
  link?: string
  entityId?: string
}

export async function createAdminNotification(input: CreateNotificationInput) {
  return Notification.create({
    type: input.type,
    title: input.title,
    message: input.message,
    link: input.link,
    entityId: input.entityId,
    read: false,
  })
}

export async function notifyNewLead(lead: {
  _id: unknown
  name: string
  email: string
  source: string
}) {
  const isContact = lead.source === 'contact'
  return createAdminNotification({
    type: isContact ? 'contact' : 'lead',
    title: isContact ? 'New contact form submission' : 'New lead received',
    message: `${lead.name} (${lead.email})`,
    link: '/admin/leads',
    entityId: String(lead._id),
  })
}

export async function notifyNewBooking(booking: {
  _id: unknown
  name: string
  date: string
  timeSlot: string
}) {
  return createAdminNotification({
    type: 'booking',
    title: 'New consultation booking',
    message: `${booking.name} — ${booking.date} ${booking.timeSlot}`,
    link: '/admin/bookings',
    entityId: String(booking._id),
  })
}

export async function notifyNewSubscriber(email: string, id: unknown) {
  return createAdminNotification({
    type: 'newsletter',
    title: 'New newsletter subscriber',
    message: email,
    link: '/admin/newsletter',
    entityId: String(id),
  })
}

export async function getUnreadCount() {
  return Notification.countDocuments({ read: false })
}
