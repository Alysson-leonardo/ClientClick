import NavBar from "./navBar";
import LoginClient from "./loginClient";
import RegisterClient from "./registerClient";
import LoginPrestador from "./loginPrestador";
import RegisterPrestador from "./registerPrestador";
import style from "./landingPage.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className={style.ladingpage}>
      <NavBar
        loginLink={"/ClientClick/loginClient"}
        registerLink={"/ClientClick/registerClient"}
      ></NavBar>
      <div className={style.container}>
        <Routes>
          <Route path="/ClientClick" element={<LoginClient />}></Route>
          <Route
            path="/ClientClick/loginClient"
            element={<LoginClient />}
          ></Route>
          <Route
            path="/ClientClick/registerClient"
            element={<RegisterClient />}
          ></Route>
          <Route
            path="/ClientClick/loginPrestador"
            element={<LoginPrestador />}
          ></Route>
          <Route
            path="/ClientClick/registerPrestador"
            element={<RegisterPrestador />}
          ></Route>
          <Route>prestador</Route>
        </Routes>
      </div>
    </div>
  );
}
export default LandingPage;
