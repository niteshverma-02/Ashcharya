---
name: prasar-ui
description: >
  Design and build next-generation, hand-crafted UI for the Katyayani / Prasar family of apps — the Prasar
  field-staff mobile app (Expo/React Native, forest on sand ivory, GitHub Night), the Franchisee POS store
  counter app ("Harvest": jade + harvest gold, GitHub-dark night) and the Franchise Hub head-office portal
  (HO, "Command OS": forest + mint on warm paper). Use it whenever you create or restyle ANY screen, page,
  component, dashboard, table, list row, filter bar, drawer, bottom sheet, form, sidebar, tab bar, top bar,
  login/OTP screen, empty/offline state or chart in these apps — or when the user asks for UI that looks "extraordinary", "premium",
  "next generation", "hub jaisa", "unique", or complains a screen looks "basic", "ajib", "ganda" or "AI generated".
  Also use for brand-new internal tools that should feel like part of the same family.
---

# Prasar UI — the field-grade design system

Three shipped apps, one family. This skill turns their real, battle-tested UI into rules you can apply to any
new screen so the result looks **hand-made, dense, keyboard-first and calm** — never like an AI template.

## 1. First, pick the surface

| Building for… | Identity | Read |
|---|---|---|
| Field staff mobile app (`Prasar`, Expo + NativeWind) | **Prasar field** — forest `#15683F` on sand ivory `#F4EFE4`, ivory capsules, Inter only, Lucide only; dark = GitHub Night `#0D1015` | `references/prasar-mobile.md` (+ real `assets/prasar-mobile/*.ts`) |
| Store counter / franchisee POS (`franchise-pos`) | **Harvest** — jade `162 70% 28%` + harvest gold `42 95% 55%`, cool mist, Plus Jakarta Sans + Bricolage Grotesque + Fraunces accents; dark = GitHub dark `#15181d` | `references/pos-harvest.md` |
| Head office portal (`franchise-hub`) | **Command OS** — forest `#1B4A36` + mint `#74E5B0` on warm paper `#F6F5F1`, Manrope + IBM Plex Mono; dark = deep forest | `references/ho-command-os.md` |
| New app in the family | Make a **third identity**: same quality bar + structural grammar (§3), own palette/texture/shape. Never clone either app. | `references/next-gen-patterns.md` §1 |

Always also read `references/taste-and-rejections.md` — it lists every look this team already rejected.
Drop-in tokens: `assets/harvest-tokens.css`, `assets/command-os-tokens.css`. Starter code: `assets/templates/`.
Visual reference you can open in a browser: `assets/showcase.html`.

## 2. The five laws (non-negotiable)

1. **Human, not AI.** No neon, no glassmorphism, no aurora blobs, no gradient CTA buttons, no cycling hero
   headlines, no "✨ Supercharge your workflow" copy. Depth comes from *craft*: sunk trays, raised keys,
   hairlines, hard offset shadows (`3px 3px 0`), inset rims, paper grain, furrows, stamps, pen underlines.
   (Grandfathered exceptions: HO's existing luxe layer on HO only. Prasar has an *exhaustive*, owner-approved
   gradient list in its `CLAUDE.md` — splash/login/OTP + `PillTabBar` pill/FAB glass, `Button` filled variants
   (`ctaGradient`), `CheckoutBar`, Home's quick action / attendance hero / metric cards, `Card accent`, map-floating
   panels — nothing may be added to it without the owner.)
2. **One component, everywhere.** One page header, one table style, one drawer, one form kit, one scrollbar,
   one status-tone map. Fix the shared component, never fork a page-specific variant.
3. **A real grid.** Tables have a header row, rules between every row *and* column, zebra, hover, an accent edge
   on clickable rows. **One value per column** — never stack name-over-phone or date-over-time.
4. **One accent moment per screen.** Gold (POS) / mint-on-ink (HO) marks exactly one thing: the active nav key,
   the primary action, or the hero metric. Everything else is ink, paper and the brand hue.
5. **Copy is product truth.** Labels, empty states and login text name real modules and real actions
   ("Orders, Walk-ins, Inventory, Refills, Ledger, P&L, Audit…"). No marketing lines, no apologies.

## 3. Structural grammar — web (POS + HO)

