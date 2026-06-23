import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, sp } from "./_shared";

/**
 * Shot 4.1 — The key question (46.9–54.2s)
 *   0.1s  "השאלה אינה האם להשתמש ב-AI לעריכה"
 *   3.5s  "אלא איך — בלי למסור לו את הבעלות על הטקסט"
 */
export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = sp(frame, fps, 16, { stiffness: 88 });
  const b = sp(frame, fps, 95, { stiffness: 88 });

  return (
    <SceneShell accent={COLORS.secondary} variant="flow" bg="shot4_bg.png">
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 34, direction: "rtl" }}>
        <div style={{ fontSize: 44, fontWeight: 700, color: COLORS.textMuted, direction: "rtl", textAlign: "center", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)` }}>
          השאלה אינה <span style={{ textDecoration: "line-through" }}>האם</span> להשתמש ב-AI לעריכה
        </div>
        <div style={{ opacity: b, transform: `scale(${b})`, padding: "24px 60px", borderRadius: 20, background: `${COLORS.secondary}1f`, border: `2.5px solid ${COLORS.secondary}`, boxShadow: `0 0 48px ${COLORS.secondary}44`, direction: "rtl", textAlign: "center", maxWidth: 1300 }}>
          <span style={{ fontSize: 50, fontWeight: 900, color: COLORS.text }}>אלא <span style={{ color: COLORS.secondary }}>איך</span> — בלי למסור את הבעלות על הטקסט</span>
        </div>
      </div>
    </SceneShell>
  );
};
