import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Logo } from "../design/Logo";
import { TitleCard } from "../design/TitleCard";
import { SHOT_ORDER, SHOT_TIMING, TITLE_CARD_FRAMES } from "./timing";

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
import { Shot13_1 } from "./scenes/Shot13_1";
import { ClosingLogo } from "./scenes/_shared";

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
  "shot13-1": Shot13_1,
  "shot14-1": ClosingLogo,
};

const LAST_SHOT_START = TITLE_CARD_FRAMES + SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

const TITLE_TO_VIDEO_DISSOLVE_FRAMES = 15;

const TitleCardDissolve: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [TITLE_CARD_FRAMES, TITLE_CARD_FRAMES + TITLE_TO_VIDEO_DISSOLVE_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <TitleCard title="איטרציה ושיפור פרומפטים" withVisualFadeOut={false} />
    </AbsoluteFill>
  );
};

export const FullVideoL6L1: React.FC = () => {
  const frame = useCurrentFrame();
  let cumulativeFrame = 0;
  const logoOpacity = interpolate(frame, [LAST_SHOT_START - 30, LAST_SHOT_START], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Narration only — no background music. */}
      <Sequence from={TITLE_CARD_FRAMES}>
        <Audio src={staticFile("lesson6-lecture1/audio/full_narration.mp3")} volume={1} />
      </Sequence>

      {SHOT_ORDER.map((shotId) => {
        const timing = SHOT_TIMING[shotId];
        const Component = SHOT_COMPONENTS[shotId];
        const startFrame = TITLE_CARD_FRAMES + cumulativeFrame;
        cumulativeFrame += timing.durationInFrames;
        return (
          <Sequence key={shotId} from={startFrame} durationInFrames={timing.durationInFrames} name={shotId}>
            <Component />
          </Sequence>
        );
      })}

      {frame >= TITLE_CARD_FRAMES && logoOpacity > 0 && <Logo opacity={0.5 * logoOpacity} />}

      <Sequence from={0} durationInFrames={TITLE_CARD_FRAMES + TITLE_TO_VIDEO_DISSOLVE_FRAMES} name="title-card-dissolve">
        <TitleCardDissolve />
      </Sequence>
    </AbsoluteFill>
  );
};
