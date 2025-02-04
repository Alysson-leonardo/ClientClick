import { useState } from "react";
import style from "./loginClient.module.css";
import { Link } from "react-router-dom";
function LoginPrestador() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState();
  const [mensagem, setMensagem] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/loginPrestador", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await response.json();
      if (dados.ok) {
        setMensagem(dados.message);
        setEmail("");
        setSenha("");
        const DadosUsuario = [
          dados.userEmail,
          dados.nome,
          dados.nascimento,
          dados.profissao,
          dados.cidade,
        ];
        localStorage.setItem("user", JSON.stringify(DadosUsuario));
        setTimeout(() => {
          navigate("/page-cliente");
        }, 1000);
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
