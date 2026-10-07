# Method 2 — Structuring screens

Identity decides how things *look*. Structure decides how work *flows*. These principles stay the same in
every product; their drawing changes with the identity.

Pick the layout archetype first (`layouts.md`); this file covers the principles inside any archetype.

## 1. Start from jobs, not from components

For each screen write: *"The user comes here to ___, ___ and ___."* Then:
- the most frequent job gets the primary key (and its keyboard shortcut);
- the numbers that decide the next job go in the header;
- the filters that answer "which ones?" go in the header bar;
- rare jobs go in a menu, a drawer tab or "Additional details".

## 2. The principles and why they exist

| Principle | Why (what went wrong without it) | How it is usually drawn |
|---|---|---|
| One shared component per role | pages drifted apart; users said "sabhi alag alag kyu" | one header, one table, one drawer, one form shell |
| Header carries status | users opened 3 screens to know where they stood | identity block + a dark slab of 2–4 clickable KPIs |
| Controls where the eyes are | filters below the fold were missed | filter bar inside the header; chips under it; view switch on the same line |
| Real grid | stacked cells were hard to scan and sort | one value per column; rules on rows and columns |
| Records beside the list | modals lost the user's place | drawer docks beside the list ≥1024px; sheet on phones |
| Forms where records open | "add karne par dialog kyu, jab side drawer use kar rahe" | form shell inside the same drawer/sheet |
| Insight from loaded data | extra dashboard calls slowed the server | charts computed from rows on screen; click to filter |
| Everything reachable | one-module-at-a-time nav hid features | all modules visible as grouped trays; ⌘K for the rest |
| Four faces | blank screens and spinners felt broken | skeleton in real shape, empty + action, error + retry, no-access — per panel/tile, not only per page |
| Refresh keeps data | blanking a list on refetch lost the user's place | old rows stay; a light sweep or thin pulse bar shows it is updating |
| Keyboard-first lists | mouse-only lists were slow for power users | j/k or arrows move, Enter opens, x selects, `/` searches, `?` shows all shortcuts |
| Offline visible (mobile) | staff didn't know if work was saved | header tint, sync banner with counts, row-level "waiting to send" |

## 3. Layout skeletons (draw them in the identity's shapes)

**Web list page**
```
nav (grouped, all visible) │ top bar: page identity · search ⌘K · date · app-wide create key · signals · me
                           │ header: identity │ status slab (2–4 KPIs)
                           │ control bar: scope · date · filters · sort … primary · [Dashboard|Table]
                           │ tabs · applied chips · "12 of 128"
                           │ dashboard (≈6 panels) ⇄ table (real grid)        │ record / form drawer
```

**Mobile list screen**
```
identity header (title, status, 2 round actions) · toolbar (search │ named filter) · sync banner
section cards with the heading inside · list cards (avatar · title · meta · status │ value · 2 quick actions)
flat footer or a bar that IS the button · bottom navigation with ≤5 tabs + one FAB
```

Other screen types (dashboard, record page, kanban, calendar, settings, inbox, map, wizard, sign-in,
landing) are in `../page-recipes.md`.

## 4. Responsive contract
| Width | Behaviour |
|---|---|
| < 768 | nav → sheet + bottom bar; drawers → bottom sheets; header KPIs → scrolling row |
| ≥ 768 | header side by side; dashboard two columns |
| 768–1279 | nav collapses to an icon rail with hover fly-outs (⌘B expands) |
| ≥ 1024 | record drawer docks beside the list (width 420 → 480 at 1280 → 540 at 1536, or `clamp(380px, 32vw, 560px)`); if that would leave the grid under ~640px — e.g. 1024 with a rail — the drawer overlays instead and low-priority columns hide |
| ≥ 1280 | nav open by default; dashboard 40/30/30 |
Inside drawers use container queries (e.g. 880px) rather than viewport breakpoints.

## 5. Density rules
- Density is a personality dial (`personality.md`), not a constant. Dense identities: 13px table text, 36–40px
  controls on desktop web; spacious identities: 15–16px text, 48–56px rows. Mobile 46/38dp; any
  touch device (`pointer: coarse`) gets ≥ 48dp targets.
- Offer a compact mode where lists are long; persist it per user.
- Never trade density for decoration; whitespace is for grouping, not for looking "clean".
