import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, spring, staticFile, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";

/**
 * Shot 16.1 — University Logo closing (75 frames · 2.5s)
 * Haifa University logo centered on a dark background. Springs in, holds, fades out.
 * Mirrors the closing of the previous lessons.
 */
export const Shot16_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const fadeOut = interpolate(frame, [55, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, opacity: fadeOut }}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${logoIn})`,
          opacity: logoIn,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ padding: "50px 70px", borderRadius: 30, background: "rgba(255, 255, 255, 0.95)" }}>
          <Img src={staticFile("images/haifa-logo.png")} style={{ height: 300 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
