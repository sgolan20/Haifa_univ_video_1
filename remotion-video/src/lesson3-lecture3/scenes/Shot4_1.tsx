import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL, ExampleImageCard } from "./_shared";

/**
 * Shot 4.1 — APA details + USER EXAMPLE IMAGE 1 (696 frames · 23.2s · audioStart 31.36s)
 *  0.0   "לפי תקן APA עדכני, כשמשתמשים בפלט של מודל שפה בעבודה, יש לציין:"
 *  5.22  "שם הכלי,"  · 7.46 "שנת הגרסה," · 8.78 "שם החברה וכתובת האתר."
 * 11.36  "הציטוט בתוך הטקסט יראה כך: (OpenAI, 2024)"  → example image appears
 * 16.78  "ובסוף העבודה, ברשימת המקורות, מוסיפים ערך מלא..."
 */
const FIELDS = [
  { text: "שם הכלי", at: 157 },
  { text: "שנת הגרסה", at: 224 },
  { text: "שם החברה", at: 263 },
  { text: "כתובת האתר", at: 290 },
];

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headline = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const img = sp(frame, fps, 341, { damping: 16, stiffness: 80, mass: 0.9 });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_apa.png" dur={696} maxOpacity={0.42} />
      <Particles accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 52, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.94, 1])})` }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 54, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.primary}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          תקן <HL c={COLORS.primary}>APA</HL> — מה חובה לציין
        </div>
      </div>

      {/* the four required fields */}
      <div style={{ position: "absolute", top: 168, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 26, direction: "rtl" }}>
        {FIELDS.map((f, i) => {
          const pop = sp(frame, fps, f.at, { damping: 13, stiffness: 110, mass: 0.7 });
          const float = Math.sin((frame + i * 30) * 0.05) * 3;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 32px", borderRadius: 18, direction: "rtl", background: `linear-gradient(160deg, ${COLORS.primary}1c, rgba(255,255,255,0.05))`, border: `2px solid ${COLORS.primary}77`, boxShadow: `0 10px 32px rgba(0,0,0,0.36)`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <span style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.primary, color: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900 }}>{i + 1}</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.text, whiteSpace: "nowrap" }}>{f.text}</span>
            </div>
          );
        })}
      </div>

      {/* user example image — in-text citation + reference list */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <ExampleImageCard img="apa_example.png" color={COLORS.primary} appear={img} width={1180} caption="דוגמה · APA" />
      </div>
    </AbsoluteFill>
  );
};
