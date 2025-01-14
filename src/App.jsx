// style
import "./App.css";
// componentes

import LandingPage from "./front/landingpage/landingPage";
import PaginaCliente from "./front/usuarios/Cliente/clientPage";
import PaginaPrestador from "./front/usuarios/prestador/prestadorPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// rotas landingopage

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/ClientClick" element={<LandingPage></LandingPage>}>
            <Route path="/ClientClick/loginClient"></Route>
            <Route path="/ClientClick/registerClient"></Route>
            <Route path="/ClientClick/loginPrestador"></Route>
            <Route path="/ClientClick/registerPrestador"></Route>
          </Route>
          <Route
            path="/ClientClick/pagina-cliente/*"
            element={<PaginaCliente />}
          />
          <Route
            path="/ClientClick/pagina-prestador"
            element={<PaginaPrestador></PaginaPrestador>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
