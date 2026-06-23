import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneShell, TopLabel, GlassCard, Pill, sp } from "./_shared";

/**
 * Shot 1.1 — Intro + recap (0–31.63s)
 *   0.9s  "בשיעור הקודם דיברנו על פרומפטים"
 *   3.5s  "ארבעה רכיבים: הקשר, מטרה, הנחיות ופורמט"
 *  13.2s  "אבל הוא לא מבטיח שהתשובה הראשונה תהיה בדיוק מה שרצינו"
 *  17.7s  "לפעמים כללית מדי / ארוכה מדי / שטחית מדי"
 *  28.7s  "כדאי להתייחס לתשובה הראשונה כטיוטה"
 */
const COMPONENTS = [
  { text: "הקשר", at: 243 },
  { text: "מטרה", at: 270 },
  { text: "הנחיות", at: 295 },
  { text: "פורמט", at: 315 },
];
const PROBLEMS = [
  { text: "כללית מדי", at: 590 },
  { text: "ארוכה מדי", at: 640 },
  { text: "שטחית מדי", at: 690 },
];

export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const aOut = interpolate(frame, [380, 410], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 410, { stiffness: 80 });
  const recap = sp(frame, fps, 70);
  const draftStamp = sp(frame, fps, 855, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot1_bg.png">
      <TopLabel kicker="שיעור 6 · איטרציה" title="מהתשובה הראשונה — לתוצר טוב" at={6} accent={COLORS.primary} />

      {/* Phase A — recap of the 4 prompt components */}
      {frame < 415 && (
        <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: aOut }}>
          <GlassCard color={COLORS.primary} style={{ padding: "34px 54px", transform: `scale(${recap})`, opacity: recap }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.primary, direction: "rtl", textAlign: "center", marginBottom: 24 }}>
              פרומפט ברור = ארבעה רכיבים
            </div>
            <div style={{ display: "flex", gap: 16, direction: "rtl" }}>
              {COMPONENTS.map((c) => (
                <Pill key={c.text} color={COLORS.primary} appear={sp(frame, fps, c.at)}>{c.text}</Pill>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Phase B — the first answer is not always what we wanted */}
      {frame >= 380 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34, opacity: bIn }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1300, lineHeight: 1.3, textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
            אבל התשובה הראשונה <span style={{ color: COLORS.textMuted }}>לא תמיד</span> בדיוק מה שרצינו
          </div>
          <div style={{ display: "flex", gap: 18, direction: "rtl" }}>
            {PROBLEMS.map((p) => (
              <Pill key={p.text} color={COLORS.warning} appear={sp(frame, fps, p.at)} style={{ fontSize: 26 }}>{p.text}</Pill>
            ))}
          </div>
          <div style={{ transform: `scale(${draftStamp})`, opacity: draftStamp, marginTop: 14, padding: "18px 54px", borderRadius: 18, background: `${COLORS.accent}1f`, border: `2.5px solid ${COLORS.accent}`, boxShadow: `0 0 40px ${COLORS.accent}44`, direction: "rtl" }}>
            <span style={{ fontSize: 40, fontWeight: 900, color: COLORS.text }}>נתייחס אליה כ<span style={{ color: COLORS.accent }}>טיוטה</span> 📝</span>
          </div>
        </div>
      )}
    </SceneShell>
  );
};
