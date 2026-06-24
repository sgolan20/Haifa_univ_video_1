import React from "react";
import { Img, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, IMG, sp } from "./_shared";

/**
 * Shot 8.1 — Personal voice (120.6–141.9s)
 *   0.2s  "עד כאן — מה AI עושה עם הטקסט. כעת — מה אנחנו מחזירים אליו"
 *   6.5s  "קול אישי: בחירת מילים, דוגמאות, קצב, ישירות, היסוס, הומור"
 *  16s    "AI מחליק את זה — מסודר, אבל קצת אפור"
 */
const VOICE = [
  { text: "בחירת מילים", icon: "ic_words.png", at: 196 },
  { text: "דוגמאות", icon: "ic_example.png", at: 260 },
  { text: "קצב המשפטים", icon: "ic_rhythm.png", at: 288 },
  { text: "מידת הישירות", icon: "ic_direct.png", at: 336 },
  { text: "היסוס", icon: "ic_hesitate.png", at: 382 },
  { text: "הומור", icon: "ic_humor.png", at: 410 },
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

      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 28, direction: "rtl" }}>
        {VOICE.map((v) => {
          const a = sp(frame, fps, v.at, { damping: 13, stiffness: 110 });
          const float = Math.sin((frame + v.at) * 0.05) * 5;
          return (
            <div key={v.text} style={{ width: 210, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: a, transform: `scale(${a}) translateY(${float}px)`, direction: "rtl" }}>
              <div style={{ width: 150, height: 150, borderRadius: 24, overflow: "hidden", border: `2px solid ${COLORS.secondary}66`, boxShadow: `0 0 30px ${COLORS.secondary}33`, background: "rgba(255,255,255,0.03)" }}>
                <Img src={IMG(v.icon)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: 27, fontWeight: 800, color: COLORS.text, textAlign: "center", direction: "rtl" }}>{v.text}</span>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: 130, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: bottom }}>
        <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, direction: "rtl", textAlign: "center" }}>
          AI נוטה <span style={{ color: COLORS.textMuted }}>להחליק</span> את אלה — מסודר, אבל קצת <span style={{ color: COLORS.warning }}>אפור</span>
        </div>
      </div>
    </SceneShell>
  );
};
