import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, PromptQuote, Pill, sp } from "./_shared";

/**
 * Shot 12.1 — Work-prompt + judgment (220.8–253.8s)
 *   0.1s  "אחר כך הופכים את זה לפרומפט עבודה"
 *   4.3s  prompt: "בעריכה שמור על סגנון ישיר, משפטים בינוניים, דוגמאות לימודיות, טון ביקורתי לא תוקפני..."
 *  18.6s  "גם כאן צריך שיקול דעת — לקרוא, לתקן, להשאיר מה שמזהים"
 */
const JUDGE = [
  { text: "קראו את הפרופיל", at: 600 },
  { text: "תקנו אי-דיוקים", at: 640 },
  { text: "השאירו רק מה שאתם מזהים", at: 685 },
];

export const Shot12_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const note = sp(frame, fps, 560);

  return (
    <SceneShell accent={COLORS.primary} variant="flow" bg="shot12_bg.png">
      <TopLabel kicker="מפרופיל — לפרומפט עבודה" title="" at={4} accent={COLORS.primary} />

      <div style={{ position: "absolute", top: 170, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <PromptQuote
          color={COLORS.primary}
          appear={sp(frame, fps, 30)}
          width={1340}
          text={'"בעריכה של הטקסטים שלי, שמור על סגנון ישיר, משפטים בינוניים, דוגמאות מהקשר לימודי, וטון ביקורתי אך לא תוקפני. שפר בהירות וזרימה — אבל אל תהפוך את הטקסט לרשמי מדי."'}
        />
      </div>

      <div style={{ position: "absolute", top: 430, left: 0, right: 0, textAlign: "center", direction: "rtl", opacity: note }}>
        <span style={{ fontSize: 34, fontWeight: 700, color: COLORS.accent, direction: "rtl" }}>⚠️ גם כאן צריך שיקול דעת — הפרופיל עשוי להיות לא מדויק</span>
      </div>

      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16, direction: "rtl", flexWrap: "wrap" }}>
        {JUDGE.map((j) => (
          <Pill key={j.text} color={COLORS.primary} appear={sp(frame, fps, j.at)} style={{ fontSize: 30 }}>{j.text}</Pill>
        ))}
      </div>
    </SceneShell>
  );
};
