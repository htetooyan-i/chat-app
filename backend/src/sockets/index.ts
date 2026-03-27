// @ts-ignore
import { parse } from "cookie";
import { Server, Socket } from "socket.io";

import { registerChatEvents } from "./chat.socket";
import { registerChannelEvents } from "./channel.socket";
import { registerPresenceEvents } from "./presence.socket";
import { registerServerEvents } from "./server.socket";
import {verifyToken} from "../lib/jwt";
import {registerUserEvents} from "./user.socket";

const setupSocket = (io: Server) => {

  io.use(async (socket: Socket, next: any) => {

    const cookies = parse(socket.handshake.headers.cookie || "");

    const authToken = typeof socket.handshake.auth?.token === "string"
      ? socket.handshake.auth.token
      : undefined;

    const token = cookies.accessToken || authToken;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const normalizedToken = token.startsWith("Bearer ") ? token.slice(7) : token;
      const payload = await verifyToken< { userId: number }>(normalizedToken);
      socket.data.userId = payload.userId;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on('connection', (socket: Socket) => {
    registerPresenceEvents(io, socket);
    registerUserEvents(io, socket);
    registerChatEvents(io, socket);
    registerChannelEvents(io, socket);
    registerServerEvents(io, socket);
  });
};

export default setupSocket;