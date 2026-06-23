/**
 * Lesson 5 — Lecture 1 — "אוריינות פרומפטים — איך לנסח הנחיה שעובדת" timing map.
 *
 * Full narration: 232.28s (3:52.28) -> 6968 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps
 * (`public/lesson5-lecture1/audio/full_narration.srt`) and cut between complete ideas.
 */

export const FPS = 30;

export interface ShotTiming {
  audioStart: number;
  duration: number;
  audioStartFrame: number;
  durationInFrames: number;
}

const shot = (audioStart: number, duration: number): ShotTiming => ({
  audioStart,
  duration,
  audioStartFrame: Math.round(audioStart * FPS),
  durationInFrames: Math.round(duration * FPS),
});

export const NARRATION_DURATION_SEC = 226.31;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Opening: course tasks, vague prompt, wrong direction.
  "shot1-1": shot(0, 28.24),
  // Definition: prompt as instruction, clarity increases usefulness.
  "shot2-1": shot(28.24, 14.54),
  // Good prompts are not magic; they reduce guessing.
  "shot3-1": shot(42.78, 20.24),
  // Anatomy of a full prompt — upper reference image.
  "shot4-1": shot(63.02, 48.3),
  // Demonstration: vague vs improved prompt — lower reference image.
  // (improved-prompt narration re-recorded to match the green panel; block shortened 5.94s)
  "shot5-1": shot(111.32, 31.12),
  // What changed: the model no longer has to guess.
  "shot6-1": shot(142.44, 11.02),
  // Short prompt can be good when the task is simple.
  "shot7-1": shot(153.46, 19.94),
  // Complex academic work needs more context and instructions.
  "shot8-1": shot(173.4, 20.38),
  // Summary and teaser for iteration.
  "shot9-1": shot(193.78, 32.56),
  // University closing logo.
  "shot10-1": shot(NARRATION_DURATION_SEC, 2.5),
};

export const SHOT_ORDER = [
  "shot1-1",
  "shot2-1",
  "shot3-1",
  "shot4-1",
  "shot5-1",
  "shot6-1",
  "shot7-1",
  "shot8-1",
  "shot9-1",
  "shot10-1",
] as const;

export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
