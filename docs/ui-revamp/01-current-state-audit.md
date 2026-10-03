# 01 · Current state audit

## What the POC is

React 18 + Vite, no router (a `state.screen` string in `DisputeContext` picks the screen), no UI library,
one global stylesheet (`src/styles.css`, 118 lines of minified-style rules), IBM Plex Sans/Mono from Google Fonts.
Fictional data. Implements a BRD: "Interactive dispute form functionality on D2C".

## Screens (11) and where they live

| key | Screen | File | Notes |
|-----|--------|------|-------|
| `web` | Website instruction page ("Raise an Online Dispute") | `screens/Entry.jsx` `WebsiteInstructions` | Mimics the marketing site; has its own fake site header |
| `login` | Log in / Sign up (OTP) | `screens/Entry.jsx` `Login` | Tabs, mobile number, OTP |
| `home` | D2C home | `screens/Entry.jsx` `Home` | 3 tiles: free report, Dispute Section (NEW), score monitoring |
| `report` | Free credit report, read-only | `screens/CreditReport.jsx` | Score, personal info, tradelines table, enquiries table, CTA |
| `dispute` | Dispute Section | `screens/DisputeSection.jsx` | Status counts, 3 scenarios, 2 category cards, "request basket" aside |
| `tl` | Account details form | `screens/DisputeForms.jsx` `TradelineForm` | Scenario chips, tradeline picker, comparison table, history table |
| `pi` | Personal information form | `screens/DisputeForms.jsx` `PersonalInfoForm` | Comparison table |
| `enq` | Enquiry form | `screens/DisputeForms.jsx` `EnquiryForm` | Table with checkbox per row |
| `review` | Review and submit | `screens/Submission.jsx` `Review` | One card per item, from/to table, confirm checkbox |
| `done` | Confirmation (Case ID) | `screens/Submission.jsx` `Confirmation` | Green check circle, case id, child cases |
| `status` | Dispute status | `screens/Submission.jsx` `DisputeStatus` | Parent/child cases, 4-stage tracker, "Simulate CI update" |

Shared: `components/common.jsx` (BrandMark, icons, `PrototypeNav`, `AppBar`, `BackLink`, `PageHeader`,
`FormActionBar`), `components/ComparisonTable.jsx` (Field | As reported | Your correction, with edited-row state),
`components/HistoryTable.jsx` (monthly history, editable cells).

## Interaction model that the design must keep

- Comparison view: reported value beside an editable correction; changed rows are visibly marked ("Edited", "was X").
- "Request basket": items from three categories are collected, then reviewed and submitted as one parent case with child cases.
- Sticky action bar on forms: change counter, Reset, Add to dispute request, inline error (`role="alert"`).
- Toast after adding an item; warn box for submit errors; tracker with 4 stages.
- `?recentReport=1` switches Dispute Section between "need a report first" and the category view.

## Current visual language (what is in `styles.css`)

- Colour: Tailwind-style blue `#1D4ED8` primary, blue-grey page `#EEF1F5`, navy ink `#13233A`, amber `#F59E0B`/`#B45309` for "edited".
- Type: IBM Plex Sans body, IBM Plex Mono for numbers (score, counts, case IDs, account numbers).
- Shape: 12px radius cards on a grey page, 8px buttons, 999px pills and chips.
- Brand: a rounded blue square with a white tick, labelled "Credit Bureau India" / "D2C Portal".
- Layout: 1160px container, everything is a white card, 3-up equal grids, 340px aside.

## Why it reads as AI-generated (specific, not vague)

Each of these is something a reviewer can point at. Plan 05 turns them into rules.

1. **Default palette.** `#1D4ED8` on `#EEF1F5` with navy text is the stock "SaaS blue + slate" combination. Nothing about it says Equifax.
2. **Default font pairing.** IBM Plex Sans + Plex Mono is a very common generated choice, and mono on every figure makes a consumer portal look like a developer dashboard.
3. **Eyebrow on every page.** A small uppercase, letter-spaced blue label above every H1 (`.eyebrow` is used on 9 of 11 screens). Real sites use breadcrumbs.
4. **Everything is a card.** White 12px-radius card on grey for every block, cards inside the page that already is cards, equal padding (24px) everywhere. No hierarchy between primary and secondary content.
5. **Pills everywhere.** Status, "Eligible", "New", chips, nav buttons, all fully rounded.
6. **"New" tile with an inset 1px blue ring** (`.tile-new`), the signature highlight of generated dashboards.
7. **Circle decorations.** Numbered circles for steps, a green circle with a check for success, an avatar circle with initials.
8. **Symmetry.** 3 equal tiles, 2 equal cards, uniform 44px buttons, centred nothing but also left-aligned nothing in particular; no deliberate focal point.
9. **Generic copy.** "Something not right?", "Spotted something wrong in your report?", "Pick what's wrong", parenthetical `change(s)`, and a lot of two-beat sentences. No Equifax terminology (DRS, CI, Salesforce shows up in consumer copy: it must not).
10. **Placeholder brand.** A generic tick-in-a-square logo.
11. **Prototype bar** is a dark navy strip with amber badge that visually competes with the product header.

## Things that are wrong for the client, independent of the AI-look

- Consumer-facing copy leaks internals: "parent case in Salesforce", "routed via DRS", "Simulate CI update", "Child case".
  Real customers see "Dispute ID" and "Item". Keep internal terms only inside the prototype bar and tooltips for the demo.
- `web` screen invents its own header; the real site has a specific two-tier header and a dark footer (see 02).
- No footer anywhere. Equifax pages always end in the dark charcoal footer with legal links.
- Accessibility is decent (labels, `role="alert"`, 44px targets) and must not regress.

## Inventory counts (for effort sizing)

- JSX: 11 screens + 4 shared components, ~900 lines. CSS: 118 dense lines, ~140 selectors.
- Selectors to be retired or reworked: all of them. The class vocabulary is rebuilt in 03.
