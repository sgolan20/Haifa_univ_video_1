import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { SHOT_TIMING, SHOT_ORDER, TITLE_CARD_FRAMES } from "./timing";
import { Logo } from "../design/Logo";
import { TitleCard } from "../design/TitleCard";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

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
};

// Frame where the closing logo shot starts — corner logo fades out before it
const LAST_SHOT_START = TITLE_CARD_FRAMES + SHOT_ORDER.slice(0, -1).reduce(
  (sum, id) => sum + SHOT_TIMING[id].durationInFrames,
  0
);

/**
 * Intro talking-head clip overlays the opening of shot1-1.
 * It runs from the very start until the narrator finishes the first sentence
 * "…בעידן של בינה מלאכותית." (ends ~5.06s) and cuts to the title card just as
 * "בהרצאה זו נעסוק…" begins (~5.54s → frame 165). The clip's own audio is muted —
 * the synced full_narration.mp3 is the source (lip-sync to it).
 *
 * Set HAS_INTRO_TALKING_HEAD = true once the file is placed at
 * public/lesson3-lecture1/video/intro_talking_head.mp4.
 */
const HAS_INTRO_TALKING_HEAD = true;
const INTRO_END_FRAME = 157; // 5.24s @ 30fps — matches the fabric-1.0 lip-sync clip length

const IntroOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [INTRO_END_FRAME - 12, INTRO_END_FRAME], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (HAS_INTRO_TALKING_HEAD) {
    return (
      <AbsoluteFill style={{ opacity }}>
        <OffthreadVideo
          src={staticFile("lesson3-lecture1/video/intro_talking_head.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    );
  }

  // Placeholder until the talking-head clip is provided — clearly marks the slot.
  return (
    <AbsoluteFill style={{ opacity, background: COLORS.bgPrimary, fontFamily: FONT_FAMILY, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, textAlign: "center" }}>
        <div style={{ width: 180, height: 180, borderRadius: "50%", background: `${COLORS.primary}1a`, border: `2px dashed ${COLORS.primary}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90 }}>🎬</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>סרטון טוקינג‑הד פתיחה</div>
        <div style={{ maxWidth: 900, fontSize: 28, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", lineHeight: 1.5 }}>
          "ברוכים הבאים ליחידה העוסקת ביושרה אקדמית בעידן של בינה מלאכותית"
        </div>
        <div style={{ fontSize: 22, fontWeight: 500, color: COLORS.textDim, direction: "rtl" }}>
          (יוחלף ב‑intro_talking_head.mp4)
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * FullVideo — Master composition for Lesson 3 / Lecture 1
 * "יושרה אקדמית בעידן של AI"
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
        <Audio src={staticFile("lesson3-lecture1/audio/full_narration.mp3")} volume={1} />
      </Sequence>

      {/* Opening title card — first 6 seconds (plays its own music) */}
      <Sequence from={0} durationInFrames={TITLE_CARD_FRAMES} name="title-card">
        <TitleCard title="יושרה אקדמית בעידן של AI" />
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
