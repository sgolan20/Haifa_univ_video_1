# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **university course content production** project for Haifa University. The project creates educational video content about Generative AI topics, specifically lectures about Large Language Models (LLMs).

**Lecture 1** (~6:20 min) — "What is a Language Model (LLM)?" — covering prediction principle, LLM components, comparison to search engines, creativity & sampling, and summary. **Status: COMPLETE.**

## Production Pipeline

### 1. Text-to-Speech (TTS) — ElevenLabs
- **Model**: `eleven_v3` (supports Hebrew)
- **Voice**: Sarah (`EXAVITQu4vr4xnSDxMaL`) — female, mature, reassuring
- **Language code**: `he`
- **API key**: stored in `.env` as `ELEVENLABS_API_KEY`
- **Endpoint**: `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`
- **Voice settings**: `stability: 0.5`, `similarity_boost: 0.75`
- **Important**: Hebrew text must be sent via a JSON file (`-d @file.json`), not inline in curl, to avoid UTF-8 encoding issues on Windows
- Long texts may get cut off — split into segments and generate separately

### 2. Lip Sync (Image → Video) — Freepik / Fabric 1.0
- **Input**: Still image of a woman + MP3 audio
- **Output**: 720p video (1312×736, 25fps) with synchronized lip movements
- Used for the narrator talking-head segment (shot1-1, first 14 seconds)
- Video is muted in Remotion; audio comes from the narration track

### 3. Video Production — Remotion
- **Framework**: Remotion v4 (React + TypeScript)
- **Project location**: `remotion-video/`
- **Resolution**: 1920×1080, 30fps
- **Font**: Rubik (via `@remotion/google-fonts`) — used for both Hebrew and English
- **Direction**: RTL (`dir="rtl"`)

### 4. Background Music — Suno AI
- **Generated with**: Suno AI (instrumental, ambient electronic)
- **Track**: "Through Circuits and Sunlight"
- **Processing**: Two copies crossfaded (5s, exp curve) via ffmpeg, trimmed to 380s, 3s fade out
- **Volume**: 0.10 (~20dB below narration) — professional standard for voice-over

### 5. Audio Sync — OpenAI Whisper
- **Model**: Whisper small (Hebrew)
- **Purpose**: Word-level timestamps for syncing narration to shot boundaries
- **Output**: JSON files with word timestamps (whisper_shot*.json)

## Project Structure

```
Haifa_univ_video_1/
├── .env                          # ELEVENLABS_API_KEY
├── .gitignore
├── CLAUDE.md                     # this file
├── docs/                         # Scripts & narration
│   ├── טקסט לקריינות 1.docx      # narration text (Hebrew)
│   ├── תסריט לסרטון 1.docx       # original storyboard
│   └── תסריט remotion.md         # adapted storyboard for Remotion
├── assets/                       # Images & logos
│   └── haifa-logo.png
├── tts/                          # ElevenLabs API caches (gitignored)
├── audio/                        # TTS output audio (gitignored)
├── whisper_shot*.json            # Whisper timestamp data
└── remotion-video/               # Remotion project (see its own CLAUDE.md)
```

## Remotion Commands

```bash
cd remotion-video

# Preview in browser
npm run studio

# Render full video (optimized)
npx remotion render src/index.ts full-video out/full_video.mp4 --codec h264 --concurrency=16 --gl=angle

# Render specific shot
npx remotion render src/index.ts shot1-1 out/shot1_1.mp4 --codec h264

# Composition IDs use hyphens (not underscores): shot1-1, shot1-3, shot2-1, etc.
```

## Design System

| Token | Value |
|---|---|
| Background | `#0a0e1a` → `#111827` radial gradient |
| Primary | `#00d4ff` (turquoise) |
| Secondary | `#8b5cf6` (purple) |
| Accent | `#fbbf24` (gold) |
| Warning | `#ef4444` (red) |
| Text | `#ffffff` / `#94a3b8` (muted) |

- Background includes: dot grid, floating particles (turquoise/purple/blue)
- Logo: dark PNG inverted to white via `filter: brightness(0) invert(1)`, positioned top-left at 50% opacity
- Animations: driven by `useCurrentFrame()` + `spring()` / `interpolate()` — never CSS transitions

## Key Technical Notes

- Composition IDs must only contain `a-z, A-Z, 0-9, -` (no underscores)
- Font loading: limit to specific weights/subsets to avoid excessive network requests
- All Hebrew text uses `direction: "rtl"` and `text-align: "right"`
- RTL `direction` must be on a block-level container (`div`), not on inline `span` elements
- The script (`docs/תסריט remotion.md`) contains 9 scenes / 29 shots with detailed animation descriptions per shot
- Shot1_1 uses `<Video>` (narrator talking head) — all other shots are pure React/SVG animations
- In Scene 7, shots 7.5 and 7.4 are swapped in playback order to match narration flow
