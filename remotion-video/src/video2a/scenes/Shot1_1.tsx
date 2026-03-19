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
 * Shot 1.1 — Opening (810 frames, 27.0s)
 *
 * Narration sync (frames relative to shot start):
 *   f0-26:    "שלום לכולם"
 *   f38-145:  "בסרטון הקודם למדנו כיצד מודלי שפה עובדים"
 *   f156-318: "הם חוזים מילים על בסיס דפוסים סטטיסטיים שלמדו מכמות עצומה של טקסטים"
 *   f338-424: "היום נדבר על אחת ההשלכות של עקרון הפעולה הזה"
 *   f442-503: "תופעה שנקראת Hallucinations," — word at f474
 *   f517-565: "או בעברית, הזיות." — word "הזיות" at f551
 *   f590-802: "זו תופעה חשובה להבנה במיוחד כאשר משתמשים בבינה מלאכותית לצרכים אקדמיים ומקצועיים"
 *
 * Animation phases:
 *   Phase 1 (0-80):    Background image + Title "מודלי שפה" + subtitle recap
 *   Phase 2 (80-430):  Title moves up, 3 icon badges + neural network (matching narration recap)
 *   Phase 3 (440-590): "Hallucinations" reveals at f470 (synced to narration) + "הזיות" at f551
 *   Phase 4 (590-810): Glassmorphic card with summary text
 */

// Badge data
const BADGES = [
  { emoji: "🔮", label: "חיזוי", color: COLORS.secondary, delay: 155 },
  { emoji: "📊", label: "דפוסים סטטיסטיים", color: COLORS.primary, delay: 200 },
  { emoji: "⚡", label: "כמות עצומה", color: COLORS.accent, delay: 260 },
];

