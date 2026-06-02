/**
 * Lesson 2 — Lecture 1 — "AI לעומת מנועי חיפוש (חלק א')" timing map
 *
 * Full narration: ~230.71s (3:50.71) → 6921 frames @ 30fps.
 *
 * NOTE: Shot boundaries below are PLACEHOLDER — a single shot currently spans
 * the whole narration so it can be placed on the timeline for review.
 * Real per-scene boundaries will be derived from Whisper word-level timestamps
 * once the 12 scenes are built (see docs/תסריט remotion lesson2-lecture1.md).
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

/** Total narration duration in seconds (from STT word timestamps / ffmpeg probe). */
export const NARRATION_DURATION_SEC = 275.98;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // PLACEHOLDER — single shot covering the entire narration
  "shot1-1": shot(0, NARRATION_DURATION_SEC),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = ["shot1-1"] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
