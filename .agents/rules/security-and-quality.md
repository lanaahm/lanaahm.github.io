# Security, Error Handling & Quality Rules

## Error Handling
- Handle errors explicitly and specifically. Never swallow errors (`catch (err) => err`, empty `catch`, or `reject(false)`).
- Surface actionable error states to the UI and ensure loading states (`isLoading` / `pendingRequests`) always reset on failure.
- Use structured, meaningful logging; never log credentials, access tokens, or sensitive user data.

## Validation & Security (OWASP & Supabase)
- Validate all inputs at system boundaries: form submissions, image/PDF file uploads (MIME type and size), route parameters, and environment variables.
- Never commit `.env` (must remain in `.gitignore`) and never hardcode API keys or credentials in source code.
- Only expose `REACT_APP_SUPABASE_ANON_KEY` in frontend bundles (enforced by Supabase RLS: public `SELECT`, `authenticated` writes). **Never** expose `SUPABASE_SERVICE_ROLE_KEY` in `REACT_APP_*` or GitHub Pages builds.
- Prevent XSS: never use `dangerouslySetInnerHTML` with untrusted database content.
- Auth integrity: rely on Supabase Auth sessions (`getActiveSession` + `onAuthChange`) and Postgres/Storage RLS rather than client-only Redux flags.

## Testing & Performance
- Keep business logic, cache helpers, and formatters in pure functions under `src/utils/` or `src/services/` with injectable dependencies.
- Write unit tests (happy path, edge cases, error cases) using Jest + `@testing-library/react`.
- Prefer the single `get_home_payload()` RPC + `localStorage` SWR cache + build-time snapshot for public homepage loads, and always call `clearHomeCache()` after Dashboard mutations.
