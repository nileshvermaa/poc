# 02 · Equifax India brand extraction

Method: computed styles and CSS custom properties read from the live pages on 2026-10-03.
Pages: `/personal`, `/support/consumer-grievance-redressal/`, `/support/free-credit-report/`, and the public
`d2c.equifax.co.in/gcs/login.jsp`. The site is Bootstrap 4 with a Liferay-style `mkt-` component layer;
the D2C login uses the same tokens. Contrast ratios below were computed (WCAG 2.x).

## 1. Palette

| Role | Hex | Source | Contrast on white | Use |
|------|-----|--------|-------------------|-----|
| Equifax crimson | `#9E1B32` | `.text-danger` keyword colour, rule lines, logo | 7.90 | Accent: one keyword in a heading, 3px top rules, current breadcrumb, price figures. **Not** for buttons |
| Primary teal | `#007298` | `--primary`, links, every button | 5.44 | Links, primary buttons, focus, active controls |
| Charcoal | `#333E48` | `--dark`, headings, footer bg | 10.92 | Headings, nav text, footer, secondary button hover |
| Body ink | `#272833` | `--body-color` | 14.61 | Body text |
| Grey 100 | `#F7F8F9` | `--gray-100` | n/a | Breadcrumb bar, subtle section bg, table header |
| Grey 200 | `#EEEEEE` | `--gray-200`, `--light` | n/a | Secondary button bg, dividers, "business solutions" band |
| Grey 300 | `#E7E7E7` | `--gray-300` | n/a | Borders |
| Grey 400 | `#B2B2B2` | `--gray-400` | n/a | Input borders (decorative) |
| Grey 500 | `#A3AAAD` | `--gray-500` | 2.36 (fails) | Disabled only, never text |
| Grey 600 | `#5B6771` | `--gray-600` | 5.80 | Secondary text |
| Orange | `#F86800` | `--secondary` | 3.01 (fails for text) | Graphics only, e.g. gauge mid-zone |
| Info | `#00ACE6` | `--info` | n/a | Gauge/illustration only |
| Success | `#278C10` | `--success` | 4.33 (fails small text) | Large text/graphics. For small text use derived `#1F7010` |
| Warning | `#F3C300` | `--warning` | n/a | Edited-row marker border, warning boxes |
| Danger | `#E8002A` | `--danger` | 4.70 | Validation errors. Always with icon or text, because it sits close to crimson |

Derived (not on the site, needed for states): teal pressed `#005A78` (7.68), crimson dark `#7D1527` (10.46).
Teal on charcoal is 2.01: never put teal text on the footer; use white.

Observed button behaviour: primary = teal fill, white text, 4px radius, 700 weight. On hover the site
**inverts** (white fill, teal text and teal border). Outline = teal border + teal text, fills teal on hover.
Secondary = grey 200 fill, charcoal text, goes charcoal on hover.

## 2. Typography

- Family: **Open Sans** (400, 600, 700; 300 for large display). Fallback Arial. System stack is only the Bootstrap body default and is overridden on nearly every element, so treat Open Sans as the brand font.
- Scale observed: H2 hero 42px/700 charcoal; H3 36px/700; section heading 32px/700; body 16px/400; nav 16px; utility links 14px/700; form labels 14px/700 charcoal; footer 12.46px.
- Heading signature: **two-tone**. One keyword in crimson, rest charcoal ("Understand Your **Credit**", "Buying your **dream home**!").
- Casing: Title Case for hero and nav items, sentence case for sub-headings and body.
- Numerals in prices: crimson, 700 ("Rs. 100", "Rs. 450", "Rs. 900"), centred in subscription cards.

## 3. Layout and shape habits

- Container: Bootstrap xl, 1140px max, breakpoints 576 / 768 / 992 / 1200.
- Header is **two-tier**:
  1. Top row, white: Equifax wordmark left; **Personal | Business** segment tabs (active tab is white with a 3px crimson top border, inactive is grey 100); utility links right in 14px bold with thin vertical dividers (About Us, Contact Us, Support ▸, India flag ▸).
  2. Second row: page-section links in bold charcoal (Personal Credit Report, Free Credit Report, Customer Grievance Redressal, FAQ), then a search field and a dark **Login** button (charcoal, 4px radius).
