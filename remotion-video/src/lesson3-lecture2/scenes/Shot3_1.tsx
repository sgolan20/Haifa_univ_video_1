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
      <div style={{ position: "absolute", top: 88, left: 0, right: 0, textAlign: "center", opacity: title, transform: `translateY(${interpolate(title, [0, 1], [-16, 0])}px)` }}>
        <span style={{ fontSize: 54, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
          השאלה המרכזית
        </span>
      </div>

      {/* "not only WHAT" vs "but WHAT FOR" */}
      <div style={{ position: "absolute", top: 220, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 64, direction: "rtl" }}>
        {/* what you did — muted */}
        <div style={{ width: 560, opacity: what, transform: `scale(${interpolate(what, [0, 1], [0.92, 1])})`, padding: "42px 46px", borderRadius: 26, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: `1.5px solid ${COLORS.textDim}`, direction: "rtl", textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.textDim, marginBottom: 14 }}>לא רק</div>
          <div style={{ fontSize: 46, fontWeight: 800, color: COLORS.textMuted, lineHeight: 1.26 }}>
            מה עשיתם<br />עם ה-AI?
          </div>
        </div>

        {/* arrow */}
        <div style={{ fontSize: 72, color: COLORS.accent, opacity: whatFor, transform: `translateX(${interpolate(whatFor, [0, 1], [18, 0])}px)` }}>←</div>

        {/* what the task is for — highlighted */}
        <div style={{ width: 640, opacity: whatFor, transform: `scale(${interpolate(whatFor, [0, 1], [0.9, 1.04])})`, padding: "46px 50px", borderRadius: 28, background: `linear-gradient(160deg, ${COLORS.accent}22 0%, rgba(255,255,255,0.05) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 54px ${COLORS.accent}38`, direction: "rtl", textAlign: "center" }}>
          <div style={{ fontSize: 29, fontWeight: 800, color: COLORS.accent, marginBottom: 14 }}>אלא</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.text, lineHeight: 1.22, textShadow: `0 0 26px ${COLORS.accent}55` }}>
            לשם מה המשימה<br />נועדה מלכתחילה?
          </div>
        </div>
      </div>

      {/* "בואו נדגים" */}
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: demo, transform: `scale(${demo})` }}>
        <div style={{ padding: "14px 46px", borderRadius: 999, background: `${COLORS.primary}1f`, border: `1.5px solid ${COLORS.primary}`, fontSize: 36, fontWeight: 800, color: COLORS.text, direction: "rtl", boxShadow: `0 0 30px ${COLORS.primary}33` }}>
          בואו נדגים 👇
        </div>
      </div>
    </AbsoluteFill>
  );
};
