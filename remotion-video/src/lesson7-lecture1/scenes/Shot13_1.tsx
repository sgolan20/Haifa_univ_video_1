import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 13.1 — The three questions (243.18–284.72s)
 *   0.0s  "דרך פשוטה: לשאול שלוש שאלות"
 *   6.0s  "האם זה ברור?"   (clarity)
 *  15.6s  "האם זה נכון?"   (correctness)
 *  27.4s  "האם זה ביקורתי?" (critical)
 */
const QUESTIONS = [
  { q: "ברור?", icon: "📖", color: COLORS.primary, sub: ["אפשר להבין?", "הרעיונות מסודרים?", "אפשר לעקוב?"], at: 181 },
  { q: "נכון?", icon: "✅", color: "#22c55e", sub: ["העובדות מדויקות?", "המקורות קיימים?", "אין הכללות יתר?"], at: 469 },
  { q: "ביקורתי?", icon: "🧠", color: COLORS.accent, sub: ["מכיר במורכבות?", "נקודות מבט שונות?", "יש טיעון אמיתי?"], at: 822 },
];

export const Shot13_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={COLORS.primary} variant="rings" bg="shot13_bg.png">
      <TopLabel kicker="דרך פשוטה לבדיקה" title="שלוש שאלות" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 30, direction: "rtl" }}>
        {QUESTIONS.map((q, i) => {
          const a = sp(frame, fps, q.at, { damping: 13, stiffness: 105 });
          const float = Math.sin((frame + i * 50) * 0.045) * 5;
          return (
            <div key={q.q} style={{ transform: `scale(${a}) translateY(${float}px)`, opacity: a, width: 372, minHeight: 392, borderRadius: 26, background: `linear-gradient(160deg, ${q.color}20 0%, rgba(255,255,255,0.04) 100%)`, border: `2.5px solid ${q.color}`, boxShadow: `0 16px 48px rgba(0,0,0,0.42), 0 0 42px ${q.color}33`, display: "flex", flexDirection: "column", alignItems: "center", padding: "34px 26px", gap: 16, direction: "rtl" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: `2px solid ${q.color}88`, fontSize: 54 }}>{q.icon}</span>
              <div style={{ fontSize: 26, fontWeight: 800, color: q.color, direction: "rtl" }}>{`שאלה ${i + 1}`}</div>
              <div style={{ fontSize: 47, fontWeight: 900, color: COLORS.text, direction: "rtl" }}>האם זה {q.q}</div>
              <div style={{ width: "70%", height: 1.5, background: `${q.color}55`, margin: "4px 0" }} />
              {q.sub.map((s) => (
                <div key={s} style={{ fontSize: 27, fontWeight: 600, color: COLORS.textMuted, direction: "rtl", textAlign: "center" }}>{s}</div>
              ))}
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
