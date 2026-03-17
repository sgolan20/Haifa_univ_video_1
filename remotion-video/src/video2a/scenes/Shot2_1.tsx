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
 * Shot 2.1 — What are Hallucinations? (960 frames, 32s)
 *
 * Narration sync (frames relative to shot start):
 *   f13-50:   "מהן Hallucinations" (27.44-28.66)
 *   f71-245:  "Hallucination...אמין ומדויק" (29.36-35.18)
 *   f261-367: "אך בפועל...אמיתי" (35.70-39.24)
 *   f389-416: "חשוב לציין" (39.98-40.88)
 *   f432-581: "במודלים הראשונים...בולטות" (41.40-46.38)
 *   f593-681: "למשל ציטוטים...קיימים" (46.78-49.70)
 *   f698-887: "המודלים כיום...לזיהוי" (50.28-56.56)
 *   f902-946: "בואו נראה כמה דוגמאות" (57.06-58.54)
 *
 * Animation phases:
 *   Phase 1 (0-370):   Definition with mask reveal — two overlapping rectangles
 *   Phase 2 (370-870): Timeline: early vs current models
 *   Phase 3 (890-960): Transition to examples — 3 numbered circles
 */

// Timeline data — early models
const EARLY_CARDS = [
  { emoji: "📄", text: "מאמר שלא קיים", delay: 510 },
  { emoji: "💬", text: "ציטוט שהומצא", delay: 560 },
];

// Timeline data — current models
const CURRENT_CARDS = [
  { emoji: "📊", text: "נתון שנשמע אמין", delay: 770 },
  { emoji: "📚", text: "ייחוס שנראה סביר", delay: 840 },
];


