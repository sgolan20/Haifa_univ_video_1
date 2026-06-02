import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 5.1 — Hybrid systems (the lines blur)
 * Duration: 950 frames (31.66s) · audioStart 94.52s
 *
 * f0:    title + two separated cards (search ⇄ AI)
 * f285:  search card gains an "AI summary layer" badge
 * f650:  AI card gains a "source references" badge
 * f815:  the two blend — bidirectional arrow + "מערכות היברידיות" glows
 *
 * Narration (relative):
 *   0.0s  "כאן חשוב לשים לב: גם מנועי חיפוש... וגם מודלי שפה אינם מנותקים ממקורות."
 *   9.5s  "מנועי חיפוש משלבים כיום שכבות של סיכום ופרשנות שמבוססות על מודלי שפה,"
 *  21.6s  "מודלי שפה רבים משלבים הפניות למקורות..."
 *  27.3s  "בפועל אנחנו פוגשים יותר ויותר מערכות היברידיות."
 */
export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const cards = spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 85, mass: 0.8 } });

  const searchBadge = spring({ frame: frame - 285, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const aiBadge = spring({ frame: frame - 650, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  const merge = spring({ frame: frame - 815, fps, config: { damping: 16, stiffness: 80, mass: 0.9 } });
  const arrowPulse = 0.7 + 0.3 * Math.sin(frame * 0.18);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="hybrid_bg.png" dur={950} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 66, fontWeight: 800, direction: "rtl", background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: `0 2px 16px rgba(0,0,0,0.5)` }}>
          מערכות היברידיות
        </div>
        <div style={{ fontSize: 28, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", marginTop: 8 }}>הקווים בין הכלים מיטשטשים</div>
      </div>

      {/* two cards + center merge */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 40, direction: "rtl" }}>
        <SideCard
          scale={cards} color={COLORS.primary} title="מנוע חיפוש" base="קישורים למקורות"
          badge="+ שכבת סיכום AI" badgeColor={COLORS.secondary} badgeScale={searchBadge}
        />

        {/* center bidirectional arrow */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transform: `scale(${0.6 + merge * 0.4})`, opacity: 0.5 + merge * 0.5 }}>
          <div style={{ direction: "ltr", unicodeBidi: "isolate", fontSize: 60, fontWeight: 800, color: COLORS.accent, textShadow: `0 0 ${20 + arrowPulse * 24}px ${COLORS.accent}` }}>⇄</div>
        </div>

        <SideCard
          scale={cards} color={COLORS.secondary} title="מודל AI" base="יצירת טקסט"
          badge="+ הפניות למקור" badgeColor={COLORS.primary} badgeScale={aiBadge}
        />
      </div>
    </AbsoluteFill>
  );
};

const SideCard: React.FC<{ scale: number; color: string; title: string; base: string; badge: string; badgeColor: string; badgeScale: number }> = ({ scale, color, title, base, badge, badgeColor, badgeScale }) => (
  <div
    style={{
      transform: `scale(${scale})`,
      opacity: scale,
      width: 420,
      padding: "34px 30px 30px",
      borderRadius: 24,
      background: `linear-gradient(160deg, ${color}22 0%, rgba(255,255,255,0.03) 100%)`,
      backdropFilter: "blur(16px)",
      border: `2px solid ${color}77`,
      boxShadow: `0 0 50px ${color}26`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 16,
    }}
  >
    <div style={{ fontSize: 44, fontWeight: 800, color, direction: "rtl", textShadow: `0 0 26px ${color}66` }}>{title}</div>
    <div style={{ fontSize: 28, fontWeight: 400, color: COLORS.textMuted, direction: "rtl" }}>{base}</div>
    <div
      style={{
        transform: `scale(${badgeScale})`,
        opacity: badgeScale,
        marginTop: 6,
        padding: "12px 26px",
        borderRadius: 999,
        background: `${badgeColor}1f`,
        border: `1.5px solid ${badgeColor}88`,
        fontSize: 26,
        fontWeight: 700,
        color: badgeColor,
        direction: "rtl",
        textShadow: `0 0 16px ${badgeColor}44`,
      }}
    >
      {badge}
    </div>
  </div>
);
