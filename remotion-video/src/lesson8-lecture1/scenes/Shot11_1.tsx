import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, PromptQuote, sp } from "./_shared";

/**
 * Shot 11.1 — Build a personal-style prompt (192.4–220.8s)
 *   0.2s  "יש עוד כלי: לבנות פרומפט סגנון אישי"
 *   4.6s  "לבקש מהמודל לנתח טקסטים קודמים ולתאר את הסגנון"
 *  10.6s  prompt: "קרא 3 טקסטים ונסח פרופיל סגנון... אל תשכתב"
 */
const DIMS = [
  { text: "אורך משפטים", at: 120 },
  { text: "רמת רשמיות", at: 150 },
  { text: "סוגי דוגמאות", at: 180 },
  { text: "טון", at: 208 },
];

export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={COLORS.secondary} variant="grid" bg="shot11_bg.png">
      <TopLabel kicker="כלי נוסף" title="פרומפט סגנון אישי" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl", flexWrap: "wrap", maxWidth: 1100, marginInline: "auto" }}>
        {DIMS.map((d) => (
          <Pill key={d.text} color={COLORS.secondary} appear={sp(frame, fps, d.at)} style={{ fontSize: 30 }}>{d.text}</Pill>
        ))}
      </div>

      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <PromptQuote
          color={COLORS.secondary}
          appear={sp(frame, fps, 320)}
          width={1320}
          text={'"קרא את שלושת הטקסטים המצורפים ונסח פרופיל קצר של סגנון הכתיבה שלי: אורך משפטים, רמת רשמיות, סוגי דוגמאות וטון. אל תשכתב את הטקסטים."'}
        />
      </div>
    </SceneShell>
  );
};
