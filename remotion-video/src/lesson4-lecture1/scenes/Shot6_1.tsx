import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL, ExampleImageCard } from "./_shared";

/**
 * Shot 6.1 — MLA details + USER EXAMPLE IMAGE 2 (487 frames · 16.22s · audioStart 67.92s)
 *  0.68  "הציטוט בתוך הטקסט מתייחס לשם הכלי: (ChatGPT)."
 *  5.26  "ברשימת המקורות — Works Cited — מציינים את שם הכלי, האחראי עליו,"
 * 10.84  "תאריך הגישה, והנחיה ששלחתם —"
 * 14.62  "כן, כן, את ה-Prompt עצמו."
 */
export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headline = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const img = sp(frame, fps, 70, { damping: 16, stiffness: 80, mass: 0.9 });
  const promptPill = sp(frame, fps, 430, { damping: 12, stiffness: 110, mass: 0.7 });
  const pulse = 1 + 0.03 * Math.sin((frame - 430) * 0.14);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_mla.png" dur={487} maxOpacity={0.42} />
      <Particles accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 50, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.94, 1])})` }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 54, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.secondary}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          תקן <HL c={COLORS.secondary}>MLA</HL> — מה לציין
        </div>
      </div>

      {/* user example image — in-text (ChatGPT) + Works Cited */}
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <ExampleImageCard img="mla_example.png" color={COLORS.secondary} appear={img} width={1240} caption="דוגמה · MLA" />
      </div>

      {/* the key MLA difference: include the prompt */}
      <div style={{ position: "absolute", top: 770, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: promptPill, transform: `scale(${promptPill * pulse})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 54px", borderRadius: 999, direction: "rtl", background: `linear-gradient(90deg, ${COLORS.accent}26, ${COLORS.accent}10)`, border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44` }}>
          <span style={{ fontSize: 44 }}>💬</span>
          <span style={{ fontSize: 46, fontWeight: 900, color: COLORS.text }}>כולל את ה-<HL c={COLORS.accent}>Prompt</HL> עצמו</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
