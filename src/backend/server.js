import express, { json } from "express";
import cors from "cors";
import {
  CreateUserClient,
  CreateUserProvider,
  SearchUserClient,
  SearchUserProvider,
  allProviders,
  createService,
  createChat,
  getChat,
  allPedidos,
} from "./prismaServices.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";
const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Rotas Cliente
//cadastro
app.post("/cadastroCliente", (req, resp) => {
  const { nome, nascimento, email, senha, cidade } = req.body;
  if (!nome || !nascimento || !email || !senha || !cidade) {
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
            cidade: cidade,
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
app.post("/loginCliente", (req, resp) => {
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
      return resp.status(200).json({
        ok: true,
        message: "login feito com sucesso!",
      });
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
  }
  console.log("Dados recebidos: ", { email, senha });
});

//Rotas Prestador
//cadastro
app.post("/cadastroPrestador", (req, resp) => {
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
app.post("/loginPrestador", async (req, resp) => {
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
      ok: true,
      message: "login feito com sucesso!",
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
  }
});
// logout

app.post("/logout", (req, resp) => {
  resp.clearCookie("token", { path: "/" });
  resp.status(200).json({ message: "usuario deslogado", ok: true });
});
//Listar os prestadores
app.get("/getProviders", (req, resp) => {
  const { cidade, profissao } = req.query;
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
// pegar pedidos
app.get("/getpedidos", async (req, resp) => {
  const id_cliente = req.id_clinte;
  try {
    const pedidos = await allPedidos(id_cliente);
    if (!pedidos || pedidos.length === 0) {
      return resp
        .status(404)
        .json({ message: "não foi encontrado nenhum pedido" });
    }
    return resp.status(200).json({
      listPedidos: pedidos,
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
  }
});

function tokenVerify(req, resp, next) {
  const token = req.cookies.token;

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
app.get("/auth-client", tokenVerify, async (req, resp) => {
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
app.get("/auth-provider", tokenVerify, async (req, resp) => {
  const userId = parseInt(req.userId.id);

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

// criar pedido
app.post("/createService", async (req, resp) => {
  const { serviceName, valueMax, idCliente } = req.body;
  const valueMaxFloat = parseFloat(valueMax);
  try {
    createService({
      clienteId: idCliente,
      nome_pedido: serviceName,
      valor_pedido: valueMaxFloat,
    });
  } catch (error) {
    console.log(error);
    return resp.status(404).end();
  }
  return resp
    .status(201)
    .json({ ok: true, message: "pedido criado com sucesso!" });
});

//criar registro de conversa
app.post("/createChat", tokenVerify, async (req, resp) => {
  if (req.body.user == "prestador") {
    const id_cliente = req.body.id_other;
    const id_prestador = parseInt(req.userId.id);
    try {
      const conversa = await createChat({
        id_cliente: id_cliente,
        id_prestador: id_prestador,
      });
      if (!conversa) {
        return resp
          .status(404)
          .json({ message: "não foi possivel criar a conversa!", ok: false });
      }
      return resp
        .status(201)
        .json({ ok: true, message: "conversa criada com sucesso" });
    } catch (error) {
      console.log(error);
      resp.status(500).end();
    }
  } else if (req.body.user == "cliente") {
    const id_prestador = req.body.id_other;
    const id_cliente = parseInt(req.userId.id);
    try {
      const conversa = await createChat({
        idConversa: String(id_cliente) + String(id_prestador),
        id_cliente: id_cliente,
        id_prestador: id_prestador,
      });
      if (!conversa) {
        return resp
          .status(404)
          .json({ message: "não foi possivel criar a conversa!", ok: false });
      }
      return resp
        .status(201)
        .json({ ok: true, message: "conversa criada com sucesso" });
    } catch (error) {
      console.log(error);
      resp.status(500).end();
    }
  }
});

//buscar conversas

app.get("/searchChat", tokenVerify, async (req, resp) => {
  const idUser = parseInt(req.userId.id);
  try {
    const conversas = await getChat({ id: idUser });
    if (conversas.length === 0) {
      return resp
        .status(400)
        .json({ message: "o usuario não possui nenhuma conversa!", ok: false });
    }
    return resp.status(200).json({ listConversas: conversas, ok: true });
  } catch (error) {
    console.log(error);
    return resp.status(500).end();
  }
});

// WebSocket.io

app.listen(port, () => console.log(`Server rodando na porta ${port}`));
