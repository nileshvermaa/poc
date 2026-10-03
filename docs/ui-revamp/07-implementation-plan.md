# 07 · Implementation plan

Run from `d2c-dispute-portal/`. Dev server: `npm run dev` (http://localhost:5173). Build gate: `npm run build`.
`?recentReport=1` shows the Dispute Section category view directly.

## Target file layout

```
src/
  styles/
    tokens.css          # copy of docs/ui-revamp/tokens.css           (Agent 1)
    base.css            # reset, body, links, focus, tables, forms    (Agent 1)
    layout.css          # container, page, grid helpers, breakpoints  (Agent 1)
    components.css      # buttons, tags, messages, blocks, tabs       (Agent 1)
    chrome.css          # site header, portal header, crumbs, footer  (Agent 2)
    entry.css           # web, login, home                            (Agent 3)
    report.css          # report, dispute section, request list       (Agent 4)
    forms.css           # compare, history, picker, action bar        (Agent 5)
    submission.css      # review, done, status, tracker               (Agent 6)
    prototype.css       # PrototypeNav                                (Agent 2)
    index.css           # @imports all of the above in order
  components/
    brand/Wordmark.jsx, Footer.jsx, SiteHeader.jsx, PortalHeader.jsx, Breadcrumbs.jsx, Gauge.jsx, Tag.jsx, Message.jsx   (Agent 2)
    common.jsx          # keep exports; re-export new pieces; AppBar becomes PortalHeader wrapper
    ComparisonTable.jsx, HistoryTable.jsx                                                                   (Agent 5)
  screens/*.jsx                                                                                              (Agents 3-6)
```

`src/styles.css` is deleted by Agent 1 once `src/styles/index.css` is wired in `main.jsx`.
Files stay < 400 lines each.

## Phases and ownership

| Phase | Agent | Scope | Depends on | Brief |
|-------|-------|-------|------------|-------|
| 0 | Orchestrator | Copy project to backup, create branch if git is added, confirm assets decision | - | this file |
| 1 | A1 Foundation | tokens, base/layout/components CSS, `index.html` font, `main.jsx` import, delete old CSS | 0 | [agents/01](agents/01-foundation.md) |
| 2 | A2 Chrome | SiteHeader, PortalHeader, Breadcrumbs, Footer, Wordmark, Gauge, Tag, Message, PrototypeNav restyle | 1 | [agents/02](agents/02-chrome.md) |
| 3 | A3 Entry | `Entry.jsx` (web, login, home) | 1, 2 | [agents/03](agents/03-entry-screens.md) |
| 3 | A4 Report+Hub | `CreditReport.jsx`, `DisputeSection.jsx` | 1, 2 | [agents/04](agents/04-report-and-hub.md) |
| 3 | A5 Forms | `DisputeForms.jsx`, `ComparisonTable.jsx`, `HistoryTable.jsx`, `FormActionBar` | 1, 2 | [agents/05](agents/05-forms.md) |
| 3 | A6 Submission | `Submission.jsx` | 1, 2 | [agents/06](agents/06-submission.md) |
| 4 | A7 Copy | strings in screens + the string-only exception files | 3 done | [agents/07](agents/07-copy.md) |
| 5 | A8 QA | responsive, a11y, gates, side-by-side with live site | 4 | [agents/08](agents/08-qa-review.md) |

Phase 3 agents run **in parallel** (disjoint files, each owns one CSS file). Phase 4 runs after because copy
touches every screen; to avoid conflicts it runs sequentially after Phase 3 merges.

## Order of work inside each screen agent

1. Read the screen spec in 04 and the component rules in 03.
2. Rewrite markup using the shared components; delete obsolete classes.
3. Write the CSS in the agent's own file using tokens only.
4. Run the app, walk the screen at 1140 / 768 / 360, check against the spec.
5. Run the mechanical gate (05) on touched files.
6. Report: files changed, deviations from spec with reasons, anything extrapolated that needs client review.

## Acceptance criteria (global)

- [ ] All 11 screens reachable through `PrototypeNav` and the in-app navigation; every existing action works (add/remove/edit items, reset, submit, simulate update).
- [ ] `npm run build` passes with no warnings about missing imports.
- [ ] Mechanical gate in 05: zero matches (documented exceptions only).
- [ ] No horizontal page scroll at 360px; comparison and review tables stack or scroll inside their wrapper.
- [ ] Keyboard: tab order follows visual order, focus ring visible everywhere, sticky bar reachable, radios arrow-key navigable.
- [ ] Contrast: all text ≥ 4.5:1 using values from 02 §1; no use of `--ok`, `--orange`, `--disabled` as small text colour.
- [ ] `web` screen header, fonts, buttons and footer visually match equifax.co.in/personal side by side.
- [ ] Crimson appears ≤ 3 times per screen; no element above 6px radius; no mono font; no gradients except the gauge arc.
- [ ] Consumer copy uses the terms in 06; no Salesforce/DRS/CI outside the prototype bar.
- [ ] README updated: branding section now says Equifax tokens live in `src/styles/tokens.css`.

## Test approach (UI revamp has no logic changes)

The project has no test runner today and the revamp must not add dependencies. Verification is therefore:

1. `npm run build`.
2. Scripted walkthrough in the browser, same path for each agent: web → login → home → report → dispute → account form (edit two fields + one history cell) → add → personal info (edit one) → add → enquiries (flag two) → add → review → confirm → submit → done → status → simulate update. Record pass/fail per step.
3. Screenshot set at 1140 and 360 for each of the 11 screens, saved to `docs/ui-revamp/after/` for the client review.
4. If the team later wants automated checks, add Playwright for the walkthrough in step 2 as a separate task.

## Risks

| Risk | Mitigation |
|------|-----------|
| Logo/assets not approved for use | Use remote URLs, wrap in `Wordmark.jsx` so one file changes; fall back to text wordmark "Equifax" in Open Sans 700 crimson |
| Real portal differs from extrapolated components | Mark the items in 03 "extrapolated" in the review notes; ask friend for 3-4 portal screenshots |
| Parallel agents collide in shared files | Each agent owns named files only; shared tokens are frozen after Phase 1; changes to shared CSS go through the orchestrator |
| Open Sans loads slowly/offline | `font-display: swap`; Arial fallback keeps layout close |
| Copy contradicts client BRD wording | Copy changes are in one pass (Agent 7) and listed in a diff table for sign-off |
| Hotlinked assets break | Single `Wordmark.jsx` + `public/brand/` once approved |

## Definition of done for the whole revamp

Gate (05) passes, acceptance criteria above ticked, `after/` screenshots exist, a short `CHANGELOG.md`
in `docs/ui-revamp/` lists what changed per screen and which components are extrapolated for client review.
