# ElevenLabs API reference — narration-pipeline

Official docs: https://elevenlabs.io/docs/api-reference/introduction

## Auth & env

- API key in project `.env` as `ELEVENLABS_API_KEY`.
- Header on every request: `xi-api-key: <key>`.

## Text-to-Speech

`POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=mp3_44100_128`

Body (JSON):
```json
{
  "text": "...",
  "model_id": "eleven_v3",
  "voice_settings": { "stability": 0.5, "similarity_boost": 0.75 }
}
```

- **Voice (project standard):** Sarah — `EXAVITQu4vr4xnSDxMaL`.
- **Character limit:** `eleven_v3` truncates a single request above ~3000 chars. Keep segments ≤ ~2800 and split only on sentence/paragraph boundaries so the audio joins seamlessly.
- **Hebrew:** send the raw Hebrew text; no `language_code` needed for TTS. For correct pronunciation of homographs, add niqqud to the word in the source (e.g. `לְאַמֵּת` = *to verify*, vs `אֱמֶת` = *true*).
- **Quota:** a `401 quota_exceeded` means the account is out of credits — the user must top up; there is nothing to fix in code.
- Hebrew must go through a JSON body (the scripts use `json.dumps`), not inline-escaped curl, to avoid UTF-8 mangling.

## Speech-to-Text (Scribe) — word timestamps

`POST https://api.elevenlabs.io/v1/speech-to-text` (multipart/form-data)

Fields:
- `file=@<audio>.mp3`
- `model_id=scribe_v1`
- `language_code=heb`
- `timestamps_granularity=word`

Response JSON has `words[]`, each `{ text, start, end, type }` where `type` is `word` or `spacing`. Filter to `type == "word"`.

### Truncation gotcha
Scribe may stop transcribing a long file partway through (the last word ends well before the audio duration). Detect it by comparing the last word's `end` to the audio duration (`npx remotion ffmpeg -i <mp3>` → `Duration:`). If the gap is large, cut the tail (`-ss <seam>` with a few seconds of overlap), re-transcribe, offset the tail word times by the seam, and merge (drop head words at/after the seam). `build_srt.py` does this automatically in a loop.

## ffmpeg

No system ffmpeg/ffprobe on this machine — use Remotion's bundled build:
- Concat: `npx remotion ffmpeg -y -f concat -safe 0 -i list.txt -c copy out.mp3`
- Duration: `npx remotion ffmpeg -i file.mp3` (read `Duration:` from stderr)
