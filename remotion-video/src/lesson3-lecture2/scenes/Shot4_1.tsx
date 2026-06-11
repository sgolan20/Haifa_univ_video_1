import React from "react";
import { CaseLayout, DOMAINS } from "./_shared";

/**
 * Shot 4.1 — Example 1: Literature — the case (367 frames · 12.24s · audioStart 37.66s)
 *
 * Narration (relative):
 *   0.0s  "דוגמה ראשונה: קורס בספרות."
 *   2.8s  "סטודנט ביקש מ-AI לנתח דמות מתוך רומן,"
 *   6.2s  "קיבל ניתוח מפורט"
 *   7.9s  "ושילב חלקים ממנו בעבודה לאחר עריכה."
 *  10.9s  "האם זה לגיטימי?"
 */
export const Shot4_1: React.FC = () => (
  <CaseLayout
    d={DOMAINS.lit}
    dur={367}
    steps={[
      { text: "ביקש מ-AI לנתח דמות מתוך רומן", icon: "🤖", at: 83 },
      { text: "קיבל ניתוח מפורט", icon: "📄", at: 185 },
      { text: "שילב חלקים ממנו בעבודה — לאחר עריכה", icon: "✂️", at: 238 },
    ]}
    questionAt={326}
  />
);
