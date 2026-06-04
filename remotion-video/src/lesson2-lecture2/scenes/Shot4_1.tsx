import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 4.1 — Use an AI MODEL when… (thinking partner, not a fact store)
 * Duration: 832 frames (27.72s) · audioStart 53.56s · bg ai_bg · purple
 *
 * f0   header "מודל AI — לחשיבה"
 * f20  five use-case rows (understand · phrase · prep questions · summarize · brainstorm)
 * f657 conclusion: "שותף חשיבה — לא מאגר עובדות"
 */
const DUR = 832;
const S = COLORS.secondary;

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const header = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const listFade = interpolate(frame, [630, 658], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const uses = [
    { t: "להבין מושג מבלבל — בהסבר מותאם לרמה שלכם", d: 20 },
    { t: "לנסח טקסט שכבר ידוע לכם שנכון עובדתית", d: 280 },
    { t: "להכין שאלות לפני ראיון או שיחה מקצועית", d: 392 },
    { t: "לסכם מסמך שכבר קראתם ואימתתם", d: 485 },
    { t: "לסיעור מוחות על כיווני עבודה", d: 565 },
  ];

  const concl = spring({ frame: frame - 660, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.06);

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="ai_bg.png" dur={DUR} maxOpacity={0.55} />
      <Particles />

      {/* header */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `scale(${header})`, opacity: header }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, direction: "rtl", padding: "16px 44px", borderRadius: 999, background: `${S}1a`, border: `2px solid ${S}88`, boxShadow: `0 0 40px ${S}33` }}>
          <span style={{ fontSize: 44 }}>🧠</span>
          <span style={{ fontSize: 46, fontWeight: 800, color: S, direction: "rtl", textShadow: `0 0 24px ${S}66` }}>מודל AI — לחשיבה</span>
        </div>
      </div>

      {/* use-case rows */}
      {frame < 658 && (
        <div style={{ position: "absolute", top: 270, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, direction: "rtl", opacity: listFade }}>
          {uses.map((u) => {
            const s = spring({ frame: frame - u.d, fps, config: { damping: 16, stiffness: 95, mass: 0.8 } });
            return (
              <div key={u.t} style={{ transform: `translateX(${(1 - s) * 40}px)`, opacity: s, width: 1000, padding: "18px 32px", borderRadius: 16, background: `linear-gradient(135deg, ${S}1f 0%, rgba(255,255,255,0.03) 100%)`, backdropFilter: "blur(12px)", border: `1.5px solid ${S}55`, display: "flex", alignItems: "center", gap: 20 }}>
                <span style={{ fontSize: 30, color: S }}>◆</span>
                <span style={{ fontSize: 36, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{u.t}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* conclusion */}
      {frame > 652 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, transform: `scale(${concl})`, opacity: concl }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: S, direction: "rtl", textShadow: `0 0 ${40 + glow * 30}px ${S}66` }}>
            שותף חשיבה
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>
            — לא <span style={{ color: COLORS.warning }}>מאגר עובדות</span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
