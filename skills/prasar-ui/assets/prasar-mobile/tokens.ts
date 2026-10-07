import { Platform } from "react-native";

/**
 * The ground and scrims for full-bleed media — a photo lightbox, a video viewer, a thumbnail's
 * duration pill.
 *
 * **The same object in both themes**, which is the whole point of it living here rather than twice
 * in each palette. A viewer exists to show a photograph, and the only honest ground for one is a
 * near-black that does not tint it; flipping to a light ground in light mode would put the agent's
 * shop-front photo on a white card and change the colours they are trying to read. `hero.text` is
 * the foreground that goes with it, being light in both themes for the same reason.
 *
 * It is a token group because it had already drifted: the product lightbox and the support gallery
 * each invented their own, and between them held FIVE values for these three roles (`#0A0D0B`,
 * `#0A0B0A`, and three scrims at two different hues and .55/.70/.78). Two agents auditing different
 * modules asked for this pair independently, which is what a missing token looks like from the
 * outside.
 *
 * `ground` must stay **opaque**: both viewers are `Modal`s with no backing of their own, so a
 * translucent ground washes over whatever is behind them. `scrim` is for a control ON the media
 * (a close disc, a play button) and is deliberately stronger than `colors.scrim` — that one is
 * tuned to dim a page underneath an overlay, and at 0.42 it cannot hold a light label legible over
 * an arbitrary photograph.
 */
const MEDIA = {
  ground: "#0A0C0B",
  scrim: "rgba(10, 13, 11, 0.62)",
  pillScrim: "rgba(10, 13, 11, 0.78)",
} as const;

