// react
import { useState } from "react";
// style
import styles from "./feedClientPage.module.css";
// componentes
import CardUser from "../../../componentes/cardUser";
import { useEffect } from "react";

function FeedUsers() {
  const [providers, setProviders] = useState([]);
  const [cidadeFilter, setCidadeFilter] = useState("");
  const [profissaoFilter, setProfissaoFilter] = useState("");
  const [cidadeOpcao, setCidadeOpcao] = useState("");
  const [profissaoOpcao, setProfissaoOpcao] = useState("");

  const filterProviders = (e) => {
    e.preventDefault();
    setCidadeFilter(cidadeOpcao);
    setProfissaoFilter(profissaoOpcao);
  };
  useEffect(() => {
    const getAllProviders = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getProviders?cidade=${cidadeFilter}&profissao=${profissaoFilter}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        const allprovidersObj = await response.json();
        if (!response.ok) {
          console.log("erro ao buscar!");
        }
        console.log(allprovidersObj);
        setProviders(allprovidersObj.respProviders);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProviders();
  }, [cidadeFilter, profissaoFilter]);

  return (
    <div className={styles.userDiv}>
      <h1>Prestadores de serviços</h1>
      <div className={styles.filterform}>
        <form onSubmit={filterProviders}>
          <div className={styles.proffield}>
            <label htmlFor="filterProfName">Profissao: </label>
            <select
              name="filterProfName"
              id="IfilterProf"
              onChange={(e) => setProfissaoOpcao(e.target.value)}
              value={profissaoOpcao}
            >
              <option value={""}>todas</option>
              <option value="Cabeleireira">Cabeleireira</option>
              <option value="Eletricista">eletricista</option>
              <option value="Encanadora">Encanadora</option>
              <option value="Pintor">pintor</option>
              <option value="Pedreiro">pedreiro</option>
            </select>
          </div>
          <div className={styles.cityfield}>
            <label htmlFor="filterCidadeName">Cidade: </label>
            <select
              name="filterCidadeName"
              id="IfilterCidade"
              onChange={(e) => setCidadeOpcao(e.target.value)}
              value={cidadeOpcao}
            >
              <option value={""}>todas</option>
              <option value="paranoa">paranoa</option>
              <option value="itapoa">itapoa</option>
              <option value="estrutural">estrutural</option>
              <option value="bandeirante">bandeirante</option>
            </select>
          </div>
          <button type="submit">procurar</button>
        </form>
      </div>
      {!providers ? (
        <p>Nenhum prestador encontrado!</p>
      ) : (
        providers.map((provider) => (
          <CardUser
            id={provider.id_prestador}
            key={provider.id_prestador}
            nome={provider.nome_prestador}
            profissao={provider.profissao_prestador}
            cidade={provider.cidade_prestador}
          ></CardUser>
        ))
      )}
    </div>
  );
}
export default FeedUsers;
