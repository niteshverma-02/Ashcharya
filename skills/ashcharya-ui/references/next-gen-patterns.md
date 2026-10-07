# Next-gen patterns — Ashcharya UI

Patterns that make an operations app feel *next generation* without looking AI-made. Each item says where it
already ships (**POS**, **HO**, **Prasar**). Anything marked **(suggestion — not in code yet)** exists in none of
the three codebases — treat it as a proposal, not as an established pattern.

## 1. What these patterns are

Patterns that already ship in the three source apps. They are **behaviours**: draw them in your product's own
identity (see `method/identity.md`). Section headings name the app where each one ships today.

## 2. Command palette (⌘K) — POS + HO
- One search pill in the top bar (`HeaderSearch.tsx`, cmdk); Ctrl/⌘K opens it and focuses + selects the field;
  Esc closes; the list loops. On a phone POS turns it into a full-screen search.
- **POS groups:** *Look up* (routes by what was typed — a 10-digit phone → customer, an order id → order, else
  order/product search) · *Recent* (last 5 pages) · *Quick actions* (New sale, Add new customer, toggle theme) ·
  then one group per nav module. Footer hints ↑↓ Move · ↵ Open · Esc Close.
- **HO groups:** *Pinned* · *Recent* · *Actions* (refresh, focus mode ⇧F, collapse sidebar, keyboard
  shortcuts ?) · *Navigate · <module>*. Actions that have a shortcut show it in a `kbd`.
- Empty query is never a blank box: POS shows Recent + Quick actions + every page; HO shows Pinned + Recent +
  Actions + every page.
- (suggestion — not in code yet) a **Records** group of recent customers/orders, and switch-franchise as a palette action.

## 3. Keyboard-first tables — HO `DataGrid` (`src/components/os/table.tsx`; also in POS's ported `features/hub-analytics/os/table.tsx`)
- ↑/↓ or j/k moves a visible cursor row (`data-cursor`), Enter opens it, x/Space selects, ←/→ pages.
  POS's own `BoardTable` lists have none of these keys yet.
- Selection swaps the toolbar for a **bulk bar**: "N selected" · "Select all N" link · Export selected ·
  page-supplied bulk buttons (`bulk` prop) · ✕ clear.
- Toolbar right side: caption "1–25 of 1,234", Export all, density (Comfortable / Compact), Columns menu.
  POS `BoardTable` instead puts column hide/reorder/pin on the header (drag, right-click) and a footer pager
  "26–50 of 340 orders".
- (suggestion — not in code yet) column order rule identity → status → money → dates → actions; money
  right-aligned, tabular.

## 4. Live, honest data
- **Stale-while-refresh** — keep old rows, never blank the table for a refetch.
  POS: `BoardBusyOverlay` (`components/table/board-table.tsx`) = 2px pulsing bar on top + a small
  "Loading orders…" pill over the dimmed rows. HO: a shimmer sweep across panels and rows
  (`.p-refreshing`, `lib/refreshPulse.ts`) only after a save or Refresh, never for polling; headers read "Updating…".
- **Cache policy (POS `App.tsx`):** 5-minute `staleTime`, no refetch on focus or reconnect, retry 1 — the user
  reported multiple calls slowing / downing the server.
- **Server-paged lists** chart only the loaded page and say so in the caption (POS Orders:
  "<window> · 50 loaded orders").
- **Offline / sync — Prasar only.** Being offline is a *wordless* red wash over the header
  (`OfflineHeaderTint`); `OfflineBanner` appears only for stalled / waiting writes and stale reads, ranked in
  that order. The owner rejected a worded "you're offline" strip. Web apps have no offline banner yet —
  (suggestion — not in code yet) copy Prasar's rule there.
- (suggestion — not in code yet) **Optimistic updates** for toggles and status changes with an Undo toast
  instead of a confirm. Today both web apps confirm first (POS `FormDialog mode="dialog"`) and write the cache
  only after the server answers.

