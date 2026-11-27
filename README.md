# Maulana Ahmad Maliki — Portfolio & Admin Dashboard (`lanaahm.github.io`)

Personal portfolio website hosted on **GitHub Pages** (`https://lanaahm.github.io/`) with an integrated **Supabase-backed Admin Dashboard** for managing career history, certifications, skills, portfolio projects, and site settings.

## Tech Stack
- **Frontend:** React 18, TypeScript (`strict: true`), React Router v6, Redux Toolkit, SCSS
- **Backend & Storage:** Supabase (PostgreSQL + RLS, Auth, Storage, Postgres RPC)
- **Contact Form:** EmailJS (`@emailjs/browser`)
- **Charts & UI:** `chart.js`, `react-chartjs-2`, `react-circular-progressbar`, `react-icons`
- **Performance:** 1x Supabase RPC (`get_home_payload`), `localStorage` SWR cache, build-time static snapshot (`homeSnapshot.json`), `preconnect` hints, and `Cache-Control: 86400` on Storage uploads

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Configure environment variables:**
   Copy `.env.example` to `.env` (`.env` is gitignored and must never be committed):
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase & EmailJS values from **Supabase Dashboard -> Project Settings -> API**:
   ```env
   REACT_APP_SUPABASE_URL=https://<project-ref>.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=<your-anon-public-key>
   REACT_APP_SUPABASE_STORAGE_BUCKET="lanaahm's Bucket"

   REACT_APP_EMAILJS_SERVICE_ID=<your-service-id>
   REACT_APP_EMAILJS_TEMPLATE_ID=<your-template-id>
   REACT_APP_EMAILJS_PUBLIC_KEY=<your-public-key>
   ```
3. **Run locally:**
   ```bash
   npm start
   ```

## Available Scripts
- `npm start` — Start local dev server (`http://localhost:3000`)
- `npm run typecheck` — Run strict TypeScript check (`tsc --noEmit`)
- `npm test` — Run Jest + React Testing Library unit tests
- `npm run snapshot` — Refresh `src/config/snapshot/homeSnapshot.json` from Supabase RPC
- `npm run build` — Runs `prebuild` snapshot + creates optimized production bundle in `build/`
- `npm run deploy` — Manual deploy of `build/` to `main` branch via `gh-pages`

---

## Deploying to GitHub Pages (Safe Supabase Credential Setup)

### Security Model (Why `ANON_KEY` is Safe, and What Must Never Be Exposed)
- **Safe in GitHub Pages (`REACT_APP_SUPABASE_ANON_KEY`):** Designed for browser clients. Security is enforced at the database & storage layer via **Supabase Row Level Security (RLS)**:
  - Public (`anon`) can **only `SELECT`** public portfolio tables & read public Storage objects.
  - Only **authenticated** admin users (signed in via Supabase Auth at `/login`) can `INSERT`, `UPDATE`, or `DELETE` records or upload files.
- **NEVER expose `SUPABASE_SERVICE_ROLE_KEY`:** Never put the service role key in `.env` as `REACT_APP_*` or in GitHub Actions build env vars, because CRA inlines all `REACT_APP_*` variables into the public JS bundle.

### Option A — Automated Deploy via GitHub Actions (Recommended)
This repository includes `.github/workflows/deploy.yml`, which automatically runs `typecheck`, `test`, `prebuild` snapshot, `build`, adds `404.html` SPA fallback, and publishes `build/` to the `main` branch.

1. Open your GitHub repository -> **Settings -> Secrets and variables -> Actions -> New repository secret**.
2. Add these 6 secrets:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_SUPABASE_STORAGE_BUCKET` (`lanaahm's Bucket`)
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`
3. Open **Settings -> Pages**:
   - **Source:** **GitHub Actions** *(no force-push to protected `main` branch required)*
4. Push to `development` (or trigger **Actions -> Build & Deploy to GitHub Pages -> Run workflow**).

### Option B — Manual Local Deploy (`gh-pages`)
Ensure `.env` is configured locally and you are on the `development` branch (never `main`), then run:
```bash
npm run typecheck && CI=true npm test -- --watchAll=false && npm run deploy
```

---

## Routes
- `/` — Public Portfolio (Header, About + Certifications Preview, Career Journey + Detail Modal, Technical Skills, Portfolio, Contact, Footer)
- `/login` — Supabase Auth Admin Login
- `/dashboard` — Protected Overview Dashboard
- `/dashboard/experience` — CRUD for Career History, Certifications, and Technical Skills
- `/dashboard/portfolio` — CRUD for Portfolio Projects
- `/dashboard/settings` — Profile, Bio, Socials, CV PDF Upload, and Career Timeline Orientation (`horizontal` / `vertical`)
- `/error/:code` & `*` — Dynamic HTTP Error Page (`404`, `403`, `500`, etc.)
