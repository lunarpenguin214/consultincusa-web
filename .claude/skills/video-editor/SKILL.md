---
name: video-editor
description: Edit a talking-head video end to end with Claude Code as a six-job pipeline (script → cut → design → build → review → learn) instead of one-shotting it. Use when the user says "edit this video", "cut my raw footage", "make a video like X", "add motion graphics / captions to my recording", "write a video script with hooks", "/video-editor", or hands over a raw .mp4/.mov to turn into a finished video. Also use when the user gives notes on a previous cut — job 6 turns every note into a permanent rule.
---

# Video Editor — six jobs, one at a time

The whole method in one line: **never ask for a finished video. Run six narrow jobs in
order, gate each one, and turn every note into a rule.** One-shotting overloads the model
and produces the generic "cheap AI edit" look.

```
1 SCRIPT ─▶ 2 CUT ─▶ 3 DESIGN + BEAT MAP ─▶ 4 BUILD (subagents) ─▶ 5 REVIEW ─▶ 6 LEARN
   hooks      whisper     guidelines            hyperframes          10 fps       notes →
   library    + ffmpeg    + beat map            ≤4 renders           checklist    rules
   ▲                                                                              │
   └──────────────────────── library/ grows every run ◀────────────────────────────┘
```

## Before starting

1. Make a project folder: `video-projects/<YYYY-MM-DD>-<slug>/` (raw/, cut/, design/, build/, review/).
2. **Read `library/NOTES.md` and `library/RULES.md` first** — they are the accumulated taste
   from every past round. They override defaults in this file.
3. Ask only the questions that unlock the most: niche/topic, target platform + aspect ratio
   (9:16 short vs 16:9 long), brand look (or 2–3 reference videos/screenshots), deadline.
4. Tooling check (install what's missing, don't ask): `ffmpeg`, `ffprobe`, Python 3 +
   `pip install faster-whisper`, Node 22+. For graphics: HyperFrames —
   `claude plugin marketplace add heygen-com/hyperframes && claude plugin install hyperframes@hyperframes`
   (or `npx hyperframes skills update`). Run `npx hyperframes doctor --json`.

## Model split (cost control)

| Work | Model |
|---|---|
| Planning, hook choice, design direction, beat map, review verdicts, rule rewrites | Strongest available (Opus / Fable) — this conversation |
| Building graphics, writing composition code, renders, frame extraction | Faster model (Sonnet) via subagents (`model: "sonnet"`) |

Planning is cheap to change; built graphics are expensive. Spend thinking tokens up front.

## The six jobs (each has a reference — read it when you reach that job)

| # | Job | Output | Gate (user confirms before next job) | Reference |
|---|---|---|---|---|
| 1 | **Script** — study top videos in the niche, extract hooks + formats into the library, write the script in that shape | `script.md` | Script approved → user films it | `references/01-script.md` |
| 2 | **Cut** — Whisper word timestamps → keep the LAST clean take of each line, drop retakes + silences → FFmpeg splice | `cut/clean.mp4` + `cut/removed.md` | User skims `removed.md` | `references/02-cut.md` |
| 3 | **Design + beat map** — derive guidelines from reference screenshots, then map every idea to what's on screen | `design/guidelines.md`, `design/beatmap.md` | Beat map approved (cheapest place to change anything) | `references/03-design.md` |
| 4 | **Build** — one subagent per section; graphics as HyperFrames HTML; one graphic first as a web page, then storyboard, then video | `build/` compositions, draft render | Storyboard approved, then draft cut approved | `references/04-build.md` |
| 5 | **Review** — 10 frames/sec against the checklist, like a person not a computer | `review/report.md` | Zero blocking findings | `references/05-review.md` |
| 6 | **Learn** — fix each note, then find + rewrite the instruction that allowed it | Updated `library/RULES.md` + `NOTES.md` | User's notes all closed | `references/06-learn.md` |

## Hard rules (from the source system's failures)

- **Never one-shot.** One job per turn of work; show the artifact; get the gate.
- **Beat map before any graphic.** One idea = one graphic, held long enough to read.
  Not one graphic per sentence (too busy).
- **Max 4 renders at once.** Nine parallel renders maxed the machine and subagents
  cancelled each other's work. Long full renders → run overnight / detached
  (`HYPERFRAMES_RENDER_DETACHED=1`).
- **Drafts small, finals once.** `npx hyperframes render --quality draft` while giving notes;
  `--quality delivery` only after the whole cut is approved.
- **Reuse before build.** Check `library/assets.md` and `npx hyperframes catalog --query "<beat>"`
  before writing any graphic from scratch. Reuse roughly halved tokens and hours on run 2.
- **Human makes the final call.** The user films and approves every cut; their taste is the moat.
- **Every note becomes a rule** (job 6). The skill must be better after each video.

## Cost expectations (to set with the user up front)

Reference run from the source: ~600M tokens (≈100M Opus planning / ≈500M Sonnet building),
≈$160 at API prices (covered by a Max 20x plan), ~6 h of machine time for one ~9-min video.
Run 1 cost ~1.4B tokens / ~12 h — the drop came entirely from reusing the library.
Report actual usage at each gate (`npx hyperframes usage --json` when available).

## Quick-start exercises (when the user wants to try one job, not the whole pipeline)

- Job 1: "Pull the hooks + format from 3 videos in my niche that beat their channel's usual views."
- Job 2: Film one short take with deliberate mistakes → transcribe, cut retakes, list what was removed.
- Job 3: Screenshot 3 edits you love → write guidelines from them.
- Job 4: Build ONE graphic as a web page → storyboard the rest → only then render.
- Job 5: Write down the 3 mistakes you always catch → add them to `library/checklist.md`.
- Job 6: After the next cut: "which instruction would have prevented each of my notes?"
