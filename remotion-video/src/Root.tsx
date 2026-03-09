import { Composition } from "remotion";
import { Shot1_1 } from "./scenes/Shot1_1";
import { Shot1_2 } from "./scenes/Shot1_2";
import { Shot1_3 } from "./scenes/Shot1_3";
import { Shot2_1 } from "./scenes/Shot2_1";
import { Shot2_2 } from "./scenes/Shot2_2";
import { Shot2_3 } from "./scenes/Shot2_3";

const FPS = 30;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="shot1-1"
        component={Shot1_1}
        durationInFrames={4 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot1-2"
        component={Shot1_2}
        durationInFrames={12 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot1-3"
        component={Shot1_3}
        durationInFrames={15 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot2-1"
        component={Shot2_1}
        durationInFrames={14 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot2-2"
        component={Shot2_2}
        durationInFrames={18 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="shot2-3"
        component={Shot2_3}
        durationInFrames={17 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
