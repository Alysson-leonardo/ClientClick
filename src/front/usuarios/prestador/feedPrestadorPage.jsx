import styles from "./feedPrestadorPage.module.css";
import CardUser from "../../../componentes/cardUser";
import { useState } from "react";
function FeedPrestadorPage() {
  const [prestadores, setPrestadores] = useState([
    {
      id: 1,
      nome: "joao",
      servico: "trocar chuveiro",
      valor_maximo: 150,
      proximidade: 12,
    },
    {
      id: 2,
      nome: "pablo",
      servico: "limpeza",
      valor_maximo: 100,
      proximidade: 5,
    },
    {
      id: 3,
      nome: "gabriel",
      servico: "tatto",
      valor_maximo: 500,
      proximidade: 11,
    },
    {
      id: 4,
      nome: "mari",
      servico: "pintar o cabelo",
      valor_maximo: 155,
      proximidade: 2,
    },
    {
      id: 5,
      nome: "fernanda",
      servico: "manicure",
      valor_maximo: 60,
      proximidade: 40,
    },
    {
      id: 6,
      nome: "geovanna",
      servico: "faxina",
      valor_maximo: 100,
      proximidade: 10,
    },
    {
      id: 7,
      nome: "cleber",
      servico: "vazamento de agua",
      valor_maximo: 100,
      proximidade: 8,
    },
  ]);
  return (
    <div className={styles.userDiv}>
      <h1>Serviços</h1>
      {prestadores.map((user) => (
        <CardUser
          id={user.id}
          key={user.id}
          nome={user.nome}
          servico={user.servico}
          valor_maximo={user.valor_maximo}
          proximidade={user.proximidade}
        ></CardUser>
      ))}
    </div>
  );
}
export default FeedPrestadorPage;
