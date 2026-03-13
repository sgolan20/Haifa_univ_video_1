import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SHOT_TIMING, SHOT_ORDER } from "./timing";

import { Shot1_1 } from "./scenes/Shot1_1";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
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
