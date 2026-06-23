#!/bin/bash
# Length-matched splice of 7 pronunciation-fix clips into full_narration.mp3.
# Each replacement exactly matches its original region length → zero global shift, timing.ts unchanged.
set -eu
AUD=/Users/sgolan20/DEV/Haifa_univ_video_1/remotion-video/public/lesson6-lecture1/audio
ORIG=$AUD/full_narration.mp3
SR=44100
mk_sil () { ffmpeg -y -f lavfi -i "anullsrc=channel_layout=mono:sample_rate=$SR" -t "$1" -c:a libmp3lame -b:a 128k "$2" 2>/dev/null; }
enc () { ffmpeg -y -i "$1" -ac 1 -ar $SR -c:a libmp3lame -b:a 128k "$2" 2>/dev/null; }

# region: synth clip_start clip_end cut_start cut_end
REGIONS=(
 "fixA 2.50 10.18 3.24 11.67"
 "fixB 1.62 4.84 17.45 20.97"
 "fixC 1.66 15.64 74.72 88.78"
 "fixD 2.44 16.16 125.22 139.00"
 "fixE 2.28 15.60 157.13 170.55"
 "fixF 4.24 17.05 187.30 200.14"
 "fixG 3.46 17.12 222.90 236.62"
)

# build padded clips and collect cut points
parts=()        # ordered list of files to concat
prev_end=0
i=0
for r in "${REGIONS[@]}"; do
  set -- $r; synth=$1; cs=$2; ce=$3; ks=$4; ke=$5
  L=$(python3 -c "print(round($ke-$ks,3))")
  clen=$(python3 -c "print(round($ce-$cs,3))")
  pad=$(python3 -c "print(round($L-$clen,3))")
  if python3 -c "exit(0 if $pad>=0 else 1)"; then :; else echo "NEG PAD for $synth ($pad)"; exit 1; fi
  # original gap segment before this region
  seg=/tmp/seg_$i.mp3
  ffmpeg -y -i "$ORIG" -ss "$prev_end" -to "$ks" -ac 1 -ar $SR -c:a libmp3lame -b:a 128k "$seg" 2>/dev/null
  parts+=("$seg")
  # the corrected clip (speech) + trailing silence pad
  cl=/tmp/cl_$i.mp3
  ffmpeg -y -i /tmp/$synth.mp3 -ss "$cs" -to "$ce" -ac 1 -ar $SR -c:a libmp3lame -b:a 128k /tmp/clraw_$i.mp3 2>/dev/null
  if python3 -c "exit(0 if $pad>0.005 else 1)"; then
    mk_sil "$pad" /tmp/pad_$i.mp3
    ffmpeg -y -i /tmp/clraw_$i.mp3 -i /tmp/pad_$i.mp3 -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[o]" -map "[o]" -ac 1 -ar $SR -c:a libmp3lame -b:a 128k "$cl" 2>/dev/null
  else
    cp /tmp/clraw_$i.mp3 "$cl"
  fi
  parts+=("$cl")
  prev_end=$ke
  i=$((i+1))
done
# final tail
segT=/tmp/seg_tail.mp3
ffmpeg -y -i "$ORIG" -ss "$prev_end" -ac 1 -ar $SR -c:a libmp3lame -b:a 128k "$segT" 2>/dev/null
parts+=("$segT")

# concat all parts via filter_complex
inputs=(); filt=""; n=${#parts[@]}
for p in "${parts[@]}"; do inputs+=(-i "$p"); done
for ((j=0;j<n;j++)); do filt+="[$j:a]"; done
filt+="concat=n=$n:v=0:a=1[out]"
ffmpeg -y "${inputs[@]}" -filter_complex "$filt" -map "[out]" -ac 1 -ar $SR -c:a libmp3lame -b:a 192k /tmp/l6_fixed.mp3 2>/dev/null

echo "orig:  $(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$ORIG")"
echo "fixed: $(ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 /tmp/l6_fixed.mp3)"