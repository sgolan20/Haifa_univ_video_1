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
 * Shot 5.3 — Hallucination Warning (17 seconds, 510 frames)
 *
 * Narration: "וכאן טמון גם הסיכון. מודל שפה יכול לייצר טקסט
 * שנשמע משכנע ומקצועי, גם אם התוכן שגוי או מפוברק.
 * לא תמיד יש לו גישה בזמן אמת למאגר מידע מעודכנים,
 * אלא אם הוא מחובר למנוע חיפוש."
 *
 * Visual: Professional-looking text appears, then shakes and words
 * turn red/scatter. Warning triangle grows. "זהירות: הזיות" title.
 * All SVG/text — no external images.
 */

// Fake article lines
const ARTICLE_LINES = [
  "מחקר פורץ דרך: מדענים מצאו דרך להפוך את",
  "תהליך ההתחממות הגלובלית באמצעות טכנולוגיה",
  "חדשנית וזולה שפותחה באוניברסיטת קיימבריד׳.",
  "לדברי ראש הצוות, התוצאות מעודדות במיוחד",
  "ומציעות פתרון מעשי בטווח של שנים ספורות.",
];

// Deterministic pseudo-random for scatter effects
const scatter = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

// Debris particles
const DEBRIS = Array.from({ length: 24 }, (_, i) => ({
  x: 400 + scatter(i * 11 + 1) * 1100,
  y: 200 + scatter(i * 17 + 3) * 300,
  vx: (scatter(i * 23 + 5) - 0.5) * 6,
  vy: scatter(i * 29 + 7) * 3 + 1,
  rot: scatter(i * 31 + 9) * 360,
  size: 4 + scatter(i * 37 + 11) * 7,
}));

