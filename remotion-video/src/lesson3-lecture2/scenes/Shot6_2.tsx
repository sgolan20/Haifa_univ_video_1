import React from "react";
import { VerdictLayout, DOMAINS } from "./_shared";

/**
 * Shot 6.2 — Example 3: Statistics — the verdict (512 frames · 17.08s · audioStart 115.2s)
 *
 * Narration (relative):
 *   0.4s  "אם המשימה היא ללמוד לבצע ניתוחים ולהבין את משמעותם,"
 *   4.3s  "הסתמכות על פרשנות מוכנה פוגעת במטרה."
 *   7.6s  "לעומת זאת, שימוש ב-AI כדי לבדוק חישובים,"
 *  11.2s  "להשוות בין שיטות או להבין מושג שלא ברור —"
 *  14.0s  "יכול להיות כלי תומך חשוב."
 */
export const Shot6_2: React.FC = () => (
  <VerdictLayout
    d={DOMAINS.stats}
    dur={512}
    banner={{ kind: "no", text: "כשהמטרה ללמוד לנתח — לא", at: 13 }}
    first={{
      tone: "bad",
      title: "המטרה: לבצע ניתוחים ולהבין את משמעותם",
      lines: [{ text: "הסתמכות על פרשנות מוכנה פוגעת במטרה", at: 129 }],
    }}
    dividerAt={228}
    second={{
      tone: "good",
      title: "ככלי תומך — חשוב",
      lines: [
        { text: "לבדוק חישובים", at: 259 },
        { text: "להשוות בין שיטות", at: 336 },
        { text: "להבין מושג לא ברור", at: 385 },
      ],
    }}
  />
);
