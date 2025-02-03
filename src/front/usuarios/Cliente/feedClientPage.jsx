// react
import { useState } from "react";
// style
import styles from "./feedClientPage.module.css";
// componentes
import CardUser from "../../../componentes/cardUser";
import { useEffect } from "react";
import { allProviders } from "../../../backend/prismaServices";

function FeedUsers() {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    const getAllProviders = async () => {
      try {
        const response = await fetch("http://localhost:8080/getProviders", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          console.log("erro ao buscar!");
        }
        const allproviders = await response.json();
        console.log(allproviders);
        setProviders(allproviders);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProviders();
  }, []);

  return (
    <div className={styles.userDiv}>
      <h1>Prestadores de serviços</h1>
      {providers.map((provider) => (
        <CardUser
          id={provider.id_prestador}
          key={provider.id_prestador}
          nome={provider.nome_prestador}
          profissao={provider.profissao_prestador}
          cidade={provider.cidade_prestador}
        ></CardUser>
      ))}
    </div>
  );
}
export default FeedUsers;
