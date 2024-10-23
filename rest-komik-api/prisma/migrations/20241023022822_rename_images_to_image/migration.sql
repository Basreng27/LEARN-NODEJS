/*
  Warnings:

  - You are about to drop the column `images` on the `comics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comics" DROP COLUMN "images",
ADD COLUMN     "image" BYTEA;
