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
 * Shot 4.1 — "Large" in Large Language Model (18 seconds)
 * Three colored words appear. "Large" expands, particles scatter
 * representing billions of parameters. Counter animates 0 → 175B.
 * Particles connect into a growing network.
 */

const PARTICLE_COUNT = 60;

// Deterministic pseudo-random based on seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// Pre-generate particle positions
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  angle: seededRandom(i * 7 + 1) * Math.PI * 2,
  radius: 100 + seededRandom(i * 13 + 3) * 350,
  size: 3 + seededRandom(i * 17 + 5) * 5,
  delay: seededRandom(i * 23 + 7) * 30,
  color: i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : "#3b82f6",
}));

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Three words appear (frames 0-90)
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 2: "Large" highlights and scales (frames 90-150)
  const largeHighlight = spring({
    frame: frame - 90,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const largeScale = interpolate(largeHighlight, [0, 1], [1, 1.3]);

  // Other words fade down when Large highlights
  const otherWordsDim = interpolate(frame, [90, 120], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Particles scatter (frames 130+)
  const particleProgress = interpolate(frame, [130, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Counter (frames 150-450)
  const counterProgress = interpolate(frame, [150, 450], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterValue = interpolate(
    counterProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1000, 1000000, 1000000000, 175000000000]
  );

  const formatNumber = (n: number): string => {
    if (n >= 1000000000) return `${(n / 1000000000).toFixed(0)} מיליארד`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)} מיליון`;
    if (n >= 1000) return Math.floor(n).toLocaleString();
    return Math.floor(n).toString();
  };

  const counterOpacity = interpolate(frame, [150, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: Network connections appear (frames 300+)
  const networkProgress = interpolate(frame, [300, 450], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hebrew subtitle
  const subtitleAppear = spring({
    frame: frame - 110,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Title words */}
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: titleAppear,
          transform: `translateY(${(1 - titleAppear) * 30}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: "#3b82f6",
            transform: `scale(${largeScale})`,
            textShadow: `0 0 ${largeHighlight * 30}px #3b82f688`,
            transition: "none",
          }}
        >
          Large
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.primary,
            opacity: otherWordsDim,
          }}
        >
          Language
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.secondary,
            opacity: otherWordsDim,
          }}
        >
          Model
        </span>
      </div>

      {/* Hebrew subtitle under "Large" */}
      <div
        style={{
          position: "absolute",
          top: 270,
          width: "100%",
          textAlign: "center",
          opacity: subtitleAppear,
          transform: `translateY(${(1 - subtitleAppear) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
          גדול — מיליארדי פרמטרים
        </span>
      </div>

      {/* Particle system — scattered from center */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {particles.map((p, i) => {
          const pDelay = 130 + p.delay;
          const pProgress = interpolate(frame - pDelay, [0, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const cx = 960 + Math.cos(p.angle) * p.radius * pProgress;
          const cy = 500 + Math.sin(p.angle) * p.radius * pProgress;

          // Network connections between nearby particles
          const nextIdx = (i + 1) % PARTICLE_COUNT;
          const nextP = particles[nextIdx];
          const nextDelay = 130 + nextP.delay;
          const nextProgress = interpolate(frame - nextDelay, [0, 40], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const nx = 960 + Math.cos(nextP.angle) * nextP.radius * nextProgress;
          const ny = 500 + Math.sin(nextP.angle) * nextP.radius * nextProgress;

          const dist = Math.sqrt((cx - nx) ** 2 + (cy - ny) ** 2);
          const showLine = dist < 200 && networkProgress > 0;

          return (
            <React.Fragment key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={p.size * pProgress}
                fill={p.color}
                opacity={pProgress * 0.8}
              />
              {showLine && (
                <line
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke={COLORS.primary}
                  strokeWidth={1}
                  opacity={networkProgress * 0.25}
                />
              )}
            </React.Fragment>
          );
        })}
      </svg>

      {/* Parameter counter */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          width: "100%",
          textAlign: "center",
          opacity: counterOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 800,
            color: COLORS.accent,
            direction: "rtl",
            textShadow: `0 0 25px ${COLORS.accent}66`,
          }}
        >
          {formatNumber(counterValue)} פרמטרים
        </div>
      </div>


    </AbsoluteFill>
  );
};
