#!/bin/bash
# Synthesize 7 pronunciation-corrected segments (warmup + niqqud sentence). Sarah / eleven_v3 / he.
set -u
KEY=48fc4f7a057439c202b143c060402dcb833c16cf6bb507f551999993dccc05f1
VOICE=EXAVITQu4vr4xnSDxMaL
gen () {
  local name="$1"; local text="$2"
  python3 -c "import json,sys; print(json.dumps({'text':sys.argv[1],'model_id':'eleven_v3','voice_settings':{'stability':0.5,'similarity_boost':0.75},'language_code':'he'}))" "$text" > /tmp/$name.json
  curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE" \
    -H "xi-api-key: $KEY" -H "Content-Type: application/json" -d @/tmp/$name.json --output /tmp/$name.mp3
  echo "$name: $(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 /tmp/$name.mp3)s"
}

gen fixA "בשיעור הקודם דיברנו על פרומפטים. איך לנסח הנחיה ברורה ל-AI בעזרת ארבעה רכיבים: הֶקְשֵׁר, מטרה, הנחיות ופורמט."
gen fixB "זה בסיס חשוב. לפעמים התשובה תהיה בַּכִּיווּן, אך כללית מדי."
gen fixC "אפשר להוסיף. הסיכום ברור, אבל החלק על שיטת המחקר קצר מדי. הַרְחֵב אותו בשלושה משפטים, וְצַיֵּן מי היו המשתתפים, מה נאסף, וכיצד נותחו הנתונים. השאר את שאר הסיכום ללא שינוי."
gen fixD "אם קיבלנו הסבר רחב מדי, אפשר לכתוב: התמקד רק בנושא שנלמד בשיעור האחרון, וְהַסְבֵּר אותו באמצעות דוגמה אחת. או: הַתְאֵם את ההסבר לסטודנטים בשנה אלף, בלי להשתמש במונחים מקצועיים שלא הוסברו."
gen fixE "לצורך השוואה עדיפה טבלה. במקרה כזה אפשר לכתוב: אַרְגֵּן את התשובה בטבלה עם שלוש עמודות: מושג, הסבר קצר ודוגמה. או: קַצֵּר את התשובה לחמש נקודות מרכזיות שמתאימות לשקופית אחת."
gen fixF "ביקשנו הסבר של תהליך וקיבלנו רק תיאור כללי. במקרה כזה אפשר לכתוב: הַעֲמֵק את הניתוח. הַסְבֵּר לא רק מה קורה, אלא גם לָמָה זה קורה ומה המשמעות של זה. או: הוֹסֵף הסבר של המנגנון שעומד מאחורי התופעה."
gen fixG "לפעמים הדוגמה לא באמת תומכת בטענה. כאן אפשר לכתוב: סַדֵּר את התשובה כך שתהיה בה טענה מרכזית, שני נימוקים ודוגמה שתומכת בכל נימוק. או: זַהֵה חולשה אפשרית בטיעון וְהַצֵּע דרך לחזק אותו."
echo "=== DONE ==="