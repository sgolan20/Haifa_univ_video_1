import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, GlassCard, sp } from "./_shared";

/**
 * Shot 2.1 — AI outputs look very good (17.89–33.17s)
 *   0.0s  "תוצרי AI לרוב נראים טוב מאוד"
 *   5.5s  "שפה מסודרת, פתיחה וסיכום, מילים מקצועיות"
 *   9.2s  "תחושה שהתקבלה תשובה רצינית"
 */
const TRAITS = [
  { text: "שפה מסודרת", at: 165 },
  { text: "פתיחה וסיכום", at: 225 },
  { text: "מילים מקצועיות", at: 278 },
];

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = sp(frame, fps, 20);
  const seal = sp(frame, fps, 320, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.primary} variant="flow" bg="shot2_bg.png">
      <TopLabel title="תוצרי AI נראים טוב מאוד" at={4} accent={COLORS.primary} />

      {/* polished-looking answer card (wireframe) */}
      <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <GlassCard color={COLORS.primary} style={{ width: 880, padding: "30px 40px", transform: `scale(${card})`, opacity: card }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, direction: "rtl" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.primary }} />
            <div style={{ height: 16, width: 320, borderRadius: 8, background: `${COLORS.primary}99` }} />
          </div>
          {[680, 760, 700, 620].map((w, i) => (
            <div key={i} style={{ height: 13, width: w, borderRadius: 7, background: "rgba(255,255,255,0.14)", margin: "13px 0", marginRight: "auto" }} />
          ))}
        </GlassCard>
      </div>

      <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl" }}>
        {TRAITS.map((t) => (
          <Pill key={t.text} color={COLORS.primary} appear={sp(frame, fps, t.at)} style={{ fontSize: 30 }}>✓ {t.text}</Pill>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 74, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: seal }}>
        <span style={{ fontSize: 35, fontWeight: 800, color: COLORS.textMuted, direction: "rtl" }}>מרגיש כמו <span style={{ color: COLORS.text }}>תשובה רצינית</span>…</span>
      </div>
    </SceneShell>
  );
};
