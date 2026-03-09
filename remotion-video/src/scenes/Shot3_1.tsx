import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 3.1 — Typewriter Sentence (9 seconds)
 * Section title "עיקרון החיזוי" fades in then out.
 * Terminal-style blinking cursor. Sentence typed word-by-word RTL.
 * Three dots blink at the end.
 */

const WORDS = [
  { text: "הבוקר", frame: 60 },
  { text: "קמתי,", frame: 80 },
  { text: "שתיתי", frame: 100 },
  { text: "קפה,", frame: 120 },
  { text: "ואז", frame: 145 },
  { text: "יצאתי", frame: 165 },
  { text: "ל...", frame: 190 },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const titleFade = interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Terminal window appear
  const terminalAppear = spring({
    frame: frame - 50,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Cursor blink
  const cursorVisible = Math.sin(frame * 0.15) > 0;

  // Dots blink at end
  const dotsPhase = frame > 200;
  const dotsBlink = dotsPhase
    ? interpolate(Math.sin((frame - 200) * 0.12), [-1, 1], [0.3, 1])
    : 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: titleFade,
          transform: `scale(${titleAppear})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 30px ${COLORS.primary}44`,
          }}
        >
          עיקרון החיזוי
        </div>
      </div>

      {/* Terminal window */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "10%",
          width: "80%",
          opacity: terminalAppear,
          transform: `scale(${terminalAppear})`,
        }}
      >
        {/* Terminal chrome */}
        <div
          style={{
            background: "#1a1a2e",
            borderRadius: "16px 16px 0 0",
            padding: "12px 20px",
            display: "flex",
            gap: 8,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fbbf24" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
        </div>

        {/* Terminal body */}
        <div
          style={{
            background: "#0d1117",
            borderRadius: "0 0 16px 16px",
            padding: "50px 60px",
            border: `1px solid ${COLORS.textDim}33`,
            borderTop: "none",
            minHeight: 200,
          }}
        >
          {/* Sentence RTL */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 600,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "right",
              lineHeight: 1.6,
            }}
          >
            {WORDS.map((word, i) => {
              const wordVisible = frame >= word.frame;
              if (!wordVisible) return null;

              // Brief highlight when word appears
              const highlightProgress = interpolate(
                frame - word.frame,
                [0, 12],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              const isLastWord = word.text === "ל...";

              return (
                <span
                  key={i}
                  style={{
                    color: isLastWord
                      ? COLORS.primary
                      : COLORS.text,
                    textShadow: highlightProgress > 0
                      ? `0 0 ${highlightProgress * 20}px ${COLORS.primary}88`
                      : "none",
                    opacity: isLastWord ? dotsBlink : 1,
                  }}
                >
                  {word.text}{" "}
                </span>
              );
            })}

            {/* Blinking cursor */}
            {frame >= 55 && (
              <span
                style={{
                  color: COLORS.primary,
                  opacity: cursorVisible ? 1 : 0,
                  fontWeight: 300,
                }}
              >
                |
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom hint text — matches Shot 3.2 opening */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [200, 230], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.primary,
            direction: "rtl",
          }}
        >
          מה המילה הבאה הסבירה ביותר?
        </div>
      </div>
    </AbsoluteFill>
  );
};
