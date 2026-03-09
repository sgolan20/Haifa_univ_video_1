import React from "react";
import { Img, staticFile, useCurrentFrame, interpolate } from "remotion";

export const Logo: React.FC<{ opacity?: number }> = ({ opacity = 0.5 }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, opacity], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 30,
        opacity: fadeIn,
      }}
    >
      <Img
        src={staticFile("images/haifa-logo.png")}
        style={{
          height: 60,
          filter: "brightness(0) invert(1)",
        }}
      />
    </div>
  );
};
