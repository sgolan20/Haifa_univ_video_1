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
 * Shot 4.1 — "מה זה אומר עבורכם כסטודנטים?"
 *
 * Duration: 873 frames (29.09s)
 *
 * Phase 1 (f0-250):   Title + "האחריות היא תמיד של המשתמש"
 * Phase 2 (f250-873): 4 rule cards in 2×2 grid with staggered animations
 *
 * Narration timecodes (relative to shot start at 87.06s):
 *   0.0s  "מה זה אומר עבורכם כסטודנטים?"
 *   2.8s  "המשמעות היא שהאחריות לשימוש נכון...היא תמיד של המשתמש"
 *   7.8s  "כמה כללים חשובים"
 *  10.7s  "אל תסתמכו על טענות עובדתיות בלי אימות"
 *  13.3s  "בדקו במיוחד שמות חוקרים, תאריכים, נתונים ומקורות"
 *  18.6s  "השתמשו במודל כנקודת פתיחה לחשיבה – לא כמקור סמכות"
 *  23.4s  "וזכרו: סגנון משכנע אינו ערובה לכך שהמידע נכון"
 */

/* ─── SVG Icons ────────────────────────────────────────────── */

const VerifyIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="3" />
    <line x1="30" y1="30" x2="42" y2="42" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M14 20 L18 24 L26 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChecklistIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="4" width="36" height="40" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M14 16 L17 19 L22 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="26" y1="17" x2="36" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 26 L17 29 L22 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="26" y1="27" x2="36" y2="27" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="37" r="3" stroke={color} strokeWidth="2" />
    <line x1="26" y1="37" x2="36" y2="37" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LightbulbIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 4 C16 4, 10 10, 10 18 C10 24, 14 28, 18 30 L18 36 L30 36 L30 30 C34 28, 38 24, 38 18 C38 10, 32 4, 24 4Z"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />
    <line x1="18" y1="40" x2="30" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="44" x2="28" y2="44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Rays */}
    <line x1="24" y1="0" x2="24" y2="2" stroke={color} strokeWidth="2" opacity={0.5} />
    <line x1="40" y1="18" x2="42" y2="18" stroke={color} strokeWidth="2" opacity={0.5} />
    <line x1="6" y1="18" x2="8" y2="18" stroke={color} strokeWidth="2" opacity={0.5} />
  </svg>
);

const ShieldIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 4 L40 12 L40 24 C40 34, 32 42, 24 46 C16 42, 8 34, 8 24 L8 12 Z"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />
    <text x="24" y="30" textAnchor="middle" fontFamily={FONT_FAMILY} fontSize="20" fontWeight="800" fill={color}>!</text>
  </svg>
);

/* ─── Rule Card Component ──────────────────────────────────── */

