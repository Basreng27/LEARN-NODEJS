/*
  Warnings:

  - Changed the type of `type` on the `comics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ComicType" AS ENUM ('Manhua', 'Manga', 'Manhwa');

-- AlterTable
ALTER TABLE "comics" DROP COLUMN "type",
ADD COLUMN     "type" "ComicType" NOT NULL;
