#!/usr/bin/env python3
"""Word-level transcript with faster-whisper.

Usage: transcribe.py <media> <out.json> [--model small.en] [--lang en]
Output: {"duration": s, "words": [{"w": str, "s": start, "e": end, "p": prob}, ...]}
Needs: pip install faster-whisper (model downloads from huggingface.co on first run).
"""
import argparse
import json

from faster_whisper import WhisperModel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("media")
    ap.add_argument("out")
    ap.add_argument("--model", default="small.en")
    ap.add_argument("--lang", default=None)
    a = ap.parse_args()

    model = WhisperModel(a.model, device="auto", compute_type="auto")
    segments, info = model.transcribe(
        a.media, language=a.lang, word_timestamps=True, vad_filter=False
    )
    words = [
        {"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3), "p": round(w.probability, 3)}
        for seg in segments
        for w in seg.words
        if w.word.strip()
    ]
    with open(a.out, "w") as f:
        json.dump({"duration": round(info.duration, 3), "words": words}, f, indent=1)
    print(f"{len(words)} words, {info.duration:.1f}s -> {a.out}")


if __name__ == "__main__":
    main()
