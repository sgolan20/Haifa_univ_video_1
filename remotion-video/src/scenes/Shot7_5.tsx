import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  useCurrentFrame,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 7.5 — Human Creativity (18 seconds, 540 frames)
 * Three frames: Newton (apple + gravity), Picasso (cubist shapes), Eureka (lightbulb).
 * Each activates in sequence timed to narration:
 *   0.0s (f0)   — "אם לחשוב על יצירתיות אנושית אמיתית"
 *   2.2s (f66)  — "ניוטון שמגלה את חוקי הקבידה"
 *   4.6s (f138) — "פיקסו שמפתח את הקוביזם"
 *   7.1s (f213) — "מישהו שממציא פתרון חכם לבעיה היום יומית"
 *  10.2s (f306) — "יש כאן תהליך של התבוננות בעולם..."
 */

export const Shot7_5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title — appears immediately with intro narration
  const titleIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Frame 1: Newton — "ניוטון" at 2.2s = frame 66
  const newton = spring({
    frame: frame - 55,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Apple fall — during "שמגלה את חוקי הקבידה" (f81-f126)
  // Easing.in(Easing.poly(2)) = quadratic ease-in = constant acceleration (gravity)
  const appleFallProgress = interpolate(frame, [85, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.poly(2)),
  });
  // Apple Y position: from mid-canopy (top: 100px) to tree base (top: 290px)
  const appleY = interpolate(appleFallProgress, [0, 1], [120, 310]);
  // Slight rotation as it tumbles
  const appleRotation = interpolate(appleFallProgress, [0, 1], [0, 35]);

  // Frame 2: Picasso — "פיקסו" at 4.6s = frame 138
  const picasso = spring({
    frame: frame - 125,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Frame 3: Eureka — "מישהו שממציא" at 7.1s = frame 213
  const eureka = spring({
    frame: frame - 200,
    fps,
    config: { damping: 16, stiffness: 85, mass: 0.8 },
  });

  // Picasso — subtle slow rotation after entering
  const picassoRotate = interpolate(frame, [125, 540], [0, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Eureka — lightbulb starts dim, lights up at "פתרון חכם" ~8.5s = frame 255
  const bulbLit = interpolate(frame, [245, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bulbGlowPulse = bulbLit > 0
    ? interpolate(Math.sin((frame - 250) * 0.1), [-1, 1], [0.7, 1.0])
    : 0;

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
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 48,
          fontWeight: 800,
          color: COLORS.text,
          direction: "rtl",
          opacity: titleIn,
          transform: `scale(${titleIn})`,
        }}
      >
        יצירתיות אנושית אמיתית
      </div>

      {/* Three frames container */}
      <div
        style={{
          position: "absolute",
          top: "22%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 60,
          direction: "rtl",
        }}
      >
        {/* Frame 1: Newton */}
        <div
          style={{
            width: 420,
            height: 500,
            borderRadius: 20,
            border: `3px solid ${COLORS.accent}${newton > 0.5 ? "cc" : "44"}`,
            background: `${COLORS.bgPrimary}dd`,
            boxShadow: newton > 0.5 ? `0 0 30px ${COLORS.accent}33` : "none",
            opacity: newton,
            transform: `scale(${newton})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 20px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.accent, direction: "rtl", marginBottom: 10, zIndex: 2 }}>
            ניוטון
          </div>

          {/* Tree + Apple scene */}
          <div style={{ position: "relative", width: 340, height: 340, flex: 1 }}>
            {/* Tree */}
            <Img
              src={staticFile("images/shot7_5_tree.png")}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 280,
                height: "auto",
              }}
            />
            {/* Apple — falls with gravity easing */}
            <Img
              src={staticFile("images/shot7_5_apple.png")}
              style={{
                position: "absolute",
                left: "50%",
                top: appleY,
                width: 45,
                height: "auto",
                transform: `translateX(-50%) rotate(${appleRotation}deg)`,
              }}
            />
            {/* Gravity arrows — appear after apple lands */}
            {appleFallProgress > 0.9 && (
              <svg
                width="340"
                height="340"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                {[100, 170, 240].map((x, i) => {
                  const arrowOpacity = interpolate(
                    frame,
                    [120 + i * 4, 128 + i * 4],
                    [0, 0.6],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <g key={i} opacity={arrowOpacity}>
                      <line x1={x} y1={280} x2={x} y2={310} stroke={COLORS.accent} strokeWidth="2" />
                      <polygon points={`${x - 5},310 ${x},320 ${x + 5},310`} fill={COLORS.accent} />
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center", zIndex: 2 }}>
            חוקי הכבידה
          </div>
        </div>

        {/* Frame 2: Picasso */}
        <div
          style={{
            width: 420,
            height: 500,
            borderRadius: 20,
            border: `3px solid ${COLORS.secondary}${picasso > 0.5 ? "cc" : "44"}`,
            background: `${COLORS.bgPrimary}dd`,
            boxShadow: picasso > 0.5 ? `0 0 30px ${COLORS.secondary}33` : "none",
            opacity: picasso,
            transform: `scale(${picasso})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 20px",
            overflow: "hidden",
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.secondary, direction: "rtl", marginBottom: 10 }}>
            פיקאסו
          </div>
          <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img
              src={staticFile("images/shot7_5_picasso.png")}
              style={{
                width: 260,
                height: "auto",
                borderRadius: 12,
                transform: `rotate(${picassoRotate}deg)`,
                boxShadow: `0 0 25px ${COLORS.secondary}44`,
              }}
            />
          </div>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
            קוביזם — מבט חדש
          </div>
        </div>

        {/* Frame 3: Eureka */}
        <div
          style={{
            width: 420,
            height: 500,
            borderRadius: 20,
            border: `3px solid ${COLORS.primary}${eureka > 0.5 ? "cc" : "44"}`,
            background: `${COLORS.bgPrimary}dd`,
            boxShadow: bulbLit > 0 ? `0 0 ${40 * bulbGlowPulse}px ${COLORS.accent}44` : "none",
            opacity: eureka,
            transform: `scale(${eureka})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 20px",
            overflow: "hidden",
          }}
        >
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 28, fontWeight: 700, color: COLORS.primary, direction: "rtl", marginBottom: 10 }}>
            יוריקה!
          </div>
          <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Glow halo behind bulb — appears when lit */}
            <div
              style={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${COLORS.accent}33 0%, transparent 70%)`,
                opacity: bulbLit * bulbGlowPulse,
                transform: `scale(${1 + bulbGlowPulse * 0.15})`,
              }}
            />
            <Img
              src={staticFile("images/shot7_5_eureka.png")}
              style={{
                width: 180,
                height: "auto",
                filter: bulbLit > 0
                  ? `brightness(${1 + bulbGlowPulse * 0.3}) drop-shadow(0 0 ${15 * bulbGlowPulse}px ${COLORS.accent}88)`
                  : "brightness(0.5) saturate(0.3)",
                transition: "none",
              }}
            />
          </div>
          <div style={{ fontFamily: FONT_FAMILY, fontSize: 20, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
            תובנה פורצת דרך
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.textMuted,
          direction: "rtl",
          opacity: interpolate(frame, [300, 330], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        יצירתיות אנושית = תובנות חדשות שלא נובעות מדפוסים קיימים
      </div>
    </AbsoluteFill>
  );
};
