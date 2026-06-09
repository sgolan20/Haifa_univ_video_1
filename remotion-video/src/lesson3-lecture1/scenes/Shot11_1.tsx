import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

const GREEN = "#34d399";

/**
 * Shot 11.1 — Context-dependent: ask yourself (347 frames · 11.58s · audioStart 165.22s)
 *
 * Narration (relative):
 *   0.0s  "שימוש ב‑AI שהוא לגיטימי לחלוטין בקורס אחד יכול להיות בעייתי בקורס אחר."
 *   6.1s  "לכן, לפני שמשתמשים בכלי AI לצורך הגשה,"
 *  10.1s  "שאלו את עצמכם."
 */
export const Shot11_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const center = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const cardA = spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const cardB = spring({ frame: frame - 90, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });

  const cta = spring({ frame: frame - 206, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });
  const ctaPulse = 1 + 0.04 * Math.sin(frame * 0.18);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="checklist_bg.png" dur={333} maxOpacity={0.45} />
      <Particles />

      {/* center: same AI use */}
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${center})`, opacity: center }}>
        <div style={{ padding: "16px 40px", borderRadius: 999, background: `${COLORS.secondary}22`, border: `2px solid ${COLORS.secondary}88`, fontSize: 34, fontWeight: 800, color: COLORS.text, direction: "rtl", boxShadow: `0 0 30px ${COLORS.secondary}33` }}>
          ⚙️ אותו שימוש ב‑AI
        </div>
      </div>

      {/* two course outcomes */}
      <div style={{ position: "absolute", top: 200, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 50, direction: "rtl" }}>
        <CourseCard scale={cardA} color={GREEN} ok name="קורס א'" verdict="לגיטימי לחלוטין" />
        <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.textMuted, opacity: cardB }}>≠</div>
        <CourseCard scale={cardB} color={COLORS.warning} ok={false} name="קורס ב'" verdict="עלול להיות בעייתי" />
      </div>

      {/* CTA */}
      <div style={{ position: "absolute", bottom: 56, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: cta, transform: `scale(${cta * ctaPulse})` }}>
        <div style={{ padding: "18px 48px", borderRadius: 18, background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.primary})`, fontSize: 36, fontWeight: 800, color: "#fff", direction: "rtl", boxShadow: `0 0 40px ${COLORS.primary}55` }}>
          לפני הגשה — שאלו את עצמכם
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CourseCard: React.FC<{ scale: number; color: string; ok: boolean; name: string; verdict: string }> = ({ scale, color, ok, name, verdict }) => (
  <div style={{ width: 380, transform: `scale(${scale})`, opacity: scale, padding: "30px 26px", borderRadius: 22, background: `linear-gradient(160deg, ${color}1f 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${color}88`, boxShadow: `0 0 40px ${color}22`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
    <span style={{ fontSize: 40 }}>📚</span>
    <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>{name}</div>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 22px", borderRadius: 999, background: `${color}26`, border: `1.5px solid ${color}`, fontSize: 25, fontWeight: 700, color, direction: "rtl" }}>
      <span style={{ fontWeight: 900 }}>{ok ? "✓" : "✕"}</span> {verdict}
    </div>
  </div>
);
