# Agent 2 · Chrome and shared parts

Read `00-shared-context.md` first. Requires Agent 1 done.

## Owns
`src/styles/chrome.css`, `src/styles/prototype.css`, `src/components/brand/*` (new), `src/components/common.jsx`.

## Build
| Component | File | Notes |
|-----------|------|-------|
| `Wordmark({ tone })` | `brand/Wordmark.jsx` | `<img>` of the Equifax SVG (crimson default, white for dark bg), `alt="Equifax"`, fixed 107×20. URLs in 02 §6. Fallback: if the image errors, render text "EQUIFAX" Open Sans 700 italic crimson. One file is the only place a URL appears. |
| `SiteHeader({ active })` | `brand/SiteHeader.jsx` | Two-tier marketing header per 02 §3 and 03. Inert links (`href="#"`, `preventDefault`). Search field is visual only. Login button calls `actions.go('login')`. |
| `PortalHeader` | `brand/PortalHeader.jsx` | Portal header per 03: wordmark, divider, "My Credit Report", nav (Home, My Credit Report, Dispute, Track Your Disputes) mapped to `actions.go`/`actions.viewReport`, `aria-current="page"`, user name + Log out. Mobile "Menu" disclosure (local `useState`). Prop `minimal` renders wordmark only (for `login`). |
| `Breadcrumbs({ items })` | `brand/Breadcrumbs.jsx` | `items=[{label, to?}]`, grey-100 bar, home icon first, last item crimson bold with `aria-current`. Items with `to` call `actions.go`. |
| `Footer({ variant })` | `brand/Footer.jsx` | `variant="full"` (4 columns, `web`) or `"compact"` (portal). White-on-charcoal, EFX mark + tagline images, legal links, copyright per 06. |
| `Gauge({ score, min=300, max=900 })` | `brand/Gauge.jsx` | Semicircle SVG, role="img" with label "Credit score 742 out of 900". Colours via CSS vars. |
| `Tag({ tone, children })` | `brand/Tag.jsx` | Maps to `.tag--*`. |
| `Message({ tone, title, children })` | `brand/Message.jsx` | Maps to `.message--*`, `role="status"` or `"alert"` for danger. |
| `Page({ crumbs, children })` helper | `brand/Page.jsx` | `<div class="app"><PortalHeader/><Breadcrumbs/><main class="container page">…</main><Footer/></div>`; screens use it instead of repeating AppBar + wrap. |

`common.jsx`: keep every current export name working (`BrandMark`, `IconBack`, `IconCheck`, `PrototypeNav`, `AppBar`, `BackLink`, `PageHeader`, `FormActionBar`) so Phase 3 agents can migrate gradually.
- `AppBar` renders `PortalHeader`. `BrandMark` renders `Wordmark`. `PageHeader` renders H1 with two-tone support: accept `title` as string with `*keyword*` markup converted to `<span class="accent">` (no raw HTML), `lead`, and the 56px rule; drop the `eyebrow` prop (ignore it if passed).
- `BackLink` becomes a small text link with chevron (keep).
- `FormActionBar`: restyle per 03, pluralise ("1 change"/"N changes"), keep `role="alert"` message. Styles live in `forms.css` (Agent 5 owns); you only keep the component API stable.
- `PrototypeNav`: restyle per 04 (quiet toolbar, "Hide" toggle). Add a slot for contextual dev controls so Agent 6 can place "Simulate lender update" there: expose `actions.advanceCase` usage via a small `PrototypeControls` that appears only on `status` and advances all open cases.

## CSS
`chrome.css` for headers, breadcrumbs, footer, gauge. `prototype.css` for the toolbar. Tokens only.

## Done when
All shared components render in isolation on every screen; the app still runs with old screens (they will look half-styled until Phase 3); `web`-style header matches the live site at 1140 px width (take a side-by-side screenshot into `docs/ui-revamp/after/header-compare.png`).
