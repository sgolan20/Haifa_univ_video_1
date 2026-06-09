import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles, RiskBadge } from "./_shared";

/**
 * Shot 5.1 — Risk #1: Plagiarism (629 frames · 20.98s · audioStart 67.54s)
 *
 * Narration (relative):
 *   0.0s  "נכיר את הסיכון הראשון: פלגיאט."
 *   2.9s  "פלגיאט הוא הצגת רעיונות או ניסוחים של אחרים כאילו הם שלכם, בלי לציין מקור."
 *   8.9s  "כשמעתיקים טקסט שה-AI ייצר ומגישים אותו כעבודה עצמאית, זה עשוי להיחשב פלגיאט,"
 *  15.3s  "גם ללא כוונה."
 *  16.8s  "הטקסט נראה חדש, אך לעיתים הרעיונות אינם שלכם."
 */
export const Shot5_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badge = spring({ frame: frame - 20, fps, config: { damping: 15, stiffness: 90, mass: 0.8 } });
  const badgeRise = spring({ frame: frame - 90, fps, config: { damping: 20, stiffness: 60, mass: 1 } });

  const def = spring({ frame: frame - 100, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });

  // copy → paste flow
  const src = spring({ frame: frame - 270, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const arrow = interpolate(frame, [320, 370], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dst = spring({ frame: frame - 360, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const stamp = spring({ frame: frame - 430, fps, config: { damping: 12, stiffness: 120, mass: 0.7 } });

  // bottom note
  const note = spring({ frame: frame - 505, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="plagiarism_bg.png" dur={629} maxOpacity={0.5} />
      <Particles accent={COLORS.warning} />

      {/* risk badge — center then rises */}
      <div style={{ position: "absolute", top: interpolate(badgeRise, [0, 1], [240, 54]), left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${interpolate(badgeRise, [0, 1], [1, 0.82])})` }}>
        <RiskBadge n={1} label="פלגיאט" scale={badge} />
      </div>

      {/* definition */}
      <div style={{ position: "absolute", top: 175, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: def, transform: `translateY(${interpolate(def, [0, 1], [20, 0])}px)` }}>
        <div style={{ maxWidth: 1050, padding: "20px 38px", borderRadius: 18, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: `1.5px solid ${COLORS.warning}44`, fontSize: 30, fontWeight: 600, color: COLORS.text, direction: "rtl", textAlign: "center", lineHeight: 1.45 }}>
          הצגת רעיונות או ניסוחים של אחרים כאילו הם שלכם — <span style={{ color: "#fca5a5", fontWeight: 800 }}>בלי לציין מקור</span>
        </div>
      </div>

      {/* copy → paste flow */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 30, direction: "rtl" }}>
        <DocCard scale={src} title="טקסט שה‑AI ייצר" color={COLORS.secondary} icon="🤖" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: arrow }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.accent, direction: "ltr", background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}66`, borderRadius: 8, padding: "4px 12px" }}>Ctrl+C → Ctrl+V</div>
          <div style={{ fontSize: 44, color: COLORS.accent }}>←</div>
        </div>
        <div style={{ position: "relative" }}>
          <DocCard scale={dst} title="הוגש כעבודה עצמאית" color={COLORS.warning} icon="📄" />
          <div style={{ position: "absolute", top: -22, left: -22, transform: `scale(${stamp}) rotate(-12deg)`, opacity: stamp, padding: "8px 22px", borderRadius: 10, background: COLORS.warning, color: "#fff", fontSize: 28, fontWeight: 900, direction: "rtl", boxShadow: `0 0 24px ${COLORS.warning}aa`, border: "2px solid #fff" }}>
            ✕ פלגיאט
          </div>
        </div>
      </div>

      {/* bottom note */}
      <div style={{ position: "absolute", bottom: 56, left: 0, right: 0, textAlign: "center", opacity: note, transform: `scale(${interpolate(note, [0, 1], [0.9, 1])})` }}>
        <span style={{ fontSize: 30, fontWeight: 700, color: COLORS.text, direction: "rtl", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
          הטקסט נראה <span style={{ color: COLORS.primary }}>"חדש"</span> — אך הרעיונות <span style={{ color: "#fca5a5" }}>אינם שלכם</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

const DocCard: React.FC<{ scale: number; title: string; color: string; icon: string }> = ({ scale, title, color, icon }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.05) * 5;
  return (
    <div style={{ width: 360, transform: `scale(${scale}) translateY(${float}px)`, opacity: scale, padding: "22px 24px", borderRadius: 20, background: `linear-gradient(160deg, ${color}22 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${color}88`, boxShadow: `0 0 40px ${color}26`, direction: "rtl" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 34 }}>{icon}</span>
        <span style={{ fontSize: 26, fontWeight: 800, color, direction: "rtl" }}>{title}</span>
      </div>
      {[0.95, 0.8, 0.88, 0.6].map((w, i) => (
        <div key={i} style={{ height: 9, width: `${w * 100}%`, background: `${color}55`, borderRadius: 5, marginBottom: 9 }} />
      ))}
    </div>
  );
};
