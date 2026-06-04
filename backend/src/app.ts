import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { corsOrigins, env } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import { sanitizeBody } from './middleware/sanitizeBody.js'
import { ApiError } from './utils/ApiError.js'
import * as authController from './controllers/auth.controller.js'
import { protect } from './middleware/auth.js'
import { validateBody } from './middleware/validate.js'
import { asyncHandler } from './utils/asyncHandler.js'
import { loginSchema } from './validators/auth.validator.js'
import apiRoutes from './routes/index.js'
import authRoutes from './routes/auth.routes.js'

export function createApp() {
  const app = express()

  app.set('trust proxy', 1)
  app.use(helmet())
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || corsOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new ApiError(403, 'CORS blocked'))
        }
      },
      credentials: true,
    }),
  )
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: env.NODE_ENV === 'production' ? 200 : 1000,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }))
  app.use(sanitizeBody)

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      message: `${env.APP_NAME} API`,
      docs: '/api/v1/health',
    })
  })

  app.get('/api/health', (_req, res) => {
    res.json({ success: true })
  })

  // Auth: explicit handlers + router mount (POST /api/v1/auth/login)
  app.post(
    '/api/v1/auth/login',
    validateBody(loginSchema),
    asyncHandler(authController.login),
  )
  app.post('/api/v1/auth/logout', asyncHandler(authController.logout))
  app.get('/api/v1/auth/me', protect, asyncHandler(authController.me))
  app.use('/api/v1/auth', authRoutes)

  app.use('/api/v1', apiRoutes)

  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found on TradeWithManish API',
      path: _req.path,
      method: _req.method,
    })
  })

  app.use(errorHandler)

  return app
}
