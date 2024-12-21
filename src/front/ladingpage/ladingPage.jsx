import NavBar from "./navBar";
import LoginClient from "./loginClient";
import RegisterClient from "./registerClient";
import LoginPrestador from "./loginPrestador";
import RegisterPrestador from "./registerPrestador";
import style from "./ladingPage.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function LadingPage() {
  return (
    <Router>
      <div className={style.ladingpage}>
        <NavBar
          loginLink={"/loginClient"}
          registerLink={"/registerClient"}
        ></NavBar>
        <div className={style.container}>
          <Routes>
            <Route path="/loginClient" element={<LoginClient />}></Route>
            <Route path="/registerClient" element={<RegisterClient />}></Route>
            <Route path="/loginPrestador" element={<LoginPrestador />}></Route>
            <Route
              path="/registerPrestador"
              element={<RegisterPrestador />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default LadingPage;
