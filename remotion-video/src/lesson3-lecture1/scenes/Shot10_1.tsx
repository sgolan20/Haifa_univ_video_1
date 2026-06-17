import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, RiskBadge } from "./_shared";

/**
 * Shot 10.1 — Risk #3: Lack of understanding (476 frames · 15.88s · audioStart 149.34s)
 *
 * Narration (relative):
 *   0.0s  "הסיכון השלישי: חוסר הבנה."
 *   3.0s  "כש‑AI כותב עבורכם,"
 *   4.8s  "אתם עלולים להגיש עבודה שאתם עצמכם לא ממש מבינים."
 *   9.0s  "זה פוגע בלמידה שלכם ועלול להיחשף בקלות בבחינה,"
 *  13.0s  "בהצגה,"
 *  13.9s  "בשיחה עם המרצה."
 */
export const Shot10_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 20, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const badgeRise = spring({ frame: frame - 90, fps, config: { damping: 20, stiffness: 60, mass: 1 } });

  const statement = spring({ frame: frame - 95, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const harm = spring({ frame: frame - 270, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  const exposures = [
    { icon: "📝", label: "בבחינה", at: 330 },
    { icon: "🎤", label: "בהצגה", at: 389 },
    { icon: "💬", label: "בשיחה עם המרצה", at: 418 },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="understanding_bg.png" dur={476} maxOpacity={0.5} />
      <Particles accent={COLORS.warning} />

      <div style={{ position: "absolute", top: interpolate(badgeRise, [0, 1], [210, 54]), left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${interpolate(badgeRise, [0, 1], [1, 0.82])})` }}>
        <RiskBadge n={3} label="חוסר הבנה" scale={badge} />
      </div>

      {/* main statement */}
      <div style={{ position: "absolute", top: 220, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: statement, transform: `translateY(${interpolate(statement, [0, 1], [22, 0])}px)` }}>
        <div style={{ maxWidth: 1000, padding: "30px 44px", borderRadius: 22, background: "rgba(17,24,39,0.72)", backdropFilter: "blur(14px)", border: `2px solid ${COLORS.warning}55`, textAlign: "center", direction: "rtl" }}>
          <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.text, direction: "rtl", lineHeight: 1.45 }}>
            כש‑AI כותב עבורכם —<br />
            אתם עלולים להגיש עבודה{" "}
            <span style={{ color: "#fca5a5", fontWeight: 800 }}>שאינכם מבינים</span>
          </div>
        </div>
      </div>

      {/* harm + exposure */}
      <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ transform: `scale(${harm})`, opacity: harm, padding: "12px 34px", borderRadius: 999, background: `${COLORS.warning}26`, border: `1.5px solid ${COLORS.warning}`, fontSize: 28, fontWeight: 700, color: "#fca5a5", direction: "rtl" }}>
          ⚠️ פוגע בלמידה שלכם — ונחשף בקלות
        </div>
        <div style={{ display: "flex", gap: 18, direction: "rtl" }}>
          {exposures.map((e, i) => {
            const sp = spring({ frame: frame - e.at, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
            return (
              <div key={i} style={{ transform: `scale(${sp})`, opacity: sp, display: "flex", alignItems: "center", gap: 12, padding: "14px 28px", borderRadius: 16, background: "rgba(255,255,255,0.05)", border: `1.5px solid ${COLORS.textDim}`, fontSize: 28, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>
                <span style={{ fontSize: 30 }}>{e.icon}</span>{e.label}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
