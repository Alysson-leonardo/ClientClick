import style from "./clientPage.module.css";
import UserPage from "./userClientPage";
import FeedUsers from "./feedClientPage";
import ChatPageClient from "./chatPageClient";
import FeedChat from "./feed&chat";
import ServiceClient from "./componenteCliente/serviceClient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
function PaginaCliente({ isDesktop }) {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = async () => {
      try {
        const getUser = await fetch(`http://localhost:8080/auth-client/`, {
          method: "GET",
          credentials: "include",
        });
        const respGetUser = await getUser.json();
        if (respGetUser.ok) {
          const DadosUsuario = {
            id: respGetUser.id,
            nome: respGetUser.nome,
            nascimento: respGetUser.nascimento,
          };
          localStorage.setItem("user", JSON.stringify(DadosUsuario));
        } else {
          if (respGetUser.message == "acesso negado!") {
            setTimeout(() => {
              navigate("/loginClient");
            }, 3000);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    auth();
  }, []);
  const userDados = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : { nome: "nome", nascimento: "idade", id: "id" };
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
