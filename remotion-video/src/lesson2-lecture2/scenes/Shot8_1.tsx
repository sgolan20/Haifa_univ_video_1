import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, FactStepper, LetterStep } from "./_shared";

/**
 * Shot 8.1 — A · Anchor to Source
 * Duration: 470 frames (15.66s) · audioStart 115.2s · bg factcheck_bg
 */
const DUR = 470;

export const Shot8_1: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
    <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
    <Particles />
    <FactStepper active={1} />
    <LetterStep
      letter="A"
      term="Anchor to Source"
      color={COLORS.secondary}
      heading="חפשו מקור ראשוני שמאשר את הטענה"
      points={[
        { t: "לא אתר שמסכם AI אחר", d: 162 },
        { t: "לא בלוג שמצטט בלי הפניה", d: 234 },
        { t: "מקור ראשוני: מאמר מחקרי · אתר ממשלתי · מסמך רשמי", d: 306 },
      ]}
    />
  </AbsoluteFill>
);
