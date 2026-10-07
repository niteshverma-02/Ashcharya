import type { TextStyle } from "react-native";
import { fontFamily } from "./fonts";

type TypeStyle = Pick<TextStyle, "fontFamily" | "fontSize" | "lineHeight" | "fontVariant">;

export const textVariants = {
  displayXl: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 42 },
  displayL: { fontFamily: fontFamily.semibold, fontSize: 28, lineHeight: 38 },
  h1: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 32 },
  h2: { fontFamily: fontFamily.semibold, fontSize: 20, lineHeight: 28 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 17, lineHeight: 24 },
  h4: { fontFamily: fontFamily.semibold, fontSize: 15, lineHeight: 22 },
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  small: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 18 },
  tiny: { fontFamily: fontFamily.semibold, fontSize: 11, lineHeight: 16 },

  micro: { fontFamily: fontFamily.medium, fontSize: 10, lineHeight: 14 },

  nano: { fontFamily: fontFamily.semibold, fontSize: 8, lineHeight: 12 },
  nav: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16 },
  buttonPrimary: { fontFamily: fontFamily.semibold, fontSize: 14, lineHeight: 20 },
  buttonText: { fontFamily: fontFamily.medium, fontSize: 13, lineHeight: 18 },
  badge: { fontFamily: fontFamily.semibold, fontSize: 11, lineHeight: 16 },
} as const satisfies Record<string, TypeStyle>;

export type TextVariant = keyof typeof textVariants;

const TABULAR: NonNullable<TextStyle["fontVariant"]> = ["tabular-nums"];

export const kpiVariants = {
  revenue: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 42, fontVariant: TABULAR },
  orders: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 38, fontVariant: TABULAR },
  collections: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 38, fontVariant: TABULAR },
  attendancePercent: {
    fontFamily: fontFamily.semibold,
    fontSize: 24,
    lineHeight: 32,
    fontVariant: TABULAR,
  },
  distance: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 32, fontVariant: TABULAR },
  targets: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 38, fontVariant: TABULAR },
  analytics: { fontFamily: fontFamily.bold, fontSize: 28, lineHeight: 38, fontVariant: TABULAR },
  charts: { fontFamily: fontFamily.semibold, fontSize: 20, lineHeight: 28, fontVariant: TABULAR },
  cardValue: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    lineHeight: 36,
    fontVariant: TABULAR,
  },

  metricTile: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    fontVariant: TABULAR,
  },

  heroTime: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 28,
    fontVariant: TABULAR,
  },

  rowValue: { fontFamily: fontFamily.semibold, fontSize: 17, lineHeight: 24, fontVariant: TABULAR },

  rowValueSm: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    lineHeight: 20,
    fontVariant: TABULAR,
  },
  rowValueXs: {
    fontFamily: fontFamily.semibold,
    fontSize: 13,
    lineHeight: 18,
    fontVariant: TABULAR,
  },
  rowValueNano: {
    fontFamily: fontFamily.semibold,
    fontSize: 8,
    lineHeight: 12,
    fontVariant: TABULAR,
  },
  rowValueXxs: {
    fontFamily: fontFamily.semibold,
    fontSize: 11,
    lineHeight: 16,
    fontVariant: TABULAR,
  },
} as const satisfies Record<string, TypeStyle>;

export type KpiVariant = keyof typeof kpiVariants;

/**
 * Font-scale ceilings for type that lives inside a box whose height cannot grow.
 *
 * Android's display-size and font-size settings go past 2×, and RN scales every `Text` and
 * `TextInput` by that factor unless told otherwise. Body copy SHOULD scale — an agent who has
 * turned the system font up needs it to. What cannot scale unbounded is type inside a fixed-height
 * control: a 46dp `Button`, a 44dp field shell, a 64dp tab bar. There the glyphs simply clip, and
 * the label the control exists to state becomes unreadable at exactly the setting meant to make it
 * more readable.
 *
 * So the rule is per-role, not global: **cap what sits in a fixed box, and let everything else
 * grow.** These two ceilings are the app's whole answer, and they are here — not in `Text.tsx` —
 * because `TextInput` needs the same number and is not a `Text`.
 */
export const CONTROL_MAX_FONT_SCALE = 1.2;

/** Slightly looser, for figures: a KPI card grows a little, but its row must still line up. */
export const KPI_MAX_FONT_SCALE = 1.3;
