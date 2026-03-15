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

/**
 * Shot 9.2 — University Logo (3 seconds, 90 frames)
 * Haifa University logo centered on dark background. Fade out at end.
 */

export const Shot9_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const fadeOut = interpolate(frame, [60, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgPrimary,
        opacity: fadeOut,
      }}
    >
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
        <Img
          src={staticFile("images/haifa-logo.png")}
          style={{
            height: 120,
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
