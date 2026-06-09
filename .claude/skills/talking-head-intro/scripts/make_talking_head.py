#!/usr/bin/env python3
"""
Create a 720p lip-synced talking-head intro clip with VEED Fabric 1.0 (Replicate).

Pipeline: take the first ~5-10s of a video's narration, lip-sync the Haifa
University character image to that audio, and download the result mp4.

Usage:
  python3 make_talking_head.py <narration_mp3> <output_mp4> [options]

Options:
  --srt PATH         SRT for auto-detecting the intro cut point (the gap before the
                     first cue that starts at >= --min seconds, capped at --max).
  --seconds FLOAT    Explicit cut point in seconds (overrides --srt auto-detection).
  --min FLOAT        Earliest allowed cut for auto-detection (default 5.0).
  --max FLOAT        Latest allowed cut for auto-detection (default 10.0).
  --image PATH       Character image (default: assets/דמות אוניברסיטת חיפה.jpeg).
  --resolution STR   480p | 720p (default 720p).
  --env PATH         .env holding REPLICATE_API_TOKEN (default <project>/.env).

The project root is inferred from the .env directory; `npx remotion ffmpeg`
(no system ffmpeg) is run from <project>/remotion-video. Prints the recommended
INTRO_END_FRAME = round(cut * 30) for wiring into FullVideo.tsx.
"""
import argparse, json, os, re, subprocess, sys, time, urllib.request

API_MODEL = "veed/fabric-1.0"
DEFAULT_IMAGE = "assets/דמות אוניברסיטת חיפה.jpeg"


def load_token(env_path):
    for line in open(env_path, encoding="utf-8"):
        if line.startswith("REPLICATE_API_TOKEN="):
            return line.split("=", 1)[1].strip().strip('"').strip()
    sys.exit("REPLICATE_API_TOKEN not found in " + env_path)


def srt_cut(srt_path, lo, hi):
    """Cut point = midpoint of the silence gap before the first cue that starts >= lo
    (capped at hi). Falls back to hi if none found."""
    times = []  # (start, end) per cue, seconds
    def ts(s):
        h, m, rest = s.split(":")
        sec, ms = rest.split(",")
        return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000
    for m in re.finditer(r"(\d\d:\d\d:\d\d,\d+)\s*-->\s*(\d\d:\d\d:\d\d,\d+)", open(srt_path, encoding="utf-8").read()):
        times.append((ts(m.group(1)), ts(m.group(2))))
    times.sort()
    for i, (st, en) in enumerate(times):
        if st >= lo:
            prev_end = times[i - 1][1] if i > 0 else st
            cut = (prev_end + st) / 2 if st <= hi else hi
            return min(cut, hi)
    return hi


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("narration_mp3")
    ap.add_argument("output_mp4")
    ap.add_argument("--srt", default=None)
    ap.add_argument("--seconds", type=float, default=None)
    ap.add_argument("--min", type=float, default=5.0)
    ap.add_argument("--max", type=float, default=10.0)
    ap.add_argument("--image", default=None)
    ap.add_argument("--resolution", default="720p", choices=["480p", "720p"])
    ap.add_argument("--env", default=None)
    a = ap.parse_args()

    narration = os.path.abspath(a.narration_mp3)
    output = os.path.abspath(a.output_mp4)

    # locate project root via .env, then remotion-video for npx remotion ffmpeg
    env_path = os.path.abspath(a.env) if a.env else None
    if not env_path:
        d = os.path.dirname(narration)
        while d != "/" and not os.path.exists(os.path.join(d, ".env")):
            d = os.path.dirname(d)
        env_path = os.path.join(d, ".env")
    root = os.path.dirname(env_path)
    remotion_dir = os.path.join(root, "remotion-video")
    image = os.path.abspath(a.image) if a.image else os.path.join(root, DEFAULT_IMAGE)
    if not os.path.exists(image):
        sys.exit("image not found: " + image)

    token = load_token(env_path)

    # 1) determine cut point
    if a.seconds is not None:
        cut = a.seconds
    elif a.srt:
        cut = srt_cut(os.path.abspath(a.srt), a.min, a.max)
    else:
        sys.exit("provide --seconds or --srt")
    print(f"cut point: {cut:.2f}s  (INTRO_END_FRAME = {round(cut * 30)} @30fps)")

    # 2) extract intro audio with npx remotion ffmpeg (run from remotion-video)
    clip = os.path.join(os.path.dirname(output), "_intro_audio.mp3")
    os.makedirs(os.path.dirname(output), exist_ok=True)
    r = run(["npx", "remotion", "ffmpeg", "-y", "-t", f"{cut:.3f}", "-i", narration,
             "-ar", "44100", "-ac", "1", "-c:a", "libmp3lame", "-b:a", "128k", clip], cwd=remotion_dir)
    if not os.path.exists(clip):
        sys.exit("ffmpeg extract failed:\n" + r.stderr[-800:])
    print(f"✓ extracted intro audio -> {clip}")

    # 3) upload image + audio to Replicate Files API
    def upload(path):
        r = run(["curl", "-s", "-X", "POST", "https://api.replicate.com/v1/files",
                 "-H", f"Authorization: Bearer {token}", "-F", f"content=@{path}"])
        return json.loads(r.stdout)["urls"]["get"]
    img_url = upload(image)
    aud_url = upload(clip)
    print(f"✓ uploaded image + audio")

    # 4) create prediction
    payload = json.dumps({"input": {"image": img_url, "audio": aud_url, "resolution": a.resolution}})
    req = urllib.request.Request(
        f"https://api.replicate.com/v1/models/{API_MODEL}/predictions",
        data=payload.encode(), method="POST",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json", "Prefer": "wait"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        pred = json.loads(resp.read().decode(), strict=False)
    pid = pred["id"]
    print(f"✓ prediction {pid} ({pred['status']}) — polling...")

    # 5) poll
    out_url = None
    for _ in range(40):
        if pred["status"] == "succeeded":
            out_url = pred["output"]
            break
        if pred["status"] in ("failed", "canceled"):
            sys.exit("prediction " + pred["status"] + ": " + str(pred.get("error")))
        time.sleep(15)
        req = urllib.request.Request(f"https://api.replicate.com/v1/predictions/{pid}",
                                     headers={"Authorization": f"Bearer {token}"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            pred = json.loads(resp.read().decode(), strict=False)  # logs may contain control chars
    if not out_url:
        sys.exit("no output url; last status: " + pred.get("status", "?"))

    # 6) download
    urllib.request.urlretrieve(out_url, output)
    os.remove(clip)
    print(f"✓ downloaded -> {output}")

    # 7) probe
    r = run(["npx", "remotion", "ffmpeg", "-i", output], cwd=remotion_dir)
    info = re.search(r"Duration: [^,]+.*?Video: [^\n]+", r.stderr + r.stdout, re.S)
    if info:
        print(info.group(0)[:200])
    print(f"\nDONE. Wire it in: set the intro overlay src to this mp4 and "
          f"INTRO_END_FRAME = {round(cut * 30)} (30fps).")


if __name__ == "__main__":
    main()
