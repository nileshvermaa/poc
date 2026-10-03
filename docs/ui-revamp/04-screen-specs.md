# 04 · Screen specs

All screens: Open Sans, tokens from [tokens.css](tokens.css), components from [03](03-design-system.md).
Copy strings come from [06](06-copy-deck.md). Behaviour and `actions.*` calls stay exactly as in the current JSX.
Widths: design at 1140 container, verify at 360, 768, 1140.

Page frame for every portal screen (all but `web` and `login`):
`PortalHeader` → `Breadcrumbs` → `.page` (head + content) → sticky action bar if a form → `Footer`.

---

## `web` · Raise an Online Dispute (marketing site page)

Purpose: instruction page that sends the consumer to the portal. Should be indistinguishable in chrome from equifax.co.in.

- Chrome: Site header (2-tier, Personal tab active) + breadcrumb "Home › Support › Raise an Online Dispute" + site Footer (4 columns).
- Page head: H1 "Raise an Online **Dispute**" (display size, crimson keyword), lead one sentence. 56px crimson rule under it.
- Body, two columns (7/5 at ≥992, stacked below):
  - Left: "How it works" H2 + the 6 steps as a hanging numbered list (crimson numerals 28px, step title bold, one line of detail). Primary button "Go to D2C Portal" below the list. Secondary text link "Track your dispute".
  - Right: a bordered block with 3px crimson top rule, titled "Before you start": three short bullets (mobile number, PAN, a recent report or a free one). Beneath, one illustration: the report-bulb duotone icon at 64px, **no** card inside card.
- Bottom: Help block (email, phone) then the grey "business solutions" band is **not** needed here.
- Remove the prototype note "Detailed instruction copy is to be finalised separately (per BRD)" from the page; keep it in `PrototypeNav` tooltip or README.
- States: none.

## `login` · Log in / Sign up

Purpose: authenticate (OTP) or register.

- Chrome: simplified portal header (wordmark only, no nav, no user), no breadcrumb, Footer.
- Centre a single block 440px, white, 1px `--line`, radius 6, `--shadow-card`, 3px crimson top rule. This mirrors the real D2C login card.
- Inside: crimson wordmark centred (the card itself carries the brand, header is minimal here; avoid the logo twice: **choose card logo, hide header wordmark on this screen**). H1 "Log in to your account" 24px (the one exception to H1 size), sub "Please enter your mobile number to log in."
- Tabs → two **text tabs** with a 3px teal bottom border on active, not segmented pill control. "Log in" / "Sign up".
- Fields per current logic. Labels bold 14px with red asterisk. OTP field appears after "Send OTP" (existing state); put "We've sent a 6-digit code to ••••••1234" helper text above it. Primary full width. Beneath: link "Resend code".
- Sign up: same fields as now; PAN helper "As on your PAN card".
- Remove "Prototype: any input works" from the card; show it in `PrototypeNav` only.

## `home` · D2C home

Purpose: entry hub after login.

- Page head: H1 "Hello, **Aarav**" (name keyword in crimson), lead one line with report date if pulled.
- Layout: **asymmetric**. Left 8/12: "My Credit Report" block (primary) containing the score gauge and one action ("View my report" / "Get free report" per current `reportPulled` logic) with the eligibility sentence "You are eligible for one free report this year." as plain text (no "Eligible" pill). Right 4/12: stacked, hairline-separated list of two links-with-descriptions: "Dispute Section" (+ inline "New" teal-outline tag after the title) and "Score monitoring" (muted, "Available with subscription" per existing "unchanged" copy).
- The Dispute Section entry is a link row, **not** a highlighted tile. Its prominence comes from placement (first in the right column) and the inline tag.
- Gauge shows `CONSUMER.score`; if no report pulled yet, show the gauge track only with "Score appears after you generate your report" (extrapolated state; or keep the score, since the sample data always has it. Decide in QA).

## `report` · Free credit report (read-only)

Purpose: show report, let user jump into disputes from a field.

- Breadcrumb: Home › My Credit Report.
- Head: H1 "Your Credit **Report**", meta line "Generated 01 Oct 2026 · Free report". Right-aligned on the same row: Outline button "Raise a dispute" (replaces the bottom CTA card; keep a duplicate text link at the bottom).
- Summary strip (no card chrome): gauge left (~280px), then three plain stat items right: Accounts, Enquiries (last 36 months), Report date. Separated by hairlines.
- Sections as H2 with 1px rule beneath, not cards: **Personal information** (definition list, two columns: Name, Date of birth, PAN, Address; text link "Dispute this section"), **Accounts** (read-only table; status tags; "Dispute" link per row, column header "Action" visually hidden), **Enquiries** (read-only table, link "Dispute an enquiry" in the section head).
- Amounts right-aligned with ₹ and en-IN grouping (existing `display()`).
- Footer disclaimer line: "This report is a statement of information reported by credit institutions." (copy deck; confirm wording with client).

## `dispute` · Dispute Section

Purpose: hub for raising disputes; shows request list.

