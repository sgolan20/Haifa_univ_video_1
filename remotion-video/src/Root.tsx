import { Composition } from "remotion";
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
import { FullVideo } from "./FullVideo";
import { SHOT_TIMING, TOTAL_DURATION_FRAMES } from "./timing";

const FPS = 30;

export const Root: React.FC = () => {
  return (
    <>
      {/* ========== FULL VIDEO — all shots with narration ========== */}
      <Composition
        id="full-video"
        component={FullVideo}
        durationInFrames={TOTAL_DURATION_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* ========== Individual shots (for preview/render) ========== */}
      <Composition
        id="shot1-1"
        component={Shot1_1}
        durationInFrames={SHOT_TIMING["shot1-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot1-3"
        component={Shot1_3}
        durationInFrames={SHOT_TIMING["shot1-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot2-1"
        component={Shot2_1}
        durationInFrames={SHOT_TIMING["shot2-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot2-2"
        component={Shot2_2}
        durationInFrames={SHOT_TIMING["shot2-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot2-3"
        component={Shot2_3}
        durationInFrames={SHOT_TIMING["shot2-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot3-1"
        component={Shot3_1}
        durationInFrames={SHOT_TIMING["shot3-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot3-2"
        component={Shot3_2}
        durationInFrames={SHOT_TIMING["shot3-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot3-3"
        component={Shot3_3}
        durationInFrames={SHOT_TIMING["shot3-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot3-4"
        component={Shot3_4}
        durationInFrames={SHOT_TIMING["shot3-4"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot4-1"
        component={Shot4_1}
        durationInFrames={SHOT_TIMING["shot4-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot4-2"
        component={Shot4_2}
        durationInFrames={SHOT_TIMING["shot4-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot4-3"
        component={Shot4_3}
        durationInFrames={SHOT_TIMING["shot4-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot5-1"
        component={Shot5_1}
        durationInFrames={SHOT_TIMING["shot5-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot5-2"
        component={Shot5_2}
        durationInFrames={SHOT_TIMING["shot5-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot5-3"
        component={Shot5_3}
        durationInFrames={SHOT_TIMING["shot5-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot6-1"
        component={Shot6_1}
        durationInFrames={SHOT_TIMING["shot6-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot6-2"
        component={Shot6_2}
        durationInFrames={SHOT_TIMING["shot6-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-1"
        component={Shot7_1}
        durationInFrames={SHOT_TIMING["shot7-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-2"
        component={Shot7_2}
        durationInFrames={SHOT_TIMING["shot7-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-3"
        component={Shot7_3}
        durationInFrames={SHOT_TIMING["shot7-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-4"
        component={Shot7_4}
        durationInFrames={SHOT_TIMING["shot7-4"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-5"
        component={Shot7_5}
        durationInFrames={SHOT_TIMING["shot7-5"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-6"
        component={Shot7_6}
        durationInFrames={SHOT_TIMING["shot7-6"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot7-7"
        component={Shot7_7}
        durationInFrames={SHOT_TIMING["shot7-7"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot8-1"
        component={Shot8_1}
        durationInFrames={SHOT_TIMING["shot8-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot8-2"
        component={Shot8_2}
        durationInFrames={SHOT_TIMING["shot8-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot8-3"
        component={Shot8_3}
        durationInFrames={SHOT_TIMING["shot8-3"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot8-4"
        component={Shot8_4}
        durationInFrames={SHOT_TIMING["shot8-4"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot9-1"
        component={Shot9_1}
        durationInFrames={SHOT_TIMING["shot9-1"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot9-2"
        component={Shot9_2}
        durationInFrames={SHOT_TIMING["shot9-2"].durationInFrames}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
