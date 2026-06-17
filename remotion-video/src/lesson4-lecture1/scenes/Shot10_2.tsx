import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, HL } from "./_shared";

/**
 * Shot 10.2 — A good appendix (209 frames · 6.96s · audioStart 160.50s)
 *  0.0  "Appendix טוב הוא תמציתי, ברור,"
 *  2.72 "ומאפשר לקורא להבין את תהליך הכתיבה ללא עומס פרטים."
 */
const TRAITS = [
  { text: "תמציתי", icon: "✦", at: 24 },
  { text: "ברור", icon: "◆", at: 57 },
  { text: "ללא עומס פרטים", icon: "✓", at: 90 },
];
const GREEN = "#22c55e";

export const Shot10_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 6, { stiffness: 85, mass: 0.9 });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_appendix.png" dur={209} maxOpacity={0.45} />
      <Particles accent={GREEN} />

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 50 }}>
        <div style={{ textAlign: "center", direction: "rtl", fontSize: 66, fontWeight: 900, color: COLORS.text, opacity: head, transform: `scale(${interpolate(head, [0, 1], [0.92, 1])})`, textShadow: `0 0 36px ${GREEN}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          <HL c={GREEN}>Appendix</HL> טוב הוא…
        </div>
        <div style={{ display: "flex", gap: 34, direction: "rtl" }}>
          {TRAITS.map((t, i) => {
            const pop = sp(frame, fps, t.at, { damping: 13, stiffness: 110, mass: 0.7 });
            const float = Math.sin((frame + i * 38) * 0.05) * 5;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "26px 48px", borderRadius: 999, direction: "rtl", background: `linear-gradient(160deg, ${GREEN}20, rgba(255,255,255,0.05))`, border: `2.5px solid ${GREEN}`, boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 36px ${GREEN}3a`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
                <span style={{ color: GREEN, fontSize: 34, fontWeight: 900 }}>{t.icon}</span>
                <span style={{ fontSize: 46, fontWeight: 900, color: COLORS.text, whiteSpace: "nowrap" }}>{t.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
