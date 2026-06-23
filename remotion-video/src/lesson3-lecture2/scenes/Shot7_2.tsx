import React from "react";
import { VerdictLayout, DOMAINS } from "./_shared";

/**
 * Shot 7.2 — Example 4: Writing — the verdict (455 frames · 15.15s · audioStart 143.7s)
 *
 * Narration (relative):
 *   0.4s  "במקרים רבים, כן."
 *   2.3s  "כאשר הדגש הוא על תוכן וטיעון,"
 *   4.6s  "שיפור לשוני באמצעות כלי עזר עשוי להיות מקובל."
 *   8.3s  "עם זאת, אם המשימה נועדה לפתח את יכולת הכתיבה עצמה,"
 *  12.3s  "שימוש כזה עשוי להיות מוגבל או אסור."
 */
export const Shot7_2: React.FC = () => (
  <VerdictLayout
    d={DOMAINS.writing}
    dur={455}
    banner={{ kind: "yes", text: "במקרים רבים — כן", at: 11 }}
    first={{
      tone: "good",
      title: "כשהדגש על תוכן וטיעון",
      lines: [{ text: "שיפור לשוני באמצעות כלי עזר — מקובל", at: 133 }],
    }}
    dividerAt={246}
    dividerLabel="עם זאת"
    second={{
      tone: "bad",
      title: "אם המטרה — לפתח את יכולת הכתיבה עצמה",
      titleAt: 264, // enters with "אם המשימה נועדה לפתח" (151.80s)
      lines: [{ text: "שימוש כזה עשוי להיות מוגבל או אסור", at: 365 }],
    }}
  />
);
