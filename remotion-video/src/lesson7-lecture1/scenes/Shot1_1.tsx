import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 1.1 — Intro (0–17.89s) — talking-head overlays the first sentence.
 *   0.0s  "בשיעורים הקודמים דיברנו על פרומפטים ועל איטרציה..."  (talking head)
 *  10.9s  "בסרטון זה נדבר על שלב נוסף, חשוב ביותר:"
 *  14.8s  "לא להסתפק בתשובה שרק נראית טוב."
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aOut = interpolate(frame, [300, 326], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 322, { stiffness: 80 });
  const stamp = sp(frame, fps, 440, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot1_bg.png">
      <TopLabel kicker="שיעור 7 · חשיבה ביקורתית" title="לא להסתפק במה שרק נראה טוב" at={6} accent={COLORS.primary} />

      {/* Phase A — recap (mostly under the talking head) */}
      {frame < 326 && (
        <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl", opacity: aOut }}>
          <Pill color={COLORS.primary} appear={sp(frame, fps, 30)} style={{ fontSize: 28 }}>כתיבת פרומפטים</Pill>
          <Pill color={COLORS.secondary} appear={sp(frame, fps, 70)} style={{ fontSize: 28 }}>שיפור באיטרציה</Pill>
        </div>
      )}

      {/* Phase B — the new step */}
      {frame >= 300 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, opacity: bIn }}>
          <div style={{ fontSize: 47, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>בסרטון זה — שלב נוסף, חשוב ביותר</div>
          <div style={{ transform: `scale(${stamp})`, opacity: stamp, padding: "20px 56px", borderRadius: 18, background: `${COLORS.accent}1f`, border: `2.5px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44`, direction: "rtl" }}>
            <span style={{ fontSize: 54, fontWeight: 900, color: COLORS.text }}>לא להסתפק בתשובה ש<span style={{ color: COLORS.accent }}>רק נראית</span> טובה</span>
          </div>
        </div>
      )}
    </SceneShell>
  );
};
