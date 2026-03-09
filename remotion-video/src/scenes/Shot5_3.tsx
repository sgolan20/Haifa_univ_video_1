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
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

/**
 * Shot 5.3 — Hallucination Warning (14 seconds)
 * Professional text appears looking convincing, then shakes and fragments
 * turn red — revealing the danger. A dramatic 3D warning card flips in.
 * Real photo of person consuming content adds authenticity.
 */

// Deterministic pseudo-random
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// Fake article lines that will "crumble"
const ARTICLE_LINES = [
  "מחקר חדש מגלה: שינויי אקלים הפיכים לחלוטין",
  "צוות מדענים מאוניברסיטת קיימברידג׳ פרסם ממצאים",
  "מהפכניים המראים כי ניתן להפוך את תהליך ההתחממות",
  "הגלובלית באמצעות טכנולוגיה פשוטה וזולה שפותחה",
  "במעבדותיהם. לדברי החוקרים, התוצאות מעודדות מאוד.",
];

// Particle debris for text crumbling effect
const DEBRIS_COUNT = 30;
const debris = Array.from({ length: DEBRIS_COUNT }, (_, i) => ({
  x: 300 + seededRandom(i * 11 + 1) * 1300,
  y: 200 + seededRandom(i * 17 + 3) * 400,
  vx: (seededRandom(i * 23 + 5) - 0.5) * 8,
  vy: seededRandom(i * 29 + 7) * 4 + 2,
  rotation: seededRandom(i * 31 + 9) * 360,
  size: 4 + seededRandom(i * 37 + 11) * 8,
}));

