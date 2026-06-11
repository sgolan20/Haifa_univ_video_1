import React from "react";
import { CaseLayout, DOMAINS } from "./_shared";

/**
 * Shot 5.1 — Example 2: Computer Science — the case (334 frames · 11.12s · audioStart 73.7s)
 *
 * Narration (relative):
 *   0.0s  "דוגמה שנייה: קורס במדעי המחשב."
 *   3.0s  "סטודנט השתמש ב-AI כדי לכתוב פונקציה,"
 *   6.2s  "שילב אותה בקוד שלו"
 *   7.8s  "והבין כיצד היא פועלת."
 *   9.7s  "האם זה לגיטימי?"
 */
export const Shot5_1: React.FC = () => (
  <CaseLayout
    d={DOMAINS.cs}
    dur={334}
    steps={[
      { text: "השתמש ב-AI כדי לכתוב פונקציה", icon: "🤖", at: 96 },
      { text: "שילב אותה בקוד שלו", icon: "💻", at: 190 },
      { text: "הבין כיצד היא פועלת", icon: "💡", at: 239 },
    ]}
    questionAt={295}
  />
);
