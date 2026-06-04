import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 14.1 — Caveat: not every source is trustworthy / AI manipulation & noise
 * Duration: 726 frames (24.2s) · audioStart 208.1s · bg caveat_bg · red
 *
 * f0   title — a timely caveat
 * f84  not every online source can be trusted
 * f213 and not every source is created in good faith
 * f285 content crafted to influence AI systems → (misinformation · noise)
 */
const DUR = 726;
const R = COLORS.warning;

export const Shot14_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const l1 = spring({ frame: frame - 84, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const l2 = spring({ frame: frame - 213, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const influence = spring({ frame: frame - 285, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const glow = 0.4 + 0.35 * Math.sin(frame * 0.07);

  const tags = [
    { t: "הפצת מידע שגוי", d: 490 },
    { t: "יצירת רעש שמטשטש אמין מלא־אמין", d: 567 },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="caveat_bg.png" dur={DUR} maxOpacity={0.7} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "14px 40px", borderRadius: 999, background: `${R}1a`, border: `2px solid ${R}88`, boxShadow: `0 0 ${30 + glow * 26}px ${R}44` }}>
          <span style={{ fontSize: 40 }}>⚠</span>
          <span style={{ fontSize: 44, fontWeight: 800, color: R, direction: "rtl" }}>הסתייגות עדכנית</span>
        </div>
      </div>

      {/* two warning lines */}
      <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22, direction: "rtl" }}>
        <div style={{ opacity: l1, transform: `translateY(${(1 - l1) * 18}px)`, fontSize: 42, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1250, textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}>
          לא כל מקור שקיים ברשת — ניתן <span style={{ color: R }}>לסמוך עליו</span>
        </div>
        {frame > 208 && (
          <div style={{ opacity: l2, transform: `translateY(${(1 - l2) * 18}px)`, fontSize: 40, fontWeight: 600, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>
            ולא כל מקור נוצר <span style={{ color: COLORS.text, fontWeight: 700 }}>בתום לב</span>
          </div>
        )}
      </div>

      {/* influence on AI systems */}
      {frame > 278 && (
        <div style={{ position: "absolute", top: 480, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
          <div style={{ transform: `scale(${influence})`, opacity: influence, fontSize: 38, fontWeight: 700, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1250, textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}>
            יש תכנים שנכתבים כדי <span style={{ color: R }}>להשפיע על מערכות AI</span>
          </div>
          <div style={{ display: "flex", gap: 24, direction: "rtl" }}>
            {tags.map((tg) => {
              const s = spring({ frame: frame - tg.d, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
              return (
                <div key={tg.t} style={{ transform: `scale(${s})`, opacity: s, padding: "16px 32px", borderRadius: 16, background: `${R}18`, border: `1.5px solid ${R}66`, fontSize: 30, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{tg.t}</div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
