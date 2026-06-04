import { createApp } from './app.js'
import { connectDatabase } from './config/db.js'
import { env } from './config/env.js'
import { ensureDefaultSettings } from './models/Settings.js'

async function bootstrap() {
  await connectDatabase()
  await ensureDefaultSettings()

  const app = createApp()
  app.listen(env.PORT, () => {
    console.log(`${env.APP_NAME} API running on port ${env.PORT}`)
    console.log(`Health: http://localhost:${env.PORT}/api/v1/health`)
    console.log(`Auth login: POST http://localhost:${env.PORT}/api/v1/auth/login`)
    console.log(
      'Verify: GET /api/v1/health must return {"success":true,...} — if you see "Cannot GET", wrong process owns this port.',
    )
  })
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
