#!/bin/bash
# Re-render all 9 final videos. Renders to staging, moves to out/final/ on success.
set -u
cd /Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video

STAGING=out/render_staging
FINAL=out/final
mkdir -p "$STAGING" "$FINAL"

# compId|filename
JOBS=(
  "full-video-1|שיעור 1 - הרצאה 1 - מהו מודל שפה (LLM).mp4"
  "full-video-2a|שיעור 1 - הרצאה 2 - כשהבינה המלאכותית משוכנעת בטעויותיה - Hallucinations.mp4"
  "full-video-2b|שיעור 1 - הרצאה 3 - למה מודלי שפה טועים לפעמים.mp4"
  "full-lesson2-lecture1|שיעור 2 - הרצאה 1 - AI לעומת מנועי חיפוש - חלק א - ההבדל הבסיסי.mp4"
  "full-lesson2-lecture2|שיעור 2 - הרצאה 2 - AI לעומת מנועי חיפוש - חלק ב - האם זה מקור אמיתי.mp4"
  "full-lesson3-lecture1|שיעור 3 - הרצאה 1 - יושרה אקדמית בעידן של AI.mp4"
  "full-lesson3-lecture2|שיעור 3 - הרצאה 2 - יושרה אקדמית בהקשר תחומי - לא תמיד יש תשובה אחת.mp4"
  "full-lesson4-lecture1|שיעור 4 - הרצאה 1 - שקיפות ותיעוד - ציטוט AI ויצירת Appendix.mp4"
  "full-lesson5-lecture1|שיעור 5 - הרצאה 1 - אוריינות פרומפטים - איך לנסח הנחיה שעובדת.mp4"
)

n=0
for job in "${JOBS[@]}"; do
  n=$((n+1))
  compId="${job%%|*}"
  fname="${job#*|}"
  echo "===== [$n/9] rendering $compId ====="
  npx remotion render src/index.ts "$compId" "$STAGING/$fname" \
    --codec h264 --concurrency=8 --gl=angle
  rc=$?
  if [ $rc -eq 0 ] && [ -s "$STAGING/$fname" ]; then
    mv -f "$STAGING/$fname" "$FINAL/$fname"
    echo "===== [$n/9] OK → $FINAL/$fname ====="
  else
    echo "===== [$n/9] FAILED (rc=$rc) for $compId — kept existing final file ====="
  fi
done

rmdir "$STAGING" 2>/dev/null
echo "===== ALL DONE ====="
