import style from "./feedPrestadorPage.module.css";
import FeedPrestadorPage from "./feedPrestadorPage";
import ChatPage from "../Cliente/chatPage";
function FeedChatPrestador() {
  return (
    <>
      <FeedPrestadorPage></FeedPrestadorPage>
      <ChatPage></ChatPage>
    </>
  );
}
export default FeedChatPrestador;
