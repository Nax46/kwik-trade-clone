// import { createTransporter } from '../config/mailer.js'
// import { getCurrentDateString } from '../utils/emailBody.js'

// function isValidEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// }

// function buildRegisterEmailBody({ fullName, email, phone }) {
//   return `Name: ${fullName}

// Email: ${email}

// Phone: ${phone}

// Date: ${getCurrentDateString()}

// Note: A new user has registered on Kwik Trade.`
// }

// export async function submitRegister(req, res) {
//   try {
//     const { fullName, email, phone } = req.body

//     if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Something went wrong',
//       })
//     }

//     if (!isValidEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Something went wrong',
//       })
//     }

//     const transporter = createTransporter()

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       replyTo: email.trim(),
//       subject: 'New User Registration - Kwik Trade',
//       text: buildRegisterEmailBody({
//         fullName: fullName.trim(),
//         email: email.trim(),
//         phone: phone.trim(),
//       }),
//     })

//     return res.status(200).json({
//       success: true,
//       message: 'Registration successful. Please sign in.',
//     })
//   } catch (error) {
//     console.error('Register email error:', error.message)
//     return res.status(500).json({
//       success: false,
//       message: 'Something went wrong',
//     })
//   }
// }



import { createTransporter } from '../config/mailer.js'
import { getCurrentDateString } from '../utils/emailBody.js'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildRegisterEmailBody({ fullName, email, phone }) {
  return `Name: ${fullName}

Email: ${email}

Phone: ${phone}

Date: ${getCurrentDateString()}

Note: A new user has registered on Kwik Trade.`
}

export async function submitRegister(req, res) {
  try {
    console.log("Incoming Data:", req.body)

    const { fullName, email, phone } = req.body

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        received: req.body
      })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      })
    }

    const transporter = createTransporter()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: 'New User Registration - Kwik Trade',
      text: buildRegisterEmailBody({
        fullName,
        email,
        phone
      }),
    })

    return res.status(200).json({
      success: true,
      message: "Registration successful"
    })

  } catch (error) {
    console.log("ERROR:", error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}