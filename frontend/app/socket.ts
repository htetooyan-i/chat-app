import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const getSocketUrl = () => process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

const getCookieValue = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.split("=");
    if (key === name) {
      return rest.join("=");
    }
  }

  return undefined;
};

export const getSocket = () => {
  if (!socket) {
    socket = io(getSocketUrl(), {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: (cb) => {
        cb({ token: getCookieValue("accessToken") });
      },
    });
  }

  return socket;
};

export const connectSocket = () => {
  const instance = getSocket();
  if (!instance.connected) {
    instance.connect();
  }
  return instance;
};

export const disconnectSocket = () => {
  if (!socket) return;
  socket.disconnect();
};