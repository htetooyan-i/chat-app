/*
  Warnings:

  - The values [PDF] on the enum `AttachmentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttachmentType_new" AS ENUM ('IMAGE', 'VIDEO', 'RAW', 'GIF');
ALTER TABLE "Attachment" ALTER COLUMN "type" TYPE "AttachmentType_new" USING ("type"::text::"AttachmentType_new");
ALTER TYPE "AttachmentType" RENAME TO "AttachmentType_old";
ALTER TYPE "AttachmentType_new" RENAME TO "AttachmentType";
DROP TYPE "public"."AttachmentType_old";
COMMIT;
