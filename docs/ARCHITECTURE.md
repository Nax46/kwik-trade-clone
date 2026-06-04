# TradeWithManish.com — System Architecture

## Overview

Monorepo-style separation: **React (Vite)** frontend and **Express (TypeScript)** API, backed by **MongoDB Atlas**.

| Layer        | Stack                          | Deploy target   |
|-------------|--------------------------------|-----------------|
| Frontend    | React 19, Vite, Tailwind, RQ   | Vercel          |
| Backend API | Node, Express 5, Mongoose, JWT | Railway         |
| Database    | MongoDB Atlas                  | Atlas cluster   |
| Email       | Nodemailer (SMTP)              | Env-driven      |

## Repository layout

```
tradewithmanish/
├── frontend/                 # (root) Vite React app — src/, public/
├── backend/
│   └── src/
│       ├── server.ts         # HTTP bootstrap
│       ├── app.ts            # Express app factory
│       ├── config/           # env, db, cors, mailer
│       ├── models/           # Mongoose schemas
│       ├── routes/           # Route modules
│       ├── controllers/      # Request handlers
│       ├── services/         # Business logic
│       ├── middleware/       # auth, validate, rate-limit, analytics
│       ├── validators/       # Zod schemas
│       ├── utils/            # helpers, ApiError
│       └── types/            # shared TS types
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   └── API.md
├── .env.example              # frontend
└── backend/.env.example
```

## API surface (`/api/v1`)

| Area            | Prefix                    | Auth        |
|----------------|---------------------------|-------------|
| Health         | `/health`                 | Public      |
| Auth           | `/auth`                   | Public      |
| Public content | `/blogs`, `/insights`, `/resources`, `/testimonials`, `/settings` | Public (read) |
| Forms          | `/leads`, `/bookings`, `/newsletter` | Public (write) |
| Analytics      | `/analytics/track`      | Public      |
| Admin          | `/admin/*`                | JWT Bearer  |

## Security

- Helmet, `express-rate-limit`, CORS allowlist
- Zod validation on all mutating routes
- `mongo-sanitize` / trimmed strings for XSS reduction
- JWT access tokens (admin); bcrypt password hashes
- Secrets only via environment variables

## Frontend architecture

```
src/
├── api/              # axios instance, endpoints
├── lib/              # queryClient, auth token storage
├── config/           # nav, seo defaults
├── components/       # UI + feature sections
├── pages/            # route pages
├── admin/            # admin shell + pages
├── hooks/
├── layouts/
└── routes/
```

- **TanStack Query** for server state
- **React Hook Form + Zod** for forms
- Lazy routes + code splitting
- Admin routes protected via `AuthGuard` + API 401 handling

## Data flow

1. Visitor loads SPA → optional analytics ping
2. Public reads blogs/insights/resources from API
3. Contact / consultation / newsletter → API → MongoDB → Nodemailer → admin inbox
4. Admin logs in → JWT → CRUD + lead/booking management + dashboard aggregates

## Branding

- **Name:** TradeWithManish.com
- **Tagline:** Simplifying Trading For Every Trader
- **Theme:** Premium light (primary blue, white, light gray)
- **Logo:** `public/logo.svg`
