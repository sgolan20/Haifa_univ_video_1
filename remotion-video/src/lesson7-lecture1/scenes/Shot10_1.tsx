import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 10.1 — "studies show…" is not proof (169.0–189.94s)
 *   0.2s  "אם AI כותב 'מחקרים מראים ש…' — זו לא הוכחה"
 *   3.5s  "צריך לבדוק: אילו מחקרים, האם קיימים, מה טענו, מתאימים?"
 *  14s    "בהקשר אקדמי: מקור אמיתי, וטענה ניתנת לבדיקה"
 */
const CHECKS = [
  { text: "אילו מחקרים?", at: 200 },
  { text: "האם קיימים?", at: 240 },
  { text: "מה באמת טענו?", at: 280 },
  { text: "מתאימים להקשר?", at: 320 },
];

export const Shot10_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const quote = sp(frame, fps, 14);
  const stamp = sp(frame, fps, 105, { damping: 11, stiffness: 120 });
  const academic = sp(frame, fps, 440, { stiffness: 85 });

  return (
    <SceneShell accent={COLORS.warning} variant="flow" bg="shot10_bg.png">
      <TopLabel title="ניסוח מקצועי אינו הוכחה" at={4} accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 224, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 24, direction: "rtl" }}>
        <div style={{ opacity: quote, transform: `scale(${quote})`, padding: "18px 40px", borderRadius: 16, background: "rgba(255,255,255,0.06)", border: `1.5px solid ${COLORS.textMuted}66`, fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>❝ מחקרים מראים ש…</div>
        <div style={{ opacity: stamp, transform: `scale(${stamp}) rotate(-6deg)`, padding: "10px 26px", borderRadius: 12, background: `${COLORS.warning}26`, border: `2.5px solid ${COLORS.warning}`, fontSize: 35, fontWeight: 900, color: "#fca5a5", direction: "rtl" }}>≠ הוכחה</div>
      </div>

      <div style={{ position: "absolute", top: 366, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl", flexWrap: "wrap", maxWidth: 1200, marginInline: "auto" }}>
        {CHECKS.map((c) => (
          <Pill key={c.text} color={COLORS.primary} appear={sp(frame, fps, c.at)} style={{ fontSize: 31 }}>{c.text}</Pill>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: academic, transform: `translateY(${interpolate(academic, [0, 1], [18, 0])}px)` }}>
        <div style={{ padding: "18px 48px", borderRadius: 999, background: `${COLORS.primary}1a`, border: `2px solid ${COLORS.primary}88`, fontSize: 35, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>
          בהקשר אקדמי: <span style={{ color: COLORS.primary }}>מקור אמיתי</span> · <span style={{ color: COLORS.primary }}>טענה ניתנת לבדיקה</span>
        </div>
      </div>
    </SceneShell>
  );
};
