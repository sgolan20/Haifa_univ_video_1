---
name: add-title-card
description: Add the shared 6-second opening title card to a Haifa University Remotion video — a branded intro (university logo + video title + course subtitle) on the dark neural-network background, with the shared opener music. Use when the user asks to add/create the opening title slide / "שקף פתיחה" / opening title card for any video (video1, video2a, video2b, lesson2-lecture1, lesson3-lecture1, …).
argument-hint: "target video id + the exact title text (e.g. 'lesson3-lecture1 \"הכותרת שלי\"')"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Add Opening Title Card

Prepend a uniform **6-second (180-frame @ 30fps) title card** to the start of a video, before everything else (before any talking-head/intro overlay and before shot1). Every video shares ONE template and ONE music track — adding it to a video is just wiring, not new design.

The card shows: the university logo (springs in), an optional **series badge** (parent title), the **video title** (springs in, may wrap to 2 lines), a turquoise→purple decorative divider, and a course subtitle that fades in — all inside a subtle glass panel over `public/images/title_card_bg.png` (with a slow zoom + centered glow), with `public/audio/title_card_music.mp3` playing for the 6s and fading out in the last second.

### Multi-part courses → use `parentTitle`

When a course is split across several videos (e.g. "AI לעומת מנועי חיפוש" → חלק א' / חלק ב'), pass **`parentTitle`** with the shared series name and put only the part-specific text in `title`. `parentTitle` renders as a distinct accent "series badge" (turquoise/purple pill) above the title, giving the parts a shared identity and clear separation. Single standalone videos omit `parentTitle`.

Example split:
- `parentTitle="AI לעומת מנועי חיפוש"`, `title="חלק א' · ההבדל הבסיסי: מה הכלי עושה בפועל?"`
- `parentTitle="AI לעומת מנועי חיפוש"`, `title="חלק ב' · האם זה מקור אמיתי?"`

## Shared assets (already exist — do NOT regenerate)

- Component: `remotion-video/src/design/TitleCard.tsx` — props `{ title: string; parentTitle?: string; subtitle?: string; withMusic?: boolean }`. `TITLE_CARD_FRAMES = 180` is exported from here.
- Background: `remotion-video/public/images/title_card_bg.png` (shared by all videos).
- Music: `remotion-video/public/audio/title_card_music.mp3` (shared opener, ~10s, the component plays 6s + fade-out).

If a brand-new project ever lacks these, the bg was made with `/gen-gpt` (dark neural-network 3:2) and the music is the user's "Learning_Tech_Opener" file copied to `public/audio/title_card_music.mp3`. Normally they already exist — reuse them.

## Inputs to confirm

