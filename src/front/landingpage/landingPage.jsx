//componentes
import NavBar from "./navBar";
import LoginClient from "./loginClient";
import RegisterClient from "./registerClient";
import LoginPrestador from "./loginPrestador";
import RegisterPrestador from "./registerPrestador";
//estulização
import style from "./landingPage.module.css";
//rotas
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// useState

function LandingPage({ isDesktop }) {
  return (
    <div
      className={isDesktop ? style.ladingpageDesktop : style.ladingpageMobile}
    >
      <NavBar
        loginLink={"/loginClient"}
        registerLink={"/registerClient"}
        isDesktop={isDesktop}
      ></NavBar>
      <div className={isDesktop ? style.container : style.containerMobile}>
        <Routes>
          <Route path="/" element={<LoginClient />}></Route>
          <Route path="/loginClient" element={<LoginClient />}></Route>
          <Route path="/registerClient" element={<RegisterClient />}></Route>
          <Route path="/loginProvider" element={<LoginPrestador />}></Route>
          <Route
            path="/registerProvider"
            element={<RegisterPrestador />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
export default LandingPage;
