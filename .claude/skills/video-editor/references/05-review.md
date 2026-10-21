# Job 5 — Check the work (10 frames per second)

The most important job. Review like a person watching, not a computer diffing.

## Steps

1. Extract frames at 10 fps, in windows so context stays small:
   ```bash
   python3 scripts/qc_frames.py build/draft.mp4 review/frames --fps 10 --start 0 --duration 20
   ```
   (repeat per 20-s window; for long videos fan the windows out to subagents — viewing only,
   no renders, so the 4-render cap doesn't apply).
2. Look at the frames in order with `library/checklist.md` open. Also read
   `cut/words.json` for the same window to check timing against speech.
3. Write `review/report.md`: one line per finding —
   `t=mm:ss.s | check id | what's wrong | blocking? | fix`.
4. Fix blocking findings (back to job 4 for that beat only), re-render draft, re-check the
   changed windows only.
5. Gate: zero blocking findings → hand the draft to the user for notes (job 6).

## How to look "like a person"

- Would a viewer notice it at normal speed? A 1-frame blip on a cut is noticeable; a 1-px
  drift is not.
- Can the on-screen text be read in the time it's up, at the platform's real size?
- Does anything compete with the speaker's face or the platform UI safe zones?
