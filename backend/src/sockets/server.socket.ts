import { Server, Socket } from "socket.io";

import ServerMemberService  from "../services/serverMember.service";

export const registerServerEvents = async (io: Server, socket: Socket) => {

    const userId = socket.data.userId;

    const servers = await ServerMemberService.getCurrentUserServers(userId);
    socket.data.serverIds = servers.map((server) => server.id);
    servers.forEach((server) => {
        socket.join(`server-${server.id}`);
    });

    socket.on("joinServer", (serverId: number) => {
        const room = `server-${serverId}`;
        socket.join(room);
        console.log(`User ${socket.id} joined server ${serverId}`);
    });

    socket.on('leaveServer', (serverId: number) => {
        const room = `server-${serverId}`;
        socket.leave(room);
    })
}
