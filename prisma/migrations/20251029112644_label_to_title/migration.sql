/*
  Warnings:

  - You are about to drop the column `label` on the `Source` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Source" DROP COLUMN "label",
ADD COLUMN     "title" TEXT;
