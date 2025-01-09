import styles from "./UserPrestadorPage.module.css";
function UserPrestadorPage() {
  return (
    <div className={styles.userDiv}>
      <div className={styles.topUser}>
        <img src="" alt="" />
        <div>
          <h2>nome</h2>
          <div>
            <p>cpf</p>
            <p>profissao</p>
            <p>Avaliação</p>
          </div>
        </div>
      </div>
      <div className={styles.midUser}>
        <hr />
        <p>Agendamentos</p>
        <p>Contratos de serviços</p>
        <p>serviços</p>
      </div>
      <div className={styles.bottomUser}>
        <hr />
        <p>configurações</p>
        <p>acessibilidade</p>
      </div>
    </div>
  );
}
export default UserPrestadorPage;
