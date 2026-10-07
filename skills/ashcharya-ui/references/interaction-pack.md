# Interaction pack — making screens feel alive

Interactions that make a screen feel next-generation without decoration. Each one names its building
blocks; libraries are suggestions (React + Tailwind + shadcn on web; Reanimated + Gesture Handler on mobile).

> Items marked **(new)** are additions to the system, not taken from the source apps. The rest already
> ship in at least one source app (see `next-gen-patterns.md`).

## 1. Command palette (⌘K)
- `cmdk` in a dialog anchored under the top-bar search pill; ⌘K / Ctrl K focuses and selects.
- Groups: **Look up** (records by number/phone/name) · **Recent** · **Quick actions** (create X) · **Go to** (every page).
- Each row: icon tile · label · muted hint · `kbd` shortcut on the right. Empty query = recents + top actions.
- Enter runs, ⌘Enter opens in the drawer, Esc closes. The palette never shows a blank box.

## 2. Inline edit in the grid (new)
- Double-click or Enter on a cell → the cell becomes an input with the same padding (no layout jump).
- Enter saves, Esc cancels, Tab saves and moves right. Saving shows a 2px action underline, success flashes
  the cell `brand-surface` for 600ms; failure restores the value and shows a toast with Retry.
- Only for fields that are safe to change inline (qty, price, status). Everything else opens the drawer.

## 3. Drag to reorder / move (new)
- `@dnd-kit` on web; long-press + `Gesture.Pan` on mobile with `haptics.threshold()` on pick-up.
- The dragged item lifts (`translateY(-2px)` + floating shadow); the drop slot is a dashed hairline box.
- Keyboard alternative is required: Space picks up, arrows move, Space drops, Esc cancels.

## 4. Undo instead of "Are you sure?" (new)
- For reversible actions (archive, mark done, remove tag): act immediately (optimistic), show a toast
  "Archived 3 orders · Undo" for 6s. Undo restores the cached rows.
- Keep the confirm dialog only for irreversible or costly actions, and state exactly what happens.

## 5. Optimistic updates (new)
- TanStack Query `onMutate` → update the cache, snapshot the old rows; `onError` → roll back + toast; `onSettled`
  → invalidate. Row shows a small "Saving…" pill until settled; offline → "Waiting to send".

## 6. Live numbers
- KPIs count up to their value over ~750ms with ease-out cubic on first load and when the filter changes
  (tabular figures, so nothing jitters). Off under reduced motion.
- A changed table cell flashes its tone surface once (600ms). Never animate continuously.

## 7. Hover preview (new)
- Hover a party/product name in a table for 400ms → a hover card (popover style, 280px): avatar, 3 facts,
  last activity, "Open" link. Touch: long-press. Never blocks the row click.

## 8. Bulk selection bar
- Selecting rows swaps the table toolbar for a bar on `brand-surface`: "N selected · Export · Assign · Archive ·
  Clear". Shift-click selects a range; x / Space toggles the cursor row.

## 9. Saved views (new)
- The current filters + sort + columns can be saved as a named view; views appear as tabs at the start of
  the tab row with a small dot, and in ⌘K under "Views". The active view's name shows in the header eyebrow.

## 10. Smart empty → action
- An empty result from filters shows the active filter chips inside the empty state plus "Clear filters";
  a truly empty module shows the first real step ("Add your first supplier") and "Import CSV".

## 11. Progressive disclosure in forms
- "Additional details" collapses rare fields; a choice that makes fields irrelevant removes them.
- Long forms autosave a draft every few seconds; reopening shows "Draft from 10:42 · Restore · Discard". (new)

## 12. Mobile gestures
- Swipe rows for the two most common actions (call / navigate), always duplicated by visible buttons.
- Pull to refresh on every list; sheets dismiss by drag; the tab bar pill travels with a spring and the
  accent beam; selection, press, threshold, commit, warn and error each have their own haptic.

## 13. Motion grammar (all reduced-motion safe)
| What | How |
|---|---|
| Hover | 120–150ms colour/shadow; keys lift 1px |
| Press | scale .98 (spring damping 22, stiffness 320, mass .6) or hard-offset key 3→1px |
| Enter | page and drawer 280ms `cubic-bezier(.16,1,.3,1)`, from 8–24px |
| Charts | bars grow 700ms (+18ms per bar), arcs 900ms — once, on first view |
| Stamp | overshoot `cubic-bezier(.3,1.6,.5,1)` 450ms, sign-in only |
| Never | looping glows, parallax backgrounds, cursor spotlights, confetti |
