# HO Portal — "Command OS" system (head-office app)

> **Source reference.** This documents the original head-office portal that Ashcharya UI was distilled from. Use it only when editing that codebase (match its existing tokens there); for a new product, follow the approach in `../../SKILL.md`.

Source repo: `Nitesh_projects/franchise-hub`. Everything is scoped to `.command-os`; portalled surfaces (Sheet, Dialog, Select, Dropdown) must add `className="command-os"` themselves.

> ⚠️ The HO portal's *luxe* layer (aurora, cursor spotlight, glass stat chips, glow dots) is its existing look — keep it when editing HO screens, but **do not carry glow/glass/aurora into POS or new identities** (see taste-and-rejections.md).

---

## 1. Files and load order

| File | Loaded by | Holds |
|---|---|---|
| `src/index.css` | `main.tsx` | shadcn HSL tokens, Manrope on `html/body`, `fadeInUp`, tabular nums on `table` |
| `src/styles/command-os.css` (2808 lines) | `components/layout/AppLayout.tsx` | core tokens, type scale, sidebar (rail + strata), header search, panels, buttons/seg/chip, rows, motion, ScreenHeader (`.p-head*`), responsive shell, tab bar, living layer |
| `src/styles/os-luxe.css` | AppLayout (after command-os) | aurora/grain, cursor spotlight, button sheen, page-entrance stagger, chart draw-in, shimmer, empty ripples |
| `src/styles/os-header.css` | `components/layout/AppHeader.tsx` | "Adaptive Command Header" (`.ach-*`): forest tab + shoulder, pill search, signals, identity |
| `src/styles/os-kit.css` | `components/os/table.tsx`, `charts.tsx`, `drawer.tsx` | chart palette `--c1..5`, `--seq-*`, floating card-row table `.osg-*`, tooltip `.os-tip`, full-screen drawer `.odr-*`, refresh shimmer |
| `src/styles/os-select.css` | `components/ui/select.tsx` | the one dropdown (`.os-sel-*`) |
| `src/pages/dashboard/dashboard.css` | dashboard | `.db-rise`, `.db-tile`, `.db-medallion`, `.db-rings`, `.db-live`, `.db-medal` |

**Component sources**

- `components/os/primitives.tsx`: Panel, PrimaryMetric, MetricCell, AreaChart, Donut, EmptyState, Loading, CountUp
- `components/os/directory.tsx`: Card, ScreenHeader, TonePill, Tag, Avatar, RankRow, EmptyNote, ErrorBanner, ModeToggle, ConfirmDialog
- `components/os/tone.tsx`: Pill and the TONE map
- `components/os/table.tsx`: DataGrid
- `components/os/charts.tsx`: Legend, DonutChart, BarList, ColumnChart, Heatmap, Funnel, Ring, DotMap
- `components/os/drawer.tsx`: EntityDrawer, StatGrid, FieldGrid, InfoRow, Timeline
- `pages/prasar/screenKit.tsx`: StatCell, IconChip, Shimmer
- `pages/franchisee/shared/heroKit.tsx`: HeroFrame, CellGrid, ShareBar, INK_* constants
- `lib/spotlight.ts`: sets `--mx/--my` for the cursor light

---

## 2. Tokens

### 2.1 Core palette (`command-os.css`, `.command-os`)

```css
.command-os {
  /* forest foundation (nav) */
  --os-nav-1: #1B4A36;  --os-nav-2: #0F2E1E;  --os-nav-3: #143A26;  --os-nav-edge: #143A26;
  /* on-nav text */
  --os-on-1: #FFFFFF;
  --os-on-2: rgba(232,244,236,0.80);
  --os-on-3: rgba(232,244,236,0.58);
  --os-on-4: rgba(232,244,236,0.42);
  --os-lift-1: rgba(255,255,255,0.055);  --os-lift-2: rgba(255,255,255,0.09);
  /* paper */
  --p-paper: #F6F5F1;  --p-surface: #FFFFFF;
  --p-surface-2: rgba(255,255,255,0.74);  --p-surface-3: rgba(255,255,255,0.46);
  --p-line: #E5E3DA;  --p-line-soft: #EFEDE5;  --p-line-hair: #F4F3EB;
  /* text ramp */
  --p-text: #121714;  --p-text-2: #464C44;  --p-muted: #5C635A;  --p-faint: #838A80;  --p-ghost: #9CA298;
  /* accent = forest/mint */
  --p-accent: #2E7D56;  --p-accent-2: #55A47D;  --p-accent-lit: #74E5B0;
  --p-accent-bg: rgba(46,125,86,0.09);
  /* semantic */
  --p-amber: #AD7526;  --p-clay: #B14D2C;  --p-slate: #66705F; /* info is sage-grey, never blue */
  --p-ease: cubic-bezier(0.22, 0.85, 0.28, 1);
  font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
  color: var(--p-text); background: var(--p-paper);
  letter-spacing: -0.006em; -webkit-font-smoothing: antialiased;
}
.dark .command-os {   /* one hue family, nothing reads as black */
  --os-nav-1: #1A452F; --os-nav-2: #123522; --os-nav-3: #163B27; --os-nav-edge: #163B27;
  --p-paper: #0A1E14;  --p-surface: #10301F;
  --p-surface-2: rgba(255,255,255,0.045); --p-surface-3: rgba(255,255,255,0.02);
  --p-line: rgba(190,235,210,0.13); --p-line-soft: rgba(190,235,210,0.085); --p-line-hair: rgba(190,235,210,0.055);
  --p-text: #F1F2EE; --p-text-2: rgba(255,255,255,0.8); --p-muted: rgba(255,255,255,0.64);
  --p-faint: rgba(255,255,255,0.52); --p-ghost: rgba(255,255,255,0.42);
  --p-accent: #5FD39A; --p-accent-2: #7FE0B2; --p-accent-bg: rgba(95,211,154,0.12);
  --p-amber: #E0A852; --p-clay: #E48A6B;
}
```

### 2.2 Header tokens (`os-header.css`)

```css
.command-os {
  --ach-h: 72px;  --ach-forest: #17402E;  --ach-forest-hi: #1F5139;
  --ach-ivory: #F6EFDF;  --ach-brass: #C69A4A;  --ach-brass-deep: #A97C2F;
  --ach-on-2: rgba(240,236,222,0.66);  --ach-on-3: rgba(240,236,222,0.46);
  --ach-shoulder: 48px;  --ach-tab-w: 300px;   /* 260 <1440, 268 <1280; a 236 <1100 rule exists but the later 268 rule overrides it */
}
.dark .command-os { --ach-forest: #163B27; --ach-forest-hi: #1C4A33; }
```

### 2.3 Chart palette (`os-kit.css`)

The palette is validated for CVD (colour-blind separation). Hues are assigned in order and never cycled; anything past the fifth series folds into "Other".

```css
.command-os {          /* light = earthy, no blue/violet */
  --c1:#23885A; --c2:#813935; --c3:#B87818; --c4:#3AA273; --c5:#C24E2A; --c-other:#9CA298;
  --seq-0:#EEF4EF; --seq-1:#CFE5D7; --seq-2:#9DCCB0; --seq-3:#5FAE84; --seq-4:#2E8A5C; --seq-5:#16603E;
}
.dark .command-os {    /* dark adds blue+violet on purpose: green/sage collapse on forest */
  --c1:#35A872; --c2:#5B98D8; --c3:#B8822A; --c4:#9A7EE0; --c5:#D06848; --c-other:rgba(255,255,255,0.4);
  --seq-0:rgba(255,255,255,0.05); --seq-1:#1D4A33; --seq-2:#226647; --seq-3:#2F8A5E; --seq-4:#45B07C; --seq-5:#7FE0B2;
}
```

The meaning of each hue stays fixed: c3 (amber) is pending, c5 (clay) is rejected or over.

### 2.4 Luxe tokens (`os-luxe.css`)

```css
.command-os {
  --lx-glow: rgba(116,229,176,0.22);
  --lx-spot: color-mix(in srgb, var(--p-accent) 7%, transparent);   /* 9% in dark */
  --lx-edge: color-mix(in srgb, var(--p-accent) 32%, var(--p-line));
  --lx-grain: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .05 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
/* --p-shimmer lives in os-kit.css: rgba(255,255,255,0.72); dark rgba(190,235,210,0.09) */
```

### 2.5 Module accents (`--m`)

Each module has one pastel accent at the same lightness, set from `AppSidebar.tsx`:

| Module | `--m` |
|---|---|
| Home | `#D9E9DF` |
| Franchisee | `#F2C879` (brass/amber, also the default fallback) |
| Vistar | `#8FCBF2` |
| Micro Dealer | `#F2A98A` |
| Prasar | `#74E5B0` |
| Admin | `#C6B7F2` |

It is set as `style={{"--m": tint}}`, and every nav state uses `color-mix(in srgb, var(--m) N%, transparent)`.

### 2.6 Radii and shadows

**Radius scale in use**

| Radius | Used on |
|---|---|
| 6px | pins, kbd |
| 8px | `.p-seg`, `.p-chip`, select items |
| 9px | `.p-nav`, iconbtn, select trigger |
| 10px | `.p-btn`, `.p-search`, tooltip |
| 12px | table row ends, select menu, rail tile |
| 14px | ink metric block, drawer cards, `.osg-card`, capsule start corner |
| 16px | `.p-panel` |
| 18px | `.p-head`, dashboard ink hero |
| 20–24px | trays |
| 28px | auth card |
| 999px | pills, header search |

