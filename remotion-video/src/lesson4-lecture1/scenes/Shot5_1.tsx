import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG } from "./_shared";

/**
 * Shot 5.1 — MLA intro (141 frames · 4.7s · audioStart 63.22s)
 *  0.0  "נעבור לשיטת ציטוט MLA,"
 *  2.16 "השכיחה יותר במדעי הרוח."
 */
export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = sp(frame, fps, 6, { stiffness: 85, mass: 0.9 });
  const tag = sp(frame, fps, 65, { damping: 13, stiffness: 110, mass: 0.7 });
  const float = Math.sin(frame * 0.04) * 7;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_mla.png" dur={141} maxOpacity={0.5} />
      <Particles accent={COLORS.secondary} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, opacity: intro }}>
        <Img src={IMG("icon_mla.png")} style={{ height: 230, filter: `drop-shadow(0 0 34px ${COLORS.secondary}aa)`, transform: `translateY(${float}px) scale(${interpolate(intro, [0, 1], [0.8, 1])})` }} />
        <div style={{ textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: COLORS.text, letterSpacing: "2px", textShadow: `0 0 40px ${COLORS.secondary}55`, direction: "ltr" }}>MLA</div>
          <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.textMuted, marginTop: 6 }}>השכיחה יותר</div>
        </div>
        <div style={{ padding: "16px 44px", borderRadius: 999, background: `${COLORS.secondary}1f`, border: `2px solid ${COLORS.secondary}`, fontSize: 36, fontWeight: 800, color: COLORS.text, direction: "rtl", opacity: tag, transform: `scale(${tag})`, boxShadow: `0 0 30px ${COLORS.secondary}33` }}>מדעי הרוח</div>
      </div>
    </AbsoluteFill>
  );
};
