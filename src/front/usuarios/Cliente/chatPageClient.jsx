import styles from "./chatPageClient.module.css";
import { io } from "socket.io-client";
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id || null;
const socket = io("http://localhost:3030", {
  transports: ["websocket"],
});
import { useState, useEffect } from "react";
function ChatPageClient() {
  const [conversasChat, setConversasChat] = useState([]);
  const [containerRender, setContainerRender] = useState(false);
  const [currentUserChat, setCurrentUserChat] = useState();
  const [currentRoom, setCurrentRoom] = useState();
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [mensagensBackup, setMensagensBackup] = useState({
    prestador: [],
    cliente: [],
  });
  useEffect(() => {
    async function buscarConversas() {
      const busca = await fetch(
        "http://localhost:8080/searchChat?user=cliente",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
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
  function renderChat(id_prestador, id_user) {
    setMensagens([]);
    const sala = [id_prestador, id_user].sort().join("_");
    setCurrentRoom(sala);
    setCurrentUserChat(id_prestador);
    socket.emit("entrar_sala", {
      currentRoom: sala,
    });
    setContainerRender(true);
  }
  function desrenderChat() {
    setContainerRender(false);
    setMensagens([]);
  }
  const enviarMensagem = (e) => {
    e.preventDefault();
    if (mensagem.trim()) {
      socket.emit("mensagem_sala", { currentRoom, mensagem, user: "cliente" });
      setMensagem("");
    }
  };
  useEffect(() => {
    const handleNovaMensagem = (msg, user) => {
      setMensagensBackup((currentMensagens) => ({
        ...currentMensagens,
        [user]: [...currentMensagens[user], msg],
      }));
      setMensagens((currentMensagens) => [...currentMensagens, [user, msg]]);
    };

    socket.on("mensagem_sala", handleNovaMensagem);
    return () => {
      socket.off("mensagem_sala", handleNovaMensagem);
    };
  }, []);

  return (
    <div className={styles.userDiv}>
      <div className={styles.listchat}>
        {conversasChat.map((conversa) => {
          return (
            <button
              key={conversa.id_conversa}
              onClick={() => renderChat(conversa.id_prestador_conversa, userId)}
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
          <div className={styles.chat}>
            <div className={styles.messages}>
              {mensagens.map(([remetente, texto], index) =>
                remetente == "prestador" ? (
                  <p key={index} className={styles.prestadorMessage}>
                    <strong> {remetente}:</strong>
                    {texto}
                  </p>
                ) : (
                  <p key={index} className={styles.clienteMessage}>
                    {texto} <strong> :{remetente}</strong>
                  </p>
                )
              )}
            </div>
            <div className={styles.submit}>
              <form onSubmit={enviarMensagem}>
                <input
                  type="text"
                  value={mensagem}
                  onChange={(e) => {
                    setMensagem(e.target.value);
                  }}
                  required
                />
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default ChatPageClient;
