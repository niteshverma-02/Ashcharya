# Prasar app — field-staff mobile system (Expo / React Native)

Source repo: `Nitesh_projects/Prasar`. Expo + **NativeWind 4** (Tailwind 3.4), **Inter only**, **Lucide only**.
Light = forest `#15683F` on **sand ivory** `#F4EFE4`; dark = **GitHub Night** (`#0D1015` page, `#3FB950` green).
Target register: "Microsoft Dynamics / Salesforce Field Service" — **flat-enterprise core, genuinely elevated**.
Tokens are generated from `src/design-system/tokens.ts` → CSS vars → Tailwind classes. Trust the code over the
prose docs (docs lag: page is sand not white, list gap 6 not 16, tabs are a travelling pill not underlined, gutter `px-base`).

Copies of the real token/motion/haptics files: `assets/prasar-mobile/`.

## 1. Token pipeline rules (test-enforced: no `dark:`, no `bg-[#…]`, no `style` function, no raw icon size; lint: icon imports)
- Never write `dark:` — `bg-surface` flips by itself. Never `bg-[#…]`. Never a function in `style`.
- In JS read colours via `useColors()`. Auth screens wrap in `<FixedThemeProvider scheme="light">`.
- Spacing only from the scale (no `gap-[6px]`); hairlines are `h-px`; borders only `hairline:1` / `emphasis:2`.
- Icons from `@/design-system/icons` only, sizes from `iconSize` only (no raw numbers), 2px stroke.
- Theme preference `"system" | "light" | "dark"` (MMKV `prasar-theme`), default system.

## 2. Colours
| Role | Light | Dark |
|---|---|---|
| `primary` (FILL) / `primaryHover` | `#15683F` / `#0F4F30` | `#2EA043` / `#3FB950` |
| `primaryText` (FOREGROUND) | `#146137` | `#3FB950` |
| `accent` gold (targets hit, incentives earned, streaks) | `#8F6410` | `#D29922` |
| `success` / `warning` / `danger` / `info` | `#1F7A4D` / `#93610E` / `#B4342C` / `#2C6E8F` | `#3FB950` / `#D29922` / `#FF7B72` / `#58A6FF` |
| `*Surface` tints (success/warning/danger/info/brand/accent) | `#E4F2EA` `#F7EEDC` `#FAE7E4` `#E5EFF4` `#E8F1EB` `#F5EEDD` | `#2A3D30` `#403828` `#4A3335` `#303A47` `#2B3C36` `#403828` |
| `background` (page) | `#F4EFE4` sand ivory | `#0D1015` |
| `surface` / `elevatedSurface` | `#FFFFFF` / `#FFFFFF` | `#262C34` / `#353C46` |
| `border` / `divider` | `#D8E1DC` / `#E7EEEA` | `#5B6573` / `#404853` |
| `hoverSurface` / `skeleton` | `#E1E9E4` / `#E4EBE7` | `#343B44` / `#343B44` |
| `scrim` | `rgba(6,20,13,.42)` | `rgba(1,4,9,.66)` |
| `offlineTint` | `rgba(180,52,44,.10)` | `rgba(255,123,114,.12)` |
| `text.primary/secondary/tertiary/disabled` | `#16211B` `#5B6B62` `#606F66` `#A2ADA6` | `#E6EDF3` `#B1BAC4` `#9DA5AE` `#6E7681` |
| `text.inverse` (flips) | `#F5FAF7` | `#0D1117` |
| `tag` — the ONE decorative hue (purple "Ordering for" pill) | `#EDE7FA` / `#54359C` | `#3F354D` / `#D2A8FF` |

