import json
from pathlib import Path
import re
import argparse

volumes = [
# "4", "5", "6", 
# "7", "8", 
"9", "10", "11"
]

# parser = argparse.ArgumentParser()
# parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
# args = parser.parse_args()

# ===== CONFIGURATION =====
for volume in volumes:
    ocr_text_path = Path(f"letters/volumes/processed/text-whole/{volume}/whole-text.txt")
    json_map_path = Path(f"letters/volumes/processed/titles/{volume}/letter-titles.json")
    output_dir = Path(f"letters/volumes/processed/letters/{volume}")
    output_dir.mkdir(exist_ok=True)

    # ===== LOAD INPUTS =====
    text = ocr_text_path.read_text(encoding="utf-8")
    letter_data = json.loads(json_map_path.read_text(encoding="utf-8"))

    # Support both top-level list or { "letters": [...] }
    letters = letter_data.get("letters", letter_data)

    positions = []
    for l in letters:
        title = l["letter_title"].strip()
        match = re.search(re.escape(title), text)
        if match:
            positions.append((match.start(), l))

    positions.sort(key=lambda x: x[0])


    for i, (start, letter) in enumerate(positions):
        end = positions[i + 1][0] if i + 1 < len(positions) else len(text)
        chunk = text[start:end].strip()
        fn = f"letter-{letter['letter_number']}.txt"
        (output_dir / fn).write_text(chunk, encoding="utf-8")
        print(f"Saved {fn} ({len(chunk)} chars)")
