---
name: talking-head-intro
description: Create a 720p lip-synced talking-head intro clip for a Haifa University Remotion video using VEED Fabric 1.0 (image-to-video) on Replicate. Lip-syncs the fixed Haifa University character image to the first ~5-10s (first sentence) of a video's narration, then wires it in as a muted intro overlay over shot1 that hands off to the title card. Use when the user asks to create/add/replace the intro talking head (the robotic narrator) for any video/lesson, or to upgrade an existing low-res intro to 720p.
argument-hint: "<target video/lesson id, e.g. lesson3-lecture1> (and optional cut seconds)"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Talking-Head Intro (VEED Fabric 1.0 lip-sync)

Generate the opening talking-head clip where the Haifa University AI character "speaks"
the first sentence of a video, lip-synced to the existing narration, at **720p**.

## Fixed inputs (project standard)

- **Character image (always this one):** `assets/דמות אוניברסיטת חיפה.jpeg` — the half-robot / half-human University of Haifa presenter on a black background (already 16:9).
- **Model:** `veed/fabric-1.0` on Replicate (image + audio → talking video). Inputs: `image` (uri), `audio` (uri), `resolution` (`480p`|`720p`). Output: an mp4 (~25fps, lip-synced, with the supplied audio muxed in).
- **API key:** `REPLICATE_API_TOKEN` in the project `.env`.
- **No system ffmpeg** — the bundled script runs `npx remotion ffmpeg` from `remotion-video/`.

## How it works

The narration `full_narration.mp3` plays continuously under the video. The talking-head
clip is overlaid **muted** over the start of `shot1` (frames `0 → INTRO_END_FRAME`) and
because it is lip-synced to that exact audio slice, the lips match the narration. It fades
into the title card right as the second sentence begins.

## Steps

### 1. Pick the cut point (where the intro hands off)
Read the video's SRT (`remotion-video/public/<id>/audio/full_narration.srt`) and find the
transition: the start of the first cue after the opening sentence(s), typically **5-10s** in.
The clip should be ~5-10s. You can let the script auto-detect (`--srt`), or pass `--seconds`
explicitly if you want a specific boundary.

### 2. Run the generator (extract audio → upload → fabric → download)
```bash
python3 .claude/skills/talking-head-intro/scripts/make_talking_head.py \
  remotion-video/public/<id>/audio/full_narration.mp3 \
  remotion-video/public/<id>/video/intro_talking_head.mp4 \
  --srt remotion-video/public/<id>/audio/full_narration.srt
```
Flags: `--seconds <float>` (explicit cut, overrides `--srt`), `--min/--max` (auto-detect window, default 5–10s), `--resolution 720p` (default), `--image <path>` (default is the fixed character), `--env <path>`.

The script extracts `0 → cut` from the narration, uploads the image + audio to Replicate,
runs Fabric (`Prefer: wait` + polls ~2-3 min), downloads the mp4, and prints the recommended
`INTRO_END_FRAME = round(cut * 30)`.

### 3. Wire it into the video's `FullVideo.tsx`
Overlay the clip (muted `OffthreadVideo`) over `shot1`, fading out into the title at the cut:
```tsx
const INTRO_END_FRAME = <from script output>; // round(cut * 30)
// inside the AbsoluteFill, after the shots:
<Sequence from={0} durationInFrames={INTRO_END_FRAME} name="intro-talking-head">
  <OffthreadVideo src={staticFile("<id>/video/intro_talking_head.mp4")} muted
    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</Sequence>
```
- If the video already has an intro overlay (e.g. `intro_overlay.mp4` / a `HAS_INTRO_TALKING_HEAD` flag), just **replace the mp4 file** and keep the existing `INTRO_END_FRAME` (it tracks the narration transition, not the clip length). For lesson3-lecture1 set `HAS_INTRO_TALKING_HEAD = true`.
- Fade pattern: `interpolate(frame, [INTRO_END_FRAME - 9, INTRO_END_FRAME], [1, 0], {extrapolateLeft:"clamp", extrapolateRight:"clamp"})`.

### 4. Verify
`npx tsc --noEmit`, then render a still mid-intro to confirm the talking head shows:
```bash
cd remotion-video && npx remotion still src/index.ts full-<id> /tmp/intro.png --frame=60 --gl=angle
```

## Notes
- Resolution is **720p** per project standard (the comp is 1920×1080; the 1312×736 clip upscales with `objectFit: cover`). Fabric is 25fps; `OffthreadVideo` resamples to the 30fps comp by time, so sync holds.
- The clip is muted in the comp — the synced `full_narration.mp3` is the only audio. Do not unmute.
- Replicate JSON responses include a `logs` field with control characters; parse with `json.loads(..., strict=False)` (the script already does).
