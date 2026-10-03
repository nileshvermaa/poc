# 05 · Making it look designed by a person

The audit in [01](01-current-state-audit.md) lists what currently reads as generated. This guide is the
counter-measure. Treat the checklist at the bottom as a gate.

## What "human" means here

A human designer working for Equifax India would be constrained by an existing brand, would reuse the site's
patterns, would make a few deliberate decisions about emphasis, and would leave things plain where plain is
right. Generated UI does the opposite: every element is polished equally, nothing is constrained, and trendy
defaults fill the gaps. So:

1. **Borrow from the real site.** Breadcrumb bar, crimson rule, two-tone H1, teal buttons, charcoal footer. If a pattern exists on equifax.co.in, copy it faithfully before inventing.
2. **Decide what matters on each screen and make everything else quieter.** One primary button per region. One crimson moment. The score gauge is the only decorative graphic.
3. **Use the right container for the content.** Lists of records are tables. Instructions are numbered text. A single action is a link, not a tile.
4. **Be plain.** Hairlines instead of shadows, 3-6px corners instead of 12-16, text labels instead of pills, no gradients.
5. **Write like the bureau.** See [06](06-copy-deck.md).

## Do / Don't

| Don't (generic-AI tell) | Do (what Equifax-style design does) |
|-------------------------|--------------------------------------|
| Uppercase letter-spaced eyebrow above every H1 | Breadcrumb bar; at most a two-tone H1 |
| White rounded cards on a grey page for everything | White page, content separated by rules and whitespace; borders only around data groups |
| Pills for status, tags, chips, nav | Rectangular 3px-radius text tags; text tabs |
| Coloured circle with icon (check, number, avatar) | Bold numerals, plain glyph at text size, name as text |
| Highlighted "New" tile with inset ring | Inline "New" tag beside the title, placement for emphasis |
| Mono font on numbers | Open Sans tabular numerals |
| Identical 3-up tiles | 8/4 asymmetric layout, list rows |
| Gradients, glows, blur, glassmorphism | Flat fills, 1px lines |
| Shadows on every card | None; one shadow on the sticky bar and login card |
| Every button 44px blue pill | Teal 4px radius, plus outline and text variants with clear priority |
| Centred hero with big blob | Left copy, right product graphic (phone gauge), crimson rule below |
| Friendly-but-empty microcopy ("Something not right?") | Literal, specific, reassuring ("Identified a discrepancy? Raise a dispute.") |
| Parentheticals like "change(s)" | Proper plural handling: "1 change" / "3 changes" |
| Emoji / sparkles / "magic" | Nothing |
| Equal spacing everywhere (24px) | Spacing varies with grouping: tight inside groups, loose between sections |
| Lorem-ish placeholder brand | Real wordmark, real nav labels, real footer |

## Craft details that make the difference

- **Alignment:** left-align everything except the login card and the gauge value. Align labels, inputs and table columns on one grid line.
- **Optical sizing:** H1 36px with 700 weight against 16px body is deliberate contrast; do not add a mid-size heading between them just to fill space.
- **Rules:** crimson rule is 3px, exact brand hex. Never lighten it, never round its ends.
- **Tables:** right-align money and counts, left-align text, keep column widths stable between rows, no zebra stripes, no hover animation beyond a background change.
- **Density:** form rows 56-64px tall; table rows 48px. It should feel like a bank statement that has been cleaned up, not an app.
- **Edge cases shown, not hidden:** long institution names wrap; empty request list says one plain sentence; zero closed disputes shows "0".
- **Imperfection that is correct:** the site's header is busy and slightly dense. Mirror that density on `web`; keep portal screens calmer.
- **Consistency in wording:** one term per concept (Dispute ID, Item, Account, Enquiry). Never alternate "tradeline/account", "case/dispute".

## Mechanical gate (run before calling a task done)

From `d2c-dispute-portal/`. Every command must return **no matches** unless noted.

```bash
# 1. Old palette and fonts gone
grep -rniE "1d4ed8|1e40af|eef1f5|13233a|ibm plex|IBM+Plex" src index.html
# 2. No pills / big radii
grep -rnE "border-radius:\s*(9{3}|1[0-9]|[2-9][0-9])px|border-radius:\s*50%" src/styles
# 3. No decoration
grep -rniE "gradient|backdrop-filter|box-shadow:[^;]*(0 [0-9]+px [0-9]{2,}px)" src/styles
# 4. No raw hex outside tokens
grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.css --include=*.jsx | grep -v "src/styles/tokens.css"
# 5. No uppercase tracking
grep -rniE "text-transform:\s*uppercase|letter-spacing" src/styles
# 6. No mono
grep -rniE "monospace|\.mono" src
# 7. Internal jargon in consumer copy (allowed only inside PrototypeNav)
grep -rniE "salesforce|\bDRS\b|\bCI\b|child case|parent case" src/screens src/components | grep -v PrototypeNav
# 8. "(s)" plurals
grep -rnE "\(s\)" src
```

Exceptions that are allowed: the tokens file itself; `border-radius:50%` on radio/checkbox via native control; `letter-spacing:.02em` on case IDs (list it explicitly in the component CSS with a comment).

## Visual gate (reviewer, 5 minutes)

1. Squint test: is there exactly one most-important thing per screen?
2. Cover the logo. Could this be any SaaS product? If yes, a pattern from the Don't column slipped through.
3. Place `equifax.co.in/personal` and the POC `web` screen side by side: header, fonts, buttons, footer must match.
4. Count crimson uses per screen: ≤ 3 (H1 keyword, one rule, breadcrumb current).
5. Count rounded containers: none above 6px radius.
6. Read every string aloud: no sentence that sounds like a marketing tagline for a startup.
