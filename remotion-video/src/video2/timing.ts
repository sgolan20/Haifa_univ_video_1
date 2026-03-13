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
  "shot1-1": shot(0.1, 20.5),    // Narrator talking head
  "shot1-2": shot(20.6, 13.8),   // Title "Hallucinations — הזיות"

  // Scene 2 — What are Hallucinations?
  "shot2-1": shot(34.4, 12.2),   // Definition
  "shot2-2": shot(46.6, 44.2),   // 4 examples (quotes, sources, facts, stats)
  "shot2-3": shot(90.8, 9.6),    // Danger — looks authentic

  // Scene 3 — Why does it happen?
  "shot3-1": shot(100.4, 18.4),  // Back to prediction principle
  "shot3-2": shot(118.8, 36.8),  // Nobel Prize example
  "shot3-3": shot(155.6, 20.9),  // Result — convincing but wrong

  // Scene 4 — Why is the model so confident?
  "shot4-1": shot(176.5, 21.7),  // No self-awareness mechanism
  "shot4-2": shot(198.2, 32.0),  // Learned writing style + memory analogy

  // Scene 5 — Do all models hallucinate?
  "shot5-1": shot(230.2, 43.0),  // Scale of models, built-in issue

  // Scene 6 — What it means for students
  "shot6-1": shot(273.2, 36.4),  // 3 practical guidelines
  "shot6-2": shot(309.6, 11.7),  // Convincing style ≠ correct info

  // Scene 7 — Thought question
  "shot7-1": shot(321.3, 21.1),  // Responsibility question

  // Scene 8 — Summary & closing
  "shot8-1": shot(342.4, 36.1),  // 5 key points
  "shot8-2": shot(378.5, 8.9),   // Teaser for next video + goodbye
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
