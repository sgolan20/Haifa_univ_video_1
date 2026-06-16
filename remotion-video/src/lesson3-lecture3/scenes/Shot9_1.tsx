import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL, NumberItem } from "./_shared";

/**
 * Shot 9.1 — Appendix: what you MUST include (440 frames · 14.65s · audioStart 136.44s)
 *  0.0   "זה לא רשימת כל הפרומפטים — זה תיאור מובנה. מה חובה לכלול בו?"
 *  5.96  "ראשית — שם הכלי והגרסה."
 *  8.30  "שנית — מטרת השימוש."
 * 10.28  "שלישית — היקף ההשפעה."
 * 12.62  "רביעית — מה שמרתם לעצמכם."
 */
const ITEMS = [
  { n: 1, label: "שם הכלי והגרסה", at: 179 },
  { n: 2, label: "מטרת השימוש", at: 249 },
  { n: 3, label: "היקף ההשפעה", at: 308 },
  { n: 4, label: "מה שמרתם לעצמכם", at: 379 },
];

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_appendix.png" dur={440} maxOpacity={0.42} />
      <Particles accent={COLORS.accent} />

      <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: head, transform: `scale(${interpolate(head, [0, 1], [0.94, 1])})` }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 60, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.accent}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          מה <HL c={COLORS.accent}>חובה</HL> לכלול ב-Appendix?
        </div>
      </div>

      <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, width: 1080 }}>
          {ITEMS.map((it, i) => (
            <NumberItem key={i} n={it.n} label={it.label} color={COLORS.accent} appear={sp(frame, fps, it.at, { damping: 14, stiffness: 100, mass: 0.75 })} idx={i} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
