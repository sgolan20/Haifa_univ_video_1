#!/bin/bash
set -u
TOKEN=$(grep REPLICATE_API_TOKEN /Users/sgolan20/DEV/Haifa_univ_video_1/.env | cut -d'=' -f2 | tr -d '"' | tr -d ' ')
OUT=/Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video/public/lesson7-lecture1/images
mkdir -p "$OUT"
STYLE="Dark deep-navy background color #0a0e1a, cinematic and very subtle, abstract, lots of empty dark negative space in the center for text overlay, soft glowing bokeh, professional minimal tech aesthetic, no text, no words, no letters, no numbers, no UI chrome, high quality digital art, wide 16:9 composition."

NAMES=(shot1_bg shot2_bg shot3_bg shot4_bg shot5_bg shot6_bg shot7_bg shot8_bg shot9_bg shot10_bg shot11_bg shot12_bg shot13_bg shot14_bg)
PROMPTS=(
 "A glowing magnifying glass examining faint flowing lines of text, a sense of careful critical reading, turquoise glow. $STYLE"
 "A polished impressive-looking glowing document page, clean and well-structured, gives an impression of seriousness, turquoise glow. $STYLE"
 "A glossy smooth glowing surface with subtle hidden cracks beneath it, looks convincing but flawed, amber and red accents. $STYLE"
 "A glowing balance scale of judgement beside a reading eye, shifting from writing to evaluating, purple accents. $STYLE"
 "A glowing AI brain fed by many converging streams of human text, faintly tinted, not perfectly neutral, purple and teal accents. $STYLE"
 "A subtle camouflaged glowing pattern partly hidden in shadow, a faint bias hiding in plain sight, muted amber accents. $STYLE"
 "Diverse glowing silhouettes of different leaders from different cultures around a podium, representation and variety, warm amber accents. $STYLE"
 "A glowing document page with a conspicuous empty blank gap highlighted, the missing part, what is not written, purple accents. $STYLE"
 "Glowing classical columns forming a structure with a visible weak cracked link in a chain, looks solid but fragile, amber red accents. $STYLE"
 "Faint glowing academic paper pages with a large question mark and a verification checkmark, fact-checking sources, amber accents. $STYLE"
 "A dim generic flat glowing texture with a single small bright spark of original insight emerging, depth of thought, purple accents. $STYLE"
 "A human hand adding a glowing spark or annotation onto AI-generated text, human contribution and originality, turquoise accents. $STYLE"
 "Three glowing translucent question panels in a row, a checklist of clear correct critical, turquoise green and gold accents. $STYLE"
 "A thoughtful person silhouette reviewing glowing text at a desk after the AI finished, responsibility and judgement, warm turquoise sunrise glow. $STYLE"
)
for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"; prompt="${PROMPTS[$i]}"
  echo "===== [$((i+1))/14] $name ====="
  body=$(python3 -c "import json,sys; print(json.dumps({'input':{'prompt':sys.argv[1],'aspect_ratio':'3:2','quality':'low','moderation':'low','input_fidelity':'low','output_format':'png','number_of_images':1,'background':'opaque'}}))" "$prompt")
  resp=$(curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-2/predictions" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -H "Prefer: wait" -d "$body")
  url=$(echo "$resp" | python3 -c "import json,sys; d=json.load(sys.stdin); o=d.get('output'); print(o[0] if isinstance(o,list) and o else (o or ''))" 2>/dev/null)
  if [ -z "$url" ]; then
    pid=$(echo "$resp" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
    for t in $(seq 1 30); do sleep 3; pr=$(curl -s "https://api.replicate.com/v1/predictions/$pid" -H "Authorization: Bearer $TOKEN"); st=$(echo "$pr" | python3 -c "import json,sys; print(json.load(sys.stdin).get('status',''))" 2>/dev/null); [ "$st" = "succeeded" ] && url=$(echo "$pr" | python3 -c "import json,sys; d=json.load(sys.stdin); o=d.get('output'); print(o[0] if isinstance(o,list) and o else (o or ''))") && break; { [ "$st" = "failed" ] || [ "$st" = "canceled" ]; } && echo "  FAILED" && break; done
  fi
  [ -n "$url" ] && curl -s -o "$OUT/$name.png" "$url" && echo "  OK $name ($(wc -c < "$OUT/$name.png")b)" || echo "  NO URL $name"
done
echo "===== DONE ====="