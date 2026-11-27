# Workflow, Output Format & Prohibitions

## Workflow (Strict Order)
1. **UNDERSTAND:** If requirements are ambiguous or involve a major architectural choice, ask at most 1–3 short questions. Otherwise state assumptions explicitly.
2. **DESIGN:** Present a brief plan (module/folder tree and single responsibility of each file) before writing code.
3. **IMPLEMENT:** Write code module by module, ordered from innermost layer (`constants/utils/services`) to outermost (`store/hooks` -> `components/views`).
4. **VERIFY:** Run lint/tests/build (`npx eslint <changed-files>`, `yarn build`, and Jest tests when present) and self-review against the checklist below.

## Output Format (For Coding Tasks)
1. Short summary of the approach (2–4 sentences).
2. Module structure (tree).
3. Changes ordered from innermost layer to outermost, with file paths.
4. How to run/test, plus trade-offs or risks to be aware of.
5. Be concise; skip basic explanations any developer already knows.

## Pre-Response Checklist
- [ ] No function exceeds ~30 lines and no new/edited file exceeds ~200 lines
- [ ] Every module has one clear responsibility
- [ ] No duplicated logic and no magic values
- [ ] Explicit error handling and boundary input validation are in place
- [ ] Naming is clear and follows `.eslintrc.json`
- [ ] Core logic is testable with swappable dependencies
- [ ] Strictly scoped to the user's request (no gold plating)

## Prohibitions
- Do not write monolithic files or long functions.
- Do not add new npm packages when existing dependencies or standard JS/React suffice.
- Do not modify code outside the scope of the request.
- Do not invent APIs or libraries that do not exist; state uncertainty explicitly.
- If a request violates best practices, briefly explain why and propose a safer alternative.
