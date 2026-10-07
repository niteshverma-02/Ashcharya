---
name: ashcharya-ui
description: >
  Ashcharya UI — one hand-crafted, next-generation design language for business and operations software:
  deep canopy green + harvest gold on warm paper, GitHub-style night mode, real-grid tables, docked drawers,
  trays of raised keys, KPI slabs, offline-first mobile patterns. Use it whenever you create or restyle ANY
  screen, page, component, dashboard, table, list, filter bar, drawer, bottom sheet, form, sidebar, tab bar,
  top bar, login/OTP screen, empty/offline state or chart — web (React/Tailwind/shadcn) or mobile
  (React Native/NativeWind) — and whenever the user asks for UI that looks "extraordinary", "premium",
  "next generation", "unique", or says a screen looks "basic", "ajib", "ganda" or "AI generated".
---

# Ashcharya UI

One design language. It was distilled from three production apps (a mobile field app, a store POS and a
head-office portal) and every value below exists in shipped code. The result looks **hand-made, dense,
keyboard-first and calm**, never like an AI template.

Read with it: `references/foundations.md` (full tokens + component specs),
`references/taste-and-rejections.md` (what was rejected and why), `references/next-gen-patterns.md`.
Drop-in tokens: `assets/ashcharya-tokens.css` (web) and `assets/ashcharya-tokens.ts` (mobile).
Visual reference: `assets/showcase.html`.

## 1. The identity in one breath

| Element | Ashcharya |
|---|---|
| **Canvas** | warm paper `#F6F5F1`; cards white `#FFFFFF` or ivory `#FBF8F1` |
| **Canopy** | deep green `#0F4033` (ramp `#0B3328 → #13503F`) for the sidebar, header slab, heroes and tab bar |
| **Action** | forest `#15683F` (hover `#0F4F30`, text-on-white `#146137`) |
| **Accent** | harvest gold `#E2B864` (ink on gold `#2A1D02`; gold text on white `#8F6410`), **one moment per screen** |
| **Ink** | `#16211B` / secondary `#5B6B62` / faint `#838A80`; lines `#E5E3DA`, `#EFEDE5` |
| **Status** | success `#1F7A4D` · warning `#93610E` · danger `#B4342C` · info `#2C6E8F`, each with a tinted surface |
| **Night** | GitHub dark: canvas `#15181D`, card `#1C2128`, raised `#21262D`, border `#30363D`, text `#D1D9E0`, muted `#8B949E`, action `#2EA043` (hover `#3FB950`), gold `#D29922`, canopy `#161B22` |
| **Type (web)** | Plus Jakarta Sans (body) · Bricolage Grotesque (titles + numbers) · Fraunces (serif accent only) · JetBrains Mono (clocks, kbd) |
| **Type (mobile)** | Inter 400–800 on the same role scale |
| **Texture** | field furrows `repeating-linear-gradient(-38deg, …)` on canopy surfaces, paper grain on sign-in |
| **Craft marks** | gold notch, diagonal slab cut with a gold edge, rubber stamp, wax-seal avatar, pen-drawn underline, hard offset shadow |

## 2. The five laws

1. **Human, not AI.** No neon, glassmorphism, aurora blobs, glowing dots, gradient CTA buttons, cycling
   headlines or "✨ Supercharge" copy. Depth comes from craft: sunk trays, raised keys, hairlines, hard offset
   shadows (`3px 3px 0`), inset rims, grain, furrows, stamps, pen underlines.
2. **One component, everywhere.** One page header, one table, one drawer/sheet, one form kit, one scrollbar,
   one status-tone map. Fix the shared component; never fork a page-specific variant.
3. **A real grid.** Tables have a header row, rules between every row *and* column, zebra, hover, an accent
   edge on clickable rows. **One value per column**: never stack name-over-phone or date-over-time.
4. **One accent moment.** Gold marks exactly one thing per screen: the active nav key, the primary key or the
   hero metric. Everything else is ink, paper and green.
5. **Truth over decoration.** Copy names real modules and actions; every figure comes from real data
   (missing = `—`, partial = trailing `+`). No marketing lines, no apologies, no fake analytics.

## 3. Layout grammar

### Web

```
┌ Sidebar (canopy) ┐┌ Top bar: page stamp + title · ⌘K search · date/clock · ONE gold key · icons · seal ┐
│ tray per module  │├────────────────────────────────────────────────────────────────────────────────────┤
│  ▸ raised key    ││ PAGE HEADER  glyph+gold notch · eyebrow · title · 1-line desc │ canopy slab of KPIs │
│  ▸ raised key    ││  control bar: [Scope] [Date window] [Multi filters] [Sort] …  [Primary] [▦ | ☰]   │
│  ★ active = gold ││  tabs                                                                              │
│    rim + seed    ││ applied-filter chips · Clear all · "12 of 128"                                     │
│ tray per module  ││ DASHBOARD (6 panels, 40/30/30)  ⇄  TABLE (real grid)      │ DOCKED DRAWER          │
│ foot: theme · me ││                                                           │ record or form         │
└──────────────────┘└───────────────────────────────────────────────────────────┴────────────────────────┘
```

- **List page** = header (with KPI slab) + filters in the header bar + applied chips + **Dashboard | Table**
  switch on the same line as filters/tabs + docked drawer.
- **Dashboard** = ~6 panels in rows of three at 40/30/30 (trend first), computed from rows already loaded:
  no extra API calls. Clicking a chart slice filters the table.
- **Records open in a drawer** that docks beside the list at ≥1024px (420 → 480 → 540px; the list shrinks and
  is never covered), a right sheet on tablet, a bottom sheet `92dvh` on phone; ⛶ full screen; ←/→ walk records.
