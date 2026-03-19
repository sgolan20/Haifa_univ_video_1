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
 * Shot 5.2 — Teaser for next video + Goodbye
 *
 * Duration: 464 frames (15.48s)
 *
 * Narration sync (relative to shot start):
 *   f0:   "בסרטון הבא נדבר על תופעה נוספת במודלי שפה" (0.0s)
 *   f138: "הטיות" (4.6s)
 *   f165: "ועל האופן שבו הנתונים...משפיעים על התשובות" (5.5s)
 *   f336: "להתראות" (11.2s)
 *
 * Phase 1 (f0-300):   Cinematic teaser — "הטיות (Biases)"
 * Phase 2 (f300-464): Goodbye + fade out
 */

export const Shot5_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =====================
  // Background
  // =====================
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 1: Teaser
  // =====================

  // "בסרטון הבא:" subtitle
  const subtitleScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const subtitleOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line grows from center
  const lineWidth = interpolate(frame, [25, 80], [0, 240], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "הטיות (Biases)" — dramatic entrance
  const biasesScale = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 90, mass: 0.7 },
  });

  const biasesOpacity = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow on title
  const glowPulse = 0.6 + Math.sin(frame * 0.06) * 0.25;

  // Supporting text
  const supportOpacity = interpolate(frame, [170, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const supportY = interpolate(frame, [170, 200], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Teaser content fades out
  const teaserFade = interpolate(frame, [290, 320], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 2: Goodbye
  // =====================
  const goodbyeScale = spring({
    frame: frame - 320,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  const goodbyeOpacity = interpolate(frame, [320, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade out
  const finalFade = interpolate(frame, [430, 464], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: finalFade }}>
      {/* Background image — tilted scale */}
      <Img
        src={staticFile("video2b/images/shot5_2_biases_teaser_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 45%, ${COLORS.bgSecondary}88 0%, ${COLORS.bgPrimary}ee 65%)`,
        }}
      />

      {/* Cinematic vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* ══════════════ PHASE 1: TEASER ══════════════ */}
      {frame < 330 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            opacity: teaserFade,
          }}
        >
          {/* "בסרטון הבא:" subtitle */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              fontWeight: 500,
              color: COLORS.textMuted,
              direction: "rtl",
              opacity: subtitleOpacity,
              transform: `scale(${subtitleScale})`,
            }}
          >
            בסרטון הבא:
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: lineWidth,
              height: 2,
              background: `linear-gradient(to right, transparent, ${COLORS.secondary}88, transparent)`,
              borderRadius: 1,
            }}
          />

          {/* Main title — "הטיות (Biases)" */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 80,
              fontWeight: 800,
              color: COLORS.secondary,
              direction: "rtl",
              textAlign: "center",
              transform: `scale(${biasesScale})`,
              opacity: biasesOpacity,
              textShadow: `
                0 0 ${40 + 30 * glowPulse}px ${COLORS.secondary}55,
                0 0 80px ${COLORS.secondary}22,
                0 2px 12px rgba(0,0,0,0.5)
              `,
              letterSpacing: "-1px",
            }}
          >
            הטיות (Biases)
          </div>

          {/* Second decorative line */}
          <div
            style={{
              width: lineWidth * 0.6,
              height: 1.5,
              background: `linear-gradient(to right, transparent, ${COLORS.secondary}55, transparent)`,
              borderRadius: 1,
              opacity: biasesOpacity,
            }}
          />

          {/* Supporting text */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 32,
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              direction: "rtl",
              textAlign: "center",
              opacity: supportOpacity,
              transform: `translateY(${supportY}px)`,
              lineHeight: 1.6,
              maxWidth: 900,
            }}
          >
            איך הנתונים שעליהם המודל אומן
            <br />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
              משפיעים על התשובות שהוא מייצר
              {/* Animated left-pointing arrow */}
              <svg
                width="70"
                height="36"
                viewBox="0 0 50 26"
                style={{
                  opacity: 0.7,
                  transform: `translateX(${Math.sin(frame * 0.05) * -5}px)`,
                  flexShrink: 0,
                }}
              >
                <path
                  d="M45 13 L12 13 M20 5 L12 13 L20 21"
                  stroke={COLORS.secondary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  opacity={0.6}
                />
              </svg>
            </span>
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 2: UNIVERSITY LOGO ══════════════ */}
      {frame >= 300 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              transform: `scale(${goodbyeScale})`,
              opacity: goodbyeOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "50px 70px",
                borderRadius: 30,
                background: "rgba(255, 255, 255, 0.95)",
              }}
            >
              <Img
                src={staticFile("images/haifa-logo.png")}
                style={{ height: 300 }}
              />
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
