---
name: gen-gpt
description: Generate images using OpenAI GPT Image 2 via Replicate API. Alternative to /generate-image with stronger instruction following. Use when the user asks to create images with GPT or when better prompt adherence is needed. Supports reference images for editing/style transfer.
argument-hint: "<description of what image to generate and where to place it>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, WebFetch, Agent
---

# Generate Image with GPT Image 2

You generate images for the Haifa University educational video using **OpenAI GPT Image 2** via the Replicate API.

## Context Gathering

Before generating any image, understand the context:

1. **Read the storyboard** to understand what the shot needs (per video):
   ```
   /Users/sgolan20/DEV/Haifa_univ_video_1/docs/תסריט remotion.md            # Video 1
   /Users/sgolan20/DEV/Haifa_univ_video_1/docs/תסריט remotion video2a.md    # Video 2A
   /Users/sgolan20/DEV/Haifa_univ_video_1/docs/תסריט remotion video2b.md    # Video 2B
   ```

2. **Read the narration text** (Whisper output) to understand what's being said:
   ```
   /Users/sgolan20/DEV/Haifa_univ_video_1/full_narration.json
   ```

3. **Read the shot component** (`src/{video}/scenes/Shot{S}_{N}.tsx`) to see the current visual implementation

4. **Read the timing** (`src/{video}/timing.ts`) to know how long the shot lasts

Based on all this context, determine:
- What the image should depict
- The appropriate aspect ratio (match it to the request and the need)
- Whether reference images are needed (and set input_fidelity accordingly)
- The optimal prompt in English

## API Configuration

- **Model**: `openai/gpt-image-2`
- **Endpoint**: `https://api.replicate.com/v1/models/openai/gpt-image-2/predictions`
- **API Token**: Read from the project `.env` file (`REPLICATE_API_TOKEN`) at `/Users/sgolan20/DEV/Haifa_univ_video_1/.env`
- **Required defaults (per user preference)**: `quality: "low"`, `moderation: "low"`, `output_format: "png"`, `number_of_images: 1` (one image per request), `input_fidelity: "low"` (unless reference images → `"high"`)

## Input Parameters Reference

| Parameter | Type | Values | Default | Notes |
|-----------|------|--------|---------|-------|
| `prompt` | string | — | required | Text description of desired image |
| `aspect_ratio` | enum | `1:1`, `3:2`, `2:3` | `1:1` | Choose based on the request and need |
| `quality` | enum | `low`, `medium`, `high`, `auto` | Always use `low` | Per user preference |
| `input_fidelity` | enum | `low`, `high` | `low` | Use `high` ONLY when input_images are provided |
| `moderation` | enum | `auto`, `low` | Always use `low` | Per user preference |
| `background` | enum | `auto`, `opaque` | `auto` | ⚠️ `transparent` is NOT supported by gpt-image-2 — see below |
| `output_format` | enum | `png`, `jpeg`, `webp` | Always use `png` | — |
| `input_images` | array[uri] | URLs | null | Reference images for editing/style transfer |
| `number_of_images` | int | 1-10 | Always use `1` | One image per request, per user preference |
| `output_compression` | int | 0-100 | `90` | Keep default |

## Background

⚠️ **`gpt-image-2` does NOT support `background: "transparent"`.** Sending `"transparent"` makes the prediction fail with:
`"Transparent background is not supported for this model." (image_generation_user_error, param: background)`.
Only `"auto"` and `"opaque"` are valid. (This differs from gpt-image-1.5, which did support transparent.)

**Use `"auto"` (default)** for almost everything — the model decides based on the prompt.

**Use `"opaque"`** to force a fully filled, solid-background image (e.g., a full scene background, a framed illustration).

**Need a cut-out / isolated element on a transparent background?** Since the model can't produce transparency directly:
1. Generate the element prompted on a **flat dark navy background (#0a0e1a)** that matches the video, so it blends into the scene, OR
2. Generate it on a flat solid background and then run the **`remove-bg-recraft`** skill to strip the background and get a transparent PNG.

## Generating an Image (No Reference)

```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN /Users/sgolan20/DEV/Haifa_univ_video_1/.env | cut -d'=' -f2 | tr -d '"' | tr -d ' ')

curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-2/predictions" \
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
      "number_of_images": 1,
      "background": "auto"
    }
  }'
```

## Generating with Reference Images

When the user provides reference images or wants to edit an existing image, set `input_fidelity` to `"high"`:

```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN /Users/sgolan20/DEV/Haifa_univ_video_1/.env | cut -d'=' -f2 | tr -d '"' | tr -d ' ')

curl -s -X POST "https://api.replicate.com/v1/models/openai/gpt-image-2/predictions" \
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
      "number_of_images": 1,
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
curl -s -o "/Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video/public/images/FILENAME.png" "OUTPUT_URL"
```

For per-video assets, save under the matching folder instead, e.g. `remotion-video/public/video2a/images/` or `remotion-video/public/video2b/images/`.

## Aspect Ratio Selection

GPT Image 2 supports 3 aspect ratios:

| Use Case | Aspect Ratio | Notes |
|----------|-------------|-------|
| Full video background (1920x1080) | `3:2` | Closest to 16:9 — crop/letterbox as needed |
| Square element / icon | `1:1` | Icons, avatars, badges |
| Portrait / tall element | `2:3` | Characters, vertical panels |

For the video (16:9), use `3:2` and crop in the component if needed. Always pick the ratio that best fits the specific request and need.

## Placing the Image in the Video

After downloading the image to `public/images/` (or the per-video folder):

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
4. **Decide parameters**: aspect ratio (1:1, 3:2, or 2:3) per the need, background `auto`/`opaque` (transparent is NOT supported — use remove-bg-recraft afterward if a cut-out is needed)
5. **Generate the image**: Call the Replicate API (one PNG image per request)
6. **Download**: Save to `remotion-video/public/images/` (or per-video folder) with a descriptive filename
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
- Always generate **one image per request** (`number_of_images: 1`)
- Always use `output_format: "png"`
- ⚠️ `background: "transparent"` is NOT supported — only `auto`/`opaque`. For a transparent cut-out, generate on a dark/solid background then run `remove-bg-recraft`
- `input_fidelity: "low"` by default, `"high"` ONLY when reference images are attached
- Choose the aspect ratio (`1:1`, `3:2`, `2:3`) according to the request and the need
- The video background is dark (#0a0e1a to #111827) — generate images that work on dark backgrounds
- Do NOT render the video to MP4 — user previews in Remotion Studio
- Output is an **array** of URLs — use the first element `output[0]`