- Breadcrumb: Home › Dispute Section.
- Head: H1 "Raise a **Dispute**", lead "Choose what you want to correct. You can add several items and submit them together."
- Toast banner (existing `state.toast`).
- Status line (not a card): "Open disputes **1** · Closed disputes **0**" as two inline stats with a "Track your disputes" link at right (replaces "Check details").
- If `!hasReport`: bordered info block with a heading and a Primary button "Get my free credit report" (copy 06). Nothing else.
- Else layout 8/4:
  - Left column: three grouped sections in one bordered container separated by hairlines:
    1. **Account details**: lead sentence + the 3 scenarios as full-width list rows (title bold, one-line description muted, chevron right). Rows are real `<button>`s; hover `--bg-subtle`.
    2. **Personal information**: one row, same pattern.
    3. **Enquiry details**: one row, same pattern.
    This replaces card + 2-up cards. One list, uniform rows, strongest hierarchy is the section label.
  - Right column: **Request list** (sticky). 
- Mobile: request list moves **above** the categories only if it has items; otherwise below.

## `tl` · Account details form

Purpose: correct a tradeline.

- Breadcrumb: Home › Dispute Section › Account details.
- Head: H1 per scenario ("Incorrect account **information**", etc.), lead = scenario help text.
- Scenario switch: text tabs (3px teal bottom border active) — not chips.
- "Select account": two-column radio lists (Open accounts, Closed accounts) inside one bordered group. Each option a row: institution bold, "Personal Loan · XXXXXXXX4821" muted. Selected row: `--bg-subtle` + 3px teal left border + radio checked. Use real radio inputs visually styled, keep `role="radio"` semantics.
- Helper line: "Left: what the lender reported. Right: your correction. Edited rows are highlighted."
- Comparison table sections (5 groups) then History table.
- Sticky action bar: "N changes", Reset, Add to dispute request.

## `pi` · Personal information form

- Breadcrumb: Home › Dispute Section › Personal information. H1 "Correct your personal **information**".
- Comparison table (7 groups), sticky bar. Read-only rows (ID type, date reported) show "Cannot be changed here".

## `enq` · Enquiry form

- Breadcrumb: … › Enquiry details. H1 "Flag enquiries you **don't recognise**".
- One bordered table: Institution, Date, Time, Purpose, Amount, then final column "I never applied" with a checkbox + label "I did not apply". Flagged row: `--warn-bg` + 3px warn left border (same edited language). Table scrolls horizontally on mobile.
- Sticky bar shows count of flagged enquiries.

## `review` · Review and submit

- Breadcrumb: … › Review. H1 "Review your **request**", lead "N items will be sent together. You will get one Dispute ID."
- Each item: bordered block with header strip (category muted, title bold, Edit · Remove links right) and a three-column table Field | Reported | Your correction. Reported value struck through muted; correction `--ok-text` 600 — keep the strike/green meaning but add column headers so it is not colour-only.
- Confirmation: checkbox row inside a bordered block, label per copy deck. Submit Primary "Submit dispute" (disabled until confirmed). Error uses the warning/danger message component.
- No right rail needed.

## `done` · Confirmation

- Breadcrumb: Home › Dispute Section › Submitted.
- Single bordered block with 3px crimson top rule (the second and last crimson rule use on a screen).
- Content: H1 "Dispute **submitted**" (no circle icon; a plain inline check glyph before the H1 is optional), "Your Dispute ID" label, ID in charcoal 32px 600 tabular; crimson stays on the rule only. Button "Copy ID" (outline, optional, text only).
- "What happens next" 3-line numbered list (copy deck), then items table (Item ID | Category | Item) using the table style.
- Actions: Primary "View dispute status", text link "Back to home".

## `status` · Dispute status

- Breadcrumb: Home › Track your disputes. H1 "Your **disputes**".
- Counts as the inline stat line from `dispute`.
- Each case: bordered block; header strip with "Dispute ID" + ID (600 tabular), raised date, state tag (Open/Closed), and the "Simulate CI update" button moved into the **prototype bar** (not in the product UI).
- Items listed with hairline separators; each: Item ID muted, category muted, title 600, stage text right-aligned, then the 4-segment tracker. Stage labels use consumer copy (06), not "Salesforce/DRS".

## `PrototypeNav` (dev toolbar)

Must not look like part of the product: 32px tall strip, `--bg-band` background, 12.5px muted text, buttons are plain text links with an underline on the active one, label "Prototype view:" at left, "Sample data · nothing is sent" right. Includes the relocated "Simulate lender update" control when on `status`. Collapsible via a text "Hide" toggle (state in local component state only). Remove for production as the README already says.

---

## Responsive rules (all screens)

- <992: right rails stack under content; header nav collapses to "Menu".
- <768: tables get horizontal scroll or, for comparison/review tables, stack rows; sticky bar buttons wrap full width.
- <576: gutter 16, H1 28px, buttons full width inside blocks.
- Check at 360×740 that no horizontal page scroll appears.
