import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 12.1 — The human's contribution + originality (209.4–243.18s)
 *   0.0s  "כאן נכנס המקום של האדם — לא רק לתקן שגיאות, אלא להכניס:"
 *  13.2s  "מקוריות לא חייבת להיות רעיון גדול"
 *  16.8s  "משפט שמראה שקראתם, דוגמה מהשיעור, התנגדות, הבחנה, השמטה"
 */
const CONTRIB = [
  { text: "הבחנה", at: 150 },
  { text: "דוגמה", at: 180 },
  { text: "הסתייגות", at: 212 },
  { text: "חיבור לחומר שלמדתם", at: 248 },
  { text: "שאלה חדשה", at: 285 },
];
const ORIG = [
  { text: "משפט שמראה שקראתם באמת", at: 470 },
  { text: "דוגמה מהשיעור", at: 520 },
  { text: "התנגדות קטנה", at: 565 },
  { text: "הבחנה בין מושגים שעורבבו", at: 610 },
  { text: "להשמיט חלק שלא תורם", at: 660 },
];

export const Shot12_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const aOut = interpolate(frame, [368, 396], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 396, { stiffness: 82 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot12_bg.png">
      <TopLabel kicker="כאן נכנס האדם" title="התרומה שלכם" at={4} accent={COLORS.primary} />

      {/* Phase A — contribution */}
      {frame < 396 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, opacity: aOut }}>
          <div style={{ fontSize: 38, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>לא רק לתקן שגיאות — אלא להכניס:</div>
          <div style={{ display: "flex", gap: 16, direction: "rtl", flexWrap: "wrap", justifyContent: "center", maxWidth: 1150 }}>
            {CONTRIB.map((c) => (
              <Pill key={c.text} color={COLORS.primary} appear={sp(frame, fps, c.at)} style={{ fontSize: 32 }}>{c.text}</Pill>
            ))}
          </div>
        </div>
      )}

      {/* Phase B — originality */}
      {frame >= 368 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, opacity: bIn }}>
          <div style={{ fontSize: 42, fontWeight: 900, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200 }}>
            מקוריות לא חייבת להיות <span style={{ color: COLORS.textMuted }}>רעיון גדול</span> — לפעמים היא:
          </div>
          <div style={{ display: "flex", gap: 14, direction: "rtl", flexWrap: "wrap", justifyContent: "center", maxWidth: 1240 }}>
            {ORIG.map((o) => (
              <Pill key={o.text} color={COLORS.accent} appear={sp(frame, fps, o.at)} style={{ fontSize: 30 }}>{o.text}</Pill>
            ))}
          </div>
        </div>
      )}
    </SceneShell>
  );
};
