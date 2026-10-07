/**
 * Ashcharya UI — mobile tokens (React Native / NativeWind). Same palette as the web tokens.
 * Feed these into tailwind.config.js (as CSS vars) or read them through a useColors() hook.
 */
export const light = {
  canvas: "#F6F5F1", surface: "#FFFFFF", surfaceIvory: "#FBF8F1", surfaceRaised: "#FFFFFF",
  line: "#E5E3DA", lineSoft: "#EFEDE5",
  ink: "#16211B", ink2: "#5B6B62", inkFaint: "#838A80",
  canopy: "#0F4033", canopyFrom: "#0B3328", canopyTo: "#13503F", onCanopy: "#F6F2E7",
  action: "#15683F", actionHover: "#0F4F30", actionText: "#146137", brandSurface: "#E8F1EB",
  gold: "#E2B864", goldInk: "#2A1D02", goldText: "#8F6410", mint: "#74E5B0", champagne: "#B08D4A",
  success: "#1F7A4D", successSurface: "#E4F2EA",
  warning: "#93610E", warningSurface: "#F7EEDC",
  danger: "#B4342C", dangerSurface: "#FAE7E4",
  info: "#2C6E8F", infoSurface: "#E5EFF4",
  scrim: "rgba(6,20,13,0.42)", offlineTint: "rgba(180,52,44,0.10)",
} as const;

export const night: Record<keyof typeof light, string> = {
  canvas: "#15181D", surface: "#1C2128", surfaceIvory: "#161B22", surfaceRaised: "#21262D",
  line: "#30363D", lineSoft: "#21262D",
  ink: "#E6EDF3", ink2: "#D1D9E0", inkFaint: "#8B949E",
  canopy: "#161B22", canopyFrom: "#161B22", canopyTo: "#21262D", onCanopy: "#E6EDF3",
  action: "#2EA043", actionHover: "#3FB950", actionText: "#3FB950", brandSurface: "#2B3C36",
  gold: "#D29922", goldInk: "#2A1D02", goldText: "#D29922", mint: "#3FB950", champagne: "#D29922",
  success: "#3FB950", successSurface: "#2A3D30",
  warning: "#D29922", warningSurface: "#403828",
  danger: "#FF7B72", dangerSurface: "#4A3335",
  info: "#58A6FF", infoSurface: "#303A47",
  scrim: "rgba(1,4,9,0.66)", offlineTint: "rgba(255,123,114,0.12)",
};

export const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, "2xl": 32, "3xl": 40, "4xl": 48, "5xl": 64 } as const;
export const radius = { small: 8, control: 12, card: 16, panel: 20, hero: 24, sheet: 28, pill: 999 } as const;
export const size = { touchMin: 48, control: 46, controlCompact: 38, iconXs: 16, iconSm: 20, icon: 24, iconLg: 28, iconHero: 40 } as const;

/** Inter on the shared role scale: [fontSize, lineHeight] */
export const type = {
  display: [32, 42], title: [24, 32], section: [17, 24], rowTitle: [15, 22],
  body: [15, 22], small: [14, 20], caption: [12, 18], tiny: [11, 16],
} as const;

export const motion = {
  instant: 90, quick: 160, standard: 220, enter: 260,
  pressSpring: { damping: 22, stiffness: 320, mass: 0.6 }, pressScale: 0.98,
} as const;

/** Shadows only for floating things (sheets, dialogs, tab bar, FAB). Cards stay flat. */
export const shadow = {
  floating: { shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 24, elevation: 6 },
  sheet: { shadowColor: "#000", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.12, shadowRadius: 40, elevation: 12 },
} as const;
