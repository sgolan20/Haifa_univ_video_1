# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **university course content production** project for Haifa University. The project creates educational video content about Generative AI topics, specifically lectures about Large Language Models (LLMs).

The first lecture video (~6:12 min) explains "What is a Language Model (LLM)?" — covering prediction principle, LLM components, comparison to search engines, creativity & sampling, and summary.

## Production Pipeline

### 1. Text-to-Speech (TTS) — ElevenLabs
- **Model**: `eleven_v3` (supports Hebrew)
- **Voice**: Sarah (`EXAVITQu4vr4xnSDxMaL`) — female, mature, reassuring
- **Language code**: `he`
- **API key**: stored in `.env` as `ELEVENLABS_API_KEY`
- **Endpoint**: `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`
- **Voice settings**: `stability: 0.5`, `similarity_boost: 0.75`
- **Important**: Hebrew text must be sent via a JSON file (`-d @file.json`), not inline in curl, to avoid UTF-8 encoding issues on Windows
- **Plan**: Free tier (10,000 characters/month)
- Long texts may get cut off — split into segments and generate separately

### 2. Lip Sync (Image → Video) — Freepik / Fabric 1.0
- **Input**: Still image of a woman + MP3 audio
- **Output**: Video with synchronized lip movements
- Used for talking-head segments (shots 1, 17, 29 in the script)

### 3. Video Production — Remotion
- **Framework**: Remotion v4 (React + TypeScript)
- **Project location**: `remotion-video/`
- **Resolution**: 1920×1080, 30fps
- **Font**: Rubik (via `@remotion/google-fonts`) — used for both Hebrew and English
- **Direction**: RTL (`dir="rtl"`)

## Project Structure

```
haifa_univ_1/
├── .env                          # ELEVENLABS_API_KEY
├── .gitignore                    # excludes .env
├── CLAUDE.md                     # this file
├── טקסט לקריינות 1.docx          # narration text (Hebrew)
├── תסריט לסרטון 1.docx           # original storyboard (AI video based)
├── תסריט remotion.md             # adapted storyboard for Remotion
├── output.mp3                    # TTS — intro segment
├── output2.mp3                   # TTS — lecture part 1
├── output3.mp3                   # TTS — lecture part 2
├── fix.mp3                       # TTS — re-recorded sentences
├── fix2.mp3                      # TTS — single re-recorded sentence
├── GFX/
│   └── Haifa_logo_official_apperence_dark_(cropped).png  # dark logo (PNG with transparency)
└── remotion-video/               # Remotion project
    ├── package.json
    ├── tsconfig.json
    ├── public/
    │   └── images/
    │       └── haifa-logo.png    # copy of university logo
    ├── src/
    │   ├── index.ts              # registerRoot
    │   ├── Root.tsx              # Composition definitions
    │   ├── design/
    │   │   ├── theme.ts          # colors (bgPrimary, primary, secondary, accent, etc.)
    │   │   ├── fonts.ts          # Rubik font loader (weights 300-800, hebrew+latin)
    │   │   ├── Background.tsx    # dark gradient + dot grid + floating particles
    │   │   └── Logo.tsx          # university logo (inverted to white via CSS filter)
    │   └── scenes/
    │       ├── Shot1_1.tsx       # Opening title "מהו מודל שפה?" (4s)
    │       ├── Shot1_2.tsx       # Neural network animation + LLM reveal (12s)
    │       └── Shot1_3.tsx       # Chat interface mockup + typewriter (15s)
    └── out/                      # rendered MP4 files
        ├── shot1_1.mp4
        ├── shot1_2.mp4
        └── shot1_3.mp4
```

## Remotion Commands

```bash
cd remotion-video

# Preview in browser
npx remotion studio src/index.ts

# Render specific shot
npx remotion render src/index.ts shot1-1 out/shot1_1.mp4 --codec h264

# Composition IDs use hyphens (not underscores): shot1-1, shot1-2, shot1-3
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
- The script (`תסריט remotion.md`) contains 9 scenes / 29 shots with detailed animation descriptions per shot
