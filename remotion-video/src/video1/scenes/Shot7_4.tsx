import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 7.4 — AI Bubble / The Limitation (16 seconds)
 * Large circle with dashed border. Inside: rotating kaleidoscope patterns.
 * AI icon bounces off boundary. Outside: "real world" elements.
 */

export const Shot7_4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bubble appear
  const bubbleIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Dashed border rotation
  const dashOffset = -frame * 1.5;

  // Kaleidoscope rotation inside
  const kaleidoRotation = frame * 0.5;

  // AI icon bounce
  const bouncePhase = (frame * 0.02) % (Math.PI * 2);
  const aiX = Math.cos(bouncePhase) * 120;
  const aiY = Math.sin(bouncePhase * 1.3) * 120;

  // Check if AI is near boundary (radius ~200)
  const distFromCenter = Math.sqrt(aiX * aiX + aiY * aiY);
  const nearBoundary = distFromCenter > 100;
  const boundaryFlash = nearBoundary
    ? interpolate(Math.sin(frame * 0.3), [-1, 1], [0, 0.3])
    : 0;

  // Label
  const labelIn = spring({
    frame: frame - 300,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Outside icons
  const outsideOpacity = interpolate(frame, [100, 150], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
          top: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 44,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
          opacity: bubbleIn,
        }}
      >
        המגבלה: בועת הנתונים
      </div>

      <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Outside world icons — warm colors */}
        <g opacity={outsideOpacity}>
          {/* Sun */}
          <circle cx={300} cy={300} r={30} fill="#f97316" opacity={0.6} />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <line
                key={`ray-${i}`}
                x1={300 + Math.cos(angle) * 38}
                y1={300 + Math.sin(angle) * 38}
                x2={300 + Math.cos(angle) * 55}
                y2={300 + Math.sin(angle) * 55}
                stroke="#f97316"
                strokeWidth={3}
                opacity={0.5}
              />
            );
          })}

          {/* Tree */}
          <rect x={1580} y={380} width={12} height={50} fill="#92400e" opacity={0.5} />
          <circle cx={1586} cy={360} r={30} fill="#22c55e" opacity={0.4} />

          {/* Flask */}
          <path d="M250 700 L260 650 L260 620 L280 620 L280 650 L290 700 Z" fill="none" stroke="#f97316" strokeWidth={2} opacity={0.5} />
          <circle cx={270} cy={680} r={5} fill="#f97316" opacity={0.4} />

          {/* Lab microscope */}
          <rect x={1550} y={700} width={8} height={40} fill={COLORS.textMuted} opacity={0.4} />
          <circle cx={1554} cy={695} r={15} fill="none" stroke={COLORS.textMuted} strokeWidth={2} opacity={0.4} />
        </g>

        {/* Bubble circle */}
        <circle
          cx={960}
          cy={520}
          r={240 * bubbleIn}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={3}
          strokeDasharray="12 8"
          strokeDashoffset={dashOffset}
          opacity={0.6}
        />

        {/* Boundary flash */}
        <circle
          cx={960}
          cy={520}
          r={245 * bubbleIn}
          fill="none"
          stroke={COLORS.warning}
          strokeWidth={2}
          opacity={boundaryFlash}
        />

        {/* Kaleidoscope patterns inside */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 + (kaleidoRotation * Math.PI) / 180;
          const r = 100;
          return (
            <g key={`kal-${i}`}>
              <circle
                cx={960 + Math.cos(angle) * r}
                cy={520 + Math.sin(angle) * r}
                r={35}
                fill={i % 3 === 0 ? `${COLORS.primary}22` : i % 3 === 1 ? `${COLORS.secondary}22` : `${COLORS.accent}22`}
                stroke={i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : COLORS.accent}
                strokeWidth={1}
                opacity={0.5}
              />
            </g>
          );
        })}

        {/* AI icon trying to escape */}
        <g transform={`translate(${960 + aiX}, ${520 + aiY})`}>
          <rect x={-20} y={-20} width={40} height={40} rx={8} fill={COLORS.primary} opacity={0.8} />
          <text x={0} y={8} textAnchor="middle" fontSize={20} fill={COLORS.bgPrimary} fontWeight={800}>
            AI
          </text>
        </g>
      </svg>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: labelIn,
          transform: `scale(${labelIn})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "14px 44px",
            borderRadius: 14,
            background: `${COLORS.warning}18`,
            border: `2px solid ${COLORS.warning}88`,
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 700,
            color: COLORS.warning,
            direction: "rtl",
          }}
        >
          מוגבל לדאטה קיימת — לא יוצר ידע חדש
        </div>
      </div>
    </AbsoluteFill>
  );
};
