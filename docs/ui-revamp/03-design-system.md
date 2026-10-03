# 03 · Design system

Tokens: [tokens.css](tokens.css). Source of values: [02](02-brand-extraction.md). Components marked
**(extrapolated)** have no public Equifax equivalent and need client review.

## Principles (in priority order)

1. **Look like Equifax India, not like a SaaS template.** Open Sans, charcoal text, teal actions, crimson used sparingly as a signature.
2. **Utility first.** This is a form-and-table product for people worried about their credit. Dense, ruled, legible tables beat cards.
3. **One accent per view.** Teal means "you can act here". Crimson means "Equifax" (rule lines, one heading word). Never use both on the same element.
4. **Flat and square-ish.** Radius 3-6px, hairline borders, no shadows except the sticky action bar and the login card.
5. **Hierarchy by size and weight, not by boxing everything.**

## Colour usage rules

| Need | Use | Never |
|------|-----|-------|
| Primary action | Teal fill, white text | Crimson button, blue `#1D4ED8` |
| Link | Teal, underline on hover | Charcoal links |
| Heading accent | One crimson keyword in H1 (and only H1) | Crimson entire heading, crimson body text |
| Section/card divider | 3px crimson top rule, on **at most two elements per screen** | Crimson borders on every card |
| Edited row | `--warn-bg` fill + 3px `--warn` left border + "Edited" text label | Orange/crimson (confusable with error) |
| Error | `--danger` text + icon + words, `--danger-bg` | Colour alone |
| Success | `--ok-text` on `--ok-bg`, with words | `--ok` for small text (4.3:1 fails) |
| Disabled | `--disabled` bg/border with `--text-muted` text | `--disabled` as text colour |

## Typography

| Style | Size / weight / lh | Colour | Used for |
|-------|--------------------|--------|----------|
| Display | 42 / 700 / 1.2 | charcoal | `web` hero H1 only |
| H1 | 36 / 700 / 1.2 (28 on <576) | charcoal, one word `--efx-crimson` | Page titles |
| H2 | 28 / 700 | charcoal | Section titles |
| H3 | 20 / 700 | charcoal | Card/sub-section titles |
| Body | 16 / 400 / 1.55 | `--text` | Paragraphs |
| Label | 14 / 700 | charcoal | Form labels, table headers (sentence case, **no uppercase tracking**) |
| Small | 14 / 400 | `--text-muted` | Helper text, table secondary lines |
| Fine | 12.5 / 400 | `--text-muted` or white on charcoal | Footer, legal, "As reported" captions |

