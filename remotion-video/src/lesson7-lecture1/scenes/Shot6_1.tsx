import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 6.1 — Bias is subtle (76.7–92.0s)
 *   0.4s  "לא כל תשובה מוטה באופן ברור או קיצוני"
 *   4.8s  "בדרך כלל ההטיה עדינה יותר"
 *   7.2s  "בבחירת הדוגמאות / בסגנון הדיבור / במה שמרכזי / במה שלא מוזכר"
 */
const PLACES = [
  { text: "בחירת הדוגמאות", icon: "🗂️", at: 220 },
  { text: "סגנון הדיבור", icon: "💬", at: 262 },
  { text: "מה מקבל מקום מרכזי", icon: "🔆", at: 300 },
  { text: "מה שלא מוזכר כלל", icon: "🕳️", at: 335 },
];

export const Shot6_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sub = sp(frame, fps, 150);

  return (
    <SceneShell accent={COLORS.warning} variant="grid" bg="shot6_bg.png">
      <TopLabel title="ההטיה לרוב עדינה" at={4} accent={COLORS.warning} />

      <div style={{ position: "absolute", top: 214, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: sub }}>
        <span style={{ fontSize: 37, fontWeight: 600, color: COLORS.textMuted, direction: "rtl" }}>לא תמיד ברורה או קיצונית — היא יכולה להופיע ב:</span>
      </div>

      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 26, direction: "rtl" }}>
        {PLACES.map((p, i) => {
          const a = sp(frame, fps, p.at, { damping: 13, stiffness: 110 });
          const float = Math.sin((frame + i * 36) * 0.05) * 4;
          return (
            <div key={p.text} style={{ transform: `scale(${a}) translateY(${float}px)`, opacity: a, width: 250, height: 230, borderRadius: 22, background: `linear-gradient(160deg, ${COLORS.warning}1a 0%, rgba(255,255,255,0.04) 100%)`, border: `2px solid ${COLORS.warning}77`, boxShadow: `0 12px 40px rgba(0,0,0,0.36)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, direction: "rtl", padding: "0 16px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 84, height: 84, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: `1.5px solid ${COLORS.warning}66`, fontSize: 47 }}>{p.icon}</span>
              <span style={{ fontSize: 32, fontWeight: 800, color: COLORS.text, textAlign: "center", lineHeight: 1.25 }}>{p.text}</span>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};
