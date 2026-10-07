# Method 1 — Deriving an identity from the domain

The goal is a look that could only belong to *this* product. Generic UIs come from generic inputs
("modern, clean, blue"). Ashcharya identities come from the physical world the users work in.

## Step 1 — Understand the users (15 minutes, write it down)

| Question | Why it matters |
|---|---|
| Who uses it, and how many hours a day? | 8–24h use → calm palette, strong night mode, no tiring motion |
| Where (counter, field, office, vehicle)? | sunlight → high contrast; noisy → haptics; desk → keyboard |
| On what device and width? | phone-first → bottom bars, sheets; desktop → docked panels, density |
| What do they do 50× a day? | those jobs get the header numbers, the primary key and shortcuts |
| What language and literacy? | Hindi runs ~25% longer; icons + words, never icons alone |
| Network quality? | weak network → offline-first states are part of the identity |

## Step 2 — Mine the material world

List 10 physical things the users see or touch at work. Circle 2–3 that are distinctive and pleasant.
The table below only shows the *kind* of list to write — make your own from the real workplace (visit it,
look at photos, ask users); two products in the same domain should not end up with the same materials.

| Domain | Possible materials |
|---|---|
| Agriculture / agri-retail | soil furrows, seed packets, field notebook, rubber stamps, harvest, burlap, survey maps |
| Head office / operations | ledgers, survey grids, command boards, folders, brass fittings, wax seals |
| Clinic / pharmacy | patient charts, wristbands, pill blister packs, sterile steel, prescription pads |
| Logistics / transport | route maps, shipping labels, barcodes, pallets, dock numbers, perforated tickets |
| Finance / accounting | ledger rules, carbon copies, cheque guilloche, punch holes, ink stamps |
| Education | exercise books, chalk, report cards, library cards, pencil marks |
| Restaurants / food | order tickets, chalkboards, tiles, kraft paper, enamel |
| Manufacturing | blueprints, machine plates, caution stripes, gauges, rivets |

## Step 3 — Translate materials into the five identity parts

| Part | Rule | Example (agri POS → "Harvest") |
|---|---|---|
| **Palette** | one hue family + one accent the material has + tinted neutrals + calm night | jade/forest + harvest gold, field-mist canvas, GitHub dark |
| **Texture** | one CSS-drawable repeating pattern, 3–6% alpha, only on dark/hero surfaces | furrows `repeating-linear-gradient(-38deg, …)` |
| **Signature shape** | one shape reused on header, active state, primary key | diagonal slab cut with a gold edge; notched glyph tile |
| **Hand-made mark** | 1–2 human traces, used sparingly | rubber stamp, wax-seal avatar, pen underline |
| **Type** | workhorse sans + characterful display (+ optional serif/mono accent) | Plus Jakarta Sans + Bricolage Grotesque + Fraunces |

Type checks before choosing: on mobile or weak networks use at most two families, self-host and subset
them (or use system fonts), and always give a system fallback. The face has the currency glyph you need (₹ needs a fallback in many display
faces), the scripts you need (e.g. Devanagari), and lining tabular figures — set
`font-variant-numeric: lining-nums tabular-nums` on numbers and tables.

### Palette recipe
1. **Take the hue straight from the material** and write its source on the card: "action = the green of a
   phenyl bottle", "canopy = the navy of a railway ticket". Soil → green-brown, steel → blue-grey, labels →
   orange, ledgers → indigo, milk/cold → blue, brick → red-orange, turmeric → yellow, khadi → off-white + ink.
   A cold product may be blue; a farm product may be green. **The examples in this skill are not reserved.**
2. **Draft three candidates before choosing.** Take three *different* materials from your list and build a
   palette from each, in three different hue families (e.g. one warm: red/orange/yellow/brown; one green/olive;
   one cool or neutral). Write each in one line with its material source. Then pick the one that is most
   *specific* to this domain — the one a user would recognise from their workplace. Blue is allowed only if it is
   clearly the most specific; "it looks professional" is not a reason.
3. **Choose the palette structure from the context**, not by habit:
   | Context | Structure |
   |---|---|
   | control rooms, night shifts, long monitoring | *Dark canopy* — deep chrome around light content |
   | bright counters, sunlight, quick transactions | *Light chrome* — paper nav and header, colour only in action/accent/status |
   | reading and judging documents, analysis | *Ink-led* — black-on-paper like print, one vivid accent |
   | brand-led or customer-facing tools | *Mid-tone band* — one strong colour bar on paper |
