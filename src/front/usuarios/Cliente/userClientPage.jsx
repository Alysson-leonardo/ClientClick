import styles from "./userClientPage.module.css";
import { Link, useNavigate } from "react-router-dom";

function UserPage({ isDesktop, dados }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("clicou no botão");
    const userLogout = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    const response = await userLogout.json();
    console.log(response.message);
    if (response.ok) {
      alert(response.message);
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/"), 2000;
      });
    }
  };
  return (
    <div className={isDesktop ? styles.userDivDesktop : styles.userDivMobile}>
      <div className={isDesktop ? styles.topUserDesktop : styles.topUserMobile}>
        <img src="" alt="" />
        <div>
          <h2 className={isDesktop ? "" : styles.textMobile}>{dados.nome}</h2>
          <div>
            <p>{dados.id}</p>
            <p>{dados.nascimento.slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <hr className={isDesktop ? "" : styles.hrcolor} />
      <div className={isDesktop ? styles.midUserDesktop : styles.midUserMobile}>
        <Link to={`/page-cliente/${dados.id}`}>home</Link>
        <Link to={`/page-cliente/${dados.id}/criar-pedido`}>criar pedido</Link>
        <p>Pedidos</p>
      </div>
      <hr />
      <div
        className={
          isDesktop ? styles.bottomUserDesktop : styles.bottomUserMobile
        }
      >
        <p>configurações</p>
        <button onClick={handleLogout} className={styles.buttonLogout}>
          sair
        </button>
      </div>

      <div
        className={
          isDesktop ? styles.buttonUserDesktop : styles.buttonUserMobile
        }
      >
        <hr />
        <button>
          <Link to={`/page-cliente/${dados.id}/`}>Feed</Link>
        </button>
        <button>
          <Link to={`/page-cliente/${dados.id}/chat`}>Chat</Link>
        </button>
      </div>
    </div>
  );
}
export default UserPage;
