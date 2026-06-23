import React from "react";
import { COLORS } from "../../design/theme";
import { DirIcon, DirectionScene } from "./_shared";

/**
 * Shot 7.1 — Direction 1: Accuracy (114.62–143.98s)
 *   0.3s  "הכיוון הראשון הוא דיוק"
 *   2.3s  "נכון באופן כללי, אבל לא מספיק מתאים לצורך"
 *  10.9s  example 1 / 17.4s example 2
 */
export const Shot7_1: React.FC = () => (
  <DirectionScene
    index={1}
    title="דיוק"
    accent={COLORS.primary}
    icon={<DirIcon kind="accuracy" color={COLORS.primary} />}
    when="התשובה נכונה באופן כללי — אבל לא מספיק מתאימה לצורך, לקהל ולרמה שלנו"
    bg="shot7_bg.png"
    whenAt={68}
    quotes={[
      { text: '"התמקד רק בנושא שנלמד בשיעור האחרון, והסבר אותו באמצעות דוגמה אחת."', at: 320 },
      { text: '"התאם את ההסבר לסטודנטים בשנה א׳, בלי מונחים מקצועיים שלא הוסברו."', at: 520 },
    ]}
  />
);
