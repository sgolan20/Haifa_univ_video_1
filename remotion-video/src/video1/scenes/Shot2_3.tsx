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

/**
 * Shot 2.3 — "Word by Word" prediction visualization (18 seconds)
 * Shows how a language model "chooses" words by statistical prediction.
 * A sentence builds word by word — for each new word, a candidate panel
 * appears with probability bars. The highest-probability word gets selected
 * and drops into the sentence.
 * Narration (64-82s): "חשוב להדגיש: מודל השפה אינו 'חושב' או 'מבין' במובן האנושי..."
 */

const PROMPT_TEXT = "השמיים היום";

const WORD_STEPS = [
  {
    candidates: [
      { word: "נראים", prob: 45 },
      { word: "צבועים", prob: 22 },
      { word: "מלאים", prob: 18 },
      { word: "היו", prob: 15 },
    ],
  },
  {
    candidates: [
      { word: "כחולים", prob: 55 },
      { word: "אפורים", prob: 20 },
      { word: "בהירים", prob: 15 },
      { word: "יפים", prob: 10 },
    ],
  },
  {
    candidates: [
      { word: "וברורים", prob: 40 },
      { word: "במיוחד", prob: 25 },
      { word: "מאוד", prob: 20 },
      { word: "ונקיים", prob: 15 },
    ],
  },
  {
    candidates: [
      { word: "במיוחד", prob: 42 },
      { word: "מתמיד", prob: 25 },
      { word: "כרגיל", prob: 20 },
      { word: "לגמרי", prob: 13 },
    ],
  },
];

const WORD_CYCLE = 100;
const FIRST_WORD_START = 70;

