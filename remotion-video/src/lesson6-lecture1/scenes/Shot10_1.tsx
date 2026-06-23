import React from "react";
import { DirIcon, DirectionScene } from "./_shared";

/**
 * Shot 10.1 — Direction 4: Argument (203.94–244.78s)
 *   0.5s  "הכיוון הרביעי הוא טיעון"
 *   2.9s  "חשוב בכתיבה אקדמית — טענה בלי נימוק, דוגמה שלא תומכת"
 *  19.5s example 1 / 30s example 2
 *  32s   "בכל המקרים — מגדירים מה בדיוק צריך להשתפר"
 */
export const Shot10_1: React.FC = () => (
  <DirectionScene
    index={4}
    title="טיעון"
    accent="#22c55e"
    icon={<DirIcon kind="argument" color="#22c55e" />}
    when="חשוב בכתיבה אקדמית — לפעמים יש טענה אבל חסר לה נימוק, או הדוגמה לא באמת תומכת"
    bg="shot10_bg.png"
    whenAt={87}
    quotes={[
      { text: '"סדר את התשובה כך שתהיה בה טענה מרכזית, שני נימוקים ודוגמה שתומכת בכל נימוק."', at: 584 },
      { text: '"זהה חולשה אפשרית בטיעון והצע דרך לחזק אותו."', at: 902 },
    ]}
    footer="בכל הכיוונים — לא 'להיות טוב יותר', אלא מה בדיוק צריך להשתפר"
    footerAt={985}
  />
);
