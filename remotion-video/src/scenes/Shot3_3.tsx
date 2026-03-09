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
 * Shot 3.3 — Probability Bar Chart (20 seconds)
 * Animated bar chart with word probabilities.
 * "עבודה" is highest (65%) in gold. Others in turquoise.
 * Bars grow staggered. Percentages fade in.
 * Glow beam on winning bar. Floating math formulas in background.
 */

const BARS = [
  { word: "עבודה", pct: 65, color: COLORS.accent, isWinner: true },
  { word: "אוניברסיטה", pct: 42, color: COLORS.primary, isWinner: false },
  { word: "טיול", pct: 28, color: COLORS.primary, isWinner: false },
  { word: "בית", pct: 18, color: COLORS.primary, isWinner: false },
  { word: "חנות", pct: 12, color: COLORS.primary, isWinner: false },
  { word: "ריצה", pct: 7, color: COLORS.primary, isWinner: false },
];

const FORMULAS = [
  { text: "P(w|context)", x: 150, y: 120, delay: 60 },
  { text: "argmax P(wₜ)", x: 1600, y: 180, delay: 90 },
  { text: "Σ P(w) = 1", x: 200, y: 900, delay: 120 },
  { text: "softmax(z)", x: 1500, y: 850, delay: 150 },
];

// Chart dimensions
const CHART_LEFT = 200;
const CHART_RIGHT = 1720;
const CHART_TOP = 200;
const CHART_BOTTOM = 780;
const CHART_WIDTH = CHART_RIGHT - CHART_LEFT;
const CHART_HEIGHT = CHART_BOTTOM - CHART_TOP;
const BAR_GAP = 30;
const BAR_WIDTH = (CHART_WIDTH - BAR_GAP * (BARS.length + 1)) / BARS.length;

export const Shot3_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Axes appear
  const axisProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Winner glow beam (after bars are up)
  const glowAppear = interpolate(frame, [350, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Selected" label
  const selectedAppear = spring({
    frame: frame - 430,
    fps,
    config: { damping: 16, stiffness: 80 },
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
          opacity: titleAppear,
          transform: `scale(${titleAppear})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
          }}
        >
          הסתברות למילה הבאה
        </div>
      </div>

      {/* Chart SVG */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Y axis */}
        <line
          x1={CHART_LEFT}
          y1={CHART_TOP}
          x2={CHART_LEFT}
          y2={CHART_BOTTOM}
          stroke={COLORS.textDim}
          strokeWidth={2}
          opacity={axisProgress}
        />

        {/* X axis */}
        <line
          x1={CHART_LEFT}
          y1={CHART_BOTTOM}
          x2={CHART_LEFT + CHART_WIDTH * axisProgress}
          y2={CHART_BOTTOM}
          stroke={COLORS.textDim}
          strokeWidth={2}
        />

        {/* Y axis labels */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const y = CHART_BOTTOM - (pct / 100) * CHART_HEIGHT;
          return (
            <React.Fragment key={pct}>
              <line
                x1={CHART_LEFT - 8}
                y1={y}
                x2={CHART_LEFT}
                y2={y}
                stroke={COLORS.textDim}
                strokeWidth={1}
                opacity={axisProgress * 0.6}
              />
              <text
                x={CHART_LEFT - 16}
                y={y + 5}
                textAnchor="end"
                fontFamily={FONT_FAMILY}
                fontSize={18}
                fill={COLORS.textMuted}
                opacity={axisProgress}
              >
                {pct}%
              </text>
              {/* Grid line */}
              {pct > 0 && (
                <line
                  x1={CHART_LEFT + 1}
                  y1={y}
                  x2={CHART_RIGHT}
                  y2={y}
                  stroke={COLORS.textDim}
                  strokeWidth={1}
                  opacity={axisProgress * 0.1}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Bars */}
        {BARS.map((bar, i) => {
          const barDelay = 80 + i * 25;
          const barGrow = spring({
            frame: frame - barDelay,
            fps,
            config: { damping: 16, stiffness: 80, mass: 0.8 },
          });

          const barX = CHART_LEFT + BAR_GAP + i * (BAR_WIDTH + BAR_GAP);
          const barHeight = (bar.pct / 100) * CHART_HEIGHT * barGrow;
          const barY = CHART_BOTTOM - barHeight;

          // Percentage label
          const pctOpacity = interpolate(frame - (barDelay + 20), [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Winner glow
          const isWinner = bar.isWinner;

          return (
            <React.Fragment key={i}>
              {/* Winner glow beam */}
              {isWinner && glowAppear > 0 && (
                <rect
                  x={barX - 10}
                  y={CHART_TOP - 20}
                  width={BAR_WIDTH + 20}
                  height={CHART_HEIGHT + 40}
                  fill={bar.color}
                  opacity={glowAppear * 0.08}
                  rx={8}
                />
              )}

              {/* Bar */}
              <rect
                x={barX}
                y={barY}
                width={BAR_WIDTH}
                height={barHeight}
                fill={bar.color}
                opacity={0.85}
                rx={6}
              />

              {/* Bar glow */}
              <rect
                x={barX}
                y={barY}
                width={BAR_WIDTH}
                height={barHeight}
                fill="none"
                stroke={bar.color}
                strokeWidth={2}
                opacity={isWinner ? 0.8 : 0.3}
                rx={6}
              />

              {/* Percentage */}
              <text
                x={barX + BAR_WIDTH / 2}
                y={barY - 16}
                textAnchor="middle"
                fontFamily={FONT_FAMILY}
                fontSize={26}
                fontWeight={800}
                fill={bar.color}
                opacity={pctOpacity}
              >
                {bar.pct}%
              </text>

              {/* Word label */}
              <text
                x={barX + BAR_WIDTH / 2}
                y={CHART_BOTTOM + 40}
                textAnchor="middle"
                fontFamily={FONT_FAMILY}
                fontSize={24}
                fontWeight={600}
                fill={COLORS.text}
                opacity={barGrow}
                direction="rtl"
              >
                {bar.word}
              </text>
            </React.Fragment>
          );
        })}
      </svg>

      {/* "Selected" badge on winner */}
      <div
        style={{
          position: "absolute",
          top: CHART_TOP - 80,
          left: CHART_LEFT + BAR_GAP + BAR_WIDTH / 2 - 80,
          opacity: selectedAppear,
          transform: `scale(${selectedAppear})`,
        }}
      >
        <div
          style={{
            padding: "10px 28px",
            borderRadius: 30,
            background: `${COLORS.accent}25`,
            border: `2px solid ${COLORS.accent}`,
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.accent,
            direction: "rtl",
            boxShadow: `0 0 20px ${COLORS.accent}44`,
          }}
        >
          נבחרת!
        </div>
      </div>

      {/* Floating math formulas */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {FORMULAS.map((f, i) => {
          const fOpacity = interpolate(frame - f.delay, [0, 30], [0, 0.12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fY = f.y - (frame - f.delay) * 0.03;
          return (
            <text
              key={i}
              x={f.x}
              y={fY}
              fontFamily={FONT_FAMILY}
              fontSize={22}
              fill={COLORS.secondary}
              opacity={fOpacity}
            >
              {f.text}
            </text>
          );
        })}
      </svg>

      {/* Bottom explanation */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [300, 340], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
          המודל בוחר את המילה בעלת ההסתברות הגבוהה ביותר
        </div>
      </div>
    </AbsoluteFill>
  );
};
