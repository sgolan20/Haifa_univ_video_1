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
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 8.4 — Next Lectures Gate (4 seconds, 120 frames)
 * Full-screen golden gate image with "בהרצאות הבאות" text.
 * Narration (starts at 368s): "בהרצאות הבאות נבחן כיצד להשתמש בהם..."
 */

export const Shot8_4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gate image fades in
  const gateIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80, mass: 0.8 },
  });

  // Glow pulse on gate
  const glowPulse = interpolate(
    Math.sin(frame * 0.07),
    [-1, 1],
    [0.6, 1]
  );

  // Text enters
  const textIn = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Subtitle
  const subIn = spring({
    frame: frame - 35,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 60%, #1a1000 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Gate image — large, centered */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${gateIn})`,
          opacity: gateIn,
        }}
      >
        <Img
          src={staticFile("video1/images/shot8_gate.png")}
          style={{
            height: 550,
            width: "auto",
            filter: `brightness(${0.85 + glowPulse * 0.25}) drop-shadow(0 0 ${30 * glowPulse}px ${COLORS.accent}66)`,
          }}
        />
      </div>

      {/* Dark gradient overlay at top for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "35%",
          background: `linear-gradient(180deg, ${COLORS.bgPrimary}ee 0%, transparent 100%)`,
        }}
      />

      {/* Text at top */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: textIn,
          transform: `translateY(${(1 - textIn) * 20}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 52,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 20px ${COLORS.accent}33`,
          }}
        >
          בהרצאות הבאות
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 160,
          width: "100%",
          textAlign: "center",
          opacity: subIn,
          transform: `translateY(${(1 - subIn) * 15}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
          כיצד להשתמש בכלים אלה בצורה אפקטיבית
        </div>
      </div>
    </AbsoluteFill>
  );
};
