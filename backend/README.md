# TradeWithManish API

Single backend entry point: **TypeScript** under `src/`.

## Run

```bash
cp .env.example .env
npm install
npm run seed:admin
npm run dev
```

- Dev: `tsx watch src/server.ts` (port **5000**)
- Prod: `npm run build` then `npm start` → `dist/server.js`

## Layout

```
src/
  server.ts      # Bootstrap + MongoDB
  app.ts         # Express app + /api/v1 mount
  routes/        # API route modules
  controllers/
  models/
  middleware/
  scripts/seed-admin.ts
```

Legacy `server.js`, `routes/`, and `controllers/` at the repo root of `backend/` were removed to avoid route conflicts.

## Public API (`/api/v1`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/auth/login` | Admin JWT login |
| POST | `/auth/logout` | Logout |
| GET | `/auth/me` | Current user (Bearer token) |
| POST | `/contact` | Contact form → MongoDB `Lead` |
| POST | `/bookings` | Consultation booking |
| POST | `/newsletter` | Newsletter subscribe |
