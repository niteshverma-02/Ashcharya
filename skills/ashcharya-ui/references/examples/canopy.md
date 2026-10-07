# Worked example — the "Canopy" identity (full spec)

> One complete output of the approach: the unified look of the three source apps. Use it as a model of
> how detailed an identity spec should be, or as-is when building inside that product family. For a new
> product, derive its own identity with `../method/identity.md`.

Every value here is in shipped code in at least one of the three source apps (see `sources/`).

## 1. Colour tokens

| Token | Light | Night | Role |
|---|---|---|---|
| `canvas` | `#F6F5F1` | `#15181D` | page background (warm paper / GitHub dark) |
| `surface` | `#FFFFFF` | `#1C2128` | cards, tables, drawers |
| `surface-ivory` | `#FBF8F1` | `#161B22` | headers, list cards, section cards (mobile + auth) |
| `surface-raised` | `#FFFFFF` | `#21262D` | popovers, sheets, dialogs |
| `line` | `#E5E3DA` | `#30363D` | borders, table rules |
| `line-soft` | `#EFEDE5` | `#21262D` | dividers, inner rules |
| `ink` | `#16211B` | `#E6EDF3` | primary text |
| `ink-2` | `#5B6B62` | `#D1D9E0` | secondary text |
| `ink-faint` | `#838A80` | `#8B949E` | captions, placeholders, axis |
| `canopy` | `#0F4033` | `#161B22` | sidebar, header slab, hero, tab bar |
| `canopy-1 → canopy-2` | `#0B3328 → #13503F` | `#161B22 → #21262D` | canopy ramp (115°) |
| `on-canopy` | `#F6F2E7` | `#E6EDF3` | text on canopy |
| `action` | `#15683F` | `#2EA043` | primary buttons, active states |
| `action-hover` | `#0F4F30` | `#3FB950` | |
| `action-text` | `#146137` | `#3FB950` | green text/links on surfaces |
| `gold` | `#E2B864` | `#D29922` | the one accent: active nav rim, primary key, KPI bullet |
| `gold-ink` | `#2A1D02` | `#2A1D02` | text/icons on gold |
| `gold-text` | `#8F6410` | `#D29922` | gold as text on surfaces |
| `mint` | `#74E5B0` | `#3FB950` | live/positive marks on canopy |
| `success` / surface | `#1F7A4D` / `#E4F2EA` | `#3FB950` / `#2A3D30` | |
| `warning` / surface | `#93610E` / `#F7EEDC` | `#D29922` / `#403828` | |
| `danger` / surface | `#B4342C` / `#FAE7E4` | `#FF7B72` / `#4A3335` | |
| `info` / surface | `#2C6E8F` / `#E5EFF4` | `#58A6FF` / `#303A47` | |
| `brand-surface` | `#E8F1EB` | `#2B3C36` | tinted glyph tiles, soft buttons |
| `drop` | `#061F18` | `#061F18` | hard offset shadow under the gold key |

Rules
- **One hue family** (green) + **one accent** (gold). Never introduce a new hue for decoration; categorical
  colour only inside charts (fixed order below).
- Neutrals are *tinted, never painted*: keep greys low-saturation.
- Text pairs ≥ 4.5:1, non-text UI ≥ 3:1, in both themes.
- Night = GitHub dark. Not green-tinted, not pure black.

### Chart series (fixed order, never cycled; 9th+ folds into "Other")
Light `#2A78D6 #EB6834 #1BAF7A #EDA100 #E87BA4 #008300 #4A3AA7 #E34948`, other `#9A9A94`.
Night `#3987E5 #D95926 #199E70 #C98500 #D55181 #008300 #9085E9 #E66767`, other `#6E7681`.

## 2. Type