Shadcn `--radius` is 0.5rem.

**Shadow grammar.** Borders are **`inset 0 0 0 1px var(--p-line)`** box-shadows, never CSS borders. Elevation is a long negative-spread drop shadow:

```css
.p-panel { border-radius:16px; background:var(--p-surface);
  box-shadow: inset 0 0 0 1px var(--p-line), 0 1px 2px rgba(18,23,20,.03), 0 20px 40px -36px rgba(18,23,20,.5); }
.dark .command-os .p-panel { box-shadow: inset 0 0 0 1px var(--p-line), 0 1px 2px rgba(0,0,0,.3), 0 22px 44px -34px rgba(0,0,0,.9); }
.p-panel-quiet { border-radius:16px; background:var(--p-surface-2); box-shadow: inset 0 0 0 1px var(--p-line); }
```

### 2.7 Fonts

- `index.html` loads Google Fonts: `Manrope:wght@400;500;600;700;800` and `IBM+Plex+Mono:wght@400;500;600`.
- `tailwind.config.ts` sets `fontFamily.sans = ["Manrope", ...]` and `mono = ["IBM Plex Mono", ...]`.
- `index.css` body sets `font-feature-settings: "cv11","ss01"; letter-spacing: -0.006em`.
- Headings use `letter-spacing: -0.021em; font-weight: 700`.
- Plex Mono is reserved for `code/pre/kbd` and `.p-data`.
- `table, [data-numeric] { font-variant-numeric: tabular-nums }`.

**Type scale (`command-os.css`).** There is no wide-tracked micro-caps, except table headers and tags.

```css
.p-display { font-weight:800; font-size:38px; line-height:1.04; letter-spacing:-0.038em; }
.p-title   { font-weight:700; font-size:15px; line-height:1.3;  letter-spacing:-0.017em; }
.p-body    { font-weight:500; font-size:13px; line-height:1.5;  letter-spacing:-0.006em; }
.p-small   { font-weight:500; font-size:12px; line-height:1.45; letter-spacing:-0.003em; }
.p-eyebrow { font-weight:600; font-size:11px; line-height:1.3; letter-spacing:0; color:var(--p-faint); }
.p-num     { font-variant-numeric:tabular-nums; letter-spacing:-0.028em; font-weight:700; }
.p-data    { font-family:"IBM Plex Mono",ui-monospace,monospace; font-variant-numeric:tabular-nums; font-size:12px; letter-spacing:-0.01em; }
```

**Text sizes used everywhere in TSX** (all `font-semibold` or `bold`):

| Size | Use |
|---|---|
| 10.5px | th, pill-xs, axis |
| 11px | captions, pills |
| 11.5px | panel captions, meta |
| 12.5px | body cells, controls |
| 13–13.5px | nav rows |
| 15.5px `tracking-[-0.02em]` bold | panel titles |
| 24–32px `.p-num` | KPIs |
| 52px | primary metric |

**Uppercase is used for (among others in the header):**

- table `th`: `text-[10.5px] font-bold uppercase tracking-[0.06em]` (luxe sets 0.07em)
- `Tag`: `text-[10px] uppercase tracking-[0.05em]`
- `FieldGrid` labels: `10.5px uppercase tracking-[0.05em]`
- select group label: `0.07em`
- header eyebrow: `0.14em`
- ink-hero eyebrow: `11px tracking-[0.12em]`

### 2.8 Paper texture

```css
.p-dots { background-image: radial-gradient(rgba(18,23,20,.032) 1px, transparent 1px); background-size: 4px 4px; }
.dark .p-dots { background-image: radial-gradient(rgba(190,235,210,.035) 1px, transparent 1px); }
```

---

## 3. App shell layout (`AppLayout.tsx`)

```tsx
<div className="command-os relative flex h-[100dvh] w-full overflow-clip" data-layout={layout}>
  <AppSidebar/>            {/* RAIL_W=76 + PANEL_W=264 (width transition 260ms --p-ease) */}
  <Spine/>                 {/* 30px "data spine" between nav and content */}
  <div className="p-dots flex min-w-0 flex-grow flex-col" style={{background:"var(--p-paper)"}}>
    <AppHeader/>           {/* .ach sticky, 72px */}
    <main className="os-main p-scroll relative min-w-0 flex-grow overflow-y-auto px-4 pb-8 pt-4
       [container-type:inline-size] sm:px-6 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-6"/>
    {/* dock: drawer portal target, w-[400px] xl:w-[480px] 2xl:w-[520px], page beside it shrinks */}
  </div>
</div>
```

**Breakpoints (`components/layout/shell.tsx`)**

- **phone** `<768px`: off-canvas drawer `.os-drawer-nav` (`width:min(86vw,320px)`, 260ms) plus a bottom `.os-tabbar` (5-col grid, `backdrop-filter: blur(16px) saturate(1.4)`).
- **tablet** `<1280px`: icon rail only.
- **desktop** `≥1280px`: the user's own collapsed/expanded choice.
- CSS also uses 640/641 (ScreenHeader toolbar flow), 1099/1439/1699/1799 (header progressively folds), and `(pointer: coarse)`, where controls get at least 36px.

**The Spine** is a signature motif:

- a 30px column with `background: linear-gradient(90deg, var(--os-nav-edge), var(--p-paper) 46%)`;
- a 1px hairline at `left:14px` fading at both ends;
- an active node: an 11px circle with `border: 2px solid var(--p-accent); box-shadow: 0 0 0 4px var(--p-accent-bg)`, plus a 96px accent tail fading down;
- decorative ticks and dots at 42/56/72/88%.

---

## 4. Sidebar: rail + "Strata" trays of capsules

The sidebar is two columns:

- **`.os-rail`** (76px): module tiles in trays.
- **`.os-panel`** (264px): the open module's pages as **trays (`.os-tray`) of capsules (`.os-capsule`)** with chevrons.

The forest surface:

```css
.os-nav-surface {
  background-color: var(--os-nav-2);
  background-image:
    linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),          /* 32px survey grid */
    radial-gradient(130% 42% at 50% 0%, rgba(255,255,255,.085) 0%, transparent 64%),
    radial-gradient(150% 40% at 50% 100%, rgba(0,0,0,.26) 0%, transparent 62%),
    linear-gradient(180deg, var(--os-nav-1) 0%, var(--os-nav-2) 46%, var(--os-nav-3) 100%);
  background-repeat: repeat, repeat, no-repeat, no-repeat, no-repeat;
  background-size: 32px 32px, 32px 32px, 100% 100%, 100% 100%, 100% 100%;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.09), inset -1px 0 0 rgba(0,0,0,.34), 2px 0 24px -12px rgba(0,0,0,.5);
}
.os-surface { /* scroll area: list dissolves at both ends */
  -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 12px, #000 calc(100% - 16px), transparent 100%); }
```

### 4.1 Tray

The tray is recessed, with a curved lit left edge when it holds the current page.

```css
.os-tray { padding: 8px 6px 8px 12px; border-radius: 24px 18px 18px 24px;
  background: linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.1));
  box-shadow: inset 0 1px 2px rgba(0,0,0,.35), inset 0 -1px 0 rgba(255,255,255,.04); }
.os-tray::before { content:""; position:absolute; inset:0 auto 0 0; width:30px;
  border:1.5px solid transparent; border-left-color: rgba(255,255,255,.07); border-radius: 24px 0 0 24px; }
.os-tray[data-raised]::before { border-left-color: var(--st-amber);   /* --st-amber = var(--m,#F2C879) */
  mask-image: linear-gradient(180deg, transparent 4%, #000 30%, #000 70%, transparent 96%);
  filter: drop-shadow(-2px 0 6px color-mix(in srgb, var(--st-amber) 70%, transparent)); }
.os-tray-body { display:flex; flex-direction:column; gap:6px; }
```

### 4.2 Capsule (page row)

Pill key with a chevron:

