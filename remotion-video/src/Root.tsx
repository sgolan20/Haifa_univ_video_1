import { Composition, Folder } from "remotion";
import { Shot1_1 } from "./video1/scenes/Shot1_1";
import { Shot1_3 } from "./video1/scenes/Shot1_3";
import { Shot2_1 } from "./video1/scenes/Shot2_1";
import { Shot2_2 } from "./video1/scenes/Shot2_2";
import { Shot2_3 } from "./video1/scenes/Shot2_3";
import { Shot3_1 } from "./video1/scenes/Shot3_1";
import { Shot3_2 } from "./video1/scenes/Shot3_2";
import { Shot3_3 } from "./video1/scenes/Shot3_3";
import { Shot3_4 } from "./video1/scenes/Shot3_4";
import { Shot4_1 } from "./video1/scenes/Shot4_1";
import { Shot4_2 } from "./video1/scenes/Shot4_2";
import { Shot4_3 } from "./video1/scenes/Shot4_3";
import { Shot5_1 } from "./video1/scenes/Shot5_1";
import { Shot5_2 } from "./video1/scenes/Shot5_2";
import { Shot5_3 } from "./video1/scenes/Shot5_3";
import { Shot6_1 } from "./video1/scenes/Shot6_1";
import { Shot6_2 } from "./video1/scenes/Shot6_2";
import { Shot7_1 } from "./video1/scenes/Shot7_1";
import { Shot7_2 } from "./video1/scenes/Shot7_2";
import { Shot7_3 } from "./video1/scenes/Shot7_3";
import { Shot7_4 } from "./video1/scenes/Shot7_4";
import { Shot7_5 } from "./video1/scenes/Shot7_5";
import { Shot7_6 } from "./video1/scenes/Shot7_6";
import { Shot7_7 } from "./video1/scenes/Shot7_7";
import { Shot8_1 } from "./video1/scenes/Shot8_1";
import { Shot8_2 } from "./video1/scenes/Shot8_2";
import { Shot8_3 } from "./video1/scenes/Shot8_3";
import { Shot8_4 } from "./video1/scenes/Shot8_4";
import { Shot9_1 } from "./video1/scenes/Shot9_1";
import { Shot9_2 } from "./video1/scenes/Shot9_2";
import { FullVideo } from "./video1/FullVideo";
import { SHOT_TIMING, TOTAL_DURATION_FRAMES } from "./video1/timing";
// Video 2 (legacy — Hallucinations, full)
import { FullVideo2 } from "./video2/FullVideo";
import { TOTAL_DURATION_FRAMES as V2_TOTAL_FRAMES, SHOT_TIMING as V2_SHOT_TIMING } from "./video2/timing";
import { Shot1_1 as V2_Shot1_1 } from "./video2/scenes/Shot1_1";
import { Shot1_2 as V2_Shot1_2 } from "./video2/scenes/Shot1_2";
import { Shot2_1 as V2_Shot2_1 } from "./video2/scenes/Shot2_1";
import { Shot2_2 as V2_Shot2_2 } from "./video2/scenes/Shot2_2";
import { Shot2_3 as V2_Shot2_3 } from "./video2/scenes/Shot2_3";

// Video 2A
import { FullVideo2A } from "./video2a/FullVideo";
import { TOTAL_DURATION_FRAMES as V2A_TOTAL_FRAMES, SHOT_TIMING as V2A_SHOT_TIMING } from "./video2a/timing";
import { Shot1_1 as V2A_Shot1_1 } from "./video2a/scenes/Shot1_1";
import { Shot2_1 as V2A_Shot2_1 } from "./video2a/scenes/Shot2_1";
import { Shot3_1 as V2A_Shot3_1 } from "./video2a/scenes/Shot3_1";
import { Shot4_1 as V2A_Shot4_1 } from "./video2a/scenes/Shot4_1";
import { Shot5_1 as V2A_Shot5_1 } from "./video2a/scenes/Shot5_1";
import { Shot5_2 as V2A_Shot5_2 } from "./video2a/scenes/Shot5_2";
import { Shot6_1 as V2A_Shot6_1 } from "./video2a/scenes/Shot6_1";

