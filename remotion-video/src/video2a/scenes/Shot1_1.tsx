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
 *   f40-148:  "בסרטון הקודם למדנו כיצד מודלי שפה עובדים"
 *   f160-321: "הם חוזים מילים על בסיס דפוסים סטטיסטיים שלמדו מכמות עצומה של טקסטים"
 *   f338-427: "היום נדבר על אחת ההשלכות של עקרון הפעולה הזה"
 *   f443-506: "תופעה שנקראת Hallucinations,"
 *   f525-566: "או בעברית, הזיות." — word "הזיות" at f554
 *   f590-802: "זו תופעה חשובה להבנה במיוחד כאשר משתמשים בבינה מלאכותית לצרכים אקדמיים ומקצועיים"
 *
 * Animation phases:
 *   Phase 1 (0-80):    Background image + Title "Hallucinations" + subtitle
 *   Phase 2 (80-350):  Title moves up, 3 icon badges appear staggered
 *   Phase 3 (350-570): Badges fade, glitch "Hallucinations" + "הזיות"
 *   Phase 4 (570-810): Glassmorphic card with summary text
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

  // Title "Hallucinations" spring entrance
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

  // Title fades out for phase 3 reappearance
  const titleFadeForPhase3 = interpolate(frame, [320, 350], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge section visibility
  const badgesFadeOut = interpolate(frame, [350, 380], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =====================
  // Phase 3 (350-550): Glitch "Hallucinations" + "הזיות"
  // =====================

  const phase3Active = frame >= 350 && frame < 605;

  // Phase 3 title fade in
  const phase3TitleOpacity = interpolate(frame, [350, 380], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch effect: horizontal jitter between frames 380-480
  const glitchX =
    frame > 443 && frame < 525 ? Math.sin(frame * 2.5) * 2 : 0;

  // Color flicker: alternate between primary and warning
  const flickerColor =
    Math.sin(frame * 0.15) > 0 ? COLORS.primary : COLORS.warning;

  // "הזיות" spring entrance at frame 515
  const hazayotScale = spring({
    frame: frame - 550,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const hazayotOpacity = interpolate(frame, [550, 565], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red ambient glow pulsing
  const redGlowOpacity =
    frame >= 443
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
      {/* AI-generated background image */}
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

      {/* ===== Phase 1 & 2: Main title "Hallucinations" ===== */}
      {frame < 350 && (
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
              direction: "ltr",
              letterSpacing: 3,
              textShadow: `0 0 ${20 * glowPulse}px ${COLORS.primary}88, 0 0 ${40 * glowPulse}px ${COLORS.primary}44`,
            }}
          >
            Hallucinations
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
            כשהמודל נשמע משכנע אבל טועה
          </div>
        </div>
      )}

      {/* ===== Phase 2: SVG Neural Network decoration ===== */}
      {frame >= 80 && frame < 400 && (
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
      {frame >= 80 && frame < 400 && (
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 80,
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
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: `${badge.color}18`,
                    border: `2px solid ${badge.color}66`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 44,
                    boxShadow: `0 0 20px ${badge.color}33`,
                  }}
                >
                  {badge.emoji}
                </div>
                {/* Label */}
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 30,
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
                fontSize: 52,
                fontWeight: 800,
                color: COLORS.primary,
                direction: "ltr",
                letterSpacing: 2,
                textShadow: `0 0 20px ${COLORS.primary}44`,
              }}
            >
              Hallucinations
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 40,
                fontWeight: 700,
                color: COLORS.text,
                marginRight: 20,
                marginLeft: 20,
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 44,
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
                textAlign: "right",
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
                תופעה חשובה להבנה
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
