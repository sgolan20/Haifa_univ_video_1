#!/usr/bin/env python3
"""
Generate ElevenLabs narration from a text file (.docx or .txt).

Splits the text into segments under a character limit, breaking ONLY on
paragraph/sentence boundaries (never mid-sentence), synthesizes each segment
with ElevenLabs TTS, and concatenates them into one full_narration.mp3.

Usage:
  python3 generate_narration.py <input_file> <output_dir> [options]

Options:
  --skip-first-paragraph   Drop paragraph 1 (e.g. a document title) before synthesis.
  --limit N                Max characters per segment (default 2800; eleven_v3 caps ~3000).
  --voice ID               ElevenLabs voice id (default Sarah EXAVITQu4vr4xnSDxMaL).
  --model ID               ElevenLabs model id (default eleven_v3).
  --no-concat              Keep segments only; do not build full_narration.mp3.
  --env PATH               .env file holding ELEVENLABS_API_KEY (default ./.env).

Output:
  <output_dir>/segments/seg1.mp3, seg2.mp3, ...
  <output_dir>/full_narration.mp3   (unless --no-concat)
"""
import argparse, json, os, re, subprocess, sys, urllib.request, urllib.error, zipfile

SARAH = "EXAVITQu4vr4xnSDxMaL"


def load_key(env_path):
    if not os.path.exists(env_path):
        sys.exit(f"env file not found: {env_path}")
    for line in open(env_path, encoding="utf-8"):
        if line.startswith("ELEVENLABS_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    sys.exit("ELEVENLABS_API_KEY not found in env file")


def extract_paragraphs(path):
    """Return a list of non-empty paragraph strings from a .docx or .txt file."""
    if path.lower().endswith(".docx"):
        with zipfile.ZipFile(path) as z:
            xml = z.read("word/document.xml").decode("utf-8")
        paras = []
        for p in re.split(r"</w:p>", xml):
            texts = re.findall(r"<w:t[^>]*>(.*?)</w:t>", p)
            line = ("".join(texts).replace("&amp;", "&").replace("&quot;", '"')
                    .replace("&lt;", "<").replace("&gt;", ">").replace("&#39;", "'").strip())
            if line:
                paras.append(line)
        return paras
    # plain text: split on blank lines
    raw = open(path, encoding="utf-8").read()
    return [p.strip() for p in re.split(r"\n\s*\n", raw) if p.strip()]


def split_segments(paragraphs, limit):
    """Group paragraphs into segments under `limit` chars, never splitting a paragraph."""
    segments, cur = [], ""
    for p in paragraphs:
        candidate = (cur + " " + p).strip()
        if len(candidate) > limit and cur:
            segments.append(cur)
            cur = p
        else:
            cur = candidate
    if cur:
        segments.append(cur)
    # warn if any single paragraph still exceeds the limit (will get truncated by the API)
    for i, s in enumerate(segments, 1):
        if len(s) > limit:
            print(f"  ⚠ segment {i} is {len(s)} chars (> limit {limit}) — a single paragraph exceeds the cap; "
                  "consider splitting that paragraph in the source.")
    return segments


def tts(text, out_path, key, voice, model):
    payload = json.dumps({
        "text": text,
        "model_id": model,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
    }).encode("utf-8")
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128"
    req = urllib.request.Request(url, data=payload, method="POST", headers={
        "xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg",
    })
    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            data = resp.read()
    except urllib.error.HTTPError as e:
        sys.exit(f"✗ HTTP {e.code}: {e.read().decode('utf-8', 'replace')}")
    with open(out_path, "wb") as f:
        f.write(data)
    return len(data)


def concat(seg_paths, out_path):
    listfile = out_path + ".concat.txt"
    with open(listfile, "w", encoding="utf-8") as f:
        for p in seg_paths:
            f.write(f"file '{os.path.abspath(p)}'\n")
    # Remotion bundles ffmpeg; there is usually no system ffmpeg on this machine.
    r = subprocess.run(["npx", "remotion", "ffmpeg", "-y", "-f", "concat", "-safe", "0",
                        "-i", listfile, "-c", "copy", out_path],
                       capture_output=True, text=True)
    os.remove(listfile)
    if r.returncode != 0:
        sys.exit(f"✗ concat failed:\n{r.stderr[-800:]}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_file")
    ap.add_argument("output_dir")
    ap.add_argument("--skip-first-paragraph", action="store_true")
    ap.add_argument("--limit", type=int, default=2800)
    ap.add_argument("--voice", default=SARAH)
    ap.add_argument("--model", default="eleven_v3")
    ap.add_argument("--no-concat", action="store_true")
    ap.add_argument("--env", default=os.path.join(os.getcwd(), ".env"))
    args = ap.parse_args()

    key = load_key(args.env)
    paras = extract_paragraphs(args.input_file)
    if args.skip_first_paragraph:
        paras = paras[1:]
    if not paras:
        sys.exit("no text found in input file")

    segments = split_segments(paras, args.limit)
    total = sum(len(p) for p in paras)
    print(f"Total chars: {total} | segments: {len(segments)}")
    for i, s in enumerate(segments, 1):
        print(f"  seg{i}: {len(s)} chars")

    seg_dir = os.path.join(args.output_dir, "segments")
    os.makedirs(seg_dir, exist_ok=True)
    seg_paths = []
    for i, seg in enumerate(segments, 1):
        out = os.path.join(seg_dir, f"seg{i}.mp3")
        n = tts(seg, out, key, args.voice, args.model)
        seg_paths.append(out)
        print(f"✓ seg{i} -> {out} ({n} bytes)")

    if not args.no_concat:
        full = os.path.join(args.output_dir, "full_narration.mp3")
        concat(seg_paths, full)
        print(f"✓ concatenated -> {full}")


if __name__ == "__main__":
    main()
