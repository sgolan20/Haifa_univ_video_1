---
name: remove-bg-recraft
description: Remove background from images using the Recraft AI background removal model via Replicate API. Use when the user sends an image and asks to remove its background, make it transparent, or isolate an object from its background.
argument-hint: "<path to image or description of which image to process>"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Remove Background with Recraft AI

You remove backgrounds from images using **Recraft AI Remove Background** model via the Replicate API.

## How It Works

The user sends an image (or specifies a path to one) and asks you to remove the background. You process it through the Recraft model and save the result as a transparent PNG.

## API Configuration

- **Model**: `recraft-ai/recraft-remove-background`
- **Endpoint**: `https://api.replicate.com/v1/models/recraft-ai/recraft-remove-background/predictions`
- **API Token**: Read from `.env` file (`REPLICATE_API_TOKEN`)
- **Output**: PNG with transparent background

## Step-by-Step Process

### 1. Identify the Input Image

The user will either:
- **Send an image directly** in the chat (it will be saved as a temp file, e.g., `C:\Users\Admin\Downloads\something.png`)
- **Specify a path** to an existing image in the project (e.g., `public/images/logo.png`)
- **Describe which image** to process (find it with Glob/Grep)

### 2. Upload the Local File to Replicate

Since the API requires a URL, upload the local file first:

```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN D:/DEV/haifa_univ_1/.env | cut -d'=' -f2)

curl -s -X POST "https://api.replicate.com/v1/files" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -F "content=@PATH_TO_IMAGE"
```

This returns a JSON response with an `id`. Use the file URL:
```
https://api.replicate.com/v1/files/{FILE_ID}
```

**Note**: If the image is already hosted at a URL (e.g., a Replicate delivery URL), skip the upload step and use the URL directly.

### 3. Run Background Removal

```bash
export REPLICATE_API_TOKEN=$(grep REPLICATE_API_TOKEN D:/DEV/haifa_univ_1/.env | cut -d'=' -f2)

curl -s -X POST "https://api.replicate.com/v1/models/recraft-ai/recraft-remove-background/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d '{
    "input": {
      "image": "IMAGE_URL_HERE"
    }
  }'
```

The response will contain an `output` field with the URL of the processed image.

### 4. Download the Result

```bash
curl -s -o "OUTPUT_PATH.png" "OUTPUT_URL"
```

### 5. Save Location

- If the user specifies where to save, use that path
- If processing an existing project image, **replace it in place** (same filename)
- Default location: `D:/DEV/haifa_univ_1/remotion-video/public/images/`
- Always save as `.png` to preserve transparency

### 6. Verify

Show the user the result by reading the saved image file so they can visually confirm the background was removed.

## Handling Multiple Images

If the user asks to remove backgrounds from multiple images, process them all in parallel (multiple curl calls at once) for speed.

## Important Notes

- The model is fast (~2-4 seconds per image)
- Output is always PNG with transparent background
- Works well with logos, icons, objects, people, and illustrations
- For local files, always upload to Replicate files API first to get a URL
- The `.env` file with `REPLICATE_API_TOKEN` is at `D:/DEV/haifa_univ_1/.env`
