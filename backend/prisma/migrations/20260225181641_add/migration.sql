/*
  Warnings:

  - Added the required column `appealStatus` to the `Ban` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BanAppealStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REVOKED', 'REJECTED');

-- AlterTable
ALTER TABLE "Ban" ADD COLUMN     "appealStatus" "BanAppealStatus" NOT NULL;
