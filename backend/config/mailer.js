import nodemailer from 'nodemailer'

export function createTransporter() {
  console.log('SMTP_HOST =', process.env.SMTP_HOST)
  console.log('SMTP_PORT =', process.env.SMTP_PORT)
  console.log('SMTP_USER =', process.env.SMTP_USER)

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}