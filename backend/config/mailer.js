// import nodemailer from 'nodemailer'

// export function createTransporter() {
//   const user = process.env.EMAIL_USER
//   const pass = process.env.EMAIL_PASS

//   if (!user || !pass) {
//     throw new Error('EMAIL_USER and EMAIL_PASS must be set in environment variables')
//   }

//   return nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user,
//       pass,
//     },
//   })
// }









import nodemailer from 'nodemailer'

export function createTransporter() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  console.log('EMAIL_USER exists:', !!user)
  console.log('EMAIL_PASS exists:', !!pass)

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    debug: true,
  })
}
