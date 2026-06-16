import React from "react";
import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, sp, IMG, HL } from "./_shared";

/**
 * Shot 11.1 — Summary + goodbye (430 frames · 14.33s · audioStart 167.46s)
 *  0.0   "לסיכום: שקיפות בשימוש ב-AI היא מיומנות, לא רק כלל."
 *  4.94  "היא מצריכה הבנה של התהליך שביצעתם,"
 *  7.74  "של היכולת לתאר את התהליך בשפה ברורה,
 *         והתאמה למוסכמות הדיסציפלינה שלכם."
 * 13.62  "להתראות."
 */
const RECAP = [
  { text: "הבנת התהליך שביצעתם", at: 152 },
  { text: "תיאור בשפה ברורה", at: 196 },
  { text: "התאמה למוסכמות הדיסציפלינה", at: 240 },
];

export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 8, { stiffness: 85, mass: 0.9 });
  const bye = sp(frame, fps, 405, { damping: 12, stiffness: 110, mass: 0.7 });
  const float = Math.sin(frame * 0.04) * 6;
  const byeFloat = Math.sin(frame * 0.08) * 6;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_summary.png" dur={430} maxOpacity={0.5} />
      <Particles accent={COLORS.accent} />

      <div style={{ position: "absolute", top: 70, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: head, transform: `translateY(${interpolate(head, [0, 1], [-18, 0])}px)` }}>
        <Img src={IMG("icon_medal.png")} style={{ height: 120, filter: `drop-shadow(0 0 28px ${COLORS.accent}aa)`, transform: `translateY(${float}px) scale(${interpolate(head, [0, 1], [0.8, 1])})` }} />
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "2px", color: COLORS.accent }}>לסיכום</span>
        <div style={{ maxWidth: 1450, textAlign: "center", direction: "rtl", fontSize: 60, fontWeight: 900, color: COLORS.text, lineHeight: 1.18, textShadow: `0 0 36px ${COLORS.accent}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          שקיפות היא <HL c={COLORS.accent}>מיומנות</HL> — לא רק כלל
        </div>
      </div>

      <div style={{ position: "absolute", top: 410, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 30, direction: "rtl" }}>
        {RECAP.map((r, i) => {
          const pop = sp(frame, fps, r.at, { damping: 13, stiffness: 105, mass: 0.7 });
          const f = Math.sin((frame + i * 36) * 0.05) * 5;
          return (
            <div key={i} style={{ width: 420, minHeight: 150, padding: "30px 30px", borderRadius: 24, direction: "rtl", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", background: `linear-gradient(160deg, ${COLORS.primary}18, rgba(255,255,255,0.045))`, backdropFilter: "blur(14px)", border: `2px solid ${COLORS.primary}66`, boxShadow: `0 14px 46px rgba(0,0,0,0.38), 0 0 38px ${COLORS.primary}22`, opacity: pop, transform: `scale(${pop}) translateY(${f}px)` }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, lineHeight: 1.25 }}>{r.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 660, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: bye, transform: `scale(${bye}) translateY(${byeFloat}px)` }}>
        <span style={{ fontSize: 64, fontWeight: 900, color: COLORS.text, direction: "rtl", textShadow: `0 0 30px ${COLORS.accent}66` }}>להתראות 👋</span>
      </div>
    </AbsoluteFill>
  );
};
