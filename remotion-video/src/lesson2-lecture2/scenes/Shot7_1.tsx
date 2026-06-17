import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, FactStepper, LetterStep } from "./_shared";

/**
 * Shot 7.1 — F · Find the Claim
 * Duration: 358 frames (11.94s) · audioStart 103.26s · bg factcheck_bg
 */
const DUR = 358;

export const Shot7_1: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
    <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
    <Particles />
    <FactStepper active={0} />
    <LetterStep
      letter="F"
      term="Find the Claim"
      color={COLORS.primary}
      image="shot7_1_find_claim.png"
      imageSide="left"
      heading="זהו את הטענה העובדתית המדויקת"
      points={[
        { t: "לא הרעיון הכללי — אלא הנתון הספציפי שניתן לאמת", d: 80 },
        { t: "שם · תאריך · מספר · אירוע", d: 195, sub: true },
      ]}
    />
  </AbsoluteFill>
);
