import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 4.1 — From phrasing to judgment (47.41–59.0s)
 *   0.3s  "עוברים משאלה של ניסוח לשאלה של שיפוט"
 *   5.6s  "איך קוראים באופן ביקורתי תוצר AI"
 *   8.8s  "בלי להתבלבל מהביטחון שבו הוא כתוב?"
 */
export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const left = sp(frame, fps, 20, { stiffness: 95 });
  const arrow = sp(frame, fps, 70);
  const right = sp(frame, fps, 95, { stiffness: 95 });
  const q = sp(frame, fps, 175);

  const Chip: React.FC<{ t: string; sub: string; c: string; a: number }> = ({ t, sub, c, a }) => (
    <div style={{ transform: `scale(${a})`, opacity: a, width: 360, padding: "26px 0", borderRadius: 20, background: `${c}1a`, border: `2.5px solid ${c}`, boxShadow: `0 0 36px ${c}33`, textAlign: "center", direction: "rtl" }}>
      <div style={{ fontSize: 47, fontWeight: 900, color: COLORS.text }}>{t}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: c, marginTop: 6 }}>{sub}</div>
    </div>
  );

  return (
    <SceneShell accent={COLORS.secondary} variant="flow" bg="shot4_bg.png">
      <TopLabel title="מניסוח — לשיפוט" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 282, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 30, direction: "rtl" }}>
        <Chip t="ניסוח" sub="איך לבקש" c={COLORS.textMuted} a={left} />
        <span style={{ color: COLORS.secondary, fontSize: 57, fontWeight: 900, opacity: arrow, direction: "ltr", unicodeBidi: "isolate" }}>←</span>
        <Chip t="שיפוט" sub="איך לקרוא ביקורתית" c={COLORS.secondary} a={right} />
      </div>

      <div style={{ position: "absolute", bottom: 130, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: q, transform: `translateY(${interpolate(q, [0, 1], [18, 0])}px)` }}>
        <div style={{ maxWidth: 1200, textAlign: "center", direction: "rtl", fontSize: 42, fontWeight: 800, color: COLORS.text, lineHeight: 1.35 }}>
          איך קוראים תוצר AI ביקורתית — <span style={{ color: COLORS.accent }}>בלי להתבלבל מהביטחון</span> שבו הוא כתוב?
        </div>
      </div>
    </SceneShell>
  );
};
