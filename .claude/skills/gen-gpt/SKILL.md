---
name: gen-gpt
description: Generate images using OpenAI GPT Image 1.5 via Replicate API. Alternative to /generate-image with stronger instruction following. Use when the user asks to create images with GPT or when better prompt adherence is needed. Supports reference images for editing/style transfer.
argument-hint: "<description of what image to generate and where to place it>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch, Agent
---

# Generate Image with GPT Image 1.5

You generate images for the Haifa University educational video using **OpenAI GPT Image 1.5** via the Replicate API.

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
- The appropriate aspect ratio
- Whether reference images are needed (and set input_fidelity accordingly)
- The optimal prompt in English

## API Configuration

- **Model**: `openai/gpt-image-1.5`
- **Endpoint**: `https://api.replicate.com/v1/models/openai/gpt-image-1.5/predictions`
- **API Token**: Read from `.env` file (`REPLICATE_API_TOKEN`)
- **Defaults**: `quality: "low"`, `moderation: "low"`, `input_fidelity: "low"` (unless reference images → `"high"`)

## Input Parameters Reference

| Parameter | Type | Values | Default | Notes |
|-----------|------|--------|---------|-------|
| `prompt` | string | — | required | Text description of desired image |
| `aspect_ratio` | enum | `1:1`, `3:2`, `2:3` | `1:1` | Only 3 options available |
| `quality` | enum | `low`, `medium`, `high`, `auto` | Always use `low` | Per user preference |
| `input_fidelity` | enum | `low`, `high` | `low` | Use `high` ONLY when input_images are provided |
| `moderation` | enum | `auto`, `low` | Always use `low` | Per user preference |
| `background` | enum | `auto`, `transparent`, `opaque` | `auto` | See background guidelines below |
| `output_format` | enum | `png`, `jpeg`, `webp` | Always use `png` | For transparency support |
| `input_images` | array[uri] | URLs | null | Reference images for editing/style transfer |
| `number_of_images` | int | 1-10 | `1` | Usually 1 |
| `output_compression` | int | 0-100 | `90` | Keep default |

## Background: Transparent vs Opaque

Use your judgement to decide when the object should be isolated with a transparent background:

**Use `"transparent"` when:**
- The image is a single object/element that will be placed ON TOP of the video's dark gradient background (e.g., an apple, a lightbulb, a character, a brain icon)
- The image replaces an SVG icon or illustration element in a scene
- The image needs to float/animate freely over other content
- Multiple images will be layered together in the same shot

**Use `"opaque"` when:**
- The image IS the background or fills a large area (e.g., a full scene background, a framed illustration)
- The image represents a complete scene with its own environment (e.g., a lab, a landscape)
- The image goes inside a bordered frame/card in the layout

**Use `"auto"` when:**
- You're unsure — the model will decide based on the prompt content

## Generating an Image (No Reference)

```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN D:/DEV/haifa_univ_1/.env | cut -d'=' -f2)

curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-1.5/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "YOUR_PROMPT_HERE",
      "aspect_ratio": "RATIO_HERE",
      "quality": "low",
      "moderation": "low",
      "input_fidelity": "low",
      "output_format": "png",
      "background": "auto"
    }
  }'
```

## Generating with Reference Images

When the user provides reference images or wants to edit an existing image, set `input_fidelity` to `"high"`:

```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN D:/DEV/haifa_univ_1/.env | cut -d'=' -f2)

curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-1.5/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "prompt": "YOUR_PROMPT_HERE",
      "aspect_ratio": "RATIO_HERE",
      "quality": "low",
      "moderation": "low",
      "input_fidelity": "high",
      "output_format": "png",
      "background": "auto",
      "input_images": ["https://example.com/reference1.png", "https://example.com/reference2.png"]
    }
  }'
```

To use a local file as reference, first upload it or use a file:// URI if supported. Alternatively, serve it temporarily or use a public URL.

## Polling (if not immediately ready)

If the response status is "processing", poll with:
```bash
curl -s "https://api.replicate.com/v1/predictions/PREDICTION_ID" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN"
```

## Download the Image

The output is an **array of URIs**. Download the first one:
```bash
curl -s -o "D:/DEV/haifa_univ_1/remotion-video/public/images/FILENAME.png" "OUTPUT_URL"
```

## Aspect Ratio Selection

GPT Image 1.5 only supports 3 aspect ratios:

| Use Case | Aspect Ratio | Notes |
|----------|-------------|-------|
| Full video background (1920x1080) | `3:2` | Closest to 16:9 — crop/letterbox as needed |
| Square element / icon | `1:1` | Icons, avatars, badges |
| Portrait / tall element | `2:3` | Characters, vertical panels |

For the video (16:9), use `3:2` and crop in the component if needed.

## Placing the Image in the Video

After downloading the image to `public/images/`:

1. **Reference it in the shot component** using Remotion's `staticFile()`:
   ```tsx
   import { Img, staticFile } from "remotion";

   <Img
     src={staticFile("images/FILENAME.png")}
     style={{
       position: "absolute",
       width: 400,
       height: "auto",
     }}
   />
   ```

2. **Animate the image** with standard patterns:
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
3. **Check for reference images**: Does the user provide images? → `input_fidelity: "high"`
4. **Decide parameters**: aspect ratio (1:1, 3:2, or 2:3), background (transparent for overlays)
5. **Generate the image**: Call the Replicate API
6. **Download**: Save to `remotion-video/public/images/` with a descriptive filename
7. **Integrate**: Update the shot component to use the new image
8. **Verify**: Confirm the image file exists and the component compiles (`npx tsc --noEmit`)

## Naming Convention

Save images as: `shot{S}_{N}_{description}.png`
Examples:
- `shot7_5_newton_apple.png`
- `shot2_1_digital_brain.png`
- `shot8_1_summary_bg.png`

## Important Notes

- Always use `quality: "low"` — per user preference for speed/cost
- Always use `moderation: "low"` — per user preference
- `input_fidelity: "low"` by default, `"high"` ONLY when reference images are attached
- Always use `output_format: "png"` for transparency support
- Only 3 aspect ratios available: `1:1`, `3:2`, `2:3` — choose the closest match
- The video background is dark (#0a0e1a to #111827) — generate images that work on dark backgrounds
- Do NOT render the video to MP4 — user previews in Remotion Studio
- Output is an **array** of URLs — use the first element `output[0]`
