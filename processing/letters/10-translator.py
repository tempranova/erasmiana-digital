import os, json
from openai import OpenAI
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

client = OpenAI(
    api_key="sk-8b1d6cab30fa4fd3a5f485c6c85e7358",
    base_url="https://api.deepseek.com/v1"
)

# for volume in volumes:
input_dir = Path(f"letters/volumes/processed/letters-llm/{volume}")
out_dir = Path(f"letters/volumes/processed/translations/{volume}")
out_dir.mkdir(parents=True, exist_ok=True)

for txt_file in sorted(input_dir.glob("*.txt")):

    text = txt_file.read_text(encoding="utf-8")

    # txt_file = (input_dir / f"letter-61-text.txt")
    # text = txt_file.read_text(encoding="utf-8")

    if txt_file.name == "letter-2364-text.txt":

        if len(text) <= 13_000:
            if text:
                messages = [
                    {
                        "role": "system",
                        "content": (
                            "You are a translator working on Allen’s edition of Erasmus’ letters.\n"
                            "Your goal is to create a faithful English translation of Erasmus's latin letters."
                        ),
                    },
                    {
                        "role": "user",
                        "content": (
                            "Given this single letter, provide a translation that maintains tone, style, and content. Do not add bolding for headers."
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

                fn = Path(out_dir / f"{txt_file.stem}-translation.txt")
                fn.write_text(full_text, encoding="utf-8")
        else:
            # Find middle of text
            mid = len(text) // 2

            # Find paragraph boundary near the middle
            pattern = re.compile(r'\.\s*\n[A-Z]', re.MULTILINE)

            # Look *forward* from the midpoint
            match_forward = pattern.search(text, mid)
            # Look *backward* from the midpoint
            match_backward = None
            for m in pattern.finditer(text[:mid]):
                match_backward = m

            # Pick the closer boundary to the middle
            if match_forward and match_backward:
                split_index = (
                    match_forward.start()
                    if (match_forward.start() - mid) < (mid - match_backward.start())
                    else match_backward.start()
                )
            elif match_forward:
                split_index = match_forward.start()
            elif match_backward:
                split_index = match_backward.start()
            else:
                split_index = mid  # fallback: no good spot found

            # Split text into two parts
            part1 = text[:split_index].strip()
            part2 = text[split_index:].strip()

            messages = [
                {
                    "role": "system",
                    "content": (
                        "You are a translator working on Allen’s edition of Erasmus’ letters.\n"
                        "Your goal is to create a faithful English translation of Erasmus's latin letters."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        "Given this single letter, provide a translation that maintains tone, style, and content. Do not add bolding for headers."
                        f"```text\n{part1}\n```"
                    ),
                },
            ]

            print(f"Processing {txt_file.name} part 1 ...")

            response = client.chat.completions.create(
                model="deepseek-coder",
                messages=messages,
            )

            part_1_text = response.choices[0].message.content.strip()

            messages.append({"role": "assistant", "content": part_1_text})
            messages.append({
                "role": "user",
                "content": (
                    "This letter has two parts. You have translated the first."
                    "Please provide a translation of this text given below that maintains tone and style."
                    f"```text\n{part2}\n```"
                ),
            })

            response = client.chat.completions.create(
                model="deepseek-coder",
                messages=messages,
            )

            part_2_text = response.choices[0].message.content.strip()

            full_text = part_1_text + '\n' + part_2_text

            fn = Path(out_dir / f"{txt_file.stem}-translation.txt")
            fn.write_text(full_text, encoding="utf-8")
