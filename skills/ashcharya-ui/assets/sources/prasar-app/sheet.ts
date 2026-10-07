import { spacing, radius } from "./tokens";

export const sheetSize = {
  compact: 0.34,
  standard: 0.56,
  expanded: 0.84,
  full: 0.94,
} as const;

export type SheetSize = keyof typeof sheetSize | "content";

export function sheetSnapPoint(size: keyof typeof sheetSize): string {
  return `${Math.round(sheetSize[size] * 100)}%`;
}

export const SHEET_MAX_CONTENT_FRACTION = 0.9;

export const backdropStrength = {
  light: 0.6,
  standard: 1,
  strong: 1.5,
} as const;

export type BackdropLevel = keyof typeof backdropStrength;

export const MAX_SCRIM_ALPHA = 0.92;

const RGBA = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/;

export function scrimAt(scrim: string, level: BackdropLevel): string {
  const parts = RGBA.exec(scrim.trim());
  if (!parts) return scrim;
  const [, r, g, b, a] = parts;
  const alpha = Math.min(MAX_SCRIM_ALPHA, Number(a ?? 1) * backdropStrength[level]);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
}

export const sheetHandle = {
  width: 44,
  height: 5,
  padTop: spacing.md,
  padBottom: spacing.md,
} as const;

export const SHEET_HANDLE_BLOCK = sheetHandle.padTop + sheetHandle.height + sheetHandle.padBottom;

export function showsGrabber(options: {
  size: SheetSize;
  expandable: boolean;
  scrollable: boolean;
}): boolean {
  const { size, expandable, scrollable } = options;
  if (expandable || size === "expanded" || size === "full") return true;
  return scrollable && size !== "content";
}

export const sheetGutter = spacing.lg;

export const sheetRow = {
  comfortable: 56,
  compact: 48,
} as const;

export type SheetRowDensity = keyof typeof sheetRow;

export const sheetMark = {
  size: 24,
  radioRadius: radius.chip,
  checkRadius: radius.small,
} as const;

export const calendarCell = 40;
