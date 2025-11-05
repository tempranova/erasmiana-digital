/*
  Warnings:

  - You are about to drop the column `geometry` on the `Letter` table. All the data in the column will be lost.
  - You are about to drop the column `placename` on the `Letter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "geometry",
DROP COLUMN "placename",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "destination" TEXT,
ADD COLUMN     "destination_geo" geometry(Point, 4326),
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "origin_geo" geometry(Point, 4326),
ADD COLUMN     "recipient" TEXT;