**Capsule group** (cards, headers, chips, tabs paint from here — not `surface`):
`capsule.surface #FBF8F1 / #161B22`, `border rgba(74,64,40,.11) / rgba(240,246,252,.10)`, `rim rgba(255,255,255,.92) / rgba(255,255,255,.06)`,
`control #F3EEE2 / #21262D`, `controlActive #E3EDE5 / #2B3C36`, `ink #1C2420 / #E6EDF3`, `muted #5A615B / #B1BAC4`,
`badge #123D2C / #2B3C36` (ink `#F2F7F3 / #F0F6FC`), `live #2FA866 / #3FB950`, `champagne #B08D4A / #D29922` (line `rgba(176,141,74,.30) / rgba(210,153,34,.22)`), `sage rgba(92,122,100,.14) / rgba(177,186,196,.08)`.

**Hero** (Home canopy / attendance; light ink in both themes): `#123D2C` ramp `#1A5238 → #0E3323`, text `#F2F7F3`,
gold `#E2B75C`, live `#6FE3A4` (dark: slate `#2D343E` ramp `#323A45 → #272E37`, text `#F0F6FC`, gold `#E3B341`, live `#3FB950`).
**Nav** (tab bar): `#0E3B29` (top `#1A4534`), active gold `#F1C84B`, inactive `#8AA396`, FAB `#15683F` (dark: slate `#262C34`,
top `#2D343E`, active green `#3FB950`, inactive `#8B949E`, FAB `#2EA043`). **CTA ramp** `#1A8050 → #0B4429` (dark `#3FB950 → #2EA043`);
danger `#C24138 → #8E241E` (dark `#FF7B72 → #F85149`); soft `#F1F8F4 → #DDEBE2` (dark `#2B3C36 → #27362F`).

**Map**: stops pending `#1D6FE0` · visited `#E4741A` · skipped `#D03A2F`; pin `#FFFFFF` ring `#1F2A24`; `mapPanel` is its own
group (not hero), header card stays light in both themes. Dark Google style: geometry `#1c2128`, roads `#30363d`,
water `#0c1a2b`, park `#1b2e24`, labels `#8b949e`; light style `[]` (never `undefined`). Rotate/pitch/toolbar/compass off.

**Contrast tests** (~150 pairs, most run in both themes, no exemption list): text 4.5:1, non-text 3:1 (a few structural steps
and disabled pairs have lower floors), gradients tested at both stops.
**Chroma rule — neutrals are tinted, never painted:** HSL saturation ≤ 0.24 for all neutrals (light page may reach 0.45 — sand).

## 3. Scale
```ts
spacing = { xs:4, sm:8, md:12, base:16, lg:20, xl:24, "2xl":32, "3xl":40, "4xl":48, "5xl":64 }
radius  = { small:8, button:12 /* tiles */, input:12, search:12, card:16, large:20, dialog:20, hero:24, sheet:28, chip:999 }
touchTarget.min = 48; controlHeight = 46; controlHeightCompact = 38
iconSize = { xs:16, small:20, default:24, large:28, hero:40 }
CONTENT_MAX_WIDTH = 640; HEADER_ROW_HEIGHT = 56; PILL_BAR_HEIGHT = 64; NAV_FAB_SIZE = 56
useBottomBarPadding() => insets.bottom > 0 ? insets.bottom + 12 : 20   // inset + gap, never max()
```
Shadows (only floating things): subtle y1/.05/3 · card y2/.06/10 · floating y8/.10/24 · floatingStrong y8/.30/20 ·
bottomSheet y12/.12/40 · dialog y16/.14/48. Cards are **flat ivory** by default.

Narrowest screen 320dp; Hindi runs ~25% longer. Growing side `flex-1 min-w-0`, fixed side `shrink-0`; `minHeight`, never fixed `height`.

