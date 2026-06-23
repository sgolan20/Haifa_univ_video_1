import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 5.1 — What we did = a good iteration (88.46–103.8s)
 *   0.4s  "שימו לב מה עשינו"
 *   2.0s  "לא כתבנו 'לא טוב, תנסה שוב'"
 *   5.1s  "גם לא ביקשנו סיכום חדש לגמרי"
 *   7.6s  "הצבענו על החלק, הסברנו מה חסר, אמרנו מה להשאיר"
 *  13.8s  "זו איטרציה טובה"
 */
const DONT = [
  { text: '"לא טוב, תנסה שוב"', at: 61 },
  { text: "סיכום חדש לגמרי", at: 152 },
];
const DO = [
  { text: "הצבענו על החלק שדורש שיפור", at: 227 },
  { text: "הסברנו מה חסר", at: 285 },
  { text: "אמרנו מה להשאיר כמו שהוא", at: 320 },
];

const Row: React.FC<{ text: string; appear: number; good: boolean }> = ({ text, appear, good }) => {
  const c = good ? "#22c55e" : COLORS.warning;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, direction: "rtl", opacity: appear, transform: `translateX(${interpolate(appear, [0, 1], [good ? 24 : -24, 0])}px)`, padding: "12px 22px", borderRadius: 14, background: `${c}14`, border: `1.5px solid ${c}66` }}>
      <span style={{ color: c, fontSize: 28, fontWeight: 900 }}>{good ? "✓" : "✕"}</span>
      <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.text }}>{text}</span>
    </div>
  );
};

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const banner = sp(frame, fps, 405, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot5_bg.png">
      <TopLabel title="מה עשינו כאן?" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 50, direction: "rtl", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 560 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.warning, direction: "rtl", textAlign: "center" }}>לא עשינו</div>
          {DONT.map((d) => <Row key={d.text} text={d.text} appear={sp(frame, fps, d.at)} good={false} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 620 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#22c55e", direction: "rtl", textAlign: "center" }}>כן עשינו</div>
          {DO.map((d) => <Row key={d.text} text={d.text} appear={sp(frame, fps, d.at)} good={true} />)}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 96, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: banner, transform: `scale(${banner})` }}>
        <div style={{ padding: "16px 52px", borderRadius: 999, background: "#22c55e1f", border: "2px solid #22c55e", boxShadow: "0 0 40px rgba(34,197,94,0.4)", fontSize: 38, fontWeight: 900, color: COLORS.text, direction: "rtl" }}>
          זו איטרציה טובה ✓
        </div>
      </div>
    </SceneShell>
  );
};
