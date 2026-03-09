---
name: create-scene
description: Create new Remotion video scene shots for the Haifa University lecture. Pass scene number and shot numbers as arguments (e.g., "3 shots 3.1 3.2 3.3 3.4").
argument-hint: "<scene-number> shots <shot-list>"
---

# Create Remotion Scene

You are creating new shots for an educational video lecture about LLMs for University of Haifa.

## Pre-flight Checks

1. Verify Remotion is installed:
   ```bash
   cd D:/DEV/haifa_univ_1/remotion-video && node -e "require('remotion')" 2>&1
   ```
   If it fails, run:
   ```bash
   npm install
   ```

2. Read the storyboard for the requested scene:
   ```bash
   # Full storyboard is at:
   cat "D:/DEV/haifa_univ_1/תסריט remotion.md"
   ```

3. Read the design system files:
   - `src/design/theme.ts` — COLORS constant
   - `src/design/fonts.ts` — FONT_FAMILY constant

4. Read existing shots for reference (to match style):
   - Pick 1-2 recent shot files from `src/scenes/` and read them

## Shot File Template

Every shot file MUST follow this structure:

```tsx
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot X.Y — [Title] ([duration] seconds)
 * [Brief description of what happens visually]
 */

export const ShotX_Y: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ... animations using spring() and interpolate() ...

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Scene content — NO Logo component */}
    </AbsoluteFill>
  );
};
```

## Animation Rules (CRITICAL)

### Spring Config — Always Smooth
```tsx
spring({
  frame: frame - delay,
  fps,
  config: { damping: 14-18, stiffness: 80-100, mass: 0.8 },
})
```
- **damping: 14-18** (no bounce/overshoot)
- **stiffness: 80-100** (smooth arrival)
- **NEVER** use low damping (<12) or high stiffness (>150) — it looks toyish

### NO Enter/Exit Transitions
- Each shot starts and ends IN PLACE
- NO slide-in from edges at start
- NO slide-out, zoom-out, or fade-out at end
- Elements within the shot can animate (appear, grow, etc.) but the shot itself stays static

### interpolate() for Linear Motion
```tsx
const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

## Visual Style Rules

- **Big readable text**: titles fontSize 60-120, body text 28-40, labels 24-32
- **Hebrew text**: always `direction: "rtl"`
- **English text** (LLM, AI, etc.): `direction: "ltr"`
- **Font**: always use `FONT_FAMILY` constant
- **Colors**: always use `COLORS.*` constants from theme
- **Flow charts, diagrams, split screens** — prefer text-driven visualizations
- **SVG elements**: use inline `<svg>` with absolute positioning for diagrams, arrows, charts
- **Background**: always the radial gradient from bgSecondary to bgPrimary

## Registration in Root.tsx

After creating shot files, update `src/Root.tsx`:

1. Import the new components
2. Add new `<Composition>` entries with:
   - `id`: format `shot{scene}-{shot}` using HYPHENS (e.g., `shot3-1`)
   - `width={1920}` `height={1080}` `fps={30}`
   - `durationInFrames`: scene duration in seconds × 30

Example:
```tsx
import { Shot3_1 } from "./scenes/Shot3_1";

<Composition
  id="shot3-1"
  component={Shot3_1}
  durationInFrames={270}  // 9 seconds × 30fps
  fps={30}
  width={1920}
  height={1080}
/>
```

## Step-by-Step Process

1. **Read the storyboard** section for the requested scene from `תסריט remotion.md`
2. **Read 1-2 existing shot files** to match the current style
3. **Create each shot file** at `src/scenes/Shot{S}_{N}.tsx`
4. **Register in Root.tsx** — add imports and Composition entries
5. **Type-check**: run `npx tsc --noEmit` to verify no errors
6. **Do NOT render** to MP4 — user previews in Remotion Studio

## Storyboard Quick Reference

| Scene | Shots | Description |
|-------|-------|-------------|
| 3 | 3.1-3.4 | Prediction principle: typewriter, word cards, probability bar chart, word building |
| 4 | 4.1-4.3 | Why "Large": parameter viz, globe languages, math network |
| 5 | 5.1-5.3 | LLM vs search: split screen, typewriter AI, hallucination warning |
| 6 | 6.1-6.2 | Thought question: question marks, philosophical elements |
| 7 | 7.1-7.7 | Creativity & sampling: probability, tree diagram, Venn, AI bubble, human creativity |
| 8 | 8.1-8.3 | Summary: animated bullet list, connections, "next lectures" gate |
| 9 | 9.1 | Closing: thank you, logo fade |
