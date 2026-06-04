import nodemailer from 'nodemailer'
import { env } from './env.js'

let transporter: nodemailer.Transporter | null = null

export function getMailer(): nodemailer.Transporter | null {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  }
  return transporter
}

export async function sendMail(options: {
  to: string
  subject: string
  html: string
  text?: string
}): Promise<boolean> {
  const mailer = getMailer()
  if (!mailer) {
    console.warn('Email skipped: SMTP not configured')
    return false
  }
  await mailer.sendMail({
    from: env.MAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  })
  return true
}
