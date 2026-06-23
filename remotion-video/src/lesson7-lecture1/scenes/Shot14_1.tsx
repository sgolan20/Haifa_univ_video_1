import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, Pill, sp } from "./_shared";

/**
 * Shot 14.1 — Summary (284.72–323.92s)
 *   0.0s  "שלוש השאלות — ברור, נכון, ביקורתי — לא להסתנוור"
 *   8.5s  "עבודה עם AI לא נגמרת כשהמודל מסיים — שם מתחיל החלק שלנו"
 *  16s    "קוראים, בודקים, משווים, שואלים, מחליטים"
 *  25.7s  "AI עוזר — אבל לא פוטר מהאחריות לחשוב"
 *  33.6s  "זה מבדיל בין שימוש טכני למושכל"
 */
const RECAP = [
  { text: "ברור", at: 50 },
  { text: "נכון", at: 75 },
  { text: "ביקורתי", at: 100 },
];
const ACTIONS = [
  { text: "קוראים", at: 479 },
  { text: "בודקים", at: 521 },
  { text: "משווים", at: 556 },
  { text: "שואלים מה חסר", at: 604 },
  { text: "מחליטים", at: 650 },
];

export const Shot14_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const recapOut = interpolate(frame, [228, 256], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bIn = sp(frame, fps, 256, { stiffness: 84 });
  const bOut = interpolate(frame, [742, 770], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cIn = sp(frame, fps, 770, { stiffness: 84 });
  const stamp = sp(frame, fps, 1009, { damping: 12, stiffness: 110 });

  return (
    <SceneShell accent={COLORS.primary} variant="grid" bg="shot14_bg.png">
      <TopLabel kicker="לסיכום" title="" at={4} accent={COLORS.primary} />

      {/* Phase A — recap */}
      {frame < 256 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, opacity: recapOut }}>
          <div style={{ display: "flex", gap: 16, direction: "rtl" }}>
            {RECAP.map((r) => <Pill key={r.text} color={COLORS.primary} appear={sp(frame, fps, r.at)} style={{ fontSize: 35 }}>{r.text}</Pill>)}
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.textMuted, direction: "rtl" }}>כדי לא ״להסתנוור״ מטקסט שנראה טוב במבט ראשון</div>
        </div>
      )}

      {/* Phase B — the work begins */}
      {frame >= 248 && frame < 770 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, opacity: bIn * bOut }}>
          <div style={{ fontSize: 50, fontWeight: 900, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1200, lineHeight: 1.3 }}>
            העבודה לא נגמרת כשה-AI מסיים — <span style={{ color: COLORS.accent }}>שם מתחיל החלק שלנו</span>
          </div>
          <div style={{ display: "flex", gap: 14, direction: "rtl", flexWrap: "wrap", justifyContent: "center", maxWidth: 1150 }}>
            {ACTIONS.map((ac) => <Pill key={ac.text} color={COLORS.primary} appear={sp(frame, fps, ac.at)} style={{ fontSize: 32 }}>{ac.text}</Pill>)}
          </div>
        </div>
      )}

      {/* Phase C — responsibility */}
      {frame >= 758 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30, opacity: cIn }}>
          <div style={{ fontSize: 45, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center", maxWidth: 1240, lineHeight: 1.34 }}>
            AI עוזר בטיוטה, בארגון ובניסוח — <span style={{ color: COLORS.textMuted }}>אבל לא פוטר אותנו</span> מהאחריות לחשוב
          </div>
          <div style={{ transform: `scale(${stamp})`, opacity: stamp, padding: "18px 54px", borderRadius: 18, background: `${COLORS.accent}1f`, border: `2.5px solid ${COLORS.accent}`, boxShadow: `0 0 44px ${COLORS.accent}44`, direction: "rtl" }}>
            <span style={{ fontSize: 45, fontWeight: 900, color: COLORS.text }}>וזה ההבדל בין שימוש טכני ל<span style={{ color: COLORS.accent }}>שימוש מושכל</span></span>
          </div>
        </div>
      )}
    </SceneShell>
  );
};
