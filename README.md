# D2C Portal · Interactive Dispute (prototype)

React + Vite implementation of the "Interactive dispute form functionality on D2C" BRD.
All data is fictional sample data; no real backend is called by default.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

Add `?recentReport=1` to the URL to simulate a consumer who already pulled a report
(the Dispute Section then opens the categories directly instead of asking for the free report).

## Flow (screens)

| Screen | File | BRD section |
|---|---|---|
| Website instruction page | `src/screens/Entry.jsx` → `WebsiteInstructions` | Equifax India Website Modifications |
| Log in / sign up | `src/screens/Entry.jsx` → `Login` | Proposed workflow, step 3 |
| D2C home (new Dispute Section tile) | `src/screens/Entry.jsx` → `Home` | D2C Portal Enhancements |
| Free credit report (read-only, embedded dispute links) | `src/screens/CreditReport.jsx` | Free Credit Report Availability |
| Dispute Section (status counts, categories, request basket) | `src/screens/DisputeSection.jsx` | Dispute Section |
| Account details / Personal info / Enquiry forms | `src/screens/DisputeForms.jsx` | Dispute Categories |
| Review & submit, Case ID, Dispute Status | `src/screens/Submission.jsx` | Submission → Salesforce → DRS |

## Structure

```
src/
  data/sampleData.js        tradelines, personal info, enquiries, dropdown options, field definitions
  lib/disputeLogic.js       formatting, comparative rows, change detection (pure functions)
  state/DisputeContext.jsx  app state + actions (navigation, edits, basket, submit)
  services/disputeApi.js    submission service: mock by default, REST call when enabled
  components/               AppBar, PrototypeNav, ComparisonTable (DRS-style), HistoryTable
  screens/                  one file per area of the flow
```

## Key behaviours

- **Comparative view**: every editable field shows *As reported* next to *Your correction*; changed rows are highlighted.
- **Multiple disputes, one parent case**: items are collected in "Your dispute request" and submitted together.
  The service returns one parent case ID plus one child case ID per item.
- **Tradeline scenarios**: Incorrect information / Duplicate entry / Unrecognised account.
  "Unrecognised" pre-ticks *Account does not belong to me*; "Duplicate" can be submitted without field edits.
- **History**: each reported month's Account Status, Asset Classification, Suit Filed Status and DPD are editable.

## Integrating with real systems

1. **Credit report**: replace `src/data/sampleData.js` exports (`TRADELINES`, `PERSONAL_SECTIONS`, `ENQUIRIES`)
   with data from the D2C report API (keep the same shapes, or adapt `lib/disputeLogic.js`).
2. **Submission**: copy `.env.example` to `.env`, set `VITE_USE_REAL_API=true` and `VITE_DISPUTE_API_BASE`.
   `POST {base}/disputes` receives `{ consumerId, items[] }` (each item lists `field`, `label`, `from`, `to`)
   and must return `{ parentCaseId, children: [{ id, itemId }] }`. The backend creates the Salesforce
   parent/child cases; Salesforce → DRS → CI routing is unchanged.
3. **Status**: implement `GET {base}/disputes` (`fetchDisputeStatus`) and map Salesforce case stages to
   `CASE_STAGES` in `sampleData.js`. Remove the "Simulate CI update" button.
4. **Auth**: wire `Login` to the existing D2C OTP / sign-up endpoints.
5. **Prototype-only bits to remove**: `PrototypeNav` in `App.jsx`, the `?recentReport` switch, the mock in `disputeApi.js`.
6. **Branding**: Equifax India brand design tokens live in `src/styles/tokens.css` with modular stylesheets in `src/styles/` (Open Sans typography, crimson accents, teal primary actions, charcoal chrome).

## Open points from the BRD

- Tradeline selection is two lists (open / closed) instead of two dropdowns; easy to swap for `<select>`.
- Document upload, remarks field and dropdown value lists need confirmation with the business / DRS team.
