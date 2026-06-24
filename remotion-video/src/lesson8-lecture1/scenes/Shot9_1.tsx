import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 9.1 — Returning your sentences (141.9–172.6s)
 *   0.1s  "אחרי גרסה ערוכה — לא חייבים לקבל אותה כמו שהיא"
 *   8s    "כללי מדי → להחזיר ניסוח מקורי"
 *  14s    "מחק דוגמה → לשלב מחדש"
 *  20s    "ישיר → רשמי מדי → להחזיר משפט חד"
 *  26s    "העריכה לא מסתיימת אצל AI — היא חוזרת אלינו"
 */
const FIXES = [
  { from: "ניסוח כללי מדי", to: "להחזיר את הניסוח המקורי", at: 262 },
  { from: "דוגמה קטנה נמחקה", to: "לשלב אותה מחדש", at: 445 },
  { from: "הפך לרשמי מדי", to: "להחזיר משפט חד יותר", at: 614 },
];

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 16);
  const footer = sp(frame, fps, 800, { damping: 12, stiffness: 105 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot9_bg.png">
      <TopLabel title="העריכה חוזרת אליכם" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 216, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: head }}>
        <span style={{ fontSize: 34, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>אחרי גרסה ערוכה — לא חייבים לקבל אותה כמו שהיא:</span>
      </div>

      <div style={{ position: "absolute", top: 304, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {FIXES.map((f, i) => {
          const a = sp(frame, fps, f.at, { stiffness: 95 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, direction: "rtl", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)`, width: 1080 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "16px 0", borderRadius: 14, background: `${COLORS.warning}14`, border: `1.5px solid ${COLORS.warning}66`, fontSize: 30, fontWeight: 700, color: "#fca5a5" }}>{f.from}</div>
              <span style={{ color: COLORS.primary, fontSize: 34, fontWeight: 900, direction: "ltr", unicodeBidi: "isolate" }}>←</span>
              <div style={{ flex: 1, textAlign: "center", padding: "16px 0", borderRadius: 14, background: `${COLORS.primary}1a`, border: `1.5px solid ${COLORS.primary}88`, fontSize: 30, fontWeight: 700, color: COLORS.text }}>{f.to}</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: footer, transform: `scale(${footer})` }}>
        <div style={{ padding: "16px 48px", borderRadius: 999, background: `${COLORS.accent}1f`, border: `2px solid ${COLORS.accent}`, fontSize: 34, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>
          העריכה לא מסתיימת אצל AI — היא חוזרת אלינו
        </div>
      </div>
    </SceneShell>
  );
};
