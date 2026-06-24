import React from "react";
import { Img, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, PromptQuote, Pill, IMG, sp } from "./_shared";

/**
 * Shot 14.1 — Ask AI to document changes (284.3–301.4s)
 *   0.2s  "אפשר לבקש מ-AI לתעד את השינויים"
 *   prompt: "לאחר העריכה, כתוב מה שינית: ניסוח, מבנה, עומק או טון"
 *  "כך קל יותר להשוות גרסאות"
 */
const KINDS = [
  { text: "ניסוח", at: 201 },
  { text: "מבנה", at: 225 },
  { text: "עומק", at: 245 },
  { text: "טון", at: 265 },
];

export const Shot14_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const foot = sp(frame, fps, 295);

  return (
    <SceneShell accent={COLORS.accent} variant="grid" bg="shot14_bg.png">
      <TopLabel kicker="שקיפות" title="בקשו מ-AI לתעד מה שינה" at={4} accent={COLORS.accent} />

      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <PromptQuote
          color={COLORS.accent}
          appear={sp(frame, fps, 100)}
          width={1240}
          text={'"לאחר העריכה, כתוב בקצרה מה שינית: ניסוח, מבנה, עומק או טון."'}
        />
      </div>

      <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl" }}>
        {KINDS.map((k) => (
          <Pill key={k.text} color={COLORS.accent} appear={sp(frame, fps, k.at)} style={{ fontSize: 32 }}>{k.text}</Pill>
        ))}
      </div>

      {(() => {
        const a = sp(frame, fps, 330);
        return (
          <div style={{ position: "absolute", top: 500, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: a * 0.9, transform: `translateY(${interpolate(a, [0, 1], [24, 0])}px)` }}>
            <Img src={IMG("shot14_side.png")} style={{ width: 640, borderRadius: 18 }} />
          </div>
        );
      })()}

      <div style={{ position: "absolute", bottom: 130, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: foot }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>כך קל להשוות גרסאות — ולזהות מתי העריכה הרחיקה מהכוונה</span>
      </div>
    </SceneShell>
  );
};
