#!/bin/bash
set -u
TOKEN=$(grep REPLICATE_API_TOKEN /Users/sgolan20/DEV/Haifa_univ_video_1/.env | cut -d'=' -f2 | tr -d '"' | tr -d ' ')
OUT=/Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video/public/lesson8-lecture1/images
mkdir -p "$OUT"
STYLE="Dark deep-navy background color #0a0e1a, cinematic and very subtle, abstract, lots of empty dark negative space in the center for text overlay, soft glowing bokeh, professional minimal tech aesthetic, no text, no words, no letters, no numbers, no UI chrome, high quality digital art, wide 16:9 composition."
NAMES=(shot1_bg shot2_bg shot3_bg shot4_bg shot5_bg shot6_bg shot7_bg shot8_bg shot9_bg shot10_bg shot11_bg shot12_bg shot13_bg shot14_bg shot15_bg)
PROMPTS=(
"A glowing pen editing flowing lines of text, the craft of editing and rewriting, turquoise glow. $STYLE"
"A messy crumpled paper transforming into a clean glowing organized page, before and after, turquoise glow. $STYLE"
"A polished glowing text where a faint personal handwritten voice quietly fades away, amber and red accents. $STYLE"
"A glowing question mark over a document with a hand keeping ownership of a pen, purple accents. $STYLE"
"A glowing sparkle polishing and cleaning a page, light gentle refinement, turquoise glow. $STYLE"
"A glowing magnifying lens deepening into layers of a paragraph, adding depth carefully, golden amber accents. $STYLE"
"Glowing document blocks being rearranged into a new structure, reordering paragraphs, purple accents. $STYLE"
"A glowing soundwave of a personal human voice with warm unique color among grey uniform text, purple and teal accents. $STYLE"
"A glowing hand writing a personal sentence back into an edited document, restoring the voice, turquoise glow. $STYLE"
"A glowing document with three highlighted marked spots where a personal line is added, marking and refining, turquoise accents. $STYLE"
"A glowing fingerprint made of text forming a personal writing-style profile, purple accents. $STYLE"
"A glowing checklist of style guidelines with a human eye reviewing it critically, turquoise and purple accents. $STYLE"
"Four glowing connected steps in a flow from a human draft to a polished personal result, turquoise purple gold green accents. $STYLE"
"A glowing changelog comparing two document versions side by side, documenting edits, amber accents. $STYLE"
"A glowing polished document that still carries a warm personal signature glow, clear and authentic, turquoise sunrise glow. $STYLE"
)
for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"; prompt="${PROMPTS[$i]}"
  echo "===== [$((i+1))/15] $name ====="
  body=$(python3 -c "import json,sys; print(json.dumps({'input':{'prompt':sys.argv[1],'aspect_ratio':'3:2','quality':'low','moderation':'low','input_fidelity':'low','output_format':'png','number_of_images':1,'background':'opaque'}}))" "$prompt")
  resp=$(curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-2/predictions" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -H "Prefer: wait" -d "$body")
  url=$(echo "$resp" | python3 -c "import json,sys; d=json.load(sys.stdin); o=d.get('output'); print(o[0] if isinstance(o,list) and o else (o or ''))" 2>/dev/null)
  if [ -z "$url" ]; then
    pid=$(echo "$resp" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
    for t in $(seq 1 30); do sleep 3; pr=$(curl -s "https://api.replicate.com/v1/predictions/$pid" -H "Authorization: Bearer $TOKEN"); st=$(echo "$pr" | python3 -c "import json,sys; print(json.load(sys.stdin).get('status',''))" 2>/dev/null); [ "$st" = "succeeded" ] && url=$(echo "$pr" | python3 -c "import json,sys; d=json.load(sys.stdin); o=d.get('output'); print(o[0] if isinstance(o,list) and o else (o or ''))") && break; { [ "$st" = "failed" ] || [ "$st" = "canceled" ]; } && echo "  FAILED" && break; done
  fi
  [ -n "$url" ] && curl -s -o "$OUT/$name.png" "$url" && echo "  OK $name" || echo "  NO URL $name"
done
echo "===== DONE ====="
