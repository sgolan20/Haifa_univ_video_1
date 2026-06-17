import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG, HL } from "./_shared";

/**
 * Shot 1.1 — Opening (469 frames · 15.64s · audioStart 0s)
 *  0.06  "שלום לכולם."
 *  1.5   "יושרה אקדמית אינה מסתיימת בשימוש נכון, אלא גם בדיווח נכון."
 *  7.2   "בעולם שבו AI מעורב בתהליך הכתיבה, נדרשת שקיפות שאינה רק כלל."
 * 12.54  "היא מיומנות שמגינה עליך ועל עבודתך."
 * (The talking-head intro overlays roughly the first ~7s.)
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const pillA = sp(frame, fps, 48);
  const arrow = sp(frame, fps, 130);
  const pillB = sp(frame, fps, 170);
  const banner = sp(frame, fps, 320, { stiffness: 95, mass: 0.8 });
  const float = Math.sin(frame * 0.04) * 5;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_opening.png" dur={469} maxOpacity={0.5} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: title, transform: `scale(${interpolate(title, [0, 1], [0.92, 1])})` }}>
        <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "2px", color: COLORS.primary, direction: "rtl", textShadow: `0 0 18px ${COLORS.primary}66` }}>שקיפות ותיעוד</span>
        <div style={{ maxWidth: 1400, textAlign: "center", direction: "rtl", fontSize: 60, fontWeight: 900, color: COLORS.text, lineHeight: 1.18, textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          יושרה אקדמית לא נגמרת ב<HL c={COLORS.primary}>שימוש נכון</HL>
        </div>
      </div>

      {/* שימוש נכון  →  דיווח נכון */}
      <div style={{ position: "absolute", top: 360, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 40, direction: "rtl" }}>
        <UsePill scale={pillA} label="שימוש נכון" color="#22c55e" />
        <span style={{ fontSize: 64, fontWeight: 900, color: COLORS.accent, opacity: arrow, transform: `scale(${arrow})`, textShadow: `0 0 22px ${COLORS.accent}88` }}>+</span>
        <UsePill scale={pillB} label="דיווח נכון" color={COLORS.accent} emphasize />
      </div>

      {/* shield: transparency is a skill */}
      <div style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: banner, transform: `scale(${banner})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "24px 48px", borderRadius: 26, direction: "rtl", background: `linear-gradient(160deg, ${COLORS.primary}1f, rgba(255,255,255,0.05))`, border: `2px solid ${COLORS.primary}`, boxShadow: `0 0 46px ${COLORS.primary}3a` }}>
          <Img src={IMG("icon_shield.png")} style={{ height: 110, filter: `drop-shadow(0 0 24px ${COLORS.primary}cc)`, transform: `translateY(${float}px)` }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>שקיפות אינה רק כלל —</span>
            <span style={{ fontSize: 52, fontWeight: 900, color: COLORS.text, direction: "rtl", lineHeight: 1.1 }}>היא <HL c={COLORS.primary}>מיומנות</HL> שמגינה עליך</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const UsePill: React.FC<{ scale: number; label: string; color: string; emphasize?: boolean }> = ({ scale, label, color, emphasize }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.05) * 4;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, padding: emphasize ? "30px 56px" : "26px 48px", borderRadius: 999, direction: "rtl", background: `linear-gradient(160deg, ${color}22, rgba(255,255,255,0.05))`, border: `2.5px solid ${color}`, boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 ${emphasize ? 50 : 30}px ${color}3a`, opacity: scale, transform: `scale(${scale}) translateY(${float}px)` }}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: color, color: "#0a0e1a", fontSize: 32, fontWeight: 900 }}>✓</span>
      <span style={{ fontSize: emphasize ? 52 : 44, fontWeight: 900, color: COLORS.text }}>{label}</span>
    </div>
  );
};