- Numerals: `font-variant-numeric: tabular-nums` on all tables, amounts, counts, case IDs. **No monospace font anywhere.**
- Case IDs: Open Sans 600, `letter-spacing: .02em`, tabular.
- Never uppercase + letter-spacing for decoration. Allowed uppercase: none. (The audit's `.eyebrow`, `.row-head`, `.tag` all drop it.)
- Load: `Open Sans` 400, 600, 700 via Google Fonts `<link>` in `index.html`; replace the IBM Plex link.

## Spacing and layout

- 4px base. Section gap on pages 32px; inside blocks 16-24px; table cell padding 12px 16px.
- Container: `max-width: var(--container)`, side padding `var(--gutter)` (16px under 576).
- Page rhythm: breadcrumb bar, then page head (H1 + one-line lead, left aligned, max 62ch), then content.
- Grids: use **unequal** columns where content differs (e.g. content 8 / aside 4). Equal 3-up only for genuinely equal items.
- Breakpoints: 576 / 768 / 992 / 1200 (Bootstrap, matching the site).

## Components

### Brand
- `Wordmark`: Equifax SVG (crimson) 107×20 on white; white variant on charcoal. Replace `BrandMark` and "Credit Bureau India". Remote URL until local copy approved (02 §6).
- Do not recolour or restyle the logo. Clear space = height of the "E".

### Buttons
| Variant | Spec |
|---------|------|
| Primary | bg teal, text white, 700 16px, radius 4, min-height 44, padding 10×20. Hover: bg white, text + 1px border teal (matches site). Active: bg `--efx-teal-dark`, text white. Focus: `--focus` ring. Disabled: bg `--disabled`, text white at 0.9, `cursor:not-allowed` |
| Outline | transparent, 1px teal border, teal text. Hover: teal fill, white text |
| Secondary | bg `--bg-band`, charcoal text. Hover: charcoal bg, white text |
| Dark | charcoal bg, white text (the site's "Login"); header only |
| Link-button | teal 600, no padding, underline on hover |
| Destructive text | `--danger` 14px, underline on hover, with the word ("Remove") |
Rules: no pills, no icon-only primary buttons, at most one Primary per view region. Icons allowed: chevron for back/forward (text-weight stroke 2).

### Header chrome (**two variants**)
1. **Site header** (`web` screen): replicate the 2-tier layout in 02 §3: wordmark, Personal/Business segment tabs (active white, 3px crimson top border), utility links, second row of section links, search field, charcoal Login button, breadcrumb bar. Non-functional links are plain `<a href="#">` with `onClick` prevented.
2. **Portal header** (all logged-in screens): one white row, bottom hairline `--line`. Left: wordmark + hairline vertical divider + "My Credit Report" (the D2C product name, 14px 600 muted). Centre/right: nav links Home · My Credit Report · Dispute · Track disputes (16px, charcoal; active = 3px crimson **top** border like the site's tabs, bold). Far right: user name text + "Log out" link. **No avatar circle.**
   Mobile <768: wordmark + "Menu" text button opening a simple list. No hamburger icon needed.

### Breadcrumb bar (**both variants**)
Grey-100 band, 14px. Home icon › Section › **Current** (crimson, 700). Replaces the eyebrow label on every screen.

### Footer (**all screens, including login**)
Charcoal bg, white 12.5px. Four link columns on `web`; on portal screens a single compressed row: legal links left, EFX mark + tagline right, copyright line. Copy from 02 §3. Sits after content; when content is short it sticks to the viewport bottom (`min-height: 100vh` flex column).

### Page head
H1 (two-tone), optional lead (16px, `--text-muted`, ≤62ch). Under H1 on key pages, a **3px crimson rule 56px wide** (the site's small crimson rule over card titles). Used on H1 only.

### Section block (replaces generic card)
White, 1px `--line` border, radius 0-6px (use `--radius-lg`), padding 24. Optional 3px crimson top rule (max two per screen: the primary block and the case-ID block). Block title is H2/H3. Not nested: never a card within a card; use a bordered group with a `--bg-subtle` header strip instead.

### Table (read-only, e.g. tradelines, enquiries)
Full width, no outer card padding. Header row `--bg-subtle`, 14px 700 charcoal, bottom border 1px `--line-strong`. Rows 1px `--line` separators, 12×16 padding, **no zebra**, hover `--bg-subtle`. Numbers right-aligned tabular. Row action is a text link ("Dispute this account"). Horizontal scroll wrapper on <768 with a visible shadow-free scroll hint (fine text "Scroll sideways").

### Status tag (replaces pills) (extrapolated)
Rectangular, radius 3, 12.5px 600, padding 2×8, always text. Current → `--ok-text` on `--ok-bg`; Closed → `--text-muted` on `--bg-band`; Delinquent/Written-off → `--danger` text on `--danger-bg`; Open case → `--text` on `--warn-bg`; New (feature flag) → teal outline, text "New" inline after the title, **not** a floating badge.

### Form controls (extrapolated from login page)
- Label above input, 14px 700 charcoal; required asterisk in `--danger` (site pattern).
- Input/select: 1px `--line-strong`, radius 4, min-height 40, padding 8×12, bg white. Hover border charcoal. Focus: border teal + `--focus` ring. Error: border `--danger` + message below with icon.
- Select uses native arrow. Checkbox/radio 20px, `accent-color: var(--efx-teal)`.
- Helper text 14px muted below the field.

### Comparison table (the core component) (extrapolated)
Grouped sections in one bordered container; each group = strip header (`--bg-subtle`, H3 16px) then rows.
Columns: **Field** (label) | **As reported** (muted, read-only text, with small column caption "As reported by the lender") | **Your correction** (input).
Edited row: `--warn-bg`, 3px `--warn` left border, label followed by plain text "Edited" (12.5px 700, no pill) and the original shown under the input as "Reported: X" in `--text-muted`.
Read-only rows: correction cell shows "Cannot be changed here" in muted italic-free text.
Mobile <640: each row stacks as label, "Reported: X", input.

### History table (extrapolated)
Same grid style as read-only table; cells are compact selects. Month column bold tabular. Edited cell: warn left border and "was X" under it.

### Request list (replaces "basket aside") (extrapolated)
Right column 4/12 wide, sticky top 16. Title "Your dispute request" with item count in parentheses. Items separated by 1px lines: category (muted 14px), item title (600), "N changes" and two text links Edit · Remove. Footer: primary button full width "Review and submit". Empty state: one sentence, no illustration.

### Sticky action bar (forms)
White, top hairline, `--shadow-bar`. Left: "N changes" 600 + inline error. Right: Outline "Reset", Primary "Add to dispute request". Container-aligned.

### Stepper / progress (extrapolated)
- Instruction steps (`web`): numbered list with plain **bold numerals** in crimson, 28px, no circles, hanging indent. Matches the site's "4 simple steps" feel.
- Case tracker: 4 labelled segments on one horizontal line, current segment label bold with a 3px **teal** bar above, completed segments 3px charcoal bar, upcoming 3px `--line`. Text under each segment. No amber.

### Score gauge (extrapolated, derived from the site's phone mock)
Semicircle SVG 300-900 (confirm range), 12px stroke, track `--line`, value arc green→teal (`--ok` → `--efx-teal`; no more than two stops), big score number Open Sans 700 48px charcoal centred, "Equifax Credit Score" 14px beneath, report date 12.5px muted. This is the **one** place for a bit of graphic flair.

### Messages
- Toast (item added): inline banner under the page head, `--ok-bg`, 3px `--ok` left border, text `--ok-text`, closes on next navigation. No icon circle; a plain check glyph at text size is fine.
- Warning/submit error: `--danger-bg`, 3px `--danger` left border, bold lead sentence + detail.
- Information: `--bg-subtle`, 3px `--efx-teal` left border.

### Help block
Bottom of `web`, `dispute`, `status`: "Need help with your dispute?" email, phone, hours (copy deck 06). Plain text in a bordered block with `--bg-subtle`.

## Imagery and icons

- Product screens: **no photography, no illustrations, no emoji.** Photography is reserved for the `web` screen (one image max) using the Equifax webp assets.
- Icons: inline SVG, 20px, stroke 1.75, currentColor, only for: chevron, check, info, warning, home (breadcrumb), external link. No icon sets, no icon-in-circle.

## Motion

Only colour/border transitions at `--ease`. Page changes are instant (no slide/fade). Honour `prefers-reduced-motion`.

## Accessibility baseline (must not regress)

Visible focus ring on every control; 44px minimum touch target for buttons and links in tables; labels tied to inputs; `role="alert"` on form errors; `aria-current="page"` on active nav; colour never the only signal (edited, error, status all carry words). All text pairs per the table in 02 §1 pass 4.5:1, except those listed as failing, which are restricted above.

## Class naming

BEM-lite, prefix-free: `.btn`, `.btn--outline`, `.table`, `.compare`, `.compare__row--edited`, `.tag--ok`, `.crumbs`, `.site-header`, `.portal-header`. Old class names from `styles.css` are removed, not aliased.
