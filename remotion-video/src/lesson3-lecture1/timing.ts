/**
 * Lesson 3 — Lecture 1 — "יושרה אקדמית בעידן של AI" timing map
 *
 * Full narration: ~235.23s (3:55.23) → 7057 frames @ 30fps.
 *
 * Boundaries derived from ElevenLabs Scribe word timestamps
 * (full_narration.srt) — each shot starts exactly where its narration cue begins.
 * Re-derived after splicing two pronunciation fixes (feminine "מרצה" at the
 * plagiarism example; "עַל יָדִי" in the checklist). See docs/תסריט remotion lesson3-lecture1.md.
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

/** Total narration duration in seconds (ffmpeg probe of full_narration.mp3). */
export const NARRATION_DURATION_SEC = 235.23;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening: welcome (talking-head intro) + what we'll cover
  "shot1-1": shot(0, 14.94),
  // Scene 2 — What is academic integrity + the definition (honesty, transparency, credit)
  "shot2-1": shot(14.94, 16.26),
  // Scene 3 — In the AI era: not just what was written, but whose idea
  "shot3-1": shot(31.2, 15.87),
  // Scene 4 — Harm isn't always intentional + the blurred tool/replacement line
  "shot4-1": shot(47.07, 20.47),
  // Scene 5 — Risk #1: Plagiarism (definition)
  "shot5-1": shot(67.54, 20.98),
  // Scene 6 — When is it problematic? (example)  [tail = user-recorded fix1 passage]
  "shot6-1": shot(88.52, 15.58),
  // Scene 7 — When is it legitimate? (example)
  "shot7-1": shot(104.1, 15.5),
  // Scene 8 — The guiding rule
  "shot8-1": shot(119.6, 6.84),
  // Scene 9 — Risk #2: Fabricated sources + verify every source
  "shot9-1": shot(126.44, 22.72),
  // Scene 10 — Risk #3: Lack of understanding
  "shot10-1": shot(149.16, 15.86),
  // Scene 11 — Context-dependent: ask yourself
  "shot11-1": shot(165.02, 11.2),
  // Scene 12 — The 5-question checklist
  "shot12-1": shot(176.22, 21.26),
  // Scene 13 — If the answer is "no" — stop and check
  "shot13-1": shot(197.48, 7.94),
  // Scene 14 — Summary: a powerful tool, but it can't learn for you (ethical use)
  "shot14-1": shot(205.42, 19.42),
  // Scene 15 — Teaser for the next units
  "shot15-1": shot(224.84, NARRATION_DURATION_SEC - 224.84),
  // Scene 16 — University logo closing (after narration ends)
  "shot16-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1", "shot6-1",
  "shot7-1", "shot8-1", "shot9-1", "shot10-1", "shot11-1", "shot12-1",
  "shot13-1", "shot14-1", "shot15-1", "shot16-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
