const setupSocket = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('A user connected:', socket.id);
  });
};

export default setupSocket;