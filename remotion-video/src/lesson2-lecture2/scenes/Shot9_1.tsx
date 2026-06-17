import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, FactStepper } from "./_shared";

/**
 * Shot 9.1 — C · Cross-Reference
 * Duration: 400 frames (13.34s) · audioStart 130.86s · bg factcheck_bg
 *
 * Narration:
 *   0.0s  "C Cross Reference."
 *   2.2s  "בדקו את הטענה בשני מקורות בלתי תלויים לפחות."
 *   5.8s  "אם שני מקורות שונים, שאינם מצטטים זה את זה,"
 *   8.8s  "מאשרים את אותו נתון,"
 *  10.4s  "הסבירות לדיוק עולה משמעותית."
 *
 * Design: visual two-source diagram instead of bullet list.
 */
const DUR = 400;
const color = COLORS.accent;

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 4,   fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const head  = spring({ frame: frame - 22,  fps, config: { damping: 16, stiffness: 90,  mass: 0.8 } });
  const glow  = 0.4 + 0.3 * Math.sin(frame * 0.06);

  const srcA      = spring({ frame: frame - 174, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const srcB      = spring({ frame: frame - 210, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const connector = spring({ frame: frame - 265, fps, config: { damping: 18, stiffness: 80, mass: 0.9 } });
  const result    = spring({ frame: frame - 312, fps, config: { damping: 17, stiffness: 85, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
      <Particles />
      <FactStepper active={2} />

      {/* Header */}
      <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 26, direction: "ltr" }}>
          <div style={{ transform: `scale(${badge})`, opacity: badge, width: 110, height: 110, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, fontWeight: 800, color, background: `${color}1f`, border: `3px solid ${color}`, boxShadow: `0 0 ${40 + glow * 30}px ${color}66` }}>C</div>
          <div style={{ opacity: badge, fontSize: 42, fontWeight: 800, color, direction: "ltr", textShadow: `0 0 24px ${color}55` }}>Cross-Reference</div>
        </div>
        <div style={{ opacity: head, transform: `translateY(${(1 - head) * 16}px)`, fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          בדקו את הטענה בשני מקורות בלתי־תלויים לפחות
        </div>
      </div>

      {/* Diagram: Source A → ✓ ← Source B */}
      <div style={{ position: "absolute", top: 410, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>

        {/* Source A — slides from left */}
        <div style={{ transform: `translateX(${(1 - srcA) * -140}px)`, opacity: srcA, width: 290, padding: "22px 28px", borderRadius: 18, background: `${color}16`, border: `2px solid ${color}55`, textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>📄</div>
          <div style={{ fontSize: 26, fontWeight: 700, color, marginBottom: 6 }}>מקור א׳</div>
          <div style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.4 }}>מאמר מחקרי<br />אתר ממשלתי</div>
        </div>

        {/* Arrows + central checkmark */}
        <div style={{ opacity: connector, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 28, color: `${color}99` }}>→</div>
          <div style={{
            transform: `scale(${connector})`,
            width: 80, height: 80, borderRadius: "50%",
            background: `${color}28`, border: `3px solid ${color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 38, boxShadow: `0 0 ${32 + glow * 20}px ${color}66`,
          }}>✓</div>
          <div style={{ fontSize: 28, color: `${color}99`, transform: "scaleX(-1)" }}>→</div>
        </div>

        {/* Source B — slides from right */}
        <div style={{ transform: `translateX(${(1 - srcB) * 140}px)`, opacity: srcB, width: 290, padding: "22px 28px", borderRadius: 18, background: `${color}16`, border: `2px solid ${color}55`, textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>📄</div>
          <div style={{ fontSize: 26, fontWeight: 700, color, marginBottom: 6 }}>מקור ב׳</div>
          <div style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.4 }}>מקור עצמאי<br />לא מצטט ממקור א׳</div>
        </div>
      </div>

      {/* Result pill */}
      <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: result, transform: `translateY(${interpolate(result, [0, 1], [22, 0])}px)` }}>
        <div style={{ padding: "18px 52px", borderRadius: 999, background: `${color}22`, border: `2px solid ${color}`, fontSize: 32, fontWeight: 700, color: COLORS.text, direction: "rtl", textShadow: "0 2px 10px rgba(0,0,0,0.6)", boxShadow: `0 0 36px ${color}44` }}>
          הסבירות לדיוק <span style={{ color }}>עולה משמעותית</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
