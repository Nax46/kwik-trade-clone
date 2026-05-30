import cors from 'cors'

function parseOrigins(value) {
  if (!value) {
    return ['http://localhost:5173']
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

export function corsMiddleware() {
  const allowedOrigins = parseOrigins(process.env.CLIENT_URL)

  return cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
}
