import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, RiskBadge } from "./_shared";

/**
 * Shot 9.1 — Risk #2: Fabricated sources (682 frames · 22.72s · audioStart 126.62s)
 *
 * Narration (relative):
 *   0.0s  "נעבור לסיכון השני: מקורות מומצאים."
 *   3.5s  "מודלי AI כיום מדויקים יותר מבעבר,"
 *   6.7s  "אך עדיין עלולים להציע מקורות לא מדויקים או לא קיימים."
 *  11.6s  "יש להקפיד על כלל פשוט: כל מקור,"
 *  14.7s  "בין אם הגיע מ‑AI ובין אם ממקום אחר,"
 *  17.6s  "יש לבדוק לפני שמשתמשים בו,"
 *  19.9s  "כפי שכבר הדגמנו בשיעור על הזיות."
 */
export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 20, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const badgeRise = spring({ frame: frame - 95, fps, config: { damping: 20, stiffness: 60, mass: 1 } });

  const note = spring({ frame: frame - 110, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const real = spring({ frame: frame - 200, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const fake = spring({ frame: frame - 250, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const fakeStamp = spring({ frame: frame - 300, fps, config: { damping: 12, stiffness: 120, mass: 0.7 } });

  // rule
  const rule = spring({ frame: frame - 360, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const verify = spring({ frame: frame - 528, fps, config: { damping: 13, stiffness: 110, mass: 0.7 } });
  const hall = interpolate(frame, [600, 640], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="sources_bg.png" dur={682} maxOpacity={0.5} />
      <Particles accent={COLORS.warning} />

      <div style={{ position: "absolute", top: interpolate(badgeRise, [0, 1], [200, 50]), left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${interpolate(badgeRise, [0, 1], [1, 0.82])})` }}>
        <RiskBadge n={2} label="מקורות מומצאים" scale={badge} />
      </div>

      {/* note: more accurate, but still may invent sources */}
      <div style={{ position: "absolute", top: 158, left: 0, right: 0, textAlign: "center", opacity: note, transform: `translateY(${interpolate(note, [0, 1], [18, 0])}px)` }}>
        <span style={{ fontSize: 28, fontWeight: 600, color: COLORS.text, direction: "rtl", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
          מדויקים יותר מבעבר — אך עדיין עלולים להציע מקורות <span style={{ color: "#fca5a5", fontWeight: 800 }}>לא קיימים</span>
        </span>
      </div>

      {/* two citation cards */}
      <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40, direction: "rtl" }}>
        <CitationCard scale={real} ok title="מקור אמיתי" cite="Cohen, A. (2021). Academic Writing. Haifa University Press." />
        <div style={{ position: "relative" }}>
          <CitationCard scale={fake} ok={false} title="מקור מומצא" cite="Levi, R. (2019). The Theory of Everything. Journal of AI Studies, 12(3)." />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${fakeStamp}) rotate(-10deg)`, opacity: fakeStamp, padding: "8px 24px", borderRadius: 10, background: COLORS.warning, color: "#fff", fontSize: 26, fontWeight: 900, direction: "rtl", boxShadow: `0 0 24px ${COLORS.warning}aa`, border: "2px solid #fff", whiteSpace: "nowrap" }}>
            ✕ לא קיים
          </div>
        </div>
      </div>

      {/* the rule */}
      <div style={{ position: "absolute", bottom: 46, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: rule, transform: `translateY(${interpolate(rule, [0, 1], [26, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 40px", borderRadius: 18, background: `${COLORS.primary}18`, border: `2px solid ${COLORS.primary}88`, boxShadow: `0 0 34px ${COLORS.primary}26`, direction: "rtl" }}>
          <span style={{ display: "inline-block", transform: `scale(${verify})`, fontSize: 40 }}>🔎</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>
            כל מקור — מ‑AI או ממקום אחר — <span style={{ color: COLORS.primary, fontWeight: 800 }}>לבדוק לפני שימוש</span>
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", opacity: hall }}>
          כפי שכבר הדגמנו בשיעור על הזיות
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CitationCard: React.FC<{ scale: number; ok: boolean; title: string; cite: string }> = ({ scale, ok, title, cite }) => {
  const color = ok ? COLORS.primary : COLORS.warning;
  return (
    <div style={{ width: 480, transform: `scale(${scale})`, opacity: scale, padding: "22px 26px", borderRadius: 20, background: "rgba(17,24,39,0.75)", backdropFilter: "blur(14px)", border: `2px solid ${color}88`, boxShadow: `0 0 36px ${color}22`, direction: "rtl" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: `${color}26`, border: `1.5px solid ${color}`, color, fontSize: 20, fontWeight: 900 }}>{ok ? "✓" : "✕"}</span>
        <span style={{ fontSize: 24, fontWeight: 800, color, direction: "rtl" }}>{title}</span>
      </div>
      <div style={{ fontSize: 19, fontWeight: 400, color: ok ? COLORS.text : "#cbd5e1", direction: "ltr", textAlign: "left", lineHeight: 1.4, fontStyle: "italic", textDecoration: ok ? "none" : "line-through", textDecorationColor: `${COLORS.warning}aa` }}>
        {cite}
      </div>
    </div>
  );
};
