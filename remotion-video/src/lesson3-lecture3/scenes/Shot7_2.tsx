import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG, HL } from "./_shared";

/**
 * Shot 7.2 — Error 2: citing AI as a source (463 frames · 15.44s · audioStart 106.30s)
 *  0.0   "שגיאה שנייה: לצטט AI כמקור מידע, כאילו הוא מאמר מדעי."
 *  5.42  "AI אינו מקור ראשוני, הוא כלי עיבוד."
 *  8.92  "אם ה-AI כתב לכם עובדה,"
 * 11.14  "אתם צריכים לאמת אותה ולצטט את המקור שממנו היא נלקחה."
 */
export const Shot7_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const cardA = sp(frame, fps, 163, { damping: 13, stiffness: 100, mass: 0.75 });
  const cardB = sp(frame, fps, 224, { damping: 13, stiffness: 100, mass: 0.75 });
  const banner = sp(frame, fps, 330, { damping: 13, stiffness: 100, mass: 0.8 });
  const float = Math.sin(frame * 0.045) * 5;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_errors.png" dur={463} maxOpacity={0.45} />
      <Particles accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 58, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: head, transform: `translateY(${interpolate(head, [0, 1], [-18, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, direction: "rtl" }}>
          <Img src={IMG("icon_warning.png")} style={{ height: 76, filter: `drop-shadow(0 0 20px ${COLORS.warning}cc)`, transform: `translateY(${float}px)` }} />
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "1px", color: COLORS.warning }}>שגיאה שנייה</span>
        </div>
        <div style={{ maxWidth: 1450, textAlign: "center", direction: "rtl", fontSize: 52, fontWeight: 900, color: COLORS.text, textShadow: `0 0 30px ${COLORS.warning}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          לצטט <HL c={COLORS.warning}>AI כמקור מידע</HL> — כאילו מאמר מדעי
        </div>
      </div>

      {/* contrast: not a primary source / it is a processing tool */}
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "stretch", gap: 56, direction: "rtl" }}>
        <ContrastCard scale={cardA} tone="bad" big="לא מקור ראשוני" sub="AI אינו מאמר מדעי" />
        <ContrastCard scale={cardB} tone="good" big="כלי עיבוד" sub="ככה צריך להבין אותו" />
      </div>

      {/* the rule */}
      <div style={{ position: "absolute", top: 620, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: banner, transform: `scale(${banner})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "24px 54px", borderRadius: 26, direction: "rtl", background: `linear-gradient(160deg, ${COLORS.primary}1f, rgba(255,255,255,0.05))`, border: `2px solid ${COLORS.primary}`, boxShadow: `0 0 46px ${COLORS.primary}3a` }}>
          <span style={{ fontSize: 44 }}>🔎</span>
          <span style={{ fontSize: 44, fontWeight: 900, color: COLORS.text }}>כתב עובדה? <HL c={COLORS.primary}>אמתו וצטטו את המקור המקורי</HL></span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ContrastCard: React.FC<{ scale: number; tone: "bad" | "good"; big: string; sub: string }> = ({ scale, tone, big, sub }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.05) * 5;
  const color = tone === "bad" ? COLORS.warning : "#22c55e";
  return (
    <div style={{ width: 520, padding: "36px 40px", borderRadius: 28, direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, background: `linear-gradient(160deg, ${color}1c, rgba(255,255,255,0.045))`, backdropFilter: "blur(14px)", border: `2px solid ${color}88`, boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 42px ${color}26`, opacity: scale, transform: `scale(${scale}) translateY(${float}px)` }}>
      <span style={{ width: 70, height: 70, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, boxShadow: `0 0 24px ${color}` }}>{tone === "bad" ? "✕" : "✓"}</span>
      <span style={{ fontSize: 46, fontWeight: 900, color: COLORS.text, textAlign: "center" }}>{big}</span>
      <span style={{ fontSize: 28, fontWeight: 600, color: COLORS.textMuted, textAlign: "center" }}>{sub}</span>
    </div>
  );
};
