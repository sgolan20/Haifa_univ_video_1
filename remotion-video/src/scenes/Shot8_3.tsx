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
 * Shot 8.3 — Summary End / Next Lectures Gate (12 seconds)
 * 4 points shrink and move up. Arrows lead to a glowing "gate"
 * representing future lectures. Pulsating glow on the gate.
 */

export const Shot8_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Points shrink up
  const shrinkProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pointsScale = interpolate(shrinkProgress, [0, 1], [0.7, 0.5]);
  const pointsY = interpolate(shrinkProgress, [0, 1], [0, -60]);

  // Arrows appear
  const arrowsIn = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Gate appear
  const gateIn = spring({
    frame: frame - 150,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Gate glow pulse
  const gatePulse = frame > 180
    ? interpolate(Math.sin((frame - 180) * 0.06), [-1, 1], [20, 50])
    : 0;

  const MINI_POINTS = [
    { text: "דפוסי שפה", color: COLORS.primary },
    { text: "חיזוי מילים", color: COLORS.accent },
    { text: "לא מנוע חיפוש", color: COLORS.secondary },
    { text: "קשרים סטטיסטיים", color: "#3b82f6" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Mini points row at top */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 30,
          direction: "rtl",
          transform: `scale(${pointsScale}) translateY(${pointsY}px)`,
        }}
      >
        {MINI_POINTS.map((p, i) => (
          <div
            key={i}
            style={{
              padding: "10px 24px",
              borderRadius: 12,
              background: `${p.color}15`,
              border: `2px solid ${p.color}55`,
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              fontWeight: 600,
              color: p.color,
              direction: "rtl",
            }}
          >
            {p.text}
          </div>
        ))}
      </div>

      {/* Arrows pointing left (RTL = forward) */}
      {arrowsIn > 0 && (
        <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
          {[0, 1, 2].map((i) => {
            const y = 350 + i * 60;
            const length = 200 + i * 50;
            const startX = 960 + 200;
            const endX = startX - length * arrowsIn;
            return (
              <g key={i} opacity={arrowsIn * 0.6}>
                <line
                  x1={startX}
                  y1={y}
                  x2={endX}
                  y2={y}
                  stroke={COLORS.primary}
                  strokeWidth={2.5}
                  strokeDasharray="8 4"
                  strokeDashoffset={-frame * 2}
                />
                <polygon
                  points={`${endX},${y - 6} ${endX - 12},${y} ${endX},${y + 6}`}
                  fill={COLORS.primary}
                />
              </g>
            );
          })}
        </svg>
      )}

      {/* Glowing Gate */}
      {gateIn > 0 && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "25%",
            transform: `translate(-50%, -50%) scale(${gateIn})`,
            opacity: gateIn,
          }}
        >
          <div
            style={{
              width: 200,
              height: 280,
              borderRadius: "100px 100px 0 0",
              background: `linear-gradient(180deg, ${COLORS.primary}25, ${COLORS.secondary}15, transparent)`,
              border: `3px solid ${COLORS.primary}88`,
              boxShadow: `0 0 ${gatePulse}px ${COLORS.primary}44, inset 0 0 ${gatePulse * 0.5}px ${COLORS.primary}22`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.primary,
                textAlign: "center",
                direction: "rtl",
              }}
            >
              הרצאות
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 700,
                color: COLORS.primary,
                textAlign: "center",
                direction: "rtl",
              }}
            >
              הבאות
            </div>

            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                borderRadius: "120px 120px 20px 20px",
                background: `radial-gradient(ellipse, ${COLORS.primary}08, transparent 70%)`,
                pointerEvents: "none",
              }}
            />
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
          fontSize: 34,
          fontWeight: 700,
          color: COLORS.text,
          direction: "rtl",
          opacity: interpolate(frame, [200, 240], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        הבנת עקרון הפעולה — הבסיס לשימוש מושכל
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          fontWeight: 500,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: interpolate(frame, [250, 280], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        → בהרצאות הבאות נלמד כיצד להשתמש בכלים אלה
      </div>
    </AbsoluteFill>
  );
};
