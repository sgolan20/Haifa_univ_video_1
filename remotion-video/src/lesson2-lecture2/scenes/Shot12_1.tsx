import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 12.1 — 3X (run it at least three times)
 * Duration: 482 frames (16.06s) · audioStart 166.64s · bg factcheck_bg
 *
 * f0   "×3" + heading: every central claim, at least three times
 * f312 most errors surface on the 2nd or 3rd pass — not the first
 */
const DUR = 482;
const A = COLORS.accent;

export const Shot12_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const big = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 90, mass: 0.8 } });
  const head = spring({ frame: frame - 44, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.35 * Math.sin(frame * 0.06);

  const passes = [
    { n: "1", label: "בדיקה ראשונה", d: 312, hit: false },
    { n: "2", label: "בדיקה שנייה", d: 360, hit: true },
    { n: "3", label: "בדיקה שלישית", d: 408, hit: true },
  ];
  const note = spring({ frame: frame - 430, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="factcheck_bg.png" dur={DUR} maxOpacity={0.5} />
      <Particles />

      {/* ×3 + heading */}
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ transform: `scale(${big})`, opacity: big, fontSize: 110, fontWeight: 800, color: A, direction: "ltr", textShadow: `0 0 ${50 + glow * 40}px ${A}88` }}>×3</div>
        <div style={{ opacity: head, transform: `translateY(${(1 - head) * 16}px)`, fontSize: 42, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          כל טענה מרכזית — עוברת את התהליך <span style={{ color: A }}>לפחות שלוש פעמים</span>
        </div>
      </div>

      {/* three passes */}
      <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 36, direction: "rtl" }}>
        {passes.map((p) => {
          const s = spring({ frame: frame - p.d, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
          const c = p.hit ? COLORS.warning : COLORS.textMuted;
          return (
            <div key={p.n} style={{ transform: `scale(${s})`, opacity: s, width: 230, padding: "24px 0", borderRadius: 20, background: p.hit ? `${COLORS.warning}1a` : "rgba(255,255,255,0.04)", border: `2px solid ${c}${p.hit ? "" : "44"}`, boxShadow: p.hit ? `0 0 30px ${COLORS.warning}33` : "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 50, fontWeight: 800, color: c }}>{p.n}</span>
              <span style={{ fontSize: 26, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{p.label}</span>
              {p.hit && <span style={{ fontSize: 24, color: COLORS.warning, direction: "rtl" }}>⚠ שגיאות מתגלות</span>}
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 720, left: 0, right: 0, textAlign: "center", opacity: note }}>
        <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>
          רוב השגיאות מתגלות בבדיקה השנייה או השלישית — <span style={{ color: COLORS.text, fontWeight: 700 }}>לא בראשונה</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
