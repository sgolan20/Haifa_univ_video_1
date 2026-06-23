import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, AiNode, sp } from "./_shared";

/**
 * Shot 5.1 — Bias: the model isn't neutral (59.0–76.7s)
 *   0.1s  "נתחיל מהטיות"
 *   1.6s  "כשמודל AI מייצר טקסט, הוא לא ניטרלי לגמרי"
 *   7.2s  "מתבסס על טקסטים אנושיים"
 *  11.4s  "שנושאים הנחות, דפוסים תרבותיים, נקודות עיוורון"
 */
const CARRY = [
  { text: "הנחות", at: 341 },
  { text: "דפוסים תרבותיים", at: 372 },
  { text: "העדפות", at: 405 },
  { text: "נקודות עיוורון", at: 432 },
];

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const node = sp(frame, fps, 20);
  const line = sp(frame, fps, 210);

  return (
    <SceneShell accent={COLORS.warning} variant="rings" bg="shot5_bg.png">
      <TopLabel kicker="נתחיל מהטיות" title="ה-AI לא ניטרלי" at={4} accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <AiNode scale={node} label="AI" color={COLORS.secondary} />
      </div>

      <div style={{ position: "absolute", top: 470, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: line }}>
        <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>הוא לומד מטקסטים אנושיים — ש<span style={{ color: COLORS.text }}>נושאים איתם</span>:</span>
      </div>

      <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl", flexWrap: "wrap" }}>
        {CARRY.map((c) => (
          <Pill key={c.text} color={COLORS.warning} appear={sp(frame, fps, c.at)} style={{ fontSize: 31 }}>{c.text}</Pill>
        ))}
      </div>
    </SceneShell>
  );
};
