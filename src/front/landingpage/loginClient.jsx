import style from "./loginClient.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function LoginClient() {
  const navigate = useNavigate();
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
        credentials: "include",
      });

      const dados = await response.json();
      if (dados.ok) {
        try {
          const getUser = await fetch(
            `http://localhost:8080/auth/${dados.id}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const respGetUser = await getUser.json();
          if (respGetUser.ok) {
            const DadosUsuario = {
              id: respGetUser.id,
              nome: respGetUser.nome,
              nascimento: respGetUser.nascimento,
            };
            localStorage.setItem("user", JSON.stringify(DadosUsuario));
            setTimeout(() => {
              navigate("/page-cliente");
            }, 1000);
          } else {
            setMensagem(respGetUser.message);
            if (respGetUser.message == "acesso negado!") {
              setTimeout(() => {
                navigate("/");
              }, 3000);
            }
          }
        } catch (error) {
          console.log(error);
        }
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
          <Link to="/loginProvider">
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
