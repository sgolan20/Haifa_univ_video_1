import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 7.1 — The "successful leader" example (92.0–115.0s)
 *   0.5s  "אם מבקשים לתאר מנהיג מצליח"
 *   3.5s  "תשובה כללית: חזון, נחישות, קבלת החלטות, תקשורת"
 *  11.3s  "אבל כדאי לשים לב: אילו דמויות, מאילו תרבויות, ייצוג..."
 */
const GENERIC = [
  { text: "חזון", at: 200 },
  { text: "נחישות", at: 224 },
  { text: "קבלת החלטות", at: 250 },
  { text: "תקשורת טובה", at: 278 },
];
const NOTICE = [
  { text: "אילו דמויות עולות?", at: 360 },
  { text: "מאילו תרבויות?", at: 405 },
  { text: "ייצוג לנשים ולקבוצות?", at: 470 },
  { text: "סגנונות לא רק כוחניים?", at: 520 },
];

export const Shot7_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prompt = sp(frame, fps, 14);
  const aOut = interpolate(frame, [320, 350], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 350, { stiffness: 85 });

  return (
    <SceneShell accent={COLORS.warning} variant="flow" bg="shot7_bg.png">
      <TopLabel kicker="דוגמה" title='"תאר מנהיג מצליח"' at={4} accent={COLORS.warning} />

      {/* Phase A — generic answer */}
      {frame < 350 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, opacity: aOut }}>
          <div style={{ fontSize: 35, fontWeight: 700, color: COLORS.textMuted, direction: "rtl", transform: `scale(${prompt})`, opacity: prompt }}>תשובה שנשמעת כללית לגמרי:</div>
          <div style={{ display: "flex", gap: 16, direction: "rtl", flexWrap: "wrap", justifyContent: "center", maxWidth: 1100 }}>
            {GENERIC.map((g) => (
              <Pill key={g.text} color={COLORS.textMuted} appear={sp(frame, fps, g.at)} style={{ fontSize: 33 }}>{g.text}</Pill>
            ))}
          </div>
        </div>
      )}

      {/* Phase B — critical questions */}
      {frame >= 320 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, opacity: bIn }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: COLORS.accent, direction: "rtl" }}>אבל כדאי לשים לב —</div>
          <div style={{ display: "flex", gap: 16, direction: "rtl", flexWrap: "wrap", justifyContent: "center", maxWidth: 1180 }}>
            {NOTICE.map((n) => (
              <Pill key={n.text} color={COLORS.accent} appear={sp(frame, fps, n.at)} style={{ fontSize: 31 }}>{n.text}</Pill>
            ))}
          </div>
        </div>
      )}
    </SceneShell>
  );
};