const RuleCard: React.FC<{
  number: number;
  icon: React.ReactNode;
  text: string;
  borderColor: string;
  scale: number;
  opacity: number;
  children?: React.ReactNode;
  highlighted?: boolean;
}> = ({ number, icon, text, borderColor, scale, opacity, children, highlighted }) => (
  <div
    style={{
      opacity,
      transform: `scale(${scale})`,
      flex: 1,
      minWidth: 0,
    }}
  >
    <div
      style={{
        background: highlighted
          ? "rgba(255,255,255,0.08)"
          : "rgba(255,255,255,0.05)",
        backdropFilter: "blur(16px)",
        border: `1.5px solid ${borderColor}${highlighted ? "88" : "55"}`,
        borderRadius: 20,
        padding: "28px 30px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: highlighted
          ? `0 0 30px ${borderColor}18`
          : `0 0 20px ${borderColor}08`,
        transition: "none",
      }}
    >
      {/* Header row: number badge + icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          direction: "rtl",
        }}
      >
        {/* Number badge */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: `${COLORS.accent}22`,
            border: `2px solid ${COLORS.accent}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            fontWeight: 800,
            color: COLORS.accent,
          }}
        >
          {number}
        </div>
        {icon}
      </div>

      {/* Rule text */}
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 600,
          color: COLORS.text,
          direction: "rtl",
          textAlign: "right",
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {text}
      </div>

      {/* Optional extra content (tags, split text, etc.) */}
      {children}
    </div>
  </div>
);

/* ─── Main Shot Component ──────────────────────────────────── */

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Title ── */
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [20, 0], {
    extrapolateRight: "clamp",
  });

  /* ── Responsibility text ── */
  const respOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const underlineWidth = interpolate(frame, [90, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title shrinks and moves up when cards appear
  const headerScale = interpolate(frame, [230, 270], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [230, 270], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* ── Rule Cards ── */
  const card1 = spring({ frame: frame - 300, fps, config: { damping: 16, stiffness: 80, mass: 0.8 } });
  const card2 = spring({ frame: frame - 400, fps, config: { damping: 16, stiffness: 80, mass: 0.8 } });
  const card3 = spring({ frame: frame - 530, fps, config: { damping: 16, stiffness: 80, mass: 0.8 } });
  const card4 = spring({ frame: frame - 660, fps, config: { damping: 16, stiffness: 80, mass: 0.8 } });

  // Tags for rule 2
  const tags = ["חוקרים", "תאריכים", "נתונים", "מקורות"];

  // All cards highlight at the end
  const allHighlight = frame > 800;

  return (
    <AbsoluteFill>
      {/* Background image */}
      <Img
        src={staticFile("video2b/images/shot4_1_bg.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.bgSecondary}aa 0%, ${COLORS.bgPrimary}f0 70%)`,
        }}
      />

      {/* ══════════════ HEADER ══════════════ */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 80,
          left: 80,
          direction: "rtl",
          textAlign: "right",
          opacity: titleOpacity,
          transform: `translateY(${titleY + headerY}px) scale(${headerScale})`,
          transformOrigin: "top right",
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
          מה זה אומר עבורכם כסטודנטים?
        </div>
        <div
          style={{ marginTop: 12, height: 3, width: 200, background: `linear-gradient(to left, ${COLORS.primary}, transparent)`, borderRadius: 2 }}
        />

        {/* Responsibility text */}
        <div
          style={{
            marginTop: 20,
            opacity: respOpacity,
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.accent,
              textShadow: `0 0 20px ${COLORS.accent}44`,
            }}
          >
            האחריות היא תמיד של המשתמש
          </div>
          {/* Animated underline */}
          <div
            style={{
              marginTop: 8,
              height: 3,
              width: `${underlineWidth}%`,
              maxWidth: 500,
              background: `linear-gradient(to left, ${COLORS.accent}, ${COLORS.accent}44)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* ══════════════ RULE CARDS 2×2 GRID ══════════════ */}
      {frame > 270 && (
        <div
          style={{
            position: "absolute",
            top: 260,
            right: 60,
            left: 60,
            bottom: 40,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Top row */}
          <div style={{ display: "flex", gap: 20, flex: 1, direction: "rtl" }}>
            <RuleCard
              number={1}
              icon={<VerifyIcon color={COLORS.primary} />}
              text="אל תסתמכו על טענות עובדתיות בלי אימות"
              borderColor={COLORS.primary}
              scale={card1}
              opacity={card1}
              highlighted={allHighlight}
            />
            <RuleCard
              number={2}
              icon={<ChecklistIcon color="#3b82f6" />}
              text="בדקו במיוחד שמות חוקרים, תאריכים, נתונים ומקורות"
              borderColor="#3b82f6"
              scale={card2}
              opacity={card2}
              highlighted={allHighlight}
            >
              {/* Tags */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", direction: "rtl" }}>
                {tags.map((tag, i) => {
                  const tagOpacity = spring({
                    frame: frame - 440 - i * 20,
                    fps,
                    config: { damping: 14, stiffness: 120, mass: 0.5 },
                  });
                  return (
                    <div
                      key={tag}
                      style={{
                        opacity: tagOpacity,
                        transform: `scale(${tagOpacity})`,
                        fontFamily: FONT_FAMILY,
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#3b82f6",
                        background: "rgba(59,130,246,0.12)",
                        border: "1px solid rgba(59,130,246,0.3)",
                        borderRadius: 8,
                        padding: "4px 14px",
                      }}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </RuleCard>
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", gap: 20, flex: 1, direction: "rtl" }}>
            <RuleCard
              number={3}
              icon={<LightbulbIcon color="#22c55e" />}
              text="השתמשו במודל כנקודת פתיחה לחשיבה — לא כמקור סמכות"
              borderColor="#22c55e"
              scale={card3}
              opacity={card3}
              highlighted={allHighlight}
            >
              {/* Split ✓/✗ */}
              <div style={{ display: "flex", gap: 16, direction: "rtl" }}>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#22c55e",
                    opacity: card3 > 0.8 ? 1 : 0,
                  }}
                >
                  ✓ נקודת פתיחה
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.warning,
                    opacity: card3 > 0.8 ? 1 : 0,
                  }}
                >
                  ✗ מקור סמכות
                </div>
              </div>
            </RuleCard>
            <RuleCard
              number={4}
              icon={<ShieldIcon color={COLORS.warning} />}
              text="סגנון משכנע אינו ערובה לכך שהמידע נכון"
              borderColor={COLORS.warning}
              scale={card4}
              opacity={card4}
              highlighted={allHighlight}
            >
              {/* ≠ emphasis */}
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 800,
                  color: COLORS.warning,
                  direction: "rtl",
                  opacity: card4 > 0.8 ? 1 : 0,
                  textShadow: `0 0 15px ${COLORS.warning}44`,
                }}
              >
                סגנון משכנע ≠ מידע נכון
              </div>
            </RuleCard>
          </div>
        </div>
      )}

    </AbsoluteFill>
  );
};
