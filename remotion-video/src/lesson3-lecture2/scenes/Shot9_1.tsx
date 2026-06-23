import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 9.1 — Summary (668 frames · 22.25s · audioStart 177.9s)
 *
 * Narration (relative):
 *   0.5s  "לסיכום,"
 *   1.5s  "אין רשימת מותר ואסור אחת שמתאימה לכל מצב."
 *   5.3s  "שימוש אחראי ב-AI דורש שיקול דעת,"
 *   8.2s  "להבין את מטרת המשימה,"
 *   9.8s  "את הציפיות של המרצה ואת המקום של הכלי בתוך תהליך הלמידה שלכם."
 *  15.8s  "במילים אחרות, לא כל שימוש ב-AI הוא בעייתי, אבל כל שימוש דורש מחשבה."
 *  21.5s  "להתראות."
 */
const PILLARS = [
  { text: "מטרת המשימה", kind: "target" as const, color: COLORS.primary, at: 246 },
  { text: "ציפיות המרצה", kind: "cap" as const, color: COLORS.accent, at: 295 },
  { text: "מקום הכלי בלמידה", kind: "puzzle" as const, color: COLORS.secondary, at: 351 },
];

/** Bright vector icons drawn in each pillar's accent color — visible on the dark cards. */
const PillarIcon: React.FC<{ kind: "target" | "cap" | "puzzle"; color: string }> = ({ kind, color }) => {
  if (kind === "target") {
    return (
      <svg width={44} height={44} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <circle cx={12} cy={12} r={9.5} stroke={color} strokeWidth={2} />
        <circle cx={12} cy={12} r={5.2} stroke={color} strokeWidth={2} />
        <circle cx={12} cy={12} r={1.9} fill={color} />
      </svg>
    );
  }
  if (kind === "cap") {
    return (
      <svg width={44} height={44} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <path d="M12 4 L22 9 L12 14 L2 9 Z" fill={color} fillOpacity={0.22} stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
        <path d="M6 11 V16 C6 17.7 8.7 19 12 19 C15.3 19 18 17.7 18 16 V11" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M22 9 V15.4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={22} cy={16} r={1.2} fill={color} />
      </svg>
    );
  }
  return (
    <svg width={44} height={44} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"
        fill={color} fillOpacity={0.85}
      />
    </svg>
  );
};

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 100, mass: 0.75 } });
  const headline = spring({ frame: frame - 44, fps, config: { damping: 15, stiffness: 88, mass: 0.85 } });
  const judgment = spring({ frame: frame - 159, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const closing = spring({ frame: frame - 468, fps, config: { damping: 14, stiffness: 95, mass: 0.8 } });
  const bye = interpolate(frame, [625, 645], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_summary.png" dur={668} maxOpacity={0.5} />
      <Particles accent={COLORS.accent} />

      {/* "לסיכום" badge */}
      <div style={{ position: "absolute", top: 56, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: badge, transform: `scale(${badge})` }}>
        <span style={{ padding: "10px 34px", borderRadius: 999, background: `${COLORS.primary}1f`, border: `1.5px solid ${COLORS.primary}`, fontSize: 30, fontWeight: 800, color: COLORS.primary, direction: "rtl" }}>
          לסיכום
        </span>
      </div>

      {/* headline */}
      <div style={{ position: "absolute", top: 126, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.92, 1])})` }}>
        <div style={{ maxWidth: 1320, textAlign: "center", direction: "rtl", fontSize: 56, fontWeight: 900, color: COLORS.text, lineHeight: 1.22, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
          אין רשימת <span style={{ color: "#22c55e" }}>״מותר</span> <span style={{ color: COLORS.warning }}>ואסור״</span> אחת שמתאימה לכל מצב
        </div>
      </div>

      {/* judgment line */}
      <div style={{ position: "absolute", top: 278, left: 0, right: 0, textAlign: "center", opacity: judgment }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>
          שימוש אחראי ב-<span style={{ direction: "ltr", unicodeBidi: "isolate" }}>AI</span> דורש <span style={{ color: COLORS.accent, fontWeight: 900 }}>שיקול דעת</span> — להבין:
        </div>
      </div>

      {/* the three pillars */}
      <div style={{ position: "absolute", top: 364, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 42, direction: "rtl" }}>
        {PILLARS.map((p, i) => {
          const pop = spring({ frame: frame - p.at, fps, config: { damping: 13, stiffness: 105, mass: 0.7 } });
          const float = Math.sin((frame + i * 45) * 0.05) * 4;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, minHeight: 96, padding: "26px 42px", borderRadius: 22, direction: "rtl", background: `linear-gradient(160deg, ${p.color}18 0%, rgba(255,255,255,0.045) 100%)`, backdropFilter: "blur(12px)", border: `2px solid ${p.color}70`, boxShadow: `0 12px 38px rgba(0,0,0,0.36), 0 0 34px ${p.color}24`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <PillarIcon kind={p.kind} color={p.color} />
              <span style={{ fontSize: 37, fontWeight: 850, color: COLORS.text }}>{p.text}</span>
            </div>
          );
        })}
      </div>

      {/* closing message */}
      <div style={{ position: "absolute", bottom: 82, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: closing, transform: `translateY(${interpolate(closing, [0, 1], [22, 0])}px)` }}>
        <div style={{ maxWidth: 1360, padding: "28px 54px", borderRadius: 24, textAlign: "center", direction: "rtl", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(14px)", border: `2px solid ${COLORS.accent}5f`, boxShadow: `0 0 44px ${COLORS.accent}28`, fontSize: 40, fontWeight: 850, color: COLORS.text, lineHeight: 1.32 }}>
          לא כל שימוש ב-AI הוא <span style={{ color: "#fca5a5" }}>בעייתי</span> — אבל כל שימוש דורש <span style={{ color: COLORS.accent }}>מחשבה</span>
        </div>
      </div>

      {/* goodbye */}
      <div style={{ position: "absolute", bottom: 34, left: 0, right: 0, textAlign: "center", opacity: bye }}>
        <span style={{ fontSize: 28, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>להתראות 👋</span>
      </div>
    </AbsoluteFill>
  );
};
