import styles from "./cardUser.module.css";
function CardUser({ id, nome, profissao, cidade }) {
  return (
    <div id={id} className={styles.card}>
      <h2>{nome}</h2>
      <div>
        <h2>{profissao}</h2>

        <img src="" alt="icone-profissão" />
      </div>
      <div>
        <p>{cidade}</p>
      </div>
    </div>
  );
}
export default CardUser;
