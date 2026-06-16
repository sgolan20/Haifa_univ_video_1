import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG, HL } from "./_shared";

/**
 * Shot 7.1 — Error 1: vague "AI was used" (419 frames · 13.96s · audioStart 92.34s)
 *  0.0   "שתי שגיאות שכיחות שכדאי להכיר."
 *  2.56  "שגיאה ראשונה:"
 *  3.94  "לציין 'נעשה שימוש ב-AI' בלי לפרט כלל."
 *  8.06  "זה לא מספיק —"
 *  9.18  "לא ברור איזה כלי, לאיזו מטרה, ובאיזה שלב של העבודה."
 */
const MISSING = [
  { text: "איזה כלי?", at: 246 },
  { text: "לאיזו מטרה?", at: 282 },
  { text: "באיזה שלב?", at: 318 },
];

export const Shot7_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const quote = sp(frame, fps, 118, { damping: 14, stiffness: 95, mass: 0.8 });
  const notEnough = sp(frame, fps, 236, { damping: 12, stiffness: 110, mass: 0.7 });
  const float = Math.sin(frame * 0.045) * 5;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_errors.png" dur={419} maxOpacity={0.45} />
      <Particles accent={COLORS.warning} />

      {/* header */}
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: head, transform: `translateY(${interpolate(head, [0, 1], [-18, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, direction: "rtl" }}>
          <Img src={IMG("icon_warning.png")} style={{ height: 76, filter: `drop-shadow(0 0 20px ${COLORS.warning}cc)`, transform: `translateY(${float}px)` }} />
          <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "1px", color: COLORS.warning }}>שתי שגיאות שכיחות · שגיאה ראשונה</span>
        </div>
        <div style={{ maxWidth: 1400, textAlign: "center", direction: "rtl", fontSize: 52, fontWeight: 900, color: COLORS.text, textShadow: `0 0 30px ${COLORS.warning}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          דיווח <HL c={COLORS.warning}>מעורפל</HL> — בלי לפרט כלום
        </div>
      </div>

      {/* the vague quote (bad) */}
      <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: quote, transform: `translateY(${interpolate(quote, [0, 1], [26, 0])}px) scale(${interpolate(quote, [0, 1], [0.96, 1])})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "30px 60px", borderRadius: 24, direction: "rtl", background: `linear-gradient(160deg, ${COLORS.warning}1c, rgba(255,255,255,0.04))`, border: `2px solid ${COLORS.warning}88`, boxShadow: `0 16px 50px rgba(0,0,0,0.45)` }}>
          <span style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.warning, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, fontWeight: 900 }}>✕</span>
          <span style={{ fontSize: 48, fontWeight: 800, color: COLORS.text, fontStyle: "italic" }}>"נעשה שימוש ב-AI"</span>
        </div>
      </div>

      {/* not enough + the 3 missing questions */}
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: notEnough, transform: `scale(${notEnough})` }}>
        <span style={{ fontSize: 44, fontWeight: 900, color: COLORS.warning, direction: "rtl", textShadow: `0 0 22px ${COLORS.warning}66` }}>זה לא מספיק!</span>
      </div>
      <div style={{ position: "absolute", top: 580, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 36, direction: "rtl" }}>
        {MISSING.map((m, i) => {
          const pop = sp(frame, fps, m.at, { damping: 13, stiffness: 110, mass: 0.7 });
          const f = Math.sin((frame + i * 34) * 0.05) * 4;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 40px", borderRadius: 18, direction: "rtl", background: "rgba(255,255,255,0.055)", border: `2px solid ${COLORS.warning}66`, boxShadow: `0 10px 32px rgba(0,0,0,0.36)`, opacity: pop, transform: `scale(${pop}) translateY(${f}px)` }}>
              <span style={{ color: COLORS.warning, fontSize: 32, fontWeight: 900 }}>?</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, whiteSpace: "nowrap" }}>{m.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
