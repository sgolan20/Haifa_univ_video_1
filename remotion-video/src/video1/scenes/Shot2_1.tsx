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
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 2.1 — "What is a Language Model?" definition (16 seconds)
 * Big section title slams in, then a flow diagram appears RTL:
 * [ייצור טקסט] ← [למידת דפוסים] ← [טקסטים]
 * Each step animates in sequence from right to left.
 * Narration (30-46s): "מה זה מודל שפה? נתחיל מהגדרה בסיסית..."
 */

const STEPS = [
  {
    title: "טקסטים",
    subtitle: "מיליארדי משפטים\nמהאינטרנט, ספרים, מאמרים",
    color: "#3b82f6",
    icon: "📚",
  },
  {
    title: "למידת דפוסים",
    subtitle: "המודל מזהה קשרים\nבין מילים ומשפטים",
    color: COLORS.primary,
    icon: "🧠",
  },
  {
    title: "ייצור טקסט",
    subtitle: "יוצר טקסט חדש\nעל בסיס מה שלמד",
    color: COLORS.accent,
    icon: "✨",
  },
];

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleSlam = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 0.8 },
  });

  // Background image fade
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flow steps — RTL: right card first, then middle, then left
  const stepDelays = [120, 180, 240];
  const arrowDelays = [170, 230];

  // Definition text
  const defOpacity = interpolate(frame, [300, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card positions — RTL: first card on right, last on left
  const cardWidth = 370;
  const cardGap = 110;
  const totalWidth = cardWidth * 3 + cardGap * 2;
  const startX = (1920 - totalWidth) / 2;
  const cardY = 400;

  // RTL positions: index 0 = rightmost, index 2 = leftmost
  const cardPositions = [
    startX + (cardWidth + cardGap) * 2, // right
    startX + (cardWidth + cardGap) * 1, // center
    startX,                              // left
  ];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Background image */}
      <Img
        src={staticFile("video1/images/shot2_1_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
        }}
      />

      {/* Section title */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          width: "100%",
          textAlign: "center",
          transform: `scale(${titleSlam})`,
          opacity: titleSlam,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 40px ${COLORS.primary}66, 0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          מה זה מודל שפה?
        </div>
      </div>

      {/* Flow cards — RTL */}
      {STEPS.map((step, i) => {
        const stepIn = spring({
          frame: frame - stepDelays[i],
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cardPositions[i],
              top: cardY,
              width: cardWidth,
              transform: `scale(${stepIn}) translateX(${(1 - stepIn) * 60}px)`,
              opacity: stepIn,
            }}
          >
            <div
              style={{
                padding: "30px 24px",
                borderRadius: 20,
                background: `linear-gradient(135deg, ${step.color}30 0%, rgba(10,14,26,0.75) 100%)`,
                border: `2px solid ${step.color}88`,
                boxShadow: `0 0 40px ${step.color}20, 0 8px 32px rgba(0,0,0,0.4)`,
                textAlign: "center",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>{step.icon}</div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 34,
                  fontWeight: 800,
                  color: step.color,
                  direction: "rtl",
                  textShadow: `0 0 20px ${step.color}44`,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#cbd5e1",
                  marginTop: 10,
                  direction: "rtl",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {step.subtitle}
              </div>
            </div>
          </div>
        );
      })}

      {/* Arrows — RTL (pointing left) */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {arrowDelays.map((delay, i) => {
          const progress = interpolate(frame - delay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Arrow goes from right card's left edge to next card's right edge
          const x1 = cardPositions[i] + 0; // left edge of right card
          const x2 = cardPositions[i + 1] + cardWidth; // right edge of left card
          const y = cardY + 100; // vertical center of cards

          const currentX = x1 + (x2 - x1) * progress;

          return (
            <g key={i} opacity={progress}>
              {/* Arrow line */}
              <line
                x1={x1}
                y1={y}
                x2={currentX}
                y2={y}
                stroke={COLORS.primary}
                strokeWidth={3}
                strokeDasharray="8 4"
              />
              {/* Glow */}
              <line
                x1={x1}
                y1={y}
                x2={currentX}
                y2={y}
                stroke={COLORS.primary}
                strokeWidth={8}
                opacity={0.15}
              />
              {/* Arrowhead — pointing left */}
              {progress > 0.7 && (
                <polygon
                  points="0,-9 -18,0 0,9"
                  fill={COLORS.primary}
                  opacity={interpolate(progress, [0.7, 1], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}
                  transform={`translate(${x2}, ${y})`}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Definition text at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          width: "100%",
          textAlign: "center",
          opacity: defOpacity,
          direction: "rtl",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            fontWeight: 500,
            color: COLORS.textMuted,
            maxWidth: 1200,
            margin: "0 auto",
            lineHeight: 1.6,
            padding: "22px 44px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${COLORS.primary}0a 0%, ${COLORS.secondary}08 100%)`,
            border: `1px solid ${COLORS.primary}22`,
            boxShadow: `0 4px 30px rgba(0,0,0,0.3)`,
            backdropFilter: "blur(4px)",
          }}
        >
          מודל שפה = מערכת מחשב שלמדה דפוסים בשפה אנושית ומסוגלת לייצר טקסט חדש
        </div>
      </div>
    </AbsoluteFill>
  );
};
