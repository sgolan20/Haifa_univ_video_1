import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";


/**
 * Shot 5.1 — "שאלה למחשבה" — rhetorical questions
 *
 * Duration: 510 frames (17.0s)
 *
 * Phase 1 (f0-400):   "שאלה למחשבה" + two rhetorical questions
 * Phase 2 (f400-510): Contemplative pause — questions stay, particles float, fade out
 *
 * Whisper by_shot aligned (audioStart=116.15s):
 *   f14   (0.47s)  "ולסיום שאלה למחשבה"
 *   f78   (2.61s)  "אם כלי בינה מלאכותית יכולים לייצר מידע משכנע"
 *   f228  (7.61s)  "מהי האחריות של המשתמש בכלי כזה?"
 *   f320  (10.67s) "והאם השימוש בהם משנה את האופן..."
 *   f509  (16.97s) "אקדמית" — narration ends
 */

/* ─── Floating Particle ────────────────────────────────────── */

const Particle: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  frame: number;
}> = ({ x, y, size, color, speed, frame }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y + Math.sin(frame * speed * 0.01) * 3}%`,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      opacity: 0.15 + 0.1 * Math.sin(frame * speed * 0.02),
      filter: `blur(${size > 6 ? 2 : 0}px)`,
    }}
  />
);

/* ─── Main Shot Component ──────────────────────────────────── */

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Background gradient shift — warm/contemplative ── */
  const gradientShift = interpolate(frame, [0, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: Questions ── */
  const sectionTitle = spring({
    frame: frame - 14,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const question1 = spring({
    frame: frame - 228,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  const question2 = spring({
    frame: frame - 320,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Final fade out at end of shot (extended to 555 frames)
  const finalFade = interpolate(frame, [510, 555], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particles data (stable, no randomness)
  const particles = [
    { x: 15, y: 20, size: 5, color: COLORS.secondary, speed: 1.2 },
    { x: 75, y: 30, size: 8, color: COLORS.accent, speed: 0.8 },
    { x: 40, y: 70, size: 4, color: COLORS.primary, speed: 1.5 },
    { x: 85, y: 60, size: 6, color: COLORS.secondary, speed: 1.0 },
    { x: 25, y: 80, size: 7, color: COLORS.accent, speed: 0.9 },
    { x: 60, y: 15, size: 5, color: COLORS.primary, speed: 1.3 },
    { x: 10, y: 50, size: 4, color: COLORS.secondary, speed: 1.1 },
    { x: 90, y: 40, size: 6, color: COLORS.accent, speed: 0.7 },
  ];

  return (
    <AbsoluteFill style={{ opacity: finalFade }}>
      {/* Background image */}
      <Img
        src={staticFile("video2b/images/shot5_1_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
      />
      {/* Gradient overlay — smooth shift from cool to warm */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center,
            ${COLORS.bgSecondary}99 0%,
            ${COLORS.bgPrimary}f0 70%)`,
          opacity: interpolate(gradientShift, [0, 1], [1, 0.75], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} frame={frame} />
      ))}

      {/* ══════════════ PHASE 1 & 2: QUESTIONS ══════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: 1,
          gap: 36,
          padding: "0 100px",
        }}
      >
        {/* Section title — large and prominent */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${sectionTitle})`,
          }}
        >
          {/* Title text */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.accent,
              direction: "rtl",
              textAlign: "center",
              textShadow: `0 0 60px ${COLORS.accent}88, 0 0 120px ${COLORS.accent}33, 0 2px 12px rgba(0,0,0,0.6)`,
              letterSpacing: "2px",
              position: "relative",
            }}
          >
            שאלה למחשבה
            {/* Decorative underline */}
            <div
              style={{
                position: "absolute",
                bottom: -16,
                left: "50%",
                transform: "translateX(-50%)",
                width: interpolate(frame, [14, 60], [0, 100], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                maxWidth: 400,
                height: 3,
                background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
                borderRadius: 2,
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* Question 1 */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            lineHeight: 1.5,
            transform: `scale(${question1})`,
            opacity: question1,
            maxWidth: 1200,
          }}
        >
          מהי <span style={{ color: COLORS.accent, fontWeight: 800 }}>האחריות</span> של המשתמש בכלי AI?
        </div>

        {/* Question 2 */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            direction: "rtl",
            textAlign: "center",
            lineHeight: 1.6,
            transform: `scale(${question2})`,
            opacity: question2,
            maxWidth: 1200,
          }}
        >
          האם השימוש בכלי AI משנה את האופן שבו אנו חושבים
          <br />
          על <span style={{ color: COLORS.accent, fontWeight: 700 }}>אמינות מחקרית</span> וכתיבה אקדמית?
        </div>
      </div>

    </AbsoluteFill>
  );
};
