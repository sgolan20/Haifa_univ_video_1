import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 6.1 — Summary + Teaser (405 frames, 13.5s)
 *
 * Narration sync:
 *   f14-98: "אז אם התשובות האלה נשמעות כל כך משכנעות"
 *   f101-198: "למה מודלי שפה בכלל מייצרים טעויות כאלה?"
 *   f220-330: "כדי להבין זאת צריך לחזור לעקרון הפעולה הבסיסי שלהם"
 *   f336-399: "על כך נדבר בסרטון הבא"
 *
 * Phases:
 *   1. The Question (0–200)
 *   2. Understanding line (200–310)
 *   3. Teaser (310–405)
 *   4. University Logo closing (420–585)
 */

export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: The Question (0-200) ---

  const line1In = spring({
    frame: frame - 14,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const line2In = spring({
    frame: frame - 100,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Rotating question mark in background
  const questionRotation = frame * 0.3;

  // --- Phase 2: Understanding line (200-310) ---

  // Move question texts up
  const textMoveUp = interpolate(frame, [210, 250], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const understandingIn = spring({
    frame: frame - 220,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // --- Phase 3: Teaser (310-390) ---

  // Fade existing text
  const textFadeOut = interpolate(frame, [325, 355], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow line grows from left to right
  const arrowProgress = interpolate(frame, [325, 375], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const teaserTextIn = spring({
    frame: frame - 340,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Final fade out of teaser content
  const finalFade = interpolate(frame, [375, 405], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 4: University Logo closing (420-585) ---
  const isLogoPhase = frame >= 415;

  const logoIn = spring({
    frame: frame - 425,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const logoFadeOut = interpolate(frame, [545, 585], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary }}>
      {/* Teaser content layer — fades out */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, #1a1033 0%, ${COLORS.bgPrimary} 70%)`,
          opacity: finalFade,
        }}
      >
      {/* Large background question mark SVG with glow */}
      <svg
        width="400"
        height="400"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${questionRotation}deg)`,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="questionGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <text
          x="200"
          y="280"
          textAnchor="middle"
          fill={COLORS.secondary}
          fontSize="300"
          fontFamily={FONT_FAMILY}
          fontWeight="800"
          filter="url(#questionGlow)"
        >
          ?
        </text>
      </svg>

      {/* Main content container */}
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
          gap: 30,
          opacity: textFadeOut,
          transform: `translateY(${textMoveUp}px)`,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 600,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            opacity: line1In,
            transform: `scale(${0.9 + line1In * 0.1})`,
            maxWidth: 1200,
          }}
        >
          אם התשובות נשמעות כל כך משכנעות...
        </div>

        {/* Line 2 — accent gold */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 54,
            fontWeight: 700,
            color: COLORS.accent,
            direction: "rtl",
            textAlign: "center",
            opacity: line2In,
            transform: `scale(${0.9 + line2In * 0.1})`,
            textShadow: `0 0 20px ${COLORS.accent}44, 0 0 40px ${COLORS.accent}22`,
            maxWidth: 1200,
          }}
        >
          למה מודלי שפה בכלל טועים?
        </div>

        {/* Understanding line (Phase 2) */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 400,
            color: COLORS.textMuted,
            direction: "rtl",
            textAlign: "center",
            opacity: understandingIn,
            transform: `translateY(${(1 - understandingIn) * 20}px)`,
            maxWidth: 1000,
          }}
        >
          כדי להבין — נחזור לעקרון הפעולה הבסיסי
        </div>
      </div>

      {/* Phase 3: Teaser arrow + text */}
      {frame >= 325 && (
        <>
          {/* Arrow SVG with proper arrowhead */}
          <svg
            width="400"
            height="60"
            viewBox="0 0 400 60"
            style={{
              position: "absolute",
              bottom: 200,
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          >
            <line
              x1={0}
              y1={30}
              x2={arrowProgress * 380}
              y2={30}
              stroke={COLORS.primary}
              strokeWidth={3}
              strokeLinecap="round"
            />
            <polygon
              points={`${arrowProgress * 380 - 10},20 ${arrowProgress * 380},30 ${arrowProgress * 380 - 10},40`}
              fill={COLORS.primary}
              opacity={arrowProgress > 0.85 ? interpolate(arrowProgress, [0.85, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0}
            />
          </svg>

          {/* Teaser text */}
          <div
            style={{
              position: "absolute",
              top: 680,
              width: "100%",
              textAlign: "center",
              opacity: teaserTextIn,
              transform: `scale(${0.9 + teaserTextIn * 0.1})`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 42,
                fontWeight: 700,
                color: COLORS.primary,
                direction: "rtl",
                textShadow: `0 0 20px ${COLORS.primary}44, 0 0 40px ${COLORS.primary}22`,
              }}
            >
              בסרטון הבא ←
            </span>
          </div>
        </>
      )}

      </AbsoluteFill>

      {/* Phase 4: University Logo closing screen — independent layer */}
      {isLogoPhase && (
        <AbsoluteFill
          style={{
            background: COLORS.bgPrimary,
            opacity: logoFadeOut,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${logoIn})`,
              opacity: logoIn,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
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
                style={{
                  height: 300,
                }}
              />
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
