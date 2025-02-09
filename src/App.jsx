// style
import "./App.css";
// componentes

import LandingPage from "./front/landingpage/landingPage";
import PaginaCliente from "./front/usuarios/Cliente/clientPage";
import PaginaPrestador from "./front/usuarios/prestador/prestadorPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// rotas landingpage
import { useState, useEffect } from "react";
function App() {
  const id = 11;
  const [isDesktop, setisDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setisDesktop(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<LandingPage isDesktop={isDesktop}></LandingPage>}
          >
            <Route path="/loginClient"></Route>
            <Route path="/registerClient"></Route>
            <Route path="/loginProvider"></Route>
            <Route path="/registerProvider"></Route>
          </Route>
          <Route
            path={`/page-cliente/:${id}?/*`}
            element={<PaginaCliente isDesktop={isDesktop} />}
          />
          <Route
            path="page-Provider"
            element={<PaginaPrestador></PaginaPrestador>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
