import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";
import { SceneBg, Particles } from "./_shared";

/**
 * Shot 4.1 — AI model = information generation (the purple counterpart to scene 3)
 * Duration: 897 frames (29.9s) · audioStart 64.62s
 *
 * f0:    title "מודל AI = יצירת מידע / Generation" (purple)
 * f195:  negation tag — אין מסמך · אין ציטוט · אין מקור
 * f320:  words are "born" one by one, each with a probability % (statistical patterns)
 *
 * Narration (relative):
 *   0.0s  "מודל בינה מלאכותית גנרטיבית פועל על עיקרון שונה לחלוטין – הוא מבצע יצירת מידע."
 *   6.4s  "הוא אינו מחפש מסמך קיים ואינו מחזיר ציטוט ממקור אמיתי."
 *  10.6s  "במקום זאת, הוא מייצר טקסט חדש לגמרי, בזמן אמת,"
 *  15.1s  "על בסיס דפוסים סטטיסטיים שנלמדו ממיליארדי טקסטים..."
 *  25.0s  "הוא מייצר רצפי מילים שנראים הגיוניים ורלוונטיים בהקשר הנתון."
 */
const WORDS = [
  { w: "הסטודנט", p: "94%" },
  { w: "כתב", p: "88%" },
  { w: "עבודה", p: "79%" },
  { w: "מצוינת", p: "83%" },
];

export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const glow = 0.4 + 0.3 * Math.sin(frame * 0.05);
  const neg = spring({ frame: frame - 195, fps, config: { damping: 16, stiffness: 90, mass: 0.8 } });
  const showProb = frame > 470;

  return (
    <AbsoluteFill style={{ background: COLORS.bgPrimary, fontFamily: FONT_FAMILY }}>
      <SceneBg img="generation_bg.png" dur={897} />
      <Particles />

      {/* title */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${title})`, opacity: title }}>
        <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.secondary, direction: "rtl", textShadow: `0 0 ${30 + glow * 26}px ${COLORS.secondary}77, 0 2px 12px rgba(0,0,0,0.7)` }}>
          מודל AI = יצירת מידע
        </div>
        <div style={{ fontSize: 28, fontWeight: 500, color: COLORS.textMuted, direction: "ltr", marginTop: 6, letterSpacing: 1 }}>Generation</div>
      </div>

      {/* negation tag */}
      {frame > 188 && (
        <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              transform: `scale(${neg})`,
              opacity: neg,
              display: "flex",
              gap: 0,
              direction: "rtl",
              padding: "16px 36px",
              borderRadius: 999,
              background: `${COLORS.warning}14`,
              border: `1.5px solid ${COLORS.warning}55`,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.warning,
              textShadow: `0 0 18px ${COLORS.warning}33`,
            }}
          >
            אין מסמך&nbsp;&nbsp;·&nbsp;&nbsp;אין ציטוט&nbsp;&nbsp;·&nbsp;&nbsp;אין מקור
          </div>
        </div>
      )}

      {/* words being "born" with probabilities */}
      <div style={{ position: "absolute", top: 430, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={{ fontSize: 26, fontWeight: 500, color: COLORS.textMuted, direction: "rtl", opacity: interpolate(frame, [320, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          המודל מנבא מילה אחר מילה — לפי הסתברות:
        </div>
        <div style={{ display: "flex", gap: 20, direction: "rtl" }}>
          {WORDS.map((item, i) => <WordCard key={i} item={item} appearAt={360 + i * 55} showProb={showProb} />)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const WordCard: React.FC<{ item: { w: string; p: string }; appearAt: number; showProb: boolean }> = ({ item, appearAt, showProb }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < appearAt - 5) return null;
  const s = spring({ frame: frame - appearAt, fps, config: { damping: 14, stiffness: 110, mass: 0.7 } });
  const probOpacity = interpolate(frame, [appearAt + 18, appearAt + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ transform: `scale(${s})`, opacity: s, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          padding: "18px 30px",
          borderRadius: 14,
          background: `linear-gradient(160deg, ${COLORS.secondary}26 0%, rgba(255,255,255,0.03) 100%)`,
          border: `1.5px solid ${COLORS.secondary}77`,
          boxShadow: `0 0 26px ${COLORS.secondary}1f`,
          fontSize: 40,
          fontWeight: 700,
          color: COLORS.text,
          direction: "rtl",
        }}
      >
        {item.w}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.secondary, direction: "ltr", opacity: showProb ? probOpacity : 0 }}>{item.p}</div>
    </div>
  );
};
