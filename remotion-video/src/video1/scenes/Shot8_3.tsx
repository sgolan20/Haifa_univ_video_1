import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 8.3 — Summary Takeaway (5 seconds, 150 frames)
 * Big centered text: "הבנת עקרון הפעולה = הבסיס לשימוש מושכל"
 * Enters immediately with the shot.
 * Narration (starts at 363s): "הבנת עקרון הפעולה הזה היא הבסיס לשימוש מושכל..."
 */

export const Shot8_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const takeawayIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
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
          transform: `translate(-50%, -50%) scale(${takeawayIn})`,
          opacity: takeawayIn,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "40px 70px",
            borderRadius: 24,
            background: `${COLORS.bgPrimary}dd`,
            border: `2px solid ${COLORS.primary}44`,
            boxShadow: `0 0 50px ${COLORS.primary}15`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.text,
              direction: "rtl",
              lineHeight: 1.6,
            }}
          >
            הבנת עקרון הפעולה
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 44,
              fontWeight: 700,
              color: COLORS.accent,
              direction: "rtl",
              textShadow: `0 0 25px ${COLORS.accent}44`,
            }}
          >
            היא הבסיס לשימוש מושכל
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
