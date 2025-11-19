#!/bin/bash
# Resize PNGs to uploadable size

find works/titles/images/paged -type f -name "*.png" | while read png; do
  name=$(basename "$(dirname "$png")")        # folder name, e.g. "adagia"
  outdir="works/titles/images/upload/$name"    # output folder
  mkdir -p "$outdir"                          # ensure folder exists
  echo "Processing $png → $outdir"
  mogrify -path "$outdir" -format jpg -resize 1000x1000\> -quality 85 "$png"
done