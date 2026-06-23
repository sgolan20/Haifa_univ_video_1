import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, GlassCard, sp } from "./_shared";

/**
 * Shot 8.1 — The problem isn't "wrong" — notice what's NOT written (115.0–131.4s)
 *   0.3s  "הבעיה אינה בהכרח שהטקסט שגוי"
 *   3.0s  "אלא שהוא מציג נקודת מבט מסוימת כאילו היא טבעית ומובנת מאליה"
 *   8.8s  "החשיבה האנושית: לשים לב לא רק למה שנכתב — אלא גם למה שלא נכתב"
 */
export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c1 = sp(frame, fps, 16);
  const c2 = sp(frame, fps, 95);
  const big = sp(frame, fps, 300, { stiffness: 85 });

  return (
    <SceneShell accent={COLORS.secondary} variant="flow" bg="shot8_bg.png">
      <TopLabel title="הבעיה אינה תמיד שהטקסט שגוי" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 232, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <GlassCard color={COLORS.textMuted} style={{ width: 1080, padding: "18px 34px", opacity: c1, transform: `translateY(${interpolate(c1, [0, 1], [16, 0])}px)` }}>
          <span style={{ fontSize: 35, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>✗ לא בהכרח שהטקסט שגוי</span>
        </GlassCard>
        <GlassCard color={COLORS.secondary} style={{ width: 1080, padding: "18px 34px", opacity: c2, transform: `translateY(${interpolate(c2, [0, 1], [16, 0])}px)` }}>
          <span style={{ fontSize: 35, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>אלא — שהוא מציג <span style={{ color: COLORS.secondary }}>נקודת מבט אחת</span> כאילו היא טבעית ומובנת מאליה</span>
        </GlassCard>
      </div>

      <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: big, transform: `scale(${big})` }}>
        <div style={{ maxWidth: 1240, textAlign: "center", direction: "rtl", fontSize: 47, fontWeight: 900, color: COLORS.text, lineHeight: 1.32 }}>
          לשים לב לא רק למה שנכתב — אלא גם <span style={{ color: COLORS.accent }}>למה שלא נכתב</span>
        </div>
      </div>
    </SceneShell>
  );
};
