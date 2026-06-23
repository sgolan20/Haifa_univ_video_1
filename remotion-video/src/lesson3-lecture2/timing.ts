/**
 * Lesson 3 — Lecture 2 — "יושרה אקדמית בהקשר תחומי — לא תמיד יש תשובה אחת" timing map
 *
 * Full narration: 198.74s (3:18.74) → 5962 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in silence gaps between sentences.
 *
 * NOTE: Four sentences were re-recorded (pronunciation fixes) and spliced in:
 * the key-question sentence (shot3-1), the literature alternative (shot4-2),
 * the whole writing-example case (shot7-1), and the closing words (shot9-1).
 * All boundaries below reflect the spliced audio.
 *
 * Structure: opening (not uniform across disciplines) → task goals → the key
 * question (what vs. what-for) → 4 discipline examples, each split into a
 * case shot (…"האם זה לגיטימי?") and a verdict shot → the 3 guiding aspects →
 * summary → closing university logo.
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

/** Total narration duration in seconds (ffprobe). Includes a 0.5s pause inserted in shot5-2. */
export const NARRATION_DURATION_SEC = 198.941;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Opening: academic integrity is NOT uniform across disciplines
  "shot1-1": shot(0, 20.68),
  // Scene 2 — The difference comes from the task's goals (4 questions)
  "shot2-1": shot(20.68, 8.52),
  // Scene 3 — The key question: not "what did you do" but "what was the task for" (re-recorded)
  "shot3-1": shot(29.2, 8.5),
  // Scene 4 — Example 1: Literature — the case ("האם זה לגיטימי?")
  "shot4-1": shot(37.7, 12.38),
  // Scene 4 — Example 1: Literature — the verdict (alternative re-recorded with niqqud fix לַדְּמוּת)
  "shot4-2": shot(50.08, 23.35),
  // Scene 5 — Example 2: Computer Science — the case
  "shot5-1": shot(73.43, 11.28),
  // Scene 5 — Example 2: CS — the verdict (depends on course guidelines)
  // (extended +0.5s: a half-second pause inserted before "עם זאת")
  "shot5-2": shot(84.71, 20.06),
  // Scene 6 — Example 3: Statistics — the case (+0.5s shift from inserted pause)
  "shot6-1": shot(104.77, 10.82),
  // Scene 6 — Example 3: Statistics — the verdict
  "shot6-2": shot(115.59, 16.39),
  // Scene 7 — Example 4: Academic writing in English — the case
  // (re-recorded with lead-in + stability 0.65 to fix the v3 warm-up accent drift)
  "shot7-1": shot(131.98, 10.97),
  // Scene 7 — Example 4: Writing — the verdict (often YES, with a caveat)
  "shot7-2": shot(142.95, 15.0),
  // Scene 8 — So how do you know? The three guiding aspects
  "shot8-1": shot(157.95, 19.05),
  // Scene 9 — Summary: judgment required + goodbye (closing words re-recorded)
  "shot9-1": shot(177.0, 21.94),
  // Scene 10 — University logo closing (after narration ends)
  "shot10-1": shot(NARRATION_DURATION_SEC, 2.5),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1",
  "shot4-1", "shot4-2",
  "shot5-1", "shot5-2",
  "shot6-1", "shot6-2",
  "shot7-1", "shot7-2",
  "shot8-1", "shot9-1", "shot10-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