4. `canopy` = the deep tone (L 10–20%) for dark chrome; for the other structures it is the band/chrome colour.
5. `action` = mid tone (L 25–40%) that carries white text at ≥ 4.5:1.
6. `accent` = the contrasting colour the material has — either pale with dark ink (for dark chrome) or
   mid-tone with white ink (for light chrome). If it sits within ~25° of a status colour, keep it off status
   chips and give every status an icon + word.
7. `canvas` = near-white tinted toward the hue (HSL saturation ≤ 25%, lightness ≥ 94%) or a warm paper grey;
   cards white; ink = a very dark tone of the hue.
8. Status colours (success/warning/danger/info) are fixed meanings, not brand: keep them standard.
9. Night: GitHub-style neutrals for canvas, cards and lines (`#15181D`/`#1C2128`/`#30363D`), never pure black.
   Keep the brand alive on the **canopy only**: a very dark, low-saturation tone of the hue (L 10–16%,
   HSL S ≤ 30%) for sidebar, header slab and tab bar. Lighten the action until dark ink `#0D1117` reads on it.
   Secondary text at night ≈ `#B1BAC4` so it stays distinct from primary `#E6EDF3`.
10. Run `python3 assets/tools/check-contrast.py identity.json`; every pair must pass.

### Avoiding look-alikes (siblings only)
"Taken" means **used by a sibling product of the same company or product family** — the apps a user might
open side by side. The skill's examples are illustrations, not reservations.
If the material's colour is within ~25° of a real sibling: change lightness or temperature, change the palette
structure (dark canopy ↔ light chrome ↔ band ↔ ink-led), use a second material for the colour, or swap roles
(material colour becomes the accent).

### The AI-default trap
Generated palettes drift to the same places: **dark corporate blue + steel/paper**, **violet/aubergine + a pale
accent on a lilac-grey canvas**, indigo-purple, teal + coral, and navy + gold. If your palette lands there, check that a material on your card
really is that colour; if not, re-derive. Never pick a hue to "stay away" from other hues — pick it *from* the
material.

### Night-first products
If users work mostly at night or in dim rooms (wards, security, call centres): make night the default, dim
large white areas (cards `#1C2128`, never pure white), keep the accent away from alarm red, avoid bright fills
on big surfaces, and offer an even dimmer "low light" level (reduce surface lightness ~20%).

### Texture recipe
Pick a pattern a CSS gradient can draw: diagonal rows (furrows — *used by Harvest*), horizontal rules
(*Ledger example*), grid (survey — *Command OS*; blueprint), dots (paper — *Command OS*), concentric rings
(field rings — *Command OS*), contour lines (*Manifest example*), dashes (perforation), chevrons (caution),
scanlines (*Signal example*), four-line copy rules, weave, hatching. Prefer one not already used by a sibling.
Draw it in white at 3–6% on dark surfaces, or in the hue at ~4% on light heroes. One texture per product.

### Shape recipe
One of: diagonal cut (*Harvest*), notch (*Harvest*), ticket edge (*Manifest example*), folder tab
(*Ledger example*), asymmetric radii (*Command OS*, *Prasar field*), stepped corner, skewed parallelogram
(*Harvest top bar*), ribbon/swallowtail, bracketed corners (*Signal example*), tab-with-shoulder (*Command OS*).
Prefer one not already used by a sibling. Use it in exactly three places: page header, active nav, primary key.

### Mark recipe
One of: rubber stamp (rotated −1.5° to −14°, multiply), wax seal avatar, pen-drawn underline (SVG path with a
slight wobble), masking tape, pinned photo, punch holes, a handwritten date. Never more than two per product.

## Step 4 — The identity card (fill this in, keep it in the repo)

```md
# <Identity name>
Users: … · Context: … · Device: … · 50×/day jobs: …
Materials: …, …, …
Candidates: 1) <material> → <hues>  2) <material> → <hues>  3) <material> → <hues>  → chosen: … because …
Structure: dark canopy | light chrome | mid-tone band | ink-led (because <context>)
Dials: density … · scale … · shape … (radius …) · edges … · voice … · ornament …  (personality.md)
Type scale: body …px · row …px · title …px · hero …px · base unit …px
Palette: canopy #… · action #… (on #FFF) · accent #… (ink #…) · canvas #… · ink #… · night: GitHub dark + action #…
Texture: … (CSS: …)
Shape: … (used on header / active nav / primary key)
Mark: …
Type: body … · display … · accent …
Never: … (anything that would make it look like a sibling or a template)
```

Then turn it into tokens with `assets/token-template.css` (web) — the role names stay the same in every
product, so all structural components work unchanged.

## Step 5 — The sibling test

Put a screenshot next to every sibling product and next to a generic dashboard template.
If anyone could confuse them, change the material choices, not just the hue.
