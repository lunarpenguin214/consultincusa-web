# Job 1 — Hooks + script

A polished edit can't save a weak script. Study what already wins in the niche, save the
patterns, write in that shape.

## Steps

1. **Find outliers, not just popular videos.** Pick 3+ videos in the user's niche that beat
   their *own channel's* usual view count (outlier = views ÷ channel median ≥ ~2–3×).
   The user may supply links; get transcripts via whatever path works in this environment
   (see "Getting transcripts" below).
2. **Extract per video** into `library/hooks.md` (append, never overwrite):
   - Hook (first ~5–15 s): verbatim line + hook type (contrarian claim, result-first,
     credibility + promise, "here's the part you can copy", cost reveal teased for the end…)
   - Format skeleton: section order, number of steps, where the promise/CTA/payoff land
   - Retention devices: open loops ("at the end I'll show what it cost"), "try this" beats,
     honesty beats ("is it perfect? no")
   - Source URL + views vs channel median
3. **Pick a hook + format from the library** that fits this topic. State why in one line.
4. **Write `script.md`** in that skeleton: spoken lines only, short sentences, one idea per
   paragraph (each paragraph will become one beat in job 3). Mark open loops and where
   they pay off.
5. **Gate:** user approves → user films it reading the script.

## Getting transcripts

Order of attempts — stop at the first that works, and log which one did in `library/NOTES.md`:
1. User pastes the transcript (YouTube "…" → Show transcript, or a Gemini summary/transcript).
2. `yt-dlp --skip-download --write-auto-subs --sub-langs "en.*" --sub-format vtt <url>`
   (needs youtube.com reachable from this machine).
3. Gemini API with the YouTube URL as `file_data.file_uri` (needs `GEMINI_API_KEY` in env).
Never invent hooks from a video you couldn't read.
