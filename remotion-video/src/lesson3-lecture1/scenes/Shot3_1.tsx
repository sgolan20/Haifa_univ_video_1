import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 3.1 — In the AI era: whose idea? (473 frames · 15.78s · audioStart 31.2s)
 *
 * Narration (relative):
 *   0.0s  "בעידן של AI האתגר המרכזי הוא אינו רק מה נכתב,"
 *   4.2s  "אלא של מי הרעיון."
 *   6.2s  "גם כאשר הטקסט מנוסח מחדש או עובר עריכה,"
 *   9.5s  "אם הרעיון הגיע ממקור אחר — אדם, מאמר או כלי AI,"
 *  14.2s  "יש לציין זאת."
 */
export const Shot3_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  // two contrasting cards
  const cardWritten = spring({ frame: frame - 40, fps, config: { damping: 16, stiffness: 88, mass: 0.8 } });
  const cardIdea = spring({ frame: frame - 125, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
  const ideaPulse = 1 + 0.04 * Math.sin(frame * 0.18);

  // lower note: reworded → still cite
  const note = spring({ frame: frame - 190, fps, config: { damping: 17, stiffness: 80, mass: 0.9 } });
  const sources = [
    { icon: "👤", label: "אדם", at: 290 },
    { icon: "📄", label: "מאמר", at: 320 },
    { icon: "🤖", label: "כלי AI", at: 350 },
  ];
  const stamp = spring({ frame: frame - 425, fps, config: { damping: 12, stiffness: 110, mass: 0.7 } });

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="idea_bg.png" dur={473} maxOpacity={0.55} />
      <Particles />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 50, fontWeight: 800, direction: "rtl", color: COLORS.text, textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
          האתגר המרכזי בעידן <span style={{ color: COLORS.primary, direction: "ltr", display: "inline-block" }}>AI</span>
        </div>
      </div>

      {/* contrast: what was written vs whose idea */}
      <div style={{ position: "absolute", top: 190, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 36, direction: "rtl" }}>
        <div style={{ width: 320, transform: `scale(${cardWritten})`, opacity: cardWritten * 0.85, padding: "30px 24px", borderRadius: 22, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${COLORS.textDim}`, textAlign: "center", filter: "grayscale(0.3)" }}>
          <div style={{ fontSize: 50, marginBottom: 10 }}>📝</div>
          <div style={{ fontSize: 24, color: COLORS.textMuted, direction: "rtl" }}>לא רק</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.textMuted, direction: "rtl" }}>מה נכתב</div>
        </div>

        <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.accent, opacity: cardIdea }}>←</div>

        <div style={{ width: 360, transform: `scale(${cardIdea * ideaPulse})`, opacity: cardIdea, padding: "34px 24px", borderRadius: 24, background: `linear-gradient(160deg, ${COLORS.accent}26 0%, rgba(255,255,255,0.03) 100%)`, border: `2px solid ${COLORS.accent}`, boxShadow: `0 0 50px ${COLORS.accent}33`, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 8, filter: `drop-shadow(0 0 18px ${COLORS.accent})` }}>💡</div>
          <div style={{ fontSize: 24, color: COLORS.accent, direction: "rtl" }}>אלא</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.text, direction: "rtl" }}>של מי הרעיון</div>
        </div>
      </div>

      {/* lower note: even reworded → cite the source */}
      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: note, transform: `translateY(${interpolate(note, [0, 1], [30, 0])}px)` }}>
        <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.text, direction: "rtl", textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}>
          גם בניסוח מחדש או עריכה — אם הרעיון הגיע ממקור אחר:
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", direction: "rtl" }}>
          {sources.map((s, i) => {
            const sp = spring({ frame: frame - s.at, fps, config: { damping: 15, stiffness: 95, mass: 0.7 } });
            return (
              <div key={i} style={{ transform: `scale(${sp})`, opacity: sp, display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 999, background: `${COLORS.secondary}1f`, border: `1.5px solid ${COLORS.secondary}66`, fontSize: 26, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>{s.label}
              </div>
            );
          })}
          <div style={{ transform: `scale(${stamp})`, opacity: stamp, marginRight: 8, padding: "12px 28px", borderRadius: 14, background: COLORS.accent, color: "#1a1205", fontSize: 28, fontWeight: 800, direction: "rtl", boxShadow: `0 0 30px ${COLORS.accent}88` }}>
            ← יש לציין זאת
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
