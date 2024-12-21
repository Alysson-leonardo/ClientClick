import style from "./navBar.module.css";
import { Link } from "react-router-dom";
function NavBar({ loginLink, registerLink }) {
  return (
    <div className={style.navbar}>
      <h1>Pagina inicial</h1>
      <ul className={style.lista}>
        <li>
          <Link to={loginLink}>Login</Link>
        </li>
        <li>
          <Link to={registerLink}>Cadastro</Link>
        </li>
        <li>Sobre</li>
      </ul>
    </div>
  );
}
export default NavBar;
