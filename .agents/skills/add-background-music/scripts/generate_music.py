#!/usr/bin/env python3
"""
Generate an instrumental background-music track with the ElevenLabs Music API.

Usage:
  generate_music.py OUTPUT.mp3 --prompt "..." --length-ms 278500 [--env ./.env]
  generate_music.py OUTPUT.mp3 --prompt "..." --length-sec 278.5

The prompt should describe an *ambient, instrumental* bed that sits UNDER a
narration (see the skill SKILL.md for how to tailor it to the video's topic).
Music length must be between 3000ms and 600000ms (3s–10min).

API: POST https://api.elevenlabs.io/v1/music  (model music_v1, force_instrumental).
Key is read from a .env file holding ELEVENLABS_API_KEY=...
"""
import argparse, json, os, sys, urllib.request, urllib.error

API_URL = "https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128"
MIN_MS, MAX_MS = 3000, 600000


def load_key(env_path):
    if not os.path.exists(env_path):
        sys.exit(f"env file not found: {env_path}")
    for line in open(env_path, encoding="utf-8"):
        if line.startswith("ELEVENLABS_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    sys.exit("ELEVENLABS_API_KEY not found in env file")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("output", help="output mp3 path")
    ap.add_argument("--prompt", required=True, help="text description of the music")
    ap.add_argument("--length-ms", type=int, help="track length in milliseconds")
    ap.add_argument("--length-sec", type=float, help="track length in seconds")
    ap.add_argument("--model", default="music_v1")
    ap.add_argument("--vocals", action="store_true",
                    help="allow vocals (default: force instrumental)")
    ap.add_argument("--env", default=os.path.join(os.getcwd(), ".env"))
    args = ap.parse_args()

    if args.length_ms is None and args.length_sec is None:
        sys.exit("provide --length-ms or --length-sec")
    length_ms = args.length_ms if args.length_ms is not None else round(args.length_sec * 1000)
    if not (MIN_MS <= length_ms <= MAX_MS):
        sys.exit(f"length {length_ms}ms out of range [{MIN_MS}, {MAX_MS}]")

    key = load_key(args.env)
    payload = json.dumps({
        "prompt": args.prompt,
        "music_length_ms": length_ms,
        "model_id": args.model,
        "force_instrumental": not args.vocals,
    }).encode("utf-8")

    req = urllib.request.Request(API_URL, data=payload, method="POST", headers={
        "xi-api-key": key,
        "Content-Type": "application/json",
    })
    print(f"generating {length_ms/1000:.2f}s of music → {args.output}", file=sys.stderr)
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = resp.read()
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode('utf-8', 'replace')}")

    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
    with open(args.output, "wb") as f:
        f.write(data)
    print(f"wrote {len(data)} bytes", file=sys.stderr)


if __name__ == "__main__":
    main()
