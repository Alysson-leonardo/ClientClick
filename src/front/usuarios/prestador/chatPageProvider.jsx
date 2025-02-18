import styles from "./chatPageProvider.module.css";
import { io } from "socket.io-client";
const token = localStorage.getItem("token");
const socket = io("http://localhost:8080", {
  query: { token },
});
import { useState, useEffect } from "react";
function ChatPageProvider() {
  const [conversasChat, setConversasChat] = useState([]);
  const [containerRender, setContainerRender] = useState(false);
  const [currentUserChat, setCurrentUserChat] = useState();
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
              <p>{conversa.cliente.nome}</p>
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
export default ChatPageProvider;
