import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Video 2, Shot 1.1 — Placeholder
 * Will be replaced with actual content once storyboard is defined.
 */
export const Shot1_1: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 72,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
          textAlign: "center",
        }}
      >
        סרטון 2 — הזיות (Hallucinations)
      </div>
    </AbsoluteFill>
  );
};
