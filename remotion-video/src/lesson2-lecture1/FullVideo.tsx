import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SHOT_TIMING, SHOT_ORDER } from "./timing";
import { Logo } from "../design/Logo";

import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot3_1 } from "./scenes/Shot3_1";
import { Shot4_1 } from "./scenes/Shot4_1";
import { Shot5_1 } from "./scenes/Shot5_1";
import { Shot6_1 } from "./scenes/Shot6_1";
import { Shot7_1 } from "./scenes/Shot7_1";
import { Shot8_1 } from "./scenes/Shot8_1";
import { Shot9_1 } from "./scenes/Shot9_1";
import { Shot10_1 } from "./scenes/Shot10_1";
import { Shot11_1 } from "./scenes/Shot11_1";
import { Shot12_1 } from "./scenes/Shot12_1";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
  "shot2-1": Shot2_1,
  "shot3-1": Shot3_1,
  "shot4-1": Shot4_1,
  "shot5-1": Shot5_1,
  "shot6-1": Shot6_1,
  "shot7-1": Shot7_1,
  "shot8-1": Shot8_1,
  "shot9-1": Shot9_1,
  "shot10-1": Shot10_1,
  "shot11-1": Shot11_1,
  "shot12-1": Shot12_1,
};

/**
 * FullVideo — Master composition for Lesson 2 / Lecture 1
 * "AI לעומת מנועי חיפוש (חלק א')"
 *
 * Currently a single placeholder shot spans the full narration so the
 * audio + total length can be reviewed on the timeline. Scenes will be
 * added per docs/תסריט remotion lesson2-lecture1.md.
 */
export const FullVideo: React.FC = () => {
  let cumulativeFrame = 0;

  return (
    <AbsoluteFill>
      {/* Full narration audio */}
      <Audio src={staticFile("lesson2-lecture1/audio/full_narration.mp3")} volume={1} />

      {/* Sequence all shots */}
      {SHOT_ORDER.map((shotId) => {
        const timing = SHOT_TIMING[shotId];
        const Component = SHOT_COMPONENTS[shotId];
        const startFrame = cumulativeFrame;
        cumulativeFrame += timing.durationInFrames;

        return (
          <Sequence
            key={shotId}
            from={startFrame}
            durationInFrames={timing.durationInFrames}
            name={shotId}
          >
            <Component />
          </Sequence>
        );
      })}

      {/* Logo persistent across all shots — rendered on top */}
      <Logo />
    </AbsoluteFill>
  );
};
