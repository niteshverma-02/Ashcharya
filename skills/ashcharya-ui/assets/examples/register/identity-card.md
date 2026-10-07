# Register

Users: school office staff (accountant/fee clerk, admissions clerk, office superintendent) in Indian CBSE/state-board schools, 7–9h/day
Context: front office counter, parents queueing at the window at month start, phones ringing; Hindi + English names
Device: desktop 1366–1920 wide, keyboard + mouse; occasionally the principal on a phone (390)
50×/day jobs: collect a fee + print receipt, look up a student by name/admission no., check who is overdue,
mark/check attendance, issue TC/bonafide, enter marks for report cards
Network: school broadband, drops occasionally — "saved / waiting to send" visible

Materials: cloth-bound maroon office registers (fee register, attendance "hajiri" register),
four-line handwriting copy (blue lines, red baseline), the teacher's hand-circled marks + handwritten dates

Palette (one hue family = register-binding maroon, one accent = copy-line blue):
- canopy #33101E · canopy2 #4A1A2D · on-canopy #F6EEF1
- action #8A2346 (on #FFF, 8.7:1) · hover #721C3A · action-text #8A2346 · brand-surface #F8E9EE
- accent "copy-line blue" #8CCBE6 (accent-ink #0E2A3A) · accent-text #1D5E80
- canvas #F6F2F3 (rosy register paper) · surface #FFFFFF · ink #2A0F1A · ink-2 #5B4450 · ink-faint #8A7680
- night: GitHub dark (#15181D / #1C2128 / #30363D) + action #E68DAA (ink #0D1117), same accent #8CCBE6
- status: standard success/warning/danger/info (danger stays distinct from maroon by being brighter #B4342C + icon + word)

Texture: four-line copy rules — groups of 3 thin lines + 1 baseline every 30px, white at 5% on canopy
(CSS: repeating-linear-gradient(180deg, transparent 0 7px, rgba(255,255,255,.05) 7px 8px, transparent 8px 13px,
rgba(255,255,255,.05) 13px 14px, transparent 14px 19px, rgba(255,255,255,.05) 19px 20px, transparent 20px 25px,
rgba(255,255,255,.09) 25px 26px, transparent 26px 30px)) — the baseline is the slightly stronger fourth line

Shape: swallowtail ribbon — the satin bookmark ribbon of a register: a strip whose end is cut into a V
(clip-path polygon). Used on: page header (ribbon hanging from the title block), active nav (ribbon tail on
the right edge), the one primary key ("Collect fee" with a swallowtail right end + hard offset)

Mark: (1) hand-circled figure — a wobbly SVG ring like a teacher circling a score, around the one hero
number in the header slab; (2) handwritten date (Kalam) in the top bar and on receipts. Nothing else.

Type: body Hind (ITF, Indian, Devanagari-ready) · display Zilla Slab 600–700 (titles + tabular numbers, the
"printed register" feel) · accent Kalam (handwriting: dates, the circled number, empty-state notes)

Never: green/gold, furrows, stamps/wax seals, indigo + amber, ledger single rules, ticket bites, terracotta +
mustard, scanlines; chalkboard clip-art, apple/pencil/school-bus icons, crayon colours, mortarboard logos,
"Welcome back, champ!" copy, gradients, glass, glow.
