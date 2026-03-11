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
 * Shot 7.2 — Tree Diagram / Different Responses (8 seconds)
 * Same prompt → 3 different response branches.
 * Animated path drawing from root to leaves.
 */

const RESPONSES = [
  { text: "תשובה מדעית מפורטת", color: COLORS.primary },
  { text: "סיפור יצירתי ומקורי", color: COLORS.secondary },
  { text: "רשימת נקודות תמציתית", color: COLORS.accent },
];

export const Shot7_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Root node
  const rootIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Branches grow
  const branchProgress = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Response boxes
  const responseDelays = [90, 110, 130];

  // Bottom question mark
  const qmPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* SVG tree diagram */}
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Root node */}
        <rect
          x={860}
          y={120}
          width={200}
          height={70}
          rx={12}
          fill={`${COLORS.primary}20`}
          stroke={COLORS.primary}
          strokeWidth={3}
          opacity={rootIn}
        />
        <text
          x={960}
          y={163}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={30}
          fontWeight={800}
          fill={COLORS.primary}
          opacity={rootIn}
        >
          Prompt
        </text>

        {/* Branches */}
        {RESPONSES.map((resp, i) => {
          const targetX = 360 + i * 500;
          const targetY = 400;

          // Branch line
          const lineEndX = 960 + (targetX - 960) * branchProgress;
          const lineEndY = 190 + (targetY - 190) * branchProgress;

          // Response box
          const boxIn = spring({
            frame: frame - responseDelays[i],
            fps,
            config: { damping: 16, stiffness: 85, mass: 0.8 },
          });

          return (
            <React.Fragment key={i}>
              {/* Branch line */}
              <line
                x1={960}
                y1={190}
                x2={lineEndX}
                y2={lineEndY}
                stroke={resp.color}
                strokeWidth={2.5}
                opacity={branchProgress * 0.6}
                strokeDasharray="8 4"
                strokeDashoffset={-frame * 2}
              />

              {/* Branch endpoint circle */}
              {branchProgress > 0.8 && (
                <circle
                  cx={targetX}
                  cy={targetY - 10}
                  r={6}
                  fill={resp.color}
                  opacity={branchProgress}
                />
              )}

              {/* Response box */}
              <rect
                x={targetX - 180}
                y={targetY}
                width={360}
                height={80}
                rx={14}
                fill={`${resp.color}15`}
                stroke={resp.color}
                strokeWidth={2}
                opacity={boxIn}
                transform={`scale(${boxIn})`}
                style={{ transformOrigin: `${targetX}px ${targetY + 40}px` }}
              />
              <text
                x={targetX}
                y={targetY + 48}
                textAnchor="middle"
                fontFamily={FONT_FAMILY}
                fontSize={28}
                fontWeight={700}
                fill={COLORS.text}
                opacity={boxIn}
                direction="rtl"
              >
                {resp.text}
              </text>
            </React.Fragment>
          );
        })}

        {/* Bottom question mark */}
        <text
          x={960}
          y={650}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={80}
          fontWeight={800}
          fill={COLORS.secondary}
          opacity={qmPulse * interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          ?
        </text>
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 30,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 700,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: rootIn,
        }}
      >
        אותו Prompt — תשובות שונות בכל פעם
      </div>

      {/* Bottom explanation */}
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
          opacity: interpolate(frame, [160, 190], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        הדגימה ההסתברותית יוצרת מגוון תוצאות
      </div>
    </AbsoluteFill>
  );
};
