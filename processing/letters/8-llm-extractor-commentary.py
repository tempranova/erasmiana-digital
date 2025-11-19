import os, json
from openai import OpenAI
from pathlib import Path
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

client = OpenAI(
    api_key="sk-8b1d6cab30fa4fd3a5f485c6c85e7358",
    base_url="https://api.deepseek.com/v1"
)

# for volume in volumes:
# Path to your OCR text files
input_dir = Path(f"letters/volumes/processed/commentary/{volume}")
out_dir = Path(f"letters/volumes/processed/commentary-llm/{volume}")

max_loops = 8 

for txt_file in sorted(input_dir.glob("*.txt")):

    # txt_file = Path(input_dir / "letter-13-commentary.txt")

    full_text = ""

    text = txt_file.read_text(encoding="utf-8")

    if text:
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a text-analysis model working on Allen’s edition of Erasmus’ letters.\n"
                    "Your goal is to extract only the English-language notes from Allen about the letter (the letter is not included)."
                    "Ignore footnotes, titles, and page numbers."
                    "Typically, but not always, the notes from Allen are inside of square brackets."
                ),
            },
            {
                "role": "user",
                "content": (
                    "Given this single letter, extract the English commentary. "
                    "If there is no commentary present, return the string NO_COMMENTARY"
                    f"```text\n{text}\n```"
                ),
            },
        ]

        print(f"Processing {txt_file.name} ...")

        response = client.chat.completions.create(
            model="deepseek-coder",
            messages=messages,
        )

        full_text = response.choices[0].message.content.strip()

        if "NO_COMMENTARY" in full_text:
            print("No commentary")
        else:
            fn = Path(out_dir / f"{txt_file.stem}.txt")
            fn.write_text(full_text, encoding="utf-8")
