import style from "./clientPage.module.css";
import UserPage from "./userClientPage";
import FeedUsers from "./feedClientPage";
import ChatPage from "./chatPage";
import FeedChat from "./feed&chat";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function PaginaCliente() {
  return (
    <div className={style.container}>
      <UserPage />
      <div className={style.subcontainer}>
        <Routes>
          <Route path="/ClientClick" element={<FeedChat></FeedChat>}></Route>
          <Route path="configuracoes" element={<ChatPage></ChatPage>}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default PaginaCliente;
