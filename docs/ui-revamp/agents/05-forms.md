# Agent 5 · Dispute forms

Read `00-shared-context.md` first. Requires Agents 1 and 2.

## Owns
`src/screens/DisputeForms.jsx`, `src/components/ComparisonTable.jsx`, `src/components/HistoryTable.jsx`, `src/styles/forms.css`, and the **styling** of `FormActionBar` (component code lives in `common.jsx`, owned by Agent 2: coordinate via the orchestrator if markup must change).

## Spec
`04-screen-specs.md` sections `tl`, `pi`, `enq`; Comparison table, History table, Form controls, Sticky bar, Message in 03.

## Specifics
- `ComparisonTable`: keep the `({ sections, onChange })` signature, `Editor` types (`ro`, `check`, `select`, text, date), `aria-label`s and the `changed` row flag. New markup uses a real grid (CSS grid on divs is fine; keep it accessible with `role="table"` semantics or switch to a `<table>`: a `<table>` is preferred).
  - Column captions: Field, As reported, Your correction. Edited row: warn background + 3px warn left border + text "Edited". Under the input show "Reported: X" when edited.
  - <640px: stack label / Reported / input.
- `HistoryTable`: same grid language, compact selects, "was X" becomes "Reported: X".
- Tradeline picker: styled radio rows per spec, keep `role="radiogroup"`/`role="radio"`, `aria-checked`, click handlers (`actions.pickTradeline`).
- Scenario switch: text tabs (`aria-pressed` kept or `role="tablist"` with `aria-selected`; choose one and keep it consistent).
- Enquiry table: flagged row uses the edited language; checkbox label "I did not apply".
- Sticky bar: count text pluralised, error `role="alert"`, buttons Outline "Reset" + Primary "Add to dispute request".
- Do not alter any field definitions, `OptionSelect` behaviour, or calls to `actions.*`.

## Done when
Edit two tradeline fields and one history cell → count shows "3 changes" → Reset clears → Add returns to Dispute Section with toast. Personal info and enquiry flows behave as before. Gate passes; screenshots of `tl` (top, middle, history), `pi`, `enq` at 1140 and 360.
