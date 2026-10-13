# MannVayal AI - Production Deployment Guide

## 1. Hosting Architecture Overview

MannVayal AI is designed for modern cloud environments:
- **Frontend & Edge Layer**: Next.js deployed on Vercel, Railway, AWS Amplify, or a Dockerized Node.js container.
- **Database Layer**: Managed PostgreSQL (Supabase, Neon, AWS RDS, or Render).
- **Static Assets & 3D Visuals**: Canvas 2D/3D runs on client hardware with graceful reduced-motion fallbacks.

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env.production` on your hosting provider:

```env
# Database Connection (Switch to PostgreSQL connection string)
DATABASE_URL="postgresql://username:password@your-db-host:5432/mannvayal_prod?sslmode=require"

# JWT Authentication Secret
JWT_SECRET="generate_a_cryptographically_secure_random_64_char_string"

# Application URL
NEXT_PUBLIC_APP_NAME="MannVayal AI"
NEXT_PUBLIC_APP_URL="https://mannvayal.ai"

# Weather Providers
WEATHER_API_PROVIDER="OPEN_METEO_WITH_IMD_FALLBACK"
OPEN_METEO_BASE_URL="https://api.open-meteo.com/v1"

# LLM Advisor Configuration (Optional external LLM)
# If empty, the built-in verified TNAU offline knowledge base responds automatically.
GEMINI_API_KEY=""

# Production Environment
NODE_ENV="production"
```

---

## 3. PostgreSQL Migration Step

When deploying to PostgreSQL, update `prisma/schema.prisma` datasource:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Then run:
```bash
npx prisma migrate deploy
node scripts/seed.mjs
```

---

## 4. Docker Deployment

A production `Dockerfile` can be built using:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 5. Security Checklist Before Launch

1. **SSL/HTTPS**: Ensure HTTPS redirection and HSTS headers are enabled.
2. **Session Cookies**: In production, `mv_session` is set with `secure: true`, `httpOnly: true`, and `sameSite: "lax"`.
3. **Rate Limiting**: Protect authentication endpoints (`/api/auth/login`, `/api/auth/register`) with an API gateway or middleware rate limiter.
4. **Data Isolation**: Verify that farm IDs in route handlers are always verified against `session.id` to prevent insecure direct object reference (IDOR).
