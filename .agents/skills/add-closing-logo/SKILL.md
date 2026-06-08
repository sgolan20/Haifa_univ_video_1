---
name: add-closing-logo
description: Add a University-logo closing shot to a Remotion video — a 2.5s card with the Haifa University logo that springs in, holds, and fades out, appended after the last narrated shot (extending the timeline past the narration). Also fades out the persistent corner logo just before it. Use when the user asks to close/end a video with the university logo, like the previous videos.
argument-hint: "target video id (e.g. lesson2-lecture1, video2b)"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Add Closing Logo Shot (university logo outro)

Append a clean closing card to a finished Haifa University Remotion video: the
university logo centered on the dark background, springing in and fading out over
~2.5s, **after** the last narrated shot. This matches Video 1's ending (`Shot9_2`)
and the one built for `lesson2-lecture1` (`Shot13_1`).

Logo asset: shared `public/images/haifa-logo.png` (colour logo on a white card).
Standard length: **75 frames (2.5s)** at 30fps.

## Step 1 — Identify the target & the new shot id

- Target video module: `remotion-video/src/<id>/` (e.g. `lesson2-lecture1`, `video2b`).
- The closing shot is a **new scene one past the last one**: if the last scene is 12,
  the new shot is `shot13-1` → component `Shot13_1` → composition `<prefix>-shot13-1`.
- Skip if the video already ends with a logo shot (Video 1 already has `Shot9_2`).

## Step 2 — Create the shot component

Copy the bundled template and substitute the names:

```bash
N=<new-scene-number>            # e.g. 13
sed -e "s/__COMPONENT__/Shot${N}_1/" -e "s/__SHOT__/${N}.1/" \
  .Codex/skills/add-closing-logo/templates/ClosingLogo.tsx \
  > remotion-video/src/<id>/scenes/Shot${N}_1.tsx
```

The template imports `COLORS` from `../../design/theme` and uses the shared logo —
nothing else to edit. (It is identical to `lesson2-lecture1/scenes/Shot13_1.tsx`.)

## Step 3 — Add timing + order

In `remotion-video/src/<id>/timing.ts`:

- Add the entry **starting where the narration ends** so the logo plays after the voice:
  ```ts
  // Scene <N> — University logo closing (after narration ends)
  "shot<N>-1": shot(NARRATION_DURATION_SEC, 2.5),
  ```
  If the file has no `NARRATION_DURATION_SEC` const, use the previous shot's
  `audioStart + duration` as the start value (the `audioStart` is only metadata; the
  sequencer uses `durationInFrames`, so any start past the narration is fine).
- Append the id to `SHOT_ORDER`: `..., "shot<N>-1",`.

`TOTAL_DURATION_FRAMES` updates automatically and the closing 75 frames extend the
composition past the narration.

## Step 4 — Wire into FullVideo.tsx

In `remotion-video/src/<id>/FullVideo.tsx`:

1. Import the component and add it to `SHOT_COMPONENTS`:
   ```ts
   import { Shot<N>_1 } from "./scenes/Shot<N>_1";
   // ...
   "shot<N>-1": Shot<N>_1,
   ```
2. **Fade out the persistent corner logo before the closing shot.** Two cases:
   - **Videos using the `<Logo />` component** (e.g. `lesson2-lecture1`, `video2b`):
     add the fade and gate the render:
     ```ts
     import { useCurrentFrame, interpolate } from "remotion";   // ensure imported
     const LAST_SHOT_START = SHOT_ORDER.slice(0, -1).reduce(
       (sum, id) => sum + SHOT_TIMING[id].durationInFrames, 0);
     // inside the component:
     const frame = useCurrentFrame();
     const logoOpacity = interpolate(frame, [LAST_SHOT_START - 30, LAST_SHOT_START], [1, 0],
       { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
     // render:
     {logoOpacity > 0 && <Logo opacity={0.5 * logoOpacity} />}
     ```
   - **Videos using an `<Img>` logo overlay** (e.g. `video1`, `video2a`): they already
     compute `LAST_SHOT_START` from `SHOT_ORDER.slice(0, -1)` and fade the logo before
     the last shot — adding a new last shot **re-targets that fade automatically**. No
     change needed beyond the import + `SHOT_COMPONENTS` entry.

## Step 5 — Register the composition

In `remotion-video/src/Root.tsx`, under the video's `<Folder>` → `Shots`:

```tsx
<Composition id="<prefix>-shot<N>-1" component={<PREFIX>_Shot<N>_1}
  durationInFrames={<PREFIX>_SHOT_TIMING["shot<N>-1"].durationInFrames}
  fps={FPS} width={1920} height={1080} />
```

(Add the matching `import { Shot<N>_1 as <PREFIX>_Shot<N>_1 } from "./<id>/scenes/Shot<N>_1";`.)

## Step 6 — Verify

1. `cd remotion-video && npx tsc --noEmit`
2. Render a still mid-hold to confirm the logo card looks right:
   `npx remotion still src/index.ts <prefix>-shot<N>-1 /tmp/closing.png --frame=30 --gl=angle`
3. Tell the user to scrub to the end of `full-<id>` in `npm run studio`.

> Order note: if `/add-background-music` runs **after** this, its fade-out lands over
> this closing shot automatically (it fades the music over the last 75 frames).

## Bundled files

- [`templates/ClosingLogo.tsx`](templates/ClosingLogo.tsx) — the closing-logo shot component (substitute `__COMPONENT__` / `__SHOT__`).
