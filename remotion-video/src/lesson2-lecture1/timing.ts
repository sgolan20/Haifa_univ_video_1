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
  // Scene 4 — AI model = information generation
  "shot4-1": shot(64.62, 29.9),
  // Scene 5 — Hybrid systems (the lines blur)
  "shot5-1": shot(94.52, 31.66),
  // Scene 6 — The principle: which kind of output did I get?
  "shot6-1": shot(126.18, 15.02),
  // Scene 7 — The limitation: hallucinations
  "shot7-1": shot(141.2, 39.62),
  // Scene 8 — The danger: a convincing style hides the error
  "shot8-1": shot(180.82, 19.88),
  // Scene 9 — AI is an excellent tool (when you know its traits)
  "shot9-1": shot(200.7, 28.0),
  // Scene 10 — The problem: treating summarized output as a citable source
  "shot10-1": shot(228.7, 12.44),
  // Scene 11 — The guiding rule
  "shot11-1": shot(241.14, 20.68),
  // Scene 12 — Summary + teaser for Part B
  "shot12-1": shot(261.82, NARRATION_DURATION_SEC - 261.82),
  // Scene 13 — University logo closing (after narration ends)
  "shot13-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1", "shot6-1",
  "shot7-1", "shot8-1", "shot9-1", "shot10-1", "shot11-1", "shot12-1",
  "shot13-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
