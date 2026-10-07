---
name: ashcharya-ui
description: >
  Ashcharya — a design APPROACH for building hand-crafted, next-generation UI for any product, not one fixed
  look. It teaches how to derive a unique visual identity from the product's own domain, how to structure
  dense operational screens, how to add depth through craft instead of glow, and how to iterate with the
  user until it feels human-made. Use it whenever you design, build or restyle any app, screen, page,
  dashboard, table, form, navigation, sign-in, mobile screen or design system — web or mobile, any domain —
  and whenever the user asks for UI that looks "extraordinary", "premium", "unique", "next generation",
  or says a screen looks "basic", "ajib", "ganda", "same as the other app" or "AI generated".
---

# Ashcharya — the approach

This skill is a **way of designing**, not a theme. Two products built with it should look clearly
different from each other and still feel equally crafted. The method was distilled from three shipped apps
(a store POS, a head-office portal and a mobile field app) whose looks came out of this process; those
looks are kept only as worked examples.

**Never copy an example's whole identity into a new product.** Derive a new one with §2 — a hue may repeat if
the new product's own material is that colour, but texture, shape, mark and type should come from its world.

**Read before building:** this file, then `references/method/identity.md`, `layouts.md`, `structure.md`,
`craft.md` (and `process.md` when iterating). Use `page-recipes.md`, `interaction-pack.md` and
`assets/token-template.css` while building.

## 1. The method at a glance

```
1 UNDERSTAND   who uses it, where, for how long, on what device, what they do 50× a day
2 DERIVE       an identity from the product's own world: material → palette, texture, shapes, marks, type
3 STRUCTURE    pick a layout archetype from the main job, then apply the structural principles
4 CRAFT        depth and delight through physical metaphors, never glow
5 TRUTH        real copy, real numbers, honest states
6 ITERATE      build the strongest version, show it, log every rejection as a rule, fix shared parts
7 VERIFY       contrast, both themes, all widths, keyboard/touch, reduced motion, screenshots
```

Detailed guides: `references/method/identity.md`, `layouts.md`, `structure.md`, `craft.md`, `process.md`.
Worked derivations (3 shipped + new domains): `references/examples/derivations.md`.

## 2. Derive the identity (the heart of the approach)

Do this before writing any CSS. Output a one-page **identity card** (template in `references/method/identity.md`).

1. **Mine the domain's material world.** List the physical things the users touch at work: for agriculture
   it was soil furrows, field notebooks, rubber stamps, harvest, seed; for a clinic it might be charts,
   wristbands, sterile steel; for logistics, route maps, shipping labels, pallets. Pick **2–3 materials**.
2. **Palette from the material:** one hue family (deep tone for "canopy" surfaces, mid tone for actions) +
   **one accent** that the material naturally has (harvest gold, a warning-label orange, a stamp red) +
   neutrals tinted toward the hue + a calm night mode (default: GitHub-style dark neutrals). Also choose a
   **palette structure** from the context (dark canopy, light chrome, mid-tone band or ink-led). Draft **three
   candidate palettes** from three different materials in different hue families, then pick the most
   domain-specific one. Write the material source of each colour; avoid only real sibling products' colours,
   and beware the AI-default traps (corporate blue, violet/aubergine) — see `method/identity.md`.
3. **Texture from the material:** one repeating pattern drawn in CSS (furrows, ledger rules, contour lines,
   label perforations, survey grid) used only on dark/hero surfaces at 3–6% alpha.
4. **Signature shape:** one structural shape that repeats (a diagonal cut, a notch, a ticket edge, an
   asymmetric capsule, a folder tab). Used in three places: the frame of the main work object (page header,
   bill, file, tile), the "current place" marker, and the primary key.
5. **Hand-made mark:** one or two mark *concepts* with a human trace (stamp, seal, tape, pen underline, punch
   hole, handwritten date). A concept may appear on sign-in, in the top bar, in empty states and at most once on
   any other screen.
6. **Type pairing:** a workhorse sans for body, a characterful display face for titles + numbers, optionally
   one serif or mono for a human/precise accent. Never the same pairing as a sibling product.
7. **Name it** ("Harvest", "Command OS", "Ledger", "Tidewater") and check: if a screenshot could be mistaken
   for a sibling product or a generic template, push the material further.

## 3. Layout + structural principles

**First pick a layout archetype** from the screen's main job (`references/method/layouts.md`): A Workspace,
B Top-nav canvas, C Control board, D Three-pane, E Canvas-first, F Focus flow, G Feed; on mobile M1 Tab app,
M2 Single-task flow, M3 Status-first, M4 List → detail, M5 Map-first. The source apps used A and M1;
don't default to them.

