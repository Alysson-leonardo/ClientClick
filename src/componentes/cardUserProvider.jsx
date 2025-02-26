import styles from "./cardUser.module.css";
function CardUserProvider({ id, nome, servico, cidade, valorMax }) {
  return (
    <div id={id} className={styles.card}>
      <h2>{nome}</h2>
      <div>
        <h2>{cidade}</h2>
        <p>{servico}</p>
        <img src="" alt="icone-servico" />
      </div>
      <div>
        <h2>{valorMax}</h2>
      </div>
    </div>
  );
}
export default CardUserProvider;
