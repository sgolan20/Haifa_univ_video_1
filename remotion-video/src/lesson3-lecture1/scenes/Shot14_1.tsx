import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 14.1 — Summary (583 frames · 19.42s · audioStart 206.84s)
 *
 * Narration (relative):
 *   0.0s  "לסיכום, AI הוא כלי עוצמתי שיכול לעזור לכם לחשוב, לחקור, לארגן רעיונות ולשפר כתיבה,"
 *   7.7s  "אבל הוא לא יכול ללמוד בשבילכם."
 *  10.1s  "השימוש הנכון ב‑AI אינו רק טכני, אלא גם אתי:"
 *  13.9s  "לדעת מתי להיעזר, מתי לבדוק, ובעיקר — מתי לתת קרדיט."
 */
export const Shot14_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0–290): capabilities + "can't learn for you"
  const p1Out = interpolate(frame, [285, 310], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  const caps = [
    { icon: "🧠", label: "לחשוב", at: 34 },
    { icon: "🔬", label: "לחקור", at: 127 },
    { icon: "🗂️", label: "לארגן רעיונות", at: 156 },
    { icon: "✍️", label: "לשפר כתיבה", at: 186 },
  ];
  const but = spring({ frame: frame - 232, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  // Phase 2 (300+): ethical use + 3 pillars
  const p2In = spring({ frame: frame - 305, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const pillars = [
    { icon: "🤝", label: "מתי להיעזר", at: 416 },
    { icon: "🔎", label: "מתי לבדוק", at: 467 },
    { icon: "🏷️", label: "מתי לתת קרדיט", at: 512 },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="summary_bg.png" dur={583} maxOpacity={0.5} />
      <Particles />

      {/* Phase 1 */}
      {frame < 312 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36, opacity: p1Out }}>
          <div style={{ transform: `scale(${title})`, opacity: title, fontSize: 54, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
            <span style={{ color: COLORS.primary, direction: "ltr", display: "inline-block" }}>AI</span> — כלי עוצמתי שעוזר לכם
          </div>
          <div style={{ display: "flex", gap: 20, direction: "rtl" }}>
            {caps.map((c, i) => {
              const sp = spring({ frame: frame - c.at, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
              return (
                <div key={i} style={{ transform: `scale(${sp})`, opacity: sp, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "22px 26px", borderRadius: 18, background: `${COLORS.primary}14`, border: `1.5px solid ${COLORS.primary}66`, direction: "rtl" }}>
                  <span style={{ fontSize: 40 }}>{c.icon}</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>{c.label}</span>
                </div>
              );
            })}
          </div>
          <div style={{ transform: `scale(${but})`, opacity: but, padding: "16px 44px", borderRadius: 999, background: `${COLORS.accent}1f`, border: `2px solid ${COLORS.accent}`, fontSize: 38, fontWeight: 800, color: COLORS.accent, direction: "rtl", boxShadow: `0 0 34px ${COLORS.accent}44` }}>
            אבל הוא לא יכול ללמוד בשבילכם
          </div>
        </div>
      )}

      {/* Phase 2 */}
      {frame >= 300 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, opacity: p2In }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
            שימוש נכון ב‑AI אינו רק טכני — <span style={{ color: COLORS.accent }}>אלא גם אתי</span>
          </div>
          <div style={{ display: "flex", gap: 30, direction: "rtl" }}>
            {pillars.map((p, i) => {
              const sp = spring({ frame: frame - p.at, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
              return (
                <div key={i} style={{ width: 300, transform: `scale(${sp})`, opacity: sp, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "30px 22px", borderRadius: 22, background: `linear-gradient(160deg, ${COLORS.accent}1f 0%, rgba(255,255,255,0.03) 100%)`, border: `2px solid ${COLORS.accent}77`, boxShadow: `0 0 40px ${COLORS.accent}1f`, textAlign: "center" }}>
                  <span style={{ fontSize: 48, filter: `drop-shadow(0 0 14px ${COLORS.accent})` }}>{p.icon}</span>
                  <span style={{ fontSize: 30, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
