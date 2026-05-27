# Samson Keys — Setup Guide

## What you have

A full Next.js 14 app with:
- Public site: Home (listings grid), About, Apply, Contact
- Admin dashboard at /admin: Listings, Ads, Applications, Messages
- Google login (only your email gets in)
- Cloudinary image uploads
- Supabase database
- Ready to deploy on Vercel in one click

---

## Step 1 — Supabase (database)

1. Go to https://supabase.com and create a free account
2. Create a new project (pick any region, save your DB password)
3. Once the project loads, go to **SQL Editor**
4. Open the file `supabase-schema.sql` from this folder
5. Paste the entire contents into the SQL editor and click **Run**
6. Go to **Project Settings > API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2 — Google OAuth

1. Go to https://console.cloud.google.com
2. Create a new project (or use an existing one)
3. Go to **APIs & Services > OAuth consent screen**
   - Choose External, fill in app name (Samson Keys), your email
4. Go to **APIs & Services > Credentials > Create Credentials > OAuth Client ID**
   - Application type: Web application
   - Authorised redirect URIs: add `http://localhost:3000/api/auth/callback/google`
   - Also add your Vercel URL later: `https://yourdomain.vercel.app/api/auth/callback/google`
5. Copy **Client ID** → `GOOGLE_CLIENT_ID`
6. Copy **Client Secret** → `GOOGLE_CLIENT_SECRET`

---

## Step 3 — Cloudinary (image uploads)

1. Go to https://cloudinary.com and create a free account
2. From your dashboard copy:
   - Cloud name → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - API Key → `CLOUDINARY_API_KEY`
   - API Secret → `CLOUDINARY_API_SECRET`

---

## Step 4 — Environment variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in all values from the steps above
3. For `NEXTAUTH_SECRET`, run this in your terminal:
   ```
   openssl rand -base64 32
   ```
4. For `ADMIN_EMAILS`, put your Gmail address (the one you log in with)

---

## Step 5 — Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — public site
Open http://localhost:3000/admin — admin dashboard

---

## Step 6 — Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to https://vercel.com and click **Add New Project**
3. Import your GitHub repo
4. Under **Environment Variables**, add every variable from your `.env.local`
5. Click **Deploy**
6. Once deployed, go back to Google Cloud Console and add your Vercel URL to the OAuth redirect URIs

Done. Your site is live.

---

## How the admin works

### Listings
- Click **+ Add listing** to create a new one
- Upload an image directly from your computer (goes to Cloudinary automatically)
- Set category, badge, price, pieces total/sold
- Toggle **Active** to show or hide on the public site

### Ads
- All ad slots are completely invisible until a visitor hovers over them
- Add banner ads (top strip) or sidebar ads (right column)
- Control sort order to decide which appears first

### Applications
- Every submission from the Apply page appears here
- Read the pitch, then Approve or Reject with one click

### Messages
- Every Contact form submission appears here
- Click **Reply via email** to respond directly from your mail client

---

## File structure

```
/app
  page.tsx              ← Home (listings grid)
  /about/page.tsx       ← About page
  /apply/page.tsx       ← Apply page
  /contact/page.tsx     ← Contact page
  /admin
    page.tsx            ← Dashboard
    /listings/page.tsx  ← Manage listings
    /ads/page.tsx       ← Manage ads
    /applications       ← Review applications
    /messages           ← Read contact messages
  /api
    /listings           ← CRUD API
    /ads                ← CRUD API
    /applications       ← CRUD API
    /contact            ← CRUD API
    /upload             ← Cloudinary upload
    /auth               ← Google login

/components
  /public               ← Nav, Footer, ListingCard, AdSlot, CategoryFilter
  /admin                ← AdminNav

/lib
  supabase.ts           ← DB client
  auth.ts               ← NextAuth + Google
  cloudinary.ts         ← Image upload helper

/types/index.ts         ← All TypeScript types
supabase-schema.sql     ← Run this in Supabase once
```
