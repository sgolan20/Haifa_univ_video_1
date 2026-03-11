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
 * Shot 8.2 — Summary Part 2 (12 seconds)
 * Continues bullet list with points 3-4.
 * Then all 4 points shown together with connecting line.
 */

const ALL_POINTS = [
  { num: 1, text: "למד דפוסי שפה", color: COLORS.primary, short: true },
  { num: 2, text: "חיזוי מילים", color: COLORS.accent, short: true },
  { num: 3, text: "לא מנוע חיפוש — מייצר טקסט חדש", color: COLORS.secondary, short: false },
  { num: 4, text: "קשרים סטטיסטיים, לא הבנה אנושית", color: "#3b82f6", short: false },
];

export const Shot8_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Points 3 and 4 enter
  const point3In = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });
  const point4In = spring({
    frame: frame - 100,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Connecting line (path animation between all 4)
  const lineProgress = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pointsInArray = [1, 1, point3In, point4In];

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
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
        }}
      >
        סיכום
      </div>

      {/* All 4 points */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "10%",
          display: "flex",
          flexDirection: "column",
          gap: 35,
        }}
      >
        {ALL_POINTS.map((point, i) => {
          const pIn = pointsInArray[i];
          const isNew = i >= 2;
          const glowIntensity = isNew
            ? interpolate(
                frame,
                [i === 2 ? 30 : 110, i === 2 ? 50 : 130, i === 2 ? 100 : 180],
                [0, 1, 0.3],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0.3;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                direction: "rtl",
                opacity: pIn,
                transform: `translateX(${(1 - pIn) * 80}px)`,
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  background: `${point.color}20`,
                  border: `3px solid ${point.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  fontWeight: 800,
                  color: point.color,
                  flexShrink: 0,
                  boxShadow: `0 0 ${glowIntensity * 20}px ${point.color}44`,
                }}
              >
                {point.num}
              </div>

              {/* Text */}
              <div
                style={{
                  padding: "16px 36px",
                  borderRadius: 14,
                  background: `${point.color}10`,
                  border: `2px solid ${point.color}${glowIntensity > 0.5 ? "88" : "33"}`,
                  fontFamily: FONT_FAMILY,
                  fontSize: 32,
                  fontWeight: 600,
                  color: COLORS.text,
                  direction: "rtl",
                }}
              >
                {point.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connecting line between badges */}
      {lineProgress > 0 && (
        <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
          {[0, 1, 2].map((i) => {
            const segProgress = interpolate(lineProgress, [i * 0.33, (i + 1) * 0.33], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y1 = 245 + i * 95;
            const y2 = y1 + 95 * segProgress;
            return (
              <line
                key={i}
                x1={1575}
                y1={y1}
                x2={1575}
                y2={y2}
                stroke={COLORS.primary}
                strokeWidth={2}
                opacity={0.4}
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>
      )}
    </AbsoluteFill>
  );
};