export const Shot2_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleIn = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Prompt entrance
  const promptIn = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 90 },
  });

  // Determine word states
  const settledWords: string[] = [];
  let activeWordIndex = -1;

  for (let i = 0; i < WORD_STEPS.length; i++) {
    const wordStart = FIRST_WORD_START + i * WORD_CYCLE;
    const localFrame = frame - wordStart;
    if (localFrame >= 85) {
      settledWords.push(WORD_STEPS[i].candidates[0].word);
    } else if (localFrame >= 0) {
      activeWordIndex = i;
      break;
    } else {
      break;
    }
  }

  const allDone = settledWords.length === WORD_STEPS.length;

  // Summary appears after all words settled
  const summaryStart = FIRST_WORD_START + WORD_STEPS.length * WORD_CYCLE;
  const summaryIn = spring({
    frame: frame - summaryStart,
    fps,
    config: { damping: 16, stiffness: 90 },
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
          top: 55,
          width: "100%",
          textAlign: "center",
          opacity: titleIn,
          transform: `scale(${titleIn})`,
          direction: "rtl",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 600,
            color: COLORS.primary,
            letterSpacing: 3,
          }}
        >
          חיזוי המילה הבאה
        </span>
      </div>

      {/* Candidate selection panel */}
      {activeWordIndex >= 0 &&
        (() => {
          const wordStart = FIRST_WORD_START + activeWordIndex * WORD_CYCLE;
          const localFrame = frame - wordStart;
          const { candidates } = WORD_STEPS[activeWordIndex];

          const panelIn = spring({
            frame: localFrame,
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          const panelOut = interpolate(localFrame, [65, 80], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const selectHighlight = interpolate(localFrame, [45, 55], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              style={{
                position: "absolute",
                top: "16%",
                left: "50%",
                transform: `translateX(-50%) scale(${panelIn})`,
                opacity: Math.min(panelIn, panelOut),
                width: 650,
                padding: "28px 40px",
                borderRadius: 20,
                background: "rgba(10, 14, 26, 0.92)",
                border: `2px solid ${COLORS.primary}44`,
                boxShadow: `0 0 60px ${COLORS.primary}15, 0 20px 40px rgba(0,0,0,0.5)`,
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Panel header */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 22,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  marginBottom: 22,
                  textAlign: "center",
                  direction: "rtl",
                }}
              >
                ?המילה הבאה
              </div>

              {candidates.map((c, j) => {
                const barWidth = interpolate(
                  localFrame,
                  [8 + j * 5, 35 + j * 5],
                  [0, c.prob],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                );

                const isSelected = j === 0;
                const glowAmount = isSelected ? selectHighlight : 0;

                return (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      padding: "8px 14px",
                      borderRadius: 10,
                      background:
                        isSelected && glowAmount > 0.3
                          ? `rgba(0, 212, 255, ${glowAmount * 0.12})`
                          : "transparent",
                      border:
                        isSelected && glowAmount > 0.3
                          ? `2px solid rgba(0, 212, 255, ${glowAmount * 0.6})`
                          : "2px solid transparent",
                      boxShadow:
                        isSelected && glowAmount > 0.5
                          ? `0 0 20px ${COLORS.primary}44`
                          : "none",
                    }}
                  >
                    {/* Word */}
                    <div
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 30,
                        fontWeight: isSelected ? 700 : 400,
                        color:
                          isSelected && glowAmount > 0.5
                            ? COLORS.primary
                            : COLORS.text,
                        width: 130,
                        textAlign: "right",
                        direction: "rtl",
                      }}
                    >
                      {c.word}
                    </div>

                    {/* Probability bar */}
                    <div
                      style={{
                        flex: 1,
                        height: 24,
                        borderRadius: 6,
                        background: `${COLORS.textMuted}15`,
                        marginRight: 20,
                        marginLeft: 20,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${barWidth}%`,
                          height: "100%",
                          borderRadius: 6,
                          background: isSelected
                            ? `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primary}cc)`
                            : `${COLORS.secondary}66`,
                          boxShadow:
                            isSelected && glowAmount > 0
                              ? `0 0 12px ${COLORS.primary}66`
                              : "none",
                        }}
                      />
                    </div>

                    {/* Percentage */}
                    <div
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 24,
                        fontWeight: 600,
                        color: isSelected ? COLORS.primary : COLORS.textMuted,
                        width: 55,
                        textAlign: "left",
                        direction: "ltr",
                      }}
                    >
                      {Math.round(barWidth)}%
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}

      {/* Growing sentence */}
      <div
        style={{
          position: "absolute",
          top: "68%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "rtl",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {/* Prompt words */}
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.text,
            opacity: promptIn,
          }}
        >
          {PROMPT_TEXT}
        </span>

        {/* Settled words */}
        {settledWords.map((word, i) => (
          <span
            key={i}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 48,
              fontWeight: 700,
              color: COLORS.primary,
            }}
          >
            {word}
          </span>
        ))}

        {/* Active word dropping in */}
        {activeWordIndex >= 0 &&
          (() => {
            const wordStart =
              FIRST_WORD_START + activeWordIndex * WORD_CYCLE;
            const localFrame = frame - wordStart;
            const dropProgress = interpolate(localFrame, [50, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            if (dropProgress <= 0) return null;

            return (
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 48,
                  fontWeight: 700,
                  color: COLORS.primary,
                  opacity: dropProgress,
                  transform: `translateY(${(1 - dropProgress) * -40}px)`,
                  display: "inline-block",
                }}
              >
                {WORD_STEPS[activeWordIndex].candidates[0].word}
              </span>
            );
          })()}

        {/* Blinking cursor */}
        {!allDone && frame > 30 && (
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 48,
              fontWeight: 300,
              color: COLORS.primary,
              opacity: Math.sin(frame * 0.15) > 0 ? 0.8 : 0.2,
            }}
          >
            ▌
          </span>
        )}
      </div>

      {/* Bottom summary */}
      {allDone && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            width: "100%",
            textAlign: "center",
            opacity: summaryIn,
            transform: `scale(${summaryIn})`,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "18px 50px",
              borderRadius: 16,
              background: `${COLORS.primary}18`,
              border: `2px solid ${COLORS.primary}66`,
              boxShadow: `0 0 30px ${COLORS.primary}22`,
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.primary,
              direction: "rtl",
            }}
          >
            לא &quot;חושב&quot; — חוזה את המילה הבאה
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
