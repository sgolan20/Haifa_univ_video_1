import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 1.1 — Opening + the practical question
 * Duration: 624 frames (20.79s) · audioStart 0s · bg opening_bg
 *
 * f0:    title rises — "AI לעומת מנועי חיפוש" / "חלק ב' — האם זה מקור אמיתי?"
 * f28:   recap pill (part A: retrieval vs generation)
 * f207:  the question — "כיצד מקבלים החלטה נכונה בזמן אמת?"
 * f470:  "מה הכלי הנכון לאותו רגע?" over the two glowing screens
 */
const DUR = 624;

export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);
  const underline = interpolate(frame, [25, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // recap pill
  const recap = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  // title rises at ~f185
  const rise = spring({ frame: frame - 185, fps, config: { damping: 20, stiffness: 60, mass: 1 } });
  const titleY = rise * -400;
  const titleShrink = 1 - rise * 0.44;
  const recapFade = interpolate(frame, [185, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // the question (f207)
  const q = spring({ frame: frame - 207, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const q2 = spring({ frame: frame - 300, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const qFade = interpolate(frame, [445, 470], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // final "which tool" (f470)
  const fin = spring({ frame: frame - 470, fps, config: { damping: 15, stiffness: 95, mass: 0.8 } });
  const finPulse = 1 + 0.04 * Math.sin(frame * 0.18);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="opening_bg.png" dur={DUR} maxOpacity={0.78} />
      <Particles />

      {/* title (rises to top) */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `translateY(${titleY}px) scale(${titleShrink})` }}>
        <div style={{ fontSize: 82, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", transform: `scale(${titleScale})`, textShadow: `0 0 ${44 + glow * 34}px ${COLORS.primary}${Math.round(glow * 130).toString(16).padStart(2, "0")}, 0 2px 16px rgba(0,0,0,0.8)`, letterSpacing: "-1px" }}>
          AI <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>לעומת</span> מנועי חיפוש
        </div>
        <div style={{ marginTop: 14, height: 4, width: 520 * underline, borderRadius: 4, background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`, boxShadow: `0 0 18px ${COLORS.primary}aa` }} />
        <div style={{ marginTop: 20, fontSize: 36, fontWeight: 600, color: COLORS.accent, direction: "rtl", opacity: subOpacity, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          חלק ב' — האם זה מקור אמיתי?
        </div>
      </div>

      {/* recap pill */}
      {frame > 28 && frame < 215 && (
        <div style={{ position: "absolute", top: 660, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: recap * recapFade }}>
          <div style={{ transform: `scale(${recap})`, padding: "16px 38px", borderRadius: 999, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: `1.5px solid ${COLORS.textMuted}44`, fontSize: 30, fontWeight: 500, color: COLORS.textMuted, direction: "rtl" }}>
            בחלק א' הבנו: <span style={{ color: COLORS.primary, fontWeight: 700 }}>שליפה</span> מול <span style={{ color: COLORS.secondary, fontWeight: 700 }}>יצירה</span>
          </div>
        </div>
      )}

      {/* the real-time question */}
      {frame > 200 && frame < 475 && (
        <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: qFade }}>
          <div style={{ transform: `scale(${q})`, opacity: q, fontSize: 50, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
            כיצד מקבלים החלטה נכונה <span style={{ color: COLORS.primary }}>בזמן אמת</span>?
          </div>
          <div style={{ transform: `scale(${q2})`, opacity: q2, fontSize: 38, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>
            מתי להשתמש — ובמה?
          </div>
        </div>
      )}

      {/* which tool, right now? */}
      {frame > 465 && (
        <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: fin, transform: `scale(${fin * finPulse})` }}>
          <div style={{ padding: "22px 56px", borderRadius: 999, background: `${COLORS.accent}1a`, border: `2px solid ${COLORS.accent}88`, fontSize: 46, fontWeight: 800, color: COLORS.accent, direction: "rtl", textShadow: `0 0 30px ${COLORS.accent}66` }}>
            מה הכלי הנכון לאותו רגע?
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
