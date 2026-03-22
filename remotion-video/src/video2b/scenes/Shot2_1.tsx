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
 * Shot 2.1 — "איך מודל שפה מייצר תשובה"
 *
 * Phase 1 (f0-500):   Split screen — search engine vs. language model
 * Phase 2 (f500-1000): Word prediction example with probability bars
 * Phase 3 (f1000-1200): Good answer vs. statistical guessing
 * Phase 4 (f1200-1363): Conclusion — "sounds correct even without source"
 */

/* ─── SVG Icon Components ──────────────────────────────────── */

const SearchIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = COLORS.textMuted,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="28" cy="28" r="18" stroke={color} strokeWidth="3.5" fill="none" />
    <line x1="42" y1="42" x2="56" y2="56" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="20" y1="22" x2="36" y2="22" stroke={color} strokeWidth="2" opacity={0.5} />
    <line x1="20" y1="28" x2="32" y2="28" stroke={color} strokeWidth="2" opacity={0.5} />
    <line x1="20" y1="34" x2="34" y2="34" stroke={color} strokeWidth="2" opacity={0.5} />
  </svg>
);

const BrainIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = COLORS.primary,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 8 C20 8, 10 18, 10 28 C10 38, 18 44, 24 46 L24 56 L40 56 L40 46 C46 44, 54 38, 54 28 C54 18, 44 8, 32 8Z"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />
    <circle cx="24" cy="24" r="3" fill={color} opacity={0.8} />
    <circle cx="40" cy="24" r="3" fill={color} opacity={0.8} />
    <circle cx="32" cy="32" r="3" fill={color} opacity={0.8} />
    <circle cx="26" cy="38" r="2.5" fill={color} opacity={0.6} />
    <circle cx="38" cy="38" r="2.5" fill={color} opacity={0.6} />
    <line x1="24" y1="24" x2="32" y2="32" stroke={color} strokeWidth="1.5" opacity={0.4} />
    <line x1="40" y1="24" x2="32" y2="32" stroke={color} strokeWidth="1.5" opacity={0.4} />
    <line x1="32" y1="32" x2="26" y2="38" stroke={color} strokeWidth="1.5" opacity={0.4} />
    <line x1="32" y1="32" x2="38" y2="38" stroke={color} strokeWidth="1.5" opacity={0.4} />
  </svg>
);

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
      padding: "32px 36px",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── Probability Bar (large version) ──────────────────────── */

const ProbBar: React.FC<{
  label: string;
  pct: number;
  color: string;
  growth: number;
  isWinner?: boolean;
}> = ({ label, pct, color, growth, isWinner }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      width: 150,
    }}
  >
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 26,
        fontWeight: 800,
        color: isWinner ? COLORS.accent : COLORS.textMuted,
        opacity: growth > 0.3 ? 1 : 0,
        textShadow: isWinner ? `0 0 20px ${COLORS.accent}88` : "none",
      }}
    >
      {`${Math.round(pct * growth)}%`}
    </div>
    <div
      style={{
        width: 90,
        height: 220,
        background: "rgba(255,255,255,0.04)",
        borderRadius: 12,
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        border: isWinner
          ? `1px solid ${COLORS.accent}44`
          : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${pct * growth}%`,
          background: isWinner
            ? `linear-gradient(to top, ${color}, ${COLORS.accent})`
            : `linear-gradient(to top, ${color}88, ${color})`,
          borderRadius: "12px 12px 0 0",
          boxShadow: isWinner
            ? `0 0 30px ${COLORS.accent}55, inset 0 1px 0 rgba(255,255,255,0.2)`
            : `inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      />
    </div>
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 22,
        fontWeight: 600,
        color: isWinner ? COLORS.accent : "rgba(255,255,255,0.85)",
        direction: "rtl",
        textShadow: isWinner ? `0 0 12px ${COLORS.accent}66` : "none",
      }}
    >
      {label}
    </div>
  </div>
);

