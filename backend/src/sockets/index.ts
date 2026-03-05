import { registerChatEvents } from "./chat.socket";
import { registerChannelEvents } from "./channel.socket";
import { registerServerEvents } from "./server.socket";

const setupSocket = (io: any) => {
  io.on('connection', (socket: any) => {
    registerChatEvents(io, socket);
    registerChannelEvents(io, socket);
    registerServerEvents(io, socket);
  });
};

export default setupSocket;