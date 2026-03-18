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
 * Shot 1.1 — Opening: "למה מודלי שפה טועים לפעמים?"
 *
 * Duration: 327 frames (10.9s)
 *
 * Phase 1 (f0-120):  Big centered title + "חלק 2" subtitle
 * Phase 2 (f120-327): Title moves up, Hallucinations card + "למה זה קורה?"
 *
 * Narration timecodes:
 *   0.0s  "בסרטון הקודם ראינו דוגמאות למה שנקרא Hallucinations"
 *   3.9s  "תשובות שנשמעות משכנעות אך אינן מדויקות"
 *   7.7s  "כעת נשאל: למה זה קורה בכלל?"
 */

export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Phase 1: Big Title ── */
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Title moves up in phase 2 — spring for smooth motion
  const titleMoveProgress = spring({
    frame: frame - 110,
    fps,
    config: { damping: 20, stiffness: 60, mass: 1 },
  });
  const titleY = titleMoveProgress * -160;

  // Subtitle "חלק 2"
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse on title
  const glowIntensity = 0.4 + 0.3 * Math.sin(frame * 0.06);

  /* ── Phase 2: Hallucinations card + question ── */
  const cardScale = spring({
    frame: frame - 140,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  const questionScale = spring({
    frame: frame - 230,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.7 },
  });

  // Question mark floating in background
  const qMarkOpacity = interpolate(frame, [240, 270], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const qMarkRotation = frame * 0.15;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `radial-gradient(circle, ${COLORS.primary} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating question mark in background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${qMarkRotation}deg)`,
          fontFamily: FONT_FAMILY,
          fontSize: 500,
          fontWeight: 800,
          color: COLORS.secondary,
          opacity: qMarkOpacity,
        }}
      >
        ?
      </div>

      {/* ══════════════ MAIN TITLE ══════════════ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 68,
            fontWeight: 800,
            color: COLORS.text,
            direction: "rtl",
            textAlign: "center",
            transform: `scale(${titleScale})`,
            textShadow: `0 0 ${40 + glowIntensity * 30}px ${COLORS.primary}${Math.round(glowIntensity * 120).toString(16).padStart(2, "0")}, 0 2px 12px rgba(0,0,0,0.6)`,
            letterSpacing: "-1px",
            lineHeight: 1.3,
          }}
        >
          למה מודלי שפה
          <br />
          <span style={{ color: COLORS.primary }}>טועים לפעמים?</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 500,
            color: COLORS.textMuted,
            marginTop: 20,
            opacity: subtitleOpacity,
            letterSpacing: "2px",
          }}
        >
          חלק 2
        </div>
      </div>

      {/* ══════════════ PHASE 2: HALLUCINATIONS CARD + QUESTION ══════════════ */}
      {frame > 130 && (
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 36,
          }}
        >
          {/* Hallucinations definition card */}
          <div
            style={{
              transform: `scale(${cardScale})`,
              opacity: cardScale,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
              border: `1.5px solid ${COLORS.secondary}44`,
              borderRadius: 20,
              padding: "24px 48px",
              boxShadow: `0 0 30px ${COLORS.secondary}0c`,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 500,
                color: COLORS.text,
                direction: "rtl",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  color: COLORS.secondary,
                  fontWeight: 700,
                  fontSize: 36,
                }}
              >
                Hallucinations
              </span>
              <span style={{ color: COLORS.textMuted, margin: "0 16px" }}>=</span>
              תשובות משכנעות שאינן מדויקות
            </div>
          </div>

          {/* "למה זה קורה?" */}
          <div
            style={{
              transform: `scale(${questionScale})`,
              opacity: questionScale,
              fontFamily: FONT_FAMILY,
              fontSize: 58,
              fontWeight: 800,
              color: COLORS.accent,
              direction: "rtl",
              textAlign: "center",
              textShadow: `0 0 40px ${COLORS.accent}55, 0 2px 12px rgba(0,0,0,0.5)`,
              letterSpacing: "-0.5px",
            }}
          >
            למה זה קורה?
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
