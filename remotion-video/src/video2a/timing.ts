/**
 * Video 2A — "Hallucinations – כשהמודל נשמע משכנע אבל טועה" timing map
 *
 * Aligned to edited narration audio + Whisper word-level timestamps.
 * Full narration: ~177s (2:57)
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
  "shot1-1": shot(0, 27.0),

  // Scene 2 — What are Hallucinations?
  "shot2-1": shot(27.0, 32.0),

  // Scene 3 — Example 1: Inaccurate research attribution
  "shot3-1": shot(59.0, 33.5),

  // Scene 4 — Example 2: Plausible numerical data
  "shot4-1": shot(92.5, 29.5),

  // Scene 5 — Example 3: Summary adds info not in source
  "shot5-1": shot(122.0, 29.0),

  // Scene 5b — General warning about all 3 examples
  "shot5-2": shot(151.0, 12.5),

  // Scene 6 — Summary (extended to cover full audio duration of ~183s)
  "shot6-1": shot(163.5, 19.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1",
  "shot2-1",
  "shot3-1",
  "shot4-1",
  "shot5-1",
  "shot5-2",
  "shot6-1",
] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
