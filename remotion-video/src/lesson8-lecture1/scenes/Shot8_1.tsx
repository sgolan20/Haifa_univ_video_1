import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 8.1 — Personal voice (120.6–141.9s)
 *   0.2s  "עד כאן — מה AI עושה עם הטקסט. כעת — מה אנחנו מחזירים אליו"
 *   6.5s  "קול אישי: בחירת מילים, דוגמאות, קצב, ישירות, היסוס, הומור"
 *  16s    "AI מחליק את זה — מסודר, אבל קצת אפור"
 */
const VOICE = [
  { text: "בחירת מילים", at: 200 },
  { text: "דוגמאות", at: 232 },
  { text: "קצב המשפטים", at: 262 },
  { text: "מידת הישירות", at: 295 },
  { text: "היסוס", at: 325 },
  { text: "הומור", at: 352 },
];

export const Shot8_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = sp(frame, fps, 16);
  const bottom = sp(frame, fps, 470, { stiffness: 90 });

  return (
    <SceneShell accent={COLORS.secondary} variant="rings" bg="shot8_bg.png">
      <TopLabel kicker="מה אנחנו מחזירים לטקסט" title="הקול האישי" at={4} accent={COLORS.secondary} />

      <div style={{ position: "absolute", top: 230, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: head }}>
        <span style={{ fontSize: 34, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>הקול האישי נמצא ב:</span>
      </div>

      <div style={{ position: "absolute", top: 308, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18, direction: "rtl", flexWrap: "wrap", maxWidth: 1200, marginInline: "auto" }}>
        {VOICE.map((v) => (
          <Pill key={v.text} color={COLORS.secondary} appear={sp(frame, fps, v.at)} style={{ fontSize: 32 }}>{v.text}</Pill>
        ))}
      </div>

      <div style={{ position: "absolute", bottom: 130, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: bottom }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center" }}>
          AI נוטה <span style={{ color: COLORS.textMuted }}>להחליק</span> את אלה — מסודר, אבל קצת <span style={{ color: COLORS.warning }}>אפור</span>
        </div>
      </div>
    </SceneShell>
  );
};
