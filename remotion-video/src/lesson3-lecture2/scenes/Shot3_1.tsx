import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 3.1 — The key question (246 frames · 8.2s · audioStart 29.46s)
 *
 * Narration (relative):
 *   0.0s  "לכן השאלה המרכזית אינה רק מה עשיתם עם ה-AI,"
 *   4.2s  "אלא לשם מה המשימה נועדה מלכתחילה."
 *   7.2s  "בואו נדגים."
 */
export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const what = spring({ frame: frame - 32, fps, config: { damping: 15, stiffness: 88, mass: 0.85 } });
  const whatFor = spring({ frame: frame - 128, fps, config: { damping: 13, stiffness: 100, mass: 0.75 } });
  const demo = spring({ frame: frame - 216, fps, config: { damping: 12, stiffness: 130, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_goals.png" dur={246} maxOpacity={0.42} />
      <Particles accent={COLORS.accent} />

      {/* title */}
      <div style={{ position: "absolute", top: 105, left: 0, right: 0, textAlign: "center", opacity: title, transform: `translateY(${interpolate(title, [0, 1], [-16, 0])}px)` }}>
        <span style={{ fontSize: 42, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
          השאלה המרכזית
        </span>
      </div>

      {/* "not only WHAT" vs "but WHAT FOR" */}
      <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 56, direction: "rtl" }}>
        {/* what you did — muted */}
        <div style={{ width: 430, opacity: what, transform: `scale(${interpolate(what, [0, 1], [0.92, 1])})`, padding: "30px 34px", borderRadius: 22, background: "rgba(255,255,255,0.045)", backdropFilter: "blur(12px)", border: `1.5px solid ${COLORS.textDim}`, direction: "rtl", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.textDim, marginBottom: 10 }}>לא רק</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.textMuted, lineHeight: 1.3 }}>
            מה עשיתם<br />עם ה-AI?
          </div>
        </div>

        {/* arrow */}
        <div style={{ fontSize: 54, color: COLORS.accent, opacity: whatFor, transform: `translateX(${interpolate(whatFor, [0, 1], [18, 0])}px)` }}>←</div>

        {/* what the task is for — highlighted */}
        <div style={{ width: 470, opacity: whatFor, transform: `scale(${interpolate(whatFor, [0, 1], [0.9, 1.04])})`, padding: "34px 36px", borderRadius: 22, background: `linear-gradient(160deg, ${COLORS.accent}1f 0%, rgba(255,255,255,0.04) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 48px ${COLORS.accent}33`, direction: "rtl", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.accent, marginBottom: 10 }}>אלא</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: COLORS.text, lineHeight: 1.3, textShadow: `0 0 26px ${COLORS.accent}55` }}>
            לשם מה המשימה<br />נועדה מלכתחילה?
          </div>
        </div>
      </div>

      {/* "בואו נדגים" */}
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: demo, transform: `scale(${demo})` }}>
        <div style={{ padding: "12px 38px", borderRadius: 999, background: `${COLORS.primary}1f`, border: `1.5px solid ${COLORS.primary}`, fontSize: 30, fontWeight: 800, color: COLORS.text, direction: "rtl", boxShadow: `0 0 30px ${COLORS.primary}33` }}>
          בואו נדגים 👇
        </div>
      </div>
    </AbsoluteFill>
  );
};
