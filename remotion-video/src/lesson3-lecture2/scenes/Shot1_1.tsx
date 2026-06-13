import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 1.1 — Opening (620 frames · 20.68s · audioStart 0s)
 *
 * Narration (relative):
 *   0.1s  "שלום. בהמשך לסרטון הקודם, יושרה אקדמית בעידן של AI,"
 *   5.2s  "אחת הנקודות החשובות להבנה היא שיושרה אקדמית אינה אחידה בכל תחומי הלימוד."
 *  11.1s  "שימוש שנחשב לגיטימי בקורס אחד עשוי להיחשב כבעייתי בקורס אחר,"
 *  16.6s  "גם כאשר מדובר בדיוק באותו כלי ובאותו סוג שימוש."
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const refBadge = spring({ frame: frame - 25, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const headline = spring({ frame: frame - 160, fps, config: { damping: 15, stiffness: 85, mass: 0.9 } });

  const cardA = spring({ frame: frame - 340, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const cardB = spring({ frame: frame - 385, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const sameTool = spring({ frame: frame - 500, fps, config: { damping: 14, stiffness: 100, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="bg_opening.png" dur={620} maxOpacity={0.55} />
      <Particles />

      {/* reference to the previous video */}
      <div style={{ position: "absolute", top: 48, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: refBadge, transform: `translateY(${interpolate(refBadge, [0, 1], [-18, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 32px", borderRadius: 999, background: "rgba(255,255,255,0.06)", border: `1px solid ${COLORS.secondary}55`, direction: "rtl" }}>
          <span style={{ fontSize: 25, fontWeight: 600, color: COLORS.textMuted }}>בהמשך לסרטון הקודם:</span>
          <span style={{ fontSize: 25, fontWeight: 800, color: COLORS.secondary }}>יושרה אקדמית בעידן של AI</span>
        </div>
      </div>

      {/* main headline */}
      <div style={{ position: "absolute", top: 128, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: headline, transform: `scale(${interpolate(headline, [0, 1], [0.92, 1])})` }}>
        <div style={{ maxWidth: 1370, textAlign: "center", direction: "rtl", fontSize: 62, fontWeight: 900, color: COLORS.text, lineHeight: 1.2, textShadow: `0 0 36px ${COLORS.primary}44, 0 2px 14px rgba(0,0,0,0.8)` }}>
          יושרה אקדמית <span style={{ color: COLORS.primary }}>אינה אחידה</span> בכל תחומי הלימוד
        </div>
      </div>

      {/* same use, two different courses */}
      <div style={{ position: "absolute", top: 326, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "stretch", gap: 220, direction: "rtl" }}>
        <CourseCard scale={cardA} label="קורס אחד" verdict="לגיטימי" color="#22c55e" icon="✓" />
        <CourseCard scale={cardB} label="קורס אחר" verdict="בעייתי" color={COLORS.warning} icon="✕" />
      </div>

      {/* the SAME tool between them */}
      <div style={{ position: "absolute", top: 412, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: sameTool, transform: `scale(${sameTool})` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <Img src={staticFile("lesson3-lecture2/images/icon_chip.png")} style={{ height: 148, filter: `drop-shadow(0 0 28px ${COLORS.primary}aa)` }} />
          <div style={{ padding: "10px 28px", borderRadius: 999, background: `${COLORS.primary}1f`, border: `1.5px solid ${COLORS.primary}`, fontSize: 27, fontWeight: 800, color: COLORS.text, direction: "rtl", whiteSpace: "nowrap" }}>
            אותו כלי · אותו שימוש
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CourseCard: React.FC<{ scale: number; label: string; verdict: string; color: string; icon: string }> = ({ scale, label, verdict, color, icon }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame * 0.045) * 5;
  return (
    <div style={{ width: 440, minHeight: 178, transform: `scale(${scale}) translateY(${float}px)`, opacity: scale, padding: "36px 42px", borderRadius: 26, background: `linear-gradient(160deg, ${color}1c 0%, rgba(255,255,255,0.045) 100%)`, backdropFilter: "blur(14px)", border: `2px solid ${color}88`, boxShadow: `0 14px 46px rgba(0,0,0,0.35), 0 0 44px ${color}2a`, direction: "rtl", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22 }}>
      <span style={{ fontSize: 33, fontWeight: 700, color: COLORS.textMuted }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 68, height: 68, borderRadius: "50%", background: color, color: "#fff", fontSize: 38, fontWeight: 900, boxShadow: `0 0 24px ${color}` }}>{icon}</span>
        <span style={{ fontSize: 50, fontWeight: 900, color: COLORS.text }}>{verdict}</span>
      </div>
    </div>
  );
};
