# Method 4 — Iterating with the user and verifying

The three source apps reached their look through many review rounds. The process matters as much as the
rules: it is how a team's taste becomes a system.

## 1. Build, show, log
1. **Build the strongest single direction.** Don't offer three options; the users of this approach asked
   to be shown a decision ("create something new and unique").
2. **Show it in context** (screenshot of the real screen, light and night).
3. **Log every rejection as a rule**, with the user's words and the fix, in a taste log
   (`../taste-and-rejections.md` is a real one). The log becomes part of the product's identity.
4. **Change one shared thing at a time** and re-check on the real device. Rebuilding a control with many
   new ideas at once was judged worse than the original.

## 2. Decoding feedback
| What the user says | What it usually means | What to try |
|---|---|---|
| "basic" / "simple lag raha" | not enough structure or craft | add depth (tray/key), texture, a status slab, density |
| "ajib" / "odd" | it doesn't belong with the rest | make it use the shared component and tokens |
| "ganda" / "ugly" | the element shouldn't exist | remove it rather than restyle it |
| "AI generated" | template signals (glow, glass, gradients, generic copy) | run the smell test in `craft.md` |
| "same as the other app" | identity too close to a sibling | change materials, shape and type, not just hue |
| "sabhi alag alag kyu" | pages diverged | consolidate into one shared component |
| "ye uthi hui kyu he?" | something floats that shouldn't | flatten it; shadows only for floating things |
| "hub me kitne filter, dashboard, chart the — isme kyu nahi" | missing depth/features users expect | bring the capability, in this product's identity |

## 3. Guard rails that make the taste stick
- **Tokens only**: no raw hex in components (lint or test for `bg-[#…]` and raw colours).
- **One shared component per role** enforced by code review.
- **Contrast tests** for every token pair, both themes (`assets/tools/check-contrast.py`).
- **No fake data** rule in the review checklist.
- **A written identity card** in the repo, so new screens start from it.

## 4. Verification before "done"
- Screenshots: light + night at 375 / 768 / 1024 / 1280 / 1536 (web) or 320 / 375 / 412dp (mobile).
  Use Playwright viewport/device emulation for widths under 500px (a plain headless window can't go narrower).
- Keyboard: Tab order, ⌘K, Esc, arrows; visible focus ring.
- Touch: targets ≥ 48dp; swipe actions duplicated by buttons.
- Reduced motion: everything still works with animation off.
- Long text: Hindi or other long strings, large font scale.
- Network: slow, offline, failed write, empty cache.
- States: loading, empty, filtered-empty, error, no-access.
- Demo / prototype data: realistic for the domain and internally consistent — every header number, tab
  count, chart and footer is computed from the same rows, so nothing on screen contradicts anything else.
