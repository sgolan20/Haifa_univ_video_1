import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 4.1 — Harm isn't always intentional + the blurred line (617 frames · 20.56s · audioStart 46.98s)
 *
 * Narration (relative):
 *   0.0s  "פגיעה ביושרה אקדמית בהקשר של AI אינה תמיד מכוונת,"
 *   4.2s  "אבל היא עדיין פגיעה."
 *   5.7s  "היא מתרחשת כאשר הגבול בין כלי עזר לבין תחליף לחשיבה מטשטש."
 *  10.8s  "חשוב להבין,"
 *  12.0s  "השאלה אינה רק האם השתמשתם ב-AI,"
 *  15.0s  "אלא האם השימוש שלכם עומד בציפיות המרצה ומשרת את הלמידה שלכם."
 */
export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A — "not intentional, but still harm" (0–~170)
  const a1 = spring({ frame: frame - 5, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const a2 = spring({ frame: frame - 126, fps, config: { damping: 13, stiffness: 110, mass: 0.7 } });
  const aOut = interpolate(frame, [160, 185], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase B — spectrum tool↔replacement (170–360)
  const bIn = spring({ frame: frame - 175, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const bOut = interpolate(frame, [350, 375], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const marker = interpolate(frame, [200, 320], [18, 82], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const blur = interpolate(frame, [240, 320], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase C — the real question (360+)
  const cIn = spring({ frame: frame - 365, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const crit1 = spring({ frame: frame - 470, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const crit2 = spring({ frame: frame - 520, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="boundary_bg.png" dur={617} maxOpacity={0.5} />
      <Particles />

      {/* Phase A */}
      {frame < 190 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, opacity: aOut }}>
          <div style={{ transform: `scale(${a1})`, opacity: a1, fontSize: 46, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
            פגיעה ביושרה אקדמית <span style={{ color: COLORS.textMuted }}>אינה תמיד מכוונת</span>
          </div>
          <div style={{ transform: `scale(${a2})`, opacity: a2, padding: "16px 44px", borderRadius: 999, background: `${COLORS.warning}26`, border: `2px solid ${COLORS.warning}`, fontSize: 40, fontWeight: 800, color: "#fca5a5", direction: "rtl", boxShadow: `0 0 36px ${COLORS.warning}44` }}>
            אבל היא עדיין פגיעה
          </div>
        </div>
      )}

      {/* Phase B — spectrum */}
      {frame >= 170 && frame < 375 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, opacity: bIn * bOut }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
            הגבול מיטשטש
          </div>
          <div style={{ position: "relative", width: 1000, height: 26, borderRadius: 999, background: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.accent} 50%, ${COLORS.warning} 100%)`, boxShadow: "0 0 30px rgba(0,0,0,0.5)", filter: `blur(${blur * 0.4}px)` }}>
            <div style={{ position: "absolute", top: "50%", left: `${marker}%`, transform: "translate(-50%,-50%)", width: 40, height: 40, borderRadius: "50%", background: "#fff", border: `3px solid ${COLORS.accent}`, boxShadow: `0 0 24px rgba(255,255,255,0.8)`, filter: `blur(${blur}px)` }} />
          </div>
          <div style={{ width: 1000, display: "flex", justifyContent: "space-between", direction: "rtl" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.primary, direction: "rtl" }}>🛠️ כלי עזר</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.warning, direction: "rtl" }}>תחליף לחשיבה ⛔</div>
          </div>
        </div>
      )}

      {/* Phase C — the real question */}
      {frame >= 360 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, opacity: cIn, transform: `translateY(${interpolate(cIn, [0, 1], [30, 0])}px)` }}>
          <div style={{ fontSize: 34, fontWeight: 600, color: COLORS.textMuted, direction: "rtl", textDecoration: "line-through", textDecorationColor: `${COLORS.warning}aa` }}>
            לא רק "האם השתמשתם ב‑AI?"
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1100, lineHeight: 1.35, textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
            אלא — האם השימוש שלכם...
          </div>
          <div style={{ display: "flex", gap: 28, direction: "rtl", marginTop: 6 }}>
            <Criterion s={crit1} text="עומד בציפיות המרצה" />
            <Criterion s={crit2} text="משרת את הלמידה שלכם" />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Criterion: React.FC<{ s: number; text: string }> = ({ s, text }) => (
  <div style={{ transform: `scale(${s})`, opacity: s, display: "flex", alignItems: "center", gap: 14, padding: "20px 34px", borderRadius: 18, background: `${COLORS.primary}1a`, border: `1.5px solid ${COLORS.primary}77`, boxShadow: `0 0 28px ${COLORS.primary}22`, direction: "rtl" }}>
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: COLORS.primary, color: "#04222b", fontSize: 24, fontWeight: 900 }}>✓</span>
    <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>{text}</span>
  </div>
);
