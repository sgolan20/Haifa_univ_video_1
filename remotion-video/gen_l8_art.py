#!/usr/bin/env python3
import json, sys, time, urllib.request, subprocess, os

TOKEN = subprocess.check_output("grep REPLICATE_API_TOKEN /Users/sgolan20/DEV/Haifa_univ_video_1/.env | cut -d= -f2 | tr -d '\" '", shell=True).decode().strip()
OUT = "/Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video/public/lesson8-lecture1/images"
HDR = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json", "Prefer": "wait"}

def post(prompt, ar):
    body = json.dumps({"input": {"prompt": prompt, "aspect_ratio": ar, "quality": "low",
        "moderation": "low", "input_fidelity": "low", "output_format": "png",
        "number_of_images": 1, "background": "opaque"}}).encode()
    req = urllib.request.Request("https://api.replicate.com/v1/models/openai/gpt-image-2/predictions", data=body, headers=HDR)
    return json.loads(urllib.request.urlopen(req).read().decode(), strict=False)

def geturl(d):
    o = d.get("output")
    return (o[0] if isinstance(o, list) and o else o) or ""

def gen(name, prompt, ar="1:1"):
    d = post(prompt, ar)
    url = geturl(d)
    if not url:
        pid = d.get("id")
        for _ in range(40):
            time.sleep(3)
            req = urllib.request.Request(f"https://api.replicate.com/v1/predictions/{pid}", headers={"Authorization": f"Bearer {TOKEN}"})
            d = json.loads(urllib.request.urlopen(req).read().decode(), strict=False)
            if d.get("status") == "succeeded":
                url = geturl(d); break
            if d.get("status") in ("failed", "canceled"):
                print(f"  FAILED {name}: {d.get('error')}"); return
    if url:
        urllib.request.urlretrieve(url, f"{OUT}/{name}.png")
        print(f"  OK {name} ({os.path.getsize(f'{OUT}/{name}.png')}b)")
    else:
        print(f"  NO URL {name}")

ICON = "Minimalist glowing line-art icon, centered, on a flat solid dark navy #0a0e1a background, soft neon glow, purple and turquoise tones, no text no letters no words, clean simple symbol, high quality."
JOBS = [
  ("shot3_side", "A vertical illustration: a warm colorful vivid glowing human voice waveform at the top, full of character (turquoise, amber, magenta), gradually flattening and fading downward into a dull uniform flat grey line — a unique personal voice being smoothed into generic. Cinematic, subtle, flat solid dark navy #0a0e1a background, no text no letters no numbers, portrait.", "2:3"),
  ("ic_words",  "glowing speech bubble containing abstract word marks / typography blocks, choosing words. " + ICON, "1:1"),
  ("ic_example","glowing lightbulb with a small spark, an example or idea. " + ICON, "1:1"),
  ("ic_rhythm", "glowing equalizer sound bars of varying heights, rhythm of sentences. " + ICON, "1:1"),
  ("ic_direct", "glowing straight bold arrow pointing forward, directness. " + ICON, "1:1"),
  ("ic_hesitate","glowing pause symbol with a small question mark, hesitation. " + ICON, "1:1"),
  ("ic_humor",  "glowing smiling face / wink, humor and warmth. " + ICON, "1:1"),
  ("shot11_side", "A glowing fingerprint made of flowing handwritten text lines and a personal signature, representing a unique personal writing-style profile, turquoise and purple neon glow, cinematic and subtle, flat solid dark navy #0a0e1a background, no readable text no letters no words, wide composition.", "3:2"),
  ("shot14_side", "Two glowing document panels side by side being compared, with a few highlighted changed lines connected by subtle arrows — a version changelog / edit diff, amber and turquoise neon glow, cinematic and subtle, flat solid dark navy #0a0e1a background, no readable text no letters no words, wide composition.", "3:2"),
]
for name, prompt, ar in JOBS:
    print(f"=== {name} ===")
    gen(name, prompt, ar)
print("DONE")
