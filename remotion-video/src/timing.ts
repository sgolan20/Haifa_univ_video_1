/**
 * Audio timing map — maps each shot to its narration segment
 * in the full narration file (public/audio/full_narration.mp3).
 *
 * Derived from:
 * 1. OpenAI Whisper word-level timestamps (tiny model)
 * 2. Narration content mapped to storyboard shots
 * 3. Scene boundaries verified against silence gaps
 *
 * Scene boundaries (Whisper-aligned):
 *   Scene 1→2: ~30s    Scene 2→3: ~82s    Scene 3→4: ~133s
 *   Scene 4→5: ~178s   Scene 5→6: ~227s   Scene 6→7: ~250s
 *   Scene 7→8: ~335s   Scene 8→9: ~372s   End: ~377s
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
  // Scene 1 — Opening (0–30s)
  "shot1-1": shot(0, 4),
  "shot1-2": shot(4, 10),
  "shot1-3": shot(14, 16),

  // Scene 2 — What is LLM? (30–82s)
  "shot2-1": shot(30, 16),
  "shot2-2": shot(46, 18),
  "shot2-3": shot(64, 18),

  // Scene 3 — Prediction Principle (82–133s)
  "shot3-1": shot(82, 11),
  "shot3-2": shot(93, 12),
  "shot3-3": shot(105, 18),
  "shot3-4": shot(123, 10),

  // Scene 4 — Why "Large"? (133–178s)
  "shot4-1": shot(133, 21),
  "shot4-2": shot(154, 9),
  "shot4-3": shot(163, 15),

  // Scene 5 — LLM vs Search Engine (178–227s)
  "shot5-1": shot(178, 17),
  "shot5-2": shot(195, 15),
  "shot5-3": shot(210, 17),

  // Scene 6 — Thought Question (227–250s)
  "shot6-1": shot(227, 17),
  "shot6-2": shot(244, 6),

  // Scene 7 — Creativity & Sampling (250–335s)
  "shot7-1": shot(250, 15),
  "shot7-2": shot(265, 9),
  "shot7-3": shot(274, 9),
  "shot7-4": shot(283, 18),
  "shot7-5": shot(301, 13),
  "shot7-6": shot(314, 9),
  "shot7-7": shot(323, 12),

  // Scene 8 — Summary (335–372s)
  "shot8-1": shot(335, 15),
  "shot8-2": shot(350, 12),
  "shot8-3": shot(362, 10),

  // Scene 9 — Closing (372–377s)
  "shot9-1": shot(372, 5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot1-2", "shot1-3",
  "shot2-1", "shot2-2", "shot2-3",
  "shot3-1", "shot3-2", "shot3-3", "shot3-4",
  "shot4-1", "shot4-2", "shot4-3",
  "shot5-1", "shot5-2", "shot5-3",
  "shot6-1", "shot6-2",
  "shot7-1", "shot7-2", "shot7-3", "shot7-4", "shot7-5", "shot7-6", "shot7-7",
  "shot8-1", "shot8-2", "shot8-3",
  "shot9-1",
] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