```
┌ Sidebar ─────────┐┌ Top bar: module identity · ⌘K search · date/clock · primary key · signals · avatar ┐
│ tray per module  │├───────────────────────────────────────────────────────────────────────────────────┤
│  ▸ raised key    ││ PAGE HEADER  identity (glyph, eyebrow, title, 1-line desc) │ dark slab of KPIs    │
│  ▸ raised key    ││  control bar: [Franchise] [Date window] [Multi filters] [Sort] …  [Primary] [▦|☰] │
│  ★ active = rim  ││  tabs                                                                             │
│ tray per module  ││ applied-filter chips · Clear all                                                  │
│  …               ││ DASHBOARD (6 panels, 40/30/30)  ⇄  TABLE (real grid)      │ DOCKED DRAWER         │
│ foot: theme·me   ││                                                           │ record / form         │
└──────────────────┘└───────────────────────────────────────────────────────────┴───────────────────────┘
```

- **List page (POS) = Header + FilterKit + AppliedFilters + Dashboard|Table switch + docked DetailDrawer.**
  The switch sits on the filter/tab line, never on its own row. Dashboards are computed from rows already
  loaded — **no extra API calls**; clicking a chart slice filters the table. HO's equivalent kit is
  `ScreenHeader` + `DataGrid` + `EntityDrawer`.
- **Records open in a drawer** that docks beside the list ≥1024px (list shrinks, never covered), right sheet on
  tablet, bottom sheet `92dvh` on phone; ⛶ full screen; ←/→ walks records; Esc exits.
- **All add/edit forms open in that drawer** (FormDialog `mode="drawer"`); centred modals only for yes/no
  confirms and quick pickers. In-form type/mode toggles become **tabs at the top**. If a franchise must be
  chosen, the field lives *inside the form*.
- **Sidebar shows every module at once** as trays of raised keys; POS folds it to a mini rail with hover
  fly-outs (Ctrl/⌘B); HO toggles it with `[`.
- **Keyboard grammar (as shipped):** both apps — Ctrl/⌘K search (cmdk palette in the top bar), ←/→ records in
  the drawer, Esc back out. POS — Ctrl/⌘B sidebar · Alt+1…7 jump to a module · ↑↓ walk sidebar pages.
  HO — `/` search · `[` sidebar · ⇧F focus mode · `?` shortcut sheet · `G` then letter/1–6 go-to chords ·
  `DataGrid` rows: ↑↓ or j/k move · Enter open · x/Space select · ←/→ page. POS list tables (`BoardTable`)
  have **no** row keys yet.

## 3b. Structural grammar — mobile (Prasar app)

```
┌ HeaderCapsule (ivory, radii 28/20/28/20, champagne curve) ─ badge · title · ◐ · 🔔 ┐
│ HeaderToolbar: ( 🔍 search │ ⚲ "All orders" ) (round actions) [New]               │
│ OfflineBanner (only when failed / pending / stale)                                 │
│ SectionCard: [tile] Title ……………… Open ›                                            │
│   ListCard ▸ avatar · h4 name · caption meta · StatusPill │ ValuePill · ☎ · ➤      │
│   ListCard ▸ … (gap 6, swipe = Call / Navigate)                                    │
│ StickyFooter (flat, no shadow) or CheckoutBar (the bar IS the button)              │
└ PillTabBar: Home · Route · Orders · Reports · Profile — gold beam (green at night) + wave · FAB ＋ ┘
```

- Tokens only through NativeWind classes / `useColors()`; never `dark:`, never `bg-[#…]`, sizes from the scale.
- Narrow with Tabs → Chips → FilterSheet; selection sheets commit on tap (no Cancel | Apply).
- Offline-first: wordless red header wash, ranked sync banner, row "Waiting to send", cached data stays visible.
- Haptics by event (select / press / threshold / commit / warn / error); navigation is silent.
- PressableScale on every pressable, ≥48dp targets, capsule buttons (radius = height/2).
- **No fake analytics** — every figure from a backend field; missing `—`, partial `+`.

## 4. Workflow for any UI task

