/**
 * Lesson 2 — Lecture 1 — "AI לעומת מנועי חיפוש (חלק א')" timing map
 *
 * Full narration: ~275.98s (4:35.98) → 8279 frames @ 30fps.
 *
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt).
 * Scenes 1-3 are built; the remainder (scenes 4-12) is covered by a single
 * "rest" placeholder so the full narration stays on the timeline until those
 * scenes are built (see docs/תסריט remotion lesson2-lecture1.md).
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
  // Scene 1 — Opening + the question (Google vs ChatGPT)
  "shot1-1": shot(0, 27.3),
  // Scene 2 — The simplistic answer
  "shot2-1": shot(27.3, 9.5),
  // Scene 3 — Search engine = information retrieval
  "shot3-1": shot(36.8, 27.82),
  // PLACEHOLDER — scenes 4-12 (not built yet), keeps full narration on the timeline
  rest: shot(64.62, NARRATION_DURATION_SEC - 64.62),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = ["shot1-1", "shot2-1", "shot3-1", "rest"] as const;

/** Total video duration in frames */
export const TOTAL_DURATION_FRAMES = SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
