---
name: add-background-music
description: Generate an ambient instrumental background-music track for a finished Remotion video with the ElevenLabs Music API, and mix it UNDER the narration in FullVideo.tsx — low volume, fade in/out, matched to the full video length. The musical mood is tailored to what the video is about (e.g. a calm futuristic "AI" ambience for an AI-literacy lesson). Use when the user asks to add background music / a soundtrack / ambience to a video.
argument-hint: "target video id (e.g. lesson2-lecture1, video2b)"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Add Background Music (topic-aware ambient bed → mixed under narration)

Add a subtle instrumental soundtrack to a finished Haifa University Remotion video.
The music should set the mood but **never** pull attention from the narration — an
ambient bed sitting ~20 dB below the voice, fading in at the start and out at the end.

**API:** `POST https://api.elevenlabs.io/v1/music`, model `music_v1`, `force_instrumental`.
Key in project `.env` as `ELEVENLABS_API_KEY`. Length must be 3000–600000 ms (3s–10min).
There is **no system ffmpeg** — probe durations with `npx remotion ffmpeg -i <file>`
(though `ffprobe` may also be present).

## Step 1 — Determine the exact video length

The music length must equal the full video duration so it covers every shot. Get the
total frames from the video's `timing.ts` and divide by `FPS`:

```bash
cd /Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video
npx tsx -e "import {TOTAL_DURATION_FRAMES, FPS} from './src/<id>/timing'; console.log(TOTAL_DURATION_FRAMES, FPS, (TOTAL_DURATION_FRAMES/FPS).toFixed(3));"
```

If `tsx` is unavailable, just sum the `durationInFrames` of every shot in `SHOT_ORDER`
by hand (each is `Math.round(duration*FPS)`) — the sum ÷ FPS is the length in seconds.
Convert to ms for `--length-ms`. Example for `lesson2-lecture1`: 8355 frames / 30 = 278.5s → `278500`.

## Step 2 — Craft a topic-appropriate prompt

Read the storyboard / narration so the mood fits the subject. Keep it **instrumental,
ambient, minimal, no drums, no strong melody** — explicitly say it should sit under a
spoken narration. Tailor the *flavour* to the topic:

- AI / tech lessons → "futuristic, high-tech AI atmosphere, soft evolving synth pads,
  subtle shimmering arpeggios, ethereal, contemplative, modern".
- History / humanities → warm acoustic pads, soft piano, gentle strings.
- Keep one sentence of *function* ("designed to sit quietly underneath a spoken
  narration as background ambience; slow, steady, unobtrusive").

## Step 3 — Generate the track

```bash
cd /Users/sgolan20/DEV/Haifa_univ_video_1
python3 .claude/skills/add-background-music/scripts/generate_music.py \
  "remotion-video/public/<id>/audio/background_music.mp3" \
  --length-ms <TOTAL_MS> \
  --prompt "Ambient instrumental background music with a <topic mood>. <texture words>. No drums, no beats, no strong melody that draws attention. Designed to sit quietly underneath a spoken narration as background ambience. Slow, steady, unobtrusive."
```

Then verify it matches the video length:

```bash
npx remotion ffmpeg -i remotion-video/public/<id>/audio/background_music.mp3 2>&1 | grep Duration
```

The generated track is exactly `music_length_ms` long, so no trimming is normally
needed. If it ever comes back longer than the video, rely on the fade-out in Step 4
(the `<Audio>` is clamped to the composition length automatically).

## Step 4 — Mix it under the narration in FullVideo.tsx

In `remotion-video/src/<id>/FullVideo.tsx`, add a second `<Audio>` next to the narration,
with a **volume function** that fades in over the first ~1s and out over the closing
shot. Import `TOTAL_DURATION_FRAMES` from `./timing` and `interpolate` from `remotion`:

```tsx
{/* Ambient background music — subtle, ~20dB under narration. */}
<Audio
  src={staticFile("<id>/audio/background_music.mp3")}
  volume={(f) =>
    interpolate(
      f,
      [0, 30, TOTAL_DURATION_FRAMES - 75, TOTAL_DURATION_FRAMES],
      [0, 0.09, 0.09, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  }
/>
```

- **Volume `0.09`** is the project standard for music under narration (≈20 dB down;
  Video 1 used `0.10`). Nudge down if the user finds it intrusive.
- Fade-in `[0,30]` (1s) and fade-out over the last `75` frames (2.5s) land the music
  gently and let it duck out over the closing logo shot.

## Step 5 — Verify

`npx tsc --noEmit`, then open `full-<id>` in `npm run studio` and listen. Confirm the
music is audible but clearly subordinate to the voice, and that it fades out cleanly at
the end. Offer to adjust the volume or regenerate with a different mood.

## Bundled files

- [`scripts/generate_music.py`](scripts/generate_music.py) — prompt + length → instrumental mp3 via the ElevenLabs Music API.
