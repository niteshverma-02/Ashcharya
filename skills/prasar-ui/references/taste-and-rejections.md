# Taste guide — what this team accepts and rejects

These came from real review rounds on the Franchisee POS (Oct 2026) and the Prasar field app (Aug–Oct 2026). Treat them as hard rules; they beat any
generic "modern UI" instinct.

## ❌ Rejected (never ship these)

| Rejected | User's words | Do instead |
|---|---|---|
| Neon, glassmorphism, aurora blobs, gradient buttons, cycling headlines | "fully AI generated" | Solid natural colours, real photos, serif + hand-drawn touches |
| Generic marketing copy ("Fast billing — a bill in a few taps") | — | Copy that names real modules and real actions in the app |
| Borderless "minimal" tables | "table ko table ki tarah karo" | A real grid: row AND column rules, zebra, distinct header |
| Two values stacked in one cell (name over phone, date over time) | "ek ke niche ek mat karo" | One value per column; add a column |
| Per-page hero headers, every page different | "sabhi alag alag kyu" | ONE shared page header component everywhere |
| Landscape panorama header, flat/dashed "command center", cloned hub header | "ajib", "same kyu de rahe ho" | Unique but consistent; iterate the shared component |
| Copying the sibling app's palette/fonts | "same copy nahi karna, uske jaisa but unique banana hai" | Match the *quality* bar, keep a separate identity |
| Plain/minimal sidebar, icon-only rail, one-module-at-a-time nav | "basic", "ganda" | Rich trays of raised keys, all modules visible at once |
| Sidebar search, recent chips, notification section in sidebar | removed by user | Search in top bar (⌘K), bell in top bar |
| Full-colour top bar, white flat top bar, cream paper top bar | "just a bg colour", "white bilkul ajib" | Tinted bar + floating jade rounded polygons |
| Green-tinted dark mode, pure black/neutral grey dark | — | GitHub dark: #15181d canvas, #1c2128 cards, #30363d borders |
| Forms in centred modals while records use drawers | "add karne par dialog kyu, jab side drawer use kar rahe" | All add/edit forms open in the side drawer |
| "Go pick a franchise in the filter bar" notices | — | Put the field inside the form itself |
| Dashboard toggle on its own row | — | Same line as filters/tabs |
| Extra API calls to build dashboards | — (user: multiple calls were slowing / downing the server) | Compute charts from already-loaded rows |
| Being asked to choose between 3 design options | "create something new and unique" | Decide, build, then show |
| Per-region custom scrollbars, thick 11px bars | — | One global 6px rounded thumb |

### Prasar mobile app rejections
| Rejected | Words | Do instead |
|---|---|---|
| Lifted StickyFooter / NextStopBar elevation | "ye uthi hui kyu he?" | Flat footer, hairline top; shadow only on things that float |
| Rails down the 2×2 metric grid | read as table ruling | Tone wash + glyph tile |
| Cool green-white page | read "light blue" | Sand ivory `#F4EFE4` |
| Square-cornered buttons | — | Capsule buttons (radius = height/2) |
| Fake / decorative analytics | — (Prasar CLAUDE.md: the fake-analytics rule has "NO exceptions") | Only backend figures; `—` when missing |
| Many new ideas in one control rebuild (FilterButton) | owner's verdict: worse than the flat control | Change one thing at a time, check on a device |
| Per-name avatar colour ramps, extra hand-drawn glyphs | — | One brand-surface avatar; only RatingStar is hand-drawn |
| A worded "You're offline" banner on every screen | "agar offline hai to header halka transparent red dikhega, na ki ye offline ka error dikhate rahoge" | Wordless red header tint; banner only for unsent / stalled writes and stale reads |

## ✅ Accepted signals

- **Hand-made feel:** paper grain, masking tape, rubber stamps, wax seals, pen underlines, ruled notebook lines, pinned photos.
- **Depth without glow:** sunk trays, raised keys, hard offset shadows (`3px 3px 0`), hairlines, inset rims.
- **One accent moment per screen** (gold): active nav key, primary "New sale" key, KPI bullets.
- **Diagonal cuts** and skewed shapes as structural motifs (Split Slab, Register polygons).
- **Density:** many filters, KPIs in the header, a 6-panel dashboard on every list page, real tables.
- **Keyboard-first:** ⌘K, ⌘B, Alt+1…7 (POS modules), ←/→ through records, Esc.
- **Hinglish feedback is normal** — "ajib" = odd, "ganda" = ugly, "basic" = not rich enough. Reply in the user's mix.

## Language cheat-sheet
| Word | Means | Usual fix |
|---|---|---|
| ajib | weird/odd | it doesn't match the rest; unify |
| basic | too plain | add depth, texture, structure — not glow |
| ganda | ugly | remove it, don't restyle it |
| same kyu | why identical to the other app | differentiate palette/shape |
| AI generated | template-y | remove gradients/glass/neon, add human craft |
