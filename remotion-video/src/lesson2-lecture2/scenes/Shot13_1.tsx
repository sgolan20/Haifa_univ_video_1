import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 13.1 — An era of powerful tools, but only if you understand each
 * Duration: 762 frames (25.4s) · audioStart 182.7s · bg tools_bg
 *
 * f0   title — more powerful tools than ever
 * f165 AI card (improves thinking · phrasing · complexity)
 * f432 search card (a vast archive of verified knowledge)
 * f555 the turn — but only if you understand what each does, and does not
 */
const DUR = 762;

export const Shot13_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const ai = spring({ frame: frame - 165, fps, config: { damping: 15, stiffness: 85, mass: 0.8 } });
  const search = spring({ frame: frame - 432, fps, config: { damping: 15, stiffness: 85, mass: 0.8 } });
  const turn = spring({ frame: frame - 555, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="tools_bg.png" dur={DUR} maxOpacity={0.6} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 110, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 52, fontWeight: 800, color: COLORS.text, direction: "rtl", textShadow: `0 0 ${30 + glow * 24}px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          תקופה של כלים <span style={{ color: COLORS.accent }}>עוצמתיים מאי פעם</span>
        </div>
      </div>

      {/* two tool cards */}
      <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 44, direction: "rtl" }}>
        <ToolCard scale={ai} color={COLORS.secondary} icon="🧠" name="מודל AI" lines={["משפר את איכות החשיבה", "מחדד את הניסוח", "עוזר להתמודד עם מורכבות"]} />
        <ToolCard scale={search} color={COLORS.primary} icon="🔍" name="מנוע חיפוש" lines={["גישה לארכיון עצום", "של ידע מאומת"]} />
      </div>

      {/* the turn */}
      {frame > 548 && (
        <div style={{ position: "absolute", bottom: 130, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${turn})`, opacity: turn }}>
          <div style={{ padding: "22px 50px", borderRadius: 999, background: `${COLORS.accent}1a`, border: `2px solid ${COLORS.accent}88`, fontSize: 38, fontWeight: 700, color: COLORS.accent, direction: "rtl", textAlign: "center", maxWidth: 1300, textShadow: `0 0 26px ${COLORS.accent}55` }}>
            אבל רק אם אתם מבינים מה כל כלי עושה — ומה הוא <span style={{ color: COLORS.warning }}>אינו</span> עושה
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const ToolCard: React.FC<{ scale: number; color: string; icon: string; name: string; lines: string[] }> = ({ scale, color, icon, name, lines }) => (
  <div style={{ transform: `scale(${scale})`, opacity: scale, width: 520, padding: "32px 30px", borderRadius: 26, background: `linear-gradient(160deg, ${color}26 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(16px)", border: `2px solid ${color}88`, boxShadow: `0 0 50px ${color}30`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <span style={{ fontSize: 56 }}>{icon}</span>
    <span style={{ fontSize: 44, fontWeight: 800, color, direction: "rtl", textShadow: `0 0 24px ${color}77` }}>{name}</span>
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      {lines.map((l) => (
        <span key={l} style={{ fontSize: 30, fontWeight: 500, color: COLORS.text, direction: "rtl", textAlign: "center" }}>{l}</span>
      ))}
    </div>
  </div>
);
