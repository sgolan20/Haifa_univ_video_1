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
 * Shot 7.6 — Back to AI Bubble (13 seconds)
 * Kaleidoscope inside bubble is beautiful but looping/repetitive.
 * Outside: living world with unpredictable movement.
 * "שילוב מחדש ≠ תובנה חדשה" highlight text.
 */

export const Shot7_6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dash rotation
  const dashOffset = -frame * 1.5;

  // Kaleidoscope — looping pattern
  const kaleidoAngle = (frame * 0.8) % 360;

  // Outside world elements move unpredictably
  const outsidePhase = frame * 0.03;

  // Label text
  const labelIn = spring({
    frame: frame - 200,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Outside world — warm, alive */}
        {/* Moving stars/sparkles */}
        {Array.from({ length: 15 }).map((_, i) => {
          const seed = i * 137.508;
          const ox = (seed * 7.3) % 1800 + 60;
          const oy = (seed * 3.7) % 900 + 90;
          const move = Math.sin(outsidePhase + i * 0.8) * 30;
          const dist = Math.sqrt((ox - 960) ** 2 + (oy - 500) ** 2);
          if (dist < 280) return null; // inside bubble, skip
          return (
            <circle
              key={`star-${i}`}
              cx={ox + move}
              cy={oy + Math.cos(outsidePhase + i) * 20}
              r={3}
              fill={i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#22c55e" : "#3b82f6"}
              opacity={0.4}
            />
          );
        })}

        {/* Sun outside */}
        <circle cx={250} cy={200} r={35} fill="#f97316" opacity={0.4} />
        {/* Trees */}
        <circle cx={1650} cy={350} r={25} fill="#22c55e" opacity={0.3} />
        <rect x={1643} y={375} width={14} height={40} fill="#92400e" opacity={0.3} />

        {/* The AI bubble */}
        <circle
          cx={960}
          cy={500}
          r={220}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={3}
          strokeDasharray="12 8"
          strokeDashoffset={dashOffset}
          opacity={0.5}
        />

        {/* Kaleidoscope inside — repeating looping pattern */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = ((i / 6) * 360 + kaleidoAngle) * Math.PI / 180;
          const r = 90;
          const cx = 960 + Math.cos(angle) * r;
          const cy = 500 + Math.sin(angle) * r;
          return (
            <g key={`kal-${i}`}>
              <polygon
                points={`${cx},${cy - 25} ${cx + 22},${cy + 12} ${cx - 22},${cy + 12}`}
                fill={i % 3 === 0 ? `${COLORS.primary}33` : i % 3 === 1 ? `${COLORS.secondary}33` : `${COLORS.accent}33`}
                stroke={i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : COLORS.accent}
                strokeWidth={1}
                opacity={0.6}
              />
            </g>
          );
        })}

        {/* Inner circle (looping indicator) */}
        <circle
          cx={960}
          cy={500}
          r={40}
          fill={`${COLORS.primary}15`}
          stroke={COLORS.primary}
          strokeWidth={1.5}
          opacity={0.4}
        />

        {/* Loop arrows */}
        <path
          d={`M 940 490 A 30 30 0 1 1 980 490`}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={2}
          opacity={0.5}
          strokeDasharray="4 3"
          strokeDashoffset={dashOffset * 0.5}
        />
        <polygon points="980,485 985,495 975,495" fill={COLORS.primary} opacity={0.5} />
      </svg>

      {/* Central text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: labelIn,
          transform: `scale(${labelIn})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 50px",
            borderRadius: 16,
            background: `${COLORS.secondary}20`,
            border: `3px solid ${COLORS.secondary}`,
            boxShadow: `0 0 30px ${COLORS.secondary}33`,
            fontFamily: FONT_FAMILY,
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.secondary,
            direction: "rtl",
          }}
        >
          שילוב מחדש ≠ תובנה חדשה
        </div>
      </div>

      {/* Top title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: spring({
            frame,
            fps,
            config: { damping: 16, stiffness: 90, mass: 0.8 },
          }),
        }}
      >
        המודל תמיד מוגבל למה שכבר קיים
      </div>
    </AbsoluteFill>
  );
};
