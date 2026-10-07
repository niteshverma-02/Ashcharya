import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "./tokens";

/**
 * The widest the app's content is ever drawn, whatever the screen behind it.
 *
 * Prasar is a **phone** app — one column, one primary action per screen, thumb-reachable controls —
 * and `supportsTablet` was on long before anything was designed for a tablet. Left alone on an iPad
 * or a 10" Android tablet, every screen simply stretches: cards run the full 1000dp, list rows put
 * their title and their value at opposite ends of the glass, and the eye has to travel the whole
 * width to read one row.
 *
 * 640 rather than a phone's 390 so the layout still gets more room than a handset (bigger images,
 * fewer wrapped labels), and rather than a two-pane tablet redesign because that is a different
 * product decision — this is the honest, cheap answer: the phone layout, centred, deliberate.
 */
export const CONTENT_MAX_WIDTH = 640;

/** True only where the window is genuinely wider than the app's column — tablets, not foldables. */
export function useIsWideScreen(): boolean {
  return useWindowDimensions().width > CONTENT_MAX_WIDTH;
}

/**
 * The width of the box the app actually draws in — **use this, not `useWindowDimensions().width`,
 * for anything sized to "the full width of the screen".**
 *
 * `AppFrame` caps the tree at `CONTENT_MAX_WIDTH`, but `useWindowDimensions` keeps reporting the
 * WINDOW, which on a tablet is wider than the column. Anything that derives a layout from it —
 * a paging carousel's stride, a photo grid's tile size, a tab bar's slot arithmetic — then computes
 * against a width its container never had, and lands off by the difference. That bug does not exist
 * on a phone, where the two numbers are equal, which is exactly why it needs one named helper
 * rather than a `Math.min` remembered at each call site.
 */
export function useContentWidth(): number {
  return Math.min(useWindowDimensions().width, CONTENT_MAX_WIDTH);
}

export const HEADER_ROW_HEIGHT = 56;

export const HEADER_TOP_PAD = spacing.md;

export const PILL_BAR_HEIGHT = 64;

const TAB_BAR_CLEARANCE = 16;

export function useNavBarHeight(): number {
  const insets = useSafeAreaInsets();
  return insets.bottom + PILL_BAR_HEIGHT;
}

export function useTabBarSpace(): number {
  return useNavBarHeight() + TAB_BAR_CLEARANCE;
}

const NAV_FAB_SIZE = 56;
const NAV_FAB_GAP = 16;
const FAB_STACK_GAP = 12;

export function useNavFabBottom(): number {
  return useNavBarHeight() + NAV_FAB_GAP;
}

export function useStackedFabBottom(): number {
  return useNavFabBottom() + NAV_FAB_SIZE + FAB_STACK_GAP;
}

export const FAB_STACK_RIGHT = 16;

export const FAB_SCROLL_CLEARANCE = 96;

/**
 * Breathing room between anything anchored to the bottom of the screen and the system navigation
 * bar below it.
 *
 * This exists because `Math.max(insets.bottom, <gap>)` — the shape every bottom-anchored surface in
 * this app used to have — silently produces **zero** gap on a modern Android phone. Under
 * edge-to-edge the bottom inset *is* the nav bar's height (~48dp), so `max()` picks the inset,
 * spends all of it clearing the nav bar, and leaves the control's edge sitting exactly on it. The
 * gap only survives on devices whose inset is small, which is why this reads as "fine on my phone,
 * glued on yours". The fix is addition, not a maximum: clear the nav bar **and then** leave a gap.
 */
export const SYSTEM_NAV_GAP = spacing.md;

/**
 * Bottom padding for a bar that sits on the bottom edge — sticky footers, filter bars. Adds
 * `SYSTEM_NAV_GAP` on top of the system inset, and falls back to a normal gutter on devices that
 * report no inset at all (older Android with a hardware/opaque nav bar).
 */
export function useBottomBarPadding(): number {
  const insets = useSafeAreaInsets();
  return insets.bottom > 0 ? insets.bottom + SYSTEM_NAV_GAP : spacing.lg;
}

/**
 * The breathing room a scroll view leaves under its last item when a `StickyFooter` (or a bar built
 * on it — `CheckoutBar`, `PurchaseBar`) sits below it.
 *
 * ☠️ **It is a GAP, not a clearance** (fixed 2026-09-29, owner: *"kahi space aa jata he"*).
 * `StickyFooter` is laid out IN FLOW, as the scroll view's sibling underneath it — the scroll view
 * already ends at the footer's top edge, so nothing it draws can ever be hidden behind the bar. This
 * used to return the footer's own height plus the system inset (≈124dp on gesture nav, ≈148dp on
 * three-button), written for a footer that floated over the scroll; every form in the app then
 * ended in a band of empty page the height of a second footer. Should a footer ever genuinely float
 * (`position: absolute` over the list), that screen pads for it by measuring the bar — do not put
 * the old arithmetic back here, where fifteen in-flow screens would pay for it.
 */
export const FOOTER_SCROLL_CLEARANCE = spacing.xl;

export function useFooterScrollClearance(): number {
  return FOOTER_SCROLL_CLEARANCE;
}

export function useNavFabTabBarSpace(): number {
  return useNavFabBottom() + NAV_FAB_SIZE + TAB_BAR_CLEARANCE;
}

export function useFabTabBarSpace(): number {
  return useStackedFabBottom() + NAV_FAB_SIZE + TAB_BAR_CLEARANCE;
}
