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
 * Shot 2.1 — The simplistic answer
 * Duration: 285 frames (9.5s) · audioStart 27.3s
 *
 * f0:    quote bubble "שניהם עוזרים לי למצוא מידע" appears
 * f117:  "גרעין של אמת" — a small glowing core inside the bubble
 * f190:  "פשטנות שעלולה להטעות" — a warning crack splits the bubble
 *
 * Narration (relative):
 *   0.0s  "התשובה הנפוצה היא 'שניהם עוזרים לי למצוא מידע'"
 *   3.9s  "וזו, למרות שיש בה גרעין של אמת,"
 *   6.3s  "פשטנות שעלולה להטעות אם לא מדייקים אותה."
 */
export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bubble = spring({ frame, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } });

  // glowing "kernel of truth"
  const core = spring({ frame: frame - 117, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const corePulse = 0.6 + 0.4 * Math.sin(frame * 0.18);

  // warning crack + label
  const crack = interpolate(frame, [190, 230], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const warn = spring({ frame: frame - 205, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const shake = frame > 190 && frame < 230 ? Math.sin(frame * 1.1) * 3 : 0;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        fontFamily: FONT_FAMILY,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `radial-gradient(circle, ${COLORS.primary} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      {/* heading */}
      <div style={{ position: "absolute", top: 150, fontSize: 34, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", opacity: interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" }) }}>
        התשובה הנפוצה:
      </div>

      {/* quote bubble */}
      <div
        style={{
          position: "relative",
          transform: `scale(${bubble}) translateX(${shake}px)`,
          opacity: bubble,
          maxWidth: 1000,
          padding: "56px 72px",
          borderRadius: 36,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
          border: `2px solid ${interpolate(crack, [0, 1], [0.27, 0.5]) > 0.4 ? COLORS.warning + "88" : "rgba(255,255,255,0.18)"}`,
          boxShadow: crack > 0.3 ? `0 0 50px ${COLORS.warning}22` : "0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", lineHeight: 1.4 }}>
          <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>“</span>
          שניהם עוזרים לי למצוא מידע
          <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>”</span>
        </div>

        {/* glowing kernel of truth */}
        {frame > 110 && (
          <div style={{ position: "absolute", bottom: -26, left: "50%", transform: `translateX(-50%) scale(${core})`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: COLORS.accent, boxShadow: `0 0 ${16 + corePulse * 18}px ${COLORS.accent}, 0 0 ${corePulse * 30}px ${COLORS.accent}aa` }} />
            <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.accent, direction: "rtl", whiteSpace: "nowrap" }}>גרעין של אמת</div>
          </div>
        )}

        {/* warning crack */}
        {crack > 0 && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: crack * 0.85 }}
          >
            <polyline
              points="50,1 45,27 56,49 46,73 52,99"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth={3}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>

      {/* warning label */}
      {frame > 200 && (
        <div
          style={{
            position: "absolute",
            bottom: 170,
            transform: `scale(${warn})`,
            opacity: warn,
            padding: "16px 40px",
            borderRadius: 999,
            background: `${COLORS.warning}18`,
            border: `1.5px solid ${COLORS.warning}66`,
            fontSize: 36,
            fontWeight: 700,
            color: COLORS.warning,
            direction: "rtl",
            textShadow: `0 0 24px ${COLORS.warning}44`,
          }}
        >
          פשטנות שעלולה להטעות
        </div>
      )}
    </AbsoluteFill>
  );
};
