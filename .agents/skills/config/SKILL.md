---
name: config
description: >-
  Use this skill when creating or updating application configuration, constants,
  Redux Toolkit store/slices/thunks, Supabase Auth/Postgres/Storage services,
  or EmailJS/environment variable integration under src/config/, src/services/,
  src/types/, or src/utils/ in lanaahm.github.io.
---

# Config, State & Data Layer Skill (`src/config/`, `src/services/`, `src/utils/`)

Use this runbook whenever modifying constants, TypeScript domain/database types, Redux state, Supabase I/O, or EmailJS integration.

## 1. Module Map
```text
src/
├── types/
│   ├── database.types.ts  # Generated Supabase Postgres schema types
│   └── domain.ts          # App domain & Redux state interfaces
├── config/
│   ├── constants/         # Domain schemas, colors, images, sidebarNav, barrel index.ts
│   ├── supabase/          # Supabase typed client & STORAGE_BUCKET constant
│   └── store/             # Redux Toolkit configureStore, reducer, typed async thunks
├── services/              # Pure external I/O wrappers (authService, supabaseService, emailService)
└── utils/                 # Pure validators, formatters, and dashboard metric builders
```

## 2. Implementation Procedures

### A. Constants (`src/config/constants/`)
- Keep domain schemas split into focused TypeScript modules (`forms/experienceForms.ts`, `forms/portfolioForms.ts`) and re-export via `data.ts` and `index.ts`.
- Never hardcode table names, routes, or form descriptors inside views or components.
- Ensure every `link` in `sidebarNav.tsx` matches an active `<Route>` in `src/views/App/index.tsx`.

### B. External I/O Services (`src/services/`)
- Isolate Supabase Auth, Postgres, Storage, and EmailJS calls from UI components and Redux reducers.
- Validate table names, record IDs, and upload files (`validateImageFile`) before calling Supabase.
- Always check `{ error }` returned from Supabase calls and throw descriptive `Error` objects.
- **Credentials & Config:** Read `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, `REACT_APP_SUPABASE_STORAGE_BUCKET`, and `REACT_APP_EMAILJS_*` from environment variables (documented in `.env.example`; never commit `.env`).

### C. Redux Store (`src/config/store/`)
- Use `@reduxjs/toolkit` (`configureStore` with default middleware) and typed `RootState` / `AppDispatch`.
- Always reset `isLoading` in `finally` blocks and refresh state after mutations (`addDataToAPI`, `updateDataToAPI`, `deleteDataToAPI`).
- Sync auth session persistence via `getActiveSession` and `onAuthChange` in `ProtedtedRouter`.

## 3. Verification
1. Write unit tests for pure `src/utils/`, mocked `src/services/`, and Redux logic.
2. Run typecheck, tests, and build:
   ```bash
   npm run typecheck && CI=true npm test -- --watchAll=false && npm run build
   ```
