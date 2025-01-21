import style from "./clientPage.module.css";
import UserPage from "./userClientPage";
import FeedUsers from "./feedClientPage";
import ChatPage from "./chatPage";
import FeedChat from "./feed&chat";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function PaginaCliente({ isDesktop }) {
  return (
    <div className={style.container}>
      <UserPage isDesktop={isDesktop} />
      <div className={style.subcontainer}>
        <Routes>
          {isDesktop ? (
            <>
              <Route path="/" element={<FeedChat></FeedChat>}></Route>
              <Route
                path="configuracoes"
                element={<ChatPage></ChatPage>}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<FeedUsers></FeedUsers>}></Route>
              <Route path="/feed" element={<FeedUsers></FeedUsers>}></Route>
              <Route path="/chat" element={<ChatPage></ChatPage>}></Route>
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
export default PaginaCliente;