## 4. Typography (Inter 400–800)
| Variant | Weight | px/lh | | KPI | Weight | px/lh |
|---|---|---|---|---|---|---|
| displayXl | 700 | 32/42 | | revenue | 700 | 32/42 |
| h1 | 600 | 24/32 | | orders/collections/targets | 700 | 28/38 |
| h2 | 600 | 20/28 | | cardValue | 600 | 28/36 |
| h3 | 600 | 17/24 | | metricTile | 700 | 24/30 |
| h4 | 600 | 15/22 | | heroTime | 700 | 22/28 |
| body | 400 | 15/22 | | rowValue | 600 | 17/24 |
| small | 400 | 14/20 | | rowValueSm | 600 | 15/20 |
| caption | 500 | 12/18 | | rowValueXs | 600 | 13/18 |
| tiny | 600 | 11/16 | | | | |
All KPIs tabular. Font-scale caps: controls 1.2, KPIs 1.3, body free. Never `adjustsFontSizeToFit`, never inline fontSize on a KPI.
Roles: list-row title = **h4 + 1 line**; section/overlay title = h3; detail hero = h2 + 2 lines; section label = tiny uppercase
`letterSpacing 1.2`; a figure is never smaller than its label; every tile in a grid uses the same KPI rung. Compact money `₹12.5L`.

## 5. Signature components
- **HeaderCapsule** (every header): ivory object on the page, **asymmetric radii TL/BR 28, TR/BL 20**, 1px rim highlight on top,
  sage leaf wash top-left + ONE 1px champagne curve; 40dp forest `CapsuleBadge` with live dot; h3 title + caption sub;
  34dp round buttons (theme, bell with "9+" badge). On scroll the capsule **lifts** (shadow, no hairline).
  `HeaderToolbar`: one 38dp pill (search | divider | filter) + round actions + compact "New".
- **PillTabBar**: Home · Route · Orders · Reports · Profile; deep forest bar (slate in dark), travelling 32dp pill (springs), 2×32 **gold beam** (green in dark),
  an SVG **wave** across the top edge on change (560ms, off under reduce motion); 56dp FAB → Quick Actions sheet.
- **Card** (`tone` = card IS the status; `accent` = card is ABOUT the status — 3px rail + corner wash; never both).
  **SectionCard**: heading INSIDE one ivory card (radius 20, 28dp glyph tile, h4 title, "Open ›" link, hairline, content).
  **ListCard**: ivory, radius 20, hairline, 14/12 padding, pressed = `capsule.control`, gap 6 between cards.
- **List row** (RetailerCard): `SwipeableRow` (Call / Navigate) → `ListCard` → `EntityAvatar 44` (square r8, initials, no
  per-name hues) + h4 name + caption meta + `StatusPill` (tone surface + 7px dot + label) → hairline → `ValuePill` + quick
  actions (36dp round). Other lists (Orders, Products, histories, search) enter rows via `ListItemEntrance` (stagger 28ms, max 6).
- **KpiCard**: title body-secondary, icon right, `kpi=cardValue`, trend + "Updated …". Compact = metricTile + IconTile.
  Home has no metric-card grid now: today's four figures are `CanopyFigures`, one strip on the canopy. Rails stay off metric
  grids/rails (`accentRail={false}`) — rails read as table ruling.
- **Button**: **capsule** (`radius = height/2`), 46 / compact 38, label 14/600. primary = ctaGradient overlay on opaque base +
  1px rim + top sheen + tinted floating shadow; secondary = soft ramp; text = none. Press: wash 90ms in / 160ms out + scale 0.98.
  3+ actions → `EntityActions` (glyph over label). **CheckoutBar**: the bar IS the button (60dp pill, total + MRP strike).
- **Chip** (capsule control, selected = controlActive + primary border), **Badge**, **Tabs** (pill track + ONE travelling filled pill).
  Narrowing: views → Tabs; 1–2 facets → Chip strip; more → FilterButton → FilterSheet (+ FilterTokens). The trigger
  **names the applied filter** ("All orders"), never "Filter".
- **Forms**: field shell `min-h-[56px] rounded-input border bg-surface` (dense 44); label small/600 secondary; focus primary
  border; RHF + Zod. Capture screens: SubjectHero + FactGrid → one Card per question → StickyFooter commit (**no shadow**).
  Fields made irrelevant are **absent, not disabled**.
