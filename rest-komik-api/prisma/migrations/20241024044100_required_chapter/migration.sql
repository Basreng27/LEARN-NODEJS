/*
  Warnings:

  - Made the column `last_chapter` on table `bookmarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bookmarks" ALTER COLUMN "last_chapter" SET NOT NULL;
