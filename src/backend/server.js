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
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";

const server = express();
const port = 8080;

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());

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
    SearchUserClient("email", email).then((dados) => {
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
    SearchUserClient("email", email).then((user) => {
      if (!user) {
        return resp.status(404).json({ message: "usuario não cadastrado!" });
      }
      const correctPassword = bcrypt.compareSync(senha, user["senha"]);
      if (!correctPassword) {
        return resp.status(404).json({ message: "Senha INCORRETA!" });
      }
      try {
        const secret = process.env.SECRET;
        const idUsuario = String(user["id_cliente"]);
        const token = jwt.sign({ id: idUsuario }, secret, { expiresIn: "1h" });
        resp.cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000,
          path: "/",
        });
        console.log("cookie definido:", resp.getHeaders()["set-cookie"]);
        return resp.status(200).json({ id: user["id_cliente"], ok: true });
      } catch (error) {
        return resp
          .status(500)
          .json({ message: "erro ao tentar criar o token" });
      }
    });
  } catch (error) {
    return resp
      .status(404)
      .json({ message: "erro ao tentar encontrar o usuario", error });
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
    SearchUserProvider("email", email).then((dados) => {
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
    SearchUserProvider("email", email).then((user) => {
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
server.get("/getProviders", (req, resp) => {
  const { cidade, profissao } = req.query;
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

function tokenVerify(req, resp, next) {
  const token = req.cookies.token;
  console.log(token, " token do middleware");
  if (!token) {
    return resp.status(401).json({ message: "acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;
    req.userId = jwt.verify(token, secret);
    next();
  } catch (error) {
    return resp.status(403).json({ message: "" });
  }
}
// rota privada usuario cliente
server.get("/auth/:id", tokenVerify, (req, resp) => {
  console.log("rota do auth");
  const idUser = parseInt(req.userId.id);
  try {
    SearchUserClient("id_cliente", idUser)
      .then((user) => {
        try {
          if (!user) {
            return resp
              .status(404)
              .json({ message: "usuario não encontra(auth)" });
          }
          return resp.status(200).json({
            id: user["id_cliente"],
            nome: user.nome,
            nascimento: user.nascimento,
            message: "ok",
            ok: true,
          });
        } catch (error) {
          console.log(error, "erro ao buscar usuario");
          return resp.status(404).json({ message: "invalido" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return console.log(error);
  }
});

server.listen(port, () => console.log(`Server rodando na porta ${port}`));
