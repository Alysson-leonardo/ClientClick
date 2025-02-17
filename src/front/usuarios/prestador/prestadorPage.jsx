import style from "./prestadorPage.module.css";
import UserPrestadorPage from "./userPrestadorPage";
import FeedPrestadorPage from "./feedPrestadorPage";
import ChatPageProvider from "./chatPageProvider";
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
                element={<ChatPageProvider></ChatPageProvider>}
              ></Route>
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<FeedPrestadorPage></FeedPrestadorPage>}
              ></Route>
              <Route
                path="/chat"
                element={<ChatPageProvider></ChatPageProvider>}
              ></Route>
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
export default PaginaPrestador;
