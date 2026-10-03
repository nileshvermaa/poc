# Agent 8 · QA and design review

Read `00-shared-context.md` first. Runs last. This agent reviews and fixes small defects; it does not redesign.

## Tasks
1. Run the mechanical gate in `05`. Fix or report each hit.
2. Run the scripted walkthrough in `07` end to end at 1140 and 360. Save screenshots of all 11 screens at both widths to `docs/ui-revamp/after/`.
3. Side-by-side: `web` screen vs https://www.equifax.co.in/personal at 1140. Compare header, tabs, fonts, button colour/radius, crumbs bar, footer. List mismatches.
4. Accessibility: keyboard-only pass, focus ring visibility, tab order, `aria-current`, labels on every input, `role="alert"`/`status`, contrast spot-checks against 02 §1 (computed, not eyeballed), reduced-motion.
5. Visual gate from `05`: squint test, cover-the-logo test, crimson count ≤ 3, no radius > 6px, no mono.
6. Consistency: one term per concept (06 rules), pluralisation, date/amount formats.
7. Write `docs/ui-revamp/CHANGELOG.md`: per-screen summary, list of extrapolated components for client review, open questions (logo permission, real portal screenshots, score range, help-line hours).

## Output
A pass/fail table for each acceptance criterion in `07`, with evidence (command output or screenshot name), and a short list of residual issues ranked by severity.
