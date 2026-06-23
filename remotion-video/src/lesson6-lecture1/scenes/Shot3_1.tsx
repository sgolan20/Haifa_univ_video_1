import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, GlassCard, Pill, sp } from "./_shared";

/**
 * Shot 3.1 — Worked example: the prompt we sent (49.13–63.8s)
 *   0.2s  "בואו נבחן דוגמה. נניח שביקשנו מ-AI:"
 *   3.6s  "אני סטודנט לתואר ראשון בקורס בחינוך."
 *   6.5s  "סכם את המאמר המצורף במאתיים מילים."
 *   9.4s  "התמקד בשאלת המחקר, בשיטת המחקר ובממצאים המרכזיים."
 */
const PARTS = [
  { text: "תואר ראשון · חינוך", at: 110 },
  { text: "200 מילים", at: 200 },
  { text: "שאלה · שיטה · ממצאים", at: 285 },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = sp(frame, fps, 14);

  return (
    <SceneShell accent={COLORS.primary} variant="flow" bg="shot3_bg.png">
      <TopLabel kicker="דוגמה" title="הפרומפט שביקשנו" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <GlassCard color={COLORS.primary} style={{ width: 1240, padding: "34px 44px", transform: `scale(${card})`, opacity: card }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, direction: "rtl", marginBottom: 18 }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 50, height: 50, borderRadius: "50%", background: `${COLORS.primary}2a`, border: `1.5px solid ${COLORS.primary}`, fontSize: 26 }}>🧑‍🎓</span>
            <span style={{ fontSize: 26, fontWeight: 800, color: COLORS.primary, direction: "rtl" }}>הבקשה שלי ל-AI</span>
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: COLORS.text, direction: "rtl", textAlign: "right", lineHeight: 1.5 }}>
            "אני סטודנט לתואר ראשון בקורס בחינוך. סכם את המאמר המצורף ב-200 מילים. התמקד בשאלת המחקר, בשיטת המחקר ובממצאים המרכזיים."
          </div>
        </GlassCard>
      </div>

      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18, direction: "rtl" }}>
        {PARTS.map((p) => (
          <Pill key={p.text} color={COLORS.accent} appear={sp(frame, fps, p.at)} style={{ fontSize: 25 }}>{p.text}</Pill>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 64, left: 0, right: 0, textAlign: "center", opacity: sp(frame, fps, 300) }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>פרומפט לא רע — יש בו הקשר, מטרה ודגשים</span>
      </div>
    </SceneShell>
  );
};
