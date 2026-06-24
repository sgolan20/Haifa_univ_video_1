import React from "react";
import { COLORS } from "../../design/theme";
import { DirectionScene } from "./_shared";

/** Shot 7.1 — Rewrite type 3: Restructure (98.7–120.6s) */
export const Shot7_1: React.FC = () => (
  <DirectionScene
    index={3}
    title="ארגון מחדש"
    accent={COLORS.secondary}
    icon={<span style={{ fontSize: 56 }}>🗂️</span>}
    bg="shot7_bg.png"
    when="חלוקה לפסקאות, סדר וכותרות — אבל מבנה אינו רק טכני: הסדר משנה את הדגש ואת הטיעון"
    whenAt={159}
    quotes={[
      { text: '"הצע מבנה חלופי לטקסט, והסבר מה משתנה בו — לפני שאתה משכתב."', at: 440 },
    ]}
  />
);
