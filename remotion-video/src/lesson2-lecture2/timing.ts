/**
 * Lesson 2 — Lecture 2 — "AI לעומת מנועי חיפוש (חלק ב') — האם זה מקור אמיתי?" timing map
 *
 * Full narration: 257.84s (4:17.84) → 7735 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in silence gaps between sentences.
 *
 * NOTE: Two Scene segments were re-recorded with a warmer voice and spliced in:
 *  - Scene 4 (entries 23-26) at 62.6→75.68s: +0.948s → shot4-1 extended, shot5-1+ shifted +0.948s.
 *  - Scene 6 (shot6-1, entries 31-34, "but how to trust an AI answer? → Fact-Check-3X")
 *    at 87.688→104.208s: +0.564s → shot6-1 extended (16.52→17.084), shot7-1+ shifted +0.564s.
 */

export const FPS = 30;

export interface ShotTiming {
  /** Start time in the full narration (seconds) */
  audioStart: number;
  /** Duration of this shot (seconds) */
  duration: number;
  /** Start frame in the full narration */
  audioStartFrame: number;
  /** Duration in frames */
  durationInFrames: number;
}

const shot = (audioStart: number, duration: number): ShotTiming => ({
  audioStart,
  duration,
  audioStartFrame: Math.round(audioStart * FPS),
  durationInFrames: Math.round(duration * FPS),
});

/** Total narration duration in seconds (ffprobe). */
export const NARRATION_DURATION_SEC = 257.842;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening + the practical question (which tool, right now?)
  "shot1-1": shot(0, 20.79),
  // Scene 2 — A simple decision model
  "shot2-1": shot(20.79, 6.35),
  // Scene 3 — Use a SEARCH ENGINE when… (specific verifiable facts)
  // +0.43s vs raw: the example list was re-synthesized with niqqud (שֵׁם=name), slightly longer.
  "shot3-1": shot(27.14, 26.853),
  // Scene 4 — Use an AI MODEL when… (thinking partner, not a fact store)
  // duration +0.948s: Scene-4 audio segment (23-26) re-recorded & spliced in (62.6→75.68s).
  "shot4-1": shot(53.56, 28.668),
  // --- everything below shifted +0.948s by the Scene-4 re-recording splice ---
  // Scene 5 — The simple rule: AI for thinking, search for facts
  "shot5-1": shot(82.228, 5.46),
  // Scene 6 — But how to trust an AI answer? → FACT-CHECK-3X
  // duration +0.564s: shot6-1 audio re-recorded & spliced in (87.688→104.208s).
  "shot6-1": shot(87.688, 17.084),
  // --- everything below additionally shifted +0.564s by the shot6-1 re-recording splice ---
  // Scene 7 — F · Find the Claim
  "shot7-1": shot(104.772, 11.94),
  // Scene 8 — A · Anchor to Source
  "shot8-1": shot(116.712, 15.66),
  // Scene 9 — C · Cross-Reference
  "shot9-1": shot(132.372, 13.34),
  // Scene 10 — T · Time-Stamp
  "shot10-1": shot(145.712, 14.3),
  // Scene 11 — CHECK (threshold for academic use)
  "shot11-1": shot(160.012, 8.14),
  // Scene 12 — 3X (run it at least three times)
  "shot12-1": shot(168.152, 16.06),
  // Scene 13 — An era of powerful tools (AI + search), but only if you understand each
  "shot13-1": shot(184.212, 25.4),
  // Scene 14 — Caveat: not every source is trustworthy / AI manipulation & noise
  "shot14-1": shot(209.612, 24.2),
  // Scene 15 — Triple-check also reveals the plurality of voices
  "shot15-1": shot(233.812, 13.5),
  // Scene 16 — The final, deepest rule + goodbye
  "shot16-1": shot(247.742, 10.1),
  // Scene 17 — University logo closing (after narration ends)
  "shot17-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1", "shot6-1",
  "shot7-1", "shot8-1", "shot9-1", "shot10-1", "shot11-1", "shot12-1",
  "shot13-1", "shot14-1", "shot15-1", "shot16-1", "shot17-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
