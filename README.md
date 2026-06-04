# TradeWithManish.com

Production-ready trading education platform: React frontend, Express + MongoDB API, JWT admin panel.

**Tagline:** Simplifying Trading For Every Trader

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, Tailwind, TanStack Query, React Hook Form, Zod |
| Backend | Express 5, TypeScript, Mongoose, JWT, Bcrypt, Nodemailer |
| Database | MongoDB Atlas |
| Deploy | Vercel (frontend), Railway (API) |

## Quick start

### 1. MongoDB Atlas

Create a cluster and copy the connection string.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit MONGODB_URI, JWT_SECRET, SMTP_*, ADMIN_*
npm install
npm run seed:admin
npm run dev
```

API: `http://localhost:5000/api/v1/health`

### 3. Frontend

```bash
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api/v1
npm install
npm run dev
```

Site: `http://localhost:5173`  
Admin: `http://localhost:5173/admin/login`

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Database](docs/DATABASE.md)
- [API](docs/API.md)

## Features

- Public site: Home, About, Services, Mentorship, Blog, Market Insights, Resources, Consultation, Contact, FAQ, legal pages
- Real API: leads, bookings, newsletter, analytics, CMS content
- Admin: dashboard charts, lead/booking management, blogs, insights, resources, testimonials, settings, profile
- Security: Helmet, rate limiting, CORS, Zod validation, mongo-sanitize
- Email: Nodemailer notifications for new leads and bookings

## Deployment

### Vercel (frontend)

- Root directory: project root
- Build: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL`, `VITE_SITE_URL`

### Railway (backend)

- Root: `backend`
- Start: `npm run build && npm start`
- Env: see `backend/.env.example`

### MongoDB Atlas

Allow Railway/Vercel IPs or `0.0.0.0/0` for development.

## Contact (default settings)

- Phone: 8155952384
- Email: naxchaudhary46@gmail.com
- Location: Deesa, Gujarat 385535
