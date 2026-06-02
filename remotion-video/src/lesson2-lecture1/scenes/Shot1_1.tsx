import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../design/theme";
import { FONT_FAMILY } from "../../design/fonts";

/**
 * PLACEHOLDER shot for lesson2-lecture1.
 * Shows the lecture title over the shared dark style while the full
 * narration plays, so the timeline can be reviewed before the real
 * 12 scenes are built.
 */
export const Shot1_1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });
  const subOpacity = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
        fontFamily: FONT_FAMILY,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          direction: "rtl",
          textAlign: "center",
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: -1,
            textShadow: `0 0 40px ${COLORS.primary}55`,
          }}
        >
          AI לעומת מנועי חיפוש
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            fontWeight: 600,
            color: COLORS.primary,
            opacity: subOpacity,
          }}
        >
          חלק א' — מה הכלי עושה בפועל?
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.textMuted,
            opacity: subOpacity,
          }}
        >
          קריינות הונחה על הטיימליין · ממתין לבניית 12 הסצנות
        </div>
      </div>
    </AbsoluteFill>
  );
};
