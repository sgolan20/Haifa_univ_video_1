import React from "react";
import { COLORS } from "../../design/theme";
import { DirectionScene } from "./_shared";

/** Shot 5.1 — Rewrite type 1: Polish (54.2–74.5s) */
export const Shot5_1: React.FC = () => (
  <DirectionScene
    index={1}
    title="ליטוש"
    accent={COLORS.primary}
    icon={<span style={{ fontSize: 56 }}>✨</span>}
    bg="shot5_bg.png"
    when="תיקון שגיאות, שיפור משפטים מסורבלים וקיצור חזרות — הרעיון והסגנון נשארים שלכם"
    whenAt={84}
    quotes={[
      { text: '"תקן שגיאות ניסוח וכתיב, אבל שמור על סדר הרעיונות ועל הסגנון המקורי."', at: 400 },
    ]}
  />
);
