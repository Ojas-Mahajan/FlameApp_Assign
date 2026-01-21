import { io } from "socket.io-client";

// URL of backend server
const URL = "http://localhost:5000";

// Enable polling fallback for Windows & local setups
const socket = io(URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;
