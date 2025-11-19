#!/bin/bash
# Convert PDFs in nested folders into PNGs, creating output folders automatically

find letters/volumes/pdfs -type f -name "*.pdf" | while read pdf; do
  name=$(basename "$(dirname "$pdf")")        # folder name, e.g. "adagia"
  outdir="letters/volumes/images/paged/$name"    # output folder
  mkdir -p "$outdir"                          # ensure folder exists
  echo "Processing $pdf → $outdir"
  pdftoppm -png -r 300 -gray "$pdf" "$outdir/page"
done