| Role | Web | Mobile (Inter) | Size / line | Weight |
|---|---|---|---|---|
| Display / hero number | Bricolage Grotesque | Inter | 32 / 42 | 700–800 |
| Page title | Bricolage Grotesque | Inter | 24–25 / 32 (21 on phone), −.03em | 800 / 600 |
| Section title | Bricolage Grotesque | Inter | 17 / 24 | 600–700 |
| Row / card title | Plus Jakarta Sans | Inter | 15 / 22, one line | 600 |
| Body | Plus Jakarta Sans | Inter | 14–15 / 22 | 400–500 |
| Caption / meta | Plus Jakarta Sans | Inter | 12 / 18 | 500 |
| Eyebrow | Plus Jakarta Sans | Inter | 10.5, .15em caps, gold 22px tick after | 750 |
| Table header | Plus Jakarta Sans | — | 11 (.68rem), .06em caps | 700 |
| KPI | Bricolage Grotesque, tabular | Inter, tabular | 20–32 | 700–750 |
| Serif accent | Fraunces (dates, sign-in headline, brand line) | — | — | 600, italic allowed |
| Mono | JetBrains Mono (clocks, kbd) | — | 11–12 | 400–500 |

All numbers use tabular figures. A figure is never smaller than its label. Money is compact (`₹12.5L`, `₹3.0Cr`).

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,400..600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## 3. Space, shape, depth, motion

- **Spacing:** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64. Page gutter 16 on phone, 24 on desktop.
- **Radius:** 8 small · 12 control · 16 card · 20 panel · 24 hero · 28 sheet · 999 pill. Asymmetric capsule
  `28 20 28 20` for the mobile header; notched glyph tile `13 13 13 4`.
- **Controls:** web 36–40px tall; mobile 46 (compact 38); touch targets ≥ 48dp / 2.5rem.
- **Borders:** 1px hairline; 2px only for emphasis (table header rule, focus).
- **Shadow:** cards are flat (border, no shadow) or carry a long soft drop
  (`0 1px 2px rgb(15 64 51/.05), 0 16px 32px -26px rgb(11 51 40/.5)`). Floating things only: sheets, dialogs,
  popovers, tab bar, FAB. Plus the one **hard offset** under the gold key: `3px 3px 0 #061F18`.
- **Motion:** instant 90 · hover 120–150 · standard 220 · enter 280ms `cubic-bezier(.16,1,.3,1)` · press spring
  (damping 22, stiffness 320, mass .6, scale .98). Sheets never bounce. Every animation off under reduced motion.

## 4. Components (web)

**Sidebar.** Canopy surface with furrows, floating (8px margin, radius 14). One **sunk tray** per module
(`padding 6px; radius 16; background rgba(3,20,15,.28); inset 0 1px 3px rgba(0,0,0,.28)`), a small caps
coloured label, then **raised keys** (min-h 40, radius 12, `rgba(255,255,255,.055)` fill, 1px
`rgba(255,255,255,.08)` border, `inset 0 1px 0 rgba(255,255,255,.06), 0 2px 5px -2px rgba(0,0,0,.45)`; tinted
29px icon tile; chevron). Hover lifts 1px. **Active = 1.5px gold rim, gold/14% fill, solid gold icon tile, 6px
gold seed dot outside the key.** Folds to a 72px rail with hover fly-outs. No search field in the sidebar.

**Top bar.** 62px, radius 16, canopy-tinted paper (`color-mix(#0F4033 6%, #fff)`). Two floating canopy
parallelograms (`::before` with `skewX(-12deg)`, radius 14, furrows, inset gold rim .35): left = page stamp
(1.5px border caps 9.5px, rotate −1.5°) + serif title; right = serif-italic date with a gold pen underline +
mono time, the gold **primary key** with hard offset, round outline icon buttons, wax-seal avatar. White pill
search in the middle with a `Ctrl K` hint.

**Page header (one per page, never a page-specific hero).** Card radius 16. Left: glyph tile 44px canopy with
a 10px gold notch, eyebrow + gold tick, title, one-line description. Right: canopy **slab** cut on a 26px
diagonal with a 3px gold edge, holding 2–4 KPI tiles (min-w 92, caps label with a 5px tone square, 20px
value; clickable to filter; active = cream `hsl(42 45% 96%)` tile with ink text). Below: control bar on a well
background, inputs 36px radius 9 with an inset 1px line, primary button pushed right. Tabs 30px radius 8;
active tab = filled with a 4px gold square top-right.

**Filters.** Scope picker first, then date window (All / Today / Yesterday / 7d / 30d / 90d / This month /
Last month / Custom range), multi-selects with counts (searchable when > 8 options), sort. A control holding a
value: `inset 0 0 0 1px action/.55, 0 0 0 3px action/.08`. Applied filters show as removable chips with
"Clear all" and a result count.

