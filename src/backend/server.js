import express from "express";
import cors from "cors";

const server = express();
const port = 8080;

server.use(cors());
server.use(express.json());

server.post("/cadastroCliente", (req, resp) => {
  const { nome, nascimento, email, senha } = req.body;
  if (!nome || !nascimento || !email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos!" });
  }

  console.log("Dados recebidos: ", { nome, nascimento, email, senha });

  resp.status(201).json({ message: "cadastro realizado com sucesso!" });
});
server.listen(port, () => console.log(`Server rodando na porta ${port}`));
