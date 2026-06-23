import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp, DirIcon, DirKind } from "./_shared";

/**
 * Shot 13.1 — Summary (301.12–328.32s)
 *   0.1s  "לסיכום, איטרציה — מתייחסים לתשובה הראשונה כטיוטה"
 *   7.1s  "בכל סבב כדאי לשאול:"
 *  10.7s  דיוק? / 14.8s פורמט? / 16.8s עומק? / 18.7s טיעון?
 *  21.0s  "מתשובה ראשונה לתוצר שאפשר באמת להשתמש בו"
 *  26.5s  "להתראות"
 */
const QUESTIONS: { text: string; kind: DirKind; color: string; at: number }[] = [
  { text: "יותר דיוק?", kind: "accuracy", color: COLORS.primary, at: 320 },
  { text: "לשנות פורמט?", kind: "format", color: COLORS.secondary, at: 384 },
  { text: "להעמיק?", kind: "depth", color: COLORS.accent, at: 444 },
  { text: "לחזק טיעון?", kind: "argument", color: "#22c55e", at: 502 },
];

export const Shot13_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = sp(frame, fps, 28);
  const ask = sp(frame, fps, 290);
  const close = sp(frame, fps, 570, { stiffness: 90 });
  const bye = sp(frame, fps, 730);

  return (
    <SceneShell accent={COLORS.primary} variant="rings" bg="shot13_bg.png">
      <TopLabel kicker="לסיכום" title="הראשונה היא טיוטה — משפרים בסבבים" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 232, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: intro }}>
        <div style={{ fontSize: 33, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>בוחנים · מזהים מה חסר · מבקשים שיפור ממוקד</div>
      </div>

      <div style={{ position: "absolute", top: 312, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: ask }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: COLORS.primary, direction: "rtl" }}>בכל סבב כדאי לשאול:</div>
      </div>

      <div style={{ position: "absolute", top: 372, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 22, direction: "rtl" }}>
        {QUESTIONS.map((q) => {
          const a = sp(frame, fps, q.at, { damping: 13, stiffness: 110 });
          return (
            <div key={q.text} style={{ transform: `scale(${a})`, opacity: a, width: 230, height: 168, borderRadius: 20, background: `linear-gradient(160deg, ${q.color}20 0%, rgba(255,255,255,0.04) 100%)`, border: `2px solid ${q.color}`, boxShadow: `0 0 32px ${q.color}33`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <DirIcon kind={q.kind} color={q.color} size={46} />
              <span style={{ fontSize: 28, fontWeight: 900, color: COLORS.text, direction: "rtl" }}>{q.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", justifyContent: "center", direction: "rtl", opacity: close, transform: `translateY(${interpolate(close, [0, 1], [16, 0])}px)` }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1300 }}>
          כך מתקדמים <span style={{ color: COLORS.textMuted }}>מתשובה ראשונה</span> <span style={{ color: COLORS.accent, margin: "0 6px" }}>←</span> <span style={{ color: COLORS.accent }}>לתוצר שאפשר באמת להשתמש בו</span>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", opacity: bye }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>להתראות 👋</span>
      </div>
    </SceneShell>
  );
};
