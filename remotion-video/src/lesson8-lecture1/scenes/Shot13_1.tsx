import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 13.1 — A good 4-step workflow (253.8–284.3s)
 *   טיוטה אנושית → עריכת AI מוגדרת → בדיקה אנושית → החזרת קול אישי
 */
const STEPS = [
  { n: 1, icon: "✍️", title: "טיוטה אנושית", sub: "כותבים את הרעיון בעצמנו", color: COLORS.primary, at: 70 },
  { n: 2, icon: "🤖", title: "עריכת AI מוגדרת", sub: "ליטוש · העמקה · ארגון", color: COLORS.secondary, at: 290 },
  { n: 3, icon: "🔍", title: "בדיקה אנושית", sub: "מה השתפר · מה נעלם", color: COLORS.accent, at: 475 },
  { n: 4, icon: "🗣️", title: "החזרת קול אישי", sub: "שהטקסט שוב שלנו", color: "#22c55e", at: 662 },
];

export const Shot13_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneShell accent={COLORS.primary} variant="rings" bg="shot13_bg.png">
      <TopLabel kicker="תהליך עבודה טוב" title="ארבעה שלבים" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, direction: "rtl" }}>
        {STEPS.map((s, i) => {
          const a = sp(frame, fps, s.at, { damping: 13, stiffness: 105 });
          const float = Math.sin((frame + i * 40) * 0.045) * 5;
          return (
            <React.Fragment key={s.n}>
              <div style={{ transform: `scale(${a}) translateY(${float}px)`, opacity: a, width: 300, height: 318, borderRadius: 24, background: `linear-gradient(160deg, ${s.color}20 0%, rgba(255,255,255,0.04) 100%)`, border: `2.5px solid ${s.color}`, boxShadow: `0 14px 44px rgba(0,0,0,0.4), 0 0 38px ${s.color}30`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, direction: "rtl", padding: "0 18px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 78, height: 78, borderRadius: "50%", background: `${s.color}26`, border: `2px solid ${s.color}`, fontSize: 40 }}>{s.icon}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{`שלב ${s.n}`}</span>
                <span style={{ fontSize: 30, fontWeight: 900, color: COLORS.text, textAlign: "center", lineHeight: 1.2 }}>{s.title}</span>
                <span style={{ fontSize: 23, fontWeight: 600, color: COLORS.textMuted, textAlign: "center" }}>{s.sub}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span style={{ color: COLORS.primary, fontSize: 36, opacity: sp(frame, fps, s.at + 30), direction: "ltr", unicodeBidi: "isolate" }}>◀</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </SceneShell>
  );
};
