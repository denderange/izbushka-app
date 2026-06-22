/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Story" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "StoryPage" ADD COLUMN     "title" TEXT;
