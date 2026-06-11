import React from "react";
import { VerdictLayout, DOMAINS } from "./_shared";

/**
 * Shot 4.2 — Example 1: Literature — the verdict (714 frames · 23.8s · audioStart 49.9s)
 *
 * Narration (relative):
 *   0.2s  "ברוב המקרים, לא."
 *   3.3s  "בקורס ספרות, המטרה המרכזית היא פרשנות אישית וקריאה ביקורתית."
 *   7.0s  "גם אם הטקסט עבר שינוי, עצם השימוש בניתוח מוכן פוגע בליבת המשימה."
 *  12.4s  "לעומת זאת,"
 *  13.2s  "שימוש ב-AI כדי לשאול שאלות מנחות … עשוי להיות לגיטימי,"
 *  20.8s  "כל עוד הניתוח עצמו הוא של הסטודנט."
 */
export const Shot4_2: React.FC = () => (
  <VerdictLayout
    d={DOMAINS.lit}
    dur={714}
    banner={{ kind: "no", text: "ברוב המקרים — לא", at: 10 }}
    first={{
      tone: "bad",
      title: "המטרה המרכזית: פרשנות אישית וקריאה ביקורתית",
      lines: [
        { text: "ניתוח מוכן פוגע בליבת המשימה", at: 98 },
        { text: "גם אם הטקסט עבר עריכה ושינוי", at: 228 },
      ],
    }}
    dividerAt={362}
    second={{
      tone: "good",
      title: "שאלות מנחות — עשוי להיות לגיטימי",
      lines: [
        { text: "“אילו כיווני פרשנות אפשריים לדמות?”", at: 388 },
        { text: "כל עוד הניתוח עצמו — שלכם", at: 625 },
      ],
    }}
  />
);
