# Using Ashcharya without Claude Code

The skill is plain Markdown, so any AI coding tool (Cursor, GitHub Copilot, Windsurf, ChatGPT, Gemini) or a
human designer can follow it.

## Cursor / Windsurf / Copilot (in a repo)
1. Copy the folder `skills/ashcharya-ui` into your repo, e.g. `design/ashcharya-ui`.
2. Add a rule file that points to it:
   - Cursor: `.cursor/rules/ashcharya.mdc`
   - Copilot: `.github/copilot-instructions.md`
   - Windsurf: `.windsurfrules`
   ```md
   For any UI work, follow design/ashcharya-ui/SKILL.md and the files it links
   (references/method/*.md first). For a new product, write the identity card before any code.
   ```
3. Ask: "Using Ashcharya, design the <screen> for <product>."

## ChatGPT / Gemini / any chat
Upload or paste, in this order: `SKILL.md`, `references/method/identity.md`, `references/method/layouts.md`,
`references/method/structure.md`, `references/method/craft.md`. Then ask:
> Follow the Ashcharya approach. Product: <what it is, who uses it, where, on what device>.
> First write the identity card and pick the layout archetype, then build <screen> as one HTML file.

## Designers (Figma, by hand)
Read `SKILL.md` §1–§5, fill the identity card in `references/method/identity.md`, choose an archetype from
`layouts.md`, and check colours with `python3 assets/tools/check-contrast.py identity.json`.