1. **Locate the surface** (§1) and open the matching reference + the real source files it names. Reuse existing
   kits (`PageHeading`, `FilterKit`, `ModuleInsights`, `DetailDrawer`, `FormDialog`, `table-classes.ts`,
   HO's `ScreenHeader`, `DataGrid`, `EntityDrawer`, `TONE`; Prasar's `HeaderCapsule`, `SectionCard`, `ListCard`,
   `StatusPill`, `Button`, `Chip`, `Tabs`, the 9 sheet patterns, `EmptyState`, `OfflineBanner`) before writing anything new.
2. **Sketch the structure** with the grammar in §3 — which header meta KPIs, which filters, which 6 panels,
   which columns (one value each), which drawer tabs.
3. **Style with tokens only.** No raw hex in components; no new hues. Status colour from the tone map.
   Numbers `tabular-nums` (+ Bricolage on POS / `.p-num` on HO).
4. **Add the four faces** for every data surface: loading (real-shaped skeleton), empty (line-art + one
   sentence + action), error (retry), denied. Stale data = thin pulse bar, not a spinner over everything.
5. **Both themes, all widths.** Web: light + dark at 375 / 768 / 1024 / 1280 / 1536. Mobile: light + dark at 320 / 375 / 412dp,
   Hindi strings (~25% longer), font scale 1.3, reduce motion, offline. Touch targets ≥ 2.5rem on
   coarse pointers, inputs 16px on phones, `prefers-reduced-motion` turns every animation off.
6. **Decide, don't survey.** This user dislikes being handed three options — pick the strongest direction,
   build it, then show it (screenshot if a dev server is running — POS and HO Vite configs both ask for :8080 and Prasar Expo web uses :8081,
   so identify the app by its `<title>`: "Katyayani Krishi Seva Kendra" = POS, "Prasar" = Expo app; POS theme key is `pos-theme`).
7. **Run the checklist** below before saying done.

## 5. "Extraordinary" — how to push a screen past "basic"

When a screen feels plain, add **structure and craft**, never glow:

| Lever | Example |
|---|---|
| Shape | diagonal slab cut with a gold edge, skewed rounded polygons, notched glyph tiles, asymmetric radii (HO: `14px 20px 20px 14px`) |
| Depth | sunk tray (`inset 0 1px 3px rgba(0,0,0,.28)`) holding raised keys (`inset 0 1px 0 white/.06, 0 2px 5px -2px black/.45`) |
| Texture | furrows `repeating-linear-gradient(-38deg, …)`, paper grain (`feTurbulence`), 4px dot paper (HO `.p-dots`), survey grid on dark (HO) |
| Hand-made marks | rubber stamp (rotate −1.5° / −14°), wax-seal avatar, pen-drawn underline SVG, masking tape, pinned photo |
| Weight | hard offset shadow on the one primary key (`3px 3px 0 #061f18`; press → `1px 1px`) |
| Density | KPIs in the header slab, 6-panel dashboard, applied-filter chips, counts inside every filter option |
| Type | display face for titles + numbers, tiny caps eyebrows `10.5px/750/.15em` with a gold tick, serif *only* as accent |
| Motion | 120–150ms hovers, 280ms page/drawer enter (`cubic-bezier(.16,1,.3,1)`), stamp overshoot, pen-draw — all reduced-motion safe |

More patterns (command palette, live data, density modes, offline, optimistic updates, charts, a11y):
`references/next-gen-patterns.md`.

## 6. Done checklist

- [ ] Uses the shared header / table / drawer / form kit — no page-specific forks
- [ ] Tokens only; one accent moment; status via tone map; works in light **and** dark
- [ ] Tables: real grid, one value per column, clickable rows have the accent edge, sortable header shows state
- [ ] List pages: filters in the header bar (franchise first), applied chips, Dashboard|Table on the same line
- [ ] Dashboard computed from loaded rows; no new API calls; chart click filters the list
- [ ] Records + forms open in the docked drawer; confirms say exactly what happens to how many records
- [ ] Loading / empty / error / denied faces exist and look intentional
- [ ] 375 → 1536 px verified; no horizontal page scroll; touch ≥ 2.5rem; reduced motion respected
- [ ] No glow, glass, neon, gradient CTA or marketing copy; text names real modules and actions
- [ ] Keyboard path works (⌘K, Esc, ←/→, Tab order, visible focus ring)
- [ ] Mobile: no `dark:`/raw hex/raw icon sizes; ≥48dp targets; haptic per event; offline + sync visible; skeleton not spinner; sheets ≤94%
