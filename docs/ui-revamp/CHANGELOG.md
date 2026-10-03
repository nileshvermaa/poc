# UI Revamp Changelog & QA Report

## Summary of Changes by Screen

| Key | Screen | File(s) Changed | Summary of UI Changes |
| :--- | :--- | :--- | :--- |
| `web` | Raise an Online Dispute | `src/screens/Entry.jsx`, `src/styles/entry.css` | Implemented authentic two-tier Equifax marketing header (Personal/Business tabs, utilities), display-size H1 with crimson accent, hanging numbered steps (1-6) with 28px crimson numerals, "Before you start" card with 3px crimson rule, duotone report illustration, help block, and 4-column charcoal legal footer. |
| `login` | Log in / Sign up | `src/screens/Entry.jsx`, `src/styles/entry.css` | Centered 440px Equifax login card with 3px crimson top rule, centered SVG wordmark, text tabs (`Log in` / `Sign up`) with teal indicator, 40px input fields with bold labels and red asterisks, OTP flow, and compact footer. |
| `home` | D2C Home | `src/screens/Entry.jsx`, `src/styles/entry.css` | Asymmetric 8/4 grid layout: Left 8/12 features "My Credit Report" block with semicircle SVG score gauge (300-900), eligibility copy, and report view CTA. Right 4/12 features hairline-bordered cards: Dispute Section with inline teal "New" tag, and Score Monitoring. |
| `report` | Free Credit Report | `src/screens/CreditReport.jsx`, `src/styles/report.css` | Converted card-in-card layout to flat editorial hierarchy: Two-tone H1, top-right "Raise a dispute" action, summary strip with 280px score gauge and tabular stat lines, personal information definition grid, read-only accounts and enquiries tables with status tags and tabular currency alignment, and bottom dispute CTA block. |
| `dispute` | Dispute Section Hub | `src/screens/DisputeSection.jsx`, `src/styles/report.css` | Flat status strip showing Open/Closed disputes, grouped hub container for Account Details (3 scenario list rows with chevrons), Personal Information, and Enquiry Details. Sticky right rail (4/12) for Request Basket with pluralized change counts, Edit/Remove text actions, and full-width review button. |
| `tl` | Account Details Form | `src/screens/DisputeForms.jsx`, `src/styles/forms.css` | Two-tier layout: Scenario switcher text tabs with teal underline, dual-column radio list for Open/Closed accounts with teal left indicator on selection, ComparisonTable, and HistoryTable. |
| `pi` | Personal Information Form | `src/screens/DisputeForms.jsx`, `src/styles/forms.css` | Two-tone header, ComparisonTable supporting read-only fields ("Cannot be changed here"), and sticky action bar. |
| `enq` | Enquiry Details Form | `src/screens/DisputeForms.jsx`, `src/styles/forms.css` | Semantic table with tabular figures for dates, times, and amounts. Checkbox with label "I did not apply"; flagged rows highlighted with warm warning background and left border. |
| `review` | Review & Submit | `src/screens/Submission.jsx`, `src/styles/submission.css` | Grouped items card with header strip, 3-column table (Field, Reported with strikethrough, Your correction in green), confirmation checkbox, accessible error banner (`role="alert"`), and submit CTA. |
| `done` | Confirmation | `src/screens/Submission.jsx`, `src/styles/submission.css` | Clean card with 3px crimson top rule, inline check glyph, 32px tabular Dispute ID, 3-step "What happens next" ordered list, child items table, and Track Dispute action. |
| `status` | Dispute Status | `src/screens/Submission.jsx`, `src/styles/submission.css` | Open/Closed disputes status strip, case cards with Dispute ID, status tags, and 4-segment horizontal progress tracker (`Received` -> `Under review` -> `With the lender` -> `Resolved`). Internal simulation action moved to prototype toolbar. |
| - | Shared Chrome & Brand | `src/components/brand/*`, `src/components/common.jsx` | Created modular SVG Wordmark, SiteHeader, PortalHeader, Breadcrumbs, Footer, Gauge, Tag, Message, and Page wrapper. Restyled PrototypeNav into an unobtrusive collapsible top toolbar. |

---

## Extrapolated Components for Client Review

The following components were extrapolated from public Equifax India tokens and design language because logged-in portal screens are behind authentication:

1. **Comparison Table**: Three-column comparison layout (`Field`, `As reported by the lender`, `Your correction`) with amber/warm left-border and "Edited" badge.
2. **History Table**: Tabular matrix of historical monthly payment data with editable inline cells and "Reported: X" hints.
3. **Score Gauge**: Semicircle SVG graphic calibrated from 300 to 900 with green-to-teal gradient arc.
4. **4-Stage Case Tracker**: Horizontal segmented progress bar (`Received` -> `Under review` -> `With the lender` -> `Resolved`).
5. **Account Radio Selector**: Two-column list (Open / Closed accounts) with teal left border on selection.

---

## Client Confirmations Needed Before Production Launch

- [ ] **Logo and Asset Usage**: Confirm authorization for hosting Equifax SVG wordmark and marketing icons locally in `public/brand/` instead of remote CDN URLs.
- [ ] **Real In-Portal Screenshots**: Compare authenticated dashboard and report views against real screenshots from `d2c.equifax.co.in` if available.
- [ ] **Credit Score Range**: Validate that 300–900 matches the exact scoring model used in this tier of Equifax India consumer reports.
- [ ] **Support Hours & Contacts**: Confirm whether toll-free 1800 209 3247 and `ecisupport@equifax.com` operate Monday–Friday 9:00 AM – 6:00 PM IST or 24/7.
