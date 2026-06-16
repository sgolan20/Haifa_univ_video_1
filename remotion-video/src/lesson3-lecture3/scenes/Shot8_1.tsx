import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG, HL, GlassCard } from "./_shared";

/**
 * Shot 8.1 — Appendix intro & definition (441 frames · 14.7s · audioStart 121.74s)
 *  0.0  "נעבור לנושא השלישי: יצירת Appendix — נספח תיעוד."
 *  4.7  "Appendix של שימוש ב-AI הוא מסמך קצר שמצרפים לסוף עבודה,
 *        ומתאר בצורה שיטתית איך השתמשתם בכלי AI במהלך הכתיבה."
 */
export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const line1 = sp(frame, fps, 150);
  const line2 = sp(frame, fps, 250);
  const tag = sp(frame, fps, 110, { damping: 13, stiffness: 110, mass: 0.7 });
  const float = Math.sin(frame * 0.04) * 6;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_appendix.png" dur={441} maxOpacity={0.45} />
      <Particles accent={COLORS.accent} />

      <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: head, transform: `translateY(${interpolate(head, [0, 1], [-18, 0])}px)` }}>
        <Img src={IMG("icon_appendix.png")} style={{ height: 130, filter: `drop-shadow(0 0 26px ${COLORS.accent}aa)`, transform: `translateY(${float}px) scale(${interpolate(head, [0, 1], [0.8, 1])})` }} />
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "1px", color: COLORS.accent }}>נושא שלישי</span>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 58, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.accent}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          יצירת <HL c={COLORS.accent}>Appendix</HL> — נספח תיעוד
        </div>
        <div style={{ padding: "10px 30px", borderRadius: 999, background: `${COLORS.accent}1f`, border: `1.5px solid ${COLORS.accent}`, fontSize: 26, fontWeight: 800, color: COLORS.text, direction: "rtl", opacity: tag, transform: `scale(${tag})` }}>📎 מצורף לסוף העבודה</div>
      </div>

      <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <GlassCard color={COLORS.accent} appear={Math.max(line1, line2)} style={{ width: 1280, padding: "40px 56px", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.text, lineHeight: 1.35, opacity: line1, transform: `translateY(${interpolate(line1, [0, 1], [16, 0])}px)` }}>
            <HL c={COLORS.accent}>מסמך קצר</HL> שמצרפים לסוף העבודה
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.text, lineHeight: 1.35, opacity: line2, transform: `translateY(${interpolate(line2, [0, 1], [16, 0])}px)` }}>
            ומתאר <HL c={COLORS.accent}>בצורה שיטתית</HL> איך השתמשתם ב-AI בכתיבה
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};
