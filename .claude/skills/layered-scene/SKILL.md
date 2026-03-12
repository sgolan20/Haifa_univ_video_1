---
name: layered-scene
description: Create a Remotion shot using the layered technique — AI-generated background image + animated overlays. Use when the user asks for a rich/cinematic shot, or when a shot would benefit from combining a generated background with code animations on top.
argument-hint: "<shot-id and description of what the scene should show>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch, Agent
---

# Layered Scene — AI Background + Remotion Animation

This skill creates visually rich shots by combining two layers:

1. **AI-generated background image** — provides depth, texture, lighting, and cinematic atmosphere that's hard to achieve with code alone
2. **Remotion animations on top** — text, diagrams, transitions, and interactive elements that bring the static image to life and sync with narration

This is analogous to **motion graphics over a matte painting** — a classic post-production technique, but here the matte painting is AI-generated.

## Why This Works

- The **image** does the heavy visual lifting (atmosphere, realism, depth)
- The **animation** adds what a static image can't (movement, timing, narration sync, highlights)
- Together they create a **cinematic, professional look** that feels polished without needing a video production team

## Reference Implementation: Shot 2.2

Shot 2.2 (`src/scenes/Shot2_2.tsx`) is the canonical example of this technique. Study it before creating new layered scenes.

Key patterns from Shot 2.2:
- Background image at partial opacity (`opacity: 0.3-0.5`) so it doesn't overwhelm the animated content
- Animated elements positioned to align with relevant parts of the background image
- `backdropFilter: "blur(...)"` on content panels to separate text from the busy background
- Dark semi-transparent containers for text readability over the image

## Step-by-Step Process

### 1. Plan the Shot

Read these files to understand what the shot needs:
- **Storyboard**: `docs/תסריט remotion.md` — what should happen visually
- **Timing**: `src/timing.ts` — shot duration and audio start time
- **Narration**: Run Whisper on the audio if precise word sync is needed:
  ```bash
  python -c "
  import whisper, json
  model = whisper.load_model('small')
  result = model.transcribe('C:/DEV/Haifa_univ_video_1/remotion-video/public/audio/full_narration.mp3', language='he', word_timestamps=True)
  words = [{'word': w['word'].strip(), 'start': round(w['start'],2), 'end': round(w['end'],2)}
           for seg in result['segments'] for w in (seg.get('words') or [])
           if START_SEC <= w['start'] <= END_SEC]
  with open('whisper_output.json', 'w', encoding='utf-8') as f:
      json.dump(words, f, ensure_ascii=False, indent=2)
  "
  ```

### 2. Generate the Background Image

Use **OpenAI GPT Image 1.5** via Replicate API to generate the background image.

**API call:**
```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN D:/DEV/haifa_univ_1/.env | cut -d'=' -f2)

curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-1.5/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "YOUR_PROMPT_HERE",
      "aspect_ratio": "3:2",
      "quality": "low",
      "moderation": "low",
      "input_fidelity": "low",
      "output_format": "png",
      "background": "opaque"
    }
  }'
```

Then download:
```bash
curl -s -o "C:/DEV/Haifa_univ_video_1/remotion-video/public/images/FILENAME.png" "OUTPUT_URL_FROM_RESPONSE"
```

**Settings:**
- `quality: "low"` — always, for speed/cost
- `moderation: "low"` — always
- `aspect_ratio: "3:2"` — closest to 16:9 for full backgrounds (only options: `1:1`, `3:2`, `2:3`)
- `background: "opaque"` — for full-screen backgrounds
- `input_fidelity: "low"` — unless using reference images (then `"high"`)

**Prompt guidelines for backgrounds:**
- Describe the mood and atmosphere, not just objects
- Specify "dark moody background" or "dark theme (#0a0e1a)" to match the video palette
- Include lighting cues: "soft volumetric lighting", "subtle glow", "dramatic backlight"
- Mention it's for a background: "background illustration for educational video"
- Keep the center relatively clean/simple — that's where animated content will go

**Example prompt:**
> "Dark moody educational background, digital brain made of glowing neural connections floating above an open book, soft purple and turquoise volumetric lighting, cinematic depth of field, dark background #0a0e1a"

Save to: `public/images/shot{S}_{N}_bg.png`

### 3. Build the Animated Layer

Create the shot component following these layering rules:

```tsx
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS } from "../design/theme";
import { FONT_FAMILY } from "../design/fonts";

export const ShotX_Y: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image fade-in
  const bgOpacity = interpolate(frame, [0, 40], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgSecondary} 0%, ${COLORS.bgPrimary} 70%)`,
    }}>
      {/* Layer 1: AI-generated background image */}
      <Img
        src={staticFile("images/shotX_Y_bg.png")}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          opacity: bgOpacity,  // 0.25-0.5 range — enough to see, not enough to overwhelm
        }}
      />

      {/* Layer 2: Animated content on top */}
      {/* Text panels with glassmorphism for readability */}
      <div style={{
        padding: "30px 40px",
        borderRadius: 20,
        background: "rgba(10, 14, 26, 0.75)",       // dark semi-transparent
        border: `2px solid ${COLORS.primary}44`,
        backdropFilter: "blur(20px)",                 // blur the BG image behind
        boxShadow: `0 0 40px ${COLORS.primary}15`,
      }}>
        {/* Animated text, diagrams, etc. */}
      </div>
    </AbsoluteFill>
  );
};
```

### 4. Layering Techniques

| Technique | When to Use | CSS |
|-----------|-------------|-----|
| **Background opacity** | Always — controls image intensity | `opacity: 0.25-0.5` on the `<Img>` |
| **Glassmorphism panels** | Text content over busy areas | `background: rgba(10,14,26,0.75)` + `backdropFilter: "blur(20px)"` |
| **Text glow/shadow** | Titles over the image | `textShadow: "0 0 30px rgba(255,255,255,0.6), 0 4px 20px rgba(0,0,0,0.9)"` |
| **Gradient overlay** | Darken top/bottom for text | Extra div with `background: linear-gradient(transparent, rgba(0,0,0,0.7))` |
| **Animated reveal** | Dramatic image entrance | `opacity` interpolation from 0 to target over 30-60 frames |

### 5. Alignment Tips

- **Position animated elements to match the image** — if the image has a brain in the center, put the related text/animation near the brain
- **Use the image as visual context**, not decoration — the image should reinforce the narration's message
- **Keep animated content readable** — always use dark panels or strong text shadows when placing text over the image
- **Test at full resolution** — what looks fine small may be hard to read at 1920x1080

## Image + Animation Pairing Ideas

| Visual Need | Background Image | Animation Overlay |
|-------------|-----------------|-------------------|
| "What is LLM?" | Digital brain, neural connections | Flow diagram with text labels |
| Prediction concept | Crystal ball, fortune teller | Word probability bars |
| Scale/size | Server room, data center | Counter animations, growing numbers |
| Creativity | Artist studio, paint splashes | Branching tree diagram |
| Comparison | Split environment (warm/cool) | Side-by-side text cards |
| Question/thought | Open book, thinking figure | Floating question marks, text reveal |

## Checklist

- [ ] Background image generated and saved to `public/images/`
- [ ] Image opacity set to 0.25-0.5 (not too bright, not invisible)
- [ ] Text content has dark panels or strong shadows for readability
- [ ] Animated elements are positioned to complement the background image
- [ ] Shot registered in `Root.tsx` with correct duration
- [ ] Type-check passes: `npx tsc --noEmit`
