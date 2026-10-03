# Agent 7 · Copy pass

Read `00-shared-context.md` first. Runs after Agents 3-6 have merged.

## Owns
Display strings in `src/screens/*.jsx`, `src/components/*.jsx`, plus **string-only** edits in `src/data/sampleData.js` (`SCENARIOS`, `CASE_STAGES`, `SEED_CASES` titles) and `src/state/DisputeContext.jsx` (toast and item-title template literals).

## Task
Apply `06-copy-deck.md` exactly. Where the deck says "confirm with client", use the deck wording and list the item in your report.

## Rules
- Diff must contain only string changes in the data/state files. Reviewer will check this; any change to keys, conditions, or control flow is rejected.
- `CASE_STAGES` has four entries consumed by index; keep the count and order.
- Pluralise via a tiny local helper in JSX; do not alter `lib/disputeLogic.js`.
- Keep the internal words (Salesforce, DRS, CI) only in `PrototypeNav` text, README, and code comments.
- After editing, run gate commands 7 and 8 in `05`.

## Report
A table: screen, old string, new string, client-confirmation needed (Y/N).
