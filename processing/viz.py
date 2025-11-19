import json
import numpy as np
import pandas as pd

# --- INPUT JSON ---
WORK_INPUT_PATH = "prisma/data/full-work-seed.json"
LETTERS_INPUT_PATH = "prisma/data/letters.json"
EMB_KEY = "embedding"

# --- SPLIT EMBEDDINGS + METADATA ---
embeddings = []
meta_records = []

# --- LOAD JSON ---
with open(WORK_INPUT_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)   # expects a list of objects

    for work in data:
      if "sections" in work:
        for section in work["sections"]:
          if "metadata" in section:
            embeddings.append(section["metadata"]["vector_small"])
            meta_records.append({
              "summary" : section["metadata"]["summary"],
              "themes" : section["metadata"]["themes"],
              "keywords" : section["metadata"]["keywords"]
            })

with open(LETTERS_INPUT_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)   # expects a list of objects

    for letter in data:
      embeddings.append(letter["metadata"]["vector_small"])
      meta_records.append({
        "summary" : letter["metadata"]["summary"],
        "themes" : letter["metadata"]["themes"],
        "keywords" : letter["metadata"]["keywords"]
      })

embeddings = np.array(embeddings, dtype="float32")
meta = pd.DataFrame(meta_records)

# --- SAVE CLEAN FILES ---
np.save("erasmus_embeddings.npy", embeddings)
meta.to_parquet("erasmus_metadata.parquet", index=False)

print("Saved:")
print(" - erasmus_embeddings.npy")
print(" - erasmus_metadata.parquet")
