# Job 2 — Cut the raw footage

Raw footage = stumbles, restarted sentences, dead air. Whisper gives every word a timestamp;
with that, the edit is just a list of keep-ranges for FFmpeg.

## Steps

```bash
S=.claude/skills/video-editor/scripts
P=video-projects/<project>

# 1. word-level transcript (downloads the Whisper model on first run; free)
python3 $S/transcribe.py $P/raw/take.mp4 $P/cut/words.json --model small.en

# 2. decide what to keep: last clean take of each line, silences trimmed
python3 $S/cut_plan.py $P/cut/words.json $P/cut/plan.json --removed $P/cut/removed.md

# 3. splice
python3 $S/apply_cut.py $P/raw/take.mp4 $P/cut/plan.json $P/cut/clean.mp4
```

## How `cut_plan.py` decides

- Splits words into phrases at pauses ≥ `--gap` (default 0.6 s).
- A phrase is a **retake** if a later phrase (within `--window`, default 4 phrases) starts
  the same way (fuzzy match on the first words ≥ `--sim`, default 0.6) — the earlier one
  is dropped, so the **last** take wins.
- Immediate doubled words ("the the") are flagged in `removed.md` for review (not auto-cut,
  because they're sometimes intentional).
- Keep-ranges get `--pad` (default 0.08 s) on each side so words aren't clipped.

## Check before moving on

- Read `removed.md` with the user (or skim it yourself if they said "just build"): every
  dropped phrase is listed with its timestamp + why.
- Spot-check 3 joins: `ffmpeg -ss <t-1> -t 2 -i clean.mp4 -f null -` won't show you
  anything — instead extract frames around each join and look (job 5 tools).
- Wrong cut? Adjust thresholds or hand-edit `plan.json` (it's plain keep-ranges) and re-run
  step 3. If the same mistake repeats, record it in job 6.
