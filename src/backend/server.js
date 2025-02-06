import express, { json } from "express";
import cors from "cors";
import {
  CreateUserClient,
  CreateUserProvider,
  SearchUserClient,
  SearchUserProvider,
  allProviders,
} from "./prismaServices.js";
import bcrypt from "bcryptjs";

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
  console.log(senha);
  try {
    SearchUserClient(email).then((dados) => {
      if (!dados) {
        const dataNasc = new Date(nascimento);

        const senhaHash = bcrypt.hashSync(senha, 8);

        try {
          CreateUserClient({
            nome,
            nascimento: dataNasc,
            email,
            senha: senhaHash,
          })
            .then((dados) => {
              console.log(dados);
              return resp
                .status(201)
                .json({ message: "Cadastro realizado com sucesso!" });
            })
            .catch((error) => {
              console.log(error);
              return resp.status(404).json({ error: "erro ao cadastrar" });
            });
        } catch (error) {
          return resp.status(404).json({ error: "erro ao tentar cadastrar" });
        }
      } else {
        return resp.status(404).json({ error: "O usuario já existe" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
//Login
server.post("/loginCliente", (req, resp) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos" });
  }
  console.log(senha);
  try {
    SearchUserClient(email).then((user) => {
      if (!user) {
        return resp.status(404).json({ message: "usuario não cadastrado!" });
      }
      const correctPassword = bcrypt.compareSync(senha, user["senha"]);
      if (!correctPassword) {
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
  console.log(senha);
  try {
    SearchUserProvider(email).then((dados) => {
      if (!dados) {
        const nascimentoUsuario = new Date(dataNasc);
        const senhaHash = bcrypt.hashSync(senha, 10);
        try {
          CreateUserProvider({
            nome_prestador: nome,
            nascimento_prestador: nascimentoUsuario,
            profissao_prestador: profissao,
            cidade_prestador: cidade,
            email_prestador: email,
            senha_prestador: senhaHash,
          })
            .then((dados) => {
              console.log(dados);
              return resp
                .status(201)
                .json({ message: "Cadastro realizado com sucesso!" });
            })
            .catch((error) => {
              console.log(error);
              return resp.status(404).json({ error: "erro ao cadastrar" });
            });
        } catch (error) {
          return resp.status(404).json({ error: "erro ao tentar cadastrar" });
        }
      } else {
        return resp.status(404).json({ error: "O usuario já existe" });
      }
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
});
//login
server.post("/loginPrestador", (req, resp) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos" });
  }
  console.log(senha);
  try {
    SearchUserProvider(email).then((user) => {
      if (!user) {
        return resp.status(404).json({ message: "usuario não cadastrado!" });
      }
      const correctPassword = bcrypt.compareSync(
        senha,
        user["senha_prestador"]
      );
      if (!correctPassword) {
        return resp.status(404).json({ message: "Senha INCORRETA!" });
      }
      return resp.status(201).json({
        userEmail: user["email_prestador"],
        nome: user["nome_prestador"],
        nascimento: user["nascimento_prestador"],
        profissao: user["profissao_prestador"],
        cidade: user["cidade_prestador"],
        message: "Login feito com sucesso!",
      });
    });
  } catch (error) {
    return console.log(error);
  }
  console.log("Dados recebidos: ", { email, senha });
});

//Listar os prestadores
server.post("/getProviders", (req, resp) => {
  const { cidade, profissao } = req.body;
  console.log(typeof cidade, cidade, typeof profissao, profissao, "backend");
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
