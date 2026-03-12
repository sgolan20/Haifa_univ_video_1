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
 * Shot 4.3 — "Model" — Scale Revelation (15 seconds / 450 frames)
 * Starts with a single neural connection, zooms out to progressively
 * larger networks, ending with a massive constellation of nodes.
 * Counters show 175B parameters / 1.8T training words.
 * Narration (163-178s): "Model, מודל — זו מערכת מתמטית...
 *   המודלים הגדולים ביותר כיום אומנו על טריליוני מילים..."
 */

const CLAMP = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// Phase 2: Small network (4 layers)
const SMALL_NODES = [
  { x: 700, y: 340, layer: 0 },
  { x: 700, y: 460, layer: 0 },
  { x: 700, y: 580, layer: 0 },
  { x: 700, y: 700, layer: 0 },
  { x: 870, y: 380, layer: 1 },
  { x: 870, y: 510, layer: 1 },
  { x: 870, y: 640, layer: 1 },
  { x: 1050, y: 380, layer: 2 },
  { x: 1050, y: 510, layer: 2 },
  { x: 1050, y: 640, layer: 2 },
  { x: 1220, y: 430, layer: 3 },
  { x: 1220, y: 570, layer: 3 },
];

const SMALL_EDGES: { from: number; to: number }[] = [];
for (let i = 0; i < SMALL_NODES.length; i++) {
  for (let j = i + 1; j < SMALL_NODES.length; j++) {
    if (SMALL_NODES[j].layer === SMALL_NODES[i].layer + 1) {
      SMALL_EDGES.push({ from: i, to: j });
    }
  }
}

// Phase 3: Dense network (golden angle sunflower pattern)
const GA = Math.PI * (3 - Math.sqrt(5));
const DENSE_NODES: { x: number; y: number }[] = [];
for (let i = 0; i < 100; i++) {
  const angle = i * GA;
  const r = Math.sqrt(i + 1) * 36;
  const x = 960 + Math.cos(angle) * r * 1.35;
  const y = 500 + Math.sin(angle) * r * 0.75;
  if (x > 100 && x < 1820 && y > 220 && y < 820) {
    DENSE_NODES.push({ x, y });
  }
}

// Dense edges: connect nearby sequential nodes
const DENSE_EDGES: { from: number; to: number }[] = [];
for (let i = 0; i < DENSE_NODES.length; i++) {
  for (let j = i + 1; j < Math.min(i + 7, DENSE_NODES.length); j++) {
    const dx = DENSE_NODES[i].x - DENSE_NODES[j].x;
    const dy = DENSE_NODES[i].y - DENSE_NODES[j].y;
    if (Math.sqrt(dx * dx + dy * dy) < 110) {
      DENSE_EDGES.push({ from: i, to: j });
    }
  }
}