- **Add/edit forms open in that drawer.** Centred dialogs only for yes/no confirms and quick pickers. In-form
  type/mode toggles become tabs at the top. Required context (store, franchise…) is a field *inside* the form.
- **Sidebar shows every module at once** as sunk trays of raised keys; folds to a mini rail (⌘B).
- **Keys:** ⌘K search · ⌘B sidebar · Alt+1…n module · ←/→ records · j/k rows · Enter open · Esc back out.

### Mobile

```
┌ Capsule header (ivory, radii 28/20/28/20, one champagne curve) ─ badge · title · ◐ · 🔔 ┐
│ toolbar pill: ( 🔍 search │ ⚲ "All orders" ) (round actions) [New]                      │
│ sync banner (only when failed / pending / stale)                                       │
│ Section card: [tile] Title ……………… Open ›                                                 │
│   List card ▸ avatar · name · meta · status pill │ value pill · ☎ · ➤   (swipe actions)  │
│ Flat sticky footer, or a checkout bar that IS the button                               │
└ Canopy tab bar: 5 tabs · travelling pill · gold beam · centre FAB ＋                    ┘
```

- Cards are flat ivory; only floating things (sheets, dialogs, tab bar, FAB, map cards) get shadow.
- Narrow with Tabs → chip strip → filter sheet; a filter trigger names what's applied ("All orders").
- Bottom sheets: top radius 28, grabber 44×5, sizes ≤94%; a single selection commits on tap (no Cancel | Apply).
- Offline-first: wordless red tint on the header, ranked sync banner, row-level "Waiting to send", cached data
  stays on screen.
- Capsule buttons (radius = height/2, 46 / compact 38), press scale .98, ≥48dp targets, haptics per event
  (select · press · threshold · commit · warn · error); navigation is silent.

## 4. Workflow

1. **Read the codebase first.** If the project already has shared kits (header, table, drawer, form, sheet,
   list card), reuse them. If it already ships its own tokens, keep them; apply the Ashcharya grammar, laws
   and craft on top (`references/sources/` documents the three original apps if you're inside one of them).
2. **Sketch the structure** with §3: which header KPIs, which filters, which 6 panels, which columns (one
   value each), which drawer tabs, which mobile sections.
3. **Style with tokens only.** No raw hex in components, no new hues; status colour from the tone map;
   numbers in tabular figures with the display face.
4. **Give every data surface four faces:** loading (real-shaped skeleton), empty (line-art + one sentence +
   one action; "Clear filters" when filters emptied it), error (plain cause + Retry), denied. Stale data shows
   a thin pulse bar, never a spinner over everything.
5. **Check both themes and all widths.** Web 375 / 768 / 1024 / 1280 / 1536. Mobile 320 / 375 / 412dp, Hindi
   strings (~25% longer), font scale 1.3, reduced motion, offline.
6. **Decide, don't survey.** Pick the strongest direction, build it, show it (screenshot if a dev server runs).
7. **Run the checklist** in §6.

## 5. Making a screen "extraordinary"

When a screen feels plain, add structure and craft, never glow:

| Lever | Use |
|---|---|
| Shape | diagonal slab cut with a gold edge (`clip-path: polygon(26px 0,100% 0,100% 100%,0 100%)`), skewed rounded polygons (`skewX(-12deg)`), notched glyph tile (`13px 13px 13px 4px` + 10px gold square), asymmetric capsule radii |
| Depth | sunk tray `inset 0 1px 3px rgba(0,0,0,.28)` holding raised keys `inset 0 1px 0 rgba(255,255,255,.06), 0 2px 5px -2px rgba(0,0,0,.45)` |
| Texture | furrows `repeating-linear-gradient(-38deg, transparent 0 13px, rgba(255,255,255,.06) 13px 14px)` on canopy; paper grain (`feTurbulence`) on sign-in |
| Hand-made marks | rubber stamp (rotate −1.5°), wax-seal avatar (`#EBE2CC` + gold ring), pen-drawn gold underline SVG, masking tape |
| Weight | the ONE primary key gets a hard offset: `3px 3px 0 #061F18`, hover `4px 4px`, press `1px 1px` |
| Density | KPIs in the header slab, 6-panel dashboard, applied chips, counts in every filter option |
| Type | eyebrow `10.5px / 750 / .15em` caps with a 22px gold tick; titles 800 with −.03em tracking; serif only as accent |
| Motion | hovers 120–150ms, page/drawer enter 280ms `cubic-bezier(.16,1,.3,1)`, press spring; all off under reduced motion |

## 6. Done checklist

- [ ] Reuses the shared header / table / drawer / form / sheet kit; no page-specific forks
- [ ] Tokens only; one gold moment; status via the tone map; light **and** night both checked
- [ ] Tables: real grid, one value per column, accent edge on clickable rows, sort state visible
- [ ] List pages: filters in the header bar, applied chips, Dashboard | Table on the same line
- [ ] Dashboards from loaded rows (no new API calls); chart click filters the list
- [ ] Records and forms open in the drawer / sheet; confirms state exactly what happens to how many records
- [ ] Loading / empty / error / denied faces exist and look intentional
- [ ] Web 375 → 1536 and mobile 320 → 412 verified; no horizontal scroll; touch ≥48dp / 2.5rem; reduced motion respected
- [ ] No glow, glass, neon, gradient CTA, fake figures or marketing copy
- [ ] Keyboard path works (⌘K, Esc, ←/→, Tab order, visible focus ring); mobile haptics per event, offline + sync visible
