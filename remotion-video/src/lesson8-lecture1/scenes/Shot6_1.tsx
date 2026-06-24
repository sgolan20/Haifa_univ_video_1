import React from "react";
import { COLORS } from "../../design/theme";
import { DirectionScene } from "./_shared";

/** Shot 6.1 — Rewrite type 2: Deepen (74.5–98.7s) */
export const Shot6_1: React.FC = () => (
  <DirectionScene
    index={2}
    title="העמקה"
    accent={COLORS.accent}
    icon={<span style={{ fontSize: 56 }}>🔍</span>}
    bg="shot6_bg.png"
    when="הוספת הסבר, דוגמה או נימוק — אבל היזהרו: המודל עלול להוסיף רעיונות שלא התכוונתם להם"
    whenAt={105}
    quotes={[
      { text: '"הצע שתי דרכים להעמיק את הפסקה, אבל אל תכתוב אותה מחדש עדיין."', at: 340 },
      { text: '"הרחב רק על בסיס הרעיונות שכבר מופיעים בטקסט, בלי להוסיף טענות חדשות."', at: 465 },
    ]}
  />
);
