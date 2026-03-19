import React from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  staticFile,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 5.1 — Example 3: Summary Adds Info Not in Source (870 frames, 29.0s)
 *
 * Narration: "דוגמה 3 – סיכום שמוסיף מידע שלא הופיע במקור"
 *
 * Phases:
 *   1. Badge + Title (0–140)
 *   2. Split Screen: Original Article vs AI Summary (140–550)
 *   3. Highlight the Difference (550–870)
 */

// Original article lines with stagger delays
const ORIGINAL_LINES = [
  { text: "שימוש בטכנולוגיות דיגיטליות...", delay: 160 },
  { text: "מגביר מעורבות תלמידים...", delay: 185 },
  { text: "בסביבת כיתה...", delay: 210 },
  { text: "על פי מתודולוגיה מעורבת...", delay: 235 },
];

export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Badge + Title (0-140) ---

  const badgeScale = spring({
    frame: frame - 2,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const titleScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // --- Phase 2: Split screen cards (140-550) ---

  const originalCardIn = spring({
    frame: frame - 135,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const aiCardIn = spring({
    frame: frame - 230,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Typewriter effect for AI summary line 1
  const aiLine1Full = "שימוש בטכנולוגיות דיגיטליות מגביר מעורבות תלמידים,";
  const aiLine1Chars = Math.floor(
    interpolate(frame, [314, 414], [0, aiLine1Full.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // AI summary line 2 appears at f462
  const aiLine2Full = "במיוחד כאשר משלבים למידה שיתופית.";
  const aiLine2Chars = Math.floor(
    interpolate(frame, [462, 546], [0, aiLine2Full.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // --- Phase 3: Highlight the difference (550-860) ---

  const highlightIntensity = interpolate(frame, [500, 540], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const notMentionedIn = spring({
    frame: frame - 610,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const explanationOpacity = interpolate(frame, [714, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgOpacity = interpolate(frame, [0, 60], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card layout constants
  const CARD_WIDTH = 660;
  const CARD_GAP = 50;
  const CARDS_TOP = 430;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Background image */}
      <Img
        src={staticFile("video2a/images/shot5_1_academic_books.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
        }}
      />

      {/* ── Persistent title: "Hallucinations / הזיות" ── */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 104,
            fontWeight: 800,
            color: COLORS.primary,
            direction: "ltr",
            letterSpacing: 4,
            textShadow: `0 0 30px ${COLORS.primary}44`,
          }}
        >
          Hallucinations
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.text,
            marginRight: 30,
            marginLeft: 30,
          }}
        >
          /
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 88,
            fontWeight: 700,
            color: COLORS.text,
            direction: "rtl",
          }}
        >
          הזיות
        </span>
      </div>

      {/* Phase 1: Badge + Title */}
      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: badgeScale,
            transform: `scale(${badgeScale})`,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 800,
              color: COLORS.bgPrimary,
            }}
          >
            3
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.accent,
              direction: "rtl",
            }}
          >
            דוגמה
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 46,
            fontWeight: 700,
            color: COLORS.primary,
            direction: "rtl",
            textAlign: "center",
            opacity: titleScale,
            transform: `scale(${titleScale})`,
          }}
        >
          סיכום שמוסיף מידע שלא הופיע במקור
        </div>
      </div>

      {/* Phase 2 + 3: Split Screen Cards — centered with fixed widths */}
      {(
        <div
          style={{
            position: "absolute",
            top: CARDS_TOP,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: CARD_GAP,
            direction: "rtl",
          }}
        >
          {/* RIGHT card (RTL first) — Original Article */}
          <div
            style={{
              width: CARD_WIDTH,
              opacity: originalCardIn,
              transform: `scale(${0.9 + originalCardIn * 0.1})`,
              background: `rgba(34,197,94,0.06)`,
              border: "2px solid #22c55e",
              borderRadius: 16,
              padding: "28px 36px",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
                direction: "rtl",
              }}
            >
              <span style={{ fontSize: 30 }}>📄</span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                מאמר מקורי
              </span>
            </div>

            {/* Lines */}
            {ORIGINAL_LINES.map((line, i) => {
              const lineOpacity = interpolate(
                frame,
                [line.delay - 10, line.delay + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                    opacity: lineOpacity,
                    direction: "rtl",
                  }}
                >
                  <span
                    style={{
                      color: "#22c55e",
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 28,
                      color: COLORS.textMuted,
                      lineHeight: 1.7,
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* LEFT card (RTL second) — AI Summary */}
          <div
            style={{
              width: CARD_WIDTH,
              opacity: aiCardIn,
              transform: `scale(${0.9 + aiCardIn * 0.1})`,
              background: `rgba(0,212,255,0.06)`,
              border: `2px solid ${COLORS.primary}`,
              borderRadius: 16,
              padding: "28px 36px",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
                direction: "rtl",
              }}
            >
              <span style={{ fontSize: 30 }}>🤖</span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.text,
                }}
              >
                סיכום AI
              </span>
            </div>

            {/* AI Line 1 — typewriter */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                color: COLORS.text,
                lineHeight: 1.7,
                marginBottom: 12,
                direction: "rtl",
                textAlign: "right",
              }}
            >
              {aiLine1Full.slice(0, aiLine1Chars)}
              {aiLine1Chars < aiLine1Full.length && aiLine1Chars > 0 && (
                <span
                  style={{
                    borderLeft: `2px solid ${COLORS.primary}`,
                    marginLeft: 2,
                  }}
                />
              )}
            </div>

            {/* AI Line 2 — highlighted in red */}
            {frame >= 462 && (
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 28,
                  color: COLORS.warning,
                  lineHeight: 1.7,
                  direction: "rtl",
                  textAlign: "right",
                  background:
                    highlightIntensity > 0
                      ? `rgba(239,68,68,${0.12 + highlightIntensity * 0.15})`
                      : "rgba(239,68,68,0.08)",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontWeight: highlightIntensity > 0 ? 700 : 400,
                  border: highlightIntensity > 0.5
                    ? `1px solid ${COLORS.warning}66`
                    : "1px solid transparent",
                }}
              >
                {aiLine2Full.slice(0, aiLine2Chars)}
                {aiLine2Chars < aiLine2Full.length && aiLine2Chars > 0 && (
                  <span
                    style={{
                      borderLeft: `2px solid ${COLORS.warning}`,
                      marginLeft: 2,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Phase 3: "Not mentioned" label + explanation — centered below cards */}
      {frame >= 570 && (
        <div
          style={{
            position: "absolute",
            top: 830,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          {/* "Not mentioned" banner */}
          <div
            style={{
              opacity: notMentionedIn,
              transform: `scale(${notMentionedIn})`,
              display: "flex",
              alignItems: "center",
              gap: 12,
              direction: "rtl",
              padding: "14px 36px",
              borderRadius: 12,
              background: `rgba(239,68,68,0.12)`,
              border: `2px solid ${COLORS.warning}55`,
              boxShadow: `0 0 20px ${COLORS.warning}22`,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 38,
                fontWeight: 700,
                color: COLORS.warning,
              }}
            >
              ✗
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.warning,
              }}
            >
              לא הוזכר במקור!
            </span>
          </div>

          {/* Explanation */}
          <div
            style={{
              opacity: explanationOpacity,
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 30,
                color: COLORS.textMuted,
                direction: "rtl",
              }}
            >
              המודל הוסיף רעיון שנשמע הגיוני
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
