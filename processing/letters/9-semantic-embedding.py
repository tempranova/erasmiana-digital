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

OPENAI_API_KEY = "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"
MODEL = "text-embedding-3-small"

client = OpenAI(api_key=OPENAI_API_KEY)

# for volume in volumes:
in_dir = Path(f"letters/volumes/processed/metadata-llm/{volume}")
out_dir = Path(f"letters/volumes/processed/semantic/{volume}")
out_dir.mkdir(parents=True, exist_ok=True)

for json_file in sorted(in_dir.glob("*.json")):
    print(f"Embedding {json_file.name} ...")

    if json_file.name == "letter-2364-metadata.json":

        with open(json_file, "r", encoding="utf-8") as f:
            data = json.load(f)

        summary = data.get("summary")
        themes = data.get("themes")
        keywords = data.get("keywords")

        # SUMMARY
        text_to_embed = f"Summary: {summary} Themes: {themes}."

        if not text_to_embed:
            print(f"⚠️ Skipping {json_file.name} — no text to embed.")
            continue

        response = client.embeddings.create(
            model=MODEL,
            input=text_to_embed
        )

        embedding = response.data[0].embedding  # List[float]

        summary_result = {
            "letter_number" : data.get("letter_number"),
            "summary" : summary,
            "themes" : themes,
            "keywords" : keywords,
            "vector_small" : embedding
        }

        # Write out new JSON
        out_path = Path(out_dir / f"{json_file.stem}-semantic.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(summary_result, f, ensure_ascii=False, indent=2)