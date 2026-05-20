import express from "express";
import http from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // dev only
    methods: ["GET", "POST"],
  },
});

// ----- TYPES -----

type ClientToServerEvents = {
  join: (username: string) => void;
  message: (text: string) => void;
};

type ServerToClientEvents = {
  message: (payload: MessagePayload) => void;
  system: (message: string) => void;
};

type MessagePayload = {
  user: string;
  text: string;
  time: string;
};

type SocketData = {
  username?: string;
};

// ----- REST -----

app.get("/health", (_, res) => {
  res.json({
    ok: true,
    users: io.engine.clientsCount,
  });
});

// ----- SOCKET.IO -----

io.on(
  "connection",
  (
    socket: Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>,
  ) => {
    console.log("User connected:", socket.id);

    // User joins
    socket.on("join", (username) => {
      const trimmedUsername = username.trim();

      if (!trimmedUsername) return;

      socket.data.username = trimmedUsername;

      console.log(`${trimmedUsername} joined`);

      io.emit("system", `${trimmedUsername} joined the chat`);
    });

    // User sends message
    socket.on("message", (text) => {
      const trimmedText = text.trim();

      if (!trimmedText) return;

      const payload: MessagePayload = {
        user: socket.data.username || "Anonymous",
        text: trimmedText,
        time: new Date().toISOString(),
      };

      console.log("Message:", payload);

      // Send to everyone
      io.emit("message", payload);
    });

    // Disconnect
    socket.on("disconnect", () => {
      const username = socket.data.username;

      console.log("User disconnected:", socket.id);

      if (username) {
        io.emit("system", `${username} left the chat`);
      }
    });
  },
);

// ----- START SERVER -----

const PORT = 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on http://localhost:${PORT}`);
});
