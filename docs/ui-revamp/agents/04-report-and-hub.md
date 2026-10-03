# Agent 4 · Report and Dispute Section hub

Read `00-shared-context.md` first. Requires Agents 1 and 2.

## Owns
`src/screens/CreditReport.jsx`, `src/screens/DisputeSection.jsx`, `src/styles/report.css`.
`StatusCounts` is exported from `DisputeSection.jsx` and used by `Submission.jsx`; keep the export and its `withLink` prop, restyle as the inline stat line from 04.

## Spec
`04-screen-specs.md` sections `report` and `dispute`; table, status tag, request-list and message components from 03.

## Specifics
- `report`: no cards. H2 sections with a 1px rule, read-only tables per 03, right-aligned amounts, status tags (Current → ok, Closed → muted, anything else → danger/warn per 03), "Dispute" links per row calling `actions.openTradeline(t.id, 'incorrect')`. Gauge in the summary strip. Raise-a-dispute button top right plus a text link at the bottom. Keep `actions.go('pi')`, `actions.go('enq')`.
- `dispute`: keep `hasReport` branches, `state.toast`, basket rendering with `actions.editItem` / `removeItem`, review button disabled when empty. Scenario rows call `actions.openTradeline(null, k)`. Replace the 2-up cards with the single grouped list of 04. Request list is sticky on ≥992 and stacks on mobile.
- Pluralise "N change(s)" locally in JSX (`1 change`, `N changes`).

## Done when
Both screens work with and without `?recentReport=1`; add/remove/edit from the request list still works after Agent 5's forms land (re-test in Phase 5); gate passes; screenshots at 1140 and 360.
