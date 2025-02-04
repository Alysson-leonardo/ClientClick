import styles from "./userClientPage.module.css";
import { Link } from "react-router-dom";
function UserPage({ isDesktop }) {
  return (
    <div className={isDesktop ? styles.userDivDesktop : styles.userDivMobile}>
      <div className={isDesktop ? styles.topUserDesktop : styles.topUserMobile}>
        <img src="" alt="" />
        <div>
          <h2 className={isDesktop ? "" : styles.textMobile}>nome</h2>
          <div>
            <p>cpf</p>
          </div>
        </div>
      </div>
      <hr className={isDesktop ? "" : styles.hrcolor} />
      <div className={isDesktop ? styles.midUserDesktop : styles.midUserMobile}>
        <p>Agendamentos</p>
        <p>Contratos de serviços</p>
        <p>Pedidos</p>
      </div>
      <hr />
      <div
        className={
          isDesktop ? styles.bottomUserDesktop : styles.bottomUserMobile
        }
      >
        <p>configurações</p>
        <p>acessibilidade</p>
      </div>

      <div
        className={
          isDesktop ? styles.buttonUserDesktop : styles.buttonUserMobile
        }
      >
        <hr />
        <button>
          <Link to="/pagina-cliente/feed">Feed</Link>
        </button>
        <button>
          <Link to={"/pagina-cliente/chat"}>Chat</Link>
        </button>
      </div>
    </div>
  );
}
export default UserPage;
