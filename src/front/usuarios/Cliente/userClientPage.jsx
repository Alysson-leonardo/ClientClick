import styles from "./userClientPage.module.css";

function UserPage() {
  return (
    <div className={styles.userDiv}>
      <div className={styles.topUser}>
        <img src="" alt="" />
        <div>
          <h2>nome</h2>
          <div>
            <p>cpf</p>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.midUser}>
        <p>Agendamentos</p>
        <p>Contratos de serviços</p>
        <p>Pedidos</p>
      </div>
      <hr />
      <div className={styles.bottomUser}>
        <p>configurações</p>
        <p>acessibilidade</p>
      </div>
    </div>
  );
}
export default UserPage;
