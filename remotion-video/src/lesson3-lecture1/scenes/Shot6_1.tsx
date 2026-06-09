import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 6.1 — When is it problematic? (469 frames · 15.62s · audioStart 88.52s)
 *
 * Narration (relative):
 *   0.0s  "מתי זה בעייתי? לדוגמה,"
 *   2.5s  "ביקשתם מ‑ChatGPT לכתוב סיכום של רעיון פילוסופי,"
 *   6.2s  "העתקתם את הטקסט ישירות לעבודה הסמינריונית ולא ציינתם שנעזרתם ב‑AI."
 *  12.2s  "המרצה ביקשה עבודה המשקפת את הניתוח שלכם."
 */
export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const card = spring({ frame: frame - 50, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });

  const steps = [
    { at: 74, icon: "💬", text: "ביקשתם מ‑ChatGPT סיכום של רעיון פילוסופי" },
    { at: 187, icon: "📋", text: "העתקתם את הטקסט ישירות לעבודה הסמינריונית" },
    { at: 280, icon: "🚫", text: "לא ציינתם שנעזרתם ב‑AI" },
  ];

  const mismatch = spring({ frame: frame - 365, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="plagiarism_bg.png" dur={469} maxOpacity={0.45} />
      <Particles accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 56, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: 50, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: COLORS.warning, color: "#fff", fontSize: 32, fontWeight: 900 }}>✕</span>
          מתי זה <span style={{ color: "#fca5a5" }}>בעייתי?</span>
        </div>
      </div>

      {/* scenario card */}
      <div style={{ position: "absolute", top: 170, left: "50%", transform: `translateX(-50%) scale(${card})`, opacity: card, width: 920, padding: "30px 38px", borderRadius: 24, background: "rgba(17,24,39,0.72)", backdropFilter: "blur(16px)", border: `2px solid ${COLORS.warning}55`, boxShadow: `0 0 50px ${COLORS.warning}1f`, direction: "rtl" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.textMuted, direction: "rtl", marginBottom: 18 }}>דוגמה:</div>
        {steps.map((s, i) => {
          const sp = spring({ frame: frame - s.at, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16, opacity: sp, transform: `translateX(${interpolate(sp, [0, 1], [40, 0])}px)` }}>
              <span style={{ fontSize: 36 }}>{s.icon}</span>
              <span style={{ fontSize: 32, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{s.text}</span>
            </div>
          );
        })}
      </div>

      {/* lecturer mismatch callout */}
      <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: mismatch, transform: `scale(${mismatch})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 40px", borderRadius: 999, background: `${COLORS.warning}1f`, border: `2px solid ${COLORS.warning}`, direction: "rtl", boxShadow: `0 0 34px ${COLORS.warning}33` }}>
          <span style={{ fontSize: 34 }}>👩‍🏫</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>
            אך המרצה ביקשה את <span style={{ color: COLORS.accent, fontWeight: 800 }}>הניתוח שלכם</span>
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
