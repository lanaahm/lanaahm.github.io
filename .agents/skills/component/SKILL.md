---
name: component
description: >-
  Use this skill when creating, modifying, refactoring, or testing reusable UI
  components under src/components/ (such as badge, box, Button, card,
  dashboard-wrapper, dropdown, modal, summary-box, table, or new shared UI
  primitives) in lanaahm.github.io.
---

# Reusable Component Skill (`src/components/`)

Use this procedure whenever adding or updating shared UI components in `src/components/`.

## 1. Directory & Naming Conventions
Match the existing `src/components/` layout:
```text
src/components/<kebab-case-name>/
├── <PascalCaseName>.jsx
├── <kebab-case-name>.scss
└── <PascalCaseName>.test.jsx   # Unit tests for core component behavior
```
- Existing shared components: `badge`, `box`, `Button`, `card`, `dashboard-wrapper`, `dropdown`, `modal`, `summary-box`, `table`.
- Check existing components before creating a new one to avoid duplication.

## 2. Design & Implementation Rules
1. **Pure & Presentational (SRP):** Components in `src/components/` must NOT call Firebase, EmailJS, or Redux directly. Receive data and callbacks via props so they remain reusable and testable.
2. **Arrow-Function Components:** Define named components as arrow functions (`const MyComponent = ({ ... }) => { ... };`) to satisfy `.eslintrc.json`.
3. **Props & Defaults:** Keep props concise (destructured object; avoid > 4 unrelated positional args in helpers). Guard optional props safely (e.g., `bodyData = []`) so rendering never throws on empty/undefined data.
4. **Styling:** Scope styles in the sibling `<kebab-case-name>.scss` file and reuse shared variables/mixins from `src/scss/abstracts/` (`@use '../../scss/abstracts/' as *;`).
5. **Accessibility & Keys:**
   - Use semantic `<button type="button">` instead of clickable `<div>` elements.
   - Always supply stable `key` props on mapped elements (avoid missing keys or unstable array indices when IDs exist).
6. **Size Limits:** Keep component files `<= 200` lines and helper functions `<= 30` lines. Extract pagination, filtering, or formatting logic into pure helper functions if the component grows.

## 3. Verification
1. Write/update unit tests covering default render, empty/edge props, and user interactions (`@testing-library/react`).
2. Run lint and build:
   ```bash
   npx eslint src/components/<kebab-case-name> && yarn build
   ```
