# D2C Dispute Portal · UI Revamp Handover

Goal: re-skin the existing React + Vite POC (`d2c-dispute-portal`) so it looks like it belongs to
**Equifax India** (equifax.co.in + the D2C portal at d2c.equifax.co.in), and so it looks designed by a
person, not generated. **Behaviour does not change.** State, logic and service files are frozen.

Sources studied (2026-10-03): the POC source (all 1,250 lines), https://www.equifax.co.in/personal,
the Customer Grievance Redressal and Free Credit Report support pages, and the public D2C login page.

## Read in this order

| # | File | What it gives you |
|---|------|-------------------|
| 1 | [01-current-state-audit.md](01-current-state-audit.md) | What the POC is today: screens, components, CSS, and exactly which things read as "AI-made" |
| 2 | [02-brand-extraction.md](02-brand-extraction.md) | Equifax India palette, type, layout habits, voice, asset URLs, with measured values |
| 3 | [03-design-system.md](03-design-system.md) | Tokens, type scale, spacing, and the spec for every component |
| 4 | [04-screen-specs.md](04-screen-specs.md) | Per-screen layout, content and states for all 11 screens + prototype bar |
| 5 | [05-human-not-ai-guide.md](05-human-not-ai-guide.md) | Rules and a grep-able checklist so the result doesn't look generic |
| 6 | [06-copy-deck.md](06-copy-deck.md) | Voice rules and replacement copy, screen by screen |
| 7 | [07-implementation-plan.md](07-implementation-plan.md) | Phases, file ownership, parallelisation, acceptance criteria, QA |
| - | [tokens.css](tokens.css) | Ready-to-use CSS custom properties (drop into `src/styles/tokens.css`) |
| - | [agents/](agents/) | One self-contained brief per worker agent |

## Hard constraints (apply to every agent)

1. Do **not** change logic in `src/state/*`, `src/lib/*`, `src/services/*`, `src/data/*`. Class names, markup and CSS are fair game.
   **One exception:** the copy agent (agents/06) may edit *display strings only* in `src/data/sampleData.js`
   (`SCENARIOS`, `CASE_STAGES`, `SEED_CASES` titles) and in `src/state/DisputeContext.jsx` (toast / title template literals).
   No shapes, keys, conditions or control flow change. Everything is reviewed as a string-only diff.
2. Keep every screen reachable from `PrototypeNav` and keep all `actions.*` calls and their behaviour.
3. No new runtime dependencies except fonts. (Open Sans via Google Fonts link, same as today's mechanism.)
4. No gradients, no drop-shadow glows, no emoji, no icon-in-coloured-circle decoration (see guide 05).
5. Every colour, size and radius comes from `tokens.css`. No raw hex in component CSS.
6. Must pass `npm run build` and the checklist in 07 before a task is "done".

## Things to confirm with the friend / client before shipping

- **Logo and asset use.** The wordmark and photography are Equifax property. Fine for a client POC they
  commissioned; confirm. Assets are listed as remote URLs in 02; nothing has been downloaded yet.
- **Real in-portal screens.** The D2C dashboard is behind login, so only the public login page was observed.
  If your friend can share 3-4 screenshots of the logged-in dashboard and report page, section 5 of 02 should
  be re-checked against them. The tokens are shared across the site and portal, so the risk is low.
- **Placeholder brand.** The POC says "Credit Bureau India". Plan assumes it becomes "Equifax" everywhere.
- **Score range.** The plan draws the score as a 300-900 gauge. Confirm the range with the client.
