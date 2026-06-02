#!/usr/bin/env python3
"""Merge head + tail STT word lists and build an SRT split on sentence / half-sentence boundaries."""
import json, os

ROOT = "/Users/sgolan20/DEV/Haifa_univ_video_1"
HEAD = os.path.join(ROOT, "whisper_lesson2lecture1.json")  # 0..209.84 (truncated)
TAIL = "/tmp/tail.json"                                     # cut at 205s, relative times
TAIL_OFFSET = 205.0
SEAM = 205.0  # take head words that START before this, then all tail words

OUT_SRT = os.path.join(ROOT, "remotion-video/public/lesson2-lecture1/audio/full_narration.srt")
OUT_JSON = os.path.join(ROOT, "whisper_lesson2lecture1.json")  # overwrite with full merged words


def words_of(path, offset=0.0):
    d = json.load(open(path, encoding="utf-8"))
    out = []
    for w in d["words"]:
        if w.get("type") != "word":
            continue
        out.append({"text": w["text"], "start": w["start"] + offset, "end": w["end"] + offset})
    return out


head = [w for w in words_of(HEAD) if w["start"] < SEAM]
tail = words_of(TAIL, TAIL_OFFSET)
words = head + tail

print(f"head<{SEAM}: {len(head)} | tail: {len(tail)} | merged: {len(words)}")
print("seam area:", [(w["text"], round(w["start"], 2)) for w in words[len(head) - 2:len(head) + 2]])
print("last word ends:", round(words[-1]["end"], 2))


def ts(sec):
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


# split into cues: close a cue when a word ends with terminal/half punctuation
CLOSERS = (".", "?", "!", ",", ":", ";", "–", "…")
cues, cur = [], []
for w in words:
    cur.append(w)
    if w["text"].rstrip().endswith(CLOSERS):
        cues.append(cur)
        cur = []
if cur:
    cues.append(cur)

lines = []
for i, cue in enumerate(cues, 1):
    text = " ".join(w["text"] for w in cue).strip()
    lines.append(f"{i}\n{ts(cue[0]['start'])} --> {ts(cue[-1]['end'])}\n{text}\n")

with open(OUT_SRT, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

# overwrite the json with the full merged word list (for later timing.ts derivation)
json.dump({"words": words}, open(OUT_JSON, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

print(f"\nSRT cues: {len(cues)} -> {OUT_SRT}")
print(f"Merged word JSON -> {OUT_JSON}")
