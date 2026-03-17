import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SHOT_TIMING, SHOT_ORDER } from "./timing";

import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot3_1 } from "./scenes/Shot3_1";
import { Shot4_1 } from "./scenes/Shot4_1";
import { Shot5_1 } from "./scenes/Shot5_1";
import { Shot5_2 } from "./scenes/Shot5_2";
import { Shot6_1 } from "./scenes/Shot6_1";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
  "shot2-1": Shot2_1,
  "shot3-1": Shot3_1,
  "shot4-1": Shot4_1,
  "shot5-1": Shot5_1,
  "shot5-2": Shot5_2,
  "shot6-1": Shot6_1,
};

/**
 * FullVideo2A — Master composition for Video 2A
 * "Hallucinations – כשהמודל נשמע משכנע אבל טועה"
 */
export const FullVideo2A: React.FC = () => {
  let cumulativeFrame = 0;

  return (
    <AbsoluteFill>
      {/* Full narration audio */}
      <Audio src={staticFile("video2a/audio/full_narration.mp3")} volume={1} />

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
