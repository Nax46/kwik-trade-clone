# REST API Reference

Base URL: `{API_URL}/api/v1`

## Auth

| Method | Path | Body |
|--------|------|------|
| POST | `/auth/login` | `{ email, password }` |
| POST | `/auth/forgot-password` | `{ email }` |
| POST | `/auth/reset-password` | `{ token, password }` |
| GET | `/auth/me` | Bearer JWT |
| PATCH | `/auth/profile` | Bearer JWT |

## Public

| Method | Path |
|--------|------|
| GET | `/health` |
| GET | `/settings/public` |
| GET | `/blogs?status=published&page=&limit=&category=&q=` |
| GET | `/blogs/:slug` |
| GET | `/insights` |
| GET | `/insights/:slug` |
| GET | `/resources` |
| GET | `/testimonials` |
| POST | `/contact` |
| POST | `/leads` |
| POST | `/bookings` |
| GET | `/bookings/availability?date=YYYY-MM-DD` |
| POST | `/newsletter` |
| POST | `/newsletter/subscribe` |
| POST | `/newsletter/unsubscribe` |
| POST | `/analytics/track` |

## Admin (Bearer JWT)

| Method | Path |
|--------|------|
| GET | `/admin/dashboard` |
| GET/PATCH | `/admin/leads` |
| GET/PATCH | `/admin/bookings` |
| CRUD | `/admin/blogs` |
| CRUD | `/admin/insights` |
| CRUD | `/admin/resources` |
| CRUD | `/admin/testimonials` |
| GET/PATCH | `/admin/newsletter` |
| GET/PATCH | `/admin/settings` |
| GET | `/admin/analytics` |

## Response envelope

```json
{ "success": true, "data": {}, "message": "optional" }
```

Errors:

```json
{ "success": false, "message": "Human readable", "errors": [] }
```
