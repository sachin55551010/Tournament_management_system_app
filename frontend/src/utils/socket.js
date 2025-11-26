import { io } from "socket.io-client";

let socket;

export const createSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5005", {
      withCredentials: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
