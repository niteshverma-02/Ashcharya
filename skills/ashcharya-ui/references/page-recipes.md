# Page recipes — more kinds of screens in Ashcharya UI

The list page (header + filters + Dashboard ⇄ Table + drawer) is the core. These recipes extend the same
language to other screens. Each keeps the five laws, the tokens and the craft; none adds a new hue.

> Recipes marked **(new)** are additions to the system — they are not taken from the source apps. They are
> built only from existing Ashcharya parts.

## 1. Home / overview dashboard
```
PAGE HEADER  "Good morning, <name>" · date        │ canopy slab: 4 KPIs (today vs yesterday)
Attention strip: 2–4 chips that need action now (overdue, low stock, failed sync) → each opens a filtered list
[ hero metric (canopy block, 40%) ][ stat grid 2×3 (hairline cells) ]
[ module cards × 4: icon tile · headline number · delta chip · sparkline · "Open ›" ]
[ trend 7 cols ][ breakdown 5 cols ]   [ leaderboard ][ activity feed ][ calendar heat ]
```
- Every number links to the list that explains it. No decorative charts.

## 2. Record detail (full page) — opens from ⛶ in the drawer
```
← Back to list · prev / next
Canopy hero band: avatar/glyph · name · status badges · 3 actions (one gold key)
Stat strip overlapping the band (hairline grid, 4–6 cells)
Tabs: Overview · Orders · Payments · Notes · Activity (counts in tabs)
Two columns ≥880px container: field list + timeline │ related tables (real grid)
```

## 3. Kanban / pipeline (new)
```
Header + filters (owner, date, value)          │ slab: count + value per stage
Columns = sunk trays (tray style from the sidebar), one per stage, header: stage name · count · value
Cards = raised keys (surface, hairline, 2px left edge in stage tone): title · party · value pill · age
```
- Drag between columns (see interaction-pack §3); keyboard: arrow keys move focus, `M` opens a "move to" menu.
- The column that needs attention (e.g. overdue) gets the accent rim — only one.

## 4. Calendar / schedule (new)
```
Header: month title (serif accent) · ‹ › · Today · Day | Week | Month segmented
Grid with hairline rules; today = accent-ringed date; events = tone-tinted pills (one value each)
Side drawer for the selected day: list cards + "New" in the drawer footer
```
- Heat variant for attendance/sales: `--seq` steps of the action hue, legend under the grid.

## 5. Settings
```
Left: section list as raised keys inside one tray (Profile · Store · Users · Billing · Integrations)
Right: one card per group, heading INSIDE the card, rows = label + description │ control
Sticky footer appears only when something changed: "2 unsaved changes · Discard · Save"
```
- Danger zone: last card, danger-tinted border, action states exactly what happens.

## 6. Analytics / reports
```
Header + date window + compare toggle ("vs previous period")   │ slab: 3 headline KPIs with deltas
Row 1: trend (wide) · breakdown · top-N         (40/30/30)
Row 2: columns by month (wide) · rhythm heat · stat grid
Data table of the same rows below (Dashboard ⇄ Table), export button in the bar
```
- Every chart clickable to filter; footnote states the data source and window.

## 7. Inbox / tickets / chat (new)
```
3 panes ≥1280: folders (tray of keys) │ thread list (list cards, unread = accent dot) │ conversation
Conversation: messages on surface cards, own messages on brand-surface; composer pinned at the bottom
```
- ⌘Enter sends; status chip in the thread header (open / pending / closed via the tone map).

## 8. Map + list (field work)
```
Map fills the page; floating panels use the mapPanel style (light card in both themes)
Left panel: today's route as numbered list cards; current stop ramped, others plain
Bottom sheet on mobile: next stop · distance · Navigate (primary) · Skip
```
- Stops: pending blue, visited orange, skipped red (fixed meaning, every theme).

## 9. Multi-step form / onboarding wizard
```
Drawer or full page; step rail at the top: numbered dots, done = action, current = accent ring
One card per question; fields that don't apply are absent, not disabled
Footer: Back (outline) · Continue (primary) · "Saved as draft" note
```

## 10. Sign-in / OTP
The "field notebook": paper + grain, solid card with tape, serif headline with a pen underline, a real
photo, a ruled index of real modules, a stamp. OTP: big serif digits, countdown, step dots.

## 11. Public landing page (new)
Allowed only when the product needs one. Same rules: no hero gradients, no glow, no stock 3D blobs.
```
Canopy band with furrows: serif headline (what it does, in one line) · one gold CTA with hard offset
Real product screenshot on paper, pinned with tape, slightly rotated
Three "what you do in it" cards naming real modules · proof (real numbers only) · footer
```

## 12. Empty product (first run)
One card: line-art, "Nothing here yet", one sentence naming the first real step, one primary action, plus
a secondary "Import from CSV". No confetti, no mascots.
