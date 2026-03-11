import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 9.1 — Closing (5 seconds)
 * "!תודה רבה" with spring bounce. Particle burst.
 * Transitions to "!נתראה בהרצאה הבאה". Logo strengthens to 100%.
 * Fade out.
 */

// Particle burst positions
const BURST_PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * Math.PI * 2;
  const speed = 2 + (i % 4) * 1.5;
  return { angle, speed, size: 3 + (i % 3) * 2, color: i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.accent : COLORS.secondary };
});

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "תודה רבה" text
  const thanksIn = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });

  // Swap to "נתראה"
  const swapProgress = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particle burst
  const burstProgress = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo strengthen
  const logoOpacity = interpolate(frame, [0, 100], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade out
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        opacity: fadeOut,
      }}
    >
      {/* Particle burst */}
      {burstProgress > 0 && burstProgress < 1 && (
        <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
          {BURST_PARTICLES.map((p, i) => {
            const dist = p.speed * burstProgress * 150;
            const cx = 960 + Math.cos(p.angle) * dist;
            const cy = 480 + Math.sin(p.angle) * dist;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={p.size * (1 - burstProgress * 0.5)}
                fill={p.color}
                opacity={(1 - burstProgress) * 0.8}
              />
            );
          })}
        </svg>
      )}

      {/* Main text — swap between תודה and נתראה */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* תודה רבה */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 90,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            opacity: thanksIn * (1 - swapProgress),
            transform: `scale(${thanksIn})`,
            textShadow: `0 0 30px ${COLORS.primary}44`,
            position: "absolute",
            width: "100%",
          }}
        >
          !תודה רבה
        </div>

        {/* נתראה בהרצאה הבאה */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 60,
            fontWeight: 700,
            color: COLORS.primary,
            direction: "rtl",
            opacity: swapProgress,
            transform: `scale(${0.8 + swapProgress * 0.2})`,
            textShadow: `0 0 25px ${COLORS.primary}44`,
            position: "absolute",
            width: "100%",
          }}
        >
          !נתראה בהרצאה הבאה
        </div>
      </div>

      {/* University logo — strengthens */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: logoOpacity,
        }}
      >
        <Img
          src={staticFile("images/haifa-logo.png")}
          style={{
            height: 80,
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      {/* University name */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          fontWeight: 600,
          color: COLORS.textMuted,
          opacity: logoOpacity * 0.7,
          direction: "rtl",
        }}
      >
        אוניברסיטת חיפה
      </div>
    </AbsoluteFill>
  );
};
