# 06 · Copy deck

Voice, derived from equifax.co.in (see 02 §4): plain, second person, procedural, reassuring when a problem is
involved, literal button labels. No jargon from the internal systems (Salesforce, DRS, CI) in consumer text.

## Rules

1. Address the reader as "you". Refer to Equifax as "we" when it is an action ("We'll send your dispute to the lender").
2. Title Case for H1 and nav items (matches the site); sentence case for H2/H3, labels, body, buttons except fixed CTAs.
3. One exclamation mark per page at most, and only in reassurance ("we're here to help!") copied from the site's own phrasing.
4. No em dashes. Use commas, colons or a new sentence.
5. Numbers: "1 change", "3 changes". Dates "01 Oct 2026". Amounts "₹ 1,82,400" (existing formatter).
6. Terms (use consistently): **Credit Report, Credit Score, Dispute, Dispute ID, Item, Account, Enquiry, Lender**.
   Not: tradeline (use "Account" in UI; data keys keep the name), case, child case, institution (use "Lender").
7. Never "Oops", "Awesome", "Let's", "Simply", "Seamless", "Magic".

## Replacements by screen

### `web`
| Element | Current | New |
|---------|---------|-----|
| H1 | Disputes are now raised from your D2C account | Raise an Online **Dispute** |
| Lead | Instead of a free-text form, you'll see… | Spotted something wrong in your credit report? Correct the exact detail online and we'll take it from there. |
| Steps title | (none) | How to raise a dispute |
| Step 1 | **Log in or sign up** on the D2C Portal using the button below. | **Log in or sign up** on the Equifax D2C Portal. |
| Step 2 | **Get your free credit report** if you're eligible, or use a report you pulled recently. | **Get your credit report.** Your free report for the year is available from your dashboard, or use one you generated recently. |
| Step 3 | **Open the Dispute section** from the portal home page or the "Raise a Dispute" link in your report. | **Open the Dispute Section** from your home page, or use "Raise a dispute" on your report. |
| Step 4 | **Pick what's wrong**: account details, personal information or an enquiry. You can add several items. | **Choose what to correct:** account details, personal information or an enquiry. You can add more than one item. |
| Step 5 | **Correct the values** side by side with what's currently reported, then submit. | **Enter the correct details** next to what is currently reported, then submit. |
| Step 6 | **Note your Case ID** and track progress under Dispute Status. | **Keep your Dispute ID** and track progress under Track Your Disputes. |
| CTA | Go to D2C Portal: log in / sign up | Go to D2C Portal |
| Side block title | (new) | Before you start |
| Side bullets | (new) | Your registered mobile number · Your PAN · A recent credit report, or eligibility for your free one |
| Footnote | Detailed instruction copy is to be finalised… | (remove from page; keep in prototype bar tooltip) |

### `login`
| Element | New |
|---------|-----|
| H1 | Log in to your account |
| Sub | Please enter your mobile number to log in. |
| Tabs | Log in · Sign up |
| Field labels | Mobile number* · One-time password* · Full name (as on PAN)* · Email address* · PAN* |
| Mobile placeholder | 10-digit mobile number |
| Buttons | Send OTP · Verify and log in · Create account |
| Helper after OTP sent | We've sent a 6-digit code to your mobile number. |
| Link | Resend code |
| Remove | "Prototype: any input works, nothing is sent." (move to prototype bar) |

### `home`
| Element | Current | New |
|---------|---------|-----|
| H1 | Hello, Aarav | Hello, **Aarav** |
| Free report block | Free credit report / "You can generate your free report now. It opens right here, read-only." | My Credit Report / "You are eligible for one free report this year. It opens here and can't be edited." |
| Free report generated | Report generated today. View it read-only and raise a dispute from it. | Your report was generated today. Open it to review your accounts or raise a dispute. |
| Buttons | Get free report · View my report | Get My Free Report · View My Report |
| Dispute tile | Spotted something wrong in your report? Raise a dispute on the exact field and track it here. | Found something incorrect in your report? Raise a dispute and track it here. |
| Tag | New | New (inline, after the title) |
| Link | Open Dispute Section | Open Dispute Section |
| Score monitoring | Existing portal feature (unchanged). | Score monitoring: Keep an eye on changes to your score. (Use the live site wording if the client supplies it; this is a placeholder.) |

### `report`
| Current | New |
|---------|-----|
| Free credit report · read-only | (breadcrumb only) |
| Your credit report | Your Credit **Report** |
| Generated 01 Oct 2026 · sample data | Generated 01 Oct 2026 |
| Credit score | Equifax Credit Score |
| N accounts · N enquiries in the last 36 months | N accounts · N enquiries in the last 36 months (keep) |
| Dispute this section | Dispute this section (keep) |
| Accounts (tradelines) | Accounts |
| Dispute (row) | Dispute |
| Something not right? / Raise a dispute and correct the exact field. | Identified a discrepancy? / Raise a dispute and we'll help you correct it. |
| Raise a Dispute | Raise a Dispute |

