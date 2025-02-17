import styles from "./chatPageProvider.module.css";
import { useState, useEffect } from "react";
function ChatPageProvider() {
  const [conversasChat, setConversasChat] = useState([]);
  useEffect(() => {
    async function buscarConversas() {
      const busca = await fetch("http://localhost:8080/searchChat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const conversas = await busca.json();
      if (conversas.ok) {
        console.log(conversas.listConversas);
        setConversasChat(conversas.listConversas);
      } else {
        alert(conversas.message);
      }
    }
    buscarConversas();
  }, []);
  return (
    <div className={styles.userDiv}>
      <ul>
        {conversasChat.map((conversa) => {
          return (
            <li className={styles.conversas} key={conversa.id_conversa}>
              {conversa.cliente.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ChatPageProvider;
