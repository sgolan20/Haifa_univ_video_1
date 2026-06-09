import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 15.1 — Teaser for the next units (311 frames · 10.38s · audioStart 226.26s)
 *
 * Narration (relative):
 *   0.0s  "ביחידות הבאות נלמד כיצד לצטט שימוש ב‑AI כראוי,"
 *   3.9s  "כיצד לאמת מידע וכיצד לשמור על הקול האקדמי שלכם, גם כשאתם עובדים עם כלים חדשים."
 */
export const Shot15_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  const cards = [
    { icon: "🏷️", color: COLORS.primary, title: "לצטט שימוש ב‑AI", sub: "כראוי ובהתאם למדיניות", at: 34 },
    { icon: "🔎", color: COLORS.secondary, title: "לאמת מידע", sub: "לבדוק מקורות ועובדות", at: 118 },
    { icon: "🎓", color: COLORS.accent, title: "הקול האקדמי שלכם", sub: "לשמור עליו עם כלים חדשים", at: 178 },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="summary_bg.png" dur={311} maxOpacity={0.5} />
      <Particles />

      <div style={{ position: "absolute", top: 96, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 56, fontWeight: 800, direction: "rtl", color: COLORS.text, textShadow: `0 0 28px ${COLORS.primary}55, 0 2px 14px rgba(0,0,0,0.7)` }}>
          ביחידות הבאות נלמד...
        </div>
      </div>

      <div style={{ position: "absolute", top: 270, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 34, direction: "rtl" }}>
        {cards.map((c, i) => {
          const sp = spring({ frame: frame - c.at, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
          const float = Math.sin((frame - c.at) * 0.05) * 6;
          return (
            <div key={i} style={{ width: 360, transform: `scale(${sp}) translateY(${float}px)`, opacity: sp, padding: "36px 26px", borderRadius: 24, background: `linear-gradient(160deg, ${c.color}22 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(16px)", border: `2px solid ${c.color}88`, boxShadow: `0 0 50px ${c.color}26`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
              <span style={{ fontSize: 60, filter: `drop-shadow(0 0 16px ${c.color})` }}>{c.icon}</span>
              <div style={{ fontSize: 32, fontWeight: 800, color: c.color, direction: "rtl" }}>{c.title}</div>
              <div style={{ fontSize: 24, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", lineHeight: 1.4 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
