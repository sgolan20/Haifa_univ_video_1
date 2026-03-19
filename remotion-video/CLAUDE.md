# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See the **root CLAUDE.md** (`../CLAUDE.md`) for the complete project guide — architecture, commands, design system, and conventions. This file covers Remotion-specific details not in the root.

## Quick Reference

```bash
npm run studio                    # Preview (primary workflow)
npx remotion render src/index.ts full-video-2b out/video2b.mp4 --codec h264 --concurrency=16 --gl=angle
npx remotion render src/index.ts v2b-shot3-1 out/v2b_shot3_1.mp4 --codec h264
```

## Adding a New Shot

1. Create `src/video{X}/scenes/Shot{S}_{N}.tsx` following the shot file pattern in root CLAUDE.md
2. Add timing entry in `src/video{X}/timing.ts` — use Whisper timestamps for `audioStart` and `duration`
3. Add shot ID to `SHOT_ORDER` array in `timing.ts`
4. Import component in `src/video{X}/FullVideo.tsx` and add to `SHOT_COMPONENTS` record
5. Register a `<Composition>` in `src/Root.tsx` under the correct `<Folder>`, with ID `v{X}-shot{S}-{N}`

## Adding a New Video

1. Create `src/video{X}/` with `FullVideo.tsx`, `timing.ts`, and `scenes/` directory
2. Add audio to `public/video{X}/audio/full_narration.mp3`
3. Add images to `public/video{X}/images/`
4. Register in `Root.tsx`: new `<Folder>` with `full-video-{X}` composition + per-shot compositions

## Remotion Gotchas

- Composition IDs: **hyphens only** (`a-z, A-Z, 0-9, -`) — underscores cause Remotion errors
- Font loading: limit to specific weights/subsets to avoid excessive network requests
- `staticFile()` paths are relative to `public/` — e.g., `staticFile("video2b/audio/full_narration.mp3")`
- `<Video>` component (used in Video 1 shot1-1): mute it and play audio separately via `<Audio>` for sync control
- Background images: use `<Img src={staticFile(...)} />`, not CSS `background-image` (Remotion can't bundle CSS urls)
