import style from "./clientPage.module.css";
import UserPage from "./userClientPage";
import FeedUsers from "./feedClientPage";
import ChatPageClient from "./chatPageClient";
import FeedChat from "./feed&chat";
import ServiceClient from "./componenteCliente/serviceClient";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
function PaginaCliente({ isDesktop }) {
  const userDados = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={style.container}>
      <UserPage isDesktop={isDesktop} dados={userDados} />
      <div className={style.subcontainer}>
        <Routes>
          {isDesktop ? (
            <>
              <Route path="/" element={<FeedChat></FeedChat>}></Route>
              <Route
                path="/criar-pedido"
                element={<ServiceClient dados={userDados}></ServiceClient>}
              ></Route>
              <Route
                path="/configuracoes"
                element={<ChatPageClient></ChatPageClient>}
              ></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<FeedUsers></FeedUsers>}></Route>
              <Route
                path="/chat"
                element={<ChatPageClient></ChatPageClient>}
              ></Route>
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
export default PaginaCliente;
