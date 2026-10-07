# Ashcharya UI — a design-language skill for Claude Code

**Ashcharya UI** is one hand-crafted, next-generation design language for business and operations software,
packaged as a Claude Code skill. Install it, ask Claude for a screen, and the result comes out in this one
consistent style: dense, keyboard-first, calm, and never like an AI template.

It was distilled from three production apps (a mobile field app, a store POS and a head-office portal).
Every colour, size and rule in it exists in shipped code.

## 🎨 The look

| | |
|---|---|
| **Palette** | deep canopy green `#0F4033` + harvest gold `#E2B864` on warm paper `#F6F5F1`; actions in forest `#15683F` |
| **Night** | GitHub-style dark: `#15181D` canvas, `#1C2128` cards, `#30363D` lines, green `#2EA043`, gold `#D29922` |
| **Type** | Plus Jakarta Sans · Bricolage Grotesque · Fraunces (accent) · JetBrains Mono; Inter on mobile |
| **Structure** | trays of raised keys, a page header with a KPI slab, real-grid tables, Dashboard ⇄ Table, docked drawers, forms in the drawer |
| **Craft** | field furrows, gold notch, diagonal slab cut, rubber stamp, wax seal, pen underline, one hard-offset gold key |
| **Mobile** | ivory capsule header, canopy tab bar with a gold beam, flat list cards, bottom sheets, offline-first sync states |
| **Themes** | Canopy (default) · Indigo Ledger · Terracotta · Ocean · Graphite — or your own, with a contrast checker |
| **Screens** | list pages plus recipes for dashboards, record pages, kanban, calendar, settings, analytics, inbox, maps, wizards, sign-in, landing |
| **Interactions** | ⌘K palette, keyboard rows, click-to-filter charts, inline edit, drag, Undo toasts, live numbers, swipe + haptics |
| **Never** | neon, glass, glow, gradient buttons, fake numbers, marketing copy |

Open `skills/ashcharya-ui/assets/showcase.html` in a browser to see it in light and night, and switch themes
with the palette picker (or `?palette=ocean`).

---

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

It triggers by itself on UI work, or call it directly:

```
/ashcharya-ui build a "Supplier Payments" list page with filters, KPIs and a drawer
/ashcharya-ui make a retailer visit-history screen for the mobile app
/ashcharya-ui design a sales performance dashboard in the Indigo Ledger theme
/ashcharya-ui make a kanban board for the lead pipeline, Ocean theme
/ashcharya-ui ye screen basic lag rahi hai, isko extraordinary banao
```

Works for **web** (React, Tailwind, shadcn) and **mobile** (React Native, NativeWind). In a project that
already has shared components, Claude reuses them and applies the Ashcharya rules on top.

---

## 📁 Inside

```
.claude-plugin/              plugin + marketplace manifests
install.sh                   one-line install
skills/ashcharya-ui/
├── SKILL.md                 the identity, 5 laws, web + mobile layout grammar, workflow, checklist
├── references/
│   ├── foundations.md       every token, the type scale, spacing, shape, motion and component specs
│   ├── themes.md            other colour themes and how to make your own
│   ├── page-recipes.md      dashboards, detail, kanban, calendar, settings, inbox, maps, wizards, landing
│   ├── interaction-pack.md  ⌘K, inline edit, drag, undo, optimistic updates, live numbers, gestures
│   ├── next-gen-patterns.md ⌘K, keyboard tables, live data, dashboards, forms, states, accessibility
│   ├── taste-and-rejections.md  looks that were rejected, and what to do instead
│   └── sources/             notes on the three original apps (only for editing those codebases)
└── assets/
    ├── ashcharya-tokens.css drop-in web tokens + grid + craft classes
    ├── ashcharya-tokens.ts  drop-in mobile tokens
    ├── themes/              themes.css · themes.ts · check-contrast.py
    ├── showcase.html        live demo, light + night
    ├── templates/           a full list-page example
    └── sources/             the original apps' token files
```

## ⚠️ Notes

- This is a design language (rules + tokens), not a component library. Review what Claude produces.
- It works automatically only in **Claude Code**. Elsewhere, read the `.md` files as a design guide.
