import styles from "./cardUser.module.css";
function CardUser({
  id,
  nome,
  profissao,
  avaliacao,
  num_servicos_feitos,
  proximidade,
}) {
  return (
    <div id={id} className={styles.card}>
      <h2>{nome}</h2>
      <div>
        <h2>{profissao}</h2>
        <img src="" alt="icone-profissão" />
      </div>
      <div>
        <p>{avaliacao}</p>
        <p>{num_servicos_feitos}</p>
        <p>{proximidade}</p>
      </div>
    </div>
  );
}
export default CardUser;
