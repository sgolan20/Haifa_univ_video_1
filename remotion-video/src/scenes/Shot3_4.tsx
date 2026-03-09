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
 * Shot 3.4 — Word Building Animation (10 seconds)
 * Words drop from top into place (spring with gravity feel).
 * Form sentences → sentences stack into paragraph.
 * Gradual zoom-out reveals full text as glowing "hologram".
 */

// Three sentences built word by word
const SENTENCES = [
  {
    words: ["הבוקר", "קמתי,", "שתיתי", "קפה,", "ואז", "יצאתי", "לעבודה."],
    y: 340,
    startFrame: 10,
    wordGap: 12,
  },
  {
    words: ["בדרך", "שמעתי", "מוזיקה", "ברדיו", "ונהניתי", "מהנסיעה."],
    y: 440,
    startFrame: 100,
    wordGap: 12,
  },
  {
    words: ["כשהגעתי", "למשרד,", "פתחתי", "את", "המחשב", "והתחלתי", "לעבוד."],
    y: 540,
    startFrame: 180,
    wordGap: 12,
  },
];

export const Shot3_4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Zoom out effect (scale down to reveal all text)
  const zoomScale = interpolate(frame, [200, 270], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hologram glow on the text block
  const hologramGlow = interpolate(frame, [240, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = hologramGlow > 0
    ? interpolate(Math.sin((frame - 240) * 0.06), [-1, 1], [15, 30])
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: titleAppear,
          transform: `scale(${titleAppear})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
          מילה אחרי מילה — נבנה משפט שלם
        </div>
      </div>

      {/* Text building area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: `scale(${zoomScale})`,
          transformOrigin: "50% 50%",
        }}
      >
        {/* Glow background behind text block */}
        {hologramGlow > 0 && (
          <div
            style={{
              position: "absolute",
              top: 280,
              left: "12%",
              width: "76%",
              height: 340,
              borderRadius: 20,
              background: `${COLORS.primary}08`,
              border: `1px solid ${COLORS.primary}${Math.round(hologramGlow * 40).toString(16).padStart(2, "0")}`,
              boxShadow: `0 0 ${glowPulse}px ${COLORS.primary}22, inset 0 0 ${glowPulse}px ${COLORS.primary}11`,
              opacity: hologramGlow,
            }}
          />
        )}

        {/* Sentences */}
        {SENTENCES.map((sentence, si) => (
          <div
            key={si}
            style={{
              position: "absolute",
              top: sentence.y,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: 14,
              direction: "rtl",
            }}
          >
            {sentence.words.map((word, wi) => {
              const wordFrame = sentence.startFrame + wi * sentence.wordGap;
              const dropSpring = spring({
                frame: frame - wordFrame,
                fps,
                config: { damping: 14, stiffness: 90, mass: 0.8 },
              });

              const dropY = interpolate(dropSpring, [0, 1], [-60, 0]);
              const wordOpacity = dropSpring;

              // Brief color flash when landing
              const flashProgress = interpolate(
                frame - wordFrame,
                [8, 20],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <span
                  key={wi}
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 38,
                    fontWeight: 600,
                    color: flashProgress > 0
                      ? COLORS.primary
                      : COLORS.text,
                    opacity: wordOpacity,
                    transform: `translateY(${dropY}px)`,
                    display: "inline-block",
                    textShadow: flashProgress > 0
                      ? `0 0 ${flashProgress * 12}px ${COLORS.primary}88`
                      : "none",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        ))}

        {/* Arrow indicators between sentences */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          {/* Sentence connectors */}
          {[0, 1].map((i) => {
            const connDelay = SENTENCES[i + 1].startFrame - 10;
            const connOp = interpolate(frame - connDelay, [0, 20], [0, 0.4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y1 = SENTENCES[i].y + 50;
            const y2 = SENTENCES[i + 1].y - 10;
            return (
              <g key={i} opacity={connOp}>
                <line
                  x1={960}
                  y1={y1}
                  x2={960}
                  y2={y2}
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <polygon
                  points={`955,${y2} 960,${y2 + 8} 965,${y2}`}
                  fill={COLORS.primary}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [250, 280], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "14px 44px",
            borderRadius: 14,
            background: `${COLORS.primary}18`,
            border: `2px solid ${COLORS.primary}55`,
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 700,
            color: COLORS.primary,
            direction: "rtl",
            boxShadow: `0 0 20px ${COLORS.primary}33`,
          }}
        >
          כך נוצרת תשובה שלמה — מילה אחרי מילה
        </div>
      </div>
    </AbsoluteFill>
  );
};
