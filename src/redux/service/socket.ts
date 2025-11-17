import { Socket, io } from "socket.io-client";

let socket: Socket | null = null;

export const initiateSocket = (userId: number) => {
  const SOCKET_URL = `http://103.186.20.114:8105?userId=${userId}`; // Replace with your server URL
  //   if (socket) {
  //     console.warn("Socket is already initialized");
  //     return;
  //   }

  socket = io(SOCKET_URL, {
    transports: ["websocket"], // or ['polling', 'websocket'] depending on your server configuration
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO server");
  });

  socket.on("connect_error", (error) => {
    console.warn("Connection Error:", error.message);
    // Optionally retry connection, show a UI alert, etc.
  });

  socket.on("connect_timeout", () => {
    console.warn("Connection Timeout");
    // Handle connection timeout, such as retrying connection.
  });

  socket.on("reconnect_failed", () => {
    console.warn("Reconnection Failed");
    // Handle reconnection failure, notify the user, etc.
  });

  socket.on("error", (error) => {
    console.warn("Socket Error:", error.message);
    // Handle general socket errors
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Reset the socket instance after disconnection
    console.log("Socket is disconnect");
  } else {
    console.log("No socket to disconnect");
  }
};

export const getSocket = () => socket;
