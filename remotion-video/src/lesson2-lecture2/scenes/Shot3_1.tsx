import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 3.1 — Use a SEARCH ENGINE when… (verifiable facts)
 * Duration: 793 frames (26.42s) · audioStart 27.14s · bg search_bg · turquoise
 *
 * f0   header "מנוע חיפוש — לעובדות"
 * f30  rule: specific datum with a clear source + example chips (date/name/stat/ruling/law/study)
 * f342 three condition rows (time-sensitive · primary source to cite · factual accuracy critical)
 * f675 domain tags (medicine · law · policy · science)
 */
const DUR = 793;
const P = COLORS.primary;

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const header = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const rule = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const blockAFade = interpolate(frame, [320, 348], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chips = ["תאריך", "שם", "סטטיסטיקה", "פסיקה", "חוק", "ממצא ממחקר"];
  const rows = [
    { t: "מידע תלוי־זמן שעלול להתיישן", d: 342 },
    { t: "מקור ראשוני שניתן לצטט", d: 477 },
    { t: "תחום שבו דיוק עובדתי קריטי", d: 570 },
  ];
  const domains = ["רפואה", "משפט", "נתוני מדיניות", "מדע"];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="search_bg.png" dur={DUR} maxOpacity={0.55} />
      <Particles />

      {/* header */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${header})`, opacity: header }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, direction: "rtl", padding: "16px 44px", borderRadius: 999, background: `${P}1a`, border: `2px solid ${P}88`, boxShadow: `0 0 40px ${P}33` }}>
          <span style={{ fontSize: 44 }}>🔍</span>
          <span style={{ fontSize: 46, fontWeight: 800, color: P, direction: "rtl", textShadow: `0 0 24px ${P}66` }}>מנוע חיפוש — לעובדות</span>
        </div>
      </div>

      {/* Block A — rule + example chips */}
      {frame < 348 && (
        <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, opacity: blockAFade }}>
          <div style={{ transform: `scale(${rule})`, opacity: rule, fontSize: 42, fontWeight: 600, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
            כשאתם זקוקים ל<span style={{ color: P, fontWeight: 800 }}>נתון ספציפי</span> שיש לו מקור ברור
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, maxWidth: 1100, direction: "rtl" }}>
            {chips.map((c, i) => {
              const s = spring({ frame: frame - (90 + i * 32), fps, config: { damping: 14, stiffness: 110, mass: 0.7 } });
              return (
                <div key={c} style={{ transform: `scale(${s})`, opacity: s, padding: "14px 30px", borderRadius: 14, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", border: `1.5px solid ${P}55`, fontSize: 32, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>
                  {c}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Block B — condition rows */}
      {frame >= 330 && (
        <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, direction: "rtl" }}>
          {rows.map((r) => {
            const s = spring({ frame: frame - r.d, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
            const isCritical = r.d === 570;
            return (
              <div key={r.t} style={{ transform: `translateX(${(1 - s) * -40}px)`, opacity: s, width: 980, padding: "22px 34px", borderRadius: 18, background: `linear-gradient(135deg, ${P}1f 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(12px)", border: `1.5px solid ${P}66`, display: "flex", alignItems: "center", gap: 22 }}>
                <span style={{ fontSize: 34, color: P }}>✓</span>
                <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>{r.t}</span>
                {isCritical && (
                  <div style={{ marginRight: "auto", display: "flex", gap: 12, direction: "rtl" }}>
                    {domains.map((d, i) => {
                      const ds = spring({ frame: frame - (675 + i * 22), fps, config: { damping: 14, stiffness: 110, mass: 0.7 } });
                      return (
                        <span key={d} style={{ transform: `scale(${ds})`, opacity: ds, padding: "8px 18px", borderRadius: 999, background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}77`, fontSize: 24, fontWeight: 700, color: COLORS.accent, direction: "rtl" }}>{d}</span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
