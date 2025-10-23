#!/bin/bash
set -e

# Create pgvector extension if not exists
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS vector;
EOSQL

echo "✅ pgvector extension created"