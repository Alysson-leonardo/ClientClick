import style from "./registerClient.module.css";
import { Link } from "react-router-dom";
function RegisterPrestador() {
  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>Cadastro prestador</h1>
        <button>
          <Link to="/registerClient">Botao</Link>
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
        <select name="professionName" id="">
          <option value="">Seleciona uma profissão</option>
          <option value="encanador" name="professionName">
            Encanador
          </option>
          <option value="eletricista" name="professionName">
            eletricista
          </option>
          <option value="mecanico" name="professionName">
            mecanico
          </option>
          <option value="motoboy" name="professionName">
            motoboy
          </option>
          <option value="faxineira" name="professionName">
            faxineira
          </option>
        </select>
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
          placeholder="*******"
        />
        <label htmlFor="IsenhaCofirm">Senha</label>
        <input
          type="password"
          name="senhaCofirmName"
          id="IsenhaCofirm"
          placeholder="*******"
        />
      </form>
      <h2>
        Já possui uma conta? <Link to="/loginPrestador">Faça login</Link>
      </h2>
    </div>
  );
}
export default RegisterPrestador;
