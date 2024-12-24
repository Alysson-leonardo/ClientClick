import style from "./prestadorPage.module.css";
import UserPrestadorPage from "./userPrestadorPage";
import FeedPrestadorPage from "./feedPrestadorPage";
import ChatPage from "../Cliente/chatPage";
function PaginaPrestador() {
  return (
    <div className={style.container}>
      <UserPrestadorPage></UserPrestadorPage>
      <FeedPrestadorPage></FeedPrestadorPage>
      <ChatPage></ChatPage>
    </div>
  );
}
export default PaginaPrestador;
