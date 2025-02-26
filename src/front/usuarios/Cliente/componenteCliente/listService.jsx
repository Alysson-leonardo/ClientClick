import style from "./serviceClient.module.css";
import CardUserProvider from "../../../../componentes/cardUserProvider";
import { useState, useEffect } from "react";
function ListServices() {
  const user = JSON.parse(localStorage.getItem("user") || {});
  const id = user?.id;
  console.log(id);
  const [userPedidos, setUserPedidos] = useState([]);
  useEffect(() => {
    const buscar = async () => {
      const pedidos = await fetch(`http://localhost:8080/getpedidos?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const response = await pedidos.json();
      if (response.ok) {
        setUserPedidos(response.listPedidos);
      }
    };
    buscar();
  }, [id]);
  return (
    <div className={style.container}>
      {userPedidos.map((pedidos) => (
        <div className={style.card}>
          <CardUserProvider
            id={pedidos.id_pedido}
            key={pedidos.id_pedido}
            nome={pedidos.cliente.nome}
            servico={pedidos.nome_pedido}
            valorMax={pedidos.valor_pedido}
            cidade={pedidos.cliente.cidade}
          ></CardUserProvider>
          <button>editar</button>
          <button>deletar</button>
        </div>
      ))}
    </div>
  );
}
export default ListServices;
