import React from "react";
import { CaseLayout, DOMAINS } from "./_shared";

/**
 * Shot 6.1 — Example 3: Statistics — the case (325 frames · 10.82s · audioStart 104.38s)
 *
 * Narration (relative):
 *   0.0s  "דוגמה שלישית: קורס בסטטיסטיקה."
 *   3.5s  "סטודנט הזין נתונים ל-AI"
 *   5.2s  "וביקש ניתוח סטטיסטי מלא,"
 *   7.6s  "כולל פרשנות לתוצאות."
 *   9.5s  "האם זה לגיטימי?"
 */
export const Shot6_1: React.FC = () => (
  <CaseLayout
    d={DOMAINS.stats}
    dur={325}
    steps={[
      { text: "הזין נתונים ל-AI", icon: "📊", at: 106 },
      { text: "ביקש ניתוח סטטיסטי מלא", icon: "🤖", at: 156 },
      { text: "כולל פרשנות לתוצאות", icon: "📝", at: 228 },
    ]}
    questionAt={285}
  />
);
