import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, FactStepper, LetterStep } from "./_shared";

/**
 * Shot 9.1 — C · Cross-Reference
 * Duration: 400 frames (13.34s) · audioStart 130.86s · bg factcheck_bg
 */
const DUR = 400;

export const Shot9_1: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
    <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
    <Particles />
    <FactStepper active={2} />
    <LetterStep
      letter="C"
      term="Cross-Reference"
      color={COLORS.accent}
      image="shot9_1_cross_reference.png"
      imageSide="left"
      heading="בדקו את הטענה בשני מקורות בלתי־תלויים לפחות"
      points={[
        { t: "שני מקורות שונים — שאינם מצטטים זה את זה", d: 174 },
        { t: "אם שניהם מאשרים — הסבירות לדיוק עולה משמעותית", d: 312 },
      ]}
    />
  </AbsoluteFill>
);
