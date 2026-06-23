/**
 * Lesson 6 — Lecture 1 — "איטרציה ושיפור פרומפטים" timing map
 *
 * Full narration: 328.32s (5:28.32) → 9850 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in the silence gaps between sentences.
 *
 * Structure: intro/recap → iteration concept → worked example (prompt → refine) →
 * what makes a good iteration → the 4 improvement directions (accuracy / format /
 * depth / argument), one scene each → process documentation → human judgment →
 * summary → closing university logo.
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
export const NARRATION_DURATION_SEC = 328.32;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Intro + recap: the 4 prompt components; the first answer isn't always perfect.
  "shot1-1": shot(0, 31.63),
  // Scene 2 — The idea of iteration + its definition (get → examine → identify → refine).
  "shot2-1": shot(31.63, 17.5),
  // Scene 3 — Worked example: the summary prompt we sent.
  "shot3-1": shot(49.13, 14.67),
  // Scene 4 — The refinement: a focused follow-up instruction (expand the methods part).
  "shot4-1": shot(63.8, 24.66),
  // Scene 5 — What we did = a good iteration (point, explain, keep the rest).
  "shot5-1": shot(88.46, 15.34),
  // Scene 6 — Four improvement directions: accuracy / format / depth / argument.
  "shot6-1": shot(103.8, 10.82),
  // Scene 7 — Direction 1: Accuracy (right in general, not specific enough).
  "shot7-1": shot(114.62, 29.36),
  // Scene 8 — Direction 2: Format (content good, form inconvenient).
  "shot8-1": shot(143.98, 31.05),
  // Scene 9 — Direction 3: Depth (clear but shallow — describe vs explain).
  "shot9-1": shot(175.03, 28.91),
  // Scene 10 — Direction 4: Argument (claim + reasons + supporting example).
  "shot10-1": shot(203.94, 40.84),
  // Scene 11 — Documenting the process: prompt / output / what changed (3-round example).
  "shot11-1": shot(244.78, 34.89),
  // Scene 12 — The human judgment: read, checked, decided — the tool doesn't replace judgment.
  "shot12-1": shot(279.67, 21.45),
  // Scene 13 — Summary: treat the first answer as a draft; ask the 4 questions each round.
  "shot13-1": shot(301.12, NARRATION_DURATION_SEC - 301.12),
  // Scene 14 — University logo closing (after narration ends).
  "shot14-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1",
  "shot6-1", "shot7-1", "shot8-1", "shot9-1", "shot10-1",
  "shot11-1", "shot12-1", "shot13-1", "shot14-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
