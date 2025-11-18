-- This is an empty migration.
CREATE EXTENSION IF NOT EXISTS vector;

CREATE INDEX idx_entry_vector_small_hnsw
ON "Metadata"
USING hnsw (vector_small vector_cosine_ops)
WITH (m = 16, ef_construction = 64);