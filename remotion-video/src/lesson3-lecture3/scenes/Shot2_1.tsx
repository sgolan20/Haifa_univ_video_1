import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG, HL } from "./_shared";

/**
 * Shot 2.1 — Overview: three transparency requirements (299 frames · 9.98s · audioStart 15.64s)
 *  0.0  "בחלק זה נכסה שלוש דרישות שקיפות,"
 *  3.06 "ציטוט לפי APA,"
 *  4.68 "ציטוט לפי MLA,"
 *  6.44 "ואיך כותבים Appendix של שימוש ב-AI."
 */
const REQS = [
  { n: 1, icon: "icon_apa.png", title: "ציטוט לפי APA", color: COLORS.primary, at: 92 },
  { n: 2, icon: "icon_mla.png", title: "ציטוט לפי MLA", color: COLORS.secondary, at: 140 },
  { n: 3, icon: "icon_appendix.png", title: "כתיבת Appendix", color: COLORS.accent, at: 193 },
];

export const Shot2_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headline = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_overview.png" dur={299} maxOpacity={0.5} />
      <Particles />

      <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.92, 1])})` }}>
        <div style={{ maxWidth: 1400, textAlign: "center", direction: "rtl", fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.2, textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          בחלק זה — <HL c={COLORS.primary}>שלוש</HL> דרישות שקיפות
        </div>
      </div>

      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 50, direction: "rtl" }}>
        {REQS.map((r, i) => {
          const pop = sp(frame, fps, r.at, { damping: 13, stiffness: 105, mass: 0.7 });
          const float = Math.sin((frame + i * 40) * 0.05) * 6;
          return (
            <div key={i} style={{ width: 420, minHeight: 440, padding: "44px 34px", borderRadius: 30, direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", gap: 28, background: `linear-gradient(160deg, ${r.color}1c 0%, rgba(255,255,255,0.045) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${r.color}77`, boxShadow: `0 16px 50px rgba(0,0,0,0.4), 0 0 44px ${r.color}26`, opacity: pop, transform: `scale(${pop}) translateY(${float}px)` }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: r.color, color: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, boxShadow: `0 0 22px ${r.color}aa` }}>{r.n}</div>
              <Img src={IMG(r.icon)} style={{ height: 190, filter: `drop-shadow(0 0 26px ${r.color}99)` }} />
              <span style={{ fontSize: 40, fontWeight: 900, color: COLORS.text, textAlign: "center", lineHeight: 1.15 }}>{r.title}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
