/**
 * Video 2B — "למה מודלי שפה טועים לפעמים?" timing map
 *
 * Aligned to edited narration + Whisper word-level timestamps.
 * Full narration: ~148.6s (2:28)
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

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening
  "shot1-1": shot(0, 10.9),

  // Scene 2 — How does a language model generate an answer?
  "shot2-1": shot(10.9, 45.44),

  // Scene 3 — Why does the model sound so confident?
  "shot3-1": shot(56.34, 30.72),

  // Scene 4 — What does this mean for students?
  "shot4-1": shot(87.06, 29.09),

  // Scene 5 — Questions + Closing
  "shot5-1": shot(116.15, 17.0),
  "shot5-2": shot(133.15, 15.48),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1",
  "shot2-1",
  "shot3-1",
  "shot4-1",
  "shot5-1",
  "shot5-2",
] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
