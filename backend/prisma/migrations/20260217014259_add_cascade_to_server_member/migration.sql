-- DropForeignKey
ALTER TABLE "ServerMember" DROP CONSTRAINT "ServerMember_serverId_fkey";

-- DropForeignKey
ALTER TABLE "ServerMember" DROP CONSTRAINT "ServerMember_userId_fkey";

-- AddForeignKey
ALTER TABLE "ServerMember" ADD CONSTRAINT "ServerMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerMember" ADD CONSTRAINT "ServerMember_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
