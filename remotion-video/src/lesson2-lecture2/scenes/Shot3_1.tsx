import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 3.1 — Use a SEARCH ENGINE when… (verifiable facts)
 * Duration: 806 frames (26.85s) · audioStart 27.14s · bg search_bg · turquoise
 *
 * f0   header "מנוע חיפוש — לעובדות"
 * f30  rule: specific datum with a clear source + example chips (date/name/stat/ruling/law/study)
 * f355 three condition rows (time-sensitive · primary source to cite · factual accuracy critical)
 * f688 domain tags (medicine · law · policy · science)
 */
const DUR = 806;
const P = COLORS.primary;

export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const header = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const rule = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const blockAFade = interpolate(frame, [333, 361], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chips = ["תאריך", "שם", "סטטיסטיקה", "פסיקה", "חוק", "ממצא ממחקר"];
  const rows = [
    { t: "מידע תלוי־זמן שעלול להתיישן", d: 355, icon: "lesson2-lecture2/images/icons/time_sensitive.png" },
    { t: "מקור ראשוני שניתן לצטט", d: 490, icon: "lesson2-lecture2/images/icons/primary_source.png" },
    { t: "תחום שבו דיוק עובדתי קריטי", d: 583, icon: "lesson2-lecture2/images/icons/factual_accuracy.png" },
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
      {frame >= 343 && (
        <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, direction: "rtl" }}>
          {rows.map((r) => {
            const s = spring({ frame: frame - r.d, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
            const isCritical = r.d === 583;
            return (
              <div key={r.t} style={{ transform: `translateX(${(1 - s) * -40}px)`, opacity: s, width: 1180, padding: "18px 30px", borderRadius: 18, background: `linear-gradient(135deg, ${P}1f 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(12px)", border: `1.5px solid ${P}66`, display: "flex", alignItems: "center", gap: 22 }}>
                <div style={{ width: 82, height: 82, flex: "0 0 82px", borderRadius: 18, overflow: "hidden", background: `${P}18`, border: `1.5px solid ${P}88`, boxShadow: `0 0 ${16 + s * 20}px ${P}55` }}>
                  <Img
                    src={staticFile(r.icon)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale(${1.08 - s * 0.03})`,
                      filter: "saturate(1.08) contrast(1.08)",
                    }}
                  />
                </div>
                <span style={{ fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl", whiteSpace: "nowrap" }}>{r.t}</span>
                {isCritical && frame >= 670 && (
                  <div style={{ marginRight: "auto", display: "flex", gap: 12, direction: "rtl" }}>
                    {domains.map((d, i) => {
                      const ds = spring({ frame: frame - (688 + i * 22), fps, config: { damping: 14, stiffness: 110, mass: 0.7 } });
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
