#!/bin/bash
# Generate one GPT Image 2 background per lesson6 scene (quality low, 3:2).
set -u
TOKEN=$(grep REPLICATE_API_TOKEN /Users/sgolan20/DEV/Haifa_univ_video_1/.env | cut -d'=' -f2 | tr -d '"' | tr -d ' ')
OUT=/Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video/public/lesson6-lecture1/images
mkdir -p "$OUT"

STYLE="Dark deep-navy background color #0a0e1a, cinematic and very subtle, abstract, lots of empty dark negative space in the center for text overlay, soft glowing bokeh, professional minimal tech aesthetic, no text, no words, no letters, no numbers, no UI chrome, high quality digital art, wide 16:9 composition."

declare -a NAMES=(
 "shot1_bg" "shot2_bg" "shot3_bg" "shot4_bg" "shot5_bg" "shot6_bg" "shot7_bg"
 "shot8_bg" "shot9_bg" "shot10_bg" "shot11_bg" "shot12_bg" "shot13_bg"
)
declare -a PROMPTS=(
 "A faintly glowing draft document page with subtle revision marks, surrounded by four small connected glowing nodes, turquoise and gold accents. $STYLE"
 "A glowing circular loop of arrows forming a refinement cycle, concentric orbiting rings, purple and turquoise energy flowing around an empty dark center. $STYLE"
 "A soft glowing chat message bubble next to a faint academic paper page, turquoise glow, calm. $STYLE"
 "A glowing magnifying glass focusing warm golden light onto one highlighted paragraph among faded dim text lines. $STYLE"
 "A precise glowing pointer indicating one highlighted section of a faint document, targeted annotation, turquoise accent. $STYLE"
 "A luminous compass at a crossroads splitting into four glowing diverging paths, four directions, turquoise purple gold green accents. $STYLE"
 "A glowing archery target bullseye with a single precise arrow in the center, turquoise focus rings. $STYLE"
 "An abstract glowing layout: organized panels, a table grid and a bullet list and a slide frame, structured, purple accents. $STYLE"
 "Descending glowing translucent layers and strata going deep downward, a sense of depth and analysis, golden accents. $STYLE"
 "A glowing balance scale with neatly stacked structured logic blocks on each side, green and teal energy. $STYLE"
 "A glowing spreadsheet logbook table with faint rows and columns, like a research notebook log, turquoise accents. $STYLE"
 "A thoughtful human silhouette from behind reviewing a glowing screen, a hand poised making a decision, human and AI collaboration, purple accents. $STYLE"
 "Ascending glowing steps rising from a rough crumpled draft at the bottom to a polished glowing result at the top, upward progress, warm turquoise sunrise glow. $STYLE"
)

for i in "${!NAMES[@]}"; do
  name="${NAMES[$i]}"; prompt="${PROMPTS[$i]}"
  echo "===== [$((i+1))/13] $name ====="
  body=$(python3 -c "import json,sys; print(json.dumps({'input':{'prompt':sys.argv[1],'aspect_ratio':'3:2','quality':'low','moderation':'low','input_fidelity':'low','output_format':'png','number_of_images':1,'background':'opaque'}}))" "$prompt")
  resp=$(curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-2/predictions" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -H "Prefer: wait" -d "$body")
  url=$(echo "$resp" | python3 -c "import json,sys; d=json.load(sys.stdin); o=d.get('output'); print(o[0] if isinstance(o,list) and o else (o or ''))" 2>/dev/null)
  if [ -z "$url" ]; then
    # poll
    pid=$(echo "$resp" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
    for t in $(seq 1 30); do
      sleep 3
      pr=$(curl -s "https://api.replicate.com/v1/predictions/$pid" -H "Authorization: Bearer $TOKEN")
      st=$(echo "$pr" | python3 -c "import json,sys; print(json.load(sys.stdin).get('status',''))" 2>/dev/null)
      [ "$st" = "succeeded" ] && url=$(echo "$pr" | python3 -c "import json,sys; d=json.load(sys.stdin); o=d.get('output'); print(o[0] if isinstance(o,list) and o else (o or ''))") && break
      [ "$st" = "failed" ] || [ "$st" = "canceled" ] && echo "  FAILED: $(echo "$pr" | python3 -c "import json,sys; print(json.load(sys.stdin).get('error',''))")" && break
    done
  fi
  if [ -n "$url" ]; then
    curl -s -o "$OUT/$name.png" "$url" && echo "  OK -> $name.png ($(wc -c < "$OUT/$name.png") bytes)"
  else
    echo "  NO URL for $name"
  fi
done
echo "===== DONE ====="