### `dispute`
| Current | New |
|---------|-----|
| Raise a dispute | Raise a **Dispute** |
| (none) | Choose what you want to correct. You can add several items and submit them together. |
| Open disputes / Closed disputes / Check details | Open disputes · Closed disputes · Track your disputes |
| You need a recent credit report first | Get your credit report first |
| Disputes are raised against the values in your report. You're eligible for a free report; it is generated right here, read-only. | A dispute is raised against what is shown in your report, so we need a recent one. You are eligible for a free report. |
| Get my free credit report | Get My Free Credit Report |
| Account details (tradelines) | Account details |
| Choose the scenario that fits, then pick the account. | Tell us what is wrong, then choose the account. |
| Incorrect account information / A balance, date, status or other value is wrong | Incorrect account information / A balance, date, status or other detail is wrong |
| Duplicate account entry / The same account appears more than once | Duplicate account / The same account appears more than once |
| Unrecognised / unauthorised account / You never opened this account | Account I did not open / You never opened this account |
| Personal information | Personal information / Name, date of birth, gender, ID numbers, addresses, phone numbers and email. |
| Enquiry details | Enquiry details / Enquiries for loans or cards you did not apply for. |
| Review personal information · Review enquiries | (row chevron, no button) |
| Your dispute request | Your dispute request (N) |
| Everything here is submitted together as one parent case, with a child case per item. | Everything here is sent together under one Dispute ID. |
| No items yet. Pick a category to start. | You have not added anything yet. |
| N change(s) | 1 change / N changes |
| Review and submit (N) | Review and submit |
| Toast: Added to your dispute request: X | Added to your request: X |

### Forms (`tl`, `pi`, `enq`)
| Current | New |
|---------|-----|
| Dispute · Account details | (breadcrumb) |
| Back to Dispute section | Back to Dispute Section |
| Select tradeline / Open tradelines / Closed tradelines | Select an account / Open accounts / Closed accounts |
| Left: what the institution reported. Right: your correction. Changed rows are highlighted. | Left: what the lender reported. Right: your correction. Edited rows are highlighted. |
| Field / As reported / Your correction | Field / As reported / Your correction (keep) |
| Edited | Edited |
| Read-only | Cannot be changed here |
| Yes, this is not my account / No | This is not my account |
| History (reported months) | Payment history |
| was X | Reported: X |
| Correct your personal information / Edit only what's wrong. Read-only fields can't be changed here. | Correct your personal **information** / Change only what is wrong. Some details can't be edited here. |
| Flag enquiries you don't recognise / Each flagged enquiry becomes its own item in your dispute request. | Flag enquiries you **don't recognise** / Each enquiry you flag is added to your request as a separate item. |
| Unauthorised enquiry / Never applied for this loan/card | I did not apply / I did not apply for this loan or card |
| Reset / Add to dispute request | Reset / Add to dispute request (keep) |
| N change(s) | 1 change / N changes |
| Nothing changed yet. Edit at least one value in "Your correction". | (logic string, in state; leave) |

### `review`
| Current | New |
|---------|-----|
| Review and submit | Review your **request** |
| N item(s) will be submitted as one parent case in Salesforce, each as a child case, then routed via DRS to the credit institution. | N items will be sent together under one Dispute ID. We'll pass each item to the lender and keep you updated. |
| Child case 1 · Account details | Item 1 · Account details |
| Reported / Proposed | Reported / Your correction |
| I confirm the corrections above are accurate to the best of my knowledge. | I confirm that the details I have entered are correct to the best of my knowledge. |
| Submit dispute / Submitting… | Submit dispute / Submitting… |
| Add more items | Add more items |

### `done`
| Current | New |
|---------|-----|
| Dispute submitted / Your Case ID | Dispute **submitted** / Your Dispute ID |
| A Salesforce case has been created and passed to DRS… | We have received your dispute and will send each item to the lender concerned. Keep this ID to refer to your dispute. |
| (new) What happens next | 1. We review your request. 2. The lender is asked to confirm or correct each item. 3. You see the outcome under Track Your Disputes. (Timeline wording needs client confirmation; do not state days.) |
| Child case / Category / Item | Item ID / Category / Item |
| View dispute status · Back to home | Track Your Dispute · Back to home |

### `status`
| Current | New |
|---------|-----|
| Dispute Status / Your disputes | Your **disputes** (crumb: Track your disputes) |
| Parent case · raised 14 Jul 2026 | Dispute ID · Raised 14 Jul 2026 |
| Open / Closed | Open / Closed (tags) |
| Simulate CI update | (prototype bar) Simulate lender update |
| Stages: Case created (Salesforce) / Sent to DRS / With credit institution / Resolved | Received / Under review / With the lender / Resolved (map by index in `CASE_STAGES`; this is a **data file** string: change in `src/data/sampleData.js` only if the team agrees to unfreeze it, otherwise map in the component) |

### Global
| Element | New |
|---------|-----|
| Header product label | My Credit Report |
| Nav | Home · My Credit Report · Dispute · Track Your Disputes |
| User menu | Aarav Mehta · Log out |
| Prototype bar | Prototype view: Website · Log in · Home · Report · Dispute · Status. Right: Sample data, nothing is sent |
| Help block | Need help with your dispute? Email ecisupport@equifax.com · Call 1800 209 3247 (toll free; confirm hours with client) |
| Footer legal | Sitemap · Privacy · Terms of Use · Report a Vulnerability |
| Copyright | Copyright 2026 Equifax, Inc. All rights reserved. Equifax and the Equifax marks used herein are trademarks of Equifax, Inc. (Mirror the live footer wording exactly when copying.) |
| Tagline | powering the world with knowledge® (use the image asset) |
