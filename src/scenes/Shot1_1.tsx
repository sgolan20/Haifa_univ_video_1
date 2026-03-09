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
 * Shot 1.1 — Bold Opening (4 seconds)
 * Big title slams in. Ends with title sliding UP to make room for next shot.
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slam in
  const titleSlam = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.8 },
  });
  const titleScale = interpolate(titleSlam, [0, 1], [1.6, 1]);


  // Subtitle "LLM" punches in
  const llmSlam = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Decorative lines burst out from center
  const lineWidth = interpolate(frame, [5, 30], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background flash on impact
  const flash = interpolate(frame, [0, 3, 15], [0.3, 0.15, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          background: COLORS.primary,
          opacity: flash,
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main title */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.text,
            transform: `scale(${titleScale})`,
            textShadow: `0 0 40px ${COLORS.primary}66, 0 4px 20px rgba(0,0,0,0.5)`,
            textAlign: "center",
            direction: "rtl",
            lineHeight: 1.2,
          }}
        >
          מהו מודל שפה?
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        {/* LLM subtitle */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.primary,
            transform: `scale(${llmSlam})`,
            letterSpacing: 20,
            direction: "ltr",
            textShadow: `0 0 30px ${COLORS.primary}88`,
          }}
        >
          LLM
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