## 5. Dashboard panels (6 per list page) — POS `ModuleInsights.tsx`
Order: **Trend** (`TrendPanel`, area, wide) · **Breakdown** (`BreakdownPanel`, donut + ranked legend) ·
**Top N** (`TopPanel`, bars) · **Columns by period** (`ColumnsPanel`, wide on row 2) · **Rhythm**
(`RhythmPanel`, day × hour heat, falls back to by-weekday) · **Stat grid** (`StatGridPanel`).
- Fixed series order: 8 categorical slots (`--viz-1…8`); a 9th category folds into "Other" — never cycled.
- Thin marks: trend line 2.2, columns rounded `[6,6,2,2]`, donut slices separated by a 2px card-coloured gap.
- Tooltip: label on top, then a colour dot + series + bold tabular value; text in text tokens, not series colours.
- Delta chip (`DeltaChip`): ↗/↘ arrow + signed % in success/destructive at 10% fill; missing comparison = "— vs prev".
- INR axis format (`compactInr`): `₹1.2L`, `₹3.0Cr`, `₹40K`; tabular figures everywhere.

## 6. Density modes
- HO `DataGrid` only: **Comfortable** (default, cell `py-2.5`) / **Compact** (`py-1.5`, row gap 3px), 12.5px
  text, remembered per table in `localStorage` (`osgrid.<id>`) together with column visibility and page size.
- POS has no density switch — (suggestion — not in code yet) add one for counter staff scanning long lists.
- Touch (`pointer: coarse`, POS): `.pos-button` min-height 2.5rem. The bottom nav (4.25rem) with its centre
  FAB is width-based (< 768px), not pointer-based.

## 7. Forms that feel fast — POS `FormDialog`
- Drawer form, grey sheet, white fields 2.6rem, labels 0.75rem/500 muted, required = red `*`.
- Sections with a badge (e.g. "Small Farmer" from acreage via `farmerSize()`), repeatable item cards with a
  4px left border, dashed "+ Add" card, collapsible "Additional details" (`FormMore`).
- First field auto-focused only on fine pointers (`FormDialog.tsx`, `matchMedia("(pointer: fine)")`).
- Save: the button disables and its label swaps to "Saving…" (`FormActions pending`) — no spinner.
- Drafts: POS New sale has "Save as draft" and a **Saved drafts** list (newest N kept, "Draft restored" toast).
- (suggestion — not in code yet) Enter submits single-field steps; ⌘Enter saves any form (only HO's ticket
  reply box sends on Ctrl/⌘Enter today); inline validation on blur with a footer summary; a restore chip
  "Draft from 10:42 — Restore" on long forms.

## 8. Empty, error, denied, loading
| State | Look |
|---|---|
| Empty | line-art SVG in a 4rem tinted tile, one title, one sentence, one action (POS `EmptyState`). No apology. |
| Filtered empty | "No employees match…" + Clear filters — different from true empty |
| Error | destructive text with the plain cause + an outline Retry button |
| Denied | lock icon, "You don't have access to this module", who to ask, no retry (POS `NoAccess`) |
| Loading | skeleton in the real shape (`BoardTableSkeleton`: the real header + 8 bar rows); POS shimmer 1.4s |

## 9. Sign-in screens — POS `AuthStage`
Hand-made "field notebook": cream paper + grain, solid card with masking tape, real photo pinned askew,
serif headline with pen underline, ruled index of real modules, rubber stamp, pill fields, solid CTA with a
hard 2px bottom. OTP in large Fraunces digits with a 30s resend countdown and step dots. Never:
illustration-of-a-laptop, gradient blob, falling-particle hero on new work.

## 10. Responsive contract (POS)
| Width | Behaviour |
|---|---|
| < 480 | tighter top bar; 1.9rem icon buttons |
| < 768 | sidebar → sheet; bottom nav 4.25rem + FAB; drawer → bottom sheet (92dvh); slab → grid of KPIs |
| ≥ 768 | header diagonal slab; drawer = right sheet; dashboard 2 columns |
| ≥ 1024 | drawers dock beside list (420px) |
| ≥ 1280 | sidebar open by default; dock 480px; dashboard 40/30/30 |
| ≥ 1536 | wider dock (540px) and extra top-bar ornaments |
Use container queries (`@container (min-width:880px)`) inside drawers instead of viewport breakpoints.

## 11. Accessibility baseline
- Contrast ≥ 4.5:1 for text (amber/warning text is deepened on white).
- Focus ring visible on every control (POS: jade ring on light, GitHub focus blue on dark, gold on the jade header slab).
- `aria-current="page"` on active nav, `aria-sort` on sorted headers, `aria-selected` on selected rows.
- Charts have a text alternative (the ranked legend or the table view).
- Every animation disabled under `prefers-reduced-motion: reduce`.
