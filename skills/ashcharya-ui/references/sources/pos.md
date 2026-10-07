# Prasar POS — "Harvest" system (store counter app)

> **Source reference.** This documents the original store POS that Ashcharya UI was distilled from. Use it only when editing that codebase (match its existing tokens there); for a new product, follow the approach in `../../SKILL.md`.

Source repo: `Nitesh_projects/franchise-pos`. Light = **Harvest** (jade + harvest gold, cool field-mist).
Dark = **GitHub dark** (#15181d canvas). Fonts: Plus Jakarta Sans (body), Bricolage Grotesque (display/numbers),
Fraunces (serif accents only), JetBrains Mono (clocks, kbd).

> Restraint stated in the source CSS: solid colour, hairlines and hard offsets. **Nothing glows.** Gold is for
> ONE thing per screen. Drawers are flat (border, no shadow). Tables = a real grid, every cell its own box.

## 1. Tokens

### Light `:root` (HSL triplets, used as `hsl(var(--x) / a)`)

| Token | HSL | Role |
|---|---|---|
| `--background` | `150 20% 97%` | field-mist page |
| `--foreground` | `165 30% 9%` | ink |
| `--card` | `0 0% 100%` | white |
| `--primary` | `162 70% 28%` | **jade** |
| `--primary-glow` | `160 58% 38%` | jade light (gradient end) |
| `--secondary` | `160 20% 93%` | |
| `--muted` / fg | `160 18% 94.5%` / `165 8% 40%` | |
| `--accent` / fg | `160 36% 94%` / `162 70% 20%` | |
| `--brand-lime` | `42 95% 55%` | **harvest gold** (legacy name) |
| `--brand-ink` | `168 40% 10%` | deep jade-slate |
| `--destructive` | `356 66% 47%` | |
| `--border` / `--input` | `160 14% 89%` / `160 13% 85%` | |
| `--ring` | `162 70% 32%` | |
| `--warning` / `--success` / `--info` | `36 92% 46%` / `154 60% 30%` / `208 72% 40%` | |
| `--radius` | `0.75rem` | |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | |

```css
--shadow-tint: 168 40% 10%;
--shadow-xs: 0 1px 2px hsl(var(--shadow-tint) / .05);
--shadow-sm: 0 1px 2px hsl(var(--shadow-tint) / .04), 0 4px 14px -6px hsl(var(--shadow-tint) / .08);
--shadow-md: 0 2px 4px hsl(var(--shadow-tint) / .04), 0 14px 30px -12px hsl(var(--shadow-tint) / .16);
--shadow-lg: 0 4px 10px hsl(var(--shadow-tint) / .05), 0 28px 60px -20px hsl(var(--shadow-tint) / .28);
--furrows: repeating-linear-gradient(-38deg, transparent 0 13px, hsl(0 0% 100% / .06) 13px 14px);
```

### Dark `.dark` — GitHub dark

| Token | HSL | Hex |
|---|---|---|
| `--background` | `217 16% 10%` | #15181d |
| `--foreground` | `212 20% 86%` | #d1d9e0 |
| `--card` | `216 17% 13%` | #1c2128 |
| `--popover/--secondary/--muted` | `215 15% 15%` | #21262d |
| `--muted-foreground` | `212 9% 58%` | #8b949e |
| `--accent` | `213 13% 19%` | #282e36 |
| `--primary` | `137 50% 42%` | GitHub green |
| `--brand-lime` | `39 72% 52%` | attention gold |
| `--destructive` | `3 85% 64%` | #f0605a |
| `--border` | `212 12% 21%` | #30363d |
| `--ring` | `212 92% 62%` | GitHub focus blue |
| `--success/--info/--warning` | `128 46% 52%` / `212 92% 66%` / `39 72% 52%` | |

Dark rules: jade→gold mixed fills become jade-only; product photos dimmed; shadows are pure black alpha;
furrows drop to `.025` alpha; `color-scheme: dark`.

### Accent families (one tone per theme)
Raw Tailwind colour classes (`bg-emerald-500`, `text-amber-600`…) are remapped by `html.light/.dark` selectors to
`--n-green/teal/amber/orange/red/pink/blue/violet` so a page can never invent its own hue. Change a family there, not per page.

### Tables + charts
```css
:root { --tbl-head-bg:hsl(160 18% 91%); --tbl-head-rule:hsl(160 14% 80%); --tbl-stripe:hsl(160 20% 97.5%);
        --tbl-hover:hsl(var(--primary)/.07); --tbl-selected:hsl(var(--primary)/.1); }
.dark { --tbl-head-bg:hsl(215 15% 17%); --tbl-head-rule:hsl(212 12% 26%); --tbl-stripe:hsl(216 16% 14.5%);
        --tbl-hover:hsl(var(--primary)/.12); --tbl-selected:hsl(var(--primary)/.16); }
/* chart series: FIXED order, never cycled */
:root { --viz-1:#2a78d6; --viz-2:#eb6834; --viz-3:#1baf7a; --viz-4:#eda100; --viz-5:#e87ba4;
        --viz-6:#008300; --viz-7:#4a3aa7; --viz-8:#e34948; --viz-other:#9a9a94; }
.dark { --viz-1:#3987e5; --viz-2:#d95926; --viz-3:#199e70; --viz-4:#c98500; --viz-5:#d55181;
        --viz-6:#008300; --viz-7:#9085e9; --viz-8:#e66767; --viz-other:#6e7681; }
```

### Tailwind
`darkMode:["class"]`; fonts `sans`=Plus Jakarta Sans, `display`=Bricolage Grotesque, `mono`=JetBrains Mono;
colours = shadcn tokens + `warning/success/info` + `brand.{lime,ink,glow}`; `boxShadow.elev-xs..lg`;
radius `2xl`=20 `xl`=16 `lg`=12 `md`=9 `sm`=5.

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,400..600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
`td, .tabular-nums, [data-numeric]` → `font-variant-numeric: tabular-nums`. `::selection` = gold/.45 on brand-ink.

## 2. Signature components

### PageHeading "Split Slab" — ONE header on every page (never page-specific heroes)
```
.pos-page-card (rounded 16px, border, card)
  .pos-ph-top   [back] [glyph 44px + gold notch] eyebrow / title / one-line desc  |  deep-jade slab (diagonal cut + gold edge) with meta KPIs or date+clock
  .pos-ph-bar   [FranchiseFilter] [filters…] [primary action → margin-left:auto] [view-slot: Dashboard|Table]
  .pos-tabrow   tabs (overflow folds into "⋯", never a scrollbar)
```
API: `PageHeading({title, description, icon, actions, meta: {label,value,tone?:"gold"|"amber"|"red"|"mint",hint,active,onClick}[], eyebrow, onBack, franchise = true, children})`.
```css
.pos-ph-eyebrow { font-size:10.5px; font-weight:750; letter-spacing:.15em; text-transform:uppercase; color:hsl(var(--primary)); }
.pos-ph-eyebrow::after { content:""; flex:0 0 22px; height:1px; background:hsl(var(--brand-lime)); }
.pos-ph-title { font-family:"Bricolage Grotesque"; font-weight:800; font-size:21px; letter-spacing:-.03em; } /* 25px ≥640 */
.pos-ph-slab { color:#fff;
  background: repeating-linear-gradient(-32deg, transparent 0 12px, hsl(0 0% 100%/.045) 12px 13px),
              linear-gradient(115deg, hsl(168 50% 9%), hsl(164 58% 17%));
  box-shadow: inset 0 3px 0 hsl(var(--brand-lime)); }               /* phone: gold top line */
@media (min-width:768px){ .pos-ph-slab { max-width:62%; padding:10px 14px 10px 42px;
  clip-path: polygon(26px 0,100% 0,100% 100%,0 100%); box-shadow:none; } }
```
KPI tile `.pos-ph-stat`: min-w 92px, label 10px/750/.13em caps with 5px square bullet in tone, value Bricolage 750 20px,
1px white/.14 dividers, clickable → hover white/.08, active = cream `hsl(42 45% 96%)` with ink text.
Control bar: inputs h 2.25rem, radius 9px, `inset 0 0 0 1px` line instead of border; focus `inset 0 0 0 1px primary, 0 0 0 4px primary/.1`.
Primary = slab green, `inset 0 -2px 0 gold/.6`, lifts 1px. Empty bar hides via `:has()`.
Active tab — CSS intent (`.pos-tab[data-state=active]`, `.pos-tab-on`): slab-green fill, white text, **4px gold square top-right**; dark = `--primary` fill.
⚠️ Live render (checked 2026-10-07 on Refill Orders): tabs are shadcn `TabsTrigger`s (also inside `OverflowTabs`), and their `data-[state=active]:bg-card` utility beats the `.pos-tab` rule in **light** mode, so the active tab actually shows as a **white card chip + gold dot**. Dark mode shows the green `--primary` fill. Only the "⋯" overflow button (`.pos-tab-on`) gets the slab green in light. Match what ships (white chip) unless the user asks to fix the override.

### Sidebar "Field Command"
Floating deep-jade workspace (19rem; folds to 4.5rem rail with hover fly-outs; phone = sheet).
One **sunk tray per module** (small uppercase coloured label), each page a **raised key** (tinted icon tile, name, chevron).
Active = **gold rim + solid gold icon tile + gold seed dot**. No search field, no recent chips, no blurbs; open = workspace only (the icon rail appears only when folded); the only tags are `New` and Inventory's `N low`.
```css
.ks-shell { --ks-rail:#0a2d24; --ks-space:#0f4033; --ks-raise:#165242; --ks-ink:#f6f2e7;
  --ks-text:rgba(246,242,231,.86); --ks-muted:rgba(246,242,231,.6); --ks-tray:rgba(3,20,15,.28);
  --ks-key:rgba(255,255,255,.055); --ks-key-hover:rgba(255,255,255,.09); --ks-key-line:rgba(255,255,255,.08); }
.dark .ks-shell { --ks-rail:#0d1117; --ks-space:#161b22; --ks-raise:#212830; --ks-ink:#e6edf3; }
/* module tones (r,g,b): gold 217,180,96 · mint 86,186,140 · sky 110,170,214 · amber 222,150,92 · rose 212,132,150 · lilac 166,150,220 · clay 204,140,108 */
.ks-sec { padding:.4rem; border:1px solid rgba(255,255,255,.04); border-radius:1rem; background:var(--ks-tray);
  box-shadow: inset 0 1px 3px rgba(0,0,0,.28), 0 1px 0 rgba(255,255,255,.04); }
.ks-sec-head { color:rgb(var(--ks-hue)); }
.ks-sec-title { font-size:.65625rem; font-weight:800; letter-spacing:.14em; text-transform:uppercase; }
.ks-row { min-height:2.5rem; border:1px solid var(--ks-key-line); border-radius:.75rem; background:var(--ks-key);
  font-size:.84375rem; font-weight:600; box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 2px 5px -2px rgba(0,0,0,.45);
  transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease; }
.ks-row:hover { border-color:var(--ks-line-strong); background:var(--ks-key-hover); transform:translateY(-1px); }
.ks-row-icon { width:1.8rem; height:1.8rem; border-radius:.55rem; background:rgba(var(--ks-hue),.16); color:rgb(var(--ks-hue)); }
.ks-row[aria-current="page"] { border:1.5px solid #e2b864; background:rgba(226,184,100,.14); font-weight:700; }
.ks-row[aria-current="page"] .ks-row-icon { background:#e2b864; color:#2a1d02; }
.ks-row[aria-current="page"]::before { content:""; position:absolute; left:-.8rem; top:50%; width:.4rem; height:.4rem;
  border-radius:999px; background:#e2b864; transform:translateY(-50%); }
```
Don't animate sidebar width (re-lays out tables).

### Top bar "Register on jade"
Sticky, h 3.9rem, radius 16px, bar = `color-mix(in srgb,#0f4033 6%,#fff)`. Two floating jade **rounded parallelograms**
(`skewX(-12deg)`, radius 14px, furrows, thin gold inner rim): left = module rubber stamp + Fraunces title; right =
Fraunces-italic date with gold pen underline + mono time, gold **New sale** key with hard offset, round outline icon buttons, wax-seal avatar.
White pill search (Fraunces-italic placeholder, `Ctrl K` hint from lg) in the middle.
```css
.rg-shape::before { content:""; position:absolute; z-index:-1; inset:-.3rem 0; border-radius:14px;
  background: repeating-linear-gradient(-32deg, transparent 0 11px, rgba(255,255,255,.04) 11px 12px),
              linear-gradient(115deg, #0b3328, #13503f);
  box-shadow: inset 0 0 0 1px rgba(226,184,100,.35), inset 0 1px 0 rgba(255,255,255,.08), 0 8px 18px -10px rgba(6,31,24,.7);
  transform: skewX(-12deg); }
```

### Tables — a REAL grid, everywhere
Header row h 2.6rem, `--tbl-head-bg`, **0.68rem/700/.06em uppercase**, 2px bottom rule; rules between **every row AND column**;
zebra `--tbl-stripe`; hover `--tbl-hover` 120ms; clickable row = **3px jade inset edge** on first cell (on hover); selected `--tbl-selected`;
tfoot = head fill 600; links jade 600; wrapper radius 1rem overflow hidden. Never stack two values in one cell.
```ts
export const TABLE_CLASS = "pos-table w-full caption-bottom text-[13px] tabular-nums";
export const CLICK_ROW_CLASS = "pos-tr cursor-pointer";
```

### FilterKit + InsightsRow (every list page)
- Filters live in the header bar: `FranchiseFilter` first → `DateWindowFilter` (all/today/yesterday/7d/30d/90d/month/lastMonth/custom + 2-month range) →
  `MultiFilter` (popover with counts, most common first; search box when >8 options) → `SortFilter`. Set filter = `inset 0 0 0 1px primary/.55, 0 0 0 3px primary/.08` + accent fill.
- `AppliedFilters` chip strip under the bar + "Clear all".
- **Dashboard | Table** switch (remembered per page) sits on the filter/tab line, never its own row.
- Dashboard = ~6 panels in rows of three at **40/30/30**, trend first, computed from already-loaded rows — **no extra API calls**. Clicking a chart filters the list.
```css
.pos-dash-board { display:grid; gap:.875rem; grid-template-columns:minmax(0,1fr); }
@media (min-width:768px){ .pos-dash-board{grid-template-columns:repeat(2,minmax(0,1fr));} .pos-dash-board>:nth-child(3n+1){grid-column:span 2;} }
@media (min-width:1280px){ .pos-dash-board{grid-template-columns:4fr 3fr 3fr;} .pos-dash-board>:nth-child(3n+1){grid-column:auto;}
  .pos-dash-board>:last-child:nth-child(3n+1){grid-column:1/-1;} .pos-dash-board>:last-child:nth-child(3n+2){grid-column:span 2;} }
```
Viz panel: `rounded-2xl border bg-card shadow-elev-xs`, icon tile `h-9 w-9 rounded-xl bg-primary/10 ring-1 ring-inset ring-primary/15`,
2px jade→gold hairline on top, a masked furrows patch top-right. Tooltip `rounded-xl border bg-popover px-3 py-2 text-xs shadow-elev-md`.
DeltaChip pill `text-[11px] font-bold ring-1 ring-inset` success/destructive /10; null → "— vs prev".

### DetailDrawer (every read-only record view)
≥1024px **docks beside the list** (420 → 480 xl → 540 2xl; list shrinks, never covered); tablet = right sheet ≤560px;
phone = bottom sheet `92dvh rounded-t-3xl` with grab handle. ⛶ full screen replaces main (max-w 1200, "← Back to list"). ✕ close.
← / → walk records, Esc leaves full screen then closes. Flat panel with a 3px jade→gold top hairline, furrows on head right 45%.
Parts: header actions (pill h-8), badges (h-6 pill ring-inset; good/warn/bad/gold/neutral), Stats (hairline-divided grid,
Bricolage values), Fields (`dl` 2 cols → 3 at container ≥880px, tiny caps `dt`), sticky footer `bg-card/95 backdrop-blur`. Enter 280ms translateX(24px).

### FormDialog (all add/edit forms)
Default `mode="drawer"` — opens inside DetailDrawer; `mode="dialog"` only for yes/no confirms + quick pickers.
"Farmer profile" look: grey sheet (`--background`), white fields (h 2.6rem, radius .5rem), small grey 0.75rem/500 labels,
red `*`, badge in section heads, in-form types/modes = **tabs at the top** (segmented, active = card + hairline ring),
green left-border item cards (`border-left:4px primary; bg primary/.06`), dashed "+ Add" card, collapsible "Additional details",
footer Cancel (outline min-w 6rem) + flat green Save (min-w 8rem), right aligned; full-width on phone. Keep tab labels short (drawer ≈ 420–540px).

### AuthStage — "field notebook" (sign-in / OTP)
Cream paper `#f3eee3` + feTurbulence grain, card `#fffdf8`, ink `#1f3a2e`, green `#22553f`, clay `#b5522b`, mustard `#d9a42b`.
Fraunces headline with **pen-drawn mustard underline** (stroke-dash draw .9s), real farm photo pinned askew (−1.4deg, clay pin),
masking tape on the card, ruled-notebook index of real modules (blue rules every 2.1rem, red margin), rubber stamp SVG
(rotate −14deg, multiply, overshoot stamp-in), pill fields h 3.1rem, solid green CTA with `0 2px 0` hard bottom, OTP digits in Fraunces.
Copy names real modules ("Orders, Walk-ins, Inventory, Ledger…") — never marketing lines.

### Buttons, badges, tags, states
- Button base `rounded-lg text-sm font-semibold duration-150 active:scale-[0.98]`; sizes h-10 / sm h-9 / lg h-12 rounded-xl; touch min 2.5rem.
- Badge `rounded-full px-2.5 py-0.5 text-xs font-semibold`; success/info = tone/10 fill, warning = /15 with text deepened `hsl(30 90% 32%)` on white.
- `.pos-tag` colour from inline `--tag` via `color-mix` (32% border, 11% fill, 62% text).
- Empty: line-art SVG in `h-16 w-16 rounded-2xl bg-primary/[.07]` tile, one title + one sentence (no apology) + optional action.
- Skeleton shimmer 1.4s; table skeleton draws the real header + 8 rows; stale-data overlay = thin jade pulse bar + pill spinner.
- ONE global scrollbar style: 6px rounded neutral thumb `rgba(128,138,133,.42)` on every scroll region; page scroller (`.pos-app-main`) hides its bar. No per-region scrollbar styles.

## 3. Interaction
| Keys | Action |
|---|---|
| Ctrl/⌘ B | fold sidebar |
| Alt 1…7 | jump to module N in sidebar (one per module the login can open) |
| ↑ / ↓ | walk sidebar keys |
| Ctrl/⌘ K | focus the header search field |
| ← / → | prev/next record in drawer |
| Esc | exit full screen → close drawer |

Breakpoints: <768 sidebar sheet + bottom nav (4.25rem, centre FAB) + bottom-sheet drawers · ≥768 slab diagonal, 2-col board ·
≥1024 drawers dock · ≥1280 sidebar auto-opens, 40/30/30 board · ≥1536 dock 540, seeds.
Motion: page enter 280ms ease-out from translateY(8px); hover 120–150ms; animations ship `prefers-reduced-motion` off switches (page enter, dock, skeleton, sidebar, top bar, auth, rings…). Checked 2026-10-07: 31 of 34 `@keyframes` have a reduced-motion rule; 3 do not yet — `auth-caret` (`.auth-otp-caret`), `pos-hsearch-drop` (`.pos-hsearch-panel`), `tr-sweep` (`.tr-sweep`). New work must add the switch.
