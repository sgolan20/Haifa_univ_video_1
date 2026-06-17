/**
 * Video 2A — "Hallucinations – כשהמודל נשמע משכנע אבל טועה" timing map
 *
 * Re-derived from ElevenLabs Scribe word-level timestamps on the patched
 * full_narration.mp3 (2026-06-17). Audio duration: 183.13s.
 * Boundaries set at the midpoint of the silence between shot narrations.
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
  // Scene 1 — Opening  [first word 0.16s / last "מקצועיים." 26.86s]
  "shot1-1": shot(0, 27.0),

  // Scene 2 — What are Hallucinations?  [first "מהן" 27.56s / last "דוגמאות." 58.54s]
  "shot2-1": shot(27.0, 31.9),

  // Scene 3 — Example 1: Inaccurate research attribution  [first "דוגמה" 59.20s / last "סבירה." 92.44s]
  "shot3-1": shot(58.9, 33.8),

  // Scene 4 — Example 2: Plausible numerical data  [first "דוגמה שתיים" 92.96s / last "מאחוריו." 121.80s]
  "shot4-1": shot(92.7, 29.4),

  // Scene 5 — Example 3: Summary adds info not in source  [first "דוגמה שלוש" 122.42s / last "וטכנולוגיה." 150.40s]
  "shot5-1": shot(122.1, 28.8),

  // Scene 5b — General warning about all 3 examples  [first "מה שמאתגר" 151.38s / last "אותן." 163.54s]
  "shot5-2": shot(150.9, 12.9),

  // Scene 6 — Summary + teaser  [first "אז אם" 164.12s / "הבא." 177.0s / audio ends 183.13s]
  "shot6-1": shot(163.8, 19.3),
};

/** Ordered list of shot IDs for sequencing */
export const SHOT_ORDER = [
  "shot1-1",
  "shot2-1",
  "shot3-1",
  "shot4-1",
  "shot5-1",
  "shot5-2",
  "shot6-1",
] as const;

/** Total video duration in frames (includes 6s opening title card) */
export const TITLE_CARD_FRAMES = 180;
export const TOTAL_DURATION_FRAMES = TITLE_CARD_FRAMES + SHOT_ORDER.reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);
