import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 11.1 — CHECK (the threshold for academic use)
 * Duration: 244 frames (8.14s) · audioStart 158.5s · bg factcheck_bg
 * "רק לאחר ארבעת השלבים הללו הטענה עוברת סף מינימלי שמאפשר שימוש בה בכתיבה אקדמית."
 */
const DUR = 244;
const A = COLORS.accent;

export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letters = ["F", "A", "C", "T"];
  const check = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 95, mass: 0.8 } });
  const head = spring({ frame: frame - 60, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.35 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
      <Particles />

      {/* four completed steps */}
      <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18, direction: "ltr" }}>
        {letters.map((l, i) => {
          const s = spring({ frame: frame - i * 14, fps, config: { damping: 14, stiffness: 110, mass: 0.7 } });
          return (
            <div key={l} style={{ transform: `scale(${s})`, opacity: s, width: 92, height: 92, borderRadius: 18, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: COLORS.primary, background: `${COLORS.primary}1a`, border: `2px solid ${COLORS.primary}88` }}>
              <span style={{ fontSize: 40, fontWeight: 800 }}>{l}</span>
              <span style={{ fontSize: 22, marginTop: -4 }}>✓</span>
            </div>
          );
        })}
      </div>

      {/* CHECK */}
      <div style={{ position: "absolute", top: 380, left: 0, right: 0, textAlign: "center", transform: `scale(${check})`, opacity: check }}>
        <span style={{ fontSize: 80, fontWeight: 800, color: A, direction: "ltr", textShadow: `0 0 ${44 + glow * 36}px ${A}88` }}>CHECK ✓</span>
      </div>

      {/* message */}
      <div style={{ position: "absolute", top: 540, left: 0, right: 0, textAlign: "center", opacity: head, transform: `translateY(${(1 - head) * 18}px)` }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.text, direction: "rtl", maxWidth: 1200, margin: "0 auto", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          רק לאחר ארבעת השלבים — הטענה עוברת <span style={{ color: A }}>סף מינימלי</span> לכתיבה אקדמית
        </div>
      </div>
    </AbsoluteFill>
  );
};
