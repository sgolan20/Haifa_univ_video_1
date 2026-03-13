import React from "react";
import { AbsoluteFill, Video, staticFile } from "remotion";

/**
 * Shot 1.2 — Narrator continues (10 seconds)
 * Lip-synced talking head video (Freepik Fabric).
 * Audio comes from the full narration track in FullVideo — video is muted.
 * Plays video from 4s onward (startFrom=120 frames at 30fps).
 */
export const Shot1_2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video
        src={staticFile("video/narrator.mp4")}
        volume={0}
        startFrom={120}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};
