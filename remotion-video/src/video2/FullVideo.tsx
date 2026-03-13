import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SHOT_TIMING, SHOT_ORDER } from "./timing";

import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot1_2 } from "./scenes/Shot1_2";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot2_2 } from "./scenes/Shot2_2";
import { Shot2_3 } from "./scenes/Shot2_3";
import { Shot3_1 } from "./scenes/Shot3_1";
import { Shot3_2 } from "./scenes/Shot3_2";
import { Shot3_3 } from "./scenes/Shot3_3";
import { Shot4_1 } from "./scenes/Shot4_1";
import { Shot4_2 } from "./scenes/Shot4_2";
import { Shot5_1 } from "./scenes/Shot5_1";
import { Shot6_1 } from "./scenes/Shot6_1";
import { Shot6_2 } from "./scenes/Shot6_2";
import { Shot7_1 } from "./scenes/Shot7_1";
import { Shot8_1 } from "./scenes/Shot8_1";
import { Shot8_2 } from "./scenes/Shot8_2";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
  "shot1-2": Shot1_2,
  "shot2-1": Shot2_1,
  "shot2-2": Shot2_2,
  "shot2-3": Shot2_3,
  "shot3-1": Shot3_1,
  "shot3-2": Shot3_2,
  "shot3-3": Shot3_3,
  "shot4-1": Shot4_1,
  "shot4-2": Shot4_2,
  "shot5-1": Shot5_1,
  "shot6-1": Shot6_1,
  "shot6-2": Shot6_2,
  "shot7-1": Shot7_1,
  "shot8-1": Shot8_1,
  "shot8-2": Shot8_2,
};

/**
 * FullVideo2 — Master composition for Video 2 (Hallucinations)
 */
export const FullVideo2: React.FC = () => {
  let cumulativeFrame = 0;

  return (
    <AbsoluteFill>
      {/* Full narration audio */}
      <Audio src={staticFile("video2/audio/full_narration.mp3")} volume={1} />

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
    </AbsoluteFill>
  );
};
