import json
from pathlib import Path
import re
import argparse

# volumes = [
#     # "2", 
#     "3", 
#     # "4", "5", "6", "7", "8", "9", "10", "11"
# ]

parser = argparse.ArgumentParser()
parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
args = parser.parse_args()
volume = args.volume

# ===== CONFIGURATION =====
# for volume in volumes:
letter_metadata = Path(f"letters/volumes/processed/metadata-llm/{volume}")
letter_raw_text = Path(f"letters/volumes/processed/letters/{volume}")
output_dir = Path(f"letters/volumes/processed/commentary/{volume}")
output_dir.mkdir(exist_ok=True)

for json_file in sorted(letter_metadata.glob("*.json")):

    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    latin_title = data.get("letter_title_latin", "")
    file_reference = json_file.stem.replace('-metadata', '')

    raw_text = Path(letter_raw_text / f"{file_reference}.txt").read_text(encoding="utf-8")

    if file_reference == "letter-2152":

        commentary = ""

        if latin_title is not None:
            if " " in latin_title:
                split_title = latin_title.split(" ")
                split_text = raw_text.split(split_title[0])
                if "[" in split_text[0]:
                    commentary = split_text[0]
                if "]" in split_text[0]:
                    commentary = split_text[0]
        

        fn = Path(output_dir / f"{file_reference}-commentary.txt")
        fn.write_text(commentary, encoding="utf-8")

