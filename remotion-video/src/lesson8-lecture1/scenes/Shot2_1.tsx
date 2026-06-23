import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, AiNode, sp } from "./_shared";

/**
 * Shot 2.1 — What AI editing does (16.3–26.9s)
 *   0.3s  "אפשר להזין פסקה מבולגנת, טיוטה, תגובה, פתיחה למאמר"
 *   4.7s  "ולקבל טקסט נקי, מסודר ומשכנע יותר"
 */
export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inCard = sp(frame, fps, 20);
  const node = sp(frame, fps, 70);
  const outCard = sp(frame, fps, 150, { stiffness: 90 });

  const Card: React.FC<{ a: number; title: string; lines: string[]; c: string; messy?: boolean }> = ({ a, title, lines, c, messy }) => (
    <div style={{ transform: `scale(${a})`, opacity: a, width: 380, padding: "26px 30px", borderRadius: 20, background: `${c}14`, border: `2px solid ${c}77`, boxShadow: `0 0 34px ${c}26`, direction: "rtl" }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: c, marginBottom: 16, textAlign: "center" }}>{title}</div>
      {lines.map((w, i) => (
        <div key={i} style={{ height: 14, width: messy ? [320, 200, 290][i] : [300, 300, 300][i], borderRadius: 7, background: messy ? "rgba(255,255,255,0.16)" : `${c}66`, margin: "12px 0", marginRight: messy && i === 1 ? 60 : "auto", transform: messy ? `rotate(${[0.6, -0.5, 0.4][i]}deg)` : "none" }} />
      ))}
    </div>
  );

  return (
    <SceneShell accent={COLORS.primary} variant="flow" bg="shot2_bg.png">
      <TopLabel title="מטקסט מבולגן — לטקסט נקי" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 30, direction: "rtl" }}>
        <Card a={inCard} title="טיוטה מבולגנת" lines={["", "", ""]} c={COLORS.textMuted} messy />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <AiNode scale={node * 0.62} label="AI" color={COLORS.secondary} />
          <span style={{ color: COLORS.secondary, fontSize: 40, opacity: node, direction: "ltr", unicodeBidi: "isolate" }}>←</span>
        </div>
        <Card a={outCard} title="נקי · מסודר · משכנע" lines={["", "", ""]} c={COLORS.primary} />
      </div>
    </SceneShell>
  );
};
