import React from "react";
import { VerdictLayout, DOMAINS } from "./_shared";

/**
 * Shot 5.2 — Example 2: CS — the verdict (587 frames · 19.56s · audioStart 84.82s)
 *
 * Narration (relative):
 *   0.0s  "התשובה תלויה בהנחיות הקורס."
 *   2.3s  "אם המטרה היא ללמוד לתכנת,"
 *   4.3s  "כתיבת קוד שלם באמצעות AI עלולה לפגוע בלמידה."
 *   7.7s  "עם זאת, שימוש ב-AI ככלי לעזרה נקודתית,"
 *  11.3s  "להסבר שגיאות או לשיפור קוד קיים, עשוי להיות לגיטימי,"
 *  15.3s  "במיוחד אם הסטודנט מבין ומסוגל להסביר את הפתרון."
 */
export const Shot5_2: React.FC = () => (
  <VerdictLayout
    d={DOMAINS.cs}
    dur={587}
    banner={{ kind: "depends", text: "תלוי בהנחיות הקורס", at: 8 }}
    first={{
      tone: "bad",
      title: "אם המטרה — ללמוד לתכנת",
      lines: [{ text: "כתיבת קוד שלם באמצעות AI עלולה לפגוע בלמידה", at: 129 }],
    }}
    dividerAt={232}
    dividerLabel="עם זאת"
    second={{
      tone: "good",
      title: "עזרה נקודתית — עשוי להיות לגיטימי",
      lines: [
        { text: "הסבר שגיאות · שיפור קוד קיים", at: 290 },
        { text: "בתנאי שאתם מבינים ויכולים להסביר את הפתרון", at: 459 },
      ],
    }}
  />
);
