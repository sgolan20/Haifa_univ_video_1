import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 2.1 — The idea of iteration + its definition (31.63–49.13s)
 *   0.0s  "כאן נכנס הרעיון של איטרציה"
 *   2.3s  "איטרציה היא תהליך שבו אנחנו מקבלים תוצר"
 *   5.5s  "בוחנים אותו, מזהים מה צריך להשתנות"
 *   8.9s  "ואז נותנים הנחיית המשך מדויקת יותר"
 *  12.2s  "לא רק לנסות שוב, אלא לבקש שיפור ממוקד"
 */
const STEPS = [
  { text: "מקבלים תוצר", icon: "📄", at: 70 },
  { text: "בוחנים אותו", icon: "🔍", at: 165 },
  { text: "מזהים מה לשנות", icon: "🎯", at: 200 },
  { text: "הנחיית המשך מדויקת", icon: "✏️", at: 270 },
];

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const closing = sp(frame, fps, 380);

  return (
    <SceneShell accent={COLORS.secondary} variant="rings" bg="shot2_bg.png">
      <TopLabel kicker="הרעיון המרכזי" title="איטרציה" at={2} accent={COLORS.secondary} />

      {/* 4-step loop */}
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 0, direction: "rtl" }}>
        {STEPS.map((s, i) => {
          const a = sp(frame, fps, s.at, { stiffness: 100 });
          return (
            <React.Fragment key={i}>
              <div style={{ transform: `scale(${a})`, opacity: a, width: 230, minHeight: 190, padding: "22px 18px", borderRadius: 20, background: `${COLORS.secondary}16`, border: `2px solid ${COLORS.secondary}77`, boxShadow: `0 0 30px ${COLORS.secondary}26`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, direction: "rtl" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: `1.5px solid ${COLORS.secondary}66`, fontSize: 34 }}>{s.icon}</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: COLORS.text, textAlign: "center", lineHeight: 1.25 }}>{s.text}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span style={{ color: COLORS.secondary, fontSize: 40, opacity: sp(frame, fps, s.at + 18), margin: "0 6px", direction: "ltr", unicodeBidi: "isolate" }}>◀</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* loop-back hint */}
      <div style={{ position: "absolute", top: 506, left: 0, right: 0, textAlign: "center", opacity: sp(frame, fps, 300) }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.secondary, direction: "rtl" }}>וחוזר חלילה — עד שהתוצר מספיק טוב</span>
      </div>

      {/* not "try again" but focused improvement */}
      <div style={{ position: "absolute", bottom: 92, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: closing, transform: `translateY(${interpolate(closing, [0, 1], [18, 0])}px)` }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center" }}>
          לא רק <span style={{ color: COLORS.textMuted, textDecoration: "line-through" }}>"לנסות שוב"</span> — אלא <span style={{ color: COLORS.accent }}>שיפור ממוקד</span>
        </div>
      </div>
    </SceneShell>
  );
};
