import express from "express";
import http from "http";
import cors from "cors";
import socketio from "socket.io";
import Connections from "./connections";
const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, { cors: { origin: "*" } });
const PORT = 3000;

app.use(cors());

io.on("connection", (socket) => {
  Connections.forEach((conn) => {
    conn(socket);
  });

  socket.on("sound-fx", (sound) => {
    socket.broadcast.emit("sound-fx", sound);
  });
});

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
