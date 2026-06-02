#!/usr/bin/env python3
"""Generate ElevenLabs narration for lesson2-lecture1, split into <3000-char segments at paragraph boundaries."""
import os, re, json, sys, zipfile, urllib.request, urllib.error

ROOT = "/Users/sgolan20/DEV/Haifa_univ_video_1"
DOCX = os.path.join(ROOT, "docs", "שיעור 2 הרצאה 1 (1).docx")
OUTDIR = os.path.join(ROOT, "remotion-video", "public", "lesson2-lecture1", "audio")
VOICE_ID = "EXAVITQu4vr4xnSDxMaL"  # Sarah
MODEL_ID = "eleven_v3"

# --- load API key from .env ---
key = None
with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
    for line in f:
        if line.startswith("ELEVENLABS_API_KEY="):
            key = line.split("=", 1)[1].strip()
if not key:
    sys.exit("ELEVENLABS_API_KEY not found in .env")

# --- extract narration paragraphs (skip title) ---
with zipfile.ZipFile(DOCX) as z:
    xml = z.read("word/document.xml").decode("utf-8")
paras = []
for p in re.split(r"</w:p>", xml):
    texts = re.findall(r"<w:t[^>]*>(.*?)</w:t>", p)
    line = ("".join(texts).replace("&amp;", "&").replace("&quot;", '"')
            .replace("&lt;", "<").replace("&gt;", ">").replace("&#39;", "'").strip())
    if line:
        paras.append(line)
body = paras[1:]  # drop title

# --- split into segments under the limit, on paragraph boundaries ---
LIMIT = 2800
segments, cur = [], ""
for p in body:
    candidate = (cur + " " + p).strip()
    if len(candidate) > LIMIT and cur:
        segments.append(cur)
        cur = p
    else:
        cur = candidate
if cur:
    segments.append(cur)

print(f"Total chars: {sum(len(p) for p in body)} | segments: {len(segments)}")
for i, s in enumerate(segments, 1):
    print(f"  seg{i}: {len(s)} chars")

os.makedirs(OUTDIR, exist_ok=True)

# --- call ElevenLabs TTS per segment ---
for i, seg in enumerate(segments, 1):
    payload = json.dumps({
        "text": seg,
        "model_id": MODEL_ID,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
    }).encode("utf-8")
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}?output_format=mp3_44100_128"
    req = urllib.request.Request(url, data=payload, method="POST", headers={
        "xi-api-key": key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    })
    out = os.path.join(OUTDIR, f"seg{i}.mp3")
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            data = resp.read()
        with open(out, "wb") as fo:
            fo.write(data)
        print(f"✓ seg{i} -> {out} ({len(data)} bytes)")
    except urllib.error.HTTPError as e:
        sys.exit(f"✗ seg{i} HTTP {e.code}: {e.read().decode('utf-8', 'replace')}")
    except Exception as e:
        sys.exit(f"✗ seg{i} error: {e}")