**Table — the real grid.** Header 42px, `hsl(160 18% 91%)` fill (night `hsl(215 15% 17%)`), 11px/700/.06em caps, 2px bottom rule.
Rules between every row and column, zebra stripe, hover tint `action/.07`, clickable row shows a 3px action
edge on hover, selected `action/.10`. Cells 11px 14px, first/last cell 18px. Money right-aligned. Wrapper
radius 16, overflow hidden. One value per column.

**Dashboard panels.** Radius 20, border, a 2px action→gold hairline on top, furrow patch top-right. Icon tile
36px radius 12 tinted. Kinds: trend (area), breakdown (donut + ranked legend), top-N bars, columns by period,
rhythm (hour × weekday), stat grid (hairline-divided cells, delta chips ↗/↘ or "— vs prev").

**Drawer.** Flat (border, no shadow), 3px action→gold hairline on top, furrows on the head's right 45%.
Head: title, subtitle, status badges, round 32px buttons (prev/next, ⛶, ✕). Body: stat strip (hairline grid),
field list (2 columns, 3 at ≥880px container), sections. Sticky footer `bg surface/95 + blur`.

**Forms.** Grey sheet (canvas), white fields 42px radius 8, labels 12px/500 secondary, required `*` in danger,
top tabs for type/mode, item cards with a 4px action left border, dashed "+ Add" card, collapsible
"Additional details", footer Cancel (outline) + Save (solid action, label "Saving…" while busy).

**Buttons.** Solid fills only: primary = action, soft = brand-surface, outline = surface + line, ghost, danger.
Radius 8–9 on web (capsule on mobile). The single gold key with hard offset is reserved for the screen's
headline action (e.g. "New sale").

**Badges.** Pill 24px, 11px/700, tone/10% fill + inset tone/25% ring + tone text. Tags (categories, never
status): 22px radius 6, colour from `--tag` via `color-mix`.

**States.** Empty: line-art in a 64px tinted tile, one title, one sentence, one action. Loading: skeleton in
the real shape (a table skeleton draws the real header + rows), shimmer 1.4s. Error: plain cause + Retry.
Stale: 2px pulse bar on the card top. One global 6px rounded scrollbar.

**Sign-in.** "Field notebook": cream paper `#F3EEE3` + grain, card `#FFFDF8` with masking tape, ink
`#1F3A2E`, green `#22553F`, clay `#B5522B`, mustard `#D9A42B`; Fraunces headline with a pen-drawn mustard
underline, a real photo pinned askew, a ruled index of the app's real modules, a rubber stamp; pill fields
50px; solid CTA with a 2px hard bottom; OTP digits in serif.

## 5. Components (mobile)

**Capsule header.** Ivory, radii 28/20/28/20, 1px rim highlight on top, a sage wash top-left and one 1px
champagne (`#B08D4A`) curve; 40dp canopy badge with a live dot; title + caption; 34dp round buttons. On scroll
it lifts with a shadow instead of a hairline. Toolbar: one 38dp pill (search | divider | named filter) + round
actions + compact "New".

**Tab bar.** Full width, canopy with a vertical ramp, 64dp + inset; 5 tabs; a 32dp travelling pill (spring),
a 2×32 gold beam, a small wave across the top edge on change; 56dp FAB above it opening a quick-actions sheet.

**Cards.** Flat ivory, radius 16 (section/list cards 20), hairline border. Section card = heading *inside* the
card (28dp tinted tile, title, "Open ›"), hairline, content. List card = avatar 44 · one-line title · caption
meta · status pill (tone surface + 7px dot + label) / hairline / value pill + 36dp round quick actions; cards
6dp apart; swipe left/right for call/navigate, always duplicated by visible buttons.

**Sheets.** Top radius 28, grabber 44×5, gutter 20, sizes content (≤90%) / 34 / 56 / 84 / 94%. Patterns:
action, selection, filter, date range, confirm, form, search, info, stepper.

**Toast.** Bottom, above the tab bar, radius 20, solid fill (ink / success / danger), 3s.

**Offline.** A wordless danger/10% tint on the header; a ranked banner (failed > pending > stale) with counts;
row-level "Waiting to send"; a sync queue screen with Retry/Discard. Cached data always stays on screen.