```css
.os-capsule { display:flex; align-items:center; gap:11px; height:40px; padding:0 34px 0 12px;
  border-radius: 14px 20px 20px 14px; font-size:13.5px; font-weight:600; letter-spacing:-0.012em; color:#fff;
  background: linear-gradient(165deg, color-mix(in srgb, var(--os-nav-1), #fff 5%) 0%, color-mix(in srgb, var(--os-nav-2), #000 8%) 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.09), inset 0 -1px 0 rgba(0,0,0,.3), 0 7px 12px -8px rgba(0,0,0,.75); }
.os-capsule::after { /* warm light running along the top edge on hover */
  content:""; position:absolute; left:14px; right:18px; top:0; height:1px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--st-amber) 85%, transparent), transparent);
  opacity:0; transform:scaleX(.2); transition: opacity 200ms, transform 240ms; }
.os-capsule:hover::after { opacity:1; transform:scaleX(1); }
/* ACTIVE: rises wider, amber rim, cream-gold icon disc, glowing dot on the tray edge */
.os-capsule[data-active] { height:46px; padding-left:7px; font-weight:700; font-size:14px;
  background: linear-gradient(165deg, color-mix(in srgb, var(--os-nav-1), #fff 14%) 0%, color-mix(in srgb, var(--os-nav-1), #000 6%) 100%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--st-amber) 45%, transparent), inset 0 1px 0 rgba(255,255,255,.2), 0 14px 22px -12px rgba(0,0,0,.9); }
.os-capsule[data-active] .os-cap-ico { width:30px; height:30px; border-radius:9px; color:#3B2A0C;
  background: linear-gradient(150deg, #FFF1D0 0%, var(--st-amber) 65%, color-mix(in srgb, var(--st-amber), #7A5418 25%) 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.75), inset 0 -2px 0 rgba(90,60,10,.22), 0 6px 14px -6px color-mix(in srgb, var(--st-amber) 75%, transparent); }
.os-capsule[data-active]::before { content:""; position:absolute; left:-16px; top:50%; width:7px; height:7px; margin-top:-3.5px;
  border-radius:9999px; background:var(--st-amber); box-shadow: 0 0 10px 2px color-mix(in srgb, var(--st-amber) 80%, transparent); }
.os-cap-chev { position:absolute; right:6px; top:50%; width:24px; height:24px; border-radius:9999px;
  color: var(--os-on-4); transform: translateY(-50%); }
.os-cap-row:has(.os-capsule[data-active]) .os-cap-chev { color: color-mix(in srgb, var(--st-amber) 80%, #fff); }
.os-capsule:active { transform: scale(.975); transition-duration: 90ms; }   /* press = real key */
```

TSX anatomy (from `components/layout/nav/Strata.tsx`):

```tsx
<div className="os-tray" data-raised={raised||undefined} role="group"><ul className="os-tray-body">
  <li className="os-cap-row group">
    <Link className="os-capsule" data-active={active||undefined} aria-current={active?"page":undefined}>
      <span className="os-cap-ico"><Icon className="h-[17px] w-[17px]" strokeWidth={1.75}/></span>
      <span className="os-cap-label">{title}</span>
      {!!badge && <span className="os-cap-badge">{badge}</span>}
    </Link>
    <span className="os-cap-chev"><ChevronRight className="h-[15px] w-[15px]"/></span>
    <button className="os-row-pin" aria-pressed={pinned}/>   {/* hover-only star pin */}
  </li></ul></div>
```

### 4.3 Rail tile, active module, bridge, glide frame

```css
.os-rail-ico { width:42px; height:38px; border-radius:12px; /* same deep capsule gradient + shadows */ }
.os-rail-btn:hover .os-rail-ico { transform: translateY(-2px); }
.os-rail-btn[data-active="true"] .os-rail-ico { color:#2E230C;
  background: linear-gradient(150deg, #FFF6E2 0%, var(--m,#F2C879) 62%, color-mix(in srgb, var(--m,#F2C879), #5A4010 25%) 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.8), inset 0 -2px 0 rgba(60,40,10,.22), 0 8px 18px -8px color-mix(in srgb, var(--m,#F2C879) 80%, transparent); }
/* bridge: hairline from open tile into the panel */
.os-rail-btn[data-bridge="true"]::after { content:""; position:absolute; left:calc(50% + 22px); right:-10px; top:24px; height:1px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--m) 85%, transparent), color-mix(in srgb, var(--m) 20%, transparent));
  transform-origin:left; animation: os-bridge 320ms var(--p-ease) both; }
/* one frame of light glides between active capsules (springy) */
.os-glide { position:absolute; pointer-events:none; border-radius:14px 20px 20px 14px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--m,#F2C879) 75%, transparent), 0 0 0 1px color-mix(in srgb, var(--m) 18%, transparent), 0 0 28px -6px color-mix(in srgb, var(--m) 70%, transparent); }
.os-glide[data-glides] { transition: transform 460ms cubic-bezier(.34,1.28,.64,1), width 300ms var(--p-ease), height 300ms var(--p-ease); }
```

**Other sidebar pieces**

- **Badges:** `.os-cap-badge` is a clay gradient `linear-gradient(160deg,#FFC9B4,#E48A6B)` with text `#3A1206` and a 2.4s breathe glow.
- **Panel head:** `.os-ident-mark` is a 42px warm gold tile; `.os-ident-name` is 17px/800/-0.03em white; `.os-ident-live` is a 6px mint dot with glow.
- **Floating hover card:** `.os-card` is 200px wide with `border-radius:18px 18px 18px 6px` and an invisible 14px `::before` bridge.
- **Footer:** `.os-foot-pill` is 52px tall, `border-radius:26px 18px 18px 26px`.
- **Keyboard chord:** `G` shows `.os-rail-key` digits on every tile via `:root[data-os-chord]`.

---

## 5. Header (`os-header.css`, `AppHeader.tsx`)

- `.ach` is sticky, 72px, on paper, with a 1px `--p-line` baseline in `::after`.
- **The forest tab** `.ach-tab` (300px, `--ach-forest`, brass hairline on top) grows out of the sidebar.
- Its **SVG shoulder** sweeps down into the deck:

```tsx
<svg className="ach-shoulder" viewBox="0 0 56 72" preserveAspectRatio="none"><path d="M0 0 C 30 0, 24 72, 56 72 L 0 72 Z"/></svg>
// mirrored on the right identity end: d="M56 0 C 26 0, 32 72, 0 72 L 56 72 Z"
```

- The tab holds an ivory `.ach-tile` (40px, r12, `#F6EFDF` on forest).
- Next to it: `.ach-eyebrow` (10.5px uppercase 0.14em with a 5px brass dot), `.ach-page` (18px/700/-0.024em white) and `.ach-sub` (11px).
- **Search** is the one floating pill:

```css
.ach .p-search.ach-cmd { height:44px; border-radius:999px; background:var(--p-surface);
  box-shadow: 0 0 0 1px var(--p-line), 0 1px 0 rgba(255,255,255,.7) inset, 0 8px 20px -14px rgba(23,64,46,.45); }
.ach .p-search.ach-cmd[data-open="true"] { box-shadow: 0 0 0 1px var(--p-accent), 0 0 0 4px var(--p-accent-bg), 0 16px 34px -18px rgba(23,64,46,.55); }
```

- `max-width: 640px` (480 below 1280px).
- **Signals** (megaphone and bell) share one pill, `.ach-signals`, with a 1px hairline divider. The open state is a forest fill with ivory text and a brass count.
- **Route/fetch progress:** `.p-progress::after` is a 42%-wide accent gradient sweeping in 1.15s.

---

## 6. ScreenHeader: the page header on every screen

Source: `components/os/directory.tsx`, CSS `.p-head*`. It has two tiers: a forest band (identity and stat chips) and a light toolbar (filters and actions).

```tsx
<header className="p-head">
  <div className="p-head-band">
    <Icon className="p-head-mark" strokeWidth={1.4}/>            {/* 128px watermark, rotate(-12deg), 5% white */}
    <div className="relative flex flex-wrap items-center gap-x-6 gap-y-3">
      <div className="flex min-w-0 flex-grow items-center gap-3.5">
        <span className="p-head-icon"><Icon className="h-5 w-5" strokeWidth={2.1}/></span>
        <div className="min-w-0">
          <nav className="p-head-crumbs"><span className="p-head-dot" data-live/> Crumb › Crumb
            <span className="p-head-greet hidden md:inline">· Good morning, Tue 7 Oct</span></nav>
          <h1 className="p-head-title">{title}</h1>
          <p className="p-head-sub max-w-3xl truncate">{subtitle}</p>
        </div>
      </div>
      <div className="p-noscrollbar flex items-center gap-2 overflow-x-auto sm:flex-wrap">
        {meta.map((m,i)=> <div className="p-head-stat" style={{animationDelay:`${60+i*50}ms`}}>
          <span className="p-head-stat-label">{m.label}</span><span className="p-head-stat-value">{m.value}</span></div>)}
      </div>
    </div>
  </div>
  <div className="p-head-bar">
    <div className="p-head-actions ml-auto flex gap-2">{actions}</div>   {/* floats right ≥641px */}
    <div className="p-head-tools p-noscrollbar">{children /* filters */}</div>
  </div>
</header>
```

