import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 9.1 — "להתראות בשיעור הבא" (2 seconds, 60 frames)
 * Simple centered goodbye text.
 */

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.6 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${textIn})`,
          opacity: textIn,
          fontFamily: FONT_FAMILY,
          fontSize: 72,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
          textShadow: `0 0 30px ${COLORS.primary}44`,
          whiteSpace: "nowrap",
        }}
      >
        להתראות בשיעור הבא!
      </div>
    </AbsoluteFill>
  );
};