export const colors = {
  primary: "#15683F",
  primaryHover: "#0F4F30",
  primaryText: "#146137",
  secondary: "#5C6B60",
  accent: "#8F6410",
  accentLime: "#5C6B60",
  success: "#1F7A4D",
  warning: "#93610E",
  danger: "#B4342C",
  info: "#2C6E8F",
  successSurface: "#E4F2EA",
  warningSurface: "#F7EEDC",
  dangerSurface: "#FAE7E4",
  infoSurface: "#E5EFF4",
  brandSurface: "#E8F1EB",
  accentSurface: "#F5EEDD",
  /**
   * The "Ordering for" tag, and only that (owner-requested 2026-08-14: light purple).
   *
   * It is the palette's **one** decorative hue, and it is deliberately narrow: this tag names a
   * relationship — *this order belongs to that shop* — which is not a status, so none of the four
   * semantic tints could carry it without lying (green would read as a positive state, amber as
   * something needing attention). Green in particular is spent: the card under the tag is already
   * `brandSurface`, and a green pill on a green card is invisible.
   *
   * Do NOT reach for this anywhere else. A second purple object on a screen turns a hue that means
   * one specific thing into a decoration, which is what CLAUDE.md's "no decorative hues" rule
   * exists to prevent. If another surface needs a tag, it needs its own token and its own reason.
   *
   * `text` on `surface` clears 4.5:1 in both palettes and is asserted in `contrast.test.ts`. Dark's
   * pair inverts the roles — a deep violet ground under light violet ink — because a pastel pill on
   * a forest-night card is a hole punched in the page.
   */
  tag: {
    surface: "#EDE7FA",
    text: "#54359C",
  },
  /**
   * The rating star, and ONLY the rating star (owner-supplied 2026-08-13).
   *
   * Deliberately not `accent`: that gold is cut deep enough to serve as a FOREGROUND for text
   * (#8F6410 in light), which is why a star filled with it reads brown rather than gold. These are
   * fill colours for a shape, so they can be bright. `edge` darkens the outline just enough to
   * keep the star's points legible against a white overlay plate — a flat #FDCC0D star on white
   * loses its silhouette.
   *
   * Identical in both palettes, like `hero.text`: a five-pointed gold star means the same thing on
   * either ground, and a dark-mode variant would only make it dimmer for no reason.
   */
  rating: {
    star: "#FDCC0D",
    edge: "#FF9529",
    /**
     * The two stops that make the star read as a SOLID rather than a sticker (owner-requested
     * 2026-08-14: "3D karo"). `highlight` is the lit top-left facet and the specular; `shade` is
     * the shadowed lower-right facet and the outline that keeps the five points legible on a white
     * plate. `star` and `edge` are unchanged and still the body of the ramp.
     *
     * Fixed across both palettes for the same reason the other two are: a gold five-pointed star
     * means the same thing on either ground, and a themed variant only makes it dimmer.
     */
    highlight: "#FFF0AD",
    shade: "#B26A05",
  },
  /**
   * The ground a product photograph sits on (owner-requested 2026-08-13).
   *
   * FIXED white in both palettes, and that is the entire point. The catalogue's photography is shot
   * on white, and the tile fits it with `contain` — so whatever is left over at the sides IS the
   * well, right up against the photo's own white background. Any other colour, in either theme,
   * draws a visible box around every product. A themed surface would do exactly that in dark.
   *
   * This replaces `hoverSurface`, which was chosen to give the photo an edge and did — including
   * an edge the photo did not ask for.
   */
  mediaWell: "#FFFFFF",
  /**
   * The product tile's discount badge (owner-requested 2026-08-13: a LIGHT yellow).
   *
   * `#FFDF00` — the star's own gold — was tried here first and rejected: it is a vivid yellow, not
   * a light one. `surface` is a tint of that same hue so the badge and the star still read as one
   * family; `border` is the vivid gold, and it is not decoration — against the light theme's well
   * (`hoverSurface`, `#E1E9E4`) the tint sits at a 1.1 luminance ratio, so hue alone separates them
   * and the badge would go soft-edged on a pale product photograph without it.
   *
   * All three are fixed across the palettes, like `rating` and `hero.text`. That is the whole
   * reason this is not `warning`/`warningSurface`: that pair INVERTS in dark (`#F7EEDC` →
   * `#493B22`), so a "light yellow" badge would have come out dark brown on half the devices.
   * `ink` is fixed for the same reason — `text.primary` flips to near-white in dark.
   */
  discount: {
    surface: "#FFF3B0",
    border: "#FDCC0D",
    ink: "#16211B",
  },
  /**
   * **A numbered stop pin on the map** — fixed across the palettes, like `discount` and `hero.text`.
   *
   * ⚠️ These exist because a map pin does not sit on the app's page: it sits on a **tile**, and the
   * street and satellite basemaps stay light whatever theme the app is in. The pin was painted
   * `surface` / `border` / `text.secondary` until 2026-08-24, so in dark it came out as a charcoal
   * disc with grey figures on a pale map — eight of them on a village round overlapped into one dark
   * smudge with no readable number, which is exactly the "1 2 3 dikha rahe ho par kuch dikhta nahi"
   * report. Themed tokens are the wrong family for anything drawn over a fixed-light surface.
   *
   * Only the pins with no state take these. `visited` keeps `secondary` and the next stop keeps
   * `primary` + `accent`, because those two carry meaning and meaning lives in the palette.
   */
  mapPin: {
    fill: "#FFFFFF",
    ring: "#1F2A24",
    ink: "#111A15",
  },
  /**
   * **A route stop pin — its COLOUR is its state, and there is no number on it** (owner,
   * 2026-08-24: *"un par number mat dikhao, color dikhao ok jaise blue color … jis par visit
   * complete ho jaye usko orange kar dena … red kar dena"*).
   *
   * | Pin | State | Why this hue |
   * |---|---|---|
   * | `pending` | still to call on | blue — the only cool hue on a map of fields and roofs |
   * | `visited` | a visit is logged for it today | orange — done, and warm against the blue |
   * | `skipped` | dropped or missed | red — the one that needs explaining to the office |
   *
   * ⚠️ **Fixed across both palettes, like `mapPin` and `discount`, and for the same reason**: these
   * are drawn over a basemap that stays light (street) or dark-mottled (satellite) whatever theme
   * the app is in. Theming them is the regression that turned eight stops into one charcoal smudge.
   *
   * `stroke` is the white rim every pin carries. It is not decoration — on the satellite layer a
   * saturated dot over dark vegetation loses its silhouette entirely, and the rim is what keeps a
   * 26dp target findable. All three fills are asserted against it in `contrast.test.ts`.
   *
   * ☠️ **These replace the numbered discs.** The number was `runOrder`'s position, and it is not
   * gone — it moved to where there is room to print BOTH numbers honestly
   * (`STOP 3 OF 8 TODAY · PLAN #5`), which is the stop's own screen. A digit rendered at 11px on a
   * 30dp disc could only ever carry one of the two.
   */
  mapStop: {
    pending: "#1D6FE0",
    visited: "#E4741A",
    skipped: "#D03A2F",
    stroke: "#FFFFFF",
  },
  /**
   * **The chrome a drawn route carries** — fixed across the palettes, like `mapStop` and `mapPin`,
   * and for the same reason: a line is drawn on a TILE, and the basemaps stay light (street) or
   * dark-mottled (satellite) whatever theme the app is in.
   *
   * ⚠️ **There is no `line` colour here on purpose.** A leg's hue is its STATE — orange behind the
   * agent, blue ahead (`mapStop.visited`/`pending`, owner 2026-08-24: *"jaise route complete hota
   * jayega jo path he uska color change hoga"*) — and a route colour in this group would be a second
   * place that answers the same question. What lives here is the two layers UNDER the line, which
   * are the same for every leg whatever colour it is:
   *
   * - `casing` — the white halo standard cartography puts under a route so it separates from the
   *   road it is drawn over. Without it a blue line on a blue river is one shape.
   * The blurred outer bloom is drawn in the LEG's own colour at a fixed opacity, so the active route
   * stays findable over a bright field or a dark canopy without introducing a hue that means nothing.
   * ⚠️ That opacity is a rendering parameter, not a colour, so it lives beside the layer that draws
   * it — `ThemeColors` types every leaf as a string and a number here fails the whole palette.
   */
  /**
   * **Everything that floats on a map** — the round panel, its header card, the stop rows, the
   * commit bar, the map's own chips and discs.
   *
   * ☠️ **A group of its own, not a re-use of `hero`.** The redesign first painted this chrome in the
   * `hero` tokens; `hero` is tuned to be a CARD on the app's page (a medium forest that reads as
   * raised against white), and the panel is a full-height sheet against a satellite photograph, which
   * wants the opposite — a near-black ground the map cannot compete with. Sharing the group meant one
   * of the two surfaces was always wrong, and a nudge for either broke the other.
   *
   * ⚠️ **`header*` is a LIGHT card in BOTH palettes** (owner-supplied reference, 2026-09-12). It is
   * the panel's one bright surface, and that is what makes the round's totals the first thing the eye
   * lands on when the sheet slides in. It therefore carries its own foregrounds, exactly like
   * `hero.text` does, because `text.primary` flips to near-white in dark and would vanish on it.
   *
   * ⚠️ **`live` is a FILL, `liveText` is a FOREGROUND, `onLive` is the ink that goes ON a fill.**
   * Green has all three roles in this app and collapsing them is how a chip ends up labelled in a
   * green chosen for painting. See `CLAUDE.md` § Design system.
   */
  mapPanel: {
    surface: "#EFF4F1",
    gradientFrom: "#F6FAF8",
    gradientTo: "#E4EDE8",
    glass: "#FFFFFF",
    liveSurface: "#E8F1EB",
    border: "#D8E1DC",
    text: "#16211B",
    mutedText: "#5B6B62",
    accent: "#8F6410",
    live: "#15683F",
    liveText: "#146137",
    onLive: "#FFFFFF",
    control: "#E1E9E4",
    connector: "#C3D2CA",
    /**
     * ☠️ **The commit bar's chrome — FIXED across both palettes, like `mapStop` and `mapPin`.**
     *
     * These three controls do not sit on the panel; they float on the **basemap**, which stays light
     * (street) or dark-mottled (satellite) whatever theme the app is in. Painted from the panel's own
     * `surface`, the two discs came out as pale grey circles on a pale road in light — present, but
     * reading as disabled beside the pill (owner, 2026-09-12, with a screenshot: *"jo round button
     * he vo… jaisa maine image diya tha banao inko"*). The reference draws them dark in both, and
     * that is the correct answer for the same reason a route pin is: a control over a photograph
     * needs a ground of its own.
     *
     * `cta*` is the commit's own ramp and is **not** `ctaGradient`. `Button`'s ramp is tuned for a
     * 44dp control on the app's page; this is a 60dp pill on a map and the reference wants it
     * livelier. ⚠️ It is a *deliberately* restrained reading of that reference, which puts white on a
     * near-mint green at about 1.5:1 — pretty, and unreadable in daylight. `ctaFrom` holds 3.6:1
     * against white, which clears the large-text bar the `h3` label qualifies for, and `ctaTo`
     * clears 8:1.
     */
    chromeSurface: "#0D1A15",
    chromeInk: "#E9F4EE",
    ctaFrom: "#149A57",
    ctaTo: "#0A5A34",
    ctaInk: "#FFFFFF",
    headerFrom: "#FFFFFF",
    headerTo: "#E4F4EA",
    headerBorder: "#D3E7DA",
    headerText: "#11241C",
    headerMuted: "#4A5F55",
    /**
     * ☠️ **Green ON the header card, which is a LIGHT card in both themes — so this is a DARK green
     * in both themes.** `liveText` is the green for the panel's own ground and is a pale mint in
     * dark; drawn on this card it was mint-on-mint and `contrast.test.ts` caught it at 1.2:1. A
     * light surface inside a dark panel needs its own foregrounds for every role it carries, which
     * is the same reason `headerText` exists beside `text`.
     */
    headerLive: "#0F7A45",
  },
  mapRoute: {
    casing: "#FFFFFF",
  },
  /**
   * **The header's offline wash** — a translucent red laid over the header, and nothing else.
   *
   * Owner's call, 2026-08-22: *"agar offline hai to header halka transparent red dikhega, na ki ye
   * offline ka error dikhate rahoge."* Being offline is an ambient CONDITION, not an event — an
   * agent in a village is offline for hours — and a red row of prose repeating that on every
   * screen is an error message for something that is not an error. The tint says the same thing
   * continuously and costs no vertical space, which is the whole reason it is a wash and not a
   * banner.
   *
   * It is `danger` at a tenth, deliberately: legible as a mood, never as a surface. Everything on
   * the header keeps its own colour and its own contrast — nothing is drawn ON this, so no pair in
   * `contrast.test.ts` is affected. Do not raise the alpha to make it "clearer"; a header that
   * reads as a danger SURFACE turns an expected field condition into an alarm.
   */
  offlineTint: "rgba(180, 52, 44, 0.10)",
  skeleton: "#E4EBE7",
  scrim: "rgba(6, 20, 13, 0.42)",
  // Sand ivory — the same hue as `capsule.surface` one step deeper, so the ivory headers and cards
  // read tone-on-tone on the page (owner, 2026-10-06: "screen ka main bg card ke color ke saath
  // combination karo"; it was a cool green-white that read "light blue"). `contrast.test.ts` gives
  // this one token its own chroma ceiling for that reason.
  background: "#F4EFE4",
  surface: "#FFFFFF",
  elevatedSurface: "#FFFFFF",
  border: "#D8E1DC",
  divider: "#E7EEEA",
  hoverSurface: "#E1E9E4",
  disabledSurface: "#EAF1ED",
  nav: {
    surface: "#0E3B29",
    surfaceTop: "#1A4534",
    iconFill: "rgba(241,200,75,0.22)",
    chipFrom: "#436658",
    chipTo: "#1F4938",
    chipBorder: "rgba(241,200,75,0.30)",
    glow: "rgba(241,200,75,0.18)",
    beam: "#F1C84B",
    topEdge: "rgba(255,255,255,0.08)",
    activeIcon: "#F1C84B",
    activeText: "#F4F8F5",
    inactive: "#8AA396",
    fabSurface: "#15683F",
    fabIcon: "#FFFFFF",
  },
  surfacePattern: "rgba(22,33,27,0.055)",
  actionGradient: {
    from: "#17734A",
    to: "#0F5533",
    pattern: "rgba(245,250,247,0.16)",
    well: "rgba(245,250,247,0.18)",
  },
  ctaGradient: {
    from: "#1A8050",
    to: "#0B4429",
    sheen: "rgba(255,255,255,0.22)",
    rim: "rgba(255,255,255,0.16)",
    press: "rgba(4,24,14,0.26)",
    glow: "#0B4429",
  },
  dangerGradient: {
    from: "#C24138",
    to: "#8E241E",
    glow: "#7A1F19",
  },
  softGradient: {
    from: "#F1F8F4",
    to: "#DDEBE2",
  },
  hero: {
    surface: "#123D2C",
    gradientFrom: "#1A5238",
    gradientTo: "#0E3323",
    border: "rgba(244,248,245,0.16)",
    pattern: "rgba(244,248,245,0.08)",
    text: "#F2F7F3",
    mutedText: "rgba(242,247,243,0.74)",
    accent: "#E2B75C",
    /**
     * *This is happening right now* on the hero's forest ground — the live pulse, and the worked
     * half of the day track (`LiveShiftWidget`).
     *
     * It exists because the hero had exactly one non-white colour, `accent`, and the widget needs
     * to tell two live states apart at a glance: **on shift** and **on break**. Gold now means the
     * break — the day paused, the same warm amber the rest of the app spends on `warning` — and
     * this fresh green means the clock is running. One hue per state, and nothing else in the hero
     * may spend either of them.
     *
     * It is much lighter than `primary`: on a #123D2C ground the brand green is invisible, which
     * is the whole reason the hero has its own foreground tokens at all. Both stops are in
     * `contrast.test.ts` against `hero.surface` and both gradient ends.
     */
    live: "#6FE3A4",
    control: "rgba(242,247,243,0.12)",
    photoTile: "rgba(14,51,35,0.55)",
  },
  /**
   * **The Quick Actions sheet** (owner's reference image, 2026-09-29). An earthy palette — forest,
   * cream/beige, a restrained brown and ONE muted purple — used only by `QuickActionsSheet`, and
   * themed: the sheet follows light and dark like every other surface. Each tile's ink/muted pair
   * is asserted against its surface in `contrast.test.ts`. No gradients are built from these.
   */
  quickSheet: {
    heroSurface: "#123D2C",
    heroLayer: "#1A5238",
    heroInk: "#F2F7F3",
    heroMuted: "rgba(242,247,243,0.80)",
    heroControl: "rgba(242,247,243,0.14)",
    fieldFar: "#3E7350",
    fieldMid: "#2F6242",
    fieldNear: "#23513A",
    fieldRow: "rgba(242,247,243,0.12)",
    sun: "#E2B75C",
    railSurface: "#EAF1EC",
    railLayer: "#DCE8E0",
    railInk: "#16211B",
    railMuted: "#4F5F56",
    railDisc: "#123D2C",
    railDiscInk: "#F2F7F3",
    expenseSurface: "#F2E8D5",
    expenseLayer: "#E6D6B8",
    expenseInk: "#34261A",
    expenseMuted: "#5F4D38",
    expenseDisc: "#6B5335",
    expenseDiscInk: "#F7F0E3",
    retailerSurface: "#1C4A36",
    retailerLayer: "#255B43",
    retailerInk: "#F2F7F3",
    retailerMuted: "rgba(242,247,243,0.78)",
    retailerDisc: "rgba(242,247,243,0.14)",
    networkSurface: "#4E4568",
    networkLayer: "#5C527A",
    networkInk: "#F4F1FA",
    networkMuted: "rgba(244,241,250,0.80)",
    networkDisc: "rgba(244,241,250,0.16)",
    networkPin: "#CFC4EC",
    leaf: "#7FA66A",
    footerLine: "#D5E3DA",
  },
  /**
   * **The app's header capsule** — every header (`HeaderCapsule`: tabs, Home, every stack screen),
   * from the owner's Orders reference image, 2026-10-06. Warm ivory instead of the
   * page's cool white so the header reads as one object resting on the page, a forest badge, and
   * ONE champagne thread (the curve and the title spark) — the only warm accent it spends. Flat:
   * the New button's `ctaGradient` stays the one ramp on the row. Ink pairs in `contrast.test.ts`.
   */
  capsule: {
    surface: "#FBF8F1",
    border: "rgba(74,64,40,0.11)",
    rim: "rgba(255,255,255,0.92)",
    control: "#F3EEE2",
    controlBorder: "rgba(74,64,40,0.12)",
    controlActive: "#E3EDE5",
    ink: "#1C2420",
    muted: "#5A615B",
    badge: "#123D2C",
    badgeInk: "#F2F7F3",
    badgeRing: "rgba(21,104,63,0.16)",
    live: "#2FA866",
    champagne: "#B08D4A",
    line: "rgba(176,141,74,0.30)",
    sage: "rgba(92,122,100,0.14)",
    shadow: "#3A3220",
  },
  media: MEDIA,
  text: {
    primary: "#16211B",
    secondary: "#5B6B62",
    tertiary: "#606F66",
    disabled: "#A2ADA6",
    inverse: "#F5FAF7",
  },
} as const;

