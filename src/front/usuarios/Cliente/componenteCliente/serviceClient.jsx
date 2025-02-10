import style from "./serviceClient.module.css";
import { useState, useEffect } from "react";
function ServiceClient() {
  const [service, setService] = useState("");
  const [valueMax, setValueMax] = useState("");
  useEffect(() => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const criarPedido = await fetch("http://localhost:8080/createService", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        credentials: "include",
      });
      const response = await criarPedido.json();
      if (response.ok) {
        alert(response.message);
      }
    };
  }, []);
  return (
    <div className={style.container}>
      <div className={style.cabecalho}>
        <p>nome</p>
        <p>cidade</p>
      </div>
      <div>
        <form className={style.form}>
          <label htmlFor="">
            Servico:
            <select
              name="serviceName"
              id="Iservice"
              onChange={(e) => setService(e.target.value)}
              required
            >
              <option value="Encanamento">Encanamento</option>
              <option value="Montagem">Montagem de móveis</option>
              <option value="Tatto">Tatto</option>
              <option value="faxina">faxina</option>
              <option value="Conserto">Conserto de celular</option>
              <option value="Afiação">Afiação</option>
            </select>
          </label>
          <p>
            Por favor coloque o valor máximo que está disposto a pagar pelo
            serviço
          </p>

          <label htmlFor="valueMaxName">
            Valor maximo R$:
            <input
              type="number"
              name="valueMaxName"
              onChange={(e) => setValueMax(e.target.value)}
            />
          </label>
          <button type="submit">Criar pedido</button>
        </form>
      </div>
    </div>
  );
}
export default ServiceClient;