export const Shot4_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // "Model" temporary highlight — scale up then back
  const modelScale = interpolate(frame, [0, 15, 50, 70], [1, 1.3, 1.3, 1], CLAMP);
  const modelGlow = interpolate(frame, [0, 15, 50, 70], [0, 30, 30, 0], CLAMP);

  // Phase 1: Single connection (frames 15-105)
  const p1Opacity = interpolate(frame, [15, 30, 85, 105], [0, 1, 1, 0], CLAMP);
  const p1Scale = interpolate(frame, [85, 105], [1, 0.6], CLAMP);

  // Phase 2: Small network (frames 90-215)
  const p2Opacity = interpolate(frame, [90, 115, 190, 215], [0, 1, 1, 0], CLAMP);
  const p2Scale = interpolate(frame, [90, 115, 190, 215], [1.3, 1, 1, 0.5], CLAMP);

  // Phase 3: Massive network (frames 200-450)
  const p3Opacity = interpolate(frame, [200, 240], [0, 1], CLAMP);
  const p3Scale = interpolate(frame, [200, 240], [1.15, 1], CLAMP);

  // Animated dashes
  const dashOffset = -frame * 3;

  // Node pulse
  const pulse = interpolate(Math.sin(frame * 0.06), [-1, 1], [0.6, 1]);

  // Counters
  const paramCount = Math.floor(
    interpolate(frame, [270, 370], [0, 175], CLAMP),
  );
  const wordCount = interpolate(frame, [320, 400], [0, 1.8], CLAMP);
  const counterOpacity = interpolate(frame, [260, 285], [0, 1], CLAMP);

  // Bottom label
  const labelAppear = spring({
    frame: frame - 380,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  const LAYER_COLORS = [
    COLORS.primary,
    COLORS.secondary,
    "#3b82f6",
    COLORS.accent,
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Title row — kept from original */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: titleAppear,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 100,
            fontWeight: 800,
            color: "#3b82f6",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
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
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
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
            transform: `scale(${modelScale})`,
            textShadow: `0 0 ${modelGlow}px ${COLORS.secondary}88, 0 4px 20px rgba(0,0,0,0.8)`,
          }}
        >
          Model
        </span>
      </div>

      {/* Hebrew subtitle */}
      <div
        style={{
          position: "absolute",
          top: 210,
          width: "100%",
          textAlign: "center",
          opacity: titleAppear,
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
          מודל — מערכת מתמטית מורכבת
        </span>
      </div>

      {/* === PHASE 1: Single connection === */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity: p1Opacity,
          transform: `scale(${p1Scale})`,
          transformOrigin: "960px 490px",
        }}
      >
        {/* Glow line */}
        <line
          x1={860}
          y1={490}
          x2={1060}
          y2={490}
          stroke={COLORS.primary}
          strokeWidth={14}
          opacity={0.08}
        />
        {/* Dashed line */}
        <line
          x1={860}
          y1={490}
          x2={1060}
          y2={490}
          stroke={COLORS.primary}
          strokeWidth={4}
          strokeDasharray="10 6"
          strokeDashoffset={dashOffset}
          opacity={0.6}
        />
        {/* Node 1 */}
        <circle cx={860} cy={490} r={28} fill={COLORS.primary} opacity={0.15} />
        <circle cx={860} cy={490} r={18} fill={COLORS.primary} opacity={0.9} />
        <circle cx={860} cy={490} r={7} fill="#fff" opacity={0.6 * pulse} />
        {/* Node 2 */}
        <circle cx={1060} cy={490} r={28} fill={COLORS.secondary} opacity={0.15} />
        <circle cx={1060} cy={490} r={18} fill={COLORS.secondary} opacity={0.9} />
        <circle cx={1060} cy={490} r={7} fill="#fff" opacity={0.6 * pulse} />
        {/* Label */}
        <text
          x={960}
          y={575}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={28}
          fontWeight={600}
          fill={COLORS.textMuted}
        >
          חיבור בודד בין 2 נוירונים
        </text>
      </svg>

      {/* === PHASE 2: Small network === */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity: p2Opacity,
          transform: `scale(${p2Scale})`,
          transformOrigin: "960px 510px",
        }}
      >
        {SMALL_EDGES.map((e, i) => (
          <line
            key={`se${i}`}
            x1={SMALL_NODES[e.from].x}
            y1={SMALL_NODES[e.from].y}
            x2={SMALL_NODES[e.to].x}
            y2={SMALL_NODES[e.to].y}
            stroke={COLORS.primary}
            strokeWidth={1.5}
            strokeDasharray="6 4"
            strokeDashoffset={dashOffset}
            opacity={0.25}
          />
        ))}
        {SMALL_NODES.map((n, i) => {
          const c = LAYER_COLORS[n.layer];
          return (
            <g key={`sn${i}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={16 * pulse}
                fill="none"
                stroke={c}
                strokeWidth={1}
                opacity={0.2}
              />
              <circle cx={n.x} cy={n.y} r={10} fill={c} opacity={0.85} />
              <circle
                cx={n.x}
                cy={n.y}
                r={4}
                fill="#fff"
                opacity={0.5 * pulse}
              />
            </g>
          );
        })}
        <text
          x={960}
          y={800}
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={26}
          fontWeight={600}
          fill={COLORS.textMuted}
        >
          רשת נוירונים פשוטה — 12 נוירונים
        </text>
      </svg>

      {/* === PHASE 3: Massive network === */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity: p3Opacity,
          transform: `scale(${p3Scale})`,
          transformOrigin: "960px 500px",
        }}
      >
        {DENSE_EDGES.map((e, i) => (
          <line
            key={`de${i}`}
            x1={DENSE_NODES[e.from].x}
            y1={DENSE_NODES[e.from].y}
            x2={DENSE_NODES[e.to].x}
            y2={DENSE_NODES[e.to].y}
            stroke={COLORS.primary}
            strokeWidth={1}
            opacity={0.08}
          />
        ))}
        {DENSE_NODES.map((n, i) => {
          const c = LAYER_COLORS[i % LAYER_COLORS.length];
          const np = interpolate(
            Math.sin(frame * 0.08 + i * 0.7),
            [-1, 1],
            [0.5, 1],
          );
          return (
            <g key={`dn${i}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={8 * np}
                fill="none"
                stroke={c}
                strokeWidth={0.5}
                opacity={0.15}
              />
              <circle cx={n.x} cy={n.y} r={4} fill={c} opacity={0.7} />
            </g>
          );
        })}
      </svg>

      {/* Counters */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 80,
          opacity: counterOpacity,
        }}
      >
        {/* Parameter counter */}
        <div
          style={{
            textAlign: "center",
            padding: "14px 36px",
            borderRadius: 14,
            background: `${COLORS.secondary}15`,
            border: `1px solid ${COLORS.secondary}44`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 44,
              fontWeight: 800,
              color: COLORS.secondary,
              direction: "ltr",
            }}
          >
            {paramCount}B
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.textMuted,
              direction: "rtl",
            }}
          >
            פרמטרים
          </div>
        </div>

        {/* Word counter */}
        <div
          style={{
            textAlign: "center",
            padding: "14px 36px",
            borderRadius: 14,
            background: `${COLORS.primary}15`,
            border: `1px solid ${COLORS.primary}44`,
            opacity: interpolate(frame, [310, 330], [0, 1], CLAMP),
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 44,
              fontWeight: 800,
              color: COLORS.primary,
              direction: "ltr",
            }}
          >
            {wordCount.toFixed(1)}T
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.textMuted,
              direction: "rtl",
            }}
          >
            מילי אימון
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          opacity: labelAppear,
          transform: `scale(${labelAppear})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 50px",
            borderRadius: 16,
            background: `${COLORS.secondary}20`,
            border: `3px solid ${COLORS.secondary}`,
            boxShadow: `0 0 30px ${COLORS.secondary}44`,
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.secondary,
            direction: "rtl",
          }}
        >
          אומנו על טריליוני מילים
        </div>
      </div>
    </AbsoluteFill>
  );
};
