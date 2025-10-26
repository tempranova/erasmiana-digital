/*
  Warnings:

  - You are about to drop the column `date_text` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `geometry` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `placename` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `secondary_title` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Work` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Translation" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Work" DROP COLUMN "date_text",
DROP COLUMN "day",
DROP COLUMN "geometry",
DROP COLUMN "month",
DROP COLUMN "pages",
DROP COLUMN "placename",
DROP COLUMN "reference",
DROP COLUMN "season",
DROP COLUMN "secondary_title",
DROP COLUMN "year",
ADD COLUMN     "alt_title" TEXT;

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "reference" TEXT,
    "volume" TEXT,
    "pages" INTEGER[],
    "related_to" TEXT,
    "year" INTEGER,
    "season" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "date_text" TEXT,
    "placename" TEXT,
    "geometry" geometry(Point, 4326),
    "workId" INTEGER,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_workId_key" ON "Metadata"("workId");

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