export const Shot5_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Article card slides in with 3D perspective (frames 0-60)
  const cardEntrySpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 2: Each article line appears with stagger (frames 30-120)
  const lineDelays = [30, 48, 66, 84, 102];

  // Phase 3: Background image of person reading fades in (frames 0-50)
  const bgImageOpacity = interpolate(frame, [0, 50], [0, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Shake animation (frames 160-200)
  const isShaking = frame >= 160 && frame <= 210;
  const shakeX = isShaking
    ? Math.sin(frame * 2.5) * interpolate(frame, [160, 185, 210], [0, 8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const shakeY = isShaking
    ? Math.cos(frame * 3.1) * interpolate(frame, [160, 185, 210], [0, 5, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Phase 5: Text turns red and fragments scatter (frames 200-280)
  const crumbleProgress = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 6: Warning card flips in with 3D rotation (frames 220-300)
  const warningFlipSpring = spring({
    frame: frame - 220,
    fps,
    config: { damping: 15, stiffness: 90, mass: 0.8 },
  });
  const warningRotateY = interpolate(warningFlipSpring, [0, 1], [90, 0]);

  // Phase 7: Red glow pulse (frames 260+)
  const redPulse = frame >= 260 ? 0.6 + Math.sin((frame - 260) * 0.1) * 0.4 : 0;

  // Phase 8: Warning text appears (frames 280+)
  const warningTextSpring = spring({
    frame: frame - 280,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Phase 9: Bottom label (frames 320+)
  const bottomLabelSpring = spring({
    frame: frame - 320,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // 3D card tilt
  const cardTiltX = Math.sin(frame * 0.015) * 1.5;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        perspective: "1200px",
      }}
    >
      {/* Background photo of person reading — adds context */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: bgImageOpacity,
        }}
      >
        <Img
          src={staticFile("images/fake-news.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.3) saturate(0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(ellipse at 50% 40%, transparent 20%, ${COLORS.bgPrimary}ee 70%)`,
          }}
        />
      </div>

      {/* Red ambient glow when warning is active */}
      {frame >= 220 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(ellipse at 50% 50%, ${COLORS.warning}${Math.round(redPulse * 15).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Professional article card — will shake and crumble */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 80,
          width: 1000,
          transform: `translateX(-50%) translateX(${shakeX}px) translateY(${shakeY}px) rotateX(${cardTiltX}deg) scale(${cardEntrySpring})`,
          opacity: interpolate(crumbleProgress, [0, 0.8, 1], [1, 0.5, 0]),
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.bgSecondary}ee, ${COLORS.bgPrimary}ee)`,
            borderRadius: 20,
            border: `1px solid ${crumbleProgress > 0 ? COLORS.warning : COLORS.primary}${crumbleProgress > 0 ? "66" : "33"}`,
            padding: "30px 40px",
            boxShadow: crumbleProgress > 0
              ? `0 0 ${30 * crumbleProgress}px ${COLORS.warning}44`
              : `0 15px 50px ${COLORS.bgPrimary}cc`,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Fake article header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              direction: "rtl",
            }}
          >
            <div
              style={{
                width: 8,
                height: 40,
                borderRadius: 4,
                background: crumbleProgress > 0.3 ? COLORS.warning : COLORS.primary,
              }}
            />
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 700,
                color: crumbleProgress > 0.3 ? COLORS.warning : COLORS.text,
              }}
            >
              כתבה שנוצרה על ידי AI
            </span>
          </div>

          {/* Article lines */}
          {ARTICLE_LINES.map((line, i) => {
            const lineSpring = spring({
              frame: frame - lineDelays[i],
              fps,
              config: { damping: 16, stiffness: 90, mass: 0.8 },
            });

            // Each line turns red at different times during crumble
            const lineRedProgress = interpolate(
              crumbleProgress,
              [i * 0.15, i * 0.15 + 0.3],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // 3D scatter effect per line
            const scatterX = lineRedProgress * (seededRandom(i * 41) - 0.5) * 200;
            const scatterY = lineRedProgress * seededRandom(i * 43) * 80;
            const scatterRotate = lineRedProgress * (seededRandom(i * 47) - 0.5) * 15;

            return (
              <div
                key={i}
                style={{
                  opacity: lineSpring * (1 - lineRedProgress * 0.7),
                  transform: `translateX(${(1 - lineSpring) * 40 + scatterX}px) translateY(${scatterY}px) rotate(${scatterRotate}deg)`,
                  marginBottom: 12,
                  direction: "rtl",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 26,
                    fontWeight: 400,
                    color: interpolateColor(lineRedProgress),
                    lineHeight: 1.6,
                    textShadow: lineRedProgress > 0.5
                      ? `0 0 8px ${COLORS.warning}66`
                      : "none",
                  }}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Debris particles from crumbling text */}
      {crumbleProgress > 0 && (
        <svg
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          {debris.map((d, i) => {
            const t = crumbleProgress;
            const dx = d.x + d.vx * t * 60;
            const dy = d.y + d.vy * t * 60 + t * t * 200;
            const opacity = Math.max(0, 1 - t * 1.5);
            return (
              <rect
                key={i}
                x={dx}
                y={dy}
                width={d.size}
                height={d.size * 0.4}
                fill={COLORS.warning}
                opacity={opacity * 0.6}
                transform={`rotate(${d.rotation + t * 180} ${dx} ${dy})`}
                rx={1}
              />
            );
          })}
        </svg>
      )}

      {/* 3D Warning Card — flips in from the side */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) rotateY(${warningRotateY}deg) perspective(800px)`,
          opacity: warningFlipSpring,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            width: 700,
            padding: "50px 60px",
            borderRadius: 24,
            background: `linear-gradient(135deg, #1a0808ee, #2a0505ee)`,
            border: `3px solid ${COLORS.warning}88`,
            boxShadow: `0 0 ${40 * redPulse}px ${COLORS.warning}44, 0 20px 60px #00000088`,
            textAlign: "center",
          }}
        >
          {/* Warning triangle SVG */}
          <svg
            width={120}
            height={110}
            viewBox="0 0 120 110"
            style={{
              marginBottom: 20,
              filter: `drop-shadow(0 0 ${15 * redPulse}px ${COLORS.warning}88)`,
            }}
          >
            <path
              d="M60 8 L112 100 L8 100 Z"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth={5}
              strokeLinejoin="round"
            />
            <text
              x={60}
              y={80}
              textAnchor="middle"
              fontFamily={FONT_FAMILY}
              fontSize={48}
              fontWeight={800}
              fill={COLORS.warning}
            >
              !
            </text>
          </svg>

          {/* Warning title */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 800,
              color: COLORS.warning,
              direction: "rtl",
              marginBottom: 16,
              textShadow: `0 0 20px ${COLORS.warning}66`,
              opacity: warningTextSpring,
              transform: `translateY(${(1 - warningTextSpring) * 20}px)`,
            }}
          >
            זהירות: הזיות
          </div>

          {/* Warning description */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 400,
              color: COLORS.textMuted,
              direction: "rtl",
              lineHeight: 1.6,
              opacity: warningTextSpring,
            }}
          >
            מודל שפה יכול לייצר טקסט שנשמע משכנע
            <br />
            גם כשהתוכן שגוי לחלוטין
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          opacity: bottomLabelSpring,
          transform: `translateY(${(1 - bottomLabelSpring) * 20}px)`,
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 26,
            fontWeight: 600,
            color: COLORS.warning,
            direction: "rtl",
            padding: "12px 30px",
            borderRadius: 12,
            background: `${COLORS.bgPrimary}cc`,
            border: `1px solid ${COLORS.warning}44`,
          }}
        >
          סיכון: תוכן שגוי שנראה משכנע ומקצועי
        </span>
      </div>
    </AbsoluteFill>
  );
};

/** Helper to interpolate between white and red */
function interpolateColor(t: number): string {
  const r = Math.round(255);
  const g = Math.round(255 - t * (255 - 68));
  const b = Math.round(255 - t * (255 - 68));
  return `rgb(${r}, ${g}, ${b})`;
}
