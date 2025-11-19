from pathlib import Path
import argparse

volumes = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]

# parser = argparse.ArgumentParser()
# parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
# args = parser.parse_args()

for volume in volumes:
    pages = sorted(Path(f"letters/volumes/processed/text-ocr/{volume}").glob("*.txt"))
    chunks = [pages[i:i+30] for i in range(0, len(pages), 30)]

    whole_text = "\n\n"

    for i, group in enumerate(chunks):
        text = "\n\n".join(p.read_text(encoding="utf-8") for p in group)
        whole_text = whole_text + text

    Path(f"letters/volumes/processed/text-whole/{volume}/whole-text.txt").write_text(whole_text, encoding="utf-8")