/*
  Warnings:

  - You are about to drop the column `entryId` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Commentary` table. All the data in the column will be lost.
  - You are about to drop the column `entryId` on the `Keywords` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Keywords` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Publication` table. All the data in the column will be lost.
  - You are about to drop the column `book` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Summary` table. All the data in the column will be lost.
  - You are about to drop the column `entryId` on the `Themes` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Themes` table. All the data in the column will be lost.
  - You are about to drop the column `entryId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the `Entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sectionId]` on the table `Keywords` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[letterId]` on the table `Keywords` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sectionId]` on the table `Summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[letterId]` on the table `Summary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sectionId]` on the table `Themes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[letterId]` on the table `Themes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Commentary" DROP CONSTRAINT "Commentary_entryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Commentary" DROP CONSTRAINT "Commentary_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Entry" DROP CONSTRAINT "Entry_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Keywords" DROP CONSTRAINT "Keywords_entryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Keywords" DROP CONSTRAINT "Keywords_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Metadata" DROP CONSTRAINT "Metadata_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Publication" DROP CONSTRAINT "Publication_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Source" DROP CONSTRAINT "Source_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Summary" DROP CONSTRAINT "Summary_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Themes" DROP CONSTRAINT "Themes_entryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Themes" DROP CONSTRAINT "Themes_workId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Translation" DROP CONSTRAINT "Translation_entryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Translation" DROP CONSTRAINT "Translation_workId_fkey";

-- DropIndex
DROP INDEX "public"."Keywords_entryId_key";

-- DropIndex
DROP INDEX "public"."Keywords_workId_key";

-- DropIndex
DROP INDEX "public"."Summary_workId_key";

-- DropIndex
DROP INDEX "public"."Themes_entryId_key";

-- DropIndex
DROP INDEX "public"."Themes_workId_key";

-- AlterTable
ALTER TABLE "Commentary" DROP COLUMN "entryId",
DROP COLUMN "workId",
ADD COLUMN     "bookId" INTEGER,
ADD COLUMN     "letterId" INTEGER;

-- AlterTable
ALTER TABLE "Keywords" DROP COLUMN "entryId",
DROP COLUMN "workId",
ADD COLUMN     "letterId" INTEGER,
ADD COLUMN     "sectionId" INTEGER;

-- AlterTable
ALTER TABLE "Publication" DROP COLUMN "workId",
ADD COLUMN     "bookId" INTEGER,
ADD COLUMN     "day" INTEGER,
ADD COLUMN     "geometry" geometry(Point, 4326),
ADD COLUMN     "language" TEXT,
ADD COLUMN     "month" INTEGER,
ADD COLUMN     "placename" TEXT,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "book",
DROP COLUMN "workId",
ADD COLUMN     "bookId" INTEGER,
ADD COLUMN     "letterId" INTEGER,
ADD COLUMN     "publication" TEXT;

-- AlterTable
ALTER TABLE "Summary" DROP COLUMN "workId",
ADD COLUMN     "letterId" INTEGER,
ADD COLUMN     "sectionId" INTEGER;

-- AlterTable
ALTER TABLE "Themes" DROP COLUMN "entryId",
DROP COLUMN "workId",
ADD COLUMN     "letterId" INTEGER,
ADD COLUMN     "sectionId" INTEGER;

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "entryId",
DROP COLUMN "workId",
ADD COLUMN     "bookId" INTEGER,
ADD COLUMN     "letterId" INTEGER;

-- DropTable
DROP TABLE "public"."Entry";

-- DropTable
DROP TABLE "public"."Metadata";

-- DropTable
DROP TABLE "public"."Work";

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "position" INTEGER,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Letter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "alt_title" TEXT,
    "reference" TEXT,
    "volume" TEXT,
    "pages" INTEGER[],
    "year" INTEGER,
    "season" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "date_text" TEXT,
    "place_text" TEXT,
    "placename" TEXT,
    "related_to" TEXT,
    "geometry" geometry(Point, 4326),
    "text" TEXT NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "alt_title" TEXT,
    "excerpt" TEXT,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "placename" TEXT,
    "geometry" geometry(Point, 4326),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_sectionId_key" ON "Keywords"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_letterId_key" ON "Keywords"("letterId");

-- CreateIndex
CREATE UNIQUE INDEX "Summary_sectionId_key" ON "Summary"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Summary_letterId_key" ON "Summary"("letterId");

-- CreateIndex
CREATE UNIQUE INDEX "Themes_sectionId_key" ON "Themes"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Themes_letterId_key" ON "Themes"("letterId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Themes" ADD CONSTRAINT "Themes_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Themes" ADD CONSTRAINT "Themes_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commentary" ADD CONSTRAINT "Commentary_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
