import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 9.1 — Weak arguments (131.4–169.0s)
 *   0.3s  "אותו דבר קורה גם בטיעונים"
 *   2.5s  "AI מייצר טקסט שנראה כמו טיעון: פתיחה, נימוקים, סיכום — מבחוץ מסודר"
 *  12.9s  "אבל מקרוב — הקשרים חלשים"
 *  15.7s  "המסקנה לא נובעת / מידע שלא נבדק / רק צד אחד"
 *  29.6s  "סכנה: תחושת ודאות במקום שצריך זהירות"
 */
const STRUCTURE = [
  { text: "פתיחה", at: 150 },
  { text: "נימוקים", at: 185 },
  { text: "סיכום", at: 215 },
];
const FLAWS = [
  { text: "המסקנה לא באמת נובעת מהנימוקים", at: 480 },
  { text: "הטענה נשענת על מידע שלא נבדק", at: 590 },
  { text: "מציג רק צד אחד — בלי מגבלות", at: 700 },
];

export const Shot9_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aOut = interpolate(frame, [360, 392], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 392, { stiffness: 85 });
  const danger = sp(frame, fps, 888, { damping: 12, stiffness: 105 });

  return (
    <SceneShell accent={COLORS.warning} variant="grid" bg="shot9_bg.png">
      <TopLabel kicker="אותו דבר בטיעונים" title="נראה כמו טיעון — אבל" at={4} accent={COLORS.warning} />

      {/* Phase A — looks structured */}
      {frame < 392 && (
        <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, opacity: aOut }}>
          <div style={{ fontSize: 35, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>מבחוץ זה נראה מסודר:</div>
          <div style={{ display: "flex", gap: 16, direction: "rtl" }}>
            {STRUCTURE.map((s) => (
              <Pill key={s.text} color={COLORS.primary} appear={sp(frame, fps, s.at)} style={{ fontSize: 33 }}>✓ {s.text}</Pill>
            ))}
          </div>
        </div>
      )}

      {/* Phase B — weak up close */}
      {frame >= 360 && (
        <div style={{ position: "absolute", top: 234, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, opacity: bIn }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#fca5a5", direction: "rtl", marginBottom: 6 }}>אבל כשקוראים מקרוב — הקשרים חלשים</div>
          {FLAWS.map((f, i) => {
            const a = sp(frame, fps, f.at, { stiffness: 95 });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, direction: "rtl", opacity: a, transform: `translateX(${interpolate(a, [0, 1], [-26, 0])}px)`, width: 980, padding: "14px 28px", borderRadius: 14, background: `${COLORS.warning}16`, border: `1.5px solid ${COLORS.warning}66` }}>
                <span style={{ color: COLORS.warning, fontSize: 31, fontWeight: 900 }}>✕</span>
                <span style={{ fontSize: 34, fontWeight: 700, color: COLORS.text }}>{f.text}</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ position: "absolute", bottom: 70, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: danger, transform: `scale(${danger})` }}>
        <div style={{ padding: "16px 46px", borderRadius: 16, background: `${COLORS.accent}1f`, border: `2px solid ${COLORS.accent}`, fontSize: 35, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center" }}>
          ⚠️ תחושת ודאות — גם במקום שבו צריך זהירות
        </div>
      </div>
    </SceneShell>
  );
};
