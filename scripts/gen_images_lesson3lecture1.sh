#!/bin/bash
# Generate background images for lesson3-lecture1 via GPT Image 2 (Replicate).
set -u
ROOT="/Users/sgolan20/DEV/Haifa_univ_video_1"
OUT="$ROOT/remotion-video/public/lesson3-lecture1/images"
TOKEN=$(grep REPLICATE_API_TOKEN "$ROOT/.env" | cut -d'=' -f2 | tr -d '"' | tr -d ' ')

STYLE="Cinematic dark editorial illustration, deep navy background (#0a0e1a to #111827), glowing turquoise (#00d4ff) and purple (#8b5cf6) accents, soft volumetric light, premium 3D render, subtle particles and bokeh, lots of negative space, NO text, NO words, NO letters, NO captions, 16:9 composition."

gen () {
  local name="$1"; local prompt="$2"
  echo "=== $name ==="
  local resp
  resp=$(curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-2/predictions" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -H "Prefer: wait" \
    -d "$(jq -n --arg p "$prompt. $STYLE" '{input:{prompt:$p,aspect_ratio:"3:2",quality:"low",moderation:"low",input_fidelity:"low",output_format:"png",number_of_images:1,background:"opaque"}}')")
  local url
  url=$(echo "$resp" | jq -r 'if (.output|type)=="array" then .output[0] else .output end')
  if [ "$url" = "null" ] || [ -z "$url" ]; then
    echo "FAILED $name:"; echo "$resp" | jq -r '.error // .detail // .' | head -5; return 1
  fi
  curl -s -o "$OUT/$name.png" "$url" && echo "saved $OUT/$name.png ($(wc -c < "$OUT/$name.png") bytes)"
}

gen "opening_bg" "A majestic university library reading hall fused with a glowing artificial-intelligence neural network, an elegant brass balance scale of justice in the foreground softly etched with circuit patterns, scholarly and trustworthy mood, academic integrity in the age of AI"
gen "integrity_bg" "An elegant glowing brass balance scale perfectly balanced on a dark wooden desk, an open book and a glowing quill pen beside it, warm gold and turquoise light, themes of honesty transparency and giving credit"
gen "idea_bg" "A glowing lightbulb made of luminous neural connections floating between a human head silhouette on one side and a geometric AI node on the other, a beam of light passing the idea between them, attribution of ideas, purple and turquoise"
gen "boundary_bg" "An abstract wide spectrum split into two zones by a soft blurry foggy boundary line down the middle, left zone calm turquoise representing a helpful assistive tool, right zone warm red representing replacement of thinking, the line dissolving and blurring"
gen "plagiarism_bg" "A stack of overlapping duplicated paper documents glowing with an ominous red warning light, identical copied pages fanned out, a faint red fingerprint, dramatic warning mood, copied text presented as original"
gen "legit_bg" "Human hands editing and refining a document on a laptop screen, a subtle helpful AI glow assisting at the side, soft green and turquoise positive light, constructive collaborative academic writing done correctly"
gen "sources_bg" "A library shelf of books with floating translucent citation reference cards, some cards glowing genuine turquoise and a few glowing false red and dissolving as fabricated, a magnifying glass inspecting them, verifying sources"
gen "understanding_bg" "A lone student silhouette seen from behind with a faintly glowing translucent empty head, floating glowing question marks around, a blurred examination hall in the background, mood of confusion and not understanding, subtle red accents"
gen "checklist_bg" "A glowing futuristic floating clipboard checklist hologram with glowing checkmark boxes, clean and orderly, self-reflection and verification before submission, turquoise and gold light, calm focused mood"
gen "summary_bg" "A human silhouette and an AI light entity working together in harmony, an upward forward-looking beam of hopeful light, balanced and ethical partnership, turquoise purple and gold, inspiring conclusion"

echo "ALL DONE"
ls -la "$OUT"
