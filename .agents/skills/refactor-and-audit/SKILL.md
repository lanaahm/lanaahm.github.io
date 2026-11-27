---
name: refactor-and-audit
description: >-
  Use this skill when refactoring legacy components, splitting oversized files,
  resolving technical debt, or adding Jest/React Testing Library unit tests in
  lanaahm.github.io.
---

# Refactor & Technical Debt Audit Workflow

Use this skill to safely modernize `lanaahm.github.io` without breaking existing portfolio or dashboard behavior.

## Known Tech Debt Backlog (Reference)
1. **Dead sidebar link:** `src/config/constants/sidebarNav.jsx` points to `/stats`, which has no matching route in `src/views/App/index.jsx`.
2. **Firestore `onSnapshot` & unawaited CRUD:** `src/config/store/action/index.jsx` dispatches inside `forEach`, ignores snapshot errors, omits unsubscribe cleanup, and does not `await` write promises.
3. **In-memory auth state:** `src/views/ProtedtedRouter/index.jsx` loses login state on reload because Firebase `onAuthStateChanged` is not wired.
4. **Hardcoded credentials:** `src/config/firebase/index.jsx` and `src/views/Home/components/Contact/index.jsx` hardcode config/IDs instead of reading `REACT_APP_*` env vars.
5. **Legacy typos:** `ProtedtedRouter`, `Experien`, `Dashboad__Container` (rename only when explicitly requested, updating all imports/routes together).

## Refactoring Procedure
1. **Scope tightly:** Only touch files directly related to the requested refactor. Do not mix unrelated renames with behavioral fixes.
2. **Characterize before changing:** Inspect callers via `codebase-memory` (`search_graph` / `trace_path`) and add or verify unit tests for existing behavior first.
3. **Decompose cleanly:**
   - Extract pure logic (grouping, sorting, form validation) into `utils/` modules (`<= 30` lines per function).
   - Extract data fetching / subscriptions into custom hooks or service modules.
   - Split any component file over ~200 lines into subcomponents inside the same feature directory.
4. **Verify:**
   - Run targeted tests: `CI=true yarn test --watchAll=false` (if tests exist).
   - Run ESLint on modified files: `npx eslint <modified-files>`.
   - Run production build: `yarn build`.
