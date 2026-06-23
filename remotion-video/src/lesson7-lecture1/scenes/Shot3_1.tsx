import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 3.1 — Convincing ≠ good (33.17–47.41s)
 *   0.3s  "טקסט יכול להישמע משכנע ועדיין בעייתי"
 *   4.1s  "ברור — אבל לא מדויק"
 *   6.5s  "מאורגן — אבל שטחי"
 *   8.4s  "מאוזן לכאורה — אבל נקודת מבט חסרה"
 *  11.6s  "רהוט — אבל בלי טיעון חזק"
 */
const PAIRS = [
  { good: "ברור", bad: "לא מדויק", at: 122 },
  { good: "מאורגן", bad: "שטחי", at: 195 },
  { good: "מאוזן לכאורה", bad: "נקודת מבט חסרה", at: 253 },
  { good: "רהוט", bad: "בלי טיעון חזק", at: 348 },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={COLORS.warning} variant="grid" bg="shot3_bg.png">
      <TopLabel title="משכנע — ועדיין בעייתי" at={4} accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 268, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {PAIRS.map((p, i) => {
          const a = sp(frame, fps, p.at, { stiffness: 100 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, direction: "rtl", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)`, width: 980 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "14px 0", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: `1.5px solid ${COLORS.textMuted}55`, fontSize: 35, fontWeight: 800, color: COLORS.text }}>{p.good}</div>
              <span style={{ color: COLORS.warning, fontSize: 35, fontWeight: 900, direction: "ltr", unicodeBidi: "isolate" }}>←</span>
              <div style={{ flex: 1, textAlign: "center", padding: "14px 0", borderRadius: 14, background: `${COLORS.warning}1a`, border: `1.5px solid ${COLORS.warning}88`, fontSize: 35, fontWeight: 800, color: "#fca5a5" }}>אבל {p.bad}</div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
