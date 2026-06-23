import React from "react";
import { COLORS } from "../../design/theme";
import { DirIcon, DirectionScene } from "./_shared";

/**
 * Shot 8.1 — Direction 2: Format (143.98–175.03s)
 *   0.1s  "הכיוון השני הוא פורמט"
 *   2.4s  "התוכן טוב, אבל הצורה לא נוחה"
 *  13.2s example 1 / 20s example 2
 */
export const Shot8_1: React.FC = () => (
  <DirectionScene
    index={2}
    title="פורמט"
    accent={COLORS.secondary}
    icon={<DirIcon kind="format" color={COLORS.secondary} />}
    when="התוכן טוב — אבל הצורה לא נוחה. קיבלנו פסקה במקום רשימה, או טקסט במקום טבלה"
    bg="shot8_bg.png"
    whenAt={72}
    quotes={[
      { text: '"ארגן את התשובה בטבלה עם שלוש עמודות: מושג, הסבר קצר ודוגמה."', at: 395 },
      { text: '"קצר את התשובה לחמש נקודות מרכזיות שמתאימות לשקופית אחת."', at: 600 },
    ]}
  />
);
