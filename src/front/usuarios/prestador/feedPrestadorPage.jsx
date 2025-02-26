import styles from "./feedPrestadorPage.module.css";
import CardUserProvider from "../../../componentes/cardUserProvider";
import ButtonCreateChat from "./componentePrestador/buttonCreateChat";
import { useState, useEffect } from "react";
function FeedPrestadorPage() {
  const [userPedidos, setUserPedidos] = useState([]);
  useEffect(() => {
    const buscar = async () => {
      const pedidos = await fetch("http://localhost:8080/getpedidos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await pedidos.json();
      if (response.ok) {
        setUserPedidos(response.listPedidos);
      }
    };
    buscar();
  }, []);
  return (
    <div className={styles.userDiv}>
      <h1>Pedidos</h1>
      {userPedidos.map((user) => (
        <div className={styles.card}>
          <CardUserProvider
            id={user.id_pedido}
            key={user.id_pedido}
            nome={user.cliente.nome}
            servico={user.nome_pedido}
            valorMax={user.valor_pedido}
            cidade={user.cliente.cidade}
          ></CardUserProvider>
          <ButtonCreateChat
            nomeBotao={"Conversar"}
            id={user.clienteId}
            user={"prestador"}
          ></ButtonCreateChat>
        </div>
      ))}
    </div>
  );
}
export default FeedPrestadorPage;
