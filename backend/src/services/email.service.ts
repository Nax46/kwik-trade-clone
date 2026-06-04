import { env } from '../config/env.js'
import { sendMail } from '../config/mailer.js'

const adminTo = () => env.ADMIN_EMAIL ?? env.SMTP_USER ?? ''

export async function notifyAdminNewLead(data: {
  name: string
  email: string
  phone: string
  source: string
}): Promise<void> {
  const to = adminTo()
  if (!to) return
  await sendMail({
    to,
    subject: `[${env.APP_NAME}] New Lead — ${data.name}`,
    html: `<p><strong>New lead</strong> (${data.source})</p>
      <p>Name: ${data.name}<br/>Email: ${data.email}<br/>Phone: ${data.phone}</p>
      <p>View in admin dashboard.</p>`,
    text: `New lead from ${data.name} (${data.email})`,
  })
}

export async function notifyAdminNewBooking(data: {
  name: string
  email: string
  date: string
  timeSlot: string
}): Promise<void> {
  const to = adminTo()
  if (!to) return
  await sendMail({
    to,
    subject: `[${env.APP_NAME}] New Consultation Booking`,
    html: `<p><strong>New booking</strong></p>
      <p>${data.name} (${data.email})<br/>${data.date} at ${data.timeSlot}</p>`,
  })
}

export async function sendPasswordResetEmail(email: string, resetUrl: string): Promise<void> {
  await sendMail({
    to: email,
    subject: `[${env.APP_NAME}] Reset your password`,
    html: `<p>Click the link below to reset your password (valid for 1 hour):</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>`,
  })
}
