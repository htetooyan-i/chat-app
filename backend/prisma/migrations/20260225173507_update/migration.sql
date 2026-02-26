/*
  Warnings:

  - You are about to drop the column `bannedById` on the `Ban` table. All the data in the column will be lost.
  - Added the required column `bannedByRole` to the `Ban` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ban" DROP CONSTRAINT "Ban_bannedById_fkey";

-- AlterTable
ALTER TABLE "Ban" DROP COLUMN "bannedById",
ADD COLUMN     "bannedByRole" "MemberRole" NOT NULL;
