import { useState } from "react";
import style from "./loginClient.module.css";
import { Link, useNavigate } from "react-router-dom";
function LoginPrestador() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState();
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/loginPrestador", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
        credentials: "include",
      });
      const dados = await response.json();
      if (dados.ok) {
        console.log(dados, "retorno do login");
        try {
          const getUserProvider = await fetch(
            `http://localhost:8080/auth-provider/${dados.id}`,
            { method: "GET", credentials: "include" }
          );
          const respGetUserProvider = await getUserProvider.json();
          if (respGetUserProvider.ok) {
            const dadosPrestador = {
              id: respGetUserProvider.id,
              nome: respGetUserProvider.nome,
              profissao: respGetUserProvider.profissao,
              cidade: respGetUserProvider.cidade,
              nascimento: respGetUserProvider.nascimento,
            };
            localStorage.setItem("user", JSON.stringify(dadosPrestador));
            alert(respGetUserProvider.message);
            setTimeout(() => {
              navigate("/page-prestador");
            }, 1000);
          } else {
            setMensagem(respGetUserProvider.message);
            if (respGetUserProvider.message == "acesso negado!") {
              setTimeout(() => {
                navigate("/");
              }, 3000);
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setMensagem(dados.message);
      }
    } catch (error) {
      console.error("Erro ao buscar usuario!", error);
    }
  };
  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>Login Prestador</h1>
        <button>
          <Link to="/loginClient">
            <span
              class="material-symbols-outlined"
              title="Alternar para cliente"
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
      </form>
      {mensagem}
      <h2>
        Não possui uma conta? <Link to="/registerProvider">Cadastra-se</Link>
      </h2>
    </div>
  );
}
export default LoginPrestador;
