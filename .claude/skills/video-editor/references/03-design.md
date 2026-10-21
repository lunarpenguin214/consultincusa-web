# Job 3 — Design guidelines + beat map

Graphics with no plan come out as PowerPoint slides — because nobody told the model what
good looks like. Show it, then plan before building.

## A. Design guidelines (`design/guidelines.md`)

1. Get references: 2–5 edits the user loves (screenshots, a screen recording, or a video
   file). Good public source of Claude-made motion work with the prompts shown:
   promptmotion.com. HyperFrames design templates: https://www.hyperframes.dev/ (frame.md).
2. For video references, extract stills: `python3 scripts/qc_frames.py ref.mp4 design/ref --fps 1`.
3. Look at the stills and write down **what makes them work**, concretely:
   - Type: families, weights, sizes relative to frame, case, max words on screen
   - Motion: how text enters/exits (direction, easing, duration in frames), stagger
   - Transitions between scenes; how graphics relate to the speaker (side panel, behind,
     lower third, never over the face)
   - Color: palette with hex values, contrast rules
   - Captions: word-by-word highlight style, position, safe zones for the platform UI
4. Merge with `library/design.md` (the brand's standing rules). Conflicts → ask the user.

## B. Beat map (`design/beatmap.md`) — build this BEFORE any graphic

One row per idea in the script (not per sentence):

| # | Script idea (quote first words) | t_in–t_out (from cut/words.json) | On screen | Graphic type | Reuse? (library asset / catalog block) | Hold ≥ |
|---|---|---|---|---|---|---|

Rules:
- **One idea = one graphic**, held long enough to read (rule of thumb: ≥ 0.3 s per word on
  screen + 1 s). Sentences inside one idea share that graphic.
- Speaker-only beats are allowed and good — breathing room.
- Fill the "Reuse?" column first; new builds only where nothing fits.
- Gate: user approves the beat map. Changing a row here costs nothing; changing a rendered
  graphic costs a lot.
