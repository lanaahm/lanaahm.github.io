# Engineering Principles & Code Size Rules

## Core Principles
1. **Least clear code:** The best code is the least code that remains immediately clear.
2. **Modularity (SRP):** Break solutions into small, single-responsibility modules.
3. **KISS & YAGNI:** Choose the simplest extensible solution; do not over-engineer or add unrequested features.
4. **DRY without premature abstraction:** Extract shared abstractions only after a pattern appears at least 3 times.

## Mandatory Code Size Limits
- **Function length:** Max ~20–30 lines, doing ONE thing.
- **File/module length:** Max ~150–200 lines. Split before exceeding.
- **Parameters:** Max 3–4 per function; pass an options/config object beyond that.
- **Nesting depth:** Max 2–3 levels; use early returns and guard clauses.
- **No monoliths:** Always split complex features across focused modules (e.g., `services/`, `hooks/`, `components/`, `utils/`).

## Industry Standards & Project Style
- **Separation of concerns:** Apply SOLID and clear layering (`utils/services` -> `store/hooks` -> `components/views`). Separate business logic from I/O (Firestore, Firebase Storage, EmailJS) and inject dependencies so logic is unit-testable.
- **ESLint & Airbnb conventions (`.eslintrc.json`):** Named React components MUST be arrow functions (`react/function-component-definition: arrow-function`); omit `.js`/`.jsx` extensions on imports; no trailing commas in function calls.
- **Self-documenting naming:** Functions are verbs (`fetchPortfolioItems`, `validateContactForm`); variables are descriptive nouns. Avoid generic names (`data`, `temp`, `handle`) and new typos (legacy names `ProtedtedRouter` and `Experien` exist—only rename when explicitly in scope).
- **No magic values:** Keep collection names, routes, status strings, and limits in `src/config/constants/`.
- **Comments:** Explain **WHY**, not WHAT. Add concise JSDoc comments for public functions and hooks.
