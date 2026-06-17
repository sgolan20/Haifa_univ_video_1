import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 10.1 — The problem: treating summarized/generated output as a citable source
 * Duration: 373 frames (12.44s) · audioStart 228.7s
 *
 * f0:    "פלט מסוכם / מיוצר" card + a citation box
 * f120:  source note — doesn't matter if from an LLM or top of search results
 * f240:  the output is dropped into the citation → big red ✗
 *
 * Narration (relative):
 *   0.0s  "הבעיה מתחילה ברגע שמתייחסים לפלט מסוכם או מיוצר –"
 *   4.4s  "בין אם הגיע ממודל שפה ובין אם מופיע בראש תוצאות החיפוש –"
 *   8.3s  "כמקור עובדתי אמין שניתן לצטט ישירות בעבודה."
 */
export const Shot10_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const left = spring({ frame: frame - 55, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } });
  const right = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } });
  const note = spring({ frame: frame - 120, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const cross = spring({ frame: frame - 245, fps, config: { damping: 12, stiffness: 120, mass: 0.7 } });
  const crossPulse = frame > 245 ? 0.7 + 0.3 * Math.sin(frame * 0.15) : 0;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="hallucination_bg.png" dur={373} maxOpacity={0.4} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 58, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
          פלט מסוכם <span style={{ color: COLORS.warning }}>≠</span> מקור לציטוט
        </div>
      </div>

      {/* flow: output card → citation box, with a red cross */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 60, direction: "rtl" }}>
        {/* summarized output */}
        <div style={{ transform: `scale(${right})`, opacity: right, width: 360, padding: "30px 0", borderRadius: 20, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(14px)", border: `1.5px solid ${COLORS.textMuted}55`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 46 }}>📋</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>פלט מסוכם / מיוצר</div>
          <div style={{ fontSize: 22, color: COLORS.textMuted, direction: "rtl" }}>ממודל שפה או מתוצאות חיפוש</div>
        </div>

        {/* center cross */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 80 }}>
          <div style={{ direction: "ltr", unicodeBidi: "isolate", fontSize: 44, color: COLORS.textMuted, opacity: 0.5 }}>◀</div>
          <div style={{ position: "absolute", transform: `scale(${cross})`, opacity: cross, fontSize: 90, fontWeight: 800, color: COLORS.warning, textShadow: `0 0 ${24 + crossPulse * 24}px ${COLORS.warning}` }}>✗</div>
        </div>

        {/* citation box */}
        <div style={{ transform: `scale(${left})`, opacity: left, width: 360, padding: "30px 0", borderRadius: 20, background: `${COLORS.accent}10`, border: `1.5px solid ${COLORS.accent}66`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 46 }}>📚</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.accent, direction: "rtl" }}>ציטוט בעבודה</div>
          <div style={{ fontSize: 22, color: COLORS.textMuted, direction: "rtl" }}>כמקור עובדתי אמין</div>
        </div>
      </div>

      {/* source-agnostic note */}
      {frame > 112 && (
        <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, textAlign: "center", transform: `scale(${note})`, opacity: note }}>
          <span style={{ fontSize: 30, fontWeight: 500, color: COLORS.textMuted, direction: "rtl" }}>
            לא משנה אם הגיע ממודל שפה או מראש תוצאות החיפוש
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
