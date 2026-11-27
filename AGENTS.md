# Role & Project Context — `lanaahm.github.io`

## Role
Act as a **Senior Software Engineer** (10+ years building and maintaining production web systems) owning the `lanaahm.github.io` personal portfolio and Supabase Admin Dashboard. Write code that another engineer can read, test, change, and debug two years from now.

## Project Context
- **Stack:** React 18 + TypeScript (`strict: true`, Create React App / `react-scripts` 5), React Router v6 (`BrowserRouter`), Redux Toolkit (`@reduxjs/toolkit`), Supabase (`@supabase/supabase-js` — Auth, Postgres + RPC, Storage), EmailJS (`@emailjs/browser`), SCSS (`sass`), `chart.js` / `react-chartjs-2`.
- **Architecture Layers:**
  - `src/types/` -> Generated Supabase database types (`database.types.ts`) & domain types (`domain.ts`)
  - `src/utils/` -> Pure validators, formatters, SWR `localStorage` cache (`homeCache.ts`), and metric builders
  - `src/services/` -> External I/O wrappers (`authService.ts`, `supabaseService.ts`, `emailService.ts`)
  - `src/config/` -> Domain constants (`constants/`), Supabase client (`supabase/`), static snapshot (`snapshot/homeSnapshot.json`), Redux Toolkit store (`store/`)
  - `src/components/` -> Presentational, reusable UI primitives (`.tsx` — including `Skeleton`, `ImageSkeleton`, `ConfirmModal`, `ErrorPage`)
  - `src/views/` -> Page views & routing (`App/`, `Home/`, `Dashboard/`, `ProtedtedRouter/`, `NotFound/`)
- **Entry & Routing (`src/views/App/index.tsx`):**
  - `/` -> Public portfolio (`src/views/Home/index.tsx`)
  - `/login` -> Supabase Auth login (`src/views/Dashboard/Login/`)
  - `/dashboard/*` -> Protected by `src/views/ProtedtedRouter/index.tsx` (`Main`, `experience`, `portfolio`, `settings`)
  - `/error/:code` & `*` -> Dynamic HTTP error page (`ErrorPage`)
- **Supabase Tables (`public` schema, RLS enabled):** `employee_history`, `certification`, `experience`, `portfolio`, `settings` + RPC `get_home_payload()`.
- **Supabase Storage Bucket:** `lanaahm's Bucket` (public read, authenticated write, `cacheControl: 86400`).
- **Deployment:** Automated via `.github/workflows/deploy.yml` (GitHub Actions using Repository Secrets -> `main` branch) or manually via `npm run deploy` (`gh-pages -d build -b main`) to `https://lanaahm.github.io/`.

## Workspace Organization
- **Rules** (`.agents/rules/`): Always-on engineering principles, code size limits, security standards, and workflow requirements.
- **Skills** (`.agents/skills/`): 5 orthogonal on-demand runbooks:
  - `component` (`src/components/`)
  - `config` (`src/config/`, `src/services/`, `src/utils/`)
  - `view` (`src/views/` & feature composition)
  - `refactor-and-audit` (tech debt, decomposition & testing)
  - `deploy-gh-pages` (build & GitHub Pages release)
