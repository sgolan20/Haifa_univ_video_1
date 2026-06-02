#!/usr/bin/env python3
"""
Transcribe an MP3 with ElevenLabs Scribe (word-level timestamps) and build an SRT
split on sentence / half-sentence boundaries.

Scribe can silently truncate long files mid-way. This script detects that (last
word ends well before the audio duration), re-transcribes the tail, and merges
the two word lists at a clean seam.

Usage:
  python3 build_srt.py <mp3_file> <output_srt> [options]

Options:
  --json PATH    Also write the merged word list as JSON (for deriving timing.ts).
  --lang CODE    Scribe language code (default heb).
  --env PATH     .env file holding ELEVENLABS_API_KEY (default ./.env).

Notes:
  - Requires `npx remotion ffmpeg` (no system ffmpeg needed) for tail cutting + duration.
"""
import argparse, json, os, re, subprocess, sys, urllib.request, urllib.error

STT_URL = "https://api.elevenlabs.io/v1/speech-to-text"
CLOSERS = (".", "?", "!", ",", ":", ";", "–", "…")


def load_key(env_path):
    for line in open(env_path, encoding="utf-8"):
        if line.startswith("ELEVENLABS_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    sys.exit("ELEVENLABS_API_KEY not found")


def probe_duration(mp3):
    r = subprocess.run(["npx", "remotion", "ffmpeg", "-i", mp3], capture_output=True, text=True)
    m = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", r.stderr + r.stdout)
    if not m:
        return None
    h, mn, s = m.groups()
    return int(h) * 3600 + int(mn) * 60 + float(s)


def scribe(mp3, key, lang):
    """Call Scribe via curl (simple multipart) and return the parsed JSON."""
    out = mp3 + ".stt.json"
    cmd = ["curl", "-s", "-X", "POST", STT_URL,
           "-H", f"xi-api-key: {key}",
           "-F", f"file=@{mp3}",
           "-F", "model_id=scribe_v1",
           "-F", f"language_code={lang}",
           "-F", "timestamps_granularity=word",
           "-o", out]
    subprocess.run(cmd, check=True)
    d = json.load(open(out, encoding="utf-8"))
    os.remove(out)
    return d


def words_of(d, offset=0.0):
    return [{"text": w["text"], "start": w["start"] + offset, "end": w["end"] + offset}
            for w in d.get("words", []) if w.get("type") == "word"]


def cut_tail(mp3, start_sec):
    tail = mp3 + ".tail.mp3"
    subprocess.run(["npx", "remotion", "ffmpeg", "-y", "-ss", str(start_sec), "-i", mp3,
                    "-c", "copy", tail], capture_output=True, text=True, check=True)
    return tail


def ts(sec):
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mp3_file")
    ap.add_argument("output_srt")
    ap.add_argument("--json", default=None)
    ap.add_argument("--lang", default="heb")
    ap.add_argument("--env", default=os.path.join(os.getcwd(), ".env"))
    args = ap.parse_args()

    key = load_key(args.env)
    duration = probe_duration(args.mp3_file)
    print(f"audio duration: {duration}s")

    words = words_of(scribe(args.mp3_file, key, args.lang))
    print(f"first pass: {len(words)} words, last end {words[-1]['end'] if words else 0:.2f}s")

    # detect truncation: transcript ends >5s before the audio actually ends
    while duration and words and (duration - words[-1]["end"]) > 5.0:
        seam = words[-1]["end"] - 5.0  # small overlap to avoid losing words at the cut
        print(f"  truncated — re-transcribing tail from {seam:.2f}s")
        tail = cut_tail(args.mp3_file, seam)
        tail_words = words_of(scribe(tail, key, args.lang), offset=seam)
        os.remove(tail)
        if not tail_words:
            break
        words = [w for w in words if w["start"] < seam] + tail_words
        print(f"  merged: {len(words)} words, last end {words[-1]['end']:.2f}s")

    # split into cues on punctuation
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
    with open(args.output_srt, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"✓ SRT: {len(cues)} cues -> {args.output_srt}")

    if args.json:
        json.dump({"words": words}, open(args.json, "w", encoding="utf-8"),
                  ensure_ascii=False, indent=1)
        print(f"✓ merged word JSON -> {args.json}")


if __name__ == "__main__":
    main()
