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
 * Video 2, Shot 1.1 — Narrator introduction (20.5 seconds, 615 frames)
 *
 * TODO: Replace with lip-synced talking head video once generated.
 * Currently shows an animated placeholder.
 *
 * Narration: "שלום לכולם, בסרטון הקודם למדנו כיצד מודלי שפה עובדים..."
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const subtitleIn = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Placeholder silhouette circle */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.primary}33, ${COLORS.secondary}33)`,
          border: `3px solid ${COLORS.primary}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: titleIn,
          transform: `scale(${titleIn})`,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
            fill={COLORS.primary}
            opacity={0.6}
          />
        </svg>
      </div>

      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 42,
          fontWeight: 700,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 15}px)`,
        }}
      >
        [ דמות מדברת — ממתין לסרטון ]
      </div>

      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.textDim,
          direction: "ltr",
          opacity: subtitleIn,
        }}
      >
        video2/video/narrator.mp4
      </div>
    </AbsoluteFill>
  );
};
