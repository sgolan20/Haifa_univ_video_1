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
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * Shot 4.1 — "מה זה אומר עבורכם כסטודנטים?"
 *
 * Duration: 873 frames (29.09s)
 *
 * Phase 1 (f0-323):    Title + responsibility statement
 * Rule 1 (f308-401):   Don't rely without verification
 * Rule 2 (f388-561):   Check details
 * Rule 3 (f548-705):   Starting point, not authority
 * Rule 4 (f692-873):   Convincing style ≠ correct info
 *
 * Whisper by_shot aligned (audioStart=86.97s):
 *   f3    (0.09s)  "מה זה אומר עבורכם כסטודנטים?"
 *   f88   (2.93s)  "המשמעות היא שאחריות לשימוש נכון בכלים האלה"
 *   f191  (6.35s)  "היא תמיד של המשתמש"
 *   f237  (7.89s)  "כמה כללים חשובים"
 *   f323  (10.77s) → Rule 1: "אל תסתמכו על תשובות עובדתיות בלי אימות"
 *   f401  (13.37s) → Rule 2: "בדקו במיוחד שמות חוקרים, תאריכים..."
 *   f561  (18.71s) → Rule 3: "השתמשו במודל כנקודת פתיחה לחשיבה"
 *   f650  (21.65s)   "לא כמקור סמכות"
 *   f705  (23.49s) → Rule 4: "וזיכרו, סגנון משכנע אינו ערובה..."
 *   f862  (28.72s)   ↑ ends
 */

/* ── Rule data ── */

const RULES = [
  {
    num: 1,
    text: "אל תסתמכו על תשובות עובדתיות בלי אימות",
    color: COLORS.primary,
    image: "video2b/images/shot4_1_rule1.png",
  },
  {
    num: 2,
    text: "בדקו במיוחד: שמות חוקרים, תאריכים, נתונים ומקורות",
    color: COLORS.secondary,
    image: "video2b/images/shot4_1_rule2.png",
  },
  {
    num: 3,
    text: "השתמשו במודל כנקודת פתיחה לחשיבה — לא כמקור סמכות",
    color: "#22c55e",
    image: "video2b/images/shot4_1_rule3.png",
  },
  {
    num: 4,
    text: "סגנון משכנע אינו ערובה לכך שהמידע נכון",
    color: COLORS.accent,
    image: "video2b/images/shot4_1_rule4.png",
  },
];

/* ── Main Shot Component ── */

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Phase 1: Title + Responsibility ── */
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const responsibilityOpacity = interpolate(frame, [88, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const responsibilityY = interpolate(frame, [88, 110], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underlineWidth = interpolate(frame, [191, 230], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase1Opacity = interpolate(frame, [323, 345], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Rule phases (Whisper by_shot aligned, audioStart=86.97s) ──
   *  Rule 1 "אל" at 97.74s  → f323
   *  Rule 2 "בדקו" at 100.34s → f401
   *  Rule 3 "השתמשו" at 105.68s → f561
   *  Rule 4 "וזיכרו" at 110.46s → f705
   */
  const rulePhases = [
    { startIn: 308, startOut: 386, startFrame: 323 },
    { startIn: 388, startOut: 546, startFrame: 401 },
    { startIn: 548, startOut: 690, startFrame: 561 },
    { startIn: 692, startOut: 873, startFrame: 705 },
  ];

  return (
    <AbsoluteFill>
      {/* Background image */}
      <Img
        src={staticFile("video2b/images/shot4_1_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary}cc 0%, ${COLORS.bgPrimary}f5 70%)`,
        }}
      />

      {/* ══════════════ PHASE 1: TITLE + RESPONSIBILITY ══════════════ */}
      {frame < 340 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase1Opacity,
            gap: 36,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 60,
              fontWeight: 800,
              color: COLORS.primary,
              direction: "rtl",
              textAlign: "center",
              transform: `scale(${titleScale})`,
              textShadow: `0 0 50px ${COLORS.primary}66, 0 2px 12px rgba(0,0,0,0.6)`,
              letterSpacing: "-1px",
            }}
          >
            מה זה אומר עבורכם כסטודנטים?
          </div>

          <div
            style={{
              opacity: responsibilityOpacity,
              transform: `translateY(${responsibilityY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 40,
                fontWeight: 600,
                color: COLORS.accent,
                direction: "rtl",
                textAlign: "center",
                textShadow: `0 0 30px ${COLORS.accent}55`,
              }}
            >
              האחריות היא תמיד של המשתמש
            </div>
            <div
              style={{
                width: `${underlineWidth}%`,
                maxWidth: 500,
                height: 3,
                background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      )}

      {/* ══════════════ RULE CARDS ══════════════ */}
      {RULES.map((rule, i) => {
        const phase = rulePhases[i];
        const isLastRule = i === 3;

        const ruleOpacity = isLastRule
          ? interpolate(frame, [phase.startIn, phase.startIn + 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : interpolate(
              frame,
              [phase.startIn, phase.startIn + 25, phase.startOut, phase.startOut + 20],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

        const imageScale = spring({
          frame: frame - phase.startFrame,
          fps,
          config: { damping: 16, stiffness: 80, mass: 0.8 },
        });

        const textOpacity = interpolate(
          frame,
          [phase.startFrame + 8, phase.startFrame + 28],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const textY = interpolate(
          frame,
          [phase.startFrame + 8, phase.startFrame + 28],
          [25, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const showFrom = phase.startIn;
        const showUntil = isLastRule ? 873 : phase.startOut + 40;

        if (frame < showFrom || frame >= showUntil) return null;

        return (
          <div
            key={rule.num}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: ruleOpacity,
              direction: "rtl",
            }}
          >
            {/* Card container */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 60,
                maxWidth: 1200,
              }}
            >
              {/* Illustration */}
              <div
                style={{
                  flex: "0 0 320",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${imageScale})`,
                  opacity: imageScale,
                }}
              >
                <Img
                  src={staticFile(rule.image)}
                  style={{
                    width: 320,
                    height: 320,
                    objectFit: "contain",
                    filter: `drop-shadow(0 0 30px ${rule.color}44)`,
                  }}
                />
              </div>

              {/* Text side */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  opacity: textOpacity,
                  transform: `translateY(${textY}px)`,
                }}
              >
                {/* Rule number badge */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `${rule.color}22`,
                    border: `2px solid ${rule.color}66`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_FAMILY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: rule.color,
                    boxShadow: `0 0 20px ${rule.color}33`,
                  }}
                >
                  {rule.num}
                </div>

                {/* Rule text */}
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 42,
                    fontWeight: 700,
                    color: COLORS.text,
                    direction: "rtl",
                    textAlign: "right",
                    lineHeight: 1.5,
                    textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {rule.text}
                </div>

                {/* Accent line */}
                <div
                  style={{
                    width: 120,
                    height: 3,
                    background: `linear-gradient(to left, ${rule.color}, transparent)`,
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