export const Shot5_3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: "Article" card appears (frames 0-60)
  const cardIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 2: Lines appear staggered (frames 20-120)
  const lineDelays = [20, 40, 60, 80, 100];

  // Phase 3: Shake (frames 180-230)
  const isShaking = frame >= 180 && frame <= 240;
  const shakeIntensity = isShaking
    ? interpolate(frame, [180, 210, 240], [0, 8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const shakeX = Math.sin(frame * 2.5) * shakeIntensity;
  const shakeY = Math.cos(frame * 3.1) * shakeIntensity * 0.6;

  // Phase 4: Text crumbles — turns red and scatters (frames 220-320)
  const crumbleProgress = interpolate(frame, [220, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: Warning triangle grows (frames 250-330)
  const warningIn = spring({
    frame: frame - 250,
    fps,
    config: { damping: 15, stiffness: 90, mass: 0.8 },
  });

  // Phase 6: Red glow pulse (frames 280+)
  const redPulse = frame >= 280 ? 0.5 + Math.sin((frame - 280) * 0.1) * 0.5 : 0;

  // Phase 7: Warning text (frames 300+)
  const warningTextIn = spring({
    frame: frame - 300,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  // Phase 8: Subtitle (frames 360+)
  const subtitleIn = spring({
    frame: frame - 360,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  // Phase 9: Bottom label (frames 400+)
  const bottomIn = spring({
    frame: frame - 400,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
      }}
    >
      {/* Warning background image */}
      <Img
        src={staticFile("video1/images/shot5_3_warning_bg.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: interpolate(frame, [0, 30], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Red ambient glow when warning active */}
      {frame >= 250 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(ellipse at 50% 50%, ${COLORS.warning}${Math.round(redPulse * 12).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ========== Fake Article Card ========== */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 60,
          width: 1000,
          transform: `translateX(-50%) translateX(${shakeX}px) translateY(${shakeY}px) scale(${cardIn})`,
          opacity: interpolate(crumbleProgress, [0, 0.7, 1], [1, 0.4, 0]),
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.bgSecondary}ee, ${COLORS.bgPrimary}ee)`,
            borderRadius: 20,
            border: `1px solid ${crumbleProgress > 0 ? COLORS.warning + "66" : COLORS.primary + "33"}`,
            padding: "32px 40px",
            boxShadow: crumbleProgress > 0
              ? `0 0 ${30 * crumbleProgress}px ${COLORS.warning}44`
              : `0 12px 40px ${COLORS.bgPrimary}cc`,
          }}
        >
          {/* Article header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
              direction: "rtl",
            }}
          >
            <div
              style={{
                width: 8,
                height: 36,
                borderRadius: 4,
                background: crumbleProgress > 0.3 ? COLORS.warning : COLORS.primary,
              }}
            />
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 700,
                color: crumbleProgress > 0.3 ? COLORS.warning : COLORS.text,
                direction: "rtl",
              }}
            >
              כתבה שנוצרה על ידי AI
            </span>
            <div style={{ flex: 1 }} />
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 16,
                color: COLORS.textDim,
              }}
            >
              מקור: ??
            </span>
          </div>

          {/* Article lines */}
          {ARTICLE_LINES.map((line, i) => {
            const lineIn = spring({
              frame: frame - lineDelays[i],
              fps,
              config: { damping: 16, stiffness: 90, mass: 0.8 },
            });

            // Each line turns red progressively
            const lineRed = interpolate(
              crumbleProgress,
              [i * 0.12, i * 0.12 + 0.3],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Scatter each line
            const scX = lineRed * (scatter(i * 41) - 0.5) * 200;
            const scY = lineRed * scatter(i * 43) * 60;
            const scR = lineRed * (scatter(i * 47) - 0.5) * 12;

            const r = 255;
            const g = Math.round(255 - lineRed * (255 - 68));
            const b = Math.round(255 - lineRed * (255 - 68));

            return (
              <div
                key={i}
                style={{
                  opacity: lineIn * (1 - lineRed * 0.6),
                  transform: `translateX(${(1 - lineIn) * 30 + scX}px) translateY(${scY}px) rotate(${scR}deg)`,
                  marginBottom: 10,
                  direction: "rtl",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 28,
                    fontWeight: 400,
                    color: `rgb(${r}, ${g}, ${b})`,
                    lineHeight: 1.7,
                    textShadow: lineRed > 0.5 ? `0 0 8px ${COLORS.warning}44` : "none",
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
          style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
        >
          {DEBRIS.map((d, i) => {
            const t = crumbleProgress;
            const dx = d.x + d.vx * t * 50;
            const dy = d.y + d.vy * t * 50 + t * t * 150;
            const opacity = Math.max(0, 1 - t * 1.4);
            return (
              <rect
                key={i}
                x={dx}
                y={dy}
                width={d.size}
                height={d.size * 0.4}
                fill={COLORS.warning}
                opacity={opacity * 0.5}
                transform={`rotate(${d.rot + t * 180} ${dx} ${dy})`}
                rx={1}
              />
            );
          })}
        </svg>
      )}

      {/* ========== Warning Card ========== */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "42%",
          transform: `translate(-50%, -50%) scale(${warningIn})`,
          opacity: warningIn,
        }}
      >
        <div
          style={{
            width: 720,
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
            width={100}
            height={95}
            viewBox="0 0 100 95"
            style={{
              marginBottom: 20,
              filter: `drop-shadow(0 0 ${12 * redPulse}px ${COLORS.warning}88)`,
            }}
          >
            <path
              d="M50 5 L95 85 L5 85 Z"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth={5}
              strokeLinejoin="round"
            />
            <text
              x={50}
              y={70}
              textAnchor="middle"
              fontFamily={FONT_FAMILY}
              fontSize={42}
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
              opacity: warningTextIn,
              transform: `translateY(${(1 - warningTextIn) * 15}px)`,
            }}
          >
            זהירות: הזיות (Hallucinations)
          </div>

          {/* Warning subtitle */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 400,
              color: COLORS.textMuted,
              direction: "rtl",
              lineHeight: 1.7,
              opacity: subtitleIn,
            }}
          >
            טקסט שנשמע משכנע ומקצועי
            <br />
            <span style={{ color: COLORS.warning }}>גם כשהתוכן שגוי לחלוטין</span>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div
        style={{
          position: "absolute",
          top: "72%",
          width: "100%",
          textAlign: "center",
          opacity: bottomIn,
          transform: `translateY(${(1 - bottomIn) * 20}px)`,
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
          ⚠ סיכון: תוכן שגוי שנראה משכנע — חובה לבדוק מקורות
        </span>
      </div>
    </AbsoluteFill>
  );
};
