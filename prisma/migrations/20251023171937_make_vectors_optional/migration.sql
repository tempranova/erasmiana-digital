-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "vector_small" DROP NOT NULL,
ALTER COLUMN "vector_large" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Keywords" ALTER COLUMN "vector_small" DROP NOT NULL,
ALTER COLUMN "vector_large" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Summary" ALTER COLUMN "vector_small" DROP NOT NULL,
ALTER COLUMN "vector_large" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Themes" ALTER COLUMN "vector_small" DROP NOT NULL,
ALTER COLUMN "vector_large" DROP NOT NULL;
