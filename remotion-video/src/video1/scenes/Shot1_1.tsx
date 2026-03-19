import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 1.1 — Narrator introduction (14 seconds)
 * Lip-synced talking head video (Freepik Fabric).
 * Audio comes from the full narration track in FullVideo — video is muted.
 * "מודל שפה" text appears at 7:16 with glassmorphic card.
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const TEXT_START = 226; // frame 7:16 — "מודל שפה" appears
  const ENG_START = 299;  // frame 9:29 — "Large Language Model" appears
  const LLM_START = 380;  // frame 12:20 — collapse to "LLM"

  const words = ["Large", "Language", "Model"];

  // Hebrew text animations
  const textOpacity = interpolate(frame, [TEXT_START, TEXT_START + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slideIn = spring({
    frame: Math.max(0, frame - TEXT_START),
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // English text animations
  const engOpacity = interpolate(frame, [ENG_START, ENG_START + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const engSlideIn = spring({
    frame: Math.max(0, frame - ENG_START),
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const glowPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.4, 0.8, 0.4],
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile("video1/video/narrator.mp4")}
        volume={0}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Right side: מודל שפה */}
      {frame >= TEXT_START && (
        <div
          style={{
            position: "absolute",
            right: 60,
            top: 120,
            opacity: textOpacity,
            transform: `translateX(${(1 - slideIn) * 80}px)`,
            direction: "rtl",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.45)",
              backdropFilter: "blur(16px)",
              borderRadius: 20,
              padding: "30px 50px",
              border: "1.5px solid rgba(0, 212, 255, 0.3)",
              boxShadow: `0 0 ${30 + glowPulse * 20}px rgba(0, 212, 255, ${glowPulse * 0.3}), 0 8px 32px rgba(0, 0, 0, 0.5)`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 96,
                fontWeight: 800,
                color: "#ffffff",
                textShadow: `0 0 30px rgba(0, 212, 255, ${glowPulse * 0.5}), 0 2px 8px rgba(0, 0, 0, 0.6)`,
                letterSpacing: 2,
              }}
            >
              מודל שפה
            </div>
            <div
              style={{
                width: `${slideIn * 100}%`,
                height: 3,
                background: "linear-gradient(90deg, #00d4ff, #8b5cf6)",
                borderRadius: 2,
                marginTop: 8,
              }}
            />
          </div>
        </div>
      )}

      {/* Left side: Large Language Model → LLM */}
      {frame >= ENG_START && (() => {
        // Collapse progress: 0 = full words, 1 = only initials
        const collapse = interpolate(
          frame,
          [LLM_START, LLM_START + 30],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            style={{
              position: "absolute",
              left: 60,
              top: 140,
              opacity: engOpacity,
              transform: `translateX(${(1 - engSlideIn) * -80}px)`,
              direction: "ltr",
            }}
          >
            <div
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(16px)",
                borderRadius: 20,
                padding: "30px 50px",
                border: "1.5px solid rgba(139, 92, 246, 0.3)",
                boxShadow: `0 0 ${30 + glowPulse * 20}px rgba(139, 92, 246, ${glowPulse * 0.3}), 0 8px 32px rgba(0, 0, 0, 0.5)`,
              }}
            >
              {/* Slide container — words slide up, LLM slides in from below */}
              <div style={{ position: "relative", overflow: "hidden", minHeight: 100 }}>
                {/* Words — slide up and out */}
                <div
                  style={{
                    transform: `translateY(${-collapse * 100}%)`,
                    opacity: 1 - collapse,
                  }}
                >
                  {words.map((word, i) => {
                    const wordDelay = i * 6;
                    const wordSpring = spring({
                      frame: Math.max(0, frame - ENG_START - wordDelay),
                      fps,
                      config: { damping: 16, stiffness: 90, mass: 0.8 },
                    });

                    return (
                      <div
                        key={i}
                        style={{
                          fontFamily: FONT_FAMILY,
                          fontSize: 64,
                          fontWeight: 700,
                          color: "#ffffff",
                          textShadow: `0 0 20px rgba(139, 92, 246, ${glowPulse * 0.4}), 0 2px 6px rgba(0, 0, 0, 0.5)`,
                          marginBottom: i < words.length - 1 ? 6 : 0,
                          opacity: wordSpring,
                          transform: `translateX(${(1 - wordSpring) * -30}px)`,
                        }}
                      >
                        <span style={{ color: "#fbbf24", fontWeight: 900, fontSize: 72 }}>
                          {word[0]}
                        </span>
                        {word.slice(1)}
                      </div>
                    );
                  })}
                </div>

                {/* LLM — slides in from below */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    transform: `translateY(${(1 - collapse) * 100}%)`,
                    opacity: collapse,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 96,
                      fontWeight: 900,
                      color: "#fbbf24",
                      textShadow: `0 0 30px rgba(251, 191, 36, ${glowPulse * 0.5}), 0 2px 8px rgba(0, 0, 0, 0.6)`,
                      letterSpacing: 12,
                    }}
                  >
                    LLM
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div
                style={{
                  width: `${engSlideIn * 100}%`,
                  height: 3,
                  background: "linear-gradient(90deg, #8b5cf6, #fbbf24)",
                  borderRadius: 2,
                  marginTop: 12,
                }}
              />
            </div>
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
