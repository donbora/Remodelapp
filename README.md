# Rental Remodel Package — Seattle, WA

Interactive remodel cost estimator for multi-family rental property investors. Built with React + Vite.

## Features
- 3 remodel tiers: Cosmetic Refresh, Standard Upgrade, Full Renovation
- 8 selectable categories with Seattle-area pricing
- ROI projections (payback period, year 1 ROI, 5-year return)
- Adjustable unit count (1–6 units)

## Deploy to Vercel

### Option A: Deploy via Vercel CLI (fastest)
```bash
npm install
npx vercel
```
Follow the prompts — Vercel auto-detects Vite and configures everything.

### Option B: Deploy via GitHub
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" → Import your repo
4. Vercel auto-detects Vite — just click "Deploy"
5. You'll get a live URL in ~60 seconds

### Option C: Deploy via drag-and-drop
```bash
npm install
npm run build
```
Then drag the `dist/` folder to [vercel.com/new](https://vercel.com/new)

## Local Development
```bash
npm install
npm run dev
```
Opens at http://localhost:5173
