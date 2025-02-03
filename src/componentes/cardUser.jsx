import styles from "./cardUser.module.css";
function CardUser({
  id,
  nome,
  profissao,
  servico,
  valor_maximo,
  avaliacao,
  num_servicos_feitos,
  cidade,
}) {
  return (
    <div id={id} className={styles.card}>
      <h2>{nome}</h2>
      <div>
        <h2>{profissao}</h2>
        <h2>{servico}</h2>
        <img src="" alt="icone-profissão" />
      </div>
      <div>
        <p>{avaliacao}</p>
        <p>{valor_maximo}</p>
        <p>{num_servicos_feitos}</p>
        <p>{cidade}</p>
      </div>
    </div>
  );
}
export default CardUser;