```css
.p-head { border-radius:18px; overflow:hidden; background:var(--p-surface);
  box-shadow: inset 0 0 0 1px var(--p-line), 0 1px 2px rgba(18,23,20,.05), 0 18px 34px -26px rgba(15,46,30,.55);
  animation: p-rise 260ms var(--p-ease) both; }
.p-head-band { position:relative; isolation:isolate; overflow:hidden; padding:16px 20px; color:#fff;
  background: radial-gradient(55% 160% at 100% 0%, rgba(116,229,176,.20) 0%, transparent 62%),
              radial-gradient(40% 120% at 0% 100%, rgba(116,229,176,.08) 0%, transparent 70%),
              linear-gradient(120deg, var(--os-nav-2) 0%, var(--os-nav-1) 55%, #22603F 100%); }
.p-head-band::before { /* FIELD RINGS */ content:""; position:absolute; inset:0; z-index:-1;
  background: repeating-radial-gradient(circle at 92% 30%, transparent 0 17px, rgba(255,255,255,.055) 17px 18px);
  mask-image: linear-gradient(90deg, transparent 25%, #000 85%); }
.p-head-band::after { /* lit top hairline */ content:""; position:absolute; left:0; right:0; top:0; height:1px;
  background: linear-gradient(90deg, transparent, rgba(116,229,176,.65) 30%, rgba(255,255,255,.25) 70%, transparent); }
.p-head-icon { width:44px; height:44px; border-radius:13px; color:var(--p-accent-lit);
  background: linear-gradient(160deg, rgba(255,255,255,.16), rgba(255,255,255,.04));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.14), inset 0 1px 0 rgba(255,255,255,.22), 0 10px 20px -12px rgba(0,0,0,.55);
  backdrop-filter: blur(6px); }
.p-head-title { font-weight:800; font-size:25px; line-height:1.1; letter-spacing:-0.035em; color:#fff; }  /* 21px on phone */
.p-head-sub   { font-size:12.5px; font-weight:500; color:var(--os-on-2); }
.p-head-crumbs{ font-size:11.5px; font-weight:600; color:var(--os-on-3); }
.p-head-dot   { width:6px; height:6px; border-radius:999px; background:var(--p-accent-lit); box-shadow:0 0 0 3px rgba(116,229,176,.18); }
.p-head-dot[data-live="true"] { animation: p-head-beat 2.2s var(--p-ease) infinite; } /* halo 3px→7px fade */
.p-head-stat  { min-width:92px; padding:7px 13px 8px; border-radius:12px; background:rgba(255,255,255,.07);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.10), inset 0 1px 0 rgba(255,255,255,.08); backdrop-filter: blur(8px); }
.p-head-stat-label { font-size:10.5px; font-weight:600; color:var(--os-on-3); }
.p-head-stat-value { font-size:13.5px; font-weight:750; letter-spacing:-0.015em; font-variant-numeric:tabular-nums; color:#fff; }
.p-head-stat-value svg { color: var(--p-accent-lit) !important; }
.p-head-bar { display:flex; flex-wrap:wrap; align-items:center; gap:8px 12px; padding:10px 14px;
  background: linear-gradient(180deg, var(--p-surface), var(--p-surface-2)); }
@media (min-width:641px){ .command-os .p-head-bar{display:flow-root}
  .command-os .p-head-bar > .p-head-actions { float:right; margin:0 0 -12px 16px; } /* filters flow around actions */ }
```

`dockRail(header, rail)` (a `cloneElement`) injects a filter rail (for example `PeriodRail`) into the toolbar.

---

## 7. Controls

### 7.1 Buttons

```css
.p-btn { height:38px; padding:0 15px; border:0; border-radius:10px; background:var(--p-surface);
  box-shadow: inset 0 0 0 1px var(--p-line); color:var(--p-text-2); font-size:13px; font-weight:600; letter-spacing:-0.012em;
  display:inline-flex; align-items:center; gap:8px; transition: box-shadow 130ms var(--p-ease), transform 130ms var(--p-ease); }
.p-btn:hover { box-shadow: inset 0 0 0 1px var(--p-ghost); transform: translateY(-1px); }
.p-btn-ink { height:38px; padding:0 16px; border-radius:10px; background: linear-gradient(180deg,#24523A,#143526); color:#fff;
  box-shadow: 0 8px 16px -10px rgba(20,53,38,.9), inset 0 1px 0 rgba(255,255,255,.14); }
.dark .command-os .p-btn-ink { color:#06170D; background: linear-gradient(180deg,#7FE0B2,#55C48F); }   /* inverts to mint in dark */
.p-iconbtn { width:34px; height:34px; border-radius:9px; background:var(--p-surface); box-shadow: inset 0 0 0 1px var(--p-line); }
.p-traybtn { width:32px; height:32px; border-radius:8px; background:transparent; } /* inside a tray, no border */
```

- A danger confirm is `p-btn` with `style={{color:"var(--p-clay)", boxShadow:"inset 0 0 0 1.5px var(--p-clay)"}}`.
- Small button: `className="p-btn !h-8"`.

### 7.2 Segmented control and chip (filters)

```css
.p-seg { height:30px; padding:0 13px; border-radius:8px; background:transparent; font-size:12.5px; font-weight:600; color:var(--p-muted); }
.p-seg:hover { background: var(--p-line-soft); color: var(--p-text); }
.p-seg[data-on="true"] { color:#fff; background: linear-gradient(180deg,#24523A,#143526);
  box-shadow: 0 6px 14px -9px rgba(20,53,38,.95), inset 0 1px 0 rgba(255,255,255,.14); }
.p-chip { height:30px; padding:0 11px; border-radius:8px; background:var(--p-surface); box-shadow: inset 0 0 0 1px var(--p-line);
  font-size:12.5px; font-weight:600; color:var(--p-text-2); display:inline-flex; align-items:center; gap:8px; }
```

Segmented group wrapper (`ModeToggle`):

```tsx
<div role="radiogroup" className="inline-flex items-center gap-0.5 rounded-[11px] p-[3px]"
  style={{background:"var(--p-surface)", boxShadow:"inset 0 0 0 1px var(--p-line), 0 1px 2px rgba(18,23,20,0.04)"}}>
  <button role="radio" data-on={on} className="p-seg !h-8"><Icon className="h-3.5 w-3.5"/><span className="hidden sm:inline">Label</span></button>
</div>
```

**Filter bar.** `ControlRail` = `.p-rail` (top and bottom `--p-line` borders, `linear-gradient(180deg, var(--p-surface-2), transparent)`, `min-h-[48px]`). It is usually docked into the ScreenHeader toolbar.

`PeriodRail` pattern:

1. a CalendarRange icon in `--p-faint`;
2. a group of `p-seg` presets;
3. `RailDivider` (`h-5 w-px`, `--p-line`, `hidden sm:block`);
4. `<label>` "From" with `<input type="date" className="p-chip !cursor-text">`.

### 7.3 Select (`os-select.css`)

```css
body button:where(.os-sel-trigger) { display:flex; width:100%; height:36px; align-items:center; justify-content:space-between; gap:8px;
  padding:0 10px 0 12px; border:0; border-radius:9px; background:var(--p-surface); box-shadow: inset 0 0 0 1px var(--p-line);
  font-size:12.5px; font-weight:600; letter-spacing:-0.008em; }
.os-sel-trigger.os-sel-trigger[data-state="open"], .os-sel-trigger.os-sel-trigger:focus-visible {
  box-shadow: inset 0 0 0 1px var(--p-accent), 0 0 0 3px var(--p-accent-bg); }
.os-sel-trigger[data-state="open"] .os-sel-chev { transform: rotate(180deg); color: var(--p-accent); }
.command-os.os-sel-content { border:0; border-radius:12px; background:var(--p-surface);
  box-shadow: 0 0 0 1px var(--p-line), 0 18px 38px -14px rgba(18,40,28,.28), 0 4px 10px -4px rgba(18,40,28,.10); }
.os-sel-viewport { padding:5px; }
.os-sel-search input { height:30px; padding:0 10px 0 28px; border-radius:8px; background:var(--p-paper); box-shadow: inset 0 0 0 1px var(--p-line); }
.os-sel-item { min-height:32px; padding:6px 30px 6px 10px; border-radius:8px; color:var(--p-text-2); font-size:12.5px; font-weight:500; }
.os-sel-item[data-highlighted] { background: var(--p-accent-bg); color: var(--p-text); }
.os-sel-item[data-state="checked"] { color: var(--p-accent); font-weight: 650; }
.os-sel-label { padding:8px 10px 4px; font-size:10.5px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; color:var(--p-faint); }
```

- Every menu has a built-in search box on top.
- The trigger takes the `.p-chip` look in filter bars: `<SelectTrigger className="p-chip h-8 w-auto">`.
- Menu rows grow to 40px under `(pointer:coarse)`.

---

## 8. Tables: floating card rows (`os-kit.css` + `table.tsx` DataGrid)

```css
.osg-rows { border-collapse: separate; border-spacing: 0 6px; }      /* compact: 0 3px */
.osg-row { transition: transform 160ms var(--p-ease), filter 160ms var(--p-ease); }
.osg-row > td { background: var(--p-surface); box-shadow: inset 0 1px 0 var(--p-line-soft), inset 0 -1px 0 var(--p-line-soft); }
.osg-row > td:first-child { border-radius: 12px 0 0 12px;
  box-shadow: inset 1px 0 0 var(--p-line-soft), inset 0 1px 0 var(--p-line-soft), inset 0 -1px 0 var(--p-line-soft); }
.osg-row > td:last-child  { border-radius: 0 12px 12px 0;
  box-shadow: inset -1px 0 0 var(--p-line-soft), inset 0 1px 0 var(--p-line-soft), inset 0 -1px 0 var(--p-line-soft); }
.osg-row:hover, .osg-row:focus-visible, .osg-row[data-cursor="true"] {
  transform: translateY(-1px); filter: drop-shadow(0 10px 16px rgba(18,23,20,.08)); outline: none; }
.osg-row:hover > td { background: color-mix(in srgb, var(--p-accent) 4%, var(--p-surface)); }
.osg-row:hover > td:first-child, .osg-row[aria-selected="true"] > td:first-child {
  box-shadow: inset 4px 0 0 var(--p-accent), inset 0 1px 0 var(--p-line-soft), inset 0 -1px 0 var(--p-line-soft); } /* 4px accent bar */
.osg-row[aria-selected="true"] > td { background: color-mix(in srgb, var(--p-accent) 8%, var(--p-surface)); }
.osg-row[data-muted="true"] > td { background: color-mix(in srgb, var(--p-paper) 55%, var(--p-surface)); }
.osg-row[data-alert="true"] > td:first-child { box-shadow: inset 4px 0 0 var(--p-clay), ...; }
.osg-rows thead th { position: sticky; top: 0; z-index: 2; background: color-mix(in srgb, var(--p-surface) 92%, var(--p-paper));
  box-shadow: inset 0 1px 0 var(--p-line), inset 0 -1px 0 var(--p-line); backdrop-filter: blur(6px); }
.osg-rows thead th:first-child { border-radius: 11px 0 0 11px; } .osg-rows thead th:last-child { border-radius: 0 11px 11px 0; }
/* below 640px of its OWN width (ResizeObserver) each row becomes a card */
.osg-card { border-radius:14px; background:var(--p-surface); box-shadow: inset 0 0 0 1px var(--p-line-soft), 0 1px 2px rgba(18,23,20,.04); }
```

