import React from "react";
import { CaseLayout, DOMAINS } from "./_shared";

/**
 * Shot 7.1 — Example 4: Academic writing in English — the case (343 frames · 11.42s · audioStart 132.28s)
 *
 * Narration (relative):
 *   0.0s  "דוגמה רביעית: קורס בכתיבה אקדמית באנגלית."
 *   4.1s  "סטודנט כתב טיוטה בעצמו"
 *   6.5s  "והשתמש ב-AI כדי לשפר ניסוח, דקדוק וזרימה."
 *  10.1s  "האם זה לגיטימי?"
 */
export const Shot7_1: React.FC = () => (
  <CaseLayout
    d={DOMAINS.writing}
    dur={343}
    steps={[
      { text: "כתב טיוטה בעצמו", icon: "✍️", at: 117 },
      { text: "השתמש ב-AI לשיפור ניסוח, דקדוק וזרימה", icon: "🤖", at: 168 },
    ]}
    questionAt={301}
  />
);
