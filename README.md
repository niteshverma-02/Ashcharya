# Ashcharya — a UI design approach for Claude Code

**Ashcharya is a way of designing, not a theme.** It teaches Claude the approach behind three hand-crafted
production apps, so it can create **new, different UIs** for any product with the same quality: unique,
dense, keyboard-first, calm, and never like an AI template.

Two products built with Ashcharya should look clearly different from each other and feel equally crafted.

## 🧭 The approach

| Step | What Claude does |
|---|---|
| **1. Understand** | who uses the product, where, on what device, and what they do 50 times a day |
| **2. Derive an identity** | mines the product's own physical world (e.g. soil furrows and stamps for agriculture, ledgers for finance, shipping labels for logistics) and turns it into a palette, a texture, a signature shape, a hand-made mark and a type pairing, written down as an identity card |
| **3. Layout + structure** | picks a layout archetype from the main job (workspace, top-nav, control board, three-pane, canvas-first, focus flow, feed; 5 mobile types), then applies fixed principles: one shared component per role, a header that carries status, filters where the eyes are, real-grid tables, records beside lists, dashboards from data already loaded |
| **4. Craft** | adds depth through physical metaphors (trays, keys, paper, ink, stamps), never glow, glass or gradient buttons; one accent moment per screen |
| **5. Truth** | real copy, real numbers, honest loading / empty / error / offline states |
| **6. Iterate** | builds the strongest version, shows it, turns every rejection into a rule, changes one shared thing at a time |
| **7. Verify** | contrast checks, light + night, every width, keyboard and touch, reduced motion |

## 🎨 Examples of what it produces

- **Three shipped looks** it was distilled from: "Harvest" (agri store POS), "Command OS" (head-office
  portal) and "Prasar field" (mobile field app). Same approach, three different looks.
- **Four new derivations:** "Ledger" (finance), "Manifest" (logistics), "Tandoor" (restaurant) and
  "Signal" (dev tools). Each has its own palette, texture, shape, mark and type.
- **A tested result:** "Register", a school-office app built end-to-end by an agent given only this skill
  (maroon register binding, four-line copy texture, bookmark-ribbon shape, hand-circled numbers). Open
  `skills/ashcharya-ui/assets/examples/register/fees.html`.
- **A full worked spec** ("Canopy") and a live demo with five palettes:
  `skills/ashcharya-ui/assets/examples/showcase.html`.

---

## 🇮🇳 Jaldi samjho (Hinglish)

- **Ye kya hai?** Ek "design approach". Ye Claude ko sikhata hai ki kisi bhi app ke liye uski apni unique UI
  kaise banaye — same quality, lekin har app ka look alag.
- **Kaise kaam karta hai?** Claude pehle aapke users aur unke kaam samajhta hai → unki duniya ki cheezon se
  (jaise kheti me mitti ki kyariyan, school me register, gym me barbell) colours, texture, shape aur font
  nikalta hai → kaam ke hisaab se layout chunta hai → phir screen banata hai, bina glow/glass/fake numbers ke.
- **Kaise use karein?** Install karke bolo: `/ashcharya-ui hamare <app> ke liye <screen> banao`.
- **Claude Code nahi hai?** Cursor, Copilot, ChatGPT ke saath bhi chalta hai — dekho `docs/use-with-other-tools.md`.

## 🚀 Install

### Option 1 — plugin (recommended)

Inside Claude Code:

```
/plugin marketplace add niteshverma-02/Ashcharya
/plugin install ashcharya-ui@ashcharya
```

Or from a terminal:

```bash
claude plugin marketplace add niteshverma-02/Ashcharya
claude plugin install ashcharya-ui@ashcharya
```

Update later with `claude plugin marketplace update ashcharya`.

### Option 2 — one line

```bash
curl -fsSL https://raw.githubusercontent.com/niteshverma-02/Ashcharya/main/install.sh | bash
```

### Option 3 — manual copy

```bash
git clone https://github.com/niteshverma-02/Ashcharya.git
cp -r Ashcharya/skills/ashcharya-ui ~/.claude/skills/            # for every project
cp -r Ashcharya/skills/ashcharya-ui <your-repo>/.claude/skills/  # or share with a team through one repo
```

Restart Claude Code after installing.

---

## 🎯 Use

```
/ashcharya-ui design a clinic appointment app — derive its identity first
/ashcharya-ui build the dispatch dashboard for our logistics product
/ashcharya-ui hamare school management app ke liye apni unique UI banao
/ashcharya-ui ye screen basic lag rahi hai, isko extraordinary banao
```

For a new product, Claude first writes an **identity card** (materials → palette, texture, shape, mark,
type), then builds screens with it. In an existing product, it keeps that product's identity and applies
the structure, craft and truth rules on top.

---

## 📁 Inside

```
skills/ashcharya-ui/
├── SKILL.md                     the approach: understand → derive → structure → craft → truth → iterate → verify
├── references/
│   ├── method/
│   │   ├── identity.md          deriving a unique identity from the domain (+ identity card template)
│   │   ├── layouts.md           7 web + 5 mobile layout archetypes and how to pick one
│   │   ├── structure.md         structural principles, why each exists, layout skeletons
│   │   ├── craft.md             depth, texture, shape, marks, type and motion without glow
│   │   └── process.md           iterating with users, decoding feedback, guard rails, verification
│   ├── examples/
│   │   ├── derivations.md       3 shipped identities + 4 new-domain identities
│   │   ├── canopy.md            one full identity spec, as a model
│   │   └── palettes.md          five contrast-checked palettes
│   ├── page-recipes.md          dashboard, record, kanban, calendar, settings, inbox, map, wizard, sign-in, landing
│   ├── interaction-pack.md      ⌘K, inline edit, drag, undo, optimistic updates, live numbers, gestures
│   ├── next-gen-patterns.md     patterns already shipping in the source apps
│   ├── taste-and-rejections.md  a real taste log from the source apps
│   └── sources/                 notes on the three original apps
└── assets/
    ├── token-template.css       fill it from your identity card
    ├── tools/check-contrast.py  validates any palette
    ├── examples/                Canopy tokens (web + mobile), 5 palettes, live showcase, a list-page template
    └── sources/                 the original apps' token files
```

Using it in Cursor, Copilot or ChatGPT: see `docs/use-with-other-tools.md`.

## ⚠️ Notes

- Ashcharya gives Claude a method, principles and examples, not a component library. Review what it builds.
- It works automatically only in **Claude Code**. Elsewhere, the `.md` files work as a design handbook.
