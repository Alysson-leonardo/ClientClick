import style from "./loginClient.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function RegisterClient() {
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== senhaConfirm) {
      setMensagem("As senhas não coincidem.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/cadastroCliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, nascimento, email, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem(data.message);
        setNome("");
        setNascimento("");
        setEmail("");
        setSenha("");
      } else {
        setMensagem(data.message);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      setMensagem("erro aoa cadastrar. Tente novamente.");
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
        <label htmlFor="Isenha">Senha</label>
        <input
          type="password"
          name="senhaName"
          id="Isenha"
          placeholder="*****"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <label htmlFor="IsenhaCofirm">Senha</label>
        <input
          type="password"
          name="senhaCofirmName"
          id="IsenhaCofirm"
          placeholder="*****"
          value={senhaConfirm}
          onChange={(e) => setSenhaConfirm(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      <h2>
        Já tem uma conta? <Link to="/loginClient">Faça login</Link>
      </h2>
    </div>
  );
}

export default RegisterClient;