export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =====================
  // Background image
  // =====================
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 1 (0-350): Definition with mask reveal
  // =====================

  // Section title spring entrance
  const sectionTitleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const sectionTitleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 1 fade out
  const phase1FadeOut = interpolate(frame, [340, 370], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rectangle 1 (top layer — turquoise border) spring entrance
  const rect1Scale = spring({
    frame: frame - 70,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const rect1Opacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rectangle 2 (bottom layer — warning/red border) spring entrance
  const rect2Scale = spring({
    frame: frame - 261,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const rect2Opacity = interpolate(frame, [261, 281], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 2 (350-700): Timeline
  // =====================

  const phase2Active = frame >= 370;

  // Phase 2 fade in
  const phase2Opacity = interpolate(frame, [370, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 stays visible until end (no fade out)
  const phase2FadeOut = 1;

  // Timeline line grows from left to right
  const timelineWidth = interpolate(frame, [390, 530], [0, 700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left point (early models) entrance
  const leftPointScale = spring({
    frame: frame - 395,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const leftPointOpacity = interpolate(frame, [395, 415], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right point (current models) entrance
  const rightPointScale = spring({
    frame: frame - 700,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const rightPointOpacity = interpolate(frame, [700, 720], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* AI-generated background image */}
      <Img
        src={staticFile("video2a/images/shot2_1_document_cracks.png")}
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

      {/* ===== Phase 1: Definition with mask reveal ===== */}
      {frame < 390 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: phase1FadeOut,
          }}
        >
          {/* Section title: "?Hallucinations מהן" */}
          <div
            style={{
              position: "absolute",
              top: 120,
              width: "100%",
              textAlign: "center",
              opacity: sectionTitleOpacity,
              transform: `scale(${sectionTitleScale})`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 56,
                fontWeight: 700,
                color: COLORS.primary,
                direction: "rtl",
                textShadow: `0 0 30px ${COLORS.primary}44`,
              }}
            >
              ?Hallucinations מהן
            </div>
          </div>

          {/* Overlapping rectangles container */}
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 740,
              height: 360,
            }}
          >
            {/* Rectangle 2 (below rectangle 1 — warning/red, initially hidden) */}
            <div
              style={{
                position: "absolute",
                top: 120,
                left: 0,
                width: "100%",
                padding: 24,
                borderRadius: 16,
                background: `${COLORS.bgPrimary}ee`,
                border: `2px solid ${COLORS.warning}66`,
                boxShadow: `0 0 20px ${COLORS.warning}22`,
                opacity: rect2Opacity,
                transform: `scale(${rect2Scale})`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                direction: "rtl",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.warning,
                  flexShrink: 0,
                }}
              >
                ✗
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 32,
                  fontWeight: 500,
                  color: COLORS.warning,
                  direction: "rtl",
                  textAlign: "right",
                  lineHeight: 1.5,
                }}
              >
                שגוי או לא מבוסס על מקור אמיתי
              </div>
            </div>

            {/* Rectangle 1 (top layer — turquoise, stays in place) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                padding: 24,
                borderRadius: 16,
                background: `${COLORS.bgPrimary}f5`,
                border: `2px solid ${COLORS.primary}66`,
                boxShadow: `0 0 20px ${COLORS.primary}22`,
                opacity: rect1Opacity,
                transform: `scale(${rect1Scale})`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                direction: "rtl",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.primary,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 32,
                  fontWeight: 500,
                  color: COLORS.text,
                  direction: "rtl",
                  textAlign: "right",
                  lineHeight: 1.5,
                }}
              >
                מידע שנשמע אמין ומדויק
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Phase 2: Timeline — Early vs Current models ===== */}
      {phase2Active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: phase2Opacity * phase2FadeOut,
          }}
        >
          {/* SVG Timeline with animated line and markers */}
          <svg
            style={{
              position: "absolute",
              top: 270,
              left: "50%",
              transform: "translateX(-50%)",
              width: 800,
              height: 80,
              overflow: "visible",
            }}
          >
            {/* Glow filter for markers */}
            <defs>
              <filter id="timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COLORS.accent} />
                <stop offset="100%" stopColor={COLORS.warning} />
              </linearGradient>
            </defs>
            {/* Main timeline line with animated dash */}
            <line
              x1={400 - timelineWidth / 2}
              y1={30}
              x2={400 + timelineWidth / 2}
              y2={30}
              stroke="url(#timeline-grad)"
              strokeWidth={4}
              strokeLinecap="round"
            />
            {/* Glow line underneath */}
            <line
              x1={400 - timelineWidth / 2}
              y1={30}
              x2={400 + timelineWidth / 2}
              y2={30}
              stroke="url(#timeline-grad)"
              strokeWidth={10}
              strokeLinecap="round"
              opacity={0.15}
            />
            {/* Left marker circle (current models — accent/yellow) */}
            <circle
              cx={400 - 280}
              cy={30}
              r={12 * rightPointScale}
              fill={COLORS.accent}
              opacity={rightPointOpacity}
              filter="url(#timeline-glow)"
            />
            {/* Right marker circle (early models — warning/red) */}
            <circle
              cx={400 + 280}
              cy={30}
              r={12 * leftPointScale}
              fill={COLORS.warning}
              opacity={leftPointOpacity}
              filter="url(#timeline-glow)"
            />
          </svg>

          {/* Right point — Early models (2020-2022) */}
          <div
            style={{
              position: "absolute",
              top: 320,
              left: "calc(50% + 280px)",
              transform: `translateX(-50%) scale(${leftPointScale})`,
              opacity: leftPointOpacity,
              textAlign: "center",
            }}
          >
            {/* Year label */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 30,
                fontWeight: 700,
                color: COLORS.text,
                direction: "ltr",
                marginBottom: 6,
              }}
            >
              2020-2022
            </div>

            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.warning,
                direction: "rtl",
                marginBottom: 20,
              }}
            >
              מודלים ראשוניים
            </div>

            {/* Early model cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
              }}
            >
              {EARLY_CARDS.map((card, i) => {
                const cardScale = spring({
                  frame: frame - card.delay,
                  fps,
                  config: { damping: 16, stiffness: 90, mass: 0.8 },
                });

                const cardOpacity = interpolate(
                  frame,
                  [card.delay, card.delay + 15],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardOpacity,
                      transform: `scale(${cardScale})`,
                      padding: "10px 20px",
                      borderRadius: 10,
                      background: `${COLORS.bgPrimary}dd`,
                      border: `1px solid ${COLORS.warning}44`,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      direction: "rtl",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{card.emoji}</span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 28,
                        fontWeight: 500,
                        color: COLORS.warning,
                      }}
                    >
                      {card.text}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 28,
                        fontWeight: 700,
                        color: COLORS.warning,
                      }}
                    >
                      ✗
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Label: "הזיות בולטות" */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.warning,
                direction: "rtl",
                marginTop: 16,
              }}
            >
              הזיות בולטות
            </div>
          </div>

          {/* Left point — Current models (2024-2025) */}
          <div
            style={{
              position: "absolute",
              top: 320,
              left: "calc(50% - 280px)",
              transform: `translateX(-50%) scale(${rightPointScale})`,
              opacity: rightPointOpacity,
              textAlign: "center",
            }}
          >
            {/* Year label */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 30,
                fontWeight: 700,
                color: COLORS.text,
                direction: "ltr",
                marginBottom: 6,
              }}
            >
              2024-2025
            </div>

            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.accent,
                direction: "rtl",
                marginBottom: 20,
              }}
            >
              מודלים מתקדמים
            </div>

            {/* Current model cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
              }}
            >
              {CURRENT_CARDS.map((card, i) => {
                const cardScale = spring({
                  frame: frame - card.delay,
                  fps,
                  config: { damping: 16, stiffness: 90, mass: 0.8 },
                });

                const cardOpacity = interpolate(
                  frame,
                  [card.delay, card.delay + 15],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );

                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardOpacity,
                      transform: `scale(${cardScale})`,
                      padding: "10px 20px",
                      borderRadius: 10,
                      background: `${COLORS.bgPrimary}dd`,
                      border: `1px solid ${COLORS.accent}44`,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      direction: "rtl",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ fontSize: 28 }}>{card.emoji}</span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 28,
                        fontWeight: 500,
                        color: COLORS.accent,
                      }}
                    >
                      {card.text}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 28,
                        fontWeight: 700,
                        color: COLORS.accent,
                      }}
                    >
                      ⚠
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Label: "הזיות עדינות" */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.accent,
                direction: "rtl",
                marginTop: 16,
              }}
            >
              הזיות עדינות
            </div>
          </div>
        </div>
      )}


    </AbsoluteFill>
  );
};