**DataGrid markup and behaviour**

- Wrapper: `p-scroll max-h-[720px] overflow-auto px-3 pb-1`.
- Table: `<table className="osg-rows w-full text-[12.5px]" data-density style={{minWidth:960}}>`.
- `th`: `px-3 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.06em]`; colour `--p-faint`, or `--p-text` when sorted. The sort icon is `ChevronsUpDown`, shown on hover at opacity 0.6.
- `td` padding: `px-3 py-2.5` (compact `py-1.5`).
- Two-line cell: top line `font-semibold` in `--p-text-2` (strong: `font-bold tracking-[-0.015em]` in `--p-text`); sub line `mt-0.5 text-[11px] font-semibold` in `--p-faint`.
- Toolbar: a caption `"1–25 of 1,234"` (11.5px `--p-faint`), a "keys" hint, Export `p-chip`, a density switch (`p-seg !h-[26px]` inside an r10 surface group) and a Columns `p-chip` dropdown.
- Bulk bar on selection: `rounded-[11px] px-3 py-1.5` in `--p-accent-bg` with an accent 30% ring and an "N selected" label.
- Pagination: `p-iconbtn` arrows plus number buttons `h-8 min-w-8 rounded-[8px] text-[12px] font-bold`. The current page is inverted: `background: var(--p-text); color: var(--p-surface)`.
- Keyboard: up/down or j/k move, Enter opens, x or Space selects, left/right page.
- Loading rows are `osg-row` with `animate-pulse` bars at varying widths.
- Luxe deals rows in with `lx-enter` 420ms, staggered by 25ms up to 175ms.
- The legacy `tr.p-row` hover bar sits on the first cell, because a `<tr>::before` shifts cells in Chrome.

---

## 9. Badges and status

From `components/os/tone.tsx`:

```ts
export const TONE = {
  accent:  { fg:"var(--p-accent)", bg:"var(--p-accent-bg)" },
  amber:   { fg:"var(--p-amber)",  bg:"rgba(173,117,38,0.11)" },
  clay:    { fg:"var(--p-clay)",   bg:"rgba(177,77,44,0.11)" },
  slate:   { fg:"var(--p-slate)",  bg:"rgba(68,112,142,0.11)" },
  violet:  { fg:"#6B5BA8",         bg:"rgba(107,91,168,0.12)" },
  neutral: { fg:"var(--p-faint)",  bg:"var(--p-line-soft)" },
};
// word → tone: active/approved/paid/delivered=accent · processing/shipped/assigned/draft=slate
// pending/hold/review/late/partial=amber · rejected/cancelled/failed/overdue/absent=clay · inactive/closed/archived=neutral
```

```tsx
<span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-[3px] text-[11px] font-semibold"
  style={{color:t.fg, background:t.bg}}>
  <span className="h-1.5 w-1.5 rounded-full" style={{background:t.dot}}/>{label}</span>     {/* xs: px-1.5 py-[1px] text-[10.5px] */}
<span className="inline-flex rounded-[5px] px-1.5 py-[1px] text-[10px] font-bold uppercase tracking-[0.05em]"
  style={{color:"var(--p-muted)", boxShadow:"inset 0 0 0 1px var(--p-line)"}}>TYPE</span>   {/* Tag: categories only, never status */}
```

**Related pieces**

- **Live status dot:** `.p-live` applies `p-halo` (2.4s ring 3px→6px).
- **DeltaPill:** ▲/▼ at `text-[10.5px] font-bold tabular-nums rounded-full px-1.5 py-0.5`, coloured `--p-accent` or `--p-clay` on a `color-mix(tone 12%)` background.
- **Avatar:** colour is a hash over five earthy pairs (`#2E7D56`, `#6B7A3A`, `#AD7526`, `#B14D2C`, `#7A6650`, each on 14% alpha), with initials at `size*0.38`.

---

## 10. KPI / stat tiles

### 10.1 PrimaryMetric ink block (`primitives.tsx`)

- `p-ink-block rounded-[14px] px-[22px] pt-5`, `minHeight: 172`, `boxShadow: 0 22px 44px -28px rgba(11,16,13,.75)`.
- A **3px mint left bar** (`#5FD39A`, glow `0 0 14px rgba(95,211,154,.6)`).
- Label at 12px `rgba(232,244,236,.72)`, then the value as `p-num text-[52px] font-semibold` white with the unit at 26px/60%.
- A delta chip, and a bottom-bleed sparkline: mint stroke 1.6, area gradient 0.32→0.

```css
.p-ink-block { background-color:#12301F; background-image: linear-gradient(152deg, #1F4C36 0%, #10291B 58%, #163825 100%); }
/* luxe overrides with grain + drifting aurora: */
.command-os .p-ink-block { background-color:#10291B;
  background-image: var(--lx-grain),
    radial-gradient(38% 60% at var(--lx-ax,82%) var(--lx-ay,0%), rgba(116,229,176,.26), transparent 70%),
    radial-gradient(45% 70% at 0% 100%, rgba(116,229,176,.10), transparent 70%),
    linear-gradient(152deg, #215338 0%, #10291B 56%, #173B27 100%);
  background-size: 140px 140px, 100% 100%, 100% 100%, 100% 100%;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.10), inset 0 0 0 1px rgba(190,235,210,.08);
  animation: lx-aurora 16s ease-in-out infinite alternate; }
@property --lx-ax { syntax:"<percentage>"; inherits:false; initial-value:82%; }
@property --lx-ay { syntax:"<percentage>"; inherits:false; initial-value:0%; }
@keyframes lx-aurora { 0%{--lx-ax:82%;--lx-ay:0%} 50%{--lx-ax:58%;--lx-ay:18%} 100%{--lx-ax:96%;--lx-ay:36%} }
```

Ink-surface text constants (`heroKit.tsx`):

| Constant | Value |
|---|---|
| `INK_TEXT` | `rgba(232,244,236,.72)` |
| `INK_MUTED` | `.62` |
| `INK_FAINT` | `.42` |
| `INK_LINE` | `rgba(255,255,255,.09)` |
| `MINT` | `#5FD39A` |
| `INK_AMBER` | `#E0A852` |
| `INK_CLAY` | `#F0A080` |

### 10.2 StatCell (`screenKit.tsx`) inside CellGrid

The grid uses **hairline gaps**: a `gap-px` grid on a `--p-line-soft` background, with each cell painted `--p-surface`.

```tsx
<section className="p-panel grid grid-cols-2 gap-px overflow-hidden md:grid-cols-3" style={{background:"var(--p-line-soft)"}}>
  <div className="flex" style={{background:"var(--p-surface)"}}>
    <button className="p-lift flex min-w-[150px] flex-1 basis-[45%] flex-col px-4 pb-4 pt-4 text-left sm:px-5 sm:pt-5 xl:basis-0">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px]"
          style={{background:`color-mix(in srgb, ${tone} 12%, transparent)`, color:tone}}><Icon className="h-3.5 w-3.5"/></span>
        <span className="truncate text-[12px] font-semibold" style={{color:"var(--p-muted)"}}>{label}</span>
      </div>
      <div className="p-num mt-3.5 text-[30px] leading-none tabular-nums sm:text-[32px]">{<CountUp value={n}/>}</div>
      <div className="mt-2 truncate text-[11.5px] font-semibold" style={{color:"var(--p-faint)"}}>{context}</div>
      <div className="mt-auto pt-3.5">{/* ShareBar h-[6px] / Sparkline */}</div>
    </button></div></section>
```

- Compact variant (what `CellGrid` actually renders): `text-[24px]`, `px-4 pb-3 pt-3`.
- `MetricCell` (primitives) uses `text-[32px]` with `CellDivider`, a vertical 1px gradient line.

### 10.3 ProgramCards (`pages/dashboard/ProgramCards.tsx`)

