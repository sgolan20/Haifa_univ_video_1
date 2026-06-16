import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL } from "./_shared";

/**
 * Shot 4.2 — APA: two purposes both deserve a citation (260 frames · 8.66s · audioStart 54.56s)
 *  0.0  "שימו לב: אם השתמשתם ב-AI לשתי מטרות שונות —"
 *  3.98 "עריכה לשונית וגם סיכום מקורות —"
 *  6.54 "שתיהן ראויות לציון."
 */
const PURPOSES = [
  { text: "עריכה לשונית", icon: "✍️", at: 36 },
  { text: "סיכום מקורות", icon: "📚", at: 119 },
];

export const Shot4_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headline = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const banner = sp(frame, fps, 196, { damping: 12, stiffness: 110, mass: 0.7 });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_apa.png" dur={260} maxOpacity={0.45} />
      <Particles accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 116, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.94, 1])})` }}>
        <div style={{ maxWidth: 1400, textAlign: "center", direction: "rtl", fontSize: 58, fontWeight: 900, color: COLORS.text, textShadow: `0 0 32px ${COLORS.primary}44, 0 2px 12px rgba(0,0,0,0.8)` }}>
          השתמשתם ב-AI ל<HL c={COLORS.primary}>שתי מטרות</HL>?
        </div>
      </div>

      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 70, direction: "rtl" }}>
        {PURPOSES.map((p, i) => {
          const pop = sp(frame, fps, p.at, { damping: 13, stiffness: 105, mass: 0.7 });
          const float = Math.sin((frame + i * 40) * 0.05) * 5;
          return (
            <div key={i} style={{ width: 520, padding: "40px 44px", borderRadius: 28, direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, background: `linear-gradient(160deg, ${COLORS.primary}1c, rgba(255,255,255,0.045))`, backdropFilter: "blur(14px)", border: `2px solid ${COLORS.primary}77`, boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 42px ${COLORS.primary}26`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <span style={{ fontSize: 70 }}>{p.icon}</span>
              <span style={{ fontSize: 44, fontWeight: 900, color: COLORS.text }}>{p.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 640, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: banner, transform: `scale(${banner})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "22px 56px", borderRadius: 999, direction: "rtl", background: `${"#22c55e"}1f`, border: `2px solid #22c55e`, boxShadow: `0 0 46px #22c55e44` }}>
          <span style={{ width: 60, height: 60, borderRadius: "50%", background: "#22c55e", color: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900 }}>✓</span>
          <span style={{ fontSize: 50, fontWeight: 900, color: COLORS.text }}>שתיהן <HL c="#22c55e">ראויות לציון</HL></span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
