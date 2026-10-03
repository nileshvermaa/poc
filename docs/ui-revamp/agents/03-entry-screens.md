# Agent 3 · Entry screens (`web`, `login`, `home`)

Read `00-shared-context.md` first. Requires Agents 1 and 2.

## Owns
`src/screens/Entry.jsx`, `src/styles/entry.css`.

## Spec
`04-screen-specs.md` sections `web`, `login`, `home`. Use `SiteHeader`, `PortalHeader (minimal)`, `Breadcrumbs`, `Footer`, `Gauge`, `Page`, `Message`, `Tag`.

## Specifics
- `web`: display-size H1 with crimson keyword, hanging numbered steps (crimson 28px numerals via CSS counter, no circles), "Before you start" block with 3px crimson rule, Help block, full footer. Use at most one photo from 02 §6 if the layout feels bare on desktop; otherwise none.
- `login`: single 440px block with crimson rule, wordmark in the block, text tabs. Keep `useState` for `tab` and `otpSent` exactly. Labels carry `*` in `--danger`. Do not render the portal header wordmark here.
- `home`: asymmetric 8/4 layout. Keep the `CONSUMER.eligibleForFreeReport` and `state.reportPulled` branches and both button handlers. Dispute Section is a link row with an inline "New" tag.
- Keep every `actions.go(...)` target.

## Done when
Walkthrough steps web → login (send OTP, verify) → home → both entry points from home work; gate passes on touched files; screenshots of the three screens at 1140 and 360 in `docs/ui-revamp/after/`.
