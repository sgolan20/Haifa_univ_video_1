import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { Logo } from "../../design/Logo";

/**
 * Video 2, Shot 2.3 — Danger: looks authentic (9.6s, 288 frames)
 *
 * Professional-looking academic text appears on screen.
 * After ~3 seconds, dramatic red strikethrough marks appear over the text,
 * red question marks float, and warning text reveals it's all wrong.
 *
 * Narration: "מה שמסוכן במיוחד בהזיות האלה הוא שהן נראות לחלוטין אותנטיות..."
 */

const FAKE_TEXT_LINES = [
  "על פי מחקר של Johnson & Williams (2021),",
  "כ-67% מהמשתמשים בכלי AI גנרטיבי דיווחו",
  "על שיפור משמעותי בפרודוקטיביות האקדמית.",
  "הממצאים פורסמו ב-Journal of Digital Learning,",
  "כרך 14, עמ׳ 234–251, ואומתו במחקר המשך",
  "של פרופ׳ רחל כהן מאוניברסיטת תל אביב (2022).",
];

export const Shot2_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Academic text entrance
  const textIn = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Red marks reveal (after ~3 seconds = frame 90)
  const revealProgress = interpolate(frame, [90, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating question marks
  const qMarksOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Warning text at bottom
  const warningIn = spring({
    frame: frame - 120,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Strikethrough line positions (which lines get struck)
  const strikeLines = [0, 1, 3, 4, 5];

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* "Academic paper" container */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "50%",
          transform: `translateX(-50%) scale(${textIn})`,
          opacity: textIn,
          width: 1100,
          padding: "50px 60px",
          borderRadius: 16,
          background: `linear-gradient(135deg, rgba(30,40,60,0.9) 0%, rgba(15,20,35,0.95) 100%)`,
          border: `1px solid ${COLORS.primary}22`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Fake "paper" header */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.textDim,
            direction: "ltr",
            textAlign: "center",
            marginBottom: 8,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Journal of Digital Learning, Vol. 14, 2021
        </div>
        <div
          style={{
            width: 200,
            height: 1,
            background: COLORS.textDim,
            margin: "0 auto 28px",
            opacity: 0.3,
          }}
        />

        {/* Fake academic text lines */}
        {FAKE_TEXT_LINES.map((line, i) => {
          const lineDelay = i * 0.15;
          const strikeWidth = strikeLines.includes(i)
            ? interpolate(
                frame,
                [95 + i * 8, 120 + i * 8],
                [0, 100],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              )
            : 0;

          return (
            <div
              key={i}
              style={{
                position: "relative",
                fontFamily: FONT_FAMILY,
                fontSize: 30,
                fontWeight: 400,
                color: COLORS.text,
                direction: "rtl",
                textAlign: "right",
                lineHeight: 2,
                opacity: interpolate(
                  frame,
                  [lineDelay * 30, lineDelay * 30 + 20],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }}
            >
              {line}
              {/* Red strikethrough */}
              {strikeWidth > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    width: `${strikeWidth}%`,
                    height: 3,
                    background: COLORS.warning,
                    boxShadow: `0 0 8px ${COLORS.warning}66`,
                    transform: "translateY(-50%)",
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Fake footnote */}
        <div
          style={{
            marginTop: 20,
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            fontWeight: 300,
            color: COLORS.textDim,
            direction: "rtl",
            textAlign: "right",
            fontStyle: "italic",
          }}
        >
          ¹ הנתונים נאספו מ-12 מוסדות אקדמיים בישראל
        </div>
      </div>

      {/* Floating red question marks */}
      {qMarksOpacity > 0 && (
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          {[
            { x: 200, y: 200, size: 60, phase: 0 },
            { x: 1700, y: 300, size: 50, phase: 1.5 },
            { x: 300, y: 700, size: 45, phase: 3 },
            { x: 1600, y: 650, size: 55, phase: 4.5 },
            { x: 950, y: 150, size: 40, phase: 2 },
          ].map((q, i) => (
            <text
              key={i}
              x={q.x}
              y={q.y + Math.sin(frame * 0.03 + q.phase) * 12}
              fontSize={q.size}
              fill={COLORS.warning}
              opacity={qMarksOpacity * 0.6}
              fontFamily={FONT_FAMILY}
              fontWeight="800"
            >
              ?
            </text>
          ))}
        </svg>
      )}

      {/* Warning text at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: warningIn,
          transform: `scale(${warningIn})`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "18px 48px",
            borderRadius: 16,
            background: `${COLORS.warning}15`,
            border: `2px solid ${COLORS.warning}55`,
            boxShadow: `0 0 40px ${COLORS.warning}15`,
          }}
        >
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.warning,
              direction: "rtl",
            }}
          >
            ⚠️ נראה אמין — אבל שגוי לחלוטין
          </span>
        </div>
      </div>

      <Logo />
    </AbsoluteFill>
  );
};
