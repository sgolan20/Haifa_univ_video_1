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
 * Shot 8.1 — Summary Part 1 (15 seconds)
 * Title "סיכום". Two animated bullet points with icons.
 * 1. Brain icon + "למד דפוסי שפה"
 * 2. Target icon + "חיזוי מילים"
 */

const POINTS = [
  {
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50">
        <ellipse cx="25" cy="22" rx="18" ry="20" fill="none" stroke={COLORS.primary} strokeWidth="2.5" />
        <path d="M15 22 Q20 14 25 22 Q30 14 35 22" fill="none" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
    text: "למד דפוסי שפה מכמות עצומה של טקסטים",
    color: COLORS.primary,
    delay: 60,
  },
  {
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="18" fill="none" stroke={COLORS.accent} strokeWidth="2.5" />
        <circle cx="25" cy="25" r="10" fill="none" stroke={COLORS.accent} strokeWidth="2" />
        <circle cx="25" cy="25" r="3" fill={COLORS.accent} />
      </svg>
    ),
    text: "חיזוי מילים — מילה אחר מילה",
    color: COLORS.accent,
    delay: 150,
  },
];

export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleIn = spring({
    frame,
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
          top: 60,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.text,
          opacity: titleIn,
          transform: `scale(${titleIn})`,
          direction: "rtl",
        }}
      >
        סיכום
      </div>

      {/* Bullet points */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          right: "12%",
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        {POINTS.map((point, i) => {
          const pointIn = spring({
            frame: frame - point.delay,
            fps,
            config: { damping: 16, stiffness: 85, mass: 0.8 },
          });

          // Highlight when point appears
          const glowIntensity = interpolate(
            frame,
            [point.delay + 10, point.delay + 30, point.delay + 80],
            [0, 1, 0.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                direction: "rtl",
                opacity: pointIn,
                transform: `translateX(${(1 - pointIn) * 100}px)`,
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: `${point.color}20`,
                  border: `3px solid ${point.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_FAMILY,
                  fontSize: 28,
                  fontWeight: 800,
                  color: point.color,
                  boxShadow: `0 0 ${glowIntensity * 25}px ${point.color}44`,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>

              {/* Icon */}
              <div style={{ flexShrink: 0 }}>{point.icon}</div>

              {/* Text */}
              <div
                style={{
                  padding: "20px 40px",
                  borderRadius: 16,
                  background: `${point.color}10`,
                  border: `2px solid ${point.color}${glowIntensity > 0.5 ? "88" : "33"}`,
                  boxShadow: `0 0 ${glowIntensity * 20}px ${point.color}22`,
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
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
    </AbsoluteFill>
  );
};
