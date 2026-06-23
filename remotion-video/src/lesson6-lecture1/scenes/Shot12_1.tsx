import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 12.1 — The human judgment (279.67–301.12s)
 *   0.3s  "תיעוד כזה עוזר להבין מה באמת שיפר את התוצר"
 *   4.0s  "העבודה לא הייתה רק 'ה-AI כתב'"
 *   8.0s  "האדם קרא, בדק, זיהה בעיות, החליט, וניסח"
 *  15.0s  "השימוש בכלי אינו מחליף שיפוט — הוא דורש שיפוט"
 */
const ACTIONS = [
  { text: "קרא", at: 240 },
  { text: "בדק", at: 268 },
  { text: "זיהה בעיות", at: 292 },
  { text: "החליט מה חשוב", at: 318 },
  { text: "ניסח הנחיות", at: 345 },
];

export const Shot12_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const top = sp(frame, fps, 120);
  const banner = sp(frame, fps, 451, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.secondary} variant="flow" bg="shot12_bg.png">
      <TopLabel title="מי באמת עשה את העבודה?" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 240, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: top, transform: `translateY(${interpolate(top, [0, 1], [16, 0])}px)` }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>
          העבודה לא הייתה רק <span style={{ color: COLORS.textMuted }}>״ה-AI כתב״</span>
        </div>
      </div>

      {/* human action chain */}
      <div style={{ position: "absolute", top: 350, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, direction: "rtl", flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 76, height: 76, borderRadius: "50%", background: `${COLORS.secondary}26`, border: `2px solid ${COLORS.secondary}`, fontSize: 38, opacity: sp(frame, fps, 215) }}>👤</span>
        {ACTIONS.map((a) => (
          <Pill key={a.text} color={COLORS.secondary} appear={sp(frame, fps, a.at)} style={{ fontSize: 26 }}>{a.text}</Pill>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: banner, transform: `scale(${banner})` }}>
        <div style={{ padding: "20px 56px", borderRadius: 20, background: `${COLORS.accent}1f`, border: `2.5px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44`, fontSize: 40, fontWeight: 900, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1300, lineHeight: 1.3 }}>
          הכלי לא מחליף שיפוט — <span style={{ color: COLORS.accent }}>הוא דורש שיפוט</span>
        </div>
      </div>
    </SceneShell>
  );
};
