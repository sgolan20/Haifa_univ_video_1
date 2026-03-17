import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 5.2 — General Warning: All 3 Examples (375 frames, 12.5s)
 *
 * Narration sync (relative to shot start at 151.0s):
 *   f8-138:   "מה שמאתגר במיוחד בדוגמאות האלה הוא שהן נשמעות אמינות לחלוטין"
 *   f156-231: "שימו לב, אלה לא טעויות מופרכות"
 *   f244-302: "אלה טעויות שנשמעות סבירות מאוד"
 *   f318-373: "ולכן קל לפספס אותן"
 *
 * Phases:
 *   1. Warning card entrance (0–150)
 *   2. Warning lines appear sequentially (150–340)
 *   3. Recap badges (340–375)
 */

export const Shot5_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Warning card spring entrance
  const cardIn = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Warning triangle draw animation
  const triangleDraw = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Warning lines — synced to narration
  // "אלה לא טעויות מופרכות" at f156
  const line1Opacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "אלה טעויות שנשמעות סבירות מאוד" at f244
  const line2Opacity = interpolate(frame, [240, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "ולכן קל לפספס אותן" at f318
  const line3Opacity = interpolate(frame, [314, 334], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing red glow
  const pulseShadow = 20 + Math.sin(frame * 0.08) * 10;

  // Red ambient glow in background
  const redGlow = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.03, 0.12],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Red ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 1200,
          height: 800,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.warning} 0%, transparent 70%)`,
          opacity: redGlow,
          pointerEvents: "none",
        }}
      />

      {/* Warning card — centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${cardIn})`,
          opacity: cardIn,
          background: "rgba(239,68,68,0.08)",
          border: `2px solid ${COLORS.warning}`,
          borderRadius: 16,
          padding: "50px 70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          maxWidth: 950,
          width: "80%",
          boxShadow: `0 0 ${pulseShadow}px ${COLORS.warning}33`,
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Warning triangle SVG */}
        <svg width="90" height="90" viewBox="0 0 24 24">
          <path
            d="M12 2L1 21h22L12 2z"
            fill="none"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray={60}
            strokeDashoffset={60 * (1 - triangleDraw)}
          />
          <text
            x="12"
            y="18"
            textAnchor="middle"
            fill={COLORS.warning}
            fontSize="12"
            fontWeight="bold"
            fontFamily={FONT_FAMILY}
            opacity={triangleDraw}
          >
            !
          </text>
        </svg>

        {/* Line 1: "אלה לא טעויות מופרכות" */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 46,
            fontWeight: 700,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            opacity: line1Opacity,
          }}
        >
          אלה לא טעויות מופרכות
        </div>

        {/* Line 2: "אלה טעויות שנשמעות סבירות מאוד" */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            opacity: line2Opacity,
          }}
        >
          אלה טעויות שנשמעות סבירות מאוד
        </div>

        {/* Line 3: "ולכן קל לפספס אותן" — accent gold */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 42,
            fontWeight: 700,
            color: COLORS.accent,
            direction: "rtl",
            textAlign: "center",
            opacity: line3Opacity,
            textShadow: `0 0 16px ${COLORS.accent}66, 0 0 32px ${COLORS.accent}33`,
          }}
        >
          ולכן קל לפספס אותן
        </div>
      </div>

    </AbsoluteFill>
  );
};
