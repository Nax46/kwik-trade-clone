# Database Design — MongoDB Atlas

## Collections

### `users`
Admin accounts only.

| Field | Type | Notes |
|-------|------|-------|
| name | string | required |
| email | string | unique, indexed |
| password | string | bcrypt hash |
| role | enum | `admin` |
| resetPasswordToken | string? | hashed |
| resetPasswordExpires | Date? | |
| createdAt, updatedAt | Date | timestamps |

### `leads`
Contact form + unified lead pipeline.

| Field | Type | Notes |
|-------|------|-------|
| source | enum | `contact`, `consultation`, `newsletter` |
| name, phone, email | string | |
| experienceLevel | string? | |
| interestedService | string? | |
| message | string? | |
| status | enum | `new`, `contacted`, `qualified`, `closed` |
| notes | [{ text, createdAt, authorId }] | |
| createdAt | Date | indexed |

### `bookings`
Consultation appointments.

| Field | Type | Notes |
|-------|------|-------|
| name, phone, email | string | |
| experienceLevel, interestedService, message | string? | |
| date | string | YYYY-MM-DD |
| timeSlot | string | e.g. `09:00` |
| status | enum | `pending`, `approved`, `rejected`, `completed` |
| adminNotes | string? | |
| createdAt | Date | |

### `blogs`
| Field | Type |
|-------|------|
| title, slug, excerpt, content | string |
| thumbnail | string? (URL) |
| category | enum (see spec) |
| tags | string[] |
| seoTitle, seoDescription | string? |
| author | string |
| status | `draft` \| `published` |
| publishedAt | Date? |

### `insights`
Market insight articles (similar to blogs, lighter SEO).

### `resources`
| title, description, pdfUrl, category, isActive |

### `testimonials`
| name, role, content, rating, avatarUrl?, isPublished, order |

### `newsletterSubscribers`
| email (unique), isActive, subscribedAt, unsubscribedAt? |

### `visitorAnalytics`
Daily rollup + optional page events.

| date | string YYYY-MM-DD |
| totalVisits, uniqueVisitors, pageViews | number |
| leadConversions, bookingConversions | number |
| pages | [{ path, views }] |

### `settings`
Singleton document (`key: 'site'`).

| phone, email, address, socialLinks[], seo (title, description, ogImage) |

## Indexes

- `users.email` unique
- `blogs.slug` unique
- `insights.slug` unique
- `newsletterSubscribers.email` unique
- `leads.status`, `leads.createdAt`
- `bookings.date`, `bookings.status`
- `visitorAnalytics.date` unique
