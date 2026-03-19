# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

University course content production for **Haifa University** — educational video lectures about Generative AI topics, built with **Remotion v4** (React + TypeScript).

| Video | Topic | Duration | Status |
|-------|-------|----------|--------|
| **Video 1** | "What is a Language Model (LLM)?" | ~6:20 (380s) | COMPLETE |
| **Video 2** | Hallucinations (legacy, abandoned) | partial | LEGACY |
| **Video 2A** | "כשהמודל נשמע משכנע אבל טועה" (Hallucinations) | ~3:03 (183s) | IN PROGRESS |
| **Video 2B** | "למה מודלי שפה טועים לפעמים?" | ~2:29 (149s) | IN PROGRESS |

Video 2 is a legacy attempt replaced by Video 2A. Do not add scenes to it.

## Remotion Commands

All commands run from `remotion-video/`:

```bash
cd remotion-video

# Preview in browser (primary workflow — do NOT render to MP4 unless asked)
npm run studio

# Render full video
npx remotion render src/index.ts full-video-1 out/video1.mp4 --codec h264 --concurrency=16 --gl=angle
npx remotion render src/index.ts full-video-2a out/video2a.mp4 --codec h264 --concurrency=16 --gl=angle
npx remotion render src/index.ts full-video-2b out/video2b.mp4 --codec h264 --concurrency=16 --gl=angle

# Render single shot (prefix with video ID)
npx remotion render src/index.ts v1-shot3-2 out/v1_shot3_2.mp4 --codec h264
npx remotion render src/index.ts v2a-shot1-1 out/v2a_shot1_1.mp4 --codec h264
npx remotion render src/index.ts v2b-shot2-1 out/v2b_shot2_1.mp4 --codec h264
```

## Architecture

### Multi-Video Structure

Each video is an independent module under `remotion-video/src/`:

```
remotion-video/src/
  index.ts              # registerRoot
  Root.tsx              # All Composition definitions (Folders per video)
  design/               # Shared design system
    theme.ts            # COLORS constant
    fonts.ts            # Rubik font (hebrew+latin, weights 300-800)
    Logo.tsx            # University logo component
    Background.tsx      # Dark gradient + dot grid + particles
  video1/               # Video 1 — LLM introduction
    FullVideo.tsx       # Master sequencer (audio tracks + shot sequences)
    timing.ts           # Shot timing map (Whisper-aligned)
    scenes/Shot*.tsx    # 29 shot components
  video2/               # LEGACY — do not modify
  video2a/              # Video 2A — Hallucinations
    FullVideo.tsx
    timing.ts
    Logo2a.tsx          # Video-specific logo variant
    scenes/Shot*.tsx
  video2b/              # Video 2B — Why models err
    FullVideo.tsx
    timing.ts
    scenes/Shot*.tsx
```

### Per-Video Public Assets

```
remotion-video/public/
  images/               # Shared images (logos, reusable)
  video1/audio/         # full_narration.mp3, background_music.mp3
  video1/images/        # AI-generated background images per shot
  video1/video/         # narrator.mp4 (lip-synced talking head)
  video2a/audio/        # full_narration.mp3
  video2a/images/       # Per-shot backgrounds + logo
  video2b/audio/        # full_narration.mp3
  video2b/images/       # Per-shot backgrounds
```

### How Videos Are Composed

1. **Root.tsx** registers each video as a `<Folder>` with a `<Composition>` for the full video and individual shots
2. **FullVideo.tsx** (per video) — master sequencer: plays narration `<Audio>`, iterates `SHOT_ORDER` array, wraps each shot in a `<Sequence>` with cumulative frame offsets
3. **timing.ts** (per video) — centralized timing map: `SHOT_TIMING` record maps shot IDs to `{audioStart, duration, audioStartFrame, durationInFrames}`, derived from Whisper timestamps. `SHOT_ORDER` array defines playback sequence (may differ from numerical order)
4. **Shot components** — each shot is a self-contained React component receiving its frame count from the parent Sequence

### Composition ID Convention

- Full video: `full-video-1`, `full-video-2a`, `full-video-2b`
- Individual shots: `v{video}-shot{scene}-{shot}` — e.g., `v1-shot3-2`, `v2a-shot1-1`, `v2b-shot4-1`
- IDs must only contain `a-z, A-Z, 0-9, -` (Remotion rejects underscores)

## Production Pipeline

### 1. Text-to-Speech — ElevenLabs
- **Model**: `eleven_v3`, **Voice**: Sarah (`EXAVITQu4vr4xnSDxMaL`), **Language**: `he`
- **API key**: `.env` as `ELEVENLABS_API_KEY`
- Hebrew text must be sent via JSON file (`-d @file.json`), not inline curl — Windows UTF-8 issue
- Long texts get cut off — split into segments

### 2. Audio Sync — OpenAI Whisper
- Whisper small model (Hebrew) for word-level timestamps
- Output: `whisper_video*.json` files at project root
- Used to derive `timing.ts` shot boundaries

### 3. Lip Sync — Freepik Fabric 1.0
- Still image + MP3 → 720p video (25fps) with lip sync
- Used only for Video 1 narrator (shot1-1)

### 4. Background Music — Suno AI (Video 1 only)
- Two copies crossfaded (5s, exp curve), trimmed to 380s, 3s fade out
- Volume 0.10 (~20dB below narration)

## Design & Visual Style

For the full visual design guide — including per-video visual identity, glassmorphism patterns, animation recipes, color coding, background treatment, and unique visual elements per video — see **[`docs/design-guide.md`](docs/design-guide.md)**.

### Color Quick Reference

| Token | Value |
|---|---|
| bgPrimary | `#0a0e1a` |
| bgSecondary | `#111827` |
| primary | `#00d4ff` (turquoise) |
| secondary | `#8b5cf6` (purple) |
| accent | `#fbbf24` (gold) |
| warning | `#ef4444` (red) |
| text | `#ffffff` |
| textMuted | `#94a3b8` |
| Font | Rubik (hebrew+latin, weights 300-800) |

## Critical Conventions

### Animation
- All animation via `useCurrentFrame()` + `spring()` / `interpolate()` — **never CSS transitions/keyframes**
- `spring()` config for entrances: `{ damping: 14-18, stiffness: 80-100, mass: 0.8 }` — smooth, not bouncy
- **No enter/exit transitions between shots** — each shot starts and ends in place

### RTL Hebrew
- All text containers: `direction: "rtl"` on block-level elements (`div`), **not** on inline `span`
- English text (LLM, AI, ChatGPT): `direction: "ltr"`
- Font: import `FONT_FAMILY` from `../design/fonts`

### Shot File Pattern
```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";
import { Logo } from "../design/Logo";  // or video-specific logo

export const Shot{S}_{N}: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(...)` }}>
      {/* content */}
      <Logo />
    </AbsoluteFill>
  );
};
```

### Logo Handling
- **Video 1 / Video 2A**: Logo rendered as persistent `<Img>` overlay in FullVideo.tsx (fades out before last shot). Individual shots do NOT include `<Logo />`.
- **Video 2B**: Uses `<Logo />` component rendered in FullVideo.tsx on top of all shots.

### Scene 7 Shot Swap (Video 1 only)
In Scene 7, shots 7.5 and 7.4 are swapped in `SHOT_ORDER` to match narration flow — the narrator discusses human creativity (7.5) before AI limitations (7.4).

## Storyboard Documents

- `docs/תסריט remotion.md` — Video 1 storyboard (9 scenes, 29 shots)
- `docs/תסריט remotion video2a.md` — Video 2A storyboard
- `docs/תסריט remotion video2b.md` — Video 2B storyboard
