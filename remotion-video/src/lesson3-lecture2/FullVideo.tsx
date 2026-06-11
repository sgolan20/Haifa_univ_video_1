import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { SHOT_TIMING, SHOT_ORDER, TITLE_CARD_FRAMES } from "./timing";
import { Logo } from "../design/Logo";
import { TitleCard } from "../design/TitleCard";

import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot3_1 } from "./scenes/Shot3_1";
import { Shot4_1 } from "./scenes/Shot4_1";
import { Shot4_2 } from "./scenes/Shot4_2";
import { Shot5_1 } from "./scenes/Shot5_1";
import { Shot5_2 } from "./scenes/Shot5_2";
import { Shot6_1 } from "./scenes/Shot6_1";
import { Shot6_2 } from "./scenes/Shot6_2";
import { Shot7_1 } from "./scenes/Shot7_1";
import { Shot7_2 } from "./scenes/Shot7_2";
import { Shot8_1 } from "./scenes/Shot8_1";
import { Shot9_1 } from "./scenes/Shot9_1";
import { Shot10_1 } from "./scenes/Shot10_1";

const SHOT_COMPONENTS: Record<string, React.FC> = {
  "shot1-1": Shot1_1,
  "shot2-1": Shot2_1,
  "shot3-1": Shot3_1,
  "shot4-1": Shot4_1,
  "shot4-2": Shot4_2,
  "shot5-1": Shot5_1,
  "shot5-2": Shot5_2,
  "shot6-1": Shot6_1,
  "shot6-2": Shot6_2,
  "shot7-1": Shot7_1,
  "shot7-2": Shot7_2,
  "shot8-1": Shot8_1,
  "shot9-1": Shot9_1,
  "shot10-1": Shot10_1,
};

// Frame where the closing logo shot starts — corner logo fades out before it
const LAST_SHOT_START = TITLE_CARD_FRAMES + SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

/**
 * Intro talking-head clip overlays the opening of shot1-1 (after the title card).
 * Lip-synced (VEED Fabric 1.0, 720p) to the first sentence of the narration —
 * "שלום, בהמשך לסרטון הקודם… בכל תחומי הלימוד." (ends 10.5s; cut at 10.8s → 324 frames).
 * The clip's own audio is muted — the synced full_narration.mp3 is the source.
 */
const INTRO_END_FRAME = 324; // 10.8s @ 30fps

const IntroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  // Short fade-out over the last 10 frames so it dissolves cleanly into shot1-1
  const opacity = interpolate(frame, [INTRO_END_FRAME - 10, INTRO_END_FRAME], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <OffthreadVideo
        src={staticFile("lesson3-lecture2/video/intro_talking_head.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
  );
};

/**
 * FullVideo — Master composition for Lesson 3 / Lecture 2
 * "יושרה אקדמית בהקשר תחומי — לא תמיד יש תשובה אחת"
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
      {/* Full narration audio — starts after the title card */}
      <Sequence from={TITLE_CARD_FRAMES}>
        <Audio src={staticFile("lesson3-lecture2/audio/full_narration.mp3")} volume={1} />
      </Sequence>

      {/* Opening title card — first 6 seconds (plays its own music) */}
      <Sequence from={0} durationInFrames={TITLE_CARD_FRAMES} name="title-card">
        <TitleCard title="יושרה אקדמית בהקשר תחומי — לא תמיד יש תשובה אחת" />
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

      {/* Intro talking-head clip overlaying the opening (after the title card) */}
      <Sequence from={TITLE_CARD_FRAMES} durationInFrames={INTRO_END_FRAME} name="intro-talking-head">
        <IntroOverlay />
      </Sequence>

      {/* Corner logo persistent across all shots (not during the title card) — fades out before the closing logo shot */}
      {frame >= TITLE_CARD_FRAMES && logoOpacity > 0 && <Logo opacity={0.5 * logoOpacity} />}
    </AbsoluteFill>
  );
};
