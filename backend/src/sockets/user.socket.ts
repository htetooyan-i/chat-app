import { Server, Socket } from 'socket.io';

export const registerUserEvents = (io: Server, socket: Socket) => {
    const userId = socket.data.userId;
    socket.join(`user-${userId}`);


}