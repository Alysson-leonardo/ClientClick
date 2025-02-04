import { useState } from "react";
import style from "./registerClient.module.css";
import { Link, useNavigate } from "react-router-dom";

function RegisterPrestador() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState();
  const [profissao, setProfissao] = useState("");
  const [cidade, setCidade] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaCor, setsenhaCor] = useState("black");
  const [senhaMensagem, setsenhaMensagem] = useState("Senha: ");

  const [senhaCofirm, setSenhaCofirm] = useState("");
  const [senhaCCor, setsenhaCCor] = useState("black");
  const [senhaCMensagem, setsenhaCMensagem] = useState("Senha: ");

  const [validSenha, setvalidSenha] = useState(true);
  const [mensagem, setMensagem] = useState("");

  // validação da senha
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

    if (senha == senhaCofirm) {
      setMensagem("As senhas coincidem!");
      setvalidSenha(true);
      try {
        const response = await fetch(
          "http://localhost:8080/cadastroPrestador",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome,
              dataNasc,
              profissao,
              cidade,
              email,
              senha,
              senhaCofirm,
            }),
          }
        );
        const dados = await response.json();
        if (response.ok) {
          setMensagem(dados.message);
          setNome("");
          setDataNasc("");
          setProfissao("");
          setCidade("");
          setEmail("");
          setSenha("");
          setSenhaCofirm("");
          setTimeout(() => {
            navigate("/loginProvider");
          }, 2000);
        } else {
          alert(dados.error);
        }
      } catch (error) {
        setMensagem("Erro ao enviar os dados!", error);
      }
    } else {
      setMensagem("As senhas não coincidem!");
      setvalidSenha(false);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.cabecalho}>
        <h1>
          Cadastro <b>prestador</b>
        </h1>
        <button>
          <Link to="/registerClient">
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
          onChange={(e) => setDataNasc(e.target.value)}
          value={dataNasc}
          required
        />
        <label htmlFor="professionName">Profissão</label>
        <select
          name="professionName"
          id="Iprofession"
          value={profissao}
          onChange={(e) => setProfissao(e.target.value)}
          required
        >
          <option value="">Seleciona uma profissão</option>
          <option value="encanador">Encanador</option>
          <option value="eletricista">eletricista</option>
          <option value="mecanico">mecanico</option>
          <option value="motoboy">motoboy</option>
          <option value="faxineira">faxineira</option>
        </select>
        <label htmlFor="cidadeName">Profissão</label>
        <select
          name="cidadeName"
          id="Icidadae"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        >
          <option value="">Cidade</option>
          <option value="Paranoa">Paranoa</option>
          <option value="Itapoa">Itapoã</option>
          <option value="brasilia">brasilia</option>
          <option value="estrutural">estrutural</option>
          <option value="bandeirante">bandeirante</option>
          <option value="brazlandia">brazlandia</option>
          <option value="sobradinho_2">sobradinho 2</option>
          <option value="Sao_sebastiao">São sebastião</option>
        </select>
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
          placeholder="confirme a senha"
          value={senhaCofirm}
          onChange={statusSenhaCofirm}
          minLength={8}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {<p style={{ color: validSenha ? "greenyellow" : "red" }}>{mensagem}</p>}
      <h2>
        Já possui uma conta? <Link to="/loginProvider">Faça login</Link>
      </h2>
    </div>
  );
}

export default RegisterPrestador;
