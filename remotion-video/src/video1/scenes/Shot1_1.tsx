import React from "react";
import { AbsoluteFill, Video, staticFile } from "remotion";

/**
 * Shot 1.1 — Narrator introduction (4 seconds)
 * Lip-synced talking head video (Freepik Fabric).
 * Audio comes from the full narration track in FullVideo — video is muted.
 */
export const Shot1_1: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Video
        src={staticFile("video1/video/narrator.mp4")}
        volume={0}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};
