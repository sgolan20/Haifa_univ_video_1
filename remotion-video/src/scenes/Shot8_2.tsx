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
 * Shot 8.2 — Summary Part 2 (12 seconds, 360 frames)
 * Cards 3-4 stay visible for the entire shot. No grid transition.
 * Narration timing (shot starts at 350s):
 *   f0   (350.3) — "מודל שפה אינו מנוע חיפוש..."
 *   f195 (356.8) — "הוא אינו מבין, במובן האנושי..."
 *   f352 (361.7) — "...בין מילים ורעיונות." (end)
 */

/* ── Card 3 SVG: Magnifying glass with X + pen writing new text ── */
const NotSearchIcon: React.FC<{ frame: number; size: number }> = ({ frame, size }) => {
  const line1 = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2 = interpolate(frame, [35, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line3 = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const penY = Math.sin(frame * 0.08) * 2;

  return (
    <svg width={size} height={size} viewBox="0 0 180 180">
      {/* Magnifying glass — crossed out */}
      <circle cx="55" cy="70" r="30" fill="none" stroke={COLORS.secondary} strokeWidth="3" opacity="0.5" />
      <line x1="77" y1="92" x2="95" y2="110" stroke={COLORS.secondary} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      {/* Red X */}
      <line x1="35" y1="50" x2="75" y2="90" stroke={COLORS.warning} strokeWidth="4" strokeLinecap="round" />
      <line x1="75" y1="50" x2="35" y2="90" stroke={COLORS.warning} strokeWidth="4" strokeLinecap="round" />

      {/* Pen */}
      <g transform={`translate(130, ${45 + penY})`}>
        <rect x="-4" y="-30" width="8" height="35" rx="2" fill={COLORS.primary} opacity="0.8" />
        <polygon points="-4,5 4,5 0,14" fill={COLORS.primary} />
      </g>

      {/* Generated text lines */}
      <rect x="100" y="80" width={60 * line1} height="4" rx="2" fill={COLORS.primary} opacity="0.7" />
      <rect x="100" y="95" width={50 * line2} height="4" rx="2" fill={COLORS.primary} opacity="0.5" />
      <rect x="100" y="110" width={40 * line3} height="4" rx="2" fill={COLORS.primary} opacity="0.4" />

      {frame % 30 < 15 && (
        <circle cx="130" cy={60 + penY} r="2" fill={COLORS.accent} opacity="0.8" />
      )}
    </svg>
  );
};

/* ── Card 4 SVG: Animated network of connected nodes ── */
const NODES = [
  { x: 90, y: 30 },
  { x: 40, y: 70 },
  { x: 140, y: 65 },
  { x: 65, y: 120 },
  { x: 120, y: 125 },
  { x: 90, y: 80 },
  { x: 30, y: 140 },
  { x: 150, y: 140 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 5], [1, 3], [1, 5],
  [2, 4], [2, 5], [3, 4], [3, 6], [4, 5], [4, 7],
];

const NetworkIcon: React.FC<{ frame: number; size: number }> = ({ frame, size }) => (
  <svg width={size} height={size} viewBox="0 0 180 170">
    {EDGES.map(([a, b], i) => {
      const na = NODES[a];
      const nb = NODES[b];
      const t = ((frame * 0.02 + i * 0.3) % 1);
      const px = na.x + (nb.x - na.x) * t;
      const py = na.y + (nb.y - na.y) * t;
      return (
        <g key={`e-${i}`}>
          <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#3b82f6" strokeWidth="1.5" opacity="0.3" />
          <circle cx={px} cy={py} r="2.5" fill="#3b82f6" opacity="0.7" />
        </g>
      );
    })}
    {NODES.map((n, i) => {
      const pulse = Math.sin(frame * 0.06 + i * 1.2) * 0.3 + 0.7;
      return <circle key={`n-${i}`} cx={n.x} cy={n.y} r={7} fill="#3b82f6" opacity={pulse} />;
    })}
  </svg>
);

export const Shot8_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const card3In = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  const card4In = spring({
    frame: frame - 185,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
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
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
          textShadow: `0 0 30px ${COLORS.primary}33`,
        }}
      >
        סיכום
      </div>

      {/* Cards 3 & 4 — stay for entire shot */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 60,
          direction: "rtl",
        }}
      >
        {/* Card 3 */}
        <div
          style={{
            width: 520,
            borderRadius: 24,
            background: `${COLORS.bgPrimary}ee`,
            border: `2px solid ${COLORS.secondary}55`,
            opacity: card3In,
            transform: `scale(${card3In}) translateY(${(1 - card3In) * 30}px)`,
            padding: "30px 30px 35px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -18,
              right: 30,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: COLORS.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: 800,
              color: COLORS.bgPrimary,
              boxShadow: `0 0 15px ${COLORS.secondary}66`,
            }}
          >
            3
          </div>
          <NotSearchIcon frame={Math.max(0, frame - 10)} size={180} />
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            לא מנוע חיפוש — מייצר טקסט חדש
          </div>
        </div>

        {/* Card 4 */}
        <div
          style={{
            width: 520,
            borderRadius: 24,
            background: `${COLORS.bgPrimary}ee`,
            border: `2px solid #3b82f655`,
            opacity: card4In,
            transform: `scale(${card4In}) translateY(${(1 - card4In) * 30}px)`,
            padding: "30px 30px 35px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -18,
              right: 30,
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: 800,
              color: COLORS.bgPrimary,
              boxShadow: `0 0 15px #3b82f666`,
            }}
          >
            4
          </div>
          <NetworkIcon frame={Math.max(0, frame - 185)} size={180} />
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            קשרים סטטיסטיים, לא הבנה אנושית
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
