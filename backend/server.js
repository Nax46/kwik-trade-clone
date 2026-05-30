// import dotenv from 'dotenv'
// import express from 'express'
// import { corsMiddleware } from './config/cors.js'
// import apiRoutes from './routes/index.js'

// dotenv.config()

// const app = express()
// const PORT = process.env.PORT || 5000

// app.use(corsMiddleware())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use('/api', apiRoutes)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' })
// })

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   const status = err.message?.startsWith('CORS blocked') ? 403 : 500
//   res.status(status).json({
//     success: false,
//     message: 'Something went wrong',
//   })
// })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
//   console.log(`Health check: http://localhost:${PORT}/api/health`)
//   console.log(`Contact API: POST http://localhost:${PORT}/api/contact`)
//   console.log("Register API: POST http://localhost:5000/api/register")
// })





import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import contactRoutes from './routes/contact.routes.js'
import formRoutes from './routes/form.routes.js'
import healthRoutes from './routes/health.routes.js'
import registerRoutes from './routes/register.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/health', healthRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/forms', formRoutes)

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API working'
  })
})

import { testSMTP } from './config/mailer.js'

testSMTP()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})