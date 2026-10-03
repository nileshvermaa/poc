# Agent 1 · Foundation

Read `00-shared-context.md` first.

## Owns
`src/styles/tokens.css`, `base.css`, `layout.css`, `components.css`, `index.css`, `index.html`, `src/main.jsx`, deletion of `src/styles.css`.

## Tasks
1. Copy `docs/ui-revamp/tokens.css` to `src/styles/tokens.css` unchanged.
2. `index.html`: replace the IBM Plex `<link>` with Open Sans 400/600/700 (`display=swap`, keep the preconnects). Set `<title>` to "My Credit Report · Dispute | Equifax India". Add `<meta name="theme-color" content="#333e48">`.
3. `base.css`: box-sizing, body (`font: var(--fs-body)/var(--lh-body) var(--font)`, colour `--text`, bg `--bg`), headings (charcoal, 700, tight lh, margin 0), links (teal, underline on hover), `:focus-visible` ring using `--focus`, `.sr-only`, table defaults (`font-variant-numeric: tabular-nums`), form control base (inputs, selects, checkbox/radio `accent-color`), `.amount` right-align helper, `prefers-reduced-motion`.
4. `layout.css`: `.container` (max `--container`, padding `--gutter`, 16px under 576), `.page` (vertical rhythm), `.page-head`, `.page-head__rule` (56px × 3px crimson), `.grid-8-4` (8/4 at ≥992, stacked below), `.stack` utilities, sticky-footer shell `.app` (min-height 100vh flex column, content `flex:1`), breakpoints 576/768/992/1200.
5. `components.css`: `.btn` (+ `--outline`, `--secondary`, `--dark`, `--link`, `--danger-text`), `.tag` (+ `--ok`, `--muted`, `--danger`, `--warn`, `--new`), `.message` (+ `--ok`, `--danger`, `--info`), `.block` (+ `--rule`), `.block__head`, `.tabs-text`, `.field` (label/input/help/error), `.check` row, `.stat-line`, `.help-block`. Exactly per 03; hover/focus/disabled states included.
6. `index.css` imports in order: tokens, base, layout, components, chrome, entry, report, forms, submission, prototype. Create the other six files as empty placeholders with a one-line header comment so parallel agents only fill them.
7. `main.jsx`: import `./styles/index.css` instead of `./styles.css`. Delete `src/styles.css` only after Agents 3-6 have ported (until then keep it but **not** imported; Phase 3 agents do not rely on it).
8. Add `docs/ui-revamp/after/.gitkeep` for screenshots.

## Done when
`npm run build` passes; running app shows Open Sans and white page with unstyled-but-sane markup (old classes are no longer styled; that is expected until Phase 3); gate commands 1-6 in `05` find nothing in `src/styles`.
