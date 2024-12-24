import style from "./loginClient.module.css";
import { Link } from "react-router-dom";
function LoginPrestador() {
  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>Login Prestador</h1>
        <button>
          <Link to="/loginClient">Botao</Link>
        </button>
      </div>
      <form className={style.form}>
        <label htmlFor="Iemail">Email</label>
        <input
          type="email"
          name="emailName"
          id="Iemail"
          placeholder="exemplo@gmail.com"
        />
        <label htmlFor="Isenha">Senha</label>
        <input
          type="password"
          name="senhaName"
          id="Isenha"
          placeholder="*****"
        />
      </form>
      <h2>
        Não possui uma conta? <Link to="/registerPrestador">Cadastra-se</Link>
      </h2>
    </div>
  );
}
export default LoginPrestador;
