#!/usr/bin/env python3
"""Extract review frames (default 10 fps) for a time window, named by timestamp.

Usage: qc_frames.py <video> <out_dir> [--fps 10] [--start 0] [--duration 20] [--width 640]
Frames: <out_dir>/t<seconds>.jpg  (e.g. t0012.30.jpg) so findings cite exact times.
"""
import argparse
import os
import subprocess
import tempfile


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("out_dir")
    ap.add_argument("--fps", type=float, default=10)
    ap.add_argument("--start", type=float, default=0)
    ap.add_argument("--duration", type=float, default=20)
    ap.add_argument("--width", type=int, default=640)
    a = ap.parse_args()

    os.makedirs(a.out_dir, exist_ok=True)
    tmp = tempfile.mkdtemp(dir=a.out_dir, prefix=".raw-")
    subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", str(a.start), "-t", str(a.duration), "-i", a.video,
         "-vf", f"fps={a.fps},scale={a.width}:-2", "-q:v", "4", os.path.join(tmp, "%06d.jpg")],
        check=True,
    )
    files = sorted(os.listdir(tmp))
    for k, name in enumerate(files):
        t = a.start + k / a.fps
        os.replace(os.path.join(tmp, name), os.path.join(a.out_dir, f"t{t:07.2f}.jpg"))
    os.rmdir(tmp)
    print(f"{len(files)} frames ({a.start:.1f}s-{a.start + a.duration:.1f}s @ {a.fps}fps) -> {a.out_dir}")


if __name__ == "__main__":
    main()
