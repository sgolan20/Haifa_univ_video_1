import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 6.1 — Thought Question (16 seconds)
 * Mood shift to purple tones. Question marks float around.
 * Central question text appears large and contemplative.
 */

const QUESTION_MARKS = [
  { x: 15, y: 20, size: 80, delay: 30, color: COLORS.primary },
  { x: 80, y: 15, size: 60, delay: 50, color: COLORS.secondary },
  { x: 10, y: 65, size: 50, delay: 70, color: COLORS.accent },
  { x: 85, y: 60, size: 70, delay: 40, color: COLORS.primary },
  { x: 25, y: 85, size: 45, delay: 90, color: COLORS.secondary },
  { x: 70, y: 80, size: 55, delay: 60, color: "#3b82f6" },
  { x: 50, y: 10, size: 40, delay: 80, color: COLORS.accent },
  { x: 40, y: 90, size: 65, delay: 35, color: COLORS.primary },
];

export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Main question text
  const questionIn = spring({
    frame: frame - 60,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a1040 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Background image — semi-transparent */}
      <Img
        src={staticFile("images/shot6_1_thinking_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 40], [0, 0.35], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Section title — large, centered on brain area */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 80,
          fontWeight: 800,
          color: "#ffffff",
          opacity: titleIn,
          transform: `translate(0, -50%) scale(${titleIn})`,
          textShadow: `0 0 30px rgba(255,255,255,0.6), 0 0 60px ${COLORS.secondary}aa, 0 0 100px ${COLORS.secondary}66, 0 4px 20px rgba(0,0,0,0.9)`,
          direction: "rtl",
        }}
      >
        שאלה לחשיבה
      </div>

      {/* Floating question marks */}
      {QUESTION_MARKS.map((qm, i) => {
        const qmIn = spring({
          frame: frame - qm.delay,
          fps,
          config: { damping: 14, stiffness: 85, mass: 0.8 },
        });
        const floatY = Math.sin((frame + i * 40) * 0.04) * 15;
        const floatX = Math.cos((frame + i * 30) * 0.03) * 10;
        const rotate = Math.sin((frame + i * 50) * 0.02) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${qm.x}%`,
              top: `${qm.y}%`,
              transform: `translate(-50%, -50%) translate(${floatX}px, ${floatY}px) rotate(${rotate}deg) scale(${qmIn})`,
              fontFamily: FONT_FAMILY,
              fontSize: qm.size,
              fontWeight: 800,
              color: qm.color,
              opacity: qmIn * 0.3,
              textShadow: `0 0 20px ${qm.color}44`,
            }}
          >
            ?
          </div>
        );
      })}

      {/* Central question box */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${questionIn})`,
          opacity: questionIn,
          width: "75%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "50px 60px",
            borderRadius: 24,
            background: `${COLORS.bgPrimary}dd`,
            border: `2px solid ${COLORS.secondary}44`,
            boxShadow: `0 0 60px ${COLORS.secondary}15, 0 20px 40px rgba(0,0,0,0.5)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 42,
              fontWeight: 700,
              color: COLORS.text,
              direction: "rtl",
              lineHeight: 1.8,
            }}
          >
            אם מודל שפה חוזה מילים על בסיס הסתברות,
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 48,
              fontWeight: 800,
              color: COLORS.accent,
              direction: "rtl",
              lineHeight: 1.8,
              marginTop: 10,
              textShadow: `0 0 20px ${COLORS.accent}44`,
            }}
          >
            האם הוא יכול להפתיע אתכם?
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
