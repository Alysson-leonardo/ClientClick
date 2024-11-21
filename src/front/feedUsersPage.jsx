// react
import { useState } from "react";
// style
import styles from "./feedUsersPage.module.css";
// componentes
import CardUser from "../componentes/cardUser";

function FeedUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      nome: "joao",
      profissao: "eletricista",
      avaliacao: 4,
      num_servicos_feitos: 10,
      proximidade: 10,
    },
    {
      id: 2,
      nome: "maria",
      profissao: "programadora",
      avaliacao: 3,
      num_servicos_feitos: 14,
      proximidade: 15,
    },
    {
      id: 3,
      nome: "cleber",
      profissao: "apresentador",
      avaliacao: 4,
      num_servicos_feitos: 4,
      proximidade: 11,
    },
    {
      id: 4,
      nome: "joana",
      profissao: "açougueira",
      avaliacao: 3,
      num_servicos_feitos: 20,
      proximidade: 10,
    },
    {
      id: 5,
      nome: "dudu",
      profissao: "pamonheiro",
      avaliacao: 10,
      num_servicos_feitos: 100,
      proximidade: 2,
    },
    {
      id: 6,
      nome: "duda",
      profissao: "piao",
      avaliacao: 10,
      num_servicos_feitos: 100,
      proximidade: 2,
    },
    {
      id: 7,
      nome: "chuchu",
      profissao: "CEO",
      avaliacao: 10,
      num_servicos_feitos: 100,
      proximidade: 2,
    },
  ]);
  return (
    <div className={styles.userDiv}>
      <h1>Prestadores de serviços</h1>
      {users.map((user) => (
        <CardUser
          id={user.id}
          key={user.id}
          nome={user.nome}
          profissao={user.profissao}
          avaliacao={user.avaliacao}
          num_servicos_feitos={user.num_servicos_feitos}
          proximidade={user.proximidade}
        ></CardUser>
      ))}
    </div>
  );
}
export default FeedUsers;
