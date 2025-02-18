import styles from "./chatPageClient.module.css";
import { useState, useEffect } from "react";
function ChatPageClient() {
  const [conversasChat, setConversasChat] = useState([]);
  const [containerRender, setContainerRender] = useState(false);
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
  function renderChat() {
    setContainerRender(true);
  }
  function desrenderChat() {
    setContainerRender(false);
  }

  return (
    <div className={styles.userDiv}>
      <div className={styles.listchat}>
        {conversasChat.map((conversa) => {
          return (
            <button
              key={conversa.id_conversa}
              onClick={renderChat}
              className={styles.buttonUser}
            >
              <p>{conversa.prestador.nome_prestador}</p>
            </button>
          );
        })}
      </div>
      {containerRender ? (
        <div className={styles.chatContainer}>
          <div className={styles.close}>
            <button onClick={desrenderChat}>X</button>
          </div>
          <div className={styles.chat}>sala de conversa</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default ChatPageClient;
