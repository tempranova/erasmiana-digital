/*
  Warnings:

  - You are about to drop the column `name` on the `Source` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Source" DROP COLUMN "name",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "book" TEXT,
ADD COLUMN     "label" TEXT;
