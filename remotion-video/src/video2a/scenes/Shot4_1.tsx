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
 * Shot 4.1 — Example 2: Plausible Numerical Data (885 frames, 29.5s)
 *
 * Phase 1 (0-270): Badge + Title + User question in chat (typewriter)
 * Phase 2 (270-540): AI typing indicator → AI response with bold 65%
 * Phase 3 (545-885): 65% expands huge, floating numbers, missing source, glitch
 */

const USER_QUESTION = "האם סטודנטים מעדיפים למידה מקוונת?";
const AI_RESPONSE_BEFORE = "מחקרים מצביעים על כך שכ־";
const AI_RESPONSE_PERCENT = "65%";
const AI_RESPONSE_AFTER =
  " מהסטודנטים מעדיפים קורסים מקוונים בשל הגמישות שלהם.";
const AI_RESPONSE_FULL =
  AI_RESPONSE_BEFORE + AI_RESPONSE_PERCENT + AI_RESPONSE_AFTER;

const CLAMP = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const FLOATING_NUMBERS = [
  { value: "47%", x: 15, y: 25, size: 34 },
  { value: "72%", x: 78, y: 18, size: 38 },
  { value: "58%", x: 25, y: 72, size: 32 },
  { value: "83%", x: 70, y: 65, size: 42 },
  { value: "31%", x: 12, y: 50, size: 32 },
  { value: "69%", x: 82, y: 42, size: 36 },
  { value: "54%", x: 40, y: 80, size: 32 },
  { value: "91%", x: 60, y: 15, size: 40 },
];

