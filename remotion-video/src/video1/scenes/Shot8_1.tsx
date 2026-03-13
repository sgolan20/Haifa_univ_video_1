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
 * Shot 8.1 — Summary Part 1 (15 seconds, 450 frames)
 * Title "סיכום" + first 2 summary cards with generated images.
 * Narration timing (shot starts at 335s):
 *   f0   (335.0) — "נעבור לסכם את שלמדנו"
 *   f105 (338.5) — "מודל שפה הוא מערכת שלמדה דפוסי שפה..."
 *   f249 (343.3) — "הוא פועל על עיקרון חיזוי מילים..."
 */

const CARDS = [
  {
    num: 1,
    image: "shot8_brain_patterns.png",
    text: "למד דפוסי שפה מכמות עצומה של טקסטים",
    color: COLORS.primary,
    enterFrame: 90,
  },
  {
    num: 2,
    image: "shot8_prediction_orb.png",
    text: "חיזוי מילים — מילה אחר מילה",
    color: COLORS.accent,
    enterFrame: 240,
  },
];

export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title "סיכום"
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

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
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 64,
          fontWeight: 800,
          color: COLORS.text,
          opacity: titleIn,
          transform: `scale(${titleIn})`,
          direction: "rtl",
          textShadow: `0 0 30px ${COLORS.primary}33`,
        }}
      >
        סיכום
      </div>

      {/* Cards container — horizontal, centered */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 60,
          direction: "rtl",
        }}
      >
        {CARDS.map((card) => {
          const cardIn = spring({
            frame: frame - card.enterFrame,
            fps,
            config: { damping: 16, stiffness: 85, mass: 0.8 },
          });

          const glowPulse = interpolate(
            Math.sin((frame - card.enterFrame) * 0.05),
            [-1, 1],
            [0.4, 1]
          );
          const showGlow = frame > card.enterFrame + 15;

          return (
            <div
              key={card.num}
              style={{
                width: 520,
                borderRadius: 24,
                background: `${COLORS.bgPrimary}ee`,
                border: `2px solid ${card.color}55`,
                boxShadow: showGlow
                  ? `0 0 ${25 * glowPulse}px ${card.color}22`
                  : "none",
                opacity: cardIn,
                transform: `scale(${cardIn}) translateY(${(1 - cardIn) * 30}px)`,
                padding: "30px 30px 35px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  right: 30,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: card.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  fontWeight: 800,
                  color: COLORS.bgPrimary,
                  boxShadow: `0 0 15px ${card.color}66`,
                }}
              >
                {card.num}
              </div>

              {/* Generated image */}
              <Img
                src={staticFile(`images/${card.image}`)}
                style={{
                  width: 180,
                  height: 180,
                  objectFit: "contain",
                }}
              />

              {/* Text */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 34,
                  fontWeight: 700,
                  color: COLORS.text,
                  direction: "rtl",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                {card.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
