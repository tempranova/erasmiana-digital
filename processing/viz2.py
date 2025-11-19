import numpy as np
import pandas as pd
import umap

# --- LOAD CLEAN FILES ---
embeddings = np.load("erasmus_embeddings.npy")
meta = pd.read_parquet("erasmus_metadata.parquet")

# --- RUN UMAP ---
reducer = umap.UMAP(
    n_neighbors=15,
    min_dist=0.1,
    metric="cosine"
)

coords = reducer.fit_transform(embeddings)   # shape (N, 2)

# --- ADD COORDS TO METADATA ---
meta["x"] = coords[:, 0]
meta["y"] = coords[:, 1]

# --- EXPORT FOR WEBSITE ---
meta.to_json("points.json", orient="records")

print("Saved points.json")