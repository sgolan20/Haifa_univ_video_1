import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
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

// Calculate the frame where the last shot starts
const LAST_SHOT_START = SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

/**
 * FullVideo2A — Master composition for Video 2A
 * "Hallucinations – כשהמודל נשמע משכנע אבל טועה"
 */
export const FullVideo2A: React.FC = () => {
  const frame = useCurrentFrame();
  let cumulativeFrame = 0;

  // Logo fades out 30 frames before the last shot
  const logoOpacity = interpolate(frame, [LAST_SHOT_START - 30, LAST_SHOT_START], [0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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

      {/* University logo — persistent top-left overlay, fades out before last shot */}
      {logoOpacity > 0 && (
        <Img
          src={staticFile("video2a/images/haifa-logo-white.png")}
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            height: 60,
            opacity: logoOpacity,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
