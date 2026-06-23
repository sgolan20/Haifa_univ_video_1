/**
 * Lesson 7 — Lecture 1 — "חשיבה ביקורתית על תוצרי AI" timing map
 *
 * Full narration: 323.92s (5:23.92) → 9718 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in the silence gaps between sentences.
 *
 * Structure: intro (talking head) → AI looks good → convincing ≠ good →
 * from phrasing to judgment → bias (not neutral / subtle / leader example /
 * what's not written) → weak arguments → verify sources → is there thought →
 * the human's contribution + originality → the 3 questions (clear/correct/critical)
 * → summary → closing university logo.
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

/** Total narration duration in seconds (ffprobe). */
export const NARRATION_DURATION_SEC = 323.92;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Intro (talking head): recap + "don't settle for an answer that only looks good".
  "shot1-1": shot(0, 17.89),
  // Scene 2 — AI outputs look very good (organized language, intro & summary, pro words).
  "shot2-1": shot(17.89, 15.28),
  // Scene 3 — Convincing ≠ good: clear-but-inaccurate / organized-but-shallow / ...
  "shot3-1": shot(33.17, 14.24),
  // Scene 4 — From a question of phrasing to a question of judgment.
  "shot4-1": shot(47.41, 11.59),
  // Scene 5 — Bias: the model isn't neutral; it learns from human texts that carry assumptions.
  "shot5-1": shot(59.0, 17.7),
  // Scene 6 — Bias is subtle: examples, style, what's central, what's omitted.
  "shot6-1": shot(76.7, 15.3),
  // Scene 7 — The "successful leader" example: notice who appears, which cultures, representation.
  "shot7-1": shot(92.0, 23.0),
  // Scene 8 — The problem isn't "wrong" — it's presenting one view as natural. Notice what's NOT written.
  "shot8-1": shot(115.0, 16.4),
  // Scene 9 — Weak arguments: looks structured, but links are weak / unverified / one-sided + false certainty.
  "shot9-1": shot(131.4, 37.6),
  // Scene 10 — "studies show…" is not proof: verify sources; academic = real source + checkable claim.
  "shot10-1": shot(169.0, 20.94),
  // Scene 11 — Beyond correctness: is there real thought? texts too general, summarizing the middle.
  "shot11-1": shot(189.94, 19.46),
  // Scene 12 — The human's contribution + originality (a distinction, an example, an objection…).
  "shot12-1": shot(209.4, 33.78),
  // Scene 13 — The three questions: Clear? Correct? Critical?
  "shot13-1": shot(243.18, 41.54),
  // Scene 14 — Summary: the work begins after AI finishes; AI doesn't exempt us from thinking.
  "shot14-1": shot(284.72, NARRATION_DURATION_SEC - 284.72),
  // Scene 15 — University logo closing (after narration ends).
  "shot15-1": shot(NARRATION_DURATION_SEC, 2.5),
};

export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1",
  "shot6-1", "shot7-1", "shot8-1", "shot9-1", "shot10-1",
  "shot11-1", "shot12-1", "shot13-1", "shot14-1", "shot15-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