/**
 * **"GitHub Night"** (owner-requested 2026-10-06 — dark modelled on GitHub's dark UI): cool slate
 * neutrals instead of forest-tinted charcoal, GitHub's own status hues (green #3FB950, attention
 * #D29922, danger #FF7B72, accent blue #58A6FF, done purple #D2A8FF) and its green button as the
 * brand fill. Two things are deliberately NOT GitHub's: the ladder is stepped wider than github.com
 * (whose #0D1117 → #161B22 is 1.09:1, under `contrast.test.ts`'s 1.35 floor — GitHub leans on
 * borders, this app leans on surfaces), and `hero` / `quickSheet`'s brand tiles stay deep green,
 * the one place the brand is a ground rather than an accent. Ink on a filled green stays dark
 * (`text.inverse`), because white on GitHub's #238636 cannot clear 4.5:1 on the success/info fills.
 */
export const darkColors = {
  ...colors,
  primary: "#2EA043",
  primaryHover: "#3FB950",
  primaryText: "#3FB950",
  secondary: "#9DA5AE",
  accent: "#D29922",
  accentLime: "#B1BAC4",
  success: "#3FB950",
  warning: "#D29922",
  danger: "#FF7B72",
  info: "#58A6FF",
  successSurface: "#2A3D30",
  warningSurface: "#403828",
  dangerSurface: "#4A3335",
  infoSurface: "#303A47",
  brandSurface: "#2B3C36",
  accentSurface: "#403828",
  /** The roles invert in dark — see the note in the light palette. */
  tag: {
    surface: "#3F354D",
    text: "#D2A8FF",
  },
  /** Same gold in both themes — see the note in the light palette. */
  rating: {
    star: "#FDCC0D",
    edge: "#FF9529",
    /**
     * The two stops that make the star read as a SOLID rather than a sticker (owner-requested
     * 2026-08-14: "3D karo"). `highlight` is the lit top-left facet and the specular; `shade` is
     * the shadowed lower-right facet and the outline that keeps the five points legible on a white
     * plate. `star` and `edge` are unchanged and still the body of the ramp.
     *
     * Fixed across both palettes for the same reason the other two are: a gold five-pointed star
     * means the same thing on either ground, and a themed variant only makes it dimmer.
     */
    highlight: "#FFF0AD",
    shade: "#B26A05",
  },
  /** Fixed white in dark too — see the note in the light palette; that is the whole point. */
  mediaWell: "#FFFFFF",
  /** Same light yellow, edge and fixed dark ink — see the note in the light palette. */
  discount: {
    surface: "#FFF3B0",
    border: "#FDCC0D",
    ink: "#16211B",
  },
  /** Identical in dark, and that IS the fix — see the note in the light palette. */
  mapPin: {
    fill: "#FFFFFF",
    ring: "#1F2A24",
    ink: "#111A15",
  },
  /** Identical in dark — a pin sits on a tile, not on the page. See the light entry. */
  mapStop: {
    pending: "#1D6FE0",
    visited: "#E4741A",
    skipped: "#D03A2F",
    stroke: "#FFFFFF",
  },
  /**
   * The owner-supplied reference, 2026-09-12: a near-black teal sheet, slate row tiles, one bright
   * light card at the top, and a single vivid green that carries every active state. See light's
   * note for why this is its own group rather than `hero`.
   *
   * ⚠️ **The neutrals here are TINTED, not painted** — `surface`, `glass` and `connector` sit in the
   * same low-saturation band the rest of dark's greys use (`CLAUDE.md` § Design system). The
   * saturation budget is spent on `live` and `liveSurface`, and green cannot read as an accent if
   * the sheet behind it is already green.
   */
  mapPanel: {
    surface: "#0D1117",
    gradientFrom: "#161B22",
    gradientTo: "#090C10",
    glass: "#1A2028",
    liveSurface: "#1B3D2A",
    border: "rgba(230,237,243,0.10)",
    text: "#E6EDF3",
    mutedText: "rgba(230,237,243,0.64)",
    accent: "#D29922",
    live: "#3FB950",
    liveText: "#3FB950",
    onLive: "#0D1117",
    control: "rgba(230,237,243,0.08)",
    connector: "rgba(63,185,80,0.38)",
    /** Identical to light — see the note there. This chrome floats on a basemap, not on the panel. */
    chromeSurface: "#0D1A15",
    chromeInk: "#E9F4EE",
    ctaFrom: "#149A57",
    ctaTo: "#0A5A34",
    ctaInk: "#FFFFFF",
    headerFrom: "#FFFFFF",
    headerTo: "#DDF2E5",
    headerBorder: "rgba(255,255,255,0.55)",
    headerText: "#11241C",
    headerMuted: "#4A5F55",
    /**
     * ☠️ **Green ON the header card, which is a LIGHT card in both themes — so this is a DARK green
     * in both themes.** `liveText` is the green for the panel's own ground and is a pale mint in
     * dark; drawn on this card it was mint-on-mint and `contrast.test.ts` caught it at 1.2:1. A
     * light surface inside a dark panel needs its own foregrounds for every role it carries, which
     * is the same reason `headerText` exists beside `text`.
     */
    headerLive: "#0F7A45",
  },
  /** Deliberately the same object as light — see the note there. A route is drawn on a tile. */
  mapRoute: {
    casing: "#FFFFFF",
  },
  /** Dark's own — see the light entry. A tenth of `danger` vanishes on a near-black ground. */
  offlineTint: "rgba(255, 123, 114, 0.12)",
  skeleton: "#343B44",
  scrim: "rgba(1, 4, 9, 0.66)",
  background: "#0D1015",
  surface: "#262C34",
  elevatedSurface: "#353C46",
  border: "#5B6573",
  divider: "#404853",
  hoverSurface: "#343B44",
  disabledSurface: "#2D333B",
  nav: {
    surface: "#262C34",
    surfaceTop: "#2D343E",
    iconFill: "rgba(63,185,80,0.20)",
    chipFrom: "#46505D",
    chipTo: "#313843",
    chipBorder: "rgba(63,185,80,0.32)",
    glow: "rgba(63,185,80,0.16)",
    beam: "#3FB950",
    topEdge: "rgba(240,246,252,0.08)",
    activeIcon: "#3FB950",
    activeText: "#F0F6FC",
    inactive: "#8B949E",
    fabSurface: "#2EA043",
    fabIcon: "#0D1117",
  },
  surfacePattern: "rgba(230,237,243,0.06)",
  actionGradient: {
    from: "#2EA043",
    to: "#2A9A3F",
    pattern: "rgba(240,246,252,0.14)",
    well: "rgba(240,246,252,0.16)",
  },
  ctaGradient: {
    from: "#3FB950",
    to: "#2EA043",
    sheen: "rgba(255,255,255,0.18)",
    rim: "rgba(255,255,255,0.12)",
    press: "rgba(1,4,9,0.22)",
    glow: "#010409",
  },
  dangerGradient: {
    from: "#FF7B72",
    to: "#F85149",
    glow: "#160707",
  },
  softGradient: {
    from: "#2B3C36",
    to: "#27362F",
  },
  hero: {
    surface: "#2D343E",
    gradientFrom: "#323A45",
    gradientTo: "#272E37",
    border: "rgba(240,246,252,0.14)",
    pattern: "rgba(240,246,252,0.06)",
    text: "#F0F6FC",
    mutedText: "rgba(240,246,252,0.72)",
    accent: "#E3B341",
    /** Dimmed a step like `accent` is — a bright mint on a night ground glares. See light's note. */
    live: "#3FB950",
    control: "rgba(240,246,252,0.10)",
    photoTile: "rgba(13,17,23,0.55)",
  },
  // Deliberately the same object as light — see `MEDIA`. A viewer's ground does not follow the
  // theme, because the photograph is the content and a ground that shifts changes what it looks
  // like.
  quickSheet: {
    heroSurface: "#2D343E",
    heroLayer: "#363E49",
    heroInk: "#F0F6FC",
    heroMuted: "rgba(240,246,252,0.76)",
    heroControl: "rgba(240,246,252,0.12)",
    fieldFar: "#2B5A3A",
    fieldMid: "#234A30",
    fieldNear: "#1C3D28",
    fieldRow: "rgba(240,246,252,0.10)",
    sun: "#E3B341",
    railSurface: "#1C2128",
    railLayer: "#262C34",
    railInk: "#E6EDF3",
    railMuted: "rgba(230,237,243,0.68)",
    railDisc: "#2B3C36",
    railDiscInk: "#E6EDF3",
    expenseSurface: "#3A3226",
    expenseLayer: "#463C2D",
    expenseInk: "#F3EAD9",
    expenseMuted: "rgba(243,234,217,0.74)",
    expenseDisc: "#5E4C33",
    expenseDiscInk: "#F3EAD9",
    retailerSurface: "#22303A",
    retailerLayer: "#2A3A46",
    retailerInk: "#F0F6FC",
    retailerMuted: "rgba(240,246,252,0.74)",
    retailerDisc: "rgba(240,246,252,0.12)",
    networkSurface: "#2E2A45",
    networkLayer: "#393453",
    networkInk: "#EEEAF7",
    networkMuted: "rgba(238,234,247,0.74)",
    networkDisc: "rgba(238,234,247,0.12)",
    networkPin: "#B6AADB",
    leaf: "#3FB950",
    footerLine: "rgba(230,237,243,0.10)",
  },
  // Same roles as light: a tinted charcoal capsule a step above the page, never a painted green.
  capsule: {
    surface: "#161B22",
    border: "rgba(240,246,252,0.10)",
    rim: "rgba(255,255,255,0.06)",
    control: "#21262D",
    controlBorder: "rgba(240,246,252,0.10)",
    controlActive: "#2B3C36",
    ink: "#E6EDF3",
    muted: "#B1BAC4",
    badge: "#2B3C36",
    badgeInk: "#F0F6FC",
    badgeRing: "rgba(63,185,80,0.20)",
    live: "#3FB950",
    champagne: "#D29922",
    line: "rgba(210,153,34,0.22)",
    sage: "rgba(177,186,196,0.08)",
    shadow: "#000000",
  },
  media: MEDIA,
  text: {
    primary: "#E6EDF3",
    secondary: "#B1BAC4",
    tertiary: "#9DA5AE",
    disabled: "#6E7681",
    inverse: "#0D1117",
  },
} as const;

