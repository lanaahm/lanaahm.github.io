---
name: view
description: >-
  Use this skill when creating, modifying, or routing page-level views or
  end-to-end features under src/views/ — including App routing, Home public
  portfolio sections, Dashboard CRUD pages (Main, Experien, Portfolio, setting,
  Login), ProtedtedRouter, and NotFound in lanaahm.github.io.
---

# Page Views, Routing & Feature Composition Skill (`src/views/`)

Use this runbook when adding or updating public portfolio sections, Admin Dashboard CRUD views, layouts, or routes.

## 1. Module Map
```text
src/views/
├── App/                   # Root router, Redux Provider, global SCSS
├── Home/                  # Public portfolio + sections (Header, Nav, About, Experience, Portfolio, Contact, Footer)
├── Dashboard/             # Admin shell (MainLayout, TopNav, Sidebar) + pages (Main, Experien, Portfolio, setting, Login)
├── ProtedtedRouter/       # Route guard protecting /dashboard/*
└── NotFound/              # 404 fallback route
```

## 2. Feature & View Composition Procedure
1. **Design top-down, implement bottom-up:**
   - Constants/schema in `src/config/constants/` -> pure helpers in `src/utils/` -> I/O in `src/services/` -> Redux state in `src/config/store/` -> UI in `src/components/` -> page assembly in `src/views/`.
2. **Keep Views Thin (`<= 200` lines):**
   - Route-level `index.jsx` handles layout, data subscription lifecycle, and state wiring only.
   - Move view-specific UI pieces to `src/views/<View>/components/` and reusable UI to `src/components/`.
   - Move validation, grouping, and metric calculations into pure functions in `src/utils/` (`<= 30` lines each).
3. **Routing (`src/views/App/index.jsx`):**
   - Nest all admin routes inside `<Route path="dashboard" element={<ProtedtedRouter><Dashboard /></ProtedtedRouter>}>`.
   - Keep `<Route path="*" element={<NotFound />} />` last.
   - Keep `src/config/constants/sidebarNav.jsx` strictly in sync with active dashboard routes (no dead links).
4. **Data Lifecycle & UX States:**
   - Subscribe/fetch in `useEffect` with accurate dependency arrays and clean up `onSnapshot` listeners on unmount.
   - Render explicit loading, empty, and error states; never swallow errors silently.
5. **Styling & ESLint:**
   - Use arrow-function components (`react/function-component-definition: arrow-function`) and SCSS (`src/scss/abstracts/`) — do not introduce `styled-components`.

## 3. Verification
1. Confirm all routes and sidebar links resolve cleanly.
2. Add/update unit tests for view helpers and key render states.
3. Run lint, tests, and build:
   ```bash
   npx eslint src/views/<TargetView> && CI=true yarn test --watchAll=false && yarn build
   ```