export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =====================
  // Phase 1 (0-80): Background image + Title + Subtitle
  // =====================

  // Background image fade-in
  const bgOpacity = interpolate(frame, [0, 60], [0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title spring entrance
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Title glow pulse (turquoise)
  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fade-in with 20 frame delay
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 2 (80-350): Title moves up, badges appear
  // =====================

  // Title vertical shift
  const titleTranslateY = interpolate(frame, [80, 140], [0, -200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title opacity in phase 2-3 (stays visible until phase 3 takes over)
  const titlePhase1Opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle fades away as title moves up
  const subtitleFadeOut = interpolate(frame, [80, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title fades out before phase 3
  const titleFadeForPhase3 = interpolate(frame, [400, 430], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge section visibility (extended to match narration recap)
  const badgesFadeOut = interpolate(frame, [400, 430], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 3 (440-590): "Hallucinations" reveal synced to narration
  // =====================

  const phase3Active = frame >= 440 && frame < 605;

  // Phase 3 title fade in (synced: narrator says "Hallucinations" at f474)
  const phase3TitleOpacity = interpolate(frame, [455, 475], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch effect: horizontal jitter after "Hallucinations" appears
  const glitchX =
    frame > 474 && frame < 545 ? Math.sin(frame * 2.5) * 2 : 0;

  // Color flicker: alternate between primary and warning
  const flickerColor =
    Math.sin(frame * 0.15) > 0 ? COLORS.primary : COLORS.warning;

  // "הזיות" spring entrance synced to narrator (f551)
  const hazayotScale = spring({
    frame: frame - 548,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const hazayotOpacity = interpolate(frame, [550, 565], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background hue shift: blue brain → red brain when "Hallucinations" appears
  const bgHueRotate = interpolate(frame, [440, 480], [0, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Boost saturation slightly during red phase for vividness
  const bgSaturate = interpolate(frame, [440, 480], [1, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red ambient glow pulsing (starts when "Hallucinations" appears)
  const redGlowOpacity =
    frame >= 470
      ? interpolate(Math.sin(frame * 0.06), [-1, 1], [0.05, 0.2], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Phase 3 fade out
  const phase3FadeOut = interpolate(frame, [570, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 4 (550-801): Title at top + glassmorphic card
  // =====================

  const phase4Active = frame >= 570;

  // Title moves to top area
  const phase4TitleOpacity = interpolate(frame, [570, 600], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glassmorphic card spring entrance
  const cardScale = spring({
    frame: frame - 605,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const cardOpacity = interpolate(frame, [605, 635], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card glow border pulse
  const cardGlow = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* AI-generated background image — hue shifts blue→red during Hallucinations phase */}
      <Img
        src={staticFile("video2a/images/shot1_1_brain_glitch.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,
          filter: `hue-rotate(${bgHueRotate}deg) saturate(${bgSaturate})`,
        }}
      />

      {/* Red ambient glow overlay (Phase 3) */}
      {redGlowOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            width: 900,
            height: 900,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${COLORS.warning} 0%, transparent 70%)`,
            opacity: redGlowOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ===== Phase 1 & 2: Recap title "מודלי שפה" ===== */}
      {frame < 440 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${titleTranslateY}px) scale(${titleScale})`,
            textAlign: "center",
            opacity: titlePhase1Opacity * titleFadeForPhase3,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 80,
              fontWeight: 800,
              color: COLORS.text,
              direction: "rtl",
              textShadow: `0 0 ${20 * glowPulse}px ${COLORS.primary}88, 0 0 ${40 * glowPulse}px ${COLORS.primary}44`,
            }}
          >
            מודלי שפה
          </div>

          {/* Subtitle — Phase 1 only */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 400,
              color: COLORS.textMuted,
              direction: "rtl",
              marginTop: 16,
              opacity: subtitleOpacity * subtitleFadeOut,
            }}
          >
            חזרה על העקרונות
          </div>
        </div>
      )}

      {/* ===== Phase 2: SVG Neural Network decoration ===== */}
      {frame >= 80 && frame < 440 && (
        <svg
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 400,
            opacity: 0.3 * badgesFadeOut,
            pointerEvents: "none",
          }}
        >
          {/* Animated nodes */}
          {[
            { x: 150, y: 100 },
            { x: 400, y: 200 },
            { x: 650, y: 100 },
            { x: 400, y: 350 },
          ].map((pos, i) => {
            const nodeScale = spring({
              frame: frame - 90 - i * 20,
              fps,
              config: { damping: 16, stiffness: 90, mass: 0.8 },
            });
            return (
              <circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r={12 * nodeScale}
                fill={COLORS.primary}
                opacity={0.6}
              />
            );
          })}
          {/* Connecting lines */}
          {[
            [0, 1],
            [1, 2],
            [1, 3],
            [0, 3],
          ].map(([a, b], i) => {
            const nodes = [
              { x: 150, y: 100 },
              { x: 400, y: 200 },
              { x: 650, y: 100 },
              { x: 400, y: 350 },
            ];
            const lineProgress = interpolate(
              frame,
              [100 + i * 15, 130 + i * 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <line
                key={i}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={
                  nodes[a].x +
                  (nodes[b].x - nodes[a].x) * lineProgress
                }
                y2={
                  nodes[a].y +
                  (nodes[b].y - nodes[a].y) * lineProgress
                }
                stroke={COLORS.primary}
                strokeWidth={1.5}
                opacity={0.4}
              />
            );
          })}
        </svg>
      )}

      {/* ===== Phase 2: Icon badges ===== */}
      {frame >= 80 && frame < 440 && (
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "row-reverse",
            gap: 100,
            opacity: badgesFadeOut,
          }}
        >
          {BADGES.map((badge, i) => {
            const badgeScale = spring({
              frame: frame - badge.delay,
              fps,
              config: { damping: 16, stiffness: 90, mass: 0.8 },
            });

            const badgeOpacity = interpolate(
              frame,
              [badge.delay, badge.delay + 15],
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
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  opacity: badgeOpacity,
                  transform: `scale(${badgeScale})`,
                }}
              >
                {/* Circle with emoji */}
                <div
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background: `${badge.color}18`,
                    border: `3px solid ${badge.color}66`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 88,
                    boxShadow: `0 0 30px ${badge.color}33`,
                  }}
                >
                  {badge.emoji}
                </div>
                {/* Label */}
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 56,
                    fontWeight: 600,
                    color: badge.color,
                    direction: "rtl",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge.label}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== Phase 3: Glitch "Hallucinations" + "הזיות" ===== */}
      {phase3Active && (
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: `translate(-50%, -50%) translateX(${glitchX}px)`,
            textAlign: "center",
            opacity: phase3TitleOpacity * phase3FadeOut,
          }}
        >
          {/* "Hallucinations" with color flicker */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 72,
              fontWeight: 800,
              color: flickerColor,
              direction: "ltr",
              letterSpacing: 3,
              textShadow: `0 0 30px ${flickerColor}66, 0 0 60px ${flickerColor}33`,
            }}
          >
            Hallucinations
          </div>

          {/* "הזיות" — spring entrance at frame 515 */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 56,
              fontWeight: 700,
              color: COLORS.text,
              direction: "rtl",
              marginTop: 20,
              opacity: hazayotOpacity,
              transform: `scale(${hazayotScale})`,
              textShadow: `0 0 20px ${COLORS.text}44`,
            }}
          >
            הזיות
          </div>
        </div>
      )}

      {/* ===== Phase 4: Title at top + Glassmorphic card ===== */}
      {phase4Active && (
        <>
          {/* "Hallucinations / הזיות" at top */}
          <div
            style={{
              position: "absolute",
              top: 100,
              width: "100%",
              textAlign: "center",
              opacity: phase4TitleOpacity,
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

          {/* Glassmorphic card */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${cardScale})`,
              opacity: cardOpacity,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: 40,
              boxShadow: `0 0 ${30 * cardGlow}px ${COLORS.primary}${Math.round(cardGlow * 100).toString(16).padStart(2, "0")}, inset 0 0 30px rgba(255,255,255,0.02)`,
              maxWidth: 800,
              width: "80%",
            }}
          >
            <div
              style={{
                direction: "rtl",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 44,
                  fontWeight: 600,
                  color: COLORS.text,
                  marginBottom: 16,
                  lineHeight: 1.5,
                }}
              >
                תופעה חשובה להבנה ב-AI
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 400,
                  color: COLORS.textMuted,
                  lineHeight: 1.5,
                }}
              >
                במיוחד לצרכים אקדמיים ומקצועיים
              </div>
            </div>
          </div>
        </>
      )}

    </AbsoluteFill>
  );
};
