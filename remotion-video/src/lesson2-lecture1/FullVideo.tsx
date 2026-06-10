import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { SHOT_TIMING, SHOT_ORDER, TITLE_CARD_FRAMES } from "./timing";
import { Logo } from "../design/Logo";
import { TitleCard } from "../design/TitleCard";

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
};

// Frame where the last shot (logo closing) starts — corner logo fades out before it
const LAST_SHOT_START = TITLE_CARD_FRAMES + SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

/**
 * FullVideo — Master composition for Lesson 2 / Lecture 1
 * "AI לעומת מנועי חיפוש (חלק א')"
 *
 * Currently a single placeholder shot spans the full narration so the
 * audio + total length can be reviewed on the timeline. Scenes will be
 * added per docs/תסריט remotion lesson2-lecture1.md.
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
        <Audio src={staticFile("lesson2-lecture1/audio/full_narration.mp3")} volume={1} />
      </Sequence>

      {/* Opening title card — first 6 seconds (plays its own music) */}
      <Sequence from={0} durationInFrames={TITLE_CARD_FRAMES} name="title-card">
        <TitleCard
          parentTitle="AI לעומת מנועי חיפוש"
          title="חלק א' · ההבדל הבסיסי: מה הכלי עושה בפועל?"
        />
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

      {/* Intro overlay video — replaces the first ~8.5s of visuals, narration plays underneath */}
      <Sequence from={TITLE_CARD_FRAMES} durationInFrames={254} name="intro-overlay">
        <OffthreadVideo
          src={staticFile("lesson2-lecture1/video/intro_overlay.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Sequence>

      {/* Corner logo persistent across all shots (not during the title card) — fades out before the closing logo shot */}
      {frame >= TITLE_CARD_FRAMES && logoOpacity > 0 && <Logo opacity={0.5 * logoOpacity} />}
    </AbsoluteFill>
  );
};
