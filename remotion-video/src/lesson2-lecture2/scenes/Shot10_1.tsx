import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, FactStepper, LetterStep } from "./_shared";

/**
 * Shot 10.1 — T · Time-Stamp
 * Duration: 429 frames (14.3s) · audioStart 144.2s · bg factcheck_bg
 */
const DUR = 429;

export const Shot10_1: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
    <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
    <Particles />
    <FactStepper active={3} />
    <LetterStep
      letter="T"
      term="Time-Stamp"
      color={COLORS.primary}
      image="shot10_1_time_stamp.png"
      imageSide="left"
      heading="ודאו שהמקור עדכני ורלוונטי"
      points={[
        { t: "נתון שהיה נכון לפני 5 שנים עלול להיות מיושן לחלוטין", d: 144 },
        { t: "במיוחד: טכנולוגיה · כלכלה · מדיניות ציבורית", d: 273 },
      ]}
    />
  </AbsoluteFill>
);
