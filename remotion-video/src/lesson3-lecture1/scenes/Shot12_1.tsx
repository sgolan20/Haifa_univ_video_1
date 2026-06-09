import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 12.1 — The 5-question self-check (640 frames · 21.32s · audioStart 176.0s)
 *
 * Narration (relative):
 *   0.0s  "האם המרצה הגדיר מה מותר ומה אסור בקורס זה?"
 *   4.1s  "האם אני מגיש תוצר שנוצר על ידי AI — או תוצר שנוצר על ידי, בעזרת AI?"
 *  10.7s  "האם אני מסוגל לעמוד מאחורי כל משפט בעבודה — להסבירו ולהגן עליו?"
 *  15.6s  "האם נתתי קרדיט ברור לכל רעיון שאינו שלי?"
 *  19.3s  "האם ציינתי את השימוש שלי ב‑AI בהתאם למדיניות?"
 */
export const Shot12_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });

  const questions = [
    { at: 8, text: "האם המרצה הגדיר מה מותר ומה אסור בקורס?" },
    { at: 122, text: "האם זה תוצר של AI — או תוצר שלי, בעזרת AI?" },
    { at: 321, text: "האם אני יכול לעמוד מאחורי כל משפט — להסביר ולהגן?" },
    { at: 467, text: "האם נתתי קרדיט ברור לכל רעיון שאינו שלי?" },
    { at: 578, text: "האם ציינתי את השימוש ב‑AI בהתאם למדיניות?" },
  ];

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="checklist_bg.png" dur={640} maxOpacity={0.4} />
      <Particles />

      <div style={{ position: "absolute", top: 54, left: 0, right: 0, textAlign: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 56, fontWeight: 800, direction: "rtl", color: COLORS.text, textShadow: `0 0 28px ${COLORS.primary}55, 0 2px 14px rgba(0,0,0,0.7)` }}>
          <span style={{ color: COLORS.accent }}>5 שאלות</span> לפני הגשה
        </div>
      </div>

      <div style={{ position: "absolute", top: 170, left: "50%", transform: "translateX(-50%)", width: 1180, display: "flex", flexDirection: "column", gap: 16 }}>
        {questions.map((q, i) => {
          const sp = spring({ frame: frame - q.at, fps, config: { damping: 17, stiffness: 82, mass: 0.9 } });
          const check = interpolate(frame, [q.at + 22, q.at + 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                padding: "20px 30px",
                borderRadius: 18,
                background: `rgba(17,24,39,${0.55 + check * 0.15})`,
                backdropFilter: "blur(12px)",
                border: `1.5px solid ${check > 0.5 ? COLORS.primary + "88" : "rgba(255,255,255,0.1)"}`,
                boxShadow: check > 0.5 ? `0 0 26px ${COLORS.primary}22` : "none",
                opacity: sp,
                transform: `translateX(${interpolate(sp, [0, 1], [50, 0])}px)`,
                direction: "rtl",
              }}
            >
              {/* checkbox */}
              <div style={{ width: 44, height: 44, borderRadius: 10, border: `2.5px solid ${check > 0.3 ? COLORS.primary : COLORS.textDim}`, background: check > 0.3 ? `${COLORS.primary}22` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: COLORS.primary, opacity: check, transform: `scale(${check})` }}>✓</span>
              </div>
              {/* number */}
              <div style={{ fontSize: 30, fontWeight: 900, color: COLORS.accent, width: 36, textAlign: "center", direction: "ltr", flexShrink: 0 }}>{i + 1}</div>
              {/* text */}
              <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.text, direction: "rtl" }}>{q.text}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
