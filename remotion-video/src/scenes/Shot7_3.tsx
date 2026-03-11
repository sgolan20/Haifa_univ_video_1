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
 * Shot 7.3 — Venn Diagram / The Paradox (18 seconds)
 * Two circles: Music + Mathematics. They approach each other.
 * At overlap: "שילוב חדש!" with sparkle effect.
 */

export const Shot7_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Circle movement toward each other
  const moveProgress = interpolate(frame, [60, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const circleOffset = interpolate(moveProgress, [0, 1], [300, 140]);

  // Overlap reveal
  const overlapIn = spring({
    frame: frame - 260,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Sparkle burst
  const sparkleStart = 280;
  const sparkleProgress = interpolate(frame, [sparkleStart, sparkleStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Music notes floating inside circle 1
  const NOTES = ["♪", "♫", "♬", "♩"];
  // Math symbols inside circle 2
  const MATH = ["∫", "π", "∑", "∂"];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.text,
          opacity: titleIn,
          direction: "rtl",
        }}
      >
        הפרדוקס: שילוב רעיונות חדש
      </div>

      {/* Venn diagram */}
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Circle 1 — Music (blue) */}
        <circle
          cx={960 - circleOffset}
          cy={500}
          r={220}
          fill="#3b82f615"
          stroke="#3b82f6"
          strokeWidth={3}
          opacity={0.7}
        />
        <text
          x={960 - circleOffset}
          y={380}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={36}
          fontWeight={800}
          fill="#3b82f6"
        >
          מוזיקה
        </text>

        {/* Floating music notes */}
        {NOTES.map((note, i) => {
          const nx = 960 - circleOffset + Math.cos((frame * 0.03 + i * 1.5)) * 100;
          const ny = 500 + Math.sin((frame * 0.04 + i * 1.2)) * 80;
          return (
            <text
              key={`note-${i}`}
              x={nx}
              y={ny}
              textAnchor="middle"
              fontSize={32}
              fill="#3b82f6"
              opacity={0.5}
            >
              {note}
            </text>
          );
        })}

        {/* Circle 2 — Math (purple) */}
        <circle
          cx={960 + circleOffset}
          cy={500}
          r={220}
          fill={`${COLORS.secondary}15`}
          stroke={COLORS.secondary}
          strokeWidth={3}
          opacity={0.7}
        />
        <text
          x={960 + circleOffset}
          y={380}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={36}
          fontWeight={800}
          fill={COLORS.secondary}
        >
          מתמטיקה
        </text>

        {/* Floating math symbols */}
        {MATH.map((sym, i) => {
          const mx = 960 + circleOffset + Math.cos((frame * 0.035 + i * 1.3)) * 100;
          const my = 500 + Math.sin((frame * 0.045 + i * 1.1)) * 80;
          return (
            <text
              key={`math-${i}`}
              x={mx}
              y={my}
              textAnchor="middle"
              fontSize={30}
              fill={COLORS.secondary}
              opacity={0.5}
              fontFamily={FONT_FAMILY}
            >
              {sym}
            </text>
          );
        })}

        {/* Sparkle burst at overlap */}
        {sparkleProgress > 0 && Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = sparkleProgress * 80;
          const sx = 960 + Math.cos(angle) * r;
          const sy = 500 + Math.sin(angle) * r;
          return (
            <circle
              key={`sparkle-${i}`}
              cx={sx}
              cy={sy}
              r={4}
              fill={i % 2 === 0 ? COLORS.accent : COLORS.primary}
              opacity={(1 - sparkleProgress) * 0.8}
            />
          );
        })}
      </svg>

      {/* Overlap label */}
      {overlapIn > 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${overlapIn})`,
            opacity: overlapIn,
          }}
        >
          <div
            style={{
              padding: "20px 40px",
              borderRadius: 16,
              background: `${COLORS.accent}25`,
              border: `2px solid ${COLORS.accent}`,
              fontFamily: FONT_FAMILY,
              fontSize: 40,
              fontWeight: 800,
              color: COLORS.accent,
              direction: "rtl",
              textShadow: `0 0 20px ${COLORS.accent}66`,
              boxShadow: `0 0 40px ${COLORS.accent}33`,
            }}
          >
            שילוב חדש!
          </div>
        </div>
      )}

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: interpolate(frame, [300, 340], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        המודל משלב רעיונות בדרכים שמעולם לא הופיעו יחד
      </div>
    </AbsoluteFill>
  );
};
