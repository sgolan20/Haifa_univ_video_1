import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 1.1 — Intro (0–16.3s) — talking-head overlays the first sentence.
 *  11.5s  "כעת נעבור לשימוש נפוץ: עריכה ושכתוב"
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aOut = interpolate(frame, [305, 332], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 330, { stiffness: 80 });
  const stamp = sp(frame, fps, 360, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot1_bg.png">
      <TopLabel kicker="שיעור 8 · עריכה ושכתוב" title="לערוך עם AI — בלי לאבד את הקול שלכם" at={6} accent={COLORS.primary} />

      {frame < 332 && (
        <div style={{ position: "absolute", bottom: 104, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl", opacity: aOut }}>
          <Pill color={COLORS.primary} appear={sp(frame, fps, 30)} style={{ fontSize: 30 }}>פרומפט</Pill>
          <Pill color={COLORS.secondary} appear={sp(frame, fps, 60)} style={{ fontSize: 30 }}>איטרציות</Pill>
          <Pill color={COLORS.accent} appear={sp(frame, fps, 90)} style={{ fontSize: 30 }}>קריאה ביקורתית</Pill>
        </div>
      )}

      {frame >= 305 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, opacity: bIn }}>
          <div style={{ fontSize: 44, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>שימוש נפוץ במיוחד —</div>
          <div style={{ transform: `scale(${stamp})`, opacity: stamp, padding: "22px 60px", borderRadius: 18, background: `${COLORS.accent}1f`, border: `2.5px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44`, direction: "rtl" }}>
            <span style={{ fontSize: 60, fontWeight: 900, color: COLORS.text }}>עריכה ו<span style={{ color: COLORS.accent }}>שכתוב</span></span>
          </div>
        </div>
      )}
    </SceneShell>
  );
};
