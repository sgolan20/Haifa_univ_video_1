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
 * Shot 7.3 — "But is this really creativity?" (4 seconds)
 * Dramatic question moment — robot hand with paintbrush image,
 * bold question text punches in with impact.
 * Narration: "אבל האם זו באמת יצירתיות?"
 */

export const Shot7_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image fades in fast
  const imgOpacity = interpolate(frame, [0, 15], [0, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vignette darken for text readability
  const vignetteOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main question text — punches in with spring
  const textScale = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.6 },
  });

  // Subtle glow pulse on the text
  const glowPulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  // "אבל" word fades in slightly before the rest
  const abulOpacity = interpolate(frame, [3, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgPrimary,
      }}
    >
      {/* Background image — robot hand with paintbrush */}
      <Img
        src={staticFile("video1/images/shot7_3_creativity_question.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: imgOpacity,
        }}
      />

      {/* Dark vignette overlay for text contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(10,14,26,0.7) 70%)",
          opacity: vignetteOpacity,
        }}
      />

      {/* Central question text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${textScale})`,
          opacity: textScale,
          textAlign: "center",
          direction: "rtl",
          width: "85%",
        }}
      >
        {/* "אבל" — slightly earlier */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 600,
            color: COLORS.textMuted,
            opacity: abulOpacity,
            marginBottom: 10,
          }}
        >
          אבל
        </div>

        {/* Main question */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.4,
            textShadow: `0 0 ${30 * glowPulse}px ${COLORS.accent}66, 0 0 ${60 * glowPulse}px ${COLORS.accent}22, 0 4px 20px rgba(0,0,0,0.8)`,
          }}
        >
          האם זו באמת{" "}
          <span
            style={{
              color: COLORS.accent,
              textShadow: `0 0 ${40 * glowPulse}px ${COLORS.accent}88`,
            }}
          >
            יצירתיות
          </span>
          ?
        </div>
      </div>
    </AbsoluteFill>
  );
};
