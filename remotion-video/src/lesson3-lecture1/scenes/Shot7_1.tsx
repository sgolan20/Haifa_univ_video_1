import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

const GREEN = "#34d399";

/**
 * Shot 7.1 — When is it legitimate? (469 frames · 15.64s · audioStart 104.14s)
 *
 * Narration (relative):
 *   0.0s  "מתי זה לגיטימי? לדוגמה,"
 *   2.4s  "השתמשתם ב‑AI לניסוח ראשוני של פסקה,"
 *   5.7s  "ערכתם, שיניתם,"
 *   7.0s  "שילבתם עם מחשבות שלכם וציינתם בהתאם למדיניות הקורס."
 *  11.5s  "הרעיון והטיעון שלכם — ה‑AI עזר בניסוח."
 */
export const Shot7_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const card = spring({ frame: frame - 50, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });

  const steps = [
    { at: 71, icon: "✍️", text: "ניסוח ראשוני של פסקה בעזרת AI" },
    { at: 171, icon: "✏️", text: "ערכתם ושיניתם" },
    { at: 211, icon: "🧩", text: "שילבתם עם המחשבות שלכם" },
    { at: 280, icon: "📑", text: "ציינתם בהתאם למדיניות הקורס" },
  ];

  const conclusion = spring({ frame: frame - 346, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="legit_bg.png" dur={469} maxOpacity={0.5} />
      <Particles accent={GREEN} />

      <div style={{ position: "absolute", top: 56, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: 50, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: GREEN, color: "#04261b", fontSize: 32, fontWeight: 900 }}>✓</span>
          מתי זה <span style={{ color: GREEN }}>לגיטימי?</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 168, left: "50%", transform: `translateX(-50%) scale(${card})`, opacity: card, width: 900, padding: "28px 38px", borderRadius: 24, background: "rgba(17,24,39,0.7)", backdropFilter: "blur(16px)", border: `2px solid ${GREEN}55`, boxShadow: `0 0 50px ${GREEN}1f`, direction: "rtl" }}>
        {steps.map((s, i) => {
          const sp = spring({ frame: frame - s.at, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: i === steps.length - 1 ? 0 : 14, opacity: sp, transform: `translateX(${interpolate(sp, [0, 1], [40, 0])}px)` }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: "50%", background: `${GREEN}26`, border: `1.5px solid ${GREEN}`, color: GREEN, fontSize: 22, fontWeight: 900, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 30, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{s.text}</span>
              <span style={{ fontSize: 28, marginRight: "auto" }}>{s.icon}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: conclusion, transform: `scale(${conclusion})` }}>
        <div style={{ padding: "18px 44px", borderRadius: 999, background: `${GREEN}1f`, border: `2px solid ${GREEN}`, fontSize: 32, fontWeight: 700, color: COLORS.text, direction: "rtl", boxShadow: `0 0 34px ${GREEN}33` }}>
          הרעיון והטיעון <span style={{ color: GREEN, fontWeight: 800 }}>שלכם</span> — ה‑AI רק עזר בניסוח
        </div>
      </div>
    </AbsoluteFill>
  );
};
