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
          <Route path="/" element={<LandingPage></LandingPage>}>
            <Route path="/loginClient"></Route>
            <Route path="/registerClient"></Route>
            <Route path="/loginPrestador"></Route>
            <Route path="/registerPrestador"></Route>
          </Route>
          <Route path="/pagina-cliente/*" element={<PaginaCliente />} />
          <Route
            path="pagina-prestador"
            element={<PaginaPrestador></PaginaPrestador>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
