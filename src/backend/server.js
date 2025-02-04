import express from "express";
import cors from "cors";
import {
  CreateUserClient,
  CreateUserProvider,
  SearchUserClient,
  SearchUserProvider,
  allProviders,
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
  const dataNasc = new Date(nascimento);
  const senhaUsuario = parseInt(senha);
  try {
    const user = CreateUserClient({
      nome,
      nascimento: dataNasc,
      email,
      senha: senhaUsuario,
    });
  } catch (error) {
    return console.log(error);
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
  try {
    SearchUserClient(email).then((user) => {
      if (!user) {
        return resp.status(404).json({ message: "usuario não encontrado!" });
      }

      const senhaUser = parseInt(user["senha"]);
      const senhaFront = parseInt(senha);

      if (senhaFront != senhaUser) {
        return resp.status(404).json({ message: "Senha INCORRETA!" });
      }
      return resp.status(201).json({
        userEmail: user["email"],
        nome: user["nome"],
        nascimento: user["nascimento"],
        message: "Login feito com sucesso!",
      });
    });
  } catch (error) {
    return console.log(error);
  }
  console.log("Dados recebidos: ", { email, senha });
});

//Rotas Prestador
//cadastro
server.post("/cadastroPrestador", (req, resp) => {
  const { nome, dataNasc, profissao, cidade, email, senha } = req.body;
  if (!nome || !dataNasc || !profissao || !email || !senha || !cidade) {
    return resp
      .status(400)
      .json({ message: "Todos os dados precisam ser preenchidos!" });
  }
  const nascimentoUsuario = new Date(dataNasc);
  const senhaUsuario = parseInt(senha);
  try {
    CreateUserProvider({
      nome: nome,
      nascimento: nascimentoUsuario,
      profissao: profissao,
      cidade: cidade,
      email: email,
      senha: senhaUsuario,
    })
      .then((dados) => {
        console.log(dados, "dados enviados!");
      })
      .catch((err) => {
        return console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
  console.log("Dados recebidos: ", {
    nome,
    dataNasc,
    profissao,
    cidade,
    email,
    senha,
  });
  return resp.status(201).json({ message: "Cadastro realizado com sucesso!" });
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

//getProviders
server.post("/getProviders", (req, resp) => {
  const { cidade, profissao } = req.body;
  console.log(cidade, profissao, "backend");
  try {
    allProviders({ cidade: cidade, profissao: profissao })
      .then((providers) => {
        if (!providers || providers.length === 0) {
          return resp
            .status(404)
            .json({ error: "Nenhum provedor encontrado!" });
        }
        return resp.status(200).json({
          respProviders: providers,
        });
      })
      .catch((error) => {
        console.log("erro no servidor", error);
        return resp.status(500).json({ error: "erro interno no servidor" });
      });
  } catch (error) {
    console.log(error);
  }
});

server.listen(port, () => console.log(`Server rodando na porta ${port}`));
