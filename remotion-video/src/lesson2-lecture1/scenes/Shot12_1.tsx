import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 12.1 — Summary + teaser for Part B
 * Duration: 425 frames (14.16s) · audioStart 261.82s
 *
 * f0:    two summary cards return — search=retrieval / AI=generation
 * f228:  teaser — arrow to "חלק ב' — שיטת עבודה חכמה"
 *
 * Narration (relative):
 *   0.0s  "הבנה זו היא הבסיס לכל מה שנדון בחלק הבא."
 *   3.6s  "כי ברגע שמבינים מה כל כלי עושה ומה הוא אינו עושה,"
 *   7.6s  "אפשר להתחיל לבנות שיטת עבודה חכמה,"
 *  10.3s  "שתשרת אתכם גם מבחינה אקדמית וגם מבחינה מעשית."
 */
export const Shot12_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const cardR = spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } });
  const cardL = spring({ frame: frame - 70, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } });

  // teaser
  const cardsUp = spring({ frame: frame - 228, fps, config: { damping: 20, stiffness: 60, mass: 1 } });
  const teaser = spring({ frame: frame - 270, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.06);
  const fadeOut = interpolate(frame, [400, 425], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY, opacity: fadeOut }}>
      <SceneBg img="opening_bg.png" dur={425} maxOpacity={0.5} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 46, fontWeight: 700, color: COLORS.text, direction: "rtl", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>מה שחשוב לזכור</div>
      </div>

      {/* two summary cards (rise up before the teaser) */}
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 50, direction: "rtl", transform: `translateY(${cardsUp * -70}px)` }}>
        <SummaryCard scale={cardR} color={COLORS.primary} name="מנוע חיפוש" tag="שליפה" sub="מקור שניתן לאמת" />
        <SummaryCard scale={cardL} color={COLORS.secondary} name="מודל AI" tag="יצירה" sub="טקסט שדורש אימות" />
      </div>

      {/* teaser */}
      {frame > 262 && (
        <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, transform: `scale(${teaser})`, opacity: teaser }}>
          <div style={{ direction: "ltr", unicodeBidi: "isolate", fontSize: 40, color: COLORS.accent, opacity: 0.7 }}>▼</div>
          <div style={{ padding: "20px 50px", borderRadius: 999, background: `${COLORS.accent}1a`, border: `1.5px solid ${COLORS.accent}77`, fontSize: 44, fontWeight: 800, color: COLORS.accent, direction: "rtl", textShadow: `0 0 ${28 + glow * 24}px ${COLORS.accent}66` }}>
            חלק ב' — שיטת עבודה חכמה
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const SummaryCard: React.FC<{ scale: number; color: string; name: string; tag: string; sub: string }> = ({ scale, color, name, tag, sub }) => (
  <div style={{ transform: `scale(${scale})`, opacity: scale, width: 400, padding: "30px 0", borderRadius: 24, background: `linear-gradient(160deg, ${color}22 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(16px)", border: `2px solid ${color}77`, boxShadow: `0 0 44px ${color}26`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>{name}</div>
    <div style={{ fontSize: 48, fontWeight: 800, color, direction: "rtl", textShadow: `0 0 26px ${color}66` }}>{tag}</div>
    <div style={{ fontSize: 26, fontWeight: 400, color: COLORS.textMuted, direction: "rtl" }}>{sub}</div>
  </div>
);
