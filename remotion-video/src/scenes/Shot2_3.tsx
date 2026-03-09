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
 * Shot 2.3 — Not "thinking" — Split Screen (17 seconds)
 * Dynamic split: human brain vs digital processor.
 * Big ≠ slams in center. Labels are huge and clear.
 * "חיזוי סטטיסטי" highlight bar at bottom.
 */

export const Shot2_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split screen: divider slices in
  const splitSlice = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Left panel slides in from right (RTL first)
  const leftIn = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const leftX = interpolate(leftIn, [0, 1], [400, 0]);

  // Right panel slides in from left
  const rightIn = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const rightX = interpolate(rightIn, [0, 1], [-400, 0]);

  // ≠ sign SLAMS in
  const neqSlam = spring({
    frame: frame - 150,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });

  // Flash on ≠ impact
  const neqFlash = interpolate(frame, [150, 153, 165], [0, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ≠ glow
  const neqGlow = interpolate(Math.sin((frame - 150) * 0.1), [-1, 1], [15, 40]);

  // Bottom label
  const labelSlam = spring({
    frame: frame - 280,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // "VS" text
  const vsOpacity = interpolate(frame, [60, 80, 145, 155], [0, 0.4, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Flash overlay */}
      <AbsoluteFill style={{ background: COLORS.warning, opacity: neqFlash }} />

      {/* RIGHT SIDE — Human Brain (warm) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "48%",
          height: "100%",
          transform: `translateX(${leftX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 800,
            color: "#f97316",
            marginBottom: 40,
            textShadow: `0 0 20px #f9731644`,
            direction: "rtl",
          }}
        >
          🧠 מוח אנושי
        </div>

        {/* Characteristics */}
        {[
          { text: "חושב ומבין", delay: 60 },
          { text: "מודעות עצמית", delay: 90 },
          { text: "כוונות ורגשות", delay: 120 },
          { text: "יצירתיות אמיתית", delay: 150 },
        ].map((item, i) => {
          const itemSlam = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 16, stiffness: 90 },
          });
          return (
            <div
              key={i}
              style={{
                transform: `scale(${itemSlam}) translateX(${(1 - itemSlam) * 100}px)`,
                opacity: itemSlam,
                marginBottom: 16,
                padding: "14px 32px",
                borderRadius: 14,
                background: "#f9731615",
                border: "2px solid #f9731644",
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 600,
                color: COLORS.text,
                direction: "rtl",
                width: 320,
                textAlign: "center",
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      {/* LEFT SIDE — AI Processor (cool) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "48%",
          height: "100%",
          transform: `translateX(${rightX}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        {/* Label */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 800,
            color: COLORS.primary,
            marginBottom: 40,
            textShadow: `0 0 20px ${COLORS.primary}44`,
            direction: "rtl",
          }}
        >
          🤖 מודל שפה
        </div>

        {/* Characteristics */}
        {[
          { text: "חיזוי סטטיסטי", delay: 80 },
          { text: "ללא מודעות", delay: 110 },
          { text: "ללא כוונות", delay: 140 },
          { text: "שילוב דפוסים", delay: 170 },
        ].map((item, i) => {
          const itemSlam = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 16, stiffness: 90 },
          });
          return (
            <div
              key={i}
              style={{
                transform: `scale(${itemSlam}) translateX(${(1 - itemSlam) * -100}px)`,
                opacity: itemSlam,
                marginBottom: 16,
                padding: "14px 32px",
                borderRadius: 14,
                background: `${COLORS.primary}15`,
                border: `2px solid ${COLORS.primary}44`,
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 600,
                color: COLORS.text,
                direction: "rtl",
                width: 320,
                textAlign: "center",
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>

      {/* Center divider line */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 3,
          height: `${splitSlice * 90}%`,
          background: `linear-gradient(180deg, transparent, ${COLORS.textDim}66, transparent)`,
        }}
      />

      {/* VS text before ≠ */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: FONT_FAMILY,
          fontSize: 36,
          fontWeight: 800,
          color: COLORS.textMuted,
          opacity: vsOpacity,
          letterSpacing: 6,
        }}
      >
        VS
      </div>

      {/* BIG ≠ sign */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${neqSlam})`,
          fontFamily: FONT_FAMILY,
          fontSize: 140,
          fontWeight: 900,
          color: COLORS.warning,
          opacity: neqSlam,
          textShadow: `0 0 ${neqGlow}px ${COLORS.warning}, 0 0 ${neqGlow * 2}px ${COLORS.warning}55`,
          lineHeight: 1,
        }}
      >
        ≠
      </div>

      {/* Bottom highlight bar */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: "50%",
          transform: `translate(-50%, 0) scale(${labelSlam})`,
          opacity: labelSlam,
        }}
      >
        <div
          style={{
            padding: "18px 60px",
            borderRadius: 16,
            background: `${COLORS.primary}20`,
            border: `3px solid ${COLORS.primary}`,
            boxShadow: `0 0 30px ${COLORS.primary}44`,
            fontFamily: FONT_FAMILY,
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.primary,
            direction: "rtl",
            textAlign: "center",
          }}
        >
          לא &quot;חושב&quot; — מבצע חיזוי סטטיסטי
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
