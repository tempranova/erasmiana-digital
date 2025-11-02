/*
  Warnings:

  - A unique constraint covering the columns `[entryId]` on the table `Keywords` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entryId]` on the table `Themes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Keywords" ADD COLUMN     "entryId" INTEGER;

-- AlterTable
ALTER TABLE "Themes" ADD COLUMN     "entryId" INTEGER;

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "workId" INTEGER,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_entryId_key" ON "Keywords"("entryId");

-- CreateIndex
CREATE UNIQUE INDEX "Themes_entryId_key" ON "Themes"("entryId");

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Themes" ADD CONSTRAINT "Themes_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
