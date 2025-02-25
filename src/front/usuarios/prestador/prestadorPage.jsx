import style from "./prestadorPage.module.css";
import UserPrestadorPage from "./userPrestadorPage";
import FeedPrestadorPage from "./feedPrestadorPage";
import ChatPageProvider from "./chatPageProvider";
import FeedChatPrestador from "./feed&chatPrestador";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function PaginaPrestador({ isDesktop }) {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = async () => {
      try {
        const getUserProvider = await fetch(
          `http://localhost:8080/auth-provider`,
          { method: "GET", credentials: "include" }
        );
        const respGetUserProvider = await getUserProvider.json();
        if (respGetUserProvider.ok) {
          const dadosPrestador = {
            id: respGetUserProvider.id,
            nome: respGetUserProvider.nome,
            profissao: respGetUserProvider.profissao,
            cidade: respGetUserProvider.cidade,
            nascimento: respGetUserProvider.nascimento,
          };
          localStorage.setItem("user", JSON.stringify(dadosPrestador));
          alert(respGetUserProvider.message);
        } else {
          if (respGetUserProvider.message == "acesso negado!") {
            setTimeout(() => {
              navigate("/");
            }, 1000);
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
