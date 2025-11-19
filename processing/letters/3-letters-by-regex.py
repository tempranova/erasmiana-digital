import re, json
from pathlib import Path
import argparse

volumes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

# parser = argparse.ArgumentParser()
# parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
# args = parser.parse_args()

for volume in volumes:
    input_dir = Path(f"letters/volumes/processed/text-ocr/{volume}")
    output_merged = Path(f"letters/volumes/processed/titles/{volume}/letter-titles.json")

    pattern = re.compile(r'^\s*(\d+)[ \t]*\.?[ \t]+(to|from)\b.*', re.IGNORECASE | re.MULTILINE)
    all_letters = []

    for txt_file in sorted(input_dir.glob("*.txt")):
        text = txt_file.read_text(encoding="utf-8")
        results = []
        for m in pattern.finditer(text):
            num = m.group(1)
            title = m.group(0).strip()
            results.append({"page_number" : txt_file.stem, "letter_number": num, "letter_title": title})

        if results:
            per_file = {"file": txt_file.name, "letters": results}
            all_letters.extend(results)

    # ===== MERGE =====
    merged = {"letters": all_letters}
    output_merged.write_text(json.dumps(merged, indent=2, ensure_ascii=False), encoding="utf-8")