export type ThemeColors = {
  readonly [K in keyof typeof colors]: (typeof colors)[K] extends string
    ? string
    : { readonly [T in keyof (typeof colors)[K]]: string };
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
} as const;

export const radius = {
  small: 8,
  button: 12,
  card: 16,
  large: 20,
  hero: 24,
  sheet: 28,
  dialog: 20,
  input: 12,
  search: 12,
  chip: 999,
} as const;

export const borderWidth = {
  hairline: 1,
  emphasis: 2,
} as const;

export const shadows = {
  subtle: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
    },
    android: { elevation: 1 },
    default: {},
  }),
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
    },
    android: { elevation: 2 },
    default: {},
  }),
  floating: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
    },
    android: { elevation: 6 },
    default: {},
  }),
  floatingStrong: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },
    android: { elevation: 10 },
    default: {},
  }),
  bottomSheet: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 40,
    },
    android: { elevation: 12 },
    default: {},
  }),
  dialog: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.14,
      shadowRadius: 48,
    },
    android: { elevation: 16 },
    default: {},
  }),
} as const;

export const touchTarget = { min: 48 } as const;

/**
 * The height every standing control shares — `Button`, `FilterButton`, and the squares that sit
 * beside them. One number, because those controls stand side by side on a filter row and a row of
 * two heights reads as a mistake.
 *
 * 52 → **46** (owner, 2026-08-14), with the button label dropping 15 → 14 in the same pass. 46
 * still clears `touchTarget.min` (48) once `PressableScale`'s own press area and the row's
 * surrounding gaps are counted, and it is what makes a header carrying a search trigger, a filter
 * and an action read as one band rather than three stacked slabs.
 */
export const controlHeight = 46;

/**
 * The rung for an action that lives INSIDE a card rather than standing on the page — the two
 * buttons on an order's identity card are the case (owner, 2026-08-14). A card action competing
 * with the screen's own standing controls for height is the thing this avoids; it is not a licence
 * to shrink a screen's commit, which stays `controlHeight`.
 */
export const controlHeightCompact = 38;

export const iconSize = {
  xs: 16,
  small: 20,
  default: 24,
  large: 28,
  hero: 40,
} as const;
