# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational video lecture series for **University of Haifa** AI literacy course. This is Lecture 1: "What is a Language Model (LLM)?" (~6:20 min, 380s). Built with **Remotion v4** (React + TypeScript) for animated motion graphics. **Status: COMPLETE.**

## Commands

```bash
npm run studio          # Open Remotion Studio (browser preview with live reload)
npx remotion render src/index.ts full-video out/full_video.mp4 --codec h264 --concurrency=16 --gl=angle
npx remotion render src/index.ts <comp-id> out/<name>.mp4 --codec h264  # Render single shot
```

Do NOT render to MP4 unless explicitly asked — use Studio for preview.

## Architecture

```
src/
  index.ts              # Registers Root
  Root.tsx              # All Composition definitions (IDs, durations, fps)
  FullVideo.tsx         # Master sequencer — audio tracks + shot sequences
  timing.ts             # Centralized shot timing map (Whisper-aligned)
  design/
    theme.ts            # COLORS constant (bgPrimary, primary, secondary, accent, etc.)
    fonts.ts            # Rubik font loader (weights 300-800, hebrew+latin subsets)
    Logo.tsx            # University logo component (top-left, inverted to white)
    Background.tsx      # Dark gradient + dot grid + floating particles
  scenes/
    Shot1_1.tsx         # Narrator talking head video (14s)
    Shot1_2.tsx         # (unused in full-video — merged into Shot1_1)
    Shot1_3.tsx         # Chat interface mockup + typewriter
    Shot2_1.tsx … Shot9_2.tsx  # All remaining shots
public/
  audio/
    full_narration.mp3  # Complete Hebrew narration (ElevenLabs TTS)
    background_music.mp3 # Looped & crossfaded background music (Suno AI, -20dB)
  video/
    narrator.mp4        # Lip-synced talking head (Freepik Fabric, 720p 25fps)
  images/
    haifa-logo.png      # University of Haifa logo (dark, inverted via CSS filter)
    shot*_bg.png        # AI-generated background images per shot
    logo_chatgpt.png, logo_claude.png, logo_gemini.png  # AI service logos
    shot7_5_*.png, shot8_*.png  # Scene-specific illustrations
```

## Audio Setup (FullVideo.tsx)

Two audio tracks play continuously:
1. `full_narration.mp3` — volume 1.0 (primary narration)
2. `background_music.mp3` — volume 0.10 (~20dB below, professional standard)

Background music is pre-processed: two copies crossfaded (5s, exp curve), trimmed to 380s, 3s fade out at end.

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| bgPrimary | `#0a0e1a` | Main dark background |
| bgSecondary | `#111827` | Gradient secondary |
| primary | `#00d4ff` | Turquoise — main accent |
| secondary | `#8b5cf6` | Purple |
| accent | `#fbbf24` | Gold — highlights |
| warning | `#ef4444` | Red — alerts |
| text | `#ffffff` | White text |
| textMuted | `#94a3b8` | Dim text |
| Font | Rubik | Hebrew + Latin, weights 300-800 |

## Critical Conventions

### Composition IDs
- **Hyphens only**: `shot1-1`, `shot2-3` (NOT underscores — Remotion rejects them)
- Format: `shot{scene}-{shot}` (e.g., `shot3-2` = Scene 3, Shot 2)

### Animation Style
- Use `spring()` for element entrances with **smooth** config: `{ damping: 14-18, stiffness: 80-100, mass: 0.8 }`
- Use `interpolate()` for linear transitions (fades, line growth, counters)
- **NO bouncy/toyish animations** — movement should be smooth and professional
- **NO enter/exit transitions between shots** — each shot starts and ends in place, no slide-in/out or zoom transitions
- All animation is frame-based via `useCurrentFrame()` — never CSS transitions/keyframes

### RTL Hebrew
- All text containers: `direction: "rtl"` on block-level elements (div), NOT on inline spans
- Exception: English text (LLM, AI, ChatGPT) uses `direction: "ltr"`
- Font: `FONT_FAMILY` constant from `../design/fonts`

### Visual Style
- **Big, readable text** — educational content must be clear (fontSize 28-120)
- Flow charts, diagrams, split screens — text-driven visualizations
- Each shot includes `<Logo />` component (except narrator video shot)
- Background: radial gradient from bgSecondary to bgPrimary
- Many shots use AI-generated background images with glassmorphic overlays

### Shot File Structure
Every shot file follows this pattern:
```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";
import { Logo } from "../design/Logo";

export const Shot{S}_{N}: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // animations...
  return (
    <AbsoluteFill style={{ background: `radial-gradient(...)` }}>
      {/* content */}
      <Logo />
    </AbsoluteFill>
  );
};
```

Exception: Shot1_1 uses `<Video>` for the narrator talking head (no Logo, no gradient background).

## Production Pipeline

1. **Audio**: ElevenLabs TTS — model `eleven_v3`, voice Sarah (`EXAVITQu4vr4xnSDxMaL`), language `he`
2. **Video**: Remotion scenes (this project)
3. **Lip Sync**: Freepik Fabric 1.0 model — narrator.mp4 (shot1-1, 14s)
4. **Background Music**: Suno AI — ambient electronic, instrumental, processed with ffmpeg
5. **Sync**: OpenAI Whisper word-level timestamps for shot boundaries

## Storyboard (all scenes DONE)

| Scene | Shots | Duration | Topic |
|-------|-------|----------|-------|
| 1 — Opening | 1.1, 1.3 | 30s | Narrator intro + chat interface |
| 2 — What is LLM? | 2.1, 2.2, 2.3 | 52s | Knowledge sources + AI capabilities |
| 3 — Prediction | 3.1, 3.2, 3.3, 3.4 | 51s | Word prediction principle |
| 4 — Why "Large"? | 4.1, 4.2, 4.3 | 45s | Scale and parameters |
| 5 — LLM vs Search | 5.1, 5.2, 5.3 | 49s | Generation vs retrieval |
| 6 — Thought Question | 6.1, 6.2 | 23s | Pause for reflection |
| 7 — Creativity | 7.1-7.7 | 85s | Sampling and randomness |
| 8 — Summary | 8.1-8.4 | 40s | Key takeaways |
| 9 — Closing | 9.1, 9.2 | 5s | End screen |

Note: In Scene 7, shots 7.5 (Newton/creativity) and 7.4 (AI bubble) are swapped in SHOT_ORDER to match narration flow.
