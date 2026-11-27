---
name: deploy-gh-pages
description: >-
  Use this skill when building, verifying, or deploying lanaahm.github.io to
  GitHub Pages via GitHub Actions or gh-pages.
---

# GitHub Pages Build & Deploy Runbook

Use this skill before deploying or modifying CI/CD for `https://lanaahm.github.io/`.

## Pre-Deploy Checklist
1. **Check Git state & ignored secrets:**
   - Confirm you are on `development` (never `main`, which holds compiled `build/` output).
   - Confirm `.env` is untracked/ignored (never staged):
     ```bash
     git status -sb
     ```
2. **Verify Credentials Policy:**
   - Only `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, `REACT_APP_SUPABASE_STORAGE_BUCKET`, and `REACT_APP_EMAILJS_*` may be passed to the build.
   - **NEVER** pass `SUPABASE_SERVICE_ROLE_KEY` into `REACT_APP_*` or frontend bundles.
   - Verify RLS is enabled on all 5 `public.*` tables and `storage.objects` before publishing.
3. **Typecheck, Test & Build (including Snapshot):**
   ```bash
   npm run typecheck && CI=true npm test -- --watchAll=false && npm run build
   ```
   Confirm `prebuild` (`scripts/generate-snapshot.mjs`) refreshes `src/config/snapshot/homeSnapshot.json` and `build/` compiles with zero errors.
4. **SPA Fallback Verification:**
   - `.github/workflows/deploy.yml` copies `build/index.html` to `build/404.html` so direct refreshes on `/login`, `/dashboard/*`, and `/error/:code` work on GitHub Pages.

## Deploy Paths
- **Automated (Recommended):** Push to `development` (or run **Actions -> Build & Deploy to GitHub Pages**) using GitHub Repository Secrets.
- **Manual (only when user explicitly requests):**
  ```bash
  npm run deploy
  ```
  (`predeploy` runs `npm run build`, then `gh-pages -d build -b main` publishes `build/` to `main`.)
