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
 * Shot 7.5 — Human Creativity (18 seconds)
 * Three frames: Newton (apple + gravity), Picasso (cubist shapes), Eureka (lightbulb).
 * Each activates in sequence representing true human creativity.
 */

export const Shot7_5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Frame 1: Newton — activated at frame 60
  const newton = spring({
    frame: frame - 60,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Apple fall
  const appleFall = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const appleY = interpolate(appleFall, [0, 1], [-40, 80]);

  // Frame 2: Picasso — activated at frame 180
  const picasso = spring({
    frame: frame - 180,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Frame 3: Eureka — activated at frame 300
  const eureka = spring({
    frame: frame - 300,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Lightbulb glow
  const bulbGlow = frame > 340
    ? interpolate(Math.sin((frame - 340) * 0.08), [-1, 1], [15, 40])
    : 0;

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
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
          opacity: titleIn,
          transform: `scale(${titleIn})`,
        }}
      >
        יצירתיות אנושית אמיתית
      </div>

      {/* Three frames container */}
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
        {/* Frame 1: Newton */}
        <div
          style={{
            width: 420,
            height: 500,
            borderRadius: 20,
            border: `3px solid ${COLORS.accent}${newton > 0.5 ? "cc" : "44"}`,
            background: `${COLORS.bgPrimary}dd`,
            boxShadow: newton > 0.5 ? `0 0 30px ${COLORS.accent}33` : "none",
            opacity: newton,
            transform: `scale(${newton})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 20px",
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.accent, direction: "rtl", marginBottom: 20 }}>
            ניוטון
          </div>
          <svg width="200" height="280" viewBox="0 0 200 280">
            {/* Tree */}
            <rect x="90" y="100" width="20" height="120" fill="#92400e" opacity="0.6" />
            <circle cx="100" cy="80" r="50" fill="#22c55e" opacity="0.3" />
            {/* Apple falling */}
            <circle cx="120" cy={80 + appleY * 1.5} r="12" fill="#ef4444" opacity={appleFall > 0 ? 0.8 : 0} />
            {/* Gravity arrows */}
            {appleFall > 0.5 && (
              <>
                <line x1="50" y1="240" x2="50" y2="260" stroke={COLORS.accent} strokeWidth="2" opacity="0.5" />
                <polygon points="45,260 50,270 55,260" fill={COLORS.accent} opacity="0.5" />
                <line x1="150" y1="240" x2="150" y2="260" stroke={COLORS.accent} strokeWidth="2" opacity="0.5" />
                <polygon points="145,260 150,270 155,260" fill={COLORS.accent} opacity="0.5" />
              </>
            )}
          </svg>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
            חוקי הכבידה
          </div>
        </div>

        {/* Frame 2: Picasso */}
        <div
          style={{
            width: 420,
            height: 500,
            borderRadius: 20,
            border: `3px solid ${COLORS.secondary}${picasso > 0.5 ? "cc" : "44"}`,
            background: `${COLORS.bgPrimary}dd`,
            boxShadow: picasso > 0.5 ? `0 0 30px ${COLORS.secondary}33` : "none",
            opacity: picasso,
            transform: `scale(${picasso})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 20px",
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.secondary, direction: "rtl", marginBottom: 20 }}>
            פיקאסו
          </div>
          <svg width="200" height="280" viewBox="0 0 200 280">
            {/* Cubist face */}
            <rect x="40" y="30" width="60" height="80" fill={`${COLORS.secondary}33`} stroke={COLORS.secondary} strokeWidth="2" transform={`rotate(${picasso * 10} 70 70)`} />
            <polygon points="100,50 160,90 130,140" fill={`${COLORS.primary}33`} stroke={COLORS.primary} strokeWidth="2" />
            <circle cx="80" cy="60" r="15" fill={`${COLORS.accent}44`} stroke={COLORS.accent} strokeWidth="2" />
            <rect x="60" y="130" width="80" height="60" fill={`${COLORS.warning}22`} stroke={COLORS.warning} strokeWidth="1.5" transform={`rotate(-${picasso * 5} 100 160)`} />
            <polygon points="50,200 100,170 150,210 90,240" fill={`#22c55e22`} stroke="#22c55e" strokeWidth="1.5" />
          </svg>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
            קוביזם — מבט חדש
          </div>
        </div>

        {/* Frame 3: Eureka */}
        <div
          style={{
            width: 420,
            height: 500,
            borderRadius: 20,
            border: `3px solid ${COLORS.primary}${eureka > 0.5 ? "cc" : "44"}`,
            background: `${COLORS.bgPrimary}dd`,
            boxShadow: eureka > 0.5 ? `0 0 ${bulbGlow}px ${COLORS.accent}44` : "none",
            opacity: eureka,
            transform: `scale(${eureka})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 20px",
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.primary, direction: "rtl", marginBottom: 20 }}>
            יוריקה!
          </div>
          <svg width="200" height="280" viewBox="0 0 200 280">
            {/* Lightbulb */}
            <circle cx="100" cy="100" r={50} fill={frame > 340 ? `${COLORS.accent}44` : "transparent"} stroke={COLORS.accent} strokeWidth="3" />
            {/* Filament */}
            <path d="M85 120 Q90 90 100 80 Q110 90 115 120" fill="none" stroke={frame > 340 ? COLORS.accent : COLORS.textDim} strokeWidth="2" />
            {/* Base */}
            <rect x="85" y="145" width="30" height="15" rx="3" fill={COLORS.textDim} opacity="0.5" />
            <rect x="88" y="160" width="24" height="10" rx="2" fill={COLORS.textDim} opacity="0.4" />
            {/* Glow rays */}
            {frame > 340 && Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={100 + Math.cos(angle) * 60}
                  y1={100 + Math.sin(angle) * 60}
                  x2={100 + Math.cos(angle) * 80}
                  y2={100 + Math.sin(angle) * 80}
                  stroke={COLORS.accent}
                  strokeWidth="2"
                  opacity={interpolate(Math.sin(frame * 0.1 + i), [-1, 1], [0.3, 0.8])}
                />
              );
            })}
          </svg>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
            תובנה פורצת דרך
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
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: interpolate(frame, [380, 420], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        יצירתיות אנושית = תובנות חדשות שלא נובעות מדפוסים קיימים
      </div>
    </AbsoluteFill>
  );
};
