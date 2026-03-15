/*
  Warnings:

  - Added the required column `originalName` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN "originalName" TEXT;
UPDATE "Attachment" SET "originalName" = split_part("publicId", '/', -1);
ALTER TABLE "Attachment" ALTER COLUMN "originalName" SET NOT NULL;
