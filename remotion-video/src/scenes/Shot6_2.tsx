import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 6.2 — Philosophical Elements (5 seconds)
 * Question marks form a spiral. Philosophical symbols fade in.
 * Contemplative mood with gentle floating.
 */

const SPIRAL_MARKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 4;
  const radius = 60 + i * 18;
  return { angle, radius, size: 24 + (12 - i) * 3 };
});

export const Shot6_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spiral rotation
  const spiralRotation = frame * 0.4;

  // Philosophical icons fade in
  const iconsOpacity = interpolate(frame, [30, 60], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a1040 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Spiral of question marks */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${spiralRotation}deg)`,
        }}
      >
        {SPIRAL_MARKS.map((mark, i) => {
          const x = Math.cos(mark.angle) * mark.radius;
          const y = Math.sin(mark.angle) * mark.radius;
          const markOpacity = interpolate(
            Math.sin((frame + i * 20) * 0.05),
            [-1, 1],
            [0.15, 0.5]
          );

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${-spiralRotation}deg)`,
                fontFamily: FONT_FAMILY,
                fontSize: mark.size,
                fontWeight: 800,
                color: i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : COLORS.accent,
                opacity: markOpacity,
              }}
            >
              ?
            </div>
          );
        })}
      </div>

      {/* Philosophical symbols */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", opacity: iconsOpacity }}
      >
        {/* Book */}
        <g transform="translate(300, 200)">
          <rect x="0" y="0" width="50" height="60" rx="3" fill="none" stroke={COLORS.textMuted} strokeWidth="2" />
          <line x1="25" y1="0" x2="25" y2="60" stroke={COLORS.textMuted} strokeWidth="1" />
          <line x1="10" y1="15" x2="40" y2="15" stroke={COLORS.textMuted} strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="25" x2="40" y2="25" stroke={COLORS.textMuted} strokeWidth="1" opacity="0.5" />
        </g>

        {/* Brain */}
        <g transform="translate(1500, 300)">
          <ellipse cx="25" cy="20" rx="20" ry="22" fill="none" stroke={COLORS.textMuted} strokeWidth="2" />
          <path d="M15 20 Q25 10 35 20 Q25 30 15 20" fill="none" stroke={COLORS.textMuted} strokeWidth="1" />
        </g>

        {/* Lightbulb */}
        <g transform="translate(250, 750)">
          <circle cx="25" cy="20" r="18" fill="none" stroke={COLORS.textMuted} strokeWidth="2" />
          <line x1="18" y1="38" x2="32" y2="38" stroke={COLORS.textMuted} strokeWidth="2" />
          <line x1="20" y1="43" x2="30" y2="43" stroke={COLORS.textMuted} strokeWidth="2" />
          <line x1="25" y1="10" x2="25" y2="30" stroke={COLORS.textMuted} strokeWidth="1.5" />
        </g>

        {/* Infinity */}
        <g transform="translate(1550, 750)">
          <path d="M0 25 Q15 0 30 25 Q45 50 60 25 Q45 0 30 25 Q15 50 0 25" fill="none" stroke={COLORS.textMuted} strokeWidth="2" />
        </g>
      </svg>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.text,
          direction: "rtl",
          lineHeight: 1.4,
          opacity: interpolate(frame, [20, 50], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        שאלה שנוגעת לפילוסופיה של יצירתיות ומהות הידע
      </div>
    </AbsoluteFill>
  );
};
