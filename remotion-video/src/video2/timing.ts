/**
 * Video 2 — "Hallucinations (הזיות)" timing map
 *
 * Placeholder timing based on narration duration (~188s).
 * Will be refined with Whisper word-level timestamps.
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
  // Placeholder — single shot covering full narration
  "shot1-1": shot(0, 188),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1",
] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
