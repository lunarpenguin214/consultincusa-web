# Review checklist (job 5) — grows via job 6

| id | Mistake | How to spot it in 10-fps frames |
|---|---|---|
| C1 | Animation plays twice | Same entrance motion appears in two separate runs of frames for one beat |
| C2 | Graphic flashes for a split second | Element present in ≤ 3 consecutive frames (≤ 0.3 s) then gone |
| C3 | Text lands too late to read | Text fully visible for less than ~0.3 s/word + 1 s, or arrives after the line is spoken |
| C4 | Graphic sits on the speaker's face | Any overlay intersecting the face region |
| C5 | Word said twice in a row | Doubled word in `cut/words.json` inside the kept ranges (check `removed.md` flags) |
| C6 | Lips drift from voice | Mouth shapes vs `words.json` timing drift after a cut; check frames right after each join |

## User's own checks
<!-- Ask the user for the 3 mistakes they always catch in their own videos; add them as C7+ -->
