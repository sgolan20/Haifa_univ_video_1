import React from "react";
import { VerdictLayout, DOMAINS } from "./_shared";

/**
 * Shot 5.2 — Example 2: CS — the verdict (602 frames · 20.06s · audioStart 84.82s)
 *
 * Narration (relative):
 *   0.0s  "התשובה תלויה בהנחיות הקורס."
 *   2.3s  "אם המטרה היא ללמוד לתכנת,"
 *   4.3s  "כתיבת קוד שלם באמצעות AI עלולה לפגוע בלמידה."
 *   [0.5s pause inserted here]
 *   8.2s  "עם זאת, שימוש ב-AI ככלי לעזרה נקודתית,"
 *  11.8s  "להסבר שגיאות או לשיפור קוד קיים, עשוי להיות לגיטימי,"
 *  15.8s  "במיוחד אם הסטודנט מבין ומסוגל להסביר את הפתרון."
 */
export const Shot5_2: React.FC = () => (
  <VerdictLayout
    d={DOMAINS.cs}
    dur={602}
    banner={{ kind: "depends", text: "תלוי בהנחיות הקורס", at: 8 }}
    first={{
      tone: "bad",
      title: "אם המטרה — ללמוד לתכנת",
      lines: [{ text: "כתיבת קוד שלם באמצעות AI עלולה לפגוע בלמידה", at: 129 }],
    }}
    dividerAt={247}
    dividerLabel="עם זאת"
    second={{
      tone: "good",
      title: "עזרה נקודתית — עשוי להיות לגיטימי",
      lines: [
        { text: "הסבר שגיאות · שיפור קוד קיים", at: 305 },
        { text: "בתנאי שאתם מבינים ויכולים להסביר את הפתרון", at: 474 },
      ],
    }}
  />
);
