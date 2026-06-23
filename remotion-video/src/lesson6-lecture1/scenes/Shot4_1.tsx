import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../../design/theme";
import { SceneShell, TopLabel, PromptQuote, sp } from "./_shared";

/**
 * Shot 4.1 — The refinement: a focused follow-up (63.8–88.46s)
 *   0.5s  "אבל נניח שהתשובה ברורה, אך החלק על שיטת המחקר קצר מדי"
 *   9.8s  "אפשר להוסיף:"
 *  11.2s  "הסיכום ברור, אבל החלק על שיטת המחקר קצר מדי. הרחב אותו בשלושה משפטים..."
 */
export const Shot4_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const diag = sp(frame, fps, 30);
  const arrow = sp(frame, fps, 285);

  return (
    <SceneShell accent={COLORS.accent} variant="flow" bg="shot4_bg.png">
      <TopLabel kicker="הנחיית המשך" title="לא לפסול — למקד" at={6} accent={COLORS.accent} />

      {/* diagnosis */}
      <div style={{ position: "absolute", top: 248, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: diag, transform: `scale(${diag})` }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center", direction: "rtl", padding: "18px 40px", borderRadius: 16, background: `${COLORS.warning}1a`, border: `2px solid ${COLORS.warning}77` }}>
          <span style={{ fontSize: 34 }}>⚠️</span>
          <span style={{ fontSize: 33, fontWeight: 700, color: COLORS.text, direction: "rtl" }}>הסיכום ברור — אבל החלק על <span style={{ color: "#fca5a5" }}>שיטת המחקר קצר מדי</span></span>
        </div>
      </div>

      <div style={{ position: "absolute", top: 372, left: 0, right: 0, textAlign: "center", opacity: arrow }}>
        <span style={{ fontSize: 30, color: COLORS.accent, direction: "rtl" }}>↓ אפשר להוסיף הנחיה ממוקדת ↓</span>
      </div>

      {/* the focused follow-up prompt */}
      <div style={{ position: "absolute", top: 432, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <PromptQuote
          color={COLORS.accent}
          appear={sp(frame, fps, 320)}
          width={1320}
          text={'"הסיכום ברור, אבל החלק על שיטת המחקר קצר מדי. הרחב אותו בשלושה משפטים, וציין מי היו המשתתפים, מה נאסף, וכיצד נותחו הנתונים. השאר את שאר הסיכום ללא שינוי."'}
        />
      </div>
    </SceneShell>
  );
};
