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
 * Shot 7.7 — Scientific Limitation / Collaboration (22 seconds)
 * Split screen: Lab (experimental science) vs AI (analysis).
 * Dashed line connects them, then handshake icon appears = collaboration.
 */

export const Shot7_7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Divider grows
  const dividerGrow = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right side (Lab) appears first
  const labIn = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Left side (AI) appears
  const aiIn = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Connection line
  const connectionProgress = interpolate(frame, [300, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Handshake
  const handshakeIn = spring({
    frame: frame - 400,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Bubbles in test tube
  const bubblePhase = frame * 0.08;

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
          opacity: spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } }),
        }}
      >
        AI ככלי עזר — לא תחליף למציאות
      </div>

      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 3,
          height: `${dividerGrow * 76}%`,
          background: `linear-gradient(180deg, transparent, ${COLORS.textDim}55, transparent)`,
        }}
      />

      {/* RIGHT — Lab (Experimental Science) */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "42%",
          height: "65%",
          opacity: labIn,
          transform: `translateX(${(1 - labIn) * 100}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, fontWeight: 800, color: "#f97316", direction: "rtl", textShadow: `0 0 20px #f9731644` }}>
          🔬 מעבדה — מדע ניסויי
        </div>

        <svg width="350" height="300" viewBox="0 0 350 300">
          {/* Test tube */}
          <rect x="60" y="40" width="40" height="150" rx="5" fill="none" stroke="#f97316" strokeWidth="2.5" />
          <rect x="60" y="120" width="40" height="70" rx="0" fill="#f9731633" />
          {/* Bubbles */}
          {[0, 1, 2].map((b) => (
            <circle
              key={b}
              cx={75 + b * 8}
              cy={140 - ((bubblePhase + b * 2) % 4) * 20}
              r={4}
              fill="#f97316"
              opacity={0.5}
            />
          ))}

          {/* Microscope */}
          <rect x="180" y="100" width="10" height="80" fill={COLORS.textMuted} opacity="0.5" />
          <circle cx="185" cy="90" r="20" fill="none" stroke={COLORS.textMuted} strokeWidth="2" opacity="0.5" />
          <rect x="170" y="180" width="30" height="10" rx="2" fill={COLORS.textMuted} opacity="0.4" />

          {/* Graph */}
          <polyline
            points="230,250 250,220 270,230 290,180 310,190 330,160"
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
            opacity="0.6"
          />
          <line x1="230" y1="260" x2="340" y2="260" stroke={COLORS.textDim} strokeWidth="1" opacity="0.4" />
          <line x1="230" y1="260" x2="230" y2="150" stroke={COLORS.textDim} strokeWidth="1" opacity="0.4" />
        </svg>

        <div style={{ fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
          ניסויים, תצפיות, גילויים
        </div>
      </div>

      {/* LEFT — AI Analysis */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "42%",
          height: "65%",
          opacity: aiIn,
          transform: `translateX(${(1 - aiIn) * -100}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 36, fontWeight: 800, color: COLORS.primary, direction: "rtl", textShadow: `0 0 20px ${COLORS.primary}44` }}>
          🤖 AI — ניתוח נתונים
        </div>

        <svg width="350" height="300" viewBox="0 0 350 300">
          {/* Screen */}
          <rect x="50" y="30" width="250" height="160" rx="10" fill={`${COLORS.bgPrimary}`} stroke={COLORS.primary} strokeWidth="2" opacity="0.6" />
          {/* Screen content — lines of text */}
          {[0, 1, 2, 3, 4].map((line) => (
            <rect
              key={line}
              x="70"
              y={55 + line * 28}
              width={180 - line * 20}
              height={8}
              rx={4}
              fill={COLORS.primary}
              opacity={0.25}
            />
          ))}
          {/* Chart on screen */}
          <rect x="70" y="200" width="70" height="60" rx="4" fill={`${COLORS.primary}22`} stroke={COLORS.primary} strokeWidth="1" opacity="0.5" />
          <rect x="160" y="210" width="70" height="50" rx="4" fill={`${COLORS.secondary}22`} stroke={COLORS.secondary} strokeWidth="1" opacity="0.5" />
          <rect x="250" y="220" width="70" height="40" rx="4" fill={`${COLORS.accent}22`} stroke={COLORS.accent} strokeWidth="1" opacity="0.5" />
        </svg>

        <div style={{ fontFamily: FONT_FAMILY, fontSize: 22, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
          עיבוד, סיכום, חיזוי
        </div>
      </div>

      {/* Connection dashed line + "שיתוף פעולה" */}
      {connectionProgress > 0 && (
        <svg width={1920} height={1080} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
          <line
            x1={550}
            y1={540}
            x2={550 + (1370 - 550) * connectionProgress}
            y2={540}
            stroke={COLORS.accent}
            strokeWidth={2.5}
            strokeDasharray="10 6"
            strokeDashoffset={-frame * 2}
            opacity={0.6}
          />
          {connectionProgress > 0.5 && (
            <text
              x={960}
              y={525}
              textAnchor="middle"
              fontFamily={FONT_FAMILY}
              fontSize={24}
              fontWeight={700}
              fill={COLORS.accent}
              opacity={connectionProgress}
            >
              שיתוף פעולה
            </text>
          )}
        </svg>
      )}

      {/* Handshake icon */}
      {handshakeIn > 0 && (
        <div
          style={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${handshakeIn})`,
            opacity: handshakeIn,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `${COLORS.accent}25`,
              border: `3px solid ${COLORS.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: `0 0 30px ${COLORS.accent}44`,
            }}
          >
            🤝
          </div>
        </div>
      )}

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 30,
          fontWeight: 700,
          color: COLORS.primary,
          direction: "rtl",
          opacity: interpolate(frame, [450, 500], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        AI = כלי עזר רב-עוצמה, לא תחליף לחשיבה אנושית
      </div>
    </AbsoluteFill>
  );
};
