import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 9.1 — AI is an excellent tool (when you know its traits)
 * Duration: 840 frames (28s) · audioStart 200.7s
 *
 * f0:    positive title (tone shifts from red to turquoise/green)
 * f366:  four "great at…" cards with ✓
 * f720:  footer — a summarizing search engine is a handy starting point
 *
 * Narration (relative):
 *   0.0s  "חשוב להבהיר: זה לא אומר שמודלי AI הם כלים לא טובים, להפך,"
 *   5.7s  "הם כלים עם מאפיינים ייחודיים שחייבים להכיר ולדעת איך לעבוד איתם נכון."
 *  12.2s  "מודל AI מצוין בניסוח רעיונות, הסבר פשוט למושג מורכב, סיכום טקסטים, סיעור מוחות."
 *  24.0s  "גם מנוע חיפוש, כשהוא משלב סיכומים, יכול להיות נקודת פתיחה נוחה."
 */
const USES = [
  { icon: "💡", label: "ניסוח רעיונות" },
  { icon: "📘", label: "הסבר פשוט למושג מורכב" },
  { icon: "📝", label: "סיכום טקסטים" },
  { icon: "🧠", label: "סיעור מוחות" },
];

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const sub = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);
  const footer = spring({ frame: frame - 720, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="tools_bg.png" dur={840} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 62, fontWeight: 800, color: COLORS.primary, direction: "rtl", textShadow: `0 0 ${30 + glow * 26}px ${COLORS.primary}66, 0 2px 12px rgba(0,0,0,0.6)` }}>
          כלי מצוין — כשמכירים את המאפיינים
        </div>
        <div style={{ fontSize: 30, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", marginTop: 12, opacity: sub }}>
          מודל AI מצטיין ב:
        </div>
      </div>

      {/* four use cards */}
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22, direction: "rtl" }}>
        {USES.map((u, i) => <UseCard key={i} u={u} appearAt={366 + i * 55} />)}
      </div>

      {/* footer */}
      {frame > 712 && (
        <div style={{ position: "absolute", bottom: 130, left: 0, right: 0, textAlign: "center", transform: `scale(${footer})`, opacity: footer }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 40px", borderRadius: 999, background: `${COLORS.secondary}18`, border: `1.5px solid ${COLORS.secondary}66`, fontSize: 32, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>
            <span style={{ fontSize: 28 }}>🔍</span> מנוע חיפוש עם סיכום = נקודת פתיחה נוחה
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const UseCard: React.FC<{ u: { icon: string; label: string }; appearAt: number }> = ({ u, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt - 5) return null;
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 15, stiffness: 95, mass: 0.8 } });
  const check = spring({ frame: frame - appearAt - 12, fps, config: { damping: 13, stiffness: 120, mass: 0.7 } });
  return (
    <div style={{ transform: `scale(${s})`, opacity: s, position: "relative", width: 290, height: 220, padding: "30px 18px", borderRadius: 22, background: `linear-gradient(160deg, ${COLORS.primary}1f 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(14px)", border: `1.5px solid ${COLORS.primary}66`, boxShadow: `0 0 32px ${COLORS.primary}16`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: 56 }}>{u.icon}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", lineHeight: 1.3 }}>{u.label}</div>
      <div style={{ position: "absolute", top: 14, right: 16, transform: `scale(${check})`, opacity: check, fontSize: 30, color: "#4ade80" }}>✓</div>
    </div>
  );
};
