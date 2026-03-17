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
 * Shot 3.1 — Example 1: Research Attribution (1005 frames, 33.5s)
 *
 * Phase 1 (0-300): Badge + Title + User question in chat (typewriter)
 * Phase 2 (300-580): AI typing indicator → AI response (typewriter)
 * Phase 3 (580-680): "Looks convincing" — green glow + checkmark
 * Phase 4 (676-1005): Deconstruction — highlight parts, slide-out cards, summary
 */

const USER_QUESTION = "איזה מחקר הראה שאוטונומיה מגבירה מוטיבציה בלמידה?";
const AI_RESPONSE =
  "מחקר משנת 2014 של דסי וריאן מצא שאוטונומיה היא גורם מרכזי במוטיבציה בלמידה.";

const CLAMP = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

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

// Deconstruction card
const DeconCard: React.FC<{
  label: string;
  valid: boolean;
  frame: number;
  startFrame: number;
  fps: number;
}> = ({ label, valid, frame, startFrame, fps }) => {
  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], CLAMP);
  const borderColor = valid ? "#22c55e" : COLORS.warning;
  const symbol = valid ? " \u2713" : " \u2717";

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: valid
          ? "rgba(34,197,94,0.1)"
          : "rgba(239,68,68,0.1)",
        border: `2px solid ${borderColor}`,
        borderRadius: 12,
        padding: "10px 18px",
        marginBottom: 10,
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        fontWeight: 600,
        color: borderColor,
        direction: "rtl" as const,
        textAlign: "right" as const,
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
      {symbol}
    </div>
  );
};

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Badge animation ──
  const badgeScale = spring({
    frame: frame - 2,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const badgeOpacity = interpolate(frame, [0, 10], [0, 1], CLAMP);

  // ── Title animation ──
  const titleScale = spring({
    frame: frame - 42,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const titleOpacity = interpolate(frame, [40, 52], [0, 1], CLAMP);

  // ── Chat window entrance ──
  const chatOpacity = interpolate(frame, [90, 110], [0, 1], CLAMP);

  // ── User message typewriter (frames 120-290) ──
  const userCharCount = USER_QUESTION.length;
  const userVisibleChars =
    frame >= 120
      ? Math.floor(
          interpolate(
            frame - 120,
            [0, userCharCount * 1.5],
            [0, userCharCount],
            CLAMP
          )
        )
      : 0;
  const userCursorOpacity =
    frame >= 120 && frame < 310 ? (Math.sin(frame * 0.2) > 0 ? 1 : 0) : 0;

  // ── Typing indicator (frames 315-360) ──
  const typingVisible = frame >= 315 && frame < 360;

  // ── AI response typewriter (frames 360-580) ──
  const aiCharCount = AI_RESPONSE.length;
  const aiVisibleChars =
    frame >= 360
      ? Math.floor(
          interpolate(
            frame - 360,
            [0, aiCharCount * 1.5],
            [0, aiCharCount],
            CLAMP
          )
        )
      : 0;
  const aiCursorOpacity =
    frame >= 360 && frame < 590 ? (Math.sin(frame * 0.2) > 0 ? 1 : 0) : 0;
  const aiResponseVisible = frame >= 360;

  // ── Phase 3: Green glow (frames 598-680) ──
  const isConvincingPhase = frame >= 598 && frame < 700;
  const greenGlowOpacity = interpolate(frame, [598, 628], [0, 1], CLAMP);
  const checkScale =
    frame >= 600
      ? spring({
          frame: frame - 600,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        })
      : 0;
  const convincingTextOpacity = interpolate(frame, [620, 640], [0, 1], CLAMP);

  // ── Phase 4: Deconstruction (frames 676-1005) ──
  const isDeconPhase = frame >= 676;
  const warningIconScale =
    frame >= 676
      ? spring({
          frame: frame - 676,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        })
      : 0;
  const shakeX =
    frame >= 676 && frame < 716 ? Math.sin(frame * 2.5) * 2 : 0;

  // Glow transition: green → orange
  const glowColor = isDeconPhase
    ? interpolate(frame, [676, 716], [0, 1], CLAMP)
    : 0;
  const glowStyle = isConvincingPhase
    ? `0 0 20px rgba(34,197,94,${0.3 * greenGlowOpacity})`
    : isDeconPhase
    ? `0 0 20px rgba(${Math.round(34 + (245 - 34) * glowColor)},${Math.round(
        197 - (197 - 158) * glowColor
      )},${Math.round(94 - 94 * glowColor)},0.3)`
    : "none";

  // Highlight portions in the AI response
  const renderAIResponseText = () => {
    const text = AI_RESPONSE;
    if (frame < 830) {
      return <>{text}</>;
    }

    // Segments to highlight
    const segments: {
      start: number;
      end: number;
      color: string;
      highlightFrame: number;
    }[] = [
      // "דסי וריאן" - real researchers
      {
        start: text.indexOf("דסי וריאן"),
        end: text.indexOf("דסי וריאן") + "דסי וריאן".length,
        color: "rgba(34,197,94,0.3)",
        highlightFrame: 830,
      },
      // "2014" - plausible year
      {
        start: text.indexOf("2014"),
        end: text.indexOf("2014") + "2014".length,
        color: "rgba(239,68,68,0.3)",
        highlightFrame: 950,
      },
      // "אוטונומיה" ... "מוטיבציה" - correct idea
      {
        start: text.indexOf("אוטונומיה היא גורם מרכזי במוטיבציה"),
        end:
          text.indexOf("אוטונומיה היא גורם מרכזי במוטיבציה") +
          "אוטונומיה היא גורם מרכזי במוטיבציה".length,
        color: "rgba(34,197,94,0.3)",
        highlightFrame: 914,
      },
    ];

    // Build spans
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    const sortedSegs = segments
      .filter((s) => s.start >= 0 && frame >= s.highlightFrame)
      .sort((a, b) => a.start - b.start);

    for (const seg of sortedSegs) {
      if (seg.start > lastIdx) {
        parts.push(text.slice(lastIdx, seg.start));
      }
      const hlOpacity = interpolate(
        frame,
        [seg.highlightFrame, seg.highlightFrame + 15],
        [0, 1],
        CLAMP
      );
      parts.push(
        <span
          key={seg.start}
          style={{
            background: seg.color,
            borderRadius: 4,
            padding: "2px 4px",
            opacity: hlOpacity,
          }}
        >
          {text.slice(seg.start, seg.end)}
        </span>
      );
      lastIdx = seg.end;
    }
    if (lastIdx < text.length) {
      parts.push(text.slice(lastIdx));
    }
    return <>{parts}</>;
  };

  // Summary card (frame 975)
  const summaryOpacity = interpolate(frame, [975, 995], [0, 1], CLAMP);
  const summaryScale =
    frame >= 975
      ? spring({
          frame: frame - 975,
          fps,
          config: { damping: 16, stiffness: 90, mass: 0.8 },
        })
      : 0;

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
            1
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
          ייחוס מחקר לא מדויק
        </div>
      </div>

      {/* ── Chat Window ── */}
      <div
        style={{
          position: "absolute",
          top: 190,
          left: "50%",
          transform: `translateX(calc(-50% + ${shakeX}px))`,
          width: 850,
          maxWidth: 850,
          opacity: chatOpacity,
          background: "rgba(0,0,0,0.4)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: glowStyle,
          overflow: "hidden",
          transition: "box-shadow 0.3s",
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
          {frame >= 100 && (
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
                  {frame < 750 ? (
                    <>
                      {AI_RESPONSE.slice(0, aiVisibleChars)}
                      <span
                        style={{
                          opacity: aiCursorOpacity,
                          color: COLORS.primary,
                          fontWeight: 300,
                        }}
                      >
                        |
                      </span>
                    </>
                  ) : (
                    renderAIResponseText()
                  )}
                </div>
                {/* Checkmarks */}
                {frame >= 560 && (
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

      {/* ── Phase 3: Convincing indicator ── */}
      {isConvincingPhase && (
        <>
          {/* SVG animated checkmark — centered below chat */}
          <div
            style={{
              position: "absolute",
              top: 540,
              left: "50%",
              transform: `translate(-50%, 0) scale(${checkScale})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <svg width="110" height="110" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 0 12px rgba(34,197,94,0.6))" }}>
              <circle cx="12" cy="12" r="10" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity={0.3} />
              <path
                d="M6 13l4 4L18 7"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={20}
                strokeDashoffset={20 * (1 - interpolate(frame, [590, 620], [0, 1], CLAMP))}
              />
            </svg>

            {/* "Looks convincing" text — right under checkmark */}
            <div
              style={{
                fontSize: 40,
                fontWeight: 600,
                color: "#22c55e",
                direction: "rtl",
                opacity: convincingTextOpacity,
                textShadow: "0 0 20px rgba(34,197,94,0.3)",
              }}
            >
              נשמע מאוד משכנע...
            </div>
          </div>
        </>
      )}

      {/* ── Phase 4: Warning icon + Deconstruction cards (below chat) ── */}
      {isDeconPhase && (
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* Warning triangle */}
          <div style={{ transform: `scale(${warningIconScale})` }}>
            <svg width="100" height="100" viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 12px ${COLORS.warning}66)` }}>
              <path
                d="M12 2L1 21h22L12 2z"
                fill="none"
                stroke={COLORS.warning}
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <text
                x="12"
                y="18"
                textAnchor="middle"
                fill={COLORS.warning}
                fontSize="14"
                fontWeight="bold"
                fontFamily={FONT_FAMILY}
              >
                !
              </text>
            </svg>
          </div>

          {/* Cards in a horizontal row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: 20,
              justifyContent: "center",
            }}
          >
            {frame >= 830 && (
              <DeconCard
                label='חוקרים אמיתיים'
                valid={true}
                frame={frame}
                startFrame={830}
                fps={fps}
              />
            )}
            {frame >= 914 && (
              <DeconCard
                label='רעיון נכון'
                valid={true}
                frame={frame}
                startFrame={914}
                fps={fps}
              />
            )}
            {frame >= 950 && (
              <DeconCard
                label='שנה שנשמעת סבירה'
                valid={false}
                frame={frame}
                startFrame={950}
                fps={fps}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Phase 4: Summary card ── */}
      {frame >= 975 && (
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: "50%",
            transform: `translateX(-50%) scale(${summaryScale})`,
            opacity: summaryOpacity,
            background: "rgba(239,68,68,0.1)",
            border: `2px solid ${COLORS.warning}`,
            borderRadius: 16,
            padding: "16px 32px",
            direction: "rtl",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: COLORS.warning,
              lineHeight: 1.6,
            }}
          >
            המודל חיבר חלקים אמיתיים לתשובה שלא קיימת
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
