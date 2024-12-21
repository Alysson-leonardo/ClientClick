import style from "./loginClient.module.css";
import { Link } from "react-router-dom";
function RegisterClient() {
  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>Cadastro Cliente</h1>
        <button>
          <Link to="/registerPrestador">Botao</Link>
        </button>
      </div>
      <form className={style.form}>
        <label htmlFor="InameUser">Nome</label>
        <input
          type="text"
          name="userName"
          id="InameUser"
          placeholder="Primeiro nome"
        />
        <label htmlFor="IdtNasc">Data de nascimento</label>
        <input type="date" name="dtNascName" id="IdtNasc" />
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
        <label htmlFor="IsenhaCofirm">Senha</label>
        <input
          type="password"
          name="senhaCofirmName"
          id="IsenhaCofirm"
          placeholder="*****"
        />
      </form>
      <h2>
        Já tem uma conta? <Link to="/loginClient">Faça login</Link>
      </h2>
    </div>
  );
}
export default RegisterClient;
