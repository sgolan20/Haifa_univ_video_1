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
 * Shot 3.1 — Prediction Principle Intro + Typewriter Sentence (11 seconds / 330 frames)
 *
 * Phase 1 (0-140): Section title "עיקרון החיזוי" + "איך זה עובד?"
 *   + "בואו נמחיש זאת בדוגמה פשוטה"
 * Phase 2 (140-330): Terminal with sentence typed word-by-word,
 *   synced to Whisper word timestamps.
 *
 * Narration (82-93s): "עיקרון החיזוי. איך זה עובד? בואו נמחיש זאת
 *   בדוגמה פשוטה. במשפט הבא: הבוקר קמתי, שתיתי קפה, ואז יצאתי ל..."
 *
 * Whisper word timing (relative to shot start at 82s):
 *   "עיקרון"=0.0  "החיזוי"=0.2  "איך"=1.28  "זה"=1.5  "עובד"=1.66
 *   "בואו"=2.6  "נמחיש"=2.9  "זאת"=3.22  "בדוגמה"=3.5  "פשוטה"=3.92
 *   "במשפט"=4.92  "הבא"=5.5
 *   "הבוקר"=6.38  "קמתי"=6.82  "שתיתי"=7.52  "קפה"=7.86
 *   "ואז"=8.54  "יצאתי"=8.94  "ל..."=9.48
 */

// Sentence words synced to Whisper timestamps (seconds from shot start)
const SENTENCE_WORDS = [
  { text: "הבוקר", time: 6.38 },
  { text: "קמתי,", time: 6.82 },
  { text: "שתיתי", time: 7.52 },
  { text: "קפה,", time: 7.86 },
  { text: "ואז", time: 8.54 },
  { text: "יצאתי", time: 8.94 },
  { text: "ל...", time: 9.48 },
];

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Title section ---

  // "עיקרון החיזוי" title (Whisper: 0s)
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const titleFade = interpolate(frame, [0, 10, 115, 135], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "איך זה עובד?" subtitle (Whisper: 1.28s = frame 38)
  const subtitleIn = spring({
    frame: frame - 38,
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  const subtitleFade = interpolate(frame, [38, 48, 115, 135], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "בואו נמחיש זאת בדוגמה פשוטה" (Whisper: 2.6s = frame 78)
  const demoTextIn = spring({
    frame: frame - 78,
    fps,
    config: { damping: 16, stiffness: 90 },
  });
  const demoTextFade = interpolate(frame, [78, 88, 115, 135], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line under title
  const lineWidth = interpolate(frame, [5, 30], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineFade = interpolate(frame, [115, 135], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 2: Terminal + Sentence ---

  // "במשפט הבא:" label (Whisper: 4.92s = frame 148)
  const labelIn = spring({
    frame: frame - 148,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Terminal window (appears slightly before "במשפט הבא")
  const terminalIn = spring({
    frame: frame - 135,
    fps,
    config: { damping: 18, stiffness: 80, mass: 0.8 },
  });

  // Cursor blink
  const cursorVisible = Math.sin(frame * 0.15) > 0;

  // Dots blink at end
  const lastWordFrame = Math.round(9.48 * 30); // frame 284
  const dotsPhase = frame > lastWordFrame + 15;
  const dotsBlink = dotsPhase
    ? interpolate(Math.sin((frame - lastWordFrame - 15) * 0.12), [-1, 1], [0.3, 1])
    : 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* === Phase 1: Title Section === */}

      {/* Main title "עיקרון החיזוי" */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          width: "100%",
          textAlign: "center",
          opacity: titleFade,
          transform: `scale(${titleIn})`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 90,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textShadow: `0 0 40px ${COLORS.primary}55`,
          }}
        >
          עיקרון החיזוי
        </div>

        {/* Accent underline */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
            margin: "16px auto 0",
            opacity: lineFade,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Subtitle "איך זה עובד?" */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          width: "100%",
          textAlign: "center",
          opacity: subtitleFade,
          transform: `scale(${subtitleIn}) translateY(${(1 - subtitleIn) * 20}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 52,
            fontWeight: 600,
            color: COLORS.primary,
            direction: "rtl",
            textShadow: `0 0 25px ${COLORS.primary}44`,
          }}
        >
          איך זה עובד?
        </div>
      </div>

      {/* "בואו נמחיש זאת בדוגמה פשוטה" */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          width: "100%",
          textAlign: "center",
          opacity: demoTextFade,
          transform: `translateY(${(1 - demoTextIn) * 20}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 38,
            fontWeight: 500,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
          בואו נמחיש זאת בדוגמה פשוטה
        </div>
      </div>

      {/* === Phase 2: Terminal + Sentence === */}

      {/* "במשפט הבא:" label above terminal */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          width: "100%",
          textAlign: "center",
          opacity: labelIn,
          transform: `translateY(${(1 - labelIn) * 15}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textMuted,
            direction: "rtl",
          }}
        >
במשפט הבא:
        </span>
      </div>

      {/* Terminal window */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: "80%",
          opacity: terminalIn,
          transform: `scale(${terminalIn})`,
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
          {/* Sentence RTL — words synced to Whisper */}
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
            {SENTENCE_WORDS.map((word, i) => {
              const wordFrame = Math.round(word.time * 30);
              const wordVisible = frame >= wordFrame;
              if (!wordVisible) return null;

              const highlightProgress = interpolate(
                frame - wordFrame,
                [0, 12],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );

              const isLastWord = word.text === "ל...";

              return (
                <span
                  key={i}
                  style={{
                    color: isLastWord ? COLORS.primary : COLORS.text,
                    textShadow:
                      highlightProgress > 0
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
            {frame >= 140 && (
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

      {/* Bottom hint — "מה המילה הבאה הסבירה ביותר?" */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: "100%",
          textAlign: "center",
          opacity: interpolate(frame, [290, 315], [0, 1], {
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
