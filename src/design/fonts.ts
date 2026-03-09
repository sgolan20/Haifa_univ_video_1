import { loadFont } from "@remotion/google-fonts/Rubik";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["hebrew", "latin"],
});

export const FONT_FAMILY = fontFamily;
