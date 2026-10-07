# Ashcharya — `prasar-ui` skill for Claude Code

A **Claude Code skill** that teaches Claude to build next-generation, hand-crafted UI in the exact style of three
production apps. Every token, size, component and rule in it was taken from the live code and checked line by line.

| App | Stack | Identity |
|---|---|---|
| **Prasar app** — field staff, mobile | Expo / React Native + NativeWind | "Prasar field": forest `#15683F` on sand ivory, ivory capsules, GitHub Night |
| **Franchisee POS** — store counter, web | React + Vite + Tailwind + shadcn | "Harvest": jade + harvest gold, furrows, GitHub-dark night |
| **Franchise Hub** — head-office portal, web | React + Vite + Tailwind + shadcn | "Command OS": forest + mint on warm paper |

---

## 🚀 Install

### Option 1 — as a plugin (recommended)

Inside Claude Code:

```
/plugin marketplace add niteshverma-02/Ashcharya
/plugin install prasar-ui@ashcharya
```

Or from a terminal:

```bash
claude plugin marketplace add niteshverma-02/Ashcharya
claude plugin install prasar-ui@ashcharya
```

Update later with `claude plugin marketplace update ashcharya`.

### Option 2 — one-line install as a personal skill

```bash
curl -fsSL https://raw.githubusercontent.com/niteshverma-02/Ashcharya/main/install.sh | bash
```

### Option 3 — manual copy

```bash
git clone https://github.com/niteshverma-02/Ashcharya.git
cp -r Ashcharya/skills/prasar-ui ~/.claude/skills/            # for every project
# or, to share with a team through one repo:
cp -r Ashcharya/skills/prasar-ui <your-repo>/.claude/skills/  # then commit it
```

Restart Claude Code after installing.

---

## 🎯 Use

It triggers by itself on UI work. You can also call it directly:

```
/prasar-ui POS me "Supplier Payments" ka naya list page banao
/prasar-ui Prasar app me retailer visit history screen banao
/prasar-ui HO portal me franchise performance dashboard banao
/prasar-ui ye screen basic lag rahi hai, isko extraordinary banao
```

| Where you use it | Result |
|---|---|
| Inside the POS / HO / Prasar repos | Very close to the real apps, because Claude reuses the real kit components (`PageHeading`, `FilterKit`, `DetailDrawer`, `HeaderCapsule`, `ListCard`…) |
| In a new project | The same look rebuilt from the tokens, CSS and rules. Similar, but not pixel-identical, since the component code isn't bundled |

---

## 📁 What's inside

```
.claude-plugin/
├── plugin.json                    ← plugin manifest
└── marketplace.json               ← lets `/plugin marketplace add` find it
install.sh                         ← one-line personal install
skills/prasar-ui/
├── SKILL.md                       ← entry point: pick the surface, 5 laws, web + mobile grammar, workflow, checklist
├── references/
│   ├── prasar-mobile.md           ← Prasar field app tokens + components
│   ├── pos-harvest.md             ← POS tokens + components
│   ├── ho-command-os.md           ← HO portal tokens + components
│   ├── next-gen-patterns.md       ← ⌘K, keyboard tables, live data, dashboards, forms, states, a11y (each says which app ships it; unshipped ideas are marked as suggestions)
│   └── taste-and-rejections.md    ← every look that was rejected, and what to do instead
└── assets/
    ├── harvest-tokens.css         ← drop-in POS tokens, grid and motifs
    ├── command-os-tokens.css      ← drop-in HO tokens
    ├── prasar-mobile/*.ts         ← real Prasar design-system source (tokens, type, motion, haptics, layout, sheet)
    ├── showcase.html              ← open in a browser: the POS grammar in light + dark
    └── templates/PosListPage.tsx  ← canonical list page (type-checks against the POS kit)
```

## ✅ How it was checked

- About 1,170 claims were compared with the source code line by line, and about 45 corrections were made.
- Every hex colour in the docs exists in the source code.
- The template passes `tsc` against the real POS kit.
- The POS look was compared on screen with the live app in light and dark.
- Ideas that aren't in any app yet are labelled **"(suggestion — not in code yet)"**.

## ⚠️ Notes

- This is a set of rules and tokens, not a component library. Review what Claude produces.
- It only works automatically in **Claude Code**. In other tools, read the `.md` files as a design guide.