- Then a **breadcrumb bar** on grey 100: home icon › Support › current page (current in crimson, bold, 14px).
- Hero: white, left copy, right product illustration (phone showing gauge score), closed by a 3px crimson line spanning the page.
- Content blocks are **flat**, no shadow. Cards = white, hairline border or none, square-ish (radius 0-6px), with a **3px crimson top border** (subscription cards, photo cards). Section separators are the same crimson rule.
- Buttons are 4px radius, never pills. Full-width inside cards.
- Footer: charcoal `#333E48`, white 12.46px links in four columns (Credit Report Help, Customer Education, About Us, Support), hairline divider, legal row (Sitemap, Privacy, Terms of Use, Report a Vulnerability), EFX mark left, tagline "powering the world with knowledge®" right, LinkedIn icon.
- D2C login page: centred white card, soft 1px border and faint shadow, crimson wordmark, "Please enter your credentials to log in." small centred, bold 14px labels with red asterisk, full-width teal "LOG IN", blue text links beneath ("forgot your password?", "Sign Up"), same charcoal footer. Plain and a little dated: the revamp should be Equifax-true but tidier.
- Imagery: warm photography of Indian families/professionals (home, car), a phone mock with a circular gauge (teal-green arc, score 810), duotone line icons (crimson/teal), flat support illustration. Gauge is the product's iconic graphic.

## 4. Voice (from page copy)

- Plain, instructional, second person: "Understand Your Credit", "Find out how your financial decisions can impact your credit report and credit score."
- Reassuring on problems: "Identified a discrepancy in your credit report. Don't worry, we're here to help!"
- Procedural, numbered: "avail your free report online in just 4 simple steps", "Follow the below steps to raise the dispute".
- CTAs are literal: "Learn More", "Get Your Free Credit Report and Score Now", "SUBSCRIBE", "Raise an Online Dispute", "Track Your Dispute".
- Nouns they use: Credit Report, Credit Score, Dispute, Track Your Dispute, Customer Grievance Redressal, Subscription, Free* Credit Report (asterisk: "One FREE credit report per year").
- Support details shown on the grievance page (public): email ecisupport@equifax.com, phone 1800 209 3247, postal address Andheri East, Mumbai 400093. Use these in a "Need help?" block, subject to client confirmation.

## 5. Where this does NOT cover the POC (extrapolations to review)

The logged-in D2C dashboard and the dispute forms are not public. Tables, form groups, steppers, status tags
and the gauge-as-component are **extrapolated** from the tokens above, not copied. Mark any component in 03
labelled "extrapolated" for client review.

## 6. Assets (remote URLs, not downloaded)

| Asset | URL |
|-------|-----|
| Wordmark (crimson, SVG) | https://assets.equifax.com/global/images/logos/equifax_150_28.svg |
| Wordmark (white, SVG) D2C | https://d2c.equifax.co.in/gcs/assets/img/efxlogo-white.svg |
| EFX mark (white, SVG) D2C | https://d2c.equifax.co.in/gcs/assets/img/EFX-White.svg |
| EFX mark with TM (PNG) | https://assets.equifax.com/global/images/logos/logo_EFX_TM.png |
| Tagline "powering the world with knowledge" | https://assets.equifax.com/global/images/tagline/english_185x10.png |
| India flag | https://assets.equifax.com/global/images/flags/India_27x27.png |
| Icon: report with bulb (duotone) | https://assets.equifax.com/marketing/US/images/icon-library/f/file_report_bulb_duo.svg |
| Icon: comments/exclamation (duotone) | https://assets.equifax.com/marketing/US/images/icon-library/c/comments_exclamation_duo.svg |
| Hero banner (consumer score) | https://assets.equifax.com/marketing/india/images/business_banners/banner_consumer_score.webp |
| Featured: credit report | https://assets.equifax.com/marketing/india/images/featured/credit_report.webp |
| Photo: dream home | https://assets.equifax.com/marketing/india/images/featured/dream_home_hp_856x376.webp |
| Photo: dream car | https://assets.equifax.com/marketing/india/images/featured/dream_car_hp_856x376.webp |
| Support illustration | https://assets.equifax.com/marketing/india/images/illustrations/illustration_support_4_existing_customers.svg |
| Icon library (pattern) | `https://assets.equifax.com/marketing/US/images/icon-library/<first-letter>/<name>_duo.svg` |

Recommended: copy the logos/SVGs into `public/brand/` once the friend/client confirms usage, so the demo
works offline. Until then, use the remote URLs. Do **not** hotlink photography in the portal screens; the
portal is a utility product and needs almost no photography (see 04).

## 7. Real links the POC can reference (for footer/nav fidelity)

D2C login `https://d2c.equifax.co.in/gcs/login.jsp` · Free credit report `/support/free-credit-report/` ·
Grievance `/support/consumer-grievance-redressal/` · Raise an Online Dispute and Track Your Dispute are
D2C portal routes (`.../portalRouter/consumer-dispute`, `.../track-your-dispute`). In the POC these stay
inert (`href="#"` or prototype navigation).
