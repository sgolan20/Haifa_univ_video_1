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
 * Shot 3.1 — "למה המודל נשמע כל כך בטוח?"
 *
 * Duration: 919 frames (30.63s)
 *
 * Phase 1 (f0-290):    Chat bubbles — the model SOUNDS confident
 * Phase 2 (f280-520):  Confidence gauge stuck at 100% — no doubt mechanism
 * Phase 3 (f500-750):  Writing styles (academic, journalistic, encyclopedic)
 * Phase 4 (f730-919):  Conclusion — "professional phrasing ≠ accurate info"
 *
 * Narration timecodes (relative to shot start at 56.34s):
 *   0.0s  "למה המודל נשמע כל כך בטוח?"
 *   3.1s  "שאלה שמבלבלת הרבה משתמשים היא"
 *   5.6s  "אם המודל לא בטוח – למה הוא נשמע כל כך בטוח?"
 *   9.8s  "התשובה היא שלמודל אין תחושת ביטחון או ספק"
 *  13.4s  "הוא לא יודע שהוא טועה – והוא גם לא יודע כשהוא צודק"
 *  17.1s  "מה שאנחנו מפרשים כביטחון הוא פשוט סגנון הכתיבה"
 *  21.1s  "שהמודל למד מטקסטים אקדמיים, עיתונאיים ואנציקלופדיים"
 *  24.9s  "לכן גם מידע לא מדויק"
 *  27.2s  "יכול להופיע באותו ניסוח מקצועי ומשכנע"
 */

/* ─── Glassmorphic Card ────────────────────────────────────── */

const GlassCard: React.FC<{
  children: React.ReactNode;
  borderColor?: string;
  style?: React.CSSProperties;
}> = ({ children, borderColor = "rgba(255,255,255,0.1)", style }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(16px)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: 20,
      padding: "28px 36px",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── Chat Bubble ──────────────────────────────────────────── */

const ChatBubble: React.FC<{
  text: string;
  scale: number;
  opacity: number;
}> = ({ text, scale, opacity }) => (
  <div
    style={{
      opacity,
      transform: `scale(${scale})`,
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      direction: "rtl",
    }}
  >
    {/* AI avatar */}
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${COLORS.primary}44, ${COLORS.secondary}44)`,
        border: `2px solid ${COLORS.primary}55`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.primary,
        }}
      >
        AI
      </span>
    </div>
    {/* Bubble */}
    <div
      style={{
        background: "rgba(255,255,255,0.07)",
        border: `1.5px solid ${COLORS.primary}33`,
        borderRadius: "20px 4px 20px 20px",
        padding: "20px 28px",
        maxWidth: 700,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 500,
          color: COLORS.text,
          direction: "rtl",
          textAlign: "right",
          lineHeight: 1.6,
        }}
      >
        {text}
      </div>
      {/* Confidence indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 12,
          justifyContent: "flex-end",
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 18,
            color: "#22c55e",
            fontWeight: 600,
          }}
        >
          ✓ תשובה בטוחה
        </span>
      </div>
    </div>
  </div>
);

/* ─── SVG Confidence Gauge ─────────────────────────────────── */

const ConfidenceGauge: React.FC<{
  drawProgress: number;
  showX: number;
}> = ({ drawProgress, showX }) => {
  const radius = 110;
  const cx = 140;
  const cy = 140;
  const circumference = Math.PI * radius; // half circle
  const dashOffset = circumference * (1 - drawProgress);

  return (
    <svg width={280} height={170} viewBox="0 0 280 170">
      {/* Background arc */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={20}
        strokeLinecap="round"
      />
      {/* Filled arc — always at 100% */}
      <path
        d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
        fill="none"
        stroke={`url(#gaugeGrad)`}
        strokeWidth={20}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
      />
      {/* Gradient */}
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor={COLORS.accent} />
          <stop offset="100%" stopColor={COLORS.warning} />
        </linearGradient>
      </defs>
      {/* Needle — stuck at 100% (right end) */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + radius * Math.cos(Math.PI * (1 - drawProgress))}
        y2={cy - radius * Math.sin(Math.PI * (1 - drawProgress))}
        stroke={COLORS.text}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={drawProgress}
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={8} fill={COLORS.text} opacity={drawProgress} />
      {/* 100% label */}
      <text
        x={cx + radius + 20}
        y={cy + 6}
        fontFamily={FONT_FAMILY}
        fontSize={24}
        fontWeight={700}
        fill={COLORS.warning}
        opacity={drawProgress}
      >
        100%
      </text>
      {/* 0% label */}
      <text
        x={cx - radius - 40}
        y={cy + 6}
        fontFamily={FONT_FAMILY}
        fontSize={24}
        fontWeight={700}
        fill="#22c55e"
        opacity={drawProgress}
      >
        0%
      </text>
      {/* X mark */}
      <g opacity={showX}>
        <circle cx={cx} cy={cy - 40} r={22} fill={`${COLORS.warning}33`} stroke={`${COLORS.warning}66`} strokeWidth={2} />
        <text
          x={cx}
          y={cy - 32}
          fontFamily={FONT_FAMILY}
          fontSize={28}
          fontWeight={800}
          fill={COLORS.warning}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          ✗
        </text>
      </g>
    </svg>
  );
};

