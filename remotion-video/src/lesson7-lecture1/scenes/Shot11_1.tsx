import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 11.1 — Beyond correctness: is there real thought? (189.94–209.4s)
 *   0.0s  "מעבר לנכונות עולה עוד שאלה: האם יש כאן מחשבה?"
 *   5s    "לא בהכרח שגויים — פשוט כלליים מדי"
 *   9s    "סבירים אבל לא מחדשים — מסכמים את האמצע"
 */
const TRAITS = [
  { text: "לא שגוי — פשוט כללי מדי", at: 165 },
  { text: "סביר, אבל לא מחדש", at: 250 },
  { text: "מסכם את האמצע — את המוכר", at: 335 },
];

export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const q = sp(frame, fps, 16, { stiffness: 90 });

  return (
    <SceneShell accent={COLORS.secondary} variant="rings" bg="shot11_bg.png">
      <TopLabel kicker="מעבר לנכונות" title="" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: q, transform: `scale(${q})` }}>
        <div style={{ fontSize: 63, fontWeight: 900, color: COLORS.text, direction: "rtl", textShadow: `0 0 34px ${COLORS.secondary}55` }}>
          האם יש כאן <span style={{ color: COLORS.secondary }}>מחשבה?</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 360, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {TRAITS.map((t, i) => {
          const a = sp(frame, fps, t.at, { stiffness: 95 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, direction: "rtl", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [16, 0])}px)`, width: 860, padding: "14px 30px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: `1.5px solid ${COLORS.secondary}55` }}>
              <span style={{ color: COLORS.secondary, fontSize: 28 }}>◆</span>
              <span style={{ fontSize: 35, fontWeight: 700, color: COLORS.text }}>{t.text}</span>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