1. **Target video id** = the module folder under `remotion-video/src/` (e.g. `video2b`, `lesson3-lecture1`). Note its Root.tsx composition-id prefix (e.g. `v2b`, `l2l2`, `l3l1`).
2. **Exact title text** — ask the user; use it verbatim (don't paraphrase the storyboard). The default subtitle "קורס אוריינות AI לסטודנטים — אוניברסיטת חיפה" is usually right; only override if the user gives a different one.
3. **Is this part of a multi-part course?** If yes, split the title into `parentTitle` (shared series name) + `title` (the part) — see the multi-part section above.

## Step 1 — timing.ts: declare the offset and extend the total

In `remotion-video/src/<id>/timing.ts`, where `TOTAL_DURATION_FRAMES` is defined, add `TITLE_CARD_FRAMES` and offset the total by it:

```ts
/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
```

Do NOT add a shot to `SHOT_TIMING`/`SHOT_ORDER` — the title card is a standalone Sequence in FullVideo, not a narrated shot. Leave all existing shot `audioStart`/`duration` values untouched (the narration audio is shifted as a whole in Step 2).

## Step 2 — FullVideo.tsx: prepend the card and shift everything else by TITLE_CARD_FRAMES

Edit `remotion-video/src/<id>/FullVideo.tsx`:

1. Imports:
   ```ts
   import { SHOT_TIMING, SHOT_ORDER, TITLE_CARD_FRAMES } from "./timing";
   import { TitleCard } from "../design/TitleCard";
   ```

2. If the file computes `LAST_SHOT_START` (for a corner-logo fade), offset it:
   ```ts
   const LAST_SHOT_START = TITLE_CARD_FRAMES + SHOT_ORDER.slice(0, -1).reduce(
     (sum, id) => sum + SHOT_TIMING[id].durationInFrames, 0);
   ```

3. Wrap the narration `<Audio>` so it starts after the card, and add the card as the first Sequence:
   ```tsx
   {/* Full narration audio — starts after the title card */}
   <Sequence from={TITLE_CARD_FRAMES}>
     <Audio src={staticFile("<id>/audio/full_narration.mp3")} volume={1} />
   </Sequence>

   {/* Opening title card — first 6 seconds (plays its own music) */}
   <Sequence from={0} durationInFrames={TITLE_CARD_FRAMES} name="title-card">
     <TitleCard title="<EXACT TITLE>" />
     {/* multi-part course → <TitleCard parentTitle="<SERIES>" title="<PART>" /> */}
   </Sequence>
   ```
   (Video 1 also wraps its `background_music.mp3` in `<Sequence from={TITLE_CARD_FRAMES}>` the same way.)

4. Offset every shot's start frame:
   ```ts
   const startFrame = TITLE_CARD_FRAMES + cumulativeFrame;
   ```

5. **Edge case — intro overlay / talking-head video** at `from={0}`: change it to `from={TITLE_CARD_FRAMES}` so it plays over shot1, not over the card. Keep its `durationInFrames` and any internal fade as-is.

6. **Edge case — persistent corner logo / `<Logo />` overlay**: gate it so it does NOT show during the card. Two patterns seen in the repo:
   - Prop-driven opacity (lesson2-*): `{frame >= TITLE_CARD_FRAMES && logoOpacity > 0 && <Logo opacity={0.5 * logoOpacity} />}`
   - Plain persistent logo (video2b): wrap it — `<Sequence from={TITLE_CARD_FRAMES}><Logo /></Sequence>`
   - Logo rendered as `<Img>` in FullVideo (video1/video2a): wrap or gate the same way so it doesn't overlap the card's centered logo.

## Step 3 — Root.tsx: register a standalone preview composition

Add `id="<prefix>-title-card"` inside the video's `Shots` `<Folder>`, just before its first shot. The shared imports already exist near the video1 block:
```ts
import { TitleCard as SharedTitleCard, TITLE_CARD_FRAMES as SHARED_TITLE_FRAMES } from "./design/TitleCard";
```
Then:
```tsx
<Composition
  id="<prefix>-title-card"
  component={SharedTitleCard}
  durationInFrames={SHARED_TITLE_FRAMES}
  fps={FPS}
  width={1920}
  height={1080}
  defaultProps={{ title: "<EXACT TITLE>" }}
/>
```
The video's `full-<id>` composition uses `TOTAL_DURATION_FRAMES`, which Step 1 already grew — no further change there.

## Step 4 — Verify

```bash
cd remotion-video
npx tsc --noEmit
# preview the card mid-animation (logo+title in, subtitle visible):
npx remotion still src/index.ts <prefix>-title-card out/<prefix>_title.png --frame=90 --gl=angle
```
Open the PNG and confirm the title reads correctly and wraps cleanly. Then preview `full-<id>` in `npm run studio`. Do NOT render the full MP4 unless asked.

## Notes

- Long titles wrap to 2 lines automatically (the component has `maxWidth: 1400`, `lineHeight: 1.2`). Mixed Hebrew+English (e.g. "Hallucinations — …", "Fact Check 3X") renders fine inside the RTL container.
- Titles used so far: video1 "מהו מודל שפה (LLM)?"; video2a "Hallucinations — כשהבינה המלאכותית משוכנעת בטעויותיה"; video2b "למה מודלי שפה טועים לפעמים?"; lesson2-lecture1 "AI לעומת מנועי חיפוש (חלק א') – ההבדל הבסיסי: מה הכלי עושה בפועל?"; lesson2-lecture2 "AI לעומת מנועי חיפוש (חלק ב') – האם זה מקור אמיתי?".
