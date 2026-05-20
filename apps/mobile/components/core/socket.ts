import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.emit("message", "Hello from Expo!");

socket.on("message", (data) => {
  console.log("Received:", data);
});
