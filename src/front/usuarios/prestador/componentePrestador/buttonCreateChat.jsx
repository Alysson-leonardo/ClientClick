function ButtonCreateChat(props) {
  const id_other = props.id;
  const handleSubmit = async () => {
    const createChat = await fetch("http://localhost:8080/createChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_other, user: props.user }),
      credentials: "include",
    });
    const response = await createChat.json();
    if (response.ok) {
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      <button type="button" onClick={handleSubmit}>
        {props.nomeBotao}
      </button>
    </>
  );
}
export default ButtonCreateChat;
