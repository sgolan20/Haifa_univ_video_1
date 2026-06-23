import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 15.1 — Summary (301.4–324.16s)
 *   0.1s  "AI יכול להיות עורך מצוין: בהירות, סדר, זרימה, ניסוח"
 *   7s    "אבל לא אמור להחליף את הקול של הכותב"
 *  12s    "המטרה אינה טקסט שנשמע כאילו AI כתב היטב"
 *  17s    "אלא שאתם כתבתם — רק ברור, מדויק ומודע יותר לעצמו"
 */
const SKILLS = [
  { text: "בהירות", at: 40 },
  { text: "סדר", at: 65 },
  { text: "זרימה", at: 90 },
  { text: "ניסוח", at: 115 },
];

export const Shot15_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aOut = interpolate(frame, [185, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 210, { stiffness: 84 });
  const bOut = interpolate(frame, [470, 500], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cIn = sp(frame, fps, 500, { stiffness: 84 });

  return (
    <SceneShell accent={COLORS.primary} variant="rings" bg="shot15_bg.png">
      <TopLabel kicker="לסיכום" title="" at={4} accent={COLORS.primary} />

      {frame < 210 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, opacity: aOut }}>
          <div style={{ fontSize: 50, fontWeight: 900, color: COLORS.text, direction: "rtl" }}>AI הוא <span style={{ color: COLORS.primary }}>עורך מצוין</span></div>
          <div style={{ display: "flex", gap: 16, direction: "rtl" }}>
            {SKILLS.map((s) => <Pill key={s.text} color={COLORS.primary} appear={sp(frame, fps, s.at)} style={{ fontSize: 32 }}>{s.text}</Pill>)}
          </div>
        </div>
      )}

      {frame >= 200 && frame < 500 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: bIn * bOut }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1300, lineHeight: 1.3 }}>
            אבל הוא לא אמור להחליף את <span style={{ color: COLORS.accent }}>הקול שלכם</span>
          </div>
        </div>
      )}

      {frame >= 488 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, opacity: cIn }}>
          <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>לא טקסט שנשמע כאילו <span style={{ textDecoration: "line-through" }}>AI כתב אותו היטב</span></div>
          <div style={{ padding: "22px 56px", borderRadius: 20, background: `${COLORS.accent}1f`, border: `2.5px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44`, direction: "rtl", textAlign: "center", maxWidth: 1320 }}>
            <span style={{ fontSize: 44, fontWeight: 900, color: COLORS.text }}>אלא שׁ<span style={{ color: COLORS.accent }}>אתם</span> כתבתם — רק ברור, מדויק ומודע יותר</span>
          </div>
        </div>
      )}
    </SceneShell>
  );
};
