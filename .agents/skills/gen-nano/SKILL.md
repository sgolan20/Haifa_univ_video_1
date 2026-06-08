---
name: gen-nano
description: Generate images for the Remotion video using Google Nano Banana 2 via Replicate API. Use when the user asks to create, replace, or add images/illustrations for the video scenes (e.g., replacing SVG icons with real images, creating backgrounds, illustrations).
argument-hint: "<description of what image to generate and where to place it>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch, Agent
---

# Generate Image for Video

You generate images for the Haifa University educational video using the **Google Nano Banana 2** model via the Replicate API.

## Context Gathering

Before generating any image, understand the context:

1. **Read the storyboard** to understand what the shot needs:
   ```
   D:/DEV/haifa_univ_1/docs/תסריט remotion.md
   ```

2. **Read the narration text** (Whisper output) to understand what's being said:
   ```
   D:/DEV/haifa_univ_1/full_narration.json
   ```

3. **Read the shot component** (`src/scenes/Shot{S}_{N}.tsx`) to see the current visual implementation

4. **Read the timing** (`src/timing.ts`) to know how long the shot lasts

Based on all this context, determine:
- What the image should depict
- The appropriate aspect ratio for where it will be placed
- Whether google_search or image_search would help (for real-world references)
- The optimal prompt in English

## API Configuration

- **Model**: `google/nano-banana-2`
- **Endpoint**: `https://api.replicate.com/v1/models/google/nano-banana-2/predictions`
- **API Token**: Read from `.env` file (`REPLICATE_API_TOKEN`)
- **Resolution**: Always `1K`

## Generating an Image

Use this exact bash command pattern:

```bash
# Read API token from .env
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN D:/DEV/haifa_univ_1/.env | cut -d'=' -f2)

# Create prediction with Prefer: wait for synchronous response
curl -s -X POST "https://api.replicate.com/v1/models/google/nano-banana-2/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "YOUR_PROMPT_HERE",
      "aspect_ratio": "RATIO_HERE",
      "resolution": "1K",
      "output_format": "png",
      "google_search": false,
      "image_search": false
    }
  }'
```

If the response status is not "succeeded" (still "processing"), poll the result:
```bash
curl -s "https://api.replicate.com/v1/predictions/PREDICTION_ID" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN"
```

## Download the Image

Once you have the output URL from the prediction response, download it:
```bash
curl -s -o "D:/DEV/haifa_univ_1/remotion-video/public/images/FILENAME.png" "OUTPUT_URL"
```

## Aspect Ratio Selection

Choose the aspect ratio based on where the image goes in the video (1920x1080):

| Use Case | Aspect Ratio | Notes |
|----------|-------------|-------|
| Full background | `16:9` | Fills the entire frame |
| Half screen (split) | `9:16` or `3:4` | For split-screen layouts |
| Icon/element replacement | `1:1` | Square element in the scene |
| Tall element (character) | `3:4` or `2:3` | Portrait orientation |
| Wide banner/strip | `21:9` or `4:1` | Horizontal strips |
| Card/frame in scene | `4:3` or `3:2` | Standard frame proportions |

## Prompt Engineering Guidelines

- Write prompts in **English** (the model works best in English)
- Be specific about style: "flat illustration", "photorealistic", "minimal vector style", "educational diagram"
- Match the video's dark theme: specify "dark background (#0a0e1a)" when the image should blend with the video background
- For educational content, prefer clean, clear, professional imagery
- Include lighting/mood: "soft lighting", "dramatic lighting", "clean studio lighting"
- For icons/elements: "isolated on transparent background" or "on dark background"
- Use `google_search: true` when the image needs real-world accuracy (e.g., "Newton's apple", "university campus")
- Use `image_search: true` when you want the model to reference existing visual styles

## Placing the Image in the Video

After downloading the image to `public/images/`:

1. **Reference it in the shot component** using Remotion's `staticFile()`:
   ```tsx
   import { Img, staticFile } from "remotion";

   <Img
     src={staticFile("images/FILENAME.png")}
     style={{
       position: "absolute",
       width: 400,  // adjust to fit
       height: "auto",
       // ... positioning
     }}
   />
   ```

2. **Animate the image** using the standard animation patterns:
   ```tsx
   const imageScale = spring({
     frame: frame - entryDelay,
     fps,
     config: { damping: 16, stiffness: 90, mass: 0.8 },
   });

   <Img
     src={staticFile("images/FILENAME.png")}
     style={{
       transform: `scale(${imageScale})`,
       opacity: interpolate(frame, [entryDelay, entryDelay + 10], [0, 1], {
         extrapolateLeft: "clamp",
         extrapolateRight: "clamp",
       }),
     }}
   />
   ```

## Step-by-Step Process

1. **Understand the request**: What image is needed and where does it go?
2. **Gather context**: Read the storyboard, shot file, and narration timing
3. **Decide parameters**: aspect ratio, prompt, google_search/image_search
4. **Generate the image**: Call the Replicate API
5. **Download**: Save to `remotion-video/public/images/` with a descriptive filename
6. **Integrate**: Update the shot component to use the new image
7. **Verify**: Confirm the image file exists and the component compiles (`npx tsc --noEmit`)

## Naming Convention

Save images as: `shot{S}_{N}_{description}.png`
Examples:
- `shot7_5_newton_apple.png`
- `shot2_1_digital_brain.png`
- `shot8_1_summary_bg.png`

## Important Notes

- Always use `resolution: "1K"` — never change this
- Always use `output_format: "png"` for transparency support
- The video background is dark (#0a0e1a to #111827) — generate images that work on dark backgrounds
- Do NOT render the video to MP4 — user previews in Remotion Studio
- If the API returns an error, show the error to the user and suggest adjustments
