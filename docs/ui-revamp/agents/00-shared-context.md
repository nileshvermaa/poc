# Shared context for every revamp agent

Project: `d2c-dispute-portal` (React 18 + Vite, no router, no UI library). Revamp its UI to Equifax India's
look. Read first, in order: `../README.md`, `../03-design-system.md`, your screen section in `../04-screen-specs.md`,
`../05-human-not-ai-guide.md`. Brand facts: `../02-brand-extraction.md`. Strings: `../06-copy-deck.md`.

Rules you must follow:
- Edit only the files your brief lists. Do not touch another agent's files; if you need a shared change, say so in your report.
- No logic changes. Keep prop names, exports, `actions.*` calls, `aria` roles, and `data-` attributes working.
- Styles: tokens from `src/styles/tokens.css` only, no raw hex, class names per 03 (BEM-lite). Keep each CSS file < 400 lines.
- No new dependencies. No gradients, shadows beyond 03, emoji, pills, mono font, uppercase tracking.
- Write the code in the style of the surrounding JSX (function components, hooks, no TypeScript, 2-space indent, single quotes).
- Verify by running `npm run dev` and walking your screens at 1140, 768 and 360 widths. Then run `npm run build`.
- Finish with a report: files changed, spec deviations (with reason), extrapolated components needing client review, gate results.

Definition of done: acceptance criteria in `../07-implementation-plan.md` that apply to your scope.