```tsx
<section className="db-tile db-rise p-panel relative flex min-w-0 flex-col overflow-hidden px-4 pb-3.5 pt-4 sm:px-5" style={stagger(i)}>
  <span className="absolute inset-x-0 top-0 h-[3px]" style={{background:`linear-gradient(90deg, ${meta.color}, transparent)`}}/>
  <header className="mb-3 flex items-center justify-between gap-2">
    <span className="db-medallion flex h-9 w-9 items-center justify-center rounded-full"><Icon className="h-4 w-4"/></span>
    <h2 className="text-[15px] font-bold tracking-[-0.02em]">Franchisee</h2><span className="text-[10.5px] font-semibold">vs the month</span>
    <Info className="h-4 w-4" style={{color:"var(--p-ghost)"}}/></header>
  <div className="text-[11px] font-semibold" style={{color:"var(--p-muted)"}}>Headline</div>
  <span className="p-num text-[28px] leading-none"><CountUp/></span> <DeltaPill/>
  <div className="mt-3 h-[40px]"><AreaSpark color={meta.color}/></div>     {/* stroke 1.8, fill 0.32→0, end dot r2.2 */}
  <dl className="mt-3 grid grid-cols-3 gap-2">  {/* mini key-nums */}
    <div className="rounded-[10px] px-2 py-1.5" style={{background:"var(--p-surface-2)", boxShadow:"inset 0 0 0 1px var(--p-line-hair)"}}>
      <dt className="text-[9.5px] font-semibold uppercase tracking-[0.05em]">Orders</dt><dd className="text-[14px] font-bold tabular-nums">42</dd></div></dl>
  <footer className="mt-3 flex justify-end pt-2.5" style={{borderTop:"1px solid var(--p-line-soft)"}}>
    <Link className="group inline-flex items-center gap-1 text-[12px] font-bold" style={{color:"var(--p-accent)"}}>Open X
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"/></Link></footer>
</section>
```

```css
.command-os .db-tile:hover, .command-os .db-tile:focus-within { transform: translateY(-2px);
  box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--p-accent) 45%, transparent), 0 22px 40px -28px rgba(11,30,20,.55); }
.command-os .db-medallion { background: radial-gradient(circle at 30% 25%, color-mix(in srgb, var(--p-accent) 26%, transparent), transparent 70%), var(--p-accent-bg);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--p-accent) 22%, transparent); color: var(--p-accent); }
.command-os .db-rings { background: repeating-radial-gradient(circle at 100% 0%, transparent 0 22px, rgba(255,255,255,.045) 22px 23px);
  mask-image: radial-gradient(circle at 100% 0%, #000 0, transparent 70%); }
.command-os .db-medal[data-rank="1"] { background: color-mix(in srgb, var(--p-amber) 22%, transparent); color: var(--p-amber);
  box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--p-amber) 55%, transparent); }  /* rank 2 slate, 3 clay; 22px circle */
```

Each tile has its own loading (Shimmer stack), denied (ShieldOff) and error (CloudOff, clay, "Try again" `p-btn !h-8`) state via `StateFace`, which wraps an `lx-empty` disc.

### 10.4 Panel / Card header

- Header row: `px-5 pt-[18px]`.
- Title: `text-[15.5px] font-bold tracking-[-0.02em]` in `--p-text`.
- Caption: `mt-1 text-[11.5px] font-medium` in `--p-faint`.
- Actions: `ml-auto`.
- Body: `px-5 pb-5 pt-3.5`.
- Optional footer: `px-5 py-3` with `borderTop: 1px solid var(--p-line-soft)`.

---

## 11. Charts

**Libraries:**

- **Mostly hand-rolled SVG** in `components/os/charts.tsx` and `primitives.tsx`, sized with a `useMeasuredWidth` ResizeObserver.
- **Recharts ^2.15.4** appears only on a few screens: `pages/prasar/attendance/Analytics.tsx`, `expenses/SpendingTrend.tsx`, `expenses/Overview.tsx`, `micro-dealer/MicroDealerDashboard.tsx`.

**SVG kit rules** (from the charts.tsx header comment):

- Hues come from `SERIES = ["var(--c1)".."var(--c5)"]` in order; `OTHER = var(--c-other)`; `SEQ` for heat cells.
- Marks are thin, with a **4px rounded data-end** and a **2px surface gap** between stacked segments.
- Every mark has a hover/focus tooltip that leads with the value.
- Text wears text tokens, never the series colour.
- `onPick` lets a chart filter the list below it and marks the active slice.

**Specifics**

- **Grid:** 5 ticks at `[0,.25,.5,.75,1]`, `stroke var(--p-line-soft)` (AreaChart: `--p-line-hair`, baseline `--p-line`). There are no vertical gridlines.
- **Axis text:** `fontSize 10.5–11, fontWeight 600, fill var(--p-faint)/var(--p-ghost)`, tabular. `padL` is 44–46px.
- **Y scale:** `niceMax(max*1.08)` steps 1/2/2.5/5/10. INR axis format `₹1.2L / ₹3Cr / ₹40K`.
- **Area line:** accent stroke 2, fill gradient accent 0.16→0. Compare series: `--p-ghost`, dash `3 4`, opacity 0.7.
  - Hover: a dashed `2 3` crosshair, a 9px halo at 0.12 and a 4.2px surface dot with 2.2 accent stroke.
  - Its tooltip is dark ink: `background #121915; boxShadow 0 18px 32px -16px rgba(11,16,13,.7)`, 160px wide, r10.
- **ColumnChart:** `barW = min(24, band*0.62)`, a top-rounded path with `rx = min(4, ...)`, and the whole band as hit target.
- **Donut:** thickness 16 (13 in primitives), `size 176`, gap 3, hovered arc `+5` width; the centre reads out the hovered slice (`p-num 28px`) with an optional thin inner ring for a percentage.
- **Legend items:** `h-2.5 w-2.5 rounded-[3px]` swatch plus 11px `--p-muted` label. The donut legend doubles as a ranked list with 5px bars.
- **Hover dimming:** `.os-dim > .os-mark:not([data-hot="true"]) { opacity:.38 }`, `.os-mark[data-hot="true"]{filter:brightness(1.08)}`.
- **Light tooltip `.os-tip`:** fixed, portalled to body, `min-width:140px; max-width:260px; padding:8px 10px; border-radius:10px; background:var(--p-surface); box-shadow:0 10px 28px -8px rgba(18,23,20,.28), inset 0 0 0 1px var(--p-line); font-size:11.5px; animation:p-open 120ms`.
- **Draw-in** (`os-luxe.css`):

```css
.command-os .os-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: lx-grow 700ms cubic-bezier(.2,.8,.2,1) backwards; } /* +i*18ms delay */
.command-os .os-arc { animation: lx-arc 900ms cubic-bezier(.2,.8,.2,1) backwards; }   /* from opacity 0, stroke-width 0 */
.command-os .os-fill { transform-origin: 0 50%; animation: lx-fill 800ms cubic-bezier(.2,.8,.2,1) backwards; }
```

- **Other kit pieces:** BarList / RankRow (label, value, 4px bar), Heatmap (quantile breaks on `--seq-*`), CalendarHeat (GitHub-style), Funnel, StackBar, Ring (46px, 4.5 stroke), DotMap (lat/lng SVG scatter, no tiles), Sparkline (40×14, stroke 1.5), MiniBars (34px, last bar accent).

**Recharts convention** (Analytics.tsx):

```tsx
const AXIS = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };  const GRID = "hsl(var(--border))";
<CartesianGrid vertical={false} stroke={GRID} strokeDasharray="2 4"/>
<XAxis tick={AXIS} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={14}/>
<YAxis tick={AXIS} tickLine={false} axisLine={false} width={40}/>
<RTooltip cursor={{stroke:"hsl(var(--muted-foreground))", strokeWidth:1, strokeDasharray:"3 3"}} content={<ChartTooltip/>}/>
<Area type="monotone" strokeWidth={2} fillOpacity={0.08} dot={false} activeDot={{r:4,strokeWidth:2,stroke:"hsl(var(--card))"}} isAnimationActive={false}/>
<Line strokeDasharray="4 3" .../>   // "absent"/negative series dashed
```

- Recharts tooltip: `min-w-[160px] rounded-lg border bg-popover px-3 py-2 text-xs shadow-md`, with a 3px-tall line swatch per row (dashed via repeating-linear-gradient).
- Series toggles are rounded-full pills, `text-[11px]`; off = `line-through` in `--p-ghost`.
- The empty chart keeps its own height (`ChartEmpty` → `EmptyNote compact`).

---

## 12. Detail view: EntityDrawer (`components/os/drawer.tsx`)

- It is a shadcn `Sheet` with `className="command-os flex flex-col gap-0 p-0"` and `background: var(--p-paper)`.
- Right side `sm:max-w-[580px]`; bottom sheet on mobile `h-[92vh] rounded-t-2xl`; expandable to full screen with the content column `max-w-[1180px]`.
- It can also dock into the layout dock (`rounded-2xl`, `animate-in slide-in-from-right-6 duration-300`).

Anatomy:

1. **Ink header** `p-ink-block px-5 pt-5 pb-5`, with a mint radial glow `-right-10 -top-16 h-44 w-44`.
   - Prev/next/expand/close: `rounded-lg p-1.5 text-white/60 hover:bg-white/10` inside `.odr-nav` (a glass pill).
   - Title: `text-[19px] font-extrabold tracking-[-0.025em] text-white` (28px full screen); subtitle 12px `rgba(232,244,236,.62)`.
   - Pills: TonePills on a white backing `rounded-full bg-white p-px`.
   - `InkAction` chips: `h-[22px] rounded-full px-2 text-[11.5px]` with an `inset 0 0 0 1px rgba(255,255,255,.18)` outline. The primary chip is a mint gradient `#7FE0B2→#55C48F` with text `#06170D`.
   - Progress: `h-1.5 bg-white/10` with a mint fill and glow.
   - Avatar: a gradient `#2E7D56→#16603E` with `ring-[3px] ring-white/15`.
