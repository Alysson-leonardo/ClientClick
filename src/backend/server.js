import express from "express";
import cors from "cors";
import {
  CreateUserClient,
  CreateUserProvider,
  SearchUserClient,
  SearchUserProvider,
} from "./prismaServices.js";

const server = express();
const port = 8080;

server.use(cors());
server.use(express.json());
// Rotas Cliente
//cadastro
server.post("/cadastroCliente", (req, resp) => {
  const { nome, nascimento, email, senha } = req.body;
  if (!nome || !nascimento || !email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos!" });
  }
  try {
    const user = CreateUserClient({ nome, nascimento, email, senha });
    console.log(user, "print do console");
  } catch (error) {
    console.log(error);
  }
  console.log("Dados recebidos: ", { nome, nascimento, email, senha });

  resp.status(201).json({ message: "cadastro realizado com sucesso!" });
});
//Login
server.post("/loginCliente", (req, resp) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos" });
  }
  console.log("Dados recebidos: ", { email, senha });
  resp.status(201).json({ message: "Login feito com sucesso!" });
});

//Rotas Prestador
//cadastro
server.post("/cadastroPrestador", (req, resp) => {
  const { nome, dataNasc, profissao, email, senha } = req.body;
  if (!nome || !dataNasc || !profissao || !email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os dados precisam ser preenchidos!" });
  }
  console.log("Dados recebidos: ", {
    nome,
    dataNasc,
    profissao,
    email,
    senha,
  });
  resp.status(201).json({ message: "Cadastro realizado com sucesso!" });
});
//login
server.post("/loginPrestador", (req, resp) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos" });
  }
  console.log("Dados recebidos: ", { email, senha });
  resp.status(201).json({ message: "Logado" });
});
server.listen(port, () => console.log(`Server rodando na porta ${port}`));
