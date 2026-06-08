---
name: narration-pipeline
description: Turn a Hebrew narration text file (.docx/.txt) into a synced voiceover for the Remotion videos using ElevenLabs. Splits text into <3000-char segments on sentence boundaries, synthesizes with the Sarah voice (eleven_v3), concatenates to full_narration.mp3, and optionally builds a word-timed SRT via ElevenLabs Scribe. Use when the user provides a narration script and asks to create the voiceover / audio / timings.
argument-hint: "<input text file> and target video id (e.g. lesson2-lecture1)"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Narration Pipeline (text → ElevenLabs voiceover → SRT)

Produce the spoken narration for a Haifa University Remotion video from a text script.

**Voice/model defaults (project standard):** Sarah `EXAVITQu4vr4xnSDxMaL`, model `eleven_v3`, Hebrew. API key in project `.env` as `ELEVENLABS_API_KEY`. There is **no system ffmpeg** — always use `npx remotion ffmpeg`.

## Inputs to confirm before running

1. **Source text file** — a `.docx` or `.txt` (e.g. under `docs/`). 
2. **Target video id** — e.g. `lesson2-lecture1`, `video2b`. Output goes to `remotion-video/public/<id>/audio/`.
3. **Skip a title line?** — `.docx` scripts in this project usually start with a heading paragraph that is NOT narrated. If so, use `--skip-first-paragraph`.

## Step 1 — Generate the voiceover

Run the bundled generator. It extracts paragraphs, groups them into segments under the limit **breaking only on paragraph/sentence boundaries**, calls ElevenLabs per segment, and concatenates.

```bash
cd /Users/sgolan20/DEV/Haifa_univ_video_1
python3 .Codex/skills/narration-pipeline/scripts/generate_narration.py \
  "docs/<script>.docx" \
  "remotion-video/public/<id>/audio" \
  --skip-first-paragraph
```

Produces `segments/seg1.mp3 …` plus `full_narration.mp3` in the audio dir.
Useful flags: `--limit 2800` (chars/segment), `--no-concat` (segments only), `--voice`, `--model`.

> **Why split at 3000 chars:** `eleven_v3` silently truncates a single TTS request above ~3000 characters. Splitting on sentence boundaries keeps each request safe and lets the pieces concatenate cleanly. See [reference.md](reference.md).

## Step 2 — Fix mispronunciations (only if needed)

Hebrew homographs can be voiced wrong (e.g. **לאמת** read as *emet/true* instead of *le'amet/to verify*). Fix by **adding niqqud to the offending word in the source text** — e.g. `לְאַמֵּת` — then regenerate just that segment. To regenerate one sentence into a standalone file, write the corrected sentence to a temp `.txt` and run the generator with `--no-concat` into a scratch dir, or call the ElevenLabs endpoint directly. Niqqud forces the correct reading. Alternatively reword to an unambiguous form (e.g. `לאימות`).

## Step 3 — Build the timed SRT (optional)

Get word-level timestamps and a sentence/half-sentence SRT. Handles Scribe truncating long files (it re-transcribes the tail and merges).

```bash
cd /Users/sgolan20/DEV/Haifa_univ_video_1
python3 .Codex/skills/narration-pipeline/scripts/build_srt.py \
  "remotion-video/public/<id>/audio/full_narration.mp3" \
  "remotion-video/public/<id>/audio/full_narration.srt" \
  --json "whisper_<id>.json"
```

The `--json` output is the merged word list used to derive `timing.ts` shot boundaries.

## Step 4 — Wire into the timeline

- Update `remotion-video/src/<id>/timing.ts` so the total duration matches the new audio (probe with `npx remotion ffmpeg -i <mp3>`).
- `FullVideo.tsx` plays it via `<Audio src={staticFile("<id>/audio/full_narration.mp3")} />`.

## Bundled files

- [`scripts/generate_narration.py`](scripts/generate_narration.py) — text → segments → mp3 (+ concat)
- [`scripts/build_srt.py`](scripts/build_srt.py) — mp3 → Scribe STT → merged words + SRT
- [`reference.md`](reference.md) — ElevenLabs TTS/Scribe API details, limits, gotchas
