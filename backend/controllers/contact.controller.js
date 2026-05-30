import { createTransporter } from '../config/mailer.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

import { getCurrentDateString } from '../utils/emailBody.js'

function buildEmailBody({ fullName, email, phone, message }) {
  const currentDate = getCurrentDateString()

  return `Name: ${fullName}

Email: ${email}

Phone: ${phone}

Message: ${message}

Date: ${currentDate}`
}

export async function submitContact(req, res) {
  try {
    const { fullName, email, phone, message } = req.body

    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
      })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong',
      })
    }

    const transporter = createTransporter()
    const recipient = process.env.EMAIL_USER

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipient,
      replyTo: email,
      subject: 'New Website Submission',
      text: buildEmailBody({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      }),
    })

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
    })
  } catch (error) {
    console.error('Contact form error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}
