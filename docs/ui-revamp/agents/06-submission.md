# Agent 6 · Submission screens (`review`, `done`, `status`)

Read `00-shared-context.md` first. Requires Agents 1 and 2.

## Owns
`src/screens/Submission.jsx`, `src/styles/submission.css`.

## Spec
`04-screen-specs.md` sections `review`, `done`, `status`; table, tag, message, tracker in 03.

## Specifics
- `review`: keep `confirmed` state, disabled logic, `actions.submit`, `state.submitting` label, `state.submitError` message (danger). Per-item block with header strip, three-column table Field | Reported | Your correction with column headers (not colour-only). Edit / Remove text links keep handlers.
- `done`: single block with 3px crimson rule, ID in 32px/600 tabular, items table, "What happens next" ordered list (copy deck; no durations), actions. No circle icon.
- `status`: inline stat line via `StatusCounts` (owned by Agent 4: import it, don't redefine). Each case block per spec. **Remove** the "Simulate CI update" button from this screen; it moves to the prototype toolbar via Agent 2's `PrototypeControls` (keep `actions.advanceCase` semantic: advance each open case). Until Agent 2's control exists, keep the button but style it as a text link inside a `.proto-only` wrapper.
- `StageTrack`: four labelled segments (3px bars: done charcoal, current teal, upcoming `--line`), text under each. Labels from `CASE_STAGES` (renamed in Agent 7's pass).
- Case IDs: Open Sans 600 tabular, no mono.

## Done when
Full path review → submit (mock API ~600 ms) → done → status works; error path (set `VITE_USE_REAL_API=true` with a bad base URL temporarily) shows the danger message with `role="alert"`; gate passes; screenshots at 1140 and 360.
