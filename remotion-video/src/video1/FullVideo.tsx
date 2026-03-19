import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { SHOT_TIMING, SHOT_ORDER } from "./timing";

// Import all shot components
import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot1_3 } from "./scenes/Shot1_3";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot2_2 } from "./scenes/Shot2_2";
import { Shot2_3 } from "./scenes/Shot2_3";
import { Shot3_1 } from "./scenes/Shot3_1";
import { Shot3_2 } from "./scenes/Shot3_2";
import { Shot3_3 } from "./scenes/Shot3_3";
import { Shot3_4 } from "./scenes/Shot3_4";
import { Shot4_1 } from "./scenes/Shot4_1";
import { Shot4_2 } from "./scenes/Shot4_2";
import { Shot4_3 } from "./scenes/Shot4_3";
import { Shot5_1 } from "./scenes/Shot5_1";
import { Shot5_2 } from "./scenes/Shot5_2";
import { Shot5_3 } from "./scenes/Shot5_3";
import { Shot6_1 } from "./scenes/Shot6_1";
import { Shot6_2 } from "./scenes/Shot6_2";
import { Shot7_1 } from "./scenes/Shot7_1";
import { Shot7_2 } from "./scenes/Shot7_2";
import { Shot7_3 } from "./scenes/Shot7_3";
import { Shot7_4 } from "./scenes/Shot7_4";
import { Shot7_5 } from "./scenes/Shot7_5";
import { Shot7_6 } from "./scenes/Shot7_6";
import { Shot7_7 } from "./scenes/Shot7_7";
import { Shot8_1 } from "./scenes/Shot8_1";
import { Shot8_2 } from "./scenes/Shot8_2";
import { Shot8_3 } from "./scenes/Shot8_3";
import { Shot8_4 } from "./scenes/Shot8_4";
import { Shot9_1 } from "./scenes/Shot9_1";
import { Shot9_2 } from "./scenes/Shot9_2";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
  "shot1-3": Shot1_3,
  "shot2-1": Shot2_1,
  "shot2-2": Shot2_2,
  "shot2-3": Shot2_3,
  "shot3-1": Shot3_1,
  "shot3-2": Shot3_2,
  "shot3-3": Shot3_3,
  "shot3-4": Shot3_4,
  "shot4-1": Shot4_1,
  "shot4-2": Shot4_2,
  "shot4-3": Shot4_3,
  "shot5-1": Shot5_1,
  "shot5-2": Shot5_2,
  "shot5-3": Shot5_3,
  "shot6-1": Shot6_1,
  "shot6-2": Shot6_2,
  "shot7-1": Shot7_1,
  "shot7-2": Shot7_2,
  "shot7-3": Shot7_3,
  "shot7-4": Shot7_4,
  "shot7-5": Shot7_5,
  "shot7-6": Shot7_6,
  "shot7-7": Shot7_7,
  "shot8-1": Shot8_1,
  "shot8-2": Shot8_2,
  "shot8-3": Shot8_3,
  "shot8-4": Shot8_4,
  "shot9-1": Shot9_1,
  "shot9-2": Shot9_2,
};

/**
 * FullVideo — Master composition that sequences all shots
 * with the full narration audio playing continuously underneath.
 */
// Calculate the frame where the last shot starts
const LAST_SHOT_START = SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

export const FullVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Calculate cumulative frame offsets for each shot
  let cumulativeFrame = 0;

  // Logo fades out 30 frames before the last shot
  const logoOpacity = interpolate(frame, [LAST_SHOT_START - 30, LAST_SHOT_START], [0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Full narration audio — plays continuously */}
      <Audio src={staticFile("video1/audio/full_narration.mp3")} volume={1} />

      {/* Background music — ~20dB below narration */}
      <Audio src={staticFile("video1/audio/background_music.mp3")} volume={0.10} />

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
          src={staticFile("images/haifa-logo-white.png")}
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