2. **StatGrid**: `grid divide-x divide-[var(--p-line-soft)] rounded-[14px] bg-[var(--p-surface)] shadow-[inset_0_0_0_1px_var(--p-line)]`. Cells are `px-3.5 py-3`: label 11.5px `--p-faint`, value `p-num text-[17px]`.
3. **Tabs**: an equal-width grid. Full screen uses `.odr-tabs`, where the active tab has `background: linear-gradient(180deg,#2E7D56,#22643F)`, white text and a count pill.
4. **Body pieces**:
   - `SubHeading`: 13px bold with a 14px `--p-faint` icon. Full screen gives the icon a badge: `padding:6px; border-radius:9px; background:var(--p-accent-bg)`.
   - `FieldGrid`: 2-col, `rounded-[14px] px-4 py-3.5`, uppercase 10.5px labels, 12.5px semibold values.
   - `InfoRow`: `rounded-xl px-3.5 py-3` on `--p-surface-2` with a line-soft ring.
   - `Timeline`: grid `[62px_20px_1fr]`.
   - Footer: `px-5 py-3`, top border `--p-line`, background `--p-surface`.
5. **Full-screen hero** `.odr-hero`: ink plus a mint and blue radial and a 36px survey grid `.odr-hero-art` fading down.
   - `pb-24` lets the stat cards overlap it: `.odr-stats -mt-16`, r18, shadow `0 22px 44px -26px rgba(12,38,24,.45)`.
   - Sections rise in with `odr-rise 420–460ms`, staggered 70ms.
6. **Layout helpers**:
   - `DRAWER_SPLIT` = `space-y-4 [@container(min-width:880px)]:grid [@container(min-width:880px)]:grid-cols-2 ... gap-5`
   - `DRAWER_STATS` does the same with `gap-3`.

---

## 13. Dialogs and forms

**Form dialog**

```tsx
<DialogContent className="command-os flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[680px]">
  <DialogHeader className="shrink-0 px-6 pb-4 pt-6 text-left" style={{borderBottom:"1px solid var(--p-line)"}}>
    <DialogTitle className="text-[19px] font-bold tracking-[-0.025em]" style={{color:"var(--p-text)"}}/>
    <DialogDescription className="text-[12.5px] font-medium" style={{color:"var(--p-muted)"}}/>
  </DialogHeader>
  <div className="p-scroll flex-1 overflow-y-auto px-6 py-5"><div className="space-y-3.5">
    <label className="block min-w-0"><span className="mb-1.5 flex items-baseline gap-1.5">
      <span className="text-[11.5px] font-bold" style={{color:"var(--p-text)"}}>Name</span>
      <span className="text-[10.5px] font-medium" style={{color:"var(--p-faint)"}}>optional</span></span>
      <Input className="h-9 text-[13px]"/></label>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{/* SelectTrigger h-9 text-[12.5px]; SelectContent className="command-os" */}</div>
  </div></div>
  <div className="px-6 py-3.5 flex ..." style={{borderTop:"1px solid var(--p-line)", background:"var(--p-surface-2)"}}>
    {/* summary chips 11.5px --p-muted with icons | p-btn Cancel | p-btn-ink Save */}</div>
</DialogContent>
```

**Confirm** (`ConfirmDialog` in `directory.tsx`):

- `AlertDialogContent className="command-os sm:max-w-[440px]"` with `background: var(--p-paper)`.
- Title: `text-[16px] font-extrabold tracking-[-0.025em]`.
- Body: 12.5px, line-height 1.55, `--p-muted`.
- The copy must say exactly what happens and to how many records, never just "Are you sure?".
- Buttons: `p-btn` Cancel, then `p-btn-ink` or a clay-outlined `p-btn`.

---

## 14. Empty, loading and error states

**`EmptyNote`** (`directory.tsx`, the main one):

- Container: `rounded-[12px] px-6 py-12` (compact `px-4 py-7`) with `inset 0 0 0 1px var(--p-line-soft)`.
- A 56px `lx-empty` disc holding an accent icon (`strokeWidth 1.9`), then a 13px bold title, then an 11.5px `--p-muted` hint (max 320px) and an optional action.

```css
.command-os .lx-empty { background: radial-gradient(circle, var(--p-accent-bg) 0%, color-mix(in srgb, var(--p-accent) 5%, transparent) 70%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--p-accent) 18%, transparent); }
.command-os .lx-empty::before, .command-os .lx-empty::after { content:""; position:absolute; inset:-8px; border-radius:50%;
  border: 1px solid color-mix(in srgb, var(--p-accent) 16%, transparent); animation: lx-ripple 3.2s ease-out infinite; }
.command-os .lx-empty::after { animation-delay: 1.6s; }
@keyframes lx-ripple { from { transform: scale(.85); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }
```

**Other states**

- **`EmptyState`** (primitives) is the "instrument present, data absent" variant: an SVG of dashed baselines with 4 dots, a title, and a hint `LISTENING · 0 EVENTS` with a hollow 5px dot.
- **`LoadingBars`**: five 3px accent bars at heights 40–88% and opacity .25–.85, running `p-rise 700ms` staggered 90ms, alternating; plus an 11px label.
- **Skeletons:** `Shimmer` = `animate-pulse rounded-[14px]` on a `--p-line-soft` background. Luxe swaps the pulse for a sweep:

```css
.command-os .animate-pulse { animation: lx-shimmer 1.5s linear infinite !important;
  background-image: linear-gradient(100deg, transparent 20%, color-mix(in srgb, var(--p-surface) 70%, transparent) 50%, transparent 80%) !important;
  background-size: 220% 100% !important; background-repeat: no-repeat !important; }
```

- **Page fallback:** a 92px header skeleton, then a `grid lg:grid-cols-3` of three 180px blocks, then one 320px block, all r16.
- **Refresh shimmer:** `.p-refreshing` on `<main>` sweeps one fixed-attachment light band over every `.p-panel` and `.osg-row > td`, with content at opacity .78:

```css
.p-refreshing :is(.p-panel,.p-panel-quiet,.p-ink-block,.p-shimmer)::after, .p-refreshing .osg-row > td::after {
  content:""; position:absolute; inset:0; z-index:2; border-radius:inherit; pointer-events:none;
  background-image: linear-gradient(105deg, transparent 38%, var(--p-shimmer) 50%, transparent 62%);
  background-size: 220% 100%; background-attachment: fixed; animation: p-shimmer 1.15s linear infinite; }
```

- **`ErrorBanner`:** `p-panel px-5 py-4` with text in `--p-clay`, `boxShadow: inset 3px 0 0 var(--p-clay), inset 0 0 0 1px color-mix(in srgb, var(--p-clay) 28%, var(--p-line))`, plus a Retry `p-btn !h-8`.
- **Network banner:** `.os-netbanner[data-state=offline]` uses an amber 18% mix; `online` uses `--p-accent-bg`.

---

## 15. Luxe motifs (`os-luxe.css`, cursor-follow)

`lib/spotlight.ts` sets `--mx/--my` on `.p-panel, .p-panel-quiet, .p-lift, .os-capsule, .os-rail-ico`. It only runs for `(hover:hover) and (pointer:fine)` and not under reduced motion, throttled with requestAnimationFrame.

```css
.command-os .p-panel, .command-os .p-panel-quiet {
  background-image: radial-gradient(520px circle at var(--mx,-999px) var(--my,-999px), var(--lx-spot), transparent 42%); }
.command-os .p-panel:hover { box-shadow: inset 0 0 0 1px var(--lx-edge), 0 1px 2px rgba(18,23,20,.03), 0 26px 48px -38px rgba(18,60,36,.55); }
.command-os .p-lift:hover {
  background: radial-gradient(260px circle at var(--mx,50%) var(--my,0%), var(--lx-spot), transparent 60%), linear-gradient(180deg, var(--p-surface), var(--p-surface-3));
  box-shadow: inset 0 0 0 1px var(--lx-edge), 0 18px 32px -24px rgba(18,60,36,.55); transform: translateY(-2px); }
/* capsules: warm light under the hand */
.os-capsule, .os-rail-ico { background-image:
  radial-gradient(120px circle at var(--mx,-300px) var(--my,-300px), rgba(255,246,222,.11), transparent 70%),
  linear-gradient(165deg, color-mix(in srgb, var(--os-nav-1), #fff 5%) 0%, color-mix(in srgb, var(--os-nav-2), #000 8%) 100%); }
```

**Primary button sheen**

