import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG } from "./_shared";

/**
 * Shot 3.1 — APA intro (172 frames · 5.74s · audioStart 25.62s)
 *  0.0  "נתחיל עם APA,"
 *  1.36 "המוסכמה הנפוצה ביותר במדעי החברה ובמדעי הטבע."
 */
const TAGS = [
  { text: "מדעי החברה", at: 56 },
  { text: "מדעי הטבע", at: 78 },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = sp(frame, fps, 6, { stiffness: 85, mass: 0.9 });
  const float = Math.sin(frame * 0.04) * 7;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_apa.png" dur={172} maxOpacity={0.5} />
      <Particles accent={COLORS.primary} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, opacity: intro }}>
        <Img src={IMG("icon_apa.png")} style={{ height: 230, filter: `drop-shadow(0 0 34px ${COLORS.primary}aa)`, transform: `translateY(${float}px) scale(${interpolate(intro, [0, 1], [0.8, 1])})` }} />
        <div style={{ textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: COLORS.text, letterSpacing: "2px", textShadow: `0 0 40px ${COLORS.primary}55`, direction: "ltr" }}>APA</div>
          <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.textMuted, marginTop: 6 }}>המוסכמה הנפוצה ביותר</div>
        </div>
        <div style={{ display: "flex", gap: 28, direction: "rtl", marginTop: 4 }}>
          {TAGS.map((t, i) => {
            const pop = sp(frame, fps, t.at, { damping: 13, stiffness: 110, mass: 0.7 });
            return (
              <div key={i} style={{ padding: "16px 40px", borderRadius: 999, background: `${COLORS.primary}1f`, border: `2px solid ${COLORS.primary}`, fontSize: 34, fontWeight: 800, color: COLORS.text, opacity: pop, transform: `scale(${pop})`, boxShadow: `0 0 30px ${COLORS.primary}33` }}>{t.text}</div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
