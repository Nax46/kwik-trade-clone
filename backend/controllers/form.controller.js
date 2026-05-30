import { createTransporter } from '../config/mailer.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (char) => char.toUpperCase())
}

function buildSubmissionBody(payload) {
  const now = new Date()
  const date = now.toLocaleDateString('en-US', { dateStyle: 'full' })
  const time = now.toLocaleTimeString('en-US', { timeStyle: 'medium' })
  const formType = String(payload.formType ?? 'General').trim()
  const fields = payload.fields ?? {}
  const lines = [
    'New Form Submission',
    '',
    `Form Type: ${formType}`,
    `Date: ${date}`,
    `Time: ${time}`,
    '',
  ]

  const preferredOrder = ['fullName', 'name', 'email', 'phone', 'subject', 'message']
  const added = new Set()

  for (const key of preferredOrder) {
    if (fields[key] !== undefined && fields[key] !== null && String(fields[key]).trim()) {
      lines.push(`${formatLabel(key)}: ${String(fields[key]).trim()}`)
      added.add(key)
    }
  }

  for (const [key, value] of Object.entries(fields)) {
    if (added.has(key)) continue
    if (value === undefined || value === null) continue
    const normalized = String(value).trim()
    if (!normalized) continue
    lines.push(`${formatLabel(key)}: ${normalized}`)
  }

  return lines.join('\n')
}

export async function submitForm(req, res) {
  try {
    const { formType, fields } = req.body ?? {}
    const normalizedType = String(formType ?? '').trim()
    const normalizedFields = fields ?? {}
    const email = String(normalizedFields.email ?? '').trim()

    if (!normalizedType || typeof normalizedFields !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid form payload',
      })
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      })
    }

    // const transporter = createTransporter()
    // const recipient = process.env.EMAIL_USER

    // await transporter.sendMail({

//     const transporter = createTransporter()
// const recipient = process.env.EMAIL_USER

// console.log('Sending email...')
// console.log('Recipient:', recipient)
// console.log('Form Type:', normalizedType)

// await transporter.verify()
// console.log('SMTP verified')

// await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: recipient,
//       replyTo: email || process.env.EMAIL_USER,
//       subject: `New ${normalizedType} Submission - Kwik Trade`,
//       text: buildSubmissionBody({
//         formType: normalizedType,
//         fields: normalizedFields,
//       }),
//     })


const transporter = createTransporter()

const recipient = 'chaudharynax27@gmail.com'
console.log('Before sendMail')
await transporter.sendMail({
  from: 'Kwik Trade <chaudharynax27@gmail.com>',
  to: recipient,
  replyTo: email || 'chaudharynax27@gmail.com',
  subject: `New ${normalizedType} Submission - Kwik Trade`,
  text: buildSubmissionBody({
    formType: normalizedType,
    fields: normalizedFields,
  }),
})
console.log('After sendMail')

    console.log('Email sent successfully')

    return res.status(200).json({
      success: true,
      message: `${normalizedType} form submitted successfully`,
    })
  } 
  catch (error) {
  console.error('FULL ERROR =>', error)
  console.error('MESSAGE =>', error?.message)
  console.error('CODE =>', error?.code)

  return res.status(500).json({
    success: false,
    message: error?.message || 'Something went wrong',
  })
}
  // catch (error) {
  //   console.error('Form submission error:', error.message)
  //   return res.status(500).json({
  //     success: false,
  //     message: 'Something went wrong',
  //   })
  // }
}
