---
name: create-scene
description: Build rich, animated Remotion scene shots for the Haifa University AI-literacy videos. Combines an AI-generated background image, transparent floating icon/elements, and narration-synced text animation into a cinematic shot. Use when the user asks to create/build scenes or shots for any of the videos (video1, video2a, video2b, lesson2-lecture1, …).
argument-hint: "<video-id> scene <N> (e.g. 'lesson2-lecture1 scene 4')"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Create a Remotion Scene (rich & animated)

Build self-contained, cinematic shots for the Haifa University AI-literacy course videos. Every shot must be **visually interesting from start to finish** — never a static title on a flat background.

## 0. Identify the target video

Each video is an independent module under `remotion-video/src/<video-id>/`:

| video-id | topic | storyboard |
|---|---|---|
| `video1` | What is an LLM | `docs/תסריט remotion.md` |
| `video2a` | Hallucinations | `docs/תסריט remotion video2a.md` |
| `video2b` | Why models err | `docs/תסריט remotion video2b.md` |
| `lesson2-lecture1` | AI vs search engines (Part A) | `docs/תסריט remotion lesson2-lecture1.md` |

Paths used below (always absolute on this machine):
- Source: `remotion-video/src/<video-id>/scenes/Shot{S}_{N}.tsx`
- Assets: `remotion-video/public/<video-id>/images/`, `…/audio/`
- Composition IDs (hyphens only, no underscores): full `full-<video-id>` / `full-video-2b`; shots `<prefix>-shot{S}-{N}` (e.g. `l2l1-shot4-1`, `v2b-shot3-1`).

## 1. Pre-flight — gather context

1. Read the storyboard section for the requested scene.
2. Read the design system: `src/design/theme.ts` (COLORS), `src/design/fonts.ts` (FONT_FAMILY).
3. Read the narration **SRT / word JSON** to get exact timings:
   `remotion-video/public/<video-id>/audio/full_narration.srt` and `whisper_<video-id>.json`.
4. Read **1–2 recent shot files** from the same video to match style (e.g. `lesson2-lecture1/scenes/Shot1_1.tsx` and `Shot3_1.tsx` are the reference for the rich style).

## 2. Derive timing from the narration

Find the cues that belong to this scene in the SRT; the shot's `audioStart` = first word's start, `duration` = next scene's start − this start (cut in a silence gap between sentences for a clean boundary). Then update `src/<video-id>/timing.ts`:
- add `"shotS-N": shot(audioStart, duration)` to `SHOT_TIMING`
- insert the id into `SHOT_ORDER` (replace/append the `"rest"` placeholder as scenes get built)

**Phase the animation to the narration:** each visual element should enter exactly when the narrator says it. Use the per-cue timestamps (relative to the shot's `audioStart`, ×30fps) as spring `frame - delay` offsets.

## 3. Generate imagery (the layered technique)

A great shot = **AI background image + transparent floating elements + animated text**. See [reference.md](reference.md) for full command details. Summary:

- **Background** (`gen-gpt`, `aspect_ratio: "3:2"`, `background: "opaque"`): an atmospheric scene on deep navy `#0a0e1a`, with a **dark empty center** reserved for text. Save to `public/<video-id>/images/<scene>_bg.png`.
- **Floating icon/element** (`gen-gpt`, `1:1`): the object glowing on flat navy. Then **remove its background** with `remove-bg-recraft` → `*_nobg.png`, and use the transparent version for any floating overlay.
  - ⚠️ `mixBlendMode: "screen"` only hides a navy square on a **pure-black** full-bleed layer. On the gradient background or inside a glass card the square stays visible — so **always use the `_nobg.png`** for floating elements (normal blend, no mixBlendMode). Keep the original only for a faint full-bleed layer over pure black.
- Colors: turquoise `#00d4ff` = search/retrieval/source; purple `#8b5cf6` = AI model; gold `#fbbf24` = key rule; red `#ef4444` = danger/hallucination.

## 4. Build the shot — make it alive

Open on a **living background**, not a bare title. Layer (back → front):

1. `<Img>` background with **Ken Burns** (slow `scale` 1.04→1.16 + small `translateX` drift) + fade-in.
2. Readability overlays: a centered radial darken + top/bottom vertical gradient so text stays legible.
3. **Floating particles** (a handful of glowing dots drifting up with sine-pulsed opacity).
4. Content in **phases** synced to narration: titles, glass cards, diagrams, transparent icons — each entering with a smooth spring.

Reusable patterns (copy from `lesson2-lecture1/scenes/Shot1_1.tsx`):
- Ken Burns bg, `Particles` component, animated underline under titles.
- A title that **rises from center to top in one continuous motion** — drive position with a single `translateY(rise * -390)` + `scale(1 - rise*0.42)`; **never** switch `top`/`bottom` mid-animation (that makes it jump).
- Glass card (`ToolCard`) with a transparent icon that gently floats (`Math.sin(frame*0.06)*7`).

### Animation rules (critical)
- All motion via `useCurrentFrame()` + `spring()`/`interpolate()` — **never** CSS transitions/keyframes.
- Entrance spring: `{ damping: 14–18, stiffness: 80–100, mass: 0.8 }` — smooth, no bounce.
- **No enter/exit transitions between shots** — each shot starts and ends in place; elements inside may appear/grow/cross-fade.
- Keep something moving the whole time (Ken Burns, particles, slow rotation, glow pulses) so no frame feels static.

### RTL rules (critical)
- Block elements with Hebrew: `direction: "rtl"`. English tokens (AI, LLM, Google, ChatGPT): `direction: "ltr"`.
- **Arrows in an RTL flow must point LEFT** (right→left). The chars `‹ › « »` are *bidi-mirrored* and flip in RTL context — use a geometric triangle `◀`/`◂` (not mirrored) wrapped in `direction:"ltr"; unicodeBidi:"isolate"`.
- Big readable text: titles 60–120, body 28–40, labels 24–32. Always `FONT_FAMILY` and `COLORS.*`.

## 5. Register

1. Import the component in `src/<video-id>/FullVideo.tsx` and add to `SHOT_COMPONENTS`.
2. Add a `<Composition>` in `src/Root.tsx` under the video's `<Folder>` → `Shots`, id `<prefix>-shot{S}-{N}`, `fps=30 width=1920 height=1080`, `durationInFrames={SHOT_TIMING["shotS-N"].durationInFrames}`.

## 6. Verify (do NOT render MP4)

1. Type-check: `npx tsc --noEmit -p tsconfig.json` (from `remotion-video/`).
2. **Render still frames and look at them** at the busiest moments of each phase to catch layout/overlap/RTL/transparent-square issues:
   `npx remotion still src/index.ts <prefix>-shotS-N /tmp/check.png --frame=<f> --gl=angle`
3. Fix what you see, then tell the user which compositions to preview in `npm run studio` (`full-<video-id>` and the individual shot).

## Reference & lessons
- [`reference.md`](reference.md) — exact `gen-gpt` / `remove-bg-recraft` API calls, naming, mixBlendMode notes.
- The gold-standard reference shots are `lesson2-lecture1` Shot1_1 (living bg + rising title + icon cards) and Shot3_1 (rotating bg element + step flow + tags).
