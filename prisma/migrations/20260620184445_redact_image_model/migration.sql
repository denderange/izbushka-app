/*
  Warnings:

  - You are about to drop the column `filePath` on the `Image` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "filePath",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Image_createdAt_idx" ON "Image"("createdAt");
