import style from "./prestadorPage.module.css";
import UserPrestadorPage from "./userPrestadorPage";
import FeedPrestadorPage from "./feedPrestadorPage";
import ChatPage from "../Cliente/chatPage";
import FeedChatPrestador from "./feed&chatPrestador";
import { Routes, Route } from "react-router-dom";
function PaginaPrestador({ isDesktop }) {
  const userDados = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={style.container}>
      <UserPrestadorPage
        dados={userDados}
        isDesktop={isDesktop}
      ></UserPrestadorPage>
      <div className={style.subcontainer}>
        <Routes>
          {isDesktop ? (
            <>
              <Route
                path="/"
                element={<FeedChatPrestador></FeedChatPrestador>}
              ></Route>
              <Route
                path="/configuracoes"
                element={<ChatPage></ChatPage>}
              ></Route>
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<FeedPrestadorPage></FeedPrestadorPage>}
              ></Route>
              <Route path="/chat" element={<ChatPage></ChatPage>}></Route>
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
export default PaginaPrestador;
