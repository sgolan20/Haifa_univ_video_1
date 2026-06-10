import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { SHOT_TIMING, SHOT_ORDER, TITLE_CARD_FRAMES } from "./timing";
import { Logo } from "../design/Logo";
import { TitleCard } from "../design/TitleCard";

import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot3_1 } from "./scenes/Shot3_1";
import { Shot4_1 } from "./scenes/Shot4_1";
import { Shot5_1 } from "./scenes/Shot5_1";
import { Shot5_2 } from "./scenes/Shot5_2";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
  "shot2-1": Shot2_1,
  "shot3-1": Shot3_1,
  "shot4-1": Shot4_1,
  "shot5-1": Shot5_1,
  "shot5-2": Shot5_2,
};

/**
 * FullVideo2B — Master composition for Video 2B
 * "למה מודלי שפה טועים לפעמים?"
 */
export const FullVideo2B: React.FC = () => {
  let cumulativeFrame = 0;

  return (
    <AbsoluteFill>
      {/* Full narration audio — starts after the title card */}
      <Sequence from={TITLE_CARD_FRAMES}>
        <Audio src={staticFile("video2b/audio/full_narration.mp3")} volume={1} />
      </Sequence>

      {/* Opening title card — first 6 seconds (plays its own music) */}
      <Sequence from={0} durationInFrames={TITLE_CARD_FRAMES} name="title-card">
        <TitleCard title="למה מודלי שפה טועים לפעמים?" />
      </Sequence>

      {/* Sequence all shots — offset by title card */}
      {SHOT_ORDER.map((shotId) => {
        const timing = SHOT_TIMING[shotId];
        const Component = SHOT_COMPONENTS[shotId];
        const startFrame = TITLE_CARD_FRAMES + cumulativeFrame;
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

      {/* Logo persistent across all shots (not during the title card) — rendered on top */}
      <Sequence from={TITLE_CARD_FRAMES}>
        <Logo />
      </Sequence>
    </AbsoluteFill>
  );
};
