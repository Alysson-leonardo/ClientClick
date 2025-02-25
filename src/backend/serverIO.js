import http from "http";
import { Server } from "socket.io";
const httpServer = http.createServer();
const port = 3030;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  transports: ["websocket"],
});
io.on("connection", (socket) => {
  console.log("se conectou");
  //entrar na sala
  socket.on("entrar_sala", ({ currentRoom }) => {
    console.log(currentRoom);
    const roomId = currentRoom;
    socket.join(roomId);
  });

  //manda mensagem na sala
  socket.on("mensagem_sala", ({ currentRoom, mensagem, user }) => {
    io.to(currentRoom).emit("mensagem_sala", mensagem, user);
  });

  // sair da sala
  socket.on("disconnect", () => {});
});

httpServer.listen(port, () => {
  console.log(`servidor websocket rodando na porta ${port}`);
});
