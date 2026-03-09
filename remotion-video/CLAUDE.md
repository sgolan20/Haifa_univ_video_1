# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational video lecture series for **University of Haifa** AI literacy course. This is Lecture 1: "What is a Language Model (LLM)?" (~6:12 min). Built with **Remotion v4** (React + TypeScript) for animated motion graphics.

## Commands

```bash
npm run studio          # Open Remotion Studio (browser preview with live reload)
npx remotion render src/index.ts <comp-id> out/<name>.mp4 --codec h264  # Render single shot
```

Do NOT render to MP4 unless explicitly asked — use Studio for preview.

## Architecture

```
src/
  index.ts              # Registers Root
  Root.tsx              # All Composition definitions (IDs, durations, fps)
  design/
    theme.ts            # COLORS constant (bgPrimary, primary, secondary, accent, etc.)
    fonts.ts            # Rubik font loader (weights 300-800, hebrew+latin subsets)
    Logo.tsx            # University logo component (top-left, inverted to white)
    Background.tsx      # Dark gradient + dot grid + floating particles
  scenes/
    Shot1_1.tsx         # Scene 1, Shot 1 — each file is one shot
    Shot1_2.tsx         # ...
    ...
public/
  images/
    haifa-logo.png      # University of Haifa logo (dark, inverted via CSS filter)
```

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
- All text containers: `direction: "rtl"`
- Exception: English text (LLM, AI, ChatGPT) uses `direction: "ltr"`
- Font: `FONT_FAMILY` constant from `../design/fonts`

### Visual Style
- **Big, readable text** — educational content must be clear (fontSize 28-120)
- Flow charts, diagrams, split screens — text-driven visualizations
- Each shot includes `<Logo />` component
- Background: radial gradient from bgSecondary to bgPrimary

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

## Production Pipeline

1. **Audio**: ElevenLabs TTS — model `eleven_v3`, voice Sarah (`EXAVITQu4vr4xnSDxMaL`), language `he`
2. **Video**: Remotion scenes (this project)
3. **Lip Sync**: Freepik Fabric 1.0 model (optional, for character animation)
4. **Audio files**: Located at `D:\DEV\haifa_univ_1\audio\` — output.mp3, output2.mp3, output3.mp3, fix.mp3, fix2.mp3

## Storyboard Reference

Full storyboard: `D:\DEV\haifa_univ_1\docs\תסריט remotion.md`

| Scene | Shots | Duration | Status |
|-------|-------|----------|--------|
| 1 — Opening | 1.1, 1.2, 1.3 | 31s | DONE |
| 2 — What is LLM? | 2.1, 2.2, 2.3 | 49s | DONE |
| 3 — Prediction Principle | 3.1, 3.2, 3.3, 3.4 | 51s | TODO |
| 4 — Why "Large"? | 4.1, 4.2, 4.3 | 40s | TODO |
| 5 — LLM vs Search Engine | 5.1, 5.2, 5.3 | 43s | TODO |
| 6 — Thought Question | 6.1, 6.2 | 21s | TODO |
| 7 — Creativity & Sampling | 7.1-7.7 | 113s | TODO |
| 8 — Summary | 8.1, 8.2, 8.3 | 39s | TODO |
| 9 — Closing | 9.1 | 5s | TODO |

## Current Compositions (Root.tsx)

| ID | Component | Duration |
|----|-----------|----------|
| shot1-1 | Shot1_1 | 4s (120 frames) |
| shot1-2 | Shot1_2 | 12s (360 frames) |
| shot1-3 | Shot1_3 | 15s (450 frames) |
| shot2-1 | Shot2_1 | 14s (420 frames) |
| shot2-2 | Shot2_2 | 18s (540 frames) |
| shot2-3 | Shot2_3 | 17s (510 frames) |
