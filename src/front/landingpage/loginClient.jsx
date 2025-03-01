import style from "./loginClient.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
function LoginClient() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/loginCliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await response.json();
      if (response.ok) {
        setMensagem(dados.message);
      } else {
        setMensagem(dados.message);
      }
    } catch (error) {
      console.error("Erro ao tenta buscar usuario", error);
    }
  };
  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>Login Cliente</h1>

        <button>
          <Link to="/loginPrestador">
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
        <button type="submit">Entrar</button>
        {
          <p
            style={{
              color: mensagem.includes(
                "Todos os campos precisam ser preenchidos"
              )
                ? "red"
                : "greenyellow",
              paddingBottom: "20px",
            }}
          >
            {mensagem}
          </p>
        }
      </form>
      <h2>
        Não possui uma conta? <Link to="/registerClient">Cadastra-se</Link>
      </h2>
    </div>
  );
}
export default LoginClient;
