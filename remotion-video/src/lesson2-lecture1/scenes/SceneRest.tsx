import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * PLACEHOLDER for scenes 4-12 (not built yet).
 * Keeps the full narration playing on the timeline so total length is correct.
 */
export const SceneRest: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        fontFamily: FONT_FAMILY,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", direction: "rtl", opacity }}>
        <div style={{ fontSize: 30, fontWeight: 500, color: COLORS.textMuted }}>סצנות 4–12</div>
        <div style={{ fontSize: 44, fontWeight: 700, color: COLORS.textDim, marginTop: 10 }}>בבנייה</div>
      </div>
    </AbsoluteFill>
  );
};
