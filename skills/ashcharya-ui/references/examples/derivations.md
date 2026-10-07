# Worked derivations — one approach, many looks

Part A shows three shipped looks read back through the method (the identity cards are reconstructed from
the shipped code, see `../sources/`). Part B applies the same method to new domains. All palettes in Part B
are the contrast-checked sets from `palettes.md`.

## Part A — the three shipped identities

### "Harvest" — agri-retail store POS (web, counter staff, all day)
- Users: counter staff 8–12h/day, keyboard + mouse, many quick sales and stock checks.
- Materials: soil furrows, harvest, field notebook, rubber stamps, wax seals.
- Palette: jade/forest canopy + harvest gold accent on cool field-mist; GitHub-dark night for 24×7 use.
- Texture: furrows (−38° diagonal rows). Shape: diagonal slab cut with a gold edge, notched glyph tile,
  skewed rounded polygons in the top bar. Marks: rubber stamp, wax-seal avatar, pen underline, masking tape.
- Type: Plus Jakarta Sans + Bricolage Grotesque, Fraunces accents, JetBrains Mono clocks.
- Structure highlights: split-slab header with clickable KPIs, sidebar of trays and raised keys, real grid,
  Dashboard ⇄ Table, docked drawer for records and forms.

### "Command OS" — head-office portal (web, managers, analysis)
- Users: managers comparing many stores, long analysis sessions.
- Materials: command boards, survey grids, ledgers, brass fittings.
- Palette: forest + mint on warm paper `#F6F5F1`; brass accents in the header.
- Texture: dot paper, survey grid, field rings. Shape: asymmetric capsules (`14 20 20 14`), an SVG shoulder
  that joins the header tab to the sidebar, a "data spine" between nav and content.
- Type: Manrope + IBM Plex Mono.
- Structure highlights: two-tier header (forest band + toolbar), floating card-row tables, entity drawers.

### "Prasar field" — mobile app for field staff (phones, outdoors, weak network)
- Users: field staff on routes, sunlight, one hand, patchy network.
- Materials: field paths, sand-coloured notebook paper, champagne thread, route maps.
- Palette: forest `#15683F` on sand ivory `#F4EFE4`, champagne line, GitHub-night.
- Texture: a single champagne curve and a sage wash. Shape: asymmetric capsule header (28/20/28/20),
  capsule buttons. Mark: a travelling gold beam on the tab bar.
- Type: Inter only (performance), strict role scale.
- Structure highlights: offline-first states, bottom sheets, swipe rows, haptics by event.

**Note how the same approach gave three different looks** for three different users, even inside one company.

## Part B — new domains

### "Ledger" — accounting / finance back-office (web)
```md
Users: accountants, 6–8h/day, keyboard-heavy · 50×/day: reconcile, post entries, check balances
Materials: ledger books, carbon copies, ink stamps, punch holes
Palette: Indigo Ledger — canopy #1E2350 · action #3A44B0 · accent amber #E8B04B · canvas #F4F5F9
Texture: horizontal ledger rules (repeating-linear-gradient 0deg, 1px every 28px, 5%)
Shape: punched margin — a column of 3 small holes on the header's left edge; folder-tab active nav
Mark: "POSTED" ink stamp on posted entries; carbon-blue duplicate tint on copies
Type: IBM Plex Sans + Space Grotesk numbers + IBM Plex Mono amounts
Never: green money cliché, gradient cards
```
Structure stays: header with balances slab, real-grid journal, drawer for entries, Undo for posting drafts.

### "Manifest" — logistics / dispatch (web + mobile)
```md
Users: dispatchers (desktop) + drivers (phone in a vehicle) · 50×/day: assign, track, update status
Materials: shipping labels, barcodes, route maps, perforated tickets, dock numbers
Palette: Ocean — canopy #0E2F44 · action #0E6680 · accent coral #F08A6C · canvas #F3F6F7
Texture: contour lines on the canopy (repeating-radial-gradient rings, 4%)
Shape: ticket edge (radial bites on card ends); dock-number badges
Mark: barcode strip under the record title; perforation line before the footer
Type: Inter + Archivo Narrow for labels/dock numbers
Never: map-pin clip-art, truck emojis
```
Structure stays: list ⇄ map, docked shipment drawer, driver app with offline sync and swipe-to-update.

### "Tandoor" — restaurant / kitchen operations (tablet + web)
```md
Users: kitchen + floor staff, standing, wet hands · 50×/day: fire, bump, 86 an item
Materials: order tickets, chalkboards, kraft paper, enamel tiles
Palette: Terracotta — canopy #4A2219 · action #A63E25 · accent mustard #E3A93A · canvas #F7F2EC
Texture: kraft-paper fibres (subtle noise) on tickets; tile grid on the canopy
Shape: torn ticket top on order cards; rounded enamel badges
Mark: handwritten table numbers (a hand-drawn font only for numbers); "FIRED" stamp
Type: Work Sans + Fraunces for menu names
Never: food photography backgrounds behind data
```
Structure stays: kanban of tickets (new → cooking → ready), big touch targets, real grid for stock.

### "Signal" — developer / monitoring tool (web)
```md
Users: engineers on call, night use · 50×/day: scan alerts, open incidents, check graphs
Materials: oscilloscopes, terminal screens, caution tape, rack labels
Palette: Graphite — canopy #1C1F22 · action #24292E · accent lime #C6E35A · canvas #F4F4F2
Texture: faint scanlines on the canopy; caution stripes only on incident banners
Shape: square, 4px radii; bracketed corners on focused panels
Mark: rack-label tags for services; monospaced timestamps
Type: Geist/Inter + JetBrains Mono
Never: neon cyberpunk glow
```
Structure stays: status slab in header, real-grid alert list, incident drawer, ⌘K everywhere.

### "Register" — school office management (web) · **built end-to-end in a test**
This one was produced by an agent that was given **only this skill** and the brief "school management web
app for Indian school office staff". It is the proof that the approach generalises.
- Materials: maroon cloth-bound office registers, the four-line handwriting copy, teachers' hand-circled marks.
- Palette: register maroon canopy `#33101E` · action `#8A2346` · accent "copy-line blue" `#8CCBE6` · rosy
  register-paper canvas `#F6F2F3`; all 32 contrast pairs pass.
- Texture: four-line copy rules. Shape: swallowtail bookmark ribbon (header, active nav, primary key).
- Marks: a wobbly hand-drawn circle around the hero number; handwritten dates. Type: Hind + Zilla Slab + Kalam.
- Files: `assets/examples/register/identity-card.md`, `identity.json`, and the full working page
  `fees.html` (fee collection: grouped nav, KPI slab, filters + chips, Dashboard ⇄ Table, real grid, docked
  drawer, light + night, 1440 → 390px).

## How to read these
Every example keeps §3–§5 of SKILL.md (structure, craft rules, truth) and changes everything in §2
(materials → palette, texture, shape, mark, type). That is the approach.
