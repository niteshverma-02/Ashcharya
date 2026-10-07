# Palette examples — five palettes produced with the identity method

These palettes recolour the **Canopy example** (its furrows, notch, stamp and seal stay because they are
Canopy's craft). For a new product, a palette is only step 3 of the identity: pick its texture, shape, mark
and type from that product's own material (`../method/identity.md`), not from Canopy.

> These are **palette examples** from step 3 of `../method/identity.md`. A real product needs its own full identity
> (palette + texture + shape + mark + type); a palette alone is not an identity. See `derivations.md`.

Files: `assets/examples/themes/themes.css` (web), `assets/examples/themes/themes.ts` (mobile), `assets/tools/check-contrast.py`.
Live preview: open `assets/examples/showcase.html` and use the palette picker, or add `?palette=indigo`.

## 1. Built-in themes

| Theme | Canopy (dark surfaces) | Action | Accent (one moment) | Canvas | Fits |
|---|---|---|---|---|---|
| **Canopy** (default) | `#0F4033` | `#15683F` | gold `#E2B864` | warm paper `#F6F5F1` | agri, field ops, retail POS |
| **Indigo Ledger** | `#1E2350` | `#3A44B0` | amber `#E8B04B` | cool paper `#F4F5F9` | finance, ledgers, admin, HR |
| **Terracotta** | `#4A2219` | `#A63E25` | mustard `#E3A93A` | warm sand `#F7F2EC` | food, retail, craft brands |
| **Ocean** | `#0E2F44` | `#0E6680` | coral `#F08A6C` | cool mist `#F3F6F7` | logistics, health, travel |
| **Graphite** | `#1C1F22` | `#24292E` | lime `#C6E35A` | stone `#F4F4F2` | dev tools, monitoring, tech |

Night for every theme uses the same GitHub-dark neutrals (`#15181D` canvas, `#1C2128` cards, `#30363D` lines);
only the action and accent change (night text on action is dark ink `#0D1117` where the action is light).

Status colours (success / warning / danger / info) are **the same in every theme**: they carry meaning, not brand.

## 2. Using a theme

**Web**
```html
<link rel="stylesheet" href="canopy-tokens.css">
<link rel="stylesheet" href="themes/themes.css">   <!-- after the tokens -->
<html data-ash-theme="indigo">                       <!-- add class="dark" for night -->
```

**Mobile**
```ts
import { themes } from "./themes/themes";
const palette = themes.indigo[colorScheme === "dark" ? "night" : "light"];
```

The variable names are the same in every theme (`--canvas`, `--canopy`, `--action`, `--on-action`,
`--accent` alias `--gold`, `--accent-ink`, `--accent-text`…), so components never change.
Night switching uses the `.dark` class everywhere; `data-ash-theme` exists only to switch between these
example palettes in the demo.

## 3. Making a new theme

1. **Pick one hue family** for canopy + action (deep and mid tones of the same hue) and **one warm or
   contrasting accent**. Never two brand hues.
2. **Canvas** is a near-white tinted toward the hue (saturation ≤ ~25%); cards stay white; ivory is a
   lighter step of the canvas.
3. **Ink** is a very dark tone of the hue (`~#15–2A` lightness); `ink-2` a mid grey of the same family.
4. **Accent** must read on the canopy (≥ 3:1) and carry dark `accent-ink` text (≥ 4.5:1). Give it an
   `accent-text` shade dark enough for white surfaces (≥ 4.5:1).
5. **Night:** keep the GitHub-dark neutrals; lighten the action until dark ink `#0D1117` reads on it.
6. **Check it:** write `{ "light": {...}, "night": {...} }` with the keys from `themes.ts` and run
   `python3 assets/tools/check-contrast.py my-theme.json`. Every pair must pass before use.

## 4. Rules that don't change with the theme

- One accent moment per screen, still.
- No gradients on buttons, no glow, no glass, in any theme.
- Charts keep the fixed categorical series (`--viz-1…8`) so data reads the same across themes.
- Don't mix themes inside one product; a theme is chosen per product (or per tenant), not per page.
