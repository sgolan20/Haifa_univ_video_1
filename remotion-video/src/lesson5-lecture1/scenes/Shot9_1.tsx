import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { GlassCard, Pill, SceneShell, TopLabel, sp } from "./_shared";

const COMPONENTS = [
  { text: "הקשר", at: 270, color: COLORS.secondary },
  { text: "מטרה", at: 294, color: "#22c55e" },
  { text: "הנחיות", at: 322, color: COLORS.accent },
  { text: "פורמט", at: 354, color: COLORS.primary },
];

const STEPS = [
  { text: "מנסחים", at: 590 },
  { text: "בודקים", at: 650 },
  { text: "משפרים", at: 710 },
  { text: "מדייקים", at: 780 },
];

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const question = sp(frame, fps, 34, { stiffness: 100 });
  const lessGuess = sp(frame, fps, 390);
  const process = sp(frame, fps, 536);
  const next = sp(frame, fps, 835);

  return (
    <SceneShell accent={COLORS.primary} variant="rings">
      <TopLabel title="פרומפט טוב מתחיל בצורך האמיתי" kicker="לסיכום" at={4} />

      <div style={{ position: "absolute", top: 236, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: question, transform: `scale(${interpolate(question, [0, 1], [0.92, 1])})` }}>
        <GlassCard color={COLORS.primary} style={{ padding: "42px 76px", textAlign: "center" }}>
          <div style={{ fontSize: 34, color: COLORS.textMuted, fontWeight: 800, marginBottom: 16 }}>לא רק</div>
          <div style={{ fontSize: 70, fontWeight: 950, lineHeight: 1.1 }}>
            מה לכתוב?
            <span style={{ color: COLORS.accent, margin: "0 28px" }}>←</span>
            מה אני באמת צריך?
          </div>
        </GlassCard>
      </div>

      <div style={{ position: "absolute", top: 510, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 20, direction: "rtl" }}>
        {COMPONENTS.map((item) => (
          <Pill key={item.text} color={item.color} appear={sp(frame, fps, item.at)} style={{ fontSize: 34, padding: "19px 48px" }}>
            {item.text}
          </Pill>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 168, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: lessGuess }}>
        <GlassCard color={COLORS.accent} style={{ padding: "18px 50px", borderRadius: 999 }}>
          <span style={{ fontSize: 39, fontWeight: 900 }}>פחות מקום לניחוש, יותר התאמה לצורך</span>
        </GlassCard>
      </div>

      <div style={{ position: "absolute", bottom: 62, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18, direction: "rtl", opacity: process }}>
        {STEPS.map((step, i) => (
          <React.Fragment key={step.text}>
            <Pill color={i === 3 ? COLORS.primary : COLORS.secondary} appear={sp(frame, fps, step.at)} style={{ fontSize: 28 }}>
              {step.text}
            </Pill>
            {i < STEPS.length - 1 && (
              <span style={{ color: COLORS.primary, fontSize: 34, fontWeight: 900, opacity: sp(frame, fps, step.at + 26), direction: "ltr", unicodeBidi: "isolate" }}>◀</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={{ position: "absolute", top: 166, left: 72, opacity: next, transform: `translateY(${interpolate(next, [0, 1], [-20, 0])}px)` }}>
        <GlassCard color={COLORS.secondary} style={{ padding: "12px 24px", borderRadius: 999 }}>
          <span style={{ fontSize: 24, fontWeight: 850 }}>בסרטון הבא: איטרציה ושיפור הפרומפט</span>
        </GlassCard>
      </div>
    </SceneShell>
  );
};
