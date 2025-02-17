import styles from "./feedPrestadorPage.module.css";
import CardUserProvider from "../../../componentes/cardUserProvider";
import ButtonCreateChat from "./componentePrestador/buttonCreateChat";
import { useState } from "react";
function FeedPrestadorPage() {
  const [prestadores, setPrestadores] = useState([
    {
      id: 1,
      nome: "joao",
      servico: "trocar chuveiro",
      valorMax: 150,

      cidade: "paranoa",
    },
    {
      id: 2,
      nome: "pablo",
      servico: "limpeza",
      valorMax: 100,

      cidade: "paranoa",
    },
    {
      id: 3,
      nome: "gabriel",
      servico: "tatto",
      valorMax: 500,

      cidade: "paranoa",
    },
    {
      id: 4,
      nome: "mari",
      servico: "pintar o cabelo",
      valorMax: 155,

      cidade: "paranoa",
    },
    {
      id: 5,
      nome: "fernanda",
      servico: "manicure",
      valorMax: 60,

      cidade: "paranoa",
    },
    {
      id: 6,
      nome: "geovanna",
      servico: "faxina",
      valorMax: 100,

      cidade: "paranoa",
    },
    {
      id: 7,
      nome: "cleber",
      servico: "vazamento de agua",
      valorMax: 100,

      cidade: "paranoa",
    },
  ]);
  return (
    <div className={styles.userDiv}>
      <h1>Serviços</h1>
      {prestadores.map((user) => (
        <div>
          <CardUserProvider
            id={user.id}
            key={user.id}
            nome={user.nome}
            servico={user.servico}
            valorMax={user.valorMax}
            cidade={user.cidade}
          ></CardUserProvider>
          <ButtonCreateChat
            nomeBotao={"Conversar"}
            dados={user}
          ></ButtonCreateChat>
        </div>
      ))}
    </div>
  );
}
export default FeedPrestadorPage;