The principles below are **behaviours**, not drawings. Each can be drawn many ways (layouts.md §3).

1. **One shared component per role.** One page header, one table, one record view, one form shell, one
   filter kit, one tone map, one scrollbar. Iterate the shared part; never fork a page-specific variant.
2. **Status is visible where work starts.** The 2–4 numbers that matter now are on screen before any click
   (a KPI slab, a status strip, counts in tabs, a hero number or a tile wall) and work as shortcuts.
3. **Controls live where the eyes are.** Filters, scope and the page's primary action sit next to the data
   they change (header bar, chip row, facet panel or a query bar); applied filters show as removable chips with
   a result count. An app-wide create action may live in the top bar; only one of the two gets the accent style.
4. **Lists are real grids.** One value per column, rules between rows and columns, sticky header, sort state
   visible, an accent edge on the row you can open. On phones, use cards whose fields keep the same order and
   position in every card (a grid folded into cards), never free-form cards.
5. **Records open without losing your place; forms open in the same place.** A docked drawer, a right sheet,
   a split pane, inline expansion or a push screen on mobile; add/edit uses the same container; centred dialogs
   only for yes/no.
6. **Insight comes from the data already on screen.** Charts and summaries are computed from loaded rows (no
   extra calls) and clicking them filters the list (a Dashboard ⇄ Table switch, a stats strip, inline sparklines).
7. **Everything is reachable.** No hidden modules: grouped sidebar, top tabs + ⌘K, or a module home; a
   keyboard path for every frequent action (⌘K, arrows, Esc). Touch: every hit area ≥ 48dp (a 46dp button may
   reach 48 with hit slop); desktop controls stay 36–40px for density.
8. **Every data surface has four faces:** loading in the real shape, empty with one next step, error with
   the cause and a retry, no-access with who can see it. Offline and sync state are always visible on mobile.

## 4. Craft rules (how depth and delight are made)

- **Depth is physical:** sunk trays holding raised keys, paper on a desk, ink on paper, hairlines, inset
  rims, hard offset shadows on the single primary key. **Never** neon, glow, glassmorphism, aurora blobs,
  gradient buttons, cursor spotlights or looping animation.
- **The accent is reserved:** at most **one filled accent element** per screen (usually the primary key), plus
  small "you are here" markers (active nav rim, active tab dot). Never decorative. The signature shape can be
  drawn in canopy/action colours wherever it appears.
- **Motion explains, never decorates:** 120–150ms hovers, ~280ms enters with an ease-out, springs for presses,
  all off under reduced motion.
- See `references/method/craft.md` for the full vocabulary and how to pick from it per identity.

## 5. Truth rules

- Copy names the product's real modules and actions; no marketing lines, no apologies, no emoji confetti.
- Every figure comes from real data: missing is `—`, partial is a trailing `+`; no fake analytics.
- Confirms say exactly what will happen to how many records; reversible actions prefer Undo.

## 6. Workflow for any request

1. **Find the context.** New product → run §2 and write the identity card first. Existing product → read its
   code; keep its identity and kits, apply §3–§5 on top. A sibling of an existing product → derive a
   *different* identity with the same quality bar.
2. **List the jobs** of the screen (what the user does 50× a day), **pick a layout archetype**
   (`references/method/layouts.md`, run its variety check) and a recipe from
   `references/page-recipes.md` (list, dashboard, record, kanban, calendar, settings, inbox, map, wizard,
   sign-in, landing).
3. **Build with tokens only**: write the identity's tokens first (`assets/token-template.css`), then components.
4. **Add interactions** that serve the jobs (`references/interaction-pack.md`).
5. **Decide, don't survey.** Build the strongest direction and show it; don't hand the user three options.
6. **Iterate** with `references/method/process.md`: decode feedback, log each rejection as a rule
   (`references/taste-and-rejections.md` shows a real log), change one shared thing at a time.
7. **Verify** (§7) before saying done.

## 7. Done checklist

- [ ] An identity card exists and the screen is recognisably *that* identity, not a sibling or a template
- [ ] Palette: one hue family + one accent; contrast checked with `assets/tools/check-contrast.py`
- [ ] Shared components reused or created once; no page-specific forks
- [ ] Layout archetype chosen from the job (not copied from a sibling); variety check done
- [ ] Status visible before any click; controls next to the data; applied chips; real-grid lists (fixed-position cards on phones); records open without losing place
- [ ] Four faces for every data surface; offline/sync visible on mobile
- [ ] Craft from the identity's material; no glow/glass/gradient buttons; accent reserved (one filled element + you-are-here markers)
- [ ] Real copy and real numbers only
- [ ] Light + night, every width (web 375→1536, mobile 320→412), keyboard and touch paths, reduced motion
