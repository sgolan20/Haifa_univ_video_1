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
import { Logo } from "../../design/Logo";

/**
 * Video 2, Shot 1.2 — Dramatic title "Hallucinations — הזיות" (13.8 seconds, 414 frames)
 *
 * "Hallucinations" in English (large, white, weight 800) + "הזיות" in Hebrew (turquoise, smaller).
 * Digital glitch effect on text — subtle jittering hinting something is off.
 * Background: AI-generated image of a digital brain with cracks/distortions (when available).
 * Logo fades in at corner.
 *
 * Narration: "זהו אחד האתגרים המרכזיים בשימוש אקדמי ומקצועי..."
 */

export const Shot1_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title entrance
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Subtitle entrance (slightly delayed)
  const subtitleIn = spring({
    frame: frame - 12,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Warning line at bottom
  const warningOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch effect — periodic digital jitter on the title
  const glitchCycle = frame % 90; // repeats every 3 seconds
  const isGlitching = glitchCycle >= 75 && glitchCycle <= 82; // glitch for ~7 frames
  const glitchX = isGlitching ? Math.sin(frame * 17) * 4 : 0;
  const glitchY = isGlitching ? Math.cos(frame * 23) * 2 : 0;

  // Red/cyan chromatic aberration during glitch
  const chromaOffset = isGlitching ? 3 : 0;

  // Scanline flicker during glitch
  const scanlineOpacity = isGlitching ? 0.15 : 0;

  // Subtle red glow pulsing
  const redGlow = interpolate(Math.sin(frame * 0.04), [-1, 1], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line width grows
  const lineWidth = interpolate(frame, [30, 80], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* AI-generated background — digital brain with cracks */}
      <Img
        src={staticFile("video2/images/shot1_2_brain_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 40], [0, 0.45], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Ambient red glow in background */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 800,
          height: 800,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${COLORS.warning}${Math.round(redGlow * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Scanlines during glitch */}
      {scanlineOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: scanlineOpacity,
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Main title block */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% + ${glitchX}px), calc(-50% + ${glitchY}px)) scale(${titleScale})`,
          textAlign: "center",
          opacity: titleScale,
        }}
      >
        {/* Chromatic aberration layers (red/cyan) during glitch */}
        {chromaOffset > 0 && (
          <>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: -chromaOffset,
                width: "100%",
                textAlign: "center",
                fontFamily: FONT_FAMILY,
                fontSize: 120,
                fontWeight: 800,
                color: "rgba(255, 0, 0, 0.3)",
                direction: "ltr",
                pointerEvents: "none",
              }}
            >
              Hallucinations
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: chromaOffset,
                width: "100%",
                textAlign: "center",
                fontFamily: FONT_FAMILY,
                fontSize: 120,
                fontWeight: 800,
                color: "rgba(0, 255, 255, 0.3)",
                direction: "ltr",
                pointerEvents: "none",
              }}
            >
              Hallucinations
            </div>
          </>
        )}

        {/* English title — "Hallucinations" */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.text,
            direction: "ltr",
            letterSpacing: 4,
            textShadow: `0 0 60px ${COLORS.warning}44, 0 0 120px ${COLORS.warning}22, 0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          Hallucinations
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${COLORS.warning}88, ${COLORS.primary}88, transparent)`,
            margin: "16px auto",
          }}
        />

        {/* Hebrew subtitle — "הזיות" */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.primary,
            direction: "rtl",
            opacity: subtitleIn,
            transform: `translateY(${(1 - subtitleIn) * 20}px)`,
            textShadow: `0 0 40px ${COLORS.primary}44, 0 2px 10px rgba(0,0,0,0.4)`,
          }}
        >
          הזיות
        </div>

        {/* Subtext — challenge description */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 400,
            color: COLORS.textMuted,
            direction: "rtl",
            marginTop: 32,
            opacity: warningOpacity,
          }}
        >
          אחד האתגרים המרכזיים בשימוש בבינה מלאכותית גנרטיבית
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
