import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL, ExampleImageCard, GlassCard } from "./_shared";

/**
 * Shot 6.2 — MLA: why the prompt? (246 frames · 8.2s · audioStart 84.14s)
 *  0.0  "מדוע את ה-Prompt?"
 *  1.58 "כי ב-MLA הדגש הוא על מה ביקשת לקבל."
 *  5.0  "הפלט תמיד תלוי בשאלה ששאלתם."
 * (User example image 2 stays visible here.)
 */
export const Shot6_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headline = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const img = sp(frame, fps, 30, { damping: 16, stiffness: 80, mass: 0.9 });
  const a = sp(frame, fps, 47);
  const b = sp(frame, fps, 150);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_mla.png" dur={246} maxOpacity={0.45} />
      <Particles accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.94, 1])})` }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 58, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.accent}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          מדוע דווקא ה-<HL c={COLORS.accent}>Prompt</HL>?
        </div>
      </div>

      <div style={{ position: "absolute", top: 250, left: 90, right: 90, bottom: 110, display: "flex", direction: "rtl", alignItems: "center", justifyContent: "center", gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, width: 760 }}>
          <GlassCard color={COLORS.secondary} appear={a} style={{ padding: "30px 38px" }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, lineHeight: 1.3 }}>הדגש הוא על <HL c={COLORS.accent}>מה ביקשת לקבל</HL></div>
          </GlassCard>
          <GlassCard color={COLORS.secondary} appear={b} style={{ padding: "30px 38px" }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, lineHeight: 1.3 }}>הפלט <HL c={COLORS.primary}>תמיד תלוי</HL> בשאלה ששאלתם</div>
          </GlassCard>
        </div>
        <ExampleImageCard img="mla_example.png" color={COLORS.secondary} appear={img} width={640} caption="MLA" />
      </div>
    </AbsoluteFill>
  );
};
