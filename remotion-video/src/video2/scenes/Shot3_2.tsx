import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

export const Shot3_2: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.primary,
          direction: "rtl",
          textAlign: "center",
        }}
      >
        שוט 3.2
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 400,
          color: COLORS.textMuted,
          direction: "rtl",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        דוגמת פרס נובל
      </div>
    </AbsoluteFill>
  );
};
