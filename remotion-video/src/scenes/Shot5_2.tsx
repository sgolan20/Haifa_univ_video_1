import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 5.2 — LLM Generates Text in Real-Time (15 seconds)
 * The AI side takes center stage. Robot hand image with neural network
 * as cinematic background. ChatGPT card scales up. Typewriter generates
 * new text with sparkle effects. Search side dims and recedes in 3D.
 */

// Deterministic sparkle positions
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

const SPARKLE_COUNT = 20;
const sparkles = Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
  x: 200 + seededRandom(i * 11 + 1) * 1520,
  y: 200 + seededRandom(i * 17 + 3) * 680,
  size: 3 + seededRandom(i * 23 + 5) * 6,
  delay: seededRandom(i * 31 + 7) * 120,
  speed: 0.05 + seededRandom(i * 37 + 11) * 0.1,
}));

export const Shot5_2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Search side dims and pushes back in 3D (frames 0-90)
  const searchDim = interpolate(frame, [0, 90], [0.6, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const searchPushBack = interpolate(frame, [0, 90], [0, -200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const searchScale = interpolate(frame, [0, 90], [0.7, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: AI side grows and centers (frames 20-120)
  const aiGrowSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 3: Robot image fades in as background (frames 0-60)
  const robotAppear = interpolate(frame, [0, 60], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Typewriter text (frames 100-350)
  const aiText =
    "מודל שפה מייצר טקסט חדש לגמרי בזמן אמת. הוא אינו מחפש מידע באינטרנט, אלא בונה תשובה מילה אחרי מילה על סמך הדפוסים שלמד.";
  const words = aiText.split(" ");
  const visibleWordCount = Math.min(
    words.length,
    Math.max(0, Math.floor((frame - 100) / 7))
  );

  // Phase 5: Glow effect on new words
  const lastWordIndex = visibleWordCount - 1;

  // Phase 6: "Creates new content" label (frames 200+)
  const labelSpring = spring({
    frame: frame - 200,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Subtitle label bottom (frames 320+)
  const subtitleSpring = spring({
    frame: frame - 320,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // 3D tilt on AI card
  const cardTiltX = Math.sin(frame * 0.02) * 2;
  const cardTiltY = Math.cos(frame * 0.015) * 2;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        perspective: "1400px",
      }}
    >
      {/* Robot hand neural network — cinematic background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: robotAppear,
        }}
      >
        <Img
          src={staticFile("images/ai-robot.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.4) saturate(1.4) hue-rotate(-10deg)",
          }}
        />
        {/* Gradient overlay to blend with dark theme */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(ellipse at 50% 50%, transparent 0%, ${COLORS.bgPrimary}dd 60%, ${COLORS.bgPrimary} 100%)`,
          }}
        />
      </div>

      {/* Dimmed search side (far right, pushed back in 3D) */}
      <div
        style={{
          position: "absolute",
          right: 40,
          top: 200,
          width: 500,
          opacity: searchDim,
          transform: `translateZ(${searchPushBack}px) scale(${searchScale}) rotateY(15deg)`,
          transformOrigin: "right center",
          filter: "blur(2px) grayscale(0.5)",
        }}
      >
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${COLORS.textDim}33`,
          }}
        >
          <Img
            src={staticFile("images/google-search.jpg")}
            style={{
              width: "100%",
              height: 200,
              objectFit: "cover",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            color: COLORS.textDim,
            direction: "rtl",
          }}
        >
          מנוע חיפוש
        </div>
      </div>

      {/* Main AI card — center stage with 3D transforms */}
      <div
        style={{
          position: "absolute",
          left: interpolate(aiGrowSpring, [0, 1], [60, 140]),
          top: interpolate(aiGrowSpring, [0, 1], [200, 100]),
          width: interpolate(aiGrowSpring, [0, 1], [600, 900]),
          transformStyle: "preserve-3d",
          transform: `rotateX(${cardTiltX}deg) rotateY(${cardTiltY}deg)`,
          opacity: interpolate(aiGrowSpring, [0, 0.3], [0, 1]),
        }}
      >
        {/* Header with label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
            opacity: labelSpring,
            transform: `translateY(${(1 - labelSpring) * 15}px)`,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: COLORS.secondary,
              boxShadow: `0 0 10px ${COLORS.secondary}88`,
            }}
          />
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.secondary,
            }}
          >
            מודל שפה — יוצר תוכן חדש
          </span>
        </div>

        {/* ChatGPT interface image */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `2px solid ${COLORS.secondary}55`,
            boxShadow: `0 15px 50px ${COLORS.bgPrimary}cc, 0 0 30px ${COLORS.secondary}33`,
            marginBottom: 20,
          }}
        >
          <Img
            src={staticFile("images/chatgpt-interface.jpg")}
            style={{
              width: "100%",
              height: interpolate(aiGrowSpring, [0, 1], [250, 320]),
              objectFit: "cover",
            }}
          />
        </div>

        {/* Typewriter text area */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${COLORS.bgPrimary}ee, ${COLORS.bgSecondary}ee)`,
            border: `1px solid ${COLORS.secondary}33`,
            direction: "rtl",
            minHeight: 140,
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              color: COLORS.secondary,
              marginBottom: 10,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            AI RESPONSE
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              color: COLORS.text,
              lineHeight: 1.7,
            }}
          >
            {words.slice(0, visibleWordCount).map((word, i) => (
              <span
                key={i}
                style={{
                  color:
                    i === lastWordIndex
                      ? COLORS.accent
                      : COLORS.text,
                  textShadow:
                    i === lastWordIndex
                      ? `0 0 12px ${COLORS.accent}88`
                      : "none",
                }}
              >
                {word}{" "}
              </span>
            ))}
            {visibleWordCount > 0 && visibleWordCount < words.length && (
              <span
                style={{
                  color: COLORS.secondary,
                  opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                  fontWeight: 300,
                }}
              >
                |
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sparkle effects */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {sparkles.map((s, i) => {
          const sparkleFrame = (frame + s.delay) * s.speed;
          const sparkleOpacity =
            visibleWordCount > 2
              ? Math.max(0, Math.sin(sparkleFrame * Math.PI * 2) * 0.8)
              : 0;
          return (
            <circle
              key={i}
              cx={s.x}
              cy={s.y + Math.sin(frame * 0.04 + i) * 8}
              r={s.size * sparkleOpacity}
              fill={
                i % 3 === 0
                  ? COLORS.secondary
                  : i % 3 === 1
                  ? COLORS.primary
                  : COLORS.accent
              }
              opacity={sparkleOpacity * 0.6}
            />
          );
        })}
      </svg>

      {/* Bottom subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: subtitleSpring,
          transform: `translateY(${(1 - subtitleSpring) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
            padding: "10px 30px",
            borderRadius: 12,
            background: `${COLORS.bgPrimary}aa`,
            border: `1px solid ${COLORS.secondary}33`,
          }}
        >
          מייצר תשובה חדשה — לא מחפש מידע קיים
        </span>
      </div>
    </AbsoluteFill>
  );
};
