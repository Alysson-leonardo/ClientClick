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
      .json({ message: "Todos os campos precisam ser preenchidos", ok: false });
  }
  try {
    SearchUserClient("email", email).then((user) => {
      if (!user) {
        return resp
          .status(404)
          .json({ message: "usuario não cadastrado!", ok: false });
      }
      const correctPassword = bcrypt.compareSync(senha, user["senha"]);
      if (!correctPassword) {
        return resp
          .status(404)
          .json({ message: "Senha INCORRETA!", ok: false });
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
      } catch (error) {
        console.log(error);
        return resp.status(500).end();
      }
      return resp.status(200).json({ id: user["id_cliente"], ok: true });
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
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
    SearchUserProvider("email_prestador", email).then((dados) => {
      if (!dados) {
        const nascimentoUsuario = new Date(dataNasc);
        const senhaHash = bcrypt.hashSync(senha, 8);
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
});
//login
server.post("/loginPrestador", async (req, resp) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return resp
      .status(400)
      .json({ message: "Todos os campos precisam ser preenchidos", ok: false });
  }
  try {
    const user = await SearchUserProvider("email_prestador", email);
    if (!user) {
      return resp
        .status(404)
        .json({ message: "usuario não cadastrado!", ok: false });
    }
    const correctPassword = bcrypt.compareSync(senha, user["senha_prestador"]);
    if (!correctPassword) {
      return resp.status(404).json({ message: "Senha INCORRETA!", ok: false });
    }
    try {
      const secret = process.env.SECRET;
      const idUsuario = String(user["id_prestador"]);
      const token = jwt.sign({ id: idUsuario }, secret, { expiresIn: "1h" });
      console.log(token, "token antes do cookie");
      resp.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
        path: "/",
      });
    } catch (error) {
      console.log(error);
      return resp.status(500).end();
    }
    return resp.status(200).json({
      id: user["id_prestador"],
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
  }
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
  } catch (error) {
    console.log(error);
    return resp.status(403).json({ message: "token invalido", ok: false });
  }
  next();
}
// rota privada usuario cliente
server.get("/auth-client/:id", tokenVerify, async (req, resp) => {
  const idUser = parseInt(req.userId.id);
  try {
    const user = await SearchUserClient("id_cliente", idUser);
    if (!user) {
      return resp.status(404).json({ message: "usuario não encontrado(auth)" });
    }
    return resp.status(200).json({
      id: user["id_cliente"],
      nome: user.nome,
      nascimento: user.nascimento,
      message: "login feito com sucesso!",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
  }
});
server.get("/auth-provider/:id", tokenVerify, async (req, resp) => {
  const userId = parseInt(req.userId.id);
  console.log(userId);
  try {
    const user = await SearchUserProvider("id_prestador", userId);
    if (!user) {
      return resp.status(404).json({ message: "usuario não encontrado auth" });
    }
    return resp.status(200).json({
      id: user["id_prestador"],
      nome: user.nome_prestador,
      nascimento: user.nascimento_prestador,
      profissao: user.profissao_prestador,
      cidade: user.cidade_prestador,
      message: "login feito com sucesso!",
      ok: true,
    });
  } catch (error) {
    return resp.status(404).json({ message: "usuario não encontrado" });
  }
});

server.listen(port, () => console.log(`Server rodando na porta ${port}`));
