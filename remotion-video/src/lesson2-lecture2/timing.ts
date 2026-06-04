/**
 * Lesson 2 — Lecture 2 — "AI לעומת מנועי חיפוש (חלק ב') — האם זה מקור אמיתי?" timing map
 *
 * Full narration: 255.90s (4:15.90) → 7677 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in silence gaps between sentences.
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
export const NARRATION_DURATION_SEC = 255.9;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening + the practical question (which tool, right now?)
  "shot1-1": shot(0, 20.79),
  // Scene 2 — A simple decision model
  "shot2-1": shot(20.79, 6.35),
  // Scene 3 — Use a SEARCH ENGINE when… (specific verifiable facts)
  "shot3-1": shot(27.14, 26.42),
  // Scene 4 — Use an AI MODEL when… (thinking partner, not a fact store)
  "shot4-1": shot(53.56, 27.72),
  // Scene 5 — The simple rule: AI for thinking, search for facts
  "shot5-1": shot(81.28, 5.46),
  // Scene 6 — But how to trust an AI answer? → FACT-CHECK-3X
  "shot6-1": shot(86.74, 16.52),
  // Scene 7 — F · Find the Claim
  "shot7-1": shot(103.26, 11.94),
  // Scene 8 — A · Anchor to Source
  "shot8-1": shot(115.2, 15.66),
  // Scene 9 — C · Cross-Reference
  "shot9-1": shot(130.86, 13.34),
  // Scene 10 — T · Time-Stamp
  "shot10-1": shot(144.2, 14.3),
  // Scene 11 — CHECK (threshold for academic use)
  "shot11-1": shot(158.5, 8.14),
  // Scene 12 — 3X (run it at least three times)
  "shot12-1": shot(166.64, 16.06),
  // Scene 13 — An era of powerful tools (AI + search), but only if you understand each
  "shot13-1": shot(182.7, 25.4),
  // Scene 14 — Caveat: not every source is trustworthy / AI manipulation & noise
  "shot14-1": shot(208.1, 24.2),
  // Scene 15 — Triple-check also reveals the plurality of voices
  "shot15-1": shot(232.3, 13.5),
  // Scene 16 — The final, deepest rule + goodbye
  "shot16-1": shot(245.8, NARRATION_DURATION_SEC - 245.8),
  // Scene 17 — University logo closing (after narration ends)
  "shot17-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1", "shot6-1",
  "shot7-1", "shot8-1", "shot9-1", "shot10-1", "shot11-1", "shot12-1",
  "shot13-1", "shot14-1", "shot15-1", "shot16-1", "shot17-1",
] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
