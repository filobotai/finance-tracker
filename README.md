# Finance Tracker

Minimal personal finance tracker (mobile‑first) built for Vercel.

## Stack

- Next.js (App Router) + TypeScript
- TailwindCSS
- Auth.js / NextAuth (Google OAuth)
- Prisma + Postgres (Supabase)

## Local dev

1) Install deps

```bash
npm install --legacy-peer-deps
```

2) Configure env

```bash
cp .env.example .env
```

Fill:
- `DATABASE_URL` / `DIRECT_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `ALLOWED_EMAILS` (optional allowlist)

3) Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

4) Run

```bash
npm run dev
```

## Data model

Transactions are stored in **cents** (integer) with `currency=EUR` for now.
The schema is ready to add more currencies later.
