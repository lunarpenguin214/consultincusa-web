# Job 6 — Learn from notes (the skill rewrites itself)

No single prompt makes a good edit; months of notes do. Every note the user gives is a
chance to make the next video better automatically.

## For each note

1. **Log it** in `library/NOTES.md`:
   `YYYY-MM-DD | project | t=mm:ss | note (user's words) | job # | root cause | rule changed`
2. **Fix the video** (the specific beat/cut).
3. **Trace the instruction.** Ask: which line in this skill, `library/RULES.md`,
   `library/design.md`, or `library/checklist.md` should have prevented this — or which
   missing line allowed it? Name the file and line.
4. **Rewrite it.** Edit or add the rule so the mistake can't recur. Prefer changing an
   existing rule over adding a new one; keep rules concrete and testable
   ("each idea gets one graphic held ≥ 0.3 s/word + 1 s", not "don't overdo graphics").
   If a check would catch it, add it to `library/checklist.md`.
5. **Promote patterns.** A note that shows up in 2+ videos moves from `NOTES.md` into
   `RULES.md` (or into SKILL.md's hard rules if it's universal).

## Close the round

- Show the user a short diff of the rule changes: "note → rule".
- Record tokens/hours for this video at the bottom of `NOTES.md` so the cost trend is visible.
- Audience feedback counts as notes too (e.g. comments saying "too many graphics" became the
  one-idea-one-graphic rule).
