#!/usr/bin/env python3
"""Decide keep-ranges from a word-level transcript: last clean take wins, silences trimmed.

Usage: cut_plan.py <words.json> <plan.json> [--removed removed.md]
       [--gap 0.6] [--sim 0.6] [--window 4] [--pad 0.08] [--head 4]
Output plan.json: {"keep": [[start, end], ...], "phrases": [...]}
"""
import argparse
import difflib
import json
import re


def norm(w):
    return re.sub(r"[^a-z0-9']", "", w.lower())


def phrases_of(words, gap):
    out, cur = [], []
    for w in words:
        if cur and w["s"] - cur[-1]["e"] >= gap:
            out.append(cur)
            cur = []
        cur.append(w)
    if cur:
        out.append(cur)
    return out


def head(ph, n):
    return [norm(w["w"]) for w in ph[:n] if norm(w["w"])]


def similar(a, b, n, sim):
    ha, hb = head(a, n), head(b, n)
    if not ha or not hb:
        return False
    # compare over the shorter head so an aborted take ("So what") still matches its redo
    k = min(len(ha), len(hb))
    return difflib.SequenceMatcher(None, ha[:k], hb[:k]).ratio() >= sim and k >= min(2, n)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("words")
    ap.add_argument("plan")
    ap.add_argument("--removed", default=None)
    ap.add_argument("--gap", type=float, default=0.6, help="pause (s) that splits phrases")
    ap.add_argument("--sim", type=float, default=0.6, help="head similarity to call a retake")
    ap.add_argument("--window", type=int, default=4, help="look this many phrases ahead")
    ap.add_argument("--pad", type=float, default=0.08, help="padding (s) around kept phrases")
    ap.add_argument("--head", type=int, default=4, help="words compared at phrase start")
    a = ap.parse_args()

    data = json.load(open(a.words))
    words, duration = data["words"], data.get("duration")
    phs = phrases_of(words, a.gap)

    dropped = {}
    for i, ph in enumerate(phs):
        for j in range(i + 1, min(i + 1 + a.window, len(phs))):
            if similar(ph, phs[j], a.head, a.sim):
                dropped[i] = f"retake of phrase {j} at {phs[j][0]['s']:.2f}s"
                break

    keep = []
    for i, ph in enumerate(phs):
        if i in dropped:
            continue
        s = max(0.0, ph[0]["s"] - a.pad)
        e = ph[-1]["e"] + a.pad
        if duration:
            e = min(e, duration)
        if keep and s <= keep[-1][1]:
            keep[-1][1] = e
        else:
            keep.append([round(s, 3), round(e, 3)])

    doubles = [
        (words[k]["s"], words[k]["w"])
        for k in range(1, len(words))
        if norm(words[k]["w"]) and norm(words[k]["w"]) == norm(words[k - 1]["w"])
    ]

    text = lambda ph: " ".join(w["w"] for w in ph)
    plan = {
        "keep": keep,
        "phrases": [
            {"i": i, "s": ph[0]["s"], "e": ph[-1]["e"], "text": text(ph), "dropped": dropped.get(i)}
            for i, ph in enumerate(phs)
        ],
    }
    json.dump(plan, open(a.plan, "w"), indent=1)

    kept_len = sum(e - s for s, e in keep)
    src_len = duration or (words[-1]["e"] if words else 0)
    print(f"{len(phs)} phrases, {len(dropped)} retakes dropped, {src_len:.1f}s -> {kept_len:.1f}s")

    if a.removed:
        with open(a.removed, "w") as f:
            f.write(f"# Removed in cut\n\nSource {src_len:.1f}s -> kept {kept_len:.1f}s "
                    f"(silences >= {a.gap}s trimmed between phrases)\n\n## Dropped phrases (earlier takes)\n\n")
            for i in sorted(dropped):
                f.write(f"- {phs[i][0]['s']:.2f}s  \"{text(phs[i])}\"  — {dropped[i]}\n")
            if not dropped:
                f.write("- none\n")
            f.write("\n## Doubled words (review — not auto-cut)\n\n")
            for t, w in doubles:
                f.write(f"- {t:.2f}s  \"{w} {w}\"\n")
            if not doubles:
                f.write("- none\n")


if __name__ == "__main__":
    main()
