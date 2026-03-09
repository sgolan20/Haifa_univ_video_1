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
import { Logo } from "../design/Logo";

/**
 * Shot 2.2 — Knowledge Sources (18 seconds)
 * 4 big source blocks slam in from edges.
 * Animated dashed lines flow to center AI node.
 * Big counter animates: 0 → "5 מיליארד טקסטים"
 * Network pattern emerges in center.
 */

const SourceBlock: React.FC<{
  icon: string;
  label: string;
  color: string;
  delay: number;
  fromDir: "left" | "right" | "top" | "bottom";
  x: number;
  y: number;
}> = ({ icon, label, color, delay, fromDir, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slam = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const offsets = {
    left: { x: -600, y: 0 },
    right: { x: 600, y: 0 },
    top: { x: 0, y: -400 },
    bottom: { x: 0, y: 400 },
  };

  const translateX = interpolate(slam, [0, 1], [offsets[fromDir].x, 0]);
  const translateY = interpolate(slam, [0, 1], [offsets[fromDir].y, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${translateX}px, ${translateY}px)`,
        opacity: slam,
      }}
    >
      <div
        style={{
          padding: "20px 30px",
          borderRadius: 18,
          background: `${color}15`,
          border: `2px solid ${color}88`,
          boxShadow: `0 0 25px ${color}33`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          minWidth: 220,
        }}
      >
        <span style={{ fontSize: 44 }}>{icon}</span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 700,
            color: COLORS.text,
            direction: "rtl",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export const Shot2_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter
  const counterProgress = interpolate(frame, [120, 450], [0, 1], {
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

  // Center AI hexagon pulse
  const centerPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [1, 1.08]);
  const centerAppear = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  // Dashed stream animation
  const dashOffset = -frame * 3;

  // Network nodes that emerge
  const networkAppear = interpolate(frame, [300, 420], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* 4 Source blocks from edges */}
      <SourceBlock icon="📚" label="ספרים" color="#3b82f6" delay={10} fromDir="left" x={60} y={120} />
      <SourceBlock icon="🌐" label="אינטרנט" color={COLORS.secondary} delay={30} fromDir="right" x={1560} y={120} />
      <SourceBlock icon="📰" label="מאמרים" color={COLORS.accent} delay={50} fromDir="left" x={60} y={780} />
      <SourceBlock icon="💾" label="נתונים" color="#22d3ee" delay={70} fromDir="right" x={1560} y={780} />

      {/* Animated dashed streams to center */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Streams from each source to center */}
        {[
          { x1: 330, y1: 160, d: 60 },
          { x1: 1560, y1: 160, d: 80 },
          { x1: 330, y1: 820, d: 100 },
          { x1: 1560, y1: 820, d: 120 },
        ].map((s, i) => {
          const streamOp = interpolate(frame - s.d, [0, 30], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={960}
              y2={490}
              stroke={COLORS.primary}
              strokeWidth={3}
              strokeDasharray="12 8"
              strokeDashoffset={dashOffset}
              opacity={streamOp}
            />
          );
        })}

        {/* Center AI hexagon */}
        <g
          transform={`translate(960, 490) scale(${centerPulse * centerAppear})`}
          opacity={centerAppear}
        >
          <polygon
            points="0,-70 61,-35 61,35 0,70 -61,35 -61,-35"
            fill={`${COLORS.primary}22`}
            stroke={COLORS.primary}
            strokeWidth={3}
          />
          <text
            x={0}
            y={10}
            textAnchor="middle"
            fontFamily={FONT_FAMILY}
            fontSize={32}
            fontWeight={800}
            fill={COLORS.primary}
          >
            AI
          </text>
          {/* Outer glow ring */}
          <circle
            cx={0}
            cy={0}
            r={90}
            fill="none"
            stroke={COLORS.primary}
            strokeWidth={2}
            opacity={0.15}
            strokeDasharray="8 4"
            strokeDashoffset={dashOffset / 2}
          />
        </g>

        {/* Network nodes emerging from center */}
        {[
          { cx: 870, cy: 400, d: 300 },
          { cx: 1050, cy: 400, d: 310 },
          { cx: 900, cy: 580, d: 320 },
          { cx: 1020, cy: 580, d: 330 },
          { cx: 960, cy: 370, d: 340 },
          { cx: 960, cy: 610, d: 350 },
        ].map((n, i) => {
          const nOp = interpolate(frame - n.d, [0, 15], [0, 0.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <React.Fragment key={i}>
              <line x1={960} y1={490} x2={n.cx} y2={n.cy} stroke={COLORS.primary} strokeWidth={1} opacity={nOp * 0.3} />
              <circle cx={n.cx} cy={n.cy} r={5} fill={COLORS.primary} opacity={nOp} />
            </React.Fragment>
          );
        })}
      </svg>

      {/* BIG counter */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [120, 140], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.accent,
            direction: "rtl",
            textShadow: `0 0 20px ${COLORS.accent}66`,
          }}
        >
          {formatNumber(counterValue)} טקסטים
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