// Video 2B
import { FullVideo2B } from "./video2b/FullVideo";
import { TOTAL_DURATION_FRAMES as V2B_TOTAL_FRAMES, SHOT_TIMING as V2B_SHOT_TIMING } from "./video2b/timing";
import { Shot1_1 as V2B_Shot1_1 } from "./video2b/scenes/Shot1_1";
import { Shot2_1 as V2B_Shot2_1 } from "./video2b/scenes/Shot2_1";
import { Shot3_1 as V2B_Shot3_1 } from "./video2b/scenes/Shot3_1";
import { Shot4_1 as V2B_Shot4_1 } from "./video2b/scenes/Shot4_1";
import { Shot5_1 as V2B_Shot5_1 } from "./video2b/scenes/Shot5_1";
import { Shot5_2 as V2B_Shot5_2 } from "./video2b/scenes/Shot5_2";

const FPS = 30;

export const Root: React.FC = () => {
  return (
    <>
      {/* ========== VIDEO 1 — What is LLM? ========== */}
      <Folder name="Video-1-LLM">
        <Composition
          id="full-video-1"
          component={FullVideo}
          durationInFrames={TOTAL_DURATION_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Folder name="Shots">
          <Composition
            id="v1-shot1-1"
            component={Shot1_1}
            durationInFrames={SHOT_TIMING["shot1-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot1-3"
            component={Shot1_3}
            durationInFrames={SHOT_TIMING["shot1-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot2-1"
            component={Shot2_1}
            durationInFrames={SHOT_TIMING["shot2-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot2-2"
            component={Shot2_2}
            durationInFrames={SHOT_TIMING["shot2-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot2-3"
            component={Shot2_3}
            durationInFrames={SHOT_TIMING["shot2-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot3-1"
            component={Shot3_1}
            durationInFrames={SHOT_TIMING["shot3-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot3-2"
            component={Shot3_2}
            durationInFrames={SHOT_TIMING["shot3-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot3-3"
            component={Shot3_3}
            durationInFrames={SHOT_TIMING["shot3-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot3-4"
            component={Shot3_4}
            durationInFrames={SHOT_TIMING["shot3-4"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot4-1"
            component={Shot4_1}
            durationInFrames={SHOT_TIMING["shot4-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot4-2"
            component={Shot4_2}
            durationInFrames={SHOT_TIMING["shot4-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot4-3"
            component={Shot4_3}
            durationInFrames={SHOT_TIMING["shot4-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot5-1"
            component={Shot5_1}
            durationInFrames={SHOT_TIMING["shot5-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot5-2"
            component={Shot5_2}
            durationInFrames={SHOT_TIMING["shot5-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot5-3"
            component={Shot5_3}
            durationInFrames={SHOT_TIMING["shot5-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot6-1"
            component={Shot6_1}
            durationInFrames={SHOT_TIMING["shot6-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot6-2"
            component={Shot6_2}
            durationInFrames={SHOT_TIMING["shot6-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-1"
            component={Shot7_1}
            durationInFrames={SHOT_TIMING["shot7-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-2"
            component={Shot7_2}
            durationInFrames={SHOT_TIMING["shot7-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-3"
            component={Shot7_3}
            durationInFrames={SHOT_TIMING["shot7-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-4"
            component={Shot7_4}
            durationInFrames={SHOT_TIMING["shot7-4"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-5"
            component={Shot7_5}
            durationInFrames={SHOT_TIMING["shot7-5"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-6"
            component={Shot7_6}
            durationInFrames={SHOT_TIMING["shot7-6"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot7-7"
            component={Shot7_7}
            durationInFrames={SHOT_TIMING["shot7-7"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot8-1"
            component={Shot8_1}
            durationInFrames={SHOT_TIMING["shot8-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot8-2"
            component={Shot8_2}
            durationInFrames={SHOT_TIMING["shot8-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot8-3"
            component={Shot8_3}
            durationInFrames={SHOT_TIMING["shot8-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot8-4"
            component={Shot8_4}
            durationInFrames={SHOT_TIMING["shot8-4"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot9-1"
            component={Shot9_1}
            durationInFrames={SHOT_TIMING["shot9-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v1-shot9-2"
            component={Shot9_2}
            durationInFrames={SHOT_TIMING["shot9-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
        </Folder>
      </Folder>

      {/* ========== VIDEO 2 — Hallucinations ========== */}
      <Folder name="Video-2-Hallucinations">
        <Composition
          id="full-video-2"
          component={FullVideo2}
          durationInFrames={V2_TOTAL_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Folder name="Shots">
          <Composition
            id="v2-shot1-1"
            component={V2_Shot1_1}
            durationInFrames={V2_SHOT_TIMING["shot1-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v2-shot1-2"
            component={V2_Shot1_2}
            durationInFrames={V2_SHOT_TIMING["shot1-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v2-shot2-1"
            component={V2_Shot2_1}
            durationInFrames={V2_SHOT_TIMING["shot2-1"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v2-shot2-2"
            component={V2_Shot2_2}
            durationInFrames={V2_SHOT_TIMING["shot2-2"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
          <Composition
            id="v2-shot2-3"
            component={V2_Shot2_3}
            durationInFrames={V2_SHOT_TIMING["shot2-3"].durationInFrames}
            fps={FPS}
            width={1920}
            height={1080}
          />
        </Folder>
      </Folder>
      {/* ========== VIDEO 2A — Hallucinations (כשהמודל נשמע משכנע אבל טועה) ========== */}
      <Folder name="Video-2A-Hallucinations">
        <Composition
          id="full-video-2a"
          component={FullVideo2A}
          durationInFrames={V2A_TOTAL_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Folder name="Shots">
          <Composition id="v2a-shot1-1" component={V2A_Shot1_1} durationInFrames={V2A_SHOT_TIMING["shot1-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2a-shot2-1" component={V2A_Shot2_1} durationInFrames={V2A_SHOT_TIMING["shot2-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2a-shot3-1" component={V2A_Shot3_1} durationInFrames={V2A_SHOT_TIMING["shot3-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2a-shot4-1" component={V2A_Shot4_1} durationInFrames={V2A_SHOT_TIMING["shot4-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2a-shot5-1" component={V2A_Shot5_1} durationInFrames={V2A_SHOT_TIMING["shot5-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2a-shot5-2" component={V2A_Shot5_2} durationInFrames={V2A_SHOT_TIMING["shot5-2"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2a-shot6-1" component={V2A_Shot6_1} durationInFrames={V2A_SHOT_TIMING["shot6-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
        </Folder>
      </Folder>

      {/* ========== VIDEO 2B — למה מודלי שפה טועים לפעמים? ========== */}
      <Folder name="Video-2B-Why-Models-Err">
        <Composition
          id="full-video-2b"
          component={FullVideo2B}
          durationInFrames={V2B_TOTAL_FRAMES}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Folder name="Shots">
          <Composition id="v2b-shot1-1" component={V2B_Shot1_1} durationInFrames={V2B_SHOT_TIMING["shot1-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2b-shot2-1" component={V2B_Shot2_1} durationInFrames={V2B_SHOT_TIMING["shot2-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2b-shot3-1" component={V2B_Shot3_1} durationInFrames={V2B_SHOT_TIMING["shot3-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2b-shot4-1" component={V2B_Shot4_1} durationInFrames={V2B_SHOT_TIMING["shot4-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2b-shot5-1" component={V2B_Shot5_1} durationInFrames={V2B_SHOT_TIMING["shot5-1"].durationInFrames} fps={FPS} width={1920} height={1080} />
          <Composition id="v2b-shot5-2" component={V2B_Shot5_2} durationInFrames={V2B_SHOT_TIMING["shot5-2"].durationInFrames} fps={FPS} width={1920} height={1080} />
        </Folder>
      </Folder>
    </>
  );
};
