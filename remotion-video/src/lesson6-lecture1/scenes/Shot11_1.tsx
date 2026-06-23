import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 11.1 — Documenting the process (244.78–279.67s)
 *   0.4s  "מרכיב חשוב נוסף הוא תיעוד התהליך"
 *   9.5s  "טבלה פשוטה: פרומפט, תוצר, מה השתנה"
 *  20.2s row1 / 25.6s row2 / 30.7s row3
 */
const COLS = ["פרומפט", "תוצר", "מה השתנה"];
const ROWS = [
  { cells: ["סיכום כללי", "ברור, אבל ארוך מדי", "—"], at: 606 },
  { cells: ["לקצר — רק שאלה וממצאים", "ממוקד יותר", "קוצר ✓"], at: 767 },
  { cells: ["להוסיף הסבר שיטת המחקר", "סיכום שלם", "הועמק ✓"], at: 922 },
];
const COL_W = [430, 380, 300];

export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 286, { stiffness: 90 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot11_bg.png">
      <TopLabel kicker="אוריינות AI" title="תיעוד התהליך" at={6} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 210, left: 0, right: 0, textAlign: "center" }}>
        <span style={{ fontSize: 30, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>שמרו תיעוד קצר של כל סבב — מה ביקשתם, מה קיבלתם, ומה השתנה</span>
      </div>

      <div style={{ position: "absolute", top: 290, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        {/* header */}
        <div style={{ display: "flex", direction: "rtl", gap: 12, opacity: head, transform: `scale(${head})` }}>
          {COLS.map((c, i) => (
            <div key={c} style={{ width: COL_W[i], padding: "16px 0", borderRadius: 12, background: `${COLORS.primary}26`, border: `2px solid ${COLORS.primary}`, textAlign: "center", fontSize: 28, fontWeight: 900, color: COLORS.text }}>{c}</div>
          ))}
        </div>
        {/* rows */}
        {ROWS.map((r, ri) => {
          const a = sp(frame, fps, r.at, { stiffness: 95 });
          return (
            <div key={ri} style={{ display: "flex", direction: "rtl", gap: 12, opacity: a, transform: `translateX(${interpolate(a, [0, 1], [40, 0])}px)` }}>
              {r.cells.map((cell, ci) => (
                <div key={ci} style={{ width: COL_W[ci], minHeight: 74, padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: `1.5px solid ${ci === 2 ? "#22c55e66" : COLORS.primary + "44"}`, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25, fontWeight: 700, color: ci === 2 ? "#86efac" : COLORS.text, lineHeight: 1.25 }}>{cell}</div>
              ))}
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
