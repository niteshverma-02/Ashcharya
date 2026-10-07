# Method 2b — Choosing a layout archetype

The structural principles (SKILL.md §3) are **behaviours**. A layout archetype is **one way to draw them**.
Pick the archetype from the product's main job, not from the examples. The three source apps all use
archetype A or M1; a new product should only use them when its jobs really match.

## 1. Pick by the main job

| Main job of the screen | Web archetype | Mobile archetype |
|---|---|---|
| Work across many modules all day (ERP, POS back office) | **A. Workspace** — grouped sidebar + list + docked record | **M1. Tab app** |
| Few modules (≤ 7), wide data, light admin | **B. Top-nav canvas** — horizontal nav, full-width content | **M1. Tab app** |
| Watch live state, react to alerts (ops, monitoring, dispatch) | **C. Control board** — tile wall + alert rail + detail on demand | **M3. Status-first** |
| Read and reply to items one after another (tickets, approvals, inbox) | **D. Three-pane** — folders │ queue │ detail | **M4. List → detail push** |
| The thing *is* spatial or temporal (map, calendar, floor plan, kanban) | **E. Canvas-first** — the canvas fills the page; panels float | **M5. Map/canvas-first** |
| One task repeated fast (check-in, billing counter, data entry) | **F. Focus flow** — one big task area, queue on the side, next action always ready | **M2. Single-task flow** |
| Follow what happened (activity, audit, social, logs) | **G. Feed** — timeline centre, filters left, context right | **M4. List → detail push** |

A product can mix archetypes across screens (e.g. Workspace for records, Focus flow for the counter,
Control board for the owner's home), but each screen uses one.

## 2. The archetypes

### A. Workspace
```
grouped sidebar (all modules) │ page header with status │ filters │ list ⇄ dashboard │ docked record
```
Best for long sessions across many modules. Source apps: Harvest, Command OS.

### B. Top-nav canvas
```
top bar: logo · 4–7 module tabs · search ⌘K · me
page: title + status strip under it · filters as a chip row · full-width grid · record opens as a right sheet
```
More room for wide tables; nav never competes with data. Good for SaaS admin, settings-heavy tools.

### C. Control board
```
top: scope + time window + live indicator
main: a wall of status tiles (one per unit/store/vehicle), each with state colour + 1–2 numbers
right: alert rail (newest first, acknowledge in place)        bottom/drawer: detail of the selected tile
```
The header status becomes the whole page. Keyboard: arrows move across tiles, Enter opens.

### D. Three-pane
```
folders/saved views │ queue (compact cards, unread marker) │ detail with actions + reply/approve composer
```
No modal ever; j/k moves in the queue, the detail follows. Good for tickets, approvals, KYC review.

### E. Canvas-first
```
the canvas (map / calendar / kanban / plan) fills the page
floating panels: filters (top-left), legend (bottom-left), selection detail (right), one primary key
```
Panels are light cards in both themes; the canvas keeps its own palette rules.

### F. Focus flow
```
left: queue / search (who's next)    centre: the current task, huge and simple    right: summary + the ONE key
```
Big targets, everything keyboard-driven (scan → confirm → print). Built for speed, not browsing.

### G. Feed
```
filters │ timeline grouped by day (event cards with actor · action · object · time) │ context of selection
```

### Mobile archetypes
- **M1 Tab app:** identity header · content · bottom tabs (≤ 5) + one FAB.
- **M2 Single-task flow:** full-screen steps, progress at top, one big action at the bottom, no tabs while in flow.
- **M3 Status-first:** the home is a status board (big numbers, alerts), lists one tap away.
- **M4 List → detail push:** list screen, detail pushes in from the right, actions in a bottom bar.
- **M5 Map/canvas-first:** canvas full screen, a draggable bottom sheet holds the list and detail.

## 3. Drawing the principles differently

Each principle has many valid drawings. Choose the one that fits the identity and archetype; do not default
to the source apps' drawing.

| Principle | Possible drawings |
|---|---|
| Header carries status | dark slab of KPIs · a thin status strip under the title · counts inside tabs · a hero number · a status rail on the side · tiles (control board) |
| Controls where the eyes are | header filter bar · a chip row above the grid · a left facet panel · a query bar with tokens · filters floating on a canvas |
| Records without losing your place | docked drawer · right sheet · split pane · inline row expansion · push screen with a back gesture (mobile) |
| Everything reachable | grouped sidebar · top tabs + ⌘K · a home grid of modules · a command palette first |
| Lists are real grids | full grid (desktop) · compact grid with frozen first column · on phones: cards with fixed field positions (same order and place in every card) |
| Insight from loaded data | dashboard ⇄ table switch · a stats strip above the grid · inline sparklines in columns · a summary row |

## 4. Variety check
Before building, write: *archetype, header drawing, filter drawing, record drawing, nav drawing.* If all
five match a sibling product, change at least two.