/* ─── Style Card ───────────────────────────────────────────── */

const StyleCard: React.FC<{
  icon: string;
  title: string;
  example: string;
  borderColor: string;
  scale: number;
  opacity: number;
}> = ({ icon, title, example, borderColor, scale, opacity }) => (
  <div
    style={{
      opacity,
      transform: `scale(${scale})`,
      flex: 1,
    }}
  >
    <GlassCard
      borderColor={`${borderColor}66`}
      style={{
        textAlign: "center",
        padding: "24px 28px",
        boxShadow: `0 0 25px ${borderColor}0c`,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={{ fontSize: 42 }}>{icon}</div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 26,
          fontWeight: 700,
          color: borderColor,
          direction: "rtl",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          fontWeight: 400,
          color: COLORS.textMuted,
          direction: "rtl",
          lineHeight: 1.5,
          fontStyle: "italic",
        }}
      >
        &quot;{example}&quot;
      </div>
    </GlassCard>
  </div>
);

/* ─── Main Shot Component ──────────────────────────────────── */

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Title ── */
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: "clamp",
  });

  /* ── Phase visibility ── */
  const phase1Opacity = interpolate(frame, [260, 290], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Opacity = interpolate(frame, [260, 290, 570, 600], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3Opacity = interpolate(frame, [570, 600, 760, 790], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase4Opacity = interpolate(frame, [770, 800], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: Chat Bubbles ── */
  const bubble1Scale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const bubble2Scale = spring({
    frame: frame - 140,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  /* ── Phase 2: Gauge ── */
  const gaugeDrawProgress = spring({
    frame: frame - 310,
    fps,
    config: { damping: 30, stiffness: 40, mass: 1.2 },
  });
  const gaugeXMark = interpolate(frame, [370, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const noDoubtText = interpolate(frame, [380, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Split text: "doesn't know it's wrong" / "doesn't know it's right"
  const wrongTextOpacity = spring({
    frame: frame - 410,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const equalsScale = spring({
    frame: frame - 440,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.6 },
  });
  const rightTextOpacity = spring({
    frame: frame - 460,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });

  /* ── Phase 3: Style Cards ── */
  const card1Scale = spring({
    frame: frame - 610,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const card2Scale = spring({
    frame: frame - 650,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const card3Scale = spring({
    frame: frame - 690,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const styleConclusion = interpolate(frame, [720, 750], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 4: Final Conclusion ── */
  const conclusionScale1 = spring({
    frame: frame - 800,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const neqScale = spring({
    frame: frame - 830,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.5 },
  });
  const conclusionScale2 = spring({
    frame: frame - 855,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  // Pulsing red glow
  const glowPulse = frame > 870 ? 0.5 + 0.5 * Math.sin((frame - 870) * 0.08) : 0;

  return (
    <AbsoluteFill>
      {/* Background image — theatrical mask */}
      <Img
        src={staticFile("video2b/images/shot3_1_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
      />
      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary}aa 0%, ${COLORS.bgPrimary}f0 70%)`,
        }}
      />

      {/* ══════════════ SECTION TITLE ══════════════ */}
      <div
        style={{
          position: "absolute",
          top: 50,
          right: 80,
          left: 80,
          direction: "rtl",
          textAlign: "right",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 54,
            fontWeight: 700,
            color: COLORS.primary,
            textShadow: `0 0 40px ${COLORS.primary}55, 0 2px 8px rgba(0,0,0,0.5)`,
            letterSpacing: "-0.5px",
          }}
        >
          למה המודל נשמע כל כך בטוח?
        </div>
        <div
          style={{
            marginTop: 12,
            height: 3,
            width: 200,
            background: `linear-gradient(to left, ${COLORS.primary}, transparent)`,
            borderRadius: 2,
          }}
        />
      </div>

      {/* ══════════════ PHASE 1: CHAT BUBBLES ══════════════ */}
      {frame < 300 && (
        <div
          style={{
            position: "absolute",
            top: 170,
            right: 100,
            left: 100,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            opacity: phase1Opacity,
          }}
        >
          <ChatBubble
            text="התשובה היא שהמחקר מראה בבירור כי מוטיבציה פנימית היא הגורם המרכזי..."
            scale={bubble1Scale}
            opacity={bubble1Scale}
          />
          <ChatBubble
            text="מחקרים הוכיחו ש-87% מהסטודנטים מציגים שיפור משמעותי כאשר..."
            scale={bubble2Scale}
            opacity={bubble2Scale}
          />
          {/* Subtitle text */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.textMuted,
              direction: "rtl",
              textAlign: "center",
              marginTop: 20,
              opacity: interpolate(frame, [180, 210], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            שתי התשובות נשמעות <span style={{ color: COLORS.primary, fontWeight: 700 }}>בטוחות</span> באותה מידה — אבל האם הן <span style={{ color: COLORS.accent, fontWeight: 700 }}>מדויקות</span>?
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 2: CONFIDENCE GAUGE ══════════════ */}
      {frame >= 260 && frame < 610 && (
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 80,
            left: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            opacity: phase2Opacity,
          }}
        >
          {/* Gauge */}
          <ConfidenceGauge drawProgress={gaugeDrawProgress} showX={gaugeXMark} />

          {/* "No doubt mechanism" text */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 34,
              fontWeight: 700,
              color: COLORS.accent,
              direction: "rtl",
              textAlign: "center",
              opacity: noDoubtText,
              textShadow: `0 0 20px ${COLORS.accent}44`,
            }}
          >
            אין מנגנון ספק — תמיד אותו טון
          </div>

          {/* Split: "doesn't know wrong" = "doesn't know right" */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
              marginTop: 16,
              direction: "rtl",
            }}
          >
            {/* Right side — doesn't know it's wrong */}
            <GlassCard
              borderColor={`${COLORS.warning}55`}
              style={{
                opacity: wrongTextOpacity,
                transform: `scale(${wrongTextOpacity})`,
                padding: "20px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: COLORS.warning,
                  direction: "rtl",
                  textShadow: `0 0 15px ${COLORS.warning}44`,
                }}
              >
                לא יודע שהוא טועה
              </div>
            </GlassCard>

            {/* Equals sign */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 56,
                fontWeight: 800,
                color: COLORS.textMuted,
                transform: `scale(${equalsScale})`,
                textShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            >
              =
            </div>

            {/* Left side — doesn't know it's right */}
            <GlassCard
              borderColor="rgba(34,197,94,0.4)"
              style={{
                opacity: rightTextOpacity,
                transform: `scale(${rightTextOpacity})`,
                padding: "20px 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#22c55e",
                  direction: "rtl",
                  textShadow: "0 0 15px rgba(34,197,94,0.3)",
                }}
              >
                לא יודע שהוא צודק
              </div>
            </GlassCard>
          </div>

          {/* "Same thing for the model" */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              color: COLORS.textMuted,
              direction: "rtl",
              opacity: rightTextOpacity > 0.8 ? 1 : 0,
              marginTop: 4,
            }}
          >
            אותו דבר בשבילו
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 3: WRITING STYLES ══════════════ */}
      {frame >= 570 && frame < 800 && (
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 80,
            left: 80,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            opacity: phase3Opacity,
          }}
        >
          {/* Three style cards */}
          <div style={{ display: "flex", gap: 28 }}>
            <StyleCard
              icon="📖"
              title="סגנון אקדמי"
              example="על פי ממצאים עדכניים בתחום..."
              borderColor="#3b82f6"
              scale={card1Scale}
              opacity={card1Scale}
            />
            <StyleCard
              icon="📰"
              title="סגנון עיתונאי"
              example="כפי שדווח לאחרונה..."
              borderColor="#22c55e"
              scale={card2Scale}
              opacity={card2Scale}
            />
            <StyleCard
              icon="📚"
              title="סגנון אנציקלופדי"
              example="בהתאם להגדרה המקובלת..."
              borderColor={COLORS.secondary}
              scale={card3Scale}
              opacity={card3Scale}
            />
          </div>

          {/* Explanation */}
          <div
            style={{
              direction: "rtl",
              textAlign: "center",
              opacity: styleConclusion,
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 10,
              }}
            >
              המודל למד לכתוב ב<span style={{ color: COLORS.primary, fontWeight: 800 }}>סגנון מקצועי</span>
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                color: COLORS.textMuted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <span style={{ color: COLORS.accent, fontSize: 28 }}>←</span>
              לא בגלל שהוא <span style={{ color: COLORS.warning, fontWeight: 700 }}>יודע</span> — בגלל שהוא <span style={{ color: COLORS.primary, fontWeight: 700 }}>למד את הסגנון</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 4: CONCLUSION ══════════════ */}
      {frame >= 770 && (
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
            opacity: phase4Opacity,
            gap: 20,
          }}
        >
          {/* Main conclusion */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              direction: "rtl",
            }}
          >
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 56,
                fontWeight: 700,
                color: COLORS.text,
                transform: `scale(${conclusionScale1})`,
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                letterSpacing: "-0.5px",
              }}
            >
              ניסוח מקצועי
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.warning,
                transform: `scale(${neqScale})`,
                textShadow: `0 0 ${30 + glowPulse * 30}px ${COLORS.warning}${Math.round(80 + glowPulse * 80).toString(16).padStart(2, "0")}`,
              }}
            >
              ≠
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 56,
                fontWeight: 700,
                color: COLORS.warning,
                transform: `scale(${conclusionScale2})`,
                textShadow: `0 0 30px ${COLORS.warning}44, 0 2px 12px rgba(0,0,0,0.5)`,
                letterSpacing: "-0.5px",
              }}
            >
              מידע מדויק
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.textMuted,
              direction: "rtl",
              textAlign: "center",
              opacity: interpolate(frame, [845, 860], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              marginTop: 8,
            }}
          >
            גם מידע לא מדויק יכול להופיע באותו ניסוח מקצועי ומשכנע
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
