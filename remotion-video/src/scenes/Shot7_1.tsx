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
 * Shot 7.1 — Sampling Concept (18 seconds)
 * Probability bars with a dice that falls and lands on an unexpected bar.
 * Shows that sampling doesn't always pick the most probable word.
 */

const BARS = [
  { word: "עבודה", pct: 60, color: COLORS.primary },
  { word: "אוניברסיטה", pct: 40, color: COLORS.primary },
  { word: "טיול", pct: 25, color: COLORS.primary },
  { word: "בית", pct: 15, color: COLORS.primary },
  { word: "ריצה", pct: 8, color: COLORS.primary },
];

// The dice will land on "טיול" (index 2) — the surprise!
const SELECTED_INDEX = 2;

export const Shot7_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Chart area
  const chartLeft = 260;
  const chartBottom = 720;
  const chartHeight = 450;
  const barWidth = 140;
  const barGap = 50;

  // Dice animation — synced to narration "מודלי שפה משתמשים במנגנון שנקרא" at 260.04s
  // Shot starts at 250s, so relative offset = 10.04s = frame 301
  const diceStart = 301;
  const diceFallProgress = interpolate(frame, [diceStart, diceStart + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const diceRotation = interpolate(frame, [diceStart, diceStart + 60], [0, 720], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dice target position (above the selected bar)
  const selectedBarX = chartLeft + SELECTED_INDEX * (barWidth + barGap) + barWidth / 2;
  const selectedBarTopY = chartBottom - (BARS[SELECTED_INDEX].pct / 100) * chartHeight;

  const diceX = interpolate(diceFallProgress, [0, 0.3, 1], [960, selectedBarX, selectedBarX]);
  const diceY = interpolate(diceFallProgress, [0, 0.7, 0.9, 1], [80, 80, selectedBarTopY - 60, selectedBarTopY - 50]);

  // Selection highlight
  const selectionGlow = interpolate(frame, [diceStart + 60, diceStart + 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Label text
  const labelIn = spring({
    frame: frame - diceStart - 90,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

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
          top: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.text,
          opacity: titleIn,
          transform: `scale(${titleIn})`,
          direction: "ltr",
        }}
      >
        Sampling
        <span
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.textMuted,
            marginLeft: 20,
          }}
        >
          (דגימה הסתברותית)
        </span>
      </div>

      {/* Bars */}
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* X axis */}
        <line x1={chartLeft - 10} y1={chartBottom} x2={chartLeft + BARS.length * (barWidth + barGap)} y2={chartBottom} stroke={COLORS.textDim} strokeWidth={2} opacity={0.5} />

        {BARS.map((bar, i) => {
          const barIn = spring({
            frame: frame - 40 - i * 15,
            fps,
            config: { damping: 16, stiffness: 85, mass: 0.8 },
          });

          const x = chartLeft + i * (barWidth + barGap);
          const barH = (bar.pct / 100) * chartHeight * barIn;
          const y = chartBottom - barH;

          const isSelected = i === SELECTED_INDEX;
          const barColor = isSelected && selectionGlow > 0 ? COLORS.accent : bar.color;
          const barOpacity = isSelected ? 0.9 : (selectionGlow > 0 ? 0.4 : 0.8);

          return (
            <React.Fragment key={i}>
              {/* Bar */}
              <rect x={x} y={y} width={barWidth} height={barH} fill={barColor} opacity={barOpacity} rx={6} />

              {/* Selection glow */}
              {isSelected && selectionGlow > 0 && (
                <rect x={x - 5} y={y - 5} width={barWidth + 10} height={barH + 10} fill="none" stroke={COLORS.accent} strokeWidth={3} rx={8} opacity={selectionGlow * 0.8} />
              )}

              {/* Percentage */}
              <text x={x + barWidth / 2} y={y - 15} textAnchor="middle" fontFamily={FONT_FAMILY} fontSize={24} fontWeight={700} fill={barColor} opacity={barIn}>
                {bar.pct}%
              </text>

              {/* Word */}
              <text x={x + barWidth / 2} y={chartBottom + 35} textAnchor="middle" fontFamily={FONT_FAMILY} fontSize={22} fontWeight={600} fill={COLORS.text} opacity={barIn}>
                {bar.word}
              </text>
            </React.Fragment>
          );
        })}

        {/* Dice */}
        {frame >= diceStart && (
          <g transform={`translate(${diceX}, ${diceY}) rotate(${diceRotation})`}>
            <rect x={-25} y={-25} width={50} height={50} rx={8} fill={COLORS.accent} opacity={0.9} />
            <circle cx={-10} cy={-10} r={4} fill={COLORS.bgPrimary} />
            <circle cx={10} cy={-10} r={4} fill={COLORS.bgPrimary} />
            <circle cx={0} cy={0} r={4} fill={COLORS.bgPrimary} />
            <circle cx={-10} cy={10} r={4} fill={COLORS.bgPrimary} />
            <circle cx={10} cy={10} r={4} fill={COLORS.bgPrimary} />
          </g>
        )}
      </svg>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: labelIn,
          transform: `scale(${labelIn})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 50px",
            borderRadius: 16,
            background: `${COLORS.accent}20`,
            border: `2px solid ${COLORS.accent}`,
            boxShadow: `0 0 30px ${COLORS.accent}33`,
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 700,
            color: COLORS.accent,
            direction: "rtl",
          }}
        >
          Sampling — לא תמיד הבחירה הסבירה ביותר
        </div>
      </div>
    </AbsoluteFill>
  );
};
