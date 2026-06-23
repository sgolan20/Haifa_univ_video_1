/**
 * Lesson 8 — Lecture 1 — "עריכה ושכתוב בעזרת AI — תוך שמירה על קול אישי" timing map
 *
 * Full narration: 324.16s (5:24.16) → 9725 frames @ 30fps.
 * Boundaries derived from ElevenLabs Scribe word timestamps (full_narration.srt),
 * cut in the silence gaps between sentences.
 *
 * Structure: intro (talking head) → what AI editing does → the risk (voice fades) →
 * the key question → three rewrite types (polish / deepen / restructure) →
 * personal voice → returning your sentences → the marking workflow →
 * personal-style prompt → style work-prompt + judgment → 4-step workflow →
 * documenting changes → summary → closing logo.
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
export const NARRATION_DURATION_SEC = 324.16;

export const SHOT_TIMING: Record<string, ShotTiming> = {
  // Scene 1 — Intro (talking head): recap + "now: editing & rewriting".
  "shot1-1": shot(0, 16.3),
  // Scene 2 — What AI editing does: messy draft → clean, organized, convincing text.
  "shot2-1": shot(16.3, 10.6),
  // Scene 3 — The risk: "better" but less yours; the personal voice fades.
  "shot3-1": shot(26.9, 20.0),
  // Scene 4 — The key question: not whether, but how — without surrendering ownership.
  "shot4-1": shot(46.9, 7.3),
  // Scene 5 — Rewrite type 1: Polish (fix errors, keep the idea & style).
  "shot5-1": shot(54.2, 20.3),
  // Scene 6 — Rewrite type 2: Deepen (add explanation/example — but bound it).
  "shot6-1": shot(74.5, 24.2),
  // Scene 7 — Rewrite type 3: Restructure (order changes emphasis & argument).
  "shot7-1": shot(98.7, 21.9),
  // Scene 8 — Personal voice: word choice, examples, rhythm, directness, humor.
  "shot8-1": shot(120.6, 21.3),
  // Scene 9 — Returning your sentences: editing comes back to us.
  "shot9-1": shot(141.9, 30.7),
  // Scene 10 — The marking workflow: AI polishes → mark 3 generic spots → add a personal line.
  "shot10-1": shot(172.6, 19.8),
  // Scene 11 — Build a personal-style prompt (analyze your past texts).
  "shot11-1": shot(192.4, 28.4),
  // Scene 12 — Turn it into a work-prompt + apply judgment to the style profile.
  "shot12-1": shot(220.8, 33.0),
  // Scene 13 — A good 4-step workflow: human draft → defined AI edit → human review → return voice.
  "shot13-1": shot(253.8, 30.5),
  // Scene 14 — Ask AI to document changes (phrasing / structure / depth / tone).
  "shot14-1": shot(284.3, 17.1),
  // Scene 15 — Summary: AI is a great editor, but shouldn't replace your voice.
  "shot15-1": shot(301.4, NARRATION_DURATION_SEC - 301.4),
  // Scene 16 — University logo closing.
  "shot16-1": shot(NARRATION_DURATION_SEC, 2.5),
};

export const SHOT_ORDER = [
  "shot1-1", "shot2-1", "shot3-1", "shot4-1", "shot5-1", "shot6-1", "shot7-1", "shot8-1",
  "shot9-1", "shot10-1", "shot11-1", "shot12-1", "shot13-1", "shot14-1", "shot15-1", "shot16-1",
] as const;

export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
