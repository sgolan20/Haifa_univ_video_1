import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 13.1 — If the answer is "no" — stop and check (238 frames · 7.94s · audioStart 197.32s)
 *
 * Narration (relative):
 *   0.0s  "אם התשובה לאחת השאלות האחרונות היא לא,"
 *   2.9s  "כדאי לעצור ולבדוק לפני ההגשה."
 */
export const Shot13_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const stop = spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 110, mass: 0.7 } });
  const main = spring({ frame: frame - 92, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const glow = 0.5 + 0.4 * Math.sin(frame * 0.16);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="checklist_bg.png" dur={238} maxOpacity={0.4} />
      <Particles accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ transform: `scale(${line})`, opacity: line, fontSize: 38, fontWeight: 600, color: COLORS.text, direction: "rtl", textAlign: "center", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          אם אחת מהתשובות שעניתם היא{" "}
          <span style={{ color: "#fca5a5", fontWeight: 800, padding: "2px 16px", borderRadius: 10, background: `${COLORS.warning}26`, border: `1.5px solid ${COLORS.warning}` }}>"לא"</span>
        </div>

        <div style={{ transform: `scale(${stop})`, opacity: stop, fontSize: 90, filter: `drop-shadow(0 0 ${20 + glow * 24}px ${COLORS.warning})` }}>✋</div>

        <div style={{ transform: `scale(${main})`, opacity: main, fontSize: 58, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: `0 0 ${24 + glow * 20}px ${COLORS.accent}66, 0 2px 14px rgba(0,0,0,0.8)` }}>
          עצרו ובדקו <span style={{ color: COLORS.accent }}>לפני ההגשה</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
