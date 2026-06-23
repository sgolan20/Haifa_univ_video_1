import React from "react";
import { COLORS } from "../../design/theme";
import { DirIcon, DirectionScene } from "./_shared";

/**
 * Shot 9.1 — Direction 3: Depth (175.03–203.94s)
 *   0.3s  "הכיוון השלישי הוא עומק"
 *   2.4s  "התשובה ברורה, אבל שטחית"
 *  12.7s example 1 / 21s example 2
 */
export const Shot9_1: React.FC = () => (
  <DirectionScene
    index={3}
    title="עומק"
    accent={COLORS.accent}
    icon={<DirIcon kind="depth" color={COLORS.accent} />}
    when="התשובה ברורה — אבל שטחית. ביקשנו ניתוח וקיבלנו סיכום, או תיאור במקום הסבר"
    bg="shot9_bg.png"
    whenAt={73}
    quotes={[
      { text: '"העמק את הניתוח. הסבר לא רק מה קורה, אלא גם למה זה קורה ומה המשמעות של זה."', at: 381 },
      { text: '"הוסף הסבר של המנגנון שעומד מאחורי התופעה."', at: 629 },
    ]}
    footer="מעבר מתשובה שמתארת — לתשובה שמסבירה"
    footerAt={760}
  />
);
