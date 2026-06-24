import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 10.1 — The marking workflow (172.6–192.4s)
 *   0.2s  "קודם נותנים ל-AI לסדר וללטש"
 *   5.4s  "אחר כך מסמנים 3 מקומות כלליים מדי ומוסיפים משפט אישי"
 *  15.4s  "זה לא לקלקל את העריכה — זה לדייק אותה"
 */
const STEPS = [
  { n: "1", icon: "🤖", text: "נותנים ל-AI לסדר וללטש", at: 30 },
  { n: "2", icon: "✍️", text: "מסמנים 3 מקומות כלליים — ומוסיפים בהם משפט אישי", at: 170 },
];

export const Shot10_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const footer = sp(frame, fps, 550, { damping: 12, stiffness: 105 });

  return (
    <SceneShell accent={COLORS.primary} variant="flow" bg="shot10_bg.png">
      <TopLabel kicker="תהליך עבודה" title="לסמן — ולהחזיר קול" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {STEPS.map((s, i) => {
          const a = sp(frame, fps, s.at, { stiffness: 95 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, direction: "rtl", opacity: a, transform: `translateX(${interpolate(a, [0, 1], [30, 0])}px)`, width: 1060, padding: "20px 34px", borderRadius: 18, background: "rgba(255,255,255,0.05)", border: `2px solid ${COLORS.primary}66` }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "50%", background: COLORS.primary, color: "#04222b", fontSize: 34, fontWeight: 900, flexShrink: 0 }}>{s.n}</span>
              <span style={{ fontSize: 40, flexShrink: 0 }}>{s.icon}</span>
              <span style={{ fontSize: 34, fontWeight: 700, color: COLORS.text }}>{s.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: footer, transform: `scale(${footer})` }}>
        <div style={{ padding: "16px 50px", borderRadius: 999, background: `${COLORS.accent}1f`, border: `2px solid ${COLORS.accent}`, fontSize: 36, fontWeight: 900, color: COLORS.text, direction: "rtl" }}>
          לא לקלקל את העריכה — <span style={{ color: COLORS.accent }}>לדייק</span> אותה
        </div>
      </div>
    </SceneShell>
  );
};
