import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

const TITLE_DURATION = 180; // 6 seconds at 30fps

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in background
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [TITLE_DURATION - 20, TITLE_DURATION - 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentOpacity = bgOpacity * fadeOut;

  // Logo springs in from top
  const logoY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const logoTranslate = interpolate(logoY, [0, 1], [-40, 0]);

  // Title springs in
  const titleScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 85, mass: 0.9 },
  });

  // Subtitle fades in after title
  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line grows
  const lineWidth = interpolate(frame, [30, 60], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Background image */}
      <Img
        src={staticFile("video1/images/title_card_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
        }}
      />

      {/* Dark overlay for text legibility */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to bottom, rgba(10,14,26,0.5) 0%, rgba(10,14,26,0.75) 100%)",
          opacity: contentOpacity,
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: contentOpacity,
          direction: "rtl",
        }}
      >
        {/* University logo */}
        <Img
          src={staticFile("images/haifa-logo-white.png")}
          style={{
            height: 70,
            marginBottom: 40,
            transform: `translateY(${logoTranslate}px)`,
            opacity: logoY,
          }}
        />

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(to left, transparent, ${COLORS.primary}, transparent)`,
            marginBottom: 32,
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.text,
            textAlign: "center",
            direction: "rtl",
            transform: `scale(${titleScale})`,
            textShadow: `0 0 40px ${COLORS.primary}60`,
            letterSpacing: "-0.5px",
          }}
        >
          מהו מודל שפה (LLM)?
        </div>

        {/* Decorative line below */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: `linear-gradient(to left, transparent, ${COLORS.secondary}, transparent)`,
            marginTop: 28,
            marginBottom: 24,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 300,
            color: COLORS.textMuted,
            textAlign: "center",
            direction: "rtl",
            opacity: subtitleOpacity,
            letterSpacing: "0.5px",
          }}
        >
          קורס אוריינות AI לסטודנטים — אוניברסיטת חיפה
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