/* ─── Main Shot Component ──────────────────────────────────── */

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Phase visibility ── */
  const phase1Opacity = interpolate(frame, [460, 500], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2Opacity = interpolate(frame, [480, 520, 1160, 1200], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3Opacity = interpolate(frame, [980, 1020, 1160, 1200], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase4Opacity = interpolate(frame, [1180, 1220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 1: Split Screen ── */
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: "clamp",
  });

  const rightCardScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const leftCardScale = spring({
    frame: frame - 70,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const xMarkOpacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightCardDim = interpolate(frame, [240, 300], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const checkOpacity = interpolate(frame, [220, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Word-by-word animation
  const wordByWordWords = ["מילה", "אחרי", "מילה", "אחרי", "מילה..."];
  const wordByWordStart = 260;

  /* ── Phase 2: Word Prediction ── */
  const questionText = "מהם הגורמים המרכזיים למוטיבציה בלמידה?";
  const typewriterProgress = interpolate(
    frame,
    [520, 660],
    [0, questionText.length],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const displayedQuestion = questionText.slice(0, Math.floor(typewriterProgress));

  const barsData = [
    { label: "אוטונומיה", pct: 45, color: COLORS.primary },
    { label: "מסוגלות", pct: 30, color: COLORS.secondary },
    { label: "משמעות", pct: 20, color: "#3b82f6" },
    { label: "אחר", pct: 5, color: COLORS.textMuted },
  ];

  const winnerGlow = interpolate(frame, [840, 870], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const answerText = "מוטיבציה קשורה לאוטונומיה, תחושת מסוגלות, משמעות בלמידה";
  const answerOpacity = interpolate(frame, [810, 840], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const successBadge = interpolate(frame, [940, 970], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Phase 3: Uncertain bars ── */
  const uncertainBarsData = [
    { label: "תוצאה א׳", pct: 28 },
    { label: "תוצאה ב׳", pct: 25 },
    { label: "תוצאה ג׳", pct: 24 },
    { label: "תוצאה ד׳", pct: 23 },
  ];

  /* ── Phase 4: Conclusion ── */
  const conclusionLine1 = spring({
    frame: frame - 1220,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const conclusionLine2 = spring({
    frame: frame - 1270,
    fps,
    config: { damping: 16, stiffness: 80, mass: 0.8 },
  });
  const underlineWidth = interpolate(frame, [1300, 1363], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Background image */}
      <Img
        src={staticFile("video2b/images/shot2_1_bg.png")}
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
          איך מודל שפה מייצר תשובה
        </div>
        {/* Decorative line under title */}
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

      {/* ══════════════ PHASE 1: SPLIT SCREEN ══════════════ */}
      {frame < 520 && (
        <div
          style={{
            position: "absolute",
            top: 160,
            right: 80,
            left: 80,
            bottom: 60,
            display: "flex",
            gap: 50,
            direction: "rtl",
            opacity: phase1Opacity,
          }}
        >
          {/* Right card: Search engine (wrong way) */}
          <div style={{ flex: 1, opacity: rightCardDim }}>
            <GlassCard
              borderColor={`${COLORS.warning}55`}
              style={{
                transform: `scale(${rightCardScale})`,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 28,
                position: "relative",
                boxShadow: `inset 0 0 60px ${COLORS.warning}08`,
              }}
            >
              {/* X mark — centered above icon */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `${COLORS.warning}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: xMarkOpacity,
                  border: `2.5px solid ${COLORS.warning}55`,
                  boxShadow: `0 0 24px ${COLORS.warning}33`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 44,
                    fontWeight: 800,
                    color: COLORS.warning,
                    textShadow: `0 0 20px ${COLORS.warning}66`,
                  }}
                >
                  ✗
                </span>
              </div>
              {/* Icon container with glow */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${COLORS.textMuted}15 0%, transparent 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchIcon size={90} color={COLORS.textMuted} />
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.text,
                  direction: "rtl",
                  letterSpacing: "-0.3px",
                }}
              >
                מחפש במאגר ידע
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  color: COLORS.textMuted,
                  direction: "rtl",
                  lineHeight: 1.5,
                }}
              >
                שולף תשובה ממסמכים קיימים
              </div>
              {/* Document icons */}
              <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 56,
                      height: 68,
                      border: `1px solid ${COLORS.textMuted}33`,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ width: 32, display: "flex", flexDirection: "column", gap: 5 }}>
                      <div style={{ height: 2, background: COLORS.textMuted, opacity: 0.25, borderRadius: 1 }} />
                      <div style={{ height: 2, background: COLORS.textMuted, opacity: 0.25, borderRadius: 1, width: "70%" }} />
                      <div style={{ height: 2, background: COLORS.textMuted, opacity: 0.25, borderRadius: 1 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 52,
                  fontWeight: 800,
                  color: COLORS.warning,
                  opacity: xMarkOpacity,
                  textShadow: `0 0 20px ${COLORS.warning}55`,
                }}
              >
                ככה זה <span style={{ fontWeight: 800 }}>לא</span> עובד
              </div>
            </GlassCard>
          </div>

          {/* Left card: Language model (correct way) */}
          <div style={{ flex: 1 }}>
            <GlassCard
              borderColor={`${COLORS.primary}66`}
              style={{
                transform: `scale(${leftCardScale})`,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 28,
                position: "relative",
                boxShadow: `inset 0 0 60px ${COLORS.primary}08, 0 0 40px ${COLORS.primary}0a`,
              }}
            >
              {/* Checkmark — centered above icon */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkOpacity,
                  border: "2.5px solid rgba(34,197,94,0.5)",
                  boxShadow: "0 0 24px rgba(34,197,94,0.25)",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 44,
                    fontWeight: 800,
                    color: "#22c55e",
                    textShadow: "0 0 20px rgba(34,197,94,0.4)",
                  }}
                >
                  ✓
                </span>
              </div>
              {/* Icon container with glow */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${COLORS.primary}18 0%, transparent 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BrainIcon size={90} color={COLORS.primary} />
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 36,
                  fontWeight: 700,
                  color: COLORS.text,
                  direction: "rtl",
                  letterSpacing: "-0.3px",
                }}
              >
                מייצר מילה אחרי מילה
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  color: COLORS.textMuted,
                  direction: "rtl",
                  lineHeight: 1.5,
                }}
              >
                לפי הסתברות סטטיסטית
              </div>
              {/* Word-by-word animation */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                {wordByWordWords.map((w, i) => {
                  const wordOpacity = interpolate(
                    frame,
                    [wordByWordStart + i * 25, wordByWordStart + i * 25 + 15],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  const wordY = interpolate(
                    frame,
                    [wordByWordStart + i * 25, wordByWordStart + i * 25 + 15],
                    [8, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <div
                      key={i}
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 28,
                        fontWeight: 700,
                        color: COLORS.primary,
                        opacity: wordOpacity,
                        transform: `translateY(${wordY}px)`,
                        background: `${COLORS.primary}12`,
                        padding: "6px 16px",
                        borderRadius: 10,
                        border: `1px solid ${COLORS.primary}33`,
                      }}
                    >
                      {w}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 52,
                  fontWeight: 800,
                  color: "#22c55e",
                  opacity: checkOpacity,
                  textShadow: "0 0 20px rgba(34,197,94,0.4)",
                }}
              >
                ככה <span style={{ fontWeight: 800 }}>כן</span> עובד
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 2: WORD PREDICTION ══════════════ */}
      {frame >= 480 && frame < 1220 && (
        <div
          style={{
            position: "absolute",
            top: 140,
            right: 80,
            left: 80,
            direction: "rtl",
            opacity: phase2Opacity,
          }}
        >
          {/* Question input bar */}
          <GlassCard
            borderColor={`${COLORS.accent}55`}
            style={{
              marginBottom: 36,
              padding: "20px 36px",
              boxShadow: `0 0 30px ${COLORS.accent}0a`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  color: COLORS.accent,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  textShadow: `0 0 12px ${COLORS.accent}44`,
                }}
              >
                שאלה:
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 30,
                  fontWeight: 500,
                  color: COLORS.text,
                  direction: "rtl",
                  flex: 1,
                  letterSpacing: "-0.3px",
                }}
              >
                {displayedQuestion}
                {frame < 660 && (
                  <span
                    style={{
                      opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0,
                      color: COLORS.accent,
                      fontWeight: 300,
                    }}
                  >
                    |
                  </span>
                )}
              </div>
            </div>
          </GlassCard>

          {/* Probability bars + Answer area */}
          <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
            {/* Left side: Probability bars */}
            <div style={{ flex: "0 0 auto" }}>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  marginBottom: 20,
                  textAlign: "center",
                  direction: "rtl",
                  opacity: interpolate(frame, [700, 720], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                הסתברות המילה הבאה
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-end",
                  opacity: interpolate(frame, [700, 720], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                {barsData.map((bar, i) => {
                  const staggeredGrowth = spring({
                    frame: frame - 720 - i * 8,
                    fps,
                    config: { damping: 18, stiffness: 60, mass: 1 },
                  });
                  return (
                    <ProbBar
                      key={bar.label}
                      label={bar.label}
                      pct={bar.pct}
                      color={bar.color}
                      growth={staggeredGrowth}
                      isWinner={i === 0 && winnerGlow > 0.5}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right side: Answer card */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ opacity: answerOpacity }}>
                <GlassCard
                  borderColor="#22c55e66"
                  style={{
                    boxShadow: "0 0 30px rgba(34,197,94,0.08)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 24,
                      color: "#22c55e",
                      fontWeight: 700,
                      marginBottom: 16,
                      direction: "rtl",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 28 }}>✓</span>
                    תשובת המודל:
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 30,
                      fontWeight: 500,
                      color: COLORS.text,
                      direction: "rtl",
                      textAlign: "right",
                      lineHeight: 1.7,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {answerText}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 22,
                      color: COLORS.textMuted,
                      direction: "rtl",
                      marginTop: 16,
                      fontStyle: "italic",
                    }}
                  >
                    נראה כמו הסבר אקדמי הגיוני
                  </div>
                </GlassCard>
              </div>

              {/* Success badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  opacity: successBadge,
                  transform: `scale(${interpolate(successBadge, [0, 1], [0.8, 1])})`,
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.06))",
                    border: "1.5px solid rgba(34,197,94,0.4)",
                    borderRadius: 14,
                    padding: "14px 32px",
                    fontFamily: FONT_FAMILY,
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#22c55e",
                    direction: "rtl",
                    textShadow: "0 0 20px rgba(34,197,94,0.3)",
                    boxShadow: "0 0 30px rgba(34,197,94,0.1)",
                  }}
                >
                  ✓ ברוב המקרים: מצוין
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ PHASE 3: UNCERTAIN BARS ══════════════ */}
      {frame >= 980 && frame < 1220 && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 80,
            left: 80,
            direction: "rtl",
            opacity: phase3Opacity,
          }}
        >
          <GlassCard
            borderColor={`${COLORS.accent}66`}
            style={{
              boxShadow: `0 0 40px ${COLORS.accent}0c`,
              padding: "28px 40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 50 }}>
              {/* Uncertain bars */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
                {uncertainBarsData.map((bar, i) => {
                  const staggeredGrowth = spring({
                    frame: frame - 1040 - i * 6,
                    fps,
                    config: { damping: 18, stiffness: 60, mass: 1 },
                  });
                  return (
                    <div
                      key={bar.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONT_FAMILY,
                          fontSize: 28,
                          color: COLORS.accent,
                          fontWeight: 800,
                          opacity: staggeredGrowth > 0.5 ? 1 : 0,
                          textShadow: `0 0 14px ${COLORS.accent}66`,
                        }}
                      >
                        ?
                      </div>
                      <div
                        style={{
                          width: 56,
                          height: 110,
                          background: "rgba(255,255,255,0.04)",
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "flex-end",
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: `${bar.pct * staggeredGrowth}%`,
                            background: `${COLORS.accent}77`,
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Text */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 34,
                    fontWeight: 700,
                    color: COLORS.accent,
                    direction: "rtl",
                    textAlign: "right",
                    marginBottom: 12,
                    textShadow: `0 0 20px ${COLORS.accent}44`,
                  }}
                >
                  ❓ כשאין מידע ברור — ניחוש סטטיסטי
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 26,
                    color: "rgba(255,255,255,0.75)",
                    direction: "rtl",
                    textAlign: "right",
                    lineHeight: 1.7,
                  }}
                >
                  המודל משלים פערים במידע באמצעות הסתברות —
                  <br />
                  התוצאה נשמעת משכנעת, אבל לא בהכרח מדויקת
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ══════════════ PHASE 4: CONCLUSION ══════════════ */}
      {frame >= 1180 && (
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
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 58,
              fontWeight: 700,
              color: COLORS.text,
              direction: "rtl",
              textAlign: "center",
              transform: `scale(${conclusionLine1})`,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              letterSpacing: "-0.5px",
            }}
          >
            יכולה להיווצר תשובה שנשמעת נכונה
          </div>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 52,
              fontWeight: 700,
              color: COLORS.warning,
              direction: "rtl",
              textAlign: "center",
              transform: `scale(${conclusionLine2})`,
              textShadow: `0 0 40px ${COLORS.warning}55, 0 2px 12px rgba(0,0,0,0.5)`,
              position: "relative",
              letterSpacing: "-0.5px",
            }}
          >
            גם אם אין לה מקור ברור
            {/* Animated underline */}
            <div
              style={{
                position: "absolute",
                bottom: -10,
                right: "50%",
                transform: "translateX(50%)",
                width: `${underlineWidth}%`,
                height: 4,
                background: `linear-gradient(90deg, transparent, ${COLORS.warning}, transparent)`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
