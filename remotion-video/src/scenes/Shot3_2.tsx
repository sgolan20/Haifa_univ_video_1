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
 * Shot 3.2 — Word Option Cards (12 seconds)
 * Continues from Shot 3.1: same terminal with completed sentence,
 * same question text at bottom. Cards spring in below terminal.
 * Each card lights up in sequence when "mentioned".
 */

const CARDS = [
  { word: "עבודה", icon: "🏢", color: "#3b82f6", delay: 30 },
  { word: "אוניברסיטה", icon: "🎓", color: COLORS.secondary, delay: 70 },
  { word: "טיול", icon: "⛰️", color: COLORS.accent, delay: 110 },
];

// Each card highlights at a specific time (simulating narration mention)
const HIGHLIGHT_TIMES = [150, 200, 250];

export const Shot3_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor blink (continuing from 3.1)
  const cursorVisible = Math.sin(frame * 0.15) > 0;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Terminal window — same position as Shot 3.1 end */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: "10%",
          width: "80%",
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
          {/* Complete sentence — static from frame 0 */}
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
            {"הבוקר קמתי, שתיתי קפה, ואז יצאתי "}
            <span style={{ color: COLORS.primary }}>ל...</span>
            {/* Blinking cursor */}
            <span
              style={{
                color: COLORS.primary,
                opacity: cursorVisible ? 1 : 0,
                fontWeight: 300,
              }}
            >
              |
            </span>
          </div>
        </div>
      </div>

      {/* 3 option cards — below the terminal */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {CARDS.map((card, i) => {
          const cardAppear = spring({
            frame: frame - card.delay,
            fps,
            config: { damping: 16, stiffness: 90, mass: 0.8 },
          });

          // Hover float
          const floatY = Math.sin((frame - card.delay) * 0.05 + i * 2) * 8;

          // Highlight when "mentioned"
          const highlightTime = HIGHLIGHT_TIMES[i];
          const isHighlighted = frame >= highlightTime && frame < highlightTime + 45;
          const highlightGlow = isHighlighted
            ? interpolate(
                frame - highlightTime,
                [0, 10, 35, 45],
                [0, 1, 1, 0.4],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0;

          const cardColor = card.color;

          return (
            <div
              key={i}
              style={{
                transform: `scale(${cardAppear}) translateY(${floatY}px)`,
                opacity: cardAppear,
              }}
            >
              <div
                style={{
                  width: 280,
                  padding: "30px 24px",
                  borderRadius: 24,
                  background: `${cardColor}${isHighlighted ? "25" : "12"}`,
                  border: `3px solid ${cardColor}${isHighlighted ? "" : "66"}`,
                  boxShadow: isHighlighted
                    ? `0 0 40px ${cardColor}55, 0 0 80px ${cardColor}22`
                    : `0 0 20px ${cardColor}22`,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 56 }}>{card.icon}</span>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 36,
                    fontWeight: 800,
                    color: isHighlighted ? cardColor : COLORS.text,
                    direction: "rtl",
                    textShadow: highlightGlow > 0
                      ? `0 0 ${highlightGlow * 15}px ${cardColor}`
                      : "none",
                  }}
                >
                  {card.word}?
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connecting dashed lines from terminal bottom-center to card top-center */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {CARDS.map((card, i) => {
          const dotOp = interpolate(frame - card.delay, [0, 20], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // Cards: 3 × 280px wide + 2 × 60px gap = 960px total
          // Centered: starts at (1920-960)/2 = 480px
          // Card centers: 480+140=620, 480+340+140=960, 480+680+140=1300
          const cardCenterX = 480 + 140 + i * 340;
          return (
            <line
              key={i}
              x1={960}
              y1={545}
              x2={cardCenterX}
              y2={670}
              stroke={COLORS.primary}
              strokeWidth={2}
              strokeDasharray="6 6"
              strokeDashoffset={-frame * 2}
              opacity={dotOp}
            />
          );
        })}
      </svg>

      {/* Question text — same position and style as Shot 3.1 end */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
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
