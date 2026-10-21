# Job 4 — Build with subagents (HyperFrames)

Every graphic is code: HTML/CSS/JS compositions rendered to video by HyperFrames
(HeyGen, open source, `npx hyperframes`). No editing timeline, no After Effects.
Use the HyperFrames skills for the mechanics — this file only covers orchestration:
- `/talking-head-recut` — overlays on the cut talking-head video (the main path here)
- `/embedded-captions` — word-by-word captions (feed it `cut/words.json` re-timed to the cut)
- `/hyperframes-core`, `/hyperframes-animation`, `/hyperframes-cli`, `/hyperframes-registry`

## Order (saves the most tokens)

1. **One graphic first, as a web page.** Build beat #1's graphic, open it in the preview,
   compare against `design/guidelines.md`. Fix until it's right — it becomes the template
   for every other graphic.
2. **Storyboard the rest** (HyperFrames storyboard board: `boards/storyboard.html`).
   Gate: user approves the storyboard.
3. **Fan out.** Split the beat map into sections (~5–10 beats each). Spawn one subagent per
   section, in parallel, `model: "sonnet"`, each with: its beat rows, guidelines.md, the
   approved template graphic, the relevant `library/RULES.md` entries, and the instruction
   "build compositions only — do NOT render".
4. **Assemble + check**: `npx hyperframes check` (lint + layout + contrast), fix findings.
5. **Draft render**: `npx hyperframes render --quality draft --output build/draft.mp4`.
   Go to job 5, then the user watches the draft.
6. **Final** only after the whole cut is approved: `--quality delivery`.

## Render discipline (hard)

- **≤ 4 renders at any moment** across all subagents. Renders are the step that turns code
  into video and they are heavy; 9 at once maxed a machine and jobs cancelled each other.
  Subagents never render on their own — the orchestrator queues renders, 4 max.
- Long/full renders: run detached and check the log/file instead of blocking:
  `bash -c 'set -m; HYPERFRAMES_RENDER_DETACHED=1 npx hyperframes render --quality delivery --output final.mp4 < /dev/null > render.log 2>&1 &'`
- Overnight for full-length finals when the user's machine is in use.

## After the build

Append every new reusable graphic to `library/assets.md` (name, path, what beat type it
serves, params). Next video starts from these.
