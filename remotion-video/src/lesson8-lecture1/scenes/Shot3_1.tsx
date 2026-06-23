import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 3.1 — The risk: "better" but less yours (26.9–46.9s)
 *   0.1s  "שימוש חזק — אבל יש בו סיכון"
 *   3.1s  "הטקסט טוב יותר — אבל פחות שלנו"
 *   7s    "ברור ומנומס — אך הקול האישי נעלם"
 *  13s    "דוגמאות נמחקות; חד/ישיר/אישי → חלק מדי"
 */
const LOST = [
  { text: "הקול האישי נעלם", at: 230 },
  { text: "דוגמאות קטנות נמחקות", at: 300 },
  { text: "חד וישיר → חלק מדי", at: 370 },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const big = sp(frame, fps, 70, { stiffness: 85 });

  return (
    <SceneShell accent={COLORS.warning} variant="grid" bg="shot3_bg.png">
      <TopLabel kicker="שימוש חזק — אבל יש סיכון" title="" at={4} accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: big, transform: `scale(${big})` }}>
        <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.text, direction: "rtl", textAlign: "center" }}>
          הטקסט <span style={{ color: COLORS.primary }}>"טוב" יותר</span> — אבל <span style={{ color: COLORS.warning }}>פחות שלנו</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 350, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {LOST.map((l, i) => {
          const a = sp(frame, fps, l.at, { stiffness: 95 });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, direction: "rtl", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)`, width: 820, padding: "16px 32px", borderRadius: 14, background: `${COLORS.warning}14`, border: `1.5px solid ${COLORS.warning}66` }}>
              <span style={{ color: COLORS.warning, fontSize: 30 }}>✕</span>
              <span style={{ fontSize: 34, fontWeight: 700, color: COLORS.text }}>{l.text}</span>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
