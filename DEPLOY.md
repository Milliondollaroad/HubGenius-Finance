# HubGenius Finance — Deployment Guide

## Tech stack
- React 18 + Vite
- React Router v6
- Hosted on Vercel (free)
- Domain: hubgenius.finance (Porkbun)

## Deploy to Vercel (Step by step)

### Step 1 — Push to GitHub
1. Go to github.com → New repository
2. Name it `hubgenius-finance` → Private → Create
3. Upload all files from this folder

### Step 2 — Connect Vercel
1. Go to vercel.com → Sign up with GitHub
2. Click "Add New Project"
3. Select `hubgenius-finance` repository
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click "Deploy"

Your site is now live on a vercel.app URL.

### Step 3 — Connect hubgenius.finance domain
In Vercel → Your project → Settings → Domains:
1. Add `hubgenius.finance`
2. Vercel shows you DNS records to add

In Porkbun → your domain → DNS:
Add these records from Vercel:
- Type: A     | Host: @  | Value: 76.76.21.21
- Type: CNAME | Host: www | Value: cname.vercel-dns.com

DNS propagates in 5-60 minutes.

### Step 4 — Add Stripe (when ready to charge)
1. Create account at stripe.com
2. Get your publishable key and secret key
3. Add to Vercel environment variables:
   - VITE_STRIPE_KEY = pk_live_...
4. Install: npm install @stripe/stripe-js
5. Wire up the "Start Pro" button to Stripe Checkout

### Step 5 — Add Supabase auth (when ready)
1. Create project at supabase.com (free)
2. Get your URL and anon key
3. Add to Vercel environment variables:
   - VITE_SUPABASE_URL = https://xxx.supabase.co
   - VITE_SUPABASE_KEY = your-anon-key
4. Install: npm install @supabase/supabase-js

## Local development
```bash
npm install
npm run dev
```
Opens at http://localhost:5173

## Build for production
```bash
npm run build
```
Output in /dist folder.

Built by HubGenius Finance — hubgenius.finance
