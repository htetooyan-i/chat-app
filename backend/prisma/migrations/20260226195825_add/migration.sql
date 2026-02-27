/*
  Warnings:

  - A unique constraint covering the columns `[serverId,name]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Channel_serverId_name_key" ON "Channel"("serverId", "name");
