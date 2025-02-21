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
  socket.on("entrar_sala", ({ id_cliente, id_user }) => {
    console.log(id_cliente, "id cliente");
    console.log(id_user, "id do usuario");
    const roomId = [id_user, id_cliente].sort().join("_");
    socket.join(roomId);
  });

  //manda mensagem na sala
  socket.on("mensagem_sala", ({ roomId, mensagem }) => {
    io.to(roomId).emit("mensagem_sala", mensagem);
  });

  // sair da sala
  socket.on("disconnect", () => {});
});

httpServer.listen(port, () => {
  console.log(`servidor websocket rodando na porta ${port}`);
});