```css
.command-os .p-btn-ink {
  background-image: linear-gradient(110deg, transparent 38%, rgba(255,255,255,.22) 50%, transparent 62%), linear-gradient(180deg,#2A5E43,#143526);
  background-size: 260% 100%, 100% 100%; background-position: 130% 0, 0 0; background-repeat: no-repeat;
  transition: transform 160ms var(--p-ease), box-shadow 160ms var(--p-ease), background-position 700ms var(--p-ease); }
.command-os .p-btn-ink:hover { background-position: -30% 0, 0 0; }
.command-os .p-btn-ink:active { transform: translateY(0) scale(.98); }
.command-os .p-btn, .command-os .p-chip, .command-os .p-iconbtn {
  background-image: linear-gradient(180deg, var(--p-surface), color-mix(in srgb, var(--p-paper) 55%, var(--p-surface))); }
.command-os :is(.p-btn,.p-chip,.p-iconbtn):hover { box-shadow: inset 0 0 0 1px var(--lx-edge), 0 6px 14px -10px rgba(18,60,36,.45); }
.command-os :is(.p-btn,.p-chip,.p-iconbtn):active { transform: translateY(0) scale(.97); }
```

**Active segment pop and arriving numbers**

```css
.command-os .p-seg[data-on="true"] {
  background-image: radial-gradient(120% 140% at 50% 0%, rgba(116,229,176,.28), transparent 60%), linear-gradient(180deg,#28593F,#143526);
  box-shadow: 0 8px 18px -10px rgba(20,53,38,.95), inset 0 1px 0 rgba(255,255,255,.16), inset 0 0 0 1px rgba(116,229,176,.14);
  animation: lx-pop 260ms var(--p-ease); }
@keyframes lx-pop { 0%{transform:scale(.94)} 60%{transform:scale(1.03)} 100%{transform:none} }
.command-os .p-num { animation: lx-num 640ms cubic-bezier(.2,.8,.2,1) backwards; }
@keyframes lx-num { from { opacity:0; transform:translateY(8px); filter:blur(6px); } to { opacity:1; transform:none; filter:none; } }
```

`CountUp` counts numbers up over 750ms with an ease-out cubic.

**Page entrance stagger**

```css
.os-main > * > *, .os-main > * > * > .grid > * { animation: lx-enter 520ms cubic-bezier(.2,.8,.2,1) backwards; }
.os-main > * > *:nth-child(2){animation-delay:60ms} /* …3:120 4:180 5:240 n+6:300 */
.os-main > * > * > .grid > *:nth-child(2){animation-delay:140ms} /* 3:200 n+4:260 */
@keyframes lx-enter { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
```

**Also in this layer**

- The ScreenHeader band takes the same grain plus an `lx-aurora` 18s drift.
- `.p-head-icon` gets a mint glow: `0 10px 24px -10px rgba(116,229,176,.55)`.
- Selection colour is an accent 24% mix; scrollbar thumb hover is an accent 45% mix.
- Selected table row adds `inset 12px 0 18px -14px var(--lx-glow)`.

---

## 16. Motion summary

| Thing | Duration / easing |
|---|---|
| Base easing | `--p-ease: cubic-bezier(0.22,0.85,0.28,1)` |
| Entrance easing | `cubic-bezier(.2,.8,.2,1)` |
| Spring (glide, kbd pop) | `cubic-bezier(.34,1.28,.64,1)` / `(.34,1.4,.64,1)` |
| Hover color/shadow | 120–160ms |
| Lift / capsule | 200ms, press scale .975 at 90ms |
| Nav marker / glide | top 280ms / transform 460ms spring |
| Panel slide-in | `os-panel-in` 220ms (translateX -8px) |
| Drawer nav (phone) | 260ms |
| `p-rise` / `p-open` | 200ms (6px up) / 170ms (5px down) |
| ScreenHeader | 260ms; stat chips 320ms staggered 50ms |
| Page enter | 520ms, stagger 60ms; dashboard `.db-rise` 460ms, `STAGGER_MS=60` via `--d` |
| Table rows | 420ms, 25ms stagger |
| Numbers | 640ms blur-in; CountUp 750ms |
| Charts | bars 700ms (+18ms/col), arcs 900ms, fills 800ms |
| Shimmer / progress | 1.15–1.5s linear |
| Aurora | 16–18s alternate |
| Live halos | 1.8–2.4s |

**Every** animation is disabled under `prefers-reduced-motion`. A blanket rule in `command-os.css` sets `.command-os *` animation and transition durations to 0.01ms.

---

## 17. Dashboard grid rules (`pages/Dashboard.tsx`)

```tsx
<div className="space-y-6 pb-16">
  {dockRail(<ScreenHeader .../>, <PeriodRail/>)}
  <DashboardAttention/>                                                     {/* alert strip */}
  <div className="grid grid-cols-1 gap-4 xl:grid-cols-[440px_minmax(0,1fr)]"> {/* HeroFrame: ink block | CellGrid */}
  <TodayStrip/>
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{/* 4 ProgramCards */}</section>
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
    <div className="db-rise min-w-0 lg:col-span-7"/> <div className="db-rise min-w-0 lg:col-span-5"/>   {/* monthly | weekly charts */}
    <div className="lg:col-span-4"/> ×3                                                               {/* leaderboards + pulse feed */}
  </div>
  <p className="text-[11px] font-medium leading-relaxed" style={{color:"var(--p-faint)"}}>{/* data-source footnote */}</p>
</div>
```

- Section rhythm is `space-y-6`; the grid gap is always `gap-4`.
- Every grid child gets `min-w-0`.
- `<main>` is an inline-size container, so drawers and announcement pages use `@container` queries (for example 880px).

---

## 18. Auth page (`src/pages/Auth.tsx`)

It is always light (`.kt-auth { color-scheme: light }`) with hard-coded hexes:

```ts
const C = { bg:'bg-[#F6F5F1]', surface:'bg-white', border:'border-[#E5E3DA]', text:'text-[#121714]', muted:'text-[#5C635A]',
            brand:'text-[#1B4A36]', brandHover:'hover:text-[#2E7D56]' };
const fieldWrapClass = 'relative flex items-center rounded-full bg-white p-1 shadow-[0_10px_25px_-5px_rgba(27,74,54,0.15),_0_8px_16px_-6px_rgba(0,0,0,0.05)] transition-shadow duration-300 focus-within:shadow-[0_10px_30px_-3px_rgba(27,74,54,0.28)] focus-within:ring-2 focus-within:ring-[#1B4A36]/20';
const iconChipClass = 'flex h-12 w-12 items-center justify-center rounded-full shrink-0 text-white bg-gradient-to-br from-[#1B4A36] to-[#0F2E1E] shadow-md';
const submitButtonClass = 'w-full rounded-full bg-gradient-to-r from-[#1B4A36] to-[#0F2E1E] text-center py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_24px_rgba(15,46,30,0.32)] transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]';
```

**Layout**

- A `max-w-[1040px]` split card: `rounded-[28px] border shadow-xl md:min-h-[600px]`.
- Left: the form (`max-w-[360px]`, "Hello!" at `text-3xl sm:text-4xl font-bold tracking-tight`).
- Right: a forest gradient `from-[#0F2E1E] via-[#143A26] to-[#1B4A36]`, masked by a **wavy torn-edge SVG** (`M960,0 L400,0 C440,40 500,50 480,100 C460,140 680,150 740,220 C800,280 620,330 680,410 C720,460 620,490 600,540 L960,540 Z`) with an illustration bottom-aligned.
- Background: a 20px dot grid `radial-gradient(#E5E3DA 1px, transparent 1px)` masked to a central ellipse.

**Motion**

- **TiltCard:** `perspective(1400px) rotateX/Y` toward the pointer with 600ms ease, plus a `.kt-glare` radial `rgba(255,255,255,.16)` / `rgba(116,229,176,.06)`.
- **Falling leaves:** a lazy-loaded three.js scene (`pages/auth/LeafField.tsx` → `leafScene`); without WebGL or under reduced motion the CSS fallback `FallingDecor` draws 64 leaves (from 4 PNGs) in 3 depth layers (far: small, blurred, 13–15s; near: big, drop-shadowed, 7.5–8.5s), zig-zag `ktLeaf` plus 3D `ktFlutter`, with a seeded PRNG so the layout is stable.
- Entrance: `kt-rise` .32s; errors: `kt-pop-in` .18s spring.

**Other details**

- The OTP screen puts digit boxes inside a single rounded-full pill (`h-9 w-6 text-2xl font-semibold`) with a 36px gradient chip.
- An autofill fix paints a white inset shadow so Chrome's blue fill never shows.

---

## 19. Core rules

- One brand hue (forest/mint). Depth comes from light, glass, grain and motion, never a second hue. The exception is the per-module pastel `--m` in the nav only.
- "Informational" is sage-grey (`--p-slate`), never blue.
- Borders are always inset box-shadows. Elevation is a long negative-spread drop shadow, `0 20px 40px -36px`.
- Ink (dark forest) blocks are for the one hero metric or identity per screen. Everything else sits on a white `p-panel` over warm paper.
- Light-on-ink text uses `rgba(232,244,236, .72/.62/.42)`; mint `#5FD39A` / `#74E5B0` for highlights on ink.
- Status colour comes only from the TONE map. Tags are outlined uppercase and never carry status.
- Numbers always use `p-num` plus tabular figures and count up. Tables use floating card rows with a 4px accent bar on hover or selection.
- Every surface has its own loading, denied and error face. Empty states are "quiet" (ripple disc), never broken-looking.
- Everything stops under `prefers-reduced-motion`. Touch targets are at least 36px under `pointer: coarse`. Inputs are 16px on phones so iOS doesn't zoom.
