#!/usr/bin/env python3
"""Check a custom Ashcharya theme before using it.
Usage: python3 check-contrast.py my-theme.json
my-theme.json = {"light": {...}, "night": {...}} with these keys (same roles as token-template.css):
  required: canvas, surface, ink, ink2, inkFaint, canopy, canopy2, onCanopy, action, actionHover, onAction,
            actionText, brandSurface, accent, accentInk, accentText
  optional: success/successSurface, warning/warningSurface, danger/dangerSurface, info/infoSurface
            (status text on its own surface is then checked too)
Accent on plain surfaces is reported as a warning: if the accent is pale, never use it as a mark on white."""
import json, sys
def lum(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
def ratio(a, b):
    hi, lo = sorted([lum(a), lum(b)], reverse=True); return (hi + 0.05) / (lo + 0.05)
PAIRS = [("ink","canvas",4.5),("ink","surface",4.5),("ink2","surface",4.5),("ink2","canvas",4.5),("inkFaint","surface",3),
  ("onAction","action",4.5),("onAction","actionHover",4.5),("actionText","surface",4.5),("actionText","canvas",4.5),
  ("accentText","surface",4.5),("accentInk","accent",4.5),("onCanopy","canopy",4.5),("onCanopy","canopy2",4.5),
  ("accent","canopy",3),("accent","canopy2",3),("actionText","brandSurface",4.5),("inkFaint","canvas",3),
  ("success","successSurface",4.5),("warning","warningSurface",4.5),("danger","dangerSurface",4.5),("info","infoSurface",4.5),
  ("success","surface",4.5),("warning","surface",4.5),("danger","surface",4.5),("info","surface",4.5)]
WARN = [("accent","surface",3),("accent","canvas",3)]
theme = json.load(open(sys.argv[1])); bad = 0
for mode in ("light", "night"):
    P = theme[mode]
    for a, b, need in PAIRS:
        if a in P and b in P:
            r = ratio(P[a], P[b]); ok = r >= need; bad += not ok
            print(f"{'✅' if ok else '❌'} {mode:5} {a:>12} on {b:<12} {r:5.2f} (need {need})")
    for a, b, need in WARN:
        if a in P and b in P and ratio(P[a], P[b]) < need:
            print(f"⚠️  {mode:5} {a:>12} on {b:<12} {ratio(P[a], P[b]):5.2f} — don't use the accent as a mark on plain surfaces")
print("\nAll pairs pass." if not bad else f"\n{bad} pair(s) fail — adjust those colours.")
sys.exit(1 if bad else 0)
