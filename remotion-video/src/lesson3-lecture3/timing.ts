/**
 * Lesson 3 — Lecture 3 — "שקיפות ותיעוד — ציטוט AI ויצירת Appendix" timing map
 *
 * Full narration: 181.79s → 5454 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in silence gaps between sentences.
 *
 * Structure: opening (transparency is a skill) → overview (3 requirements) →
 * APA intro → APA details (+example image) → APA two purposes →
 * MLA intro → MLA details (+example image) → MLA why the prompt →
 * two common errors (vague / citing AI as a source) →
 * Appendix intro → what to include → what NOT to include → a good appendix →
 * summary + goodbye → closing university logo.
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

/** Total narration duration in seconds (ffprobe). */
export const NARRATION_DURATION_SEC = 181.79;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening: integrity is also about reporting; transparency is a skill
  "shot1-1": shot(0, 15.64),
  // Scene 2 — Overview: three transparency requirements (APA / MLA / Appendix)
  "shot2-1": shot(15.64, 9.98),
  // Scene 3 — APA intro: most common in social & natural sciences
  "shot3-1": shot(25.62, 5.74),
  // Scene 4 — APA details: 4 fields + in-text + reference list (USER IMAGE 1)
  "shot4-1": shot(31.36, 23.2),
  // Scene 4 — APA: two different purposes both deserve a citation
  "shot4-2": shot(54.56, 8.66),
  // Scene 5 — MLA intro: more common in the humanities
  "shot5-1": shot(63.22, 4.7),
  // Scene 6 — MLA details: in-text (ChatGPT) + Works Cited fields incl. the prompt (USER IMAGE 2)
  "shot6-1": shot(67.92, 16.22),
  // Scene 6 — MLA: why the prompt? the output depends on the question (USER IMAGE 2)
  "shot6-2": shot(84.14, 8.2),
  // Scene 7 — Error 1: vague "AI was used" without any detail
  "shot7-1": shot(92.34, 13.96),
  // Scene 7 — Error 2: citing AI as a source, as if a scientific article
  "shot7-2": shot(106.3, 15.44),
  // Scene 8 — Appendix intro: what an AI-use appendix is
  "shot8-1": shot(121.74, 14.7),
  // Scene 9 — Appendix: what you MUST include (4 items)
  "shot9-1": shot(136.44, 14.65),
  // Scene 10 — Appendix: what NOT to include
  "shot10-1": shot(151.09, 9.41),
  // Scene 10 — A good appendix: concise, clear, no detail overload
  "shot10-2": shot(160.5, 6.96),
  // Scene 11 — Summary: transparency is a skill + goodbye
  "shot11-1": shot(167.46, 14.33),
  // Scene 12 — University logo closing (after narration ends)
  "shot12-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1",
  "shot4-1", "shot4-2",
  "shot5-1", "shot6-1", "shot6-2",
  "shot7-1", "shot7-2",
  "shot8-1", "shot9-1",
  "shot10-1", "shot10-2",
  "shot11-1", "shot12-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
