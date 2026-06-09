import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 8.1 — The guiding rule (205 frames · 6.84s · audioStart 119.78s)
 *
 * Narration (relative):
 *   0.0s  "הכלל המרכזי,"
 *   1.0s  "אם הרעיון לא נוצר על ידיכם,"
 *   3.3s  "יש לציין זאת,"
 *   4.6s  "גם אם הניסוח כן."
 */
export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const header = spring({ frame, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const card = spring({ frame: frame - 28, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const cite = spring({ frame: frame - 98, fps, config: { damping: 13, stiffness: 110, mass: 0.7 } });
  const tail = spring({ frame: frame - 139, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.5 + 0.3 * Math.sin(frame * 0.12);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="integrity_bg.png" dur={205} maxOpacity={0.45} />
      <Particles accent={COLORS.accent} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, transform: `scale(${header})`, opacity: header, fontSize: 38, fontWeight: 800, color: COLORS.accent, direction: "rtl", textShadow: `0 0 24px ${COLORS.accent}66` }}>
          <span style={{ fontSize: 40 }}>🔑</span> הכלל המרכזי
        </div>

        <div
          style={{
            transform: `scale(${card})`,
            opacity: card,
            maxWidth: 1150,
            padding: "44px 60px",
            borderRadius: 28,
            background: `linear-gradient(160deg, ${COLORS.accent}1f 0%, rgba(255,255,255,0.03) 100%)`,
            backdropFilter: "blur(16px)",
            border: `2px solid ${COLORS.accent}`,
            boxShadow: `0 0 ${40 + glow * 40}px ${COLORS.accent}44`,
            textAlign: "center",
            direction: "rtl",
          }}
        >
          <div style={{ fontSize: 50, fontWeight: 800, color: COLORS.text, direction: "rtl", lineHeight: 1.4 }}>
            אם הרעיון לא נוצר על ידיכם —{" "}
            <span style={{ color: COLORS.accent, opacity: cite, display: "inline-block", transform: `scale(${interpolate(cite, [0, 1], [0.6, 1])})` }}>יש לציין זאת</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 36, fontWeight: 600, color: COLORS.textMuted, direction: "rtl", opacity: tail }}>
            גם אם הניסוח כן
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