- **Bottom sheets** (9 patterns: Action, Selection/Sort, Filter, DateRange, Confirm, Form, Search, Info, Stepper + QuickActions).
  Top radius 28, grabber 44×5, gutter 20, sizes content(≤90%)/34/56/84/94% — never 100%. Single selection commits on tap —
  **no default Cancel | Apply**. Strong scrim only for consequence. Only `sheets/` may import `@gorhom/bottom-sheet`.
- **Dialog**: fade modal, card max 360, radius 20, h3 + body, full-width stacked buttons.
- **Toasts**: bottom, above tab bar, radius 20, solid fill (default ink / success / danger), 3s, `role=alert`, haptic commit/error.
- **Home**: deep-green canopy (`hero.surface`, slate in dark; + radar pattern) with header, search, status hero, figures → ivory sheet lip (radius 30,
  overlaps 28, 40×4 grab line) → zones 6dp apart: Today's route (live map), Your day, Recent activity, This month, More.
- **Charts**: hand-rolled `react-native-svg` (Sparkline, BarChart); mark primary, grid divider dashed "3 5"; trend 132 / bars 128 high.
- **Auth** (the premium carve-out, always light): dark arch, flat-silhouette farmland (sun, ridges, tractor, farmer), glass card
  `rgba(233,245,231,.68)` r24, pill fields 46, forest continue bar with white knob.

## 6. States
- Skeleton in the row's real shape, pulse 1 → .55 over 1800ms; **never a spinner on a blank screen**; content fades in 220ms.
- Empty: illustration (route, shop, field, receipt, activity, search, inbox, offline) or 76dp icon well, h3 + body + **an action**
  (filtered empty → "Clear filters").
- Error only when cache is empty; with cache keep the list + banner "Showing saved data". Retry + Contact support.
- **Offline-first**: header gets a wordless `offlineTint` wash; `OfflineBanner` ranks failed > pending > stale with counts;
  row-level "Waiting to send" pill; writes via `runOrQueue`; persisted TanStack cache (MMKV); sync queue screen with Retry/Discard.
- Broken photo: dashed card + ImageOff + what failed — never a grey box.
- **No fake analytics**: every figure traces to a backend field; missing = `—`, partial = trailing `+`.

## 7. Interaction
- **Haptics by event**: `select` (chip/tab/radio) · `press` (primary/danger button, sheet command) · `threshold` (swipe) ·
  `commit` (write confirmed) · `warn` (destructive) · `error`. Navigation and secondary buttons are silent.
- **PressableScale** everywhere (spring damping 22 / stiffness 320 / mass .6; control .98, surface .985). Never put layout
  classes on a PressableScale — wrap it in a View.
- Swipe rows: friction 2, threshold 48, 88dp panels; always duplicated by visible buttons.
- Motion: instant 90 · quick 160 · standard 220 · deliberate 260 · reveal 420 · flourish 560; stack slide 260ms; sheets no
  bounce, ≤260ms; all `ReduceMotion.System`.
- Pull-to-refresh on every list (`usePullToRefresh`). Every vertical scroller wires `useHeaderScroll()`.
- A11y: ≥48dp targets (hitSlop 4–14), real roles/states, status never by colour alone.
- One primary goal per screen; offline/GPS/sync status always visible; one add control per screen.

## 8. Rejected here
Glass/neon/glow/blur outside splash/auth + tab bar · decorative gradients outside the closed allow-list · fake analytics ·
StickyFooter shadow ("ye uthi hui kyu he?") · NextStopBar elevation · rails on the metric grid · seedling sprig on login CTA ·
cool green-white page that read "light blue" · square-cornered buttons · per-name avatar hues · extra hand-drawn glyphs ·
rebuilding a control with many new ideas at once (change one thing, check on device) · "match the neighbouring screen" as a rule.
