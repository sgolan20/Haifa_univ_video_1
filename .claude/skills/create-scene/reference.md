# create-scene reference — imagery APIs & lessons

All tokens from project `.env` at `/Users/sgolan20/DEV/Haifa_univ_video_1/.env` (`REPLICATE_API_TOKEN`).
There is **no system ffmpeg** — use `npx remotion ffmpeg` if you ever need it.

## Generate a background / element image — GPT Image 2 (`gen-gpt`)

`POST https://api.replicate.com/v1/models/openai/gpt-image-2/predictions` with header `Prefer: wait`.

```json
{ "input": {
  "prompt": "…",
  "aspect_ratio": "3:2" | "1:1" | "2:3",
  "quality": "low", "moderation": "low", "input_fidelity": "low",
  "output_format": "png", "number_of_images": 1,
  "background": "opaque" | "auto"
}}
```

- `quality:"low"`, `moderation:"low"`, `number_of_images:1`, `output_format:"png"` — always (user preference).
- `background:"transparent"` is NOT supported by gpt-image-2 → generate on flat navy then use `remove-bg-recraft`.
- Output is an **array** → use `output[0]`. If status is `processing`, poll `…/v1/predictions/{id}`.
- **Backgrounds**: `3:2`, `opaque`, atmospheric on `#0a0e1a`, with a dark empty center for text, "No text, no words, no letters."
- **Elements**: `1:1`, the glowing object centered on flat navy `#0a0e1a` so removal is clean.
- Save to `remotion-video/public/<video-id>/images/`. Naming: `<scene>_bg.png`, `<thing>.png`, `<thing>_nobg.png`.

## Remove background — Recraft (`remove-bg-recraft`)

Two steps. First upload the local PNG to get a URL:

```bash
curl -s -X POST "https://api.replicate.com/v1/files" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -F "content=@/abs/path/element.png"
# → use response .urls.get as the image URL
```

Then run removal (header `Prefer: wait`) and download `output`:

```bash
curl -s -X POST "https://api.replicate.com/v1/models/recraft-ai/recraft-remove-background/predictions" \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" -H "Content-Type: application/json" -H "Prefer: wait" \
  -d '{"input": {"image": "<uploaded-url>"}}'
```

Save as `<thing>_nobg.png`. Recraft keeps the glowing object + particles, drops the navy.

A Python helper that does upload→remove→download for several files in one go is handy — see the pattern used during `lesson2-lecture1` (it read the token from `.env`, posted multipart to `/v1/files`, then polled the prediction).

## Using images in a shot

```tsx
import { Img, staticFile } from "remotion";

// Living background with Ken Burns
<Img src={staticFile("<video-id>/images/<scene>_bg.png")}
  style={{ position:"absolute", width:"100%", height:"100%", objectFit:"cover",
    opacity: interpolate(frame,[0,40],[0,0.7],{extrapolateRight:"clamp"}),
    transform:`scale(${interpolate(frame,[0,DUR],[1.04,1.16])}) translateX(${interpolate(frame,[0,DUR],[-15,15])}px)` }} />

// Readability overlays (two AbsoluteFills): radial darken + top/bottom vertical gradient.

// Floating transparent element (NO mixBlendMode — it's already transparent)
<Img src={staticFile("<video-id>/images/<thing>_nobg.png")}
  style={{ width:180, height:180, objectFit:"contain",
    transform:`translateY(${Math.sin(frame*0.06)*7}px)`,
    filter:`drop-shadow(0 0 22px ${color}aa)` }} />
```

### mixBlendMode note
`mixBlendMode:"screen"` hides a navy square **only** over a pure-black full-bleed layer. Over the radial gradient or inside a glass card it stays visible → use `_nobg.png` instead. The faint full-bleed background element in `lesson2-lecture1/Shot3_1` is the one acceptable `screen`-style case (and even there `_nobg.png` at low opacity is cleaner).

### RTL arrows
In an RTL flow arrows point LEFT. `‹ › « »` are bidi-mirrored and flip — use `◀`/`◂` wrapped in `direction:"ltr"; unicodeBidi:"isolate"`.
