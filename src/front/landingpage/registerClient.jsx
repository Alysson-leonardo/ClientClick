import style from "./loginClient.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function RegisterClient() {
  const navigate = useNavigate();
  // Mensagem do formulario
  const [mensagem, setMensagem] = useState("");
  //variaveis useState dos Dados do usuario
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  //senha
  const [senha, setSenha] = useState("");
  const [senhaCor, setsenhaCor] = useState("black");
  const [senhaMensagem, setsenhaMensagem] = useState("Senha: ");

  const [senhaCofirm, setSenhaCofirm] = useState("");
  const [senhaCCor, setsenhaCCor] = useState("black");
  const [senhaCMensagem, setsenhaCMensagem] = useState("Senha: ");

  const [validSenha, setvalidSenha] = useState(true);

  //Eventos da senha
  const statusSenha = (e) => {
    setSenha(e.target.value);
    if (senha.length < 8) {
      setsenhaCor("red");
      setsenhaMensagem("Senha: A senha precisa ter o minimo de 8 caracteres!");
    } else {
      setsenhaCor("green");
      setsenhaMensagem("Senha: ");
    }
  };
  const statusSenhaCofirm = (e) => {
    setSenhaCofirm(e.target.value);
    if (senhaCofirm.length < 8) {
      setsenhaCCor("red");
      setsenhaCMensagem("Senha: A senha precisa ter o minimo de 8 caracteres!");
    } else {
      setsenhaCCor("green");
      setsenhaCMensagem("Senha: ");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha == senhaConfirm) {
      try {
        const response = await fetch("http://localhost:8080/cadastroCliente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome, nascimento, email, senha }),
        });

        const dados = await response.json();
        if (response.ok) {
          setvalidSenha(true);
          setMensagem(dados.message);
          setNome("");
          setNascimento("");
          setEmail("");
          setSenha("");
          setSenhaConfirm("");
          setsenhaCor("");
          setsenhaMensagem("");
          setvalidSenha(true);
          setTimeout(() => {
            navigate("/loginClient");
          }, 2000);
        } else {
          setMensagem(dados.message);
        }
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        setMensagem("erro aoa cadastrar. Tente novamente.");
      }
    } else {
      setMensagem("As senhas não coincidem.");
      setvalidSenha(false);
    }
  };
  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>Cadastro Cliente</h1>
        <button>
          <Link to="/registerPrestador">
            <span
              class="material-symbols-outlined"
              title="Alternar para prestador"
            >
              sync_alt
            </span>
          </Link>
        </button>
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="InameUser">Nome</label>
        <input
          type="text"
          name="userName"
          id="InameUser"
          placeholder="Primeiro nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label htmlFor="IdtNasc">Data de nascimento</label>
        <input
          type="date"
          name="dtNascName"
          id="IdtNasc"
          value={nascimento}
          onChange={(e) => setNascimento(e.target.value)}
          required
        />
        <label htmlFor="Iemail">Email</label>
        <input
          type="email"
          name="emailName"
          id="Iemail"
          placeholder="exemplo@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="Isenha" style={{ color: senhaCor }}>
          {senhaMensagem}
        </label>
        <input
          type="password"
          name="senhaName"
          id="Isenha"
          placeholder="senha"
          value={senha}
          onChange={statusSenha}
          minLength={8}
          required
        />
        <label htmlFor="IsenhaCofirm" style={{ color: senhaCCor }}>
          {senhaCMensagem}
        </label>
        <input
          type="password"
          name="senhaCofirmName"
          id="IsenhaCofirm"
          placeholder="Confirme a senha"
          value={senhaCofirm}
          onChange={statusSenhaCofirm}
          minLength={8}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {
        <p
          style={{
            color: validSenha ? "greenyellow" : "red",
            paddingBottom: "20px",
          }}
        >
          {mensagem}
        </p>
      }
      <h2>
        Já tem uma conta? <Link to="/ClientClick/loginClient">Faça login</Link>
      </h2>
    </div>
  );
}

export default RegisterClient;
