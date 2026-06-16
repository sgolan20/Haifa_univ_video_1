import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL } from "./_shared";

/**
 * Shot 10.1 — Appendix: what NOT to include (282 frames · 9.41s · audioStart 151.09s)
 *  0.0  "מה לא צריך לכלול ב-Appendix? את השיחות המלאות עם הכלי,"
 *  4.07 "את כל הפרומפטים המדויקים — אלא אם נדרש,"
 *  6.99 "דוגמאות לא רלוונטיות לנושא."
 */
const ITEMS = [
  { text: "השיחות המלאות עם הכלי", at: 56 },
  { text: "כל הפרומפטים המדויקים (אלא אם נדרש)", at: 122 },
  { text: "דוגמאות לא רלוונטיות לנושא", at: 210 },
];

export const Shot10_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_appendix.png" dur={282} maxOpacity={0.4} />
      <Particles accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: head, transform: `scale(${interpolate(head, [0, 1], [0.94, 1])})` }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 60, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.warning}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          מה <HL c={COLORS.warning}>לא</HL> צריך לכלול?
        </div>
      </div>

      <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 1180 }}>
          {ITEMS.map((it, i) => {
            const pop = sp(frame, fps, it.at, { damping: 14, stiffness: 100, mass: 0.75 });
            const float = Math.sin((frame + i * 36) * 0.045) * 4;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, padding: "28px 40px", borderRadius: 22, direction: "rtl", background: `linear-gradient(160deg, ${COLORS.warning}14, rgba(255,255,255,0.04))`, border: `2px solid ${COLORS.warning}55`, boxShadow: `0 12px 38px rgba(0,0,0,0.38)`, opacity: pop, transform: `translateY(${interpolate(pop, [0, 1], [26, 0]) + float}px)` }}>
                <span style={{ minWidth: 60, height: 60, borderRadius: "50%", background: COLORS.warning, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900 }}>✕</span>
                <span style={{ fontSize: 40, fontWeight: 800, color: COLORS.text, lineHeight: 1.25 }}>{it.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
