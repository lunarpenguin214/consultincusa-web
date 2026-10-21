#!/usr/bin/env python3
"""Splice keep-ranges from plan.json into one clip with FFmpeg (frame-accurate re-encode).

Usage: apply_cut.py <input> <plan.json> <out.mp4> [--crf 18] [--preset veryfast]
"""
import argparse
import json
import subprocess


def has_audio(path):
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index", "-of", "csv=p=0", path],
        capture_output=True, text=True,
    )
    return bool(r.stdout.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("plan")
    ap.add_argument("out")
    ap.add_argument("--crf", default="18")
    ap.add_argument("--preset", default="veryfast")
    a = ap.parse_args()

    keep = json.load(open(a.plan))["keep"]
    if not keep:
        raise SystemExit("plan has no keep-ranges")
    audio = has_audio(a.input)

    parts, labels = [], []
    for i, (s, e) in enumerate(keep):
        parts.append(f"[0:v]trim=start={s}:end={e},setpts=PTS-STARTPTS[v{i}]")
        labels.append(f"[v{i}]")
        if audio:
            parts.append(f"[0:a]atrim=start={s}:end={e},asetpts=PTS-STARTPTS[a{i}]")
            labels.append(f"[a{i}]")
    n = len(keep)
    parts.append("".join(labels) + f"concat=n={n}:v=1:a={1 if audio else 0}[v]" + ("[a]" if audio else ""))

    cmd = ["ffmpeg", "-y", "-v", "error", "-i", a.input, "-filter_complex", ";".join(parts), "-map", "[v]"]
    if audio:
        cmd += ["-map", "[a]", "-c:a", "aac", "-b:a", "192k"]
    cmd += ["-c:v", "libx264", "-crf", a.crf, "-preset", a.preset, "-pix_fmt", "yuv420p", a.out]
    subprocess.run(cmd, check=True)
    print(f"{n} ranges, {sum(e - s for s, e in keep):.2f}s -> {a.out}")


if __name__ == "__main__":
    main()
