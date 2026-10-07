import { LayoutAnimation, Platform, UIManager } from "react-native";
import {
  Easing,
  FadeIn,
  ReduceMotion,
  type WithSpringConfig,
  type WithTimingConfig,
} from "react-native-reanimated";

export const duration = {
  instant: 90,
  quick: 160,
  standard: 220,
  deliberate: 260,
  pulse: 1800,
  flourish: 560,
  /**
   * A section arriving in the viewport as you scroll (`ScrollReveal`). Deliberately the slowest
   * entrance in the set apart from `flourish`: a 220ms `standard` fade on a whole 200dp section
   * reads as a flicker, because the eye is already tracking the scroll and a short fade finishes
   * before it settles. Long enough to be a reveal, short enough that fast scrolling never queues.
   */
  reveal: 420,
} as const;

export const easing = {
  out: Easing.out(Easing.cubic),
  in: Easing.in(Easing.cubic),
} as const;

export const timing = {
  instant: { duration: duration.instant, easing: easing.out, reduceMotion: ReduceMotion.System },
  quick: { duration: duration.quick, easing: easing.out, reduceMotion: ReduceMotion.System },
  standard: { duration: duration.standard, easing: easing.out, reduceMotion: ReduceMotion.System },
  exit: { duration: duration.quick, easing: easing.in, reduceMotion: ReduceMotion.System },
  pulse: {
    duration: duration.pulse,
    easing: Easing.inOut(Easing.ease),
    reduceMotion: ReduceMotion.System,
  },
  flourish: {
    duration: duration.flourish,
    easing: easing.out,
    reduceMotion: ReduceMotion.System,
  },
  reveal: {
    duration: duration.reveal,
    easing: easing.out,
    reduceMotion: ReduceMotion.System,
  },
} as const satisfies Record<string, WithTimingConfig>;

/**
 * How far a section travels on its way in (`ScrollReveal`), and how far above the fold it starts
 * travelling. The shift is small on purpose — a section that slides 40dp is a page that never sits
 * still; 16dp is enough for the eye to read "this arrived" without the layout appearing to settle.
 */
export const reveal = { shift: 16, margin: 64 } as const;

/**
 * The entrance for real content taking a skeleton's place.
 *
 * Every section on Home returns a skeleton tree from one branch and the loaded tree from another,
 * so the swap was a hard cut: the placeholder vanished and the card was simply, abruptly, there.
 * A fade is the whole fix — the content must NOT also travel, because the skeleton was already
 * sitting at the final position and anything that slides in re-states a layout the eye has settled
 * on. Pure opacity, `standard`, no offset.
 *
 * **A factory, not a shared constant.** Reanimated's entering builders are mutable — `.delay()` and
 * friends return the same instance — so handing one object to several call sites lets whichever of
 * them chains a modifier change the animation for all the others.
 */
export function contentEnter() {
  return FadeIn.duration(duration.standard).easing(easing.out).reduceMotion(ReduceMotion.System);
}

export const spring = {
  press: {
    damping: 22,
    stiffness: 320,
    mass: 0.6,
    reduceMotion: ReduceMotion.System,
  },
  navPill: {
    damping: 20,
    stiffness: 210,
    mass: 0.9,
    reduceMotion: ReduceMotion.System,
  },
  navTrail: {
    damping: 15,
    stiffness: 95,
    mass: 1,
    reduceMotion: ReduceMotion.System,
  },
  navPop: {
    damping: 13,
    stiffness: 260,
    mass: 0.7,
    reduceMotion: ReduceMotion.System,
  },
} as const satisfies Record<string, WithSpringConfig>;

export const pressScale = {
  control: 0.98,
  surface: 0.985,
} as const;

export const stagger = { step: 28, maxIndex: 6 } as const;

export function staggerDelay(index: number): number {
  return Math.min(index, stagger.maxIndex) * stagger.step;
}

let layoutAnimationEnabled = Platform.OS !== "android";

export function animateExpand(): void {
  if (!layoutAnimationEnabled) {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
    layoutAnimationEnabled = true;
  }
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      duration.standard,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity,
    ),
  );
}
