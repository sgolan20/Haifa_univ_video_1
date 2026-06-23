/**
 * Lesson 4 — Lecture 1 — "שקיפות ותיעוד — ציטוט AI ויצירת Appendix" timing map
 *
 * Full narration: 182.05s → 5462 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in silence gaps between sentences.
 *
 * NOTE: two sentences were re-recorded (pronunciation fixes) and spliced in:
 * the APA "בַּפֶּלֶט" sentence (shot4-1) and the MLA "הַפֶּלֶט" sentence (shot6-2).
 * All boundaries below reflect the spliced audio (shot4-1 +0.52s, shot6-2 -0.26s).
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

/** Total narration duration in seconds (ffprobe). Includes a clean 0.5s pause that
 *  replaced a bad splice/stray "ל" between "ובמדעי הטבע" and "לפי תקן" (net -0.37s). */
export const NARRATION_DURATION_SEC = 181.65;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening: integrity is also about reporting; transparency is a skill
  "shot1-1": shot(0, 15.64),
  // Scene 2 — Overview: three transparency requirements (APA / MLA / Appendix)
  "shot2-1": shot(15.64, 9.98),
  // Scene 3 — APA intro: most common in social & natural sciences
  // (shortened 0.37s: removed a stray "ל" + tightened the gap before "לפי תקן")
  "shot3-1": shot(25.62, 5.37),
  // Scene 4 — APA details: 4 fields + in-text + reference list (USER IMAGE 1) — spliced "בַּפֶּלֶט" sentence (+0.52s)
  "shot4-1": shot(30.99, 23.72),
  // Scene 4 — APA: two different purposes both deserve a citation
  "shot4-2": shot(54.71, 8.66),
  // Scene 5 — MLA intro: more common in the humanities
  "shot5-1": shot(63.37, 4.7),
  // Scene 6 — MLA details: in-text (ChatGPT) + Works Cited fields incl. the prompt (USER IMAGE 2)
  "shot6-1": shot(68.07, 16.22),
  // Scene 6 — MLA: why the prompt? the output depends on the question (USER IMAGE 2) — spliced "הַפֶּלֶט" sentence (-0.26s)
  "shot6-2": shot(84.29, 7.94),
  // Scene 7 — Error 1: vague "AI was used" without any detail
  "shot7-1": shot(92.23, 13.96),
  // Scene 7 — Error 2: citing AI as a source, as if a scientific article
  "shot7-2": shot(106.19, 15.44),
  // Scene 8 — Appendix intro: what an AI-use appendix is
  "shot8-1": shot(121.63, 14.7),
  // Scene 9 — Appendix: what you MUST include (4 items)
  "shot9-1": shot(136.33, 14.65),
  // Scene 10 — Appendix: what NOT to include
  "shot10-1": shot(150.98, 9.41),
  // Scene 10 — A good appendix: concise, clear, no detail overload
  "shot10-2": shot(160.39, 6.96),
  // Scene 11 — Summary: transparency is a skill + goodbye
  "shot11-1": shot(167.35, 14.33),
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