// Typing indicator dot
const TypingDot: React.FC<{ frame: number; delay: number }> = ({
  frame,
  delay,
}) => {
  const opacity = interpolate(
    Math.sin((frame + delay * 8) * 0.15),
    [-1, 1],
    [0.3, 1]
  );
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: COLORS.primary,
        opacity,
        marginLeft: 6,
      }}
    />
  );
};

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Badge animation ──
  const badgeScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const badgeOpacity = interpolate(frame, [3, 12], [0, 1], CLAMP);

  // ── Title animation ──
  const titleScale = spring({
    frame: frame - 45,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const titleOpacity = interpolate(frame, [43, 55], [0, 1], CLAMP);

  // ── Chat window entrance ──
  const chatOpacity = interpolate(frame, [100, 120], [0, 1], CLAMP);

  // ── User message typewriter (bubble at f125, text at f207) ──
  const userCharCount = USER_QUESTION.length;
  const userVisibleChars =
    frame >= 155
      ? Math.floor(
          interpolate(
            frame - 155,
            [0, userCharCount * 1.5],
            [0, userCharCount],
            CLAMP
          )
        )
      : 0;
  const userCursorOpacity =
    frame >= 125 && frame < 280 ? (Math.sin(frame * 0.2) > 0 ? 1 : 0) : 0;

  // ── Typing indicator (frames 295-348) ──
  const typingVisible = frame >= 280 && frame < 330;

  // ── AI response typewriter (frames 348-565) ──
  const aiCharCount = AI_RESPONSE_FULL.length;
  const aiVisibleChars =
    frame >= 330
      ? Math.floor(
          interpolate(
            frame - 330,
            [0, aiCharCount * 1.5],
            [0, aiCharCount],
            CLAMP
          )
        )
      : 0;
  const aiCursorOpacity =
    frame >= 330 && frame < 540 ? (Math.sin(frame * 0.2) > 0 ? 1 : 0) : 0;
  const aiResponseVisible = frame >= 330;

  // ── Phase 3: Expansion (frames 580+) ──
  const isExpandPhase = frame >= 545;

  // Chat stays in place during phase 3
  const chatScale = 1;
  const chatTranslateX = 0;
  const chatTranslateY = 0;

  // Big 65% in center
  const bigPercentScale =
    frame >= 545
      ? spring({
          frame: frame - 545,
          fps,
          config: { damping: 14, stiffness: 80, mass: 0.8 },
        })
      : 0;

  // "מקור:" label (frame 682)
  const sourceOpacity = interpolate(frame, [645, 665], [0, 1], CLAMP);

  // Red "?" (frame 720)
  const questionMarkScale =
    frame >= 785
      ? spring({
          frame: frame - 785,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        })
      : 0;

  // "בלי מקור אמיתי מאחוריו" (frame 845)
  const noSourceOpacity = interpolate(frame, [820, 850], [0, 1], CLAMP);

  // Blinking cursor for empty source field
  const sourceCursorOpacity =
    frame >= 645 && frame < 785 ? (Math.sin(frame * 0.2) > 0 ? 1 : 0) : 0;

  // 65% glitch effect (frame 780+)
  const glitchX =
    frame > 760 ? Math.sin(frame * 3) * 1.5 : 0;
  const isColorFlash =
    frame > 760 && Math.sin(frame * 5) > 0.9;

  // Render AI response with highlighted 65%
  const renderAIText = () => {
    const visibleText = AI_RESPONSE_FULL.slice(0, aiVisibleChars);
    const percentStart = AI_RESPONSE_BEFORE.length;
    const percentEnd = percentStart + AI_RESPONSE_PERCENT.length;

    if (aiVisibleChars <= percentStart) {
      // Haven't reached 65% yet
      return <>{visibleText}</>;
    }

    const before = visibleText.slice(0, percentStart);
    const percentVisible = visibleText.slice(
      percentStart,
      Math.min(aiVisibleChars, percentEnd)
    );
    const after =
      aiVisibleChars > percentEnd ? visibleText.slice(percentEnd) : "";

    return (
      <>
        {before}
        <span
          style={{
            fontWeight: 700,
            color: COLORS.accent,
          }}
        >
          {percentVisible}
        </span>
        {after}
      </>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* ── Badge + Title (centered) ── */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            direction: "rtl",
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: COLORS.accent,
            }}
          >
            דוגמה
          </div>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.bgPrimary,
            }}
          >
            2
          </div>
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.primary,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          נתון מספרי שנשמע אמין
        </div>
      </div>

      {/* ── Chat Window ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: "50%",
          transform: `translateX(-50%) ${
            isExpandPhase
              ? `scale(${chatScale}) translate(${chatTranslateX}px, ${chatTranslateY}px)`
              : ""
          }`,
          width: 800,
          opacity: chatOpacity,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          transformOrigin: "top left",
        }}
      >
        {/* Chat header */}
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            direction: "rtl",
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: COLORS.textMuted,
              fontWeight: 500,
            }}
          >
            שיחה עם מודל שפה
          </span>
        </div>

        {/* Chat body */}
        <div style={{ padding: "16px 20px" }}>
          {/* User message */}
          {frame >= 125 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                direction: "rtl",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              >
                👤
              </div>
              <div
                style={{
                  background: "rgba(59,130,246,0.2)",
                  borderRadius: 12,
                  padding: 16,
                  flex: 1,
                  direction: "rtl",
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    color: COLORS.text,
                    lineHeight: 1.6,
                  }}
                >
                  {USER_QUESTION.slice(0, userVisibleChars)}
                  <span
                    style={{
                      opacity: userCursorOpacity,
                      color: COLORS.primary,
                      fontWeight: 300,
                    }}
                  >
                    |
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Typing indicator */}
          {typingVisible && (
            <div
              style={{
                display: "flex",
                gap: 10,
                direction: "rtl",
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 20, flexShrink: 0, marginTop: 4 }}>
                🤖
              </div>
              <div
                style={{
                  background: "rgba(0,212,255,0.1)",
                  borderRadius: 12,
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TypingDot frame={frame} delay={0} />
                <TypingDot frame={frame} delay={1} />
                <TypingDot frame={frame} delay={2} />
              </div>
            </div>
          )}

          {/* AI response */}
          {aiResponseVisible && (
            <div
              style={{
                display: "flex",
                gap: 10,
                direction: "rtl",
                marginBottom: 8,
              }}
            >
              <div style={{ fontSize: 20, flexShrink: 0, marginTop: 4 }}>
                🤖
              </div>
              <div
                style={{
                  background: "rgba(0,212,255,0.1)",
                  borderRadius: 12,
                  padding: 16,
                  flex: 1,
                  direction: "rtl",
                  textAlign: "right",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 30,
                    color: COLORS.text,
                    lineHeight: 1.6,
                  }}
                >
                  {renderAIText()}
                  <span
                    style={{
                      opacity: aiCursorOpacity,
                      color: COLORS.primary,
                      fontWeight: 300,
                    }}
                  >
                    |
                  </span>
                </div>
                {/* Checkmarks */}
                {frame >= 525 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 6,
                      left: 12,
                      fontSize: 14,
                      color: COLORS.textMuted,
                    }}
                  >
                    ✓✓
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Phase 3: SVG pulsing rings behind 65% ── */}
      {isExpandPhase && (() => {
        const ringRadius = 120 + Math.sin(frame * 0.05) * 15;
        return (
          <div
            style={{
              position: "absolute",
              top: "68%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          >
            <svg width="300" height="300" viewBox="0 0 300 300" style={{ display: "block" }}>
              <circle cx="150" cy="150" r={ringRadius} fill="none" stroke={COLORS.accent} strokeWidth="2" opacity={0.3} />
              <circle cx="150" cy="150" r={ringRadius * 0.7} fill="none" stroke={COLORS.accent} strokeWidth="1.5" opacity={0.2} />
              <circle cx="150" cy="150" r={ringRadius * 1.2} fill="none" stroke={COLORS.accent} strokeWidth="1" opacity={0.12} />
            </svg>
          </div>
        );
      })()}

      {/* ── Phase 3: Big 65% in center ── */}
      {isExpandPhase && (
        <div
          style={{
            position: "absolute",
            top: "68%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${bigPercentScale}) translateX(${glitchX}px)`,
            fontSize: 120,
            fontWeight: 800,
            color: isColorFlash ? COLORS.warning : COLORS.accent,
            textShadow: `0 0 30px ${COLORS.accent}66, 0 0 60px ${COLORS.accent}33`,
            letterSpacing: 4,
          }}
        >
          65%
        </div>
      )}

      {/* ── Phase 3: Floating random numbers ── */}
      {isExpandPhase &&
        FLOATING_NUMBERS.map((num, i) => {
          const delay = 645 + i * 15;
          const numOpacity = interpolate(
            frame,
            [delay, delay + 20],
            [0, 0.2 + (i % 3) * 0.05],
            CLAMP
          );
          const drift = frame >= delay ? (frame - delay) * 0.05 : 0;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${num.x}%`,
                top: `${num.y}%`,
                transform: `translateY(${-drift}px)`,
                fontSize: num.size,
                fontWeight: 600,
                color: COLORS.textMuted,
                opacity: numOpacity,
              }}
            >
              {num.value}
            </div>
          );
        })}

      {/* ── Phase 3: Missing source ── */}
      {frame >= 645 && (
        <div
          style={{
            position: "absolute",
            top: "82%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            direction: "rtl",
          }}
        >
          {/* "מקור:" with blinking cursor / question mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: sourceOpacity,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: COLORS.textMuted,
              }}
            >
              מקור:
            </span>
            <div
              style={{
                width: 200,
                height: 40,
                borderBottom: `2px solid ${COLORS.textMuted}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {frame < 785 ? (
                <span
                  style={{
                    opacity: sourceCursorOpacity,
                    color: COLORS.textMuted,
                    fontSize: 28,
                    fontWeight: 300,
                  }}
                >
                  |
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: COLORS.warning,
                    transform: `scale(${questionMarkScale})`,
                    display: "inline-block",
                  }}
                >
                  ?
                </span>
              )}
            </div>
          </div>

          {/* "בלי מקור אמיתי מאחוריו" */}
          <div
            style={{
              opacity: noSourceOpacity,
              fontSize: 34,
              fontWeight: 600,
              color: COLORS.warning,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            בלי מקור אמיתי מאחוריו
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
