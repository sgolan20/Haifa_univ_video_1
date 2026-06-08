import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
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
import { Shot13_1 } from "./scenes/Shot13_1";
import { Shot14_1 } from "./scenes/Shot14_1";
import { Shot15_1 } from "./scenes/Shot15_1";
import { Shot16_1 } from "./scenes/Shot16_1";
import { Shot17_1 } from "./scenes/Shot17_1";

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
  "shot14-1": Shot14_1,
  "shot15-1": Shot15_1,
  "shot16-1": Shot16_1,
  "shot17-1": Shot17_1,
};

// Frame where the closing logo shot starts — corner logo fades out before it
const LAST_SHOT_START = SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

// Intro talking-head clip overlays the opening of shot1-1.
// It runs from the very start until the narrator finishes "…לבין יצירת מידע"
// (ends 6.470s) and cuts back to the original shot exactly as she begins the
// new sentence "השאלה המעשית הבאה…" (starts 6.900s → frame 207). The video's
// own (narration) audio is muted — the synced full_narration.mp3 is the source.
const INTRO_END_FRAME = 207; // 6.9s @ 30fps

const IntroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  // Short fade-out over the last 9 frames so it dissolves cleanly into shot1-1
  const opacity = interpolate(frame, [INTRO_END_FRAME - 9, INTRO_END_FRAME], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <OffthreadVideo
        src={staticFile("lesson2-lecture2/video/intro_talking_head.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

/**
 * FullVideo — Master composition for Lesson 2 / Lecture 2
 * "AI לעומת מנועי חיפוש (חלק ב') — האם זה מקור אמיתי?"
 */
export const FullVideo: React.FC = () => {
  const frame = useCurrentFrame();
  let cumulativeFrame = 0;

  // Corner logo fades out 30 frames before the closing logo shot
  const logoOpacity = interpolate(frame, [LAST_SHOT_START - 30, LAST_SHOT_START], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Full narration audio */}
      <Audio src={staticFile("lesson2-lecture2/audio/full_narration.mp3")} volume={1} />

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

      {/* Intro talking-head clip overlaying the opening (frames 0–207) */}
      <Sequence from={0} durationInFrames={INTRO_END_FRAME} name="intro-talking-head">
        <IntroOverlay />
      </Sequence>

      {/* Corner logo persistent across all shots — fades out before the closing logo shot */}
      {logoOpacity > 0 && <Logo opacity={0.5 * logoOpacity} />}
    </AbsoluteFill>
  );
};
