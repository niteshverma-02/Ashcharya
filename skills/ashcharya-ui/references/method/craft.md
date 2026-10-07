# Method 3 — Craft: depth and delight without glow

"Extraordinary" in this approach means *made by a person who cares*, not *flashy*. Every effect must point
to something physical. If it can't be named as an object (tray, key, paper, ink, stamp, label), drop it.

## 1. The depth vocabulary (pick per identity)

| Physical idea | CSS | Good for |
|---|---|---|
| Sunk tray | `inset 0 1px 3px rgba(0,0,0,.28)` on a darker fill | grouping nav items, kanban columns, settings lists |
| Raised key | `inset 0 1px 0 rgba(255,255,255,.06), 0 2px 5px -2px rgba(0,0,0,.45)`; hover lifts 1px | nav items, segmented controls, cards in trays |
| Paper on a desk | white card, 1px hairline, long soft drop `0 16px 32px -26px` | page header, panels |
| Hard offset | `3px 3px 0 <darkest canopy>`; hover 4px, press 1px. If the key has a `clip-path` shape, put `filter: drop-shadow(3px 3px 0 …)` on a wrapper, because clip-path also clips box-shadow | the ONE primary key |
| Inset rim | `inset 0 0 0 1px <accent>/.35` | shapes on dark surfaces |
| Hairline grid | `gap: 1px` on a line-coloured background | stat strips, KPI grids |
| Flat by default | border only, no shadow | records, drawers, list cards |
| Inset borders | borders as `inset 0 0 0 1px <line>` shadows (no layout shift on hover/focus) | panels, buttons, inputs |
| Ink block | one dark canopy block holding the single most important number | dashboards, home screens |

Shadows only for things that float (popovers, sheets, dialogs, tab bars, FABs).

## 2. Texture, shape and marks
Use the identity card's choices (see `identity.md`). Rules:
- texture at 3–6% alpha, only on dark/hero surfaces, never behind body text;
- the signature shape in exactly three places (header, active nav, primary key);
- at most two hand-made marks per product, mostly on sign-in, top bar and empty states.

## 3. Type as craft
- Titles: display face, heavy weight (700–800), tight tracking (−0.02 to −0.035em).
- Labels follow the voice dial: tiny tracked caps eyebrows are a *loud/ruled* choice (Harvest used them);
  quiet identities use sentence-case labels in a muted colour; loud ones may use condensed caps blocks.
- Numbers: tabular figures, display face; a figure is never smaller than its label.
- A serif or mono accent only for human/precise moments (dates, sign-in headline, clocks, codes).

## 4. Colour discipline
- One hue family + one accent. At most one filled accent element per surface layer (a page, or a sheet/drawer
  on top of it — hide the page's accent key while a sheet with its own is open; filled *action*-colour buttons
  don't count) plus
  small you-are-here markers (active nav rim, tab dot). The signature shape is drawn in canopy/action colours.
- A **pale accent** (dark ink on it) only appears on dark chrome: put the accent-filled key on a canopy bar
  (decision bar, payment panel, tab bar) or use the action colour for the primary key on white. A mid-tone
  accent with white ink may sit on white. Accent rules/ticks on light surfaces use `accent-text`, not the pale accent.
- Dark chrome at night: add a 1px inset line (`inset 0 0 0 1px rgba(255,255,255,.06)`) so it separates from the canvas.
- If the brand hue is close to red (within ~30° of danger), shift danger toward crimson or orange and always pair
  danger with an icon and a word, so errors never read as branding.
- Status colours mean status only; tags carry categories, never status.
- Charts use a fixed categorical order, never cycled; extra series fold into "Other".

## 5. Motion as craft
| Moment | Motion |
|---|---|
| Hover | 120–150ms colour/shadow; keys lift 1px |
| Press | scale .98 spring, or the hard-offset key collapsing 3px → 1px |
| Enter | 220–280ms ease-out (`cubic-bezier(.16,1,.3,1)`), 8–24px travel |
| Data | numbers count up once (~750ms); changed cells flash their tone once |
| Signature | one small moment per product (a stamp landing, a pen line drawing, a nav pill travelling) |
| Never | glow pulses, aurora drift, parallax, cursor spotlights, confetti, looping anything |
Everything off under `prefers-reduced-motion`.

## 6. The "AI-generated" smell test
If the screen has any of these, remove them: purple-blue gradients, glass cards, glowing borders, blurred
blobs, 3D illustrations of laptops, "✨" copy, cycling headlines, stat cards with fake numbers, identical
rounded cards with icons in circles. Replace with the identity's material: a texture, a shape, a mark, a
real photo, real data.
