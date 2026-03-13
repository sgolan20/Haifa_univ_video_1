/**
 * Video 2 — "Hallucinations (הזיות)" timing map
 *
 * Aligned to ElevenLabs STT word-level timestamps.
 * Full narration: ~387s (6:27)
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
  "shot1-1": shot(0.1, 20.6),    // Narrator talking head
  "shot1-2": shot(20.6, 13.8),   // Title "Hallucinations — הזיות"

  // Scene 2 — What are Hallucinations?
  "shot2-1": shot(34.4, 12.2),   // Definition
  "shot2-2": shot(46.6, 44.2),   // 4 examples (quotes, sources, facts, stats)
  "shot2-3": shot(90.8, 11.9),   // Danger — looks authentic

  // Scene 3 — Why does it happen?
  "shot3-1": shot(102.7, 16.2),  // Back to prediction principle
  "shot3-2": shot(119.0, 36.8),  // Nobel Prize example
  "shot3-3": shot(155.8, 23.2),  // Result — convincing but wrong

  // Scene 4 — Why is the model so confident?
  "shot4-1": shot(178.9, 19.4),  // No self-awareness mechanism
  "shot4-2": shot(198.4, 36.1),  // Learned writing style + memory analogy

  // Scene 5 — Do all models hallucinate?
  "shot5-1": shot(234.5, 39.1),  // Scale of models, built-in issue

  // Scene 6 — What it means for students
  "shot6-1": shot(273.6, 36.5),  // 3 practical guidelines
  "shot6-2": shot(310.1, 11.7),  // Convincing style ≠ correct info

  // Scene 7 — Thought question
  "shot7-1": shot(321.7, 21.2),  // Responsibility question

  // Scene 8 — Summary & closing
  "shot8-1": shot(342.9, 35.8),  // 5 key points
  "shot8-2": shot(378.7, 8.7),   // Teaser for next video + goodbye
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1",
  "shot1-2",
  "shot2-1",
  "shot2-2",
  "shot2-3",
  "shot3-1",
  "shot3-2",
  "shot3-3",
  "shot4-1",
  "shot4-2",
  "shot5-1",
  "shot6-1",
  "shot6-2",
  "shot7-1",
  "shot8-1",
  "shot8-2",
] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
