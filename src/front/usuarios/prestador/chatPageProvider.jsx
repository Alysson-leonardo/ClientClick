import styles from "./chatPageProvider.module.css";
import { io } from "socket.io-client";
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;
const socket = io("http://localhost:3030", {
  transports: ["websocket"],
});
import { useState, useEffect } from "react";
function ChatPageProvider() {
  const [conversasChat, setConversasChat] = useState([]);
  const [containerRender, setContainerRender] = useState(false);
  const [currentUserChat, setCurrentUserChat] = useState();
  const [currentRoom, setCurrentRoom] = useState();
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
  function renderChat(id_cliente, id_user) {
    console.log(id_cliente, "id cliente do render chat");
    console.log(id_user, "id user do render chat");
    setCurrentRoom([id_cliente, id_user].sort().join("_"));
    setCurrentUserChat(id_cliente);
    socket.emit("entrar_sala", {
      id_cliente,
      id_user,
    });
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
              onClick={() => renderChat(conversa.id_cliente_conversa, userId)}
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
          <div className={styles.chat}>
            <p>sala: {currentRoom}</p>
            <p>clinte: {currentUserChat}</p>
            <p>usuario: {userId}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default ChatPageProvider;
