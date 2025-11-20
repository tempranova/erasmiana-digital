import os, json
from openai import OpenAI
from pathlib import Path
import argparse

# volumes = [
# # "4", "5", "6", 
# "7", 
# "8", 
# # "9", "10", "11"
# ]

parser = argparse.ArgumentParser()
parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
args = parser.parse_args()
# volume = args.volume
volume = "9"

client = OpenAI(
    api_key="<deepseek key>",
    base_url="https://api.deepseek.com/v1"
)

# for volume in volumes:
# Path to your OCR text files
input_dir = Path(f"letters/volumes/processed/letters/{volume}")
out_dir = Path(f"letters/volumes/processed/letters-llm/{volume}")

max_loops = 8 

for txt_file in sorted(input_dir.glob("*.txt")):

    if txt_file.name == "letter-2364.txt":

        full_text = ""
        iteration = 1

        text = txt_file.read_text(encoding="utf-8")
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a text-analysis model working on Allen’s edition of Erasmus’ letters.\n"
                    "Your goal is to extract only the Latin correspondence from OCR text, ignoring commentary, "
                    "footnotes, and numbering. Preserve line breaks."
                ),
            },
            {
                "role": "user",
                "content": (
                    "Given this single letter, extract the Latin text of the letter. "
                    "When you have finished, write a new line: END_OF_LETTER.\n\n"
                    f"```text\n{text}\n```"
                ),
            },
        ]

        print(f"Processing {txt_file.name} ...")
        while True:


            response = client.chat.completions.create(
                model="deepseek-coder",
                messages=messages,
            )

            chunk = response.choices[0].message.content.strip()
            full_text += "\n" + chunk
            tail = full_text[-300:]

            if "END_OF_LETTER" in chunk:
                break

            iteration += 1
            
            if iteration > max_loops:
                print("⚠️ Hit loop limit; possible infinite continuation.")
                break
            
            messages.append({"role": "assistant", "content": chunk})
            messages.append({
                "role": "user",
                "content": (
                    "You stopped before writing END_OF_LETTER. "
                    "Please continue outputting the letter from exactly where you left off. "
                    "Do not repeat any text that appeared in the snippet below."
                    "When you have finished, write a new line: END_OF_LETTER.\n\n"
                    "The last 300 characters you wrote were:"
                    f"```text\n{tail}\n```"
                ),
            })
            print(f"Appended continuation message")
            
        final_text = full_text.replace("END_OF_LETTER", "").strip()

        fn = Path(out_dir / f"{txt_file.stem}-text.txt")
        fn.write_text(final_text, encoding="utf-8")
