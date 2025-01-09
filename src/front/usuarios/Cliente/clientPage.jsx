import style from "./clientPage.module.css";
import UserPage from "./userClientPage";
import FeedUsers from "./feedClientPage";
import ChatPage from "./chatPage";
function PaginaCliente() {
  return (
    <div className={style.container}>
      <UserPage />
      <FeedUsers />
      <ChatPage />
    </div>
  );
}
export default PaginaCliente;
