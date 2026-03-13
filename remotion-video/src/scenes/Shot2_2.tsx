import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 2.2 — Knowledge Sources (18 seconds, 540 frames)
 * 4 glassmorphic source cards in corners with icons.
 * Generated background with energy flows converging to center AI orb.
 * SVG particle streams animate from cards to center.
 * AI orb grows slowly as it "feeds" on the incoming data.
 * Counter at bottom: 0 → "5 מיליארד טקסטים"
 *
 * Narration (46–64s): "המודל קרא מיליארדי משפטים, פסקאות וטקסטים
 * מהאינטרנט, מספרים, ממאמרים אקדמיים ועוד..."
 */

// Center orb position
const ORB_X = 958;
const ORB_Y = 498;

// Source card data — positions from drag tool
const SOURCES = [
  { icon: "📚", label: "ספרים", x: 208, y: 132, delay: 10 },
  { icon: "🌐", label: "אינטרנט", x: 1712, y: 138, delay: 30 },
  { icon: "📰", label: "מאמרים", x: 276, y: 926, delay: 50 },
  { icon: "💾", label: "נתונים", x: 1690, y: 926, delay: 70 },
];

// Bezier curves from each card toward center orb
const STREAM_PATHS = [
  `M 208,132 C 400,132 600,300 ${ORB_X},${ORB_Y}`,
  `M 1712,138 C 1500,138 1200,300 ${ORB_X},${ORB_Y}`,
  `M 276,926 C 400,926 600,700 ${ORB_X},${ORB_Y}`,
  `M 1690,926 C 1500,926 1200,700 ${ORB_X},${ORB_Y}`,
];

const PARTICLES_PER_STREAM = 12;

export const Shot2_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background fade-in
  const bgOpacity = interpolate(frame, [0, 50], [0, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // AI orb — starts small and grows as it "feeds" on data
  const orbAppear = spring({
    frame: frame - 90,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1.2 },
  });
  // Slow continuous growth: from 0.6 to 1.2 over the entire shot
  const orbGrowth = interpolate(frame, [90, 500], [0.6, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Breathing pulse
  const orbPulse = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.97, 1.03]);
  // Glow intensifies as orb grows
  const orbGlow = interpolate(frame, [90, 500], [0.2, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const orbScale = orbAppear * orbGrowth * orbPulse;

  // Counter
  const counterProgress = interpolate(frame, [140, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterValue = interpolate(
    counterProgress,
    [0, 0.3, 0.6, 0.85, 1],
    [0, 1000, 1000000, 1000000000, 5000000000]
  );

  const formatNumber = (n: number): string => {
    if (n >= 1000000000) return `${(n / 1000000000).toFixed(1)} מיליארד`;
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)} מיליון`;
    if (n >= 1000) return Math.floor(n).toLocaleString();
    return Math.floor(n).toString();
  };

  const counterOp = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Generated background image */}
      <Img
        src={staticFile("images/shot2_2_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
        }}
      />

      {/* Dark overlay to ensure text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% 45%, transparent 0%, ${COLORS.bgPrimary}cc 60%)`,
        }}
      />

      {/* SVG layer — particle streams + center orb */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id="particleGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="orbGlowFilter">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Particle streams — flowing dots along bezier curves */}
        {STREAM_PATHS.map((path, streamIdx) => {
          const streamDelay = SOURCES[streamIdx].delay + 40;
          const streamOp = interpolate(frame - streamDelay, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const colors = [COLORS.primary, "#3b82f6", COLORS.secondary, "#22d3ee"];
          const color = colors[streamIdx];

          return (
            <g key={streamIdx} opacity={streamOp} filter="url(#particleGlow)">
              {/* Base path — faint line */}
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                opacity={0.15}
                strokeDasharray="6 10"
                strokeDashoffset={-frame * 2}
              />

              {/* Animated particles */}
              {Array.from({ length: PARTICLES_PER_STREAM }).map((_, pIdx) => {
                const phase = pIdx / PARTICLES_PER_STREAM;
                const size = 2 + Math.sin(pIdx * 1.7) * 1.5;
                const particleOp = interpolate(
                  ((frame * 0.008 + phase) % 1),
                  [0, 0.05, 0.85, 1],
                  [0, 0.9, 0.9, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                return (
                  <circle
                    key={pIdx}
                    r={size}
                    fill={color}
                    opacity={particleOp}
                  >
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      begin={`${-phase * 4}s`}
                      path={path}
                    />
                  </circle>
                );
              })}
            </g>
          );
        })}

        {/* Center AI orb — grows over time */}
        <g
          transform={`translate(${ORB_X}, ${ORB_Y}) scale(${orbScale})`}
          opacity={orbAppear}
          filter="url(#orbGlowFilter)"
        >
          {/* Outer rotating dashed ring */}
          <circle
            cx={0} cy={0} r={90}
            fill="none"
            stroke={COLORS.primary}
            strokeWidth={2}
            opacity={0.25}
            strokeDasharray="8 6"
            strokeDashoffset={-frame * 1.5}
          />
          {/* Middle ring */}
          <circle
            cx={0} cy={0} r={68}
            fill="none"
            stroke={COLORS.primary}
            strokeWidth={2.5}
            opacity={0.4}
          />
          {/* Inner filled circle */}
          <circle
            cx={0} cy={0} r={52}
            fill={`${COLORS.primary}18`}
            stroke={COLORS.primary}
            strokeWidth={3}
          />
          {/* Core glow — intensifies as orb grows */}
          <circle
            cx={0} cy={0} r={34}
            fill={COLORS.primary}
            opacity={orbGlow * 0.5}
          />
          <circle
            cx={0} cy={0} r={20}
            fill={COLORS.primary}
            opacity={orbGlow * 0.3}
          />
          {/* AI text */}
          <text
            x={0} y={12}
            textAnchor="middle"
            fontFamily={FONT_FAMILY}
            fontSize={38}
            fontWeight={800}
            fill={COLORS.text}
          >
            AI
          </text>
        </g>
      </svg>

      {/* 4 Glassmorphic source cards */}
      {SOURCES.map((src, i) => {
        const cardIn = spring({
          frame: frame - src.delay,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        });

        const isRight = src.x > 960;
        const slideX = (1 - cardIn) * (isRight ? 120 : -120);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: src.x,
              top: src.y,
              transform: `translate(-50%, -50%) translateX(${slideX}px) scale(${0.8 + cardIn * 0.2})`,
              opacity: cardIn,
            }}
          >
            <div
              style={{
                width: 220,
                padding: "24px 20px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
                backdropFilter: "blur(12px)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 10 }}>{src.icon}</div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.text,
                  direction: "rtl",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {src.label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Counter bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: counterOp,
        }}
      >
        <div
          style={{
            padding: "16px 60px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${COLORS.accent}44`,
            boxShadow: `0 0 30px ${COLORS.accent}15, 0 4px 20px rgba(0,0,0,0.3)`,
            backdropFilter: "blur(8px)",
            textAlign: "center",
            direction: "rtl",
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.accent,
              textShadow: `0 0 20px ${COLORS.accent}66`,
            }}
          >
            {formatNumber(counterValue)} טקסטים
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
