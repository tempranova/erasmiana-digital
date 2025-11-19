import os, json
from openai import OpenAI
from pathlib import Path
import argparse

volumes = [
# "4", "5", "6", 
# "7", "8", 
# "9", "10", "11"
"9"
]

# parser = argparse.ArgumentParser()
# parser.add_argument("--volume", type=int, required=True, help="Volume number to process")
# args = parser.parse_args()

client = OpenAI(
    api_key="sk-8b1d6cab30fa4fd3a5f485c6c85e7358",
    base_url="https://api.deepseek.com/v1"
)

for volume in volumes:
  # Path to your OCR text files
  input_dir = Path(f"letters/volumes/processed/letters/{volume}")
  out_dir = Path(f"letters/volumes/processed/metadata-llm/{volume}")

  for txt_file in sorted(input_dir.glob("*.txt")):

    if txt_file.name == "letter-2364.txt":
      # We'll just test one file for now
      text = txt_file.read_text(encoding="utf-8")

      prompt = f"""
      You are a text-analysis model working on Allen’s edition of Erasmus’ letters.

      Given this single letter, extract the following structured information.
      Return JSON with: letter_number, title, date, place, letter_from, letter_to, letter_title_latin, summary (english), themes (array of strings), keywords (array of strings). 
      In letter_from, give only the name of the sender. In letter_to, only the name of the recipient.
      For summary, give a 2 sentence overview of the content of the letter.
      For themes, extract some themes as to content, such as tone, concepts, or useful categories
      For keywords, pull out key names, special words, or places.

      ```text
      {text}
      """

      print(f"Processing {txt_file.name} ...")
      response = client.chat.completions.create(
        model="deepseek-coder",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
      )

      data = response.choices[0].message.content

      fn = Path(out_dir / f"{txt_file.stem}-metadata.json")
      fn.write_text(data, encoding="utf-8")
