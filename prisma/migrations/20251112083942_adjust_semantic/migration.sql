/*
  Warnings:

  - You are about to drop the column `bookId` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Summary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Themes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Commentary" DROP CONSTRAINT "Commentary_bookId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Keywords" DROP CONSTRAINT "Keywords_letterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Keywords" DROP CONSTRAINT "Keywords_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Publication" DROP CONSTRAINT "Publication_bookId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Section" DROP CONSTRAINT "Section_bookId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Source" DROP CONSTRAINT "Source_bookId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Summary" DROP CONSTRAINT "Summary_letterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Summary" DROP CONSTRAINT "Summary_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Themes" DROP CONSTRAINT "Themes_letterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Themes" DROP CONSTRAINT "Themes_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Translation" DROP CONSTRAINT "Translation_bookId_fkey";

-- AlterTable
ALTER TABLE "Commentary" DROP COLUMN "bookId",
ADD COLUMN     "workId" INTEGER;

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "bookId",
ADD COLUMN     "workId" INTEGER;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "bookId",
ADD COLUMN     "pages" INTEGER[],
ADD COLUMN     "workId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "bookId",
ADD COLUMN     "workId" INTEGER;

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "bookId",
ADD COLUMN     "workId" INTEGER;

-- DropTable
DROP TABLE "public"."Book";

-- DropTable
DROP TABLE "public"."Keywords";

-- DropTable
DROP TABLE "public"."Summary";

-- DropTable
DROP TABLE "public"."Themes";

-- CreateTable
CREATE TABLE "Metadata" (
    "id" SERIAL NOT NULL,
    "summary" TEXT NOT NULL,
    "keywords" TEXT[],
    "themes" TEXT[],
    "vector_small" vector(1536),
    "vector_large" vector(3072),
    "sectionId" INTEGER,
    "letterId" INTEGER,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "alt_title" TEXT,
    "blurb" TEXT,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "placename" TEXT,
    "geometry" geometry(Point, 4326),

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_sectionId_key" ON "Metadata"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_letterId_key" ON "Metadata"("letterId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metadata" ADD CONSTRAINT "Metadata_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
